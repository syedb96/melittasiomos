import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { CheckCircle } from "lucide-react";

const Prices = () => (
  <Layout>
    <SeoHead title="Salsa & Bachata Class Prices London | Pura Nights | Melitta Siomos" description="View all Salsa & Bachata class prices at Pura Nights. Drop-in from £5, monthly bundles, and Latin Friday tickets. Chiswick & Ealing venues." path="/prices" />

    <section className="section-padding section-warm">
      <div className="container-main text-center">
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Dance More, Feel Better & Save Money</h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto mb-14">With Melitta Siomos & Pura Nights, the more you dance the cheaper it gets.</p>
        </FadeInUp>

        {/* Drop-in Pricing */}
        <FadeInUp delay={0.1}>
          <h2 className="font-display text-2xl font-bold mb-8">Drop-In Pricing (Both Venues)</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            {[
              { price: "£15", label: "2 classes + social", note: "Best value" },
              { price: "£10", label: "1 class + social", note: "Popular choice" },
              { price: "£5", label: "Social only", note: "Party only, no class" },
            ].map((p, i) => (
              <div key={i} className={`bg-card rounded-2xl p-6 card-hover ${i === 0 ? "ring-2 ring-primary" : ""}`}>
                <p className="font-display text-3xl font-bold text-foreground mb-1">{p.price}</p>
                <p className="font-heading font-semibold text-sm mb-1">{p.label}</p>
                <p className="text-muted-foreground text-xs">{p.note}</p>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Bundles */}
        <FadeInUp delay={0.2}>
          <h2 className="font-display text-2xl font-bold mb-8">Class Bundles — Save More</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Chiswick Bundles */}
            <div className="bg-card rounded-2xl p-8 card-hover text-left">
              <h3 className="font-heading font-bold text-lg mb-1 text-primary">Chiswick (Monday)</h3>
              <p className="text-muted-foreground text-xs mb-4">The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>5-Class Bundle</span>
                  <span className="font-display font-bold">£55</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>10-Class Bundle</span>
                  <span className="font-display font-bold">£99</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Monthly Unlimited</span>
                  <span className="font-display font-bold">£120</span>
                </div>
              </div>
            </div>

            {/* Ealing Bundles */}
            <div className="bg-card rounded-2xl p-8 card-hover text-left">
              <h3 className="font-heading font-bold text-lg mb-1 text-secondary">Ealing (Tuesday)</h3>
              <p className="text-muted-foreground text-xs mb-4">Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>5-Class Bundle</span>
                  <span className="font-display font-bold">£42</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>10-Class Bundle</span>
                  <span className="font-display font-bold">£78</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Monthly Unlimited</span>
                  <span className="font-display font-bold">£85</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Latin Friday Pricing */}
        <FadeInUp delay={0.3}>
          <h2 className="font-display text-2xl font-bold mb-8">🔥 Monthly Latin Friday</h2>
          <div className="bg-charcoal rounded-2xl p-8 max-w-3xl mx-auto mb-16 text-left">
            <p className="text-primary-foreground/60 text-sm mb-4">2nd Friday of every month · Drayton Court Hotel, Ealing</p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-charcoal-light rounded-xl p-4 text-center">
                <p className="text-green-400 font-heading font-semibold text-xs uppercase tracking-wider mb-2">Early Bird</p>
                <p className="text-primary-foreground font-display font-bold text-xl">£15</p>
                <p className="text-primary-foreground/50 text-xs">class + party</p>
                <p className="text-primary-foreground/40 text-xs mt-1">£10 party only</p>
              </div>
              <div className="bg-charcoal-light rounded-xl p-4 text-center">
                <p className="text-yellow-400 font-heading font-semibold text-xs uppercase tracking-wider mb-2">Standard</p>
                <p className="text-primary-foreground font-display font-bold text-xl">£17</p>
                <p className="text-primary-foreground/50 text-xs">class + party</p>
                <p className="text-primary-foreground/40 text-xs mt-1">£12 party only</p>
              </div>
              <div className="bg-charcoal-light rounded-xl p-4 text-center">
                <p className="text-red-400 font-heading font-semibold text-xs uppercase tracking-wider mb-2">On the Door</p>
                <p className="text-primary-foreground font-display font-bold text-xl">£20</p>
                <p className="text-primary-foreground/50 text-xs">class + party</p>
                <p className="text-primary-foreground/40 text-xs mt-1">£15 party only</p>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Private Lessons */}
        <FadeInUp delay={0.35}>
          <div className="bg-card rounded-2xl p-8 max-w-2xl mx-auto card-hover mb-12 text-center">
            <h2 className="font-display text-2xl font-bold mb-2">Private Lessons</h2>
            <p className="text-muted-foreground text-sm mb-4">Private lesson rates are tailored to your goals and schedule. Contact Melitta directly to discuss.</p>
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20private%20lessons" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs py-2 px-6">💬 Enquire via WhatsApp</a>
          </div>
        </FadeInUp>

        {/* Gift Vouchers */}
        <FadeInUp delay={0.4}>
          <div className="bg-card rounded-2xl p-8 max-w-2xl mx-auto card-hover">
            <h2 className="font-display text-2xl font-bold mb-2">🎁 Gift Vouchers</h2>
            <p className="text-muted-foreground mb-4">Give the gift of dance! Choose from £25, £50, £75, £100, £150, or £200.</p>
            <Link to="/gift-vouchers" className="btn-cta-primary text-xs py-2 px-6">Buy a Gift Voucher</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/pura-nights", label: "Weekly Classes", desc: "Full schedule & venue info" },
      { to: "/private-lessons", label: "Private Lessons", desc: "Enquire about 1-to-1 coaching" },
      { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance packages" },
      { to: "/gift-vouchers", label: "Gift Vouchers", desc: "Give the gift of dance" },
      { to: "/start-here", label: "Start Here", desc: "New to Salsa & Bachata?" },
      { to: "/bookings", label: "Book Now", desc: "Secure your spot" },
    ]} />
  </Layout>
);

export default Prices;