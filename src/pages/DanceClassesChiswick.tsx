import { Link } from "react-router-dom";
import { MapPin, Clock, Star, Bus, Car } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const schema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Pura Nights Dance Classes Chiswick",
  description: "Weekly salsa and bachata dance classes every Monday at The George IV, Chiswick. All levels welcome.",
  startDate: "2025-01-06T19:30",
  eventSchedule: { "@type": "Schedule", repeatFrequency: "P1W", byDay: "Monday", startTime: "19:30", endTime: "23:00" },
  location: { "@type": "Place", name: "The George IV", address: { "@type": "PostalAddress", streetAddress: "185 Chiswick High Rd", addressLocality: "Chiswick", postalCode: "W4 2DR", addressCountry: "GB" } },
  organizer: { "@type": "Organization", name: "Melitta Siomos Dance Academy" },
  offers: { "@type": "Offer", price: "5.50", priceCurrency: "GBP" },
};

const nearby = [
  "Turnham Green", "Bedford Park", "Gunnersbury", "Strand on the Green", "Grove Park", "Acton Green", "Brentford", "Kew Bridge"
];

const DanceClassesChiswick = () => (
  <Layout>
    <SeoHead
      title="Dance Classes Chiswick | Salsa & Bachata Every Monday"
      description="Join Salsa and Bachata dance classes every Monday in Chiswick at The George IV. Beginner to intermediate levels, no partner needed. From £5.50 per class."
      path="/dance-classes-chiswick"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/dance-classes-west-london" className="hover:text-primary">Dance Classes West London</Link> / <span className="text-primary">Chiswick</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Dance Classes in Chiswick — Every Monday</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
            Chiswick's favourite Monday night out. Learn Salsa and Bachata at The George IV with Bachata UK Champion Melitta Siomos, then stay for two hours of social dancing. All levels welcome, no partner needed.
          </p>
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Monday Class</a>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Monday Night at The George IV</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
        </FadeInUp>
        <div className="bg-card rounded-2xl p-8 border border-primary/20 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-heading font-bold">The George IV</p>
              <p className="text-muted-foreground text-sm">185 Chiswick High Rd, London W4 2DR</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span><strong>7:15 PM</strong> — Doors Open</span></div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span><strong>7:30–8:15 PM</strong> — Salsa (Beginner / Improver / Intermediate)</span></div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span><strong>8:15–9:00 PM</strong> — Bachata (Beginner / Improver / Intermediate)</span></div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span><strong>9:00–11:00 PM</strong> — Open Social Dancing</span></div>
          </div>
          <div className="mt-6 pt-4 border-t border-border text-sm text-muted-foreground">💷 From £5.50 · No partner needed · Pre-book online or pay at the door</div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Why Chiswick Loves Pura Nights</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>Chiswick has always been a neighbourhood that values community, culture, and a good night out. Pura Nights fits perfectly into this fabric — bringing world-class Latin dance instruction to a beautiful, spacious pub venue that feels like home from the moment you walk in.</p>
            <p>The George IV offers a dedicated dance floor, a well-stocked bar, and a warm atmosphere that keeps students coming back week after week. Many of our longest-standing members started at Monday Chiswick classes and have gone on to perform with Pura Ladies, attend international festivals, and form lifelong friendships through dance.</p>
            <p>Whether you live in Chiswick, Turnham Green, Bedford Park, or nearby Brentford and Kew, Monday nights at Pura Nights are the perfect way to start your week with energy, music, and connection.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Getting to The George IV</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
        </FadeInUp>
        <div className="grid sm:grid-cols-2 gap-6">
          <FadeInUp delay={0.1}>
            <div className="bg-card rounded-2xl p-6 card-hover">
              <Bus size={24} className="text-primary mb-3" />
              <h3 className="font-heading font-bold mb-2">Public Transport</h3>
              <p className="text-muted-foreground text-sm">Nearest tube: Turnham Green or Gunnersbury (District Line). Buses 190, 237, 267 stop nearby. Chiswick overground station is a 5-minute walk.</p>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-card rounded-2xl p-6 card-hover">
              <Car size={24} className="text-primary mb-3" />
              <h3 className="font-heading font-bold mb-2">Driving & Parking</h3>
              <p className="text-muted-foreground text-sm">On-street parking along Chiswick High Road and surrounding streets. Most restrictions lift after 6:30 PM. The venue is on the A315.</p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Nearby Areas We Serve</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
        </FadeInUp>
        <div className="flex flex-wrap gap-3">
          {nearby.map((area) => (
            <span key={area} className="bg-background rounded-full px-4 py-2 text-sm font-heading border border-border">{area}</span>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">See You This Monday in Chiswick!</h2>
        <p className="text-primary-foreground/80 mb-8">Doors open 7:15 PM. No partner needed. All levels welcome.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book Now</a>
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/bachata-classes-chiswick", label: "Bachata Classes Chiswick" },
      { to: "/dance-classes-ealing", label: "Dance Classes Ealing" },
      { to: "/latin-dance-classes-london", label: "Latin Dance London" },
      { to: "/locations", label: "Venue Directions" },
      { to: "/start-here", label: "New to Dance? Start Here" },
    ]} />
  </Layout>
);

export default DanceClassesChiswick;
