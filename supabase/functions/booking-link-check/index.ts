// Nightly Ticket Tailor / booking link health check.
//
// For every active row in `commerce_booking_links` whose `kind = 'ticket_tailor'`
// or whose URL matches tickettailor.com, perform an HTTP request and write an
// entry to `seo_alerts` when the response indicates the link is broken or has
// drifted (non-2xx, or redirect to an unrelated host).
//
// Invoked by pg_cron (see schedule wired up via supabase--insert after deploy).

// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Check = {
  slug: string;
  url: string;
  status: number | null;
  final_url: string | null;
  ok: boolean;
  reason?: string;
};

const ALLOWED_HOSTS = new Set([
  "www.tickettailor.com",
  "tickettailor.com",
  "buytickets.at",
]);

async function checkOne(slug: string, url: string): Promise<Check> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "PuraNightsLinkCheck/1.0 (+admin)" },
    });
    const finalUrl = res.url;
    const status = res.status;
    let host = "";
    try { host = new URL(finalUrl).host; } catch { /* noop */ }
    if (status >= 400) {
      return { slug, url, status, final_url: finalUrl, ok: false, reason: `HTTP ${status}` };
    }
    if (host && !ALLOWED_HOSTS.has(host)) {
      return { slug, url, status, final_url: finalUrl, ok: false, reason: `redirected to ${host}` };
    }
    return { slug, url, status, final_url: finalUrl, ok: true };
  } catch (e) {
    return { slug, url, status: null, final_url: null, ok: false, reason: (e as Error).message };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: links, error } = await supabase
    .from("commerce_booking_links")
    .select("slug, url, kind, is_active")
    .eq("is_active", true)
    .or("kind.eq.ticket_tailor,url.ilike.%tickettailor.com%");
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const results: Check[] = [];
  for (const l of links ?? []) {
    const r = await checkOne(l.slug, l.url);
    results.push(r);
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    const rows = failed.map((f) => ({
      site: "puranights",
      metric: "booking_link_health",
      severity: f.status && f.status >= 500 ? "critical" : "warning",
      current_value: f.status ?? -1,
      baseline_value: 200,
      delta_pct: 0,
      message: `Booking link "${f.slug}" failed: ${f.reason ?? "unknown"} (url=${f.url}${f.final_url && f.final_url !== f.url ? `, final=${f.final_url}` : ""})`,
      emailed: false,
      acknowledged: false,
    }));
    const { error: insErr } = await supabase.from("seo_alerts").insert(rows);
    if (insErr) console.error("seo_alerts insert error", insErr);
  }

  return new Response(
    JSON.stringify({
      checked: results.length,
      failed: failed.length,
      results,
    }, null, 2),
    { headers: { "Content-Type": "application/json", ...corsHeaders } },
  );
});
