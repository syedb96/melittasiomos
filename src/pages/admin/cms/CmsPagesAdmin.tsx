/* CMS Pages list */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Row { id: string; slug: string; title: string; status: string; updated_at: string; page_type: string; }

const STATUS_COLOR: Record<string, string> = { published: "bg-green-500/20 text-green-700", draft: "bg-muted text-muted-foreground", scheduled: "bg-amber-500/20 text-amber-700", archived: "bg-zinc-500/20 text-zinc-700" };

export default function CmsPagesAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("cms_pages").select("id,slug,title,status,updated_at,page_type").order("updated_at", { ascending: false });
    setRows((data ?? []) as Row[]); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = rows.filter((r) => !q || r.title.toLowerCase().includes(q.toLowerCase()) || r.slug.toLowerCase().includes(q.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground text-sm font-heading">Create and manage every page on your website.</p>
        </div>
        <Button asChild><Link to="/admin/cms/pages/new"><Plus size={16} className="mr-2" />New Page</Link></Button>
      </div>

      <div className="relative mb-4 max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title or slug…" className="pl-9" />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="p-3 font-heading">Title</th>
              <th className="p-3 font-heading">Slug</th>
              <th className="p-3 font-heading">Type</th>
              <th className="p-3 font-heading">Status</th>
              <th className="p-3 font-heading">Updated</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading…</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan={6} className="p-12 text-center">
              <FileText className="mx-auto mb-3 text-muted-foreground" size={32} />
              <p className="text-muted-foreground mb-4">No pages yet. Create your first one.</p>
              <Button asChild><Link to="/admin/cms/pages/new"><Plus size={16} className="mr-2" />New Page</Link></Button>
            </td></tr>}
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-3 font-heading font-semibold">
                  <Link to={`/admin/cms/pages/${r.id}`} className="hover:text-primary">{r.title}</Link>
                </td>
                <td className="p-3 text-muted-foreground font-mono text-xs">/{r.slug}</td>
                <td className="p-3 text-muted-foreground capitalize">{r.page_type}</td>
                <td className="p-3"><Badge className={STATUS_COLOR[r.status]}>{r.status}</Badge></td>
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
