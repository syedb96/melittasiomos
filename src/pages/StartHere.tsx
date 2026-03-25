import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { ChevronRight, MapPin, Clock, CheckCircle } from "lucide-react";
import heroImg from "@/assets/hero-dance.jpg";

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
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">For First-Timers</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Never Danced Before? Start Here.</h1>
          <p className="text-primary-foreground/80 font-heading text-lg max-w-xl mx-auto">Everything you need to know before your first class at Pura Nights</p>
        </div>
      </div>
    </section>

    {/* Do I Need Experience? */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Do I Need Any Experience?</h2>
          <div className="h-1 w-16 bg-primary rounded-full mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-4">Absolutely not. Our Beginners class starts from zero every single week — no prior dance experience, no rhythm, no coordination required. Everything is taught step by step. Most of our most dedicated students started exactly where you are right now.</p>
          <p className="text-muted-foreground leading-relaxed">Melitta Siomos has spent 15+ years helping complete beginners find their feet, their rhythm, and their confidence. You're in safe hands.</p>
        </FadeInUp>
      </div>
    </section>

    {/* Do I Need a Partner? */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Do I Need a Partner?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">No — and most of our students come solo! We rotate partners throughout every class, which means you'll dance with 8–15 different people in a single evening. This is the fastest way to learn, and it's how you'll make friends naturally.</p>
          <p className="text-muted-foreground leading-relaxed">The Pura Nights community is warm, inclusive, and actively welcoming of newcomers. You won't feel awkward — you'll feel at home.</p>
        </FadeInUp>
      </div>
    </section>

    {/* What to Wear */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What Should I Wear?</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3"><CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" /><div><strong className="text-foreground">Shoes:</strong> Flat-soled shoes that let you pivot. Clean trainers are fine for beginners. Avoid thick-soled running shoes. As you progress, Latin dance shoes make a huge difference.</div></div>
            <div className="flex items-start gap-3"><CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" /><div><strong className="text-foreground">Clothes:</strong> Comfortable, breathable clothing you can move in. Bring a spare top — classes are active!</div></div>
            <div className="flex items-start gap-3"><CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" /><div><strong className="text-foreground">Water:</strong> Bring a water bottle. Both venues also have a bar.</div></div>
            <div className="flex items-start gap-3"><CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" /><div><strong className="text-foreground">Attitude:</strong> Leave any pressure to be perfect at the door. The whole point is that nobody knows what they're doing yet!</div></div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Class Levels */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Class Levels Explained</h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            { level: "Beginners", desc: "Start here. Learn the basic step, timing, partner frame, and your first turns. Zero experience needed.", colour: "border-green-500" },
            { level: "Improvers", desc: "You've got the basics. Now we add turn combinations, styling, and start building musicality.", colour: "border-primary" },
            { level: "Intermediate", desc: "Confident social dancer? Refine your technique, advanced patterns, body movement, and performance quality.", colour: "border-peach" },
          ].map((l, i) => (
            <StaggerItem key={i}>
              <div className={`bg-background rounded-2xl p-6 card-hover h-full border-l-4 ${l.colour}`}>
                <h3 className="font-heading font-bold mb-2">{l.level}</h3>
                <p className="text-muted-foreground text-sm">{l.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <p className="text-center text-muted-foreground text-sm mt-6">Not sure? Start with Beginners. Melitta will invite you to move up when you're ready.</p>
      </div>
    </section>

    {/* What Happens at Socials */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">What Happens at the Social?</h2>
          <p className="text-primary-foreground/70 leading-relaxed mb-4">After classes finish at 9 PM, the DJ takes over and the floor opens up. This is where everything clicks — you practise what you've just learned, dance with different partners, watch the more experienced dancers, and simply enjoy the music.</p>
          <p className="text-primary-foreground/70 leading-relaxed mb-4">You don't need to be good to enjoy the social. You just need to be willing to try. Everyone there was a beginner once, and the culture at Pura Nights is to invite, encourage, and support newer dancers.</p>
          <p className="text-primary-foreground/70 leading-relaxed">The social runs until 11 PM. Most students say it's the part they look forward to most.</p>
        </FadeInUp>
      </div>
    </section>

    {/* Chiswick vs Ealing */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Chiswick or Ealing — Which Night?</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInUp delay={0.1}>
            <div className="bg-card rounded-2xl p-6 card-hover border-l-4 border-primary h-full">
              <h3 className="font-display text-xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><Clock size={14} /> 7:15 PM doors · Classes 7:30–9:00 PM · Social until 11 PM</p>
              <p className="text-muted-foreground text-sm leading-relaxed">The original Pura Nights venue. Spacious, vibrant, and well-connected. 5-minute walk from Turnham Green tube.</p>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-card rounded-2xl p-6 card-hover border-l-4 border-peach h-full">
              <h3 className="font-display text-xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><Clock size={14} /> 6:50 PM free styling · Classes 7:30–9:00 PM · Social until 11 PM</p>
              <p className="text-muted-foreground text-sm leading-relaxed">Stunning Victorian venue with a free Ladies Styling warm-up before class. Near West Ealing Elizabeth Line station.</p>
            </div>
          </FadeInUp>
        </div>
        <p className="text-center text-muted-foreground text-sm mt-6">Can't decide? Come to both! Many of our students attend both nights for double the practice.</p>
      </div>
    </section>

    {/* Best First Step */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">Your Best First Step?</h2>
        <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">Just turn up. No booking required for weekly classes. Arrive at 7:15 PM, join the Beginners class, and let the music do the rest.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Class</a>
          <Link to="/pura-nights" className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm">View Full Schedule</Link>
        </div>
      </div>
    </section>
    <RelatedPages title="Next Steps" links={[
      { to: "/pura-nights", label: "Weekly Classes", desc: "Mon Chiswick · Tue Ealing" },
      { to: "/prices", label: "Prices & Bundles", desc: "From £5 per class" },
      { to: "/locations", label: "Locations", desc: "Venue details & directions" },
      { to: "/blog/salsa-vs-bachata", label: "Salsa vs Bachata", desc: "Which to learn first?" },
      { to: "/blog/what-to-wear-salsa-bachata", label: "What to Wear", desc: "Dress code guide" },
      { to: "/faq", label: "FAQ", desc: "Common questions answered" },
      { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 coaching" },
      { to: "/contact", label: "Contact Melitta", desc: "Get in touch" },
    ]} />
  </Layout>
);

export default StartHere;