import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Users, GraduationCap, Heart, Clock, MapPin, ArrowDown, Gift, ChevronRight, Award, Sparkles, Music, Instagram } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-dance.jpg";
import melittaImg from "@/assets/melitta-portrait.jpg";
import weddingImg from "@/assets/wedding-dance.jpg";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import socialImg from "@/assets/social-dancing.jpg";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const trustStats = [
  { icon: GraduationCap, value: "15+", label: "Years Teaching" },
  { icon: Users, value: "500+", label: "Students Taught" },
  { icon: Award, value: "UK", label: "Bachata Champion" },
  { icon: Star, value: "5.0", label: "Google Rating" },
  { icon: Heart, value: "All", label: "Levels Welcome" },
  { icon: Sparkles, value: "No", label: "Partner Needed" },
];

function getNextClassCountdown() {
  const now = new Date();
  const getNext = (dayOfWeek: number, hour: number, minute: number) => {
    const d = new Date(now);
    d.setHours(hour, minute, 0, 0);
    const diff = (dayOfWeek - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + (diff === 0 && d <= now ? 7 : diff));
    return d;
  };
  const nextMon = getNext(1, 19, 30);
  const nextTue = getNext(2, 18, 50);
  return { monday: nextMon, tuesday: nextTue };
}

function formatCountdown(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { d: 0, h: 0, m: 0 };
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return { d, h, m };
}

