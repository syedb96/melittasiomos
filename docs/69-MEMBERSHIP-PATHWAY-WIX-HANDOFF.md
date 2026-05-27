# 69 — Membership Pathway → Wix Handoff

## What this sprint added

- `MembershipPathwayBlock` — 4-tier card grid (Drop-in / 5-class / 10-class / Monthly)
  with the 5-step journey strip and triple CTA (Prices / Pura Nights / WhatsApp).
- `WhoThisIsForBlock` — persona grid, used on Pura Nights, Start Here and all
  service pages.

## Wix replication

| React block | Wix element | CMS collection (fields) |
|---|---|---|
| MembershipPathwayBlock | Repeater (4 cards) + 5-cell Strip above | `MembershipTier` (key, label, price, bestFor, note, highlight) |
| Journey strip | Inline 5-cell Strip with text | static or `JourneyStep` collection (order, label) |
| WhoThisIsForBlock | Repeater (2 cols) of persona cards | `AudiencePersona` (page, label, description) |
| CTA strip | Strip with 3 Button elements | hard-coded links |

## Form / CRM tag

- WhatsApp CTAs on these blocks use `context="<page>_pathway"` so each
  conversion is tagged in `cta_events` (existing Supabase table).

## Outstanding human-only blockers

- Need real photos for `WhoThisIsForBlock` cards if we choose to add a hero
  image variant.
- Monthly Unlimited pricing currently reads "Ask Melitta" — once the price is
  finalised, update `TIERS` in `MembershipPathwayBlock.tsx` and the Wix CMS
  collection in parallel.
