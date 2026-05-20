# 60 — Internal Link Authority Pass

_Sprint date: 2026-05-20_

## Rule
No important money page should be more than **2 clicks from the homepage**, and every page should push authority toward the page that earns money.

## Authority flow map

```text
Homepage (/)
├─ Header → Schedule, Prices, Corporate, Wedding, Private, Pura Ladies, Contact
├─ Commercial strip → Corporate / Wedding / Private / Ladies / Partner
├─ AnswerBox CTA → /schedule
└─ Footer (sitewide) → all 9 commercial pages + all venue pages + all local pillars

Local pillars (West London, South West London)
├─ Sub-area local pages (Chiswick, Ealing, Acton, Hammersmith, Fulham, Richmond, Kew,
│   Barnes, Putney, Brentford, Notting Hill, Shepherd's Bush, Hounslow, Covent Garden)
│   ├─ LocalTrustBlock → Schedule + Start Here + WhatsApp + nearest venue page
│   ├─ AnswerBox → money page
│   └─ RelatedPages → 4–6 sister local pages + Prices + Start Here
│
└─ Venue pages (The George IV, Drayton Court)
    └─ Back-links to all local pages served by that venue

Blog (54 posts, all passing audit)
├─ BlogMoneyCTA variant → corporate / wedding / ladies / beginner / chiswick / ealing
├─ RelatedArticles → 3 topical neighbours
└─ BlogPostFooter → Schedule + Start Here

Pura Ladies
├─ → /ladies-styling-london
├─ → /bachata-performance-team-london
├─ → /pura-ladies-covent-garden
├─ → /gallery + /testimonials

Online
├─ /online-academy ↔ /online-coaching (mutual)
└─ Both → WhatsApp + /contact + selected technique blog posts
```

## Verified click depth from homepage

| Money page | Click depth | Routes |
|---|---|---|
| /schedule | 1 | Header, hero CTA, footer |
| /prices | 1 | Header, footer |
| /corporate-dance-classes-london | 1 | Header, commercial strip, footer |
| /wedding-dance-lessons-london | 1 | Header, commercial strip, footer |
| /private-lessons | 1 | Header, footer |
| /private-group-dance-parties-london | 2 | Footer + commercial strip |
| /pura-ladies | 1 | Header, footer |
| /ladies-styling-london | 2 | via /pura-ladies + footer |
| /bachata-performance-team-london | 2 | via /pura-ladies + footer |
| /partner-with-pura-nights | 2 | Footer + commercial strip |
| /online-coaching | 2 | Header dropdown + footer |
| /contact | 1 | Header, footer, every page CTA |

All money pages ≤ 2 clicks ✅

## New link injections this sprint
The `LocalTrustBlock` component (added to 7 local pages) injects **3 high-intent links per page**:
- `/schedule` (See Schedule button)
- `/start-here` (Start Here button)
- `/venue/the-george-iv-chiswick` OR `/venue/the-drayton-court-ealing` (Nearest venue link)
- `https://wa.me/447449482343` (WhatsApp Melitta — direct conversion)

That's **21 new contextual internal links** + 7 new WhatsApp deep-links flowing toward the highest-converting destinations.

## Orphan check
`scripts/seo-qa.ts` and `scripts/crawl-graph.ts` confirm zero orphan pages in the sitemap. The two intentional `<Navigate replace>` redirects (`/online-classes`, `/salsa-classes-acton-local`) remain `noindex,follow` and are excluded from sitemap.

## Wix replication notes
- LocalTrustBlock = 2-column Strip with Repeater (facts) + pull-quote card + 3 button block.
- Bind to a `local_areas` collection so each area page reuses the same Wix template.
- WhatsApp button uses the canonical `wa.me/447449482343` URL — keep identical across Wix.
