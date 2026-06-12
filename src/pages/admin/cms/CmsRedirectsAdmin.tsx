import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Row { id: string; from_path: string; to_path: string; status_code: number; is_active: boolean; notes: string | null; }

export default function CmsRedirectsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [draft, setDraft] = useState({ from_path: "", to_path: "", status_code: 301 });

  const load = async () => {
    const { data } = await supabase.from("cms_redirects").select("*").order("from_path");
    setRows((data ?? []) as Row[]);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!draft.from_path || !draft.to_path) return;
    const { error } = await supabase.from("cms_redirects").insert(draft);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { setDraft({ from_path: "", to_path: "", status_code: 301 }); load(); toast({ title: "Redirect added" }); }
  };

  const update = async (r: Row, patch: Partial<Row>) => {
    await supabase.from("cms_redirects").update(patch).eq("id", r.id);
    load();
  };

  const remove = async (r: Row) => {
    if (!confirm(`Delete redirect ${r.from_path}?`)) return;
    await supabase.from("cms_redirects").delete().eq("id", r.id); load();
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Redirects</h1>
      <p className="text-muted-foreground text-sm mb-6 font-heading">Set up 301/302 URL redirects.</p>

      <div className="bg-card border border-border rounded-xl p-4 mb-6 grid md:grid-cols-[2fr_2fr_auto_auto] gap-3 items-end">
        <div><Label>From</Label><Input placeholder="/old-path" value={draft.from_path} onChange={(e) => setDraft({ ...draft, from_path: e.target.value })} /></div>
        <div><Label>To</Label><Input placeholder="/new-path" value={draft.to_path} onChange={(e) => setDraft({ ...draft, to_path: e.target.value })} /></div>
        <div><Label>Code</Label>
          <Select value={String(draft.status_code)} onValueChange={(v) => setDraft({ ...draft, status_code: Number(v) })}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="301">301</SelectItem><SelectItem value="302">302</SelectItem><SelectItem value="307">307</SelectItem><SelectItem value="308">308</SelectItem></SelectContent>
          </Select>
        </div>
        <Button onClick={add}><Plus size={14} className="mr-2" />Add</Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr><th className="p-3">From</th><th className="p-3">To</th><th className="p-3">Code</th><th className="p-3">Active</th><th className="p-3"></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-3 font-mono text-xs">{r.from_path}</td>
                <td className="p-3 font-mono text-xs">{r.to_path}</td>
                <td className="p-3">{r.status_code}</td>
                <td className="p-3"><Switch checked={r.is_active} onCheckedChange={(v) => update(r, { is_active: v })} /></td>
                <td className="p-3 text-right"><button onClick={() => remove(r)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-muted-foreground">No redirects yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
