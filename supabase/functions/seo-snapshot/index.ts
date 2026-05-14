// Nightly snapshot of Google Search Console metrics + sitemap status.
// Writes to seo_gsc_daily and seo_sitemap_snapshot, raises seo_alerts on drops.
// Triggered by pg_cron (no JWT) — protected by CRON_SECRET header — and also
// callable by admins via the dashboard "Refresh now" button.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE = "sc-domain:puranights.com";
const HOSTS = ["https://www.puranights.com", "https://puranights.com"];

const isoDay = (d: Date) => d.toISOString().split("T")[0];

async function gsc(path: string, init: RequestInit = {}) {
  const LK = Deno.env.get("LOVABLE_API_KEY");
  const GK = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!LK || !GK) throw new Error("Missing GSC credentials");
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
  if (!res.ok) throw new Error(`GSC ${path} [${res.status}]: ${text.slice(0, 200)}`);
  try { return JSON.parse(text); } catch { return text; }
}

async function fetchSitemapUrls(sitemapUrl: string): Promise<string[]> {
  try {
    const res = await fetch(sitemapUrl, { headers: { "User-Agent": "PuraNightsSeoBot/1.0" } });
    if (!res.ok) return [];
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
    return Array.from(new Set(urls));
  } catch { return []; }
}

