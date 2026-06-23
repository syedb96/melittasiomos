import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface LogRow {
  id: string; form_slug: string; enquiry_type: string | null; recipient_email: string;
  template_name: string; status: string; error_message: string | null; is_test: boolean;
  created_at: string; route_id: string | null; metadata: any;
}

const STATUS_COLOR: Record<string, string> = {
  sent: "hsl(142 70% 45%)", failed: "hsl(0 70% 55%)",
  skipped_no_email_infra: "hsl(38 90% 50%)", test: "hsl(220 70% 55%)", pending: "hsl(220 10% 60%)",
};

export default function NotificationsDashboard() {
  const [range, setRange] = useState<"24h" | "7d" | "30d">("7d");
  const [formFilter, setFormFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rows, setRows] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const hours = range === "24h" ? 24 : range === "7d" ? 24 * 7 : 24 * 30;
    const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();
    const { data } = await (supabase as any).from("notification_log").select("*").gte("created_at", since).order("created_at", { ascending: false }).limit(2000);
    setRows((data ?? []) as LogRow[]); setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [range]);

  const filtered = useMemo(() => rows.filter((r) =>
    (formFilter === "all" || r.form_slug === formFilter) &&
    (statusFilter === "all" || r.status === statusFilter)
  ), [rows, formFilter, statusFilter]);

  const forms = useMemo(() => Array.from(new Set(rows.map((r) => r.form_slug))), [rows]);
  const statusCounts = useMemo(() => {
    const m: Record<string, number> = {};
    filtered.forEach((r) => { m[r.status] = (m[r.status] ?? 0) + 1; });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  const timeline = useMemo(() => {
    const buckets: Record<string, Record<string, number>> = {};
    filtered.forEach((r) => {
      const day = r.created_at.slice(0, 10);
      buckets[day] ??= { day } as any;
      buckets[day][r.status] = ((buckets[day][r.status] as any as number) ?? 0) + 1;
    });
    return Object.values(buckets).sort((a: any, b: any) => a.day.localeCompare(b.day));
  }, [filtered]);

  const perRoute = useMemo(() => {
    const m = new Map<string, { route: string; total: number; sent: number; failed: number; skipped: number }>();
    filtered.forEach((r) => {
      const key = `${r.form_slug}${r.enquiry_type ? ` · ${r.enquiry_type}` : ""}`;
      const cur = m.get(key) ?? { route: key, total: 0, sent: 0, failed: 0, skipped: 0 };
      cur.total++;
      if (r.status === "sent") cur.sent++;
      else if (r.status === "failed") cur.failed++;
      else if (r.status === "skipped_no_email_infra") cur.skipped++;
      m.set(key, cur);
    });
    return Array.from(m.values()).sort((a, b) => b.total - a.total);
  }, [filtered]);

  const slaBreaches = useMemo(() => {
    const now = Date.now();
    return filtered.filter((r) => {
      const due = r.metadata?.sla_due_at;
      if (!due) return false;
      const breached = new Date(due).getTime() < now;
      const unresolved = r.status !== "sent";
      return breached && unresolved;
    });
  }, [filtered]);

  const totals = useMemo(() => ({
    total: filtered.length,
    sent: filtered.filter((r) => r.status === "sent").length,
    failed: filtered.filter((r) => r.status === "failed").length,
    skipped: filtered.filter((r) => r.status === "skipped_no_email_infra").length,
  }), [filtered]);

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Notifications Dashboard</h1>
          <p className="text-muted-foreground text-sm">Delivery, failures, and SLA breaches across every form route.</p>
        </div>
        <div className="flex gap-2">
          <Select value={range} onValueChange={(v: any) => setRange(v)}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="24h">Last 24h</SelectItem><SelectItem value="7d">Last 7 days</SelectItem><SelectItem value="30d">Last 30 days</SelectItem></SelectContent>
          </Select>
          <Select value={formFilter} onValueChange={setFormFilter}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">All forms</SelectItem>{forms.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="sent">Sent</SelectItem><SelectItem value="failed">Failed</SelectItem><SelectItem value="skipped_no_email_infra">Skipped</SelectItem></SelectContent>
          </Select>
          <Button size="icon" variant="ghost" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total" value={totals.total} />
        <StatCard label="Sent" value={totals.sent} color="text-green-600" />
        <StatCard label="Failed" value={totals.failed} color="text-destructive" />
        <StatCard label="Skipped (no infra)" value={totals.skipped} color="text-amber-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Status distribution</CardTitle></CardHeader>
          <CardContent style={{ height: 280 }}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : statusCounts.length === 0 ? <p className="text-sm text-muted-foreground">No data in range.</p> : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusCounts} dataKey="value" nameKey="name" outerRadius={90} innerRadius={50} label>
                    {statusCounts.map((s) => <Cell key={s.name} fill={STATUS_COLOR[s.name] ?? "hsl(220 10% 60%)"} />)}
                  </Pie>
                  <Tooltip /><Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Volume timeline (per day)</CardTitle></CardHeader>
          <CardContent style={{ height: 280 }}>
            {timeline.length === 0 ? <p className="text-sm text-muted-foreground">No data in range.</p> : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
                  <Tooltip /><Legend />
                  {["sent","failed","skipped_no_email_infra","test"].map((k) => <Line key={k} type="monotone" dataKey={k} stroke={STATUS_COLOR[k]} dot={false} />)}
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" />SLA breaches</CardTitle>
          <Badge variant={slaBreaches.length ? "destructive" : "secondary"}>{slaBreaches.length}</Badge>
        </CardHeader>
        <CardContent>
          {slaBreaches.length === 0 ? <p className="text-sm text-muted-foreground">No SLA breaches in the selected range.</p> : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase"><tr><th className="text-left p-2">When</th><th className="text-left p-2">Form</th><th className="text-left p-2">To</th><th className="text-left p-2">Status</th><th className="text-left p-2">Due</th><th className="text-left p-2">Over by</th></tr></thead>
                <tbody>{slaBreaches.slice(0, 50).map((r) => {
                  const due = new Date(r.metadata.sla_due_at).getTime();
                  const overMin = Math.round((Date.now() - due) / 60000);
                  return (
                    <tr key={r.id} className="border-t">
                      <td className="p-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                      <td className="p-2">{r.form_slug}{r.enquiry_type && <span className="text-xs text-muted-foreground"> · {r.enquiry_type}</span>}</td>
                      <td className="p-2 text-xs">{r.recipient_email}</td>
                      <td className="p-2"><Badge variant="destructive" className="text-[10px]">{r.status}</Badge></td>
                      <td className="p-2 text-xs">{new Date(due).toLocaleString()}</td>
                      <td className="p-2 text-xs text-destructive">{overMin > 60 ? `${Math.round(overMin/60)}h` : `${overMin}m`}</td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Per-route breakdown</CardTitle></CardHeader>
        <CardContent>
          {perRoute.length === 0 ? <p className="text-sm text-muted-foreground">No traffic.</p> : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase"><tr><th className="text-left p-2">Route</th><th className="text-right p-2">Total</th><th className="text-right p-2">Sent</th><th className="text-right p-2">Failed</th><th className="text-right p-2">Skipped</th><th className="text-right p-2">Success rate</th></tr></thead>
                <tbody>{perRoute.map((r) => {
                  const rate = r.total ? Math.round((r.sent / r.total) * 100) : 0;
                  return (
                    <tr key={r.route} className="border-t">
                      <td className="p-2">{r.route}</td>
                      <td className="p-2 text-right">{r.total}</td>
                      <td className="p-2 text-right text-green-600">{r.sent}</td>
                      <td className="p-2 text-right text-destructive">{r.failed}</td>
                      <td className="p-2 text-right text-amber-600">{r.skipped}</td>
                      <td className="p-2 text-right"><Badge variant={rate >= 90 ? "default" : rate >= 50 ? "secondary" : "destructive"}>{rate}%</Badge></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <Card><CardContent className="p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`text-3xl font-display font-bold mt-1 ${color ?? ""}`}>{value}</div>
    </CardContent></Card>
  );
}
