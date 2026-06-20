// Hourly cron: find published pages whose Wix sync is stale or errored, retry push.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const sb = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Pages that are published, auto-sync ON, AND (never synced OR sync errored OR updated since last sync).
  const { data: pages } = await sb.from("cms_pages")
    .select("id,updated_at,wix_synced_at,wix_sync_status")
    .eq("status", "published")
    .eq("wix_auto_sync", true)
    .limit(50);

  const stale = (pages ?? []).filter((p) =>
    !p.wix_synced_at ||
    p.wix_sync_status === "error" ||
    new Date(p.updated_at) > new Date(p.wix_synced_at)
  );

  const results: any[] = [];
  for (const p of stale) {
    try {
      const r = await fetch(`${SUPABASE_URL}/functions/v1/cms-wix-push`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SERVICE_ROLE}` },
        body: JSON.stringify({ page_id: p.id }),
      });
      results.push({ page_id: p.id, status: r.status });
    } catch (e: any) { results.push({ page_id: p.id, error: e.message }); }
  }

  await sb.from("cms_wix_config").update({ last_reconcile_at: new Date().toISOString() }).gte("created_at", "1970-01-01");
  return new Response(JSON.stringify({ checked: pages?.length ?? 0, retried: results.length, results }), {
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
