import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { ShoppingBag, Truck, Ruler, Sparkles, MessageCircle } from "lucide-react";

/* <!-- WIX PAGE: /shop -->
   <!-- WIX: Replace this entire shell with Wix Stores Category page -->
   <!-- WIX: Connect to Wix Stores Products collection. Use Product Gallery widget. -->
   <!-- WIX: Category buttons below map to Wix Stores collection filters -->
   <!-- WIX: Size pills map to Wix Stores Product Options (size variant) -->
*/

const categories = [
  { slug: "all", title: "All", desc: "Everything in the collection.", count: 40 },
  { slug: "dancewear", title: "Dancewear", desc: "Practice tops, leggings, skirts.", count: 12 },
  { slug: "training-tops", title: "Training Tops", desc: "Lightweight unisex training tees.", count: 8 },
  { slug: "hoodies-layers", title: "Hoodies & Layers", desc: "Branded hoodies and warm-up jackets.", count: 6 },
  { slug: "accessories", title: "Accessories", desc: "Tote bags, water bottles, hair ties.", count: 9 },
  { slug: "teamwear", title: "Pura Ladies Teamwear", desc: "Performance team kit (members only).", count: 5 },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"] as const;

const featured = [
  { name: "Pura Nights Crop Top — Champagne", price: "£28", category: "Dancewear", catSlug: "dancewear", tag: "Best Seller", sizes: ["XS","S","M","L","XL"] },
  { name: "Salsa Practice Tee — Charcoal", price: "£22", category: "Training Tops", catSlug: "training-tops", tag: "New", sizes: ["XS","S","M","L","XL","XXL"] },
  { name: "Bachata Hoodie — Cream", price: "£48", category: "Hoodies & Layers", catSlug: "hoodies-layers", tag: null, sizes: ["S","M","L","XL","XXL"] },
  { name: "Pura Ladies Warm-Up Jacket", price: "£62", category: "Pura Ladies Teamwear", catSlug: "teamwear", tag: "Members", sizes: ["XS","S","M","L"] },
  { name: "Tote — 'Dance Like You Mean It'", price: "£14", category: "Accessories", catSlug: "accessories", tag: null, sizes: ["One Size"] },
  { name: "Stainless Steel Water Bottle", price: "£18", category: "Accessories", catSlug: "accessories", tag: null, sizes: ["One Size"] },
  { name: "Ladies Styling Wrap Top", price: "£32", category: "Dancewear", catSlug: "dancewear", tag: "New", sizes: ["XS","S","M","L"] },
  { name: "Founders Tee — Limited", price: "£26", category: "Training Tops", catSlug: "training-tops", tag: "Limited", sizes: ["S","M","L","XL"] },
];

const WHATSAPP_SHOP = "https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%20have%20a%20question%20about%20the%20Pura%20Nights%20shop";

const Shop = () => {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const filtered = useMemo(() =>
    featured.filter(p =>
      (activeCat === "all" || p.catSlug === activeCat) &&
      (!activeSize || p.sizes.includes(activeSize))
    ),
  [activeCat, activeSize]);

  return (
    <Layout>
      <SeoHead
        title="Pura Nights Shop — Salsa & Bachata Dancewear London | Melitta Siomos"
        description="Shop premium Salsa and Bachata dancewear, training tops, hoodies and accessories from Pura Nights — designed in West London by Melitta Siomos. UK shipping from £3.50."
        path="/shop"
        noindex
      />

      {/* Hero */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-5xl text-center">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">Pura Nights · Lifestyle Shop</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-5">Pura Nights Dancewear & Apparel Shop</h1>
            <p className="text-primary-foreground/65 text-base md:text-lg font-heading max-w-2xl mx-auto leading-relaxed">
              Premium Salsa and Bachata dancewear, training tops, hoodies and accessories — designed in West London. Made for movement, made to last.
              <span className="block text-primary-foreground/40 text-xs mt-3 font-heading">Soft launch — expanded collection coming soon.</span>
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Filters */}
      {/* <!-- WIX: Replace with Wix Stores Category Filter + Product Options widgets --> */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-center text-base mb-10 font-heading max-w-xl mx-auto">Filter by category and size — all pieces road-tested in our weekly classes.</p>
          </FadeInUp>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map(c => (
              <button
                key={c.slug}
                onClick={() => setActiveCat(c.slug)}
                aria-pressed={activeCat === c.slug}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold border transition-colors ${
                  activeCat === c.slug
                    ? "bg-charcoal text-primary-foreground border-charcoal"
                    : "bg-card text-foreground border-border hover:border-primary"
                }`}
              >
                {c.title} <span className="opacity-60">({c.count})</span>
              </button>
            ))}
          </div>

          {/* Size pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            <span className="text-[10px] font-accent uppercase tracking-[0.2em] text-muted-foreground mr-1">Size:</span>
            <button
              onClick={() => setActiveSize(null)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-heading font-semibold border transition-colors ${
                !activeSize ? "bg-primary text-charcoal border-primary" : "bg-card border-border hover:border-primary"
              }`}
            >
              Any
            </button>
            {sizes.map(s => (
              <button
                key={s}
                onClick={() => setActiveSize(s)}
                aria-pressed={activeSize === s}
                className={`px-3 py-1.5 rounded-full text-[11px] font-heading font-semibold border transition-colors ${
                  activeSize === s ? "bg-primary text-charcoal border-primary" : "bg-card border-border hover:border-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Filtered product grid */}
          {/* <!-- WIX: Replace with Wix Stores Product Grid widget bound to selected filters --> */}
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No items match those filters yet.</p>
              <a href={WHATSAPP_SHOP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-heading text-sm font-semibold hover:underline">
                <MessageCircle size={16} /> Ask Melitta on WhatsApp
              </a>
            </div>
          ) : (
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
              {filtered.map((p, i) => (
                <StaggerItem key={i}>
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
                      <div className="flex items-center justify-between">
                        <p className="font-display text-lg font-bold text-primary">{p.price}</p>
                        <span className="text-[10px] text-muted-foreground">{p.sizes.join(" · ")}</span>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
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

          {/* WhatsApp CTA */}
          <div className="text-center mt-10">
            <a
              href={WHATSAPP_SHOP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-charcoal font-heading font-bold px-7 py-3.5 rounded-full hover:bg-primary/90 transition-colors text-sm"
            >
              <MessageCircle size={18} /> Ask about a product on WhatsApp
            </a>
            <p className="text-primary-foreground/40 text-xs mt-3">Sizing, restocks, custom orders — Melitta replies personally.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
