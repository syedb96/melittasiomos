import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import RelatedPages from "@/components/RelatedPages";
import ProofBlock from "@/components/ProofBlock";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { MapPin, Train, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import { waCustom } from "@/lib/whatsapp";

const WA_AUDITION =
  waCustom("Hi Melitta, I'd like to ask about Pura Ladies Covent Garden / Central London auditions", "PuraLadiesCoventGarden:11").href;

const faqs = [
  { q: "Where do Pura Ladies rehearse if I'm based in Covent Garden?", a: "The London Pura Ladies team rehearses in West London (Chiswick / Ealing). From Covent Garden it's roughly 25–35 minutes on the Piccadilly line. Many of our current members live in Zone 1 and commute weekly." },
  { q: "Do I need to live in West London to join?", a: "No. We have members commuting from Covent Garden, Holborn, Soho, Bloomsbury, King's Cross and Waterloo. The rehearsal venue is fixed; what matters is consistency, not postcode." },
  { q: "What level do I need to be to audition?", a: "Improvers and above. If you're newer, start at Pura Nights weekly classes for 4–8 weeks, then audition at the next intake. The free Tuesday Ladies Styling warm-up in Ealing is open to all levels." },
  { q: "How often are auditions?", a: "Roughly twice a year — typically February and September. Follow @puraladies on Instagram and join the Pura Nights mailing list to be notified first." },
  { q: "Can I take private lessons in Central London first?", a: "Yes. Melitta runs private styling and audition-prep sessions in Central London on request — fast-track your technique before auditioning." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Service", "FAQPage"],
  name: "Pura Ladies — Covent Garden & Central London Pathway",
  serviceType: "Bachata ladies styling and performance team auditions",
  provider: {
    "@type": "Organization",
    name: "Pura Ladies",
    founder: { "@type": "Person", name: "Melitta Siomos" },
    url: "https://www.puranights.com/pura-ladies",
  },
  areaServed: [
    { "@type": "Place", name: "Covent Garden, London" },
    { "@type": "Place", name: "Central London (WC2, WC1, W1)" },
  ],
  description:
    "Pathway page for dancers in Covent Garden and Central London to join Pura Ladies — the all-female Bachata performance team founded by Melitta Siomos. Auditions held twice a year. Rehearsals in West London, easy commute via Piccadilly line.",
  url: "https://www.puranights.com/pura-ladies-covent-garden",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* <!-- WIX PAGE: /pura-ladies-covent-garden -->
   <!-- WIX SECTION: Hero — Strip with performance image, dark overlay -->
   <!-- WIX SECTION: AnswerBox — Strip with H3, paragraph, bullets -->
   <!-- WIX SECTION: Commute Grid — 3-column repeater (Tube, Bus, Cycle) -->
   <!-- WIX SECTION: Pathway — Numbered steps strip -->
   <!-- WIX SECTION: What we look for — icon list -->
   <!-- WIX SECTION: FAQ — Wix FAQ app -->
   <!-- WIX SECTION: CTA Band — WhatsApp + Instagram -->
   <!-- IMPORTANT: enquiry-only, no public pricing, no Event schema --> */
const PuraLadiesCoventGarden = () => (
  <Layout>
    <SeoHead
      title="Pura Ladies Covent Garden | Bachata Performance Team Central London"
      description="Live in Covent Garden, Soho, Holborn or Central London? Join Pura Ladies — the all-female Bachata performance team founded by Melitta Siomos. Easy Piccadilly line commute. Auditions twice a year."
      path="/pura-ladies-covent-garden"
      schema={schema}
      dateModified="2026-05-16"
    />

    {/* Hero */}
    <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
      <img
        src={puraLadiesImg}
        alt="Pura Ladies bachata performance team rehearsal — Central London pathway"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">
            Covent Garden · Soho · Holborn · WC2
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Pura Ladies — Central London Pathway
          </h1>
          <p className="text-primary-foreground/85 font-heading text-lg max-w-2xl mx-auto">
            Live in Zone 1? Join London's leading all-female Bachata performance team — rehearsals 25 minutes west on the Piccadilly line.
          </p>
        </div>
      </div>
    </section>

    {/* AnswerBox */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          tone="warm"
          question="Can I join Pura Ladies if I live in Covent Garden or Central London?"
          answer="Yes. Pura Ladies London rehearses in West London (Chiswick / Ealing), roughly 25–35 minutes from Covent Garden on the Piccadilly line. Several current members commute in from WC2, WC1, W1 and SE1. Auditions run twice a year — typically February and September."
          bullets={[
            "Rehearsals: West London, 1 evening per week",
            "Commute: 25–35 min via Piccadilly / District line",
            "Audition level: improvers and above",
            "Pathway: start at Pura Nights → free Tuesday styling warm-up → audition",
          ]}
          cta={{ label: "Ask about the next audition", href: WA_AUDITION }}
        />
      </div>
    </section>

    {/* Commute grid */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">
            Getting to Rehearsals from Central London
          </h2>
          <p className="text-muted-foreground text-center mb-10 font-heading text-sm max-w-2xl mx-auto">
            Honest transit times from Covent Garden — most members find the commute easier than getting across Central London at rush hour.
          </p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Train, title: "Piccadilly line", body: "Covent Garden → Turnham Green: ~25 min direct. Chiswick venue is a 6-min walk from the station." },
            { icon: Train, title: "District line", body: "Embankment → Ealing Common: ~30 min. Drayton Court rehearsal venue is a 4-min walk." },
            { icon: Clock, title: "Cycle / Cab", body: "Cycle: 35–40 min along the river path. Uber/black cab: 25–35 min off-peak." },
          ].map((b) => (
            <StaggerItem key={b.title}>
              <div className="bg-card rounded-2xl p-6 border border-border/40 h-full">
                <b.icon size={22} className="text-primary mb-3" />
                <h3 className="font-heading font-bold text-sm mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Pathway */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center text-primary-foreground">
            Your Audition Pathway from Central London
          </h2>
        </FadeInUp>
        <ol className="space-y-5">
          {[
            { t: "Train weekly at Pura Nights", d: "Mon (Chiswick) or Tue (Ealing) improvers/intermediate. Build the foundation Pura Ladies is built on." },
            { t: "Join the free Tuesday warm-up", d: "Ladies styling, 30 minutes before Tuesday classes in Ealing — open to all levels, no booking." },
            { t: "Optional: book central private lessons", d: "Audition-prep 1-to-1s available in Central London to sharpen styling and presence." },
            { t: "Audition at the next intake", d: "Typically Feb + Sept. Solo styling + short combination + brief chat with Melitta." },
            { t: "Rehearse + perform", d: "Weekly rehearsals in West London. Performances at UK and European festivals." },
          ].map((s, i) => (
            <li
              key={i}
              className="flex gap-4 items-start bg-charcoal-light/40 rounded-xl p-5 border border-primary-foreground/10"
            >
              <span className="font-display text-2xl text-primary font-bold flex-shrink-0 w-8">
                {i + 1}
              </span>
              <div>
                <p className="font-heading font-bold text-primary-foreground text-sm mb-1">{s.t}</p>
                <p className="text-primary-foreground/75 text-sm">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* What we look for */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">What We Look For</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Improvers level or above in Bachata",
            "Commitment to one weekly rehearsal",
            "Team-first attitude — the sisterhood is real",
            "Reliable attendance through performance cycles",
            "Open to feedback, styling work and stage prep",
            "All body types, ages 18+, all backgrounds welcome",
          ].map((o) => (
            <div key={o} className="flex gap-3 items-start">
              <CheckCircle2 size={20} className="text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm font-heading">{o}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <ProofBlock
      categories={["pura-ladies"]}
      eyebrow="Voices from the Team"
      title="Why Central London dancers commute west for Pura Ladies"
      limit={3}
      variant="dark"
    />

    {/* FAQ */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">FAQs — Central London Auditions</h2>
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

    {/* CTA band */}
    <section className="section-padding text-center" style={{ background: "var(--gradient-gold)" }}>
      <div className="container-main max-w-2xl">
        <Sparkles size={28} className="text-charcoal mx-auto mb-4" />
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
          Ready to audition for Pura Ladies?
        </h2>
        <p className="text-charcoal/75 mb-8 font-heading">
          Message Melitta directly — she'll confirm the next audition window and the warm-up sessions running between now and then.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={WA_AUDITION} target="_blank" rel="noopener noreferrer" className="btn-cta-dark">
            💬 WhatsApp Melitta
          </a>
          <a
            href="https://www.instagram.com/puraladies/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20"
          >
            📲 Follow @puraladies
          </a>
        </div>
        <p className="text-charcoal/60 text-xs mt-6 font-heading flex items-center justify-center gap-1">
          <MapPin size={12} /> Rehearsals in West London · 25 min from Covent Garden
        </p>
      </div>
    </section>

    <RelatedPages
      title="Related Pathways"
      links={[
        { to: "/pura-ladies", label: "Pura Ladies — Main", desc: "All 7 teams, 4 countries" },
        { to: "/salsa-bachata-classes-covent-garden", label: "Covent Garden Classes", desc: "Central London options" },
        { to: "/private-lessons", label: "Private Lessons", desc: "Audition prep, 1-to-1" },
        { to: "/ladies-styling-london", label: "Ladies Styling", desc: "Free Tuesday warm-up" },
        { to: "/pura-nights", label: "Weekly Classes", desc: "Build the foundation" },
        { to: "/proof-centre", label: "Proof Centre", desc: "Reviews + credentials" },
      ]}
    />
  </Layout>
);

export default PuraLadiesCoventGarden;
