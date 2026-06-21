/* Enquiries CRM — pipeline with assignment, SLA chip, internal notes, priority. */
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MessageSquare, Search, X, Clock, AlertTriangle, CheckCircle2, Pin, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  source_page: string | null;
  status: string;
  priority: string;
  assigned_to: string | null;
  due_at: string | null;
  first_response_at: string | null;
  replied_at: string | null;
  closed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface EnquiryNote {
  id: string;
  enquiry_id: string;
  author_email: string | null;
  kind: string;
  content: string;
  pinned: boolean;
  created_at: string;
}

interface AdminProfile { user_id: string; email: string; full_name: string | null; role: string }

const STATUSES = ["all","new","in-progress","replied","archived","closed"] as const;
type StatusKey = (typeof STATUSES)[number];
const PRIORITIES = ["low","normal","high","urgent"] as const;

const statusColors: Record<string, string> = {
  new: "bg-destructive/10 text-destructive border-destructive/20",
  "in-progress": "bg-primary/10 text-primary border-primary/20",
  replied: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  archived: "bg-muted text-muted-foreground border-border",
  closed: "bg-muted text-muted-foreground border-border",
};

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  normal: "bg-sky-500/10 text-sky-700",
  high: "bg-amber-500/15 text-amber-700",
  urgent: "bg-destructive/15 text-destructive",
};

function slaChip(due: string | null, status: string) {
  if (!due || status === "replied" || status === "archived" || status === "closed") return null;
  const ms = new Date(due).getTime() - Date.now();
  const hours = Math.round(ms / 36e5);
  if (ms < 0) return <Badge variant="destructive" className="text-[10px]"><AlertTriangle size={10} className="mr-1" />Overdue {Math.abs(hours)}h</Badge>;
  if (hours < 6) return <Badge className="bg-amber-500/15 text-amber-700 text-[10px]"><Clock size={10} className="mr-1" />Due in {hours}h</Badge>;
  return <Badge variant="outline" className="text-[10px]"><Clock size={10} className="mr-1" />SLA {hours}h</Badge>;
}

