# 47 — Topical Authority & Internal Linking Map
_Date: 2026-05-16_

> Source of truth for cluster → hub → spoke linking. Use this when wiring Wix menus, footers, and Repeater filters.

## Rules
1. Every Tier-1 money page receives ≥5 inbound internal links.
2. Every local page links back to its parent hub.
3. Every blog post links to ≥1 money page.
4. Every money page links to a proof/testimonial/gallery page.
5. Every service page has a WhatsApp CTA + Book/Enquire CTA.
6. Footer stays structured; top nav stays lean (no clutter).

## Clusters

### Salsa Classes — hub `/salsa-classes-london`
Spokes: `/salsa-classes-chiswick`, `/salsa-classes-ealing`, `/salsa-classes-acton`, `/salsa-classes-fulham`, `/salsa-classes-hammersmith`, `/salsa-classes-richmond`, `/salsa-classes-brentford`, `/salsa-classes-kew`, `/salsa-classes-barnes`, `/salsa-classes-putney`, `/salsa-classes-shepherds-bush`, `/salsa-classes-notting-hill`, `/salsa-classes-south-west-london`.
Blog feeders: `/blog/salsa-classes-near-chiswick`, `/blog/salsa-south-west-london`, `/blog/first-salsa-class-london`, `/blog/salsa-no-partner`, `/blog/salsa-on1-vs-on2`.

### Bachata Classes — hub `/bachata-classes-london`
Spokes: `/bachata-classes-chiswick`, `/bachata-classes-ealing`, `/bachata-classes-west-london`, `/bachata-classes-south-west-london`, `/bachata-performance-team-london`.
Blog feeders: `/blog/bachata-for-beginners-london`, `/blog/bachata-classes-near-ealing`, `/blog/bachata-sensual-guide`, `/blog/ladies-styling-bachata`.

### Beginners — hub `/beginners`
Spokes: `/start-here`, `/pura-nights`, `/schedule`.
Blog feeders: `/blog/first-salsa-class-london`, `/blog/shy-beginners-salsa-london`, `/blog/joining-dance-class-alone`, `/blog/what-to-wear-salsa-bachata`, `/blog/how-to-make-friends-at-salsa-class`.

### Chiswick — hub `/salsa-classes-chiswick`
Spokes: `/bachata-classes-chiswick`, `/dance-classes-chiswick`, `/latin-dance-chiswick`, `/venue/the-george-iv-chiswick`.
Blog feeders: `/blog/salsa-classes-near-chiswick`, `/blog/salsa-classes-near-turnham-green`, `/blog/best-areas-west-london`.

### Ealing — hub `/salsa-classes-ealing`
Spokes: `/bachata-classes-ealing`, `/dance-classes-ealing`, `/latin-dance-ealing`, `/venue/the-drayton-court-ealing`.
Blog feeders: `/blog/bachata-classes-near-ealing`, `/blog/latin-dance-events-ealing-2026`.

### Covent Garden / Central London — hub `/salsa-bachata-classes-covent-garden` _(new)_
Spokes: `/private-lessons`, `/online-salsa-bachata-coaching`, `/pura-nights`, `/wedding-dance`.
Blog feeders: `/blog/best-latin-social-dancing-london`, `/blog/after-work-dance-classes-london`, `/blog/date-night-dance-class-london`.

### Wedding Dance — hub `/wedding-dance`
Spokes: `/wedding-dance-lessons-london`, `/wedding-dance-west-london`.
Blog feeders: `/blog/wedding-first-dance-tips`, `/blog/choose-wedding-first-dance-song`, `/blog/salsa-vs-waltz-wedding`, `/blog/how-many-wedding-dance-lessons`, `/blog/last-minute-wedding-dance`, `/blog/anniversary-dance-lesson-london`.

### Private Lessons — hub `/private-lessons`
Spokes: `/private-dance-lessons-west-london`, `/private-salsa-lessons-london`.
Blog feeders: `/blog/how-long-to-learn-salsa`, `/blog/build-confidence-on-dance-floor`, `/blog/improve-social-dancing`.

### Corporate / Team Building — hub `/corporate-dance-classes-london`
Spokes: `/private-group-dance-parties-london`, `/partner-with-pura-nights`, `/latin-night-out-west-london`.
Blog feeders: `/blog/corporate-team-building-dance-london`, `/blog/corporate-christmas-party-dance-london`, `/blog/hen-party-dance-ideas-london`, `/blog/birthday-dance-class-london`, `/blog/after-work-dance-classes-london`.

### Pura Ladies / Performance — hub `/pura-ladies`
Spokes: `/bachata-performance-team-london`, `/ladies-styling-london`.
Blog feeders: `/blog/pura-ladies-story`, `/blog/ladies-styling-bachata`, `/blog/build-confidence-on-dance-floor`.

### Online Coaching — hub `/online-salsa-bachata-coaching`
Spokes: `/online-academy` (pre-launch), `/online-classes` (301 → hub).
Blog feeders: `/blog/how-to-practice-salsa-at-home`, `/blog/improve-social-dancing`.

### Events / Socials — hub `/events`
Spokes: `/events/:slug`, `/latin-night-out-west-london`.
Blog feeders: `/blog/best-latin-social-dancing-london`, `/blog/best-salsa-nights-west-london`, `/blog/pura-nights-latin-friday-guide`, `/blog/salsa-bachata-bucket-list-london`.

### Gift Vouchers — hub `/gift-vouchers`
Blog feeders: `/blog/gift-voucher-dance-class-london`, `/blog/anniversary-dance-lesson-london`, `/blog/birthday-dance-class-london`.

### Shop _(soft-launch / noindex)_
Skip from indexable internal linking; reachable only from "Shop" mega-nav.

## Conversion-hub coverage
Every page must link to at least one of: `/`, `/pura-nights`, `/prices`, `/contact`, `/wedding-dance`, `/private-lessons`, `/events`, `/bookings`, `/gift-vouchers`, `/corporate-dance-classes-london`. Verified via `scripts/crawl-graph.ts`.
