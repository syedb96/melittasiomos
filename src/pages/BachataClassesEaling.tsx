import { Link } from "react-router-dom";
import { MapPin, Clock, Train, Bus, Car, Heart, Users } from "lucide-react";
import Layout from "@/components/Layout";
import FirstTimerCallout from "@/components/FirstTimerCallout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import NextEventCallout from "@/components/NextEventCallout";
import LastUpdated from "@/components/LastUpdated";
import AnswerBox from "@/components/AnswerBox";
import heroImg from "@/assets/salsa-ealing.jpg";
import MembershipPathwayBlock from "@/components/MembershipPathwayBlock";

const ealingBachataFaqs = [
  { q: "Are there bachata classes near Ealing Broadway?", a: "Yes — Pura Nights teaches bachata every Tuesday at The Drayton Court Hotel, 2 The Avenue W13 8PH, from 8:15 PM. It's a 10-minute walk from Ealing Broadway or 3 minutes from West Ealing on the Elizabeth Line." },
  { q: "Is bachata harder than salsa?", a: "No — bachata is usually easier to start than salsa. It's slower, has a simpler basic step, and rewards close connection rather than fast footwork. Beginners often feel comfortable in their first 45-minute class." },
  { q: "What style of bachata is taught at Pura Nights Ealing?", a: "Melitta Siomos teaches a modern social bachata — a fusion of Dominican roots and Sensual styling. The focus is on lead-and-follow, musicality and what actually works on London social floors, not pure choreography." },
  { q: "Do I need a partner for the Ealing bachata class?", a: "No. Pura Nights rotates partners throughout the class, so you'll dance with most of the room. The majority of students come alone — it's normal and part of the culture." },
  { q: "How do I get to the Drayton Court for bachata?", a: "The Drayton Court Hotel is at 2 The Avenue, W13 8PH. West Ealing (Elizabeth Line / GWR) is a 3-min walk. Buses 83, 207, 427 and E1 stop nearby. Free residential parking is available after 6:30 PM." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["DanceSchool", "FAQPage"],
  name: "Pura Nights — Bachata Classes Ealing",
  description: "Weekly bachata classes every Tuesday at The Drayton Court Hotel, West Ealing W13. All levels, no partner needed.",
  url: "https://www.puranights.com/bachata-classes-ealing",
  address: { "@type": "PostalAddress", streetAddress: "2 The Avenue", addressLocality: "West Ealing", postalCode: "W13 8PH", addressCountry: "GB" },
  areaServed: ["Ealing", "West Ealing", "Ealing Broadway", "Hanwell", "Acton", "Greenford", "W13", "W5"].map(n => ({ "@type": "Place", name: n })),
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "20:15", closes: "23:00" }],
  priceRange: "£5–£15",
  mainEntity: ealingBachataFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

