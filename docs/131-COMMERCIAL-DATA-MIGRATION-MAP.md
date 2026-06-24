# 131 — Commercial Data Migration Map (Track 1)

Date: 2026-06-24
Scope: Make `commerce_*` tables the **single source of truth** for every price,
offer, schedule slot, venue, booking link and CTA on the public site. No new
tables; no new public pages.

---

## 1. State of the source-of-truth tables

| Table                          | Rows | Status                                  |
| ------------------------------ | ---: | --------------------------------------- |
| `commerce_prices`              |   25 | All known price slugs present + extras. |
| `commerce_booking_links`       |   16 | Ticket Tailor + 15 WhatsApp slugs.      |
| `commerce_schedule_slots`      |    4 | **THIN** — Mon Chiswick + Tue Ealing only. Missing: Pura Ladies blocks, Latin Friday recurring. |
| `commerce_schedule_exceptions` |    0 | Empty — no notices/cancellations recorded yet. |
| `commerce_venues`              |    2 | Chiswick + Ealing.                      |
| `commerce_services`            |    8 | Includes enquiry-only services.         |
| `commerce_offers`              |    1 | Near-empty (intentional).               |

The `<Price slug>` and `<BookingLink slug>` primitives **already exist** and
are used in many public pages. The remaining work is to (a) finish migrating
**raw** `<a href="…">` URLs and inline `£N` strings onto these primitives,
and (b) seed the missing rows.

---

## 2. Slug parity audit (`<Price slug=…>` references vs `commerce_prices` rows)

| Slug used in code                       | Exists in DB | Decision                                            |
| --------------------------------------- | :----------: | --------------------------------------------------- |
| `drop-in-class`                         | ✅ £10       | OK                                                  |
| `combined-class-social`                 | ✅ £15       | OK                                                  |
| `social-only`                           | ✅ £5        | OK                                                  |
| `chiswick-bundle-5/10`, `chiswick-membership` | ✅ £55/£99/£120 | OK                                            |
| `ealing-bundle-5/10`, `ealing-membership` | ✅ £42/£78/£85 | OK                                                |
| `bundle-5`, `bundle-10`                 | ✅ £42/£78   | OK (venue-agnostic alias)                           |
| `latin-friday-*` (×6)                   | ✅ all 6     | OK                                                  |
| `voucher-25/50/100/200`                 | ✅           | OK                                                  |
| `voucher-75`, `voucher-150`             | ✅           | OK                                                  |
| `private-lessons` (code)                | ❌ DB has `private-lesson` | **Fix**: rename DB row to `private-lessons` (plural) to match code & service slug. |
| `corporate`                             | ❌           | **Add**: enquiry-only row `corporate` → "Corporate sessions". |
| `wedding-dance`                         | ✅ enquiry-only | OK                                               |
| `tickettailor-puranights` (used as Price slug too?) | n/a | Investigate — this is a BookingLink slug. Likely a stale typo. |
| `the-george-iv-chiswick`, `the-drayton-court-ealing` | n/a | Likely venue slugs, not prices. Investigate Prices.tsx usage. |

Action: 2 DB fixes (rename `private-lesson` → `private-lessons`; add
`corporate` enquiry-only row). Investigate 3 suspect Price refs.

---

## 3. Hard-coded values that must be migrated

### 3.1 Ticket Tailor URL (28 raw occurrences)

```
src/components/Header.tsx                 (2)
src/components/NeighbourhoodPage.tsx      (2)
src/components/BundleCalculator.tsx       (1)
src/pages/PuraNights.tsx                  (5)
src/pages/Community.tsx                   (2)
src/pages/Events.tsx                      (2)
src/pages/Gallery.tsx                     (already uses BookingLink — 2 raw remain)
src/pages/BachataClassesWestLondon.tsx    (2)
src/pages/BachataClassesEaling.tsx        (2)
src/pages/BachataClassesSouthWestLondon.tsx (2)
src/pages/PuraLadies.tsx                  (1)
src/pages/NotFound.tsx                    (1)
src/pages/blog/WhatToWearSalsaBachata.tsx (1)
src/pages/learn/SalsaVsBachataPillar.tsx  (2)
src/pages/venue/TheGeorgeIVChiswick.tsx   (3 — 1 const + 2 BookingLink uses ✅)
src/pages/venue/TheDraytonCourtEaling.tsx (3 — 1 const + 2 BookingLink uses ✅)
```
**Action:** replace every raw `<a href="https://www.tickettailor.com/events/puranights">`
with `<BookingLink slug="tickettailor-puranights" …>`. Remove the per-file
`const BOOKING_URL` constants. Keeps fallback `href` (already SSR-safe) but
makes booking pause-able via admin.

### 3.2 WhatsApp phone (`+447449482343`) — 11 inline files

```
src/components/Header.tsx
src/components/VoucherEnquiryForm.tsx
src/pages/Contact.tsx
src/pages/PrivacyPolicy.tsx
src/pages/PartnerWithPuraNights.tsx
src/pages/Locations.tsx
src/pages/CorporateDanceClassesLondon.tsx
src/pages/LatinDanceClassesLondon.tsx
src/pages/SalsaClassesEaling.tsx
src/pages/SalsaClassesChiswick.tsx
src/pages/venue/TheGeorgeIVChiswick.tsx
src/pages/venue/TheDraytonCourtEaling.tsx
```

`src/lib/whatsapp.ts` already exports `WA_PHONE`. Action: replace inline
literal strings with the constant. Also ensure `site_settings.phone` mirrors
it (single source for schema/JSON-LD).

