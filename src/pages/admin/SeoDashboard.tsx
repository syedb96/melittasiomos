/* <!-- WIX: PROTOTYPE ONLY — Lovable admin SEO dashboard. Do NOT replicate in Wix. --> */
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, Minus, RefreshCw, ExternalLink } from "lucide-react";

interface DailyRow { keys: [string]; clicks: number; impressions: number; ctr: number; position: number }
interface KeyedRow { keys: [string]; clicks: number; impressions: number; ctr: number; position: number }
interface SitemapEntry { path: string; lastSubmitted?: string; isPending?: boolean; errors?: string; warnings?: string; contents?: { type: string; submitted: string; indexed: string }[] }
interface GscPayload {
  site: string;
  window: { start: string; end: string };
  daily: DailyRow[];
  queries: KeyedRow[];
  pages: KeyedRow[];
  sitemaps: SitemapEntry[];
}

function deltaIcon(d: number) {
  if (d > 0.5) return <TrendingUp size={14} className="text-emerald-600" />;
  if (d < -0.5) return <TrendingDown size={14} className="text-destructive" />;
  return <Minus size={14} className="text-muted-foreground" />;
}
function fmtPct(n: number) { return `${(n * 100).toFixed(2)}%`; }
function fmtPos(n: number) { return n.toFixed(1); }

