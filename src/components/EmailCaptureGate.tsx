import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Mail } from "lucide-react";

interface EmailCaptureGateProps {
  /** Headline above the form */
  headline?: string;
  /** Sub-copy under the headline */
  subcopy?: string;
  /** Subject used to tag the enquiry row in the backend */
  source: string;
  /** Optional outbound link shown after capture (e.g. Linktree/TicketTailor) */
  redirectUrl?: string;
  /** Optional CTA label for the redirect button */
  redirectLabel?: string;
  /** Visual variant */
  tone?: "warm" | "dark";
}

const captureSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Name must be under 200 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
});

/* <!-- WIX SECTION: EmailCaptureGate — replicate as Strip with form + button + outbound link --> */
const EmailCaptureGate = ({
  headline = "Get class reminders + the welcome guide",
  subcopy = "We'll send the weekly schedule, beginner tips, and Latin Friday news. One email. Easy unsubscribe.",
  source,
  redirectUrl,
  redirectLabel = "Skip & Book Now",
  tone = "warm",
}: EmailCaptureGateProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const renderedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot — silent success for bots
    if (website.trim() !== "") {
      setDone(true);
      return;
    }

    // Timing trap — silent success if submitted too fast
    if (Date.now() - renderedAtRef.current < 2000) {
      setDone(true);
      return;
    }

    const parsed = captureSchema.safeParse({ name, email });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Please check your details.");
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: `Newsletter signup from ${source}`,
      subject: "General Enquiry",
      source_page: source,
      status: "new",
    });
    setLoading(false);
    if (insertError) {
      setError("Couldn't save — please try again or just book directly.");
      return;
    }
    setDone(true);
  };

  const bg = tone === "dark" ? "bg-charcoal text-primary-foreground" : "section-warm";
  const inputBg = tone === "dark" ? "bg-charcoal/60 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/40" : "bg-background border-border";

  return (
    <section className={`section-padding ${bg}`}>
      <div className="container-main max-w-2xl text-center">
        {!done ? (
          <>
            <Mail className="mx-auto mb-4 text-primary" size={32} />
            <h2 className="font-display text-3xl font-bold mb-3">{headline}</h2>
            <p className={`mb-6 text-sm ${tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{subcopy}</p>
            <form onSubmit={submit} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 max-w-xl mx-auto">
              {/* Honeypot field — hidden from users, visible to bots */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name"
                maxLength={200}
                className={`px-4 py-3 rounded-xl border text-sm ${inputBg}`}
                aria-label="First name"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                maxLength={255}
                className={`px-4 py-3 rounded-xl border text-sm ${inputBg}`}
                aria-label="Email address"
              />
              <button type="submit" disabled={loading} className="btn-cta-primary text-sm whitespace-nowrap disabled:opacity-60">
                {loading ? "Sending…" : "Send Me Tips"}
              </button>
            </form>
            {error && <p className="text-destructive text-xs mt-3">{error}</p>}
            {redirectUrl && (
              <p className="mt-4 text-xs">
                <a href={redirectUrl} target="_blank" rel="noopener noreferrer" className={tone === "dark" ? "text-primary-foreground/60 underline" : "text-muted-foreground underline"}>
                  {redirectLabel} →
                </a>
              </p>
            )}
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="mx-auto mb-4 text-primary" size={40} />
            <h2 className="font-display text-3xl font-bold mb-3">You're in.</h2>
            <p className={`mb-6 text-sm ${tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>Check your inbox for the welcome guide. Now — let's get you booked.</p>
            {redirectUrl && (
              <a href={redirectUrl} target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">
                {redirectLabel.replace("Skip & ", "")} →
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailCaptureGate;
