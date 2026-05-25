import { Train, Bus, Car, Footprints, Bike, Accessibility } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX SECTION: Local Transport Block — Replicate as a 6-card Repeater
     bound to a Wix "VenueTransport" collection (mode|label|detail|time).
     Heading stays as a Wix Title element above the Repeater. -->
*/

export interface TransportRow {
  mode: "tube" | "bus" | "walk" | "car" | "cycle" | "access";
  label: string;          // e.g. "Turnham Green (District)"
  detail: string;         // e.g. "3-min walk via Chiswick High Rd"
  time?: string;          // e.g. "3 min"
}

interface Props {
  venueName: string;
  postcode: string;
  rows: TransportRow[];
  parkingNote?: string;
  accessibilityNote?: string;
  /** Optional anchor id for jump-links from GBP & local pages */
  id?: string;
}

const ICONS = {
  tube: Train,
  bus: Bus,
  walk: Footprints,
  car: Car,
  cycle: Bike,
  access: Accessibility,
};

const LABELS = {
  tube: "Tube / Rail",
  bus: "Bus",
  walk: "Walk",
  car: "Drive & Park",
  cycle: "Cycle",
  access: "Step-free",
};

const LocalTransportBlock = ({
  venueName,
  postcode,
  rows,
  parkingNote,
  accessibilityNote,
  id = "getting-here",
}: Props) => {
  return (
    <section
      id={id}
      className="section-padding section-ivory"
      aria-labelledby={`${id}-title`}
      itemScope
      itemType="https://schema.org/Place"
    >
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
            Getting Here
          </p>
          <h2
            id={`${id}-title`}
            className="font-display text-3xl md:text-4xl font-bold mb-2"
          >
            How to reach {venueName}
          </h2>
          <p className="text-muted-foreground font-heading text-sm mb-10">
            <span itemProp="postalCode">{postcode}</span> · West London ·
            Step-by-step routes from every nearby station, bus stop and car park.
          </p>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((row, i) => {
            const Icon = ICONS[row.mode];
            return (
              <StaggerItem key={i}>
                <div className="h-full bg-background rounded-2xl p-5 border border-border hover:border-primary/40 transition-colors card-hover">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-primary" aria-hidden />
                    <span className="font-accent text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {LABELS[row.mode]}
                    </span>
                    {row.time && (
                      <span className="ml-auto text-[11px] font-heading font-semibold text-primary">
                        {row.time}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-bold mb-1">
                    {row.label}
                  </h3>
                  <p className="text-xs text-muted-foreground font-heading leading-relaxed">
                    {row.detail}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {(parkingNote || accessibilityNote) && (
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {parkingNote && (
              <div className="rounded-xl border-l-4 border-primary bg-background p-4">
                <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-primary mb-1">
                  Parking
                </p>
                <p className="text-xs text-muted-foreground font-heading leading-relaxed">
                  {parkingNote}
                </p>
              </div>
            )}
            {accessibilityNote && (
              <div className="rounded-xl border-l-4 border-peach bg-background p-4">
                <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-peach mb-1">
                  Accessibility
                </p>
                <p className="text-xs text-muted-foreground font-heading leading-relaxed">
                  {accessibilityNote}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LocalTransportBlock;
