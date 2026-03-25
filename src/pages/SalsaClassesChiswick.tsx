import { Link } from "react-router-dom";
import { MapPin, Clock, Star, Trophy, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";

const schema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Pura Nights Salsa Classes Chiswick",
  description: "Weekly salsa and bachata classes every Monday at The George IV Pub, Chiswick.",
  startDate: "2025-01-06T19:30",
  eventSchedule: { "@type": "Schedule", repeatFrequency: "P1W", byDay: "Monday", startTime: "19:30", endTime: "23:00" },
  location: { "@type": "Place", name: "The George IV Pub", address: { "@type": "PostalAddress", streetAddress: "85 Chiswick High Rd", addressLocality: "Chiswick", postalCode: "W4 2DR", addressCountry: "GB" } },
  organizer: { "@type": "Organization", name: "Melitta Siomos Dance Academy" },
  offers: { "@type": "Offer", price: "5.50", priceCurrency: "GBP" },
};

const SalsaClassesChiswick = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes Chiswick | Every Monday | Pura Nights by Melitta Siomos"
      description="Join salsa and bachata classes every Monday in Chiswick at The George IV Pub. All levels welcome, no partner needed. From £5.50. Taught by Bachata UK Champion Melitta Siomos."
      path="/salsa-classes-chiswick"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/salsa-classes-london" className="hover:text-primary">Salsa Classes London</Link> / <span className="text-primary">Chiswick</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Salsa Classes in Chiswick — Every Monday at Pura Nights
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
          Melitta Siomos brings Chiswick alive every Monday evening with Pura Nights — West London's most exciting weekly salsa and bachata night. Whether you've never danced a step or you're ready to level up your spins and shines, there's a class for you at The George IV Pub.
        </p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Monday Chiswick Class</a>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Monday Night Schedule — The George IV Pub, Chiswick</h2>
        <div className="bg-card rounded-lg p-8 border border-primary/20 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-heading font-bold">The George IV Pub</p>
              <p className="text-muted-foreground text-sm">85 Chiswick High Rd, London W4 2DR</p>
              <p className="text-muted-foreground text-xs mt-1">Nearest tube: Gunnersbury or Turnham Green (District Line) · Buses: 190, 237, 267</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">7:15 PM</span> — Doors Open</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">7:30–8:15 PM</span> — Salsa Class (Beginner / Improver / Intermediate split)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">8:15–9:00 PM</span> — Bachata Class (Beginner / Improver / Intermediate split)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">9:00–11:00 PM</span> — Open Social Dancing (50% Salsa, 50% Bachata)</div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">💷 From £5.50 per person · Cash at the door accepted · Pre-book online for guaranteed entry</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Why Chiswick Is Perfect for Salsa</h2>
        <div className="text-muted-foreground space-y-4">
          <p>Chiswick is one of West London's most vibrant neighbourhoods, and The George IV Pub provides the ideal setting for a Monday night of Latin dance. The venue is spacious, welcoming, and just steps from Turnham Green and Gunnersbury tube stations — making it easily accessible from across West and Central London.</p>
          <p>Pura Nights Chiswick attracts a diverse, friendly crowd of dancers aged 20 to 60+. The atmosphere is warm and inclusive — many students come alone and leave with new friends. Whether you're a Chiswick local or travelling from Hammersmith, Acton, Brentford, or Shepherd's Bush, Monday nights at The George IV have become a beloved weekly ritual for London's Latin dance community.</p>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Chiswick Salsa Class FAQs</h2>
        <div className="space-y-6">
          {[
            { q: "How do I get to The George IV Pub?", a: "85 Chiswick High Rd, London W4 2DR. Nearest tube: Gunnersbury or Turnham Green (District Line). Buses: 190, 237, 267. Limited on-street parking is available." },
            { q: "Is there parking near the venue?", a: "Yes, there's on-street parking along Chiswick High Road and surrounding residential streets. After 6:30 PM, most restrictions are lifted." },
            { q: "Can I just come for the social dancing?", a: "Experienced dancers are welcome to join the social from 9 PM. We recommend taking the classes first to build your technique and confidence." },
          ].map((faq, i) => (
            <div key={i} className="bg-card rounded-lg p-6">
              <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">See You This Monday in Chiswick!</h2>
        <p className="text-primary-foreground/80 mb-8">Doors open at 7:15 PM. No partner needed. All levels welcome.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book Your Chiswick Class</a>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/bachata-classes-chiswick", label: "Bachata Classes Chiswick" },
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/blog/salsa-classes-near-chiswick", label: "Salsa Near Chiswick Guide" },
      { to: "/locations", label: "Venue Directions" },
      { to: "/pura-nights", label: "Full Schedule" },
    ]} />
  </Layout>
);

export default SalsaClassesChiswick;
