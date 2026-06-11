import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SecurityEventRow {
  id: string;
  event_type: string;
  source: string;
  severity: string;
  page_path: string | null;
  user_agent: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
}

const EVENT_TYPES = [
  "form_validation_failed",
  "form_honeypot_tripped",
  "form_submission_error",
  "form_submission_success",
  "connector_error",
  "auth_failure",
];
const SEVERITIES = ["info", "warn", "error"];

const csvEscape = (v: unknown) => {
  const s = v == null ? "" : typeof v === "string" ? v : JSON.stringify(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const SecurityEvents = () => {
  const [rows, setRows] = useState<SecurityEventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [eventType, setEventType] = useState("");
  const [severity, setSeverity] = useState("");
  const [source, setSource] = useState("");
  const [days, setDays] = useState(7);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr(null);
      const since = new Date(Date.now() - days * 86_400_000).toISOString();
      let q = supabase
        .from("security_events")
        .select("id, event_type, source, severity, page_path, user_agent, meta, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(500);
      if (eventType) q = q.eq("event_type", eventType);
      if (severity) q = q.eq("severity", severity);
      if (source) q = q.ilike("source", `%${source}%`);
      const { data, error } = await q;
      if (cancelled) return;
      if (error) setErr(error.message);
      else setRows((data ?? []) as SecurityEventRow[]);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [eventType, severity, source, days]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of rows) c[r.event_type] = (c[r.event_type] ?? 0) + 1;
    return c;
  }, [rows]);

  const exportCsv = () => {
    const header = ["created_at", "event_type", "severity", "source", "page_path", "user_agent", "meta"];
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push([r.created_at, r.event_type, r.severity, r.source, r.page_path, r.user_agent, r.meta].map(csvEscape).join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `security-events-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background section-padding">
      <div className="container-main max-w-6xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Security Events</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Last {days}-day window. Honeypot trips, validation failures, submission errors and successes.
          Auto-purges after 90 days.
        </p>

        <div className="rounded-2xl border border-border bg-card p-4 mb-6 grid sm:grid-cols-5 gap-3">
          <label className="text-xs font-heading">Event type
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="mt-1 w-full rounded border border-border bg-background px-2 py-1 text-sm">
              <option value="">All</option>
              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label className="text-xs font-heading">Severity
            <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="mt-1 w-full rounded border border-border bg-background px-2 py-1 text-sm">
              <option value="">All</option>
              {SEVERITIES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label className="text-xs font-heading">Source contains
            <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="PartnerOutreachForm" className="mt-1 w-full rounded border border-border bg-background px-2 py-1 text-sm" />
          </label>
          <label className="text-xs font-heading">Window
            <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-1 w-full rounded border border-border bg-background px-2 py-1 text-sm">
              {[1, 7, 30, 90].map(d => <option key={d} value={d}>{d} day{d > 1 ? "s" : ""}</option>)}
            </select>
          </label>
          <button onClick={exportCsv} disabled={!rows.length} className="btn-cta-primary text-xs self-end disabled:opacity-50">
            Export CSV ({rows.length})
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {Object.entries(counts).map(([k, v]) => (
            <span key={k} className="text-[11px] rounded-full bg-muted px-3 py-1 font-heading">
              {k}: <strong>{v}</strong>
            </span>
          ))}
        </div>

        {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {err && <p className="text-sm text-destructive">Error: {err}</p>}

        {!loading && !err && (
          <div className="rounded-2xl border border-border bg-card divide-y divide-border/60 max-h-[70vh] overflow-auto">
            {rows.length === 0 && <p className="p-4 text-sm text-muted-foreground">No events in this window.</p>}
            {rows.map(r => (
              <div key={r.id} className="p-3 text-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <code className="font-heading font-semibold">{r.event_type}</code>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${r.severity === "error" ? "bg-destructive/15 text-destructive" : r.severity === "warn" ? "bg-amber-500/15 text-amber-700" : "bg-muted"}`}>
                    {r.severity}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-1">
                  {new Date(r.created_at).toLocaleString()} · <code>{r.source}</code> · {r.page_path ?? "—"}
                </p>
                {r.meta && Object.keys(r.meta).length > 0 && (
                  <pre className="text-[10px] text-muted-foreground whitespace-pre-wrap break-all">{JSON.stringify(r.meta, null, 2)}</pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityEvents;
