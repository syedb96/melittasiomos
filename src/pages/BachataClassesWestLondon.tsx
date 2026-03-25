import { Link } from "react-router-dom";
import { MapPin, Clock, CheckCircle, ChevronRight, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const BachataClassesWestLondon = () => (
  <Layout>
    <SeoHead
      title="Bachata Classes West London | Weekly Classes in Chiswick & Ealing | Pura Nights"
      description="Learn Bachata in West London with award-winning instructor Melitta Siomos. Weekly Bachata Moderna & Sensual classes in Chiswick and Ealing. All levels, no partner needed."
      path="/bachata-classes-west-london"
      schema={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Bachata Classes in West London",
        description: "Weekly Bachata Moderna and Bachata Sensual classes in Chiswick and Ealing, West London. Taught by Bachata UK Champion Melitta Siomos.",
        provider: { "@type": "Organization", name: "Pura Nights by Melitta Siomos", url: "https://www.melittasiomos.com" },
        areaServed: ["West London", "Chiswick", "Ealing", "Acton", "Hammersmith", "Shepherd's Bush", "Brentford", "Kew", "Richmond"],
      }}
    />

    {/* Hero */}
    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/bachata-classes-london" className="hover:text-primary">Bachata London</Link> / <span className="text-primary">West London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Bachata Classes in West London — Moderna, Sensual & Traditional</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">West London is home to one of the UK's strongest Bachata communities. Led by Bachata UK Champion Melitta Siomos, Pura Nights offers weekly Bachata classes every Monday in Chiswick and every Tuesday in Ealing — covering Bachata Moderna, Bachata Sensual, and traditional Dominican-rooted Bachata for all levels.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">Book a Class</a>
            <Link to="/blog/what-is-bachata" className="btn-cta-ghost">What Is Bachata?</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Bachata Styles */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What Styles of Bachata Do We Teach?</h2>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
            <p>Bachata at Pura Nights isn't just one thing — it's a rich, evolving art form. Melitta teaches across three core Bachata styles, blending them into a holistic approach that prepares you for any social dance floor in the world:</p>
          </div>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mt-8" staggerDelay={0.1}>
          {[
            { title: "Bachata Moderna", desc: "The most popular social style globally. Smooth footwork, elegant turns, and musical interpretation. This is the foundation style taught in our classes." },
            { title: "Bachata Sensual", desc: "Body waves, isolations, and deep musical connection. Made famous by artists like Daniel & Desiree, and taught by Melitta at all her events and workshops." },
            { title: "Traditional Bachata", desc: "The original Dominican Republic style — raw, rhythmic, and grounded. Understanding the roots enriches every other style you dance." },
          ].map((style, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-xl p-6 h-full card-hover">
                <Heart size={20} className="text-primary mb-3" />
                <h3 className="font-display text-lg font-bold mb-2">{style.title}</h3>
                <p className="text-muted-foreground text-sm">{style.desc}</p>
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
          <h2 className="font-display text-3xl font-bold text-center mb-10">Weekly Bachata Schedule</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInUp delay={0.1}>
            <div className="bg-background rounded-2xl p-6 card-hover border-l-4 border-primary h-full">
              <h3 className="font-display text-xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2"><Clock size={14} /> 7:30 PM Beginners · 8:00 Improvers · 8:30 Intermediate</p>
                <p>9:00–11:00 PM Social Dancing</p>
              </div>
              <Link to="/bachata-classes-chiswick" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Chiswick details <ChevronRight size={12} /></Link>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-background rounded-2xl p-6 card-hover border-l-4 border-peach h-full">
              <h3 className="font-display text-xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2"><Clock size={14} /> 6:50 Free Styling · 7:30 Beginners · 8:00 Improvers · 8:30 Intermediate</p>
                <p>9:00–11:00 PM Social Dancing</p>
              </div>
              <Link to="/bachata-classes-ealing" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Ealing details <ChevronRight size={12} /></Link>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* Why Learn Bachata */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Why Learn Bachata in West London?</h2>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
            <p>Bachata is one of the fastest-growing social dances in the world — and West London has become one of its UK epicentres. Melitta Siomos is a Bachata UK Champion with international competition and performance experience, making her one of the most qualified Bachata instructors in London.</p>
            <p>At Pura Nights, Bachata isn't an afterthought — it sits equally alongside Salsa as a core part of every evening. You'll learn genuine technique, musicality, and partner connection in a welcoming, inclusive environment. Many of our students start with zero experience and are dancing socially within weeks.</p>
            <p>Beyond the classes, the Pura Nights community offers monthly social events, workshops, and the opportunity to join Pura Ladies — our award-winning women's performance team that specialises in Bachata Sensual styling.</p>
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
            {["Chiswick", "Ealing", "Acton", "West Ealing", "Ealing Broadway", "Hammersmith", "Shepherd's Bush", "Brentford", "Kew", "Richmond", "Turnham Green", "Gunnersbury", "Hanwell", "Greenford"].map(area => (
              <span key={area} className="text-xs font-accent bg-primary/10 text-primary px-3 py-1.5 rounded-full">{area}</span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8">Bachata in West London — FAQs</h2>
        {[
          { q: "Is Bachata easier than Salsa?", a: "Many people find Bachata more intuitive initially because the basic step is simpler. However, both dances have deep layers of technique and musicality. At Pura Nights you learn both Salsa and Bachata every evening." },
          { q: "Do I need rhythm to learn Bachata?", a: "No! Rhythm is something you develop through practice. Bachata music has a clear, steady beat that's easy to follow, even for absolute beginners." },
          { q: "Can men attend the ladies styling session?", a: "The free styling session on Tuesdays is currently for women only. However, all genders are welcome in all the main classes." },
          { q: "What if I only want to learn Bachata, not Salsa?", a: "At Pura Nights, each evening covers both Salsa and Bachata. Most students find they enjoy both — but you're welcome to focus on whichever style resonates more with you." },
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
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Start Your Bachata Journey</h2>
        <p className="text-charcoal/70 mb-6">No partner needed. No experience required. Just bring yourself.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Bachata Class</a>
      </div>
    </section>
  </Layout>
);

export default BachataClassesWestLondon;
