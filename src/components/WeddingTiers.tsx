import { Check, Minus } from "lucide-react";

interface Tier {
  name: string;
  ideal: string;
  features: (string | false)[];
  highlight?: boolean;
}

interface WeddingTiersProps {
  heading?: string;
  subcopy?: string;
}

const FEATURES = [
  "Free 20-min consultation call",
  "Personalised choreography",
  "Music edit & first-dance cut",
  "In-person studio sessions",
  "Online practice videos between lessons",
  "Wedding-day technical run-through",
  "Group lesson for the wedding party",
];

const TIERS: Tier[] = [
  {
    name: "Essentials",
    ideal: "Couples wanting a confident, simple first dance — short engagement, fast-track",
    features: [true as any, true, false, true, false, false, false],
  },
  {
    name: "Signature",
    ideal: "Most couples — polished, photogenic first dance with time to rehearse properly",
    features: [true as any, true, true, true, true, true, false],
    highlight: true,
  },
  {
    name: "Showcase",
    ideal: "Cinematic moment, multi-song or surprise reveal, wedding-party group performance",
    features: [true as any, true, true, true, true, true, true],
  },
];

/* <!-- WIX SECTION: WeddingTiers — replicate as 3-column comparison Strip with check/cross icons --> */
const WeddingTiers = ({
  heading = "What's included — three ways we work with couples",
  subcopy = "Every couple is different, so prices are quoted on enquiry. Use this as a guide to the level of detail and rehearsal time included at each tier.",
}: WeddingTiersProps) => (
  <section className="section-padding section-warm">
    <div className="container-main max-w-6xl">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{heading}</h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">{subcopy}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <article
            key={tier.name}
            className={`rounded-2xl p-6 card-hover ${
              tier.highlight
                ? "bg-charcoal text-primary-foreground border-2 border-primary shadow-elegant"
                : "bg-card border border-border"
            }`}
          >
            <h3 className="font-display text-2xl font-bold mb-1">{tier.name}</h3>
            <p className={`text-xs font-heading mb-5 ${tier.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{tier.ideal}</p>
            <ul className="space-y-3 mb-6">
              {FEATURES.map((feat, i) => (
                <li key={feat} className="flex items-start gap-2 text-sm">
                  {tier.features[i] ? (
                    <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <Minus size={16} className={`flex-shrink-0 mt-0.5 ${tier.highlight ? "text-primary-foreground/30" : "text-muted-foreground/40"}`} />
                  )}
                  <span className={tier.features[i] ? "" : tier.highlight ? "text-primary-foreground/40 line-through" : "text-muted-foreground/50 line-through"}>{feat}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20a%20wedding%20dance%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center text-xs font-heading font-semibold rounded-md py-3 ${
                tier.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:border-primary hover:text-primary"
              }`}
            >
              Request a {tier.name} quote
            </a>
          </article>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8 font-heading">
        Wedding pricing is always tailored — venue, timeline, music, and party size all change the quote. Free consultation for every couple.
      </p>
    </div>
  </section>
);

export default WeddingTiers;
