# Migration: Wix Indexing Replication

> Goal: when the site is rebuilt in Wix, every crawl/indexing rule from `docs/18`, `docs/19`, and `docs/13` continues to apply. This document maps each tier and rule to the exact Wix surface that enforces it.
> Canonical host: `https://www.puranights.com` (apex must 301 → www in Wix Domain Settings).

## A. Global host + canonical

| Lovable rule | Wix replication |
|---|---|
| Single canonical host (`www.puranights.com`) | **Settings → Domains** → set `www` as primary; turn ON "Redirect non-www to www". |
| `<link rel="canonical">` on every page | **Wix SEO → Page → Advanced SEO → Canonical URL** (one per page; leave blank to inherit auto-canonical, but set explicitly on `/events/:slug` and any duplicated content surface). |
| `<html lang="en-GB">` | **Site Languages** → primary = English (United Kingdom). |
| `og:site_name`, `og:locale`, `og:image` defaults | **Wix SEO Settings → Default Meta Tags**. |

## B. Sitemap + robots

| Lovable rule | Wix replication |
|---|---|
| `public/sitemap.xml` auto-generated, www only | Wix generates `/sitemap.xml` automatically. **Do NOT submit page URLs as sitemaps in GSC** (see `docs/14`). |
| `public/robots.txt` allowing major bots, disallow `/admin` | **SEO Tools → Robots.txt Editor** → mirror current rules. |
| Cancelled events excluded from sitemap | Wix Events: set status = "Cancelled" → exclude from sitemap via **CMS dynamic page → "Show in sitemap" rule**. |

## C. Tier 1 — request indexing immediately

Routes (mirror `docs/19`): `/`, `/pura-nights`, `/prices`, `/events`, `/wedding-dance`, `/private-lessons`, `/salsa-classes-chiswick`, `/bachata-classes-ealing`, `/dance-classes-west-london`, every future `/events/:slug`.

| Wix surface | Setting |
|---|---|
| Each Tier 1 page | **Page SEO → Let search engines index this page = ON**, **Show in sitemap = ON**, custom canonical = none (inherit). |
| Header (Main Menu) | Direct link to: `/pura-nights`, `/prices`, `/wedding-dance`, `/private-lessons`. **Depth = 1 click** from any page. |
| Homepage hero strip | CTA buttons → `/pura-nights`, `/prices`. |
| Homepage body | Mid-page modules link to `/wedding-dance`, `/private-lessons`. |
| Locations grid (homepage + footer) | Three Tier 1 local pages featured, others below. |
| Daily indexing queue | `bun scripts/gsc-indexing-queue.ts --submit` runs against these routes only. |

## D. Tier 2 — index naturally

| Wix surface | Setting |
|---|---|
| Page SEO | **Index = ON**, **Sitemap = ON**, no manual GSC submission. |
| Footer (Repeater) | All 18 local pages, both venues, blog, FAQ, testimonials, gallery. **Depth = 1 click** from any page. |
| RelatedPages component (Wix Repeater) | On every local + service page, filtered by `tag` field in CMS. Capped at 6 entries. |
| Blog dynamic page footer (BlogPostFooter) | Newsletter signup + RelatedArticles repeater (3 posts) + mid-CTA. |
| `/events` hub | Wix Events List widget filtered by `startDate >= today && status != Cancelled`, sorted ascending. |

## E. Tier 3 — noindex / excluded

| Route(s) | Wix setting |
|---|---|
| `/shop`, `/shop/:slug`, `/size-guide`, `/shipping-returns`, `/lookbook`, `/lookbook/:category` | **Page SEO → Index = OFF**, **Sitemap = OFF**, header/footer link only from "Shop" mega-nav (still functional, not crawled). |
| `/online-academy` | Index = OFF until launch. Flip ON when product live. |
| `/refer`, `/proof-centre`, `/all-pages-master` | Index = OFF. |
| `/admin/*`, `/login` | Wix Members area / Velet Velo only — not exposed as a CMS dynamic page. |
| `/bookings` | Index = OFF (Linktree pass-through). |
| `/online-classes` | Wix **URL Redirect Manager** → 301 to `/online-salsa-bachata-coaching`. |
| `/events/:slug` where status = Cancelled | Dynamic page rule: if `status == 'Cancelled'`, set `noindex` via **Wix Velo `wixSeo.setHints({ noIndex: true })`** in `onReady`. Also exclude from sitemap. |

