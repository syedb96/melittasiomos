import { Link } from "react-router-dom";
import { Play, Clock, Award, Download, Smartphone, Users, CheckCircle2, Star, Lock } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import AnimatedCounter from "@/components/AnimatedCounter";
import GoldDivider from "@/components/GoldDivider";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

// v8.0 Online Academy — Soft launch landing page (Teachable-powered)
// === SETUP: Replace these two constants once Melitta's school is live ===
// 1) TEACHABLE_URL  — full URL to her Teachable subdomain (e.g. https://pura-academy.teachable.com)
// 2) PREVIEW_REEL_ID — YouTube video ID of the 60-sec unlisted teaser (the part after v=)
const TEACHABLE_URL = "https://melittasiomos.teachable.com";
const PREVIEW_REEL_ID = "dQw4w9WgXcQ"; // TODO: swap for Melitta's unlisted teaser video ID
const WAITLIST_MAILTO = "mailto:siomosmelitta@gmail.com?subject=Online%20Academy%20Waitlist&body=Hi%20Melitta%2C%20please%20add%20me%20to%20the%20Pura%20Academy%20early%20access%20waitlist.";

const courses = [
  {
    badge: "FOUNDATIONS",
    title: "Salsa On2 — Absolute Beginner",
    duration: "12 lessons · 3 hours",
    level: "Beginner",
    desc: "Master the basic step, cross-body lead, and your first 5 turn patterns. Filmed in HD with multi-angle camera work.",
    price: "£49",
    accent: "bg-primary/10 text-primary",
  },
  {
    badge: "BESTSELLER",
    title: "Bachata Sensual — Body Movement Bootcamp",
    duration: "10 lessons · 2.5 hours",
    level: "All Levels",
    desc: "Unlock the body movement that makes Bachata Sensual unforgettable. Isolation drills, waves, and partner dynamics.",
    price: "£59",
    accent: "bg-peach/15 text-peach",
  },
  {
    badge: "LADIES ONLY",
    title: "Ladies Styling Masterclass",
    duration: "8 lessons · 2 hours",
    level: "Improvers+",
    desc: "Hand styling, hip control, hair flicks, and the confidence cues that turn heads on the social floor.",
    price: "£49",
    accent: "bg-charcoal/10 text-charcoal",
  },
  {
    badge: "PREMIUM",
    title: "Wedding First Dance — DIY Course",
    duration: "6 lessons · 90 min",
    level: "Couples",
    desc: "A guided choreography pathway for couples who can't make in-person lessons. Pick your song, follow the framework.",
    price: "£79",
    accent: "bg-primary/10 text-primary",
  },
];

const tiers = [
  {
    name: "Single Course",
    price: "From £49",
    desc: "Buy one course, keep it for life.",
    features: ["Lifetime access", "HD multi-angle videos", "Downloadable practice tracks", "Mobile + TV streaming"],
    cta: "Browse Courses",
    href: TEACHABLE_URL,
    highlight: false,
  },
  {
    name: "Pura Academy Pass",
    price: "£19/mo",
    desc: "Unlimited access to every course in the library.",
    features: ["Every current & future course", "New lessons added monthly", "Private student community", "Live monthly Q&A with Melitta", "Cancel anytime"],
    cta: "Start 7-Day Free Trial",
    href: TEACHABLE_URL,
    highlight: true,
  },
  {
    name: "1-to-1 Add-On",
    price: "+ £75/session",
    desc: "Pair the academy with personal Zoom feedback.",
    features: ["50-min private Zoom session", "Personal video review", "Custom practice plan", "Booked around your schedule"],
    cta: "Enquire About 1-to-1",
    href: "https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20add%201-to-1%20Zoom%20coaching%20to%20my%20Academy%20subscription.",
    highlight: false,
  },
];

const features = [
  { icon: <Play size={22} />, title: "HD Multi-Angle Video", desc: "Front view, mirror view, footwork close-ups — see every detail." },
  { icon: <Smartphone size={22} />, title: "Stream Anywhere", desc: "Phone, tablet, laptop, TV. Practise in the kitchen or living room." },
  { icon: <Download size={22} />, title: "Downloadable Music", desc: "Curated practice playlists you can use offline, on repeat." },
  { icon: <Award size={22} />, title: "Taught by a Champion", desc: "Every lesson personally taught by Melitta — Bachata UK Champion." },
  { icon: <Users size={22} />, title: "Private Community", desc: "Pass holders get access to the private Pura Academy WhatsApp group." },
  { icon: <Clock size={22} />, title: "Learn at Your Pace", desc: "Pause, rewind, repeat. No timetable, no pressure, no judgement." },
];

