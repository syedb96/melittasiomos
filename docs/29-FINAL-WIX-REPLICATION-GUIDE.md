# 29 — Final Wix Replication Guide

> Dummy-proof build order. Follow top to bottom.

## 1. Wix workspace prep

1. Create Wix Studio site, plan = Business & eCommerce.
2. Set primary domain `www.puranights.com`. Enable apex → www 301 (Settings → Domains).
3. Site Languages → English (United Kingdom).
4. SEO Defaults: site name = "Pura Nights", default OG image = brand hero.

## 2. Static pages (build first)

Order: `/` → `/pura-nights` → `/prices` → `/wedding-dance` → `/private-lessons` → `/about` → `/meet-the-team` → `/contact` → `/start-here` → `/beginners` → `/schedule` → `/locations` → `/online-salsa-bachata-coaching` → `/online-academy` → `/pura-ladies` → `/ladies-styling-london` → `/bachata-performance-team-london` → `/gift-vouchers` → `/gallery` → `/testimonials` → `/faq` → `/community` → `/refer` → `/privacy-policy` → `/cookie-policy` → `/terms` → `/thank-you` → 404.

For each: copy the title/description from `<SeoHead>` in the matching Lovable file, paste content sections in Wix Editor, attach JSON-LD via SEO → Structured Data Markup.

## 3. CMS collections to create

| Collection | Fields |
|---|---|
| `Venues` | slug, name, address, postcode, hero, gallery_ids, schedule_html, seo_title, seo_description, schema_json |
| `LocalAreas` | slug, area_name, parent_venue, intro_html, faqs[], cta_url, seo_title, seo_description |
| `Events` | slug, title, startDate, endDate, status, previousStartDate, venue_ref, price, currency, availability, itemCondition, category, image, seo_title, seo_description |
| `Team` | slug, name, role, bio, photo, social_links |
| `BlogPosts` | slug, title, body, category, hero, author_ref, datePublished, dateModified, related_slugs[] |
| `Testimonials` | name, source, rating, quote, photo, source_url |

## 4. Dynamic pages

- `/venue/{slug}` ← Venues
- `/salsa-classes-{slug}`, `/bachata-classes-{slug}`, `/dance-classes-{slug}`, etc. ← LocalAreas (one URL pattern per service or use a single `/{slug}` with prefix in slug — recommend separate patterns to keep titles clean).
- `/events/{slug}` ← Events. Set canonical = `{item.url}`. Velo: if `status == 'EventCancelled'`, set `wixSeo.setHints({noIndex: true})`.
- `/blog/{slug}` ← BlogPosts (Wix Blog).

## 5. Blog migration

1. Create categories: Beginners, Salsa, Bachata, Wedding, Local, Culture, Events.
2. Import each Lovable blog page into Wix Blog (manual copy of title, body, hero, datePublished, category, author).
3. Verify `Article` schema includes `author`, `publisher`, `datePublished`, `dateModified`.
4. Add mid-article CTA block matching Lovable layout.

## 6. Events migration

- Create one Wix Event per upcoming Latin Friday from `src/data/events.ts`.
- Mirror `startDate`, `endDate`, status, venue, price.
- Upload per-event OG image from `public/og/events/{slug}.jpg`.
- Confirm Wix Events auto-emits valid `Event` schema. If using a CMS collection instead, paste schema from `buildEventSchema()` output.

## 7. Shop soft-launch

- Build Wix Stores catalogue with placeholder products.
- Mark every shop page `Index = OFF`, `Sitemap = OFF` until real photography ships.
- Flip ON in one batch after launch QA.

## 8. Forms & enquiry setup

- `/contact`: Wix Form → Subject (9 options) → Email + Supabase webhook.
- `/wedding-dance`: enquiry form (no price field).
- `/private-lessons`: enquiry form (no price field).
- Lead magnets: Wix Form → Mailchimp automation.

## 9. Header / Footer / Menu

- Header: Home, Classes (mega), Pura Nights, Prices, Events, Wedding, Private, About, Contact.
- Sticky mobile CTA: Book / WhatsApp.
- Footer: all 18 local pages, both venues, blog, FAQ, testimonials, gallery, online academy, meet the team, legal links, social, newsletter.

## 10. Redirects

Apply every row from `docs/20-WIX-REDIRECT-MANAGER-MAP.md` via Marketing & SEO → URL Redirect Manager → Single Redirect → 301.

## 11. Canonicals

- Static pages: leave Wix auto-canonical (self).
- Dynamic pages: SEO Advanced → Canonical = `{$item.url}`.
- Noindex pages: Canonical = the target canonical (e.g. `/online-classes` → canonical `/online-salsa-bachata-coaching`).

## 12. Schema

- Site-level: paste `DanceSchool` + `LocalBusiness` once at Site Settings → SEO → Structured Data.
- Page-level: paste schema from `<SeoHead schema=...>` per page.
- Event/Article/FAQPage as listed in docs/28.

## 13. Sitemap & GSC

1. Verify `https://www.puranights.com/sitemap.xml` returns 200, lists only canonical indexable URLs.
2. GSC → remove every old page-URL "sitemap" → submit only `/sitemap.xml`.
3. Bing Webmaster → import GSC site → submit same sitemap.
4. Run docs/23 daily indexing control sheet (manual GSC URL Inspection, ≤10/day, Tier 1 first).

## 14. Final launch checklist

- [ ] All Tier 1 pages return 200 on www.
- [ ] Apex 301s to www.
- [ ] All redirects from docs/20 return 301.
- [ ] No Tier 1 page has `noindex`.
- [ ] No recurring page has Event schema.
- [ ] Sample `/events/:slug` passes Rich Results Test with full Offer.
- [ ] Sitemap submitted, no errors in GSC after 7 days.
- [ ] Wix Forms wired to enquiry inbox.
- [ ] Booking links point to `https://linktr.ee/pura.nights` or Wix Tickets.
- [ ] WhatsApp CTAs use `https://wa.me/447449482343`.
- [ ] Cookie banner active.
