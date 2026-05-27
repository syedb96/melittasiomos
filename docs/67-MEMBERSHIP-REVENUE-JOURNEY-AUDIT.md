# 67 — Membership Revenue Journey Audit

Sprint scope: convert the strong local SEO + proof layer into measurable
membership and enquiry conversion across the 13 highest-intent pages.

## Audited pages

| Page | Visitor intent | Existing CTA | New conversion layer |
|---|---|---|---|
| `/` | Discover the brand | Book + WhatsApp | ReviewVelocityTicker already live |
| `/pura-nights` | Understand the weekly product | Book + Prices | + WhoThisIsFor + MembershipPathway + NextStep |
| `/prices` | Pick a pass | Bundle calculator | + MembershipPathway |
| `/schedule` | Confirm a class time | Book + WhatsApp | + MembershipPathway |
| `/start-here` | First-timer reassurance | Book + WhatsApp | + WhoThisIsFor + MembershipPathway |
| `/beginners` | Lower friction | Book + WhatsApp | + MembershipPathway |
| `/salsa-classes-chiswick` | Monday venue intent | Book + WhatsApp | + MembershipPathway |
| `/bachata-classes-ealing` | Tuesday venue intent | Book + WhatsApp | + MembershipPathway |
| `/venue/the-george-iv-chiswick` | Confirm logistics | Directions + Book | LocalTransport + VenueGeoCard already live |
| `/venue/the-drayton-court-ealing` | Confirm logistics | Directions + Book | LocalTransport + VenueGeoCard already live |
| Service pages (`/wedding-dance`, `/private-lessons`, `/pura-ladies`, `/corporate…`, `/private-group…`, `/online-…`, `/gift-vouchers`) | Validate fit | Enquiry + WhatsApp | + WhoThisIsFor + NextStepServiceGrid |

## Wix implementation note

Each new block is a single Repeater bound to a small CMS collection
(`MembershipTier`, `AudiencePersona`, `RelatedServices`). No custom code
is required. Headings/intros sit above as Wix Title + Paragraph elements.
