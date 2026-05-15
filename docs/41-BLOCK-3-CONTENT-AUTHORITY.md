# 41 — Block 3: Content Authority (Shipped)

_Last updated: 2026-05-15 — Pura Nights buildout, Block 3 of 4._

## Goal
Drive organic, AI-search and high-intent revenue traffic by publishing 12 commercially aligned long-form posts. Every post is built to win a featured snippet, an AI Overview citation, or a high-intent transactional click into corporate / private / classes funnels.

## 12 New Posts Shipped

| Slug | Category | Intent → Funnel | CTA Variant |
|---|---|---|---|
| `/blog/shy-beginners-salsa-london` | Beginners | First class friction → `/start-here`, `/pura-nights` | `start` |
| `/blog/salsa-bachata-etiquette-guide` | Technique | Social retention → `/pura-nights` | `classes` |
| `/blog/how-to-make-friends-at-salsa-class` | Lifestyle | Community / retention → `/pura-nights`, `/events` | `classes` |
| `/blog/best-latin-social-dancing-london` | Events | Latin social intent → `/events`, `/latin-night-out-west-london` | `classes` |
| `/blog/after-work-dance-classes-london` | Lifestyle | Weeknight class intent → `/pura-nights`, `/prices` | `classes` |
| `/blog/date-night-dance-class-london` | Lifestyle | Couples privates → `/private-lessons` | `private` |
| `/blog/dance-classes-for-couples-london` | Lifestyle | Couples → `/private-lessons`, `/wedding-dance-london` | `private` |
| `/blog/anniversary-dance-lesson-london` | Lifestyle | Private lesson revenue → `/private-lessons` | `private` |
| `/blog/birthday-dance-class-london` | Events | Group party enquiry → `/private-group-dance-parties-london` | `classes` |
| `/blog/corporate-christmas-party-dance-london` | Events | Corporate enquiry (seasonal) → `/corporate-dance-classes-london` | `classes` |
| `/blog/build-confidence-on-dance-floor` | Beginners | Beginner retention → `/start-here`, `/private-lessons` | `start` |
| `/blog/salsa-bachata-bucket-list-london` | Culture | Brand authority + cross-link hub | `classes` |

## Per-Post Anatomy
Every post ships with:
- `Article` schema with `author` (Melitta Siomos), `publisher` (Pura Nights + logo), `datePublished`, `dateModified`, `mainEntityOfPage`, `inLanguage: en-GB`
- `FAQPage` schema with 3 Q&A entries (mainEntity array)
- `BreadcrumbList` schema (Home → Blog → Post)
- Reading progress bar
- Author card (Melitta Siomos)
- Social share buttons top + bottom
- 5–12 H2 sections, 700–1,500 words
- One mid-article `<BlogCTA>` strip (`start` / `classes` / `private` variant)
- 3 `<RelatedPages>` links to money pages
- Wix migration JSX comments (`<!-- WIX SECTION ... -->`) for 1:1 replication

## Wiring
- `src/App.tsx` — 12 new imports + 12 new routes added below existing blog block
- `src/pages/Blog.tsx` — 12 new entries added to `blogPosts` array (auto-categorised under existing Beginners / Technique / Lifestyle / Events / Culture filters; no new categories needed)
- `scripts/seo-qa.ts` auto-discovers new routes — sitemap regenerated to **121 URLs** (was 109)
- All routes resolve at `https://www.puranights.com/blog/{slug}`

## SEO Governance Preserved
- Canonical host: `https://www.puranights.com` on every post
- No `Event` schema on any blog post — `Article + FAQPage + BreadcrumbList` only
- All posts indexable; no admin/shop leakage
- H1 + first 100 words contain primary keyword on every post

## Revenue Funnel Map
| Funnel | Posts pointing in |
|---|---|
| `/corporate-dance-classes-london` | `corporate-christmas-party-dance-london`, `corporate-team-building-dance-london` (Block 2) |
| `/private-group-dance-parties-london` | `birthday-dance-class-london`, `hen-party-dance-ideas-london` (Block 2) |
| `/private-lessons` | `anniversary-dance-lesson-london`, `date-night-dance-class-london`, `dance-classes-for-couples-london`, `build-confidence-on-dance-floor` |
| `/wedding-dance-london` | `dance-classes-for-couples-london` |
| `/pura-nights` (classes) | `shy-beginners-salsa-london`, `after-work-dance-classes-london`, `how-to-make-friends-at-salsa-class`, `salsa-bachata-etiquette-guide`, `salsa-bachata-bucket-list-london` |
| `/events` + `/latin-night-out-west-london` | `best-latin-social-dancing-london`, `salsa-bachata-bucket-list-london` |
| `/start-here` | `shy-beginners-salsa-london`, `build-confidence-on-dance-floor` |

## What's Next (Block 4)
- Update docs 11, 16, 18, 20, 22, 27 with the 12 new blog routes + Wix CMS mapping
- Create `docs/42-PARTNER-BACKLINK-TOOLKIT.md` and `docs/43-GBP-REVIEWS-LOCAL-PACK-SYSTEM.md`
- Run `seo-qa`, `schema-validate`, `redirect-audit`, regenerate sitemap snapshot
- Final launch report
