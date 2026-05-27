import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Gift, Heart, Mail, MessageCircle, Sparkles, Check, Cake, Star, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import VoucherEnquiryForm from "@/components/VoucherEnquiryForm";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WhoThisIsForBlock from "@/components/WhoThisIsForBlock";
import NextStepServiceGrid from "@/components/NextStepServiceGrid";

/* <!-- WIX PAGE: /gift-vouchers -->
   <!-- WIX SECTION: Hero — Full-width dark Strip with eyebrow + H1 + sub + CTA pair -->
   <!-- WIX SECTION: Tier Grid — Repeater (3-col) of voucher tiers -->
   <!-- WIX SECTION: How It Works — 4-step Strip -->
   <!-- WIX SECTION: Best For — use-case cards -->
   <!-- WIX SECTION: FAQ — Wix FAQ app, FAQPage JSON-LD via Custom Code -->
   <!-- WIX SECTION: Final CTA — WhatsApp + Email pair -->
   <!-- WIX: Wire each tier "Buy" button to mailto OR Wix eCommerce voucher product when live -->
*/

const PHONE = "447449482343";
const EMAIL = "siomosmelitta@gmail.com";

interface Tier {
  amount: number;
  label: string;
  bestFor: string;
  perks: string[];
  highlighted?: boolean;
  badge?: string;
}

const tiers: Tier[] = [
  {
    amount: 25,
    label: "Taster",
    bestFor: "One drop-in class",
    perks: ["1 group Salsa or Bachata class", "Use across Mon Chiswick or Tue Ealing", "Perfect Secret Santa or thank-you gift"],
  },
  {
    amount: 50,
    label: "Date Night",
    bestFor: "Two classes for two people",
    perks: ["2 group classes for 2 people", "Or 1 four-week beginner block for one", "Personalised eGift card"],
  },
  {
    amount: 75,
    label: "Beginner Block",
    bestFor: "A full beginner journey",
    perks: ["Full 4-week beginner course", "Salsa or Bachata, your choice", "Includes Latin Friday entry"],
    highlighted: true,
    badge: "Most popular",
  },
  {
    amount: 100,
    label: "Couple's Bundle",
    bestFor: "A month of dancing for two",
    perks: ["4-week beginner block × 2 people", "Or 1 private lesson for one", "Great anniversary or birthday gift"],
  },
  {
    amount: 150,
    label: "Private Lesson Pair",
    bestFor: "Two private 1-to-1 sessions",
    perks: ["2 × 60-min private lessons", "Choreography, technique or styling", "Wedding-dance prep available"],
  },
  {
    amount: 200,
    label: "First Dance",
    bestFor: "Wedding-dance starter package",
    perks: ["3 × 60-min private wedding lessons", "Song selection support included", "Choreography tailored to your music"],
  },
];

const giftFaqs = [
  {
    q: "How is the gift voucher delivered?",
    a: "As a beautifully designed eGift card by email, usually within 24 hours of purchase (often the same evening). Delivered directly to the recipient or to you to forward.",
  },
  {
    q: "What can the voucher be used for?",
    a: "Any Pura Nights group class, private 1-to-1 lesson, wedding-dance package, Latin Friday entry, or workshop. The recipient picks — vouchers are flexible across all our offerings.",
  },
  {
    q: "Do gift vouchers expire?",
    a: "Vouchers are valid for 12 months from the date of purchase. We'll send a friendly reminder a month before expiry.",
  },
  {
    q: "Can I personalise the message?",
    a: "Yes — when you email Melitta to purchase, just include the recipient's name and a short personal message. It will appear on the eGift card itself.",
  },
  {
    q: "What if my recipient already dances elsewhere?",
    a: "That's fine — they can still use the voucher towards Latin Friday, private lessons, wedding prep, or styling sessions. Most experienced dancers redeem against private coaching.",
  },
  {
    q: "Can I top up an existing voucher amount?",
    a: "Yes. Custom amounts above £200 (e.g. for full wedding-dance packages or longer private-lesson plans) are easy — just message Melitta on WhatsApp with the amount.",
  },
  {
    q: "How do I pay?",
    a: "Bank transfer or Stripe link emailed by Melitta. Once payment clears, the eGift card is sent to your chosen recipient. Wix Stores checkout will replace this flow at launch.",
  },
];

