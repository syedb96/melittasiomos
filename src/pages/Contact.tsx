import { useState } from "react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const enquiryTypes = ["Pura Nights Class", "Private Lessons", "Wedding Dance", "Pura Ladies", "Birthday/Hen Party", "Corporate Event", "General"];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <SeoHead title="Contact Melitta Siomos | Salsa & Bachata Classes London" description="Get in touch with Melitta Siomos about Salsa & Bachata classes, private lessons, wedding dance, or events in London. Call, WhatsApp, or use our enquiry form." path="/contact" />

      <section className="section-padding section-warm">
        <div className="container-main">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Have Questions? Ready to Dance with Melitta?</h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">Why Dance with Melitta?</h2>
              <ul className="space-y-4 mb-8">
                {[
                  { emoji: "🏆", title: "Award-Winning Coach", desc: "Bachata UK Champion with 15 years teaching experience" },
                  { emoji: "👋", title: "All Levels Welcome", desc: "Absolute beginners to advanced, no partner needed" },
                  { emoji: "📍", title: "West London Hotspots", desc: "Chiswick (Mon), Ealing (Tue), Covent Garden (Pura Ladies)" },
                  { emoji: "💬", title: "Fast Replies", desc: "Enquiries answered within 24 hrs" },
                  { emoji: "🎉", title: "Fun, Inclusive Vibe", desc: "Learn technique AND make friends" },
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

              <div className="bg-card rounded-lg p-6 card-hover space-y-3">
                <h3 className="font-heading font-bold text-sm mb-3">Prefer email? Reach Melitta at:</h3>
                <a href="mailto:siomosmelitta@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"><Mail size={16} /> siomosmelitta@gmail.com</a>
                <a href="tel:+447449482343" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"><Phone size={16} /> +44 7449 482 343</a>
                <div className="flex items-start gap-2 text-sm text-muted-foreground"><MapPin size={16} className="mt-0.5 text-primary" /> Acton, West London & Online</div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card rounded-lg p-8 card-hover">
              <h2 className="font-heading font-semibold text-lg mb-6 text-muted-foreground">Get in Touch & We'll help answer any questions you have</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="font-display text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1 block">Name *</label>
                      <input type="text" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1 block">Phone *</label>
                      <input type="tel" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="+44" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1 block">Email *</label>
                      <input type="email" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-heading font-semibold mb-1 block">Enquiry Type</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        {enquiryTypes.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-heading font-semibold mb-1 block">Message *</label>
                    <textarea required rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <button type="submit" className="btn-cta-primary text-sm w-full flex items-center justify-center gap-2">
                    <Send size={16} /> Submit Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-main">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">Stay Connected</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground text-sm hover:bg-charcoal-light">💬 Join Free WhatsApp Group</a>
            <a href="https://www.instagram.com/PuraNights" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-sm">📲 Stay Connected for Offers</a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
