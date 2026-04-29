# Wix Shop Handoff Checklist — Pura Nights

> Purpose: hand the Lovable shop shell to Wix Stores cleanly. Every route, field binding, redirect, schema, and photo gap is listed below. Tick top-to-bottom on migration day — nothing else needed.

Updated: 2026-04-29. Owner: Melitta. Apps required: **Wix Stores** (collections + checkout), **Wix SEO Tools**, **Wix Custom Code** (JSON-LD).

---

## 1. Routes & redirects

| Lovable route | Wix page type | Wix URL slug | Index? | Notes |
|---|---|---|---|---|
| `/shop` | Wix Stores Category page | `/shop` | ⚠️ noindex until photos live | Bind to "All Products" collection. Replace React filters with Wix Stores **Filter** + **Sort** widgets bound to URL params. |
| `/shop/:slug` | Wix Stores Product page (Dynamic) | `/shop/{product-slug}` | ⚠️ noindex until photos live | Use Wix Stores Dynamic Product Page template — slug = `product.slug`. |
| `/size-guide` | Wix Static page | `/size-guide` | ⚠️ noindex until photos live | Cross-link from every product page. |
| `/shipping-returns` | Wix Static page | `/shipping-returns` | ⚠️ noindex until photos live | |
| `/lookbook` | Wix Pro Gallery page | `/lookbook` | ⚠️ noindex until photos live | Use Pro Gallery, organise by tag. |
| `/lookbook/:category` | Wix Dynamic page | `/lookbook/{category-slug}` | ⚠️ noindex until photos live | Bind to Lookbook collection filtered by category. |

### Required 301 redirects (Wix Marketing & SEO → URL Redirect Manager)

| From | To | Type |
|---|---|---|
| `/online-classes` | `/online-salsa-bachata-coaching` | 301 |
| `/store` | `/shop` | 301 |
| `/dancewear` | `/shop?category=dancewear` | 301 |
| `/merch` | `/shop` | 301 |
| `/proof-centre` | `/testimonials` | 301 |

### Canonical rule
Every shop page must self-canonical to `https://www.puranights.com{path}` — no trailing slash, no query params. Wix Stores generates this automatically; verify in Wix SEO Settings panel per page.

---

## 2. Wix Stores collection mapping

Create **one Wix Stores collection** named `Pura Nights Shop`, with these custom fields beyond Wix defaults:

| Wix Stores field | Source / type | Used by | Notes |
|---|---|---|---|
| `name` | built-in | H1, OG title, schema | |
| `slug` | built-in | URL `/shop/{slug}` | Lock to kebab-case. |
| `price` | built-in (GBP) | Price block, Offer schema | |
| `description` | built-in (Rich Text) | "Product details" tab | |
| `mainMedia` + `mediaItems[]` | built-in (Media) | Hero + thumbnails | 1200×1500 hero, 4 supporting shots minimum. |
| `productOptions.size` | built-in (Product Options) | Size selector | Variants: XS, S, M, L, XL, XXL, One Size. |
| `categories[]` | built-in (Collections) | Filter pills | dancewear, training-tops, hoodies-layers, accessories, teamwear. |
| `shortDescription` | **custom — Text** | Hero subheading + meta description | ≤160 chars. |
| `stylingNotes` | **custom — Rich Text** | "Styling notes" block | 2–3 bullets per product. |
| `faqs` | **custom — Repeater (q, a)** | Product FAQ accordion | OR re-use shared FAQ collection filtered by category. |
| `relatedProducts[]` | **custom — Reference** | "You might also like" widget | 2–3 references. |
| `tag` | **custom — Text** | Card badge ("Best Seller", "New", "Members") | Optional. |
| `membersOnly` | **custom — Boolean** | Pura Ladies teamwear gating | Show "Members" badge + verification CTA. |

### Demo catalog to migrate (already wired in Lovable)

Slug → name → category → price → sizes:

