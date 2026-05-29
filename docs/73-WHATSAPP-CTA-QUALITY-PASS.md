# 73 — WhatsApp CTA Quality Pass

_Sprint date: 2026-05-29 — Revenue Leak + Wix Migration Guardrail Pass_

## Goal
Eliminate generic `https://wa.me/447449482343` links (no prefill text) on
high-traffic CTAs so every WhatsApp tap arrives in Melitta's inbox with
context. Centralised helpers live in `src/lib/whatsapp.ts` (`WA.*`).

## Changes shipped this pass

| File | Before | After (prefill intent) |
|---|---|---|
| `src/components/Header.tsx` (desktop ghost) | bare `wa.me/447449482343` | "Hi Melitta, I'd like to ask a quick question about Pura Nights classes." |
| `src/components/Header.tsx` (mobile primary) | bare | same general enquiry prefill |
| `src/components/Footer.tsx` (gold pill) | bare | "Hi Melitta, I'd like to ask about Pura Nights classes." |
| `src/pages/FAQ.tsx` (CTA strip) | bare | "Hi Melitta, I have a quick question about Pura Nights classes." |
| `src/pages/venue/TheGeorgeIVChiswick.tsx` (final CTA) | bare | "Hi Melitta, I'm interested in the Monday Chiswick class at The George IV. Is it suitable for a complete beginner coming alone?" |
| `src/pages/venue/TheDraytonCourtEaling.tsx` (final CTA) | bare | "Hi Melitta, I'm interested in the Tuesday Ealing class at the Drayton Court. Is the beginner slot the best place to start?" |
| `src/pages/blog/HowToPracticeSalsaAtHome.tsx` | linked `/online-classes` (redirect-only, noindex) | now links `/online-salsa-bachata-coaching` |

## Existing prefills (already strong — kept as-is)

These are wired through `WA.*` helpers and have intent-rich prefills:
- `/schedule` — `WA.scheduleMonChiswick`, `WA.scheduleTueEaling`
- `/prices` — `WA.pricesEnquiry`
- `/pura-nights` — `WA.membership` + per-class helpers
- `/gift-vouchers` — `WA.voucher(amount)` per pack + custom
- `/wedding-dance` — `WA.weddingDance`
- `/private-lessons` — `WA.privateLessons`
- `/corporate-dance-classes-london` — `WA.corporate(date, group)`
- `/private-group-dance-parties-london` — `WA.groupParty(date, group)`
- `/pura-ladies` — `WA.puraLadies`
- `/online-salsa-bachata-coaching` — `WA.online(level, style)`
- `/partner-with-pura-nights` — `WA.partner(org)`
- Floating button (`WhatsAppButton.tsx`) — context-aware prefill per page

## Prefill style rules

Keep prefills short, polite, intent-rich and one sentence where possible:

1. Start with "Hi Melitta,".
2. Name the page/class/venue/voucher/event so Melitta has context.
3. Ask one specific question OR state one specific intent.
4. No emojis, no marketing language, no multi-line.
5. URL-encode with `encodeURIComponent` (already handled by `waLink`).

## Wix replication note

Each Wix button's link field becomes:

```
https://wa.me/447449482343?text={url-encoded message}
```

For dynamic prefills (voucher amount, corporate group size, event date) use
Velo to set `href` on click, mirroring the helper signature documented in
`docs/68-WHATSAPP-CONVERSION-COPY-MAP.md`.

## Remaining (intentional) bare wa.me links

These remain bare because the surrounding UI provides the context, or the
button is a tertiary "got a question?" nudge:

- `Footer.tsx` phone-number list item (acts as click-to-chat for the
  printed phone number, not a CTA).
- `BlogSidebarCTA.tsx`, `BlogMoneyCTA.tsx`, `ExitIntentPopup.tsx`,
  `FirstTimerCallout.tsx`, `NewHereStrip.tsx` — secondary fallback nudges
  where a prefill would feel pushy. Revisit after first 30 days of live
  data if WhatsApp open-rate is low.

## Human blocker
Email notification delivery still depends on a verified sender domain
(see `docs/08-FORMS-AND-CONVERSION-PLAN.md`). WhatsApp is the reliable
fallback channel today — these prefill improvements directly compensate.
