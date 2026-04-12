import { Link } from "react-router-dom";
import { Sparkles, Users, Heart, Music, Star, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImg from "@/assets/ladies-styling.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ladies Styling Classes London — Pura Ladies",
  description: "Ladies styling and Bachata body movement classes in London. Join Pura Ladies, the internationally recognised women's dance company by Melitta Siomos.",
  provider: { "@type": "Organization", name: "Pura Ladies" },
  areaServed: { "@type": "City", name: "London" },
};

const pillars = [
  { icon: Sparkles, title: "Body Movement", desc: "Master isolations, waves, and fluid body rolls that bring your social dancing to life. Learn to move with confidence and control." },
  { icon: Music, title: "Musicality & Expression", desc: "Understand the music on a deeper level — accents, breaks, and emotional phrasing that make your styling uniquely yours." },
  { icon: Heart, title: "Confidence & Femininity", desc: "Ladies styling is about owning your space on the dance floor. Build presence, grace, and the confidence to express yourself fully." },
  { icon: Users, title: "Choreography & Performance", desc: "Learn team formations, stage presence, and performance-ready routines. Progress from social styling to show-stopping group choreography." },
];

const teams = [
  { flag: "🇬🇧", city: "London", groups: "Multiple groups at different levels" },
  { flag: "🇬🇧", city: "Plymouth", groups: "South West England chapter" },
  { flag: "🇩🇪", city: "Munich", groups: "German chapter" },
  { flag: "🇵🇹", city: "Lisbon", groups: "Portuguese chapter" },
];

/* <!-- WIX PAGE: ladies-styling-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const LadiesStylingLondon = () => (
  <Layout>
    <SeoHead
      title="Ladies Styling London | Bachata Body Movement | Pura Ladies"
      description="Join ladies styling and Bachata body movement classes in London with Pura Ladies. Build confidence, learn choreography, and perform at international festivals. Founded by Melitta Siomos."
      path="/ladies-styling-london"
      schema={schema}
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Pura Ladies performance team on stage" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-primary">Ladies Styling London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Ladies Styling Classes in London</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
            Elevate your dancing with dedicated ladies styling training. Pura Ladies — founded by Melitta Siomos in 2017 — is London's premier women's Latin dance company, offering body movement classes, choreography workshops, and a clear pathway from social dancer to international performer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">📲 Follow @puraladies</a>
            <Link to="/pura-ladies" className="btn-cta-dark">About Pura Ladies</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">What You'll Learn</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full">
                <p.icon size={28} className="text-primary mb-4" />
                <h3 className="font-heading font-bold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">The Pura Ladies Journey</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
          <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>Pura Ladies started with a small group of women in West London who wanted more than social dancing — they wanted to perform, to push their limits, and to be part of something bigger. Since 2017, the company has grown into an international movement with teams in four countries and performances at major Latin dance congresses across Europe.</p>
            <p>The journey begins at Pura Nights weekly classes, where you build your Salsa and Bachata foundation. From there, you can join ladies styling workshops to develop body movement, isolations, and performance technique. When you're ready, auditions for Pura Ladies are held annually — and the team welcomes all body types, ages, and backgrounds.</p>
            <p>Some of the original 2017 members are still in the team today. That tells you everything about the sisterhood, commitment, and joy that defines Pura Ladies.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-2">Pura Ladies Worldwide</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teams.map((t) => (
            <StaggerItem key={t.city}>
              <div className="bg-card rounded-2xl p-6 card-hover text-center">
                <span className="text-4xl block mb-3">{t.flag}</span>
                <h3 className="font-heading font-bold mb-1">{t.city}</h3>
                <p className="text-muted-foreground text-xs">{t.groups}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Ready to Elevate Your Dance?</h2>
        <p className="text-primary-foreground/80 mb-8">Follow @puraladies for audition announcements and workshop dates.</p>
        <a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">📲 Follow @puraladies</a>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/pura-ladies", label: "About Pura Ladies" },
      { to: "/blog/pura-ladies-story", label: "The Pura Ladies Story" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/private-lessons", label: "Private Lessons" },
      { to: "/gallery", label: "Gallery & Performances" },
      { to: "/testimonials", label: "Member Stories" },
    ]} />
  </Layout>
);

export default LadiesStylingLondon;
