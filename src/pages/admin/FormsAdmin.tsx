import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Send, Plus, Trash2, RefreshCw } from "lucide-react";

interface FormCfg { id: string; slug: string; name: string; description: string | null; fields: any; submit_label: string; success_message: string; is_active: boolean; }
interface Route { id: string; form_slug: string; enquiry_type: string | null; template_name: string; recipient_email: string; cc_emails: string[]; send_user_confirmation: boolean; user_confirmation_template: string; escalation_minutes: number; is_active: boolean; }
interface LogRow { id: string; form_slug: string; enquiry_type: string | null; recipient_email: string; template_name: string; status: string; error_message: string | null; is_test: boolean; created_at: string; }
interface Submission { id: string; source: "contact" | "enquiry" | "taster"; name: string; email: string; subject: string | null; message: string | null; status: string | null; created_at: string; }

export default function FormsAdmin() {
  const [tab, setTab] = useState("inbox");

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <title>Forms &amp; Notifications | Admin</title>
      </>}
      {/* eslint-disable-next-line */}
      <div style={{ display: "none" }} />
      {(() => { if (typeof document !== "undefined") document.title = "Forms & Notifications | Admin"; return null; })()}
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold">Forms &amp; Notifications</h1>
        <p className="text-muted-foreground text-sm">Submission inbox · form schemas · routing rules · test-submission harness.</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="schema">Form Schemas</TabsTrigger>
          <TabsTrigger value="routes">Routing</TabsTrigger>
          <TabsTrigger value="test">Test Harness</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="mt-6"><InboxTab /></TabsContent>
        <TabsContent value="schema" className="mt-6"><SchemaTab /></TabsContent>
        <TabsContent value="routes" className="mt-6"><RoutesTab /></TabsContent>
        <TabsContent value="test" className="mt-6"><TestTab /></TabsContent>
      </Tabs>
    </div>
  );
}

