import { Link } from "react-router-dom";
import { MapPin, Clock, Train, Bus, Car, Heart, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import NextEventCallout from "@/components/NextEventCallout";
import LastUpdated from "@/components/LastUpdated";
import AnswerBox from "@/components/AnswerBox";
import { FadeInUp } from "@/components/animations";
import heroImg from "@/assets/bachata-close.jpg";

const chiswickBachataFaqs = [
  { q: "Are there bachata classes in Chiswick W4?", a: "Yes — Pura Nights teaches bachata every Monday at The George IV, 185 Chiswick High Road W4 2DR, from 8:15 PM. It runs alongside a salsa class from 7:30 PM and a social floor 9–11 PM. All levels welcome, no partner needed." },
  { q: "Is bachata harder than salsa?", a: "No — bachata is generally easier to start than salsa. It's slower, has a simpler basic step (side-side-tap), and rewards close connection over fast footwork. Most beginners feel confident in their first class." },
  { q: "What style of bachata is taught at Pura Nights Chiswick?", a: "Melitta Siomos teaches a modern social bachata — a fusion of Dominican (the original) and Sensual styling, focused on lead-and-follow, musicality and what works on a real social floor. Not a choreography class." },
  { q: "Do I need a partner for the Chiswick bachata class?", a: "No. Pura Nights rotates partners throughout every class so you dance with the whole room. Most students arrive alone — it's the norm and part of why the community is so welcoming." },
  { q: "How do I get to the bachata class in Chiswick?", a: "The George IV is at 185 Chiswick High Rd W4 2DR. Turnham Green tube (District Line) is a 3-min walk. Buses 27, E3, 237 and 267 stop directly outside. On-street parking is free after 6:30 PM." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["DanceSchool", "FAQPage"],
  name: "Pura Nights — Bachata Classes Chiswick",
  description: "Weekly bachata classes every Monday at The George IV, Chiswick W4. All levels, no partner needed.",
  url: "https://www.puranights.com/bachata-classes-chiswick",
  address: { "@type": "PostalAddress", streetAddress: "185 Chiswick High Rd", addressLocality: "Chiswick", postalCode: "W4 2DR", addressCountry: "GB" },
  areaServed: ["Chiswick", "Turnham Green", "Gunnersbury", "Hammersmith", "Acton", "W4"].map(n => ({ "@type": "Place", name: n })),
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "20:15", closes: "23:00" }],
  priceRange: "£5–£15",
  mainEntity: chiswickBachataFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

/* <!-- WIX PAGE: bachata-classes-chiswick --> */
const BachataClassesChiswick = () => (
  <Layout>
    <SeoHead
      title="Bachata Classes Chiswick W4 | Mondays at The George IV"
      description="Bachata classes every Monday at The George IV, Chiswick W4 2DR. 3 min from Turnham Green. All levels, no partner needed. Modern social bachata taught by Melitta Siomos."
      path="/bachata-classes-chiswick"
      schema={schema}
      dateModified="2026-05-16"
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Bachata dancing at The George IV Chiswick" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/bachata-classes-london" className="hover:text-primary">Bachata London</Link> / <span className="text-primary">Chiswick</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Bachata Classes in Chiswick — Every Monday at The George IV</h1>
        <LastUpdated date="2026-05-16" />
        <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">Modern social bachata, taught every Monday at The George IV on Chiswick High Road. 3 minutes from Turnham Green tube. Beginner to intermediate. No partner needed.</p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Monday Bachata Class</a>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="Where can I learn bachata in Chiswick, W4?"
          answer="At The George IV on Chiswick High Road every Monday at 8:15 PM. Pura Nights teaches modern social bachata (Dominican + Sensual fusion), split by level, with social dancing 9–11 PM. No partner needed."
          bullets={[
            "Venue: The George IV, 185 Chiswick High Rd, W4 2DR",
            "Tube: Turnham Green (District Line) — 3 min walk",
            "Bachata 8:15 PM · Social floor 9–11 PM",
            "From £5 (social) · £15 (2 classes + social)",
          ]}
          cta={{ label: "Book Monday Bachata", href: "https://www.tickettailor.com/events/puranights" }}
          tone="ivory"
        />
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">What Makes Bachata Different</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-background rounded-lg p-5 border border-border">
            <Heart size={18} className="text-primary mb-2" />
            <h3 className="font-heading font-bold mb-1">Emotionally close</h3>
            <p className="text-sm text-muted-foreground">Bachata is held in close frame — connection, breath, listening matter more than complicated patterns.</p>
          </div>
          <div className="bg-background rounded-lg p-5 border border-border">
            <Users size={18} className="text-primary mb-2" />
            <h3 className="font-heading font-bold mb-1">Easier to start</h3>
            <p className="text-sm text-muted-foreground">The basic step is side-side-tap. Most absolute beginners feel confident in their first 45-minute class.</p>
          </div>
          <div className="bg-background rounded-lg p-5 border border-border">
            <Clock size={18} className="text-primary mb-2" />
            <h3 className="font-heading font-bold mb-1">Slower rhythm</h3>
            <p className="text-sm text-muted-foreground">Around 120 BPM — about two-thirds the speed of salsa, so you have time to think and feel the music.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">The Three Bachata Styles — And What We Teach</h2>
        <div className="space-y-4 text-muted-foreground">
          <p><strong className="text-foreground">Dominican</strong> — the original, footwork-driven, playful, rooted in the Dominican Republic. The grandmother of the modern dance.</p>
          <p><strong className="text-foreground">Sensual</strong> — Spanish-origin, body waves, close embrace, slower lead-and-follow. Beautiful on stage, less common as a pure form on social floors.</p>
          <p><strong className="text-foreground">Modern social bachata</strong> — what's actually danced at London socials, and what Melitta teaches at Chiswick: a Dominican base with Sensual styling, designed to feel right in any room.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Monday Schedule — The George IV, Chiswick</h2>
          <div className="bg-background rounded-2xl p-8 border border-primary/10 mb-8">
            <div className="flex items-start gap-3 mb-6"><MapPin size={20} className="text-primary flex-shrink-0 mt-1" /><div><p className="font-heading font-semibold">The George IV</p><p className="text-muted-foreground text-sm">185 Chiswick High Rd, London W4 2DR</p></div></div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">7:15 PM</span> — Doors open</div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">7:30 PM</span> — Salsa class</div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">8:15 PM</span> — Bachata class (level splits)</div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">9:00–11:00 PM</span> — Social dancing (50/50 mix)</div>
            </div>
            <p className="text-sm text-muted-foreground mt-6">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">Looking for salsa instead? <Link to="/salsa-classes-chiswick" className="text-primary hover:underline">It's taught the same evening from 7:30 PM →</Link></p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Getting to The George IV</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border"><Train size={20} className="text-primary mb-3" /><h3 className="font-heading font-bold mb-2">Tube</h3><p className="text-sm text-muted-foreground">Turnham Green (District) 3 min · Gunnersbury 8 min</p></div>
          <div className="bg-card rounded-lg p-6 border border-border"><Bus size={20} className="text-primary mb-3" /><h3 className="font-heading font-bold mb-2">Bus</h3><p className="text-sm text-muted-foreground">27, E3, 237, 267, 190 — all stop on Chiswick High Road</p></div>
          <div className="bg-card rounded-lg p-6 border border-border"><Car size={20} className="text-primary mb-3" /><h3 className="font-heading font-bold mb-2">Car</h3><p className="text-sm text-muted-foreground">Free on-street parking after 6:30 PM along the High Road and side streets</p></div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Chiswick Bachata FAQs</h2>
        <div className="space-y-4">
          {chiswickBachataFaqs.map((faq, i) => (
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
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">See You This Monday in Chiswick</h2>
        <p className="text-primary-foreground/70 mb-8">No booking required. All levels. No partner needed.</p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your Class</a>
      </div>
    </section>
    <section className="bg-card"><div className="container-main max-w-3xl"><NextEventCallout context="Next Latin Friday Social" /></div></section>
    <RelatedPages title="Related Pages" links={[
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick (same Monday)" },
      { to: "/bachata-classes-ealing", label: "Bachata Classes Ealing (Tuesdays)" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/blog/what-is-bachata", label: "What is Bachata?" },
      { to: "/start-here", label: "New here? Start here" },
      { to: "/pura-nights", label: "Full Schedule" },
    ]} />
  </Layout>
);

export default BachataClassesChiswick;
