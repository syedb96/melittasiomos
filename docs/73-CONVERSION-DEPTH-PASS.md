# 73 — Conversion Depth Pass

Five-part conversion + AI/GEO upgrade.

## 1. AnswerBox expansion
Added 40–90 word AnswerBox blocks (with bullets + intent CTA) to:
- `/wedding-dance` — "How many wedding dance lessons do most couples need?"
- `/gift-vouchers` — "What is the best dance class gift voucher in London?"
- `/beginners` — "Is salsa or bachata easier for a complete beginner?"
- `/schedule` — "What is the weekly Pura Nights class schedule?"
- `/events` — "What Latin dance events are on in West London this month?"
- `/pura-nights` — "Who is Pura Nights for and how do I join?"

Wix replication: each block becomes a Strip with H3 + paragraph + bulleted
Repeater + a single CTA button (see existing `AnswerBox` WIX SECTION marker).

## 2. Footer money-page audit
`Footer.tsx` Services column now exposes every money/service route:
`online-academy`, `wedding-dance-lessons-london`, `wedding-dance-west-london`,
`private-dance-lessons-west-london`, `private-salsa-lessons-london`,
`ladies-styling-london`, `bachata-performance-team-london`,
`pura-ladies-covent-garden`, `latin-night-out-west-london`, `proof-centre`,
`meet-the-team`, `community`, `refer`. Local area column already complete.

## 3. NextStepServiceGrid A/B test
`NextStepServiceGrid` now:
- Assigns a per-session variant (A = original, B = reversed) via
  `sessionStorage["pn_nss_variant_v1"]`.
- Reorders cards when variant = B.
- Tags each click via `trackCta(label, "nextstep_variant_{A|B}_pos_{n}")` —
  rows land in `cta_events` and can be split by `cta_type`.
- Renders `data-experiment` / `data-variant` attributes for GTM scraping.

Wix replication: use Wix A/B Test on the Repeater or Velo:
```js
const v = wixStorage.session.getItem('pn_nss_variant_v1')
  || (Math.random() < 0.5 ? 'A' : 'B');
wixStorage.session.setItem('pn_nss_variant_v1', v);
if (v === 'B') $w('#nextStepRepeater').data = $w('#nextStepRepeater').data.slice().reverse();
```

## 4. Covent Garden proof + near-me
`/salsa-bachata-classes-covent-garden` now renders, after the AnswerBox:
- `ReviewVelocityTicker` (12 new reviews, 5.0 avg, rotating snippets)
- `NearMeGrid` backed by the new `CENTRAL_FROM_CG` dataset in
  `src/data/near-me-areas.ts` — links Central London visitors to existing
  W4/W13/W6/W3/W11/W12/SW6/TW9 service pages with correct venue tagging
  (Chiswick · Ealing · Both).

## 5. Monthly Unlimited enquiry flow
New `MonthlyUnlimitedDialog` (`src/components/MonthlyUnlimitedDialog.tsx`):
- Lightbox-style modal launched from the Membership Pathway block.
- Fields: name, email, phone, preferred venue, frequency, ideal start,
  notes. Zod-validated.
- Posts to `public.enquiries` with subject
  "Monthly Unlimited — Pricing & Availability" and full structured message.
- Secondary "WhatsApp instead" button with the same structured prefill via
  `waLink()`.
- Tracks both submit and WhatsApp via `trackCta` / `trackWaClick`.

`MembershipPathwayBlock` now replaces the generic "Ask Melitta on WhatsApp"
button with "👑 Get Monthly Unlimited pricing" which opens the dialog.

### Wix replication
- Lightbox: form connected to `Enquiries` collection with hidden
  `subject = "Monthly Unlimited — Pricing & Availability"`.
- Secondary WhatsApp button: build the message in a Velo helper, then set
  `link.href = 'https://wa.me/447449482343?text=' + encodeURIComponent(msg)`.
