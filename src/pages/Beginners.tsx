import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import ProofBlock from "@/components/ProofBlock";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import { ChevronRight, CheckCircle, MapPin, Clock, Users, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/beginner-welcome.jpg";
import melittaImg from "@/assets/melitta-portrait.jpg";

/* <!-- WIX PAGE: /beginners -->
   <!-- WIX SECTION: Hero — Full-width Strip with welcoming beginner image -->
   <!-- WIX SECTION: Reassurance Grid — use Icon/Card grid -->
   <!-- WIX SECTION: What to Expect — use Timeline strip -->
   <!-- WIX SECTION: Which Class — use comparison Card grid -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app -->
   <!-- WIX SECTION: Testimonials — use Slider connected to Testimonials collection (beginner category) -->
   <!-- WIX SECTION: CTA Band — use Full-width Strip -->
*/
import socialImg from "@/assets/community-vibe.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Beginner Salsa & Bachata Classes London",
  description: "Complete beginner Salsa and Bachata dance classes in West London. No partner needed, no experience required. Weekly classes in Chiswick and Ealing.",
  provider: {
    "@type": "Organization",
    name: "Pura Nights — Melitta Siomos Dance Academy",
    url: "https://www.puranights.com",
  },
  courseMode: "onsite",
  educationalLevel: "Beginner",
  offers: {
    "@type": "Offer",
    price: "10",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      name: "Monday Beginners — Chiswick",
      courseMode: "onsite",
      location: { "@type": "Place", name: "The George IV", address: "185 Chiswick High Rd, London W4 2DR" },
      schedule: { "@type": "Schedule", byDay: "Monday", startTime: "19:30", endTime: "20:00" },
    },
    {
      "@type": "CourseInstance",
      name: "Tuesday Beginners — Ealing",
      courseMode: "onsite",
      location: { "@type": "Place", name: "Drayton Court Hotel", address: "2 The Avenue, West Ealing W13 8PH" },
      schedule: { "@type": "Schedule", byDay: "Tuesday", startTime: "19:30", endTime: "20:00" },
    },
  ],
};

const faqs = [
  { q: "Do I need any dance experience?", a: "Absolutely not. Our Beginners class starts from scratch every week. Most of our best dancers started with zero experience." },
  { q: "Do I need to bring a partner?", a: "No — most students come solo. We rotate partners throughout class so you'll dance with everyone and learn faster." },
  { q: "What should I wear?", a: "Comfortable clothes and flat-soled shoes you can pivot in. Clean trainers are fine. Avoid chunky soles. Bring water!" },
  { q: "How much does it cost?", a: "Drop-in is £10 for one class or £15 for two classes plus social dancing. We also offer 4-class bundles and monthly passes." },
  { q: "What age group attends?", a: "Our students range from 20 to 65+. The community is incredibly diverse and welcoming to all ages and backgrounds." },
  { q: "What's the difference between Salsa and Bachata?", a: "Salsa is faster and more rhythmic with complex footwork. Bachata is slower, more intimate, and easier to pick up. We teach both every class." },
];