| Slug | Name | Category | Price | Sizes |
|---|---|---|---|---|
| `pura-nights-crop-top-champagne` | Pura Nights Crop Top — Champagne | Dancewear | £28 | XS–XL |
| `salsa-practice-tee-charcoal` | Salsa Practice Tee — Charcoal | Training Tops | £22 | XS–XXL |
| `bachata-hoodie-cream` | Bachata Hoodie — Cream | Hoodies & Layers | £48 | S–XXL |
| `pura-ladies-warm-up-jacket` | Pura Ladies Warm-Up Jacket | Teamwear | £62 | XS–L |
| `tote-dance-like-you-mean-it` | Tote — 'Dance Like You Mean It' | Accessories | £14 | One Size |
| `stainless-steel-water-bottle` | Stainless Steel Water Bottle | Accessories | £18 | One Size |
| `ladies-styling-wrap-top` | Ladies Styling Wrap Top | Dancewear | £32 | XS–L |
| `founders-tee-limited` | Founders Tee — Limited | Training Tops | £26 | S–XL |

Copy each product's `details[]`, `styling[]`, and `related[]` arrays from `src/pages/shop/ProductTemplate.tsx` (catalog object).

---

## 3. Product page template — exact field bindings

| Page section | Wix widget | Bound field |
|---|---|---|
| Breadcrumb | Wix Breadcrumbs widget | auto |
| Gallery (hero + 4 thumbs) | Wix Stores Product Gallery | `mediaItems[]` |
| H1 | Wix Text | `name` |
| Price | Wix Stores Price | `price` |
| Short description | Wix Text | `shortDescription` |
| Size selector | Wix Stores Product Options | `productOptions.size` |
| Size guide link | Wix Button (link) | static → `/size-guide` |
| Primary CTA | Wix Stores **Add to Cart** *once checkout is live*; before launch use a Wix Button with dynamic WhatsApp URL (see §4) | dynamic |
| Trust strip (shipping + returns) | Wix Repeater (2 cards) | static |
| Product details | Wix Text (Rich) | `description` |
| Styling notes | Wix Text (Rich) | `stylingNotes` |
| **Product FAQ accordion** | Wix FAQ app *or* Wix Accordion | `faqs[]` (custom Repeater) |
| Related products | Wix Stores **You Might Also Like** | `relatedProducts[]` |
| Lookbook cross-link | Wix Button | static → `/lookbook` |

---

## 4. WhatsApp CTA — dynamic pre-fill

Until Wix Stores checkout is enabled, every product page CTA links to WhatsApp with the product name + selected size pre-filled.

In Wix, set a **Dynamic Button URL** on the primary CTA:

```
https://wa.me/447449482343?text=Hi%20Melitta,%20I'm%20interested%20in%20the%20{{product.name}}%20(size:%20{{selectedSize}})%20from%20the%20Pura%20Nights%20shop.%20Is%20it%20in%20stock%3F
```

If `{{selectedSize}}` is unset, fall back to `(size: TBC)`. Wire via Wix Velo if the dynamic-token UI doesn't support this natively — see code reference in `src/pages/shop/ProductTemplate.tsx` `buildWhatsAppLink()`.

When checkout goes live, **swap** this button for Wix Stores Add to Cart and demote WhatsApp to a secondary "Ask a question" link below the price.

---

## 5. SEO matrix (per page)

| Page | Meta title (≤60) | Meta description (≤160) | H1 | Schema | Index? |
|---|---|---|---|---|---|
| `/shop` | Pura Nights Shop — Dancewear, Training & Lifestyle | Premium Salsa & Bachata dancewear & lifestyle pieces designed in West London. | Wear It. Mean It. | Store + ItemList + FAQPage | ⚠️ noindex (soft launch) |
| `/shop/:slug` | `{name}` — Pura Nights Shop | `{shortDescription}` | `{name}` | Product + Offer + FAQPage + BreadcrumbList | ⚠️ noindex (soft launch) |
| `/size-guide` | Size Guide — Pura Nights Dancewear & Apparel | Women's, unisex and teamwear measurements in cm. | Size Guide | FAQPage | ⚠️ noindex (soft launch) |
| `/shipping-returns` | Shipping & Returns — Pura Nights Shop | UK shipping from £3.50, free over £60. 14-day returns. | Shipping & Returns | FAQPage | ⚠️ noindex (soft launch) |
| `/lookbook` | Lookbook — Pura Nights Dancewear in Action | Editorial shots of the collection on Chiswick Mon, Ealing Tue, and Latin Friday nights. | Lookbook | ImageGallery | ⚠️ noindex (soft launch) |

