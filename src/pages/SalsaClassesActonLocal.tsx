import { Link } from "react-router-dom";
import { Train, Car, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import LastUpdated from "@/components/LastUpdated";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX PAGE: /salsa-classes-acton-local --> */

const faqs = [
  { q: "Are there salsa classes in Acton itself?", a: "Pura Nights Ealing (Tuesday) is the closest — just 10 minutes from Acton Town and Acton Central. We also run Mondays in Chiswick, around 12 minutes by car." },
  { q: "Can I walk to the Ealing venue?", a: "From West Acton, yes — about 20 minutes. From Acton Town it's 1 stop on the District/Piccadilly line, then a 10-minute walk to Drayton Court Hotel." },
  { q: "What night should an Acton beginner choose?", a: "Tuesday Ealing — it includes a free 6:50 PM Ladies Styling warm-up, plus three class levels. Most Acton newcomers start there." },
  { q: "How much is a single class?", a: "From £10 drop-in. Bundles bring it down further — 5 classes for £42 or unlimited monthly for £80." },
  { q: "Is the venue accessible from public transport at night?", a: "Yes — the District line runs until past midnight and West Ealing/Drayton Green National Rail are within 10 minutes." },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": ["Service", "FAQPage"],
    name: "Salsa Classes for Acton Residents",
    provider: { "@type": "DanceSchool", name: "Pura Nights — Melitta Siomos Dance Academy" },
    areaServed: [{ "@type": "Place", name: "Acton, London" }, { "@type": "Place", name: "West Acton" }, { "@type": "Place", name: "South Acton" }],
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.puranights.com/locations" },
      { "@type": "ListItem", position: 3, name: "Salsa Classes Acton", item: "https://www.puranights.com/salsa-classes-acton-local" },
    ],
  },
];

const SalsaClassesActonLocal = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes Near Acton | Pura Nights Ealing & Chiswick"
      description="Looking for salsa classes near Acton? Pura Nights Ealing is just 10 minutes away every Tuesday. No partner needed, all levels welcome, from £10."
      path="/salsa-classes-acton-local"
      schema={schema}
      dateModified="2026-04-19"
    />

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Salsa near Acton, West Acton & South Acton</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Salsa Classes in Acton — Pura Nights Ealing Is 10 Minutes Away</h1>
          <LastUpdated date="2026-04-19" />
          <p className="text-primary-foreground/70 text-base max-w-2xl mt-4">
            Acton dancers are spoilt — Pura Nights Ealing (Tuesday) is the closest weekly Latin night, and Chiswick (Monday) is barely further. Both are taught by Bachata UK Champion Melitta Siomos and her team, with Beginners, Improvers and Intermediate levels every single week.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book a Class</a>
            <Link to="/start-here" className="btn-cta-outline text-sm">Start Here</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Why Acton Dancers Choose Pura Nights</h2>
        <p className="text-muted-foreground mb-4">Acton is one of the best-connected pockets in West London, but it lacks a dedicated weekly Salsa & Bachata venue. That's why dancers from Acton Central, Acton Town, North Acton, South Acton and East Acton make the short trip to our Ealing Tuesday or Chiswick Monday classes. Both nights are taught by award-winning instructors, split by level, and finish with a polished social.</p>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <div className="bg-card p-6 rounded-2xl border border-border">
            <MapPin size={20} className="text-peach mb-3" />
            <h3 className="font-heading font-bold text-base mb-2">Tuesday — Drayton Court, Ealing</h3>
            <p className="text-muted-foreground text-sm">2 The Avenue, W13 8PH. Ladies Styling 6:50 PM + 3 levels from 7:30 PM. From £10.</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border">
            <MapPin size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold text-base mb-2">Monday — The George IV, Chiswick</h3>
            <p className="text-muted-foreground text-sm">185 Chiswick High Rd, W4 2DR. 3 levels from 7:30 PM + 9 PM social. From £10.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-6">Getting From Acton to Class</h2>
        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          <StaggerItem>
            <div className="bg-charcoal-light p-6 rounded-2xl border border-primary-foreground/10">
              <Train size={20} className="text-primary mb-3" />
              <h3 className="font-heading font-bold text-primary-foreground mb-2">By Tube (~10 min)</h3>
              <p className="text-primary-foreground/60 text-sm">Acton Town → Ealing Common (1 stop on the District/Piccadilly line) for Tuesday Ealing. For Monday Chiswick: District line east to Turnham Green.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-charcoal-light p-6 rounded-2xl border border-primary-foreground/10">
              <Car size={20} className="text-primary mb-3" />
              <h3 className="font-heading font-bold text-primary-foreground mb-2">By Car (~10 min)</h3>
              <p className="text-primary-foreground/60 text-sm">Both venues are pubs with on-street parking nearby that's free after 6:30 PM in most surrounding streets.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6 text-center">Acton FAQs</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-heading font-bold text-sm mb-2">{f.q}</h3>
              <p className="text-muted-foreground text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 text-center bg-primary">
      <div className="container-main">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">Try Tuesday in Ealing — Just 10 Minutes from Acton</h2>
        <p className="text-primary-foreground/80 text-sm mb-6">Free ladies styling warm-up + 3 class levels + social. From £10.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Class</a>
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">💬 WhatsApp Melitta</a>
        </div>
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing", desc: "Tue · Drayton Court" },
      { to: "/salsa-classes-acton", label: "Salsa Acton (Original)", desc: "Local-area page" },
      { to: "/dance-classes-west-london", label: "West London Pillar", desc: "Area overview" },
      { to: "/start-here", label: "Start Here", desc: "New to dancing?" },
      { to: "/prices", label: "Prices", desc: "Bundles & drop-in" },
      { to: "/contact", label: "Contact Melitta", desc: "Ask anything" },
    ]} />
  </Layout>
);

export default SalsaClassesActonLocal;
