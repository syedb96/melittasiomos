import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { MapPin, Clock, Train, Bus, Car, ChevronRight, ExternalLink } from "lucide-react";
import venueImg from "@/assets/venue-exterior.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pura Nights by Melitta Siomos",
  description: "Weekly Salsa and Bachata dance classes in Chiswick and Ealing, West London. Venues at The George IV and Drayton Court Hotel.",
  url: "https://www.puranights.com",
  telephone: "+447449482343",
  email: "siomosmelitta@gmail.com",
  areaServed: "West London",
  location: [
    { "@type": "Place", name: "The George IV", address: { "@type": "PostalAddress", streetAddress: "185 Chiswick High Rd", addressLocality: "Chiswick", postalCode: "W4 2DR", addressCountry: "GB" } },
    { "@type": "Place", name: "Drayton Court Hotel", address: { "@type": "PostalAddress", streetAddress: "2 The Avenue", addressLocality: "West Ealing", postalCode: "W13 8PH", addressCountry: "GB" } },
  ],
};

/* <!-- WIX PAGE: /locations -->
   <!-- WIX SECTION: Hero — Full-width Strip with venue image -->
   <!-- WIX SECTION: Venue Cards — use Repeater connected to Venues collection -->
   <!-- WIX SECTION: Areas Served — Tag cloud Strip -->
   <!-- WIX SECTION: Directions — CTA Strip with Google Maps links -->
   <!-- WIX: Link to dynamic venue pages /venue/locations -->
*/
const Locations = () => (
  <Layout>
    <SeoHead
      title="Class Locations — Chiswick & Ealing | Pura Nights by Melitta Siomos"
      description="Find Pura Nights Salsa & Bachata classes at The George IV in Chiswick (Mondays) and Drayton Court Hotel in Ealing (Tuesdays). Directions, transport, and parking info."
      path="/locations"
      schema={schema}
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={venueImg} alt="London pub venue for Pura Nights dance classes" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main text-center max-w-3xl relative z-10">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Find Us</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Class Locations</h1>
        <p className="text-primary-foreground/70 text-lg">Two venues. Two nights. One amazing Latin dance community across West London.</p>
      </div>
    </section>

    {/* Chiswick */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <div className="bg-card rounded-2xl p-8 card-hover border-l-4 border-primary mb-8">
            <h2 className="font-display text-3xl font-bold text-primary mb-3">Monday — Chiswick</h2>
            <h3 className="font-heading font-bold text-lg mb-1">The George IV</h3>
            <p className="text-muted-foreground text-sm mb-4">185 Chiswick High Rd, London W4 2DR</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2"><Clock size={14} className="text-primary" /> Schedule</h4>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p>7:15 PM — Doors Open</p>
                  <p>7:30 PM — Beginners Salsa & Bachata</p>
                  <p>8:00 PM — Improvers</p>
                  <p>8:30 PM — Intermediate</p>
                  <p>9:00–11:00 PM — Social Dancing</p>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2"><Train size={14} className="text-primary" /> Getting There</h4>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2"><Train size={12} className="mt-0.5 flex-shrink-0" /> Turnham Green tube (District Line) — 5 min walk</p>
                  <p className="flex items-start gap-2"><Train size={12} className="mt-0.5 flex-shrink-0" /> Gunnersbury (District / Overground) — 10 min walk</p>
                  <p className="flex items-start gap-2"><Bus size={12} className="mt-0.5 flex-shrink-0" /> Buses: 190, 237, 267</p>
                  <p className="flex items-start gap-2"><Car size={12} className="mt-0.5 flex-shrink-0" /> Street parking available after 6:30 PM</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-muted-foreground text-xs">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <Link to="/venue/the-george-iv-chiswick" className="text-primary font-heading text-xs font-semibold inline-flex items-center gap-1 ml-auto">Full venue guide <ChevronRight size={12} /></Link>
            </div>
          </div>
        </FadeInUp>

        {/* Ealing */}
        <FadeInUp delay={0.15}>
          <div className="bg-card rounded-2xl p-8 card-hover border-l-4 border-peach mb-8">
            <h2 className="font-display text-3xl font-bold text-peach mb-3">Tuesday — Ealing</h2>
            <h3 className="font-heading font-bold text-lg mb-1">Drayton Court Hotel</h3>
            <p className="text-muted-foreground text-sm mb-4">2 The Avenue, West Ealing, London W13 8PH</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2"><Clock size={14} className="text-peach" /> Schedule</h4>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p>6:50–7:20 PM — Free Ladies Styling</p>
                  <p>7:30 PM — Beginners Salsa & Bachata</p>
                  <p>8:00 PM — Improvers</p>
                  <p>8:30 PM — Intermediate</p>
                  <p>9:00–11:00 PM — Social Dancing</p>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2"><Train size={14} className="text-peach" /> Getting There</h4>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2"><Train size={12} className="mt-0.5 flex-shrink-0" /> West Ealing (Elizabeth Line / GWR) — 3 min walk</p>
                  <p className="flex items-start gap-2"><Train size={12} className="mt-0.5 flex-shrink-0" /> Drayton Green (Overground) — 5 min walk</p>
                  <p className="flex items-start gap-2"><Bus size={12} className="mt-0.5 flex-shrink-0" /> Buses: 83, 207, E1</p>
                  <p className="flex items-start gap-2"><Car size={12} className="mt-0.5 flex-shrink-0" /> Hotel car park and street parking available</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-muted-foreground text-xs">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <Link to="/venue/the-drayton-court-ealing" className="text-peach font-heading text-xs font-semibold inline-flex items-center gap-1 ml-auto">Full venue guide <ChevronRight size={12} /></Link>
            </div>
          </div>
        </FadeInUp>

        {/* Private Lessons */}
        <FadeInUp delay={0.25}>
          <div className="bg-card rounded-2xl p-8 card-hover border-l-4 border-bronze">
            <h2 className="font-display text-2xl font-bold mb-3">Private Lessons</h2>
            <p className="text-muted-foreground text-sm mb-4">Private 1-on-1 and couples lessons are held at a suitable studio in central or west London. Melitta is flexible and will discuss the best location during your consultation. Online lessons via Zoom are also available.</p>
            <Link to="/private-lessons" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Learn about private lessons <ChevronRight size={14} /></Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Areas Served */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-6">Areas We Serve</h2>
          <p className="text-muted-foreground text-center text-sm mb-8">Dancers travel from across London to join Pura Nights. Here are some of the areas our students come from:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Chiswick W4", "Ealing W5", "West Ealing W13", "Acton W3", "Ealing Broadway", "South Ealing", "Gunnersbury", "Turnham Green", "Hammersmith W6", "Shepherd's Bush W12", "Brentford TW8", "Kew TW9", "Richmond", "Hanwell", "Greenford", "Southall", "Central London"].map(area => (
              <span key={area} className="text-xs font-accent bg-primary/10 text-primary px-3 py-1.5 rounded-full">{area}</span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Google Maps Links */}
    <section className="section-padding section-dark text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">Get Directions</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://maps.google.com/?q=The+George+IV+185+Chiswick+High+Rd+London+W4+2DR" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm inline-flex items-center gap-2"><MapPin size={16} /> Chiswick — Google Maps</a>
          <a href="https://maps.google.com/?q=Drayton+Court+Hotel+2+The+Avenue+Ealing+W13+8PH" target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm inline-flex items-center gap-2"><MapPin size={16} /> Ealing — Google Maps</a>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Planning Your First Visit?</h2>
        <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">Just turn up — no booking required for weekly classes. All levels welcome, no partner needed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/start-here" className="btn-cta-dark text-sm">New? Start Here</Link>
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm">Book a Class</a>
        </div>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/venue/the-george-iv-chiswick", label: "The George IV — Chiswick" },
      { to: "/venue/the-drayton-court-ealing", label: "Drayton Court — Ealing" },
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/bachata-classes-ealing", label: "Bachata Classes Ealing" },
      { to: "/prices", label: "Prices & Bundles" },
      { to: "/contact", label: "Contact" },
    ]} />
  </Layout>
);

export default Locations;