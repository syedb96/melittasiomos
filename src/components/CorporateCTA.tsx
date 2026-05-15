import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

/* <!-- WIX SECTION: CorporateCTA Strip — full-width band with CTA to /corporate-dance-classes-london --> */
const CorporateCTA = ({ compact = false }: { compact?: boolean }) => (
  <section className={`${compact ? "py-10" : "section-padding"} bg-charcoal`}>
    <div className="container-main max-w-5xl">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
        <div className="hidden md:flex w-14 h-14 rounded-full bg-primary/15 items-center justify-center flex-shrink-0">
          <Briefcase size={26} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
            Planning a team social?
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            Corporate Salsa & Bachata Classes in London
          </h3>
          <p className="text-primary-foreground/70 text-sm md:text-base font-heading max-w-2xl">
            Team building that gets people laughing, moving and connecting — without awkward icebreakers.
            Office, venue or evening packages tailored to your group.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link to="/corporate-dance-classes-london" className="btn-cta-primary text-sm whitespace-nowrap">
            Plan a corporate session →
          </Link>
          <a
            href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20a%20corporate%20Salsa%2FBachata%20session"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-ghost text-sm whitespace-nowrap"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CorporateCTA;
