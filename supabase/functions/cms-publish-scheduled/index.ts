// Auto-publish scheduled CMS pages. Triggered by pg_cron every 5 minutes.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const now = new Date().toISOString();
  const { data: due, error } = await supabase
    .from("cms_pages")
    .select("id,title,slug")
    .eq("status", "scheduled")
    .lte("publish_at", now);

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const published: string[] = [];
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  for (const row of due ?? []) {
    const { error: upErr } = await supabase
      .from("cms_pages")
      .update({ status: "published", published_at: now })
      .eq("id", row.id);
    if (!upErr) {
      published.push(row.slug);
      // Fire-and-forget Wix push
      fetch(`${SUPABASE_URL}/functions/v1/cms-wix-push`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SERVICE_ROLE}` },
        body: JSON.stringify({ page_id: row.id }),
      }).catch(() => {});
    }
  }

  return new Response(JSON.stringify({ ok: true, published, ranAt: now }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
