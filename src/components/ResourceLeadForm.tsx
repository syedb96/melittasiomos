import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { trackCta } from "@/lib/analytics";

/* <!-- WIX SECTION: Resource Lead Capture Form -->
   Wix mirror: Wix Form bound to "contact_submissions" with hidden
   enquiry_type = "General Enquiry". On success, deliver checklist PDF
   via Wix Automations + email. */

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  interest: z.string().min(1, "Pick an interest"),
});

const INTERESTS = [
  "First class",
  "Salsa",
  "Bachata",
  "Wedding dance",
  "Private lesson",
  "Corporate / group booking",
  "Pura Ladies",
];

const WA = "https://wa.me/447449482343?text=Hi%20Melitta%20%E2%80%94%20I%20just%20requested%20the%20First%20Class%20Checklist.";

const ResourceLeadForm = () => {
  const [data, setData] = useState({ name: "", email: "", phone: "", interest: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [hp, setHp] = useState("");
  const [renderedAt] = useState(() => Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (hp.trim() !== "" || Date.now() - renderedAt < 1500) { setDone(true); return; }
    const r = schema.safeParse(data);
    if (!r.success) {
      const fe: Record<string, string> = {};
      r.error.issues.forEach(i => { const k = i.path[0] as string; if (!fe[k]) fe[k] = i.message; });
      setErrors(fe);
      return;
    }
    setSubmitting(true);
    try {
      await supabase.from("contact_submissions").insert({
        name: r.data.name,
        email: r.data.email,
        phone: r.data.phone || null,
        enquiry_type: "General Enquiry",
        message: `[Resource: First Class Checklist]\nInterest: ${r.data.interest}\nRequested from /resources.`,
      });
      trackCta("resource_lead_submit", "/resources");
      setDone(true);
    } catch {
      setErrors({ form: "Couldn't send — please WhatsApp Melitta instead." });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="font-display text-xl font-bold text-charcoal mb-2">Done — your checklist is on the way.</p>
        <p className="text-charcoal/70 text-sm font-heading mb-4">Check your inbox in the next few minutes. Want a faster answer?</p>
        <a href={WA} target="_blank" rel="noopener" onClick={() => trackCta("whatsapp_after_resource_submit", "/resources")} className="inline-flex rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-heading font-semibold hover:opacity-90">
          WhatsApp Melitta →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-primary/20 bg-card p-6 md:p-8 shadow-sm">
      <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Free Download</p>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">Get the Pura Nights First-Class Checklist</h3>
      <p className="text-charcoal/70 text-sm font-heading mb-5">
        A one-pager covering what to wear, when to arrive, how partner rotation works, what to expect, and
        how to pick your first salsa or bachata class. Free, no spam.
      </p>

      <input type="text" name="company_website" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-heading font-semibold text-charcoal/70 mb-1">First name *</label>
          <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm font-heading focus:border-primary focus:outline-none" />
          {errors.name && <p className="text-destructive text-[11px] mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-heading font-semibold text-charcoal/70 mb-1">Email *</label>
          <input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm font-heading focus:border-primary focus:outline-none" />
          {errors.email && <p className="text-destructive text-[11px] mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-heading font-semibold text-charcoal/70 mb-1">Interest *</label>
          <select value={data.interest} onChange={e => setData({ ...data, interest: e.target.value })} className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm font-heading focus:border-primary focus:outline-none">
            <option value="">Choose…</option>
            {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          {errors.interest && <p className="text-destructive text-[11px] mt-1">{errors.interest}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-heading font-semibold text-charcoal/70 mb-1">Phone (optional)</label>
          <input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm font-heading focus:border-primary focus:outline-none" />
        </div>
      </div>

      {errors.form && <p className="text-destructive text-xs mb-2">{errors.form}</p>}

      <button disabled={submitting} type="submit" className="w-full rounded-lg bg-primary text-primary-foreground px-5 py-3 text-sm font-heading font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity">
        {submitting ? "Sending…" : "Send me the checklist"}
      </button>

      <p className="text-charcoal/50 text-[11px] font-heading mt-3 text-center">
        We never share your email. Unsubscribe with one click.
      </p>
    </form>
  );
};

export default ResourceLeadForm;
