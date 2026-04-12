import { Link } from "react-router-dom";
import { MapPin, Clock, Star, ArrowRight, Heart, Music, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const schema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Bachata Classes South West London",
  description: "Weekly bachata dance classes in Chiswick and Ealing, accessible from across South West London. Beginner to intermediate levels with UK Champion instructor Melitta Siomos.",
  provider: { "@type": "Organization", name: "Pura Nights", url: "https://www.puranights.com" },
  areaServed: ["South West London", "Chiswick", "Ealing", "Putney", "Richmond", "Barnes", "Fulham"],
};

/* <!-- WIX PAGE: bachata-classes-south-west-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const BachataClassesSouthWestLondon = () => (
  <Layout>
    <SeoHead
      title="Bachata Classes South West London | Chiswick & Ealing | Pura Nights"
      description="Find bachata classes in South West London with Pura Nights. Weekly beginner to intermediate bachata in Chiswick and Ealing. Led by UK Bachata Champion Melitta Siomos. No partner needed."
      path="/bachata-classes-south-west-london"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/bachata-classes-london" className="hover:text-primary">Bachata Classes London</Link> / <span className="text-secondary">South West London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Bachata Classes in South West London
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8 leading-relaxed">
            Fall in love with bachata — South West London's fastest-growing social dance. Pura Nights runs weekly bachata classes every Monday in Chiswick and every Tuesday in Ealing, covering sensual, moderna and Dominican styles. Perfect for dancers from Putney, Richmond, Barnes, Fulham and beyond.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Your First Bachata Class</a>
            <Link to="/schedule" className="btn-cta-outline">View Full Schedule →</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* What is Bachata */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What Makes Bachata So Special?</h2>
          <div className="text-muted-foreground space-y-4 mb-10">
            <p>Bachata is a sensual, rhythmic partner dance from the Dominican Republic that has taken London by storm. At Pura Nights, our bachata classes blend traditional footwork with modern sensual styling — creating a dance that's both expressive and accessible for complete beginners.</p>
            <p>What makes our bachata different? Melitta Siomos is literally a UK Bachata Champion. You're learning from someone who has competed at the highest level and knows how to break down complex movements into simple, enjoyable steps.</p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: <Heart size={24} />, title: "Connection-Based", desc: "Bachata is all about musicality and partner connection. It's intimate, fun, and deeply rewarding." },
            { icon: <Music size={24} />, title: "Multiple Styles", desc: "We teach sensual, moderna and Dominican bachata — giving you versatility on any social dance floor." },
            { icon: <Users size={24} />, title: "Beginner-Friendly", desc: "The basic step is simple. Within one class you'll be dancing with a partner to beautiful music." },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-xl p-6 card-hover text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-4">{item.icon}</div>
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
          <h2 className="font-display text-3xl font-bold mb-8">Bachata Class Schedule</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-xl p-8 border border-primary/20">
              <h3 className="font-display text-xl font-bold text-primary mb-4">Monday — Chiswick</h3>
              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />8:15 – 9:00 PM — Beginners Bachata</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />8:15 – 9:00 PM — Improvers Bachata</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />9:00 – 11:00 PM — Social Dancing</div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">🚇 Turnham Green (2 min) · Chiswick Park (5 min)</p>
            </div>
            <div className="bg-background rounded-xl p-8 border border-secondary/20">
              <h3 className="font-display text-xl font-bold text-secondary mb-4">Tuesday — Ealing</h3>
              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <div className="space-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />7:35 – 8:20 PM — Beginners Bachata</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />9:05 – 9:50 PM — Intermediate Bachata</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-secondary" />9:50 – 11:00 PM — Social Dancing</div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">🚇 West Ealing (3 min) · Ealing Broadway (10 min)</p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Pricing */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-8">Bachata Class Pricing</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { price: "£15", label: "2 Classes + Social" },
              { price: "£10", label: "1 Class + Social" },
              { price: "£5", label: "Social Only" },
            ].map((p, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <p className="font-display text-3xl font-bold text-secondary mb-1">{p.price}</p>
                <p className="font-heading font-semibold text-sm">{p.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">Bundle discounts available · <Link to="/prices" className="text-primary font-heading font-semibold hover:underline">See all pricing →</Link></p>
        </FadeInUp>
      </div>
    </section>

    {/* Areas */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">South West London Areas We Serve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Putney", "Barnes", "Richmond", "Kew", "Hammersmith", "Fulham", "Chiswick", "Brentford", "Mortlake", "East Sheen", "Twickenham", "Hounslow"].map((area, i) => (
              <span key={i} className="bg-background rounded-lg px-4 py-2.5 text-sm text-center font-heading border border-border">{area}</span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* FAQs */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-8">Bachata in South West London — FAQs</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Is bachata harder than salsa?", a: "Many students find bachata slightly easier to pick up because the basic step is simpler. However, both dances are taught from absolute beginner level at Pura Nights, so you'll feel comfortable regardless." },
              { q: "Where can I dance bachata near Putney?", a: "Our Monday Chiswick class is the closest regular bachata class to Putney — easily reached via Hammersmith on the District line. Turnham Green station is a 2-minute walk from the venue." },
              { q: "Do you teach bachata sensual?", a: "Yes! Melitta is a UK Bachata Champion specialising in sensual bachata. Our classes cover sensual, moderna and Dominican styles across different levels." },
              { q: "Can I try just one class?", a: "Absolutely. Drop-in is £10 for one class + social dancing. No commitment, no booking required — just show up." },
              { q: "What should I wear to a bachata class?", a: "Comfortable clothes you can move in. Smooth-soled shoes are ideal (avoid trainers with heavy grip). Many dancers bring a change of shoes for social dancing." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg px-6 border border-border">
                <AccordionTrigger className="font-heading font-semibold text-sm">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInUp>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-secondary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-secondary-foreground mb-4">Try Bachata This Week</h2>
        <p className="text-secondary-foreground/80 mb-8 max-w-md mx-auto">No partner needed, no experience required. Just bring your curiosity.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book a Class</a>
          <Link to="/contact" className="btn-cta-outline border-secondary-foreground/30 text-secondary-foreground">Contact Melitta <ArrowRight size={16} className="ml-2" /></Link>
        </div>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/bachata-classes-ealing", label: "Bachata in Ealing" },
      { to: "/bachata-classes-chiswick", label: "Bachata in Chiswick" },
      { to: "/dance-classes-south-west-london", label: "All Dance Classes SW London" },
      { to: "/salsa-classes-south-west-london", label: "Salsa South West London" },
      { to: "/blog/bachata-for-beginners-london", label: "Blog: Bachata for Beginners" },
    ]} />
  </Layout>
);

export default BachataClassesSouthWestLondon;
