import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import RelatedPages from "@/components/RelatedPages";

const faqCategories = [
  {
    title: "About Classes",
    items: [
      { q: "Do I need a partner?", a: "No. Many of our students come solo. We rotate partners throughout each class, so you'll dance with lots of different people — it's one of the best ways to improve." },
      { q: "Do I need to book in advance?", a: "No booking required for weekly group classes. Just turn up. Monthly Latin Friday events require tickets, available via our booking link." },
      { q: "Can I come as a complete beginner?", a: "Absolutely. Our Beginners class starts from zero every week. No experience, no partner, no problem." },
      { q: "What should I wear?", a: "Comfortable clothes you can move in. For shoes, flat-soled or heeled dance shoes are ideal. Trainers with a flat sole work well for beginners. Avoid thick-soled running shoes as they make pivoting difficult." },
      { q: "What level should I join?", a: "If you've never danced before, start in Beginners. If you have some experience but are unsure, message Melitta on WhatsApp and she'll advise." },
      { q: "Do you teach Salsa On1 or On2?", a: "We primarily teach Salsa On1 (Crossbody/LA style) — the most widely danced style at social events worldwide." },
      { q: "What Bachata styles do you teach?", a: "We teach Traditional, Bachata Moderna, and Bachata Sensual." },
      { q: "What's the difference between Salsa and Bachata?", a: "Salsa is generally faster, more energetic and rhythmically complex. Bachata has a more romantic, sensual feel and is danced to a slower, guitar-driven rhythm. We teach both every week!" },
    ],
  },
  {
    title: "About Venues",
    items: [
      { q: "Where are the classes held?", a: "We teach at two venues:\n• Mondays: The George IV, 185 Chiswick High Rd, London W4 2DR\n• Tuesdays: The Drayton Court Hotel, 2 The Avenue, Ealing, W13 8PH" },
      { q: "How do I get to The George IV, Chiswick?", a: "Nearest tube: Turnham Green (District Line). The pub is a 5-minute walk from the station on Chiswick High Road. Buses: 190, 237, 267." },
      { q: "How do I get to Drayton Court Hotel, Ealing?", a: "Nearest stations: West Ealing (Elizabeth Line) or Drayton Green Overground. Bus: 83, 207, E1." },
      { q: "Is there parking available?", a: "Street parking is available near both venues after 6:30 PM. Check local signage for restrictions." },
      { q: "What time should I arrive?", a: "Doors open at 7:15 PM. Classes start at 7:30 PM sharp. Arriving at 7:15 gives you time to settle in and meet people." },
    ],
  },
  {
    title: "About Pricing",
    items: [
      { q: "How much does a class cost?", a: "Drop-in from £10. 5-class bundles from £42. See full pricing on our Prices page." },
      { q: "What's included in a bundle?", a: "Class credits valid for 3 months at both Chiswick and Ealing venues." },
      { q: "Do bundles expire?", a: "Bundles are valid for 3 months from purchase date. Non-refundable but transferable." },
      { q: "Can I use my credits at both venues?", a: "Yes! All bundles and Silver/Gold subscriptions give access to both Monday (Chiswick) and Tuesday (Ealing) nights." },
      { q: "Do you offer student or concession rates?", a: "Contact Melitta directly to discuss — siomosmelitta@gmail.com" },
      { q: "How do I buy a gift voucher?", a: "Visit our Gift Vouchers page and select your preferred amount. Instant digital delivery." },
    ],
  },
  {
    title: "Wedding Dance",
    items: [
      { q: "Do we need any dance experience?", a: "Not at all. Most couples Melitta works with are complete beginners." },
      { q: "When should we start lessons?", a: "Ideally 8–12 weeks before your wedding, but last-minute options are possible depending on availability." },
      { q: "Where do the lessons take place?", a: "At Melitta's private studio in West London, your home, or a hired studio." },
      { q: "What style of dance can we do?", a: "Anything from a classic slow first dance to romantic Salsa/Bachata, a fun mash-up, or something more theatrical." },
      { q: "How many lessons will we need?", a: "Most couples book 6–10 sessions. The exact number depends on your goals, song, and experience." },
    ],
  },
  {
    title: "Pura Ladies",
    items: [
      { q: "How do I join Pura Ladies?", a: "Pura Ladies holds auditions in February each year. Follow @puraladies on Instagram to be notified when auditions open." },
      { q: "Is Pura Ladies only for experienced dancers?", a: "Auditions require at minimum improvers-level experience. Regular Pura Nights attendance is the perfect preparation." },
      { q: "Are there Pura Ladies teams outside London?", a: "Yes — we have active teams in Plymouth, Munich, and Lisbon as well as multiple groups across London." },
    ],
  },
  {
    title: "Private Lessons",
    items: [
      { q: "Can I book a private lesson?", a: "Yes. Private lessons are inquiry-based. Contact Melitta directly via WhatsApp or email for availability and pricing." },
      { q: "Where do private lessons take place?", a: "Flexible — Melitta can arrange a suitable studio location in central or west London. Discuss in your initial consultation." },
    ],
  },
];

const FAQ = () => (
  <Layout>
    <SeoHead
      title="FAQs — Salsa & Bachata Classes London | Pura Nights by Melitta Siomos"
      description="Got questions about Salsa & Bachata classes in London? Find answers about Pura Nights classes, venues, pricing, wedding dance, private lessons and more."
      path="/faq"
      schema={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqCategories.flatMap(c => c.items.map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } }))) }}
    />

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Frequently Asked Questions</h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        </FadeInUp>

        {faqCategories.map((cat, ci) => (
          <FadeInUp key={ci} delay={ci * 0.05}>
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-6 text-primary">{cat.title}</h2>
              {cat.items.map((faq, i) => (
                <details key={i} className="border-b border-border py-4 group">
                  <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed whitespace-pre-line">{faq.a}</p>
                </details>
              ))}
            </div>
          </FadeInUp>
        ))}

        <FadeInUp>
          <div className="text-center mt-8 bg-card rounded-2xl p-8 card-hover">
            <h2 className="font-display text-2xl font-bold mb-3">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">We're here to help! Reach out anytime.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-cta-primary text-sm">Contact Us</Link>
              <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">💬 WhatsApp Us</a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages title="Helpful Pages" links={[
      { to: "/start-here", label: "Start Here", desc: "New to Salsa & Bachata?" },
      { to: "/pura-nights", label: "Weekly Classes", desc: "Mon Chiswick · Tue Ealing" },
      { to: "/prices", label: "Prices & Bundles", desc: "All pricing options" },
      { to: "/locations", label: "Locations", desc: "Venue details & directions" },
      { to: "/blog/salsa-vs-bachata", label: "Salsa vs Bachata", desc: "Which should you learn?" },
      { to: "/contact", label: "Contact Melitta", desc: "Get in touch anytime" },
    ]} />
  </Layout>
);

export default FAQ;
