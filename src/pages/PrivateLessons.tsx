import { Link } from "react-router-dom";
import { CheckCircle, Phone, MapPin, Users, Target, Heart, Sparkles } from "lucide-react";
import RelatedPages from "@/components/RelatedPages";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImg from "@/assets/private-lesson.jpg";

const goals = [
  { icon: Users, title: "Complete Beginners", desc: "Never danced? Start with 1-on-1 guidance in a private, judgement-free environment." },
  { icon: Heart, title: "Wedding Couples", desc: "Create a beautiful first dance routine tailored to your song and style." },
  { icon: Target, title: "Technique Refinement", desc: "Focus on specific skills: footwork, body movement, musicality, or turn technique." },
  { icon: Sparkles, title: "Performance Prep", desc: "Prepare for competitions, showcases, or Pura Ladies auditions with dedicated coaching." },
];

const PrivateLessons = () => (
  <Layout>
    <SeoHead
      title="Private Salsa & Bachata Lessons London | 1-to-1 with Melitta Siomos"
      description="Fast-track your Salsa & Bachata with private 1-to-1 coaching from award-winning instructor Melitta Siomos in West London. Tailored plans for all levels. Book a free consultation."
      path="/private-lessons"
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Private Salsa & Bachata Lessons",
        provider: { "@type": "Person", name: "Melitta Siomos" },
        areaServed: { "@type": "Place", name: "West London" },
        description: "Private 1-to-1 salsa and bachata coaching sessions tailored to individual goals.",
      }}
    />

    {/* Hero */}
    <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
      <img src={heroImg} alt="Private salsa bachata lesson with Melitta Siomos London" className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Tailored 1-on-1 Coaching</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Private Dance Lessons — Tailored Just For You</h1>
          <p className="text-primary-foreground/80 font-heading text-lg max-w-2xl mx-auto">Accelerate your progress with personalised coaching from Bachata UK Champion Melitta Siomos</p>
        </div>
      </div>
    </section>

    {/* Who Are Private Lessons For? */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-3">Who Are Private Lessons For?</h2>
          <p className="text-muted-foreground text-center text-sm mb-10 max-w-xl mx-auto">Private lessons are for anyone with a specific goal — whether that's learning the basics, preparing for a wedding, or taking your social dancing to the next level.</p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
          {goals.map((g, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full flex gap-4">
                <g.icon size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-sm mb-1">{g.title}</h3>
                  <p className="text-muted-foreground text-sm">{g.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Why Private Beats Group */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Why Private Lessons Accelerate Your Learning</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="space-y-3">
          {[
            "100% of Melitta's attention is on you — every correction is immediate",
            "Progress 3–5x faster than in group classes",
            "Flexible scheduling that fits your busy life",
            "Work on exactly what you need — no waiting for the group",
            "Build confidence in a private, pressure-free environment",
            "HD video drills available between sessions to practise at home",
            "Ideal for couples who want to learn together privately",
          ].map((b) => (
            <StaggerItem key={b}>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{b}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* How It Works */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-10">How Private Lessons Work</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
          {[
            { n: "1", title: "Free Consultation", desc: "A call or WhatsApp chat to understand your goals, experience, and vision." },
            { n: "2", title: "Tailored Plan", desc: "Melitta builds a lesson plan around your level, style preferences, and schedule." },
            { n: "3", title: "Focused Sessions", desc: "Intensive 1-on-1 sessions with personal feedback, corrections, and drills." },
            { n: "4", title: "Video Review", desc: "Optional HD video review between sessions to accelerate your progress at home." },
          ].map((s) => (
            <StaggerItem key={s.n}>
              <div className="bg-charcoal-light rounded-2xl p-6 text-center h-full">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold mx-auto mb-3">{s.n}</div>
                <h3 className="font-heading font-bold text-sm text-primary-foreground mb-1">{s.title}</h3>
                <p className="text-primary-foreground/60 text-xs">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* What's Included */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Every Private Package Includes</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <ul className="space-y-2 text-sm text-muted-foreground mb-8">
            {[
              "A free consultation call to understand your goals",
              "A personalised plan based on your level and learning style",
              "HD videos of drills between sessions (optional)",
              "Flexible weekly or bi-weekly scheduling",
              "Support and check-ins between sessions",
              "Confidential, relaxed, and judgement-free environment",
              "Online option available for remote learners",
            ].map((f, i) => <li key={i} className="flex items-start gap-2"><CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" /> {f}</li>)}
          </ul>
        </FadeInUp>
      </div>
    </section>

    {/* Locations */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Where Do Lessons Take Place?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">Private lessons can be arranged at a suitable studio in central or west London. Melitta is flexible and will discuss the best location during your consultation. Online lessons via Zoom are also available for those outside London or with busy schedules.</p>
          <div className="flex flex-wrap gap-2">
            {["West London", "Central London", "Your venue", "Online via Zoom"].map(loc => (
              <span key={loc} className="text-xs font-accent bg-primary/10 text-primary px-3 py-1 rounded-full">{loc}</span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8">Private Lesson FAQs</h2>
        {[
          { q: "How much do private lessons cost?", a: "Pricing is bespoke based on your schedule and goals. Contact Melitta for a free consultation and quote." },
          { q: "How many lessons will I need?", a: "It depends on your goals. Beginners typically see great progress in 4–6 sessions. Wedding couples usually book 6–10." },
          { q: "Can I bring a friend or partner?", a: "Yes — couples and small group private sessions are available at adjusted rates." },
          { q: "Do you offer online private lessons?", a: "Yes. Melitta teaches private lessons via Zoom for dancers outside London or with busy schedules." },
        ].map((faq, i) => (
          <details key={i} className="border-b border-border py-4 group">
            <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
            <p className="text-muted-foreground text-sm mt-2">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/private-dance-lessons-west-london", label: "Private Lessons West London", desc: "Local 1-to-1 coaching info" },
      { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance choreography" },
      { to: "/online-classes", label: "Online Classes", desc: "Learn via Zoom" },
      { to: "/pura-nights", label: "Weekly Classes", desc: "Group classes Mon & Tue" },
      { to: "/prices", label: "Prices & Bundles", desc: "All pricing options" },
      { to: "/testimonials", label: "Student Reviews", desc: "What students say" },
    ]} />

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">Ready to Fast-Track Your Dance Journey?</h2>
        <p className="text-charcoal/70 mb-8 max-w-xl mx-auto">Contact Melitta directly to discuss availability and rates. First consultation is always free.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20private%20dance%20lessons" target="_blank" rel="noopener noreferrer" className="btn-cta-dark">💬 WhatsApp Melitta</a>
          <a href="mailto:siomosmelitta@gmail.com" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20">📧 Email Melitta</a>
        </div>
        <p className="text-charcoal/60 text-sm mt-4 font-heading"><Phone size={14} className="inline mr-1" />Or call: 07449 482 343</p>
      </div>
    </section>
  </Layout>
);

export default PrivateLessons;