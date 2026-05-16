# 49 — Post-Sprint SEO QA Report
_Date: 2026-05-16 · Sprint: Market Domination (Block 6)_

## Headline numbers
- Sitemap URLs: **128** (was 127)
- Schema validation: **0 errors / 0 warnings**
- Recurring pages guarded against Event-schema misuse: **7**
- Single-event entries validated: **8**
- Canonical host: `https://www.puranights.com` (enforced sitewide)

## Pages added
| Route | Purpose | Schema | Indexed |
|---|---|---|---|
| `/salsa-bachata-classes-covent-garden` | Premium Central London / Covent Garden pathway page (no fake weekly class claim) | Service + FAQPage | ✅ |

## Pages improved
| Route | Change |
|---|---|
| `/pura-ladies` | Added AnswerBox ("What is Pura Ladies?") + Pura-Ladies-specific WhatsApp prefill on join CTA |
| `/private-lessons` | RelatedPages now links to new Covent Garden page |
| Footer (sitewide) | "Covent Garden · Central London" link added under "Find Classes by Area" |
| `src/App.tsx` | Route wired |
| `scripts/seo-qa.ts` | Covent Garden added to STATIC_ROUTES (priority 0.9) |

## Pages noindexed (unchanged)
- `/shop`, `/shop/:slug`, `/size-guide`, `/shipping-returns`, `/lookbook`, `/lookbook/:category` (until real product photography)
- `/refer`, `/proof-centre`, `/all-pages-master`, `/login`, `/thank-you`, `/admin/*`
- `/online-classes` → 301 to `/online-salsa-bachata-coaching`
- `/salsa-classes-acton-local` → 301 to `/salsa-classes-acton`

## Schema status
- Global `DanceSchool + LocalBusiness` injected on every route.
- `BreadcrumbList` auto-emitted on every non-root path.
- `Article` on all 60+ blog posts.
- `Course` on Chiswick / Ealing / programmatic neighbourhood pages.
- `Service + FAQPage` on `/corporate-dance-classes-london`, `/salsa-bachata-classes-covent-garden`.
- `Event` schema only on `/events/:slug`. RECURRING_PAGES guard verified.
- `AggregateRating` (5.0, 127 reviews) in global schema.

## Canonical & OG status
- All canonicals + OG URLs use `https://www.puranights.com`.
- `hreflang en-GB` + `x-default` set in `SeoHead`.
- `og:image` defaults to `/og-default.jpg` (replace per-route as real assets arrive).

## Redirect status
- Audit: `bun scripts/redirect-audit.ts` — 0 broken legacy redirects.

## Broken-link status
- No 404s detected via App.tsx route audit + sitemap diff.

## CTA audit status
- WhatsApp prefills now context-specific on: Corporate, Pura Ladies, Covent Garden, Wedding.
- Sticky mobile CTA + WhatsApp floating button: present sitewide.
- Footer WhatsApp CTA: present.
- EmailCaptureGate active on `/pura-nights` and `/start-here`.

## Remaining human blockers
1. Replace placeholder YouTube IDs (`dQw4w9WgXcQ`) in `VideoTestimonialsBlock` with real testimonial clips.
2. Replace placeholder photography across `RealProofSlot` markers.
3. Wire 12 Wix Forms → CRM tags per doc 08.
4. Submit Tier-1 URLs in Google Search Console URL Inspection (per doc 23).
5. Execute GBP review-request workflow (doc 43) — target +10 reviews / 30 days.
6. Begin partner backlink outreach (doc 42).
7. Begin 14-day post-launch monitoring window.

## Wix migration notes (new page)
`/salsa-bachata-classes-covent-garden` →
- Wix page type: Static page
- Slug: `/salsa-bachata-classes-covent-garden`
- Index: ON · Sitemap: ON · Custom canonical: inherit
- SEO title: "Salsa & Bachata Classes — Covent Garden & Central London | Melitta Siomos"
- Meta desc: see SeoHead in source
- H1: "Salsa & Bachata for Covent Garden & Central London"
- Add JSON-LD (Service + FAQPage) via Wix SEO → Custom JSON-LD (paste from page schema constant)
- Primary CTAs: WhatsApp (Covent Garden prefill) + Private Lessons link + Ticket Tailor
- No Wix Events widget on this page (no real recurring event)

## Risks / warnings
- Do not later add a fake "weekly Covent Garden class" claim to this page — the page is honest by design.
- Do not enable Event schema on this page.
- Do not duplicate this pattern for Mayfair / Soho / Kensington unless a real service rationale appears.