// ────────────────────────── INBOX TAB ──────────────────────────
function InboxTab() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const [c, e, t] = await Promise.all([
      supabase.from("contact_submissions").select("id,name,email,message,created_at").order("created_at", { ascending: false }).limit(100),
      supabase.from("enquiries").select("id,name,email,subject,message,status,created_at").order("created_at", { ascending: false }).limit(100),
      supabase.from("free_taster_leads").select("id,name,email,created_at").order("created_at", { ascending: false }).limit(100),
    ]);
    const merged: Submission[] = [
      ...((c.data ?? []).map((r: any) => ({ id: r.id, source: "contact" as const, name: r.name, email: r.email, subject: null, message: r.message, status: null, created_at: r.created_at }))),
      ...((e.data ?? []).map((r: any) => ({ id: r.id, source: "enquiry" as const, name: r.name, email: r.email, subject: r.subject, message: r.message, status: r.status, created_at: r.created_at }))),
      ...((t.data ?? []).map((r: any) => ({ id: r.id, source: "taster" as const, name: r.name, email: r.email, subject: null, message: null, status: null, created_at: r.created_at }))),
    ].sort((a, b) => b.created_at.localeCompare(a.created_at));
    setRows(merged);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => rows.filter((r) =>
    (sourceFilter === "all" || r.source === sourceFilter) &&
    (q === "" || `${r.name} ${r.email} ${r.subject ?? ""} ${r.message ?? ""}`.toLowerCase().includes(q.toLowerCase()))
  ), [rows, sourceFilter, q]);

  const exportCsv = () => {
    const header = "source,name,email,subject,message,status,created_at\n";
    const csv = filtered.map((r) => [r.source, r.name, r.email, r.subject ?? "", (r.message ?? "").replace(/"/g, '""'), r.status ?? "", r.created_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([header + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Unified Submission Inbox</CardTitle>
        <div className="flex gap-2"><Button size="sm" variant="ghost" onClick={load}><RefreshCw className="h-4 w-4" /></Button><Button size="sm" variant="outline" onClick={exportCsv}>Export CSV</Button></div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-4">
          <Select value={sourceFilter} onValueChange={setSourceFilter}><SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">All sources</SelectItem><SelectItem value="contact">Contact</SelectItem><SelectItem value="enquiry">Enquiry</SelectItem><SelectItem value="taster">Taster</SelectItem></SelectContent>
          </Select>
          <Input placeholder="Search name / email / message…" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1" />
        </div>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider"><tr><th className="text-left p-2">Source</th><th className="text-left p-2">When</th><th className="text-left p-2">Name</th><th className="text-left p-2">Email</th><th className="text-left p-2">Subject</th><th className="text-left p-2">Status</th></tr></thead>
              <tbody>{filtered.slice(0, 200).map((r) => (
                <tr key={`${r.source}-${r.id}`} className="border-t hover:bg-muted/30">
                  <td className="p-2"><Badge variant="outline" className="text-[10px]">{r.source}</Badge></td>
                  <td className="p-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="p-2">{r.name}</td>
                  <td className="p-2 text-xs"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a></td>
                  <td className="p-2 text-xs truncate max-w-xs">{r.subject ?? r.message?.slice(0, 60) ?? "—"}</td>
                  <td className="p-2 text-xs">{r.status ?? "—"}</td>
                </tr>
              ))}</tbody>
            </table>
            {filtered.length === 0 && <p className="text-center text-muted-foreground text-sm p-6">No submissions match.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ────────────────────────── SCHEMA TAB ──────────────────────────
function SchemaTab() {
  const [forms, setForms] = useState<FormCfg[]>([]);
  const [sel, setSel] = useState<string>("");
  const current = forms.find((f) => f.slug === sel);

  const load = async () => {
    const { data } = await (supabase as any).from("forms_config").select("*").order("slug");
    setForms((data ?? []) as FormCfg[]);
    if (!sel && data?.length) setSel(data[0].slug);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!current) return;
    const { error } = await (supabase as any).from("forms_config").update({ name: current.name, description: current.description, fields: current.fields, submit_label: current.submit_label, success_message: current.success_message, is_active: current.is_active }).eq("id", current.id);
    if (error) toast.error(error.message); else { toast.success("Form saved"); load(); }
  };

  const updateField = (idx: number, patch: any) => {
    if (!current) return;
    const fields = [...(current.fields as any[])]; fields[idx] = { ...fields[idx], ...patch };
    setForms((f) => f.map((x) => x.id === current.id ? { ...x, fields } : x));
  };
  const addField = () => {
    if (!current) return;
    const fields = [...(current.fields as any[]), { name: `field_${Date.now()}`, label: "New field", type: "text", required: false, maxLength: 255 }];
    setForms((f) => f.map((x) => x.id === current.id ? { ...x, fields } : x));
  };
  const removeField = (idx: number) => {
    if (!current) return;
    const fields = (current.fields as any[]).filter((_, i) => i !== idx);
    setForms((f) => f.map((x) => x.id === current.id ? { ...x, fields } : x));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Form Schemas</CardTitle>
        <Select value={sel} onValueChange={setSel}><SelectTrigger className="w-56"><SelectValue placeholder="Pick a form" /></SelectTrigger>
          <SelectContent>{forms.map((f) => <SelectItem key={f.slug} value={f.slug}>{f.name}</SelectItem>)}</SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {!current ? <p className="text-muted-foreground text-sm">Loading…</p> : (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Form name</Label><Input value={current.name} onChange={(e) => setForms((f) => f.map((x) => x.id === current.id ? { ...x, name: e.target.value } : x))} /></div>
              <div><Label>Submit button label</Label><Input value={current.submit_label} onChange={(e) => setForms((f) => f.map((x) => x.id === current.id ? { ...x, submit_label: e.target.value } : x))} /></div>
              <div className="sm:col-span-2"><Label>Description (admin only)</Label><Input value={current.description ?? ""} onChange={(e) => setForms((f) => f.map((x) => x.id === current.id ? { ...x, description: e.target.value } : x))} /></div>
              <div className="sm:col-span-2"><Label>Success message</Label><Textarea rows={2} value={current.success_message} onChange={(e) => setForms((f) => f.map((x) => x.id === current.id ? { ...x, success_message: e.target.value } : x))} /></div>
              <div className="flex items-center gap-2"><Switch checked={current.is_active} onCheckedChange={(v) => setForms((f) => f.map((x) => x.id === current.id ? { ...x, is_active: v } : x))} /><Label>Active (hides form publicly when off)</Label></div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2"><h4 className="font-semibold text-sm">Fields</h4><Button size="sm" variant="outline" onClick={addField}><Plus className="h-3 w-3 mr-1" />Add field</Button></div>
              <div className="space-y-2">
                {(current.fields as any[]).map((f, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center p-2 border rounded">
                    <Input className="col-span-2" placeholder="name" value={f.name} onChange={(e) => updateField(i, { name: e.target.value })} />
                    <Input className="col-span-3" placeholder="label" value={f.label} onChange={(e) => updateField(i, { label: e.target.value })} />
                    <Select value={f.type} onValueChange={(v) => updateField(i, { type: v })}><SelectTrigger className="col-span-2"><SelectValue /></SelectTrigger><SelectContent>{["text","email","tel","textarea","select","date","number"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
                    <Input className="col-span-2" type="number" placeholder="max" value={f.maxLength ?? ""} onChange={(e) => updateField(i, { maxLength: e.target.value ? Number(e.target.value) : null })} />
                    <div className="col-span-2 flex items-center gap-1"><Switch checked={!!f.required} onCheckedChange={(v) => updateField(i, { required: v })} /><span className="text-xs">required</span></div>
                    <Button className="col-span-1" size="icon" variant="ghost" onClick={() => removeField(i)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={save}>Save changes</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ────────────────────────── ROUTES TAB ──────────────────────────
function RoutesTab() {
  const [rows, setRows] = useState<Route[]>([]);
  const load = async () => { const { data } = await (supabase as any).from("notification_routes").select("*").order("form_slug").order("enquiry_type"); setRows((data ?? []) as Route[]); };
  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: Partial<Route>) => {
    const { error } = await (supabase as any).from("notification_routes").update(patch).eq("id", id);
    if (error) toast.error(error.message); else load();
  };
  const add = async () => {
    const { error } = await (supabase as any).from("notification_routes").insert({ form_slug: "enquiry", template_name: "internal-enquiry", recipient_email: "siomosmelitta@gmail.com" });
    if (error) toast.error(error.message); else load();
  };
  const del = async (id: string) => { if (!confirm("Delete route?")) return; await (supabase as any).from("notification_routes").delete().eq("id", id); load(); };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Notification Routing</CardTitle><Button size="sm" onClick={add}><Plus className="h-3 w-3 mr-1" />Add route</Button></CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3">Most-specific match wins: form_slug + enquiry_type beats form_slug + NULL. Escalation SLA drives the digest reminder.</p>
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider"><tr><th className="text-left p-2">Form</th><th className="text-left p-2">Enquiry type</th><th className="text-left p-2">Template</th><th className="text-left p-2">Recipient</th><th className="text-left p-2">User confirm</th><th className="text-left p-2">SLA min</th><th className="text-left p-2">Active</th><th></th></tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2"><Select value={r.form_slug} onValueChange={(v) => update(r.id, { form_slug: v })}><SelectTrigger className="w-28"><SelectValue /></SelectTrigger><SelectContent>{["contact","enquiry","taster"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></td>
                <td className="p-2"><Input className="w-56" placeholder="(any)" value={r.enquiry_type ?? ""} onChange={(e) => update(r.id, { enquiry_type: e.target.value || null })} /></td>
                <td className="p-2"><Input className="w-44" value={r.template_name} onChange={(e) => update(r.id, { template_name: e.target.value })} /></td>
                <td className="p-2"><Input className="w-56" value={r.recipient_email} onChange={(e) => update(r.id, { recipient_email: e.target.value })} /></td>
                <td className="p-2"><Switch checked={r.send_user_confirmation} onCheckedChange={(v) => update(r.id, { send_user_confirmation: v })} /></td>
                <td className="p-2"><Input className="w-20" type="number" value={r.escalation_minutes} onChange={(e) => update(r.id, { escalation_minutes: Number(e.target.value) })} /></td>
                <td className="p-2"><Switch checked={r.is_active} onCheckedChange={(v) => update(r.id, { is_active: v })} /></td>
                <td className="p-2"><Button size="icon" variant="ghost" onClick={() => del(r.id)}><Trash2 className="h-3 w-3" /></Button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// ────────────────────────── TEST HARNESS ──────────────────────────
function TestTab() {
  const [formSlug, setFormSlug] = useState("enquiry");
  const [enquiryType, setEnquiryType] = useState("");
  const [name, setName] = useState("Test Admin");
  const [email, setEmail] = useState("test@puranights.com");
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogRow[]>([]);

  const loadLogs = async () => {
    const { data } = await (supabase as any).from("notification_log").select("*").order("created_at", { ascending: false }).limit(50);
    setLogs((data ?? []) as LogRow[]);
  };
  useEffect(() => { loadLogs(); }, []);

  const fire = async (isTest: boolean) => {
    setRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke("forms-notify", {
        body: { form_slug: formSlug, enquiry_type: enquiryType || null, visitor_email: email, visitor_name: name, is_test: isTest, data: { source: "admin-test-harness", message: "Synthetic submission from FormsAdmin test harness." } },
      });
      if (error) toast.error(error.message);
      else toast.success(`forms-notify → ${(data as any)?.attempts?.length ?? 0} attempt(s) recorded`);
      await loadLogs();
    } catch (e: any) {
      toast.error(e?.message ?? String(e));
    } finally { setRunning(false); }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Synthetic submission</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><Label>Form</Label><Select value={formSlug} onValueChange={setFormSlug}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["contact","enquiry","taster"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Enquiry type (optional)</Label><Input value={enquiryType} onChange={(e) => setEnquiryType(e.target.value)} placeholder="Wedding Dance — Consultation" /></div>
          <div><Label>Test name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Test email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="flex gap-2 pt-2">
            <Button onClick={() => fire(true)} disabled={running} variant="outline">{running ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Send className="h-4 w-4 mr-1" />}Dry-run (log only)</Button>
            <Button onClick={() => fire(false)} disabled={running}>{running ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Send className="h-4 w-4 mr-1" />}Real send</Button>
          </div>
          <p className="text-xs text-muted-foreground">Real send invokes <code>forms-notify</code> → which tries <code>send-transactional-email</code>. If the email domain isn't configured yet, the attempt logs as <code>skipped_no_email_infra</code> — wire the domain once and re-run.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Recent notification log</CardTitle><Button size="sm" variant="ghost" onClick={loadLogs}><RefreshCw className="h-4 w-4" /></Button></CardHeader>
        <CardContent>
          <div className="border rounded-lg max-h-[480px] overflow-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted/50 sticky top-0"><tr><th className="text-left p-2">When</th><th className="text-left p-2">Form</th><th className="text-left p-2">To</th><th className="text-left p-2">Template</th><th className="text-left p-2">Status</th></tr></thead>
              <tbody>{logs.map((l) => (
                <tr key={l.id} className="border-t">
                  <td className="p-2 text-muted-foreground">{new Date(l.created_at).toLocaleString()}</td>
                  <td className="p-2">{l.form_slug}{l.is_test && <Badge variant="outline" className="ml-1 text-[9px]">test</Badge>}</td>
                  <td className="p-2">{l.recipient_email}</td>
                  <td className="p-2">{l.template_name}</td>
                  <td className="p-2"><Badge variant={l.status === "sent" ? "default" : l.status === "failed" ? "destructive" : "secondary"} className="text-[10px]">{l.status}</Badge>{l.error_message && <div className="text-[10px] text-destructive mt-0.5">{l.error_message.slice(0,60)}</div>}</td>
                </tr>
              ))}</tbody>
            </table>
            {logs.length === 0 && <p className="text-center text-muted-foreground text-sm p-6">No notifications yet — fire a test above.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
