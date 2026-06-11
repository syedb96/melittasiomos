import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { trackCta } from "@/lib/analytics";
import { waCustom } from "@/lib/whatsapp";
import { logSecurityEvent } from "@/lib/security-log";

/* <!-- WIX SECTION: Partner Outreach Form -->
   Wix mirror: Wix Form → "contact_submissions" with enquiry_type
   "Partnership / Venue Collaboration", CRM label "partner-outreach". */

const PARTNER_TYPES = [
  "Wedding planner",
  "Event venue",
  "Corporate wellbeing team",
  "University / student society",
  "Fitness / wellness studio",
  "London lifestyle blogger",
  "TikTok / Instagram creator",
  "Local publisher / press",
  "Travel / things-to-do site",
  "Hotel / concierge team",
  "Other",
];

const WANTS = [
  "Embed class finder widget",
  "Referral / affiliate link",
  "Wedding supplier partnership",
  "Venue partnership",
  "Corporate collaboration",
  "Press / source quote",
  "Student society partnership",
];

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  organisation: z.string().trim().min(1).max(200),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  social: z.string().trim().max(200).optional().or(z.literal("")),
  partnerType: z.string().min(1),
  audience: z.string().trim().max(120).optional().or(z.literal("")),
  want: z.string().min(1),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const WA = waCustom("Hi Melitta — I'd like to discuss a Pura Nights partnership.", "PartnerOutreachForm:46").href;

const PartnerOutreachForm = () => {
  const [d, setD] = useState({ name: "", email: "", organisation: "", website: "", social: "", partnerType: "", audience: "", want: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [hp, setHp] = useState("");
  const [renderedAt] = useState(() => Date.now());

  const set = (k: keyof typeof d, v: string) => setD({ ...d, [k]: v });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (hp.trim() !== "" || Date.now() - renderedAt < 1500) {
      logSecurityEvent({ event_type: "form_honeypot_tripped", source: "PartnerOutreachForm", severity: "warn", meta: { hp: hp.length > 0, dt: Date.now() - renderedAt } });
      setDone(true);
      return;
    }
    const r = schema.safeParse(d);
    if (!r.success) {
      const fe: Record<string, string> = {};
      r.error.issues.forEach(i => { const k = i.path[0] as string; if (!fe[k]) fe[k] = i.message; });
      setErrors(fe);
      logSecurityEvent({ event_type: "form_validation_failed", source: "PartnerOutreachForm", severity: "info", meta: { fields: Object.keys(fe) } });
      return;
    }
    setSubmitting(true);
    try {
      const body = [
        `[partner-outreach]`,
        `Organisation: ${r.data.organisation}`,
        `Website: ${r.data.website || "—"}`,
        `Social: ${r.data.social || "—"}`,
        `Partner type: ${r.data.partnerType}`,
        `Audience: ${r.data.audience || "—"}`,
        `Want: ${r.data.want}`,
        ``,
        r.data.message || "(no message)",
      ].join("\n");
      const { error } = await supabase.from("contact_submissions").insert({
        name: r.data.name,
        email: r.data.email,
        enquiry_type: "Partnership / Venue Collaboration",
        message: body,
      });
      if (error) throw error;
      trackCta("partner_outreach_submit", "/partners/embed-widget");
      logSecurityEvent({ event_type: "form_submission_success", source: "PartnerOutreachForm" });
      setDone(true);
    } catch (err) {
      setErrors({ form: "Couldn't send — please WhatsApp Melitta instead." });
      logSecurityEvent({ event_type: "form_submission_error", source: "PartnerOutreachForm", severity: "error", meta: { message: (err as Error)?.message?.slice(0, 200) } });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="font-display text-xl font-bold text-charcoal mb-2">Thanks — we'll review your partner request.</p>
        <p className="text-charcoal/70 text-sm font-heading mb-4">You'll get the right link, embed code or collaboration pack within 48 hours.</p>
        <a href={WA} target="_blank" rel="noopener" className="inline-flex rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-heading font-semibold hover:opacity-90">
          Message Melitta about a partnership →
        </a>
      </div>
    );
  }

  const F = ({ label, k, type = "text", required }: { label: string; k: keyof typeof d; type?: string; required?: boolean }) => (
    <div>
      <label className="block text-[11px] font-heading font-semibold text-charcoal/70 mb-1">{label}{required && " *"}</label>
      <input type={type} value={d[k]} onChange={e => set(k, e.target.value)} className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm font-heading focus:border-primary focus:outline-none" />
      {errors[k] && <p className="text-destructive text-[11px] mt-1">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="rounded-2xl border border-primary/20 bg-card p-6 md:p-8 shadow-sm">
      <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Partner Request</p>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">Request a partner link or embed</h3>
      <p className="text-charcoal/70 text-sm font-heading mb-5">Tell us about your organisation and we'll send the right link, snippet or collaboration pack within 48 hours.</p>

      <input type="text" name="company_url" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <F label="Name" k="name" required />
        <F label="Email" k="email" type="email" required />
        <F label="Organisation / platform" k="organisation" required />
        <F label="Website URL" k="website" />
        <F label="Instagram / TikTok / LinkedIn" k="social" />
        <F label="Audience size / monthly traffic" k="audience" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-heading font-semibold text-charcoal/70 mb-1">Partner type *</label>
          <select value={d.partnerType} onChange={e => set("partnerType", e.target.value)} className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm font-heading focus:border-primary focus:outline-none">
            <option value="">Choose…</option>
            {PARTNER_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.partnerType && <p className="text-destructive text-[11px] mt-1">{errors.partnerType}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-heading font-semibold text-charcoal/70 mb-1">What do you want? *</label>
          <select value={d.want} onChange={e => set("want", e.target.value)} className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm font-heading focus:border-primary focus:outline-none">
            <option value="">Choose…</option>
            {WANTS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.want && <p className="text-destructive text-[11px] mt-1">{errors.want}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[11px] font-heading font-semibold text-charcoal/70 mb-1">Message (optional)</label>
        <textarea value={d.message} onChange={e => set("message", e.target.value)} rows={4} className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm font-heading focus:border-primary focus:outline-none" />
      </div>

      {errors.form && <p className="text-destructive text-xs mb-2">{errors.form}</p>}

      <button disabled={submitting} type="submit" className="w-full rounded-lg bg-primary text-primary-foreground px-5 py-3 text-sm font-heading font-semibold hover:opacity-90 disabled:opacity-60">
        {submitting ? "Sending…" : "Request a partner link →"}
      </button>
    </form>
  );
};

export default PartnerOutreachForm;
