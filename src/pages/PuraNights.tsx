import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import ProofBlock from "@/components/ProofBlock";
import { Link } from "react-router-dom";
import { MapPin, Clock, ChevronRight, ExternalLink } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import socialImg from "@/assets/social-dancing.jpg";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

/* <!-- WIX PAGE: /pura-nights -->
   <!-- WIX SECTION: Hero — Full-width Strip with social dancing image + dark overlay -->
   <!-- WIX SECTION: Venue Cards — use 2-column Card grid with venue details -->
   <!-- WIX SECTION: How the Evening Works — use Steps/Timeline Strip -->
   <!-- WIX SECTION: Three Levels — use 3-column Card grid or comparison table -->
   <!-- WIX SECTION: Latin Fridays — use CTA Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app -->
   <!-- WIX SECTION: Testimonials — use Slider connected to Testimonials collection -->
   <!-- WIX SECTION: CTA Band — use Full-width Strip -->
*/
const PuraNights = () => (
  <Layout>
    <SeoHead
      title="Pura Nights | Salsa & Bachata Classes Chiswick & Ealing | Every Monday & Tuesday"
      description="Pura Nights by Melitta Siomos — London's best weekly Salsa & Bachata classes in Chiswick (Mondays) and Ealing (Tuesdays). All levels welcome, no partner needed. From £10."
      path="/pura-nights"
    />
    {/* NOTE: Event JSON-LD intentionally removed. /pura-nights describes recurring weekly
        classes across two venues — Google's Event rich result is intended for single-event
        pages with a unique URL and ISO-8601 startDate. Keep Event schema only on
        /events or specific event-instance pages. Falls back to global DanceSchool schema. */}

    {/* Hero */}
    <section className="relative h-80 md:h-[28rem] overflow-hidden">
      <img src={socialImg} alt="Pura Nights salsa bachata social dancing London" className="w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">Pura Nights — Salsa & Bachata Every Week in West London</h1>
          <p className="font-heading text-primary-foreground/80 text-lg mb-6 max-w-2xl mx-auto">Monday Chiswick · Tuesday Ealing · No partner needed · All levels</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class →</a>
            <Link to="/prices" className="btn-cta-ghost text-sm">See Prices →</Link>
          </div>
        </div>
      </div>
    </section>

    {/* THE TWO VENUES */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">The Two Venues</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FadeInUp delay={0.1}>
            <div className="bg-card rounded-2xl p-8 card-hover border-l-4 border-primary h-full">
              <h3 className="font-display text-2xl font-bold text-primary mb-2">Chiswick — Monday Nights</h3>
              <div className="flex items-start gap-2 mb-1">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-sm">The George IV, 185 Chiswick High Rd, W4 2DR</p>
                  <p className="text-muted-foreground text-xs mt-0.5">(5 min walk from Turnham Green Tube, District Line)</p>
                </div>
              </div>
              <div className="space-y-2 text-sm my-5">
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>7:30pm — Beginners Salsa & Bachata</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>8:00pm — Improvers Salsa & Bachata</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>8:30pm — Intermediate+ Salsa & Bachata</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>9:00pm–11:00pm — Social Dancing</span></div>
              </div>
              <p className="text-muted-foreground text-xs mb-5">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://maps.google.com/?q=The+George+IV,+185+Chiswick+High+Rd,+London+W4+2DR" target="_blank" rel="noopener noreferrer" className="text-primary text-xs font-heading font-semibold inline-flex items-center gap-1 hover:underline">Get Directions <ExternalLink size={11} /></a>
                <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs py-2 px-5">Book Now →</a>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-card rounded-2xl p-8 card-hover border-l-4 border-peach h-full">
              <h3 className="font-display text-2xl font-bold text-peach mb-2">Ealing — Tuesday Nights</h3>
              <div className="flex items-start gap-2 mb-1">
                <MapPin size={16} className="text-peach flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-sm">The Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
                  <p className="text-muted-foreground text-xs mt-0.5">(10 min walk from West Ealing Station, Elizabeth Line)</p>
                </div>
              </div>
              <div className="space-y-2 text-sm my-5">
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span className="font-semibold">6:50pm — FREE Ladies Styling Warm-Up</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>7:30pm — Beginners Salsa & Bachata</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>8:00pm — Improvers Salsa & Bachata</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>8:30pm — Intermediate+ Salsa & Bachata</span></div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" /><span>9:00pm–11:00pm — Social Dancing</span></div>
              </div>
              <p className="text-muted-foreground text-xs mb-5">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://maps.google.com/?q=Drayton+Court+Hotel,+2+The+Avenue,+Ealing,+London+W13+8PH" target="_blank" rel="noopener noreferrer" className="text-peach text-xs font-heading font-semibold inline-flex items-center gap-1 hover:underline">Get Directions <ExternalLink size={11} /></a>
                <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta text-xs py-2 px-5 bg-peach text-charcoal font-semibold hover:opacity-90 rounded-xl">Book Now →</a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* HOW THE EVENING WORKS */}
    <section className="section-padding section-dark">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-3">How the Evening Works</h2>
          <p className="text-primary-foreground/50 text-center text-sm mb-12 max-w-xl mx-auto">Five simple steps — no stress, no prep, no pressure.</p>
        </FadeInUp>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
          {[
            { num: "1", title: "ARRIVE", desc: "Just turn up. No partner, no booking, no experience required." },
            { num: "2", title: "WARM UP", desc: "Free ladies styling warm-up (Ealing) or hit the social floor early (Chiswick)." },
            { num: "3", title: "LEARN", desc: "Choose your level: Beginners / Improvers / Intermediate." },
            { num: "4", title: "SOCIAL", desc: "After classes, 2 hours of social dancing with everyone." },
            { num: "5", title: "IMPROVE", desc: "Come back next week. Progress is fast when you're consistent." },
          ].map((s, i) => (
            <StaggerItem key={i}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="font-display text-lg font-bold text-primary">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-primary-foreground mb-1">{s.title}</h3>
                <p className="text-primary-foreground/50 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* THREE LEVELS EXPLAINED */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Three Levels Explained</h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            { level: "Beginners", desc: "From zero. Basic step, first partner moves, timing, frame.", quote: "Never danced before? This is where you start.", colour: "border-secondary" },
            { level: "Improvers", desc: "You know the basics. Building combinations, turns, musicality.", quote: "Been a few times? This is where it starts to click.", colour: "border-primary" },
            { level: "Intermediate+", desc: "Confident social dancer. Complex combinations, advanced styling.", quote: "Ready to push your dancing further.", colour: "border-peach" },
          ].map((l, i) => (
            <StaggerItem key={i}>
              <div className={`bg-background rounded-2xl p-6 card-hover h-full border-l-4 ${l.colour}`}>
                <h3 className="font-heading font-bold mb-2">{l.level}</h3>
                <p className="text-muted-foreground text-sm mb-3">{l.desc}</p>
                <p className="text-muted-foreground text-xs italic">"{l.quote}"</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <p className="text-center text-muted-foreground text-sm mt-6">Not sure which level? Come to Beginners — Melitta will guide you.</p>
      </div>
    </section>

    {/* MONTHLY LATIN FRIDAYS */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl text-center">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Once a Month</p>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Monthly Latin Fridays</h2>
          <p className="text-primary-foreground/60 mb-6 leading-relaxed">Once a month, Pura Nights goes all out. Live DJ, guest workshops, Pura Ladies performances, and a packed dance floor at the Drayton Court Hotel in Ealing.</p>
          <div className="bg-charcoal-light rounded-2xl p-6 text-left mb-6 border border-primary-foreground/5">
            <div className="grid grid-cols-3 gap-4 text-xs text-primary-foreground/70">
              <div><p className="text-primary font-heading font-bold mb-1">Early Bird</p><p>£15 class+party</p><p>£10 party only</p></div>
              <div><p className="text-primary font-heading font-bold mb-1">Standard</p><p>£17 class+party</p><p>£12 party only</p></div>
              <div><p className="text-primary font-heading font-bold mb-1">Door</p><p>£20 class+party</p><p>£15 party only</p></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Get Tickets →</a>
            <Link to="/events" className="btn-cta-ghost text-sm">See Upcoming Dates →</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        {[
          { q: "Do I need to book in advance?", a: "No — just turn up on the night. No booking required for weekly classes." },
          { q: "Do I need to bring a partner?", a: "Absolutely not. We rotate partners throughout every class." },
          { q: "I've never danced before. Can I really join?", a: "Yes. The Beginners class starts from zero every week." },
          { q: "What should I wear?", a: "Comfortable clothes and flat-soled shoes. No high heels or open-toed shoes for your first class." },
          { q: "Can I come to the social even if I don't take a class?", a: "Yes — £5 for social only at either venue." },
          { q: "I took a class a couple of years ago. Which level should I join?", a: "Join Beginners to warm up and remind yourself of the basics, then see how you feel. Melitta will guide you to the right level." },
        ].map((faq, i) => (
          <details key={i} className="border-b border-border py-4 group">
            <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{faq.a}</p>
          </details>
        ))}
        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary font-heading font-semibold text-sm hover:underline">View All FAQs →</Link>
        </div>
      </div>
    </section>

    <ProofBlock
      categories={["beginner", "community", "group"]}
      eyebrow="Real Reviews"
      title="What students say about weekly classes"
      limit={3}
    />

    <RelatedPages title="Related Pages" links={[
      { to: "/prices", label: "Prices & Bundles" },
      { to: "/events", label: "Monthly Events" },
      { to: "/blog/beginners-guide-salsa-bachata-london", label: "Beginner's Guide" },
      { to: "/locations", label: "Locations & Directions" },
    ]} />

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Ready to Start Dancing?</h2>
        <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">All levels welcome. No partner needed. Just turn up.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your First Class</a>
          <Link to="/prices" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm">View All Pricing</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default PuraNights;
