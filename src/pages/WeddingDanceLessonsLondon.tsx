import { Link } from "react-router-dom";
import { Heart, Clock, Star, Music, MapPin, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import RelatedPages from "@/components/RelatedPages";
import VideoTestimonialsBlock from "@/components/VideoTestimonialsBlock";
import ProofBlock from "@/components/ProofBlock";
import WeddingTiers from "@/components/WeddingTiers";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImg from "@/assets/wedding-dance-couple.jpg";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wedding Dance Lessons London",
    description: "Private wedding first dance lessons in London. Learn a beautiful choreographed routine with award-winning instructor Melitta Siomos.",
    provider: { "@type": "Person", name: "Melitta Siomos", jobTitle: "Wedding Dance Choreographer" },
    areaServed: { "@type": "City", name: "London" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", description: "Free consultation — bespoke pricing" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
      { "@type": "ListItem", position: 2, name: "Wedding Dance", item: "https://www.puranights.com/wedding-dance" },
      { "@type": "ListItem", position: 3, name: "Wedding Dance Lessons London", item: "https://www.puranights.com/wedding-dance-lessons-london" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "When should we start lessons?", acceptedAnswer: { "@type": "Answer", text: "Ideally 2–3 months before your wedding, but we've created beautiful routines in as little as 2 weeks." } },
      { "@type": "Question", name: "We have two left feet — is that OK?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Most couples who come to us have never danced before. Melitta specialises in making non-dancers look and feel amazing." } },
      { "@type": "Question", name: "Can we learn a specific style?", acceptedAnswer: { "@type": "Answer", text: "Yes — Salsa, Bachata, Waltz, Foxtrot, or a fusion. We choreograph to your song." } },
      { "@type": "Question", name: "Where do lessons take place?", acceptedAnswer: { "@type": "Answer", text: "At our private studio in Acton, West London, or online via Zoom for couples outside London. Home visits can be arranged." } },
    ],
  },
];

const packages = [
  { title: "The Essentials", sessions: "~3 sessions", desc: "Perfect for couples who want to feel confident and natural. Learn a simple, elegant routine to your chosen song.", best: "Short timeline" },
  { title: "The Classic", sessions: "~5 sessions", desc: "Our most popular package. Build a polished routine with lifts, dips, and smooth transitions that wow your guests.", best: "Most couples" },
  { title: "The Showstopper", sessions: "8+ sessions", desc: "For couples who want a jaw-dropping performance. Full choreography with advanced moves, formations, and a dramatic finish.", best: "Maximum wow factor" },
];

const faqs = [
  { q: "When should we start lessons?", a: "Ideally 2–3 months before your wedding, but we've created beautiful routines in as little as 2 weeks. The earlier you start, the more relaxed and confident you'll feel." },
  { q: "We have two left feet — is that OK?", a: "Absolutely! Most couples who come to us have never danced before. Melitta specialises in making non-dancers look and feel amazing on the dance floor." },
  { q: "Can we learn a specific style?", a: "Yes — Salsa, Bachata, Waltz, Foxtrot, or a fusion of styles. We choreograph to YOUR song, whatever the genre." },
  { q: "Where do lessons take place?", a: "At our private studio in Acton, West London, or online via Zoom for couples outside London. Home visits can be arranged." },
];

