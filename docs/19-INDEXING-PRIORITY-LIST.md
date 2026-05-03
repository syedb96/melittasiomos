# 19 — Indexing Priority List

> Controls which URLs to push into Google Search Console immediately, which to let index naturally, and which to keep out of the index entirely.
> Canonical host: `https://www.puranights.com`.

## Tier 1 — Request indexing immediately (manual GSC URL Inspection → "Request Indexing")

| URL | Why |
|---|---|
| `/` | Brand root + aggregate signals. |
| `/pura-nights` | Headline product, highest revenue impact. |
| `/prices` | High commercial intent ("salsa class prices london"). |
| `/events` | Hub for new single-event pages — feeds Tier 1 events. |
| `/wedding-dance` | High commercial intent + good conversion. |
| `/private-lessons` | High commercial intent. |
| `/salsa-classes-chiswick` | Strongest local commercial query. |
| `/bachata-classes-ealing` | Strongest local commercial query. |
| `/dance-classes-west-london` | Regional commercial query. |
| Each future `/events/:slug` | Time-sensitive Event rich result. |

**Cap:** ≤10 manual indexing requests per day to avoid GSC throttling.

## Tier 2 — Index naturally (do nothing in GSC; rely on sitemap + internal links)

| Group | URLs |
|---|---|
| Local commercial | `/salsa-classes-london`, `/bachata-classes-london`, `/latin-dance-classes-london`, `/salsa-classes-ealing`, `/bachata-classes-chiswick`, `/dance-classes-chiswick`, `/dance-classes-ealing`, `/salsa-classes-acton`, `/salsa-classes-hammersmith`, `/salsa-classes-richmond`, `/salsa-classes-fulham`, `/dance-classes-hounslow`, etc. |
| Venue | `/venue/the-george-iv-chiswick`, `/venue/the-drayton-court-ealing` |
| Authority | `/about`, `/meet-the-team`, `/start-here`, `/beginners`, `/community`, `/testimonials`, `/gallery`, `/faq`, `/locations` |
| Pillars | `/learn/salsa-bachata-guide`, `/learn/salsa-vs-bachata` |
| Blog | All 42 `/blog/*` posts |
| Brand sub | `/pura-ladies`, `/wedding-dance-west-london`, `/private-dance-lessons-west-london` |

These are linked from header, footer, RelatedPages, and BlogPostFooter — Google will discover and index them organically. Re-evaluate quarterly; promote underperformers to Tier 1 if impressions plateau.

## Tier 3 — Delayed or noindex (intentionally excluded)

| URL | Reason | When to revisit |
|---|---|---|
| `/shop`, `/shop/:slug`, `/size-guide`, `/shipping-returns`, `/lookbook`, `/lookbook/:category` | No real product photography yet. | When 5+ photos per SKU + 1 SKU shippable + checkout tested. |
| `/online-academy` | Product not launched. | Launch date confirmed. |
| `/refer` | Ambassador-only, no public ranking value. | Never. |
| `/proof-centre` | Merged into `/testimonials`. | Never (kept noindex,follow). |
| `/all-pages-master` | Internal sitemap mirror. | Never. |
| `/admin/*`, `/login` | Auth surfaces. | Never. |
| `/bookings` | Linktree hub — utility, not destination. | Never. |
| `/online-classes` | Legacy → 301 to `/online-salsa-bachata-coaching`. | Never. |
| Cancelled `/events/:slug` | Auto-flipped to `noindex,follow` by `EventInstance.tsx`. | When status → Scheduled / Rescheduled. |

## Why the tiers exist

- **Tier 1** are the URLs that earn revenue or signal freshness. Manual indexing on these is the highest-ROI action you can take in GSC.
- **Tier 2** are reinforcement pages. Pushing them manually wastes the daily quota; they will index from sitemap + crawl flow within ~10 days.
- **Tier 3** dilutes topical authority or is operationally private. Indexing these would create thin-content / soft-404 / duplicate-canonical signals.

## Operating cadence

- Submit Tier 1 once at launch. Re-submit only after material content changes.
- New `/events/:slug` → submit on publish (one click).
- Tier 2 → review monthly via GSC "Pages > Why pages aren't indexed". Promote any page stuck on "Discovered – not indexed" >30 days.
- Tier 3 → annual audit only.
