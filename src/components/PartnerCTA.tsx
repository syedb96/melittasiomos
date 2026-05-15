import { Link } from "react-router-dom";
import { Handshake } from "lucide-react";

/* <!-- WIX SECTION: PartnerCTA Strip — band with CTA to /partner-with-pura-nights --> */
const PartnerCTA = ({ compact = false }: { compact?: boolean }) => (
  <section className={`${compact ? "py-10" : "section-padding"} section-warm border-t border-border/40`}>
    <div className="container-main max-w-5xl">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
        <div className="hidden md:flex w-14 h-14 rounded-full bg-secondary/15 items-center justify-center flex-shrink-0">
          <Handshake size={26} className="text-secondary" />
        </div>
        <div className="flex-1">
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-secondary mb-2">
            Venues, Suppliers & Media
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Partner with Pura Nights
          </h3>
          <p className="text-muted-foreground text-sm md:text-base font-heading max-w-2xl">
            Bring real Latin energy to your venue, event or audience — and tap into West London's
            most engaged Salsa &amp; Bachata community.
          </p>
        </div>
        <Link to="/partner-with-pura-nights" className="btn-cta-primary text-sm whitespace-nowrap flex-shrink-0">
          Start a partnership →
        </Link>
      </div>
    </div>
  </section>
);

export default PartnerCTA;