/* <!-- WIX PAGE: bachata-classes-ealing --> */
const BachataClassesEaling = () => (
  <Layout>
    <SeoHead
      title="Bachata Classes Ealing W13 | Every Tuesday at The Drayton Court | Pura Nights"
      description="Bachata classes every Tuesday at The Drayton Court Hotel, West Ealing W13 8PH. 3 min from West Ealing Elizabeth Line. All levels, no partner needed."
      path="/bachata-classes-ealing"
      schema={schema}
      dateModified="2026-05-16"
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Bachata social dancing at Drayton Court Ealing" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/bachata-classes-london" className="hover:text-primary">Bachata London</Link> / <span className="text-primary">Ealing</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Bachata Classes in Ealing — Every Tuesday at The Drayton Court</h1>
        <LastUpdated date="2026-05-16" />
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">Modern social bachata at the grand Drayton Court Hotel in West Ealing — every Tuesday from 8:15 PM, with salsa from 7:30 PM and a social floor until 11. 3 minutes from West Ealing Elizabeth Line. No partner needed.</p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Tuesday Ealing Class</a>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="Where can I learn bachata in Ealing, W13?"
          answer="At The Drayton Court Hotel, 2 The Avenue, West Ealing W13 8PH, every Tuesday at 8:15 PM. Pura Nights teaches modern social bachata in a split-level format, followed by a social floor until 11 PM. No partner needed."
          bullets={[
            "Venue: The Drayton Court Hotel, W13 8PH",
            "Station: West Ealing (Elizabeth Line) — 3 min walk",
            "Bachata 8:15 PM · Social floor 9–11 PM",
            "From £5 (social) · £15 (2 classes + social)",
          ]}
          cta={{ label: "Book Tuesday Bachata", href: "https://www.tickettailor.com/events/puranights" }}
          tone="ivory"
        />
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">What Makes Bachata Different</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-background rounded-lg p-5 border border-border"><Heart size={18} className="text-primary mb-2" /><h3 className="font-heading font-bold mb-1">Emotionally close</h3><p className="text-sm text-muted-foreground">Held in close frame — connection, breath and listening matter more than fast patterns.</p></div>
          <div className="bg-background rounded-lg p-5 border border-border"><Users size={18} className="text-primary mb-2" /><h3 className="font-heading font-bold mb-1">Easy to start</h3><p className="text-sm text-muted-foreground">Side-side-tap basic step. Most beginners feel confident after one 45-minute class.</p></div>
          <div className="bg-background rounded-lg p-5 border border-border"><Clock size={18} className="text-primary mb-2" /><h3 className="font-heading font-bold mb-1">Slower rhythm</h3><p className="text-sm text-muted-foreground">Around 120 BPM — about two-thirds salsa's speed, so you have time to feel the music.</p></div>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Three Bachata Styles — What We Teach</h2>
        <div className="space-y-4 text-muted-foreground">
          <p><strong className="text-foreground">Dominican</strong> — the original, playful, footwork-driven, born in the Dominican Republic.</p>
          <p><strong className="text-foreground">Sensual</strong> — Spanish-origin, body waves, close embrace, slower lead-and-follow.</p>
          <p><strong className="text-foreground">Modern social bachata</strong> — what we teach at Ealing: a Dominican base with Sensual styling, designed for real social floors across London.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Tuesday at The Drayton Court</h2>
        <div className="bg-background rounded-2xl p-8 border border-secondary/10">
          <div className="flex items-start gap-3 mb-6"><MapPin size={20} className="text-secondary flex-shrink-0 mt-1" /><div><p className="font-heading font-bold">The Drayton Court Hotel</p><p className="text-muted-foreground text-sm">2 The Avenue, West Ealing, London W13 8PH</p></div></div>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">7:15 PM</span> — Doors open. Bar & food.</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">7:30 PM</span> — Salsa class</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">8:15 PM</span> — Bachata class (level splits)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">9:00–11:00 PM</span> — Open social dancing</div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">💷 From £5 · cash at the door accepted · pre-book for guaranteed entry.</p>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Getting to The Drayton Court</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border"><Train size={20} className="text-secondary mb-3" /><h3 className="font-heading font-bold mb-2">Train / Tube</h3><p className="text-sm text-muted-foreground">West Ealing (Elizabeth Line) 3 min · Ealing Broadway 10 min</p></div>
          <div className="bg-card rounded-lg p-6 border border-border"><Bus size={20} className="text-secondary mb-3" /><h3 className="font-heading font-bold mb-2">Bus</h3><p className="text-sm text-muted-foreground">83, 207, 427, E1 — The Avenue / Uxbridge Road</p></div>
          <div className="bg-card rounded-lg p-6 border border-border"><Car size={20} className="text-secondary mb-3" /><h3 className="font-heading font-bold mb-2">Car</h3><p className="text-sm text-muted-foreground">Free residential parking after 6:30 PM, hotel car park behind venue</p></div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Ealing Bachata FAQs</h2>
        <div className="space-y-4">
          {ealingBachataFaqs.map((faq, i) => (
            <div key={i} className="bg-background rounded-lg p-6 border border-border">
              <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Join Us This Tuesday in Ealing</h2>
        <p className="text-primary-foreground/80 mb-8">Doors 7:15 PM at The Drayton Court. All levels. No partner needed.</p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book Your Ealing Class</a>
      </div>
    </section>
    <div className="container-main max-w-3xl"><NextEventCallout context="Next Latin Friday in Ealing" /></div>
    <MembershipPathwayBlock context="ealing_pathway" />
    <RelatedPages title="Related Pages" links={[
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing (same Tuesday)" },
      { to: "/bachata-classes-chiswick", label: "Bachata Classes Chiswick (Mondays)" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/blog/what-is-bachata", label: "What is Bachata?" },
      { to: "/start-here", label: "New here? Start here" },
      { to: "/pura-nights", label: "Full Schedule" },
    ]} />
    <FirstTimerCallout />
  </Layout>
);

export default BachataClassesEaling;
