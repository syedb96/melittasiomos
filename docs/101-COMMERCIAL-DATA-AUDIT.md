# Pura Nights — Commercial Data Audit (Track C)

Date: 2026-06-21
Author: Operational Hardening Sprint
Status: **Schema and admin UIs already shipped — this is an inventory, not a migration plan.**

---

## TL;DR

Every commercial domain the brief asked us to "build a central manager for" already exists end to end:

| Domain | Table | Rows | Admin route | Public components reading from it |
|---|---|---:|---|---|
| Prices | `commerce_prices` | 25 | `/admin/commerce/prices` (live) | `<Price slug="…">` primitive on `/pura-nights`, `MembershipPathwayBlock`, `BundleCalculator` |
| Offers | `commerce_offers` | 1 | `/admin/commerce/offers` (live) | Offer primitives where featured |
| Venues | `commerce_venues` | 2 | `/admin/commerce/venues` (live) | (Hardcoded venue pages — see "Outstanding swaps" below) |
| Weekly schedule | `commerce_schedule_slots` | 4 | `/admin/commerce/schedule` (live) | `/schedule` page |
| Schedule exceptions | `commerce_schedule_exceptions` | 0 | `/admin/commerce/schedule` (live) | Tonight's-class banner |
| Booking links | `commerce_booking_links` | 15 | `/admin/commerce/booking-links` (live) | All Ticket Tailor + WhatsApp CTAs |

All admin UIs are registered in `src/admin/moduleRegistry.ts` under the **Commerce** section. RLS is uniform: `Admins manage *` (ALL, authenticated, `is_admin(auth.uid())`) + `Public can read active *` (SELECT, public). Validation triggers prevent fake discounts (`previous_amount_pence > amount_pence`) and inverted date windows.

Therefore Tracks D, E, F, G of the brief are **already complete**. No new tables or admin pages were created in this audit. The remaining work is **public-page consumption** — swapping the last hardcoded literals to the `<Price>` / `<BookingLink>` primitives.

---

## Hardcoded values still bypassing the registry

These public components still embed literal prices or URLs that should be sourced from the commerce tables. Values were verified to currently match the database, so swapping is **non-functional refactor**, not a price change.

### Venue pages
| File | Lines | Hardcoded value | Canonical source |
|---|---|---|---|
| `src/pages/venue/TheGeorgeIVChiswick.tsx` | 19, 170-172, 186 | `£15 / £10 / £5` matrix, "5-class £55 · 10-class £99 · monthly £120" | `commerce_prices` slugs `combined-class-social`, `drop-in-class`, `social-only`, `chiswick-bundle-5`, `chiswick-bundle-10`, `chiswick-membership` |
| `src/pages/venue/TheDraytonCourtEaling.tsx` | 171-173, 187 | `£15 / £10 / £5`, "5-class £42 · 10-class £78 · monthly £85" | `ealing-*` slugs in `commerce_prices` |
| Both venue pages | hero + footer CTAs | `https://www.tickettailor.com/events/puranights` literal | `commerce_booking_links` key `tickettailor-puranights` |

### Sitewide CTAs
| File | Lines | Hardcoded value |
|---|---|---|
| `src/components/Header.tsx` | 31, 220, 254 | Ticket Tailor URL literal × 3 |
| `src/pages/Gallery.tsx` | 119, 240, 242 | Ticket Tailor literal + "From £10 a class" |
| `src/components/TestimonialsCarousel.tsx` | 172 | Ticket Tailor literal |
| `src/components/SeoHead.tsx` | 55 | `priceRange: "£5–£120"` (LocalBusiness schema) |

### Already-migrated reference (DO reuse this pattern)

```tsx
// src/pages/PuraNights.tsx — correct pattern
<Price slug="combined-class-social" fallback="£15" showPrevious={false} />
<Price slug="drop-in-class" fallback="£10" showPrevious={false} />
<Price slug="latin-friday-early-bird-combined" fallback="£15" showPrevious={false} />
```

The `<Price>` primitive lives in `src/components/commerce/CommercePrimitives.tsx` and accepts a `fallback` for SSR-safe rendering before the DB query resolves.

---

## Risk register for the remaining swap

| Risk | Mitigation |
|---|---|
| Price flash / layout shift before DB resolves | `<Price>` already accepts a `fallback` that matches the current literal — render is stable |
| Wrong slug used → "£—" empty render | Snapshot test that every slug referenced in the codebase exists in `commerce_prices` (add to QA scripts) |
| Removing duplicate copy breaks SEO content match | Keep surrounding copy; only swap the numeric span |
| Anon read of inactive prices | RLS already filters `is_active = true` at the database |

