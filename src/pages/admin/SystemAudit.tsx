/* <!-- WIX: PROTOTYPE ONLY — Lovable admin operating-system audit. --> */
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  ADMIN_MODULES,
  SECTION_ORDER,
  type AdminModule,
  type ModuleStatus,
} from "@/admin/moduleRegistry";
import routesJson from "@/admin/generated/routes.json";
import { CheckCircle2, AlertCircle, Circle, ShieldCheck, ShieldAlert } from "lucide-react";

const OWNER_EMAILS = ["syedbiz96@gmail.com", "puranights@gmail.com"];

interface TableHealth { table: string; count: number | null; error?: string }

const STATUS_WEIGHT: Record<ModuleStatus, number> = { live: 1, partial: 0.5, planned: 0 };

const SystemAudit = () => {
  const { user, role } = useAuth();
  const [tableHealth, setTableHealth] = useState<TableHealth[]>([]);
  const [ownerChecks, setOwnerChecks] = useState<Array<{ email: string; found: boolean; role?: string; approved?: boolean }>>([]);
  const [approvedCount, setApprovedCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const tables = Array.from(new Set(ADMIN_MODULES.flatMap((m) => m.tableDependency ?? [])));
      const counts = await Promise.all(
        tables.map(async (t) => {
          const { count, error } = await supabase.from(t as never).select("*", { count: "exact", head: true });
          return { table: t, count: count ?? null, error: error?.message } as TableHealth;
        }),
      );
      setTableHealth(counts);

      const checks = await Promise.all(OWNER_EMAILS.map(async (email) => {
        const { data: prof } = await supabase
          .from("profiles")
          .select("role, email")
          .eq("email", email)
          .maybeSingle();
        const { data: approved } = await supabase
          .from("approved_admin_emails")
          .select("default_role, is_active")
          .eq("email", email)
          .maybeSingle();
        return {
          email,
          found: !!prof,
          role: prof?.role,
          approved: !!approved && approved.is_active && approved.default_role === "owner",
        };
      }));
      setOwnerChecks(checks);

      const { count: ac } = await supabase
        .from("approved_admin_emails")
        .select("*", { count: "exact", head: true });
      setApprovedCount(ac ?? 0);

      setLoading(false);
    };
    load();
  }, []);

  // Completion scoring by section
  const sectionScores = SECTION_ORDER.map((section) => {
    const items = ADMIN_MODULES.filter((m) => m.section === section);
    if (!items.length) return { section, score: 0, total: 0, pct: 0 };
    const score = items.reduce((s, m) => s + STATUS_WEIGHT[m.status], 0);
    return { section, score, total: items.length, pct: Math.round((score / items.length) * 100) };
  });
  const overallPct = Math.round(
    (sectionScores.reduce((s, x) => s + x.score, 0) /
      sectionScores.reduce((s, x) => s + x.total, 0)) *
      100,
  );

  const StatusDot = ({ s }: { s: ModuleStatus }) =>
    s === "live" ? <CheckCircle2 size={14} className="text-emerald-500" /> :
    s === "partial" ? <AlertCircle size={14} className="text-peach" /> :
    <Circle size={14} className="text-muted-foreground/50" />;

  const adminRoutesInApp = (routesJson as any).adminRoutes as { path: string }[];
  const registryRoutes = new Set(ADMIN_MODULES.flatMap((m) => [m.route, ...(m.routeAliases ?? [])]));
  const missingFromRegistry = adminRoutesInApp.filter((r) => r.path.startsWith("/admin") && !registryRoutes.has(r.path));

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1">System Audit</h1>
        <p className="text-sm text-muted-foreground font-heading">
          Operating-system completion score. Every number below is live from the registry or database — no
          fabricated metrics.
        </p>
      </div>

      {/* Overall score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 md:col-span-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Overall</p>
          <p className="font-display text-5xl font-bold">{overallPct}<span className="text-xl text-muted-foreground">/100</span></p>
          <p className="text-xs text-muted-foreground mt-2">Weighted module completeness (live=1, partial=0.5, planned=0).</p>
        </div>
        {sectionScores.map((s) => (
          <div key={s.section} className="bg-card border border-border rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.section}</p>
            <p className="font-display text-2xl font-bold mt-1">{s.pct}%</p>
            <p className="text-xs text-muted-foreground">{s.score}/{s.total} modules</p>
          </div>
        ))}
      </div>

      {/* Owner / role check */}
      <section className="mb-8">
        <h2 className="font-display text-xl font-bold mb-3">Owner & role verification</h2>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2 text-sm">
          {ownerChecks.map((ownerCheck) => (
            <div key={ownerCheck.email} className="flex items-center gap-2">
              {ownerCheck.found && ownerCheck.role === "owner" && ownerCheck.approved ? (
                <ShieldCheck className="text-emerald-500" size={16} />
              ) : (
                <ShieldAlert className="text-destructive" size={16} />
              )}
              <span className="font-heading">
                {ownerCheck.email} →{" "}
                <strong>{ownerCheck.found ? ownerCheck.role : "profile pending first sign-in"}</strong>
                {ownerCheck.approved ? " (approved owner)" : ""}
              </span>
            </div>
          ))}
          <div className="text-xs text-muted-foreground">
            Approved admin emails on file: <strong>{approvedCount ?? "—"}</strong>
          </div>
          <div className="text-xs text-muted-foreground">
            Current session: <strong>{user?.email ?? "anonymous"}</strong> · role <strong>{role ?? "—"}</strong>
          </div>
        </div>
      </section>

      {/* Module registry */}
      <section className="mb-8">
        <h2 className="font-display text-xl font-bold mb-3">Module registry ({ADMIN_MODULES.length})</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2">Module</th>
                <th className="text-left px-4 py-2">Section</th>
                <th className="text-left px-4 py-2">Route</th>
                <th className="text-left px-4 py-2">Role</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_MODULES.map((m: AdminModule) => (
                <tr key={m.id} className="border-t border-border/60">
                  <td className="px-4 py-2 font-heading font-semibold">{m.name}</td>
                  <td className="px-4 py-2 text-muted-foreground">{m.section}</td>
                  <td className="px-4 py-2 font-mono text-xs">{m.route}</td>
                  <td className="px-4 py-2 text-xs uppercase tracking-wider">{m.requiredRole}</td>
                  <td className="px-4 py-2"><span className="inline-flex items-center gap-1.5"><StatusDot s={m.status} /> {m.status}</span></td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">{m.notes ?? (m.publicCritical ? "Public-critical" : "")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {missingFromRegistry.length > 0 && (
          <div className="mt-3 text-xs text-peach">
            ⚠ {missingFromRegistry.length} admin route(s) defined in App.tsx but not in the module registry:
            <code className="ml-2">{missingFromRegistry.map((r) => r.path).join(", ")}</code>
          </div>
        )}
      </section>

      {/* Table health */}
      <section className="mb-8">
        <h2 className="font-display text-xl font-bold mb-3">Backend table health</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            tableHealth.map((t) => (
              <div key={t.table} className="bg-card border border-border rounded-lg p-3">
                <p className="font-mono text-[11px] text-muted-foreground truncate">{t.table}</p>
                <p className="font-display text-lg font-bold">
                  {t.error ? <span className="text-destructive text-sm">err</span> : t.count ?? "—"}
                </p>
                {t.error && <p className="text-[10px] text-destructive truncate" title={t.error}>{t.error}</p>}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Route inventory summary */}
      <section className="mb-8">
        <h2 className="font-display text-xl font-bold mb-3">Public route inventory</h2>
        <div className="bg-card border border-border rounded-xl p-5 text-sm space-y-1">
          <p>Public routes in <code>src/App.tsx</code>: <strong>{(routesJson as any).publicRoutes.length}</strong></p>
          <p>Admin routes in <code>src/App.tsx</code>: <strong>{adminRoutesInApp.length}</strong></p>
          <p className="text-xs text-muted-foreground">
            Generated at {(routesJson as any).generatedAt}. See <a className="underline" href="/admin/pages-registry">Page Registry</a> for the full table.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-display text-xl font-bold mb-3">Documentation</h2>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li><code>docs/100-COMPLETION-BASELINE.md</code> — initial scores and known blockers</li>
          <li><code>docs/100-CANONICAL-HOST-DECISION.md</code> — host audit and recommendation</li>
          <li><code>docs/100-PHASE-2-COMMERCIAL-CONTROLS-MAP.md</code> — Phase 2 implementation map</li>
        </ul>
      </section>
    </AdminLayout>
  );
};

export default SystemAudit;