const Index = () => {
  const [countdown, setCountdown] = useState(getNextClassCountdown);
  const [monCD, setMonCD] = useState(formatCountdown(countdown.monday));
  const [tueCD, setTueCD] = useState(formatCountdown(countdown.tuesday));

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getNextClassCountdown();
      setCountdown(next);
      setMonCD(formatCountdown(next.monday));
      setTueCD(formatCountdown(next.tuesday));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <SeoHead
        title="Salsa & Bachata Classes London | Pura Nights by Melitta Siomos"
        description="Join London's award-winning Salsa & Bachata dance school. Weekly classes in Chiswick & Ealing, private lessons, wedding dance & performance teams. All levels welcome. Book today!"
        path="/"
      />

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* <!-- WIX: Replace with Wix Video Background or Hero Media --> */}
        <img src={heroImage} alt="Pura Nights salsa and bachata social dancing in London" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-accent text-xs tracking-[0.3em] uppercase text-primary mb-6">
            SALSA & BACHATA · WEST LONDON · ALL LEVELS WELCOME
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            Dance Like You Mean It
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }} className="font-heading text-base md:text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-light">
            West London's most vibrant Salsa & Bachata community. Weekly classes in Chiswick & Ealing — no partner, no experience needed.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class →</a>
            <Link to="/pura-nights" className="btn-cta-ghost text-sm">See Class Schedule</Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-primary-foreground/50 text-xs mt-8 font-heading">
            ⭐⭐⭐⭐⭐ 5.0 Google Rating · 500+ Students · 15+ Years Teaching
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle text-primary/60">
          <ArrowDown size={28} />
        </motion.div>
      </section>

      {/* SECTION 2 — TRUST TICKER */}
      <section className="py-8 bg-charcoal border-y border-primary/10">
        <div className="container-main">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {trustStats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
                <stat.icon size={20} className="text-primary mx-auto mb-1.5" />
                <p className="font-display text-lg font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-[10px] font-accent uppercase tracking-wider text-primary-foreground/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — NEXT CLASS COUNTDOWN */}
      <section className="section-padding section-dark">
        <div className="container-main text-center">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Don't Miss Out</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-10">Your Next Class Starts In…</h2>
          </FadeInUp>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Monday — Chiswick", cd: monCD, accent: "text-primary" },
              { label: "Tuesday — Ealing", cd: tueCD, accent: "text-peach" },
            ].map((v, i) => (
              <FadeInUp key={i} delay={i * 0.15}>
                <div className="bg-charcoal-light rounded-2xl p-6 border border-primary-foreground/5">
                  <p className={`font-heading font-bold text-sm mb-4 ${v.accent}`}>{v.label}</p>
                  <div className="flex justify-center gap-3">
                    {[
                      { val: v.cd.d, unit: "DAYS" },
                      { val: v.cd.h, unit: "HRS" },
                      { val: v.cd.m, unit: "MIN" },
                    ].map((t, j) => (
                      <div key={j} className="bg-charcoal rounded-xl px-4 py-3 min-w-[60px]">
                        <p className="font-display text-2xl font-bold text-primary">{String(t.val).padStart(2, "0")}</p>
                        <p className="text-[9px] font-accent tracking-wider text-primary-foreground/40">{t.unit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
          <FadeInUp delay={0.3} className="mt-8">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Now →</a>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 4 — 4 BRAND PILLARS */}
      <section className="section-padding section-ivory">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">What We Do</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Our Brands</h2>
          </FadeInUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
            {[
              { img: socialImg, emoji: "🎶", title: "PURA NIGHTS", sub: "Weekly Classes", desc: "Salsa & Bachata every Monday & Tuesday. 3 levels. All welcome.", link: "/pura-nights", cta: "Find Out More →" },
              { img: puraLadiesImg, emoji: "👗", title: "PURA LADIES", sub: "Performance Team", desc: "7 international teams. London, Plymouth, Munich, Lisbon.", link: "/pura-ladies", cta: "Join Pura Ladies →" },
              { img: weddingImg, emoji: "💑", title: "WEDDING DANCE", sub: "First Dance Specialists", desc: "Melitta has choreographed dozens of unforgettable first dances.", link: "/wedding-dance", cta: "Book a Consultation →" },
              { img: melittaImg, emoji: "💻", title: "ONLINE CLASSES", sub: "Dance From Home", desc: "Live Zoom classes + HD drill videos. Learn at your own pace.", link: "/online-classes", cta: "Explore Online →" },
            ].map((card, i) => (
              <StaggerItem key={i}>
                <Link to={card.link} className="relative group block rounded-2xl overflow-hidden h-80 card-hover">
                  <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-2xl mb-1">{card.emoji}</p>
                    <h3 className="font-display text-lg font-bold text-primary-foreground mb-0.5">{card.title}</h3>
                    <p className="text-primary text-[10px] font-accent uppercase tracking-wider mb-2">{card.sub}</p>
                    <p className="text-primary-foreground/70 text-xs leading-relaxed mb-3">{card.desc}</p>
                    <span className="text-primary font-heading text-xs font-semibold">{card.cta}</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 5 — WEEKLY CLASS SCHEDULE TABLE */}
      <section className="section-padding section-dark">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">Every Week</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-3">Join Us This Week</h2>
            <p className="text-primary-foreground/50 text-center text-sm mb-10 font-heading">No booking required for weekly classes — just turn up.</p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-primary-foreground/10">
                    {["Day", "Venue", "Time", "What's On", "Price", ""].map(h => (
                      <th key={h} className="py-3 px-4 font-heading font-semibold text-primary-foreground/60 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-primary-foreground/80">
                  <tr className="border-b border-primary-foreground/5">
                    <td className="py-4 px-4 font-heading font-bold text-primary">Monday</td>
                    <td className="py-4 px-4">The George IV, Chiswick</td>
                    <td className="py-4 px-4">7:30–11pm</td>
                    <td className="py-4 px-4">3 levels Salsa & Bachata + social</td>
                    <td className="py-4 px-4 font-semibold">From £10</td>
                    <td className="py-4 px-4"><a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="text-primary font-heading font-semibold text-xs hover:underline">Book →</a></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-heading font-bold text-peach">Tuesday</td>
                    <td className="py-4 px-4">Drayton Court, Ealing</td>
                    <td className="py-4 px-4">6:50–11pm</td>
                    <td className="py-4 px-4">Free styling warm-up + 3 levels + social</td>
                    <td className="py-4 px-4 font-semibold">From £10</td>
                    <td className="py-4 px-4"><a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="text-peach font-heading font-semibold text-xs hover:underline">Book →</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-primary-foreground/50 text-sm mt-6 font-heading">🔥 Monthly Latin Friday — 2nd Friday of every month, Drayton Court Ealing</p>
            <div className="text-center mt-4">
              <Link to="/events" className="text-primary font-heading text-sm font-semibold hover:opacity-80 inline-flex items-center gap-1">See All Events <ChevronRight size={14} /></Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 6 — WHAT IS SALSA? WHAT IS BACHATA? */}
      <section className="section-padding section-warm">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">The Dances</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">What Will You Learn?</h2>
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" staggerDelay={0.2}>
            <StaggerItem>
              <div className="bg-charcoal rounded-2xl p-8 h-full border border-primary/15">
                <Music size={24} className="text-primary mb-3" />
                <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Salsa On1</h3>
                <p className="text-primary-foreground/50 text-sm mb-4 italic">From Cuba via New York to your local dance floor</p>
                <ul className="space-y-2 text-sm text-primary-foreground/70 mb-6">
                  <li>✅ High-energy partner dance with intricate footwork</li>
                  <li>✅ Builds confidence, coordination & musicality</li>
                  <li>✅ The ultimate social dance — dance with anyone, anywhere</li>
                </ul>
                <Link to="/blog/what-is-salsa" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Read the Full Guide <ChevronRight size={12} /></Link>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-charcoal rounded-2xl p-8 h-full border border-peach/15">
                <Heart size={24} className="text-peach mb-3" />
                <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Bachata</h3>
                <p className="text-primary-foreground/50 text-sm mb-4 italic">The Dominican Republic's most romantic dance</p>
                <ul className="space-y-2 text-sm text-primary-foreground/70 mb-6">
                  <li>✅ Sensual, expressive, and deeply musical</li>
                  <li>✅ Body movement, waves, and partner connection</li>
                  <li>✅ One of the fastest-growing social dances worldwide</li>
                </ul>
                <Link to="/blog/what-is-bachata" className="text-peach font-heading text-sm font-semibold inline-flex items-center gap-1">Read the Full Guide <ChevronRight size={12} /></Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 7 — MEET MELITTA */}
      <section className="section-padding section-ivory">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <FadeInUp delay={0.1}>
              <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-3">YOUR INSTRUCTOR</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Melitta Siomos — Award-Winning Dance Instructor & Performer</h2>
              <div className="h-1 w-16 rounded-full mb-6" style={{ background: 'var(--gradient-gold)' }} />
              <p className="text-muted-foreground leading-relaxed mb-4">With over 15 years of professional teaching and performance experience across Europe and beyond, Melitta Siomos is one of West London's most respected and beloved Latin dance instructors.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">She founded Pura Nights to create exactly the kind of dance community she wished had existed when she started — welcoming, technically rigorous, and built around real connection. Today it's home to hundreds of students at all levels, 8 instructors, and 7 Pura Ladies teams across 4 countries.</p>
              <p className="text-muted-foreground leading-relaxed mb-6">Whether you're stepping onto a dance floor for the first time or preparing for your wedding day, Melitta brings the same commitment: to help you dance with confidence, joy, and your own authentic style.</p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[{ v: "15+", l: "Years" }, { v: "500+", l: "Students" }, { v: "7", l: "Teams" }, { v: "5.0 ⭐", l: "Rating" }].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-display text-lg font-bold text-primary">{s.v}</p>
                    <p className="text-[10px] font-accent uppercase tracking-wider text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="text-primary font-heading font-semibold text-sm hover:opacity-80 inline-flex items-center gap-1">Meet Melitta <ChevronRight size={14} /></Link>
            </FadeInUp>
            <ScaleIn>
              <img src={melittaImg} alt="Melitta Siomos award-winning salsa and bachata instructor London" className="rounded-2xl w-full max-w-md mx-auto" width={800} height={1000} loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* SECTION 8 — TESTIMONIALS CAROUSEL */}
      <section className="section-padding section-ivory-alt">
        <div className="container-main">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">What Our Students Say</h2>
            <p className="text-muted-foreground text-center text-sm mb-12 font-heading max-w-xl mx-auto">Rated 5.0 on Google · Verified Student Reviews</p>
          </FadeInUp>
          <TestimonialsCarousel />
          <FadeInUp delay={0.3} className="text-center mt-8">
            <Link to="/testimonials" className="text-primary font-heading text-sm font-semibold hover:opacity-80 inline-flex items-center gap-1">Read All Reviews <ChevronRight size={14} /></Link>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 9 — PRICING OVERVIEW */}
      <section className="section-padding section-warm">
        <div className="container-main">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Simple, Flexible Pricing</h2>
            <p className="text-muted-foreground text-center text-sm mb-12 font-heading max-w-xl mx-auto">Drop in for your first class or commit to a bundle and save</p>
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" staggerDelay={0.12}>
            {[
              { title: "DROP IN", price: "From £10", desc: "No commitment, no booking", fit: "First timers, occasional dancers", border: "border-border" },
              { title: "5-CLASS BUNDLE", price: "From £42", desc: "Save up to £8 vs drop-in", fit: "Finding your rhythm (5 weeks)", border: "border-primary", badge: "MOST POPULAR" },
              { title: "10-CLASS BUNDLE", price: "From £78", desc: "Save up to £22", fit: "Committed learners", border: "border-border" },
            ].map((p, i) => (
              <StaggerItem key={i}>
                <div className={`bg-card rounded-2xl p-8 card-hover h-full border-2 ${p.border} relative`}>
                  {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-heading font-bold px-4 py-1 rounded-full">{p.badge}</span>}
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-2">{p.title}</h3>
                  <p className="font-display text-2xl font-bold text-primary mb-2">{p.price}</p>
                  <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                  <p className="text-muted-foreground text-xs italic">Perfect for: {p.fit}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInUp delay={0.3} className="text-center mt-8">
            <Link to="/prices" className="text-primary font-heading text-sm font-semibold hover:opacity-80 inline-flex items-center gap-1">See Full Pricing <ChevronRight size={14} /></Link>
            <p className="text-muted-foreground text-xs mt-2">Prices vary slightly by venue — see full breakdown on pricing page.</p>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 10 — WEDDING DANCE TEASER */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-4xl text-center">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Planning Your Wedding First Dance?</h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8 leading-relaxed">Melitta has choreographed dozens of unforgettable first dances — from simple and heartfelt to show-stopping and theatrical. Whatever your vision, she'll make it happen.</p>
            <blockquote className="border-l-4 border-primary pl-6 text-left max-w-xl mx-auto mb-8">
              <p className="text-primary-foreground/80 italic leading-relaxed">"Melitta choreographed our wedding dance. Our guests loved our performance and we will never forget that moment."</p>
              <cite className="text-primary text-sm font-heading not-italic mt-2 block">— Sofia & Patrizio, Wedding 2022</cite>
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/wedding-dance" className="btn-cta-primary text-sm">Explore Wedding Dance →</Link>
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20love%20to%20enquire%20about%20Wedding%20Dance%20coaching" target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm">WhatsApp for Free Consultation</a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 11 — BLOG PREVIEW */}
      <section className="section-padding section-warm">
        <div className="container-main">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Learn Something New</h2>
            <p className="text-muted-foreground text-center text-sm mb-10 font-heading">Guides, tips, and stories from the Pura Nights dancefloor</p>
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.12}>
            {[
              { cat: "Guide", slug: "/blog/what-is-salsa", title: "What Is Salsa? A Complete Guide", excerpt: "From Cuba to New York to your local dance floor — everything you need to know about Salsa On1." },
              { cat: "Guide", slug: "/blog/what-is-bachata", title: "What Is Bachata? History, Styles & How to Start", excerpt: "The Dominican Republic's most romantic dance — Traditional, Moderna, and Sensual explained." },
              { cat: "Comparison", slug: "/blog/salsa-vs-bachata", title: "Salsa vs Bachata — Which Should You Learn First?", excerpt: "Two dances, two vibes. Here's how to decide which one suits you best." },
            ].map((post, i) => (
              <StaggerItem key={i}>
                <Link to={post.slug} className="block bg-card rounded-2xl overflow-hidden card-hover h-full">
                  <div className="h-40 bg-charcoal-light flex items-center justify-center">
                    <p className="text-primary-foreground/20 text-xs font-heading">[Article image]</p>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-accent uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">{post.cat}</span>
                    <h3 className="font-heading font-bold mt-3 mb-2 text-sm">{post.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">{post.excerpt}</p>
                    <span className="text-primary text-xs font-heading font-semibold">Read →</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInUp delay={0.3} className="text-center mt-8">
            <Link to="/blog" className="text-primary font-heading text-sm font-semibold hover:opacity-80 inline-flex items-center gap-1">Browse All Articles <ChevronRight size={14} /></Link>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 12 — GIFT VOUCHERS STRIP */}
      <section className="py-12" style={{ background: 'var(--gradient-gold)' }}>
        <div className="container-main text-center">
          <h3 className="font-display text-2xl font-bold text-charcoal mb-2">🎁 Give the Gift of Dance</h3>
          <p className="text-charcoal/70 text-sm font-heading mb-6 max-w-lg mx-auto">Gift vouchers from £25 — perfect for birthdays, Valentine's, hen parties, or any occasion worth celebrating.</p>
          <Link to="/gift-vouchers" className="btn-cta-dark text-sm">Buy a Gift Voucher →</Link>
        </div>
      </section>

      {/* SECTION 13 — INSTAGRAM FEED PLACEHOLDER */}
      {/* <!-- WIX: Replace with Wix Instagram Feed app --> */}
      <section className="section-padding section-dark">
        <div className="container-main">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-3">Follow the Journey</h2>
            <p className="text-primary-foreground/50 text-center text-sm mb-10 font-heading">@puranights.salsabachata · @melittasiomos · @puraladies</p>
          </FadeInUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Monday Chiswick vibes 🔥",
              "Pura Ladies in action 💃",
              "Bachata sensual styling ✨",
              "Latin Friday dancefloor 🎶",
              "Beginners first class 🌟",
              "Wedding dance magic 💑",
            ].map((caption, i) => (
              <div key={i} className="aspect-square bg-charcoal-light rounded-2xl flex flex-col items-center justify-center gap-2 border border-primary-foreground/5">
                <Instagram size={24} className="text-primary-foreground/20" />
                <p className="text-primary-foreground/30 text-xs font-heading text-center px-4">{caption}</p>
              </div>
            ))}
          </div>
          <FadeInUp delay={0.2} className="text-center mt-8">
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="text-primary font-heading text-sm font-semibold hover:opacity-80 inline-flex items-center gap-1">Follow on Instagram <ChevronRight size={14} /></a>
          </FadeInUp>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
        <div className="container-main">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">Ready to Start Dancing?</h2>
          <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">All levels welcome. No partner needed. Just turn up and let the music move you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your First Class</a>
            <Link to="/prices" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm">View All Pricing</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
