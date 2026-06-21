// Auto-publish scheduled CMS pages. Triggered by pg_cron every 5 minutes.
// On each successful flip to "published": writes a version snapshot to
// cms_page_versions and an audit row to admin_audit_log, then fires the Wix push.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  const now = new Date().toISOString();
  const { data: due, error } = await supabase
    .from("cms_pages")
    .select("*")
    .eq("status", "scheduled")
    .lte("publish_at", now);

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const published: string[] = [];
  const failed: { slug: string; error: string }[] = [];

  for (const row of due ?? []) {
    const nextSnapshot = { ...row, status: "published", published_at: now, workflow_status: "published" };
    const { error: upErr } = await supabase
      .from("cms_pages")
      .update({ status: "published", published_at: now, workflow_status: "published" })
      .eq("id", row.id);

    if (upErr) {
      failed.push({ slug: row.slug, error: upErr.message });
      continue;
    }
    published.push(row.slug);

    // Version snapshot for restore/diff history
    const { data: latest } = await supabase
      .from("cms_page_versions")
      .select("version_number")
      .eq("page_id", row.id)
      .order("version_number", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextVersion = (latest?.version_number ?? 0) + 1;
    await supabase.from("cms_page_versions").insert({
      page_id: row.id,
      version_number: nextVersion,
      snapshot: nextSnapshot,
      author_id: null,
      note: "Auto-published (scheduled)",
    });

    // Audit log
    await supabase.from("admin_audit_log").insert({
      action: "page_published_scheduled",
      entity_type: "cms_page",
      entity_id: row.id,
      entity_label: row.title,
      metadata: { slug: row.slug, scheduled_for: row.publish_at, ran_at: now, version: nextVersion },
    });

    // Fire-and-forget Wix push
    fetch(`${SUPABASE_URL}/functions/v1/cms-wix-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${SERVICE_ROLE}` },
      body: JSON.stringify({ page_id: row.id }),
    }).catch(() => {});
  }

  return new Response(JSON.stringify({ ok: true, published, failed, ranAt: now }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
