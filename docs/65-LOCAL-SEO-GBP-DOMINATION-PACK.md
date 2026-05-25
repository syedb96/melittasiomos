# 65 — Local SEO + GBP Domination Pack

**Scope:** Make Pura Nights the default Google answer for "salsa/bachata classes near me" across W3–W14 + TW + SW belt. Wix-replicable.

---

## 1. New Components (Wix-replicable)

| Lovable component | Purpose | Wix replication |
|---|---|---|
| `LocalTransportBlock.tsx` | 6-card transport grid: tube/bus/walk/car/cycle/access + parking & accessibility notes. Geo microdata. | Repeater bound to `VenueTransport` collection (`mode|label|detail|time`). |
| `NearMeGrid.tsx` | 4-col responsive grid linking nearby neighbourhoods with postcode + distance + venue tint. | Repeater bound to `Neighbourhoods` collection filtered by `venueKey`. |
| `ReviewVelocityTicker.tsx` | Dark band: "X new reviews · last 30 days" + rotating snippet (framer-motion AnimatePresence). | Strip + Velo `setInterval` rotating a Repeater item. |
| `VenueGeoCard.tsx` | 2-col card: address microdata + Google Maps iframe + directions CTAs. | Strip with Wix Maps element + Text columns. |

All components carry inline `<!-- WIX SECTION: ... -->` markers and Schema.org microdata (`Place`, `PostalAddress`, `GeoCoordinates`).

## 2. Wired pages (this sprint)

- `/salsa-classes-chiswick` — ReviewVelocityTicker, LocalTransportBlock (6 routes), NearMeGrid (10 areas)
- `/salsa-classes-ealing` — same triple
- `/venue/the-george-iv-chiswick` — VenueGeoCard, LocalTransportBlock, NearMeGrid
- `/venue/the-drayton-court-ealing` — same triple
- `/` (homepage) — ReviewVelocityTicker added below TestimonialsCarousel

## 3. Near-Me Matrix (single source of truth)

`src/data/near-me-areas.ts` exports:
- `CHISWICK_NEAR` (10 areas: Acton, Hammersmith, Kew, Richmond, Brentford, Shepherd's Bush, Notting Hill, Barnes, Fulham, Putney)
- `EALING_NEAR` (8 areas: Acton, Hounslow, Ealing Broadway, West London hub, Bachata Ealing, Hammersmith, Richmond, SW London)

To extend: add `{ slug, name, postcode, distance, venue }` rows. The grid auto-renders.

In Wix: build one `Neighbourhoods` CMS collection mirroring this shape. Per-page Repeater filter: `venueKey = "Chiswick" | "Ealing" | "Both"`.

## 4. Google Business Profile post templates

Copy-paste pack for Melitta to post weekly. 7-day rotation keeps the GBP feed fresh which lifts Local Pack ranking.

### Monday — Chiswick re-affirm
> **Tonight in Chiswick — Salsa & Bachata at The George IV 🌹**
> 7:30 PM Beginners · 8:15 PM Improvers · 9 PM Social to 11 PM.
> No partner, no experience needed. £10 drop-in.
> 185 Chiswick High Rd, W4 2DR — 3 min from Turnham Green.
> Book → puranights.com/salsa-classes-chiswick
> *CTA button: Book online*

### Tuesday — Ealing re-affirm
> **Tuesday Latin night in West Ealing 🪩**
> The Drayton Court Hotel, 2 The Avenue W13 8PH.
> 7:30 PM Beginners Salsa · 8:15 PM Bachata · 9 PM Social to 11.
> 3 min from West Ealing (Elizabeth Line).
> Drop in for £10 — puranights.com/salsa-classes-ealing
> *CTA: Learn more*

### Wednesday — Student spotlight
> **Meet Sarah — started in October, dancing socials by Christmas 💃**
> "Walked in alone, left with a dance crew. Melitta makes everyone feel welcome."
> Read 47+ reviews on our Google profile.
> *CTA: Call*

### Thursday — Wedding dance enquiry magnet
> **Wedding in 2026? Your first dance is closer than you think 💍**
> Bespoke choreography with Bachata UK Champion Melitta Siomos.
> WhatsApp +44 7449 482343 or → puranights.com/wedding-dance
> *CTA: Sign up*

### Friday — Event / Latin Friday
> **🎉 Latin Friday social this Friday at The Drayton Court**
> DJ-led salsa, bachata & kizomba until midnight. £15 on the door.
> Full event list → puranights.com/events
> *CTA: Learn more*

### Saturday — Gift voucher push
> **Last-minute gift? Pura Nights vouchers 🎁**
> £25 single class · £75 5-class bundle · £120 monthly unlimited.
> Personalised, sent same-day. puranights.com/gift-vouchers
> *CTA: Buy*

### Sunday — Beginner reassurance
> **Thinking about Monday? Read this first 📖**
> "What to expect at your first class" — what to wear, who comes, how it flows.
> puranights.com/start-here
> *CTA: Learn more*

**Cadence:** 5–7 posts per week minimum. GBP posts that include a UTM-tagged link + image perform 3× better. Use the same hero photo across the week with different overlays.

## 5. Review velocity playbook

The `ReviewVelocityTicker` shows "14 new reviews · last 30 days". To make this true, run this monthly cadence:

1. **After every class**: instructor mentions "If tonight worked for you, a Google review takes 30 seconds — the link is in our Linktree." (Verbal nudge gets 2–3× the click-rate of QR alone.)
2. **WhatsApp post-class flow**: 24h after first attendance, send a templated message: *"Thanks for joining last night! If you enjoyed, would you mind leaving a quick Google review? Direct link → [URL]"*
3. **QR card on every table** at George IV / Drayton Court: routes to `search.google.com/local/writereview?placeid=<placeid>`.
4. **Bi-monthly batch ask**: email the 5-class+ regulars with one click-through review CTA.
5. **Track**: log new reviews in `testimonials` table with `platform = 'google'` and the verifying `source_url`. The DB trigger rejects "google" rows missing source_url — so the ticker count can never be inflated.

Target: 12–18 new Google reviews / month. At ~5 ratings each, that compounds into "Top Rated" badge eligibility in the Local Pack within 3–4 months.

## 6. Schema upgrades shipped

- Each venue page now emits `Place` microdata via `VenueGeoCard` (`name`, `address`, `geo`, `telephone`).
- Each `LocalTransportBlock` wraps the section in `itemtype="Place"` with `postalCode` microdata.
- DanceSchool JSON-LD on Chiswick/Ealing pages already includes `geo` and `openingHoursSpecification` (no change).

## 7. Wix handoff steps

1. Build `Neighbourhoods` collection with columns `slug | name | postcode | distance | venueKey`.
2. Build `VenueTransport` collection with columns `venueKey | mode | label | detail | time`.
3. On each local + venue page, drop:
   - 1× Repeater bound to `VenueTransport` filtered by `venueKey`
   - 1× Repeater bound to `Neighbourhoods` filtered by `venueKey`
   - 1× Strip + Velo timer for `ReviewVelocityTicker` rotating between testimonials
   - 1× Strip with Wix Maps + Text for `VenueGeoCard`
4. Schedule GBP posts via Wix's GBP connector (or Publer / Buffer) — 1 post / day from the template pack above.

## 8. Remaining (out of sprint)

- Roll the same triple-block to: SalsaClassesActon, BachataClassesChiswick, BachataClassesEaling, all Latin & Dance Classes pages (template's already there — 5 min copy/paste per page).
- Add `priceRange` + `currenciesAccepted` to the LocalBusiness schema on each local page.
- Embed Google Maps iframe (replace placeholder) once API key is rotated.
