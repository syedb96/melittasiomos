import { useMemo } from "react";
import { runSeoChecklist, type SeoDraft } from "@/lib/seo-checklist";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const iconFor = (s: "pass" | "warn" | "fail") =>
  s === "pass" ? <CheckCircle2 size={16} className="text-green-600" /> :
  s === "warn" ? <AlertTriangle size={16} className="text-amber-500" /> :
  <XCircle size={16} className="text-destructive" />;

interface Props { draft: SeoDraft; }

const SeoChecklistPanel = ({ draft }: Props) => {
  const { score, results } = useMemo(() => runSeoChecklist(draft), [draft]);
  const tone = score >= 85 ? "text-green-600" : score >= 65 ? "text-amber-500" : "text-destructive";

  return (
    <div className="border border-border rounded-xl p-4 bg-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-base font-bold">SEO Score</h3>
        <span className={`text-2xl font-display font-bold ${tone}`}>{score}<span className="text-sm text-muted-foreground">/100</span></span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        {score >= 85 ? "Ready to publish." : score >= 65 ? "Needs polish before publish." : "Below quality bar — publish blocked."}
      </p>
      <ul className="space-y-2">
        {results.map((r) => (
          <li key={r.id} className="flex items-start gap-2 text-sm">
            {iconFor(r.status)}
            <div className="flex-1">
              <p className="font-heading text-xs leading-tight">{r.label}</p>
              <p className="text-[11px] text-muted-foreground">{r.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeoChecklistPanel;
