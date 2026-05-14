// SEO monitoring edge function — proxies Google Search Console.
// Returns last-28-day Search Analytics + sitemap status for puranights.com.
// Admin-only: requires a logged-in user with role 'admin' or 'editor'.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE = "sc-domain:puranights.com"; // domain property

function isoDay(d: Date) {
  return d.toISOString().split("T")[0];
}

async function gsc(path: string, init: RequestInit = {}) {
  const LK = Deno.env.get("LOVABLE_API_KEY");
  const GK = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!LK) throw new Error("LOVABLE_API_KEY not configured");
  if (!GK) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY not configured");
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${LK}`,
      "X-Connection-Api-Key": GK,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let data: unknown;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) throw new Error(`GSC ${path} [${res.status}]: ${text.slice(0, 300)}`);
  return data as any;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // ----- Auth: admin/editor only -----
    const auth = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: auth } } },
    );
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const { data: roles } = await supabase
      .from("user_roles").select("role").eq("user_id", user.id);
    const allowed = (roles ?? []).some((r: any) => r.role === "admin" || r.role === "editor");
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Forbidden" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ----- Date windows -----
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const end = new Date(today.getTime() - 2 * 86400000);   // GSC has ~2-day lag
    const start = new Date(end.getTime() - 27 * 86400000);  // 28 day window

    const siteParam = encodeURIComponent(SITE);

    // 1) Daily totals (clicks/impressions/ctr/position) for last 28d
    const daily = await gsc(`/webmasters/v3/sites/${siteParam}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({
        startDate: isoDay(start),
        endDate: isoDay(end),
        dimensions: ["date"],
        rowLimit: 1000,
      }),
    });

    // 2) Top queries
    const queries = await gsc(`/webmasters/v3/sites/${siteParam}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({
        startDate: isoDay(start),
        endDate: isoDay(end),
        dimensions: ["query"],
        rowLimit: 25,
      }),
    });

    // 3) Top pages
    const pages = await gsc(`/webmasters/v3/sites/${siteParam}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({
        startDate: isoDay(start),
        endDate: isoDay(end),
        dimensions: ["page"],
        rowLimit: 25,
      }),
    });

    // 4) Sitemap status (indexing approximation)
    let sitemaps: any = { sitemap: [] };
    try {
      sitemaps = await gsc(`/webmasters/v3/sites/${siteParam}/sitemaps`);
    } catch (_) { /* ignore */ }

    return new Response(JSON.stringify({
      site: SITE,
      window: { start: isoDay(start), end: isoDay(end) },
      daily: daily.rows ?? [],
      queries: queries.rows ?? [],
      pages: pages.rows ?? [],
      sitemaps: sitemaps.sitemap ?? [],
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
