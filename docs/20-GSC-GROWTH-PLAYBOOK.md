# 20 — Google Search Console Growth Playbook

> The post-launch operating system for Pura Nights organic search. All URLs prefixed with `https://www.puranights.com`.
>
> ⚠️ **Do NOT use the Google Indexing API for normal Pura Nights pages.** Google supports it only for `JobPosting` and `BroadcastEvent` (livestream) URLs. Pura Nights uses **manual URL Inspection in GSC** (see `docs/23-MANUAL-GSC-INDEXING-CONTROL-SHEET.md`). The `bun run seo:queue` command is dry-run only and is used to decide which Tier 1 URLs to manually inspect.

## 1. Weekly routine (15 min, every Monday)

1. **Indexing → Pages**: confirm count is flat or rising. Check "Why pages aren't indexed" for new buckets.
2. **Sitemaps**: confirm `sitemap.xml` shows "Success" and the discovered URL count matches `public/sitemap.xml` (29 at launch, +1 per new event).
3. **Performance → 28-day**: note top 5 query gainers and losers.
4. **URL Inspection**: submit up to 3 brand-new or materially updated URLs. Never resubmit unchanged URLs.
5. **Experience → Core Web Vitals**: scan for any new "Poor" or "Needs improvement" group.

## 2. Monthly routine (45 min, first of the month)

1. **Performance → Queries**: export top 100 queries. For each query in positions 5–20 with ≥50 impressions, audit the landing page title + meta. Rewrite if CTR <2%.
2. **Performance → Pages**: identify pages with high impressions and CTR <1% — rewrite title/meta. Identify pages with 0 impressions after 30 days indexed — strengthen internal links or merge.
3. **Indexing → Pages**: investigate every "Crawled – currently not indexed" and "Discovered – currently not indexed" entry. Apply fixes from §4.
4. **Enhancements → Sitelinks searchbox / Breadcrumbs / Events / FAQ**: ensure 0 errors. Any error → re-run `bun run seo:check`.
5. **Links → Top linking sites + Top linked pages**: feed gaps into `docs/21-AUTHORITY-SYSTEM.md` outreach list.
6. **Manual actions / Security**: must be empty.

## 3. Quarterly routine

1. Re-run full crawl (Screaming Frog or equivalent) and reconcile against `public/sitemap.xml`.
2. Promote/demote URLs between tiers in `docs/19-INDEXING-PRIORITY-LIST.md`.
3. Refresh top 5 organic landing pages: new H2, new internal link, updated `dateModified`.

## 4. Red flags and fixes

| GSC signal | Likely cause | Fix |
|---|---|---|
| **Crawled – currently not indexed** | Thin or duplicate content. | Add 200+ words of unique value, add 2 inbound internal links, request indexing. |
| **Discovered – currently not indexed** | Low crawl budget / weak link signal. | Add inbound links from header/footer/RelatedPages and a high-traffic blog. |
| **Duplicate without user-selected canonical** | Multiple URLs returning same content. | Confirm `<SeoHead path>` is unique; check for trailing slash variants; add explicit canonical. |
| **Duplicate, Google chose different canonical** | Stronger inbound page exists. | Either consolidate (301) or strengthen the desired canonical via internal links + content uniqueness. |
| **Soft 404** | Empty state page or near-empty content. | Add real content, or return real 404, or noindex. |
| **Excluded by 'noindex' tag** (unexpected) | Accidental noindex flag. | Inspect SeoHead `noindex` prop; check Tier 3 exclusions. |
| **Page with redirect** | Linked URL that 301s. | Update the source link to point at the final URL. |
| **Server error (5xx)** | Hosting/runtime fault. | Check Wix status; re-deploy. |
| **Blocked by robots.txt** (unexpected) | Over-broad disallow. | Audit `public/robots.txt`. |
| **Event enhancement: Missing field "startDate"** | Event schema on a recurring page. | Run `bun run seo:check` — guard will identify and fail. |
| **CTR drop >20% week-over-week on a query** | SERP feature change or competitor shift. | Re-audit title/meta; check for new SERP features (FAQ, video, sitelinks). |

## 5. Manual indexing rules

- Max 10 URL Inspection submissions per day.
- Never submit the same URL twice in 7 days.
- Always submit after material content changes (>20% body text change, new H2, new schema).
- Always submit on `/events/:slug` publish.

## 6. Reporting template (paste into monthly review)

```
Month: __________
Total clicks (28d): _____  (Δ vs prev: ___%)
Total impressions: _____  (Δ vs prev: ___%)
Average position:  _____
Indexed pages:     _____ / _____ submitted
Top gaining query: ____________
Top losing query:  ____________
Pages with CTR <1% (action list):
 1.
 2.
 3.
Schema errors: _____
Manual actions:  none / details
```

## 7. Tools

- **GSC** — primary surface.
- **`bun run seo:check`** — pre-deploy validation.
- **`bun run seo:build`** — sitemap regeneration after route changes.
- **PageSpeed Insights** — CWV verification.
- **Rich Results Test** — schema sanity-check before requesting indexing.
- **Screaming Frog (free up to 500 URLs)** — quarterly crawl reconciliation.
