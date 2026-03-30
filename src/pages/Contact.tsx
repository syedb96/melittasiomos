import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import RelatedPages from "@/components/RelatedPages";

const enquiryTypes = [
  "Group Classes — Chiswick or Ealing",
  "Monthly Latin Friday — Tickets & Info",
  "Wedding Dance — Consultation Request",
  "Private Lessons — Enquiry",
  "Pura Ladies — Audition / Membership",
  "Corporate / Hen Party Event",
  "Gift Vouchers",
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
      <SeoHead title="Contact Melitta Siomos | Salsa & Bachata Classes London" description="Get in touch with Melitta Siomos about Salsa & Bachata classes, private lessons, wedding dance, or events in London. Call, WhatsApp, or use our enquiry form." path="/contact" />

      <section className="section-padding section-warm">
        <div className="container-main">
          <FadeInUp>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Get in Touch with Melitta</h1>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left — Contact Info */}
            <FadeInUp delay={0.1}>
              <div>
                <blockquote className="font-display text-xl italic text-primary mb-8 border-l-4 border-primary pl-4">"Every great dancer started exactly where you are. Let's get you on the floor."</blockquote>

                <h2 className="font-display text-2xl font-bold mb-6">Why Dance with Melitta?</h2>
                <ul className="space-y-4 mb-8">
                  {[
                    { emoji: "🏆", title: "Award-Winning Coach", desc: "International award-winning instructor with 15+ years experience" },
                    { emoji: "👋", title: "All Levels Welcome", desc: "Absolute beginners to advanced, no partner needed" },
                    { emoji: "📍", title: "West London Hotspots", desc: "Chiswick (Mon), Ealing (Tue), Monthly Latin Fridays" },
                    { emoji: "💬", title: "Fast Replies", desc: "Enquiries answered within 24 hours" },
                    { emoji: "🎉", title: "Fun, Inclusive Vibe", desc: "Learn technique AND make lifelong friends" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <div>
                        <strong className="font-heading text-sm">{item.title}</strong>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="bg-card rounded-2xl p-6 card-hover space-y-3">
                  <h3 className="font-heading font-bold text-sm mb-3">Contact Details</h3>
                  <a href="mailto:siomosmelitta@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:underline"><Mail size={16} /> siomosmelitta@gmail.com</a>
                  <a href="tel:+447449482343" className="flex items-center gap-2 text-sm text-primary hover:underline"><Phone size={16} /> +44 7449 482 343</a>
                  <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline"><Send size={16} /> WhatsApp Chat</a>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground"><MapPin size={16} className="mt-0.5 text-primary" /> West London & Online</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock size={16} className="text-primary" /> Response time: Within 24 hours</div>
                  <div className="flex gap-3 mt-4">
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
                </div>
              </div>
            </FadeInUp>

            {/* Right — Form */}
            <FadeInUp delay={0.2}>
              <div className="bg-card rounded-2xl p-8 card-hover">
                <h2 className="font-heading font-semibold text-lg mb-6">Send a Message</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="font-display text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-heading font-semibold mb-1 block">Name *</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-heading font-semibold mb-1 block">Phone</label>
                        <input type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="+44" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1 block">Email *</label>
                      <input type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1 block">Enquiry Type *</label>
                      <select required value={formData.enquiry} onChange={e => setFormData(p => ({ ...p, enquiry: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                        <option value="">Select enquiry type…</option>
                        {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1 block">Message *</label>
                      <textarea required rows={4} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Tell us what you're looking for…" />
                    </div>
                    <button type="submit" disabled={submitting} className="btn-cta-primary text-sm w-full flex items-center justify-center gap-2 disabled:opacity-50">
                      <Send size={16} /> {submitting ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-main">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Prefer an Instant Reply?</h2>
          <p className="text-primary-foreground/80 mb-6">Chat with Melitta directly on WhatsApp</p>
          <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20get%20in%20touch" target="_blank" rel="noopener noreferrer" className="btn-cta-dark">💬 Chat on WhatsApp</a>
        </div>
      </section>

      {/* Community CTA */}
      <section className="section-padding section-dark text-center">
        <div className="container-main">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">Stay Connected</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta bg-green-600 text-white text-sm hover:bg-green-700">💬 Join Free WhatsApp Group</a>
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-sm">📲 Follow on Instagram</a>
          </div>
        </div>
      </section>

      <RelatedPages title="Quick Links" links={[
        { to: "/pura-nights", label: "Weekly Classes", desc: "Salsa & Bachata Mon & Tue" },
        { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 coaching" },
        { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance enquiries" },
        { to: "/prices", label: "Prices", desc: "View all pricing" },
        { to: "/locations", label: "Locations", desc: "Venues & directions" },
        { to: "/faq", label: "FAQ", desc: "Common questions" },
      ]} />
    </Layout>
  );
};

export default Contact;
