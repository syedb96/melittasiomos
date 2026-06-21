// Nightly schema-drift check. For each URL in sitemap, fetch HTML, extract
// every <script type="application/ld+json"> block, hash the combined payload,
// and compare with the previous snapshot. Persist + alert on changes.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const HOST = "https://puranights.com";

async function sha256(s: string): Promise<string> {
  const buf = new TextEncoder().encode(s);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function extractJsonLd(html: string): unknown[] {
  const matches = Array.from(html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi));
  const blocks: unknown[] = [];
  for (const m of matches) {
    try { blocks.push(JSON.parse(m[1].trim())); } catch { /* ignore malformed */ }
  }
  return blocks;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const smRes = await fetch(`${HOST}/sitemap.xml`);
  const xml = await smRes.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());

  const drifts: { url: string; old_hash: string | null; new_hash: string }[] = [];
  const concurrency = 4;

  for (let i = 0; i < urls.length; i += concurrency) {
    const slice = urls.slice(i, i + concurrency);
    await Promise.all(slice.map(async (url) => {
      try {
        const res = await fetch(url, { redirect: "follow" });
        if (!res.ok) return;
        const html = await res.text();
        const blocks = extractJsonLd(html);
        if (!blocks.length) return;
        const normalized = JSON.stringify(blocks);
        const hash = await sha256(normalized);

        const { data: prev } = await supabase
          .from("seo_schema_snapshots")
          .select("schema_hash")
          .eq("url", url)
          .order("checked_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const changed = prev && prev.schema_hash !== hash;
        if (!prev || changed) {
          await supabase.from("seo_schema_snapshots").insert({
            url,
            schema_hash: hash,
            schema_json: blocks as unknown as Record<string, unknown>,
            changed_from_previous: !!changed,
          });
          if (changed) drifts.push({ url, old_hash: prev?.schema_hash ?? null, new_hash: hash });
        }
      } catch { /* skip */ }
    }));
  }

  if (drifts.length) {
    await supabase.from("seo_alerts").insert({
      site: HOST,
      metric: "schema_drift",
      severity: "warning",
      current_value: drifts.length,
      baseline_value: 0,
      delta_pct: 100,
      message: `${drifts.length} page${drifts.length === 1 ? "" : "s"} had JSON-LD schema changes overnight`,
    });
  }

  return new Response(JSON.stringify({
    ok: true, checked: urls.length, drifts: drifts.length, ranAt: new Date().toISOString(),
    samples: drifts.slice(0, 10),
  }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
