import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import { Trophy, Star, Users, MapPin } from "lucide-react";
import melittaImg from "@/assets/melitta-portrait.jpg";
import heroImg from "@/assets/hero-dance.jpg";

const About = () => (
  <Layout>
    <SeoHead title="About Melitta Siomos | Bachata UK Champion | Pura Nights London" description="Meet Melitta Siomos — London's award-winning Bachata UK Champion and founder of Pura Nights. 15+ years teaching Salsa & Bachata across West London, Europe and beyond." path="/about" />

    {/* Hero */}
    <section className="relative h-72 md:h-96 overflow-hidden">
      <img src={heroImg} alt="Melitta Siomos and Pura Dance community" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground text-center px-4">Connecting People Through Music & Dance</h1>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <img src={melittaImg} alt="Melitta Siomos award-winning dance instructor London" className="rounded-lg w-full" width={800} height={1000} loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
          </div>
          <div className="md:col-span-3">
            <h2 className="font-display text-3xl font-bold mb-3">Meet Melitta Siomos</h2>
            <div className="h-1 w-20 bg-primary rounded-full mb-6" />
            <div className="text-muted-foreground leading-relaxed space-y-4 text-sm">
              <p>Melitta Siomos and her Pura Dance family bring Salsa & Bachata to life with friendly, technique-driven classes for absolute beginners right through to advanced dancers. You'll find us every week across West & Central London — Chiswick, Ealing, Covent Garden — and in pop-up workshops across Europe.</p>
              <p>Since 2010, Melitta has built a reputation as one of London's most inspiring Latin-dance instructors, blending her professional musical-theatre training with award-winning Bachata flair. Under the Pura Nights banner she curates buzzing socials and themed parties, while her performance teams — Pura Ladies — now span four cities (London, Plymouth, Munich & Lisbon) and regularly light up European festivals.</p>
              <p>Beyond the UK, Melitta's workshops, holiday intensives and guest appearances have connected dancers in Croatia, Slovenia, Portugal and Germany, always with the mission to share the joy, rhythm and community spirit of Latin America.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: <Trophy size={24} />, value: "15+", label: "Years Teaching" },
            { icon: <Users size={24} />, value: "500+", label: "Students Taught" },
            { icon: <MapPin size={24} />, value: "4", label: "Pura Ladies Cities" },
            { icon: <Star size={24} />, value: "5⭐", label: "Google Rated" },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-lg p-6 card-hover text-center">
              <div className="text-primary mb-2 flex justify-center">{s.icon}</div>
              <p className="font-display text-3xl font-bold">{s.value}</p>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* What is Salsa / Bachata */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">What Is Salsa Dance?</h2>
          <div className="h-1 w-16 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground text-sm leading-relaxed">Salsa is a vibrant partner dance with roots in Cuban Son, Mambo and Afro-Caribbean rhythms. Danced in either Cuban style (circular) or NY/LA style (linear), it's fast, fun, and rhythmically rich. Salsa classes in London are perfect for beginners who want energy, connection and a serious dose of fun — no experience required.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">What Is Bachata Dance?</h2>
          <div className="h-1 w-16 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground text-sm leading-relaxed">Bachata originates from the Dominican Republic and has grown into one of the world's most popular social dances. With its romantic, guitar-driven rhythm and sensual body movement, Bachata is incredibly accessible for beginners. At Pura Nights, Melitta Siomos teaches both traditional and modern sensual Bachata styles.</p>
        </div>
      </div>
    </section>

    {/* Locations */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold mb-3">Find Us Near You</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-8" />
        <div className="space-y-4 text-left">
          {[
            { day: "Monday", venue: "George IV Pub, 85 Chiswick High Rd, London W4 2DR" },
            { day: "Tuesday", venue: "Drayton Court Hotel, 2 The Avenue, Ealing W13 8PH" },
            { day: "Private Lessons", venue: "Home Studio, Acton West London (also online)" },
          ].map((l, i) => (
            <div key={i} className="flex items-start gap-3 bg-charcoal-light rounded-lg p-4">
              <MapPin size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-heading font-semibold text-primary-foreground text-sm">{l.day}</p>
                <p className="text-primary-foreground/60 text-sm">{l.venue}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/contact" className="btn-cta-primary text-sm mt-8 inline-block">Get in Touch →</Link>
      </div>
    </section>
  </Layout>
);

export default About;
