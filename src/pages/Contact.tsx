import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, Instagram, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import RelatedPages from "@/components/RelatedPages";

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

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", enquiry: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        enquiry_type: formData.enquiry,
        message: formData.message,
      });
      if (error) throw error;
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", phone: "", email: "", enquiry: "", message: "" });
      }, 8000);
    } catch (err) {
      console.error("Contact form error:", err);
      alert("Something went wrong. Please try WhatsApp instead.");
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
                <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20get%20in%20touch" target="_blank" rel="noopener noreferrer" className="block bg-card rounded-2xl p-6 card-hover border-2 border-green-500/20 hover:border-green-500/40 transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <MessageCircle size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm">WhatsApp Melitta</h3>
                      <p className="text-xs text-green-600 font-heading">Fastest reply — usually within hours</p>
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
                  <div className="text-center py-16">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">Thank you — Melitta will reply within 24 hours.</p>
                    <p className="text-sm text-muted-foreground">Need a faster reply? <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">WhatsApp Melitta →</a></p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-heading font-semibold mb-1.5 block">Your Name *</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Jane Smith" />
                      </div>
                      <div>
                        <label className="text-sm font-heading font-semibold mb-1.5 block">Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <input type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="+44 7..." />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1.5 block">Email Address *</label>
                      <input type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1.5 block">What's This About? *</label>
                      <select required value={formData.enquiry} onChange={e => setFormData(p => ({ ...p, enquiry: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                        <option value="">Select enquiry type…</option>
                        {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1.5 block">Your Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Tell us what you're looking for — the more detail the better." />
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
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20get%20in%20touch" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">💬 Chat on WhatsApp</a>
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
