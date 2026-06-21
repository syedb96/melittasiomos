import { GateResult } from "@/lib/publish-gate";
import { Check, X, AlertTriangle } from "lucide-react";

export default function PublishGatePanel({ gate }: { gate: GateResult }) {
  return (
    <div className="border border-border rounded-xl p-4 bg-card text-xs space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-heading font-bold text-sm">Publishing gate</p>
        {gate.ok ? (
          <span className="text-green-600 font-semibold inline-flex items-center gap-1"><Check size={12} />Cleared</span>
        ) : (
          <span className="text-destructive font-semibold inline-flex items-center gap-1"><X size={12} />{gate.criticalFailures} blocker{gate.criticalFailures !== 1 ? "s" : ""}</span>
        )}
      </div>
      <p className="text-muted-foreground">Critical checks must pass before publishing. Warnings do not block.</p>
      <ul className="space-y-1 mt-2">
        {gate.checks.map((c) => (
          <li key={c.id} className="flex items-start gap-2">
            {c.ok ? <Check size={12} className="text-green-600 mt-0.5 shrink-0" /> : c.level === "critical" ? <X size={12} className="text-destructive mt-0.5 shrink-0" /> : <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />}
            <span className={c.ok ? "text-muted-foreground" : c.level === "critical" ? "text-destructive" : "text-amber-600"}>{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
