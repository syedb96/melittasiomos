/* <!-- WIX: PROTOTYPE ONLY — Manage Pura Ambassadors via Wix CMS collection 'Ambassadors' instead. --> */
import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Award, Plus, Trash2, Save, Eye, EyeOff, Upload, Loader2, Inbox, CheckCircle2, XCircle } from "lucide-react";

type AppStatus = "pending" | "approved" | "rejected";

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
  application_status: AppStatus;
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
  application_status: "approved",
};

const statusBadge: Record<AppStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

const AmbassadorsAdmin = () => {
  const [list, setList] = useState<Ambassador[]>([]);
  const [editing, setEditing] = useState<Ambassador | null>(null);
  const [draft, setDraft] = useState<Omit<Ambassador, "id">>(empty);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<"all" | AppStatus>("all");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    let q = supabase.from("ambassadors").select("*").order("sort_order", { ascending: true });
    if (filter !== "all") q = q.eq("application_status", filter);
    const { data, error } = await q;
    if (error) toast({ title: "Could not load", description: error.message, variant: "destructive" });
    setList((data as Ambassador[]) ?? []);
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [filter]);

  const pendingCount = list.filter(a => a.application_status === "pending").length;

  const startEdit = (a: Ambassador) => {
    setEditing(a);
    setDraft({ ...a });
  };

  const startNew = () => {
    setEditing(null);
    setDraft(empty);
  };

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Max 5MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("ambassadors").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (upErr) {
      setUploading(false);
      toast({ title: "Upload failed", description: upErr.message, variant: "destructive" });
      return;
    }
    const { data } = supabase.storage.from("ambassadors").getPublicUrl(path);
    setDraft(d => ({ ...d, photo_url: data.publicUrl }));
    setUploading(false);
    toast({ title: "Photo uploaded" });
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

  const setStatus = async (a: Ambassador, status: AppStatus) => {
    const updates: Partial<Ambassador> = { application_status: status };
    // Auto-publish on approve, auto-unpublish on reject
    if (status === "approved") updates.is_published = true;
    if (status === "rejected") updates.is_published = false;
    const { error } = await supabase.from("ambassadors").update(updates).eq("id", a.id);
    if (error) {
      toast({ title: "Could not update", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Marked as ${status}` });
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-3xl font-bold flex items-center gap-2">
          <Award size={26} className="text-primary" /> Ambassadors
          {pendingCount > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 text-xs font-heading font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              <Inbox size={11} /> {pendingCount} pending
            </span>
          )}
        </h1>
        <button onClick={startNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-heading font-semibold">
          <Plus size={14} /> New Ambassador
        </button>
      </div>
      <p className="text-muted-foreground text-sm font-heading mb-4">
        Manage the public Hall of Pura wall on /refer. New applications land here as <strong>Pending</strong> — only <strong>Approved + Published</strong> rows show on the public site.
      </p>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "pending", "approved", "rejected"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold capitalize border transition-colors ${
              filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-muted"
            }`}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        <div className="space-y-3">
          {list.map(a => (
            <div key={a.id} className={`bg-card rounded-xl p-5 border transition-colors ${editing?.id === a.id ? "border-primary" : "border-border"}`}>
              <div className="flex items-start justify-between mb-2 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {a.photo_url ? (
                    <img src={a.photo_url} alt={a.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-sm truncate">{a.name}</p>
                    <p className="text-xs text-muted-foreground">Order: {a.sort_order} · {a.referral_count} referrals</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${statusBadge[a.application_status]}`}>
                    {a.application_status}
                  </span>
                  <button onClick={() => togglePublish(a)} className="p-1.5 rounded-lg hover:bg-muted" title={a.is_published ? "Unpublish" : "Publish"}>
                    {a.is_published ? <Eye size={14} className="text-primary" /> : <EyeOff size={14} className="text-muted-foreground" />}
                  </button>
                  <button onClick={() => startEdit(a)} className="px-3 py-1 rounded-lg text-xs font-heading bg-muted hover:bg-muted/80">Edit</button>
                  <button onClick={() => remove(a.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {a.tagline && <p className="text-xs text-muted-foreground italic mb-2">"{a.tagline}"</p>}
              {a.application_status === "pending" && (
                <div className="flex gap-2 pt-2 border-t border-border/60">
                  <button
                    onClick={() => setStatus(a, "approved")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 text-white text-xs font-heading font-semibold py-1.5 rounded-lg hover:opacity-90"
                  >
                    <CheckCircle2 size={12} /> Approve & Publish
                  </button>
                  <button
                    onClick={() => setStatus(a, "rejected")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-rose-600 text-white text-xs font-heading font-semibold py-1.5 rounded-lg hover:opacity-90"
                  >
                    <XCircle size={12} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
          {list.length === 0 && (
            <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-border">
              <Award size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-heading">No ambassadors {filter !== "all" ? `with status "${filter}"` : "yet"}</p>
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

          <Field label="Photo">
            <div className="space-y-2">
              {draft.photo_url && (
                <img src={draft.photo_url} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-border" />
              )}
              <div className="flex gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-background text-xs font-heading font-semibold hover:bg-muted disabled:opacity-60"
                >
                  {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                  {uploading ? "Uploading…" : draft.photo_url ? "Replace photo" : "Upload photo"}
                </button>
                {draft.photo_url && (
                  <button
                    type="button"
                    onClick={() => setDraft({ ...draft, photo_url: "" })}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-xs font-heading hover:bg-muted"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                value={draft.photo_url ?? ""}
                onChange={e => setDraft({ ...draft, photo_url: e.target.value })}
                placeholder="…or paste an image URL"
                className={inputCls}
              />
            </div>
          </Field>

          <Field label="Instagram URL">
            <input value={draft.instagram_url ?? ""} onChange={e => setDraft({ ...draft, instagram_url: e.target.value })} placeholder="https://instagram.com/..." className={inputCls} />
          </Field>

          <Field label="Application status">
            <select
              value={draft.application_status}
              onChange={e => setDraft({ ...draft, application_status: e.target.value as AppStatus })}
              className={inputCls}
            >
              <option value="pending">Pending review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </Field>

          <label className="flex items-center gap-2 text-sm font-heading">
            <input type="checkbox" checked={draft.is_published} onChange={e => setDraft({ ...draft, is_published: e.target.checked })} />
            Published (only Approved + Published rows show on /refer)
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
