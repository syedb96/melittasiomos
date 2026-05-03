# 18 — Crawl Architecture Map

> Purpose: define how Googlebot flows through the site so every indexable URL sits ≤3 clicks from the homepage and feeds a conversion hub.
> Canonical host: `https://www.puranights.com`.

## 1. Entry points (where Google lands first)

| Tier | Page | Why it's an entry point |
|---|---|---|
| Brand | `/` | Brand search "Pura Nights", "Melitta Siomos" |
| Product | `/pura-nights` | Headline product, monthly Latin Friday |
| Service | `/wedding-dance` | High-intent commercial query |
| Service | `/private-lessons` | Local commercial query |
| Local | `/salsa-classes-chiswick` | Top local intent |
| Local | `/bachata-classes-ealing` | Top local intent |
| Local | `/dance-classes-west-london` | Wide-net regional |
| Authority | `/blog` | Topical pillar gateway |
| Authority | `/start-here` | Beginner intent gateway |

## 2. Crawl paths (designed)

```
Homepage
 ├─ Header nav (mega) → all hubs (depth 1)
 ├─ Hero CTA      → /pura-nights, /prices
 ├─ Mid sections  → /wedding-dance, /private-lessons, /pura-ladies
 ├─ Locations     → /salsa-classes-chiswick, /bachata-classes-ealing, /dance-classes-west-london
 ├─ Blog strip    → 3 freshest posts
 └─ Footer        → all 18 local pages, venues, services, blog, FAQ
```

Maximum depth from homepage to any indexable page: **3 clicks**.

| From | Hops | To |
|---|---|---|
| `/` | 1 | `/pura-nights`, `/prices`, `/wedding-dance`, `/private-lessons`, `/blog`, `/start-here`, all 18 locals (footer) |
| `/` | 2 | Any blog post, any venue page, `/events`, `/testimonials`, `/faq` |
| `/` | 3 | Any `/events/:slug`, any `/learn/:slug` pillar |

## 3. Dead-end audit

Definition: a page with <2 outbound internal links to other indexable URLs OR no link to a conversion hub.

| Page | Status | Action |
|---|---|---|
| All `/blog/*` | OK | Each has BlogPostFooter + RelatedArticles + mid-CTA |
| All local pages | OK | RelatedPages + footer + venue link |
| `/events/:slug` | OK | NextEventCallout + breadcrumb + back to `/events` |
| `/testimonials` | OK | Cross-links to `/contact`, `/wedding-dance`, `/pura-nights` |
| `/gallery` | Watch | Confirm CTA to `/pura-nights` + `/contact` is present |
| `/bookings` | noindex | Linktree hub — outbound only by design |

## 4. Orphan check

An orphan = indexable page reached from <2 other internal pages.

| Page | Inbound links (≥2 required) | Source |
|---|---|---|
| `/pura-nights` | 6+ | header, footer, homepage hero, blog posts, local pages |
| `/pura-ladies` | 4+ | header, footer, `/about`, `/community` |
| `/online-academy` | 2 | header (LEARN), footer | 
| `/online-salsa-bachata-coaching` | 3 | header, footer, `/online-academy` |
| `/meet-the-team` | 3 | header, footer, `/about` |
| `/start-here` | 5+ | header, footer, homepage, blog posts, FAQ |
| `/locations` | 3+ | header, footer, homepage |
| `/venue/the-george-iv-chiswick` | 4+ | `/locations`, all Chiswick locals, schedule |
| `/venue/the-drayton-court-ealing` | 4+ | `/locations`, all Ealing locals, schedule |
| `/learn/salsa-bachata-guide` | 2 | header (LEARN), `/blog` sidebar |
| `/learn/salsa-vs-bachata` | 2 | `/blog/salsa-vs-bachata`, `/learn/salsa-bachata-guide` |
| Each `/events/:slug` | 3+ | `/events`, `NextEventCallout` (recurring + relevant blog), `/pura-nights` |

Result: zero orphans. Validation automated in `scripts/seo-qa.ts` (link graph check).

## 5. Conversion link rule

Every indexable page must contain at least one outbound link to **one of**: `/pura-nights`, `/prices`, `/contact`, `/wedding-dance`, `/private-lessons`, `/events`, `/bookings`. Footer satisfies this globally; in-page contextual links are still preferred for ranking signal.

## 6. Authority + local rule

Every indexable page must contain ≥1 link to an authority hub (`/blog`, `/start-here`, `/faq`, `/testimonials`) AND ≥1 link to a local page or venue page. Footer + RelatedPages satisfies this; preserve when migrating to Wix.

## 7. Wix migration note

Recreate this graph in Wix using:
- **Header / Footer** → site-wide menus (depth 1).
- **RelatedPages** equivalent → Wix Repeater filtered by tag in CMS.
- **NextEventCallout** → Wix dynamic page widget filtering Events collection by `startDate >= now() && status != 'Cancelled'`.
- **BlogPostFooter** → Wix dynamic blog template footer block.
