# 82 — Embed Class Finder Tracking

Upgrade of `/embed/class-finder` from static schedule → measurable
backlink + referral asset.

## Captured on load
- `document.referrer`
- current URL (window.location.href)
- UTM source / medium / campaign / content / term
- `partner_id` (or `pid`) query param
- timestamp (via existing `trackCta` payload)

## Captured per interaction
- Selected location (Chiswick / Ealing / All)
- Selected dance style (Salsa / Bachata / All)
- Clicked CTA label

## Analytics events (`trackCta` → dataLayer + Supabase `cta_events`)
- `class_finder_view`
- `class_finder_filter`
- `class_finder_book_click`
- `class_finder_whatsapp_click`

## postMessage events (parent iframe site)
All messages are `{ source: "pura-nights-widget", type, ...payload }`.
- `widget_loaded` — { referrer, utm_* , partner_id }
- `filter_changed` — { location, style }
- `cta_clicked` — { label, destination }

Targets `*` (origin agnostic). Partner sites can listen with:
```js
window.addEventListener("message", e => {
  if (e.data?.source === "pura-nights-widget") console.log(e.data);
});
```

## Backlink footer
"Powered by Pura Nights — Salsa & Bachata in West London" with a
canonical UTM'd link back to `https://www.puranights.com/`.

## Privacy
Visible footer note: "No personal data is collected by this widget
unless you submit an enquiry."

`<meta name="robots" content="noindex,follow">` enforced on mount.

## Wix migration
Replicate as a lightweight page (no header/footer template). Use Velo
to read `wixLocation.query` + `document.referrer` and `wix-fetch` to
POST events to the same Supabase endpoint, or attach to GA4 via
`wix-window.trackEvent`.
