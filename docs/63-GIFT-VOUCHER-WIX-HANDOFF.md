# 63 — Gift Voucher Wix Handoff

Sprint: Proof + Voucher Conversion (5-credit pass).
Page: `/gift-vouchers`.

## Voucher flow (3 steps)

1. **Choose voucher amount** — tier grid (£25, £50, £75, £100, £150, £200).
   £75 carries the "Most popular" badge.
2. **Add recipient / occasion** — captured inside the WhatsApp/email prefill.
   Occasion cards: Anniversary, Birthday, Christmas/Eid, Thank You,
   Wedding Gift, Confidence Boost, Beginner Taster.
3. **Contact Melitta to arrange payment & delivery** — bank transfer or
   Stripe link, eGift card sent within 24 hours.

## Wix replication

- **Tier grid**: Wix Repeater bound to a `Vouchers` collection
  (fields: `amount`, `label`, `bestFor`, `perks[]`, `highlighted`, `badge`).
- **CTA buttons per tier**:
  - Primary "Buy by email" → `mailto:siomosmelitta@gmail.com?subject=Gift Voucher — £{amount}&body=...`
  - Secondary "WhatsApp" → `https://wa.me/447449482343?text=Hi Melitta, I'm interested in the £{amount} Pura Nights gift voucher. Can you confirm how it works and how I can purchase it?`
- **Occasion cards**: Wix Repeater bound to a static `Occasions` collection.
- **FAQ**: Wix FAQ app; emit FAQPage JSON-LD via Custom Code.
- **Custom amount link** (>£200) routes to a separate WhatsApp prefill.

## Replacing with Wix eCommerce / Wix Gift Cards

When ready to sell vouchers on-site:

1. Wix → Sell Online → **Gift Cards** (built-in) OR Wix Stores → Products.
2. Create one product per tier; SKU = `GC-25`, `GC-50`, etc.
3. Replace the "Buy by email" mailto with the Wix Stores **Add to Cart**
   button. Keep the WhatsApp CTA as a fallback for custom amounts.
4. Wix automation: on order paid, send branded eGift card PDF via Velo or
   Wix Automations email template.
5. Stock: vouchers are digital; mark as `unlimited inventory`.

## WhatsApp prefill logic

Each voucher amount has a unique prefilled message:

> Hi Melitta, I'm interested in the £{amount} Pura Nights gift voucher.
> Can you confirm how it works and how I can purchase it?

Custom amount fallback:

> Hi Melitta, I'd like to buy a custom-amount Pura Nights gift voucher
> (above £200). Could you send me the details?

Email prefill (`mailto:`):

- Subject: `Gift Voucher — £{amount}`
- Body: pre-fills recipient name, message, delivery date.

## Schema notes

- `Product` schema covers all 6 tiers as `Offer[]` (priceCurrency: GBP).
- `availability: InStock` is accurate (digital, no stock cap).
- `FAQPage` covers 7 voucher-buying questions.
- `Brand`: Pura Nights. `seller`: Organization → Pura Nights.
- No fake review aggregates, no fake delivery times, no fake stock counts.

## Launch checklist

- [ ] Confirm £75 "Most popular" badge alignment on mobile.
- [ ] Validate Product/Offer schema in Rich Results Test.
- [ ] Test all 6 tier WhatsApp prefills land with correct amount.
- [ ] Test all 6 mailto subjects land with correct amount.
- [ ] Wix migration: bind Repeater + replace mailto with Wix Stores Add to Cart.
- [ ] Wix automation: confirm eGift card email template matches brand.
- [ ] Confirm 12-month expiry copy matches Wix Gift Cards default.
