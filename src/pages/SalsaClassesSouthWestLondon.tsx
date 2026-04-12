import { Link } from "react-router-dom";
import { MapPin, Clock, Star, ArrowRight, Users, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const schema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Salsa Classes South West London",
  description: "Weekly salsa dance classes in Chiswick and Ealing, accessible from across South West London. Beginner to advanced levels with UK Champion instructor Melitta Siomos.",
  provider: { "@type": "Organization", name: "Pura Nights", url: "https://www.puranights.com" },
  areaServed: ["South West London", "Chiswick", "Ealing", "Putney", "Richmond", "Barnes", "Fulham"],
};

/* <!-- WIX PAGE: salsa-classes-south-west-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const SalsaClassesSouthWestLondon = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes South West London | Chiswick & Ealing | Pura Nights"
      description="Looking for salsa classes in South West London? Join Pura Nights for weekly beginner to advanced salsa in Chiswick and Ealing. Led by UK Champion Melitta Siomos. No partner needed."
      path="/salsa-classes-south-west-london"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/salsa-classes-london" className="hover:text-primary">Salsa Classes London</Link> / <span className="text-primary">South West London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Salsa Classes in South West London
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8 leading-relaxed">
            South West London's best weekly salsa classes — every Monday in Chiswick and every Tuesday in Ealing. Whether you're from Putney, Richmond, Barnes, Fulham or Hammersmith, Pura Nights is your home for authentic Cuban-style and cross-body salsa. Led by Bachata UK Champion Melitta Siomos.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Your First Class</a>
            <Link to="/schedule" className="btn-cta-outline">View Full Schedule →</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Why South West London */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Why South West Londoners Choose Pura Nights</h2>
          <div className="text-muted-foreground space-y-4 mb-10">
            <p>The Latin dance scene in South West London is growing fast, and Pura Nights sits at the centre of it. Our Chiswick venue is just minutes from Turnham Green station, making it one of the easiest salsa classes to reach from across SW London — whether you're in Barnes, Putney, Richmond or Hammersmith.</p>
            <p>Unlike larger, impersonal schools, Pura Nights is an intimate, community-driven experience. Classes are capped for quality, partners rotate throughout, and every session ends with social dancing so you can practice what you've learned in a relaxed, friendly atmosphere.</p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Trophy size={24} />, title: "Award-Winning Instructor", desc: "Melitta Siomos is a UK Bachata Champion with 15+ years of teaching experience." },
            { icon: <Users size={24} />, title: "No Partner Needed", desc: "Come alone or with friends — partners rotate throughout every class." },
            { icon: <Star size={24} />, title: "All Levels Welcome", desc: "From absolute beginners to advanced dancers, there's a class for you." },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-xl p-6 card-hover text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">{item.icon}</div>
                <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Schedule */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-8">Salsa Class Schedule</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-xl p-8 border border-primary/20">
              <h3 className="font-display text-xl font-bold text-primary mb-4">Monday — Chiswick</h3>
              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />7:30 – 8:15 PM — Beginners Salsa</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />7:30 – 8:15 PM — Improvers Salsa</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />9:00 – 11:00 PM — Social Dancing</div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">🚇 Turnham Green (2 min) · Accessible from Putney, Barnes, Hammersmith, Kew</p>
            </div>
            <div className="bg-background rounded-xl p-8 border border-secondary/20">
              <h3 className="font-display text-xl font-bold text-secondary mb-4">Tuesday — Ealing</h3>
              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <div className="space-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />6:50 – 7:35 PM — Beginners Salsa</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />8:20 – 9:05 PM — Intermediate Salsa</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />9:50 – 11:00 PM — Social Dancing</div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">🚇 West Ealing (3 min) · Accessible from Richmond, Hounslow, Twickenham</p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Areas */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Easily Accessible From Across South West London</h2>
          <p className="text-muted-foreground mb-6">Students regularly travel from these South West London areas:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Putney", "Barnes", "Richmond", "Kew", "Hammersmith", "Fulham", "Chiswick", "Brentford", "Mortlake", "East Sheen", "Twickenham", "Hounslow"].map((area, i) => (
              <span key={i} className="bg-card rounded-lg px-4 py-2.5 text-sm text-center font-heading border border-border">{area}</span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* FAQs */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-8">Salsa in South West London — FAQs</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Where are the nearest salsa classes to Putney?", a: "Our Monday Chiswick class is the closest option — just a short bus or tube ride from Putney via Hammersmith. Turnham Green station is a 2-minute walk from the venue." },
              { q: "Do I need a partner for salsa?", a: "Not at all. Most of our students come alone. Partners rotate during class so everyone dances with everyone." },
              { q: "What level should I start at?", a: "If you've never danced before, start with our Beginners level. Our instructors will guide you from the very first step." },
              { q: "How much do classes cost?", a: "£15 for 2 classes + social, £10 for 1 class + social, or £5 for social only. We also offer discounted bundles and monthly passes." },
              { q: "Is there parking near the venues?", a: "Yes — both The George IV in Chiswick and Drayton Court in Ealing have nearby street parking and are well-served by public transport." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg px-6 border border-border">
                <AccordionTrigger className="font-heading font-semibold text-sm">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInUp>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Start Salsa This Week</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">Join South West London's favourite salsa community. No experience needed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book a Class</a>
          <Link to="/contact" className="btn-cta-outline border-primary-foreground/30 text-primary-foreground">Contact Melitta <ArrowRight size={16} className="ml-2" /></Link>
        </div>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/salsa-classes-chiswick", label: "Salsa in Chiswick" },
      { to: "/salsa-classes-ealing", label: "Salsa in Ealing" },
      { to: "/dance-classes-south-west-london", label: "All Dance Classes SW London" },
      { to: "/bachata-classes-south-west-london", label: "Bachata South West London" },
      { to: "/blog/salsa-south-west-london", label: "Blog: Salsa in SW London" },
    ]} />
  </Layout>
);

export default SalsaClassesSouthWestLondon;
