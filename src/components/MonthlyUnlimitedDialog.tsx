import { useState } from "react";
import { Crown, MessageCircle, Send, X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { waLink, trackWaClick } from "@/lib/whatsapp";
import { trackCta } from "@/lib/analytics";

/* <!-- WIX SECTION: Monthly Unlimited Enquiry — replicate as a Wix Lightbox
     that holds a Wix Form posting to the "Enquiries" collection with
     enquiry_type pre-filled "Group Classes — Chiswick or Ealing".
     Add a secondary WhatsApp button using the same prefilled message. --> */

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().max(30).optional().or(z.literal("")),
  preferredVenue: z.enum(["Chiswick (Mon)", "Ealing (Tue)", "Both"]),
  frequency: z.enum(["Weekly", "2x per week", "More"]),
  startDate: z.string().max(40).optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

const MonthlyUnlimitedDialog = ({ open, onClose }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredVenue: "Both" as "Chiswick (Mon)" | "Ealing (Tue)" | "Both",
    frequency: "Weekly" as "Weekly" | "2x per week" | "More",
    startDate: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const composeMessage = () =>
    `Hi Melitta, I'd like details on the Monthly Unlimited Pura Nights pass.\n\n` +
    `Preferred venue: ${form.preferredVenue}\n` +
    `Frequency: ${form.frequency}\n` +
    (form.startDate ? `Ideal start: ${form.startDate}\n` : "") +
    (form.notes ? `\nNotes: ${form.notes}` : "");

  const waUrl = waLink(composeMessage());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      const msg =
        `MONTHLY UNLIMITED enquiry\n` +
        `Venue: ${form.preferredVenue}\n` +
        `Frequency: ${form.frequency}\n` +
        (form.startDate ? `Start: ${form.startDate}\n` : "") +
        (form.notes ? `Notes: ${form.notes}\n` : "");
      const { error: dbErr } = await supabase.from("enquiries").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: "Monthly Unlimited — Pricing & Availability",
        message: msg,
        source_page:
          typeof window !== "undefined" ? window.location.pathname : null,
      });
      if (dbErr) throw dbErr;
      trackCta("monthly_unlimited_submit", "monthly_unlimited_dialog");
      setDone(true);
    } catch (err) {
      console.error(err);
      setError("Could not send — please WhatsApp Melitta directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-charcoal/70 backdrop-blur-sm p-3"
      role="dialog"
      aria-modal="true"
      aria-labelledby="monthly-unlimited-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-background rounded-2xl border border-border shadow-xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Crown size={18} />
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase">
              Monthly Unlimited
            </p>
          </div>
          <h3
            id="monthly-unlimited-title"
            className="font-display text-2xl font-bold mb-2"
          >
            Get Monthly Unlimited pricing
          </h3>
          <p className="text-sm text-muted-foreground font-heading mb-5">
            Melitta will reply with current rates, venue details and onboarding
            within hours. Both venues, weekly classes plus social dancing.
          </p>

          {done ? (
            <div className="text-center py-6">
              <p className="font-display text-lg font-bold mb-2">Sent ✓</p>
              <p className="text-sm text-muted-foreground font-heading mb-5">
                Melitta will be in touch shortly. For an instant chat:
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWaClick("monthly_unlimited_after_submit")}
                className="btn-cta-primary text-xs inline-flex items-center gap-1.5"
              >
                <MessageCircle size={14} /> Continue on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <input
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-xs font-heading text-muted-foreground">
                  Preferred venue
                  <select
                    value={form.preferredVenue}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        preferredVenue: e.target.value as typeof form.preferredVenue,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  >
                    <option>Both</option>
                    <option>Chiswick (Mon)</option>
                    <option>Ealing (Tue)</option>
                  </select>
                </label>
                <label className="text-xs font-heading text-muted-foreground">
                  Frequency
                  <select
                    value={form.frequency}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        frequency: e.target.value as typeof form.frequency,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  >
                    <option>Weekly</option>
                    <option>2x per week</option>
                    <option>More</option>
                  </select>
                </label>
              </div>
              <input
                placeholder="Ideal start date (optional)"
                value={form.startDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startDate: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Anything Melitta should know? (optional)"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              {error && (
                <p className="text-xs text-destructive font-heading">{error}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-cta-primary text-xs inline-flex items-center justify-center gap-1.5 disabled:opacity-60"
                >
                  <Send size={14} />
                  {submitting ? "Sending…" : "Request pricing"}
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWaClick("monthly_unlimited_whatsapp")}
                  className="btn-cta-outline text-xs inline-flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={14} /> WhatsApp instead
                </a>
              </div>
              <p className="text-[10px] text-muted-foreground font-heading pt-1">
                We only use your details to reply to this enquiry. No marketing
                lists.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyUnlimitedDialog;
