import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Award, Crown } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import MonthlyUnlimitedDialog from "@/components/MonthlyUnlimitedDialog";

/* <!-- WIX SECTION: Membership Pathway — replicate as a 4-card Repeater bound
     to a "MembershipTier" CMS collection (icon|label|price|bestFor|note|cta).
     Heading + intro sit above as Wix Title + Paragraph. CTA strip below as
     a 3-button Strip linking to /prices, /pura-nights and the WhatsApp prefill. --> */

const TIERS = [
  {
    key: "drop-in",
    icon: Sparkles,
    label: "Drop-in",
    price: "From £10",
    bestFor: "Best for first-timers",
    note: "Try one class + social. Zero commitment.",
  },
  {
    key: "5-class",
    icon: TrendingUp,
    label: "5-Class Bundle",
    price: "From £42",
    bestFor: "Best for building rhythm",
    note: "Use over 5–8 weeks. Locks in the habit.",
  },
  {
    key: "10-class",
    icon: Award,
    label: "10-Class Bundle",
    price: "From £78",
    bestFor: "Best value",
    note: "Save ~30%. Most dancers' favourite.",
  },
  {
    key: "monthly",
    icon: Crown,
    label: "Monthly Unlimited",
    price: "Ask Melitta",
    bestFor: "Best for regular dancers",
    note: "Both venues, every week, plus social.",
    highlight: true,
  },
] as const;

interface Props {
  /** Optional eyebrow override */
  eyebrow?: string;
  /** Optional title override */
  title?: string;
  /** Optional intro override */
  intro?: string;
  /** Tracking context for WhatsApp click */
  context?: string;
}

const MembershipPathwayBlock = ({
  eyebrow = "Choose Your Pass",
  title = "Your Pura Nights Pathway",
  intro = "Most students follow the same simple journey — try one class, return next week, then commit when you feel the spark. Pick the pass that matches where you are right now.",
  context = "membership_pathway",
  context = "membership_pathway",
}: Props) => {
  const [monthlyOpen, setMonthlyOpen] = useState(false);
  return (
    <section className="section-padding section-warm" aria-labelledby="membership-pathway-title">

    <section className="section-padding section-warm" aria-labelledby="membership-pathway-title">
      <div className="container-main max-w-6xl">
        <FadeInUp>
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">{eyebrow}</p>
          <h2
            id="membership-pathway-title"
            className="font-display text-3xl md:text-4xl font-bold mb-3"
          >
            {title}
          </h2>
          <p className="text-muted-foreground font-heading text-sm max-w-2xl mb-10">{intro}</p>
        </FadeInUp>

        {/* Journey strip */}
        <FadeInUp delay={0.05}>
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-10 text-[11px] font-heading">
            {[
              "1. Try one class",
              "2. Return next week",
              "3. Bundle of 5 or 10",
              "4. Monthly unlimited",
              "5. Ladies / Latin Friday / Private",
            ].map((step) => (
              <li
                key={step}
                className="bg-background rounded-lg p-3 border border-border/40 text-center text-muted-foreground"
              >
                {step}
              </li>
            ))}
          </ol>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((t) => {
            const Icon = t.icon;
            const highlight = "highlight" in t && t.highlight;
            return (
              <StaggerItem key={t.key}>
                <div
                  className={`h-full rounded-2xl p-5 border transition-colors ${
                    highlight
                      ? "bg-charcoal text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={16} className={highlight ? "text-primary" : "text-primary"} aria-hidden />
                    <span
                      className={`font-accent text-[10px] tracking-[0.2em] uppercase ${
                        highlight ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {t.bestFor}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-1">{t.label}</h3>
                  <p
                    className={`font-display text-2xl font-bold mb-2 ${
                      highlight ? "text-primary" : "text-primary"
                    }`}
                  >
                    {t.price}
                  </p>
                  <p
                    className={`text-xs leading-relaxed ${
                      highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {t.note}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/prices" className="btn-cta-primary text-xs">
            See full pricing →
          </Link>
          <Link to="/pura-nights" className="btn-cta-outline text-xs">
            Start with one class
          </Link>
          <button
            type="button"
            onClick={() => setMonthlyOpen(true)}
            className="btn-cta-outline text-xs"
            data-context={context}
          >
            👑 Get Monthly Unlimited pricing
          </button>
        </div>
      </div>
      <MonthlyUnlimitedDialog open={monthlyOpen} onClose={() => setMonthlyOpen(false)} />
    </section>
  );
};

export default MembershipPathwayBlock;


export default MembershipPathwayBlock;
