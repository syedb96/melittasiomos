# 27 — Wix Migration Dry-Run Report

> Single source of truth for replicating every Lovable route inside Wix without losing SEO, schema, or conversion behaviour.
> Canonical host: `https://www.puranights.com`. Apex `puranights.com` 301 → www at Wix Domain Settings.

## A. Implementation groups (build order in Wix)

1. **Static conversion pages** — `/`, `/pura-nights`, `/prices`, `/wedding-dance`, `/private-lessons`, `/about`, `/contact`, `/start-here`.
2. **Dynamic venue pages** (Wix CMS → "Venues" collection): `/venue/:slug`.
3. **Dynamic local SEO pages** (Wix CMS → "LocalAreas" collection): `/salsa-classes-*`, `/bachata-classes-*`, `/dance-classes-*`, `/latin-dance-*`, `/private-*`, `/wedding-dance-*`, `/ladies-styling-london`, `/bachata-performance-team-london`.
4. **Dynamic event pages** (Wix Events or "Events" CMS collection): `/events`, `/events/:slug`.
5. **Blog** (Wix Blog): `/blog`, `/blog/:slug`.
6. **Shop** (Wix Stores, soft-launch noindex): `/shop`, `/shop/:slug`, `/size-guide`, `/shipping-returns`, `/lookbook`, `/lookbook/:category`.
7. **Legal & utility**: `/privacy-policy`, `/cookie-policy`, `/terms`, `/thank-you`, `/login`, `/refer`, `/proof-centre`, `/all-pages-master`, `/admin/*`.
8. **Redirect-only routes** (Wix Redirect Manager — see docs/20).

## B. Route × Wix mapping

