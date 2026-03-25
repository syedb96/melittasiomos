import { Link } from "react-router-dom";
import { Monitor, Video, Globe, Clock, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";

const OnlineClasses = () => (
  <Layout>
    <SeoHead
      title="Online Salsa & Bachata Classes | Learn from Anywhere | Melitta Siomos"
      description="Take salsa and bachata classes online with Bachata UK Champion Melitta Siomos. Private Zoom lessons, HD drill videos, and personalised coaching from anywhere in the world."
      path="/online-classes"
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main text-center max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Online Salsa & Bachata Classes</h1>
        <p className="text-primary-foreground/80 text-lg mb-8">
          Can't make it to London? Learn salsa and bachata online with Melitta Siomos — Bachata UK Champion. Private Zoom lessons, HD drill videos, and personalised coaching plans tailored to your goals, wherever you are in the world.
        </p>
        <a href="mailto:siomosmelitta@gmail.com?subject=Online%20Class%20Enquiry" className="btn-cta-primary">📧 Enquire About Online Lessons</a>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold text-center mb-12">How Online Lessons Work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Video size={32} />, title: "1. Free Consultation", desc: "Book a free video call with Melitta to discuss your goals, experience level, and preferred schedule." },
            { icon: <Monitor size={32} />, title: "2. Live Zoom Sessions", desc: "Receive structured, personalised lessons via Zoom. Melitta teaches in real-time with immediate feedback on your technique." },
            { icon: <Globe size={32} />, title: "3. HD Drill Videos", desc: "After each session, receive HD videos of your drills and exercises to practise between lessons." },
          ].map((step, i) => (
            <div key={i} className="bg-card rounded-lg p-8 text-center card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">{step.icon}</div>
              <h3 className="font-heading font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-8">What You Can Learn Online</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            "Salsa technique & timing",
            "Bachata body movement & styling",
            "Ladies styling & confidence",
            "Men's styling & lead technique",
            "Solo footwork & shines",
            "Choreography for performances",
            "Wedding dance preparation",
            "Musicality & interpretation",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-background rounded-lg p-4">
              <CheckCircle size={20} className="text-primary flex-shrink-0" />
              <span className="font-heading text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Online Class FAQs</h2>
        <div className="space-y-6">
          {[
            { q: "What platform do you use for online lessons?", a: "We use Zoom for all online lessons. You'll receive a link before each session." },
            { q: "Do I need a partner for online classes?", a: "Not necessarily. Solo technique, styling, and footwork can all be practised alone. For partnerwork, having a partner available is helpful but not required." },
            { q: "How much space do I need?", a: "A space roughly 2m x 2m is sufficient for most exercises. A smooth floor (wood or tile) is ideal." },
            { q: "How much do online lessons cost?", a: "All packages are custom-quoted based on your needs. Contact Melitta for a free consultation and pricing." },
          ].map((faq, i) => (
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
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Start Learning from Anywhere</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Book a free consultation with Melitta and start your online dance journey.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:siomosmelitta@gmail.com?subject=Online%20Class%20Enquiry" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">📧 Enquire Now</a>
          <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I'm%20interested%20in%20online%20classes" target="_blank" rel="noopener noreferrer" className="btn-cta-outline">💬 WhatsApp Melitta</a>
        </div>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/private-lessons", label: "Private Lessons", desc: "In-person 1-to-1 coaching" },
      { to: "/pura-nights", label: "Weekly Classes", desc: "Join in person in West London" },
      { to: "/wedding-dance", label: "Wedding Dance", desc: "Online wedding dance coaching" },
      { to: "/prices", label: "Prices", desc: "View all pricing options" },
      { to: "/contact", label: "Contact", desc: "Get in touch with Melitta" },
    ]} />
  </Layout>
);

export default OnlineClasses;
