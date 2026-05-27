# 71 — Service Cross-Sell Engine

`NextStepServiceGrid` is a single reusable component that recommends the
most relevant next service to the visitor. Each service page passes a
custom `items` array — no shared global list — so the recommendations
match the visitor's intent.

## Wiring

| Service page | Next steps shown |
|---|---|
| `/pura-nights` | Pura Ladies · Latin Friday · Private Lessons |
| `/wedding-dance` | Private Lessons · Real Couple Reviews · Gift Vouchers |
| `/private-lessons` | Weekly Classes · Wedding Dance · Online Coaching |
| `/pura-ladies` | Ladies Styling · Performance Team · Gallery |
| `/corporate-dance-classes-london` | Group Parties · Partner With Us · Contact |
| `/private-group-dance-parties-london` | Corporate · Wedding Dance · Contact |
| `/online-salsa-bachata-coaching` | In-Person Privates · Technique Guides · Contact |
| `/gift-vouchers` | How to Redeem · What They'll Experience · Wedding Lessons |

## Wix replication

Use a `RelatedServices` CMS collection with fields:
`sourcePage | label | description | linkTo | sortOrder`.
Each Wix service page hosts a Repeater filtered by `sourcePage`.

## CRM / forms

Cross-sell clicks reuse existing analytics — no new tags required.
The block is presentation-only; no form posts are added.

## Outstanding human-only blockers

- None at code level. Worth A/B testing card ordering once we have 30+
  days of click data in `cta_events`.
