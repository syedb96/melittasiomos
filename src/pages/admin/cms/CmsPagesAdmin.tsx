/* CMS Pages list with bulk actions + Wix sync status */
import { useEffect, useState } from "react";
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
  seo_score?: number;
}

const STATUS_COLOR: Record<string, string> = { published: "bg-green-500/20 text-green-700", draft: "bg-muted text-muted-foreground", scheduled: "bg-amber-500/20 text-amber-700", archived: "bg-zinc-500/20 text-zinc-700" };

const WixBadge = ({ status }: { status?: string }) => {
  if (status === "synced") return <Badge className="bg-green-500/20 text-green-700"><CheckCircle2 size={10} className="mr-1" />Wix</Badge>;
  if (status === "error") return <Badge className="bg-destructive/20 text-destructive"><AlertCircle size={10} className="mr-1" />Wix err</Badge>;
  return <Badge variant="outline" className="text-muted-foreground"><RefreshCw size={10} className="mr-1" />pending</Badge>;
};

export default function CmsPagesAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("cms_pages").select("id,slug,title,status,updated_at,page_type,wix_sync_status,wix_synced_at,tags,city,topic,seo_score").order("updated_at", { ascending: false });
    setRows((data ?? []) as Row[]); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = rows.filter((r) =>
    (!q || r.title.toLowerCase().includes(q.toLowerCase()) || r.slug.toLowerCase().includes(q.toLowerCase()) || (r.tags || []).some((t) => t.toLowerCase().includes(q.toLowerCase()))) &&
    (statusFilter === "all" || r.status === statusFilter)
  );

  const toggle = (id: string) => { const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };
  const toggleAll = () => { setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map((r) => r.id))); };

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Pages & Blog</h1>
          <p className="text-muted-foreground text-sm font-heading">Create, manage, schedule, and mirror to Wix in bulk.</p>
        </div>
        <Button asChild><Link to="/admin/cms/pages/new"><Plus size={16} className="mr-2" />New Page</Link></Button>
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
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="p-3 w-10"><Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></th>
              <th className="p-3 font-heading">Title</th>
              <th className="p-3 font-heading">Status</th>
              <th className="p-3 font-heading">SEO</th>
              <th className="p-3 font-heading">Wix</th>
              <th className="p-3 font-heading">Tags</th>
              <th className="p-3 font-heading">Updated</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">Loading…</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan={8} className="p-12 text-center">
              <FileText className="mx-auto mb-3 text-muted-foreground" size={32} />
              <p className="text-muted-foreground mb-4">No pages match.</p>
              <Button asChild><Link to="/admin/cms/pages/new"><Plus size={16} className="mr-2" />New Page</Link></Button>
            </td></tr>}
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-3"><Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} /></td>
                <td className="p-3 font-heading font-semibold">
                  <Link to={`/admin/cms/pages/${r.id}`} className="hover:text-primary">{r.title}</Link>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">/{r.slug}</p>
                </td>
                <td className="p-3"><Badge className={STATUS_COLOR[r.status]}>{r.status}</Badge></td>
                <td className="p-3 text-xs">{r.seo_score != null ? <span className={r.seo_score >= 85 ? "text-green-600 font-semibold" : r.seo_score >= 65 ? "text-amber-500" : "text-destructive"}>{r.seo_score}</span> : <span className="text-muted-foreground">—</span>}</td>
                <td className="p-3"><WixBadge status={r.wix_sync_status} /></td>
                <td className="p-3 text-xs text-muted-foreground truncate max-w-[160px]">{(r.tags ?? []).slice(0, 3).join(", ")}</td>
                <td className="p-3 text-muted-foreground text-xs flex items-center gap-1"><Calendar size={12} />{new Date(r.updated_at).toLocaleDateString()}</td>
                <td className="p-3 text-right">
                  {r.status === "published" && <a href={`/${r.slug}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary inline-flex"><ExternalLink size={14} /></a>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
