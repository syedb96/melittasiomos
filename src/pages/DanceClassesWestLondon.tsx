import { Link } from "react-router-dom";
import { MapPin, Clock, ChevronRight, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const schema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Dance Classes in West London — Salsa & Bachata",
  description: "Weekly Salsa and Bachata dance classes in West London at venues in Chiswick and Ealing. All levels, no partner needed.",
  provider: { "@type": "Organization", name: "Pura Nights by Melitta Siomos", url: "https://www.puranights.com" },
  areaServed: ["West London", "Chiswick", "Ealing", "Acton", "Hammersmith", "Shepherd's Bush", "Brentford", "Kew", "Richmond"],
};

/* <!-- WIX PAGE: dance-classes-west-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const DanceClassesWestLondon = () => (
  <Layout>
    <SeoHead
      title="Dance Classes West London | Salsa & Bachata | Pura Nights by Melitta Siomos"
      description="Looking for dance classes in West London? Join Pura Nights for weekly Salsa & Bachata in Chiswick and Ealing. All levels, no partner needed. Award-winning instruction."
      path="/dance-classes-west-london"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-primary">Dance Classes West London</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Dance Classes in West London — Salsa & Bachata with Melitta Siomos</h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">West London is home to one of the city's most vibrant Latin dance communities. Pura Nights by Melitta Siomos runs weekly Salsa and Bachata classes every Monday in Chiswick and every Tuesday in Ealing — all levels welcome, no partner needed.</p>
        <div className="flex flex-wrap gap-4">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">Book a Class</a>
          <Link to="/prices" className="btn-cta-ghost">View Pricing</Link>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Why West London for Latin Dance?</h2>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
            <p>West London has always been one of the city's most culturally diverse and vibrant areas. From Chiswick's buzzing high street to Ealing's grand Victorian architecture, the neighbourhoods that make up this part of the city are perfect for a thriving Latin dance scene. Pura Nights has become the heart of that scene — attracting dancers from Chiswick, Ealing, Acton, Hammersmith, Shepherd's Bush, Brentford, Kew, Richmond, and beyond.</p>
            <p>Melitta Siomos, Bachata UK Champion and founder of Pura Nights, chose West London deliberately. Both venues — The George IV in Chiswick and the Drayton Court Hotel in Ealing — are spacious, welcoming, and well-connected by tube, bus, and rail. Whether you're a local or travelling from Central London, getting to class is easy.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Weekly Schedule</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInUp delay={0.1}>
            <div className="bg-background rounded-2xl p-6 card-hover border-l-4 border-primary h-full">
              <h3 className="font-display text-xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                <p>7:30 PM — Beginners · 8:00 PM — Improvers · 8:30 PM — Intermediate</p>
                <p>9:00–11:00 PM — Social Dancing</p>
              </div>
              <Link to="/salsa-classes-chiswick" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">More about Chiswick <ChevronRight size={12} /></Link>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-background rounded-2xl p-6 card-hover border-l-4 border-peach h-full">
              <h3 className="font-display text-xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                <p>6:50 PM — Free Styling · 7:30 PM — Beginners · 8:00 PM — Improvers</p>
                <p>8:30 PM — Intermediate · 9:00–11:00 PM — Social</p>
              </div>
              <Link to="/salsa-classes-ealing" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">More about Ealing <ChevronRight size={12} /></Link>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What We Teach</h2>
          <div className="space-y-3">
            {[
              "Salsa On1 (Crossbody / LA style) — the most versatile social dance style",
              "Bachata Moderna & Bachata Sensual — intimate, expressive, and accessible",
              "Ladies Styling — body movement, arm styling, and confidence",
              "Musicality — learning to hear the music and respond to it naturally",
              "Partner connection — leading, following, and communication",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Areas */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-6">Serving All of West London</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {["Chiswick", "Ealing", "Acton", "West Ealing", "Ealing Broadway", "Gunnersbury", "Turnham Green", "Hammersmith", "Shepherd's Bush", "Brentford", "Kew", "Richmond", "Hanwell", "Greenford"].map(area => (
              <span key={area} className="text-xs font-accent bg-primary/10 text-primary px-3 py-1.5 rounded-full">{area}</span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8">West London Dance Class FAQs</h2>
        {[
          { q: "Are these the only Latin dance classes in West London?", a: "There are other classes around, but Pura Nights is the only weekly school in West London offering three levels every evening with an award-winning instructor and a built-in social dance floor." },
          { q: "Can I attend both Monday and Tuesday?", a: "Absolutely — and many of our students do. Dancing twice a week significantly accelerates your progress." },
          { q: "Is there a student or concession rate?", a: "Contact Melitta directly to discuss — siomosmelitta@gmail.com" },
        ].map((faq, i) => (
          <details key={i} className="border-b border-border py-4">
            <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
            <p className="text-muted-foreground text-sm mt-2">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Join West London's Latin Dance Community</h2>
        <p className="text-charcoal/70 mb-8">No partner needed. All levels. Just turn up.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Class</a>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/salsa-classes-chiswick", label: "Salsa in Chiswick" },
      { to: "/salsa-classes-ealing", label: "Salsa in Ealing" },
      { to: "/bachata-classes-west-london", label: "Bachata West London" },
      { to: "/private-dance-lessons-west-london", label: "Private Lessons West London" },
      { to: "/blog/best-areas-west-london", label: "Best Areas for Latin Dance" },
      { to: "/blog/west-london-latin-dance-guide", label: "West London Dance Guide" },
      { to: "/pura-nights", label: "Weekly Classes" },
    ]} />
  </Layout>
);

export default DanceClassesWestLondon;