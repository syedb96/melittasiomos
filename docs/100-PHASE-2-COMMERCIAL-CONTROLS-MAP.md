# 100/100 — Phase 2 Commercial Controls Implementation Map

This is the **read-only audit** that becomes the spec for Phase 2.
Nothing is migrated yet — extracting these values without a plan would
break the public site.

## Proposed admin modules (planned in registry)

| Module | Route (planned) | Backing table (proposed) | Public-critical |
| ------ | --------------- | ------------------------ | --------------- |
| Prices | `/admin/commerce/prices` | `commerce_prices` | yes |
| Offers | `/admin/commerce/offers` | `commerce_offers` | yes |
| Schedule | `/admin/commerce/schedule` | `commerce_schedule_slots` + `commerce_schedule_exceptions` | yes |
| Venues | `/admin/commerce/venues` | `commerce_venues` | yes |
| Booking Links | `/admin/commerce/booking-links` | `commerce_booking_links` | yes |

All tables: RLS enabled, `SELECT` to `anon` (public-readable), full CRUD to
`authenticated` admins via `has_role(auth.uid(), 'admin')`. `service_role`
`ALL` for edge functions. Updated_at trigger.

## Hard-coded value inventory (from `rg` audit)

### Prices (`£` literals)

Files containing literal price strings — these must read from
`commerce_prices` after Phase 2:

```
src/lib/whatsapp.ts
src/data/testimonials.ts
src/data/authority-posts.ts
src/data/site-blueprint.ts
src/data/ab-experiments.ts
src/components/BlogSidebarCTA.tsx
src/components/BlogMoneyCTA.tsx
src/components/ExitIntentPopup.tsx
src/components/MembershipPathwayBlock.tsx
src/components/NeighbourhoodPage.tsx
src/pages/GiftVouchers.tsx
src/pages/PuraNights.tsx
src/pages/FAQ.tsx
src/pages/FirstClassGuide.tsx
src/pages/Events.tsx
src/pages/Gallery.tsx
src/pages/CorporateDanceClassesLondon.tsx
src/pages/venue/TheGeorgeIVChiswick.tsx
src/pages/venue/TheDraytonCourtEaling.tsx
src/pages/SalsaClassesRichmond.tsx
src/pages/DanceClassesWestLondon.tsx
src/pages/DanceClassesHounslow.tsx
src/pages/DanceClassesEaling.tsx
src/pages/DanceClassesChiswick.tsx
src/pages/BachataClassesChiswick.tsx
```

Required `commerce_prices` shape:

```
id uuid pk, name text, description text, kind enum
  ('drop-in' | 'class-only' | 'social-only' | 'combined' | 'student' |
   'bundle-5' | 'bundle-10' | 'event-ticket' | 'voucher' | 'online-coaching' |
   'merch' | 'enquiry-only'),
amount_pence integer, currency text default 'GBP',
venue_id uuid null, service_slug text null,
previous_amount_pence integer null,  -- only for genuine markdowns
is_active boolean, starts_at timestamptz null, ends_at timestamptz null,
cta_label text, booking_link_id uuid null,
terms text, sort_order integer, is_featured boolean,
created_at, updated_at
```

Migration risk: **high** — wrong values would mislead customers. Plan: ship
table empty, build admin editor, seed by hand from documented current prices,
build a `<Price priceId="..."/>` component, replace literals file-by-file,
QA each page visually, only then remove the literals.

### Schedule (weekday literals)

Hard-coded class days in:

```
src/components/EmailCaptureGate.tsx
src/components/BlogMoneyCTA.tsx
src/components/ClassMatchBlock.tsx
src/components/BundleCalculator.tsx
src/pages/GiftVouchers.tsx
src/pages/Contact.tsx
src/pages/Community.tsx
src/pages/BachataClassesWestLondon.tsx
src/pages/BachataClassesChiswick.tsx
src/pages/BachataClassesEaling.tsx
src/pages/BachataClassesLondon.tsx
src/pages/BachataClassesSouthWestLondon.tsx
src/pages/PuraNights.tsx
src/pages/AllPagesMaster.tsx
src/pages/Gallery.tsx
```

`commerce_schedule_slots`: venue, weekday (0–6), start_time, end_time,
class_style, level, instructor_id, booking_link_id, is_active.

`commerce_schedule_exceptions`: date, slot_id, exception_type
(cancelled / replacement_venue / time_change / instructor_sub / holiday),
replacement_venue_id, new_start, new_end, public_notice.

### Venues (literal names + addresses)

```
src/data/testimonials.ts
src/data/events.ts
src/data/authority-posts.ts
src/data/site-blueprint.ts
src/lib/whatsapp.ts
src/components/LocalTrustBlock.tsx
src/components/TonightBanner.tsx
src/pages/venue/TheGeorgeIVChiswick.tsx
src/pages/venue/TheDraytonCourtEaling.tsx
src/pages/Bookings.tsx
src/pages/Community.tsx
src/pages/Gallery.tsx
src/pages/FreeTaster.tsx
src/pages/FirstClassGuide.tsx
src/pages/Blog.tsx
```

`commerce_venues`: slug, name, address_line_1, address_line_2, postcode,
map_url, directions, transport_html, parking_html, accessibility_html,
hero_image_url, gallery_ids uuid[], faqs jsonb, active, seo_title,
seo_description.

### Booking links

Ticket Tailor URLs and WhatsApp deeplinks are hard-coded in ~20 files
(see `rg` output above). `commerce_booking_links`: id, kind
('ticket_tailor' | 'whatsapp' | 'email' | 'enquiry_form' | 'external'),
label, url, prefilled_message text null, owner_email null, usage_notes.

Critical: build "where is this used" lookup before allowing global edits.

### Offers

Currently inferred from copy ("Attend 8 eligible sessions and receive the
9th eligible session free." — loyalty wording). Phase 2 introduces
`commerce_offers` so the loyalty rule is editable but defaults to that exact
wording (memory rule respected).

## Implementation order (Phase 2)

1. **Booking Links first** — smallest table, biggest reach. Replace
   hard-coded URLs with `<BookingLink id="..."/>`. Verifies the pattern works.
2. **Venues** — well-bounded; pulls in faqs and images already in `cms_media`.
3. **Prices** — high risk; build admin UI, seed, verify in staging, swap
   files in small batches.
4. **Schedule** — depends on Venues. Public components like
   `ClassMatchBlock`, `TonightBanner`, `Schedule` page rewrite to consume
   schedule + exceptions.
5. **Offers** — last. Depends on Prices for amount-off semantics.

## Rules locked in for Phase 2 (memory)

- Loyalty wording remains literal: "Attend 8 eligible sessions and receive
  the 9th eligible session free."
- Wedding & private lesson pricing stays enquiry-only unless explicitly
  toggled in admin.
- No fake "was £X / now £Y" discounts — `previous_amount_pence` may only be
  populated for genuine markdowns.
- No new payment provider added.
- Public URLs preserved.
