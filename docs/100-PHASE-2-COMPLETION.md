# Phase 2 — Commercial Controls: Completion Report

Status: **foundation seeded, swap pattern proven, remaining swaps queued**.

## What shipped this delivery

### 1. Database seed (canonical baseline)
All five `commerce_*` tables were empty. Seeded with values that mirror the
literals currently on the public site so no displayed value changes:

- `commerce_venues` — 2 rows (The George IV Chiswick W4 2DR, The Drayton Court Ealing W13 8PH).
- `commerce_booking_links` — 15 WhatsApp deeplinks covering every preset in `src/lib/whatsapp.ts` (`wa-general`, `wa-schedule-mon-chiswick`, `wa-schedule-tue-ealing`, `wa-prices-enquiry`, `wa-prices-private`, `wa-prices-wedding`, `wa-events-latin-friday`, `wa-events-group`, `wa-corporate`, `wa-group-party`, `wa-pura-ladies`, `wa-online`, `wa-membership`, `wa-loyalty`, `wa-schedule-general`). Phone: `+447449482343`.
- `commerce_prices` — 17 rows: drop-in £10, combined £15, social £5, bundle-5 £42, bundle-10 £78, six Latin Friday tiers (early-bird/standard/door × combined/party-only), voucher £25/£50/£100/£200, private + wedding marked `enquiry-only` (amount NULL).
- `commerce_schedule_slots` — 4 rows: Mon Chiswick Beginners (19:00) + Improvers (20:00); Tue Ealing Beginners (19:00) + Improvers (20:00). Social 21:00–23:30 at both.
- `commerce_offers` — 1 row: `loyalty-8-plus-1` with the verbatim memory-locked wording.

### 2. Proof-of-concept swap
`src/components/MembershipPathwayBlock.tsx` now reads drop-in, 5-class and 10-class prices through `<Price slug="…" fallback="…"/>`. Fallback strings preserve the previous literal so SSR and pre-hydration views are unchanged.

This validates the pattern end-to-end (table → primitive → component → admin editable in `/admin/commerce/prices`).

## Queued swaps (Phase 2 cleanup, deferred for visual review)

The remaining 24 files identified in `docs/100-PHASE-2-COMMERCIAL-CONTROLS-MAP.md` should be migrated in small batches with screenshot review per batch. Recommended order:

| Batch | Files | Risk |
| ----- | ----- | ---- |
| 2a | `BlogSidebarCTA`, `BlogMoneyCTA`, `ExitIntentPopup` | low — single-line price mentions |
| 2b | `pages/GiftVouchers` (4 voucher tiers) | medium — buyer-facing |
| 2c | `pages/PuraNights`, `pages/FAQ` | medium — main pricing surfaces |
| 2d | All neighbourhood `Dance/Bachata/Salsa Classes…` pages | medium — repeated copy |
| 2e | `venue/*` pages + `lib/whatsapp.ts` → look up `commerce_booking_links` | medium — link integrity |
| 2f | `ClassMatchBlock`, `TonightBanner`, `BundleCalculator` — schedule-driven | high — must use `commerce_schedule_slots` + exceptions |

Each batch should:
1. Replace literal with `<Price slug>` / `<BookingLink slug>` / `useVenue` / a new schedule hook.
2. Keep `fallback` set to the previous literal.
3. Verify visually in preview at 1143×773 and 390×844.
4. Confirm no regressions in `bun scripts/schema-validate.ts` and `bun run build`.

## Rules locked in
- No fake markdowns: trigger `validate_commerce_price` rejects `previous_amount_pence ≤ amount_pence`.
- Loyalty wording is the database row of record; the literal string still appears in copy as the source of truth.
- Wedding & private = enquiry-only forever unless admin flips `kind`.
- `lib/whatsapp.ts` remains the canonical map for now; once batch 2e lands it becomes a thin wrapper over `commerce_booking_links`.
