import { Link } from "react-router-dom";
import { Trophy, Globe, Users, Calendar, Star, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const schema = {
  "@context": "https://schema.org",
  "@type": "PerformingGroup",
  name: "Pura Ladies — Bachata Performance Team London",
  description: "London's premier all-female Bachata performance team, founded by Bachata UK Champion Melitta Siomos. Performing at international Latin dance festivals.",
  founder: { "@type": "Person", name: "Melitta Siomos" },
  location: { "@type": "City", name: "London" },
};

const highlights = [
  { icon: Trophy, title: "Award-Winning", desc: "Founded by Bachata UK Champion Melitta Siomos, bringing competitive excellence to every performance." },
  { icon: Globe, title: "International Reach", desc: "Teams in London, Plymouth, Munich, and Lisbon. Performances at major congresses across Europe." },
  { icon: Users, title: "Inclusive Community", desc: "All body types, ages, and backgrounds welcome. What matters is passion, commitment, and team spirit." },
  { icon: Calendar, title: "Annual Auditions", desc: "Auditions held each year with intake in February. Follow @puraladies for announcements." },
];

const festivals = [
  "London Bachata Festival", "Bristol Bachata Festival", "Plymouth Salsa Congress",
  "Munich Bachata Festival", "Lisbon Kizomba Festival", "UK Congress",
  "European Latin Dance events", "Charity gala performances"
];

/* <!-- WIX PAGE: bachata-performance-team-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const BachataPerformanceTeamLondon = () => (
  <Layout>
    <SeoHead
      title="Bachata Performance Team London | Pura Ladies by Melitta Siomos"
      description="Join Pura Ladies — London's leading all-female Bachata performance team. Founded by Bachata UK Champion Melitta Siomos. Teams in 4 countries, performing at international festivals."
      path="/bachata-performance-team-london"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/pura-ladies" className="hover:text-primary">Pura Ladies</Link> / <span className="text-primary">Performance Team London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Bachata Performance Team in London</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
            Pura Ladies is more than a dance team — it's a movement. Founded in 2017 by Bachata UK Champion Melitta Siomos, our all-female performance company has grown from a small London rehearsal group into an international collective with teams in four countries, performing at the biggest Latin dance festivals in Europe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">📲 Follow @puraladies</a>
            <Link to="/contact" className="btn-cta-dark">Enquire About Auditions</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">What Makes Pura Ladies Special</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6">
          {highlights.map((h) => (
            <StaggerItem key={h.title}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full">
                <h.icon size={28} className="text-primary mb-4" />
                <h3 className="font-heading font-bold mb-2">{h.title}</h3>
                <p className="text-muted-foreground text-sm">{h.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Where We Perform</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <p className="text-muted-foreground text-sm mb-6">Pura Ladies have graced stages at festivals and events across the UK and Europe:</p>
          <div className="flex flex-wrap gap-3">
            {festivals.map((f) => (
              <span key={f} className="bg-background rounded-full px-4 py-2 text-sm font-heading border border-border">{f}</span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">How to Join</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-3 gap-6 mb-8">
          {[
            { step: "1", title: "Build Your Foundation", desc: "Attend Pura Nights weekly classes to develop your Salsa and Bachata technique." },
            { step: "2", title: "Express Interest", desc: "Speak to Melitta directly or DM @puraladies on Instagram." },
            { step: "3", title: "Audition", desc: "Annual auditions are held in February. All body types and ages welcome." },
          ].map((s) => (
            <StaggerItem key={s.step}>
              <div className="bg-card rounded-2xl p-6 card-hover text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold mx-auto mb-3">{s.step}</div>
                <h3 className="font-heading font-bold text-sm mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-xs">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">The Sisterhood</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>What sets Pura Ladies apart from other performance teams is the depth of connection between members. This isn't a group that rehearses together and goes home — it's a family. Members travel together, celebrate together, and support each other through life's ups and downs.</p>
            <p>Some of the founding members from 2017 are still actively performing with the team today. New members are welcomed warmly and mentored by experienced dancers, creating a culture of growth, encouragement, and shared ambition.</p>
            <p>If you're looking for more than just dance — if you want purpose, community, and a stage — Pura Ladies is your home.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Be Part of Something Bigger</h2>
        <p className="text-primary-foreground/80 mb-8">Follow @puraladies for audition dates, performance clips, and team updates.</p>
        <a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">📲 Follow @puraladies</a>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/pura-ladies", label: "About Pura Ladies" },
      { to: "/ladies-styling-london", label: "Ladies Styling London" },
      { to: "/blog/pura-ladies-story", label: "The Pura Ladies Story" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/gallery", label: "Gallery & Videos" },
      { to: "/about", label: "About Melitta" },
    ]} />
  </Layout>
);

export default BachataPerformanceTeamLondon;
