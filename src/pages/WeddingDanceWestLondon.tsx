import { Link } from "react-router-dom";
import { Heart, CheckCircle, ChevronRight, Star, Music, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: wedding-dance-west-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const WeddingDanceWestLondon = () => (
  <Layout>
    <SeoHead
      title="Wedding Dance Lessons West London | First Dance Choreography | Melitta Siomos"
      description="Bespoke wedding first dance lessons in West London by award-winning instructor Melitta Siomos. Elegant choreography for couples of all abilities. Latin, waltz, contemporary & more."
      path="/wedding-dance-west-london"
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Wedding Dance Lessons — West London",
        description: "Bespoke wedding first dance choreography and coaching in Chiswick, Ealing, and across West London.",
        provider: { "@type": "Person", name: "Melitta Siomos", url: "https://www.puranights.com/about" },
        areaServed: ["West London", "Chiswick", "Ealing", "Richmond", "Kew", "Hammersmith", "Brentford"],
      }}
    />

    {/* Hero */}
    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/wedding-dance" className="hover:text-primary">Wedding Dance</Link> / <span className="text-primary">West London</span>
        </nav>
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-4">Wedding Dance Made Easy</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Wedding Dance Lessons in West London</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">Your first dance should be one of the most magical moments of your wedding day. Whether you want a timeless waltz, a fun Latin routine, or a contemporary show-stopper, Melitta Siomos creates bespoke choreography tailored to you, your song, and your confidence level — right here in West London.</p>
          <div className="flex flex-wrap gap-4">
            <a {...waCustom("Hi Melitta, we're interested in wedding dance lessons in West London", "WeddingDanceWestLondon:43")} className="btn-cta-primary">💬 Enquire on WhatsApp</a>
            <Link to="/wedding-dance" className="btn-cta-ghost">Full Wedding Dance Info</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Why West London */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Wedding Dance Coaching in Your Neighbourhood</h2>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
            <p>West London is home to some of the capital's most beautiful wedding venues — from the riverside elegance of Kew Gardens to the grand ballrooms of Chiswick and Richmond. Melitta offers private wedding dance lessons at her studios in Chiswick and Ealing, as well as at your own venue or home if preferred.</p>
            <p>Unlike generic dance lesson packages, Melitta's approach is truly bespoke. She listens to your song, watches how you move together, and builds a routine that feels natural, beautiful, and achievable — even if you've never danced before. Many couples come in nervous and leave feeling excited about their first dance.</p>
            <p>As a Bachata UK Champion and international performer, Melitta brings professional polish to every routine — whether it's a simple, elegant sway or a full choreographed Salsa show-stopper.</p>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Styles */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Dance Styles for Your First Dance</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            { icon: Heart, title: "Romantic Waltz", desc: "Timeless, elegant, and perfect for classic ballroom venues. The waltz is ideal for couples who want something refined and graceful." },
            { icon: Music, title: "Latin (Salsa or Bachata)", desc: "Fun, energetic, and guaranteed to get your guests on their feet. Perfect for couples who want to surprise everyone." },
            { icon: Star, title: "Contemporary / Lyrical", desc: "Modern, emotional, and tailored to your song's mood. Beautiful for couples who want something unique and heartfelt." },
            { icon: Users, title: "Fun & Playful", desc: "Lighthearted routines that combine different styles — perfect for couples who don't take themselves too seriously." },
            { icon: Heart, title: "Surprise Mashup", desc: "Start with a classic slow dance and surprise your guests with a high-energy Latin or pop section halfway through." },
            { icon: Star, title: "Completely Custom", desc: "Don't fit into a category? Melitta will create something entirely unique to you, your story, and your song." },
          ].map((style, i) => (
            <StaggerItem key={i}>
              <div className="bg-background rounded-xl p-6 h-full card-hover">
                <style.icon size={20} className="text-primary mb-3" />
                <h3 className="font-display text-base font-bold mb-2">{style.title}</h3>
                <p className="text-muted-foreground text-sm">{style.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* How It Works */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">How Wedding Dance Lessons Work</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Free Consultation", desc: "Send Melitta a message on WhatsApp or email. Share your wedding date, song choice, and any ideas you have." },
              { step: "2", title: "First Lesson", desc: "Melitta assesses your natural movement, listens to your song, and begins building your routine from the very first session." },
              { step: "3", title: "Weekly Practice", desc: "Most couples book 4–8 lessons spaced over 2–3 months. Each session builds on the last, layering in new steps and confidence." },
              { step: "4", title: "Final Rehearsal", desc: "A full run-through with tips on performance, timing, and how to handle nerves on the big day." },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm">{step.step}</span>
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8">Wedding Dance FAQs</h2>
        {[
          { q: "How many lessons do we need?", a: "Most couples need 4–8 lessons. If you have more time, additional sessions allow for more polish and confidence. Even 2–3 lessons can make a huge difference." },
          { q: "We've never danced before — is that okay?", a: "Absolutely. Most of Melitta's wedding couples are complete beginners. She specialises in making non-dancers look and feel amazing." },
          { q: "Can we have lessons at our own venue?", a: "Yes. Melitta can travel to your home, rehearsal venue, or wedding venue in West London and surrounding areas." },
          { q: "How much do wedding dance lessons cost?", a: "Pricing starts from £75 per session. Contact Melitta for a personalised quote based on your needs and timeline." },
          { q: "Can we learn a Latin dance for our first dance?", a: "Yes! Salsa, Bachata, and Merengue are all popular choices. Melitta can create a routine that's impressive but achievable." },
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
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Make Your First Dance Unforgettable</h2>
        <p className="text-charcoal/70 mb-6 max-w-lg mx-auto">Enquire today for a free consultation. Melitta responds personally to every message.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a {...waCustom("Hi Melitta, we're interested in wedding dance lessons", "WeddingDanceWestLondon:141")} className="btn-cta-dark text-sm">💬 WhatsApp Melitta</a>
          <a href="mailto:siomosmelitta@gmail.com" className="text-charcoal font-heading font-semibold text-sm hover:opacity-70 transition-opacity">Email Instead →</a>
        </div>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/wedding-dance", label: "Wedding Dance Main Page" },
      { to: "/blog/wedding-first-dance-tips", label: "10 First Dance Tips" },
      { to: "/blog/choose-wedding-first-dance-song", label: "Choose Your Song" },
      { to: "/blog/how-many-wedding-dance-lessons", label: "How Many Lessons?" },
      { to: "/blog/salsa-vs-waltz-wedding", label: "Salsa vs Waltz" },
      { to: "/private-lessons", label: "Private Lessons" },
      { to: "/gift-vouchers", label: "Gift Vouchers" },
    ]} />
  </Layout>
);

export default WeddingDanceWestLondon;
