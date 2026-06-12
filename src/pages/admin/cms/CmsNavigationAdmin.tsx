import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface Item { id: string; menu_key: string; label: string; url: string; sort_order: number; open_in_new_tab: boolean; is_active: boolean; }
const MENUS = ["header", "footer", "mobile"];

export default function CmsNavigationAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [menu, setMenu] = useState("header");
  const [draft, setDraft] = useState({ label: "", url: "" });

  const load = async () => {
    const { data } = await supabase.from("cms_navigation").select("*").order("menu_key").order("sort_order");
    setItems((data ?? []) as Item[]);
  };
  useEffect(() => { load(); }, []);

  const filtered = items.filter((i) => i.menu_key === menu).sort((a, b) => a.sort_order - b.sort_order);

  const add = async () => {
    if (!draft.label || !draft.url) return;
    const max = Math.max(0, ...filtered.map((i) => i.sort_order));
    await supabase.from("cms_navigation").insert({ ...draft, menu_key: menu, sort_order: max + 1 });
    setDraft({ label: "", url: "" }); load();
  };

  const update = async (i: Item, patch: Partial<Item>) => { await supabase.from("cms_navigation").update(patch).eq("id", i.id); load(); };
  const remove = async (i: Item) => { if (confirm("Remove?")) { await supabase.from("cms_navigation").delete().eq("id", i.id); load(); } };
  const move = async (i: Item, dir: -1 | 1) => {
    const list = filtered;
    const idx = list.findIndex((x) => x.id === i.id);
    const swap = list[idx + dir];
    if (!swap) return;
    await supabase.from("cms_navigation").update({ sort_order: swap.sort_order }).eq("id", i.id);
    await supabase.from("cms_navigation").update({ sort_order: i.sort_order }).eq("id", swap.id);
    load();
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Navigation</h1>
      <p className="text-muted-foreground text-sm mb-6 font-heading">Configure header, footer, and mobile menus.</p>

      <Tabs value={menu} onValueChange={setMenu}>
        <TabsList>{MENUS.map((m) => <TabsTrigger key={m} value={m} className="capitalize">{m}</TabsTrigger>)}</TabsList>
        {MENUS.map((m) => (
          <TabsContent key={m} value={m} className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4 grid md:grid-cols-[2fr_3fr_auto] gap-3 items-end">
              <div><Label>Label</Label><Input value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} placeholder="About" /></div>
              <div><Label>URL</Label><Input value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} placeholder="/about" /></div>
              <Button onClick={add}><Plus size={14} className="mr-2" />Add</Button>
            </div>

            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {filtered.map((i, idx) => (
                <div key={i.id} className="flex items-center gap-3 p-3">
                  <div className="flex flex-col">
                    <button disabled={idx === 0} onClick={() => move(i, -1)} className="text-muted-foreground hover:text-foreground disabled:opacity-30"><ArrowUp size={12} /></button>
                    <button disabled={idx === filtered.length - 1} onClick={() => move(i, 1)} className="text-muted-foreground hover:text-foreground disabled:opacity-30"><ArrowDown size={12} /></button>
                  </div>
                  <Input className="flex-1" value={i.label} onChange={(e) => update(i, { label: e.target.value })} />
                  <Input className="flex-1 font-mono text-xs" value={i.url} onChange={(e) => update(i, { url: e.target.value })} />
                  <div className="flex items-center gap-2"><Label className="text-xs">New tab</Label><Switch checked={i.open_in_new_tab} onCheckedChange={(v) => update(i, { open_in_new_tab: v })} /></div>
                  <div className="flex items-center gap-2"><Label className="text-xs">Active</Label><Switch checked={i.is_active} onCheckedChange={(v) => update(i, { is_active: v })} /></div>
                  <button onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                </div>
              ))}
              {filtered.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">No items in this menu yet.</p>}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </AdminLayout>
  );
}
