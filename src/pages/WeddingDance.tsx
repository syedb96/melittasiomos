import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import RelatedPages from "@/components/RelatedPages";
import ProofBlock from "@/components/ProofBlock";
import RealProofSlot from "@/components/RealProofSlot";
import { Link } from "react-router-dom";
import { Star, Heart, CheckCircle, ChevronRight, ExternalLink } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import weddingImg from "@/assets/wedding-dance.jpg";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import WhoThisIsForBlock from "@/components/WhoThisIsForBlock";
import NextStepServiceGrid from "@/components/NextStepServiceGrid";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: /wedding-dance -->
   <!-- WIX SECTION: Hero — use Full-width Strip with dark overlay -->
   <!-- WIX SECTION: Why Choose Melitta — use Repeater or Card grid -->
   <!-- WIX SECTION: How It Works — use Steps/Timeline Strip -->
   <!-- WIX SECTION: Testimonials — use Slider connected to Testimonials collection (wedding category) -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app -->
   <!-- WIX SECTION: CTA Band — use Full-width Strip -->
   <!-- IMPORTANT: No public pricing anywhere on this page — enquiry only -->
*/
const WeddingDance = () => (
  <Layout>
    <SeoHead
      title="Wedding Dance Lessons London | First Dance Choreography | Melitta Siomos"
      description="Make your first dance unforgettable. Private wedding dance lessons with Melitta Siomos in West London — Salsa, Bachata, Waltz or bespoke. Book a free consultation."
      path="/wedding-dance"
      dateModified="2026-04-14"
      schema={{
        "@context": "https://schema.org",
        "@type": ["Service", "FAQPage"],
        name: "Wedding First Dance Lessons",
        provider: { "@type": "Person", name: "Melitta Siomos" },
        areaServed: { "@type": "Place", name: "London" },
        description: "Bespoke wedding first dance choreography and private lessons for couples in London.",
        mainEntity: [
          { "@type": "Question", name: "Do we need any dance experience?", acceptedAnswer: { "@type": "Answer", text: "Not at all. Most couples Melitta works with are complete beginners." } },
          { "@type": "Question", name: "When should we start lessons?", acceptedAnswer: { "@type": "Answer", text: "Ideally 8–12 weeks before your wedding." } },
          { "@type": "Question", name: "Can you work around my dress / shoes / veil?", acceptedAnswer: { "@type": "Answer", text: "Yes. Melitta will discuss outfit details so the choreography feels comfortable." } },
          { "@type": "Question", name: "Where do the lessons take place?", acceptedAnswer: { "@type": "Answer", text: "At Melitta's private studio in West London, your home, a hired studio, or even your wedding venue." } },
          { "@type": "Question", name: "What style of dance can we do?", acceptedAnswer: { "@type": "Answer", text: "Anything — from a classic slow waltz to romantic Salsa/Bachata, a fun mash-up, or something theatrical." } },
          { "@type": "Question", name: "Can we involve our bridal party?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Group choreography with bridesmaids, groomsmen, or parents can be incorporated." } },
        ],
      }}
    />

    {/* Cross-brand banner — Melitta's personal site for wedding dance packages */}
    <a
      href="https://melittasiomos.com/wedding-dance"
      target="_blank"
      rel="noopener noreferrer"
      className="block text-center text-charcoal font-heading text-xs md:text-sm py-3 px-4 hover:opacity-90 transition-opacity"
      style={{ background: 'var(--gradient-gold)' }}
    >
      <span className="font-semibold">Wedding dance packages are managed through Melitta's personal studio site.</span>
      <span className="hidden md:inline"> · </span>
      <span className="block md:inline underline underline-offset-2">View packages at melittasiomos.com →</span>
    </a>

    {/* Hero */}
    <section className="relative h-80 md:h-[30rem] overflow-hidden">
      <img src={weddingImg} alt="Couple performing their wedding first dance choreographed by Melitta Siomos" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsla(0,0%,8%,0.35), hsla(0,0%,8%,0.75))' }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Wedding Dance Made Easy</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">Your Perfect First Dance</h1>
          <p className="font-heading text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-6">Private choreography and coaching from London's award-winning instructor — elegant, fun, and completely tailored to you</p>
          <a {...waCustom("Hi Melitta, I'd love to enquire about Wedding Dance coaching", "WeddingDance:71")} className="btn-cta-primary text-sm">Book Free Consultation</a>
          <p className="mt-4 text-[11px] tracking-wide text-primary-foreground/70 font-accent">
            Reply within 24h · Bookings open 12 weeks before your wedding · 100+ couples coached
          </p>
        </div>
      </div>
    </section>

    {/* WIX SECTION: AnswerBox — AI / GEO answer block */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          tone="warm"
          question="How many wedding dance lessons do most couples need?"
          answer="Most couples polish a memorable 60–90 second first dance in 4–6 private sessions with Melitta. Beginners with no experience usually take 6, returning dancers 3–4, and busy couples on a tight runway can fast-track in 2 intensive blocks. Choreography is tailored to your song, venue size, dress and guest list so you actually look like yourselves on the night."
          bullets={["4–6 lessons is the most popular package","Free 15-min discovery call before you commit","Online prep videos sent between sessions","Last-minute bookings available with notice"]}
          cta={{ label: "Book a free consultation", href: waCustom("Hi Melitta, we'd like to book a free wedding dance consultation", "WeddingDance:87").href }}
        />
      </div>
    </section>

    {/* Intro */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <p className="text-muted-foreground leading-relaxed text-center mb-8">Whether you're dreaming of a simple, heartfelt first dance or a show-stopping Salsa or Bachata routine, Melitta Siomos makes the whole process relaxed, enjoyable, and stress-free. No dance experience needed — most couples she works with are complete beginners.</p>
        </FadeInUp>
      </div>
    </section>

    {/* Who It's For */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Who Is This For?</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
          {[
            { emoji: "😰", title: "Shy Couples", desc: "Feel nervous about dancing in front of everyone? Melitta will build your confidence step by step." },
            { emoji: "🎉", title: "Fun Latin Routines", desc: "Want a Salsa or Bachata number that gets the crowd cheering? Melitta choreographs show-stopping Latin routines." },
            { emoji: "💕", title: "Simple & Elegant", desc: "Prefer something understated and romantic? A beautiful, simple routine can be just as powerful." },
            { emoji: "🏆", title: "Complete Beginners", desc: "Never danced a step? No problem. Most of Melitta's wedding couples start from absolute zero." },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-background rounded-2xl p-6 card-hover h-full">
                <span className="text-3xl block mb-3">{item.emoji}</span>
                <h3 className="font-heading font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* How it works */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-10">How It Works — 4 Simple Steps</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
          {[
            { step: "1", title: "Free Consultation", desc: "Share your wedding date, song ideas, and how you want the dance to feel. Via WhatsApp, phone, or video call." },
            { step: "2", title: "Choose Your Package", desc: "Decide how many lessons you need and the style that suits you both. Melitta will recommend." },
            { step: "3", title: "Private Lessons", desc: "Meet at Melitta's studio or your location. Learn step by step with patience and encouragement." },
            { step: "4", title: "Final Polish", desc: "Refine the routine, posture, and presence. Simple practice drills for the week before your big day." },
          ].map((s, i) => (
            <StaggerItem key={i}>
              <div className="bg-charcoal-light rounded-2xl p-6 text-center h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold mx-auto mb-3">{s.step}</div>
                <h3 className="font-heading font-bold text-sm text-primary-foreground mb-1">{s.title}</h3>
                <p className="text-primary-foreground/60 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Style Ideas */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Wedding Dance Style Ideas</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
          <p className="text-muted-foreground text-sm mb-6">Your first dance doesn't have to be a waltz — unless you want it to be! Melitta has choreographed everything from classic slow dances to high-energy Latin routines:</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Romantic slow dance / waltz — timeless and elegant",
              "Bachata Sensual — intimate, beautiful, deeply emotional",
              "Salsa On1 — energetic, fun, guaranteed crowd-pleaser",
              "Mash-up / medley — start slow, surprise with a Latin switch",
              "Ed Sheeran / Dean Martin / modern pop — any song works",
              "Choreographed with bridal party or family involvement",
            ].map((s, i) => <li key={i} className="flex items-start gap-2"><CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" /> {s}</li>)}
          </ul>
        </FadeInUp>
      </div>
    </section>

    {/* How Many Lessons */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">How Many Lessons Do We Need?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">Most couples book between 6 and 10 sessions. Here's a rough guide:</p>
          <div className="space-y-4">
            {[
              { sessions: "3–4 sessions", desc: "Simple, confident first dance with basic movement and good posture. Ideal for couples who just want to feel comfortable.", time: "Start 4–6 weeks before" },
              { sessions: "6–8 sessions", desc: "A polished routine with turns, styling, and confident floor presence. The most popular option.", time: "Start 8–10 weeks before" },
              { sessions: "10+ sessions", desc: "A full choreographed performance with complex moves, dips, and show-stopping moments.", time: "Start 12+ weeks before" },
            ].map((p, i) => (
              <div key={i} className="bg-background rounded-2xl p-5 card-hover">
                <h3 className="font-heading font-bold text-sm text-primary mb-1">{p.sessions}</h3>
                <p className="text-muted-foreground text-sm mb-1">{p.desc}</p>
                <p className="text-xs text-primary/70 font-accent">⏰ {p.time}</p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-8">What Couples Say</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Eva & Miguel, 2023", text: "We were total beginners and honestly terrified about our first dance. Melitta broke everything down and made the lessons one of our favourite parts of wedding planning. She made us feel so confident and our guests couldn't believe it." },
            { name: "Sofia & Patrizio, 2022", text: "Melitta choreographed our wedding dance. We chose Salsa & Bachata because it felt romantic but also fun. Our guests loved our performance and we will never forget that moment!" },
            { name: "Hannah & James", text: "Melitta understood exactly what we wanted — classy, not cheesy. The choreography felt like us and she was so patient from start to finish." },
          ].map((r, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full">
                <div className="flex gap-1 mb-3 text-primary">{Array(5).fill(0).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}</div>
                <p className="text-muted-foreground text-sm italic mb-4 leading-relaxed">"{r.text}"</p>
                <p className="font-heading font-bold text-sm">{r.name}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8">Wedding Dance FAQs</h2>
        {[
          { q: "Do we need any dance experience?", a: "Not at all. Most couples Melitta works with are complete beginners. She starts from absolute zero." },
          { q: "When should we start lessons?", a: "Ideally 8–12 weeks before your wedding. Last-minute options are possible depending on availability — even 3–4 sessions can make a big difference." },
          { q: "Can you work around my dress / shoes / veil?", a: "Yes. Melitta will discuss outfit details so the choreography feels comfortable. At least two practice sessions should be done in your actual shoes." },
          { q: "Where do the lessons take place?", a: "At Melitta's private studio in West London, your home, a hired studio, or even your wedding venue." },
          { q: "What style of dance can we do?", a: "Anything — from a classic slow waltz to romantic Salsa/Bachata, a fun mash-up, or something theatrical. Your choice." },
          { q: "Can we involve our bridal party?", a: "Absolutely. Group choreography with bridesmaids, groomsmen, or even parents can be incorporated." },
        ].map((f, i) => (
          <details key={i} className="border-b border-border py-4 group">
            <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{f.q}</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>

    {/* Trust */}
    <section className="py-8 bg-charcoal">
      <div className="container-main">
        <div className="flex flex-wrap items-center justify-center gap-8 text-primary-foreground/60 text-xs font-accent mb-4">
          <span>⭐ 5.0 Google Rating</span>
          <span>🏆 Bachata UK Champion</span>
          <span>💑 Dozens of Couples Coached</span>
          <span>🎓 15+ Years Experience</span>
        </div>
        <div className="text-center">
          <a href="https://maps.google.com/?q=Wedding+Dance+Made+Easy+Melitta+Siomos+London" target="_blank" rel="noopener noreferrer" className="text-primary text-[10px] font-heading font-semibold hover:underline inline-flex items-center gap-1">
            Find Wedding Dance Made Easy on Google <ExternalLink size={9} />
          </a>
        </div>
      </div>
    </section>

    <ProofBlock
      categories={["wedding"]}
      eyebrow="Real Couples"
      title="Couples who trusted Melitta with their first dance"
      limit={3}
      variant="dark"
    />

    {/* Real-proof visual slot — wedding couple story */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-md">
        <RealProofSlot
          variant="story"
          purpose="Wedding Couple First-Dance Photo"
          replacementLabel="Image to add · Emma & Tom testimonial is final"
          idealSubject="A past wedding couple in their first-dance moment — provided by the couple or their photographer, with written permission. Pair with a one-sentence quote ('We had 4 lessons with Melitta — best decision of the wedding')."
          cropRatio="4:5"
          altText="Real wedding couple performing their first dance after lessons with Melitta Siomos"
          caption={`"We booked four lessons thinking we'd just learn a sway. Melitta choreographed the entire thing to our song and we genuinely owned that dance floor. Best money we spent on the whole wedding." — Emma & Tom, married July 2024`}
        />
      </div>
    </section>

    <WhoThisIsForBlock
      title="Who Melitta coaches for first dances"
      personas={[
        { label: "Nervous couples", description: "Never danced together? Melitta builds confidence first, choreography second." },
        { label: "Last-minute couples", description: "Got 4–6 weeks left? She'll build a beautiful, achievable routine fast." },
        { label: "Simple & elegant", description: "Sometimes the most moving first dance is the calmest one. We'll match your song." },
        { label: "Showpiece routines", description: "Want a wow-moment with a lift or a reveal? She's choreographed dozens." },
      ]}
    />
    <NextStepServiceGrid
      title="After your first dance"
      items={[
        { to: "/private-lessons", label: "Private Lessons", description: "Keep dancing together — beyond the wedding.", eyebrow: "Couples" },
        { to: "/testimonials", label: "Real Couple Reviews", description: "Read how other couples felt on the day." },
        { to: "/gift-vouchers", label: "Gift a Lesson", description: "Perfect anniversary or engagement gift." },
      ]}
    />
    <RelatedPages title="Wedding Dance Resources" links={[
      { to: "/blog/wedding-first-dance-tips", label: "10 First Dance Tips", desc: "Expert advice for your big day" },
      { to: "/blog/choose-wedding-first-dance-song", label: "Choose Your Song", desc: "How to pick the perfect track" },
      { to: "/blog/how-many-wedding-dance-lessons", label: "How Many Lessons?", desc: "A realistic guide for couples" },
      { to: "/blog/salsa-vs-waltz-wedding", label: "Salsa vs Waltz", desc: "Compare styles for your dance" },
      { to: "/blog/last-minute-wedding-dance", label: "Last-Minute Dance", desc: "Short on time? Here's what to do" },
      { to: "/wedding-dance-west-london", label: "Wedding Dance West London", desc: "Local service info" },
      { to: "/proof-centre", label: "Proof Centre", desc: "Read real couple reviews & awards" },
      { to: "/private-lessons", label: "Private Lessons", desc: "All 1-to-1 coaching options" },
      { to: "/gift-vouchers", label: "Gift Vouchers", desc: "Give dance lessons as a gift" },
      { to: "/meet-the-team", label: "Meet the Team", desc: "8 professional instructors" },
    ]} />

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">Ready to Start Planning Your First Dance?</h2>
        <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">Book a free 15-minute consultation with Melitta to discuss your song, vision, and timeline.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a {...waCustom("Hi Melitta, I'd love to enquire about Wedding Dance coaching", "WeddingDance:315")} className="btn-cta-dark">💬 WhatsApp Melitta</a>
          <a href="mailto:siomosmelitta@gmail.com?subject=Wedding%20Dance%20Enquiry" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20">📧 Email Melitta</a>
        </div>
      </div>
    </section>
  </Layout>
);

export default WeddingDance;