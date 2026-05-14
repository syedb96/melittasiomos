/* <!-- WIX: PROTOTYPE ONLY — Lovable admin SEO dashboard. Do NOT replicate in Wix. --> */
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, Minus, RefreshCw, ExternalLink, Download, AlertTriangle, X, Plus } from "lucide-react";

interface DailyRow { keys: [string]; clicks: number; impressions: number; ctr: number; position: number }
interface KeyedRow { keys: [string]; clicks: number; impressions: number; ctr: number; position: number }
interface SitemapEntry {
  path: string; lastSubmitted?: string; isPending?: boolean; errors?: string; warnings?: string;
  contents?: { type: string; submitted: string; indexed: string }[];
  added_count?: number; removed_count?: number; urls_count?: number; last_snapshot_at?: string | null;
}
interface AlertRow { id: string; metric: string; severity: string; current_value: number; baseline_value: number; delta_pct: number; message: string; created_at: string }
interface SitemapSnapshot { id: string; captured_at: string; submitted: number; indexed: number; urls: string[]; added_urls: string[]; removed_urls: string[] }
interface GscPayload {
  site: string;
  window: { start: string; end: string };
  daily: DailyRow[];
  queries: KeyedRow[];
  pages: KeyedRow[];
  sitemaps: SitemapEntry[];
  alerts: AlertRow[];
}

