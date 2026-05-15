import { Link } from "react-router-dom";

interface AnswerBoxProps {
  /** Short H2/H3 question this block answers (for AI/GEO indexing). */
  question: string;
  /** 1–3 sentence direct answer (plain text). */
  answer: string;
  /** Optional bullet summary — keep crisp, scannable. */
  bullets?: string[];
  /** Optional CTA. */
  cta?: { label: string; to?: string; href?: string };
  /** Visual variant. */
  tone?: "warm" | "ivory" | "dark";
}

/* <!-- WIX SECTION: AnswerBox — replicate as a Strip with H3 question, paragraph,
       bulleted Repeater and a single CTA button. Plain text only — keep schema-friendly. --> */
const AnswerBox = ({ question, answer, bullets, cta, tone = "ivory" }: AnswerBoxProps) => {
  const bg =
    tone === "dark"
      ? "bg-charcoal text-primary-foreground"
      : tone === "warm"
      ? "bg-card"
      : "bg-background";
  const muted = tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground";

  return (
    <div className={`${bg} rounded-2xl p-6 md:p-8 border border-border/40 shadow-sm`}>
      <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">
        Quick Answer
      </p>
      <h3 className="font-display text-xl md:text-2xl font-bold mb-3">{question}</h3>
      <p className={`text-sm md:text-base leading-relaxed ${muted}`}>{answer}</p>
      {bullets && bullets.length > 0 && (
        <ul className={`mt-4 space-y-1.5 text-sm ${muted}`}>
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {cta && (
        <div className="mt-5">
          {cta.to ? (
            <Link to={cta.to} className="btn-cta-primary text-xs">
              {cta.label} →
            </Link>
          ) : (
            <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs">
              {cta.label} →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerBox;