### 3.3 Inline `£N` literals that should use `<Price>`

| File | Line | Replace with |
| ---- | ---- | ------------ |
| `pages/venue/TheGeorgeIVChiswick.tsx:20` | "£10 / £15" in FAQ answer | `<Price slug="drop-in-class"/>` / `<Price slug="combined-class-social"/>` |
| `pages/venue/TheDraytonCourtEaling.tsx:232` | "Early bird tickets from £15" | `<Price slug="latin-friday-early-bird-combined"/>` |
| `components/NeighbourhoodPage.tsx:159` | "From £10 / class" | `<Price slug="drop-in-class"/>` |
| `pages/SalsaClassesSouthWestLondon.tsx:144` | FAQ answer w/ £15/£10/£5 | three `<Price>` |
| `pages/SalsaClassesRichmond.tsx:22,77,122` | "£10" | `<Price slug="drop-in-class"/>` |
| `pages/GiftVouchers.tsx:103,115,118,167,202,260` | £25/£50/£100/£200 | `<Price>` for each voucher slug |
| `pages/PuraNights.tsx:39,66,228` | meta + hero + FAQ | Server-rendered fallback is fine in SEO meta; replace **in-body** only. |
| `pages/Prices.tsx:33,76` | SEO description + chooser label | Leave SEO meta as-is (rendered at build); replace chooser text with `<Price>`. |
| `components/SeoHead.tsx:55` | `priceRange: "£5–£120"` | **Compute** from `MIN(amount_pence)`/`MAX(amount_pence)` of active prices. Build-time helper or runtime. |

### 3.4 Hard-coded times / venue strings

| File | Hard-coded | Replace with |
| ---- | ---------- | ------------ |
| `pages/PuraNights.tsx:66` | "7:00pm Beginners · 8:00pm Improvers" | `useSchedule()` consumer |
| `pages/Schedule.tsx` | static day grid | Already partially wired — verify it reads `commerce_schedule_slots`. |
| `components/TonightsClassBanner.tsx` (if present) | "Tonight in Chiswick…" | Same as above. |
| Venue address blocks (`venue/*.tsx`) | full postal address | Read from `commerce_venues` row. |

### 3.5 Schedule data gaps (must be **seeded**, not invented)

`commerce_schedule_slots` currently only holds the 4 weekly slots. Missing,
per current public pages (require **owner confirmation** of exact times):

- Pura Ladies rehearsal blocks
- Latin Friday recurring event (or treat as `events` table instead of weekly slot)
- Any midweek socials beyond the standard timetable

**Decision:** I will not invent times. After this map is approved, I'll ask
you to confirm the Pura Ladies/Latin Friday recurrences and add them as a
data-only insert (no schema change).

---

## 4. Migration order (one PR per step, each independently shippable)

1. **DB hygiene (insert/update only, no schema change)**
   - Rename `private-lesson` → `private-lessons`.
   - Insert `corporate` enquiry-only row.
   - Insert any genuinely missing prices (none expected today).
2. **BookingLink wave** — replace raw Ticket Tailor `<a>` with
   `<BookingLink slug="tickettailor-puranights">` across the 11 files listed.
   Remove per-file `BOOKING_URL` constants. Public surface unchanged; admin
   pause becomes effective.
3. **Phone wave** — swap inline `+447449482343` for `WA_PHONE` import.
4. **Price-literal wave** — swap remaining inline `£N` for `<Price>`.
5. **Schedule wave** — verify `Schedule.tsx`, venue pages, Tonight banner
   all read from `commerce_schedule_slots`; remove any leftover static array.
6. **Schedule seed** — owner-confirmed insert of missing recurring slots.
7. **`SeoHead.priceRange`** — compute from DB (helper in `src/lib/commerce`).
8. **Tests** — `scripts/commerce-slug-lint.ts` already exists; extend it to
   fail the build on `tickettailor.com/events/puranights` outside `<BookingLink>`
   and on `+447449482343` outside `lib/whatsapp.ts`.

Stop-gate between steps 2 and 3: visual diff + `bun run build`.

---

## 5. Rollback

Every step is non-destructive:
- DB edits are inserts/updates with reversible SQL (kept in this doc).
- Code waves keep the existing fallback `href`/`fallback` props so a
  broken `useBookingLink()`/`usePrice()` hook still renders the same string.

If a wave needs to be reverted, revert the commit; data writes during the
wave are limited to the two DB-hygiene fixes in step 1.

---

## 6. What I will NOT change (preservation list)

- Public URLs (no slug renames on any route).
- SEO `<title>` / meta descriptions where the £ value is part of the
  optimised string — those stay literal until owner approves a templated
  alternative.
- Loyalty wording: "Attend 8 eligible sessions and receive the 9th eligible
  session free." Verbatim, everywhere.
- Wedding Dance and Private Lessons remain enquiry-only.
- Latin Friday remains weekly with `event-ticket` pricing slugs — no
  `Event` schema on recurring weekly classes.

---

## 7. Items requiring owner confirmation

- [ ] Approve DB rename `private-lesson` → `private-lessons`.
- [ ] Confirm Pura Ladies rehearsal day(s) and times.
- [ ] Confirm Latin Friday recurrence (which Friday(s) of the month).
- [ ] Confirm Chiswick + Ealing FAQ price answers stay £10 / £15 / £5.
- [ ] Confirm `priceRange` for JSON-LD should be computed (`£5–£120` today).

Reply with any deltas; otherwise I'll proceed to step 1 (DB hygiene) on the
next turn.
