import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { ShoppingBag, Truck, Ruler, Sparkles, MessageCircle } from "lucide-react";

/* <!-- WIX PAGE: /shop -->
   <!-- WIX: Replace this entire shell with a Wix Stores Category page -->
   <!-- WIX: Connect filters to Wix Stores Product Gallery via the data binding shown below: -->
   <!--   • data-wix-filter-category={catSlug}   → bind to "Collections" filter -->
   <!--   • data-wix-filter-option-size={size}   → bind to "Size" Product Option -->
   <!-- WIX: Replace the React filter logic with Wix Stores' built-in URL-driven Filter widgets -->
   <!--   so /shop?category=hoodies-layers&size=M loads the correct grid server-side. -->
   <!-- WIX: Each Product Card's WhatsApp link should be set in Wix via dynamic field tokens: -->
   <!--   https://wa.me/447449482343?text=Hi%20Melitta,%20I'm%20interested%20in%20{product.name}%20(size:%20{selectedSize}) -->
*/

const PHONE = "447449482343";
const buildWhatsAppLink = (productName: string, size: string | null) => {
  const sizeFragment = size ? ` (size: ${size})` : "";
  const text = `Hi Melitta, I'm interested in the ${productName}${sizeFragment} from the Pura Nights shop. Is it in stock?`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
};

const WHATSAPP_GENERAL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hi Melitta, I have a question about the Pura Nights shop")}`;

