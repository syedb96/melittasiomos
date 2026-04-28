import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import { Link } from "react-router-dom";

/* <!-- WIX PAGE: /shipping-returns -->
   <!-- WIX: Standard Wix Page. Connect any policy text via Wix Editor. -->
*/

const ShippingReturns = () => (
  <Layout>
    <SeoHead
      title="Shipping & Returns — Pura Nights Dancewear Shop | UK Delivery from £3.50"
      description="Pura Nights UK shipping from £3.50, free over £60, plus free class collection in Chiswick & Ealing. 14-day returns on unworn dancewear."
      path="/shipping-returns"
      noindex
    />

    <section className="section-padding section-dark text-center">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">Pura Nights · Shop</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Pura Nights Shipping & Returns</h1>
          <p className="text-primary-foreground/60 text-base font-heading">Simple, transparent, and dancer-friendly. UK shipping from £3.50 — free over £60.</p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-ivory">
      <div className="container-main max-w-3xl space-y-10">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">UK Shipping</h2>
          <ul className="space-y-2 text-muted-foreground text-base leading-relaxed">
            <li>· <span className="text-foreground font-heading font-semibold">Standard delivery</span> — £3.50, 3–5 working days</li>
            <li>· <span className="text-foreground font-heading font-semibold">Tracked 24h</span> — £5.95, next working day</li>
            <li>· <span className="text-foreground font-heading font-semibold">Free standard shipping</span> on orders over £60</li>
            <li>· <span className="text-foreground font-heading font-semibold">Class collection</span> — order online, collect free at any Monday or Tuesday class</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">International Shipping</h2>
          <p className="text-muted-foreground text-base leading-relaxed">EU and rest-of-world rates calculated at checkout based on weight and destination. Customs and duties are the buyer's responsibility.</p>
        </div>

        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Returns & Exchanges</h2>
          <ul className="space-y-2 text-muted-foreground text-base leading-relaxed">
            <li>· <span className="text-foreground font-heading font-semibold">14-day returns</span> on unworn items with original tags</li>
            <li>· <span className="text-foreground font-heading font-semibold">Free exchanges</span> for size swaps in person at any class</li>
            <li>· <span className="text-foreground font-heading font-semibold">Personalised teamwear</span> is final sale (Pura Ladies only)</li>
            <li>· Postal returns covered by buyer; refunds issued within 5 working days of receipt</li>
          </ul>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <h3 className="font-heading font-bold text-base mb-2">Order issues?</h3>
          <p className="text-muted-foreground text-sm mb-3">WhatsApp Melitta directly — orders are personally checked before they ship.</p>
          <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%20have%20a%20question%20about%20my%20Pura%20Nights%20order" target="_blank" rel="noopener noreferrer" className="text-primary font-heading text-sm font-semibold hover:underline">💬 WhatsApp Melitta →</a>
        </div>

        <div className="text-center">
          <Link to="/shop" className="text-primary font-heading text-sm font-semibold hover:underline">← Back to Shop</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default ShippingReturns;
