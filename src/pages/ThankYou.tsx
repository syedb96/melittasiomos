import { Link } from "react-router-dom";
import { Instagram, MessageCircle, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: /thank-you -->
   <!-- WIX: Configure as form-success redirect for Wix Forms -->
   <!-- WIX SECTION: Confetti animation + thanks message + social CTAs --> */

// Connect form submissions to redirect here on success.
// Confetti pieces — pure CSS animation, no JS dependency.
const confettiPieces = Array.from({ length: 24 }, (_, i) => i);

const ThankYou = () => (
  <Layout>
    <SeoHead title="Thank You | Melitta Siomos Dance Academy" description="Your message is on its way. Melitta or the team will be in touch shortly." path="/thank-you" />

    <section className="section-padding section-dark text-center min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {confettiPieces.map((i) => (
          <span
            key={i}
            className="absolute top-[-20px] block w-2 h-3 opacity-80"
            style={{
              left: `${(i * 4.16) % 100}%`,
              backgroundColor: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(0 0% 100%)",
              animation: `confetti-fall ${4 + (i % 4)}s linear ${i * 0.18}s infinite`,
              transform: `rotate(${i * 17}deg)`,
            }}
          />
        ))}
      </div>

      <div className="container-main max-w-2xl relative z-10">
        <p className="text-6xl md:text-7xl mb-4">🎉</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">You're all set!</h1>
        <p className="text-primary-foreground/70 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Thanks for reaching out. Melitta or the team will be in touch shortly. In the meantime, come say hello on Instagram — that's where the magic happens between classes.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {[
            { handle: "puranights.salsabachata", url: "https://www.instagram.com/puranights.salsabachata" },
            { handle: "melittasiomos", url: "https://www.instagram.com/melittasiomos" },
            { handle: "puraladies", url: "https://www.instagram.com/puraladies" },
          ].map(s => (
            <a key={s.handle} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-charcoal-light hover:bg-primary/15 border border-primary/20 hover:border-primary text-primary-foreground/80 hover:text-primary px-5 py-2.5 rounded-full text-xs font-heading font-semibold transition-all">
              <Instagram size={14} /> @{s.handle}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a {...waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", "ThankYou:55")} className="btn-cta-primary text-sm inline-flex items-center gap-2">
            <MessageCircle size={14} /> WhatsApp Melitta
          </a>
          <Link to="/" className="btn-cta-outline text-sm inline-flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        <p className="text-primary-foreground/50 text-xs font-heading mt-8">
          Enjoyed a class recently? A Google review takes 60 seconds and really helps.{" "}
          <Link to="/leave-a-review" className="text-primary hover:underline">Leave a review →</Link>
        </p>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.7; }
        }
      `}</style>
    </section>
  </Layout>
);

export default ThankYou;
