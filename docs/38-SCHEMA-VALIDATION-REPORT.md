# Schema Validation Report — 2026-06-21

Source: static scan of `src/pages/**.tsx` + `src/components/SeoHead.tsx`.

## Schema coverage
- `Article` — 46
- `BreadcrumbList (auto)` — 1
- `Course` — 9
- `DanceSchool` — 4
- `FAQPage` — 3
- `LocalBusiness` — 4
- `LocalBusiness/DanceSchool (sitewide)` — 1
- `Organization` — 2
- `PerformingGroup` — 1
- `Schedule` — 1
- `Service` — 13
- `WebPage` — 5

## Errors (0)
_None._

## Warnings (1)
- ⚠️  `src/pages/FirstClassGuide.tsx` — schema literal has no @type

## Notes
- `LocalBusiness/DanceSchool` schema is injected on every route by `SeoHead.tsx` (`globalSchema`). It includes Organization fields (name, url, telephone, address, sameAs, founder).
- `BreadcrumbList` is auto-emitted for every non-root path via `getAutoBreadcrumbs` + `buildBreadcrumbSchema` in `SeoHead.tsx`.
- Blog posts override the global schema with `Article` (Person author, Organization publisher, datePublished).
- Single events emit `Event` schema with offers, validated separately by `bun scripts/seo-qa.ts`.
