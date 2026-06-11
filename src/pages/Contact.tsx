import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, Instagram, MessageCircle } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import RelatedPages from "@/components/RelatedPages";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: /contact -->
   <!-- WIX: Use Wix Forms connected to Enquiries CMS collection -->
   <!-- WIX: Set up Wix Automations for email notifications on submission -->
   <!-- WIX SECTION: Hero — use Strip -->
   <!-- WIX SECTION: Contact Form — use Wix Form element -->
   <!-- WIX SECTION: Contact Info Cards — use Card grid -->
*/
const enquiryTypes = [
  "Group Classes — Chiswick or Ealing",
  "Monthly Latin Friday — Tickets & Info",
  "Wedding Dance — Consultation",
  "Private Lessons — Enquiry",
  "Pura Ladies — Audition / Membership",
  "Corporate / Hen Party Event",
  "Gift Vouchers",
  "Online Classes",
  "General Enquiry",
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Name must be under 200 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  phone: z.string().max(30, "Phone must be under 30 characters").optional().or(z.literal("")),
  enquiry: z.string().refine((v) => enquiryTypes.includes(v), "Please select an enquiry type"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be under 5000 characters"),
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<typeof formData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", enquiry: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Spam protection: honeypot field (must stay empty) + render timestamp (humans take >2s)
  const [honeypot, setHoneypot] = useState("");
  const [renderedAt] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    // Spam traps — silently succeed so bots don't learn
    if (honeypot.trim() !== "" || Date.now() - renderedAt < 2000) {
      setSubmitted(true);
      return;
    }

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        enquiry_type: result.data.enquiry,
        message: result.data.message,
      });
      if (error) throw error;
      setSubmittedSnapshot({ ...formData });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSubmittedSnapshot(null);
        setFormData({ name: "", phone: "", email: "", enquiry: "", message: "" });
      }, 12000);
    } catch (err) {
      console.error("Contact form submission failed", err);
      setSubmitError(
        "We couldn't send your message right now. Please try again in a moment, or WhatsApp Melitta directly on +44 7449 482 343 — she replies within hours."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <SeoHead title="Contact Melitta Siomos | Salsa & Bachata Classes London" description="Get in touch with Melitta Siomos about Salsa & Bachata classes, private lessons, wedding dance, or events in West London. WhatsApp, call, or use our enquiry form." path="/contact" />

      {/* Hero */}
      <section className="section-padding section-dark text-center">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">We'd Love to Hear From You</h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto font-heading">Whether you're a complete beginner, a wedding couple, or looking for private coaching — Melitta and the team are here to help.</p>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — Contact Cards */}
            <div className="lg:col-span-2 space-y-5">
              <FadeInUp>
                {/* WhatsApp — Primary */}
                <a {...waCustom("Hi Melitta, I'd like to get in touch", "Contact:120")} className="block bg-card rounded-2xl p-6 card-hover border-2 border-secondary/20 hover:border-secondary/40 transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <MessageCircle size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm">WhatsApp Melitta</h3>
                      <p className="text-xs text-secondary font-heading">Fastest reply — usually within hours</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs">Tap to open a chat with Melitta directly</p>
                </a>
              </FadeInUp>

              <FadeInUp delay={0.05}>
                <div className="bg-card rounded-2xl p-6 card-hover">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm">Email</h3>
                      <a href="mailto:siomosmelitta@gmail.com" className="text-xs text-primary hover:underline">siomosmelitta@gmail.com</a>
                    </div>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <div className="bg-card rounded-2xl p-6 card-hover">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm">Call or Text</h3>
                      <a href="tel:+447449482343" className="text-xs text-primary hover:underline">+44 7449 482 343</a>
                    </div>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.15}>
                <div className="bg-card rounded-2xl p-6 card-hover">
                  <h3 className="font-heading font-bold text-sm mb-3">Find Us</h3>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2"><MapPin size={12} className="text-primary mt-0.5 flex-shrink-0" /><span><strong className="text-foreground">Monday:</strong> The George IV, 185 Chiswick High Rd, W4 2DR</span></div>
                    <div className="flex items-start gap-2"><MapPin size={12} className="text-peach mt-0.5 flex-shrink-0" /><span><strong className="text-foreground">Tuesday:</strong> Drayton Court Hotel, 2 The Avenue, Ealing, W13 8PH</span></div>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <div className="bg-card rounded-2xl p-6 card-hover">
                  <h3 className="font-heading font-bold text-sm mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { href: "https://www.instagram.com/melittasiomos/", label: "@melittasiomos" },
                      { href: "https://www.instagram.com/puranights.salsabachata/", label: "@puranights" },
                      { href: "https://www.instagram.com/puraladies/", label: "@puraladies" },
                      { href: "https://www.instagram.com/wedding_dance_made_easy/", label: "@weddingdance" },
                    ].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-foreground transition-colors" title={s.label}>
                        <Instagram size={18} />
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Clock size={12} className="text-primary" />
                    <span>Response time: usually within 24 hours</span>
                  </div>
                </div>
              </FadeInUp>
            </div>

            {/* Right — Enquiry Form */}
            <FadeInUp delay={0.1} className="lg:col-span-3">
              <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-lg border border-border">
                <h2 className="font-display text-2xl font-bold mb-2">Send an Enquiry</h2>
                <p className="text-muted-foreground text-sm mb-8">Fill in the form below and Melitta will get back to you as soon as possible.</p>

                {submitted ? (
                  <div role="status" aria-live="polite" className="py-10">
                    <div className="text-center mb-6">
                      <div className="text-5xl mb-3">🎉</div>
                      <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground text-sm">Thank you — Melitta will reply within 24 hours. Here's what we received:</p>
                    </div>
                    {submittedSnapshot && (
                      <dl className="rounded-xl border border-border bg-background/60 p-5 text-sm space-y-2 mb-6">
                        <div className="grid grid-cols-[110px_1fr] gap-2"><dt className="font-heading font-semibold text-muted-foreground">Name</dt><dd>{submittedSnapshot.name}</dd></div>
                        <div className="grid grid-cols-[110px_1fr] gap-2"><dt className="font-heading font-semibold text-muted-foreground">Email</dt><dd className="break-all">{submittedSnapshot.email}</dd></div>
                        {submittedSnapshot.phone && (
                          <div className="grid grid-cols-[110px_1fr] gap-2"><dt className="font-heading font-semibold text-muted-foreground">Phone</dt><dd>{submittedSnapshot.phone}</dd></div>
                        )}
                        <div className="grid grid-cols-[110px_1fr] gap-2"><dt className="font-heading font-semibold text-muted-foreground">Enquiry</dt><dd>{submittedSnapshot.enquiry}</dd></div>
                        <div className="grid grid-cols-[110px_1fr] gap-2"><dt className="font-heading font-semibold text-muted-foreground">Message</dt><dd className="whitespace-pre-wrap">{submittedSnapshot.message}</dd></div>
                      </dl>
                    )}
                    <p className="text-sm text-muted-foreground text-center">Need a faster reply? <a {...waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", "Contact:219")} className="text-primary font-semibold hover:underline">WhatsApp Melitta →</a></p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Honeypot — hidden from humans, irresistible to bots. WIX: replicate as hidden text input named "website". */}
                    <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
                      <label htmlFor="website-url">Leave this field empty</label>
                      <input id="website-url" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
                    </div>
                    {submitError && (
                      <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                        {submitError}
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="text-sm font-heading font-semibold mb-1.5 block">Your Name *</label>
                        <input id="contact-name" name="name" type="text" maxLength={200} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className={`w-full rounded-xl border ${errors.name ? 'border-destructive' : 'border-input'} bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} placeholder="Jane Smith" />
                        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="text-sm font-heading font-semibold mb-1.5 block">Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <input id="contact-phone" name="phone" type="tel" maxLength={30} value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className={`w-full rounded-xl border ${errors.phone ? 'border-destructive' : 'border-input'} bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} placeholder="+44 7..." />
                        {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-sm font-heading font-semibold mb-1.5 block">Email Address *</label>
                      <input id="contact-email" name="email" type="email" maxLength={255} value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className={`w-full rounded-xl border ${errors.email ? 'border-destructive' : 'border-input'} bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} placeholder="jane@example.com" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-enquiry" className="text-sm font-heading font-semibold mb-1.5 block">What's This About? *</label>
                      <select id="contact-enquiry" name="enquiry" value={formData.enquiry} onChange={e => setFormData(p => ({ ...p, enquiry: e.target.value }))} className={`w-full rounded-xl border ${errors.enquiry ? 'border-destructive' : 'border-input'} bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`}>
                        <option value="">Select enquiry type…</option>
                        {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.enquiry && <p className="text-destructive text-xs mt-1">{errors.enquiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="text-sm font-heading font-semibold mb-1.5 block">Your Message *</label>
                      <textarea id="contact-message" name="message" maxLength={5000} rows={5} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className={`w-full rounded-xl border ${errors.message ? 'border-destructive' : 'border-input'} bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} placeholder="Tell us what you're looking for — the more detail the better." />
                      {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={submitting} className="btn-cta-primary text-sm w-full flex items-center justify-center gap-2 disabled:opacity-50 py-3.5">
                      <Send size={16} /> {submitting ? "Sending…" : "Send Message"}
                    </button>
                    <p className="text-[11px] text-muted-foreground text-center">By submitting this form you agree to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.</p>
                  </form>
                )}
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-14 text-center" style={{ background: 'var(--gradient-gold)' }}>
        <div className="container-main">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold text-charcoal mb-3">Prefer an Instant Reply?</h2>
            <p className="text-charcoal/70 mb-6 font-heading text-sm">Most enquiries are answered within a few hours via WhatsApp</p>
            <a {...waCustom("Hi Melitta, I'd like to get in touch", "Contact:281")} className="btn-cta-dark text-sm">💬 Chat on WhatsApp</a>
          </FadeInUp>
        </div>
      </section>

      <RelatedPages title="Quick Links" links={[
        { to: "/pura-nights", label: "Weekly Classes", desc: "Salsa & Bachata Mon & Tue" },
        { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 coaching enquiries" },
        { to: "/wedding-dance", label: "Wedding Dance", desc: "Free consultation" },
        { to: "/prices", label: "Prices", desc: "View all pricing" },
        { to: "/locations", label: "Locations", desc: "Venues & directions" },
        { to: "/faq", label: "FAQ", desc: "Common questions" },
      ]} />
    </Layout>
  );
};

export default Contact;
