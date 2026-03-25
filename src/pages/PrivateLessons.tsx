import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-dance.jpg";

const PrivateLessons = () => (
  <Layout>
    <SeoHead title="Private Salsa & Bachata Lessons London | 1-to-1 with Melitta Siomos" description="Fast-track your Salsa & Bachata with private 1-to-1 or 1-to-2 dance coaching in West London. Tailored plans, HD drills, all levels. Book a free consultation." path="/private-lessons" />

    <section className="relative h-72 md:h-80 overflow-hidden">
      <img src={heroImg} alt="Private salsa bachata lesson with Melitta Siomos London" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Private 1-to-1 & 1-to-2 Dance Coaching</h1>
          <p className="text-primary-foreground/80 font-heading">Salsa • Bachata • Styling • Couples • Performance</p>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <p className="text-muted-foreground leading-relaxed text-center mb-12">Fast-track your Salsa & Bachata skills with personalised, high-level coaching from Melitta Siomos in Chiswick, Ealing & West London.</p>

        <h2 className="font-display text-2xl font-bold mb-4">Every Private Package Includes</h2>
        <div className="h-1 w-20 bg-primary rounded-full mb-6" />
        <ul className="space-y-2 text-sm text-muted-foreground mb-12">
          {[
            "A free consultation call to understand your goals",
            "A personalised plan based on your level & learning style",
            "HD videos of drills (optional)",
            "Weekly or bi-weekly scheduling",
            "Support between sessions",
            "Confidential, relaxed & judgement-free environment",
          ].map((f, i) => <li key={i}>✅ {f}</li>)}
        </ul>

        <h2 className="font-display text-2xl font-bold mb-4">Why Choose Private Lessons</h2>
        <div className="h-1 w-20 bg-primary rounded-full mb-6" />
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            "Dedicated attention — faster progress than group classes",
            "Flexible results — you set the goals",
            "Relaxed environment — learn without judgement",
            "Total flexibility — your schedule, your pace",
          ].map((f, i) => (
            <div key={i} className="bg-card rounded-lg p-4 card-hover text-sm">{f}</div>
          ))}
        </div>

        <p className="text-muted-foreground text-center text-sm mb-8">No prices are listed online as all packages are customised. Use the form below to share your goals and book a free initial consultation.</p>

        <div className="text-center">
          <Link to="/contact" className="btn-cta-primary text-sm">📞 Book a Free Consultation</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default PrivateLessons;