const useCases = [
  { icon: Heart, title: "Anniversary", copy: "Couples redeem against private wedding-style sessions or our Tuesday styling class." },
  { icon: Cake, title: "Birthday", copy: "A grown-up gift that delivers a memory, not another candle." },
  { icon: Gift, title: "Christmas / Eid", copy: "Pura Ladies and weekly classes are our December bestsellers — order by 22 Dec." },
  { icon: Mail, title: "Thank You", copy: "Smaller £25–£50 vouchers are perfect for hosts, teachers and helpers." },
  { icon: Sparkles, title: "Wedding Gift", copy: "Give the couple a private first-dance starter — the gift their guests will remember." },
  { icon: Star, title: "Confidence Boost", copy: "For someone who's said 'I wish I could dance.' Beginner classes with zero judgement." },
  { icon: Users, title: "Beginner Taster", copy: "£25 covers a single drop-in. Risk-free, partner-free, the perfect first step." },
];

const buildMailto = (amount: number) => {
  const subject = encodeURIComponent(`Gift Voucher — £${amount}`);
  const body = encodeURIComponent(
    `Hi Melitta,\n\nI'd like to buy a £${amount} Pura Nights gift voucher.\n\nRecipient name:\nMessage to include:\nDelivery date:\n\nThanks!`
  );
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
};

const buildWhatsAppLink = (amount: number) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi Melitta, I'm interested in the £${amount} Pura Nights gift voucher. Can you confirm how it works and how I can purchase it?`)}`;

