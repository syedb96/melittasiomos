import { Link } from "react-router-dom";
import { Star, Trophy, Users, MapPin, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const schema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Salsa Classes London",
  description: "Weekly salsa dance classes in London with Melitta Siomos. Beginner to advanced levels in Chiswick and Ealing, West London.",
  provider: { "@type": "Organization", name: "Melitta Siomos Dance Academy", url: "https://www.melittasiomos.com" },
  areaServed: { "@type": "City", name: "London" },
};

const SalsaClassesLondon = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes London | Weekly Lessons from £5.50 | Melitta Siomos"
      description="Learn salsa in London with award-winning instructor Melitta Siomos. Weekly salsa classes in Chiswick & Ealing for all levels. No partner needed. Book from £5.50."
      path="/salsa-classes-london"
      schema={schema}
    />

    {/* Hero */}
    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-primary">Salsa Classes London</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Salsa Classes in London — Learn to Dance with Melitta Siomos
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
          Melitta Siomos runs London's most welcoming weekly salsa classes across West London. Whether you're a complete beginner or an experienced dancer looking to sharpen your technique, Pura Nights has a class for you every Monday in Chiswick and every Tuesday in Ealing.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Your First Salsa Class</a>
          <Link to="/prices" className="btn-cta-outline">View Pricing →</Link>
        </div>
      </div>
    </section>

    {/* What is Salsa */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">What Is Salsa Dance?</h2>
        <div className="prose max-w-none text-muted-foreground space-y-4">
          <p>Salsa is a vibrant, energetic partner dance that originated in the Caribbean — rooted in Cuban Son, Mambo, and Cha Cha Cha. Danced to infectious Latin rhythms, salsa has become one of the most popular social dances in the world, and London is one of the best cities on the planet to learn it.</p>
          <p>There are several styles of salsa: <strong>Cuban (Casino)</strong> features circular movements and playful energy; <strong>Cross-Body (LA/NY style)</strong> is danced in a linear slot and is known for its elegant turns and shines. At Pura Nights, Melitta Siomos teaches a blend of cross-body salsa that's accessible, fun, and technically sound.</p>
          <p>Salsa music typically runs at 160–220 BPM and features congas, timbales, piano montunos, and powerful brass sections. The dance follows a rhythmic pattern counted in 8-beat phrases, with dancers stepping on beats 1-2-3 and 5-6-7 (with pauses on 4 and 8).</p>
          <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Why Learn Salsa in London?</h3>
          <p>London is home to one of the largest and most diverse Latin dance communities in Europe. With weekly salsa classes, monthly Latin parties, and regular social dancing nights, there's never been a better time to start. Melitta Siomos has been teaching salsa in London since 2010 and has trained over 500 students — from absolute beginners to confident social dancers.</p>
        </div>
      </div>
    </section>

    {/* Class Schedule */}
    <section className="section-padding section-dark">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-center mb-12">Weekly Salsa Class Schedule in London</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-charcoal-light rounded-lg p-8 border border-primary/20">
            <h3 className="font-display text-2xl font-bold text-primary mb-2">Monday — Chiswick</h3>
            <p className="text-primary-foreground/60 text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> The George IV Pub, 85 Chiswick High Rd, W4 2DR</p>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />Doors open: 7:15 PM</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />7:30–8:15 PM — Salsa Class (all levels)</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />8:15–9:00 PM — Bachata Class</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />9:00–11:00 PM — Social Dancing</div>
            </div>
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs mt-6 py-2 px-6">Book Monday Class</a>
          </div>
          <div className="bg-charcoal-light rounded-lg p-8 border border-secondary/20">
            <h3 className="font-display text-2xl font-bold text-secondary mb-2">Tuesday — Ealing</h3>
            <p className="text-primary-foreground/60 text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" />Doors open: 7:15 PM</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" />7:30–8:15 PM — Salsa Class (all levels)</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" />8:15–9:00 PM — Bachata Class</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" />9:00–11:00 PM — Social Dancing</div>
            </div>
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-secondary text-secondary-foreground text-xs mt-6 py-2 px-6 hover:opacity-90">Book Tuesday Class</a>
          </div>
        </div>
      </div>
    </section>

    {/* Why Choose */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-8">Why Choose Melitta Siomos for Salsa Lessons in London?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: <Trophy size={24} />, title: "Bachata UK Champion", desc: "Award-winning credentials that set Melitta apart from every other London instructor." },
            { icon: <Star size={24} />, title: "5-Star Google Rated", desc: "Consistently rated 5 stars by students for her warm, patient teaching style." },
            { icon: <Users size={24} />, title: "500+ Students Taught", desc: "Over 15 years of experience taking complete beginners to confident social dancers." },
            { icon: <MapPin size={24} />, title: "Two Convenient Locations", desc: "Monday in Chiswick and Tuesday in Ealing — two of West London's most accessible venues." },
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

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Salsa Classes London — FAQs</h2>
        <div className="space-y-6">
          {[
            { q: "Do I need a partner to attend salsa classes?", a: "No! Most of our students come solo. We rotate partners throughout the class so you'll dance with different people and build confidence quickly." },
            { q: "I've never danced before — is it okay to come?", a: "Absolutely. Every class starts with a structured warm-up, and we split into beginner, improver, and intermediate groups. Many of our most passionate dancers started with zero experience." },
            { q: "What's the difference between salsa and bachata?", a: "Salsa is faster, more energetic, and rhythmically complex. Bachata is slower, more romantic, and danced to guitar-driven music. We teach both every week — it's the perfect combination." },
            { q: "How much do salsa classes cost?", a: "Drop-in classes start from just £5.50. We also offer monthly packages: Bronze (£45/month for 4 classes), Silver (£75/month for 8 classes), and Gold Unlimited (£110/month). See our full pricing page for details." },
          ].map((faq, i) => (
            <div key={i} className="bg-card rounded-lg p-6">
              <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Ready to Start Your Salsa Journey?</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Join Pura Nights this week — no partner needed, all levels welcome, from just £5.50.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book a Salsa Class Now</a>
          <Link to="/contact" className="btn-cta-outline">Contact Melitta <ArrowRight size={16} className="ml-2" /></Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default SalsaClassesLondon;
