import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /faq -->
   <!-- WIX: Use Wix FAQ app with categories, or custom Accordions grouped by section -->
   <!-- WIX: Add FAQPage JSON-LD schema -->
*/
const faqCategories = [
  {
    title: "Getting Started",
    items: [
      { q: "Do I need a partner to join?", a: "No. We rotate partners throughout every class. Many of our most dedicated students come alone every week and dance with everyone." },
      { q: "I've never danced before. Can I really join as a complete beginner?", a: "Yes — the Beginners class starts from zero every single week. No prior experience is assumed. Melitta builds from the very first step." },
      { q: "How do I know which level to join?", a: "If you've never danced before or only danced once or twice, join Beginners. If you've had classes before, join Beginners to warm up and Melitta will advise on the right level for you." },
      { q: "Do I need to book in advance?", a: "No booking is required for weekly classes — just turn up on the night. For Monthly Latin Friday events, tickets are available in advance via our Linktree (early bird pricing available) or on the door." },
      { q: "What should I wear?", a: "Comfortable, breathable clothing you can move in. For shoes — flat trainers with a smooth sole are perfect for beginners. Avoid thick-soled running shoes as they make turning difficult." },
      { q: "Is there a minimum age requirement?", a: "Our regular classes welcome adults of all ages (18+). If you're enquiring about younger students, contact Melitta directly." },
    ],
  },
  {
    title: "The Classes",
    items: [
      { q: "What's the difference between Salsa and Bachata?", a: "Salsa is faster, more energetic, and footwork-driven (150–200 BPM). Bachata is slower, more romantic and expressive, with a characteristic hip tap on beat 4 (110–130 BPM). We teach both every week.", link: { to: "/blog/salsa-vs-bachata", label: "Read full comparison →" } },
      { q: "What exactly happens in a class?", a: "Classes run for 30 minutes each. You start solo (warm-up and basic footwork), then move into partner work with rotation. By the end of each class you'll have a mini combination to practice at the social." },
      { q: "What's the social? Do I have to stay?", a: "The social is an open dance floor period after classes, with a DJ playing Salsa and Bachata. It runs for 2 hours. You don't have to stay — but most students do, because it's where everything clicks." },
      { q: "Can I come to the social without taking a class?", a: "Yes — £5 social-only entry at both venues." },
      { q: "Are there any classes specifically for women?", a: "Yes — every Tuesday evening at Ealing begins with a FREE Ladies Styling warm-up from 6:50–7:20pm, open to all levels." },
    ],
  },
  {
    title: "Pricing & Payment",
    items: [
      { q: "How much does it cost?", a: "Drop-in: £10 (1 class) or £15 (2 classes + social). Bundles available from £42 (5 classes). Full pricing on our Prices page.", link: { to: "/prices", label: "See full pricing →" } },
      { q: "How do I pay?", a: "Cash on the night or card (SumUp card reader available at both venues)." },
      { q: "Do bundle passes expire?", a: "5-class bundles: valid for 8 weeks. 10-class bundles: valid for 16 weeks. Monthly unlimited: rolling monthly. Contact Melitta if you need an extension." },
      { q: "Do you offer gift vouchers?", a: "Yes — from £25 to £200, available as digital vouchers.", link: { to: "/gift-vouchers", label: "Buy a Gift Voucher →" } },
    ],
  },
  {
    title: "Other Services",
    items: [
      { q: "Do you offer private lessons?", a: "Yes — private 1-on-1 or couples lessons are available with Melitta. Pricing is tailored to your goals and schedule. Contact her directly.", link: { to: "https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20private%20lessons", label: "Enquire about Private Lessons →", external: true } },
      { q: "Can you choreograph our wedding first dance?", a: "Yes — this is one of Melitta's specialities. She has helped dozens of couples create unforgettable first dances. Book a free consultation.", link: { to: "/wedding-dance", label: "Wedding Dance →" } },
      { q: "Can I join Pura Ladies?", a: "Pura Ladies auditions are held annually, typically in February. Improvers-level social dancing is the minimum requirement. Follow @puraladies for audition announcements." },
      { q: "Do you offer online classes?", a: "Yes — live Zoom classes and HD drill videos available.", link: { to: "/online-classes", label: "Online Classes →" } },
      { q: "Can you run a class for a hen party or corporate event?", a: "Yes — contact Melitta to discuss group bookings and private events.", link: { to: "/contact", label: "Contact →" } },
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
          <p className="text-muted-foreground text-center text-sm mb-2">20 answers to the questions we hear most</p>
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
                  {faq.link && (
                    faq.link.external ? (
                      <a href={faq.link.to} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-heading font-semibold mt-2 inline-block hover:underline">{faq.link.label}</a>
                    ) : (
                      <Link to={faq.link.to} className="text-primary text-sm font-heading font-semibold mt-2 inline-block hover:underline">{faq.link.label}</Link>
                    )
                  )}
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
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%20have%20a%20quick%20question%20about%20Pura%20Nights%20classes." target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">💬 WhatsApp Us</a>
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
