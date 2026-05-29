import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Users, GraduationCap, Heart, Clock, MapPin, ArrowDown, Gift, ChevronRight, Award, Sparkles, Music, Instagram, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-dance.jpg";
import melittaImg from "@/assets/melitta-editorial-real.jpg";
import weddingImg from "@/assets/wedding-dance.jpg";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import socialImg from "@/assets/social-dancing.jpg";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ReviewVelocityTicker from "@/components/ReviewVelocityTicker";
import { REVIEW_VELOCITY_SNIPPETS } from "@/data/review-velocity";
import WixReviewsEmbed from "@/components/WixReviewsEmbed";
import RealProofSlot from "@/components/RealProofSlot";
import LastUpdated from "@/components/LastUpdated";
import LiveStudentCounter from "@/components/LiveStudentCounter";
import SocialProofBar from "@/components/SocialProofBar";
import NewHereStrip from "@/components/NewHereStrip";
import YouTubeStrip from "@/components/YouTubeStrip";
import CorporateCTA from "@/components/CorporateCTA";
import PartnerCTA from "@/components/PartnerCTA";
import AnswerBox from "@/components/AnswerBox";
import GoldDivider from "@/components/GoldDivider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const homeFaqs = [
  { q: "Do I need a partner to join?", a: "No — we rotate partners throughout every class. Many of our students come solo." },
  { q: "I've never danced before. Can I join?", a: "Yes! Our Beginners class starts from zero every week. No experience needed." },
  { q: "How much does it cost?", a: "From £5 (social only) or £10 per class. Bundles start at £42 for 5 classes." },
  { q: "Where are the classes?", a: "Monday: The George IV, Chiswick (W4 2DR). Tuesday: Drayton Court Hotel, Ealing (W13 8PH)." },
  { q: "Do I need to book?", a: "No booking required for weekly classes — just turn up on the night." },
  { q: "What should I wear?", a: "Comfortable clothing and flat-soled shoes. Avoid thick running shoes." },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* <!-- WIX PAGE: Homepage / -->
   <!-- WIX SECTION: Hero — Full-width Strip with cinematic image/video background + dark overlay -->
   <!-- WIX SECTION: Trust Ticker — use Wix marquee/ticker strip -->
   <!-- WIX SECTION: Next Class Countdown — custom code or countdown widget -->
   <!-- WIX SECTION: 4 Brand Pillars — use Card grid (Nights, Ladies, Wedding, Online) -->
   <!-- WIX SECTION: Weekly Schedule Table — use Table or styled Repeater -->
   <!-- WIX SECTION: Salsa vs Bachata — use 2-column Strip -->
   <!-- WIX SECTION: Meet Melitta — use Strip with image + text -->
   <!-- WIX SECTION: Social Vibe — use Strip with icons/cards -->
   <!-- WIX SECTION: Testimonials Carousel — use Wix Slider connected to Testimonials collection -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid -->
   <!-- WIX SECTION: Wedding Dance Teaser — use Strip with CTA -->
   <!-- WIX SECTION: Blog Preview — use Repeater connected to Blog collection (3 featured) -->
   <!-- WIX SECTION: Gift Vouchers Strip — use CTA Strip -->
   <!-- WIX SECTION: Instagram Grid — use Wix Instagram Feed widget -->
