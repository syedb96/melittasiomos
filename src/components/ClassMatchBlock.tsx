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
    label: "I'm a complete beginner",
    blurb: "Never danced before — start from scratch with a friendly intro.",
    cta: "Start Here",
    to: "/start-here",
    event: "class_match_beginner_click",
  },
  {
    id: "weekly",
    label: "I want weekly social dancing",
    blurb: "Drop in to Monday Chiswick or Tuesday Ealing — every week.",
    cta: "See Weekly Classes",
    to: "/pura-nights",
    event: "class_match_weekly_click",
  },
  {
    id: "wedding",
    label: "I'm preparing for a wedding",
    blurb: "Bespoke first-dance choreography with Melitta.",
    cta: "Wedding Dance Lessons",
    to: "/wedding-dance",
    event: "class_match_wedding_click",
  },
  {
    id: "private",
    label: "I want private coaching",
    blurb: "1-to-1 sessions tailored to your level and goals.",
    cta: "Private Lessons",
    to: "/private-lessons",
    event: "class_match_private_click",
  },
  {
    id: "corporate",
    label: "I'm booking for a company or group",
    blurb: "Corporate, hen, birthday or team-building sessions.",
    cta: "Corporate / Group Sessions",
    to: "/corporate-dance-classes-london",
    event: "class_match_corporate_click",
  },
  {
    id: "loyalty",
    label: "I want to dance more regularly",
    blurb: "Join the loyalty card — your 9th session is on us.",
    cta: "Loyalty Card",
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
