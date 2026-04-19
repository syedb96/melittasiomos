import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { BookOpen, MapPin, Music, ChevronRight, Shield, Users, Star, Heart } from "lucide-react";
import heroImg from "@/assets/hero-dance.jpg";

/* <!-- WIX PAGE: /start-here -->
   <!-- WIX SECTION: Hero — Full-width Strip with welcoming image -->
   <!-- WIX SECTION: 3-Step Guide — use 3-column Card grid -->
   <!-- WIX SECTION: What to Expect Timeline — use Steps strip -->
   <!-- WIX SECTION: Quick Answers — use 2x2 Card grid -->
   <!-- WIX SECTION: Choose Your Style — use 2-column comparison cards -->
   <!-- WIX SECTION: Pick Your Venue — use 2-column venue cards -->
   <!-- WIX SECTION: Still Have Questions — use CTA Strip with FAQ + WhatsApp links -->
*/
const StartHere = () => (
  <Layout>
    <SeoHead
      title="Start Here — Your First Salsa & Bachata Class in London | Pura Nights"
      description="Never danced before? This page tells you everything you need to know before your first Pura Nights class: what to wear, what to expect, levels explained, and how to get there."
      path="/start-here"
    />

    {/* Hero */}
    <section className="relative h-72 md:h-96 overflow-hidden">
      <img src={heroImg} alt="Beginners salsa class at Pura Nights London" className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">New to Latin Dance? Start Here.</h1>
          <p className="text-primary-foreground/80 font-heading text-lg max-w-2xl mx-auto">Everything you need to know before your first class at Pura Nights. No partner. No experience. No pressure.</p>
        </div>
      </div>
    </section>

    {/* 3-STEP PATH */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Three Simple Steps</h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {[
            { num: "1", icon: BookOpen, title: "READ", desc: "Pick your guide: Salsa or Bachata?", links: [{ to: "/blog/what-is-salsa", label: "What is Salsa?" }, { to: "/blog/what-is-bachata", label: "What is Bachata?" }] },
            { num: "2", icon: MapPin, title: "COME", desc: "Choose a class night: Chiswick Monday or Ealing Tuesday.", links: [{ to: "/pura-nights", label: "View Schedule" }] },
            { num: "3", icon: Music, title: "DANCE", desc: "Just turn up. The rest takes care of itself.", links: [{ to: "/prices", label: "See Prices" }] },
          ].map((s, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-8 card-hover h-full text-center">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-bold text-primary">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold uppercase tracking-wider text-sm mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>
                <div className="flex flex-col gap-1">
                  {s.links.map((l, j) => (
                    <Link key={j} to={l.to} className="text-primary text-xs font-heading font-semibold hover:underline inline-flex items-center gap-1 justify-center">{l.label} <ChevronRight size={11} /></Link>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* v7.1 audit — Why Choose Pura Nights competitive differentiator */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary text-center mb-3">The Pura Nights Difference</p>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Why Choose Pura Nights?</h2>
        </FadeInUp>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { icon: Shield, title: "Taught by a Champion", desc: "Not a rotating roster of freelancers. Melitta teaches every class personally." },
            { icon: Users, title: "Maximum 30 Students Per Class", desc: "You get real feedback, real correction, real progress. Not lost in a crowd." },
            { icon: Star, title: "5.0 Google Rating Across 4 Brands", desc: "Hundreds of real reviews, never incentivised." },
            { icon: Heart, title: "A Real Community", desc: "Students come for the dancing, stay for the people. Monthly socials, WhatsApp groups, lifelong friendships." },
          ].map((c, i) => (
            <FadeInUp key={c.title} delay={i * 0.08}>
              <div className="bg-card rounded-2xl p-6 border border-border h-full flex gap-4">
                <c.icon size={28} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-base mb-2">{c.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* WHAT TO EXPECT — Timeline */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-10">What to Expect</h2>
        </FadeInUp>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-6 gap-4" staggerDelay={0.08}>
          {[
            { emoji: "🚪", label: "Arrive" },
            { emoji: "🤸", label: "Warm-up" },
            { emoji: "🎓", label: "Pick Level" },
            { emoji: "💃", label: "Class" },
            { emoji: "🎶", label: "Social" },
            { emoji: "🏠", label: "Home!" },
          ].map((s, i) => (
            <StaggerItem key={i}>
              <div className="text-center">
                <p className="text-3xl mb-2">{s.emoji}</p>
                <p className="text-primary-foreground/70 text-xs font-heading font-semibold">{s.label}</p>
                {i < 5 && <p className="text-primary-foreground/20 text-lg mt-1 hidden md:block">→</p>}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* QUICK ANSWERS */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Quick Answers</h2>
        </FadeInUp>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { q: "Do I need a partner?", a: "No — we rotate partners in every class." },
            { q: "Do I need experience?", a: "No — Beginners starts from zero every week." },
            { q: "Do I need to book?", a: "No — just turn up on the night." },
            { q: "How much is it?", a: "From £5 (social only) or £10 per class. See full pricing." },
          ].map((qa, i) => (
            <FadeInUp key={i} delay={i * 0.08}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full">
                <h3 className="font-heading font-bold text-sm mb-2 text-primary">{qa.q}</h3>
                <p className="text-muted-foreground text-sm">{qa.a}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* CHOOSE YOUR STYLE */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Choose Your Style</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInUp delay={0.1}>
            <div className="bg-charcoal rounded-2xl p-8 border border-primary/15 h-full">
              <h3 className="font-display text-xl font-bold text-primary mb-2">🎶 Salsa On1</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">Fast, energetic, footwork-driven. Originated from Cuba via New York. The ultimate social dance — once you learn it, you can dance anywhere in the world.</p>
              <Link to="/blog/what-is-salsa" className="text-primary text-xs font-heading font-semibold hover:underline">Read Full Guide →</Link>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-charcoal rounded-2xl p-8 border border-peach/15 h-full">
              <h3 className="font-display text-xl font-bold text-peach mb-2">💃 Bachata</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">Slower, romantic, and deeply expressive. Born in the Dominican Republic. Known for body waves, close connection, and musicality.</p>
              <Link to="/blog/what-is-bachata" className="text-peach text-xs font-heading font-semibold hover:underline">Read Full Guide →</Link>
            </div>
          </FadeInUp>
        </div>
        <FadeInUp delay={0.3} className="text-center mt-6">
          <Link to="/blog/salsa-vs-bachata" className="text-primary font-heading text-sm font-semibold hover:underline inline-flex items-center gap-1">Read Full Comparison <ChevronRight size={14} /></Link>
        </FadeInUp>
      </div>
    </section>

    {/* PICK YOUR VENUE */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Pick Your Venue</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInUp delay={0.1}>
            <div className="bg-card rounded-2xl p-6 card-hover border-l-4 border-primary h-full">
              <h3 className="font-display text-xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <p className="text-muted-foreground text-sm mb-1">The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <p className="text-muted-foreground text-xs mb-3">7:30pm–11pm · From £10</p>
              <Link to="/pura-nights" className="text-primary text-xs font-heading font-semibold hover:underline">View Details →</Link>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-card rounded-2xl p-6 card-hover border-l-4 border-peach h-full">
              <h3 className="font-display text-xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <p className="text-muted-foreground text-sm mb-1">Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <p className="text-muted-foreground text-xs mb-3">6:50pm–11pm · From £10 · Free styling warm-up</p>
              <Link to="/pura-nights" className="text-peach text-xs font-heading font-semibold hover:underline">View Details →</Link>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* STILL HAVE QUESTIONS */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Still Have Questions?</h2>
        <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">Check the full FAQ or message Melitta directly on WhatsApp for the fastest response.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/faq" className="btn-cta-dark text-sm">Read All FAQs</Link>
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm">💬 WhatsApp Melitta</a>
        </div>
      </div>
    </section>

    <RelatedPages title="Next Steps" links={[
      { to: "/pura-nights", label: "Weekly Classes" },
      { to: "/prices", label: "Prices & Bundles" },
      { to: "/blog/salsa-vs-bachata", label: "Salsa vs Bachata" },
      { to: "/faq", label: "FAQ" },
    ]} />
  </Layout>
);

export default StartHere;