function deltaIcon(d: number) {
  if (d > 0.5) return <TrendingUp size={14} className="text-emerald-600" />;
  if (d < -0.5) return <TrendingDown size={14} className="text-destructive" />;
  return <Minus size={14} className="text-muted-foreground" />;
}
const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;
const fmtPos = (n: number) => n.toFixed(1);

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows.map(r => r.map(c => {
    const s = String(c ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

const SeoDashboard = () => {
  const [data, setData] = useState<GscPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [detail, setDetail] = useState<{ path: string; history: SitemapSnapshot[] } | null>(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("seo-gsc");
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setData(data as GscPayload);
    } catch (e: any) { setError(e?.message ?? String(e)); }
    finally { setLoading(false); }
  };

  const triggerRefresh = async () => {
    setRefreshing(true);
    try {
      await supabase.functions.invoke("seo-snapshot");
      await load();
    } catch (e: any) { setError(e?.message ?? String(e)); }
    finally { setRefreshing(false); }
  };

  const openSitemap = async (path: string) => {
    setDetail({ path, history: [] });
    const { data: res } = await supabase.functions.invoke("seo-gsc", {
      body: undefined,
      method: "GET" as any,
      // invoke doesn't easily pass query params, so call via raw fetch:
    });
    // Fallback to direct fetch with query string
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/seo-gsc?sitemap=${encodeURIComponent(path)}`;
    const session = (await supabase.auth.getSession()).data.session;
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${session?.access_token}`, apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
    });
    const json = await r.json();
    setDetail({ path, history: json.history ?? [] });
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
    return { rows, latest: last, prev, totals: {
      clicks: totals.clicks, impressions: totals.impressions,
      ctr: totals.ctrSum / totals.n, position: totals.posSum / totals.n,
    } };
  }, [data]);

  const exportDaily = () => {
    if (!summary) return;
    downloadCsv(`gsc-daily-${data!.window.start}_${data!.window.end}.csv`, [
      ["date", "clicks", "impressions", "ctr", "position"],
      ...summary.rows.map(r => [r.keys[0], r.clicks, r.impressions, r.ctr.toFixed(4), r.position.toFixed(2)]),
    ]);
  };
  const exportQueries = () => {
    if (!data) return;
    downloadCsv(`gsc-top-queries-${data.window.end}.csv`, [
      ["query", "clicks", "impressions", "ctr", "position"],
      ...data.queries.map(r => [r.keys[0], r.clicks, r.impressions, r.ctr.toFixed(4), r.position.toFixed(2)]),
    ]);
  };
  const exportPages = () => {
    if (!data) return;
    downloadCsv(`gsc-top-pages-${data.window.end}.csv`, [
      ["page", "clicks", "impressions", "ctr", "position"],
      ...data.pages.map(r => [r.keys[0], r.clicks, r.impressions, r.ctr.toFixed(4), r.position.toFixed(2)]),
    ]);
  };

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
          <div className="flex gap-2">
            <button onClick={triggerRefresh} disabled={refreshing}
              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted/50 disabled:opacity-50">
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} /> Snapshot now
            </button>
            <button onClick={load}
              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted/50">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-destructive/40 bg-destructive/5 rounded-md text-sm text-destructive">
            <div className="font-semibold mb-1">Could not load Search Console data</div>
            <div className="font-mono text-xs">{error}</div>
          </div>
        )}

        {/* Alerts banner */}
        {data?.alerts && data.alerts.length > 0 && (
          <div className="mb-6 border border-amber-500/40 bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-600" />
              <h2 className="font-display font-semibold">{data.alerts.length} active alert{data.alerts.length > 1 ? "s" : ""}</h2>
            </div>
            <ul className="space-y-1 text-sm">
              {data.alerts.map(a => (
                <li key={a.id} className="flex items-start gap-2">
                  <span className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded mt-0.5 ${a.severity === "critical" ? "bg-destructive text-destructive-foreground" : "bg-amber-200 text-amber-900"}`}>
                    {a.severity}
                  </span>
                  <span className="flex-1">{a.message}</span>
                  <span className="text-xs text-muted-foreground">{a.created_at.split("T")[0]}</span>
                </li>
              ))}
            </ul>
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

            {/* Daily series */}
            <div className="border border-border rounded-lg bg-card mb-8 overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold">Daily changes</h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{summary.rows.length} days</span>
                  <button onClick={exportDaily} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded border border-border hover:bg-muted/50">
                    <Download size={12} /> CSV
                  </button>
                </div>
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
                              {prev && deltaIcon(dClicks)}{r.clicks}
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
              {([["Top queries", data!.queries, exportQueries, "Query"], ["Top pages", data!.pages, exportPages, "Page"]] as const).map(([title, rows, exp, col]) => (
                <div key={title} className="border border-border rounded-lg bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <h2 className="font-display font-semibold">{title}</h2>
                    <button onClick={exp} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded border border-border hover:bg-muted/50">
                      <Download size={12} /> CSV
                    </button>
                  </div>
                  <div className="max-h-96 overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-card sticky top-0 border-b border-border">
                        <tr className="text-left text-xs uppercase text-muted-foreground tracking-wider">
                          <th className="px-3 py-2">{col}</th>
                          <th className="px-3 py-2 text-right">Clicks</th>
                          <th className="px-3 py-2 text-right">Impr.</th>
                          <th className="px-3 py-2 text-right">Pos.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.keys[0]} className="border-b border-border/50 last:border-0">
                            <td className="px-3 py-1.5 truncate max-w-[260px]">
                              {col === "Page" ? (
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

            {/* Sitemaps */}
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="font-display font-semibold">Sitemaps & indexing</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Click a sitemap to view URL diff history.</p>
              </div>
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr className="text-left text-xs uppercase text-muted-foreground tracking-wider">
                    <th className="px-4 py-2">Sitemap</th>
                    <th className="px-4 py-2">Last submitted</th>
                    <th className="px-4 py-2 text-right">Submitted</th>
                    <th className="px-4 py-2 text-right">Indexed</th>
                    <th className="px-4 py-2 text-right">Δ URLs</th>
                    <th className="px-4 py-2 text-right">Errors / Warn</th>
                  </tr>
                </thead>
                <tbody>
                  {(data!.sitemaps ?? []).map((s) => {
                    const sub = s.contents?.[0]?.submitted ?? "—";
                    const idx = s.contents?.[0]?.indexed ?? "—";
                    const added = s.added_count ?? 0;
                    const removed = s.removed_count ?? 0;
                    return (
                      <tr key={s.path} className="border-b border-border/50 last:border-0 cursor-pointer hover:bg-muted/30" onClick={() => openSitemap(s.path)}>
                        <td className="px-4 py-1.5 font-mono text-xs truncate max-w-[320px]">{s.path}</td>
                        <td className="px-4 py-1.5 text-xs">{s.lastSubmitted?.split("T")[0] ?? "—"}</td>
                        <td className="px-4 py-1.5 text-right">{sub}</td>
                        <td className="px-4 py-1.5 text-right">{idx}</td>
                        <td className="px-4 py-1.5 text-right text-xs">
                          {added > 0 && <span className="text-emerald-600 mr-2">+{added}</span>}
                          {removed > 0 && <span className="text-destructive">−{removed}</span>}
                          {added === 0 && removed === 0 && <span className="text-muted-foreground">—</span>}
                        </td>
                        <td className="px-4 py-1.5 text-right">{(s.errors ?? "0")} / {(s.warnings ?? "0")}</td>
                      </tr>
                    );
                  })}
                  {(!data!.sitemaps || data!.sitemaps.length === 0) && (
                    <tr><td colSpan={6} className="px-4 py-6 text-center text-xs text-muted-foreground">No sitemaps registered in Search Console.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Sitemap detail drawer */}
        {detail && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center overflow-auto p-6">
            <div className="bg-card border border-border rounded-lg w-full max-w-4xl mt-8">
              <div className="flex items-start justify-between p-4 border-b border-border">
                <div className="min-w-0">
                  <h3 className="font-display font-semibold truncate">Sitemap details</h3>
                  <p className="font-mono text-xs text-muted-foreground truncate">{detail.path}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const safe = detail.path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
                      downloadCsv(`sitemap-${safe}-history.csv`, [
                        ["captured_at", "submitted", "indexed", "coverage_pct", "added_count", "removed_count", "added_urls", "removed_urls"],
                        ...detail.history.map(h => [
                          h.captured_at,
                          h.submitted,
                          h.indexed,
                          h.submitted ? Math.round((h.indexed / h.submitted) * 100) : 0,
                          h.added_urls?.length || 0,
                          h.removed_urls?.length || 0,
                          (h.added_urls ?? []).join(" | "),
                          (h.removed_urls ?? []).join(" | "),
                        ]),
                      ]);
                    }}
                    disabled={detail.history.length === 0}
                    className="flex items-center gap-1.5 text-xs px-2 py-1 rounded border border-border hover:bg-muted/50 disabled:opacity-50"
                  >
                    <Download size={12} /> History CSV
                  </button>
                  <button
                    onClick={() => {
                      const safe = detail.path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
                      // history is sorted captured_at DESC. Build URL-level diff rows.
                      // For each snapshot: emit one row per added/removed url. last_seen_date =
                      // the most recent snapshot.captured_at whose `urls` array still contains
                      // that URL (for "removed" this is the snapshot just before removal).
                      const rows: (string | number)[][] = [
                        ["url", "change_type", "change_detected_at", "last_seen_date", "reason", "sitemap_path"],
                      ];
                      const lastSeen = (url: string, beforeIdx: number) => {
                        // search from beforeIdx (inclusive) downwards in DESC list — i.e. higher index = older
                        for (let i = beforeIdx; i < detail.history.length; i++) {
                          if ((detail.history[i].urls ?? []).includes(url)) return detail.history[i].captured_at;
                        }
                        return "";
                      };
                      detail.history.forEach((snap, idx) => {
                        for (const u of snap.added_urls ?? []) {
                          rows.push([u, "added", snap.captured_at, lastSeen(u, idx), "New URL appeared in sitemap.xml", detail.path]);
                        }
                        for (const u of snap.removed_urls ?? []) {
                          // last seen is in the previous (older) snapshot
                          rows.push([u, "removed", snap.captured_at, lastSeen(u, idx + 1), "URL no longer present in sitemap.xml", detail.path]);
                        }
                      });
                      if (rows.length === 1) rows.push(["", "", "", "", "No URL changes detected in captured history", detail.path]);
                      downloadCsv(`sitemap-${safe}-url-changes.csv`, rows);
                    }}
                    disabled={detail.history.length === 0}
                    className="flex items-center gap-1.5 text-xs px-2 py-1 rounded border border-border hover:bg-muted/50 disabled:opacity-50"
                  >
                    <Download size={12} /> URL changes CSV
                  </button>
                  <button onClick={() => setDetail(null)} className="p-1 hover:bg-muted/50 rounded"><X size={16} /></button>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {detail.history.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No snapshots yet — click "Snapshot now" to capture one.</div>
                ) : (
                  <>
                    <table className="w-full text-sm">
                      <thead><tr className="text-left text-xs uppercase text-muted-foreground tracking-wider border-b border-border">
                        <th className="px-2 py-2">Captured</th>
                        <th className="px-2 py-2 text-right">Submitted</th>
                        <th className="px-2 py-2 text-right">Indexed</th>
                        <th className="px-2 py-2 text-right">Coverage</th>
                        <th className="px-2 py-2 text-right">Added</th>
                        <th className="px-2 py-2 text-right">Removed</th>
                      </tr></thead>
                      <tbody>
                        {detail.history.map(h => (
                          <tr key={h.id} className="border-b border-border/50 last:border-0">
                            <td className="px-2 py-1.5 text-xs font-mono">{h.captured_at.replace("T", " ").slice(0, 16)}</td>
                            <td className="px-2 py-1.5 text-right">{h.submitted}</td>
                            <td className="px-2 py-1.5 text-right">{h.indexed}</td>
                            <td className="px-2 py-1.5 text-right">{h.submitted ? `${Math.round((h.indexed / h.submitted) * 100)}%` : "—"}</td>
                            <td className="px-2 py-1.5 text-right text-emerald-600">{h.added_urls?.length || 0}</td>
                            <td className="px-2 py-1.5 text-right text-destructive">{h.removed_urls?.length || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {detail.history[0] && (detail.history[0].added_urls?.length > 0 || detail.history[0].removed_urls?.length > 0) && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-emerald-600 font-accent flex items-center gap-1 mb-2"><Plus size={12} /> Added URLs ({detail.history[0].added_urls.length})</div>
                          <ul className="text-xs font-mono space-y-1 max-h-64 overflow-auto border border-border rounded p-2">
                            {detail.history[0].added_urls.map(u => <li key={u} className="truncate"><a href={u} target="_blank" rel="noopener" className="hover:underline">{u}</a></li>)}
                            {detail.history[0].added_urls.length === 0 && <li className="text-muted-foreground">None</li>}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-destructive font-accent flex items-center gap-1 mb-2"><X size={12} /> Removed URLs ({detail.history[0].removed_urls.length})</div>
                          <ul className="text-xs font-mono space-y-1 max-h-64 overflow-auto border border-border rounded p-2">
                            {detail.history[0].removed_urls.map(u => <li key={u} className="truncate">{u}</li>)}
                            {detail.history[0].removed_urls.length === 0 && <li className="text-muted-foreground">None</li>}
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SeoDashboard;
