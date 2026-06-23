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
import { Loader2, Send, Plus, Trash2, RefreshCw, PlayCircle } from "lucide-react";

interface FormCfg { id: string; slug: string; name: string; description: string | null; fields: any; submit_label: string; success_message: string; is_active: boolean; }
interface Route { id: string; form_slug: string; enquiry_type: string | null; template_name: string; recipient_email: string; cc_emails: string[]; send_user_confirmation: boolean; user_confirmation_template: string; escalation_minutes: number; is_active: boolean; internal_template_id: string | null; user_template_id: string | null; }
interface EmailTpl { id: string; slug: string; name: string; description: string | null; subject: string; body_html: string; body_text: string | null; merge_fields: any; is_active: boolean; }
interface LogRow { id: string; form_slug: string; enquiry_type: string | null; recipient_email: string; template_name: string; status: string; error_message: string | null; is_test: boolean; created_at: string; }
interface Submission { id: string; source: "contact" | "enquiry" | "taster"; name: string; email: string; subject: string | null; message: string | null; status: string | null; created_at: string; }

export default function FormsAdmin() {
  const [tab, setTab] = useState("inbox");

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold">Forms &amp; Notifications</h1>
        <p className="text-muted-foreground text-sm">Inbox · schemas · routing · templates · test harness · regression sweep.</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-6 w-full max-w-3xl">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="schema">Schemas</TabsTrigger>
          <TabsTrigger value="routes">Routing</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="test">Test</TabsTrigger>
          <TabsTrigger value="regression">Regression</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="mt-6"><InboxTab /></TabsContent>
        <TabsContent value="schema" className="mt-6"><SchemaTab /></TabsContent>
        <TabsContent value="routes" className="mt-6"><RoutesTab /></TabsContent>
        <TabsContent value="templates" className="mt-6"><TemplatesTab /></TabsContent>
        <TabsContent value="test" className="mt-6"><TestTab /></TabsContent>
        <TabsContent value="regression" className="mt-6"><RegressionTab /></TabsContent>
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

// ────────────────────────── SCHEMA TAB (unchanged) ──────────────────────────
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
  const [tpls, setTpls] = useState<EmailTpl[]>([]);
  const load = async () => {
    const [r, t] = await Promise.all([
      (supabase as any).from("notification_routes").select("*").order("form_slug").order("enquiry_type"),
      (supabase as any).from("email_templates").select("id,slug,name").eq("is_active", true).order("slug"),
    ]);
    setRows((r.data ?? []) as Route[]);
    setTpls((t.data ?? []) as EmailTpl[]);
  };
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
        <p className="text-xs text-muted-foreground mb-3">Most-specific match wins. Pick an editable internal + user template per route.</p>
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider"><tr><th className="text-left p-2">Form</th><th className="text-left p-2">Enquiry type</th><th className="text-left p-2">Internal template</th><th className="text-left p-2">User template</th><th className="text-left p-2">Recipient</th><th className="text-left p-2">User confirm</th><th className="text-left p-2">SLA min</th><th className="text-left p-2">On</th><th></th></tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2"><Select value={r.form_slug} onValueChange={(v) => update(r.id, { form_slug: v })}><SelectTrigger className="w-28"><SelectValue /></SelectTrigger><SelectContent>{["contact","enquiry","taster"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></td>
                <td className="p-2"><Input className="w-56" placeholder="(any)" value={r.enquiry_type ?? ""} onChange={(e) => update(r.id, { enquiry_type: e.target.value || null })} /></td>
                <td className="p-2">
                  <Select value={r.internal_template_id ?? "_none"} onValueChange={(v) => update(r.id, { internal_template_id: v === "_none" ? null : v })}>
                    <SelectTrigger className="w-48"><SelectValue placeholder="(none)" /></SelectTrigger>
                    <SelectContent><SelectItem value="_none">— none —</SelectItem>{tpls.map((t) => <SelectItem key={t.id} value={t.id}>{t.slug}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
                <td className="p-2">
                  <Select value={r.user_template_id ?? "_none"} onValueChange={(v) => update(r.id, { user_template_id: v === "_none" ? null : v })}>
                    <SelectTrigger className="w-48"><SelectValue placeholder="(none)" /></SelectTrigger>
                    <SelectContent><SelectItem value="_none">— none —</SelectItem>{tpls.map((t) => <SelectItem key={t.id} value={t.id}>{t.slug}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
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

// ────────────────────────── TEMPLATES TAB ──────────────────────────
function TemplatesTab() {
  const [tpls, setTpls] = useState<EmailTpl[]>([]);
  const [sel, setSel] = useState<string>("");
  const current = tpls.find((t) => t.id === sel);
  const [preview, setPreview] = useState("");

  const load = async () => {
    const { data } = await (supabase as any).from("email_templates").select("*").order("slug");
    setTpls((data ?? []) as EmailTpl[]);
    if (!sel && data?.length) setSel(data[0].id);
  };
  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!current) return setPreview("");
    const vars: Record<string, string> = {};
    (current.merge_fields as any[]).forEach((f) => { vars[f.key] = f.example ?? `<${f.key}>`; });
    setPreview(render(current.body_html, vars));
  }, [current?.id, current?.body_html, current?.merge_fields]);

  const save = async () => {
    if (!current) return;
    const { error } = await (supabase as any).from("email_templates").update({
      name: current.name, description: current.description, subject: current.subject,
      body_html: current.body_html, body_text: current.body_text,
      merge_fields: current.merge_fields, is_active: current.is_active,
    }).eq("id", current.id);
    if (error) toast.error(error.message); else { toast.success("Template saved"); load(); }
  };

  const add = async () => {
    const slug = prompt("New template slug (kebab-case)");
    if (!slug) return;
    const { error } = await (supabase as any).from("email_templates").insert({ slug, name: slug, subject: "New email", body_html: "<p>Hi {{name}}</p>" });
    if (error) toast.error(error.message); else load();
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-sm">Templates</CardTitle><Button size="icon" variant="ghost" onClick={add}><Plus className="h-3 w-3" /></Button></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {tpls.map((t) => (
              <button key={t.id} onClick={() => setSel(t.id)} className={`w-full text-left p-3 text-sm hover:bg-muted/50 ${sel === t.id ? "bg-muted" : ""}`}>
                <div className="font-medium">{t.slug}</div>
                <div className="text-[10px] text-muted-foreground line-clamp-1">{t.subject}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>{current?.slug ?? "—"}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {!current ? <p className="text-muted-foreground text-sm">Pick a template.</p> : (
            <>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>Display name</Label><Input value={current.name} onChange={(e) => setTpls((s) => s.map((x) => x.id === current.id ? { ...x, name: e.target.value } : x))} /></div>
                <div className="flex items-center gap-2 pt-6"><Switch checked={current.is_active} onCheckedChange={(v) => setTpls((s) => s.map((x) => x.id === current.id ? { ...x, is_active: v } : x))} /><Label>Active</Label></div>
                <div className="sm:col-span-2"><Label>Subject</Label><Input value={current.subject} onChange={(e) => setTpls((s) => s.map((x) => x.id === current.id ? { ...x, subject: e.target.value } : x))} /></div>
              </div>
              <div>
                <Label>Body (HTML — use <code>{"{{merge_field}}"}</code>)</Label>
                <Textarea rows={10} value={current.body_html} onChange={(e) => setTpls((s) => s.map((x) => x.id === current.id ? { ...x, body_html: e.target.value } : x))} className="font-mono text-xs" />
              </div>
              <div>
                <Label>Plain-text fallback (optional)</Label>
                <Textarea rows={4} value={current.body_text ?? ""} onChange={(e) => setTpls((s) => s.map((x) => x.id === current.id ? { ...x, body_text: e.target.value || null } : x))} className="font-mono text-xs" />
              </div>
              <div>
                <Label>Merge fields (JSON)</Label>
                <Textarea rows={3} value={JSON.stringify(current.merge_fields)} onChange={(e) => { try { const v = JSON.parse(e.target.value); setTpls((s) => s.map((x) => x.id === current.id ? { ...x, merge_fields: v } : x)); } catch { /* ignore */ } }} className="font-mono text-xs" />
                <p className="text-[10px] text-muted-foreground mt-1">Shape: <code>[{`{"key":"name","example":"Jane"}`}]</code></p>
              </div>
              <div>
                <Label>Live preview</Label>
                <div className="border rounded p-3 text-sm bg-background" dangerouslySetInnerHTML={{ __html: preview }} />
              </div>
              <Button onClick={save}>Save template</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function render(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, k) => vars[k] ?? "");
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
        body: { form_slug: formSlug, enquiry_type: enquiryType || null, visitor_email: email, visitor_name: name, is_test: isTest, skip_antispam: true, data: { source: "admin-test-harness", message: "Synthetic submission from FormsAdmin test harness." } },
      });
      if (error) toast.error(error.message);
      else toast.success(`forms-notify → ${(data as any)?.attempts?.length ?? 0} attempt(s)`);
      await loadLogs();
    } catch (e: any) { toast.error(e?.message ?? String(e)); }
    finally { setRunning(false); }
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
            <Button onClick={() => fire(true)} disabled={running} variant="outline">{running ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Send className="h-4 w-4 mr-1" />}Dry-run</Button>
            <Button onClick={() => fire(false)} disabled={running}>{running ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Send className="h-4 w-4 mr-1" />}Real send</Button>
          </div>
          <p className="text-xs text-muted-foreground">Real send invokes <code>forms-notify</code>. Until an email domain is configured, sends record <code>skipped_no_email_infra</code> — set up the domain and re-run.</p>
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

// ────────────────────────── REGRESSION TAB ──────────────────────────
function RegressionTab() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [results, setResults] = useState<{ route: Route; ok: boolean; attempts: any[]; error?: string }[]>([]);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"dry" | "real">("dry");

  useEffect(() => { (async () => {
    const { data } = await (supabase as any).from("notification_routes").select("*").eq("is_active", true).order("form_slug");
    setRoutes((data ?? []) as Route[]);
  })(); }, []);

  const run = async () => {
    setRunning(true); setResults([]);
    const out: typeof results = [];
    for (const r of routes) {
      try {
        const { data, error } = await supabase.functions.invoke("forms-notify", {
          body: {
            form_slug: r.form_slug,
            enquiry_type: r.enquiry_type,
            visitor_email: "regression@puranights.test",
            visitor_name: "Regression Bot",
            is_test: mode === "dry",
            skip_antispam: true,
            data: { source: "regression-sweep", message: "Automated regression sweep" },
          },
        });
        if (error) out.push({ route: r, ok: false, attempts: [], error: error.message });
        else {
          const attempts = (data as any)?.attempts ?? [];
          const allOk = attempts.every((a: any) => ["sent", "test"].includes(a.status));
          out.push({ route: r, ok: allOk, attempts });
        }
      } catch (e: any) { out.push({ route: r, ok: false, attempts: [], error: e?.message ?? String(e) }); }
      setResults([...out]);
    }
    setRunning(false);
    const failed = out.filter((x) => !x.ok).length;
    if (failed === 0) toast.success(`Regression: all ${out.length} routes OK`);
    else toast.error(`Regression: ${failed} of ${out.length} routes failed`);
  };

  const passed = results.filter((r) => r.ok).length;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Per-route regression sweep</CardTitle>
        <div className="flex items-center gap-3">
          <Select value={mode} onValueChange={(v: any) => setMode(v)}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="dry">Dry-run (no send)</SelectItem><SelectItem value="real">Real send</SelectItem></SelectContent>
          </Select>
          <Button onClick={run} disabled={running || routes.length === 0}>
            {running ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <PlayCircle className="h-4 w-4 mr-1" />}
            Run sweep ({routes.length} routes)
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3">Invokes <code>forms-notify</code> once per active route and asserts every attempt status is <code>sent</code> (or <code>test</code> in dry-run). Anti-spam is bypassed for harness calls.</p>
        {results.length > 0 && <p className="text-sm mb-3"><b>{passed}</b> / {results.length} routes passing</p>}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider"><tr><th className="text-left p-2">Form</th><th className="text-left p-2">Enquiry type</th><th className="text-left p-2">Result</th><th className="text-left p-2">Attempts</th></tr></thead>
            <tbody>{results.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{r.route.form_slug}</td>
                <td className="p-2 text-xs">{r.route.enquiry_type ?? "(any)"}</td>
                <td className="p-2"><Badge variant={r.ok ? "default" : "destructive"}>{r.ok ? "PASS" : "FAIL"}</Badge>{r.error && <div className="text-[10px] text-destructive mt-1">{r.error}</div>}</td>
                <td className="p-2 text-xs">{r.attempts.map((a, j) => <div key={j}>{a.status} → {a.recipient}{a.error && <span className="text-destructive"> ({a.error.slice(0,40)})</span>}</div>)}</td>
              </tr>
            ))}</tbody>
          </table>
          {results.length === 0 && <p className="text-center text-muted-foreground text-sm p-6">Click <em>Run sweep</em> to test every active route.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
