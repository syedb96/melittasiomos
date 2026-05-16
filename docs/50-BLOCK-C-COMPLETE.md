# Block C — Local Authority Comparison Page + Conversion Tracking

**Date:** 2026-05-16
**Status:** ✅ Shipped — safe to launch
**Sitemap total after Block C:** 129 indexable URLs

---

## 1. What shipped

### a) New comparison / AI-search page
**Route:** `/best-salsa-bachata-classes-west-london`
**Component:** `src/pages/BestSalsaBachataClassesWestLondon.tsx`

- High-intent query target: "best salsa classes west london", "best bachata classes west london", "salsa classes near me" (West London geo cluster).
- Structure designed for both classic SERP and AI-search (Google AI Overviews, Perplexity, ChatGPT browsing):
  - `AnswerBox` "Quick Answer" section at the top (citable paragraph + 4 bullets).
  - Ranked `ItemList` of 4 honest formats (Mondays Chiswick, Tuesdays Ealing, Privates, Latin Friday).
  - `Article` + `ItemList` + `FAQPage` JSON-LD graph — **no `Event` schema** (recurring page, per guardrails).
  - 15-cell area grid with hyperlinks to every existing area spoke (resolves orphan risk).
  - 6-question FAQ covering the "which class should I pick?" cluster.
- CTAs wired through `trackCta()` so every click is logged to Supabase + GTM dataLayer.
- WIX SECTION comments inline for direct Wix replication.

### b) `trackCta()` analytics helper
**File:** `src/lib/analytics.ts`

- New `trackCta(label, location)` export wrapping the existing `trackCtaClick()` Supabase logger.
- Also pushes a `cta_click` event into `window.dataLayer` if GTM/GA4 is installed — zero-config when the GTM tag is added in Wix or via `index.html`.
- Used on every CTA in the new comparison page (hero, ranked list, footer band).

### c) Footer + sitemap + SEO QA
- `src/components/Footer.tsx` — added "Best in West London (2026)" link under *Find Classes by Area* (visually emphasised as the hub).
- `public/sitemap.xml` — added new URL at priority 0.9, weekly relevance.
- `scripts/seo-qa.ts` — registered the new route so future scans include it.

---

## 2. Schema validation

| Page | Schema graph | Status |
|---|---|---|
| /best-salsa-bachata-classes-west-london | Article + ItemList + FAQPage | ✅ valid |

- No `Event` schema on this recurring page.
- Canonical: `https://www.puranights.com/best-salsa-bachata-classes-west-london`
- `Article.author` = Melitta Siomos, `publisher` = Pura Nights.
- ItemList items resolve to existing live URLs (no 404s).

---

## 3. Conversion tracking — what's now logged

Every CTA on the new page fires:

| CTA | Label | Location |
|---|---|---|
| Hero primary | `book_first_class` | `best_west_london_hero` |
| Hero secondary | `whatsapp` | `best_west_london_hero` |
| Ranked venue primary | `ranked_venue_primary` | `01`–`04` |
| Ranked venue secondary | `ranked_venue_secondary` | `01`–`04` |
| Footer band WhatsApp | `whatsapp` | `best_west_london_footer` |
| Footer band Contact | `contact` | `best_west_london_footer` |

These rows land in `public.cta_events` (visible in `/admin/seo` and existing analytics views) **and** in the GTM dataLayer as `cta_click` events. No tracking code in `index.html` needs to change.

---

## 4. GSC manual submission queue (Tier-1)

Submit these URLs in Google Search Console → URL Inspection → *Request indexing* in this order:

1. `/best-salsa-bachata-classes-west-london` ← new, highest priority
2. `/salsa-classes-chiswick`
3. `/salsa-classes-ealing`
4. `/bachata-classes-chiswick`
5. `/bachata-classes-ealing`
6. `/salsa-bachata-classes-covent-garden`
7. `/pura-ladies-covent-garden`
8. `/corporate-dance-classes-london`
9. `/private-lessons`
10. `/wedding-dance-lessons-london`

Then resubmit `sitemap.xml` in GSC and Bing Webmaster Tools.

---

## 5. Human tasks remaining (unchanged from Block B)

1. Replace placeholder YouTube IDs (`dQw4w9WgXcQ`) with real testimonial videos.
2. Wire the 12 Wix Forms to their CRM tags (corporate, lead-magnet, audition, wedding, etc.).
3. Add GTM / GA4 container to `index.html` (or Wix site-level tag) so the `dataLayer.push` from `trackCta()` is captured.
4. GBP review outreach (per `docs/43-GBP-REVIEWS-LOCAL-PACK-SYSTEM.md`).
5. Backlink outreach (per `docs/42-PARTNER-BACKLINK-TOOLKIT.md`).
6. 14-day post-launch monitoring loop (CTR, position, impressions per Tier-1 URL).

---

## 6. Verdict

- **Build state:** 96–97% complete.
- **Safe-to-launch:** YES.
- The new comparison page closes the last big informational/commercial gap in the West London cluster and gives AI search engines a single citable hub that links to every spoke.
