# Master Sitemap & Slug Map — Melitta Siomos / Pura Nights

> **Doctrine**: Lovable = prototype + content engine. Wix = production site + CMS.
> Slugs below are the canonical production targets for Wix.

---

## Brand Hierarchy

| Level | Brand | Role |
|-------|-------|------|
| Master | **Melitta Siomos** | Personal authority, founder credibility |
| Primary | **Pura Nights** | Weekly classes, community, social dancing |
| Performance | **Pura Ladies** | Aspirational team, shows, performance arm |
| Specialist | **Wedding Dance Made Easy** | Premium wedding offer |

---

## Core Brand Pages

| # | Slug | Page Title (≤60 chars) | Status | Source File |
|---|------|------------------------|--------|-------------|
| 1 | `/` | Salsa & Bachata Classes West London — Pura Nights | KEEP | `src/pages/Index.tsx` |
| 2 | `/about` | About Melitta Siomos — Award-Winning Dance Instructor | POLISH | `src/pages/About.tsx` |
| 3 | `/pura-nights` | Pura Nights — Weekly Salsa & Bachata, West London | KEEP | `src/pages/PuraNights.tsx` |
| 4 | `/pura-ladies` | Pura Ladies — Latin Performance Team London | KEEP | `src/pages/PuraLadies.tsx` |
| 5 | `/wedding-dance` | Wedding Dance Lessons London — First Dance Made Easy | KEEP | `src/pages/WeddingDance.tsx` |
| 6 | `/private-lessons` | Private Salsa & Bachata Lessons — Enquire Now | KEEP | `src/pages/PrivateLessons.tsx` |
| 7 | `/online-classes` | Online Salsa & Bachata Classes — Live & On Demand | KEEP | `src/pages/OnlineClasses.tsx` |
| 8 | `/prices` | Class Prices & Bundles — Pura Nights London | POLISH | `src/pages/Prices.tsx` |
| 9 | `/schedule` | Weekly Class Schedule — Monday & Tuesday | KEEP | `src/pages/Schedule.tsx` |
| 10 | `/events` | Latin Dance Events London — Pura Nights | KEEP | `src/pages/Events.tsx` |
| 11 | `/gallery` | Gallery — Pura Nights Dance School | KEEP | `src/pages/Gallery.tsx` |
| 12 | `/testimonials` | Student Reviews — Pura Nights London | KEEP | `src/pages/Testimonials.tsx` |
| 13 | `/contact` | Contact Melitta — Pura Nights London | KEEP | `src/pages/Contact.tsx` |
| 14 | `/faq` | Frequently Asked Questions — Pura Nights | KEEP | `src/pages/FAQ.tsx` |
| 15 | `/start-here` | New to Dancing? Start Here — Pura Nights | KEEP | `src/pages/StartHere.tsx` |
| 16 | `/community` | The Pura Nights Community — Join the Family | KEEP | `src/pages/Community.tsx` |
| 17 | `/locations` | Class Locations — Chiswick & Ealing | KEEP | `src/pages/Locations.tsx` |
| 18 | `/gift-vouchers` | Dance Class Gift Vouchers — From £25 | KEEP | `src/pages/GiftVouchers.tsx` |
| 19 | `/beginners` | Beginner Salsa & Bachata Classes London | KEEP | `src/pages/Beginners.tsx` |
| 20 | `/blog` | Blog — Salsa, Bachata & Dance Life in London | KEEP | `src/pages/Blog.tsx` |

## Venue Pages (NEW)

| # | Slug | Page Title | Status | Source File |
|---|------|-----------|--------|-------------|
| 21 | `/venue/the-george-iv-chiswick` | The George IV Chiswick — Monday Classes | NEW | `src/pages/venue/TheGeorgeIVChiswick.tsx` |
| 22 | `/venue/the-drayton-court-ealing` | The Drayton Court Hotel Ealing — Tuesday Classes | NEW | `src/pages/venue/TheDraytonCourtEaling.tsx` |

## Local SEO Pages

| # | Slug | Intent | Status |
|---|------|--------|--------|
| 23 | `/salsa-classes-london` | Broad salsa London | KEEP |
| 24 | `/bachata-classes-london` | Broad bachata London | KEEP |
| 25 | `/salsa-classes-chiswick` | Local Chiswick salsa | KEEP |
| 26 | `/bachata-classes-chiswick` | Local Chiswick bachata | KEEP |
| 27 | `/salsa-classes-ealing` | Local Ealing salsa | KEEP |
| 28 | `/bachata-classes-ealing` | Local Ealing bachata | KEEP |
| 29 | `/salsa-classes-acton` | Local Acton salsa | KEEP |
| 30 | `/dance-classes-ealing` | Umbrella Ealing dance | KEEP |
| 31 | `/dance-classes-chiswick` | Umbrella Chiswick dance | KEEP |
| 32 | `/dance-classes-west-london` | Umbrella West London | KEEP |
| 33 | `/dance-classes-south-west-london` | Umbrella SW London | KEEP |
| 34 | `/salsa-classes-south-west-london` | SW London salsa | KEEP |
| 35 | `/bachata-classes-south-west-london` | SW London bachata | KEEP |
| 36 | `/bachata-classes-west-london` | West London bachata | KEEP |
| 37 | `/latin-dance-classes-london` | Broad Latin dance | KEEP |
| 38 | `/wedding-dance-west-london` | Local wedding dance | KEEP |
| 39 | `/wedding-dance-lessons-london` | Broad wedding lessons | KEEP |
| 40 | `/private-dance-lessons-west-london` | Local private lessons | KEEP |
| 41 | `/private-salsa-lessons-london` | Private salsa London | KEEP |
| 42 | `/ladies-styling-london` | Ladies styling niche | KEEP |
| 43 | `/bachata-performance-team-london` | Performance team niche | KEEP |

## Blog Posts (42 articles)

All under `/blog/{slug}`. See `docs/05-BLOG-INVENTORY.md` for full list.

## Utility / Legal

| Slug | Status |
|------|--------|
| `/privacy-policy` | KEEP |
| `/terms` | KEEP |
| `/login` | KEEP (admin only) |
| `/bookings` | KEEP (redirect to Linktree) |
| `/admin/*` | KEEP (protected, not public) |

---

## Slug Rules for Wix Migration

1. Keep slugs short — max 4-5 words
2. Use plain English with hyphens
3. One clear keyword intent per page
4. No dates in evergreen pages
5. No vanity slugs that say nothing
6. If a live page has backlinks, keep the slug and improve the page
7. Wix: edit slug in Page Settings → SEO → URL slug

---

## Redirect Map (Legacy → Current)

| Old Pattern | New Target | Type |
|-------------|-----------|------|
| `/classes` (Wix legacy) | `/pura-nights` | 301 |
| `/book-online` (Wix legacy) | `/bookings` | 301 |
| `/teachers` (Wix legacy) | `/about` | 301 |
| `/salsa-classes` (if exists) | `/salsa-classes-london` | 301 |
| `/bachata-classes` (if exists) | `/bachata-classes-london` | 301 |
| Any numeric Wix page IDs | Nearest equivalent | 301 |

> **Wix implementation**: Settings → Marketing & SEO → URL Redirect Manager

---

## Total Route Count: ~68 public + 7 admin = ~75 routes