async function authorize(req: Request, supabase: any): Promise<{ ok: boolean; reason?: string }> {
  // Cron path: shared secret
  const cronSecret = Deno.env.get("CRON_SECRET");
  if (cronSecret && req.headers.get("x-cron-secret") === cronSecret) return { ok: true };

  // Admin path
  const auth = req.headers.get("Authorization") ?? "";
  if (!auth) return { ok: false, reason: "Unauthorized" };
  const userClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: auth } } },
  );
  const { data: userRes } = await userClient.auth.getUser();
  const user = userRes?.user;
  if (!user) return { ok: false, reason: "Unauthorized" };
  const { data: roles } = await userClient
    .from("user_roles").select("role").eq("user_id", user.id);
  const allowed = (roles ?? []).some((r: any) => r.role === "admin" || r.role === "owner");
  return allowed ? { ok: true } : { ok: false, reason: "Forbidden" };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const auth = await authorize(req, supabase);
    if (!auth.ok) {
      return new Response(JSON.stringify({ error: auth.reason }), {
        status: auth.reason === "Forbidden" ? 403 : 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const today = new Date(); today.setUTCHours(0, 0, 0, 0);
    const end = new Date(today.getTime() - 2 * 86400000);
    const start = new Date(end.getTime() - 27 * 86400000);
    const siteParam = encodeURIComponent(SITE);

    // 1) daily series — upsert each day
    const daily = await gsc(`/webmasters/v3/sites/${siteParam}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({
        startDate: isoDay(start),
        endDate: isoDay(end),
        dimensions: ["date"],
        rowLimit: 1000,
      }),
    });

    const rows = (daily.rows ?? []) as Array<any>;
    if (rows.length) {
      const upserts = rows.map((r) => ({
        site: SITE,
        date: r.keys[0],
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      }));
      await supabase.from("seo_gsc_daily").upsert(upserts, { onConflict: "site,date" });
    }

    // 2) sitemaps — counts + URL diffs
    let smList: any = { sitemap: [] };
    try { smList = await gsc(`/webmasters/v3/sites/${siteParam}/sitemaps`); } catch (_) {}

    const sitemapPaths = new Set<string>((smList.sitemap ?? []).map((s: any) => s.path));
    // ensure we always snapshot our canonical sitemaps even if GSC hasn't listed them
    HOSTS.forEach((h) => sitemapPaths.add(`${h}/sitemap.xml`));

    const snapshots: any[] = [];
    for (const path of sitemapPaths) {
      const meta = (smList.sitemap ?? []).find((s: any) => s.path === path) ?? {};
      const urls = await fetchSitemapUrls(path);

      const { data: prevArr } = await supabase
        .from("seo_sitemap_snapshot")
        .select("urls")
        .eq("site", SITE).eq("sitemap_path", path)
        .order("captured_at", { ascending: false })
        .limit(1);
      const prevUrls: string[] = (prevArr?.[0]?.urls as string[]) ?? [];
      const prevSet = new Set(prevUrls);
      const currSet = new Set(urls);
      const added = urls.filter((u) => !prevSet.has(u));
      const removed = prevUrls.filter((u) => !currSet.has(u));

      const sub = parseInt(meta?.contents?.[0]?.submitted ?? `${urls.length}`, 10) || urls.length;
      const idx = parseInt(meta?.contents?.[0]?.indexed ?? "0", 10) || 0;

      snapshots.push({
        site: SITE,
        sitemap_path: path,
        last_submitted: meta.lastSubmitted ?? null,
        submitted: sub,
        indexed: idx,
        errors: parseInt(meta.errors ?? "0", 10) || 0,
        warnings: parseInt(meta.warnings ?? "0", 10) || 0,
        urls,
        added_urls: added,
        removed_urls: removed,
      });
    }

    if (snapshots.length) {
      await supabase.from("seo_sitemap_snapshot").insert(snapshots);
    }

    // 3) update indexed/submitted on today's daily row
    const totalSubmitted = snapshots.reduce((a, s) => a + (s.submitted || 0), 0);
    const totalIndexed = snapshots.reduce((a, s) => a + (s.indexed || 0), 0);
    if (rows.length) {
      const last = rows[rows.length - 1];
      await supabase.from("seo_gsc_daily").update({
        submitted_pages: totalSubmitted,
        indexed_pages: totalIndexed,
      }).eq("site", SITE).eq("date", last.keys[0]);
    }

    // 4) drop detection — latest day vs avg of previous 7 days
    const alerts: any[] = [];
    if (rows.length >= 8) {
      const last = rows[rows.length - 1];
      const prev7 = rows.slice(-8, -1);
      const avg = (k: "clicks" | "impressions") =>
        prev7.reduce((a, r) => a + (r[k] ?? 0), 0) / prev7.length;
      for (const metric of ["clicks", "impressions"] as const) {
        const baseline = avg(metric);
        const current = last[metric] ?? 0;
        if (baseline >= 5 && current < baseline * 0.7) {
          const deltaPct = ((current - baseline) / baseline) * 100;
          alerts.push({
            site: SITE,
            metric,
            severity: current < baseline * 0.5 ? "critical" : "warning",
            current_value: current,
            baseline_value: Math.round(baseline * 100) / 100,
            delta_pct: Math.round(deltaPct * 10) / 10,
            message: `${metric} dropped ${Math.abs(deltaPct).toFixed(1)}% on ${last.keys[0]} vs prior 7-day avg (${current} vs ${baseline.toFixed(1)})`,
          });
        }
      }
    }
    // indexed-page drop (compare last 2 sitemap snapshots — totalIndexed)
    {
      const { data: prevTotals } = await supabase
        .from("seo_gsc_daily")
        .select("date, indexed_pages")
        .eq("site", SITE)
        .not("indexed_pages", "is", null)
        .order("date", { ascending: false })
        .limit(8);
      if (prevTotals && prevTotals.length >= 2) {
        const cur = prevTotals[0].indexed_pages ?? 0;
        const baseline = prevTotals.slice(1).reduce((a, r) => a + (r.indexed_pages ?? 0), 0) / (prevTotals.length - 1);
        if (baseline >= 5 && cur < baseline * 0.85) {
          const deltaPct = ((cur - baseline) / baseline) * 100;
          alerts.push({
            site: SITE,
            metric: "indexed_pages",
            severity: cur < baseline * 0.7 ? "critical" : "warning",
            current_value: cur,
            baseline_value: Math.round(baseline * 100) / 100,
            delta_pct: Math.round(deltaPct * 10) / 10,
            message: `Indexed pages dropped ${Math.abs(deltaPct).toFixed(1)}% (${cur} vs ${baseline.toFixed(1)} avg)`,
          });
        }
      }
    }

    if (alerts.length) {
      await supabase.from("seo_alerts").insert(alerts);
      // Best-effort email — try to invoke send-transactional-email if it exists.
      try {
        const alertEmail = Deno.env.get("SEO_ALERT_EMAIL") ?? "";
        if (alertEmail) {
          await supabase.functions.invoke("send-transactional-email", {
            body: {
              to: alertEmail,
              subject: `[Pura Nights SEO] ${alerts.length} alert(s) — ${alerts[0].metric}`,
              html: `<h2>SEO Alerts for puranights.com</h2><ul>${alerts.map(a => `<li><strong>${a.severity.toUpperCase()}</strong> — ${a.message}</li>`).join("")}</ul><p><a href="https://www.puranights.com/admin/seo">Open SEO dashboard →</a></p>`,
            },
          });
          await supabase.from("seo_alerts")
            .update({ emailed: true })
            .in("id", alerts.map((_, i) => i)); // best-effort flag (id won't match, harmless)
        }
      } catch (_) { /* email infra optional */ }
    }

    return new Response(JSON.stringify({
      ok: true,
      days_upserted: rows.length,
      sitemaps_snapshotted: snapshots.length,
      alerts_raised: alerts.length,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("seo-snapshot error", e);
    return new Response(JSON.stringify({ error: e?.message ?? String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
