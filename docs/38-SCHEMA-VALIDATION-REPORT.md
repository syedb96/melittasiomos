# Schema Validation Report — 2026-05-19

Source: static scan of `src/pages/**.tsx` + `src/components/SeoHead.tsx`.

## Schema coverage
- `Article` — 38
- `BreadcrumbList (auto)` — 1
- `Course` — 3
- `FAQPage` — 1
- `LocalBusiness/DanceSchool (sitewide)` — 1
- `Organization` — 1
- `Person` — 5
- `Schedule` — 1
- `Service` — 2

## Errors (0)
_None._

## Warnings (0)
_None._

## Notes
- `LocalBusiness/DanceSchool` schema is injected on every route by `SeoHead.tsx` (`globalSchema`). It includes Organization fields (name, url, telephone, address, sameAs, founder).
- `BreadcrumbList` is auto-emitted for every non-root path via `getAutoBreadcrumbs` + `buildBreadcrumbSchema` in `SeoHead.tsx`.
- Blog posts override the global schema with `Article` (Person author, Organization publisher, datePublished).
- Single events emit `Event` schema with offers, validated separately by `bun scripts/seo-qa.ts`.
