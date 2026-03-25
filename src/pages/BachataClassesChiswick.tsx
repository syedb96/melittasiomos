import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";

const BachataClassesChiswick = () => (
  <Layout>
    <SeoHead title="Bachata Classes Chiswick | Every Monday | Pura Nights" description="Join Bachata classes in Chiswick every Monday at The George IV. All levels welcome, no partner needed. From £10. Taught by Melitta Siomos." path="/bachata-classes-chiswick" />
    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/40 mb-8 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/bachata-classes-london" className="hover:text-primary">Bachata London</Link> / <span className="text-primary">Chiswick</span></nav>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Bachata Classes in Chiswick — Every Monday at Pura Nights</h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">Learn Bachata every Monday evening at The George IV in Chiswick with Melitta Siomos. Three levels — Beginners, Improvers, and Intermediate — followed by social dancing until 11 PM.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Monday Class</a>
      </div>
    </section>
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-6">Monday Schedule — The George IV, Chiswick</h2>
          <div className="bg-card rounded-2xl p-8 border border-primary/10 mb-8">
            <div className="flex items-start gap-3 mb-6"><MapPin size={20} className="text-primary flex-shrink-0 mt-1" /><div><p className="font-heading font-semibold">The George IV</p><p className="text-muted-foreground text-sm">185 Chiswick High Rd, London W4 2DR</p><p className="text-muted-foreground text-xs mt-1">Nearest tube: Turnham Green (District Line) · Buses: 190, 237, 267</p></div></div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">7:30 PM</span> — Beginners Salsa & Bachata</div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">8:00 PM</span> — Improvers</div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">8:30 PM</span> — Intermediate</div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">9:00–11:00 PM</span> — Social Dancing</div>
            </div>
            <p className="text-sm text-muted-foreground mt-6">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">Pura Nights Chiswick is the perfect place to learn Bachata in West London. With three levels running every Monday and a vibrant social afterwards, it's the ideal mix of structured learning and relaxed practice. Also looking for Salsa? <Link to="/salsa-classes-chiswick" className="text-primary hover:underline">We teach both in the same evening →</Link></p>
        </FadeInUp>
      </div>
    </section>
    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">See You This Monday!</h2>
        <p className="text-primary-foreground/70 mb-8">No booking required. All levels. No partner needed.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your Class</a>
      </div>
    </section>
  </Layout>
);

export default BachataClassesChiswick;
