import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import socialImg from "@/assets/social-dancing.jpg";

const PuraNights = () => (
  <Layout>
    <SeoHead title="Pura Nights | Salsa & Bachata Classes in Chiswick & Ealing | Every Monday & Tuesday" description="Pura Nights by Melitta Siomos — London's best weekly Salsa & Bachata classes in Chiswick (Mondays) and Ealing (Tuesdays). All levels welcome, no partner needed. From £5.50." path="/pura-nights" />

    {/* Hero */}
    <section className="relative h-72 md:h-96 overflow-hidden">
      <img src={socialImg} alt="Pura Nights salsa bachata social dancing London" className="w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsla(16,62%,52%,0.8), hsla(0,0%,8%,0.6))' }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Dance Away Every Monday & Tuesday with Pura Nights</h1>
          <p className="font-heading text-primary-foreground/90 text-lg">All Levels · No Partner Needed · From £5.50</p>
        </div>
      </div>
    </section>

    {/* Schedule */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            { day: "Monday", venue: "The George IV Pub, Chiswick", address: "85 Chiswick High Rd, London W4 2DR", color: "primary" },
            { day: "Tuesday", venue: "Drayton Court Hotel, Ealing", address: "2 The Avenue, West Ealing W13 8PH", color: "secondary" },
          ].map((v, i) => (
            <div key={i} className="bg-card rounded-lg p-8 card-hover">
              <h2 className={`font-display text-2xl font-bold mb-2 text-${v.color}`}>Pura Nights {v.day}s</h2>
              <h3 className="font-heading font-semibold mb-1">{v.venue}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> {v.address}</p>
              <div className="space-y-3 text-sm border-l-2 border-primary/30 pl-4">
                <p><Clock size={12} className="inline mr-1" />🚪 Doors open: 7:15 PM</p>
                <p><Clock size={12} className="inline mr-1" />7:30–8:15 PM → Salsa Class (all levels)</p>
                <p><Clock size={12} className="inline mr-1" />8:15–9:00 PM → Bachata Class (all levels)</p>
                <p><Clock size={12} className="inline mr-1" />9:00–11:00 PM → Dance Social (50:50 Bachata & Salsa)</p>
              </div>
              <p className="text-muted-foreground text-xs mt-4">💷 From £5.50 | Cash at door accepted</p>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs mt-4 py-2 px-6">Book {v.day} Class</a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How a Typical Class Works */}
    <section className="section-padding bg-card">
      <div className="container-main text-center">
        <h2 className="font-display text-3xl font-bold mb-3">How a Typical Class Works</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { emoji: "🤝", title: "Arrive & Meet", desc: "Doors open at 7:15, get to know fellow dancers" },
            { emoji: "🎓", title: "Warm Up & Learn", desc: "Structured class at your level" },
            { emoji: "💃", title: "Dance Social", desc: "Practice everything in a fun party atmosphere" },
            { emoji: "🌟", title: "Level Up", desc: "Teachers invite you to advance when ready" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-3">{s.emoji}</div>
              <h3 className="font-heading font-bold text-sm mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        {[
          { q: "Do I need to bring a partner?", a: "No! Many dancers come solo. We rotate partners throughout the class." },
          { q: "What should I wear?", a: "Comfortable clothes you can move in. Smooth-soled shoes recommended." },
          { q: "Is it really for beginners?", a: "Yes — most of our students started with zero dance experience." },
        ].map((faq, i) => (
          <details key={i} className="border-b border-primary-foreground/10 py-4 group">
            <summary className="font-heading font-semibold cursor-pointer text-primary-foreground/90 hover:text-primary transition-colors">{faq.q}</summary>
            <p className="text-primary-foreground/60 text-sm mt-2">{faq.a}</p>
          </details>
        ))}
        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary font-heading font-semibold text-sm hover:text-secondary transition-colors">View All FAQs →</Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Ready to Start Dancing?</h2>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground text-sm hover:bg-charcoal-light">Book Your First Class Now →</a>
      </div>
    </section>
  </Layout>
);

export default PuraNights;
