import { Link } from "react-router-dom";
import { MapPin, Clock, CheckCircle, ChevronRight, Train, Star } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const DanceClassesEaling = () => (
  <Layout>
    <SeoHead
      title="Dance Classes Ealing | Salsa & Bachata Every Tuesday | Pura Nights by Melitta Siomos"
      description="Weekly Salsa and Bachata dance classes in Ealing every Tuesday at the Drayton Court Hotel. Beginners to intermediate, no partner needed. Award-winning instruction by Melitta Siomos."
      path="/dance-classes-ealing"
      schema={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Dance Classes in Ealing — Salsa & Bachata",
        description: "Weekly Salsa and Bachata dance classes every Tuesday in Ealing, West London. All levels welcome.",
        provider: { "@type": "Organization", name: "Pura Nights by Melitta Siomos", url: "https://www.melittasiomos.com" },
        areaServed: ["Ealing", "West Ealing", "Ealing Broadway", "South Ealing", "North Ealing", "Hanwell", "Greenford", "Northolt"],
      }}
    />

    {/* Hero */}
    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/dance-classes-west-london" className="hover:text-primary">West London</Link> / <span className="text-primary">Ealing</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Dance Classes in Ealing — Salsa & Bachata Every Tuesday</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">Every Tuesday evening, the Drayton Court Hotel in West Ealing comes alive with Latin music, laughter, and dancing. Whether you've never danced before or you're looking to refine your technique, Pura Nights offers three class levels plus two hours of social dancing — all in one evening.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">Book Tuesday Class</a>
            <Link to="/prices" className="btn-cta-ghost">View Pricing</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* About Ealing */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Why Ealing Is the Heart of West London Latin Dance</h2>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
            <p>Ealing — known as the "Queen of the Suburbs" — has long been one of London's most desirable neighbourhoods. With its grand Victorian architecture, leafy parks, and thriving restaurant scene, it's the perfect setting for a premium Latin dance evening. The Drayton Court Hotel, our Tuesday venue, is a Grade II listed building with a stunning ballroom-style space that gives our classes a special atmosphere you won't find anywhere else.</p>
            <p>Since 2018, Melitta Siomos has been building Ealing into one of London's key Latin dance hubs. The Tuesday night at the Drayton Court regularly attracts over 80 dancers, making it one of the largest weekly Latin dance events in West London. The combination of structured classes, a dedicated free ladies styling session, and two hours of social dancing creates a complete evening out.</p>
            <p>The venue is a 3-minute walk from West Ealing station (Elizabeth Line), making it easily accessible from Paddington, Heathrow, Reading, and beyond. Ealing Broadway station (Central and District lines) is also just a short bus ride away.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Schedule */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Tuesday Evening Schedule</h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="bg-background rounded-2xl p-8 border-l-4 border-peach max-w-2xl mx-auto">
            <h3 className="font-display text-xl font-bold text-peach mb-4">Every Tuesday — Drayton Court Hotel</h3>
            <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1"><MapPin size={14} /> 2 The Avenue, West Ealing, W13 8PH</p>
            <div className="space-y-3 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /> 6:50–7:20 PM — Free Ladies Styling (open to all women)</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /> 7:30 PM — Beginners Salsa & Bachata</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /> 8:00 PM — Improvers</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /> 8:30 PM — Intermediate</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /> 9:00–11:00 PM — Social Dancing (Salsa, Bachata, Merengue)</div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 text-sm text-muted-foreground mb-4">
              <p className="font-semibold mb-1">💷 Pricing</p>
              <p>£15 — 2 classes + social · £10 — 1 class · £5 — social only</p>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><Train size={12} className="text-peach" /> West Ealing (Elizabeth Line) — 3-minute walk</p>
              <p className="flex items-center gap-2"><Train size={12} className="text-peach" /> Ealing Broadway (Central / District) — 10 min by bus or 15-min walk</p>
              <p className="flex items-center gap-2"><Train size={12} className="text-peach" /> Buses: 83, 207, E1, E3</p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* What Makes Ealing Special */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What Makes Ealing Tuesdays Special</h2>
          <div className="space-y-3">
            {[
              "Free ladies styling session before the main classes — exclusive to Ealing",
              "Three structured class levels running simultaneously so you're always challenged",
              "Grade II listed venue with a beautiful ballroom atmosphere",
              "Two full hours of social dancing with a curated mix of Salsa, Bachata, and Merengue",
              "Award-winning instruction from Melitta Siomos — Bachata UK Champion",
              "Strong community of regulars plus new faces every week",
              "Elizabeth Line access makes it reachable from Paddington in under 15 minutes",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Areas Served */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-6">Students Come from Across Ealing & Beyond</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["Ealing Broadway", "West Ealing", "South Ealing", "North Ealing", "Hanwell", "Greenford", "Northolt", "Perivale", "Acton", "Brentford", "Hounslow", "Southall"].map(area => (
              <span key={area} className="text-xs font-accent bg-primary/10 text-primary px-3 py-1.5 rounded-full">{area}</span>
            ))}
          </div>
          <p className="text-muted-foreground text-sm text-center max-w-xl mx-auto">Many of our students travel from across West London and beyond. The Elizabeth Line has made Tuesday in Ealing one of the most accessible Latin dance nights in the capital.</p>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8">Ealing Dance Class FAQs</h2>
        {[
          { q: "Is Tuesday suitable for complete beginners?", a: "Absolutely. Our Beginners class at 7:30 PM is designed for people with zero experience. We start from the basics every week." },
          { q: "Do I need to bring a partner?", a: "No. We rotate partners throughout the class, so everyone dances with everyone. Most people come solo." },
          { q: "What is the free ladies styling session?", a: "Every Tuesday from 6:50–7:20 PM, Melitta runs a free ladies styling class covering body movement, arm styling, and footwork. It's open to all women regardless of level." },
          { q: "Can I also attend Monday in Chiswick?", a: "Yes, many students attend both nights. Dancing twice a week significantly accelerates your progress." },
          { q: "Is there parking?", a: "Yes. The Drayton Court Hotel has its own car park, and there is street parking on The Avenue." },
        ].map((faq, i) => (
          <details key={i} className="border-b border-border py-4">
            <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
            <p className="text-muted-foreground text-sm mt-2">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Join Ealing's Latin Dance Night</h2>
        <p className="text-charcoal/70 mb-6">Every Tuesday · No partner needed · All levels · Just turn up.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Tuesday Class</a>
          <Link to="/contact" className="text-charcoal font-heading font-semibold text-sm hover:opacity-70 transition-opacity">Ask a Question →</Link>
        </div>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/bachata-classes-ealing", label: "Bachata Classes Ealing" },
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/blog/bachata-classes-near-ealing", label: "Bachata Near Ealing" },
      { to: "/locations", label: "Venue Directions" },
      { to: "/pura-nights", label: "Full Schedule" },
    ]} />
  </Layout>
);

export default DanceClassesEaling;
