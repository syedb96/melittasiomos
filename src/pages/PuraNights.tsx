import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import { MapPin, Clock, Users, Star, CheckCircle, ChevronRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import socialImg from "@/assets/social-dancing.jpg";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const PuraNights = () => (
  <Layout>
    <SeoHead
      title="Pura Nights | Salsa & Bachata Classes Chiswick & Ealing | Every Monday & Tuesday"
      description="Pura Nights by Melitta Siomos — London's best weekly Salsa & Bachata classes in Chiswick (Mondays) and Ealing (Tuesdays). All levels welcome, no partner needed. From £10."
      path="/pura-nights"
      schema={{
        "@context": "https://schema.org",
        "@type": "Event",
        name: "Pura Nights Weekly Salsa & Bachata Classes",
        description: "Weekly salsa and bachata classes in Chiswick and Ealing with award-winning instructor Melitta Siomos.",
        eventSchedule: [
          { "@type": "Schedule", repeatFrequency: "P1W", byDay: "Monday", startTime: "19:30", endTime: "23:00" },
          { "@type": "Schedule", repeatFrequency: "P1W", byDay: "Tuesday", startTime: "18:50", endTime: "23:00" },
        ],
        location: [
          { "@type": "Place", name: "The George IV", address: { "@type": "PostalAddress", streetAddress: "185 Chiswick High Rd", addressLocality: "Chiswick", postalCode: "W4 2DR", addressCountry: "GB" } },
          { "@type": "Place", name: "Drayton Court Hotel", address: { "@type": "PostalAddress", streetAddress: "2 The Avenue", addressLocality: "West Ealing", postalCode: "W13 8PH", addressCountry: "GB" } },
        ],
        organizer: { "@type": "Organization", name: "Melitta Siomos Dance Academy" },
        offers: { "@type": "Offer", price: "10", priceCurrency: "GBP", availability: "https://schema.org/InStock" },
      }}
    />

    {/* Hero */}
    <section className="relative h-80 md:h-[28rem] overflow-hidden">
      <img src={socialImg} alt="Pura Nights salsa bachata social dancing London" className="w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Every Monday & Tuesday in West London</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">Pura Nights — Weekly Salsa & Bachata Classes</h1>
          <p className="font-heading text-primary-foreground/80 text-lg mb-6 max-w-2xl mx-auto">Three levels every evening. Social dancing until 11 PM. No partner needed. All levels welcome.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class</a>
            <Link to="/prices" className="btn-cta-ghost text-sm">View Pricing</Link>
          </div>
        </div>
      </div>
    </section>

    {/* Schedule Cards */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">Two Venues, Two Nights</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Weekly Class Schedule</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Monday */}
          <FadeInUp delay={0.1}>
            <div className="bg-card rounded-2xl p-8 card-hover border-l-4 border-primary">
              <h3 className="font-display text-2xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <div className="flex items-start gap-2 mb-4">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-sm">The George IV</p>
                  <p className="text-muted-foreground text-xs">185 Chiswick High Rd, London W4 2DR</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Nearest tube: Turnham Green (District Line) · Buses: 190, 237, 267</p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm mb-5">
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>7:15 PM — Doors Open</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>7:30 PM — Beginners Salsa & Bachata</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>8:00 PM — Improvers</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>8:30 PM — Intermediate</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>9:00–11:00 PM — Social Dancing</span></div>
              </div>
              <p className="text-muted-foreground text-xs mb-5">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs py-2.5 px-6">Book Monday</a>
            </div>
          </FadeInUp>
          {/* Tuesday */}
          <FadeInUp delay={0.2}>
            <div className="bg-card rounded-2xl p-8 card-hover border-l-4 border-peach">
              <h3 className="font-display text-2xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <div className="flex items-start gap-2 mb-4">
                <MapPin size={16} className="text-peach flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-sm">Drayton Court Hotel</p>
                  <p className="text-muted-foreground text-xs">2 The Avenue, West Ealing, London W13 8PH</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Nearest station: West Ealing (Elizabeth Line) · Buses: 83, 207, E1</p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm mb-5">
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>6:50–7:20 PM — Free Ladies Styling</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>7:30 PM — Beginners Salsa & Bachata</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>8:00 PM — Improvers</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>8:30 PM — Intermediate</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>9:00–11:00 PM — Social Dancing</span></div>
              </div>
              <p className="text-muted-foreground text-xs mb-5">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta text-xs py-2.5 px-6 bg-peach text-charcoal font-semibold hover:opacity-90 rounded-xl">Book Tuesday</a>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* Which Level Are You? */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-3">Which Level Are You?</h2>
          <p className="text-muted-foreground text-center text-sm mb-10 max-w-xl mx-auto">Not sure where to start? Here's what each level covers. If in doubt, start with Beginners — Melitta will guide you up when you're ready.</p>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            { level: "Beginners", desc: "Never danced before? Start here. Learn the basic step, timing, partner connection and your first turns. Zero experience assumed.", colour: "text-green-600" },
            { level: "Improvers", desc: "You know the basic step and a few turns. Now we build combinations, introduce styling, and develop your musicality and floor awareness.", colour: "text-primary" },
            { level: "Intermediate", desc: "Confident social dancer looking to refine technique, learn advanced turn patterns, body movement, and performance-quality execution.", colour: "text-peach" },
          ].map((l, i) => (
            <StaggerItem key={i}>
              <div className="bg-background rounded-2xl p-6 card-hover h-full">
                <h3 className={`font-heading font-bold mb-2 ${l.colour}`}>{l.level}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{l.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* What Happens at a Typical Class */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-3">What Happens at a Typical Pura Night</h2>
          <p className="text-primary-foreground/50 text-center text-sm mb-12 max-w-xl mx-auto">Here's how a typical evening flows — whether you're a first-timer or a regular.</p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
          {[
            { emoji: "🚪", title: "7:15 PM — Arrive", desc: "Doors open. Grab a drink, settle in, meet other dancers. No stress." },
            { emoji: "🎓", title: "7:30 PM — Classes", desc: "Three levels run simultaneously. Melitta and team teach structured lessons with partner rotation." },
            { emoji: "💃", title: "9:00 PM — Social", desc: "The DJ takes over. Practice what you learned, dance with everyone, enjoy the atmosphere." },
            { emoji: "🌟", title: "11:00 PM — Home", desc: "Head home buzzing. Come back next week — that's when the magic compounds." },
          ].map((s, i) => (
            <StaggerItem key={i}>
              <div className="text-center">
                <div className="text-4xl mb-3">{s.emoji}</div>
                <h3 className="font-heading font-bold text-sm text-primary-foreground mb-1">{s.title}</h3>
                <p className="text-primary-foreground/60 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* What to Wear */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What Should I Wear?</h2>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
            <p><strong className="text-foreground">Shoes:</strong> Flat-soled shoes that allow you to pivot easily. Clean trainers work well for beginners. Avoid thick-soled running shoes. As you progress, Latin dance shoes with a suede sole make turning dramatically easier.</p>
            <p><strong className="text-foreground">Clothes:</strong> Comfortable, breathable clothing you can move in. Many regulars bring a spare top for the social — classes are active!</p>
            <p><strong className="text-foreground">Water:</strong> Bring a water bottle. Both venues also have a bar.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Can I Come Alone? */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Can I Come Alone?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">Absolutely — and most of our students do! We rotate partners throughout every class, which means you'll dance with 8–15 different people in a single evening. This is deliberately designed to accelerate your learning and help you connect with the community naturally.</p>
          <p className="text-muted-foreground text-sm leading-relaxed">Many of our most dedicated regulars arrived solo and now consider Pura Nights their second family. The atmosphere is warm, inclusive, and actively welcoming of newcomers. You don't need to bring a partner — you just need to bring yourself.</p>
        </FadeInUp>
      </div>
    </section>

    {/* Why Chiswick & Ealing */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Why Chiswick & Ealing?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">West London has always been one of the city's most culturally rich areas, and the Latin dance community here is thriving. Our two venues — The George IV in Chiswick and the Drayton Court Hotel in Ealing — were chosen for their accessibility, atmosphere, and capacity to hold our growing community.</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">Dancers travel from across London to Pura Nights: from Hammersmith, Acton, Shepherd's Bush, Brentford, Kew, Richmond, and even Central London. Both venues are well-connected by tube, bus, and rail, with street parking available after 6:30 PM.</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {["Chiswick", "Ealing", "Acton", "Hammersmith", "Shepherd's Bush", "Brentford", "Kew", "Richmond", "West London"].map(area => (
              <span key={area} className="text-xs font-accent bg-primary/10 text-primary px-3 py-1 rounded-full">{area}</span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-card">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-8">What Our Students Say</h2>
        </FadeInUp>
        <TestimonialsCarousel />
        <FadeInUp delay={0.2} className="text-center mt-6">
          <Link to="/testimonials" className="text-primary font-heading text-sm font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-1">
            Read All Testimonials <ChevronRight size={14} />
          </Link>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-8">Class FAQs</h2>
        {[
          { q: "Do I need to bring a partner?", a: "No! Many dancers come solo. We rotate partners throughout the class so you'll dance with lots of different people." },
          { q: "Do I need to book in advance?", a: "No booking is required for weekly group classes — just turn up. You can also pre-book via our Linktree for guaranteed entry on busy weeks." },
          { q: "What if I have two left feet?", a: "Perfect — that's exactly who Beginners class is designed for. Most of our students started with zero dance experience. Rhythm is a skill, not a gift." },
          { q: "Can I just come for the social dancing?", a: "Experienced dancers are welcome to join the social from 9 PM (£5). We recommend taking the classes first to build your technique." },
          { q: "How do I progress to the next level?", a: "Melitta and the team will invite you to move up when you're ready. There's no pressure — everyone progresses at their own pace." },
        ].map((faq, i) => (
          <details key={i} className="border-b border-primary-foreground/10 py-4 group">
            <summary className="font-heading font-semibold cursor-pointer text-primary-foreground/90 hover:text-primary transition-colors">{faq.q}</summary>
            <p className="text-primary-foreground/60 text-sm mt-2 leading-relaxed">{faq.a}</p>
          </details>
        ))}
        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary font-heading font-semibold text-sm hover:underline">View All FAQs →</Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Ready to Start Dancing?</h2>
        <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">All levels welcome. No partner needed. Just turn up and let the music move you.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your First Class</a>
          <Link to="/prices" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm">View All Pricing</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default PuraNights;