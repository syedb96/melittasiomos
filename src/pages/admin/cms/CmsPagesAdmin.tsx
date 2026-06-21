/* CMS Pages list with bulk actions, workflow status, freshness, Wix sync */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, FileText, ExternalLink, Calendar, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BulkActionsBar from "@/components/admin/cms/BulkActionsBar";

interface Row {
  id: string; slug: string; title: string; status: string; updated_at: string; page_type: string;
  wix_sync_status?: string; wix_synced_at?: string; tags?: string[]; city?: string; topic?: string;
  seo_score?: number; workflow_status?: string; review_date?: string | null; published_at?: string | null;
  publish_gate?: { ok?: boolean; criticalFailures?: number } | null;
}

const STATUS_COLOR: Record<string, string> = { published: "bg-green-500/20 text-green-700", draft: "bg-muted text-muted-foreground", scheduled: "bg-amber-500/20 text-amber-700", archived: "bg-zinc-500/20 text-zinc-700" };
const WORKFLOW_COLOR: Record<string, string> = {
  idea: "bg-zinc-500/15 text-zinc-700", brief: "bg-blue-500/15 text-blue-700", draft: "bg-muted text-muted-foreground",
  editing: "bg-indigo-500/15 text-indigo-700", review: "bg-purple-500/15 text-purple-700",
  scheduled: "bg-amber-500/15 text-amber-700", published: "bg-green-500/15 text-green-700",
  update_required: "bg-orange-500/20 text-orange-700", archived: "bg-zinc-500/20 text-zinc-700",
};

function freshnessOf(r: Row): "fresh" | "review_soon" | "outdated" | null {
  if (r.review_date) {
    const rd = new Date(r.review_date + "T00:00:00").getTime();
    const now = Date.now();
    if (rd < now) return "outdated";
    if (rd < now + 30 * 86400e3) return "review_soon";
    return "fresh";
  }
  if (r.published_at) {
    const ageDays = (Date.now() - new Date(r.published_at).getTime()) / 86400e3;
    if (ageDays > 365) return "outdated";
    if (ageDays > 180) return "review_soon";
    return "fresh";
  }
  return null;
}
const FRESH_COLOR: Record<string, string> = { fresh: "bg-green-500/15 text-green-700", review_soon: "bg-amber-500/15 text-amber-700", outdated: "bg-destructive/15 text-destructive" };

const WixBadge = ({ status }: { status?: string }) => {
  if (status === "synced") return <Badge className="bg-green-500/20 text-green-700"><CheckCircle2 size={10} className="mr-1" />Wix</Badge>;
  if (status === "error") return <Badge className="bg-destructive/20 text-destructive"><AlertCircle size={10} className="mr-1" />Wix err</Badge>;
  return <Badge variant="outline" className="text-muted-foreground"><RefreshCw size={10} className="mr-1" />pending</Badge>;
};