*/
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
        dateModified="2026-04-13"
      />

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[78vh] md:min-h-[80vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden">
        {/* <!-- WIX: Replace with Wix Video Background or Hero Media. Focal point upper-third to keep dancers' faces visible. --> */}
        <img src={heroImage} alt="Pura Nights salsa and bachata social dancing in London" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" width={1920} height={1080} fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-accent text-xs tracking-[0.3em] uppercase text-primary mb-6">
            SALSA & BACHATA · WEST / SOUTH WEST LONDON · ALL LEVELS WELCOME
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            Dance Like You Mean It
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }} className="font-heading text-base md:text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-light">
            West London's most vibrant Salsa & Bachata community. Weekly classes in Chiswick & Ealing — no partner, no experience needed.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Your First Class — From £10 →</a>
            <Link to="/schedule" className="btn-cta-ghost text-sm">See Class Schedule →</Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-4 text-[11px] tracking-wide text-primary-foreground/70 font-accent">
            Instant ticket confirmation · Free to switch venues · No partner required
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mt-8 flex justify-center">
            <LiveStudentCounter target={500} label="dancers in West London" />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle text-primary/60">
          <ArrowDown size={28} />
        </motion.div>
      </section>

      {/* SECTION 1B — NEW HERE? CONVERSION STRIP */}
      <NewHereStrip />

      {/* SECTION 2 — 3 BENEFIT PILLARS */}
      <section className="py-10 section-warm border-b border-border">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {[
              { icon: Award, title: "Award-Winning Instruction", desc: "International award-winning instructor with 15+ years experience across Europe" },
              { icon: Clock, title: "Flexible Weekly Classes", desc: "Monday Chiswick & Tuesday Ealing — drop in anytime, no booking needed" },
              { icon: Heart, title: "Welcoming Community", desc: "500+ students, all levels welcome, no partner needed — come as you are" },
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
                <b.icon size={28} className="text-primary mb-3" />
                <h3 className="font-heading font-bold text-sm mb-1">{b.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — ANIMATED SOCIAL PROOF BAR */}
      <SocialProofBar />

      {/* SECTION 4 — NEXT CLASS COUNTDOWN */}
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
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Now →</a>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 4 — 4 BRAND PILLARS */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">Our Brands</h2>
            <p className="text-muted-foreground text-center text-base mb-14 font-heading max-w-2xl mx-auto">Four interconnected dance brands — one community, one founder, one standard of teaching.</p>
          </FadeInUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7" staggerDelay={0.12}>
            {[
              { img: socialImg, emoji: "🎶", title: "PURA NIGHTS", sub: "Weekly Classes", desc: "Salsa & Bachata every Monday & Tuesday. 3 levels. All welcome.", link: "/pura-nights", cta: "Find Out More →" },
              { img: puraLadiesImg, emoji: "👗", title: "PURA LADIES", sub: "Performance Team", desc: "7 international teams. London, Plymouth, Munich, Lisbon.", link: "/pura-ladies", cta: "Join Pura Ladies →" },
              { img: weddingImg, emoji: "💑", title: "WEDDING DANCE", sub: "First Dance Specialists", desc: "Melitta has choreographed dozens of unforgettable first dances.", link: "/wedding-dance", cta: "Book a Consultation →" },
              { img: melittaImg, emoji: "💻", title: "ONLINE CLASSES", sub: "Dance From Home", desc: "Live Zoom classes + HD drill videos. Learn at your own pace.", link: "/online-salsa-bachata-coaching", cta: "Explore Online →" },
            ].map((card, i) => (
              <StaggerItem key={i}>
                <Link to={card.link} className="relative group block rounded-2xl overflow-hidden h-[420px] card-hover">
                  <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-3xl mb-2">{card.emoji}</p>
                    <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">{card.title}</h3>
                    <p className="text-primary text-[11px] font-accent uppercase tracking-wider mb-3">{card.sub}</p>
                    <p className="text-primary-foreground/75 text-sm leading-relaxed mb-4">{card.desc}</p>
                    <span className="text-primary font-heading text-sm font-semibold">{card.cta}</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 4B — HOMEPAGE TESTIMONIALS */}
      {/* <!-- WIX SECTION: Student Testimonials — Repeater connected to Testimonials collection, 6 items --> */}
      <section className="section-padding bg-charcoal-light">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">What Students Say</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary-foreground mb-4">Real people. Real results.</h2>
            <p className="text-primary-foreground/60 text-center text-base mb-14 font-heading max-w-2xl mx-auto">No partner needed. No experience needed. Just show up.</p>
          </FadeInUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {[
              { q: "I came alone on a Monday night not knowing a single step. By the end I'd danced with 20 different people and already booked the following week.", n: "Sarah T., Chiswick" },
              { q: "Melitta has a gift for making complete beginners feel totally at home. I've tried other schools and nothing compares to the energy at Pura Nights.", n: "James K., Ealing" },
              { q: "Three months in and I'm addicted. The Latin Friday socials are the highlight of my month. Best decision I made this year.", n: "Priya M., Richmond" },
              { q: "My wife and I came for our wedding choreography. Melitta completely transformed how we move together. The first dance got a standing ovation.", n: "Tom & Claire H., Kingston" },
              { q: "I've been dancing for 2 years at Pura Nights and the community here is genuinely unlike anything else in London. It's become my second family.", n: "Amara O., Hammersmith" },
              { q: "Came for the fitness, stayed for the dancing. I've lost weight, gained confidence, and made real friends. Can't recommend it enough.", n: "Daniel R., Chiswick" },
            ].map((t, i) => (
              <StaggerItem key={i}>
                <figure className="h-full bg-charcoal rounded-2xl p-6 border-l-[3px] border-primary border-y border-r border-primary-foreground/5 lift-hover">
                  <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-primary text-primary" />)}
                  </div>
                  <blockquote className="text-primary-foreground/85 text-[15px] leading-relaxed italic font-heading mb-4">"{t.q}"</blockquote>
                  <figcaption className="text-primary-foreground/50 text-xs font-heading not-italic">— {t.n}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInUp delay={0.2} className="text-center mt-10">
            <p className="text-primary-foreground/50 text-xs font-heading mb-2">Rated 5.0 on Google · 500+ students taught · West &amp; South West London</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <a href="https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London" target="_blank" rel="noopener noreferrer" className="text-primary text-xs font-heading font-semibold hover:underline">See our Google reviews →</a>
              <span className="text-primary-foreground/20 text-xs">·</span>
              <Link to="/testimonials" className="text-primary-foreground/70 text-xs font-heading font-semibold hover:text-primary">Read more student stories →</Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 4C — GIFT VOUCHER STRIP */}
      {/* <!-- WIX SECTION: Gift Voucher Promo Strip — Full-width gold Strip with 2 columns --> */}
      <section style={{ background: 'var(--gradient-gold)' }}>
        <div className="container-main py-5 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="text-charcoal">
              <p className="font-display text-xl md:text-2xl font-bold leading-tight">🎁 Give the gift of dance</p>
              <p className="font-heading text-xs md:text-sm opacity-80">Digital gift vouchers from £25 — for birthdays, anniversaries &amp; first dances.</p>
            </div>
            <Link to="/gift-vouchers" className="inline-flex items-center gap-2 bg-charcoal text-primary px-6 py-3 rounded-lg font-heading font-semibold text-sm hover:bg-charcoal-light transition-colors whitespace-nowrap">
              Buy a Gift Voucher →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WEEKLY CLASS SCHEDULE TABLE */}
      <section className="section-padding section-dark">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Every Week</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary-foreground mb-4">Join Us This Week</h2>
            <p className="text-primary-foreground/60 text-center text-base mb-12 font-heading max-w-2xl mx-auto">No booking required for weekly classes — just turn up on the night.</p>
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
                    <td className="py-4 px-4"><a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="text-primary font-heading font-semibold text-xs hover:underline">Book →</a></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-heading font-bold text-peach">Tuesday</td>
                    <td className="py-4 px-4">Drayton Court, Ealing</td>
                    <td className="py-4 px-4">6:50–11pm</td>
                    <td className="py-4 px-4">Free styling warm-up + 3 levels + social</td>
                    <td className="py-4 px-4 font-semibold">From £10</td>
                    <td className="py-4 px-4"><a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="text-peach font-heading font-semibold text-xs hover:underline">Book →</a></td>
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

      {/* SECTION 5.5 — CHOOSE YOUR PATH (Block 2) */}
      {/* <!-- WIX SECTION: Choose Your Path — 6-card Repeater linking to the main money pages --> */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Where do you want to start?</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">Choose Your Path</h2>
            <p className="text-muted-foreground text-center text-base md:text-lg font-heading max-w-2xl mx-auto mb-12">
              Six ways into Pura Nights — pick the one that matches what you actually want from a Tuesday evening.
            </p>
          </FadeInUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {[
              { to: "/start-here", title: "I'm brand new", desc: "Beginners walk-in guide — what to wear, what to expect, where to stand.", tag: "Start Here" },
              { to: "/pura-nights", title: "Weekly classes", desc: "Mon Chiswick · Tue Ealing — drop-in, no partner, no booking.", tag: "Weekly" },
              { to: "/events", title: "Latin Friday", desc: "Monthly social with DJs, a class warm-up and an open dancefloor.", tag: "Events" },
              { to: "/wedding-dance-london", title: "Wedding dance", desc: "First-dance choreography that looks effortless on the day.", tag: "Wedding" },
              { to: "/corporate-dance-classes-london", title: "Corporate / team", desc: "Team building that gets people laughing and connecting.", tag: "Corporate" },
              { to: "/private-group-dance-parties-london", title: "Hen / private group", desc: "Birthdays, hens and private group parties with a real dance class.", tag: "Group" },
            ].map((card) => (
              <StaggerItem key={card.to}>
                <Link to={card.to} className="group block bg-card rounded-2xl p-6 h-full border border-border hover:border-primary/40 transition-all hover:shadow-lg">
                  <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">{card.tag}</p>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.desc}</p>
                  <span className="text-primary font-heading text-xs font-semibold inline-flex items-center gap-1">Open this path <ChevronRight size={12} /></span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 5.6 — WHY PURA NIGHTS BEATS A NORMAL NIGHT OUT (Block 2) */}
      {/* <!-- WIX SECTION: Why Pura Nights — 2-column Strip with comparison list --> */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-5xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">A Better Tuesday</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary-foreground mb-4">Why Pura Nights Beats a Normal Night Out</h2>
            <p className="text-primary-foreground/65 text-center text-base font-heading max-w-2xl mx-auto mb-12">
              Same evening. Same budget. Very different way to spend it.
            </p>
          </FadeInUp>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeInUp>
              <div className="bg-charcoal-light/40 rounded-2xl p-7 border border-primary-foreground/10 h-full">
                <h3 className="font-display text-2xl font-bold text-primary-foreground/90 mb-4">A normal night out</h3>
                <ul className="space-y-2.5 text-primary-foreground/60 text-sm font-heading">
                  <li>· £40+ on drinks before you've spoken to anyone</li>
                  <li>· Loud music, awkward small talk, phone scrolling</li>
                  <li>· Same five friends or no-one new at all</li>
                  <li>· Hangover Wednesday, nothing to show for it</li>
                </ul>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <div className="bg-primary/10 rounded-2xl p-7 border border-primary/30 h-full">
                <h3 className="font-display text-2xl font-bold text-primary mb-4">A Pura Night</h3>
                <ul className="space-y-2.5 text-primary-foreground/85 text-sm font-heading">
                  <li>✓ From £10 — class, social and a real skill that compounds</li>
                  <li>✓ Built-in partner rotation — meet 20+ people in 90 minutes</li>
                  <li>✓ Walk in solo, leave with a dance crew</li>
                  <li>✓ Wake up Wednesday lighter, sharper, looking forward to next week</li>
                </ul>
              </div>
            </FadeInUp>
          </div>
          <FadeInUp delay={0.2} className="text-center mt-10">
            <Link to="/start-here" className="btn-cta-primary text-sm">Plan your first night →</Link>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 6 — WHAT IS SALSA? WHAT IS BACHATA? */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">The Dances</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-14">What Will You Learn?</h2>
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
                <Link to="/learn/salsa-vs-bachata" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Read the Full Guide <ChevronRight size={12} /></Link>
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
                <Link to="/learn/salsa-vs-bachata" className="text-peach font-heading text-sm font-semibold inline-flex items-center gap-1">Read the Full Guide <ChevronRight size={12} /></Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
          <FadeInUp delay={0.4} className="text-center mt-8">
            <Link to="/learn/salsa-vs-bachata" className="text-primary font-heading text-sm font-semibold hover:underline inline-flex items-center gap-1">Not sure which to start with? <ChevronRight size={14} /></Link>
          </FadeInUp>
        </div>
      </section>

      <div className="section-ivory"><GoldDivider variant="hairline" /></div>

      {/* SECTION 7 — MEET MELITTA */}
      <section className="section-padding section-ivory pt-12 md:pt-16">

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

      <div className="section-ivory-alt"><GoldDivider variant="hairline" /></div>

      {/* SECTION 8 — TESTIMONIALS CAROUSEL */}
      <section className="section-padding section-ivory-alt pt-12 md:pt-16">

        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Real Words. Real Reviews.</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground text-center text-base mb-14 font-heading max-w-xl mx-auto">Rated 5.0 on Google · Verified student reviews from Chiswick & Ealing.</p>
          </FadeInUp>
          <TestimonialsCarousel />
          <ReviewVelocityTicker recentCount={14} snippets={REVIEW_VELOCITY_SNIPPETS} />
          <FadeInUp delay={0.3} className="text-center mt-10">
            <Link to="/testimonials" className="text-primary font-heading text-sm font-semibold hover:opacity-80 inline-flex items-center gap-1">Read All Reviews <ChevronRight size={14} /></Link>
          </FadeInUp>

          {/* Optional visual proof layer — Wix Google Reviews embed on launch */}
          <div className="mt-12 -mx-4 md:-mx-8">
            <WixReviewsEmbed showCta={false} title="Verified on Google" eyebrow="Live Google Reviews" />
          </div>


          {/* Real-proof visual slot — Google review screenshot */}
          <FadeInUp delay={0.4} className="max-w-md mx-auto mt-12">
            <RealProofSlot
              variant="review"
              purpose="Google 5★ Review Screenshot"
              replacementLabel="Image to add · caption + reviewer name are final"
              idealSubject="Crisp screenshot of a recent 5-star Google review for Pura Nights — name visible, full quote, star row, with the GBP header crop intact."
              cropRatio="4:5"
              altText="5-star Google review for Pura Nights salsa and bachata classes in London"
              caption={`★★★★★ — "Walked in alone, walked out with 20 new friends. Melitta makes it impossible to feel awkward." — Sarah J., started March 2024 (5.0 average across 4 brands · verified Google reviews)`}
            />
          </FadeInUp>
        </div>
      </section>

      {/* SOCIAL VIBE SECTION */}
      {/* <!-- WIX: Strip + Repeater grid --> */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">More Than Steps</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">Why People Keep Coming Back</h2>
            <p className="text-muted-foreground text-center text-base mb-14 font-heading max-w-2xl mx-auto">It's not just a class — it's a mood reset, a social life upgrade, and the best midweek plan you'll ever make.</p>
          </FadeInUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5" staggerDelay={0.08}>
            {[
              { emoji: "🤝", title: "Make Real Friends", desc: "Not small talk — real friendships that extend beyond the dance floor." },
              { emoji: "✨", title: "Feel Good After Work", desc: "Music, movement, and laughter — better than any gym session." },
              { emoji: "💃", title: "Build Confidence", desc: "Every class leaves you standing taller and smiling wider." },
              { emoji: "🎉", title: "Be Part of Something", desc: "A vibrant, stylish community that genuinely cares." },
              { emoji: "🌍", title: "All Are Welcome", desc: "Every age, background, and ability. Come alone or with friends." },
            ].map((v, i) => (
              <StaggerItem key={i}>
                <div className="bg-card rounded-2xl p-7 text-center card-hover h-full">
                  <span className="text-3xl block mb-4">{v.emoji}</span>
                  <h3 className="font-heading font-bold text-base mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInUp delay={0.3} className="text-center mt-10">
            <Link to="/community" className="text-primary font-heading text-sm font-semibold hover:opacity-80 inline-flex items-center gap-1">Explore the Community <ChevronRight size={14} /></Link>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 9 — PRICING OVERVIEW */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">Simple, Flexible Pricing</h2>
            <p className="text-muted-foreground text-center text-base mb-14 font-heading max-w-2xl mx-auto">Drop in for your first class or commit to a bundle and save — no hidden fees, no contracts.</p>
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-7 max-w-5xl mx-auto" staggerDelay={0.12}>
            {[
              { title: "DROP IN", price: "From £10", desc: "No commitment, no booking", fit: "First timers, occasional dancers", border: "border-border" },
              { title: "5-CLASS BUNDLE", price: "From £42", desc: "Save up to £8 vs drop-in", fit: "Finding your rhythm (5 weeks)", border: "border-primary", badge: "MOST POPULAR" },
              { title: "10-CLASS BUNDLE", price: "From £78", desc: "Save up to £22", fit: "Committed learners", border: "border-border" },
            ].map((p, i) => (
              <StaggerItem key={i}>
                <div className={`bg-card rounded-2xl p-10 card-hover h-full border-2 ${p.border} relative`}>
                  {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-heading font-bold px-4 py-1 rounded-full">{p.badge}</span>}
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-3">{p.title}</h3>
                  <p className="font-display text-4xl font-bold text-primary mb-3">{p.price}</p>
                  <p className="text-muted-foreground text-base mb-5">{p.desc}</p>
                  <p className="text-muted-foreground text-sm italic">Perfect for: {p.fit}</p>
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
        <div className="container-main max-w-5xl text-center">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">Wedding Dance Made Easy</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">Planning Your Wedding First Dance?</h2>
            <p className="text-primary-foreground/75 text-base md:text-lg max-w-3xl mx-auto mb-12 leading-relaxed font-heading">Melitta has choreographed dozens of unforgettable first dances — from simple and heartfelt to show-stopping and theatrical. Whatever your vision, she'll make it happen.</p>
            <blockquote className="border-l-4 border-primary pl-8 text-left max-w-2xl mx-auto mb-12">
              <p className="text-primary-foreground/85 italic leading-relaxed text-lg md:text-xl font-display">"Melitta choreographed our wedding dance. Our guests loved our performance and we will never forget that moment."</p>
              <cite className="text-primary text-sm font-heading not-italic mt-3 block tracking-wide">— Sofia & Patrizio, Wedding 2022</cite>
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/wedding-dance" className="btn-cta-primary text-sm">Explore Wedding Dance →</Link>
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20love%20to%20enquire%20about%20Wedding%20Dance%20coaching" target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm">WhatsApp for Free Consultation</a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Commercial callout strip 1 — Corporate */}
      <section className="py-8 bg-primary/10 border-y border-primary/20">
        <div className="container-main max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-heading font-bold text-sm md:text-base">Planning a team social or office event?</p>
            <p className="text-xs text-muted-foreground mt-0.5">Beginner-friendly Salsa &amp; Bachata sessions — at your office or one of our venues.</p>
          </div>
          <Link to="/corporate-dance-classes-london" className="btn-cta-primary text-xs whitespace-nowrap">Enquire about corporate →</Link>
        </div>
      </section>

      {/* SECTION 11 — BLOG PREVIEW */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Read · Watch · Learn</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">Learn Something New</h2>
            <p className="text-muted-foreground text-center text-base mb-14 font-heading max-w-2xl mx-auto">Guides, tips, and stories from the Pura Nights dancefloor — written by Melitta and the team.</p>
          </FadeInUp>

          {/* Featured Pillar Guide Card */}
          <FadeInUp>
            <Link
              to="/learn/salsa-bachata-guide"
              className="block max-w-5xl mx-auto mb-10 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-primary-foreground card-hover group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                <div>
                  <span className="inline-block text-[10px] font-accent tracking-[0.25em] uppercase bg-primary-foreground/15 px-3 py-1 rounded-full mb-3">⭐ Featured Pillar Guide · 2,000+ words</span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 leading-tight">The Complete West London Guide to Salsa & Bachata</h3>
                  <p className="text-primary-foreground/85 font-heading text-sm md:text-base max-w-2xl">Styles, music, classes, venues, pricing, etiquette and FAQs — everything you need before your first class, in one in-depth guide.</p>
                </div>
                <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm shrink-0 group-hover:translate-x-1 transition-transform">Read the Guide <ChevronRight size={16} /></span>
              </div>
            </Link>
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

      {/* Commercial callout strip 2 — Hen/Birthday groups */}
      <section className="py-8 bg-secondary/10 border-y border-secondary/20">
        <div className="container-main max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-heading font-bold text-sm md:text-base">Hosting a hen party or birthday?</p>
            <p className="text-xs text-muted-foreground mt-0.5">Private Latin dance sessions for friends, family and celebrations — fun, no cringe.</p>
          </div>
          <Link to="/private-group-dance-parties-london" className="btn-cta-primary text-xs whitespace-nowrap">Book a private group →</Link>
        </div>
      </section>

      {/* SECTION 12 — PROOF CENTRE TEASER */}
      <section className="py-10 bg-card border-y border-border">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">Trusted & Verified</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">Find Our Brands on Google</h2>
            <p className="text-muted-foreground text-center text-xs mb-8 font-heading">4 brands · All 5-star rated · Verified on Google</p>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto" staggerDelay={0.1}>
            {[
              { name: "Pura Nights", sub: "Weekly Classes", url: "https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London", emoji: "🎶" },
              { name: "Wedding Dance Made Easy", sub: "First Dance Coaching", url: "https://maps.google.com/?q=Wedding+Dance+Made+Easy+Melitta+Siomos+London", emoji: "💑" },
              { name: "Pura Ladies", sub: "Performance Company", url: "https://maps.google.com/?q=Pura+Ladies+Dance+Company+London", emoji: "👗" },
              { name: "Melitta Siomos", sub: "Dance Academy", url: "https://maps.google.com/?q=Melitta+Siomos+Dance+Academy+London", emoji: "🏆" },
            ].map((brand, i) => (
              <StaggerItem key={i}>
                <a href={brand.url} target="_blank" rel="noopener noreferrer" className="bg-background rounded-2xl p-5 card-hover text-center block h-full group">
                  <span className="text-2xl block mb-2">{brand.emoji}</span>
                  <h3 className="font-heading font-bold text-sm mb-0.5 group-hover:text-primary transition-colors">{brand.name}</h3>
                  <p className="text-muted-foreground text-[10px] font-heading mb-2">{brand.sub}</p>
                  <div className="flex justify-center gap-0.5 mb-1.5">
                    {[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-primary text-primary" />)}
                  </div>
                  <span className="text-primary text-[10px] font-heading font-semibold inline-flex items-center gap-0.5">View on Google <ExternalLink size={8} /></span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInUp delay={0.2} className="text-center mt-6">
            <Link to="/testimonials" className="text-primary font-heading text-sm font-semibold hover:opacity-80 inline-flex items-center gap-1">See All Reviews & Awards <ChevronRight size={14} /></Link>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 12.5 — PURA ACADEMY + REFERRAL DUAL STRIP (v8.0) */}
      <section className="section-padding bg-charcoal text-primary-foreground">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <FadeInUp>
              <Link to="/online-academy" className="group relative block rounded-2xl overflow-hidden p-8 h-full border border-primary/30 hover:border-primary transition-all" style={{ background: "linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 14%))" }}>
                <div className="absolute top-0 right-0 w-40 h-40 opacity-20 blur-3xl rounded-full" style={{ background: "var(--gradient-gold)" }} />
                <span className="relative inline-block px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-heading font-bold tracking-wider uppercase mb-4">✨ NEW · SOFT LAUNCH</span>
                <h3 className="relative font-display text-2xl md:text-3xl font-bold mb-3 text-primary-foreground">Pura Academy — Online Courses</h3>
                <p className="relative text-primary-foreground/70 text-sm mb-5 leading-relaxed">Pre-recorded HD Salsa & Bachata courses you can stream anywhere. Founding members lock in 30% off for life.</p>
                <span className="relative inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm group-hover:gap-3 transition-all">Explore the Academy →</span>
              </Link>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <Link to="/refer" className="group relative block rounded-2xl overflow-hidden p-8 h-full border border-peach/30 hover:border-peach transition-all" style={{ background: "linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 14%))" }}>
                <div className="absolute top-0 right-0 w-40 h-40 opacity-20 blur-3xl rounded-full bg-peach" />
                <span className="relative inline-block px-2.5 py-1 rounded-full bg-peach/20 text-peach text-[10px] font-heading font-bold tracking-wider uppercase mb-4">🎁 Pura Rewards</span>
                <h3 className="relative font-display text-2xl md:text-3xl font-bold mb-3 text-primary-foreground">Refer a Friend, Earn Rewards</h3>
                <p className="relative text-primary-foreground/70 text-sm mb-5 leading-relaxed">Friend dances free · You get £10 off · Refer 5+ and become a Pura Ambassador with free unlimited classes.</p>
                <span className="relative inline-flex items-center gap-2 text-peach font-heading font-semibold text-sm group-hover:gap-3 transition-all">Start Referring →</span>
              </Link>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* SECTION 12.5 — YOUTUBE LATEST UPLOADS */}
      {/* <!-- WIX: Replace with Wix YouTube Channel widget --> */}
      <YouTubeStrip />

      {/* SECTION 13 — GIFT VOUCHERS STRIP */}
      <section className="py-20 md:py-24" style={{ background: 'var(--gradient-gold)' }}>
        <div className="container-main max-w-4xl text-center">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-charcoal/70 mb-4">🎁 Pura Nights Gift Vouchers</p>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-5 leading-tight">Give the Gift of Dance</h3>
            <p className="text-charcoal/75 text-base md:text-lg font-heading mb-10 max-w-2xl mx-auto leading-relaxed">Vouchers from £25 to £200 — perfect for birthdays, Valentine's, hen parties, anniversaries, or any occasion worth celebrating. Instant email delivery, no expiry pressure.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/gift-vouchers" className="btn-cta-dark text-sm">Buy a Gift Voucher →</Link>
              <span className="text-charcoal/60 text-xs font-heading">£25 · £50 · £75 · £100 · £150 · £200</span>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION 13 — INSTAGRAM FEED PLACEHOLDER */}
      {/* <!-- WIX: Replace with Wix Instagram Feed app --> */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Follow the Journey</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary-foreground mb-4">See It on Instagram</h2>
            <p className="text-primary-foreground/55 text-center text-base mb-12 font-heading max-w-xl mx-auto">@puranights.salsabachata · @melittasiomos · @puraladies · @wedding_dance_made_easy</p>
          </FadeInUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              "Monday Chiswick vibes 🔥",
              "Pura Ladies in action 💃",
              "Bachata sensual styling ✨",
              "Latin Friday dancefloor 🎶",
              "Beginners first class 🌟",
              "Wedding dance magic 💑",
            ].map((caption, i) => (
              <div key={i} className="aspect-square bg-charcoal-light rounded-2xl flex flex-col items-center justify-center gap-3 border border-primary-foreground/5 hover:border-primary/30 transition-colors">
                <Instagram size={28} className="text-primary-foreground/25" />
                <p className="text-primary-foreground/35 text-sm font-heading text-center px-4">{caption}</p>
              </div>
            ))}
          </div>
          <FadeInUp delay={0.2} className="text-center mt-12">
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary text-primary px-7 py-3.5 rounded-full text-sm font-heading font-semibold transition-all">
              <Instagram size={16} /> Follow on Instagram →
            </a>
          </FadeInUp>
        </div>
      </section>

      {/* SECTION — CORPORATE + PARTNER STRIPS (lower-fold, non-disruptive) */}
      {/* <!-- WIX SECTION: Corporate Strip — link to /corporate-dance-classes-london --> */}
      <CorporateCTA compact />
      {/* <!-- WIX SECTION: Partner Strip — link to /partner-with-pura-nights --> */}
      <PartnerCTA compact />

      {/* AI/GEO Answer Block — Block 2 */}
      {/* <!-- WIX SECTION: AnswerBox — H3 + paragraph + bullets + CTA --> */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-3xl">
          <AnswerBox
            question="What is Pura Nights and how do I join?"
            answer="Pura Nights is West London's friendliest weekly Salsa & Bachata night — Mondays at the George IV in Chiswick (W4) and Tuesdays at the Drayton Court in Ealing (W13). Doors 6:50 PM, classes split by level, open social to 11 PM. Drop-in, no partner needed, beginners welcome any week."
            bullets={[
              "Mon Chiswick (W4 2DR) · Tue Ealing (W13 8PH)",
              "From £5 social-only · £10 class + social · bundles from £42",
              "Bachata UK Champion Melitta Siomos teaches both nights",
              "Solo dancers welcome — partner rotation throughout class",
            ]}
            cta={{ label: "See this week's schedule", to: "/schedule" }}
            tone="warm"
          />
        </div>
      </section>

      <div className="section-warm"><GoldDivider variant="hairline" /></div>

      {/* SECTION — HOMEPAGE FAQ */}
      {/* <!-- WIX SECTION: FAQ Accordion — use Wix FAQ app or custom Accordions --> */}
      <section className="section-padding section-warm pt-12 md:pt-16">

        <div className="container-main max-w-3xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Before You Come</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-center text-base mb-12 font-heading">Quick answers for first-timers — partner, level, pricing, what to wear.</p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Accordion type="multiple" className="mb-8">
              {homeFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="font-heading font-semibold text-left text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center">
              <Link to="/faq" className="text-primary font-heading text-sm font-semibold hover:underline inline-flex items-center gap-1">See All 20+ FAQs <ChevronRight size={14} /></Link>
            </div>
          </FadeInUp>
          <LastUpdated date="2026-04-13" />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />

      {/* COMMUNITY CTA */}
      <section className="py-24 md:py-28 text-center" style={{ background: 'var(--gradient-gold)' }}>
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-charcoal/70 mb-5">Your Move</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">Ready to Start Dancing?</h2>
            <p className="text-charcoal/75 text-base md:text-lg mb-10 max-w-2xl mx-auto font-heading leading-relaxed">All levels welcome. No partner needed. Just turn up on Monday in Chiswick or Tuesday in Ealing — and let the music move you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your First Class</a>
              <Link to="/start-here" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm">New to Dance? Start Here →</Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
