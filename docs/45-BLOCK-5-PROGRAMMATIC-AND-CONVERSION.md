# Block 5 — Programmatic Local + Conversion Lift

**Date:** 2026-05-15
**Sitemap:** 127 URLs (was 121, +6 neighbourhood)

---

## What shipped

### 1. Programmatic neighbourhood pages (+6 indexable URLs)

Single config-driven template at `src/components/NeighbourhoodPage.tsx` powering 6 thin wrappers — each unique enough to avoid thin-content / duplicate flags (unique H1, area intro, transit copy, local profile, AnswerBox Q&A).

| Route | Postcode | Primary venue path |
|---|---|---|
| `/salsa-classes-brentford` | TW8 | Bus 235/237 → Chiswick · 65 → Ealing |
| `/salsa-classes-kew` | TW9 | District: Kew Gardens → Turnham Green (5 min) |
| `/salsa-classes-barnes` | SW13 | Barnes Bridge → Chiswick (4 min train or walk) |
| `/salsa-classes-putney` | SW15 | District: East Putney → Turnham Green (12 min) |
| `/salsa-classes-shepherds-bush` | W12 | Central: → Ealing Broadway (10 min) |
| `/salsa-classes-notting-hill` | W11 | Central / District (15 min to either venue) |

Each page carries:
- `Course` schema (`areaServed` includes the neighbourhood + parent areas)
- `AnswerBox` (GEO question + concise answer + bullets + CTA) for AI-search citation
- `RelatedPages` — 6 contextual links (London hub, Chiswick, Ealing, West London, Schedule, Start Here)
- `<!-- WIX SECTION -->` JSX comments for 1:1 Wix replication
- H1 + first 100 words contain primary keyword (rule from project memory)

### 2. EmailCaptureGate — soft lead capture before Linktree/TicketTailor

New component at `src/components/EmailCaptureGate.tsx`. Inserted on:
- `/pura-nights` — "Get the schedule + first-timer guide before you book"
- `/start-here` — "Nervous? Get the new-dancer guide first."

**Behaviour:** Captures `name + email` → inserts into `enquiries` table with `subject: "General Enquiry"` and `source_page` set to the originating route. Always shows a "Skip & Book Now" outbound link so we never block intent (avoids hurting the booking conversion baseline). RLS allows anonymous `INSERT` on `enquiries` — no auth required.

### 3. VideoTestimonialsBlock on enquiry-only money pages

New component at `src/components/VideoTestimonialsBlock.tsx`. Lazy-loaded YouTube embeds (no autoplay until clicked, so no Core Web Vitals hit). Inserted on:
- `/wedding-dance-lessons-london`
- `/corporate-dance-classes-london`

**Action required from you:** Replace the placeholder `youtubeId: "dQw4w9WgXcQ"` strings with real Pura Nights testimonial videos. Edit in:
- `src/pages/WeddingDanceLessonsLondon.tsx` (2 IDs)
- `src/pages/CorporateDanceClassesLondon.tsx` (2 IDs)

### 4. WeddingTiers — "what's included" comparison (no public prices)

New component at `src/components/WeddingTiers.tsx`. 3-column comparison (Essentials / Signature / Showcase) — checks/crosses across 7 features. Each tier CTA opens WhatsApp pre-filled with a quote request for that tier. Inserted above the VideoTestimonials block on `/wedding-dance-lessons-london`. Keeps the strict "no public wedding pricing" rule (memory).

---

## Files changed

### Created
- `src/components/NeighbourhoodPage.tsx`
- `src/components/EmailCaptureGate.tsx`
- `src/components/VideoTestimonialsBlock.tsx`
- `src/components/WeddingTiers.tsx`
- `src/pages/SalsaClassesBrentford.tsx`
- `src/pages/SalsaClassesKew.tsx`
- `src/pages/SalsaClassesBarnes.tsx`
- `src/pages/SalsaClassesPutney.tsx`
- `src/pages/SalsaClassesShepherdsBush.tsx`
- `src/pages/SalsaClassesNottingHill.tsx`
- `docs/45-BLOCK-5-PROGRAMMATIC-AND-CONVERSION.md` (this file)

### Edited
- `src/App.tsx` — 6 imports + 6 routes
- `src/pages/PuraNights.tsx` — EmailCaptureGate
- `src/pages/StartHere.tsx` — EmailCaptureGate
- `src/pages/WeddingDanceLessonsLondon.tsx` — WeddingTiers + VideoTestimonialsBlock
- `src/pages/CorporateDanceClassesLondon.tsx` — VideoTestimonialsBlock
- `public/sitemap.xml` — auto-regenerated (127 URLs)

---

## QA

| Check | Result |
|---|---|
| `bunx tsx scripts/seo-qa.ts` | ✓ pass — 127 URLs, recurring-class guard intact, single events validated |
| H1 + first-100-words keyword on new pages | ✓ |
| RelatedPages ≤ 6 links per block | ✓ |
| Wix JSX section comments present | ✓ |
| EmailCaptureGate never blocks the outbound booking link | ✓ |
| Wedding pricing remains private (tier comparison only) | ✓ |
| `validate_contact_submission()` accepts `General Enquiry` for newsletter rows | ✓ (already in enum) |

---

## Still deferred (next blocks if growth justifies)

- Email nurture drip per `enquiries.subject` (5-email sequences for Wedding, Corporate, Group Party, Newsletter)
- `Review` / `aggregateRating` schema once review count > 50
- Live GA4 + GSC dashboard in `/admin/seo`
- Swap placeholder `youtubeId` values once real testimonial cuts are uploaded

---

## Sign-off

Block 5 finishes the deferred conversion-lift items from the launch report. The site now has:
- 6 more programmatic local pages funnelling neighbourhood searches into the two venue-specific class pages
- A soft email capture in front of every booking decision (lead-list growth without conversion loss)
- Video proof on the two highest-value enquiry pages (wedding + corporate)
- A tier comparison that reduces wedding-enquiry friction without breaking the no-public-pricing rule

**Ready to publish.**
