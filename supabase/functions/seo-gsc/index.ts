// SEO monitoring edge function — proxies Google Search Console and joins
// with stored snapshots / alerts.
// Admin-only: requires a logged-in user with role 'admin' or 'editor'.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE = "sc-domain:puranights.com";

function isoDay(d: Date) { return d.toISOString().split("T")[0]; }

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
    const allowed = (roles ?? []).some((r: any) => r.role === "admin" || r.role === "editor" || r.role === "owner");
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Forbidden" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const url = new URL(req.url);
    const detailPath = url.searchParams.get("sitemap");

    // ---- Sitemap detail mode: return latest two snapshots for diffing ----
    if (detailPath) {
      const { data: snaps } = await supabase
        .from("seo_sitemap_snapshot")
        .select("*")
        .eq("site", SITE).eq("sitemap_path", detailPath)
        .order("captured_at", { ascending: false })
        .limit(30);
      return new Response(JSON.stringify({ site: SITE, sitemap_path: detailPath, history: snaps ?? [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ---- Default: live GSC + DB enrichment ----
    const today = new Date(); today.setUTCHours(0, 0, 0, 0);
    const end = new Date(today.getTime() - 2 * 86400000);
    const start = new Date(end.getTime() - 27 * 86400000);
    const siteParam = encodeURIComponent(SITE);

    const [daily, queries, pages] = await Promise.all([
      gsc(`/webmasters/v3/sites/${siteParam}/searchAnalytics/query`, {
        method: "POST",
        body: JSON.stringify({ startDate: isoDay(start), endDate: isoDay(end), dimensions: ["date"], rowLimit: 1000 }),
      }),
      gsc(`/webmasters/v3/sites/${siteParam}/searchAnalytics/query`, {
        method: "POST",
        body: JSON.stringify({ startDate: isoDay(start), endDate: isoDay(end), dimensions: ["query"], rowLimit: 25 }),
      }),
      gsc(`/webmasters/v3/sites/${siteParam}/searchAnalytics/query`, {
        method: "POST",
        body: JSON.stringify({ startDate: isoDay(start), endDate: isoDay(end), dimensions: ["page"], rowLimit: 25 }),
      }),
    ]);

    let sitemaps: any = { sitemap: [] };
    try { sitemaps = await gsc(`/webmasters/v3/sites/${siteParam}/sitemaps`); } catch (_) {}

    // Latest snapshot per sitemap path → adds added_urls/removed_urls counts.
    const { data: snapRows } = await supabase
      .from("seo_sitemap_snapshot")
      .select("sitemap_path, captured_at, added_urls, removed_urls, urls, submitted, indexed")
      .eq("site", SITE)
      .order("captured_at", { ascending: false })
      .limit(200);
    const latestBySitemap = new Map<string, any>();
    for (const r of snapRows ?? []) {
      if (!latestBySitemap.has(r.sitemap_path)) latestBySitemap.set(r.sitemap_path, r);
    }

    const { data: alerts } = await supabase
      .from("seo_alerts")
      .select("*")
      .eq("acknowledged", false)
      .order("created_at", { ascending: false })
      .limit(20);

    return new Response(JSON.stringify({
      site: SITE,
      window: { start: isoDay(start), end: isoDay(end) },
      daily: daily.rows ?? [],
      queries: queries.rows ?? [],
      pages: pages.rows ?? [],
      sitemaps: (sitemaps.sitemap ?? []).map((s: any) => {
        const snap = latestBySitemap.get(s.path);
        return {
          ...s,
          added_count: snap?.added_urls?.length ?? 0,
          removed_count: snap?.removed_urls?.length ?? 0,
          urls_count: snap?.urls?.length ?? 0,
          last_snapshot_at: snap?.captured_at ?? null,
        };
      }),
      alerts: alerts ?? [],
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