const GiftVouchers = () => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "Pura Nights Dance Gift Voucher",
        description: "eGift card for Salsa & Bachata classes, private lessons, wedding-dance coaching, and Latin Friday entry in West London.",
        brand: { "@type": "Brand", name: "Pura Nights" },
        category: "Gift Voucher",
        offers: tiers.map(t => ({
          "@type": "Offer",
          name: `£${t.amount} ${t.label} Voucher`,
          priceCurrency: "GBP",
          price: t.amount.toFixed(2),
          availability: "https://schema.org/InStock",
          url: `https://www.puranights.com/gift-vouchers#tier-${t.amount}`,
          seller: { "@type": "Organization", name: "Pura Nights" },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: giftFaqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  }), []);

  return (
    <Layout>
      <SeoHead
        title="Dance Gift Vouchers London | eGift Cards | Pura Nights"
        description="Give the gift of dance. Pura Nights eGift cards from £25 to £200 — Salsa, Bachata, private lessons, and wedding-dance packages in London. Delivered by email."
        path="/gift-vouchers"
        schema={schema}
      />

      {/* Hero */}
      <section className="bg-charcoal text-primary-foreground section-padding">
        <div className="container-main text-center max-w-3xl">
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">Pura Nights Gift Card</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">Give the Gift of Dance</h1>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            From a single class to a full wedding-dance package — Pura Nights eGift cards turn into evenings people remember. Personalised. Delivered by email. Valid for 12 months.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#tiers" className="btn-cta-primary">See voucher tiers</a>
            <a href={buildWhatsAppLink(75)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-heading font-semibold">
              <MessageCircle size={16} /> Ask Melitta
            </a>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <FadeInUp className="text-center mb-12">
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Choose An Amount</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Six tiers, one beautiful card</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-heading">Each tier maps to something specific in the studio — so the recipient knows exactly what they're getting.</p>
          </FadeInUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map(tier => (
              <StaggerItem key={tier.amount}>
                <div
                  id={`tier-${tier.amount}`}
                  className={`relative h-full flex flex-col rounded-2xl p-7 border transition-colors ${
                    tier.highlighted ? "bg-charcoal text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-accent uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                      {tier.badge}
                    </span>
                  )}
                  <Gift size={28} className={`mb-4 ${tier.highlighted ? "text-primary" : "text-primary"}`} />
                  <p className={`font-accent text-[10px] uppercase tracking-[0.25em] mb-2 ${tier.highlighted ? "text-primary" : "text-primary"}`}>{tier.label}</p>
                  <p className={`font-display text-4xl font-bold mb-1 ${tier.highlighted ? "text-primary-foreground" : ""}`}>£{tier.amount}</p>
                  <p className={`text-sm font-heading mb-5 ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{tier.bestFor}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.perks.map((p, i) => (
                      <li key={i} className={`flex gap-2 text-sm font-heading ${tier.highlighted ? "text-primary-foreground/85" : "text-foreground/80"}`}>
                        <Check size={14} className="text-primary mt-1 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-2">
                    <a href={buildMailto(tier.amount)} className={`text-center px-5 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                      tier.highlighted ? "bg-primary text-charcoal hover:bg-primary/90" : "bg-charcoal text-primary-foreground hover:bg-primary hover:text-charcoal"
                    }`}>
                      Buy by email
                    </a>
                    <a href={buildWhatsAppLink(tier.amount)} target="_blank" rel="noopener noreferrer" className={`text-center text-[11px] font-heading hover:underline ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      or message on WhatsApp
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp className="mt-10 text-center">
            <p className="text-sm text-muted-foreground font-heading">
              Need a custom amount above £200? <a href={buildWhatsAppLink(250)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Message Melitta</a> — full wedding packages and Pura Ladies private blocks are easy to arrange.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Best for / use cases */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-5xl">
          <FadeInUp className="text-center mb-10">
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Who It's For</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">A grown-up gift that lands</h2>
          </FadeInUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="bg-card rounded-2xl p-6 text-center border border-border">
                <Icon size={28} className="text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-heading leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-4xl">
          <FadeInUp className="text-center mb-10">
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Simple Process</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">How it works</h2>
          </FadeInUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "1", t: "Pick an amount", d: "Choose a tier above or request a custom amount." },
              { n: "2", t: "Email Melitta", d: "Send recipient name + your personal message." },
              { n: "3", t: "Pay securely", d: "Bank transfer or Stripe link — same day." },
              { n: "4", t: "Card delivered", d: "Beautifully designed eGift card in their inbox." },
            ].map(s => (
              <div key={s.n} className="bg-card rounded-2xl p-6 text-center">
                <p className="font-display text-3xl font-bold text-primary mb-3">{s.n}</p>
                <h3 className="font-heading font-semibold text-base mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium voucher enquiry form — emails buyer, posts to enquiries CMS, optional Wix Stores handoff */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-2xl">
          <FadeInUp>
            <VoucherEnquiryForm defaultAmount={75} />
          </FadeInUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-3xl">
          <FadeInUp className="text-center mb-10">
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Before You Buy</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Gift Voucher FAQs</h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Accordion type="multiple">
              {giftFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`gv-${i}`}>
                  <AccordionTrigger className="font-heading font-semibold text-left text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeInUp>

          <FadeInUp className="mt-12 text-center">
            <div className="bg-charcoal rounded-2xl p-8">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">Ready to gift the dance floor?</h3>
              <p className="text-primary-foreground/70 mb-6 font-heading text-sm">Email or WhatsApp Melitta — vouchers usually go out within 24 hours.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href={`mailto:${EMAIL}?subject=Gift%20Voucher%20Enquiry`} className="inline-flex items-center gap-2 btn-cta-primary text-sm">
                  <Mail size={16} /> Email Melitta
                </a>
                <a href={buildWhatsAppLink(75)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors text-sm font-heading font-semibold">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <WhoThisIsForBlock
      title="Who Pura Nights vouchers are for"
      personas={[
        { label: "Partner gifting", description: "Anniversaries, birthdays, or 'we keep saying we'd dance one day'." },
        { label: "Friend groups", description: "A shared experience instead of another candle." },
        { label: "Engagement gifts", description: "Pre-wedding dance lessons couples actually use." },
        { label: "Corporate gifting", description: "Memorable client / team thank-you with a story attached." },
      ]}
    />
    <NextStepServiceGrid
      items={[
        { to: "/start-here", label: "How to Redeem", description: "Walk recipients through their first class." },
        { to: "/pura-nights", label: "What They'll Experience", description: "Show them the room before they arrive." },
        { to: "/wedding-dance", label: "Wedding Lessons", description: "Pair a voucher with first-dance coaching." },
      ]}
    />
    <RelatedPages title="Related Pages" links={[
        { to: "/pura-nights", label: "Weekly Classes", desc: "Salsa & Bachata every Mon & Tue" },
        { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 coaching sessions" },
        { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance choreography" },
        { to: "/prices", label: "Prices & Bundles", desc: "All pricing options" },
        { to: "/contact", label: "Contact Us", desc: "Get in touch with Melitta" },
      ]} />
    </Layout>
  );
};

export default GiftVouchers;
