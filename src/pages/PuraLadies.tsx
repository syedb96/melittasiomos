import { Link } from "react-router-dom";
import RelatedPages from "@/components/RelatedPages";
import ProofBlock from "@/components/ProofBlock";
import RealProofSlot from "@/components/RealProofSlot";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import puraLadiesImg from "@/assets/pura-ladies.jpg";

const teams = [
  { flag: "🇬🇧", city: "London", desc: "Multiple groups at different levels — the home of Pura Ladies" },
  { flag: "🇬🇧", city: "Plymouth", desc: "South West England's leading ladies styling team" },
  { flag: "🇩🇪", city: "Munich", desc: "Bringing Pura Ladies energy to Germany" },
  { flag: "🇵🇹", city: "Lisbon", desc: "Our newest international chapter" },
];

const lookFor = [
  { emoji: "🎯", text: "Passion for Latin dance" },
  { emoji: "🤝", text: "Team spirit and commitment" },
  { emoji: "💃", text: "Dance experience (improvers level minimum)" },
  { emoji: "⏰", text: "Availability for weekly rehearsals" },
];

/* <!-- WIX PAGE: /pura-ladies -->
   <!-- WIX SECTION: Hero — Full-width Strip with performance image -->
   <!-- WIX SECTION: Teams — Card grid connected to Team Members collection -->
   <!-- WIX SECTION: What We Look For — icon list Strip -->
   <!-- WIX SECTION: Audition CTA — CTA Strip -->
   <!-- WIX: Use Repeater connected to Team Members collection (filter: Pura Ladies) -->
*/
const PuraLadies = () => (
  <Layout>
    <SeoHead title="Pura Ladies | Bachata Performance Team London | Melitta Siomos" description="Join Pura Ladies — the all-female Bachata performance team founded by Melitta Siomos in 2017. Teams in London, Plymouth, Munich & Lisbon. Perform at festivals worldwide." path="/pura-ladies" />

    {/* Hero */}
    <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
      <img src={puraLadiesImg} alt="Pura Ladies bachata performance team" className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Pura Ladies — The Dance Company</h1>
          <p className="text-primary-foreground/80 font-heading text-lg max-w-2xl mx-auto">An elite women's styling and performance team. 7 groups. 4 countries. One community.</p>
        </div>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">What is Pura Ladies?</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-4">Founded by Melitta Siomos in London in 2017, Pura Ladies is an internationally recognised ladies styling and performance company. We bring together passionate Bachata and Salsa dancers across London, Plymouth, Munich, and Lisbon.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Our teams perform at major Latin events across Europe and represent the pinnacle of female expression in social dance. Pura Ladies is not just a performance team — it is a community of women who support, inspire, and elevate each other through the art of dance.</p>
          <p className="text-muted-foreground leading-relaxed">Some of our original team members from 2017 are still in the team today — that's how strong our sisterhood runs.</p>
        </FadeInUp>
      </div>
    </section>

    {/* Teams */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-2">Teams & Locations</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teams.map((t) => (
            <StaggerItem key={t.city}>
              <div className="bg-background rounded-2xl p-6 card-hover text-center h-full">
                <span className="text-4xl block mb-3">{t.flag}</span>
                <h3 className="font-heading font-bold mb-1">{t.city}</h3>
                <p className="text-muted-foreground text-xs">{t.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Video */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">Watch Us Perform</h2>
          <div className="aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/a3OhiTw8Svw"
              title="Pura Ladies — Bachata Lady Styling by Melitta Siomos"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" className="text-primary font-heading text-sm mt-4 inline-block hover:underline">Subscribe on YouTube →</a>
        </FadeInUp>
      </div>
    </section>

    {/* v7.1 audit — Your Dance Journey progression pathway */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-2">Your Dance Journey with Pura Nights</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10" />
        </FadeInUp>
        <div className="relative">
          <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-primary/30" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: "1", title: "ARRIVE", desc: "Join Pura Nights — any Monday or Tuesday, any level" },
              { step: "2", title: "LEARN", desc: "Build foundations in Beginners, grow through Improvers and Intermediate classes" },
              { step: "3", title: "STYLE", desc: "Join the free Ladies Styling Warm-Up every Tuesday in Ealing" },
              { step: "4", title: "PERFORM", desc: "Audition for Pura Ladies — perform at events across London and Europe" },
            ].map((s, i) => (
              <FadeInUp key={s.step} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center font-display font-bold text-charcoal mb-3 relative z-10" style={{ background: 'var(--gradient-gold)' }}>
                    {s.step}
                  </div>
                  <h3 className="font-heading font-bold text-sm mb-2 text-primary tracking-wider">{s.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
        <FadeInUp delay={0.5} className="text-center mt-10">
          <p className="text-muted-foreground text-sm italic mb-6">Most Pura Ladies members started as complete beginners. This is your path.</p>
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Start Your Journey →</a>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Join Pura Ladies — Auditions</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <p className="text-muted-foreground mb-8">Next auditions: February — follow @puraladies on Instagram to be notified.</p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h3 className="font-heading font-bold mb-4">What we look for:</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {lookFor.map((l) => (
              <div key={l.text} className="bg-card rounded-2xl p-4 card-hover flex items-center gap-3 text-sm">
                <span className="text-xl">{l.emoji}</span>{l.text}
              </div>
            ))}
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-3 gap-6 mb-10">
          {[
            { step: "1", title: "Attend Classes", desc: "Build your foundation at regular Pura Nights classes" },
            { step: "2", title: "Express Interest", desc: "Speak to Melitta directly or join our WhatsApp group" },
            { step: "3", title: "Audition", desc: "Assessment for the next intake — all body types and ages welcome" },
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">📲 Follow @puraladies</a>
          <Link to="/contact" className="btn-cta-dark text-sm">📧 Enquire About Joining</Link>
        </div>
      </div>
    </section>

    <ProofBlock
      categories={["pura-ladies"]}
      eyebrow="Team Voices"
      title="Why dancers stay with Pura Ladies"
      limit={3}
      variant="dark"
    />

    {/* Real-proof visual slot — Pura Ladies team proof */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-md">
        <RealProofSlot
          variant="story"
          purpose="Pura Ladies Performance / Rehearsal Proof"
          replacementLabel="To replace · real team performance still"
          idealSubject="A clean, well-lit performance still or polished rehearsal photo of the London Pura Ladies team in formation (matching outfits, sharp arms). Pull from existing performance footage or commission a 30-min photo session."
          cropRatio="4:5"
          altText="Pura Ladies bachata performance team in formation during a London showcase"
          caption="Honest placeholder · awaiting performance still from latest London showcase."
        />
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/blog/pura-ladies-story", label: "The Pura Ladies Story", desc: "How one dream became a global community" },
      { to: "/proof-centre", label: "Proof Centre", desc: "Reviews, awards & credentials" },
      { to: "/pura-nights", label: "Weekly Classes", desc: "Build your foundation at Pura Nights" },
      { to: "/private-lessons", label: "Private Lessons", desc: "Fast-track your technique" },
      { to: "/gallery", label: "Gallery & Videos", desc: "See Pura Ladies in action" },
      { to: "/meet-the-team", label: "Meet the Team", desc: "8 instructors behind the magic" },
    ]} />
  </Layout>
);

export default PuraLadies;