| Lovable Route | Wix Target URL | Page Type | Static/Dynamic | CMS Collection | SEO Title source | Meta Description source | Canonical | Schema | Redirect | Index | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | `/` | STATIC PAGE | Static | — | Page SEO | Page SEO | self | DanceSchool + LocalBusiness + WebSite | — | INDEX | Primary hub |
| `/pura-nights` | `/pura-nights` | STATIC PAGE | Static | — | Page SEO | Page SEO | self | DanceSchool + FAQPage | — | INDEX | NO Event schema (recurring) |
| `/prices` | `/prices` | STATIC PAGE | Static | — | Page SEO | Page SEO | self | Service + Offer | — | INDEX | Conversion hub |
| `/events` | `/events` | STATIC PAGE | Static (lists CMS) | reads Events | Page SEO | Page SEO | self | ItemList | — | INDEX | NO Event schema on the hub itself |
| `/events/:slug` | `/events/:slug` | WIX EVENT PAGE | Dynamic | Events | CMS field `seo_title` | CMS field `seo_description` | self | Event (full Offer set) | — | INDEX (only future, non-cancelled) | Cancelled → noindex + sitemap exclude via Velo |
| `/contact` | `/contact` | STATIC PAGE | Static | — | Page SEO | Page SEO | self | ContactPage | — | INDEX | Wix Forms |
| `/about`, `/meet-the-team` | same | STATIC PAGE | Static | reads Team | Page SEO | Page SEO | self | Organization + Person[] | — | INDEX | |
| `/wedding-dance` | `/wedding-dance` | STATIC PAGE | Static | — | Page SEO | Page SEO | self | Service + FAQPage | — | INDEX | Enquiry-only, no public price |
| `/private-lessons` | `/private-lessons` | STATIC PAGE | Static | — | Page SEO | Page SEO | self | Service | — | INDEX | Enquiry-only |
| `/online-salsa-bachata-coaching` | same | STATIC PAGE | Static | — | Page SEO | Page SEO | self | Service | — | INDEX | Canonical online page |
| `/online-classes` | — | REDIRECT ONLY | — | — | — | — | — | — | **301 → /online-salsa-bachata-coaching** | NOINDEX | Legacy URL |
| `/online-academy` | `/online-academy` | STATIC PAGE | Static | — | Page SEO | Page SEO | self | Course | — | INDEX (flip OFF until launch if needed) | |
| `/start-here` | same | STATIC PAGE | Static | — | Page SEO | Page SEO | self | Article | — | INDEX | First-timer hub |
| `/beginners` | same | STATIC PAGE | Static | — | Page SEO | Page SEO | self | Article | — | INDEX | |
| `/schedule` | same | STATIC PAGE | Static | — | Page SEO | Page SEO | self | DanceSchool only | — | INDEX | NO Event schema |
| `/locations` | same | STATIC PAGE | Static | reads Venues | Page SEO | Page SEO | self | ItemList | — | INDEX | |
| `/venue/the-drayton-court-ealing` | `/venue/the-drayton-court-ealing` | DYNAMIC PAGE | Dynamic | Venues | CMS | CMS | self | LocalBusiness + Place | — | INDEX | |
| `/venue/the-george-iv-chiswick` | same | DYNAMIC PAGE | Dynamic | Venues | CMS | CMS | self | LocalBusiness + Place | — | INDEX | |
| `/salsa-classes-chiswick` | same | DYNAMIC PAGE | Dynamic | LocalAreas | CMS | CMS | self | Service + FAQPage | — | INDEX | |
| `/salsa-classes-ealing` | same | DYNAMIC PAGE | Dynamic | LocalAreas | CMS | CMS | self | Service + FAQPage | — | INDEX | |
| `/salsa-classes-acton` | same | DYNAMIC PAGE | Dynamic | LocalAreas | CMS | CMS | self | Service + FAQPage | — | INDEX | **Canonical Acton page** |
| `/salsa-classes-acton-local` | — | REDIRECT ONLY | — | — | — | — | — | — | **301 → /salsa-classes-acton** | NOINDEX | Duplicate-intent dedupe |
| `/salsa-classes-london`, `/bachata-classes-london`, `/latin-dance-classes-london` | same | DYNAMIC PAGE | Dynamic | LocalAreas | CMS | CMS | self | Service + FAQPage | — | INDEX | |
| `/salsa-classes-fulham`, `-hammersmith`, `-richmond`, `-south-west-london`, `/bachata-classes-west-london`, `/bachata-classes-south-west-london`, `/dance-classes-west-london`, `/dance-classes-south-west-london`, `/dance-classes-chiswick`, `/dance-classes-ealing`, `/latin-dance-chiswick`, `/latin-dance-ealing`, `/bachata-classes-chiswick`, `/bachata-classes-ealing` | same | DYNAMIC PAGE | Dynamic | LocalAreas | CMS | CMS | self | Service + FAQPage | — | INDEX | |
| `/dance-classes-hounslow` | same | DYNAMIC PAGE | Dynamic | LocalAreas | CMS | CMS | self | Service + FAQPage | — | INDEX | Travel-context page; thin-content guard handled in copy |
| `/wedding-dance-london`, `/wedding-dance-west-london`, `/wedding-dance-lessons-london` | same | DYNAMIC PAGE | Dynamic | LocalAreas | CMS | CMS | self | Service | — | INDEX | |
| `/private-salsa-lessons-london`, `/private-dance-lessons-west-london` | same | DYNAMIC PAGE | Dynamic | LocalAreas | CMS | CMS | self | Service | — | INDEX | |
| `/ladies-styling-london`, `/bachata-performance-team-london`, `/pura-ladies` | same | STATIC/DYNAMIC | Static | — | Page SEO | Page SEO | self | Service | — | INDEX | |
| `/learn/salsa-bachata-guide`, `/learn/salsa-vs-bachata` | same | STATIC PAGE | Static | — | Page SEO | Page SEO | self | Article | — | INDEX | Pillar |
| `/blog` | same | WIX BLOG PAGE | Dynamic | Blog | Page SEO | Page SEO | self | Blog | — | INDEX | |
| `/blog/:slug` | same | WIX BLOG PAGE | Dynamic | BlogPosts | Post field | Post field | self | Article + BreadcrumbList | — | INDEX | |
| `/faq`, `/testimonials`, `/gallery`, `/community`, `/gift-vouchers`, `/bookings` | same | STATIC PAGE | Static | — | Page SEO | Page SEO | self | per-page (FAQPage / ItemList) | — | INDEX (`/bookings` NOINDEX — Linktree pass-through) | |
| `/proof-centre` | — | REDIRECT ONLY | — | — | — | — | — | — | **301 → /testimonials** | NOINDEX | Merged |
| `/all-pages-master` | — | DO NOT MIGRATE | — | — | — | — | — | — | optional 301 → `/` | NOINDEX | Internal QA only |
| `/refer` | `/refer` | NOINDEX PAGE | Static | — | Page SEO | Page SEO | self | — | — | NOINDEX | Members link only |
| `/shop`, `/shop/:slug`, `/size-guide`, `/shipping-returns`, `/lookbook`, `/lookbook/:category` | same | WIX STORES PAGE | Static + Stores | Stores | Page SEO | Page SEO | self | Product / FAQPage (slug pages) | — | NOINDEX (soft-launch) | Flip ON post photography |
| `/login`, `/admin/*` | Wix Members area | DO NOT MIGRATE | — | — | — | — | — | — | — | NOINDEX | Velo-only |
| `/privacy-policy`, `/cookie-policy`, `/terms`, `/thank-you`, `/not-found` (404) | same | STATIC PAGE | Static | — | Page SEO | Page SEO | self | — | — | INDEX (legal) / NOINDEX (`/thank-you`, 404) | |

