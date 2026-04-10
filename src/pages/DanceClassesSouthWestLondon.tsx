import { Link } from "react-router-dom";
import { MapPin, Clock, Star, Trophy, Users, Heart, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";

const DanceClassesSouthWestLondon = () => (
  <Layout>
    <SeoHead
      title="Dance Classes South West London | Salsa & Bachata | Melitta Siomos"
      description="Find the best salsa and bachata dance classes in South West London with Melitta Siomos. Weekly classes in Chiswick & Ealing, private lessons, wedding dance. All levels welcome."
      path="/dance-classes-south-west-london"
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-primary">Dance Classes South West London</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Salsa & Bachata Dance Classes in South West London
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
          Looking for dance classes in South West London? Melitta Siomos and Pura Nights run the region's most popular weekly salsa and bachata classes, with venues in Chiswick and Ealing that are easily accessible from across South West and West London. All levels welcome — from absolute beginners to advanced dancers.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book a Class Now</a>
          <Link to="/prices" className="btn-cta-outline">View Pricing →</Link>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Where to Dance in South West & West London</h2>
        <div className="text-muted-foreground space-y-4 mb-8">
          <p>South West London and West London are home to a thriving Latin dance community, and Pura Nights by Melitta Siomos sits at the heart of it. With two weekly classes and monthly Latin party nights, there's always somewhere to dance.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg p-8 border border-primary/20">
            <h3 className="font-display text-xl font-bold text-primary mb-3">Monday — Chiswick</h3>
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />7:30–8:15 PM — Salsa</div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />8:15–9:00 PM — Bachata</div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />9:00–11:00 PM — Social</div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Accessible from: Hammersmith, Shepherd's Bush, Brentford, Kew, Richmond, Barnes, Putney</p>
            <Link to="/salsa-classes-chiswick" className="text-primary font-heading font-semibold text-sm">Full Chiswick Details →</Link>
          </div>
          <div className="bg-card rounded-lg p-8 border border-secondary/20">
            <h3 className="font-display text-xl font-bold text-secondary mb-3">Tuesday — Ealing</h3>
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />7:30–8:15 PM — Salsa</div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />8:15–9:00 PM — Bachata</div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />9:00–11:00 PM — Social</div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Accessible from: Acton, Hanwell, Greenford, Northolt, Southall, Hounslow, Twickenham</p>
            <Link to="/bachata-classes-ealing" className="text-secondary font-heading font-semibold text-sm">Full Ealing Details →</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Beyond Weekly Classes — More Ways to Dance</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Private 1-to-1 Lessons", desc: "Personalised coaching at Melitta's home studio in Acton or at your location.", link: "/private-lessons", icon: <Users size={24} /> },
            { title: "Wedding Dance", desc: "Bespoke first dance choreography for couples across South West London.", link: "/wedding-dance", icon: <Heart size={24} /> },
            { title: "Pura Ladies Team", desc: "Join the all-female bachata performance team with squads across 4 cities.", link: "/pura-ladies", icon: <Star size={24} /> },
            { title: "Monthly Latin Fridays", desc: "Pura Vibes at Drayton Court — a monthly Latin party night in Ealing.", link: "/bookings", icon: <Trophy size={24} /> },
          ].map((item, i) => (
            <Link key={i} to={item.link} className="bg-background rounded-lg p-6 card-hover text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{item.icon}</div>
              <h3 className="font-heading font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Areas We Serve Across South West & West London</h2>
        <div className="text-muted-foreground space-y-4">
          <p>Pura Nights dance classes are conveniently located for dancers across a wide area of London. Students regularly travel from the following neighbourhoods:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {["Chiswick", "Ealing", "Acton", "Hammersmith", "Shepherd's Bush", "Brentford", "Kew", "Richmond", "Barnes", "Putney", "Fulham", "Hanwell", "Greenford", "Northolt", "Hounslow", "Twickenham"].map((area, i) => (
              <span key={i} className="bg-card rounded-md px-3 py-2 text-sm text-center font-heading">{area}</span>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Start Dancing This Week</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Join hundreds of dancers across South West London. No partner needed, all levels welcome.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book a Class</a>
          <Link to="/contact" className="btn-cta-outline">Contact Melitta <ArrowRight size={16} className="ml-2" /></Link>
        </div>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/blog/salsa-south-west-london", label: "Salsa in South West London" },
      { to: "/locations", label: "Venue Directions" },
      { to: "/pura-nights", label: "Weekly Classes" },
    ]} />
  </Layout>
);

export default DanceClassesSouthWestLondon;
