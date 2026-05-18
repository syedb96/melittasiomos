# 53 — Tracking & Analytics Launch Guide

> Purpose: stand up GA4, Google Tag Manager (GTM), and Microsoft Clarity so every CTA, form, and money-page view is measurable from day one of the Wix launch.
>
> **No production IDs are hardcoded.** Placeholders are listed below — swap in real IDs at Wix time.

---

## 1. ID placeholders (replace before launch)

| Tool | Placeholder | Where to obtain |
|---|---|---|
| Google Tag Manager | `GTM-XXXXXXX` | https://tagmanager.google.com → new container (Web) |
| Google Analytics 4 | `G-XXXXXXXXXX` | https://analytics.google.com → admin → data streams (Web) |
| Microsoft Clarity | `clarity-XXXXXXXXXX` | https://clarity.microsoft.com → new project |

Recommend creating **two GA4 properties / GTM workspaces**: `staging` and `production`. Use the production property only after the form-routing audit (#37) is fully green.

---

## 2. Lovable / React insertion points

This site already pushes events to `window.dataLayer` via `src/lib/analytics.ts`. To enable GA4 + GTM + Clarity here (during preview QA), add the three scripts inside `index.html` `<head>` directly above `</head>`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->

<!-- Microsoft Clarity -->
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","XXXXXXXXXX");</script>
```

Immediately after `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

GA4 is loaded as a tag **inside GTM** (recommended), not via a separate `gtag.js` snippet.

> ⚠️ Do not commit real IDs to the Lovable repo. The Wix site is the canonical production host.

---

## 3. Wix installation (canonical production)

1. **GTM** — Wix Dashboard → *Marketing & SEO* → *Marketing Integrations* → *Google Tag Manager* → paste `GTM-XXXXXXX`.
2. **GA4** — install via GTM (a `GA4 Configuration` tag firing on All Pages). Do **not** also add the GA4 snippet to Wix directly; this double-counts sessions.
3. **Microsoft Clarity** — Wix Dashboard → *Marketing & SEO* → *Marketing Integrations* → *Custom Code* → add Clarity snippet → load on **All Pages**, place in `<head>`.
4. Publish, then verify in:
   - GTM Preview Mode
   - GA4 → Reports → Realtime
   - Clarity → Live recordings

---

## 4. Standardised event taxonomy

All in-app CTAs already push the following shape to `window.dataLayer`:

```js
{
  event: "cta_click",
  cta_label: "<event_name>",
  cta_location: "<page-or-component>:<pathname>",
  page_path: "<window.location.pathname>"
}
```

Mirror these in GTM by creating one **Custom Event** trigger named `cta_click` and a single GA4 **Event Tag** that maps `cta_label` → event name, `cta_location` → event parameter, `page_path` → event parameter.

### Recommended GA4 events & conversion flags

| Event name | Page source(s) | CTA label | Destination | GA4 conversion | Wix note |
|---|---|---|---|---|---|
| `book_first_class` | `/start-here`, `/beginners`, `/pura-nights` | "Book Your First Class" | Linktree / Ticket Tailor | ✅ Yes | Mark as primary conversion |
| `view_schedule` | Homepage hero, blog money CTAs | "See Class Schedule" | `/pura-nights` | ❌ No (engagement) | — |
| `whatsapp_click` | Sitewide floating button, sticky mobile CTA, exit-intent popup, blog CTAs, wedding pages | "WhatsApp Melitta" | `wa.me/447449482343` | ✅ Yes | High-intent lead — always conversion |
| `corporate_enquiry_submit` | `/corporate-dance-classes-london` form | "Send Corporate Enquiry" | EnquiryForm → Supabase + email | ✅ Yes | Wix form submission → GTM `formSubmit` trigger |
| `wedding_enquiry_submit` | `/wedding-dance`, `/wedding-dance-lessons-london` | "Book Wedding Consultation" | EnquiryForm → email | ✅ Yes | — |
| `private_lessons_enquiry_submit` | `/private-lessons` | "Enquire about Private Lessons" | EnquiryForm → email | ✅ Yes | — |
| `pura_ladies_enquiry_submit` | `/pura-ladies`, `/pura-ladies-covent-garden` | "Audition Enquiry" | EnquiryForm → email | ✅ Yes | — |
| `online_coaching_waitlist` | `/online-coaching`, `/online-academy` | "Join Waitlist" | EnquiryForm → Mailchimp | ✅ Yes | — |
| `gift_voucher_enquiry` | `/gift-vouchers` | "Buy Gift Voucher" | Linktree / WhatsApp | ✅ Yes | — |
| `partner_enquiry_submit` | `/partner-with-pura-nights` | "Partner With Us" | EnquiryForm → email | ✅ Yes | — |
| `venue_partner_enquiry_submit` | `/partner-with-pura-nights` (venue segment) | "Venue Collaboration" | EnquiryForm → email | ✅ Yes | — |
| `lead_magnet_signup` | `/start-here`, `/pura-nights` (EmailCaptureGate) | "Download Free Guide" | Mailchimp `lead-magnet` list | ✅ Yes | Mid-priority conversion |
| `shop_whatsapp_enquiry` | `/shop` (noindex), product pages | "Ask About This Product" | `wa.me/447449482343` | ❌ No (shop currently noindex) | Revisit when shop goes live |
| `blog_money_cta` | All `/blog/*` posts | dynamic — see `BlogMoneyCTA` | varies (class/wedding/local) | ❌ No | Engagement signal feeding conversion |
| `outbound_linktree` | All Book Now buttons | "Book Now" | `linktr.ee/pura.nights` | ✅ Yes | Last step before payment |

### GTM trigger rules

- **All `cta_click` events** → single Custom Event trigger, event name regex `cta_click`.
- **Form submissions** → use Wix's native *Form Submission* trigger (or `formSubmit` dataLayer push if using custom HTML forms).
- **Outbound clicks** → built-in Click Trigger on `Click URL contains` `wa.me|linktr.ee|tickettailor`.

---

## 5. Microsoft Clarity setup

- Enable **heatmaps** and **session recordings** on launch day.
- Tag the following pages as "critical" via Clarity's *Custom Tags* (`window.clarity('set', 'page_type', 'money_page')`):
  - `/pura-nights`, `/wedding-dance`, `/private-lessons`, `/corporate-dance-classes-london`, `/pura-ladies`, `/start-here`, `/online-coaching`.

Tags can be wired in Wix via Custom Code → fire on those specific pages.

---

## 6. Post-launch verification (Day 0 checklist)

1. GTM Preview Mode → load every money page → confirm `cta_click` fires on Book / WhatsApp / Enquiry buttons.
2. GA4 → Realtime → see at least 1 event per CTA tested.
3. Clarity → confirm recordings appearing within 30 minutes.
4. Submit at least one of each form type → confirm `formSubmit` event lands in GA4 + recipient inbox.
5. Mark all conversion events in GA4 → *Admin* → *Events* → toggle "Mark as conversion".

---

## 7. Out of scope for Lovable

- Real ID provisioning, Wix Marketing Integrations clicks, conversion-marking in GA4, and Clarity recordings review remain **human tasks**.
- See `docs/56-WIX-CONVERSION-TRACKING-LAUNCH-REPORT.md` for the full launch checklist.
