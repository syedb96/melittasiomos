import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Sparkles, MessageCircle } from "lucide-react";
import { WA, trackWaClick } from "@/lib/whatsapp";

interface FirstClassLeadMagnetProps {
  /** Slug or path used to tag the enquiry source */
  source: string;
  /** Optional visual tone */
  tone?: "warm" | "dark";
  /** Optional pre-selected interest (e.g. "First salsa class") */
  defaultInterest?: string;
  /** Optional override heading */
  heading?: string;
}

const INTERESTS = [
  "First salsa class",
  "First bachata class",
  "Coming alone",
  "Wedding dance",
  "Private lessons",
  "Pura Ladies",
  "Corporate / group booking",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please add your first name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  interest: z.string().trim().min(1).max(60),
});

/* <!-- WIX SECTION: FirstClassLeadMagnet — replicate as Wix Lightbox/Strip with Wix Form. CRM tag: lead-magnet + first-class. Owner subject: "New first-timer guide lead — Pura Nights". Auto-reply subject: "Your Pura Nights first-timer guide". See docs/75. --> */
const FirstClassLeadMagnet = ({
  source,
  tone = "warm",
  defaultInterest = "First salsa class",
  heading = "Not sure what to expect at your first class?",
}: FirstClassLeadMagnetProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<string>(defaultInterest);
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const renderedAt = useRef<number>(Date.now());

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (website.trim() !== "") { setDone(true); return; }
    if (Date.now() - renderedAt.current < 1800) { setDone(true); return; }

    const parsed = schema.safeParse({ name, email, phone, interest });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Please check your details.");
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: "First-Timer Guide",
      message: `Lead magnet: First-Timer Guide. Interest: ${parsed.data.interest}. Source: ${source}.`,
      source_page: source,
    });
    setLoading(false);
    if (insertError) {
      setError("Couldn't save — please try again, or WhatsApp Melitta directly.");
      return;
    }
    setDone(true);
  };

  const isDark = tone === "dark";
  const bg = isDark ? "bg-charcoal text-primary-foreground" : "section-warm";
  const inputCls = isDark
    ? "bg-charcoal/60 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/40"
    : "bg-background border-border";

  return (
    <section className={`section-padding ${bg}`} aria-labelledby={`fclm-${source}`}>
      <div className="container-main max-w-2xl">
        {!done ? (
          <div className="text-center">
            <Sparkles className="mx-auto mb-3 text-primary" size={28} />
            <h2 id={`fclm-${source}`} className="font-display text-3xl md:text-4xl font-bold mb-3">
              {heading}
            </h2>
            <p className={`mb-6 text-sm md:text-base ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              Get a simple first-timer guide — what to wear, when to arrive, whether you need a partner, how the levels work, and what happens during the social.
            </p>

            <form onSubmit={submit} className="grid gap-3 text-left">
              {/* Honeypot */}
              <input
                type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={website} onChange={(e) => setWebsite(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  required type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="First name" maxLength={120}
                  className={`px-4 py-3 rounded-xl border text-sm ${inputCls}`}
                  aria-label="First name"
                />
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" maxLength={255}
                  className={`px-4 py-3 rounded-xl border text-sm ${inputCls}`}
                  aria-label="Email address"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (optional, for fast replies)" maxLength={30}
                  className={`px-4 py-3 rounded-xl border text-sm ${inputCls}`}
                  aria-label="Phone (optional)"
                />
                <select
                  value={interest} onChange={(e) => setInterest(e.target.value)}
                  className={`px-4 py-3 rounded-xl border text-sm ${inputCls}`}
                  aria-label="What you're most interested in"
                >
                  {INTERESTS.map((it) => <option key={it} value={it}>{it}</option>)}
                </select>
              </div>
              <button
                type="submit" disabled={loading}
                className="btn-cta-primary text-sm disabled:opacity-60 mt-1"
              >
                {loading ? "Sending…" : "Send me the guide"}
              </button>
              <p className={`text-xs mt-1 ${isDark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                We email the guide once + occasional class updates. One-click unsubscribe.
              </p>
            </form>

            {error && <p className="text-destructive text-xs mt-3">{error}</p>}

            <div className="mt-5">
              <a
                href={WA.startHere()}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackWaClick("first-class-lead-magnet", { source })}
                className={`inline-flex items-center gap-2 text-xs underline ${isDark ? "text-primary-foreground/80" : "text-muted-foreground"}`}
              >
                <MessageCircle size={14} /> Prefer a quick chat? Message Melitta on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto mb-4 text-primary" size={40} />
            <h2 className="font-display text-3xl font-bold mb-3">Done — your first-timer guide is on the way.</h2>
            <p className={`mb-6 text-sm ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              Want a faster answer? Message Melitta on WhatsApp.
            </p>
            <a
              href={WA.startHere()}
              target="_blank" rel="noopener noreferrer"
              onClick={() => trackWaClick("first-class-lead-magnet-success", { source })}
              className="btn-cta-primary text-sm inline-flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Melitta
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FirstClassLeadMagnet;
