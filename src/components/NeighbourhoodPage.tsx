import { Link } from "react-router-dom";
import { MapPin, Clock, CheckCircle, ChevronRight, Train } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import AnswerBox from "@/components/AnswerBox";
import { FadeInUp } from "@/components/animations";
import heroImg from "@/assets/salsa-class-teaching.jpg";

export interface NeighbourhoodConfig {
  /** Display name e.g. "Brentford" */
  name: string;
  /** Postcode chip e.g. "TW8" */
  postcode: string;
  /** URL slug e.g. "salsa-classes-brentford" */
  slug: string;
  /** Distance + transit blurb to Chiswick */
  toChiswick: string;
  /** Distance + transit blurb to Ealing */
  toEaling: string;
  /** Why this area paragraph */
  areaIntro: string;
  /** Local context – who comes from here */
  localProfile: string;
  /** AnswerBox question for AI/GEO */
  geoQuestion: string;
  /** AnswerBox concise answer */
  geoAnswer: string;
}

/* <!-- WIX PAGE: programmatic neighbourhood template -->
   <!-- WIX SECTION: Hero — Strip with overlay + heading -->
   <!-- WIX SECTION: Why area — text Strip warm bg -->
   <!-- WIX SECTION: How to get here — 2-card grid -->
   <!-- WIX SECTION: What you'll learn — bullet Strip -->
   <!-- WIX SECTION: AnswerBox — H3 + bullets + CTA -->
   <!-- WIX SECTION: CTA Band — gold gradient -->
*/
const NeighbourhoodPage = ({ config }: { config: NeighbourhoodConfig }) => (
  <Layout>
    <SeoHead
      title={`Salsa Classes ${config.name} | Weekly Salsa & Bachata Near ${config.name} | Pura Nights`}
      description={`Salsa classes near ${config.name} (${config.postcode}). Pura Nights runs weekly Salsa & Bachata classes in Chiswick (Mon) and Ealing (Tue). All levels, no partner needed.`}
      path={`/${config.slug}`}
      schema={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: `Salsa & Bachata Classes Near ${config.name}`,
        description: `Weekly Salsa and Bachata dance classes accessible from ${config.name}, ${config.postcode}. Held at venues in Chiswick and Ealing by award-winning instructor Melitta Siomos.`,
        provider: { "@type": "Organization", name: "Pura Nights by Melitta Siomos", url: "https://www.puranights.com" },
        areaServed: [config.name, "West London", "Chiswick", "Ealing"],
      }}
    />

    {/* Hero */}
    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt={`Salsa class near ${config.name}`} className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/salsa-classes-london" className="hover:text-primary">Salsa London</Link> / <span className="text-primary">{config.name}</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Salsa Classes Near {config.name} — Weekly Salsa &amp; Bachata in {config.postcode}</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">Live in {config.name}? Pura Nights runs London's most welcoming Salsa &amp; Bachata classes just minutes away — Chiswick on Mondays and Ealing on Tuesdays. No partner needed, all levels welcome.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">Book a Class</a>
            <Link to="/start-here" className="btn-cta-ghost">New to Dancing?</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Why area */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Why {config.name} Loves Latin Dance</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{config.areaIntro}</p>
        </FadeInUp>
      </div>
    </section>

    {/* Getting Here */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">How to Get Here from {config.name}</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-background rounded-2xl p-6 card-hover border-l-4 border-primary h-full">
            <h3 className="font-display text-xl font-bold text-primary mb-2">Monday — Chiswick</h3>
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p className="flex items-center gap-2"><Train size={14} className="text-primary" /> {config.toChiswick}</p>
              <p className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 7:30 PM Beginners · 8:00 Improvers · 8:30 Intermediate</p>
              <p>9:00–11:00 PM Social Dancing</p>
            </div>
            <Link to="/salsa-classes-chiswick" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Full Chiswick details <ChevronRight size={12} /></Link>
          </div>
          <div className="bg-background rounded-2xl p-6 card-hover border-l-4 border-peach h-full">
            <h3 className="font-display text-xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p className="flex items-center gap-2"><Train size={14} className="text-peach" /> {config.toEaling}</p>
              <p className="flex items-center gap-2"><Clock size={14} className="text-peach" /> 6:50 Free Styling · 7:30 Beginners · 8:00 Improvers · 8:30 Intermediate</p>
              <p>9:00–11:00 PM Social Dancing</p>
            </div>
            <Link to="/salsa-classes-ealing" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Full Ealing details <ChevronRight size={12} /></Link>
          </div>
        </div>
      </div>
    </section>

    {/* What we teach */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What You'll Learn</h2>
          <div className="space-y-3">
            {[
              "Salsa On1 (Crossbody / LA style) — the most widely danced social salsa style worldwide",
              "Bachata Moderna & Sensual — smooth, expressive, and deeply musical partner dance",
              "Ladies Styling — body movement, arm styling, footwork, and confidence building",
              "Musicality — clave, melody, and how to express the music through movement",
              "Partner connection — leading, following, and communication on the social floor",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Local profile */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Who Comes From {config.name}?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{config.localProfile}</p>
        </FadeInUp>
      </div>
    </section>

    {/* AnswerBox */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question={config.geoQuestion}
          answer={config.geoAnswer}
          bullets={[
            "Mon: George IV, Chiswick W4 — Beginners 7:30 PM, social to 11 PM",
            "Tue: Drayton Court, W13 — Beginners 7:30 PM, social to 11 PM",
            "From £10 / class · drop-in, no booking required",
            "All levels welcome, no partner needed",
          ]}
          cta={{ label: "See full schedule", to: "/schedule" }}
          tone="warm"
        />
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Ready to Dance?</h2>
        <p className="text-charcoal/70 mb-6 max-w-lg mx-auto">Join hundreds of West London residents who've found their rhythm at Pura Nights. No experience needed.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Class</a>
          <Link to="/prices" className="text-charcoal font-heading font-semibold text-sm hover:opacity-70 transition-opacity">View Pricing →</Link>
        </div>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/pura-nights", label: "Full Schedule" },
      { to: "/start-here", label: "New to Dancing?" },
    ]} />
  </Layout>
);

export default NeighbourhoodPage;
