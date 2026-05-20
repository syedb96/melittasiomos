import { Link } from "react-router-dom";
import { MapPin, Train, Clock, Users, Heart, Quote, MessageCircle } from "lucide-react";

export interface LocalTrustBlockProps {
  /** Area name e.g. "Hammersmith" */
  area: string;
  /** Nearest venue line e.g. "The George IV, Chiswick W4" */
  nearestVenue: string;
  /** Link to venue page or local page */
  venuePath?: string;
  /** Travel note e.g. "6 min on the District Line from Hammersmith" */
  travel: string;
  /** Best night to attend e.g. "Mondays — Salsa + Bachata + open social" */
  bestNight: string;
  /** Who it suits e.g. "Beginners, returners and intermediates — split-level rooms." */
  suits: string;
  /** Proof / testimonial line (1–2 sentences, no quote marks needed) */
  proof: string;
  /** Optional attribution for proof line */
  proofAttribution?: string;
}

/* <!-- WIX SECTION: LocalTrustBlock — replicate as a 2-column Strip:
       Left column = 6 fact rows (icon + label + value) inside a Repeater.
       Right column = pull quote card with serif italic + attribution.
       Bottom = 3 buttons (Schedule, Start Here, WhatsApp).
       Use brand gold hairline at top.  --> */
const LocalTrustBlock = ({
  area,
  nearestVenue,
  venuePath,
  travel,
  bestNight,
  suits,
  proof,
  proofAttribution,
}: LocalTrustBlockProps) => {
  const facts = [
    { icon: MapPin, label: "Nearest venue", value: nearestVenue, href: venuePath },
    { icon: Train, label: "Getting here", value: travel },
    { icon: Clock, label: "Best night", value: bestNight },
    { icon: Users, label: "Who it suits", value: suits },
    { icon: Heart, label: "Come alone", value: "No partner needed — we rotate partners every few minutes in class." },
  ];

  return (
    <section className="section-padding bg-card border-y border-border/60">
      <div className="container-main max-w-5xl">
        <div className="section-hairline mb-10" aria-hidden />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Facts */}
          <div>
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">
              Local Trust · {area}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Why {area} dancers trust Pura Nights
            </h2>
            <ul className="space-y-4">
              {facts.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-3">
                  <Icon size={18} className="text-primary flex-shrink-0 mt-1" />
                  <div className="text-sm">
                    <p className="font-heading font-semibold text-foreground">{label}</p>
                    {href ? (
                      <Link to={href} className="text-muted-foreground link-reveal">
                        {value}
                      </Link>
                    ) : (
                      <p className="text-muted-foreground">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Proof */}
          <div className="bg-background rounded-2xl p-6 md:p-8 border border-border/60 shadow-sm relative">
            <Quote size={28} className="text-primary/30 absolute top-4 left-4" aria-hidden />
            <p className="font-display italic text-lg md:text-xl leading-relaxed text-foreground pl-8 pt-2">
              {proof}
            </p>
            {proofAttribution && (
              <p className="mt-4 pl-8 text-xs uppercase tracking-[0.25em] text-primary font-heading">
                — {proofAttribution}
              </p>
            )}
            <div className="mt-8 pl-8 flex flex-wrap gap-3">
              <Link to="/schedule" className="btn-cta-primary text-xs">
                See Schedule →
              </Link>
              <Link to="/start-here" className="btn-cta-ghost text-xs">
                Start Here
              </Link>
              <a
                href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20a%20class."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary hover:underline"
              >
                <MessageCircle size={14} /> WhatsApp Melitta
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalTrustBlock;
