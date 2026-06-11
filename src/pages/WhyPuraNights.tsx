import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import testimonials from "@/data/testimonials";
import ReviewWall from "@/components/ReviewWall";

const rows = [
  { l: { t: "Championship-level instruction", d: "Melitta Siomos is a UK Bachata Championship medal holder with 20+ years of performance and teaching." }, r: { t: "Variable instruction quality", d: "Many London schools use rotating or junior instructors. You may not know who's teaching until you arrive." } },
  { l: { t: "Intimate West London venues", d: "George IV Chiswick (W4) and Drayton Court Ealing (W13) — proper dance floors, not converted gym halls." }, r: { t: "Larger, more impersonal venues", d: "Many large-class schools prioritise volume over experience. Beginners often get lost in the crowd." } },
  { l: { t: "Consistent teacher — every class", d: "Melitta teaches or personally supervises every class. You build a real relationship with your instructor." }, r: { t: "Instructor rotation", d: "High-volume schools frequently rotate instructors. Progress can stall without consistent guidance." } },
  { l: { t: "No rigid contracts", d: "Drop-in, starter packs, or private enquiries — all on your terms." }, r: { t: "Membership commitments", d: "Some schools require term-long or monthly contract sign-ups before you can attend." } },
  { l: { t: "Monthly Latin Friday social", d: "A proper monthly social — Drayton Court, Ealing — not just another class." }, r: { t: "Classes only", d: "Many local schools don't run their own social events." } },
];

const faqs = [
  { q: "Is Pura Nights right for absolute beginners?", a: "Yes — every class starts from zero. Most of our regular students arrived with no dance experience at all." },
  { q: "How does Pura Nights compare to larger London dance schools?", a: "The biggest difference is consistency — Melitta teaches every class, at intimate West London venues, with a partner-rotation system that means no one sits out. Larger schools offer higher volume; we offer higher quality per session." },
  { q: "Do you offer trial classes before committing?", a: "Yes — claim a free taster class at www.puranights.com/free-taster. No card required." },
  { q: "What areas of London do you serve?", a: "Weekly classes in Chiswick (W4) and Ealing (W13). Our students travel from across West London including Hammersmith, Acton, Shepherd's Bush, Brentford, Kew, Richmond, and Twickenham." },
  { q: "Is Melitta still actively competing?", a: "Melitta remains active in the UK and international Latin dance scene. Her ongoing performance work keeps her teaching current — what she teaches in class is what she dances on stage." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
    { "@type": "ListItem", position: 2, name: "Why Pura Nights", item: "https://www.puranights.com/why-pura-nights" },
  ],
};

const WhyPuraNights = () => {
  const proof = testimonials.slice(0, 3);
  return (
    <Layout>
      <SeoHead
        title="Why Choose Pura Nights — Salsa & Bachata in West London"
        description="Compare Pura Nights with other London dance schools. Championship instruction, welcoming community, West London locations, no contracts."
        path="/why-pura-nights"
      />
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      <section className="section-padding section-warm text-center">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Why Choose Us</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Not just another dance class.</h1>
            <p className="text-muted-foreground font-heading max-w-xl mx-auto">West London has plenty of dance schools. Here's why students who try Pura Nights stay.</p>
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding section-ivory">
        <div className="container-main max-w-5xl">
          <StaggerContainer className="space-y-4" staggerDelay={0.05}>
            {rows.map((row, i) => (
              <StaggerItem key={i}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card border-l-4 border-primary rounded-xl p-6">
                    <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Pura Nights</p>
                    <h3 className="font-heading font-bold mb-2">{row.l.t}</h3>
                    <p className="text-muted-foreground text-sm">{row.l.d}</p>
                  </div>
                  <div className="bg-muted/30 border-l-4 border-muted rounded-xl p-6">
                    <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">Typical London schools</p>
                    <h3 className="font-heading font-bold mb-2">{row.r.t}</h3>
                    <p className="text-muted-foreground text-sm">{row.r.d}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding section-warm">
        <div className="container-main max-w-5xl">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">The credentials behind the classes</h2>
          </FadeInUp>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: "UK Bachata Championship", d: "Medal winner — one of the UK's most competitive Latin dance events." },
              { t: "20+ Years Teaching", d: "Melitta has taught students from complete beginner to competition level." },
              { t: "West London Community", d: "500+ students across Chiswick and Ealing since 2019." },
            ].map((c, i) => (
              <div key={i} className="bg-card rounded-xl p-6 text-center card-hover">
                <p className="font-display text-xl font-bold mb-2 text-primary">{c.t}</p>
                <p className="text-muted-foreground text-sm">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-main max-w-5xl">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Student voices</h2>
          </FadeInUp>
          <div className="grid md:grid-cols-3 gap-5">
            {proof.map((t, i) => (
              <div key={i} className="bg-card rounded-lg p-6 border border-primary/15 shadow-sm">
                <span className="font-display text-3xl text-primary leading-none" aria-hidden>"</span>
                <p className="text-sm leading-relaxed mb-3">{t.quote}</p>
                <p className="font-heading font-bold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8">Common questions</h2>
          </FadeInUp>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="bg-card rounded-xl p-5 group">
                <summary className="font-heading font-semibold cursor-pointer hover:text-primary">{f.q}</summary>
                <p className="text-muted-foreground text-sm mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal text-primary-foreground text-center">
        <div className="container-main max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Come and see the difference.</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/free-taster" className="bg-primary text-charcoal font-heading font-semibold rounded-full px-7 py-3">Claim free taster →</Link>
            <Link to="/pura-nights" className="border border-primary text-primary font-heading font-semibold rounded-full px-7 py-3">See our classes →</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyPuraNights;