const faqs = [
  { q: "When does Pura Academy launch?", a: "We're in soft launch right now. Founding members get 30% off lifetime by joining the waitlist before public launch in early 2026." },
  { q: "Do I need a partner?", a: "No. Every course is filmed so it can be practised solo. Partner-work footage is included so you can see the full picture, but the drills are designed for one person plus a wall mirror." },
  { q: "What if I'm a complete beginner?", a: "Start with 'Salsa On2 — Absolute Beginner' or 'Bachata Sensual — Body Movement Bootcamp'. Both assume zero prior experience." },
  { q: "Can I cancel my subscription?", a: "Yes — the Pura Academy Pass is monthly with no contract. Cancel from your dashboard anytime, keep access until the end of your billing period." },
  { q: "Will it work on my TV?", a: "Yes. The Teachable platform supports Chromecast, AirPlay, and any browser-enabled smart TV. Big screen = big improvements." },
  { q: "I already attend Melitta's in-person classes — is the academy worth it?", a: "Absolutely — it's the perfect midweek practice tool. Many regulars use it to drill the patterns they learned in class so they walk in next Monday with the moves locked in." },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Pura Academy — Online Salsa & Bachata Courses",
  description: "Pre-recorded online Salsa On2 and Bachata Sensual courses taught by Bachata UK Champion Melitta Siomos. Stream HD lessons anywhere.",
  provider: { "@type": "Organization", name: "Melitta Siomos Dance Academy", sameAs: "https://www.puranights.com" },
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT2H30M",
    },
  ],
  offers: { "@type": "Offer", price: "19.00", priceCurrency: "GBP", category: "subscription" },
};

