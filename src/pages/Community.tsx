import { Link } from "react-router-dom";
import { Heart, Music, Users, Sparkles, Star, ArrowRight, Instagram, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import communityImg from "@/assets/community-vibe.jpg";

/* <!-- WIX PAGE: /community -->
   <!-- WIX SECTION: Hero — Full-width Strip with community image + dark overlay -->
   <!-- WIX SECTION: The Vibe — use Card grid (4 columns) -->
   <!-- WIX SECTION: Community Values — use numbered Card grid on dark Strip -->
   <!-- WIX SECTION: A Typical Night — use Timeline/Steps Strip -->
   <!-- WIX SECTION: Student Voices — use Repeater connected to Testimonials collection (community category) -->
   <!-- WIX SECTION: Common Questions — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: Stay Connected — use CTA Strip with social buttons -->
*/
const vibeCards = [
  { icon: <Music size={28} />, title: "The Music", desc: "From classic salsa dura to modern bachata sensual — every night is curated for dancers who feel the rhythm in their bones." },
  { icon: <Users size={28} />, title: "The People", desc: "A beautifully diverse community of creatives, professionals, students and free spirits united by a love of Latin dance." },
  { icon: <Heart size={28} />, title: "The Energy", desc: "No egos, no judgement, no pressure — just pure connection. Every class feels like coming home to your dance family." },
  { icon: <Sparkles size={28} />, title: "The Culture", desc: "We celebrate Latin culture with intention and respect. From Afro-Cuban roots to Dominican bachata, every dance tells a story." },
];

const communityValues = [
  { title: "Everyone Belongs", desc: "Solo dancers, couples, complete beginners — you're welcome exactly as you are. No partner needed, ever." },
  { title: "Growth Over Perfection", desc: "We celebrate progress, not perfection. Your first step matters as much as your thousandth." },
  { title: "Respect & Consent", desc: "A safe, inclusive space where consent and respect are non-negotiable. Always." },
  { title: "Joy First", desc: "We dance because it makes us feel alive. Everything else is secondary." },
];

const Community = () => (
  <Layout>
    <SeoHead
      title="Our Community | Pura Nights Salsa & Bachata | West London"
      description="Join London's most welcoming Latin dance community. Pura Nights brings together dancers of all levels in Chiswick and Ealing for salsa, bachata, friendship and good vibes. No partner needed."
      path="/community"
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Pura Nights Community",
        description: "West London's most welcoming salsa and bachata dance community",
        url: "https://www.puranights.com/community",
        founder: { "@type": "Person", name: "Melitta Siomos" },
        areaServed: "West London",
      }}
    />

    {/* Hero */}
    <section className="relative bg-charcoal text-primary-foreground overflow-hidden">
      <div className="absolute inset-0">
        <img src={communityImg} alt="Pura Nights dance community socializing" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/50" />
      </div>
      <div className="container-main relative z-10 py-24 md:py-32 lg:py-40 text-center">
        <FadeInUp>
          <span className="inline-block font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">More Than a Dance Class</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[0.95]">
            This Is <span className="text-primary">Your</span> Community
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Pura Nights isn't just about learning steps — it's about finding your people. A place where music, movement and connection collide in the most beautiful way.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-base px-8 py-3">🎟 Join Us This Week</a>
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-base px-8 py-3">💬 Say Hello</a>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* The Vibe */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">The Pura Nights Vibe</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">What makes our community different? It's a feeling. The moment you walk in, you know you belong.</p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vibeCards.map((card, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-8 text-center card-hover group h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">{card.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Community Values */}
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">What We Stand For</h2>
          <p className="text-primary-foreground/60 text-center max-w-lg mx-auto mb-12">Our values aren't just words — they're how we show up every single week.</p>
        </FadeInUp>
        <div className="grid sm:grid-cols-2 gap-6">
          {communityValues.map((val, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="border border-primary-foreground/10 rounded-xl p-8 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary font-display text-2xl font-bold">0{i + 1}</span>
                  <h3 className="font-heading font-bold text-lg">{val.title}</h3>
                </div>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{val.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* A Typical Night */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">A Night at Pura Nights</h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">Here's what happens when you join us for the first time — spoiler: you'll want to come back.</p>
        </FadeInUp>
        <div className="space-y-6">
          {[
            { time: "7:15 PM", emoji: "👋", title: "Arrive & Settle In", desc: "Grab a drink, meet the crew. We'll introduce you to everyone and find you a class level that fits." },
            { time: "7:30 PM", emoji: "💃", title: "Class 1 Begins", desc: "Salsa or bachata — you choose. Our instructors break everything down step by step. No rushing, no judgement." },
            { time: "8:15 PM", emoji: "🕺", title: "Class 2", desc: "Switch it up. Try the other dance style, or go deeper into what you started. Partners rotate so you dance with everyone." },
            { time: "9:00 PM", emoji: "🎶", title: "Social Dancing", desc: "The lights dim, the music turns up, and the floor comes alive. This is where the magic happens — just you and the music." },
            { time: "11:00 PM", emoji: "🌙", title: "Wind Down", desc: "Last songs, lingering conversations, plans for next week. You leave with a smile and sore feet — in the best way." },
          ].map((step, i) => (
            <FadeInUp key={i} delay={i * 0.08}>
              <div className="flex gap-6 items-start bg-card rounded-xl p-6 card-hover">
                <div className="text-center flex-shrink-0">
                  <span className="text-3xl">{step.emoji}</span>
                  <p className="text-[10px] font-accent text-muted-foreground mt-1">{step.time}</p>
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* Student Voices */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">In Their Words</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-12">Real quotes from real dancers. This is what community sounds like.</p>
        </FadeInUp>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { quote: "I walked in nervous and alone. I left with ten new friends and couldn't stop smiling.", name: "Sarah K.", tag: "Beginner" },
            { quote: "The energy is unmatched. It's not just dancing — it's therapy, friendship, and pure joy.", name: "James T.", tag: "Improver" },
            { quote: "I've danced at schools across London. Nothing comes close to the warmth of Pura Nights.", name: "Elena M.", tag: "Intermediate" },
          ].map((t, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="bg-background rounded-xl p-6 text-left">
                <div className="flex items-center gap-0.5 text-primary mb-3">
                  {Array(5).fill(0).map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-heading font-semibold text-sm">{t.name}</p>
                  <span className="text-[10px] font-accent text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t.tag}</span>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* Common Questions */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">You Might Be Wondering…</h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-10">Honest answers to the things people ask before their first class.</p>
        </FadeInUp>
        <div className="space-y-4">
          {[
            { q: "Can I come alone?", a: "Absolutely. Most of our students come solo. Partners rotate during class, so you'll dance with everyone and make friends fast." },
            { q: "Will I fit in if I have no experience?", a: "Yes — over half our students started as complete beginners. Our classes are designed so you can walk in with zero experience and leave feeling great." },
            { q: "Is it cliquey?", a: "Not at all. We actively build a culture of openness and warmth. Regulars go out of their way to welcome newcomers." },
            { q: "What kind of people come?", a: "All kinds — ages 20s to 60s, all backgrounds, all professions. What everyone has in common is a love of music, movement, and good energy." },
            { q: "What if I have two left feet?", a: "Then you're exactly who this is for. Everyone starts somewhere. Our instructors break everything down step by step." },
          ].map((item, i) => (
            <FadeInUp key={i} delay={i * 0.06}>
              <details className="group bg-card rounded-xl border border-border">
                <summary className="cursor-pointer p-5 font-heading font-semibold text-sm flex items-center justify-between">
                  {item.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </details>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-charcoal text-primary-foreground text-center">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">Follow us on socials, join the WhatsApp group, or just come say hi at class. You're one step away from your new favourite thing.</p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary/20 px-6 py-3 rounded-xl text-sm font-heading font-semibold transition-colors">
              <Instagram size={18} /> @puranights
            </a>
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary/20 px-6 py-3 rounded-xl text-sm font-heading font-semibold transition-colors">
              <MessageCircle size={18} /> WhatsApp Group
            </a>
            <a href="https://www.instagram.com/melittasiomos/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary/20 px-6 py-3 rounded-xl text-sm font-heading font-semibold transition-colors">
              <Instagram size={18} /> @melittasiomos
            </a>
          </div>
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-base px-10 py-3.5">
            🎟 Book Your First Class <ArrowRight size={16} className="ml-2 inline" />
          </a>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/pura-nights", label: "Weekly Classes" },
      { to: "/about", label: "About Melitta" },
      { to: "/testimonials", label: "Student Reviews" },
      { to: "/start-here", label: "Start Here Guide" },
      { to: "/gallery", label: "Gallery" },
      { to: "/events", label: "Events & Socials" },
    ]} />
  </Layout>
);

export default Community;
