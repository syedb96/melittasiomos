# 62 — Proof & Reviews Conversion Pass

Sprint: Proof + Voucher Conversion (5-credit pass).
Date: 2026-05-23.

## Where review text lives

- `src/data/testimonials.ts` — single source of truth for student stories.
  - Fields: `name`, `label`, `platform` ("google" | "personal"), `quote`,
    `category` (beginner | group | wedding | private | pura-ladies | online | community).
  - `platform: "google"` = verified public Google review (badge: "Google ⭐").
  - `platform: "personal"` = first-party student story (badge: "Student Story").
- `src/components/TestimonialsCarousel.tsx` — homepage carousel reading the same file.
- `src/pages/Testimonials.tsx` — full proof hub with category chips + FAQ.

## What needs replacing with real Google review text

Replace the `platform: "personal"` quotes that are intended to read as Google
reviews with the verified review text once Melitta confirms each one is live
on Google Business Profile. Tag those records with `platform: "google"` to
flip the badge automatically. Do not invent surnames or dates.

Currently 5 of 15 entries are tagged "google". Targets to verify and migrate:

- Sarah M. (Beginner — Chiswick)
- Marcus W. (Beginner — Chiswick)
- Aisha T. (Pura Ladies)
- Daniel F. (Improver — Chiswick Mondays)

## Schema notes

- Page-level `@graph` is emitted via `SeoHead` (`/testimonials`,
  `/gift-vouchers`, etc.). Carousel emits its own `ItemList` of `Review`
  nodes under id `schema-testimonials-carousel`.
- Every Review has:
  - `author`: Person, display name only (first name + initial — no surnames invented).
  - `reviewRating`: 5-star (since all current entries are 5-star).
  - `itemReviewed`: DanceSchool — Pura Nights — Melitta Siomos Dance Academy.
  - `publisher`: Organization (Google) — only when `platform === "google"`.
- No fake review dates. No invented platforms. No dual-emission of the same
  Review on the same page.

## Adding a real Google Reviews embed in Wix

Lovable does not emit a Google Reviews live widget — only structured proof.
For a live embed in Wix:

1. Wix Editor → Add (`+`) → Reviews → "Google Reviews by Common Ninja"
   (or Elfsight Google Reviews).
2. Connect Google Business Profile: `Pura Nights — Melitta Siomos Dance Academy`.
3. Drop the widget on `/testimonials` ABOVE the category chips, and on the
   homepage REPLACING the `TestimonialsCarousel` strip if desired.
4. Keep the existing custom story cards as a secondary section so the proof
   is split: live Google reviews + curated wedding/Pura Ladies stories.
5. Do NOT remove the FAQPage / ItemList JSON-LD — Wix Custom Code keeps
   them; the embed adds visual reviews, the schema feeds AI extraction.

## WhatsApp prefill logic

- Centralised in `src/lib/whatsapp.ts` (`WA.*` map).
- Each preset references the page/intent; Melitta receives context-rich
  messages instead of "Hi" pings.
- `trackWaClick(context, meta?)` pushes to `window.dataLayer` (or
  `window.trackCta` if available) for GA4/Wix Analytics conversion tracking.
- See `docs/61-WIX-ENQUIRY-ROUTING-MAP.md` for full subject → CRM mapping.

## Do NOT fake reviews

- Never auto-generate quotes. Never invent surnames, dates, or platforms.
- Never emit `publisher: Google` for first-party stories.
- Never duplicate a Review across multiple `@graph` blocks on the same URL.
- Never claim aggregate Google rating counts that exceed the live profile.

## Launch checklist

- [ ] Replace all "personal" entries earmarked for Google migration.
- [ ] Validate `/testimonials` JSON-LD in Rich Results Test.
- [ ] Validate `/` homepage carousel JSON-LD (no duplicates).
- [ ] Confirm WhatsApp prefills land in WhatsApp Web with full text.
- [ ] Add Wix Google Reviews embed once GBP is verified.
- [ ] Confirm 5.0 / 47+ ratings in `SeoHead.tsx` global schema match GBP.
