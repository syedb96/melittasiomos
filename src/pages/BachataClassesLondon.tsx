import { Link } from "react-router-dom";
import { Star, Trophy, Users, MapPin, Clock, ArrowRight, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import FirstTimerCallout from "@/components/FirstTimerCallout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import AnswerBox from "@/components/AnswerBox";
import heroImg from "@/assets/bachata-close.jpg";

const faqItems = [
  { q: "Is bachata easier than salsa for beginners?", a: "Many beginners find bachata slightly more accessible due to the slower tempo (120–145 BPM) and a simpler 4-step basic. Both dances are taught at beginner level every week at Pura Nights." },
  { q: "What should I wear to a bachata class?", a: "Comfortable clothes you can move in. Smooth-soled shoes are recommended — avoid trainers with rubber soles. Ladies may prefer a small heel for styling practice." },
  { q: "Do you teach sensual bachata?", a: "Yes. Melitta teaches both traditional Dominican and modern sensual bachata. As a UK Champion she brings world-class technique to body movement, waves, and musical interpretation." },
  { q: "Can I join the Pura Ladies bachata team?", a: "Yes — attend regular classes to build your foundation, then speak to Melitta about auditions. Pura Ladies has teams in London, Plymouth, Munich, and Lisbon." },
  { q: "Where in London do you teach bachata?", a: "Two West London venues: The George IV (Chiswick W4 2DR) on Mondays and Drayton Court Hotel (Ealing W13 8PH) on Tuesdays. Both are easily reached from across London." },
  { q: "How much do bachata classes cost?", a: "Drop-in classes start from £10, with course bundles and student rates available. Full pricing on the Prices page." },
  { q: "Do I need a partner to attend?", a: "Never. Partners rotate every few minutes during class so you'll dance with everyone — most students arrive solo." },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Bachata Classes London",
  description: "Weekly bachata dance classes in London with Bachata UK Champion Melitta Siomos. Beginner to advanced in Chiswick and Ealing — sensual, traditional Dominican, and modern bachata styles.",
  provider: { "@type": "Organization", name: "Melitta Siomos Dance Academy", url: "https://www.puranights.com", sameAs: ["https://www.instagram.com/melittasiomos/"] },
  educationalLevel: "Beginner to Advanced",
  inLanguage: "en-GB",
  teaches: ["Traditional Dominican Bachata", "Sensual Bachata", "Modern/Urban Bachata", "Lady Styling", "Musicality"],
  offers: { "@type": "Offer", price: "10", priceCurrency: "GBP", availability: "https://schema.org/InStock", url: "https://www.tickettailor.com/events/puranights" },
  hasCourseInstance: [
    { "@type": "CourseInstance", courseMode: "Onsite", location: { "@type": "Place", name: "The George IV", address: "185 Chiswick High Rd, London W4 2DR" }, courseSchedule: { "@type": "Schedule", repeatFrequency: "P1W", byDay: "Monday", startTime: "20:15", endTime: "21:00" } },
    { "@type": "CourseInstance", courseMode: "Onsite", location: { "@type": "Place", name: "Drayton Court Hotel", address: "2 The Avenue, London W13 8PH" }, courseSchedule: { "@type": "Schedule", repeatFrequency: "P1W", byDay: "Tuesday", startTime: "20:15", endTime: "21:00" } },
  ],
  areaServed: { "@type": "City", name: "London" },
  instructor: { "@type": "Person", name: "Melitta Siomos", jobTitle: "Bachata UK Champion", award: "Bachata UK Champion" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const schema = { "@context": "https://schema.org", "@graph": [courseSchema, faqSchema] };

/* <!-- WIX PAGE: bachata-classes-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const BachataClassesLondon = () => (
  <Layout>
    <SeoHead
      title="Bachata Classes London | Learn with UK Champion | Melitta Siomos"
      description="Learn bachata in London with Bachata UK Champion Melitta Siomos. Weekly classes in Chiswick & Ealing for all levels. No partner needed. From £5."
      path="/bachata-classes-london"
      schema={schema}
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Bachata dancing couple in close embrace" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-primary">Bachata Classes London</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Bachata Classes in London — Learn with the UK Champion
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
          Melitta Siomos, Bachata UK Champion, runs London's most vibrant weekly bachata classes. From your very first step to advanced sensual styling, Pura Nights is where London falls in love with bachata — every Monday in Chiswick and every Tuesday in Ealing.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Your First Bachata Class</a>
          <Link to="/prices" className="btn-cta-outline">View Pricing →</Link>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">What Is Bachata Dance?</h2>
        <div className="prose max-w-none text-muted-foreground space-y-4">
          <p>Bachata is a sensual, rhythmic partner dance that originated in the Dominican Republic in the early 1960s. Born from bolero, merengue, and son, bachata was once considered the music of the marginalized — but today it's one of the most popular social dances on the planet, with a massive following across London and Europe.</p>
          <p>The dance is characterised by a simple four-step pattern with a distinctive hip movement (or "tap") on the fourth beat. There are several styles: <strong>Traditional/Dominican</strong> bachata features quick footwork and playful movements; <strong>Sensual bachata</strong> incorporates body waves, isolations, and dramatic musicality; <strong>Modern/Urban</strong> bachata blends elements of hip-hop and contemporary dance.</p>
          <p>Bachata music features romantic guitar melodies, bongos, güira, and bass — creating an emotionally rich sound that dancers connect with deeply. Songs range from 120–145 BPM, making bachata more accessible than salsa for beginners.</p>
          <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Why Learn Bachata in London?</h3>
          <p>London's bachata scene has exploded in recent years, with weekly classes, sensual bachata workshops, and dedicated bachata socials across the city. Melitta Siomos — a crowned Bachata UK Champion — brings a unique combination of competition-level technique and warm, inclusive teaching to every class at Pura Nights. Whether you want to dance socially or train for the stage with Pura Ladies, London is the place to be.</p>
        </div>
      </div>
    </section>

    <section className="section-padding section-dark">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-center mb-12">Weekly Bachata Class Schedule</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-charcoal-light rounded-lg p-8 border border-primary/20">
            <h3 className="font-display text-2xl font-bold text-primary mb-2">Monday — Chiswick</h3>
            <p className="text-primary-foreground/60 text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />8:15–9:00 PM — Bachata Class (all levels)</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />9:00–11:00 PM — Social Dancing (50% Bachata)</div>
            </div>
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs mt-6 py-2 px-6">Book Monday</a>
          </div>
          <div className="bg-charcoal-light rounded-lg p-8 border border-secondary/20">
            <h3 className="font-display text-2xl font-bold text-secondary mb-2">Tuesday — Ealing</h3>
            <p className="text-primary-foreground/60 text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" />8:15–9:00 PM — Bachata Class (all levels)</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" />9:00–11:00 PM — Social Dancing (50% Bachata)</div>
            </div>
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-secondary text-secondary-foreground text-xs mt-6 py-2 px-6 hover:opacity-90">Book Tuesday</a>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-8">Why Learn Bachata with Melitta Siomos?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: <Trophy size={24} />, title: "Bachata UK Champion", desc: "Crowned champion at the UK's most prestigious bachata competition — unmatched credentials in London." },
            { icon: <Heart size={24} />, title: "Sensual & Traditional Styles", desc: "Learn both traditional Dominican footwork and modern sensual bachata body movement." },
            { icon: <Users size={24} />, title: "Pura Ladies Performance Team", desc: "Progress from classes to performing at international festivals with Pura Ladies." },
            { icon: <Star size={24} />, title: "International Festival Experience", desc: "Melitta teaches across Europe — Croatia, Slovenia, Portugal, Germany — and brings that expertise to every London class." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start bg-background rounded-lg p-6">
              <div className="text-primary flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-heading font-bold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Bachata Classes London — FAQs</h2>
        <div className="space-y-6">
          {faqItems.map((faq, i) => (
            <div key={i} className="bg-card rounded-lg p-6">
              <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Start Your Bachata Journey This Week</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Learn from a UK Champion in London's most welcoming bachata classes. No partner needed, all levels welcome.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book a Bachata Class</a>
          <Link to="/pura-ladies" className="btn-cta-outline">Explore Pura Ladies <ArrowRight size={16} className="ml-2" /></Link>
        </div>
      </div>
    </section>
    {/* AI/GEO Answer Block */}
    {/* <!-- WIX SECTION: AnswerBox — replicate as Strip with H3 + paragraph + bullets + CTA --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="Where are the best Bachata classes in London?"
          answer="Pura Nights is taught by Bachata UK Champion Melitta Siomos — weekly classes Monday in Chiswick and Tuesday in Ealing, plus monthly Latin Friday socials and the Pura Ladies styling team. Sensual, modern and Dominican Bachata covered across the term."
          bullets={["Bachata UK Champion lead instructor", "Mon Chiswick · Tue Ealing · weekly Bachata in every social", "Beginners stream every week — no partner needed", "Optional Pura Ladies styling team for women who want to perform"]}
          cta={{ label: "Start with Beginners", to: "/start-here" }}
          tone="warm"
        />
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/bachata-classes-chiswick", label: "Bachata Classes Chiswick" },
      { to: "/bachata-classes-ealing", label: "Bachata Classes Ealing" },
      { to: "/bachata-classes-west-london", label: "Bachata Classes West London" },
      { to: "/blog/what-is-bachata", label: "What is Bachata?" },
      { to: "/blog/bachata-for-beginners-london", label: "Bachata for Beginners" },
      { to: "/pura-nights", label: "Weekly Classes" },
      { to: "/pura-ladies", label: "Pura Ladies Team" },
    ]} />
    <FirstTimerCallout />
  </Layout>
);

export default BachataClassesLondon;
