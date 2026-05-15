# 39 — Revenue Domination Audit (Block 1 Shipped)

_Last updated: 2026-05-15 — Pura Nights buildout, Block 1 of 4._

## Purpose
Turn puranights.com from a beautifully built brochure site into a lead-generating ecosystem by adding the four highest-leverage revenue routes, contextual CTA infrastructure, and an answer-block (GEO/AI-search) primitive that can be dropped into any page.

---

## What shipped this sprint (Block 1)

### New revenue routes
| Route | Intent | Schema | Form subject (Supabase `contact_submissions`) |
|---|---|---|---|
| `/corporate-dance-classes-london` | Corporate team-building enquiries | `Service` + `FAQPage` + `BreadcrumbList` | `Corporate Booking — Team Building` |
| `/private-group-dance-parties-london` | Hen / birthday / private group | `Service` + `FAQPage` + `BreadcrumbList` | `Private Group Party — Hen / Birthday` |
| `/partner-with-pura-nights` | Venue / supplier / media partnerships | `Organization` + `ContactPage` + `FAQPage` | `Partnership / Venue Collaboration` |
| `/latin-night-out-west-london` | Editorial/commercial hub for "Latin night" intent | `Article` + `FAQPage` + `BreadcrumbList` | n/a (links to `/start-here`, `/events`, `/prices`) |

All four are enquiry-led — **no public pricing** on corporate / private / wedding flows (per governance).

### New components
- `src/components/AnswerBox.tsx` — reusable AI/GEO answer block (paragraph + bullets + CTA), drop-in for any route to win featured snippets and AI Overview citations.
- `src/components/CorporateCTA.tsx` — full-width strip linking to `/corporate-dance-classes-london` (also used compact on homepage).
- `src/components/PartnerCTA.tsx` — full-width strip linking to `/partner-with-pura-nights` (also used compact on homepage).
- `src/components/EnquiryForm.tsx` — flexible enquiry form bound to `contact_submissions` via `enquiryType` prop with Zod validation.

### Wiring
- Routes added to `src/App.tsx` (4 entries).
- Footer: new "Corporate Bookings" + "Partner with us" links.
- Homepage: subtle **CorporateCTA + PartnerCTA** strips (compact mode) added between Instagram strip and FAQ — lower-fold, non-disruptive.
- Sitemap (`scripts/seo-qa.ts` ROUTES table + auto-regen of `public/sitemap.xml`): 4 new entries with priorities 0.8–0.9.
- Database: migration `20260515102200_*.sql` extends `validate_contact_submission()` trigger to allow the three new enquiry subjects.
- Wix-safe: every new component carries `WIX SECTION` JSX comments for 1:1 replication.

### SEO governance preserved
- Canonical host: `https://www.puranights.com` on all four pages.
- No `Event` schema on any new page — they emit only `Service` / `Article` / `Organization`. RECURRING_PAGES guard in `seo-qa.ts` unaffected.
- All four pages indexable; no admin/shop/refer leakage.

---

## Money-page inventory after Block 1

| Tier | Pages |
|---|---|
| **P0 — Direct revenue** | `/prices`, `/bookings`, `/gift-vouchers`, `/private-lessons`, `/wedding-dance-london`, `/corporate-dance-classes-london` ⭐, `/private-group-dance-parties-london` ⭐ |
| **P1 — Lead capture / enquiry** | `/contact`, `/partner-with-pura-nights` ⭐, `/pura-ladies` (audition), `/online-academy` |
| **P2 — Authority / commercial hub** | `/pura-nights`, `/start-here`, `/latin-night-out-west-london` ⭐, `/events`, `/blog` |
| **P3 — Local SEO** | `/dance-classes-chiswick`, `/dance-classes-ealing`, `/salsa-classes-london`, `/bachata-classes-london`, + 8 satellite local pages |

⭐ = shipped this sprint.

---

## Gaps & priorities for Blocks 2–4

### Block 2 — Local SEO + homepage polish + AnswerBox rollout
- Thin local pages need unique intros + transit + venue context: `/dance-classes-hounslow`, `/salsa-classes-acton`, `/salsa-classes-hammersmith`, `/salsa-classes-fulham`, `/salsa-classes-richmond`.
- Homepage "Choose your path" 6-card section above the fold.
- Drop `<AnswerBox>` into 10 priority pages.
- Internal-link pass: every money page → ≥3 contextual outbound internal links.

### Block 3 — Content authority
- 12 new blog posts (corporate, hen, beginners-shy, etiquette, social-making, after-work, date night, etc.), each 900–1,500 words with `Article + FAQPage` schema and mid-article + bottom CTAs.
- Add "Corporate" and "Hen / Group" categories to `Blog.tsx`.

### Block 4 — Wix migration + launch QA
- Update docs 11, 16, 18, 20, 22, 27 with the four new routes + Wix CMS mappings.
- New: `docs/40-PARTNER-BACKLINK-TOOLKIT.md`, `docs/41-GBP-REVIEWS-LOCAL-PACK-SYSTEM.md`.
- Run `seo-qa`, `schema-validate`, `redirect-audit`, regenerate sitemap, snapshot for handoff.

---

## QA checklist for Block 1

- [x] All four routes render via Layout + SeoHead
- [x] Schema emitted via SeoHead `schema` prop (Service/FAQPage/Article/Organization/BreadcrumbList)
- [x] Footer links resolve
- [x] Sitemap regenerated (109 URLs, host: https://www.puranights.com)
- [x] Migration applied — `contact_submissions` accepts the three new subjects
- [x] Homepage strips compile and respect existing typographic + spacing tokens
- [x] No public pricing on enquiry-led routes
- [x] No `Event` schema added to recurring class pages
