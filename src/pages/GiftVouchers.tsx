import { Link } from "react-router-dom";
import { Gift, Heart, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const amounts = [25, 50, 75, 100, 150, 200];

const GiftVouchers = () => (
  <Layout>
    <SeoHead
      title="Dance Gift Vouchers London | eGift Cards | Pura Nights by Melitta Siomos"
      description="Give the gift of dance! Buy an eGift Card for Salsa & Bachata classes with Melitta Siomos in London. Choose your amount, personalise your message, deliver instantly."
      path="/gift-vouchers"
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main text-center max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Give the Gift of Dance 🎁</h1>
        <p className="text-primary-foreground/80 text-lg mb-8">You can't go wrong with a Pura Nights Gift Card! Perfect for birthdays, anniversaries, Christmas, or just because. Choose an amount and let Melitta personalise your message.</p>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold text-center mb-12">Choose Your Gift Card Amount</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {amounts.map((amount) => (
            <div key={amount} className="bg-card rounded-lg p-8 card-hover text-center border border-border hover:border-primary transition-colors">
              <Gift size={32} className="text-primary mx-auto mb-4" />
              <p className="font-display text-3xl font-bold mb-2">£{amount}</p>
              <p className="text-muted-foreground text-sm mb-4">Gift Voucher</p>
              <a href="mailto:siomosmelitta@gmail.com?subject=Gift%20Voucher%20Request%20-%20%C2%A3{amount}" className="btn-cta-primary text-xs py-2 px-6">Buy Now</a>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-card rounded-lg p-8 text-center max-w-2xl mx-auto">
          <Heart size={28} className="text-primary mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold mb-3">How Gift Vouchers Work</h3>
          <div className="text-muted-foreground text-sm space-y-2">
            <p>1. Choose your amount and email Melitta to purchase</p>
            <p>2. Personalise with a message for the recipient</p>
            <p>3. Receive your beautifully designed eGift card by email</p>
            <p>4. The recipient can use it towards any Pura Nights class, private lesson, or wedding dance package</p>
          </div>
          <a href="mailto:siomosmelitta@gmail.com?subject=Gift%20Voucher%20Enquiry" className="inline-flex items-center gap-2 btn-cta-primary text-sm mt-6">
            <Mail size={16} /> Email to Purchase
          </a>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold mb-8">Gift Voucher FAQs</h2>
        <div className="space-y-6 text-left">
          {[
            { q: "How is the gift voucher delivered?", a: "Gift vouchers are delivered as beautifully designed eGift cards via email. You can choose to have it sent directly to the recipient or to yourself." },
            { q: "What can the voucher be used for?", a: "Vouchers can be redeemed against any Pura Nights group class, private 1-to-1 lesson, wedding dance package, or workshop." },
            { q: "Do gift vouchers expire?", a: "Gift vouchers are valid for 12 months from the date of purchase." },
          ].map((faq, i) => (
            <div key={i} className="bg-background rounded-lg p-6">
              <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default GiftVouchers;
