/* <!-- WIX: PROTOTYPE ONLY — Manage Pura Ambassadors via Wix CMS collection 'Ambassadors' instead. --> */
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Award, Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";

interface Ambassador {
  id: string;
  name: string;
  tagline: string | null;
  referral_count: number;
  photo_url: string | null;
  instagram_url: string | null;
  accent_from: string | null;
  accent_to: string | null;
  sort_order: number;
  is_published: boolean;
}

const empty: Omit<Ambassador, "id"> = {
  name: "",
  tagline: "",
  referral_count: 0,
  photo_url: "",
  instagram_url: "",
  accent_from: "from-primary",
  accent_to: "to-secondary",
  sort_order: 0,
  is_published: true,
};

const AmbassadorsAdmin = () => {
  const [list, setList] = useState<Ambassador[]>([]);
  const [editing, setEditing] = useState<Ambassador | null>(null);
  const [draft, setDraft] = useState<Omit<Ambassador, "id">>(empty);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("ambassadors")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast({ title: "Could not load", description: error.message, variant: "destructive" });
    setList((data as Ambassador[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (a: Ambassador) => {
    setEditing(a);
    setDraft({ ...a });
  };

  const startNew = () => {
    setEditing(null);
    setDraft(empty);
  };

  const save = async () => {
    if (!draft.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    setLoading(true);
    const payload = {
      ...draft,
      tagline: draft.tagline || null,
      photo_url: draft.photo_url || null,
      instagram_url: draft.instagram_url || null,
    };
    const { error } = editing
      ? await supabase.from("ambassadors").update(payload).eq("id", editing.id)
      : await supabase.from("ambassadors").insert(payload);
    setLoading(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Updated" : "Created", description: draft.name });
    setEditing(null);
    setDraft(empty);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this ambassador?")) return;
    const { error } = await supabase.from("ambassadors").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted" });
    load();
  };

  const togglePublish = async (a: Ambassador) => {
    await supabase.from("ambassadors").update({ is_published: !a.is_published }).eq("id", a.id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-3xl font-bold flex items-center gap-2">
          <Award size={26} className="text-primary" /> Ambassadors
        </h1>
        <button onClick={startNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-heading font-semibold">
          <Plus size={14} /> New Ambassador
        </button>
      </div>
      <p className="text-muted-foreground text-sm font-heading mb-6">
        Manage the public Hall of Pura wall on /refer. Sorted by display order.
      </p>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        <div className="space-y-3">
          {list.map(a => (
            <div key={a.id} className={`bg-card rounded-xl p-5 border transition-colors ${editing?.id === a.id ? "border-primary" : "border-border"}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-heading font-semibold text-sm">{a.name}</p>
                  <p className="text-xs text-muted-foreground">Order: {a.sort_order} · {a.referral_count} referrals</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => togglePublish(a)} className="p-1.5 rounded-lg hover:bg-muted" title={a.is_published ? "Unpublish" : "Publish"}>
                    {a.is_published ? <Eye size={14} className="text-primary" /> : <EyeOff size={14} className="text-muted-foreground" />}
                  </button>
                  <button onClick={() => startEdit(a)} className="px-3 py-1 rounded-lg text-xs font-heading bg-muted hover:bg-muted/80">Edit</button>
                  <button onClick={() => remove(a.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {a.tagline && <p className="text-xs text-muted-foreground italic">"{a.tagline}"</p>}
            </div>
          ))}
          {list.length === 0 && (
            <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-border">
              <Award size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-heading">No ambassadors yet</p>
            </div>
          )}
        </div>

        <div className="bg-card rounded-xl p-6 border border-border h-fit sticky top-8 space-y-3">
          <h3 className="font-heading font-bold text-lg mb-2">{editing ? "Edit" : "New"} Ambassador</h3>

          <Field label="Name *">
            <input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Tagline">
            <input value={draft.tagline ?? ""} onChange={e => setDraft({ ...draft, tagline: e.target.value })} placeholder="What makes them iconic" className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Referrals">
              <input type="number" value={draft.referral_count} onChange={e => setDraft({ ...draft, referral_count: Number(e.target.value) })} className={inputCls} />
            </Field>
            <Field label="Sort order">
              <input type="number" value={draft.sort_order} onChange={e => setDraft({ ...draft, sort_order: Number(e.target.value) })} className={inputCls} />
            </Field>
          </div>
          <Field label="Photo URL">
            <input value={draft.photo_url ?? ""} onChange={e => setDraft({ ...draft, photo_url: e.target.value })} placeholder="https://..." className={inputCls} />
          </Field>
          <Field label="Instagram URL">
            <input value={draft.instagram_url ?? ""} onChange={e => setDraft({ ...draft, instagram_url: e.target.value })} placeholder="https://instagram.com/..." className={inputCls} />
          </Field>
          <label className="flex items-center gap-2 text-sm font-heading">
            <input type="checkbox" checked={draft.is_published} onChange={e => setDraft({ ...draft, is_published: e.target.checked })} />
            Published
          </label>

          <div className="flex gap-2 pt-2">
            <button onClick={save} disabled={loading} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-heading font-semibold disabled:opacity-60">
              <Save size={14} /> {loading ? "Saving…" : "Save"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setDraft(empty); }} className="px-4 py-2.5 rounded-lg text-sm font-heading bg-muted">Cancel</button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const inputCls = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-heading font-semibold mb-1.5 text-muted-foreground">{label}</label>
    {children}
  </div>
);

export default AmbassadorsAdmin;