const Beginners = () => (
  <Layout>
    <SeoHead
      title="Beginner Salsa & Bachata Classes London | No Experience Needed | Pura Nights"
      description="Start your dance journey with London's top-rated beginner Salsa & Bachata classes. No partner needed, no experience required. Weekly in Chiswick & Ealing. From £10."
      path="/beginners"
      schema={schema}
    />

    {/* Hero */}
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Beginner salsa and bachata class at Pura Nights London" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-accent text-xs tracking-[0.3em] uppercase text-primary mb-5">
          Zero Experience Required
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-5">
          Your First Salsa &<br />Bachata Class Starts Here
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="font-heading text-base md:text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto font-light">
          No partner needed · Complete beginners welcome every week · Rated 5.0 on Google
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Your First Class</a>
          <Link to="/start-here" className="btn-cta-ghost text-sm">What to Expect →</Link>
        </motion.div>
      </div>
    </section>

    {/* Trust Strip */}
    <section className="py-6 bg-charcoal border-y border-primary/10">
      <div className="container-main">
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            { icon: Star, value: "5.0", label: "Google Rating" },
            { icon: Users, value: "500+", label: "Students" },
            { icon: Heart, value: "All Ages", label: "20–65+" },
            { icon: CheckCircle, value: "No", label: "Partner Needed" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <s.icon size={16} className="text-primary" />
              <span className="font-display text-sm font-bold text-primary-foreground">{s.value}</span>
              <span className="text-[10px] font-accent uppercase tracking-wider text-primary-foreground/50">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Pura Nights for Beginners */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <ScaleIn>
            <img src={melittaImg} alt="Melitta Siomos teaching beginner salsa class" className="rounded-2xl w-full max-w-md mx-auto" loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
          </ScaleIn>
          <FadeInUp delay={0.15}>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Why Choose Us</p>
            <h2 className="font-display text-3xl font-bold mb-4">The Best Place to Start Dancing in London</h2>
            <div className="h-1 w-16 rounded-full mb-6" style={{ background: 'var(--gradient-gold)' }} />
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                "Award-winning instructor with 15+ years experience",
                "Beginners class starts from zero every single week",
                "No partner needed — solo-friendly, we rotate in class",
                "Three levels running simultaneously so you progress naturally",
                "Warm, inclusive community of 500+ dancers",
                "Two venues: Chiswick (Mon) and Ealing (Tue)",
                "Social dancing after class to practise what you've learned",
                "Free Ladies Styling warm-up on Tuesdays",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="text-primary font-heading font-semibold text-sm hover:opacity-80 transition-opacity inline-flex items-center gap-1 mt-6">
              Meet Melitta <ChevronRight size={14} />
            </Link>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* Class Schedule */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">Every Week</p>
          <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-10">Beginner Classes — Two Nights, Two Venues</h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
          <StaggerItem>
            <div className="bg-charcoal-light rounded-2xl p-8 border border-primary/15 h-full">
              <h3 className="font-display text-2xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <p className="text-primary-foreground/50 text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> The George IV, W4 2DR</p>
              <div className="space-y-2.5 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />7:30 PM — Beginners Salsa & Bachata</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />8:00 PM — Improvers</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />9:00–11:00 PM — Social Dancing</div>
              </div>
              <p className="text-primary-foreground/40 text-xs mt-4">💷 £10 drop-in · £15 two classes · £5 social only</p>
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-[11px] mt-5 py-2 px-5 rounded-lg">Book Monday</a>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-charcoal-light rounded-2xl p-8 border border-peach/15 h-full">
              <h3 className="font-display text-2xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <p className="text-primary-foreground/50 text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, W13 8PH</p>
              <div className="space-y-2.5 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />6:50 PM — Free Ladies Styling</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />7:30 PM — Beginners Salsa & Bachata</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />9:00–11:00 PM — Social Dancing</div>
              </div>
              <p className="text-primary-foreground/40 text-xs mt-4">💷 £10 drop-in · £15 two classes · £5 social only</p>
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta text-[11px] mt-5 py-2 px-5 rounded-lg bg-peach text-charcoal font-semibold hover:opacity-90">Book Tuesday</a>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* Social Proof */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">What Beginners Say After Their First Class</h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            { quote: "I was so nervous but Melitta made me feel so welcome. By the end of the night I was actually dancing!", name: "Sarah T.", note: "First class: Jan 2026" },
            { quote: "Came solo, left with 10 new friends. The vibe is incredible and the teaching is so patient and clear.", name: "James K.", note: "Now an Improver" },
            { quote: "I have two left feet but that didn't matter. The rotation means you learn from everyone. Absolutely brilliant.", name: "Priya M.", note: "Attends both nights" },
          ].map((t, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full flex flex-col">
                <div className="flex gap-0.5 text-primary mb-3">{Array(5).fill(0).map((_, j) => <Star key={j} size={12} fill="currentColor" />)}</div>
                <p className="text-muted-foreground text-sm leading-relaxed italic flex-1 mb-4">"{t.quote}"</p>
                <div>
                  <p className="font-heading font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.note}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Beginner FAQs</h2>
        </FadeInUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <details className="bg-background rounded-2xl p-5 card-hover group">
                <summary className="font-heading font-semibold text-sm cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <ChevronRight size={16} className="text-primary transition-transform group-open:rotate-90 flex-shrink-0" />
                </summary>
                <p className="text-muted-foreground text-sm leading-relaxed mt-3">{faq.a}</p>
              </details>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">Ready to Start?</h2>
        <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">Your first class is just a click away. No booking required for drop-ins — just turn up at 7:15 PM and join the Beginners class.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your First Class</a>
          <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27m%20interested%20in%20trying%20a%20beginner%20class" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm">💬 Ask Melitta a Question</a>
        </div>
      </div>
    </section>

    <ProofBlock
      categories={["beginner", "group"]}
      eyebrow="Beginner Stories"
      title="From zero to dancing — in weeks"
      subtitle="Real reviews from people who walked in nervous and left smiling."
    />

    <RelatedPages title="Helpful Links for Beginners" links={[
      { to: "/start-here", label: "Start Here Guide", desc: "Everything to know before class" },
      { to: "/pura-nights", label: "Weekly Classes", desc: "Full schedule & details" },
      { to: "/prices", label: "Prices", desc: "From £5 per session" },
      { to: "/blog/salsa-vs-bachata", label: "Salsa vs Bachata", desc: "Which to learn first?" },
      { to: "/blog/what-to-wear-salsa-bachata", label: "What to Wear", desc: "Dress code tips" },
      { to: "/faq", label: "FAQ", desc: "Common questions" },
    ]} />
  </Layout>
);

export default Beginners;