## F. Schema replication

| Schema type | Lovable source | Wix replication |
|---|---|---|
| `DanceSchool` + `LocalBusiness` (global) | `SeoHead.tsx` `globalSchema` | **Wix SEO → Structured Data → Custom JSON-LD** at site level. Paste once. |
| `BreadcrumbList` | Auto from `SeoHead` | Wix auto-generates breadcrumb schema when **Breadcrumbs** element is on the page. |
| `Article` (blog) | Per blog page | Wix generates automatically for blog posts; verify `author`, `datePublished`, `dateModified`. |
| `FAQPage` | `/faq`, `/wedding-dance`, `/shop/:slug` | Add via **Custom Code → JSON-LD** snippet on each page. |
| `Event` (single dated event) | `/events/:slug` only | Wix Events generates Event schema automatically per event instance. **Verify `startDate`, `endDate`, `location`, `offers` are populated** in the Wix event editor. |

### Recurring-page Event guard

**RULE: Recurring schedule pages MUST NOT emit Event schema.** This is enforced in Lovable by `RECURRING_PAGES` in `scripts/seo-qa.ts`. In Wix:

| Page | Required Wix configuration |
|---|---|
| `/pura-nights`, `/schedule`, `/salsa-classes-*`, `/bachata-classes-*`, `/dance-classes-*` | **Do NOT add the Wix Events List widget with schema enabled.** Use a static section + link to `/events`. If you need an "upcoming events" preview, use the Events List widget but turn OFF the auto-injected JSON-LD via **Wix SEO → Page → Structured Data Markup → Disable auto-generated Event schema for this page**. |
| `/events/:slug` | Auto-generated Event schema = ON. Verify in **Rich Results Test** before promoting the URL. |

## G. Internal-link rules (mirror `docs/18`)

| Rule | Wix surface |
|---|---|
| Every indexable page reachable in ≤3 clicks from `/` | Header (depth 1 to all hubs) + Footer (depth 1 to all locals) + RelatedPages (depth 2 to siblings). |
| Inbound ≥2 per indexable page | Footer link (1) + Header or RelatedPages (2). |
| Outbound ≥2 per indexable page | Header (always) + Footer (always) + page-local CTAs. |
| ≥1 outbound to a conversion hub | Sticky CTA + footer "Book a class" repeater. |
| Conversion hubs | `/`, `/pura-nights`, `/prices`, `/contact`, `/wedding-dance`, `/private-lessons`, `/events`, `/bookings`, `/gift-vouchers`. |

## H. Validation post-cutover

Run inside Lovable before flipping DNS:

```bash
bun run seo:check       # schema, host, orphan checks
bun scripts/crawl-graph.ts   # depth ≤3, inbound/outbound ≥2, conversion path present
```

After Wix is live:

1. Verify `https://www.puranights.com/sitemap.xml` returns 200, valid XML, www host only.
2. Verify `https://puranights.com/` 301s to `https://www.puranights.com/`.
3. Submit Tier 1 in GSC URL Inspection → Request Indexing (≤10/day).
4. Run **Rich Results Test** on one `/events/:slug` and confirm `Event` validates with `startDate`, `endDate`, `location`, `offers`.
5. Run **Rich Results Test** on `/pura-nights` and confirm there is **no** `Event` markup.
6. Confirm GSC **Coverage** shows zero new errors after 7 days.

## I. Operational tooling carried over

- `scripts/gsc-indexing-queue.ts` — daily queue + Indexing API submission. Continues to work post-Wix; queue is computed from Tier 1 list, which is independent of the rendering platform.
- `scripts/crawl-graph.ts` — depth + link-rule validator. Re-run before any Wix structural change (menu rewrite, footer change, redirect addition) by exporting the Wix sitemap to a temporary file and re-pointing the script's route list at it.
