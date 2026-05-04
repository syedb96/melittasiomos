# 18 — Final GSC + SEO Deployment Audit

> Supersedes earlier crawl/architecture notes. This is the single deployment-readiness ledger.
> Canonical host: **https://www.puranights.com** (apex 301 → www).

## Status summary (auto-validated by `bun run seo:check`)

| Area | Status | Source of truth |
|---|---|---|
| Canonical host | ✅ www enforced everywhere | `scripts/seo-qa.ts` host guard |
| Sitemap | ✅ 22 static + 7 future single-event URLs | `public/sitemap.xml` (regenerated) |
| Robots | ✅ Allow all, Disallow `/admin`, sitemap line correct | `public/robots.txt` |
| Recurring-page Event schema | ✅ Forbidden on 7 pages | `RECURRING_PAGES` in seo-qa |
| Single-event JSON-LD | ✅ All required fields + Offer hygiene | `src/data/events.ts` + QA |
| Internal link orphans | ✅ All Tier 1/2 ≥2 inbound | `checkOrphans()` |

## Route ledger

| Route | In sitemap | Index | Schema | Action |
|---|---|---|---|---|
| `/` | ✅ | index | DanceSchool+LocalBusiness+WebSite+Breadcrumb | KEEP |
| `/about` | ✅ | index | DanceSchool+Person+Breadcrumb | KEEP |
| `/pura-nights` | ✅ | index | DanceSchool (NO Event) | KEEP |
| `/pura-ladies` | ✅ | index | Organization+Breadcrumb | KEEP |
| `/prices` | ✅ | index | Service+Offer+Breadcrumb | KEEP |
| `/events` | ✅ | index | ItemList of Event+Breadcrumb | KEEP |
| `/events/:slug` (8 entries, future only) | ✅ | index | Event (full) | KEEP |
| `/contact` | ✅ | index | ContactPage+Breadcrumb | KEEP |
| `/wedding-dance` | ✅ | index | Service+FAQPage | KEEP |
| `/private-lessons` | ✅ | index | Service+FAQPage | KEEP |
| `/gift-vouchers` | ✅ | index | Service | KEEP |
| `/gallery` | ✅ | index | ImageGallery | KEEP |
| `/testimonials` | ✅ | index | Review+ItemList | KEEP |
| `/faq` | ✅ | index | FAQPage | KEEP |
| `/blog` | ✅ | index | Blog | KEEP |
| `/blog/:slug` (×40) | ❌* | index | Article+Breadcrumb | KEEP — see note |
| `/start-here` | ✅ | index | WebPage | KEEP |
| `/locations` | ✅ | index | ItemList of Place | KEEP |
| `/online-salsa-bachata-coaching` | ✅ | index | Service | KEEP |
| `/online-academy` | ✅ | index | Course | KEEP |
| `/beginners` | ✅ | index | WebPage | KEEP |
| `/schedule` | ✅ | index | DanceSchool (NO Event) | KEEP |
| `/meet-the-team` | ✅ | index | ItemList of Person | KEEP |
| `/bookings` | ✅ | index | WebPage | KEEP |
| `/venue/:slug` (×2) | ❌* | index | Place+LocalBusiness | KEEP — see note |
| Local pages (salsa-/bachata-/dance-classes-…) | ❌* | index | Service+Breadcrumb | KEEP |
| `/online-classes` | ❌ | noindex+redirect | — | LEGACY 301 |
| `/refer` | ❌ | noindex | — | PRIVATE |
| `/proof-centre` | ❌ | noindex | — | MERGED → /testimonials |
| `/all-pages-master` | ❌ | noindex | — | INTERNAL |
| `/admin/*` | ❌ | noindex+disallowed | — | PRIVATE |
| `/login` | ❌ | noindex | — | PRIVATE |
| `/shop`, `/size-guide`, `/shipping-returns`, `/lookbook*` | ❌ | noindex | — | SOFT-LAUNCH |

*Sitemap currently lists hub pages only; deep blog/local/venue routes are reachable in ≤3 clicks from indexed hubs and link graph (Footer + RelatedPages + NextEventCallout). When Wix takes over, dynamic pages auto-generate their own sitemap entries via the Events/Venues collections.

## Manual GSC steps remaining

See `docs/19-GOOGLE-SEARCH-CONSOLE-LAUNCH-GUIDE.md`.
