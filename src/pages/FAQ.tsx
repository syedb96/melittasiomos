import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    title: "Pura Nights FAQs",
    items: [
      { q: "Do I need a partner?", a: "No! Many dancers come solo. We rotate partners throughout the class, giving you the chance to dance with different people, build confidence, and meet new friends." },
      { q: "I'm a complete beginner — is it okay to come?", a: "Absolutely. Each session starts with a full-group warm-up before we split into 3 levels: Beginner, Improver, and Intermediate/Advanced. Our experienced teachers keep a close eye on students and may invite you to move up a level when you're ready." },
      { q: "Is it welcoming for singles?", a: "Yes — our events are open to everyone. Singles, couples, all ages and genders. We create a warm, social atmosphere where you can learn, laugh and level up." },
      { q: "What should I wear?", a: "Comfortable clothing you can move in. Smooth-soled or dance shoes recommended (avoid rubber soles that grip the floor too much)." },
      { q: "Is it cash only at the door?", a: "For drop-in classes, yes — cash at the door. You can also pre-book online via Ticket Tailor for guaranteed entry." },
      { q: "What's the difference between Salsa and Bachata?", a: "Salsa is generally faster, more energetic and rhythmically complex — danced in either Cuban style (circular) or NY/LA style (linear). Bachata originates from the Dominican Republic, has a more romantic, sensual feel, and is danced to a slower, guitar-driven rhythm. We teach both every week!" },
      { q: "What time should I arrive?", a: "Doors open at 7:15 PM. Classes start at 7:30 PM sharp. Arriving at 7:15 gives you time to settle in, meet people, and get your shoes on." },
      { q: "How do I get to the George IV Pub in Chiswick?", a: "85 Chiswick High Rd, London W4 2DR. Nearest tube: Gunnersbury or Turnham Green (District Line). Buses: 190, 237, 267." },
      { q: "How do I get to the Drayton Court Hotel in Ealing?", a: "2 The Avenue, West Ealing, W13 8PH. Nearest station: West Ealing (Elizabeth Line / GWR). Bus: 83, 207, E1." },
    ],
  },
  {
    title: "Wedding Dance FAQs",
    items: [
      { q: "Do we need any dance experience?", a: "Not at all. Most couples Melitta works with are complete beginners." },
      { q: "When should we start lessons?", a: "Ideally 8–12 weeks before your wedding, but last-minute options are possible depending on availability." },
      { q: "Where do the lessons take place?", a: "At Melitta's private home studio in West London, your home (within reasonable travel distance) or in a hired studio." },
      { q: "What style of dance can we do?", a: "Anything from a classic slow first dance to romantic Salsa/Bachata, a fun mash-up, or something more theatrical." },
      { q: "How much does it cost?", a: "All packages are custom-quoted based on your needs, timeline and location. Get in touch to receive options that fit your budget." },
    ],
  },
  {
    title: "Credits, Packs & Membership",
    items: [
      { q: "Can I freeze my subscription?", a: "Contact us at siomosmelitta@gmail.com and we'll do our best to accommodate special circumstances." },
      { q: "Do class credits expire?", a: "Monthly packages are valid for one calendar month from purchase." },
      { q: "Can I use my credits at both venues?", a: "Silver and Gold packages give access to both Monday (Chiswick) and Tuesday (Ealing) nights." },
    ],
  },
];

const FAQ = () => (
  <Layout>
    <SeoHead title="FAQs — Salsa & Bachata Classes London | Pura Nights by Melitta Siomos" description="Got questions about Salsa & Bachata classes in London? Find answers to the most common questions about Pura Nights, private lessons, pricing, booking and more." path="/faq" />

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Frequently Asked Questions</h1>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />

        {faqCategories.map((cat, ci) => (
          <div key={ci} className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6 text-primary">{cat.title}</h2>
            {cat.items.map((faq, i) => (
              <details key={i} className="border-b border-border py-4 group">
                <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        ))}

        <div className="text-center mt-8 bg-card rounded-lg p-8 card-hover">
          <h2 className="font-display text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">We're here to help! Reach out anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-cta-primary text-sm">Contact Us</Link>
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default FAQ;
