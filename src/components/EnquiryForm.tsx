import { useState } from "react";
import { Send } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

interface EnquiryFormProps {
  /** Pre-set enquiry_type — must match the validate_contact_submission allow-list. */
  enquiryType: string;
  /** Page label shown in the form intro. */
  contextLabel: string;
  /** Optional WhatsApp prefill (full URL). */
  whatsappUrl?: string;
  /** Extra optional fields shown above the message field. */
  extraFields?: { name: keyof ExtraValues; label: string; type?: "text" | "date"; placeholder?: string }[];
  /** Override default placeholder for the message field. */
  messagePlaceholder?: string;
}

type ExtraValues = {
  company?: string;
  organisation?: string;
  website?: string;
  eventDate?: string;
  location?: string;
  groupSize?: string;
  sessionType?: string;
  budget?: string;
};

const baseSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

/* <!-- WIX SECTION: Replace with Wix Form connected to the Enquiries collection.
       Hidden field "enquiry_type" must be pre-filled with the page's enquiry category. --> */
const EnquiryForm = ({ enquiryType, contextLabel, whatsappUrl, extraFields = [], messagePlaceholder }: EnquiryFormProps) => {
  const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });
  const [extra, setExtra] = useState<ExtraValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [renderedAt] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    if (honeypot.trim() !== "" || Date.now() - renderedAt < 2000) {
      setSubmitted(true);
      return;
    }

    const result = baseSchema.safeParse(data);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach(i => { const k = i.path[0] as string; if (!fe[k]) fe[k] = i.message; });
      setErrors(fe);
      return;
    }

    // Compose message with extra context fields
    const extraLines = Object.entries(extra)
      .filter(([, v]) => v && String(v).trim() !== "")
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const fullMessage = extraLines
      ? `[${contextLabel}]\n${extraLines}\n\n${result.data.message}`
      : `[${contextLabel}]\n${result.data.message}`;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        enquiry_type: enquiryType,
        message: fullMessage,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Enquiry submit failed", err);
      setServerError(
        "We couldn't send your enquiry right now. Please try again — or WhatsApp Melitta on +44 7449 482 343."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl p-8 text-center border border-border">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="font-display text-2xl font-bold mb-2">Enquiry Sent</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Thank you — Melitta will reply within 24 hours. For an instant reply, WhatsApp directly.
        </p>
        {whatsappUrl && (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">
            💬 WhatsApp Melitta
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-5" noValidate>
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor={`hp-${enquiryType}`}>Leave empty</label>
        <input id={`hp-${enquiryType}`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
      </div>

      {serverError && (
        <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {serverError}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-heading font-semibold mb-1.5 block">Your Name *</label>
          <input
            type="text" maxLength={200} value={data.name}
            onChange={e => setData(p => ({ ...p, name: e.target.value }))}
            className={`w-full rounded-xl border ${errors.name ? "border-destructive" : "border-input"} bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary`}
            placeholder="Jane Smith"
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="text-sm font-heading font-semibold mb-1.5 block">Phone (optional)</label>
          <input
            type="tel" maxLength={30} value={data.phone}
            onChange={e => setData(p => ({ ...p, phone: e.target.value }))}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            placeholder="+44 7..."
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-heading font-semibold mb-1.5 block">Email *</label>
        <input
          type="email" maxLength={255} value={data.email}
          onChange={e => setData(p => ({ ...p, email: e.target.value }))}
          className={`w-full rounded-xl border ${errors.email ? "border-destructive" : "border-input"} bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary`}
          placeholder="jane@example.com"
        />
        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
      </div>

      {extraFields.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {extraFields.map(f => (
            <div key={f.name as string}>
              <label className="text-sm font-heading font-semibold mb-1.5 block">{f.label}</label>
              <input
                type={f.type || "text"} maxLength={200}
                value={(extra[f.name] as string) || ""}
                onChange={e => setExtra(p => ({ ...p, [f.name]: e.target.value }))}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                placeholder={f.placeholder}
              />
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="text-sm font-heading font-semibold mb-1.5 block">Your Message *</label>
        <textarea
          maxLength={5000} rows={5} value={data.message}
          onChange={e => setData(p => ({ ...p, message: e.target.value }))}
          className={`w-full rounded-xl border ${errors.message ? "border-destructive" : "border-input"} bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary`}
          placeholder={messagePlaceholder || "Tell us about your group, date, and what you're hoping for."}
        />
        {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button type="submit" disabled={submitting} className="btn-cta-primary text-sm flex items-center justify-center gap-2 disabled:opacity-50 py-3.5 flex-1">
          <Send size={16} /> {submitting ? "Sending…" : "Send Enquiry"}
        </button>
        {whatsappUrl && (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm flex-1 text-center py-3.5">
            💬 WhatsApp instead
          </a>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground text-center">
        By submitting you agree to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
};

export default EnquiryForm;
