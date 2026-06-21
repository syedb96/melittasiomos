// Daily freshness scan over cms_pages.
// Classifies every published page as fresh / review_soon / outdated using the
// same rule as public.cms_page_freshness, persists a digest run to
// cms_freshness_alerts (admin-visible), and writes one summary row to
// admin_audit_log for the timeline.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DAY = 86_400_000;

function classify(publishedAt: string | null, reviewDate: string | null) {
  const now = Date.now();
  const today = new Date(); today.setUTCHours(0, 0, 0, 0);
  if (reviewDate) {
    const rd = new Date(reviewDate + "T00:00:00Z").getTime();
    if (rd < today.getTime()) return { freshness: "outdated" as const, daysOverdue: Math.floor((today.getTime() - rd) / DAY) };
    if (rd < today.getTime() + 30 * DAY) return { freshness: "review_soon" as const, daysOverdue: 0 };
  }
  if (publishedAt) {
    const pub = new Date(publishedAt).getTime();
    if (pub < now - 365 * DAY) return { freshness: "outdated" as const, daysOverdue: Math.floor((now - pub - 365 * DAY) / DAY) };
    if (pub < now - 180 * DAY) return { freshness: "review_soon" as const, daysOverdue: 0 };
  }
  return { freshness: "fresh" as const, daysOverdue: 0 };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: pages, error } = await supabase
    .from("cms_pages")
    .select("id,slug,title,published_at,review_date,status")
    .eq("status", "published");

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const runId = crypto.randomUUID();
  const rows = (pages ?? []).map((p) => {
    const { freshness, daysOverdue } = classify(p.published_at, p.review_date);
    return {
      digest_run_id: runId,
      page_id: p.id,
      slug: p.slug,
      title: p.title,
      freshness,
      review_date: p.review_date,
      published_at: p.published_at,
      days_overdue: daysOverdue,
    };
  });

  if (rows.length) {
    const { error: insErr } = await supabase.from("cms_freshness_alerts").insert(rows);
    if (insErr) {
      return new Response(JSON.stringify({ ok: false, error: insErr.message }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  const counts = {
    fresh: rows.filter((r) => r.freshness === "fresh").length,
    review_soon: rows.filter((r) => r.freshness === "review_soon").length,
    outdated: rows.filter((r) => r.freshness === "outdated").length,
    total: rows.length,
  };

  const worst = rows
    .filter((r) => r.freshness !== "fresh")
    .sort((a, b) => (b.days_overdue ?? 0) - (a.days_overdue ?? 0))
    .slice(0, 10)
    .map((r) => ({ slug: r.slug, title: r.title, freshness: r.freshness, days_overdue: r.days_overdue }));

  await supabase.from("admin_audit_log").insert({
    action: "cms_freshness_digest",
    entity_type: "cms_pages",
    entity_id: runId,
    entity_label: `${counts.outdated} outdated · ${counts.review_soon} review-soon · ${counts.fresh} fresh`,
    metadata: { run_id: runId, counts, top_offenders: worst },
  });

  return new Response(JSON.stringify({ ok: true, run_id: runId, counts, top_offenders: worst }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
