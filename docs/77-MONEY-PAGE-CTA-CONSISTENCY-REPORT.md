# 77 — Money Page CTA Consistency Report

Sprint: 2026-05-30. Verified with `bun run scripts/cta-smoke-test.ts`
and a manual sweep of every commercial route. CTA links to deprecated
routes (`/online-classes`) were already migrated to
`/online-salsa-bachata-coaching` in the previous sprint
(`docs/73-WHATSAPP-CTA-QUALITY-PASS.md`).

## Per-page CTA map (post-sprint)

| Page | Primary CTA | Secondary CTA | Final-page CTA |
| --- | --- | --- | --- |
| `/` | Book Your First Class → TicketTailor | Start Here | Book + Start Here |
| `/pura-nights` | Book Your First Class → TicketTailor | View Pricing | Final gold CTA strip |
| `/schedule` | Book on TicketTailor | WhatsApp Mon/Tue prefills | NextStepServiceGrid |
| `/prices` | Book → Linktree | WhatsApp `pricesEnquiry` | MonthlyUnlimitedDialog |
| `/start-here` | Book first class → Linktree | WhatsApp `startHere` | FirstClassLeadMagnet + RelatedPages |
| `/beginners` | Book → Linktree | WhatsApp | FirstClassLeadMagnet + RelatedPages |
| `/events` | Tickets via TicketTailor | WhatsApp event prefill | NextStepServiceGrid |
| `/wedding-dance` | Free consult enquiry | WhatsApp `weddingDance` | WeddingTiers + final CTA |
| `/private-lessons` | Enquiry form | WhatsApp `privateLessons` | NextStepServiceGrid |
| `/corporate-dance-classes-london` | EnquiryForm | WhatsApp `corporate` | ProofNudge + NextStepServiceGrid |
| `/private-group-dance-parties-london` | EnquiryForm | WhatsApp `groupParty` | ProofNudge + NextStepServiceGrid |
| `/pura-ladies` | Audition enquiry | WhatsApp `puraLadies` | NextStepServiceGrid |
| `/online-salsa-bachata-coaching` | Enquiry / waitlist | WhatsApp `online` | NextStepServiceGrid |
| `/gift-vouchers` | VoucherEnquiryForm | WhatsApp `voucher(amount)` | NextStepServiceGrid |
| `/partner-with-pura-nights` | EnquiryForm | WhatsApp `partner` | RelatedPages |
| `/first-class-guide` | Schedule + Book first class | WhatsApp `startHere` | FirstClassLeadMagnet + final CTA |

## Rules enforced

- No CTA points to `/online-classes` (301 to coaching).
- No CTA points to `/proof-centre` from commercial routes.
- All "Book" CTAs route to TicketTailor or `https://linktr.ee/pura.nights`.
- Every commercial page now has a lower-page final CTA (either a CTA
  strip or `FirstClassLeadMagnet`/`NextStepServiceGrid`).
- WhatsApp CTAs always use a prefill from `src/lib/whatsapp.ts` —
  no bare `wa.me` links remain in money pages.

## QA evidence

- CTA smoke test: `bun run scripts/cta-smoke-test.ts` — 22/22 pass.
- Manual click-through of the 16 money pages above on 1349px viewport
  confirmed no broken or vague CTAs.

## Remaining human blockers

- ⚠️ Sender domain verification still blocks transactional auto-replies.
- ⚠️ Lead magnet PDF asset still needs producing.
