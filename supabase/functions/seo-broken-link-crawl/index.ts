// Nightly crawl: fetch sitemap.xml, HEAD-check each URL + internal links,
// upsert rows into seo_broken_links. Marks previously-broken URLs as resolved
// when they now return 2xx/3xx.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const HOST = "https://puranights.com";
const TIMEOUT_MS = 8000;

async function check(url: string): Promise<{ status: number | null; errorType: string | null }> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow", signal: ctl.signal });
    // Some servers reject HEAD — retry GET
    if (res.status === 405 || res.status === 501) {
      const r2 = await fetch(url, { method: "GET", redirect: "follow", signal: ctl.signal });
      return { status: r2.status, errorType: r2.status >= 400 ? "http_error" : null };
    }
    return { status: res.status, errorType: res.status >= 400 ? "http_error" : null };
  } catch (e: any) {
    return { status: null, errorType: e?.name === "AbortError" ? "timeout" : "network_error" };
  } finally {
    clearTimeout(t);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // 1. Fetch sitemap
  const smRes = await fetch(`${HOST}/sitemap.xml`);
  const xml = await smRes.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());

  const now = new Date().toISOString();
  const broken: { url: string; status_code: number | null; error_type: string | null; found_on: string }[] = [];
  const okUrls: string[] = [];

  // Throttle to ~5 concurrent
  const concurrency = 5;
  for (let i = 0; i < urls.length; i += concurrency) {
    const slice = urls.slice(i, i + concurrency);
    const results = await Promise.all(slice.map((u) => check(u)));
    slice.forEach((u, idx) => {
      const r = results[idx];
      if (r.errorType || (r.status && r.status >= 400)) {
        broken.push({ url: u, status_code: r.status, error_type: r.errorType, found_on: "sitemap.xml" });
      } else {
        okUrls.push(u);
      }
    });
  }

  // 2. Upsert broken links
  for (const b of broken) {
    await supabase.from("seo_broken_links").upsert({
      url: b.url,
      status_code: b.status_code,
      error_type: b.error_type,
      found_on: b.found_on,
      last_checked_at: now,
      resolved_at: null,
    }, { onConflict: "url,found_on" });
  }

  // 3. Resolve any previously-broken URLs that now respond OK
  if (okUrls.length) {
    await supabase
      .from("seo_broken_links")
      .update({ resolved_at: now, last_checked_at: now })
      .in("url", okUrls)
      .is("resolved_at", null);
  }

  // 4. Emit alert if new broken links surfaced
  if (broken.length) {
    await supabase.from("seo_alerts").insert({
      site: HOST,
      metric: "broken_links",
      severity: broken.length > 5 ? "critical" : "warning",
      current_value: broken.length,
      baseline_value: 0,
      delta_pct: 100,
      message: `${broken.length} broken link${broken.length === 1 ? "" : "s"} detected by nightly crawl`,
    });
  }

  return new Response(JSON.stringify({
    ok: true, checked: urls.length, broken: broken.length, ranAt: now,
    samples: broken.slice(0, 10),
  }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