## C. Wix implementation rules

- **Meta title / description**: Wix → Page → SEO Basics. Use the same strings present in `<SeoHead title=... description=...>`.
- **Canonical**: leave Wix auto-canonical for static pages. For dynamic pages set Page → SEO → Advanced → Canonical = `{$item.url}` so each event/local page self-references.
- **Custom JSON-LD**: Wix → SEO → Structured Data Markup → "Add new". Paste the schema object emitted by `SeoHead.tsx` for that route. Use Velo `wixSeo.setStructuredData()` only for dynamic pages where the field needs item interpolation (events, venues).
- **Repeaters**: use Wix Repeater bound to the relevant CMS collection for `RelatedPages`, `RelatedArticles`, `Locations`, `EventsList`.
- **Pro Gallery**: `/gallery`, `/lookbook/:category`, venue pages.
- **Wix Stores**: `/shop`, `/shop/:slug`, `/size-guide`, `/shipping-returns`.
- **Wix Forms**: `/contact`, `/wedding-dance` enquiry, `/private-lessons` enquiry, lead-magnet forms. Always wire to the existing Supabase Edge Function or Wix Automations + email.
- **Wix Blog**: `/blog`, `/blog/:slug` — import each post manually; verify category, author = Melitta Siomos, datePublished, dateModified.
- **Wix Events**: `/events`, `/events/:slug` — one Wix Event per Latin Friday. Schema auto-generated; verify `startDate`, `endDate`, `location`, `offers.availability`, `offers.itemCondition`, `offers.category`, `offers.priceCurrency=GBP`.

## D. Recurring-page Event schema guard (CRITICAL)

The following pages must **never** emit `@type: Event` in Wix (mirrors `RECURRING_PAGES` in `scripts/seo-qa.ts`):

`/pura-nights`, `/schedule`, `/salsa-classes-chiswick`, `/salsa-classes-ealing`, `/bachata-classes-chiswick`, `/bachata-classes-ealing`, `/dance-classes-chiswick`, `/dance-classes-ealing`.

If you place a Wix Events List widget on any of these, disable its auto-injected JSON-LD via SEO → Page → Structured Data Markup → "Disable auto-generated Event schema for this page".

## E. Manual Wix actions after import

1. Apply redirects from docs/20.
2. Set primary domain = `www.puranights.com`, enable apex → www 301.
3. Add global `DanceSchool` + `LocalBusiness` JSON-LD at site level.
4. Submit `https://www.puranights.com/sitemap.xml` to GSC + Bing.
5. Run `seo:check`, `seo:graph`, Rich Results Test on a sample event + a recurring page (must show no Event markup).
