import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { supabase } from "@/integrations/supabase/client";
import { trackLead, trackConversion, trackEvent } from "@/lib/analytics";
import logo from "@/assets/hero-dance.jpg"; // fallback brand mark not needed

const schema = z.object({
  first_name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  venue_preference: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
});

const WHATSAPP = "https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%20just%20claimed%20my%20free%20taster%20class%20and%20wanted%20to%20say%20hello";

const FreeTaster = () => {
  const [submitted, setSubmitted] = useState<{ first_name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      first_name: fd.get("first_name"),
      email: fd.get("email"),
      venue_preference: fd.get("venue_preference") || undefined,
      message: fd.get("message") || undefined,
    });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details"); return; }
    setLoading(true);
    trackLead("free_taster_form");
    const { error: dbErr } = await supabase.from("free_taster_leads").insert([{
      ...parsed.data,
      source_page: typeof window !== "undefined" ? window.location.pathname : undefined,
    }]);
    setLoading(false);
    if (dbErr) { setError("Something went wrong. Please WhatsApp Melitta directly."); return; }
    trackConversion("free_taster_submit");
    setSubmitted({ first_name: parsed.data.first_name });
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-primary-foreground">
      <SeoHead
        title="Free Taster Salsa or Bachata Class — Pura Nights London"
        description="Claim your free taster class at Pura Nights. No experience needed, no partner, West London. Limited spots per week."
        path="/free-taster"
      />
      <header className="px-4 py-4 flex items-center justify-between border-b border-primary/10">
        <Link to="/" className="font-display text-xl font-bold text-primary-foreground">PURA NIGHTS</Link>
        <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("engagement", "whatsapp_header_click", "free_taster")} className="text-primary font-heading text-xs">💬 WhatsApp</a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl text-center">
          <span className="inline-block bg-primary text-charcoal font-accent text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-5">Limited spots</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Your first class, on us.</h1>
          <p className="text-primary-foreground/70 text-base md:text-lg font-heading mb-8 max-w-md mx-auto">Try Salsa or Bachata for free. No experience. No partner. No awkwardness. Just show up and move.</p>

          {submitted ? (
            <div className="bg-ivory text-charcoal rounded-2xl p-8 shadow-lg">
              <CheckCircle2 className="mx-auto text-primary mb-3" size={48} />
              <h2 className="font-display text-2xl font-bold mb-2">You're booked in, {submitted.first_name}!</h2>
              <p className="text-muted-foreground mb-5">Check your email for class details. If you have questions, WhatsApp Melitta directly.</p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("engagement", "whatsapp_post_submit", "free_taster")} className="inline-block bg-primary text-charcoal font-heading font-semibold rounded-full px-6 py-3">💬 Message Melitta →</a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-ivory text-charcoal rounded-2xl p-6 md:p-8 shadow-lg text-left space-y-4">
              <p className="font-heading font-semibold text-lg text-center mb-2">Claim your free taster spot</p>
              <input name="first_name" required placeholder="Your first name" maxLength={100} className="w-full rounded-lg border border-border px-4 py-3 font-heading text-sm bg-background" />
              <input name="email" type="email" required placeholder="your@email.com" maxLength={255} className="w-full rounded-lg border border-border px-4 py-3 font-heading text-sm bg-background" />
              <select name="venue_preference" defaultValue="" className="w-full rounded-lg border border-border px-4 py-3 font-heading text-sm bg-background">
                <option value="" disabled>Which venue suits you?</option>
                <option>Monday – Chiswick (George IV, W4 2DR)</option>
                <option>Tuesday – Ealing (Drayton Court, W13 8PH)</option>
                <option>No preference</option>
              </select>
              <textarea name="message" rows={3} maxLength={1000} placeholder="Any questions for Melitta? (optional)" className="w-full rounded-lg border border-border px-4 py-3 font-heading text-sm bg-background resize-none" />
              {error && <p className="text-destructive text-xs font-heading">{error}</p>}
              <button type="submit" disabled={loading} className="w-full bg-primary text-charcoal font-heading font-bold rounded-full px-6 py-4 text-base disabled:opacity-60">
                {loading ? "Sending…" : "CLAIM MY FREE CLASS →"}
              </button>
              <p className="text-muted-foreground text-[11px] text-center italic">We'll send one confirmation message. No spam, ever. Unsubscribe any time.</p>
            </form>
          )}
        </div>

        <div className="mt-16 max-w-5xl w-full grid md:grid-cols-3 gap-4">
          {[
            { t: "You won't be put on the spot", d: "Every class starts with the basics. If you've never danced before, you're in the right place." },
            { t: "You don't need a partner", d: "Most people come alone. We rotate partners in class so you dance with everyone." },
            { t: "No commitment after", d: "This is a free class — not a subscription sign-up. If you love it, brilliant. If not, no hard feelings." },
          ].map((c, i) => (
            <div key={i} className="bg-ivory text-charcoal rounded-xl p-5 shadow-sm">
              <p className="font-heading font-bold mb-1">{c.t}</p>
              <p className="text-muted-foreground text-sm">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="text-primary-foreground/60 text-xs mt-8 text-center font-heading">Rated 5.0 on Google · 500+ students taught · West London since 2019</p>
      </main>

      <footer className="px-4 py-6 text-center border-t border-primary/10">
        <Link to="/privacy-policy" className="text-primary-foreground/50 text-xs hover:text-primary">Privacy Policy</Link>
      </footer>
    </div>
  );
};

export default FreeTaster;
