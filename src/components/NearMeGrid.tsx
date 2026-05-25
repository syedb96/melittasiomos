import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX SECTION: Near-Me Grid — Replicate as a Wix Repeater bound to the
     "Neighbourhoods" collection (slug|name|postcode|distance|venueKey).
     Filter the Repeater by current page's venueKey before rendering. -->
*/

export interface NearMeArea {
  slug: string;        // e.g. "salsa-classes-acton"
  name: string;        // e.g. "Acton"
  postcode: string;    // e.g. "W3"
  distance: string;    // e.g. "1.6 mi · 8 min"
  venue: "Chiswick" | "Ealing" | "Both";
}

interface Props {
  title?: string;
  eyebrow?: string;
  intro?: string;
  areas: NearMeArea[];
  /** Optional anchor id */
  id?: string;
}

const VENUE_TINT: Record<NearMeArea["venue"], string> = {
  Chiswick: "border-primary/30 hover:border-primary",
  Ealing: "border-peach/30 hover:border-peach",
  Both: "border-gold/40 hover:border-gold",
};

const NearMeGrid = ({
  title = "Salsa & Bachata near you",
  eyebrow = "Near-Me Map",
  intro = "Pura Nights is the closest weekly Latin dance class for these West London neighbourhoods. Pick your area for tube routes, parking and what to expect on your first night.",
  areas,
  id = "near-me",
}: Props) => {
  return (
    <section
      id={id}
      className="section-padding bg-card"
      aria-labelledby={`${id}-title`}
    >
      <div className="container-main max-w-6xl">
        <FadeInUp>
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="font-display text-3xl md:text-4xl font-bold mb-3"
          >
            {title}
          </h2>
          <p className="text-muted-foreground font-heading text-sm max-w-2xl mb-10">
            {intro}
          </p>
        </FadeInUp>

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          staggerDelay={0.04}
        >
          {areas.map((a) => (
            <StaggerItem key={a.slug}>
              <Link
                to={`/${a.slug}`}
                className={`group block h-full bg-background rounded-xl p-4 border ${VENUE_TINT[a.venue]} transition-all`}
              >
                <div className="flex items-start justify-between mb-2">
                  <MapPin size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-base font-bold leading-tight mb-1">
                  {a.name}
                </h3>
                <p className="font-accent text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  {a.postcode} · {a.venue}
                </p>
                <p className="text-[11px] text-muted-foreground font-heading">
                  {a.distance}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default NearMeGrid;
