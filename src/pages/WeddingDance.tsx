import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import weddingImg from "@/assets/wedding-dance.jpg";
import { Star } from "lucide-react";

const reviews = [
  { name: "Sofia & Patrizio", text: "Melitta choreographed our wedding dance. We chose a Salsa & Bachata dance because it's romantic but also fun. Our guests loved the performance!" },
  { name: "Eva & Miguel", text: "We were total beginners. Melitta broke everything down and made the lessons one of our favourite parts of wedding planning." },
  { name: "Hannah & James", text: "Melitta understood exactly what we wanted — classy, not cheesy. She was so patient from start to finish." },
];

const WeddingDance = () => (
  <Layout>
    <SeoHead title="Wedding Dance Lessons London | First Dance Choreography | Melitta Siomos" description="Make your first dance unforgettable. Private wedding dance lessons with Melitta Siomos in West London — Salsa, Bachata or classic. Elegant, fun & tailored to you." path="/wedding-dance" />

    <section className="relative h-72 md:h-96 overflow-hidden">
      <img src={weddingImg} alt="Couple performing first wedding dance" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsla(16,62%,52%,0.7), hsla(0,0%,8%,0.6))' }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Wedding Dance Made Easy</h1>
          <p className="font-heading text-primary-foreground/90 text-lg">Private first dance lessons — elegant, fun and completely tailored to you</p>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-12">Whether you're dreaming of a simple, romantic first dance or a show-stopping Salsa or Bachata routine, Melitta Siomos makes the whole process relaxed, enjoyable and stress free. No experience needed.</p>

        {/* How it works */}
        <h2 className="font-display text-3xl font-bold text-center mb-3">How It Works</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10" />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { step: "1", title: "Free Consultation", desc: "Share your date, venue, song ideas and how you want the dance to feel." },
            { step: "2", title: "Choose Package", desc: "Decide how many lessons and the style that suits you both." },
            { step: "3", title: "Private Lessons", desc: "Meet at Melitta's studio or your location. Learn step by step." },
            { step: "4", title: "Final Polish", desc: "Refine the routine, posture, presence and simple practice drills." },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold mx-auto mb-3">{s.step}</div>
              <h3 className="font-heading font-bold text-sm mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-xs">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <h2 className="font-display text-2xl font-bold text-center mb-8">What Couples Say</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card rounded-lg p-6 card-hover">
              <div className="flex gap-1 mb-3 text-secondary">{Array(5).fill(0).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}</div>
              <p className="text-muted-foreground text-sm italic mb-3">"{r.text}"</p>
              <p className="font-heading font-bold text-sm">{r.name}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="font-display text-2xl font-bold mb-6">Wedding Dance FAQs</h2>
        {[
          { q: "Do we need any dance experience?", a: "Not at all. Most couples Melitta works with are complete beginners." },
          { q: "When should we start lessons?", a: "Ideally 8–12 weeks before your wedding, but last-minute options are possible." },
          { q: "Can you work around my dress / shoes / veil?", a: "Yes. We'll discuss outfit details so the choreography feels comfortable." },
        ].map((f, i) => (
          <details key={i} className="border-b border-border py-4">
            <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{f.q}</summary>
            <p className="text-muted-foreground text-sm mt-2">{f.a}</p>
          </details>
        ))}

        <div className="text-center mt-12">
          <Link to="/contact" className="btn-cta-primary text-sm">🎉 Book a Free Consultation</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default WeddingDance;
