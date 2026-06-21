/* Testimonials — moderation queue + library + rotation control. */
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Eye, EyeOff, Plus, Edit2, CheckCircle2, XCircle, ShieldCheck, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface T {
  id: string;
  person_name: string;
  context_label: string | null;
  quote: string;
  rating: number;
  source_type: string;
  platform: "google" | "personal";
  source_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  moderation_status: "pending" | "approved" | "rejected";
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  submitted_at: string | null;
  moderation_note: string | null;
  verified_at: string | null;
  rotation_rank: number;
  created_at: string;
}

const empty: Partial<T> = {
  person_name: "", context_label: "", quote: "", rating: 5,
  source_type: "direct", platform: "personal", source_url: "",
  is_featured: false, is_published: false, moderation_status: "approved", rotation_rank: 0,
};

const isGoogleReviewUrl = (url: string | null) =>
  !!url && /(^|\.)google\.[a-z.]+\//i.test(url);

const TestimonialsAdmin = () => {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<Partial<T> | null>(null);
  const [tab, setTab] = useState("pending");

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems((data as any) ?? []);
  };
  useEffect(() => { load(); }, []);

  const pending = useMemo(() => items.filter((t) => t.moderation_status === "pending"), [items]);
  const approved = useMemo(() => items.filter((t) => t.moderation_status === "approved"), [items]);
  const rejected = useMemo(() => items.filter((t) => t.moderation_status === "rejected"), [items]);

  const save = async () => {
    if (!editing?.person_name || !editing.quote) { toast.error("Name and quote required"); return; }
    if (editing.platform === "google" && !editing.source_url?.trim()) {
      toast.error("Google-platform reviews need a source URL"); return;
    }
    const payload: any = { ...editing, source_url: editing.source_url?.trim() || null };
    if (editing.id) {
      const { id, ...rest } = payload;
      const { error } = await supabase.from("testimonials").update(rest).eq("id", id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { id, ...rest } = payload;
      const { error } = await supabase.from("testimonials").insert(rest);
      if (error) { toast.error(error.message); return; }
    }
    toast.success("Saved"); setEditing(null); load();
  };

  const setStatus = async (id: string, moderation_status: "approved" | "rejected", moderation_note?: string) => {
    const patch: any = { moderation_status, moderation_note: moderation_note ?? null };
    // Auto-publish on approval (admins can later unpublish)
    if (moderation_status === "approved") patch.is_published = true;
    if (moderation_status === "rejected") patch.is_published = false;
    const { error } = await supabase.from("testimonials").update(patch).eq("id", id);
    if (error) { toast.error(error.message); return; }
    load();
  };

  const verify = async (t: T) => {
    if (!isGoogleReviewUrl(t.source_url)) {
      toast.error("Source URL must be on a Google domain to verify");
      return;
    }
    await supabase.from("testimonials").update({ verified_at: new Date().toISOString(), platform: "google" }).eq("id", t.id);
    toast.success("Marked as Google-verified");
    load();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ is_published: !current }).eq("id", id);
    load();
  };
  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ is_featured: !current }).eq("id", id);
    load();
  };
  const nudgeRank = async (t: T, dir: 1 | -1) => {
    await supabase.from("testimonials").update({ rotation_rank: t.rotation_rank + dir }).eq("id", t.id);
    load();
  };

  const Card = ({ t, mode }: { t: T; mode: "pending" | "library" | "rejected" }) => (
    <div className="bg-card rounded-xl p-4 border border-border space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-heading font-semibold text-sm">{t.person_name}</p>
            {t.platform === "google" && <Badge className="bg-primary text-primary-foreground text-[10px]">Google ⭐</Badge>}
            {t.verified_at && <Badge className="bg-emerald-500/15 text-emerald-700 text-[10px]"><ShieldCheck size={10} className="mr-1" />Verified</Badge>}
            {t.is_featured && <Badge className="bg-amber-500/15 text-amber-700 text-[10px]"><Star size={10} className="mr-1 fill-current" />Featured</Badge>}
            {t.context_label && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t.context_label}</span>}
          </div>
          <div className="flex gap-0.5 mb-1">{Array(t.rating).fill(0).map((_, i) => <Star key={i} size={10} className="fill-primary text-primary" />)}</div>
          <p className="text-muted-foreground text-sm italic">"{t.quote}"</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            {t.submitted_at ? `Submitted ${new Date(t.submitted_at).toLocaleString()}` : `Created ${new Date(t.created_at).toLocaleDateString()}`}
            {t.submitted_by_email && <> · <a className="hover:underline" href={`mailto:${t.submitted_by_email}`}>{t.submitted_by_email}</a></>}
            {t.source_url && <> · <a className="hover:underline inline-flex items-center gap-0.5" href={t.source_url} target="_blank" rel="noreferrer">source<ExternalLink size={9} /></a></>}
          </p>
          {t.moderation_note && <p className="text-[11px] mt-1 text-muted-foreground">Note: {t.moderation_note}</p>}
        </div>
      </div>

      {mode === "pending" && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <Button size="sm" onClick={() => setStatus(t.id, "approved")}><CheckCircle2 size={14} className="mr-1" />Approve &amp; publish</Button>
          <Button size="sm" variant="outline" onClick={() => {
            const note = prompt("Reason for rejection (visible to admins):") ?? "";
            setStatus(t.id, "rejected", note);
          }}><XCircle size={14} className="mr-1" />Reject</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(t)}>Edit before approve</Button>
        </div>
      )}
      {mode === "library" && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t items-center">
          <Button size="sm" variant="outline" onClick={() => togglePublish(t.id, t.is_published)}>
            {t.is_published ? <><Eye size={14} className="mr-1" />Published</> : <><EyeOff size={14} className="mr-1" />Hidden</>}
          </Button>
          <Button size="sm" variant="outline" onClick={() => toggleFeatured(t.id, t.is_featured)}>
            <Star size={14} className={`mr-1 ${t.is_featured ? "fill-current" : ""}`} />{t.is_featured ? "Unfeature" : "Feature"}
          </Button>
          {isGoogleReviewUrl(t.source_url) && !t.verified_at && (
            <Button size="sm" variant="outline" onClick={() => verify(t)}><ShieldCheck size={14} className="mr-1" />Verify Google</Button>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-[10px] text-muted-foreground">Rotation rank: <strong>{t.rotation_rank}</strong></span>
            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => nudgeRank(t, +1)}><ArrowUp size={12} /></Button>
            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => nudgeRank(t, -1)}><ArrowDown size={12} /></Button>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setEditing(t)}><Edit2 size={14} /></Button>
        </div>
      )}
      {mode === "rejected" && (
        <div className="flex gap-2 pt-2 border-t">
          <Button size="sm" variant="outline" onClick={() => setStatus(t.id, "approved")}><CheckCircle2 size={14} className="mr-1" />Approve instead</Button>
        </div>
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground text-sm font-heading">Moderation queue, library, and rotation. Public submissions arrive in <strong>Pending</strong>.</p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}><Plus size={14} className="mr-1" />Add manually</Button>
      </div>

      {editing && (
        <div className="bg-card rounded-xl p-5 border border-border mb-6 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div><Label>Name</Label><Input value={editing.person_name ?? ""} onChange={(e) => setEditing({ ...editing, person_name: e.target.value })} /></div>
            <div><Label>Context (e.g. Beginner, Wedding Couple)</Label><Input value={editing.context_label ?? ""} onChange={(e) => setEditing({ ...editing, context_label: e.target.value })} /></div>
            <div><Label>Rating</Label>
              <Select value={String(editing.rating ?? 5)} onValueChange={(v) => setEditing({ ...editing, rating: Number(v) })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{[5,4,3,2,1].map((r) => <SelectItem key={r} value={String(r)}>{r} stars</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Platform</Label>
              <Select value={editing.platform ?? "personal"} onValueChange={(v: any) => setEditing({ ...editing, platform: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal — Student Story</SelectItem>
                  <SelectItem value="google">Google — requires source URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2"><Label>Source URL {editing.platform === "google" && <span className="text-primary text-[10px]">required for Google</span>}</Label>
              <Input value={editing.source_url ?? ""} onChange={(e) => setEditing({ ...editing, source_url: e.target.value })} placeholder="https://www.google.com/maps/..." />
            </div>
          </div>
          <div><Label>Quote</Label><Textarea value={editing.quote ?? ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} rows={3} /></div>
          <div className="flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending {pending.length > 0 && <Badge className="ml-2 bg-destructive text-destructive-foreground">{pending.length}</Badge>}</TabsTrigger>
          <TabsTrigger value="library">Library ({approved.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-3 mt-4">
          {pending.length === 0 ? <p className="text-sm text-muted-foreground text-center py-12">No pending submissions.</p>
            : pending.map((t) => <Card key={t.id} t={t} mode="pending" />)}
        </TabsContent>
        <TabsContent value="library" className="space-y-3 mt-4">
          {approved.sort((a, b) => b.rotation_rank - a.rotation_rank).map((t) => <Card key={t.id} t={t} mode="library" />)}
        </TabsContent>
        <TabsContent value="rejected" className="space-y-3 mt-4">
          {rejected.length === 0 ? <p className="text-sm text-muted-foreground text-center py-12">No rejected submissions.</p>
            : rejected.map((t) => <Card key={t.id} t={t} mode="rejected" />)}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default TestimonialsAdmin;
