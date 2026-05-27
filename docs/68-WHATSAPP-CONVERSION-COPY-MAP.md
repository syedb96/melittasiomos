# 68 — WhatsApp Conversion Copy Map

Centralised prefilled messages live in `src/lib/whatsapp.ts` (`WA.*`
helpers). All money pages reuse these via `trackWaClick(context)` so we
can attribute conversions by page.

| Page | CTA label | Helper | Lead type | CRM tag |
|---|---|---|---|---|
| `/schedule` | "Ask about Monday" | `WA.scheduleMonChiswick` | weekly_class | wkly-chiswick |
| `/schedule` | "Ask about Tuesday" | `WA.scheduleTueEaling` | weekly_class | wkly-ealing |
| `/prices` | "Ask Melitta on WhatsApp" | `WA.pricesEnquiry` | bundle | bundle-q |
| `/pura-nights` | "Which pass suits me?" | `WA.membership` | bundle | path-q |
| `/gift-vouchers` (£ amount) | "Buy £X voucher" | `WA.voucher(amount)` | voucher | voucher-X |
| `/gift-vouchers` (custom) | "Custom voucher" | `WA.voucherCustom` | voucher | voucher-custom |
| `/wedding-dance` | "Book a consultation" | `WA.weddingDance` | wedding | wedding-consult |
| `/private-lessons` | "Enquire about privates" | `WA.privateLessons` | private | private-q |
| `/pura-ladies` | "Pura Ladies enquiry" | `WA.puraLadies` | performance | ladies-q |
| `/corporate-…` | "Get a quote" | `WA.corporate(date, group)` | corporate | corp-q |
| `/private-group-…` | "Plan a party" | `WA.groupParty(date, group)` | group | group-q |
| `/online-…` | "Online coaching" | `WA.online(level, style)` | online | online-q |
| `/partner-…` | "Partner with us" | `WA.partner(org)` | partner | partner-q |

## Wix replication note

Each button's link field is `https://wa.me/447449482343?text={url-encoded-message}`.
For dynamic prefills (voucher amount, corporate group size), use Velo to set
the `href` on click. Use a single tracking pixel via `gtag('event','cta_click',{cta_type:'whatsapp',cta_context:'<page>'})`.
