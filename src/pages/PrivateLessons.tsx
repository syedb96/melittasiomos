import { Link } from "react-router-dom";
import { CheckCircle, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImg from "@/assets/hero-dance.jpg";

const benefits = [
  "Learn at your own pace — zero pressure, 100% focus on you",
  "Faster progression than group classes",
  "Flexible scheduling around your life",
  "Perfect for: beginners, wedding prep, advanced refinement, performance prep",
  "Develop musicality and personal expression",
];

const steps = [
  { n: "1", title: "Initial Consultation", desc: "Discuss your goals, experience, and vision" },
  { n: "2", title: "Tailored Lesson Plan", desc: "Built around your level and objectives" },
  { n: "3", title: "Focused Sessions", desc: "Personal feedback every class with technique drills" },
  { n: "4", title: "Video Review", desc: "Optional HD video review between sessions to accelerate progress" },
];

const PrivateLessons = () => (
  <Layout>
    <SeoHead title="Private Salsa & Bachata Lessons London | 1-to-1 with Melitta Siomos" description="Fast-track your Salsa & Bachata with private 1-to-1 coaching in West London. Tailored plans, HD drills, all levels. Book a free consultation." path="/private-lessons" />

    {/* Hero */}
    <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
      <img src={heroImg} alt="Private salsa bachata lesson with Melitta Siomos London" className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Private Dance Lessons — Tailored Just For You</h1>
          <p className="text-primary-foreground/80 font-heading text-lg">Accelerate your progress with personalised 1-on-1 coaching from Melitta</p>
        </div>
      </div>
    </section>

    {/* Why Private */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-2">Why Private Lessons?</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </FadeInUp>
        <StaggerContainer className="space-y-3">
          {benefits.map((b) => (
            <StaggerItem key={b}>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{b}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Process */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-2">What to Expect</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <StaggerItem key={s.n}>
              <div className="bg-background rounded-2xl p-6 card-hover text-center h-full">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold mx-auto mb-3">{s.n}</div>
                <h3 className="font-heading font-bold text-sm mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-xs">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Includes */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-2xl font-bold mb-4">Every Private Package Includes</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <ul className="space-y-2 text-sm text-muted-foreground mb-8">
            {[
              "A free consultation call to understand your goals",
              "A personalised plan based on your level & learning style",
              "HD videos of drills (optional)",
              "Weekly or bi-weekly scheduling",
              "Support between sessions",
              "Confidential, relaxed & judgement-free environment",
            ].map((f, i) => <li key={i} className="flex items-start gap-2"><CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" /> {f}</li>)}
          </ul>
        </FadeInUp>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Fast-Track Your Dance Journey?</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Private lesson pricing is bespoke to your schedule and goals. Contact Melitta directly to discuss availability and rates.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20private%20dance%20lessons" target="_blank" rel="noopener noreferrer" className="btn-cta-dark">💬 WhatsApp Melitta</a>
          <a href="mailto:siomosmelitta@gmail.com" className="btn-cta-outline">📧 Email Melitta</a>
        </div>
        <p className="text-primary-foreground/60 text-sm mt-4 font-heading"><Phone size={14} className="inline mr-1" />Or call: 07449 482343</p>
      </div>
    </section>
  </Layout>
);

export default PrivateLessons;
