import { Link } from "react-router-dom";
import { User, Clock, Star, Target, MapPin, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Salsa Lessons London",
  description: "One-to-one private Salsa lessons in London with Bachata UK Champion Melitta Siomos. Tailored coaching for all levels.",
  provider: { "@type": "Person", name: "Melitta Siomos" },
  areaServed: { "@type": "City", name: "London" },
  offers: { "@type": "Offer", price: "85", priceCurrency: "GBP" },
};

const benefits = [
  { icon: Target, title: "Personalised Curriculum", desc: "Every lesson is tailored to your goals — whether that's nailing your cross-body lead, improving musicality, or preparing for a performance." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Book at times that suit your lifestyle. Weekday evenings, weekends, or even lunchtime sessions available." },
  { icon: Globe, title: "In-Person or Online", desc: "Train at a West London studio, or join via Zoom from anywhere in the world. All sessions are recorded for home practice." },
  { icon: Star, title: "Award-Winning Coaching", desc: "Learn from Bachata UK Champion Melitta Siomos with 15+ years of teaching and performing experience across Europe." },
];

const idealFor = [
  "Complete beginners who want a head start before joining group classes",
  "Intermediate dancers looking to break through a technique plateau",
  "Performers preparing for showcases, competitions, or Pura Ladies auditions",
  "Couples wanting to dance together with better connection and musicality",
  "Anyone who prefers one-to-one attention and faster progression",
];

/* <!-- WIX PAGE: private-salsa-lessons-london -->
   <!-- WIX SECTION: Hero — Full-width Strip with dark overlay + hero image -->
   <!-- WIX SECTION: Schedule/Details — Card grid or info Strip -->
   <!-- WIX SECTION: Pricing Snapshot — use Card grid on warm Strip -->
   <!-- WIX SECTION: FAQ — use Wix FAQ app or Accordions -->
   <!-- WIX SECTION: CTA Band — Full-width Strip with booking buttons -->
   <!-- WIX: Use RelatedPages as internal link Strip -->
*/
const PrivateSalsaLessonsLondon = () => (
  <Layout>
    <SeoHead
      title="Private Salsa Lessons London | 1-to-1 with Melitta Siomos"
      description="Book private Salsa lessons in London with Bachata UK Champion Melitta Siomos. Tailored 1-to-1 coaching in West London or online. All levels welcome. Enquire for rates."
      path="/private-salsa-lessons-london"
      schema={schema}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/private-lessons" className="hover:text-primary">Private Lessons</Link> / <span className="text-primary">Salsa London</span>
        </nav>
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Private Salsa Lessons in London</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
            Accelerate your Salsa journey with personalised one-to-one coaching from Melitta Siomos. Whether you're starting from zero or preparing for a performance, private lessons give you the focused attention and tailored feedback that group classes can't match.
          </p>
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">📞 Book a Private Lesson</a>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Why Private Salsa Lessons?</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full">
                <b.icon size={28} className="text-primary mb-4" />
                <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Ideal For</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <ul className="space-y-3">
            {idealFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Enquire About Rates</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <div className="bg-card rounded-2xl p-8 border border-primary/20">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading font-bold mb-3">Pricing</h3>
                <p className="text-sm text-muted-foreground mb-3">Private lesson rates are personalised to your goals, level, and schedule. Contact Melitta directly to discuss — she'll get back to you within 24 hours.</p>
                <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20private%20Salsa%20lessons" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs">💬 Enquire via WhatsApp</a>
              </div>
              <div>
                <h3 className="font-heading font-bold mb-3">Location</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2"><MapPin size={14} className="text-primary mt-0.5" /> West London (flexible studio location)</p>
                  <p className="flex items-start gap-2"><MapPin size={14} className="text-primary mt-0.5" /> Online via Zoom (worldwide)</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Ready to Fast-Track Your Salsa?</h2>
        <p className="text-primary-foreground/80 mb-8">Book your first private lesson today.</p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">📞 Book Now</a>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/private-lessons", label: "All Private Lessons" },
      { to: "/private-dance-lessons-west-london", label: "Private Lessons West London" },
      { to: "/salsa-classes-london", label: "Group Salsa Classes" },
      { to: "/bachata-classes-london", label: "Group Bachata Classes" },
      { to: "/online-classes", label: "Online Classes" },
      { to: "/prices", label: "View All Prices" },
    ]} />
  </Layout>
);

export default PrivateSalsaLessonsLondon;