/* <!-- WIX PAGE: wedding-dance-lessons-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const WeddingDanceLessonsLondon = () => (
  <Layout>
    <SeoHead
      title="Wedding Dance Lessons London | First Dance Choreography"
      description="Private wedding first dance lessons in London with award-winning choreographer Melitta Siomos. Salsa, Bachata, Waltz or any style. All abilities. Book a free consultation."
      path="/wedding-dance-lessons-london"
      schema={schema}
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Couple practicing wedding first dance" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/wedding-dance" className="hover:text-primary">Wedding Dance</Link> / <span className="text-primary">London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Wedding Dance Lessons in London</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
            Your first dance should be one of the most magical moments of your wedding day. With Melitta Siomos — Bachata UK Champion and experienced wedding choreographer — you'll learn a routine that feels natural, looks stunning, and creates memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I'd%20love%20to%20book%20a%20free%20wedding%20dance%20consultation" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">💍 Book Free Consultation</a>
            <Link to="/wedding-dance" className="btn-cta-dark">Learn More</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Wedding Dance Packages</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <StaggerItem key={pkg.title}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full flex flex-col border border-primary/20">
                <h3 className="font-heading font-bold text-lg mb-1">{pkg.title}</h3>
                <p className="text-primary font-heading text-sm font-semibold mb-1">{pkg.sessions}</p>
                <p className="text-muted-foreground text-sm flex-1 mb-4">{pkg.desc}</p>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-heading">Best for: {pkg.best}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* WIX SECTION: AnswerBox — AI / GEO answer block */}
    <section className="section-base py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <AnswerBox
          question={`How many wedding dance lessons do most couples need?`}
          answer={`Most couples book 4–8 private lessons before the big day. The exact number depends on your song choice, dance experience and how polished you want the choreography. Melitta runs a free 10-minute consultation call to scope the right package — no pressure, no upsell.`}
          bullets={[
              "First dance choreography tailored to your song",
              "London-wide — studio, venue or your home",
              "Recommended start: 8–12 weeks before the wedding",
              "Same-week express bookings considered"
          ]}
          cta={{ label: "Book a 10-min consultation", to: "/contact" }}
        />
      </div>
    </section>


    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">How It Works</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="space-y-6">
          {[
            { step: "1", title: "Free Consultation", desc: "Tell us about your wedding, your song, and your vision. We'll recommend the perfect package and style." },
            { step: "2", title: "Choreography", desc: "Melitta creates a bespoke routine tailored to your song, ability level, and venue space." },
            { step: "3", title: "Practice & Polish", desc: "Weekly sessions build your confidence. We film each lesson so you can practise at home." },
            { step: "4", title: "Wedding Day Magic", desc: "Step onto the dance floor with confidence and give your guests a moment they'll never forget." },
          ].map((s) => (
            <StaggerItem key={s.step}>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-heading font-bold mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-8 text-center">Wedding Dance FAQs</h2>
        </FadeInUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <div className="bg-card rounded-xl p-6">
                <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* Couples who trusted us — wedding-specific proof */}
    <ProofBlock
      categories={["wedding"]}
      eyebrow="Real Couples"
      title="Couples who trusted us"
      subtitle="First name and wedding year only — privacy respected."
      limit={4}
      variant="light"
    />

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Make Your First Dance Unforgettable</h2>
        <p className="text-primary-foreground/80 mb-8">Book your free consultation today — no obligation, just a friendly chat about your vision.</p>
        <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I'd%20love%20to%20book%20a%20free%20wedding%20dance%20consultation" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">💍 Book Free Consultation</a>
      </div>
    </section>

    <WeddingTiers />

    <VideoTestimonialsBlock
      heading="Real couples. Real first dances."
      subcopy="Two short clips from Pura Nights wedding clients. Both walked in nervous. Both nailed their moment."
      testimonials={[
        {
          name: "Sarah & James",
          context: "Wedding First Dance · The Bingham Riverhouse, Richmond",
          youtubeId: "dQw4w9WgXcQ",
          quote: "We thought we'd just shuffle. Melitta turned three lessons into the moment everyone still talks about.",
        },
        {
          name: "Priya & Tom",
          context: "Wedding First Dance · Syon Park",
          youtubeId: "dQw4w9WgXcQ",
          quote: "Calm, kind, and very, very good. Our families cried — in the good way.",
        },
      ]}
    />

    <RelatedPages title="Related Pages" links={[
      { to: "/wedding-dance", label: "Wedding Dance Info" },
      { to: "/wedding-dance-west-london", label: "Wedding Dance West London" },
      { to: "/blog/wedding-first-dance-tips", label: "First Dance Tips" },
      { to: "/blog/choose-wedding-first-dance-song", label: "Choosing Your Song" },
      { to: "/blog/how-many-wedding-dance-lessons", label: "How Many Lessons?" },
      { to: "/private-lessons", label: "Private Lessons" },
    ]} />
  </Layout>
);

export default WeddingDanceLessonsLondon;
