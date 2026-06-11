import { Link } from "react-router-dom";
import { CheckCircle, ChevronRight, User, Target, Sparkles, GraduationCap, Heart, Award } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: private-dance-lessons-west-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const PrivateDanceLessonsWestLondon = () => (
  <Layout>
    <SeoHead
      title="Private Dance Lessons West London | 1-to-1 Salsa & Bachata | Melitta Siomos"
      description="Private Salsa and Bachata lessons in West London with award-winning instructor Melitta Siomos. Tailored 1-to-1 coaching for beginners, technique, wedding prep, and performance."
      path="/private-dance-lessons-west-london"
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Private Dance Lessons — West London",
        description: "Tailored 1-to-1 Salsa and Bachata coaching in Chiswick, Ealing, and across West London.",
        provider: { "@type": "Person", name: "Melitta Siomos", url: "https://www.puranights.com/about" },
        areaServed: ["West London", "Chiswick", "Ealing", "Acton", "Hammersmith", "Richmond", "Kew"],
      }}
    />

    {/* Hero */}
    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/private-lessons" className="hover:text-primary">Private Lessons</Link> / <span className="text-primary">West London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Private Dance Lessons in West London</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">Whether you want to fast-track your Salsa or Bachata, prepare for a performance, build confidence, or simply learn at your own pace — private 1-to-1 lessons with Melitta Siomos give you focused, tailored instruction that group classes can't match.</p>
          <div className="flex flex-wrap gap-4">
            <a {...waCustom("Hi Melitta, I'm interested in private dance lessons in West London", "PrivateDanceLessonsWestLondon:43")} className="btn-cta-primary">💬 Enquire on WhatsApp</a>
            <Link to="/private-lessons" className="btn-cta-ghost">Full Details</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Who Are Privates For */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Who Are Private Lessons For?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">Private lessons are for anyone who wants more than a group class can offer. Here are some of the most common reasons people book 1-to-1 sessions with Melitta:</p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            { icon: User, title: "Complete Beginners", desc: "Want to learn the basics in a pressure-free environment before joining group classes." },
            { icon: Target, title: "Technique Refinement", desc: "Already dancing but want to sharpen specific skills — turns, body movement, musicality." },
            { icon: Heart, title: "Wedding Couples", desc: "Preparing a first dance routine? Melitta creates bespoke choreography for your song." },
            { icon: Sparkles, title: "Confidence Building", desc: "Some people prefer the privacy and focus of 1-to-1 before stepping onto the social floor." },
            { icon: Award, title: "Performance Prep", desc: "Preparing for a show, competition, or Pura Ladies audition? Get stage-ready with Melitta." },
            { icon: GraduationCap, title: "Accelerated Learning", desc: "Want to progress faster? Private lessons let you cover in weeks what might take months in group." },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-xl p-6 h-full card-hover">
                <item.icon size={20} className="text-primary mb-3" />
                <h3 className="font-display text-base font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* What's Included */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">What's Included in a Private Lesson</h2>
          <div className="space-y-3">
            {[
              "60-minute focused session tailored entirely to your goals",
              "Video recap of key moves and combinations for home practice",
              "Personalised feedback on technique, timing, and body movement",
              "Flexible scheduling — weekdays, evenings, and weekends available",
              "Choice of venue: Chiswick studio, Ealing studio, your home, or online via Zoom",
              "Progress tracking and goal-setting between sessions",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Enquiry CTA */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-4">Interested in Private Lessons?</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-lg mx-auto">Private lesson rates are tailored to your goals and schedule. Contact Melitta directly for a free consultation and personalised quote.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a {...waCustom("Hi Melitta, I'd like to enquire about private lessons in West London", "PrivateDanceLessonsWestLondon:108")} className="btn-cta-primary">💬 Enquire on WhatsApp</a>
            <a href="mailto:siomosmelitta@gmail.com" className="btn-cta-dark">📧 Email Melitta</a>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8">Private Lesson FAQs</h2>
        {[
          { q: "Where do private lessons take place?", a: "Melitta teaches from studios in Chiswick and Ealing. She can also travel to your home or venue in West London, or teach online via Zoom." },
          { q: "Can I book a private lesson for a couple?", a: "Yes. Couple lessons are popular for wedding dance prep, date nights, and improving your social dancing together. Same pricing applies." },
          { q: "Do I need any experience?", a: "Not at all. Many private lesson students are absolute beginners. Melitta tailors every session to your current level and goals." },
          { q: "How do I book?", a: "The quickest way is to message Melitta on WhatsApp. She'll discuss your goals, availability, and recommend a plan." },
          { q: "Can I combine private lessons with group classes?", a: "Absolutely — this is the fastest way to improve. Private lessons build your technique while group classes give you social dancing experience." },
        ].map((faq, i) => (
          <details key={i} className="border-b border-border py-4">
            <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
            <p className="text-muted-foreground text-sm mt-2">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Start Your Private Dance Journey</h2>
        <p className="text-charcoal/70 mb-6 max-w-lg mx-auto">Message Melitta today for a free consultation. She responds personally to every enquiry.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a {...waCustom("Hi Melitta, I'm interested in private dance lessons", "PrivateDanceLessonsWestLondon:141")} className="btn-cta-dark text-sm">💬 WhatsApp Melitta</a>
          <a href="mailto:siomosmelitta@gmail.com" className="text-charcoal font-heading font-semibold text-sm hover:opacity-70 transition-opacity">Email Instead →</a>
        </div>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/private-lessons", label: "Private Lessons Main Page" },
      { to: "/wedding-dance", label: "Wedding Dance" },
      { to: "/online-classes", label: "Online Classes" },
      { to: "/pura-nights", label: "Weekly Classes" },
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/prices", label: "Prices & Bundles" },
    ]} />
  </Layout>
);

export default PrivateDanceLessonsWestLondon;
