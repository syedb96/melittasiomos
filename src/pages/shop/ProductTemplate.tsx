import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import { MessageCircle, Truck, RotateCcw, Ruler, ArrowLeft, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: /shop/{product-slug} -->
   <!-- WIX: Replace this entire template with a Wix Stores Product Page template -->
   <!-- WIX: Bind the following fields from the Wix Stores collection: -->
   <!--   • product.name        → <h1> -->
   <!--   • product.price       → price block -->
   <!--   • product.description → "Product details" tab -->
   <!--   • product.images[]    → gallery -->
   <!--   • product.options.size → size selector (Wix Product Options) -->
   <!--   • product.relatedProducts → "You might also like" widget -->
   <!-- WIX: WhatsApp CTA URL must dynamically inject {product.name} + {selectedSize} -->
*/

const PHONE = "447449482343";

// Demo catalog — Wix replaces with Stores collection lookup by slug
const catalog: Record<string, {
  name: string;
  price: string;
  priceValue: number;
  category: string;
  catSlug: string;
  shortDesc: string;
  details: string[];
  styling: string[];
  sizes: string[];
  related: { slug: string; name: string; price: string }[];
}> = {
  "pura-nights-crop-top-champagne": {
    name: "Pura Nights Crop Top — Champagne",
    price: "£28",
    priceValue: 28,
    category: "Dancewear",
    catSlug: "dancewear",
    shortDesc: "Our signature crop — champagne metallic, sweat-wicking, designed for spins and styling.",
    details: [
      "92% recycled polyester / 8% elastane — 4-way stretch",
      "Sweat-wicking, breathable mesh side panels",
      "Flat-lock seams for zero chafe during long socials",
      "Designed and sample-tested in our Chiswick & Ealing classes",
      "Machine wash cold, lay flat to dry",
    ],
    styling: [
      "Pair with high-waist black leggings for Bachata night",
      "Layer under the Bachata Hoodie for warm-up and cool-down",
      "Champagne reads beautifully on stage under warm Latin Friday lighting",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    related: [
      { slug: "ladies-styling-wrap-top", name: "Ladies Styling Wrap Top", price: "£32" },
      { slug: "bachata-hoodie-cream", name: "Bachata Hoodie — Cream", price: "£48" },
      { slug: "salsa-practice-tee-charcoal", name: "Salsa Practice Tee — Charcoal", price: "£22" },
    ],
  },
  "salsa-practice-tee-charcoal": {
    name: "Salsa Practice Tee — Charcoal",
    price: "£22",
    priceValue: 22,
    category: "Training Tops",
    catSlug: "training-tops",
    shortDesc: "Unisex training tee in deep charcoal — soft hand, dries fast, fits like your favourite weekend top.",
    details: [
      "100% combed ring-spun cotton (180gsm)",
      "Pre-shrunk, ribbed crew neck",
      "Tonal Pura Nights crest at chest",
      "Unisex fit — size down for fitted, true-to-size for relaxed",
    ],
    styling: [
      "Wear with joggers for warm-up, change tops between class and social",
      "Looks intentional under the Warm-Up Jacket for arrivals at the venue",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    related: [
      { slug: "bachata-hoodie-cream", name: "Bachata Hoodie — Cream", price: "£48" },
      { slug: "founders-tee-limited", name: "Founders Tee — Limited", price: "£26" },
    ],
  },
  "bachata-hoodie-cream": {
    name: "Bachata Hoodie — Cream",
    price: "£48",
    priceValue: 48,
    category: "Hoodies & Layers",
    catSlug: "hoodies-layers",
    shortDesc: "Cream heavyweight hoodie with tonal embroidery — built for venue arrivals, post-class chats and Sunday recovery.",
    details: [
      "350gsm brushed-back fleece",
      "Tonal embroidered Pura Nights wordmark",
      "Drop shoulder, relaxed unisex fit",
      "Pre-washed for zero shrink after first wear",
    ],
    styling: [
      "Throw over the Crop Top for the walk to the venue",
      "Sleeves push up cleanly for warm-up — no bunching at the wrist",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    related: [
      { slug: "pura-nights-crop-top-champagne", name: "Pura Nights Crop Top — Champagne", price: "£28" },
      { slug: "pura-ladies-warm-up-jacket", name: "Pura Ladies Warm-Up Jacket", price: "£62" },
    ],
  },
  "pura-ladies-warm-up-jacket": {
    name: "Pura Ladies Warm-Up Jacket",
    price: "£62",
    priceValue: 62,
    category: "Pura Ladies Teamwear",
    catSlug: "teamwear",
    shortDesc: "Performance team warm-up — black tech shell with champagne piping. Pura Ladies members only.",
    details: [
      "Lightweight 4-way stretch tech shell",
      "Champagne piping along sleeves and side panels",
      "Embroidered 'Pura Ladies' on chest, name personalisation available",
      "Members-only — verified at checkout via your team captain",
    ],
    styling: [
      "Match with black performance leggings for arrivals and warm-up",
      "Personalisation orders take 2 weeks — no returns on personalised items",
    ],
    sizes: ["XS", "S", "M", "L"],
    related: [
      { slug: "pura-nights-crop-top-champagne", name: "Pura Nights Crop Top — Champagne", price: "£28" },
    ],
  },
  "tote-dance-like-you-mean-it": {
    name: "Tote — 'Dance Like You Mean It'",
    price: "£14",
    priceValue: 14,
    category: "Accessories",
    catSlug: "accessories",
    shortDesc: "Heavy-canvas tote with our signature line. Big enough for shoes, water bottle and a change of top.",
    details: [
      "12oz natural cotton canvas",
      "Boxed base, 30cm shoulder drop",
      "Black screen-print, washes beautifully",
    ],
    styling: ["Pair with the Stainless Steel Water Bottle as a starter-kit gift."],
    sizes: ["One Size"],
    related: [
      { slug: "stainless-steel-water-bottle", name: "Stainless Steel Water Bottle", price: "£18" },
    ],
  },
  "stainless-steel-water-bottle": {
    name: "Stainless Steel Water Bottle",
    price: "£18",
    priceValue: 18,
    category: "Accessories",
    catSlug: "accessories",
    shortDesc: "500ml double-walled, keeps cold for 12 hours. Engraved Pura Nights mark.",
    details: ["Food-grade 18/8 stainless", "BPA-free leakproof lid", "Hand-wash recommended"],
    styling: ["The single most-asked-about item at Tuesday socials."],
    sizes: ["One Size"],
    related: [{ slug: "tote-dance-like-you-mean-it", name: "Tote — 'Dance Like You Mean It'", price: "£14" }],
  },
  "ladies-styling-wrap-top": {
    name: "Ladies Styling Wrap Top",
    price: "£32",
    priceValue: 32,
    category: "Dancewear",
    catSlug: "dancewear",
    shortDesc: "Bias-cut wrap top — moves with body rolls and styling without ever riding up.",
    details: ["Stretch viscose blend, soft hand", "Adjustable wrap tie", "Designed for the Tuesday Free Ladies Styling warm-up"],
    styling: ["Layer over the Crop Top for two-tone styling on Bachata Sensual nights."],
    sizes: ["XS", "S", "M", "L"],
    related: [{ slug: "pura-nights-crop-top-champagne", name: "Pura Nights Crop Top — Champagne", price: "£28" }],
  },
  "founders-tee-limited": {
    name: "Founders Tee — Limited",
    price: "£26",
    priceValue: 26,
    category: "Training Tops",
    catSlug: "training-tops",
    shortDesc: "Limited founders edition — numbered run for our first 200 members.",
    details: ["Premium 220gsm cotton", "Hand-numbered tag inside hem", "One-time print run, never restocked"],
    styling: ["A keepsake for our founding community — not a basic tee."],
    sizes: ["S", "M", "L", "XL"],
    related: [{ slug: "salsa-practice-tee-charcoal", name: "Salsa Practice Tee — Charcoal", price: "£22" }],
  },
};

const buildWhatsAppLink = (productName: string, size: string | null) => {
  const sizeFragment = size ? ` (size: ${size})` : "";
  const text = `Hi Melitta, I'm interested in the ${productName}${sizeFragment} from the Pura Nights shop. Is it in stock?`;
  return waCustom(text, "ProductTemplate:1").href;
};

const ProductTemplate = () => {
  const { slug = "" } = useParams();
  const product = catalog[slug];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Product FAQs (rendered + emitted as FAQPage JSON-LD alongside Product schema)
  const productFaqs = useMemo(() => {
    if (!product) return [];
    const isPersonalised = product.catSlug === "teamwear";
    return [
      {
        q: "What size should I order?",
        a: `For the ${product.name}, we recommend ${product.catSlug === "hoodies-layers" || product.catSlug === "training-tops" ? "your usual size for a relaxed fit, or size down for fitted" : "your usual UK size — between sizes? Size down for fitted dancewear"}. Full measurements are on the size guide. If in doubt, WhatsApp Melitta with your bust/chest measurement and she'll recommend.`,
      },
      {
        q: "How long does delivery take?",
        a: "UK standard shipping is 3–5 working days (£3.50). Tracked 24h is £5.95. Free over £60. Class collection in Chiswick (Mon) or Ealing (Tue) is free — choose at checkout and pick up in person.",
      },
      {
        q: "Can I return or exchange this item?",
        a: isPersonalised
          ? "Personalised Pura Ladies teamwear is final sale and cannot be returned or exchanged once production starts. Please double-check sizing before you order — WhatsApp Melitta if unsure."
          : "Yes — 14-day returns on unworn items with original tags. Free in-person exchanges at any Monday or Tuesday class. See the full policy at /shipping-returns.",
      },
      {
        q: "How do I enquire on WhatsApp?",
        a: `Tap the WhatsApp button above — it pre-fills your message with the product name and selected size, so Melitta can confirm stock and answer sizing questions in minutes. Direct line: 07449 482343.`,
      },
    ];
  }, [product]);

  // JSON-LD Product schema + FAQPage in one @graph
  const productSchema = useMemo(() => {
    if (!product) return undefined;
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          name: product.name,
          category: product.category,
          description: product.shortDesc,
          brand: { "@type": "Brand", name: "Pura Nights" },
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: product.priceValue.toFixed(2),
            availability: "https://schema.org/PreOrder",
            url: `https://www.puranights.com/shop/${slug}`,
            seller: { "@type": "Organization", name: "Pura Nights" },
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: productFaqs.map(f => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    };
  }, [product, slug, productFaqs]);

  if (!product) {
    return (
      <Layout>
        <SeoHead title="Product Not Found — Pura Nights Shop" description="That product doesn't exist or has sold out." path={`/shop/${slug}`} noindex />
        <section className="section-padding section-ivory">
          <div className="container-main max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Product not found</h1>
            <p className="text-muted-foreground mb-6">It may have sold out or moved. Browse the full collection or message Melitta on WhatsApp.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-heading font-semibold hover:underline">
              <ArrowLeft size={16} /> Back to shop
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SeoHead
        title={`${product.name} — Pura Nights Shop`}
        description={product.shortDesc}
        path={`/shop/${slug}`}
        schema={productSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: product.name, path: `/shop/${slug}` },
        ]}
        noindex
      />

      <section className="section-padding section-ivory">
        <div className="container-main max-w-6xl">
          {/* Breadcrumb */}
          <nav className="text-xs font-heading text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Gallery — Wix: replace with Wix Stores Product Gallery widget */}
            <FadeInUp>
              <div className="space-y-3" data-wix-widget="stores-product-gallery">
                <div className="relative aspect-[4/5] bg-charcoal rounded-2xl overflow-hidden">
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 0%, hsl(43 48% 54% / 0.18), transparent 60%), linear-gradient(180deg, hsl(0 0% 10%), hsl(0 0% 6%))' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40">Hero image — 1200×1500</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="relative aspect-square bg-charcoal-light rounded-xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-accent text-[9px] tracking-[0.2em] uppercase text-primary-foreground/30">Shot {i}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>

            {/* Info column */}
            <FadeInUp>
              <div>
                <p className="text-[10px] font-accent uppercase tracking-[0.3em] text-primary mb-3">{product.category}</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">{product.name}</h1>
                <p className="font-display text-3xl text-primary font-bold mb-5">{product.price}</p>
                <p className="text-foreground/80 font-heading leading-relaxed mb-8">{product.shortDesc}</p>

                {/* Size selector — Wix: bind to Wix Stores Product Option "size" */}
                <div className="mb-8" data-wix-widget="stores-product-options">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-accent uppercase tracking-[0.2em] text-foreground">Size</p>
                    <Link to="/size-guide" className="text-[11px] text-primary hover:underline inline-flex items-center gap-1">
                      <Ruler size={12} /> Size guide
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        aria-pressed={selectedSize === s}
                        data-wix-option-size={s}
                        className={`min-w-[3rem] px-4 py-2 rounded-full text-xs font-heading font-semibold border transition-colors ${
                          selectedSize === s
                            ? "bg-charcoal text-primary-foreground border-charcoal"
                            : "bg-card border-border hover:border-primary"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && (
                    <p className="text-[11px] text-muted-foreground mt-3">Select a size to pre-fill your WhatsApp enquiry.</p>
                  )}
                </div>

                {/* Primary CTA: WhatsApp enquiry (Wix: replace with Add-to-Cart on go-live) */}
                {/* <!-- WIX: Replace with Wix Stores Add to Cart button when checkout is live --> */}
                <a
                  href={buildWhatsAppLink(product.name, selectedSize)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-charcoal text-primary-foreground hover:bg-primary hover:text-charcoal transition-colors font-heading font-bold uppercase tracking-wider text-sm px-7 py-4 rounded-full mb-3"
                >
                  <MessageCircle size={18} />
                  {selectedSize ? `Enquire on WhatsApp · size ${selectedSize}` : "Enquire on WhatsApp"}
                </a>
                <p className="text-[11px] text-muted-foreground text-center mb-8">Soft launch — direct enquiry until checkout goes live. Melitta replies personally.</p>

                {/* Trust strip */}
                <div className="grid grid-cols-2 gap-3 mb-10">
                  <div className="flex items-start gap-2 p-4 bg-card rounded-xl border border-border">
                    <Truck size={18} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-heading font-semibold text-xs">UK shipping from £3.50</p>
                      <p className="text-[11px] text-muted-foreground">Free over £60</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-4 bg-card rounded-xl border border-border">
                    <RotateCcw size={18} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-heading font-semibold text-xs">14-day returns</p>
                      <p className="text-[11px] text-muted-foreground">Free in-class exchanges</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="border-t border-border pt-6 mb-6">
                  <h2 className="font-display text-xl font-bold mb-3">Product details</h2>
                  <ul className="space-y-2">
                    {product.details.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm font-heading text-foreground/80">
                        <span className="text-primary">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Styling notes */}
                <div className="border-t border-border pt-6">
                  <h2 className="font-display text-xl font-bold mb-3">Styling notes</h2>
                  <ul className="space-y-2">
                    {product.styling.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm font-heading text-foreground/80">
                        <span className="text-primary">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Cross-links strip — drives navigation + internal SEO between shop pillars */}
      <section className="py-12 section-warm border-t border-border">
        <div className="container-main max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/size-guide" className="group flex items-start gap-3 p-5 bg-card rounded-2xl border border-border hover:border-primary transition-colors">
              <Ruler size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-heading font-semibold text-sm group-hover:text-primary transition-colors">Size guide</p>
                <p className="text-xs text-muted-foreground mt-1">Verified measurements for every fit.</p>
              </div>
            </Link>
            <Link to="/shipping-returns" className="group flex items-start gap-3 p-5 bg-card rounded-2xl border border-border hover:border-primary transition-colors">
              <Truck size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-heading font-semibold text-sm group-hover:text-primary transition-colors">Shipping & returns</p>
                <p className="text-xs text-muted-foreground mt-1">UK from £3.50 · 14-day returns.</p>
              </div>
            </Link>
            <Link to={`/lookbook/${product.catSlug}`} className="group flex items-start gap-3 p-5 bg-card rounded-2xl border border-border hover:border-primary transition-colors">
              <span className="font-accent text-[10px] tracking-[0.25em] text-primary mt-1 shrink-0">LOOK</span>
              <div>
                <p className="font-heading font-semibold text-sm group-hover:text-primary transition-colors">{product.category} lookbook</p>
                <p className="text-xs text-muted-foreground mt-1">See it on the dancefloor.</p>
              </div>
            </Link>
            <Link to="/shop" className="group flex items-start gap-3 p-5 bg-card rounded-2xl border border-border hover:border-primary transition-colors">
              <ArrowLeft size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-heading font-semibold text-sm group-hover:text-primary transition-colors">Browse all products</p>
                <p className="text-xs text-muted-foreground mt-1">The full Pura Nights collection.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Related products — Wix: replace with Wix Stores "You might also like" widget */}
      {product.related.length > 0 && (
        <section className="section-padding section-dark" data-wix-widget="stores-related-products">
          <div className="container-main max-w-6xl">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground text-center mb-10">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.related.map(r => (
                <Link key={r.slug} to={`/shop/${r.slug}`} className="bg-charcoal-light rounded-2xl overflow-hidden hover:bg-primary/10 transition-colors group">
                  <div className="relative aspect-[4/5] bg-charcoal">
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 0%, hsl(43 48% 54% / 0.18), transparent 60%), linear-gradient(180deg, hsl(0 0% 10%), hsl(0 0% 6%))' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40">Product image</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-primary-foreground text-sm mb-1 group-hover:text-primary transition-colors">{r.name}</h3>
                    <p className="font-display text-lg font-bold text-primary">{r.price}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/lookbook" className="inline-flex items-center gap-2 text-primary font-heading font-semibold hover:underline text-sm">
                See it on the dancefloor — open the Lookbook →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Product FAQ — Wix: replace with Wix FAQ app bound to per-product Q&A field, or keep static block */}
      {/* <!-- WIX: Bind to product.faqs (custom field) OR re-use shared FAQ collection filtered by category --> */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3 inline-flex items-center justify-center gap-2 w-full">
              <HelpCircle size={12} /> Before You Order
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">Product FAQs</h2>
            <p className="text-muted-foreground text-center text-base mb-10 font-heading">Sizing, delivery, returns, and how to enquire — answered for the {product.name}.</p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Accordion type="multiple" className="mb-8">
              {productFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`pfaq-${i}`}>
                  <AccordionTrigger className="font-heading font-semibold text-left text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center">
              <a
                href={buildWhatsAppLink(product.name, selectedSize)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-heading font-semibold hover:underline text-sm"
              >
                <MessageCircle size={14} /> Still unsure? Ask Melitta on WhatsApp →
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
};

export default ProductTemplate;
