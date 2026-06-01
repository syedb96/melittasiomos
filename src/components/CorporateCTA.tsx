import { Link } from "react-router-dom";
import { Briefcase, HeartPulse, Sparkles, ArrowRight } from "lucide-react";

/* <!-- WIX SECTION: CorporateCTA Strip — premium 3-track band linking to /corporate-dance-classes-london -->
   Three equal-weight offers: Team-building workshop · Wellness program · Private events.
   Wix: replicate as a 3-column Strip + Repeater connected to a "CorporateTracks" collection. */

const TRACKS = [
  {
    icon: Briefcase,
    eyebrow: "Team-Building",
    title: "Latin Workshops (1–2 hrs)",
    body: "A single-session energy boost for offices, away-days and onboarding socials. Beginner-friendly, no partner needed.",
    href: "/corporate-dance-classes-london#packages",
    waContext: "I'd like to enquire about a 1-2hr team-building Salsa/Bachata workshop",
  },
  {
    icon: HeartPulse,
    eyebrow: "Wellness Program",
    title: "Recurring Weekly Classes",
    body: "Multi-week Latin programs as part of staff wellbeing benefits. We come to your office or host at our West London venues.",
    href: "/corporate-dance-classes-london#packages",
    waContext: "I'd like to enquire about a multi-week corporate wellness Latin program",
  },
  {
    icon: Sparkles,
    eyebrow: "Private Events",
    title: "Parties & End-of-Year Socials",
    body: "Class + social dancing for company parties, hospitality activations and Christmas evenings. Up to 120 guests.",
    href: "/corporate-dance-classes-london#packages",
    waContext: "I'd like to enquire about a private corporate event / end-of-year party",
  },
];

const waUrl = (context: string) =>
  `https://wa.me/447449482343?text=${encodeURIComponent(`Hi Melitta, ${context}.`)}`;

const CorporateCTA = ({ compact = false }: { compact?: boolean }) => (
  <section
    className={`${compact ? "py-14" : "section-padding"} relative overflow-hidden bg-charcoal text-primary-foreground`}
  >
    <div
      aria-hidden
      className="absolute inset-0 opacity-30"
      style={{
        background:
          "radial-gradient(900px 380px at 20% 20%, hsl(var(--primary)/0.35), transparent 65%), radial-gradient(700px 320px at 85% 80%, hsl(var(--secondary)/0.25), transparent 70%)",
      }}
    />
    <div className="container-main relative max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <p className="font-accent text-[10px] tracking-[0.32em] uppercase text-primary mb-3">
            For Teams · Offices · Events
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Corporate Salsa &amp; Bachata in London — three ways to book
          </h3>
          <p className="text-primary-foreground/70 mt-3 font-heading text-sm md:text-base">
            Bachata UK Champion Melitta Siomos delivers beginner-friendly Latin dance
            to offices, hotels and members' clubs across London. Quote within 24 hours.
          </p>
        </div>
        <Link
          to="/corporate-dance-classes-london"
          className="self-start md:self-auto inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm hover:gap-3 transition-all"
        >
          See all corporate packages <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {TRACKS.map((t) => (
          <div
            key={t.title}
            className="group rounded-2xl border border-primary-foreground/10 bg-charcoal-light/40 backdrop-blur-sm p-6 flex flex-col hover:border-primary/40 hover:bg-charcoal-light/60 transition-all"
          >
            <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center mb-4">
              <t.icon size={20} className="text-primary" />
            </div>
            <p className="font-accent text-[10px] tracking-[0.28em] uppercase text-primary/80 mb-1.5">
              {t.eyebrow}
            </p>
            <h4 className="font-display text-xl font-bold mb-2 leading-tight">{t.title}</h4>
            <p className="text-primary-foreground/65 text-sm font-heading flex-1 mb-5">{t.body}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to={t.href}
                className="btn-cta-primary text-xs py-2.5 px-4 rounded-lg text-center flex-1"
              >
                Get a quote →
              </Link>
              <a
                href={waUrl(t.waContext)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-heading font-semibold py-2.5 px-4 rounded-lg border border-primary-foreground/20 text-primary-foreground/80 hover:border-primary hover:text-primary text-center transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-[11px] font-heading text-primary-foreground/55 tracking-wide">
        <span>✓ FTSE-100 &amp; agency teams</span>
        <span className="text-primary-foreground/20">·</span>
        <span>✓ 8 to 120 guests</span>
        <span className="text-primary-foreground/20">·</span>
        <span>✓ Office, venue or our Chiswick / Ealing rooms</span>
        <span className="text-primary-foreground/20">·</span>
        <span>✓ Reply within 1 working day</span>
      </div>
    </div>
  </section>
);

export default CorporateCTA;