const categories = [
  { slug: "all", title: "All", desc: "Everything in the collection.", count: 40 },
  { slug: "dancewear", title: "Dancewear", desc: "Practice tops, leggings, skirts.", count: 12 },
  { slug: "training-tops", title: "Training Tops", desc: "Lightweight unisex training tees.", count: 8 },
  { slug: "hoodies-layers", title: "Hoodies & Layers", desc: "Branded hoodies and warm-up jackets.", count: 6 },
  { slug: "accessories", title: "Accessories", desc: "Tote bags, water bottles, hair ties.", count: 9 },
  { slug: "teamwear", title: "Pura Ladies Teamwear", desc: "Performance team kit (members only).", count: 5 },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"] as const;

interface Product {
  name: string;
  price: string;
  priceValue: number;
  category: string;
  catSlug: string;
  tag: string | null;
  sizes: string[];
}

const featured: Product[] = [
  { name: "Pura Nights Crop Top — Champagne", price: "£28", priceValue: 28, category: "Dancewear", catSlug: "dancewear", tag: "Best Seller", sizes: ["XS","S","M","L","XL"] },
  { name: "Salsa Practice Tee — Charcoal", price: "£22", priceValue: 22, category: "Training Tops", catSlug: "training-tops", tag: "New", sizes: ["XS","S","M","L","XL","XXL"] },
  { name: "Bachata Hoodie — Cream", price: "£48", priceValue: 48, category: "Hoodies & Layers", catSlug: "hoodies-layers", tag: null, sizes: ["S","M","L","XL","XXL"] },
  { name: "Pura Ladies Warm-Up Jacket", price: "£62", priceValue: 62, category: "Pura Ladies Teamwear", catSlug: "teamwear", tag: "Members", sizes: ["XS","S","M","L"] },
  { name: "Tote — 'Dance Like You Mean It'", price: "£14", priceValue: 14, category: "Accessories", catSlug: "accessories", tag: null, sizes: ["One Size"] },
  { name: "Stainless Steel Water Bottle", price: "£18", priceValue: 18, category: "Accessories", catSlug: "accessories", tag: null, sizes: ["One Size"] },
  { name: "Ladies Styling Wrap Top", price: "£32", priceValue: 32, category: "Dancewear", catSlug: "dancewear", tag: "New", sizes: ["XS","S","M","L"] },
  { name: "Founders Tee — Limited", price: "£26", priceValue: 26, category: "Training Tops", catSlug: "training-tops", tag: "Limited", sizes: ["S","M","L","XL"] },
];

// JSON-LD: ItemList of Products + FAQPage in one @graph
const shopSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Pura Nights Shop — Featured Edit",
      url: "https://www.puranights.com/shop",
      itemListElement: featured.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          category: p.category,
          brand: { "@type": "Brand", name: "Pura Nights" },
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: p.priceValue.toFixed(2),
            availability: "https://schema.org/PreOrder",
            url: "https://www.puranights.com/shop",
            seller: { "@type": "Organization", name: "Pura Nights" },
          },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "When does the Pura Nights shop launch?", acceptedAnswer: { "@type": "Answer", text: "The shop is in soft launch. The full collection launches with photography in 2026 — message Melitta on WhatsApp for early access and pre-orders." } },
        { "@type": "Question", name: "How do I know what size to order?", acceptedAnswer: { "@type": "Answer", text: "See the full size guide at /size-guide. Between sizes? Size up for hoodies and tees, size down for fitted dancewear, or WhatsApp Melitta for a personal recommendation." } },
        { "@type": "Question", name: "How much is UK shipping?", acceptedAnswer: { "@type": "Answer", text: "UK standard shipping is £3.50 (3–5 working days), tracked 24h is £5.95, and free over £60. Class collection in Chiswick or Ealing is free." } },
        { "@type": "Question", name: "Can I return items?", acceptedAnswer: { "@type": "Answer", text: "Yes — 14-day returns on unworn items with original tags. Free in-person exchanges at any class. Personalised Pura Ladies teamwear is final sale." } },
      ],
    },
  ],
};

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
        description="Shop premium Salsa and Bachata dancewear, training tops, hoodies and accessories from Pura Nights — designed in West London by Melitta Siomos. UK shipping from £3.50, free over £60."
        path="/shop"
        schema={shopSchema}
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
      {/* <!-- WIX: Replace with Wix Stores Category Filter + Product Options widgets bound to URL params --> */}
      <section
        className="section-padding section-ivory"
        data-wix-widget="stores-product-gallery"
        data-wix-collection="pura-nights-shop"
      >
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-center text-base mb-10 font-heading max-w-xl mx-auto">Filter by category and size — all pieces road-tested in our weekly classes.</p>
          </FadeInUp>

          {/* Category pills — Wix: bind to Wix Stores collection filter via data-wix-filter-category */}
          <div className="flex flex-wrap justify-center gap-2 mb-6" data-wix-filter-group="category">
            {categories.map(c => (
              <button
                key={c.slug}
                onClick={() => setActiveCat(c.slug)}
                aria-pressed={activeCat === c.slug}
                data-wix-filter-category={c.slug}
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

          {/* Size pills — Wix: bind to Wix Stores Product Option (size) */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12" data-wix-filter-group="option-size">
            <span className="text-[10px] font-accent uppercase tracking-[0.2em] text-muted-foreground mr-1">Size:</span>
            <button
              onClick={() => setActiveSize(null)}
              data-wix-filter-option-size=""
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
                data-wix-filter-option-size={s}
                className={`px-3 py-1.5 rounded-full text-[11px] font-heading font-semibold border transition-colors ${
                  activeSize === s ? "bg-primary text-charcoal border-primary" : "bg-card border-border hover:border-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Filtered product grid */}
          {/* <!-- WIX: Replace with Wix Stores Product Grid widget bound to selected filters above --> */}
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No items match those filters yet.</p>
              <a href={WHATSAPP_GENERAL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-heading text-sm font-semibold hover:underline">
                <MessageCircle size={16} /> Ask Melitta on WhatsApp
              </a>
            </div>
          ) : (
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
              {filtered.map((p, i) => (
                <StaggerItem key={i}>
                  {/* <!-- WIX: Replace with Wix Stores Product Card. Bind WhatsApp link to {product.name} + selected option --> */}
                  <article className="bg-card rounded-2xl overflow-hidden card-hover h-full flex flex-col border border-border" itemScope itemType="https://schema.org/Product">
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
                      <p className="text-[10px] font-accent uppercase tracking-wider text-muted-foreground mb-1" itemProp="category">{p.category}</p>
                      <h3 className="font-heading font-semibold text-sm mb-2 flex-1" itemProp="name">{p.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-display text-lg font-bold text-primary" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          <meta itemProp="priceCurrency" content="GBP" />
                          <span itemProp="price" content={p.priceValue.toFixed(2)}>{p.price}</span>
                        </p>
                        <span className="text-[10px] text-muted-foreground">{p.sizes.join(" · ")}</span>
                      </div>
                      {/* Per-product WhatsApp CTA — pre-fills product name + selected size */}
                      <a
                        href={buildWhatsAppLink(p.name, activeSize && p.sizes.includes(activeSize) ? activeSize : null)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full bg-charcoal text-primary-foreground hover:bg-primary hover:text-charcoal transition-colors font-heading font-semibold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-full"
                        aria-label={`Ask about ${p.name} on WhatsApp`}
                      >
                        <MessageCircle size={13} />
                        {activeSize && p.sizes.includes(activeSize) ? `Ask · size ${activeSize}` : "Ask on WhatsApp"}
                      </a>
                    </div>
                  </article>
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
              href={WHATSAPP_GENERAL}
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
