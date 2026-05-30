import { Link } from "react-router-dom";
import { Star, MessageCircle } from "lucide-react";
import { WA, trackWaClick } from "@/lib/whatsapp";

interface ProofNudgeProps {
  /** Short, real-feel quote */
  quote: string;
  /** Attribution (first name + context) */
  attribution: string;
  /** One trust cue, e.g. "All levels welcome · No partner needed" */
  trustCue: string;
  /** WhatsApp prefill key from src/lib/whatsapp.ts */
  waContext?: keyof typeof WA;
  /** Optional override link to testimonials */
  testimonialsHref?: string;
}

/* <!-- WIX SECTION: ProofNudge — compact above-the-fold trust strip (1 quote + 1 cue + 1 CTA). Replicate as Strip with text + buttons. --> */
const ProofNudge = ({
  quote,
  attribution,
  trustCue,
  waContext = "general",
  testimonialsHref = "/testimonials",
}: ProofNudgeProps) => {
  const waHref = (WA[waContext] as (() => string))();

  return (
    <section className="py-6 md:py-8 border-y border-border bg-background/60">
      <div className="container-main grid md:grid-cols-[1fr_auto] gap-4 md:gap-6 items-center">
        <div className="flex items-start gap-3">
          <div className="flex gap-0.5 text-primary shrink-0 mt-1" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <div>
            <p className="text-sm md:text-base text-foreground italic leading-snug">
              &ldquo;{quote}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              — {attribution} · <span className="not-italic">{trustCue}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link
            to={testimonialsHref}
            className="text-xs underline text-muted-foreground hover:text-foreground"
          >
            Read more reviews
          </Link>
          <a
            href={waHref}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWaClick(`proof-nudge:${waContext}`)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80"
          >
            <MessageCircle size={14} /> Ask Melitta
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProofNudge;
