// Weekly SEO digest. Aggregates the last 7 days of seo_alerts, unresolved
// broken links, schema drift snapshots, and outdated CMS pages into a single
// row in seo_weekly_digests. Surfaced in the admin SEO Intelligence dashboard.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function weekStartUtc(d = new Date()): string {
  const day = d.getUTCDay(); // 0=Sun
  const monday = new Date(d);
  monday.setUTCHours(0, 0, 0, 0);
  const diff = (day + 6) % 7; // days back to Monday
  monday.setUTCDate(monday.getUTCDate() - diff);
  return monday.toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const weekStart = weekStartUtc();
  const sevenDaysAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const [alertsR, brokenR, driftR, freshR] = await Promise.all([
    supabase.from("seo_alerts").select("id,metric,severity,message,created_at")
      .gte("created_at", sevenDaysAgo).order("created_at", { ascending: false }),
    supabase.from("seo_broken_links").select("url,status_code,error_type,last_checked_at")
      .is("resolved_at", null),
    supabase.from("seo_schema_snapshots").select("url,checked_at")
      .eq("changed_from_previous", true).gte("checked_at", sevenDaysAgo),
    supabase.from("cms_freshness_alerts").select("slug,title,freshness,days_overdue,created_at")
      .eq("freshness", "outdated").gte("created_at", sevenDaysAgo),
  ]);

  const alerts = alertsR.data ?? [];
  const broken = brokenR.data ?? [];
  const drifts = driftR.data ?? [];
  const outdated = freshR.data ?? [];

  // Dedupe outdated by slug (keep latest)
  const outdatedSlugs = Array.from(new Map(outdated.map((o) => [o.slug, o])).values());
  const driftUrls = Array.from(new Set(drifts.map((d) => d.url)));

  const metrics = {
    alerts_by_severity: alerts.reduce<Record<string, number>>((acc, a) => {
      acc[a.severity] = (acc[a.severity] ?? 0) + 1; return acc;
    }, {}),
    top_alerts: alerts.slice(0, 10),
    broken_links_sample: broken.slice(0, 10),
    drift_urls: driftUrls.slice(0, 10),
    outdated_pages: outdatedSlugs.slice(0, 10),
    generated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("seo_weekly_digests").upsert({
    week_start: weekStart,
    metrics,
    alerts_count: alerts.length,
    broken_links_count: broken.length,
    schema_drift_count: driftUrls.length,
    freshness_outdated_count: outdatedSlugs.length,
    generated_at: new Date().toISOString(),
  }, { onConflict: "week_start" });

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  await supabase.from("admin_audit_log").insert({
    action: "seo_weekly_digest",
    entity_type: "seo_weekly_digests",
    entity_id: weekStart,
    entity_label: `Week of ${weekStart}: ${alerts.length} alerts · ${broken.length} broken · ${driftUrls.length} schema-drift · ${outdatedSlugs.length} outdated`,
    metadata: metrics,
  });

  return new Response(JSON.stringify({ ok: true, week_start: weekStart, metrics }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
