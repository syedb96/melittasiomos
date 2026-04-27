import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { ShoppingBag, Truck, Ruler, Sparkles } from "lucide-react";

/* <!-- WIX PAGE: /shop -->
   <!-- WIX: Replace this entire shell with Wix Stores Category page -->
   <!-- WIX: Connect to Wix Stores Products collection. Use Product Gallery widget. -->
   <!-- WIX: Each category strip below maps to a Wix Stores collection filter -->
   <!-- WIX: Product cards below are dummy placeholders for layout/design only -->
*/

const categories = [
  { slug: "dancewear", title: "Dancewear", desc: "Practice tops, leggings, skirts.", count: 12 },
  { slug: "training-tops", title: "Training Tops", desc: "Lightweight unisex training tees.", count: 8 },
  { slug: "hoodies-layers", title: "Hoodies & Layers", desc: "Branded hoodies and warm-up jackets.", count: 6 },
  { slug: "accessories", title: "Accessories", desc: "Tote bags, water bottles, hair ties.", count: 9 },
  { slug: "teamwear", title: "Pura Ladies Teamwear", desc: "Performance team kit (members only).", count: 5 },
];

const featured = [
  { name: "Pura Nights Crop Top — Champagne", price: "£28", category: "Dancewear", tag: "Best Seller" },
  { name: "Salsa Practice Tee — Charcoal", price: "£22", category: "Training Tops", tag: "New" },
  { name: "Bachata Hoodie — Cream", price: "£48", category: "Hoodies & Layers", tag: null },
  { name: "Pura Ladies Warm-Up Jacket", price: "£62", category: "Teamwear", tag: "Members" },
  { name: "Tote — 'Dance Like You Mean It'", price: "£14", category: "Accessories", tag: null },
  { name: "Stainless Steel Water Bottle", price: "£18", category: "Accessories", tag: null },
  { name: "Ladies Styling Wrap Top", price: "£32", category: "Dancewear", tag: "New" },
  { name: "Founders Tee — Limited", price: "£26", category: "Training Tops", tag: "Limited" },
];

const Shop = () => (
  <Layout>
    <SeoHead
      title="Pura Nights Shop — Dancewear, Training & Lifestyle | Melitta Siomos"
      description="Premium Salsa & Bachata dancewear, training tops, hoodies and accessories from Pura Nights — designed in West London by Melitta Siomos."
      path="/shop"
      noindex
    />

    {/* Hero */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-5xl text-center">
        <FadeInUp>
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">Pura Nights · Lifestyle Shop</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-5">Wear It. Mean It.</h1>
          <p className="text-primary-foreground/65 text-base md:text-lg font-heading max-w-2xl mx-auto leading-relaxed">
            Dancewear and lifestyle pieces designed in West London. Made for movement, made to last.
            <span className="block text-primary-foreground/40 text-xs mt-3 font-heading">Soft launch — expanded collection coming soon.</span>
          </p>
        </FadeInUp>
      </div>
    </section>

    {/* Categories */}
    {/* <!-- WIX: Replace with Wix Stores Category Grid --> */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-6xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-center text-base mb-12 font-heading max-w-xl mx-auto">Browse the collection — all pieces road-tested in our weekly classes.</p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5" staggerDelay={0.08}>
          {categories.map(c => (
            <StaggerItem key={c.slug}>
              <a href={`#${c.slug}`} className="block bg-card rounded-2xl p-6 card-hover h-full border border-border">
                <ShoppingBag size={20} className="text-primary mb-3" />
                <h3 className="font-heading font-bold text-base mb-1">{c.title}</h3>
                <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{c.desc}</p>
                <span className="text-primary text-xs font-heading font-semibold">{c.count} items →</span>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Featured products */}
    {/* <!-- WIX: Replace with Wix Stores Product Grid widget --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-6xl">
        <FadeInUp>
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Featured</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-12">This Season's Edit</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
          {featured.map((p, i) => (
            <StaggerItem key={i}>
              {/* <!-- WIX: Replace with Wix Stores Product Card --> */}
              <div className="bg-card rounded-2xl overflow-hidden card-hover h-full flex flex-col border border-border">
                <div className="relative aspect-[4/5] bg-charcoal overflow-hidden">
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 0%, hsl(43 48% 54% / 0.18), transparent 60%), linear-gradient(180deg, hsl(0 0% 10%), hsl(0 0% 6%))' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40">Product image</span>
                  </div>
                  {p.tag && (
                    <span className="absolute top-3 left-3 bg-primary text-charcoal text-[9px] font-heading font-bold px-2 py-0.5 rounded-full">{p.tag}</span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] font-accent uppercase tracking-wider text-muted-foreground mb-1">{p.category}</p>
                  <h3 className="font-heading font-semibold text-sm mb-2 flex-1">{p.name}</h3>
                  <p className="font-display text-lg font-bold text-primary">{p.price}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Help strip */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            { icon: Ruler, title: "Size Guide", desc: "Find your perfect fit", link: "/size-guide" },
            { icon: Truck, title: "Shipping & Returns", desc: "UK delivery from £3.50", link: "/shipping-returns" },
            { icon: Sparkles, title: "Lookbook", desc: "See it on the dancefloor", link: "/lookbook" },
          ].map(h => (
            <Link key={h.title} to={h.link} className="bg-charcoal-light rounded-2xl p-7 hover:bg-primary/10 transition-colors group">
              <h.icon size={24} className="text-primary mx-auto mb-3" />
              <h3 className="font-heading font-bold text-base text-primary-foreground mb-1">{h.title}</h3>
              <p className="text-primary-foreground/60 text-sm">{h.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Shop;
