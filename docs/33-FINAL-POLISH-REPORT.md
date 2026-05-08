# 33 — Final UX Conversion + Wix Handoff Polish Pass — Report

This sprint was surgical polish only — no new pages, no new features, no brand changes. Goal: make the site feel like a finished, premium, conversion-focused brand site that maps cleanly into Wix.

## What changed

### Components (new)
- `src/components/NewHereStrip.tsx` — premium ivory "New here?" strip with 3 reassurance badges and 3 CTAs (Beginner guide, This week's classes, WhatsApp).
- `src/components/FirstTimerCallout.tsx` — reusable callout with light/dark variants. Two CTAs: First-Timer Guide + WhatsApp.

### Components (updated)
- `src/components/Header.tsx`
  - Dropdowns now show small Lucide icons per item.
  - Hover state uses gold/peach accent (`primary/10` background, left-border accent).
  - Slightly wider (`min-w-260`), border tightened to `primary/15`, deeper shadow.
  - Per your instruction, **no per-item descriptions** added — labels stay clean so they mirror 1-for-1 into Wix.
  - Mobile menu unchanged (still flat).
- `src/components/Footer.tsx` — restructured from 5 dense columns to 4 readable columns:
  1. **Main Pages** (high-intent user nav)
  2. **Services**
  3. **Find Classes by Area** (visually demoted: smaller text, muted colour, two-up grid for SEO directory; full crawl preserved)
  4. **Contact** (phone, email, venues, WhatsApp button, Linktree)
  - Brand intro + 5-star Google badge + Instagram/social row preserved at the top.

### Pages (updated)
- `src/pages/Index.tsx`
  - Hero: `min-h` reduced from `92vh` → `78–82vh` responsive, image `object-position` set to `center 30%` so dancers' upper bodies/faces stay visible. CTAs sit comfortably above the fold on 1280×800, 1366×768, 1440×900.
  - New `<NewHereStrip />` inserted directly after the hero.
- First-timer callouts inserted on the 8 priority pages:
  - `/pura-nights`, `/prices`, `/locations`, `/schedule`,
  - `/salsa-classes-london`, `/bachata-classes-london`,
  - `/salsa-classes-chiswick`, `/bachata-classes-ealing`.

### Docs (new / updated)
- **NEW** `docs/32-WIX-PAGE-BY-PAGE-REPLICATION-CHECKLIST.md` — 19 priority pages, each with: Wix page name, slug, page type, meta title/description, H1, sections in order, images needed, schema, internal links, primary/secondary CTA, index status, redirect notes, plus cross-page conventions (phone, WhatsApp, Tickettailor, Linktree, canonical, robots).
- **UPDATED** `docs/06-MEDIA-AND-PHOTO-PLAN.md` — appended a final page-by-page Wix-ready photo checklist with crop ratios, subject, and alt text per slot.
- **NEW** `docs/33-FINAL-POLISH-REPORT.md` (this file).

## CTA / route QA

| Check | Result |
|---|---|
| All top nav links resolve to routed pages | ✅ |
| All footer links resolve to routed pages | ✅ |
| WhatsApp uses `https://wa.me/447449482343` | ✅ everywhere |
| Booking uses `https://www.tickettailor.com/events/puranights` (weekly) | ✅ |
| Linktree `https://linktr.ee/pura.nights` available in footer | ✅ |
| No public pricing on `/private-lessons` | ✅ |
| No public pricing on `/wedding-dance` | ✅ |
| No Warren Street / Fitness First references in current src | ✅ (none found) |
| No unsupported press claims | ✅ |
| Duplicate "proof centre" dead links | ✅ none — single `/proof-centre` referenced |
| `/online-classes` canonical strategy | Redirect rule documented in `docs/20-WIX-REDIRECT-MANAGER-MAP.md` and `docs/32`; canonical is `/online-salsa-bachata-coaching` |
| `/shop*` noindex until real photos | ✅ documented; current `<SeoHead noindex>` already in place |

## Image placeholder clarity
Every page-level placeholder now has a documented purpose, crop ratio, ideal subject and suggested alt text in `docs/06`. When mirroring into Wix, set the alt text on the asset in Wix Media Manager so it carries across every page that uses the same photo.

## Build / typecheck
- `bunx tsc --noEmit` → **0 errors**.

## SEO QA
- `noindex` correctly applied on `AdminLayout`, `Login`, `/shop*`.
- All 8 newly-edited pages still ship their existing `<SeoHead>` (callout was added inside `<Layout>` only).
- Sitemap (`public/sitemap.xml`) untouched — no new public routes.
- Schema snapshot suite (`bun run qa:schema`) and redirect audit (`bun run qa:redirects`) unchanged and runnable per `launch-evidence/README.md`.

## Manual Wix work still required
1. Replace each annotated photo placeholder with real photography per `docs/06`.
2. Implement every redirect rule in Wix URL Redirect Manager per `docs/20-WIX-REDIRECT-MANAGER-MAP.md` (priority order matters).
3. Migrate testimonials into Wix Content Manager → Testimonials collection (per `docs/03-WIX-CMS-BLUEPRINT.md`).
4. Set up Wix Events for Latin Fridays (per `docs/32` row 13).
5. Wix Stores: keep `/shop*` `noindex` until real product photos are loaded.
6. Submit Wix-published `sitemap.xml` to Google Search Console + Bing Webmaster Tools (timestamps go into `docs/30-FINAL-LAUNCH-QA-PACK.md`).
7. Capture Rich Results Test screenshots per `docs/31-RICH-RESULTS-SCREENSHOT-PROTOCOL.md`.
