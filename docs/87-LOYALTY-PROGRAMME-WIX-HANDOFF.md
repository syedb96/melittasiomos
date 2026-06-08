# 87 — Loyalty Programme Wix Handoff

## Offer

Attend 8 eligible Pura Nights sessions → 9th eligible session free.

- No claim that the first lesson is free.
- Eligibility confirmed manually by Pura Nights.
- Tracking is door-side (manual). No automated punch-card built.

## Page

- URL: `/loyalty`
- H1: "Dance more. Get rewarded."
- Sections: Hero, How it works (4 steps), What counts, Join form, WhatsApp CTA, FAQ.
- Schema: `WebPage` + `FAQPage` (6 Q&As).

## Form fields → Wix collection `LoyaltyLeads`

| Field | Type | Required |
|---|---|---|
| first_name | text (60) | yes |
| last_name | text (60) | yes |
| email | email (255) | yes |
| mobile | text (30) | yes |
| venue | enum: chiswick / ealing / either | yes |
| interest | enum: salsa / bachata / both / social / pura-ladies / private | yes |
| consent | boolean | yes |

In Lovable the form writes to the existing `enquiries` table with
`subject = "loyalty"` so the admin Enquiries view picks it up.

## CRM tag

`loyalty`

## Tracking events

- `loyalty_page_view`
- `loyalty_form_submit`
- `loyalty_whatsapp_click`
- `loyalty_join_click`

## Internal links in

Homepage (near pricing), `/prices`, `/pura-nights`, `/start-here`,
footer Classes column, eligible blog CTAs.

## WhatsApp prefill

```
Hi Melitta, I'd like to join the loyalty programme. How does the 8 sessions + 9th free tracking work?
```
