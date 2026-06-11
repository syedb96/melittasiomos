import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

interface MatchOption {
  id: string;
  label: string;
  blurb: string;
  cta: string;
  to: string;
  event: string;
}

const DEFAULT_OPTIONS: MatchOption[] = [
  {
    id: "beginner",
    label: "I've never danced before",
    blurb: "Totally new? You're exactly who our classes are designed for.",
    cta: "Start with us",
    to: "/start-here",
    event: "class_match_beginner_click",
  },
  {
    id: "weekly",
    label: "I want a regular weekly class",
    blurb: "Come dance with us every Monday in Chiswick or Tuesday in Ealing.",
    cta: "Come dance weekly",
    to: "/pura-nights",
    event: "class_match_weekly_click",
  },
  {
    id: "wedding",
    label: "We're planning our first wedding dance",
    blurb: "Bespoke first-dance choreography — calm, kind, and totally personal.",
    cta: "Plan your first dance",
    to: "/wedding-dance",
    event: "class_match_wedding_click",
  },
  {
    id: "private",
    label: "I'd like private 1-to-1 coaching",
    blurb: "Personal sessions tailored to your level, goals and pace.",
    cta: "Book a private lesson",
    to: "/private-lessons",
    event: "class_match_private_click",
  },
  {
    id: "corporate",
    label: "I'm booking for a team, hen or birthday",
    blurb: "Memorable group sessions for companies, hens and celebrations.",
    cta: "Plan a group session",
    to: "/corporate-dance-classes-london",
    event: "class_match_corporate_click",
  },
  {
    id: "loyalty",
    label: "I already dance with you regularly",
    blurb: "Join our loyalty card — your 9th drop-in or Latin Friday is on us.",
    cta: "Join the loyalty card",
    to: "/loyalty",
    event: "class_match_loyalty_click",
  },
];

interface Props {
  title?: string;
  subtitle?: string;
  options?: MatchOption[];
  tone?: "warm" | "ivory" | "dark";
}

/* <!-- WIX SECTION: ClassMatchBlock — replicate as a Strip with a heading,
       subtitle, and a 2- or 3-column Repeater. Each repeater item: label (h3),
       blurb (paragraph), CTA button linking to the matching service page.
       Track button clicks via Wix Analytics events with the same event names. --> */
const ClassMatchBlock = ({
  title = "Which class is right for me?",
  subtitle = "Pick the option that sounds most like you — we'll point you to the right next step.",
  options = DEFAULT_OPTIONS,
  tone = "warm",
}: Props) => {
  const bg =
    tone === "dark"
      ? "section-dark"
      : tone === "ivory"
      ? "bg-background"
      : "section-warm";
  const muted = tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground";

  return (
    <section className={`section-padding ${bg}`}>
      <div className="container-main max-w-5xl">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">
            Find Your Match
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          <p className={`text-sm md:text-base ${muted}`}>{subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl border border-border/60 bg-card p-5 flex flex-col"
            >
              <h3 className="font-heading font-bold text-base mb-2">{o.label}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{o.blurb}</p>
              <Link
                to={o.to}
                onClick={() => trackEvent("class_match", o.event, o.to)}
                className="btn-cta-primary text-xs self-start"
                data-event={o.event}
              >
                {o.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassMatchBlock;