---

## Confirmed reusable infrastructure (do NOT rebuild)

- `commerce_prices`, `commerce_offers`, `commerce_venues`, `commerce_schedule_slots`, `commerce_schedule_exceptions`, `commerce_booking_links` (tables, triggers, RLS, public-read policies)
- `src/components/commerce/CommercePrimitives.tsx` — `<Price>`, `formatPence`, related primitives
- `src/components/admin/CommerceCrud.tsx` — generic CRUD wrapping all 5 commerce admin pages
- `src/admin/moduleRegistry.ts` — Commerce section already populated and routed
- `src/pages/admin/commerce/*.tsx` — five CRUD pages

## Decisions

1. **No new tables this sprint.** Schema is canonical.
2. **No mass public swap this sprint.** Will be done in a dedicated "public commerce consumption" sprint with a slug-existence linter to prevent typos.
3. **Module registry notes updated** to reflect that public swap remains outstanding on venue pages, Header, Gallery and TestimonialsCarousel.
4. **Security findings** for Realtime channel authorization and the public WhatsApp number have been acknowledged in `security-memory.md` with rationale (false positive + intentional respectively).

---

## Sprint follow-up — 2026-06-21 (public consumption swap)

Closed the outstanding swaps identified above.

| File | Was | Now |
|---|---|---|
| `src/pages/venue/TheGeorgeIVChiswick.tsx` | Literal `£15 / £10 / £5` cards, bundle line, two Ticket Tailor `<a>` CTAs | `<Price slug="combined-class-social\|drop-in-class\|social-only">`, `<Price slug="chiswick-bundle-5\|chiswick-bundle-10\|chiswick-membership">`, `<BookingLink slug="tickettailor-puranights">` |
| `src/pages/venue/TheDraytonCourtEaling.tsx` | Same literals for Ealing pricing + bundles + Ticket Tailor `<a>` | `<Price>` (Ealing slugs) + `<BookingLink slug="tickettailor-puranights">` |
| `src/components/Header.tsx` | Desktop + mobile Ticket Tailor `<a>` buttons | `<BookingLink slug="tickettailor-puranights">` × 2 (nav dropdown entry intentionally left as static config) |
| `src/pages/Gallery.tsx` | "From £10 a class" literal + two Ticket Tailor `<a>` buttons | `<Price slug="drop-in-class">` + `<BookingLink slug="tickettailor-puranights">` × 2 |
| `src/components/TestimonialsCarousel.tsx` | Footer Ticket Tailor `<a>` | `<BookingLink slug="tickettailor-puranights">` |

New canonical booking link added to `commerce_booking_links`:
- `tickettailor-puranights` (kind `ticket_tailor`) — the single source of truth for every public Book-Now CTA.

Every refactored call site passes `fallbackHref="https://www.tickettailor.com/events/puranights"` so first-paint behaviour is identical to the prior hardcoded link. The DB-resolved URL takes over within the same tick.

### Slug-existence linter

New script: `scripts/commerce-slug-lint.ts` (run with `bun scripts/commerce-slug-lint.ts`).

- Scans every `.ts/.tsx/.js/.jsx/.mdx` file under `src/` for `<Price slug="…">` and `<BookingLink slug="…">` occurrences.
- Queries `commerce_prices` and `commerce_booking_links` and asserts every referenced slug exists with `is_active = true`.
- Exits non-zero on any miss — wire into CI alongside the existing alt-text, SEO and schema linters.

### Module registry

`src/admin/moduleRegistry.ts` Commerce section: Prices, Offers, Schedule, Booking Links → **live**. Venues remains **partial** (admin live, but venue-page address/transport/accessibility blocks are still hardcoded — separate venue-content swap planned, intentionally out of scope this sprint).

### Out of scope (logged for a future sprint)

- `SeoHead.tsx` line 55 — `priceRange: "£5–£120"` JSON-LD literal. Will be derived from `commerce_prices` min/max once an SSR-safe pattern is in place.
- Venue address, transport, parking, accessibility copy on `/venue/*` pages — content lives in `commerce_venues` rows but the page bodies still hardcode the equivalent prose. A `<VenueDetails slug="…">` primitive would close this loop.
- Header navigation `dropdown.path` for "Book a Class" remains a literal URL because the menu is a static config consumed at module load; switching to async resolution would over-engineer a stable single reference. Acceptable.

