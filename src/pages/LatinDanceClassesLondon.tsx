import { Link } from "react-router-dom";
import { MapPin, Clock, Music, Users, Star, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pura Nights — Latin Dance Classes London",
  description: "Weekly Latin dance classes in London including Salsa, Bachata, and social dancing. Beginner to advanced levels in West London.",
  url: "https://www.puranights.com/latin-dance-classes-london",
  telephone: "+447449482343",
  address: { "@type": "PostalAddress", streetAddress: "185 Chiswick High Rd", addressLocality: "Chiswick", addressRegion: "London", postalCode: "W4 2DR", addressCountry: "GB" },
  areaServed: ["London", "West London", "Central London", "South West London"],
};

const styles = [
  { icon: Music, title: "Salsa", desc: "Energetic, partner-based dance from Cuba and New York. Learn footwork, turns, and musicality in our structured beginner-to-advanced programme." },
  { icon: Heart, title: "Bachata", desc: "Sensual, rhythmic partner dance from the Dominican Republic. Master body movement, connection, and expression with Bachata UK Champion Melitta Siomos." },
  { icon: Users, title: "Social Dancing", desc: "Every class night ends with open social dancing — 50/50 Salsa and Bachata. Practice what you've learned in a relaxed, supportive environment." },
];

const reasons = [
  { emoji: "🏆", text: "Taught by Bachata UK Champion Melitta Siomos" },
  { emoji: "📍", text: "Two convenient West London venues — Chiswick & Ealing" },
  { emoji: "👥", text: "No partner needed — we rotate so everyone dances" },
  { emoji: "💷", text: "Classes from just £5 per person" },
  { emoji: "🎉", text: "Free social dancing after every class" },
  { emoji: "🌍", text: "Warm, diverse community aged 20–60+" },
];

/* <!-- WIX PAGE: latin-dance-classes-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const LatinDanceClassesLondon = () => (
  <Layout>
    <SeoHead
      title="Latin Dance Classes London | Salsa & Bachata | Pura Nights"
      description="Join London's best Latin dance classes — Salsa and Bachata every Monday and Tuesday in West London. All levels, no partner needed. From £5. Award-winning instruction."
      path="/latin-dance-classes-london"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-primary">Latin Dance Classes London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Latin Dance Classes in London — Salsa & Bachata</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
            Whether you're stepping onto the dance floor for the first time or looking to refine your technique, Pura Nights offers London's most welcoming Latin dance experience. Learn Salsa and Bachata in West London with award-winning instructor Melitta Siomos.
          </p>
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Your First Class</a>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Dance Styles We Teach</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {styles.map((s) => (
            <StaggerItem key={s.title}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full">
                <s.icon size={28} className="text-primary mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Weekly Schedule</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeInUp delay={0.1}>
            <div className="bg-background rounded-2xl p-6 border border-primary/20">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2"><MapPin size={18} className="text-primary" /> Monday — Chiswick</h3>
              <p className="text-muted-foreground text-sm mb-2">The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 7:30–8:15 PM — Salsa Class</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 8:15–9:00 PM — Bachata Class</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 9:00–11:00 PM — Social Dancing</div>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-background rounded-2xl p-6 border border-primary/20">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2"><MapPin size={18} className="text-primary" /> Tuesday — Ealing</h3>
              <p className="text-muted-foreground text-sm mb-2">Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 6:50–7:35 PM — Salsa Class</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 7:35–8:20 PM — Bachata Class</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 8:20–11:00 PM — Social Dancing</div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Why Choose Pura Nights for Latin Dance</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r) => (
            <StaggerItem key={r.text}>
              <div className="bg-card rounded-2xl p-5 card-hover flex items-start gap-3">
                <span className="text-xl">{r.emoji}</span>
                <p className="text-sm font-heading">{r.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Latin Dance in London — What to Expect</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>London has one of the most vibrant Latin dance scenes in the world, with social nights, congresses, and festivals running throughout the year. At Pura Nights, we focus on building a strong foundation in both Salsa and Bachata so you can dance confidently anywhere — from our weekly socials to international festivals.</p>
            <p>Our classes are structured into Beginner, Improver, and Intermediate levels. Each class builds progressively, introducing new patterns, techniques, and musicality concepts week by week. You'll learn lead-and-follow connection, body movement, footwork, and styling — all in a supportive environment where questions are encouraged.</p>
            <p>Latin dance is more than just steps — it's a community. Many of our students have formed lasting friendships, joined our Pura Ladies performance team, and even travelled to international dance festivals together. Whether you're looking for fitness, fun, or a new social circle, Latin dance delivers all three.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Start Your Latin Dance Journey</h2>
        <p className="text-primary-foreground/80 mb-8">No partner needed. No experience required. Just bring yourself.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book Your First Class</a>
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/start-here", label: "Complete Beginner? Start Here" },
    ]} />
  </Layout>
);

export default LatinDanceClassesLondon;
