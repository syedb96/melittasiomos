import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const tiers = [
  { tier: "🥉", name: "Bronze Monthly", price: "£45", period: "/month", desc: "4 classes per month", features: ["Valid one month", "Sundays included", "Perfect for occasional dancers"] },
  { tier: "🥈", name: "Silver Monthly", price: "£75", period: "/month", desc: "8 classes per month", features: ["Unlimited standard + dedicated bachata", "Both venues included", "1-2 nights per week"], popular: true },
  { tier: "🥇", name: "Gold Unlimited", price: "£110", period: "/month", desc: "Unlimited classes", features: ["Priority booking & early access", "Cancel anytime (7-day notice)", "Full immersion experience"] },
];

const Prices = () => (
  <Layout>
    <SeoHead title="Salsa & Bachata Class Prices London | Pura Nights Packages | Melitta Siomos" description="View all Salsa & Bachata class prices at Pura Nights. Pay-as-you-go from £5.50, monthly subscriptions from £45. Private lessons and wedding dance packages also available." path="/prices" />

    <section className="section-padding section-warm">
      <div className="container-main text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Dance More, Feel Better & Save Money</h1>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">With Melitta Siomos & Pura Nights, the more you dance the cheaper it is.</p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {tiers.map((p, i) => (
            <div key={i} className={`rounded-lg p-8 card-hover relative ${p.popular ? "bg-primary text-primary-foreground ring-2 ring-secondary scale-105" : "bg-card"}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-heading font-bold px-4 py-1 rounded-full">Most Popular</span>}
              <div className="text-3xl mb-2">{p.tier}</div>
              <h2 className="font-heading font-bold text-lg mb-1">{p.name}</h2>
              <p className="text-4xl font-display font-bold">{p.price}<span className="text-sm font-normal">{p.period}</span></p>
              <p className={`text-sm mb-6 ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.desc}</p>
              <ul className={`text-sm space-y-2 mb-8 text-left ${p.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {p.features.map((f, j) => <li key={j}>✅ {f}</li>)}
              </ul>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className={p.popular ? "btn-cta bg-secondary text-secondary-foreground text-xs py-2 px-6 hover:opacity-90 w-full" : "btn-cta-primary text-xs py-2 px-6 w-full"}>Select</a>
            </div>
          ))}
        </div>

        {/* Pay as you go */}
        <div className="bg-card rounded-lg p-8 max-w-2xl mx-auto card-hover mb-12">
          <h2 className="font-display text-2xl font-bold mb-2">Pay As You Go</h2>
          <p className="text-muted-foreground mb-4">Drop-in class: <strong className="text-foreground">From £5.50</strong> per class (cash at door)</p>
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs py-2 px-6">Book on Ticket Tailor</a>
        </div>

        {/* Gift Vouchers */}
        <div className="bg-card rounded-lg p-8 max-w-2xl mx-auto card-hover">
          <h2 className="font-display text-2xl font-bold mb-2">🎁 Gift Vouchers</h2>
          <p className="text-muted-foreground mb-4">Give the gift of dance! Choose from £25, £50, £75, £100, £150, or £200.</p>
          <Link to="/gift-vouchers" className="btn-cta-primary text-xs py-2 px-6">Buy a Gift Voucher</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Prices;
