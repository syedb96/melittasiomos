import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    setError(null);
    const { error: insertError } = await supabase.from("enquiries").insert({
      name,
      email,
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
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name"
                className={`px-4 py-3 rounded-xl border text-sm ${inputBg}`}
                aria-label="First name"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
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
