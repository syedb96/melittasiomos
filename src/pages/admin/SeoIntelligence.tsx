/* SEO Intelligence — keyword tracking, broken links, schema drift, weekly digest. */
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Link2, FileCode2, CalendarCheck, Loader2, Plus, Play, ExternalLink, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Keyword { id: string; keyword: string; target_url: string; database: string; current_position: number | null; baseline_position: number | null; last_checked_at: string | null; is_active: boolean }
interface BrokenLink { id: string; url: string; status_code: number | null; error_type: string | null; found_on: string; first_seen_at: string; last_checked_at: string; resolved_at: string | null }
interface SchemaSnap { id: string; url: string; schema_hash: string; changed_from_previous: boolean; checked_at: string }
interface Digest { id: string; week_start: string; metrics: any; alerts_count: number; broken_links_count: number; schema_drift_count: number; freshness_outdated_count: number; generated_at: string }

const delta = (cur: number | null, base: number | null) => {
  if (cur == null || base == null) return 0;
  return base - cur; // lower position = better → positive delta = improvement
};

const SeoIntelligence = () => {
  const [tab, setTab] = useState("digest");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [broken, setBroken] = useState<BrokenLink[]>([]);
  const [drift, setDrift] = useState<SchemaSnap[]>([]);
  const [digests, setDigests] = useState<Digest[]>([]);
  const [newKw, setNewKw] = useState({ keyword: "", target_url: "" });
  const [running, setRunning] = useState<string | null>(null);

  const load = async () => {
    const [k, b, d, w] = await Promise.all([
      supabase.from("seo_keyword_tracking").select("*").order("keyword"),
      supabase.from("seo_broken_links").select("*").order("last_checked_at", { ascending: false }).limit(200),
      supabase.from("seo_schema_snapshots").select("*").eq("changed_from_previous", true).order("checked_at", { ascending: false }).limit(50),
      supabase.from("seo_weekly_digests").select("*").order("week_start", { ascending: false }).limit(12),
    ]);
    setKeywords((k.data as any) ?? []);
    setBroken((b.data as any) ?? []);
    setDrift((d.data as any) ?? []);
    setDigests((w.data as any) ?? []);
  };
  useEffect(() => { load(); }, []);

  const addKeyword = async () => {
    if (!newKw.keyword.trim() || !newKw.target_url.trim()) { toast.error("Keyword and URL required"); return; }
    const { error } = await supabase.from("seo_keyword_tracking").insert({
      keyword: newKw.keyword.trim(), target_url: newKw.target_url.trim(), database: "uk", is_active: true,
    });
    if (error) { toast.error(error.message); return; }
    setNewKw({ keyword: "", target_url: "" });
    load();
  };

  const removeKw = async (id: string) => {
    await supabase.from("seo_keyword_tracking").delete().eq("id", id);
    load();
  };

  const resolveBroken = async (id: string) => {
    await supabase.from("seo_broken_links").update({ resolved_at: new Date().toISOString() }).eq("id", id);
    load();
  };

  const runJob = async (fn: string, label: string) => {
    setRunning(fn);
    const { data, error } = await supabase.functions.invoke(fn);
    setRunning(null);
    if (error) toast.error(error.message);
    else { toast.success(`${label} complete`); load(); }
    return data;
  };

  const unresolvedBroken = useMemo(() => broken.filter((b) => !b.resolved_at), [broken]);
  const latestDigest = digests[0];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div>
          <h1 className="font-display text-3xl font-bold">SEO Intelligence</h1>
          <p className="text-muted-foreground text-sm font-heading">Keyword tracking, broken-link crawl, JSON-LD drift, weekly digest.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" disabled={running !== null} onClick={() => runJob("seo-keyword-poll", "Keyword poll")}>{running === "seo-keyword-poll" ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Play size={14} className="mr-1" />}Poll positions</Button>
          <Button size="sm" variant="outline" disabled={running !== null} onClick={() => runJob("seo-broken-link-crawl", "Broken-link crawl")}>{running === "seo-broken-link-crawl" ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Play size={14} className="mr-1" />}Run crawl</Button>
          <Button size="sm" variant="outline" disabled={running !== null} onClick={() => runJob("seo-schema-drift", "Schema drift")}>{running === "seo-schema-drift" ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Play size={14} className="mr-1" />}Run drift</Button>
          <Button size="sm" variant="outline" disabled={running !== null} onClick={() => runJob("seo-weekly-digest", "Weekly digest")}>{running === "seo-weekly-digest" ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Play size={14} className="mr-1" />}Generate digest</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-card border rounded-xl p-3"><p className="text-[10px] text-muted-foreground uppercase">Tracked keywords</p><p className="font-display text-2xl">{keywords.length}</p></div>
        <div className="bg-card border rounded-xl p-3"><p className="text-[10px] text-muted-foreground uppercase">Unresolved broken</p><p className={`font-display text-2xl ${unresolvedBroken.length ? "text-destructive" : ""}`}>{unresolvedBroken.length}</p></div>
        <div className="bg-card border rounded-xl p-3"><p className="text-[10px] text-muted-foreground uppercase">Schema drifts (50 latest)</p><p className="font-display text-2xl">{drift.length}</p></div>
        <div className="bg-card border rounded-xl p-3"><p className="text-[10px] text-muted-foreground uppercase">Latest digest week</p><p className="font-display text-sm">{latestDigest ? latestDigest.week_start : "—"}</p></div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="digest"><CalendarCheck size={12} className="mr-1" />Weekly digests</TabsTrigger>
          <TabsTrigger value="keywords"><TrendingUp size={12} className="mr-1" />Keywords</TabsTrigger>
          <TabsTrigger value="broken"><Link2 size={12} className="mr-1" />Broken links {unresolvedBroken.length > 0 && <Badge className="ml-2 bg-destructive text-destructive-foreground">{unresolvedBroken.length}</Badge>}</TabsTrigger>
          <TabsTrigger value="drift"><FileCode2 size={12} className="mr-1" />Schema drift</TabsTrigger>
        </TabsList>

        <TabsContent value="digest" className="space-y-3 mt-4">
          {digests.length === 0 && <p className="text-sm text-muted-foreground py-12 text-center">No digests yet. Click <strong>Generate digest</strong> to create one now.</p>}
          {digests.map((d) => (
            <div key={d.id} className="bg-card border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-heading font-bold">Week of {d.week_start}</p>
                <p className="text-[11px] text-muted-foreground">Generated {new Date(d.generated_at).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                <Badge variant="outline" className="justify-between">Alerts <strong className="ml-2">{d.alerts_count}</strong></Badge>
                <Badge variant="outline" className="justify-between">Broken <strong className="ml-2 text-destructive">{d.broken_links_count}</strong></Badge>
                <Badge variant="outline" className="justify-between">Drift <strong className="ml-2">{d.schema_drift_count}</strong></Badge>
                <Badge variant="outline" className="justify-between">Outdated pages <strong className="ml-2">{d.freshness_outdated_count}</strong></Badge>
              </div>
              {d.metrics?.top_alerts?.length > 0 && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-muted-foreground">Top alerts</summary>
                  <ul className="mt-2 space-y-1">
                    {d.metrics.top_alerts.map((a: any) => (
                      <li key={a.id} className="flex gap-2"><AlertTriangle size={11} className="text-amber-600 shrink-0 mt-0.5" /><span><strong>{a.metric}</strong> — {a.message}</span></li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="keywords" className="space-y-3 mt-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1"><label className="text-[10px] text-muted-foreground uppercase">Keyword</label><Input value={newKw.keyword} onChange={(e) => setNewKw({ ...newKw, keyword: e.target.value })} placeholder="salsa classes ealing" /></div>
            <div className="flex-1"><label className="text-[10px] text-muted-foreground uppercase">Target URL</label><Input value={newKw.target_url} onChange={(e) => setNewKw({ ...newKw, target_url: e.target.value })} placeholder="https://puranights.com/venue/the-drayton-court-ealing" /></div>
            <Button onClick={addKeyword}><Plus size={14} className="mr-1" />Add</Button>
          </div>
          {keywords.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">No keywords tracked yet. Add the first one above.</p> : (
            <table className="w-full text-sm border-collapse">
              <thead className="text-xs text-muted-foreground border-b"><tr className="text-left">
                <th className="py-2">Keyword</th><th>Target</th><th className="text-right">Position</th><th className="text-right">Δ vs baseline</th><th>Last checked</th><th></th>
              </tr></thead>
              <tbody>
                {keywords.map((k) => {
                  const d = delta(k.current_position, k.baseline_position);
                  return (
                    <tr key={k.id} className="border-b hover:bg-muted/30">
                      <td className="py-2 font-medium">{k.keyword}</td>
                      <td className="text-xs"><a href={k.target_url} target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">{new URL(k.target_url).pathname || "/"}<ExternalLink size={9} /></a></td>
                      <td className="text-right tabular-nums">{k.current_position?.toFixed(1) ?? "—"}</td>
                      <td className="text-right tabular-nums"><span className={d > 0 ? "text-emerald-600" : d < 0 ? "text-destructive" : "text-muted-foreground"}>{d === 0 ? <Minus size={12} className="inline" /> : d > 0 ? `+${d.toFixed(1)}` : d.toFixed(1)}</span></td>
                      <td className="text-xs text-muted-foreground">{k.last_checked_at ? new Date(k.last_checked_at).toLocaleDateString() : "—"}</td>
                      <td className="text-right"><Button size="sm" variant="ghost" onClick={() => removeKw(k.id)}>Remove</Button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <p className="text-[11px] text-muted-foreground italic">Click <strong>Poll positions</strong> to fetch live ranks from Semrush. The first successful poll sets the baseline; subsequent polls compute Δ and log alerts when a keyword moves ≥5 places. Requires the Semrush connector to be linked.</p>
        </TabsContent>

        <TabsContent value="broken" className="space-y-2 mt-4">
          {broken.length === 0 ? <p className="text-sm text-muted-foreground py-12 text-center">No broken links recorded. Run the crawl to populate.</p> : (
            <table className="w-full text-sm border-collapse">
              <thead className="text-xs text-muted-foreground border-b"><tr className="text-left">
                <th className="py-2">URL</th><th>Status</th><th>Found on</th><th>Last checked</th><th></th>
              </tr></thead>
              <tbody>
                {broken.map((b) => (
                  <tr key={b.id} className={`border-b hover:bg-muted/30 ${b.resolved_at ? "opacity-50" : ""}`}>
                    <td className="py-2 text-xs"><a href={b.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{b.url}</a></td>
                    <td>{b.status_code ? <Badge variant="destructive">{b.status_code}</Badge> : <Badge variant="outline">{b.error_type ?? "?"}</Badge>}</td>
                    <td className="text-xs text-muted-foreground">{b.found_on}</td>
                    <td className="text-xs text-muted-foreground">{new Date(b.last_checked_at).toLocaleDateString()}</td>
                    <td className="text-right">
                      {b.resolved_at ? <Badge className="bg-emerald-500/15 text-emerald-700 text-[10px]"><CheckCircle2 size={10} className="mr-1" />Resolved</Badge>
                        : <Button size="sm" variant="ghost" onClick={() => resolveBroken(b.id)}>Mark resolved</Button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TabsContent>

        <TabsContent value="drift" className="space-y-2 mt-4">
          {drift.length === 0 ? <p className="text-sm text-muted-foreground py-12 text-center">No JSON-LD schema changes detected in the latest 50 snapshots.</p> : (
            <table className="w-full text-sm border-collapse">
              <thead className="text-xs text-muted-foreground border-b"><tr className="text-left">
                <th className="py-2">URL</th><th>Hash (new)</th><th>Detected</th>
              </tr></thead>
              <tbody>
                {drift.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-muted/30">
                    <td className="py-2 text-xs"><a href={d.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{d.url}</a></td>
                    <td className="text-xs font-mono text-muted-foreground">{d.schema_hash.slice(0, 12)}…</td>
                    <td className="text-xs text-muted-foreground">{new Date(d.checked_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default SeoIntelligence;
