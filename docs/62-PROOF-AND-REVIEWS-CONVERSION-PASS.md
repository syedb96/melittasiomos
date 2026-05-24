# 62 — Proof & Reviews Conversion Pass

Sprint: Proof + Voucher Conversion (5-credit pass).
Date: 2026-05-24.

## Where review text lives

- `src/data/testimonials.ts` — static carousel source for the homepage.
- **`public.testimonials` (Supabase)** — admin-managed source of truth via
  `/admin/testimonials`. New `platform` column ('google' or 'personal').
  A DB trigger blocks `platform='google'` rows that don't carry a
  `source_url` — preventing fake `publisher: Google` schema metadata.
- `src/components/TestimonialsCarousel.tsx` — homepage carousel, conditional
  `publisher: Organization (Google)` only when `platform === "google"`.
- `src/pages/Testimonials.tsx` — full proof hub with category chips + FAQ,
  followed by the optional Wix Google Reviews widget slot.

## Admin workflow (anti-fake-review)

1. `/admin/testimonials` → Add or edit a testimonial.
2. Pick **Platform**:
   - **Personal — Student Story** → Badge: "Student Story". No
     `publisher: Google` emitted in JSON-LD. Source URL optional.
   - **Google — Verified** → Badge: "Google ⭐". `publisher: Google`
     emitted. **Source URL required** — paste the live Google Maps review
     permalink. Saving without one is rejected client- and DB-side.
3. Toggle Featured (homepage carousel) and Published.

The DB trigger `validate_testimonial_platform_trg` is the final guard:
even direct SQL inserts cannot fake a Google review.

## Schema QA

- `scripts/schema-validate.ts` — static source-tree scan. Runs in `prebuild`.
- `scripts/schema-qa-report.ts` — per-page QA. Validates the homepage
  `ItemList` + `/testimonials` schema graph for:
  - publisher:Google emitted unconditionally (error)
  - missing reviewRating / itemReviewed
  - ItemList without itemListElement
  Output: `docs/64-SCHEMA-QA-PER-PAGE-REPORT.md`. Runs in `prebuild` and
  fails CI when errors are detected.

## Wix Google Reviews embed

Lovable ships a `<WixReviewsEmbed>` placeholder on `/` and `/testimonials`.
It includes the heading, 5★ summary line, and CTAs ("Read all Google
reviews", "Leave a review"). Replace the inner block in Wix Editor:

1. Wix Editor → Add (`+`) → Reviews → "Google Reviews by Common Ninja"
   (or Elfsight Google Reviews).
2. Connect Google Business Profile: `Pura Nights — Melitta Siomos Dance Academy`.
3. Drop the widget inside the section that has
   `data-wix-slot="google-reviews-embed"` — keep the surrounding heading
   so SEO context stays intact.
4. Keep the existing custom story cards as a secondary section.
5. Do NOT remove the FAQPage / ItemList JSON-LD — Wix Custom Code keeps
   them; the embed adds visual reviews, the schema feeds AI extraction.

## Voucher enquiry flow

`/gift-vouchers` now ships `<VoucherEnquiryForm>` which:
- Validates with Zod (name/email/amount/recipient/occasion/message).
- Has a honeypot + 2-second timing trap for bots.
- Inserts into the `enquiries` table with `subject = 'Gift Vouchers'`,
  `source_page = '/gift-vouchers'` so Melitta receives it in
  `/admin/enquiries` with full buyer context.
- On success, shows a confirmation card. If
  `VITE_WIX_GIFT_CARDS_URL` is set, surfaces a "Buy instantly via Wix
  Gift Cards" CTA — the Wix Stores Gift Cards permalink — alongside the
  email confirmation path.
- Keeps the WhatsApp + mailto fallbacks visible at all times.

When migrating to Wix:
- Replace the form with a Wix Form posting to the **Gift Vouchers** CRM
  tag.
- Set `VITE_WIX_GIFT_CARDS_URL` (or the Wix-side equivalent) so the
  Stores Gift Cards permalink renders next to the form.
- See `docs/63-GIFT-VOUCHER-WIX-HANDOFF.md` for the full Wix Stores /
  Gift Cards mapping.

## WhatsApp prefill logic

- Centralised in `src/lib/whatsapp.ts` (`WA.*` map).
- See `docs/61-WIX-ENQUIRY-ROUTING-MAP.md` for full subject → CRM mapping.

## Do NOT fake reviews

- Never auto-generate quotes. Never invent surnames, dates, or platforms.
- Never emit `publisher: Google` for first-party stories — DB trigger blocks it.
- Never duplicate a Review across multiple `@graph` blocks on the same URL.
- Never claim aggregate Google rating counts that exceed the live profile.

## Launch checklist

- [ ] Migrate verified Google reviews into `public.testimonials` with
      `platform='google'` and a live Google review `source_url`.
- [ ] Validate `/testimonials` and `/` JSON-LD in Rich Results Test.
- [ ] Run `bun scripts/schema-qa-report.ts` and confirm 0 errors.
- [ ] Replace `<WixReviewsEmbed>` slot with the live Wix widget.
- [ ] Test the voucher enquiry form end-to-end (submission lands in
      `/admin/enquiries`).
- [ ] Set `VITE_WIX_GIFT_CARDS_URL` once the Wix Stores Gift Cards
      product permalink is live.
