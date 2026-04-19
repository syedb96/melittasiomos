import { Link } from "react-router-dom";
import { MapPin, Clock, CheckCircle, ChevronRight, Train } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImg from "@/assets/salsa-class-teaching.jpg";

/* <!-- WIX PAGE: salsa-classes-acton -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const SalsaClassesActon = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes Acton | Weekly Salsa & Bachata Near Acton | Pura Nights"
      description="Looking for salsa classes near Acton? Pura Nights runs weekly Salsa & Bachata classes in nearby Chiswick (Mondays) and Ealing (Tuesdays). All levels, no partner needed."
      path="/salsa-classes-acton"
      schema={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Salsa & Bachata Classes Near Acton",
        description: "Weekly Salsa and Bachata dance classes accessible from Acton, W3. Held at venues in Chiswick and Ealing by award-winning instructor Melitta Siomos.",
        provider: { "@type": "Organization", name: "Pura Nights by Melitta Siomos", url: "https://www.puranights.com" },
        areaServed: ["Acton", "East Acton", "West Acton", "North Acton", "Acton Central", "South Acton", "Chiswick", "Ealing"],
      }}
    />

    {/* Hero */}
    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Salsa class near Acton" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/salsa-classes-london" className="hover:text-primary">Salsa London</Link> / <span className="text-primary">Acton</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Salsa Classes Near Acton — Weekly Salsa & Bachata in W3</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">Acton sits right between our two weekly venues — Chiswick on Mondays and Ealing on Tuesdays. Whether you're in East Acton, West Acton, Acton Central, or South Acton, you're just minutes away from London's most welcoming Latin dance classes. No partner needed, all levels welcome.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">Book a Class</a>
            <Link to="/start-here" className="btn-cta-ghost">New to Dancing?</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Why Acton */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Why Acton Is Perfect for Latin Dance</h2>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
            <p>Acton is one of West London's best-connected neighbourhoods, sitting on the Central, District, Piccadilly, and Elizabeth lines — plus the London Overground. That means getting to either of our two weekly venues is quick and easy, whether you're travelling from Acton Main Line, Acton Central, East Acton, or North Acton.</p>
            <p>Our <strong>Monday classes in Chiswick</strong> at The George IV are just two stops from Acton Town on the District Line (alight at Turnham Green). Our <strong>Tuesday classes in Ealing</strong> at the Drayton Court Hotel are a short bus ride or one stop on the Elizabeth Line from Acton Main Line to West Ealing.</p>
            <p>Many of our regular students come from the Acton area — the diverse, creative energy of W3 fits perfectly with the Latin dance community we've built at Pura Nights. Whether you're a young professional, a parent looking for something after work, or a retiree exploring a new hobby, our classes welcome everyone.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Getting Here */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">How to Get Here from Acton</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInUp delay={0.1}>
            <div className="bg-background rounded-2xl p-6 card-hover border-l-4 border-primary h-full">
              <h3 className="font-display text-xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2"><Train size={14} className="text-primary" /> District Line: Acton Town → Turnham Green (2 min)</p>
                <p className="flex items-center gap-2"><Train size={14} className="text-primary" /> Bus 237 from Acton High Street (10 min)</p>
                <p className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 7:30 PM Beginners · 8:00 Improvers · 8:30 Intermediate</p>
                <p>9:00–11:00 PM Social Dancing</p>
              </div>
              <Link to="/salsa-classes-chiswick" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Full Chiswick details <ChevronRight size={12} /></Link>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-background rounded-2xl p-6 card-hover border-l-4 border-peach h-full">
              <h3 className="font-display text-xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2"><Train size={14} className="text-peach" /> Elizabeth Line: Acton Main Line → West Ealing (3 min)</p>
                <p className="flex items-center gap-2"><Train size={14} className="text-peach" /> Bus 207 from Acton High Street (12 min)</p>
                <p className="flex items-center gap-2"><Clock size={14} className="text-peach" /> 6:50 Free Styling · 7:30 Beginners · 8:00 Improvers · 8:30 Intermediate</p>
                <p>9:00–11:00 PM Social Dancing</p>
              </div>
              <Link to="/salsa-classes-ealing" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Full Ealing details <ChevronRight size={12} /></Link>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* What We Teach */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What You'll Learn</h2>
          <div className="space-y-3">
            {[
              "Salsa On1 (Crossbody / LA style) — the most versatile and widely danced social salsa style worldwide",
              "Bachata Moderna & Sensual — smooth, expressive, and deeply musical partner dance",
              "Ladies Styling — body movement, arm styling, footwork refinements, and confidence building",
              "Musicality — understanding the clave, the melody, and how to express the music through movement",
              "Partner connection — leading, following, body contact, and communication on the social floor",
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

    {/* Who Comes From Acton */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Who Comes from Acton?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">Our Acton students include young professionals from the new developments near North Acton and East Acton, families and couples from South Acton and Acton Green, and retirees exploring Latin dance for the first time. The Acton area is incredibly diverse, and our classes reflect that — you'll dance alongside people from all walks of life, ages 20 to 65+.</p>
          <p className="text-muted-foreground text-sm leading-relaxed">Many Acton students attend both Monday and Tuesday — dancing twice a week accelerates your progress enormously and gives you two different social floors to practise on.</p>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8">FAQs — Salsa Classes from Acton</h2>
        {[
          { q: "Are there salsa classes held in Acton itself?", a: "Currently our weekly classes are held at two dedicated venues — Chiswick (Monday) and Ealing (Tuesday). Both are very easy to reach from any part of Acton by tube, bus, or even on foot." },
          { q: "Do I need a partner?", a: "No. We rotate partners during class so everyone dances with everyone. Most of our students come solo." },
          { q: "Which night should I try first?", a: "Both nights offer the same quality. Monday in Chiswick is slightly closer for East Acton and Acton Central residents. Tuesday in Ealing is more convenient for West Acton and Acton Main Line." },
          { q: "How much does it cost?", a: "£15 for two classes plus social dancing. £10 for a single class. £5 for social only. No membership required." },
          { q: "What should I wear?", a: "Comfortable clothes and clean indoor shoes. Trainers with flat soles work well for beginners. Avoid shoes that grip the floor too much." },
        ].map((faq, i) => (
          <details key={i} className="border-b border-border py-4">
            <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
            <p className="text-muted-foreground text-sm mt-2">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Ready to Dance?</h2>
        <p className="text-charcoal/70 mb-6 max-w-lg mx-auto">Join hundreds of Acton residents who've found their rhythm at Pura Nights. No experience needed — just turn up.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Class</a>
          <Link to="/prices" className="text-charcoal font-heading font-semibold text-sm hover:opacity-70 transition-opacity">View Pricing →</Link>
        </div>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/blog/dance-classes-acton-adults", label: "Dance Classes Acton Guide" },
      { to: "/pura-nights", label: "Full Schedule" },
    ]} />
  </Layout>
);

export default SalsaClassesActon;