export default function CmsPagesAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [workflowFilter, setWorkflowFilter] = useState<string>("all");
  const [freshFilter, setFreshFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("cms_pages").select("id,slug,title,status,updated_at,page_type,wix_sync_status,wix_synced_at,tags,city,topic,seo_score,workflow_status,review_date,published_at,publish_gate").order("updated_at", { ascending: false });
    setRows((data ?? []) as Row[]); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => rows.filter((r) => {
    if (q && !(r.title.toLowerCase().includes(q.toLowerCase()) || r.slug.toLowerCase().includes(q.toLowerCase()) || (r.tags || []).some((t) => t.toLowerCase().includes(q.toLowerCase())))) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (workflowFilter !== "all" && (r.workflow_status || "draft") !== workflowFilter) return false;
    if (freshFilter !== "all" && freshnessOf(r) !== freshFilter) return false;
    return true;
  }), [rows, q, statusFilter, workflowFilter, freshFilter]);

  const toggle = (id: string) => { const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };
  const toggleAll = () => { setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map((r) => r.id))); };

  const counts = useMemo(() => {
    const fresh = { fresh: 0, review_soon: 0, outdated: 0 };
    rows.forEach((r) => { const f = freshnessOf(r); if (f) (fresh as any)[f]++; });
    return fresh;
  }, [rows]);

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Pages, Blog & Resources</h1>
          <p className="text-muted-foreground text-sm font-heading">Editorial pipeline · publishing gate · freshness tracking · Wix mirror.</p>
        </div>
        <Button asChild><Link to="/admin/cms/pages/new"><Plus size={16} className="mr-2" />New Page</Link></Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="border border-border rounded-xl p-4 bg-card"><p className="text-xs text-muted-foreground font-heading">Fresh</p><p className="text-2xl font-display font-bold text-green-600">{counts.fresh}</p></div>
        <div className="border border-border rounded-xl p-4 bg-card"><p className="text-xs text-muted-foreground font-heading">Review soon</p><p className="text-2xl font-display font-bold text-amber-600">{counts.review_soon}</p></div>
        <div className="border border-border rounded-xl p-4 bg-card"><p className="text-xs text-muted-foreground font-heading">Outdated</p><p className="text-2xl font-display font-bold text-destructive">{counts.outdated}</p></div>
      </div>

      {selected.size > 0 && (
        <BulkActionsBar selectedIds={Array.from(selected)} onClear={() => setSelected(new Set())} onDone={load} />
      )}

      <div className="flex gap-3 mb-4 items-center flex-wrap">
        <div className="relative max-w-md flex-1 min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, slug, or tag…" className="pl-9" />
        </div>
        <div className="flex gap-1 text-xs">
          {["all", "published", "scheduled", "draft", "archived"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-md font-heading capitalize ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{s}</button>
          ))}
        </div>
        <select value={workflowFilter} onChange={(e) => setWorkflowFilter(e.target.value)} className="text-xs px-2 py-1.5 rounded-md bg-muted text-muted-foreground border border-border font-heading">
          <option value="all">All workflow</option>
          {["idea","brief","draft","editing","review","scheduled","published","update_required","archived"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
        <select value={freshFilter} onChange={(e) => setFreshFilter(e.target.value)} className="text-xs px-2 py-1.5 rounded-md bg-muted text-muted-foreground border border-border font-heading">
          <option value="all">All freshness</option>
          <option value="fresh">Fresh</option>
          <option value="review_soon">Review soon</option>
          <option value="outdated">Outdated</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="p-3 w-10"><Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></th>
              <th className="p-3 font-heading">Title</th>
              <th className="p-3 font-heading">Status</th>
              <th className="p-3 font-heading">Workflow</th>
              <th className="p-3 font-heading">Freshness</th>
              <th className="p-3 font-heading">Gate</th>
              <th className="p-3 font-heading">SEO</th>
              <th className="p-3 font-heading">Wix</th>
              <th className="p-3 font-heading">Updated</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={10} className="p-8 text-center text-muted-foreground">Loading…</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan={10} className="p-12 text-center">
              <FileText className="mx-auto mb-3 text-muted-foreground" size={32} />
              <p className="text-muted-foreground mb-4">No pages match.</p>
              <Button asChild><Link to="/admin/cms/pages/new"><Plus size={16} className="mr-2" />New Page</Link></Button>
            </td></tr>}
            {filtered.map((r) => {
              const fresh = freshnessOf(r);
              const wf = r.workflow_status || "draft";
              const gateFail = r.publish_gate && r.publish_gate.ok === false ? (r.publish_gate.criticalFailures ?? 0) : 0;
              return (
                <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-3"><Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} /></td>
                  <td className="p-3 font-heading font-semibold">
                    <Link to={`/admin/cms/pages/${r.id}`} className="hover:text-primary">{r.title}</Link>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">/{r.slug}</p>
                  </td>
                  <td className="p-3"><Badge className={STATUS_COLOR[r.status]}>{r.status}</Badge></td>
                  <td className="p-3"><Badge className={WORKFLOW_COLOR[wf]}>{wf.replace("_", " ")}</Badge></td>
                  <td className="p-3">{fresh ? <Badge className={FRESH_COLOR[fresh]}>{fresh.replace("_", " ")}</Badge> : <span className="text-muted-foreground text-xs">—</span>}</td>
                  <td className="p-3 text-xs">{gateFail > 0 ? <span className="text-destructive font-semibold">{gateFail} blocker{gateFail !== 1 ? "s" : ""}</span> : r.publish_gate ? <span className="text-green-600">OK</span> : <span className="text-muted-foreground">—</span>}</td>
                  <td className="p-3 text-xs">{r.seo_score != null ? <span className={r.seo_score >= 85 ? "text-green-600 font-semibold" : r.seo_score >= 65 ? "text-amber-500" : "text-destructive"}>{r.seo_score}</span> : <span className="text-muted-foreground">—</span>}</td>
                  <td className="p-3"><WixBadge status={r.wix_sync_status} /></td>
                  <td className="p-3 text-muted-foreground text-xs flex items-center gap-1"><Calendar size={12} />{new Date(r.updated_at).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    {r.status === "published" && <a href={`/${r.slug}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary inline-flex"><ExternalLink size={14} /></a>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
