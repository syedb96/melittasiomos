import { Link } from "react-router-dom";
import { MapPin, Train, Sparkles, Music, Users, Calendar, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import RelatedPages from "@/components/RelatedPages";
import NearMeGrid from "@/components/NearMeGrid";
import ReviewVelocityTicker from "@/components/ReviewVelocityTicker";
import { CENTRAL_FROM_CG } from "@/data/near-me-areas";
import { REVIEW_VELOCITY_SNIPPETS } from "@/data/review-velocity";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { waCustom } from "@/lib/whatsapp";


/* <!-- WIX PAGE: /salsa-bachata-classes-covent-garden
        Wix page type: Static page
        SEO title: Salsa & Bachata Classes — Covent Garden & Central London | Melitta Siomos
        Meta description: Premium Salsa & Bachata coaching for dancers based in Covent Garden and Central London. Travel to West London weekly classes, book private lessons, or train online with Melitta Siomos.
        H1: Salsa & Bachata for Covent Garden & Central London
        Schema: Service (DanceSchool provider) + FAQPage
        Indexed: YES
        Primary CTA: WhatsApp Melitta + Book First Class
        Form/CRM tag: first-class / privates (depending on path chosen)
        Images to replace: Wix Pro Gallery hero (Melitta editorial), social dancing crowd shot
-->
*/

const faqs = [
  {
    q: "Are there weekly Salsa or Bachata classes in Covent Garden?",
    a: "Pura Nights does not currently run weekly classes in Covent Garden itself. Our weekly home is Chiswick (Mondays) and Ealing (Tuesdays) — both a direct Piccadilly or District line ride from Central London. Covent Garden-based dancers usually choose private lessons in Central London, online coaching, or travel west once a week.",
  },
  {
    q: "How long does it take to travel from Covent Garden to your classes?",
    a: "Around 30–35 minutes door-to-door. Piccadilly line direct to Turnham Green (Chiswick) or Ealing Common (Ealing). Many of our regulars commute in from Central London — they come for the teaching, the community and the social vibe.",
  },
  {
    q: "Can I book private lessons in Central London?",
    a: "Yes. Melitta runs private one-to-one and couples lessons in studios across Central and West London, including options near Covent Garden, Soho and Holborn. Wedding choreography and event prep are the most common formats.",
  },
  {
    q: "Do I need a partner?",
    a: "No partner needed for any Pura Nights format — group classes rotate, and private lessons can be solo, couple or small group.",
  },
  {
    q: "I work in Central London but live elsewhere — can I still join easily?",
    a: "Absolutely. Chiswick (Mon) and Ealing (Tue) are deliberately picked for fast Tube access from across Central, West and South West London. Most students treat it as a midweek reset.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Service", "FAQPage"],
  name: "Salsa & Bachata Classes — Covent Garden & Central London",
  serviceType: "Latin dance coaching",
  provider: {
    "@type": "DanceSchool",
    name: "Melitta Siomos Dance Academy",
    url: "https://www.puranights.com",
    telephone: "+447449482343",
    email: "siomosmelitta@gmail.com",
  },
  areaServed: [
    { "@type": "Place", name: "Covent Garden" },
    { "@type": "Place", name: "Central London" },
    { "@type": "Place", name: "Holborn" },
    { "@type": "Place", name: "Soho" },
  ],
  url: "https://www.puranights.com/salsa-bachata-classes-covent-garden",
  description: "Premium Salsa & Bachata coaching for Covent Garden and Central London dancers — private lessons, online coaching, wedding choreography, and West London weekly classes 30 minutes from Zone 1.",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const pathways = [
  {
    icon: Sparkles,
    title: "Private Lessons in Central London",
    desc: "One-to-one or couples coaching with Melitta in a Central London studio. Best for wedding prep, fast-tracking technique, or returning dancers.",
    link: "/private-lessons",
    cta: "Enquire about private lessons",
  },
  {
    icon: Music,
    title: "Online Coaching",
    desc: "Live Zoom + HD drill videos. Great if your evenings are unpredictable and you want to keep progressing between trips out west.",
    link: "/online-salsa-bachata-coaching",
    cta: "Explore online coaching",
  },
  {
    icon: Train,
    title: "Travel west for weekly classes",
    desc: "Mondays at The George IV, Chiswick · Tuesdays at Drayton Court, Ealing. ~30 mins from Covent Garden — and the community is worth the trip.",
    link: "/pura-nights",
    cta: "See weekly classes",
  },
  {
    icon: Calendar,
    title: "Latin Friday events",
    desc: "Monthly Latin social at Drayton Court Ealing — beginner-friendly intro, then open social dancing. Perfect first taste if you've never danced.",
    link: "/events",
    cta: "See next event",
  },
];

const SalsaBachataCoventGarden = () => (
  <Layout>
    <SeoHead
      title="Salsa & Bachata Classes — Covent Garden & Central London | Melitta Siomos"
      description="Premium Salsa & Bachata coaching for Covent Garden and Central London dancers. Private lessons, online coaching, wedding choreography, and West London weekly classes 30 minutes from Zone 1."
      path="/salsa-bachata-classes-covent-garden"
      schema={schema}
      dateModified="2026-05-16"
    />

    {/* Hero */}
    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(800px 400px at 70% 30%, hsl(var(--primary)/0.4), transparent 60%)" }} />
      <div className="container-main max-w-4xl relative">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">For Covent Garden · Holborn · Soho · Central London</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Salsa &amp; Bachata for Covent Garden &amp; Central London
          </h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl mb-8 font-heading">
            Train with Bachata UK Champion Melitta Siomos — privately in Central London, online, or at our West London weekly classes (≈30 minutes from Zone 1).
            Adult-focused, beginner-friendly, no partner needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              {...waCustom("Hi Melitta, I'm based near Covent Garden and would like to learn Salsa/Bachata", "SalsaBachataCoventGarden:132")}
             
             
              className="btn-cta-primary text-sm"
            >
              💬 WhatsApp Melitta
            </a>
            <Link to="/private-lessons" className="btn-cta-ghost text-sm">Private lessons in Central London →</Link>
          </div>
          <p className="mt-4 text-[11px] tracking-wide text-primary-foreground/60 font-accent">
            Premium coaching · Wedding & event ready · Trusted by 500+ adult students
          </p>
        </FadeInUp>
      </div>
    </section>

    {/* AnswerBox */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          tone="warm"
          question="Where can I learn Salsa or Bachata if I'm based in Covent Garden?"
          answer="If you live or work near Covent Garden, the best routes are private lessons in Central London, online coaching with Melitta, or a weekly trip to our Chiswick (Mon) or Ealing (Tue) classes — both ~30 minutes by Tube. There are no weekly Pura Nights group classes in Covent Garden itself; we don't run thin doorway sessions."
          bullets={[
            "Private 1-to-1 & couples lessons in Central London",
            "Live online coaching + HD drill videos",
            "Weekly classes in Chiswick & Ealing (Piccadilly / District line)",
            "Wedding choreography for Central London couples",
          ]}
          cta={{ label: "Ask Melitta what's best for you", href: waCustom("Hi Melitta, what's the best way for me to learn Salsa/Bachata from Covent Garden?", "SalsaBachataCoventGarden:162").href }}
        />
      </div>
    </section>

    {/* Review velocity — proof from recent students */}
    <ReviewVelocityTicker
      recentCount={12}
      windowLabel="last 30 days"
      ratingAvg={5.0}
      snippets={REVIEW_VELOCITY_SNIPPETS}
    />

    {/* Near-me grid — Central London → West London weekly venues */}
    <NearMeGrid
      id="near-cg"
      eyebrow="Near You — Central & West"
      title="Where Central London dancers commute from"
      intro="Pura Nights' weekly classes are in Chiswick (Mon) and Ealing (Tue). Here's how close they sit to the neighbourhoods Covent Garden dancers commute via."
      areas={CENTRAL_FROM_CG}
    />

    {/* Best for */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Best for…</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 font-heading text-sm">
            Pura Nights is built around adult social dancers — warm, inclusive, never cliquey. If any of these sound like you, you're in the right place.
          </p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            "Professionals in Central London wanting a midweek reset",
            "Engaged couples needing a polished first dance",
            "Returners who used to dance and want to come back properly",
            "Beginners who want serious teaching, not just a party",
            "Social dancers preparing for festivals or holidays",
            "People who hate gym workouts but love music",
          ].map((b) => (
            <StaggerItem key={b}>
              <div className="bg-card rounded-2xl p-5 border border-border/40 flex items-start gap-3 h-full">
                <CheckCircle2 size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm font-heading">{b}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Pathways */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-6xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">How to learn with Melitta if you're based in Covent Garden</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 font-heading text-sm">
            Pick the path that fits your schedule. Many Central London students mix two — e.g. private lessons plus a weekly trip out west.
          </p>
        </FadeInUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pathways.map((p) => (
            <div key={p.title} className="bg-card rounded-2xl p-6 border border-border/40 card-hover flex flex-col">
              <p.icon size={26} className="text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">{p.desc}</p>
              <Link to={p.link} className="text-primary font-heading text-sm font-semibold hover:underline">
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Travel context */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Travel context</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            ~30 minutes from Covent Garden
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-charcoal-light/40 rounded-2xl p-6 border border-primary-foreground/10">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Train size={18} /><p className="font-accent text-xs tracking-wider uppercase">Mondays · Chiswick</p>
              </div>
              <p className="font-heading font-bold text-primary-foreground mb-2">The George IV, Chiswick (W4 2DR)</p>
              <p className="text-primary-foreground/70 text-sm">Piccadilly line: Covent Garden → Turnham Green, ~28 min. Walk 4 min to the venue.</p>
            </div>
            <div className="bg-charcoal-light/40 rounded-2xl p-6 border border-primary-foreground/10">
              <div className="flex items-center gap-2 mb-2 text-peach">
                <Train size={18} /><p className="font-accent text-xs tracking-wider uppercase">Tuesdays · Ealing</p>
              </div>
              <p className="font-heading font-bold text-primary-foreground mb-2">Drayton Court Hotel, West Ealing (W13 8PH)</p>
              <p className="text-primary-foreground/70 text-sm">Central line: Holborn → Ealing Broadway via change, ~35 min. Or direct from Tottenham Court Rd.</p>
            </div>
          </div>
          <p className="text-primary-foreground/60 text-xs mt-6 font-accent">
            Travel times are approximate — check TfL for live status. We never claim a venue or class that we don't actually run.
          </p>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">Covent Garden FAQs</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="bg-card rounded-xl p-5 border border-border/40 group">
              <summary className="font-heading font-bold text-sm cursor-pointer list-none flex justify-between gap-3">
                {f.q}
                <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to start?</h2>
          <p className="text-muted-foreground mb-8 font-heading">
            Message Melitta directly — she'll recommend the right path for your goals, location and schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              {...waCustom("Hi Melitta, I'm based near Covent Garden and would like to learn Salsa/Bachata", "SalsaBachataCoventGarden:132")}
             
             
              className="btn-cta-primary text-sm"
            >
              💬 WhatsApp Melitta
            </a>
            <a
              href="https://www.tickettailor.com/events/puranights"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-dark text-sm"
            >
              Book a first class →
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages
      title="Explore More"
      links={[
        { to: "/private-lessons", label: "Private Lessons", desc: "Central London 1-to-1 coaching" },
        { to: "/wedding-dance", label: "Wedding Dance", desc: "First-dance choreography" },
        { to: "/online-salsa-bachata-coaching", label: "Online Coaching", desc: "Train from anywhere" },
        { to: "/pura-nights", label: "Weekly Classes", desc: "Chiswick & Ealing" },
        { to: "/events", label: "Latin Friday Events", desc: "Monthly social dancing" },
        { to: "/start-here", label: "Start Here", desc: "Brand new to dance?" },
      ]}
    />
  </Layout>
);

export default SalsaBachataCoventGarden;