**Remove `noindex` only when** (a) every product has ≥5 real photos, (b) at least one item is in stock and shippable, (c) the size guide includes verified measurements, and (d) returns address is live in Wix Stores.

---

## 6. Photo / video replacement tracker

All shop placeholders to be replaced before public launch. Brief is editorial — natural light, premium, real dancers from the Pura Nights community.

### A) Product photography (per SKU)

| Shot | Orientation | Use | Required? |
|---|---|---|---|
| Hero on model | 4:5 portrait, 1200×1500 | `mediaItems[0]`, OG image | ✅ Required |
| Detail / fabric texture | 1:1, 1200×1200 | thumbnail | ✅ Required |
| Back / side angle | 4:5, 1200×1500 | thumbnail | ✅ Required |
| In-class action shot | 4:5, 1200×1500 | thumbnail | ⭐ Strongly recommended |
| Flat lay / hanger | 1:1, 1200×1200 | thumbnail | Optional |

### B) Lookbook photography (per category)

| Category | Shots needed | Setting |
|---|---|---|
| Dancewear | 6 looks | Mon Chiswick floor + Tue Ealing warm-up |
| Training Tops | 4 looks | Drill-class candid |
| Hoodies & Layers | 4 looks | Venue arrival / bar area |
| Accessories | 3 looks | Flat lay + in-use |
| Teamwear | 5 looks | Pura Ladies rehearsal + performance |
| **Hero / cover** | 2 looks | Latin Friday dancefloor (low light, motion) |

### C) Video (optional, post-launch)

- Shop landing 6-sec hero loop (silent, looping, MP4 ≤2 MB)
- 3 product 360° clips for best-sellers (10 sec each)

### Brief

- Real Pura Nights dancers — no stock models.
- Champagne / charcoal / cream palette dominant.
- Natural light preferred; venue tungsten OK if motion is intentional.
- Alt text format: `"{Product name} — {colour} — worn at {venue}"`.

---

## 7. Trust + proof rules (do not duplicate)

The shop pages should **not** repeat the homepage trust ticker, "Find Our Brands on Google", or 5-star Google rating cluster. Trust on shop = shipping + returns + Melitta's WhatsApp. That's it.

---

## 8. Do-not-build list (shop side)

- ❌ No discount-code popups.
- ❌ No abandoned-cart recovery email until 50+ orders/month.
- ❌ No product reviews until 20+ orders per SKU (Wix can stub it but leave hidden).
- ❌ No member-only pricing tier in v1 — Pura Ladies teamwear gating is a simple "members only" badge + WhatsApp verification.
- ❌ No upsell/cross-sell modals — related products grid is enough.

---

## 9. Launch-day flip checklist

When ready to remove `noindex` and go live:

- [ ] Real product photography uploaded for every SKU
- [ ] Stock counts entered in Wix Stores
- [ ] Size guide updated with verified measurements
- [ ] Shipping rates configured in Wix Stores → Shipping
- [ ] Returns address set in Wix Stores → Settings
- [ ] Add-to-Cart enabled on product template (replace WhatsApp primary CTA)
- [ ] Remove `noindex` from `/shop`, `/shop/:slug`, `/size-guide`, `/shipping-returns`, `/lookbook`
- [ ] Update `public/sitemap.xml` to mark shop pages indexable
- [ ] Update `docs/02-PAGE-STATUS-MATRIX.md` and `docs/11-SEO-PAGE-MATRIX.md`
- [ ] Submit shop URLs to Google Search Console
- [ ] Test full purchase flow end-to-end (UK address, EU address, gift voucher)
- [ ] Re-test JSON-LD with [Schema.org Validator](https://validator.schema.org/)
