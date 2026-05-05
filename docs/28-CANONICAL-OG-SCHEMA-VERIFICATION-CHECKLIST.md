# 28 — Canonical / OG / Schema Verification Checklist

> Run this against every indexable URL after Wix cutover.
> Canonical host: `https://www.puranights.com`.

## Per-page checks

For every indexable route in `public/sitemap.xml`:

- [ ] Self-referencing `<link rel="canonical">` matches the request URL.
- [ ] Canonical uses `https://www.puranights.com` (no apex, no trailing `?`).
- [ ] `og:url` matches canonical.
- [ ] `og:title` present, ≤60 chars.
- [ ] `og:description` present, ≤160 chars.
- [ ] `og:image` resolves (absolute URL, ≥1200×630). Per-event pages use `/og/events/:slug.jpg`.
- [ ] `twitter:card = summary_large_image`.
- [ ] `BreadcrumbList` JSON-LD present (auto in Wix when breadcrumb element is on the page).
- [ ] Page-appropriate primary schema present (Service / Article / Event / FAQPage / Product).
- [ ] No conflicting / duplicate `@type: Event` blocks.
- [ ] `<meta name="robots">` is `index,follow` (or absent → defaults to index).
- [ ] Page **is** in `sitemap.xml`.

## Per-page checks for noindex routes

`/online-classes`, `/salsa-classes-acton-local`, `/bookings`, `/refer`, `/all-pages-master`, `/proof-centre`, `/shop*`, `/size-guide`, `/shipping-returns`, `/lookbook*`, `/admin/*`, `/login`, `/thank-you`, cancelled `/events/:slug`:

- [ ] `<meta name="robots" content="noindex,follow">` present.
- [ ] Canonical points to the **target** canonical URL (not self).
- [ ] **Not** in `sitemap.xml`.
- [ ] Wix Redirect Manager rule exists (where applicable — see docs/20).

## Event-page checks (`/events/:slug`)

- [ ] `Event` JSON-LD validates in Rich Results Test.
- [ ] `startDate`, `endDate` are ISO-8601 with `+00:00`/`+01:00` offset.
- [ ] `eventStatus` ∈ {`EventScheduled`, `EventPostponed`, `EventCancelled`, `EventRescheduled`}.
- [ ] Postponed/Rescheduled events include `previousStartDate`.
- [ ] `location.@type = Place` with `address.streetAddress`, `addressLocality`, `postalCode`, `addressCountry`.
- [ ] `offers.@type = Offer` with `price`, `priceCurrency = GBP`, `availability ∈ schema.org/InStock|SoldOut|PreOrder|LimitedAvailability|Discontinued`, `itemCondition = schema.org/NewCondition`, `category`, `validThrough = endDate`, `url`.
- [ ] `image` resolves to `/og/events/:slug.jpg`.
- [ ] Cancelled event → noindex + excluded from sitemap.

## Recurring-page guard

`/pura-nights`, `/schedule`, `/salsa-classes-chiswick`, `/salsa-classes-ealing`, `/bachata-classes-chiswick`, `/bachata-classes-ealing`, `/dance-classes-chiswick`, `/dance-classes-ealing`:

- [ ] **No** `@type: Event` markup anywhere on the page (auto-validated by `scripts/seo-qa.ts`).

## Validation tooling

```bash
bun run seo:check       # schema + canonical host + Event guard
bun scripts/crawl-graph.ts   # depth ≤3, inbound/outbound ≥2
```

External tools: Google Rich Results Test, Schema Markup Validator, GSC URL Inspection.