const EnquiriesAdmin = () => {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [filter, setFilter] = useState<StatusKey>((params.get("status") as StatusKey) || "all");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState<EnquiryNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const load = async () => {
    let q = supabase.from("enquiries").select("*").order("updated_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setEnquiries((data as any) ?? []);
  };
  const loadAdmins = async () => {
    const { data } = await supabase.from("profiles").select("user_id,email,full_name,role").in("role", ["owner","admin","editor"]);
    setAdmins((data as any) ?? []);
  };
  const loadNotes = async (enquiryId: string) => {
    const { data } = await supabase.from("enquiry_notes").select("*").eq("enquiry_id", enquiryId).order("created_at", { ascending: false });
    setNotes((data as any) ?? []);
  };

  useEffect(() => { load(); }, [filter]);
  useEffect(() => { loadAdmins(); }, []);
  useEffect(() => {
    if (selected) loadNotes(selected.id);
    else setNotes([]);
  }, [selected?.id]);

  useEffect(() => {
    const next = new URLSearchParams(params);
    filter === "all" ? next.delete("status") : next.set("status", filter);
    query.trim() ? next.set("q", query.trim()) : next.delete("q");
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, query]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enquiries;
    return enquiries.filter((e) =>
      [e.name, e.email, e.phone ?? "", e.subject, e.message, e.source_page ?? ""].join(" ").toLowerCase().includes(q),
    );
  }, [enquiries, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { new: 0, "in-progress": 0, replied: 0, archived: 0, closed: 0, overdue: 0 };
    enquiries.forEach((e) => {
      c[e.status] = (c[e.status] ?? 0) + 1;
      if (e.due_at && new Date(e.due_at) < new Date() && !["replied","archived","closed"].includes(e.status)) c.overdue++;
    });
    return c;
  }, [enquiries]);

  const update = async (id: string, patch: Partial<Enquiry>) => {
    const { data, error } = await supabase.from("enquiries").update(patch).eq("id", id).select().single();
    if (error) { toast.error(error.message); return; }
    if (data) {
      setEnquiries((prev) => prev.map((e) => (e.id === id ? (data as any) : e)));
      if (selected?.id === id) {
        setSelected(data as any);
        loadNotes(id);
      }
    }
  };

  const addNote = async () => {
    if (!selected || !newNote.trim() || !user) return;
    setSavingNote(true);
    const { error } = await supabase.from("enquiry_notes").insert({
      enquiry_id: selected.id,
      author_id: user.id,
      author_email: user.email,
      kind: "note",
      content: newNote.trim(),
    });
    setSavingNote(false);
    if (error) { toast.error(error.message); return; }
    setNewNote("");
    loadNotes(selected.id);
  };

  const togglePin = async (note: EnquiryNote) => {
    await supabase.from("enquiry_notes").update({ pinned: !note.pinned }).eq("id", note.id);
    if (selected) loadNotes(selected.id);
  };

  const adminLabel = (uid: string | null) => {
    if (!uid) return "Unassigned";
    const a = admins.find((x) => x.user_id === uid);
    return a ? (a.full_name || a.email) : uid.slice(0, 8);
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Enquiries</h1>
      <p className="text-muted-foreground text-sm font-heading mb-4">
        Contact submissions with SLA, assignment, and internal notes. SLA: Urgent 4h · High/Wedding/Corporate 24h · Private 48h · Other 72h.
      </p>

      {counts.overdue > 0 && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-2 mb-4 text-sm flex items-center gap-2">
          <AlertTriangle size={14} />
          <strong>{counts.overdue}</strong> enquir{counts.overdue === 1 ? "y" : "ies"} past SLA.
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-colors ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
            }`}>
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            {s !== "all" && counts[s] != null && <span className="ml-1.5 opacity-70">{counts[s]}</span>}
          </button>
        ))}
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, subject, message…" className="pl-9 pr-9" />
        {query && <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X size={14} /></button>}
      </div>

      <div className="grid lg:grid-cols-[1fr_440px] gap-6">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-heading">{visible.length} of {enquiries.length}</p>
          {visible.map((e) => (
            <button key={e.id} onClick={() => setSelected(e)}
              className={`w-full text-left bg-card rounded-xl p-4 border transition-colors ${selected?.id === e.id ? "border-primary" : "border-border hover:border-primary/30"}`}>
              <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                <p className="font-heading font-semibold text-sm">{e.name}</p>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className={`text-[10px] ${priorityColors[e.priority] ?? ""}`}>{e.priority}</Badge>
                  {slaChip(e.due_at, e.status)}
                  <Badge variant="outline" className={`text-[10px] ${statusColors[e.status] ?? ""}`}>{e.status}</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{e.subject}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{e.message}</p>
              <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                <span>Updated {new Date(e.updated_at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                <span>→ {adminLabel(e.assigned_to)}</span>
              </div>
            </button>
          ))}
          {visible.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-heading">No enquiries{filter !== "all" ? ` with status "${filter}"` : ""}{query ? ` matching "${query}"` : ""}</p>
            </div>
          )}
        </div>

        {selected && (
          <div className="bg-card rounded-xl p-5 border border-border h-fit sticky top-8 space-y-4">
            <div>
              <h3 className="font-heading font-bold text-lg">{selected.name}</h3>
              <p className="text-xs text-muted-foreground">{selected.subject}</p>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2"><Mail size={14} className="text-primary" /><a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a></div>
              {selected.phone && <div className="flex items-center gap-2"><Phone size={14} className="text-primary" />{selected.phone}</div>}
              {selected.source_page && <p className="text-[10px] text-muted-foreground">From: {selected.source_page}</p>}
              {selected.first_response_at && <p className="text-[10px] text-emerald-700"><CheckCircle2 size={10} className="inline mr-1" />First response {new Date(selected.first_response_at).toLocaleString()}</p>}
            </div>

            <div className="bg-background rounded-lg p-3">
              <p className="text-sm whitespace-pre-wrap">{selected.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</label>
                <Select value={selected.status} onValueChange={(v) => update(selected.id, { status: v })}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.filter((s) => s !== "all").map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Priority</label>
                <Select value={selected.priority} onValueChange={(v) => update(selected.id, { priority: v })}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Assignee</label>
                <Select value={selected.assigned_to ?? "__none__"} onValueChange={(v) => update(selected.id, { assigned_to: v === "__none__" ? null : v })}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">Unassigned</SelectItem>
                    {admins.map((a) => <SelectItem key={a.user_id} value={a.user_id}>{a.full_name || a.email} · {a.role}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <p className="text-xs font-heading font-semibold mb-2 flex items-center justify-between">
                <span>Activity ({notes.length})</span>
                {selected.due_at && <span className="text-[10px] text-muted-foreground">Due {new Date(selected.due_at).toLocaleString()}</span>}
              </p>
              <div className="space-y-2 max-h-72 overflow-auto pr-1">
                {notes.length === 0 && <p className="text-[11px] text-muted-foreground italic">No notes yet.</p>}
                {[...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned)).map((n) => (
                  <div key={n.id} className={`text-xs rounded-lg p-2 border ${n.kind === "note" ? "bg-background border-border" : "bg-muted/40 border-transparent"}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-muted-foreground">
                        {n.kind !== "note" && <Badge variant="outline" className="text-[9px] mr-1">{n.kind.replace("_", " ")}</Badge>}
                        {n.author_email ?? "system"} · {new Date(n.created_at).toLocaleString()}
                      </span>
                      {n.kind === "note" && (
                        <button onClick={() => togglePin(n)} className={`text-muted-foreground hover:text-foreground ${n.pinned ? "text-primary" : ""}`} title={n.pinned ? "Unpin" : "Pin"}>
                          <Pin size={11} fill={n.pinned ? "currentColor" : "none"} />
                        </button>
                      )}
                    </div>
                    <p className="mt-1 whitespace-pre-wrap">{n.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add an internal note…" rows={2} className="text-xs" />
                <Button onClick={addNote} disabled={savingNote || !newNote.trim()} size="sm">
                  {savingNote ? <Loader2 size={12} className="animate-spin" /> : "Add"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EnquiriesAdmin;