const OnlineAcademy = () => (
  <Layout>
    <SeoHead
      title="Pura Academy — Online Salsa & Bachata Courses | Melitta Siomos"
      description="Stream pre-recorded Salsa On2 and Bachata Sensual courses online. Taught by Bachata UK Champion Melitta Siomos. £19/mo unlimited access — 7-day free trial."
      path="/online-academy"
      schema={courseSchema}
    />

    {/* HERO */}
    <section className="relative bg-charcoal text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 30%, hsl(20 75% 66% / 0.6), transparent 60%), radial-gradient(circle at 70% 70%, hsl(43 48% 54% / 0.5), transparent 60%)" }} />
      <div className="container-main relative section-padding text-center max-w-4xl">
        <FadeInUp>
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-heading font-semibold tracking-wider uppercase mb-5">
            ✨ Soft Launch · Founding Member Pricing
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Learn Salsa & Bachata <span className="italic" style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>From Anywhere</span>
          </h1>
          <p className="text-primary-foreground/75 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Pura Academy is the new on-demand library from Bachata UK Champion Melitta Siomos. Pre-recorded HD courses you can stream on any device, at your own pace.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a href={TEACHABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-cta-primary inline-flex items-center justify-center gap-2">
              <Play size={16} /> Start 7-Day Free Trial
            </a>
            <a href={WAITLIST_MAILTO} className="btn-cta-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Join Founding Member Waitlist
            </a>
          </div>
          <p className="text-primary-foreground/50 text-xs font-heading">No card required for trial · Cancel anytime · 30% off for founding members</p>
        </FadeInUp>
      </div>

      {/* Stat strip */}
      <div className="relative border-t border-primary-foreground/10">
        <div className="container-main grid grid-cols-2 md:grid-cols-4 gap-6 py-8 text-center">
          {[
            { n: 36, suffix: "+", label: "HD Lessons" },
            { n: 4, suffix: "", label: "Full Courses" },
            { n: 500, suffix: "+", label: "In-Person Students" },
            { n: 5, suffix: ".0★", label: "Google Rating" },
          ].map((s, i) => (
            <div key={i}>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter end={s.n} suffix={s.suffix} />
              </p>
              <p className="text-primary-foreground/50 text-[11px] font-heading uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURES */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">A Studio in Your Pocket</h2>
          <GoldDivider />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Everything you need to actually improve — not just watch videos.</p>
        </div>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full border border-border/50">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">{f.icon}</div>
                <h3 className="font-heading font-bold text-base mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* COURSE LIBRARY */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">The Course Library</h2>
          <GoldDivider />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Four flagship courses at launch. New lessons added every month.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((c, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <div className="bg-background rounded-2xl overflow-hidden border border-border/60 card-hover h-full flex flex-col">
                {/* Video poster placeholder */}
                <div className="relative aspect-video bg-charcoal flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 50%, hsl(20 75% 66%), transparent 70%)" }} />
                  <div className="relative w-16 h-16 rounded-full bg-primary/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition">
                    <Play size={26} className="text-primary fill-primary ml-0.5" />
                  </div>
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold tracking-wider ${c.accent}`}>
                    {c.badge}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-primary-foreground text-[10px] font-heading">
                    <Lock size={10} className="inline mr-1" /> Preview
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-bold mb-2">{c.title}</h3>
                  <div className="flex gap-3 text-xs text-muted-foreground font-heading mb-3">
                    <span className="inline-flex items-center gap-1"><Clock size={12} /> {c.duration}</span>
                    <span>·</span>
                    <span>{c.level}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">{c.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <span className="font-display text-2xl font-bold text-primary">{c.price}</span>
                    <a href={TEACHABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs py-2 px-5">
                      Preview Free →
                    </a>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* PRICING TIERS */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Choose Your Pathway</h2>
          <GoldDivider />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Buy a single course, get unlimited access, or pair it with personal coaching.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-7 flex flex-col h-full transition-all ${
                t.highlight
                  ? "bg-charcoal text-primary-foreground border-2 border-primary shadow-2xl scale-[1.02]"
                  : "bg-card border border-border/60 card-hover"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-heading font-bold tracking-wider uppercase whitespace-nowrap">
                  ⭐ Most Popular
                </span>
              )}
              <h3 className={`font-display text-xl font-bold mb-1 ${t.highlight ? "text-primary-foreground" : ""}`}>{t.name}</h3>
              <p className={`text-sm mb-4 ${t.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{t.desc}</p>
              <p className={`font-display text-4xl font-bold mb-5 ${t.highlight ? "text-primary" : "text-charcoal"}`}>{t.price}</p>
              <ul className={`space-y-2.5 mb-7 flex-1 text-sm ${t.highlight ? "text-primary-foreground/80" : "text-foreground/80"}`}>
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  t.highlight
                    ? "btn-cta-primary w-full text-center"
                    : "btn-cta-outline w-full text-center"
                }
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-xs font-heading mt-8">
          🎁 <strong>Founding Member Bonus:</strong> Join before public launch and lock in 30% off the Pura Academy Pass for life.
        </p>
      </div>
    </section>

    {/* SOCIAL PROOF */}
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-4xl text-center">
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-primary text-primary" />)}
        </div>
        <p className="font-display text-2xl md:text-3xl italic leading-relaxed mb-6">
          "Melitta's in-person classes changed how I dance. Having her teaching style on demand is going to be a game-changer for everyone who can't make it to West London on a Monday or Tuesday."
        </p>
        <p className="text-primary-foreground/60 text-sm font-heading">— Beta tester · Pura Nights student since 2022</p>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Pura Academy FAQs</h2>
          <GoldDivider />
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <FadeInUp key={i} delay={i * 0.04}>
              <details className="group bg-card rounded-xl p-5 border border-border/60 cursor-pointer">
                <summary className="font-heading font-semibold text-base flex items-start justify-between gap-4 list-none">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <p className="text-muted-foreground text-sm leading-relaxed mt-3 pt-3 border-t border-border/60">{f.a}</p>
              </details>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container-main max-w-2xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Be a Founding Member</h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">
          Join the waitlist now and lock in 30% off the Pura Academy Pass for life. Public launch early 2026.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={TEACHABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">
            <Play size={16} className="inline mr-2" /> Start Free Trial
          </a>
          <a href={WAITLIST_MAILTO} className="btn-cta-outline">
            📩 Join Founding Waitlist
          </a>
        </div>
      </div>
    </section>

    <RelatedPages
      title="Explore More"
      links={[
        { to: "/online-salsa-bachata-coaching", label: "1-to-1 Online Coaching", desc: "Live Zoom lessons with Melitta" },
        { to: "/pura-nights", label: "In-Person Classes", desc: "Mondays Chiswick, Tuesdays Ealing" },
        { to: "/refer", label: "Refer a Friend", desc: "Earn rewards for sharing" },
        { to: "/prices", label: "All Pricing", desc: "In-person & online options" },
        { to: "/start-here", label: "Start Here", desc: "New to dancing?" },
        { to: "/contact", label: "Contact Melitta", desc: "Questions? Just ask" },
      ]}
    />
  </Layout>
);

export default OnlineAcademy;