const SeoDashboard = () => {
  const [data, setData] = useState<GscPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("seo-gsc");
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setData(data as GscPayload);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const summary = useMemo(() => {
    if (!data?.daily?.length) return null;
    const rows = [...data.daily].sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
    const last = rows[rows.length - 1];
    const prev = rows[rows.length - 2];
    const totals = rows.reduce((acc, r) => {
      acc.clicks += r.clicks; acc.impressions += r.impressions;
      acc.ctrSum += r.ctr; acc.posSum += r.position; acc.n += 1;
      return acc;
    }, { clicks: 0, impressions: 0, ctrSum: 0, posSum: 0, n: 0 });
    return {
      rows,
      latest: last,
      prev,
      totals: {
        clicks: totals.clicks,
        impressions: totals.impressions,
        ctr: totals.ctrSum / totals.n,
        position: totals.posSum / totals.n,
      },
    };
  }, [data]);

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">SEO Monitoring</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Google Search Console — puranights.com{data?.window && (
                <span> · {data.window.start} → {data.window.end}</span>
              )}
            </p>
          </div>
          <button
            onClick={load}
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted/50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-destructive/40 bg-destructive/5 rounded-md text-sm text-destructive">
            <div className="font-semibold mb-1">Could not load Search Console data</div>
            <div className="font-mono text-xs">{error}</div>
            <p className="mt-2 text-foreground">
              Common causes: the site is not yet verified in Search Console, the connector needs to be reconnected, or this account is not an admin/editor.
            </p>
          </div>
        )}

        {loading && !data && <div className="text-sm text-muted-foreground">Loading…</div>}

        {summary && (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {([
                ["Clicks (28d)", summary.totals.clicks, summary.latest.clicks, summary.prev?.clicks ?? 0, (a: number) => a.toLocaleString()],
                ["Impressions (28d)", summary.totals.impressions, summary.latest.impressions, summary.prev?.impressions ?? 0, (a: number) => a.toLocaleString()],
                ["Avg CTR", summary.totals.ctr, summary.latest.ctr, summary.prev?.ctr ?? 0, fmtPct],
                ["Avg Position", summary.totals.position, summary.latest.position, summary.prev?.position ?? 0, fmtPos],
              ] as const).map(([label, total, latest, prev, fmt]) => {
                const delta = (latest as number) - (prev as number);
                const pct = prev ? ((latest as number) - (prev as number)) / (prev as number) * 100 : 0;
                return (
                  <div key={label} className="border border-border rounded-lg p-4 bg-card">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-accent">{label}</div>
                    <div className="text-2xl font-display font-bold mt-1">{fmt(total as number)}</div>
                    <div className="flex items-center gap-1.5 mt-2 text-xs">
                      {deltaIcon(label === "Avg Position" ? -delta : delta)}
                      <span className="text-muted-foreground">
                        Yesterday {fmt(latest as number)} ({pct >= 0 ? "+" : ""}{pct.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Daily series table */}
            <div className="border border-border rounded-lg bg-card mb-8 overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold">Daily changes</h2>
                <span className="text-xs text-muted-foreground">{summary.rows.length} days</span>
              </div>
              <div className="max-h-80 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-card border-b border-border">
                    <tr className="text-left text-xs uppercase text-muted-foreground tracking-wider">
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2 text-right">Clicks</th>
                      <th className="px-4 py-2 text-right">Impressions</th>
                      <th className="px-4 py-2 text-right">CTR</th>
                      <th className="px-4 py-2 text-right">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...summary.rows].reverse().map((r, i, all) => {
                      const prev = all[i + 1];
                      const dClicks = prev ? r.clicks - prev.clicks : 0;
                      return (
                        <tr key={r.keys[0]} className="border-b border-border/50 last:border-0">
                          <td className="px-4 py-1.5 font-mono text-xs">{r.keys[0]}</td>
                          <td className="px-4 py-1.5 text-right">
                            <span className="inline-flex items-center gap-1.5 justify-end">
                              {prev && deltaIcon(dClicks)}
                              {r.clicks}
                            </span>
                          </td>
                          <td className="px-4 py-1.5 text-right">{r.impressions.toLocaleString()}</td>
                          <td className="px-4 py-1.5 text-right">{fmtPct(r.ctr)}</td>
                          <td className="px-4 py-1.5 text-right">{fmtPos(r.position)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Queries + pages */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {([["Top queries", data!.queries], ["Top pages", data!.pages]] as const).map(([title, rows]) => (
                <div key={title} className="border border-border rounded-lg bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <h2 className="font-display font-semibold">{title}</h2>
                  </div>
                  <div className="max-h-96 overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-card sticky top-0 border-b border-border">
                        <tr className="text-left text-xs uppercase text-muted-foreground tracking-wider">
                          <th className="px-3 py-2">{title === "Top pages" ? "Page" : "Query"}</th>
                          <th className="px-3 py-2 text-right">Clicks</th>
                          <th className="px-3 py-2 text-right">Impr.</th>
                          <th className="px-3 py-2 text-right">Pos.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.keys[0]} className="border-b border-border/50 last:border-0">
                            <td className="px-3 py-1.5 truncate max-w-[260px]">
                              {title === "Top pages" ? (
                                <a href={r.keys[0]} target="_blank" rel="noopener" className="hover:underline inline-flex items-center gap-1">
                                  {r.keys[0].replace("https://www.puranights.com", "")}
                                  <ExternalLink size={11} />
                                </a>
                              ) : r.keys[0]}
                            </td>
                            <td className="px-3 py-1.5 text-right">{r.clicks}</td>
                            <td className="px-3 py-1.5 text-right">{r.impressions.toLocaleString()}</td>
                            <td className="px-3 py-1.5 text-right">{fmtPos(r.position)}</td>
                          </tr>
                        ))}
                        {rows.length === 0 && (
                          <tr><td colSpan={4} className="px-3 py-6 text-center text-xs text-muted-foreground">No data yet — Search Console takes a few days to populate.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Sitemaps / indexing */}
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="font-display font-semibold">Sitemaps & indexing</h2>
              </div>
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr className="text-left text-xs uppercase text-muted-foreground tracking-wider">
                    <th className="px-4 py-2">Sitemap</th>
                    <th className="px-4 py-2">Last submitted</th>
                    <th className="px-4 py-2 text-right">Submitted URLs</th>
                    <th className="px-4 py-2 text-right">Indexed</th>
                    <th className="px-4 py-2 text-right">Errors / Warn</th>
                  </tr>
                </thead>
                <tbody>
                  {(data!.sitemaps ?? []).map((s) => {
                    const sub = s.contents?.[0]?.submitted ?? "—";
                    const idx = s.contents?.[0]?.indexed ?? "—";
                    return (
                      <tr key={s.path} className="border-b border-border/50 last:border-0">
                        <td className="px-4 py-1.5 font-mono text-xs truncate max-w-[320px]">
                          <a href={s.path} target="_blank" rel="noopener" className="hover:underline">{s.path}</a>
                        </td>
                        <td className="px-4 py-1.5 text-xs">{s.lastSubmitted?.split("T")[0] ?? "—"}</td>
                        <td className="px-4 py-1.5 text-right">{sub}</td>
                        <td className="px-4 py-1.5 text-right">{idx}</td>
                        <td className="px-4 py-1.5 text-right">{(s.errors ?? "0")} / {(s.warnings ?? "0")}</td>
                      </tr>
                    );
                  })}
                  {(!data!.sitemaps || data!.sitemaps.length === 0) && (
                    <tr><td colSpan={5} className="px-4 py-6 text-center text-xs text-muted-foreground">No sitemaps registered in Search Console.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default SeoDashboard;
