# 76 — Above-the-Fold Trust Pass

Sprint: 2026-05-30. Audit of trust/proof presence in the first two
sections of every commercial page.

## Audit table

| Page | Early trust before | Action | Component used |
| --- | --- | --- | --- |
| `/` | Hero + TrustTicker + countdown + carousel later | ✅ existing TrustTicker covers it | n/a |
| `/pura-nights` | TrustTicker + AnswerBox + RealProofSlot | ✅ adequate | n/a |
| `/start-here` | AnswerBox + ProofBlock | ✅ adequate | n/a |
| `/prices` | TrustTicker (global) + price grid | ✅ adequate | n/a |
| `/wedding-dance` | Hero + later ProofBlock | ✅ kept — wedding form sits high enough | n/a |
| `/private-lessons` | Hero + AnswerBox | ✅ adequate (AnswerBox + WhatsApp) | n/a |
| `/corporate-dance-classes-london` | Hero only, proof was deep | ⚠️ added compact proof | `ProofNudge` |
| `/private-group-dance-parties-london` | Hero only, proof was deep | ⚠️ added compact proof | `ProofNudge` |
| `/pura-ladies` | Hero + Pura Ladies story | ✅ adequate | n/a |
| `/gift-vouchers` | Hero + voucher cards, no early proof | ⚠️ added compact proof | `ProofNudge` |

## ProofNudge component

`src/components/ProofNudge.tsx` — single-row strip with one short quote,
one trust cue (no partner needed / reply within 24h / all levels), a
link to `/testimonials`, and an "Ask Melitta" WhatsApp button keyed off
`src/lib/whatsapp.ts`. Used sparingly so it stays subtle, not spammy.

## Wix replication

Replicate as a Strip with text + 5-star icon row + 2 buttons. Each
instance keeps the quote/attribution from its page (no shared
component) and tags WhatsApp clicks with `cta_context = proof-nudge:*`.
