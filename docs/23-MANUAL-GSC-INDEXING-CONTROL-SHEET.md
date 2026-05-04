# 23 — Manual GSC Indexing Control Sheet

> **DO NOT use the Google Indexing API for normal Pura Nights pages.** Google's Indexing API is officially supported only for `JobPosting` and `BroadcastEvent` (livestream) URLs. For everything else use: sitemap → internal links → URL Inspection → fresh `lastmod` → backlinks/reviews.

The `bun run seo:queue` command is **dry-run / documentation-only** — it tells you which Tier 1 URLs changed and are therefore worth manually requesting indexing in GSC. It does NOT submit. The submit script is intentionally renamed `seo:queue:submit:DISABLED` and refuses to run unless `INDEXING_API_ELIGIBLE_TYPES` is explicitly set (only relevant if you ever ship a real JobPosting or livestream page).

## Daily caps & cadence

- Max **10 URL Inspection → Request Indexing** clicks per day (Google's soft limit).
- Never re-request the same URL within **7 days** unless content materially changed (≥20% body change, new H2, new schema, new product/event).
- Inspect Tier 1 first, then Tier 2 only when Tier 1 is healthy.
- Never inspect Tier 3 (noindex / shop soft-launch / lookbook).

## Status glossary (shortcut)

| GSC status | What it means | What to do |
|---|---|---|
| **Submitted and indexed** | ✅ Done | None |
| **Crawled — currently not indexed** | Google saw it but judged it weak/duplicate | Add 200+ unique words, +2 inbound internal links, refresh `dateModified`, then re-request |
| **Discovered — currently not indexed** | Google knows the URL but hasn't crawled | Strengthen internal links from header/footer/RelatedPages; do NOT spam re-requests |
| **Duplicate without user-selected canonical** | Multiple URLs same content | Confirm `<link rel="canonical">` resolves to www |
| **Duplicate, Google chose different canonical** | Stronger page exists | Consolidate (301) or boost desired canonical |
| **Page with redirect** | Linked URL 301s | Update source link to final URL |
| **Excluded by 'noindex' tag** | Expected for admin / shop / refer / soft-launch | None |
| **Soft 404** | Empty or near-empty | Add real content or noindex |
| **Server error (5xx)** | Hosting fault | Re-deploy, then re-request |

## Tier 1 — manual queue (inspect first, request indexing if changed)

| Priority | URL | Page Type | Last Updated | GSC Status | Action | Date Requested | Notes |
|---|---|---|---|---|---|---|---|
| 1 | https://www.puranights.com/ | Home | | | Inspect → Request | | |
| 1 | https://www.puranights.com/pura-nights | Brand hub | | | Inspect → Request | | |
| 1 | https://www.puranights.com/prices | Conversion | | | Inspect → Request | | |
| 1 | https://www.puranights.com/events | Event index | | | Inspect → Request | | |
| 1 | https://www.puranights.com/salsa-classes-chiswick | Local money | | | Inspect → Request | | |
| 1 | https://www.puranights.com/bachata-classes-ealing | Local money | | | Inspect → Request | | |
| 1 | https://www.puranights.com/wedding-dance | Service hub | | | Inspect → Request | | |
| 1 | https://www.puranights.com/private-lessons | Service hub | | | Inspect → Request | | |
| 1 | https://www.puranights.com/testimonials | Trust | | | Inspect → Request | | |
| 1 | https://www.puranights.com/blog | Content hub | | | Inspect → Request | | |
| 1 | https://www.puranights.com/venue/the-george-iv-chiswick | Venue | | | Inspect → Request | | |
| 1 | https://www.puranights.com/venue/the-drayton-court-ealing | Venue | | | Inspect → Request | | |

## Tier 2 — let GSC index naturally; only request after material edits

| Priority | URL | Page Type | Last Updated | GSC Status | Action | Date Requested | Notes |
|---|---|---|---|---|---|---|---|
| 2 | /start-here | Onboarding | | | Monitor | | |
| 2 | /community | Trust | | | Monitor | | |
| 2 | /schedule | Local | | | Monitor | | |
| 2 | /gift-vouchers | Conversion | | | Monitor | | |
| 2 | /meet-the-team | Trust | | | Monitor | | |
| 2 | /dance-classes-west-london | Local hub | | | Monitor | | |
| 2 | /salsa-classes-london | Local | | | Monitor | | |
| 2 | /bachata-classes-london | Local | | | Monitor | | |
| 2 | /salsa-classes-hammersmith | Local | | | Monitor | | |
| 2 | /salsa-classes-fulham | Local | | | Monitor | | |
| 2 | /salsa-classes-richmond | Local | | | Monitor | | |
| 2 | /salsa-classes-acton | Local | | | Monitor | | |
| 2 | /dance-classes-hounslow | Local | | | Monitor | | |
| 2 | /blog/pura-nights-latin-friday-guide | Blog | | | Monitor | | |
| 2 | /blog/best-salsa-nights-west-london | Blog | | | Monitor | | |
| 2 | /blog/latin-dance-events-ealing-2026 | Blog | | | Monitor | | |
| 2 | /blog/salsa-vs-bachata | Blog | | | Monitor | | |
| 2 | /blog/wedding-first-dance-tips | Blog | | | Monitor | | |

## Tier 3 — DO NOT inspect or request

- All `/admin/*`
- All `/shop/*` until product photography + checkout live
- `/lookbook`
- `/refer`
- `/all-pages-master`
- `/login`, `/thank-you`

## Anti-patterns (do NOT do these)

- ❌ Submitting page URLs as "sitemaps" in GSC. Only `https://www.puranights.com/sitemap.xml`.
- ❌ Re-requesting the same URL daily. Wait 7 days unless content changed.
- ❌ Using the Google Indexing API for blog/local/service pages. Not supported by Google for these page types.
- ❌ Removing `noindex` from shop / lookbook / refer until they're production-ready.
- ❌ Bulk-removing pages just because they're "Crawled — currently not indexed". Improve them or merge them.
