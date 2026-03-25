import { Link } from "react-router-dom";
import { MapPin, Clock, Star, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const schema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Pura Nights Bachata Classes Ealing",
  description: "Weekly bachata and salsa classes every Tuesday at Drayton Court Hotel, Ealing.",
  startDate: "2025-01-07T19:30",
  eventSchedule: { "@type": "Schedule", repeatFrequency: "P1W", byDay: "Tuesday", startTime: "19:30", endTime: "23:00" },
  location: { "@type": "Place", name: "Drayton Court Hotel", address: { "@type": "PostalAddress", streetAddress: "2 The Avenue", addressLocality: "West Ealing", postalCode: "W13 8PH", addressCountry: "GB" } },
  organizer: { "@type": "Organization", name: "Melitta Siomos Dance Academy" },
  offers: { "@type": "Offer", price: "5.50", priceCurrency: "GBP" },
};

const BachataClassesEaling = () => (
  <Layout>
    <SeoHead
      title="Bachata Classes Ealing | Every Tuesday | Pura Nights by Melitta Siomos"
      description="Join bachata and salsa classes every Tuesday in Ealing at Drayton Court Hotel. All levels welcome, no partner needed. From £5.50. Taught by Bachata UK Champion Melitta Siomos."
      path="/bachata-classes-ealing"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/bachata-classes-london" className="hover:text-primary">Bachata Classes London</Link> / <span className="text-primary">Ealing</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Bachata Classes in Ealing — Every Tuesday at Pura Nights
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
          Melitta Siomos and the Pura Nights team bring Tuesday evenings to life at the Drayton Court Hotel in West Ealing. Learn bachata and salsa in a stunning venue with one of London's most passionate Latin dance communities. All levels welcome — no partner needed.
        </p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Tuesday Ealing Class</a>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Tuesday Night Schedule — Drayton Court Hotel, Ealing</h2>
        <div className="bg-card rounded-lg p-8 border border-secondary/20 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
            <div>
              <p className="font-heading font-bold">Drayton Court Hotel</p>
              <p className="text-muted-foreground text-sm">2 The Avenue, West Ealing, London W13 8PH</p>
              <p className="text-muted-foreground text-xs mt-1">Nearest station: West Ealing (Elizabeth Line / GWR) · Buses: 83, 207, E1</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">7:15 PM</span> — Doors Open</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">7:30–8:15 PM</span> — Salsa Class (all levels)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">8:15–9:00 PM</span> — Bachata Class (all levels)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">9:00–11:00 PM</span> — Open Social Dancing</div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">💷 From £5.50 per person · Cash at the door accepted · Pre-book online for guaranteed entry</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Why Ealing Is West London's Bachata Hub</h2>
        <div className="text-muted-foreground space-y-4">
          <p>The Drayton Court Hotel is a West Ealing landmark — a beautifully restored Victorian venue with a spacious ballroom-style room that's perfect for Latin dancing. It's become the heart of Tuesday night bachata in West London, drawing dancers from Ealing, Acton, Hanwell, Greenford, Northolt, and beyond.</p>
          <p>With direct Elizabeth Line access from West Ealing station, the venue is now just minutes from Paddington, the West End, and even Reading. Melitta Siomos chose this location specifically for its accessibility, atmosphere, and the warm welcome the hotel extends to the Pura Nights community every week.</p>
          <p>Tuesday nights at Drayton Court are known for their buzzing social energy — after the classes, the dance floor is packed with bachata and salsa lovers practising what they've learned and enjoying the community vibe that makes Pura Nights special.</p>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Ealing Bachata Class FAQs</h2>
        <div className="space-y-6">
          {[
            { q: "How do I get to Drayton Court Hotel?", a: "2 The Avenue, West Ealing, W13 8PH. Nearest station: West Ealing (Elizabeth Line / GWR). Bus routes: 83, 207, E1. There's also a car park behind the hotel." },
            { q: "Is there food and drink available?", a: "Yes! The Drayton Court Hotel has a full bar and food menu. Many dancers arrive early for dinner before the classes begin." },
            { q: "What level is the bachata class?", a: "We run multi-level classes with splits for beginners, improvers, and intermediate dancers. Our teachers assess your progress and invite you to move up when ready." },
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
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Join Us This Tuesday in Ealing!</h2>
        <p className="text-primary-foreground/80 mb-8">Doors open at 7:15 PM at Drayton Court Hotel. All levels. No partner needed.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book Your Ealing Class</a>
      </div>
    </section>
  </Layout>
);

export default BachataClassesEaling;
