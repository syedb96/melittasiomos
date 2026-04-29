# Page Status Matrix — v9 Deployment Optimisation Pass

Updated 2026-04-27. Principle: nav sells, footer catalogues, weak/duplicate pages noindexed, shop shell soft-launched.

## ADDED THIS PASS
- `/shop`, `/size-guide`, `/shipping-returns`, `/lookbook` — Wix Stores-ready shell (noindex until launch). Linked from footer (Services column) only — not in top nav.
- `/shop/:slug` — Wix Stores-ready **single product page template** with gallery, size selector, details, styling notes, related products, JSON-LD Product schema, and dynamic WhatsApp CTA. Demo catalog of 8 products; replace with Wix Stores collection on migration.
- `docs/11-SEO-PAGE-MATRIX.md` — full per-page meta/H1/schema/index matrix.

## REMOVED / DELETED
- `src/components/PressLogos.tsx` — unsupported press strip removed from /about (no verified features).

## POLISHED THIS PASS
- Homepage scale + rhythm: bigger H2s (4xl→6xl), wider max-w (5xl→6xl), Why-People grid relaxed (lg:3 / xl:5), Pricing card padding bumped (p-8→p-10), brand cards taller (h-80→h-[420px]).
- Homepage **mid + bottom rhythm pass (v9.1)**: Wedding Teaser, Blog Preview, Gift Vouchers strip, Follow the Journey, FAQ, and final CTA all upgraded to luxury scale (py-20+, max-w-6xl, eyebrow + 4xl–6xl H2 + 2xl supporting copy).
- **Proof rationalisation (v9.1)**: removed duplicated "5.0 Google Rating · 500+ Students · 15+ Years" line under hero (already covered by Trust Ticker + SocialProofBar); deleted "Follow Us mini" section that duplicated the Instagram grid; "Find Our Brands on Google" CTA now points to `/testimonials` (was dead `/proof-centre`); homepage `/online-classes` brand-card link now uses canonical `/online-salsa-bachata-coaching`.
- Team cards: replaced initials-only circles with editorial dark monogram tile + "Portrait pending" label across `/about` and `/meet-the-team`.
- **Product page (v9.1)**: added Product FAQ accordion (sizing / delivery / returns / WhatsApp enquiry) with FAQPage JSON-LD merged into existing Product+Offer schema via `@graph`.

## KEEP (core money + trust)
Home, /pura-nights, /pura-ladies, /events, /prices, /bookings, /about, /meet-the-team,
/wedding-dance, /private-lessons, /online-salsa-bachata-coaching, /online-academy,
/community, /schedule, /gallery, /testimonials, /contact, /faq, /start-here,
/locations, /gift-vouchers, /beginners, /blog,
/venue/the-george-iv-chiswick, /venue/the-drayton-court-ealing,
/learn/salsa-bachata-guide, /learn/salsa-vs-bachata,
/shop, /size-guide, /shipping-returns, /lookbook (soft-launch, noindex).

## POLISH (next passes)
- Homepage hero + proof flow (replace AI-looking imagery with real photos)
- Venue pages (transport / parking / first-night flow detail)
- Testimonials categorisation (Beginners / Wedding / Private / Pura Ladies / Community)
- Local pages — uniqueness pass to avoid thin-content flags
- Footer local directory (collapsed to top 8 areas — review quarterly)

## MERGE
- /proof-centre → /testimonials (kept routable, noindexed)

## REMOVE / NOINDEX
| Page | Action | Reason |
|------|--------|--------|
| /online-classes | 301 → /online-salsa-bachata-coaching (SPA Navigate) | Duplicate intent |
| /refer | noindex,follow | Internal growth tool |
| /all-pages-master | noindex,follow | Internal directory |
| /proof-centre | noindex,follow | Merged into /testimonials |
| /admin/* | private (route guard) | Backend only |

## NAVIGATION RULES
**Top nav:** Home · Classes & Events · Prices & Booking · About & Services · Learn.
**Never in nav:** local SEO pages, refer, proof-centre, all-pages-master, online-academy.
**Footer columns:** Classes · Services · Learn · Locations · Contact.

## REDIRECTS (Wix host-level on migration)
- `/online-classes` → `/online-salsa-bachata-coaching` (301)
- Legacy Wix slugs per `docs/09-REDIRECT-AND-CLEANUP-PLAN.md`

## DO-NOT-BUILD LIST
Dashboards, user areas, more random local pages in nav, new quizzes, ambassador expansions, anything that doesn't serve first-timer conversion or venue-night bookings.
