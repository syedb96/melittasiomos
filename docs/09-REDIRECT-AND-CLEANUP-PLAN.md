# Redirect & Cleanup Plan — Melitta Siomos / Pura Nights

---

## Domain Strategy

| Domain | Role | Action |
|--------|------|--------|
| `puranights.com` | **Primary** | All canonicals point here. Main Wix site. |
| `melittasiomos.com` | Secondary / personal brand | 301 redirect to `puranights.com` OR use as a personal landing page that links to Pura Nights. |

> **Decision needed**: If both domains are live with independent content, choose one as primary and redirect or canonicalise the other. Split domains dilute SEO equity.

---

## Legacy Wix URL Redirects

These are common Wix default or old URLs that may still be indexed.

| Old URL Pattern | Redirect To | Type |
|----------------|------------|------|
| `/classes` | `/pura-nights` | 301 |
| `/book-online` | `/bookings` | 301 |
| `/book-now` | `/bookings` | 301 |
| `/teachers` | `/about` | 301 |
| `/team` | `/about` | 301 |
| `/pricing` | `/prices` | 301 |
| `/class-schedule` | `/schedule` | 301 |
| `/wedding-first-dance` | `/wedding-dance` | 301 |
| `/salsa-classes` | `/salsa-classes-london` | 301 |
| `/bachata-classes` | `/bachata-classes-london` | 301 |
| `/1-to-1` | `/private-lessons` | 301 |
| `/private-classes` | `/private-lessons` | 301 |
| Any Wix numeric page (e.g. `/page/1234`) | Nearest equivalent | 301 |

**Wix implementation**: Dashboard → Marketing & SEO → URL Redirect Manager

---

## Content Cleanup Tasks

### Pages to POLISH

| Page | Issue | Fix |
|------|-------|-----|
| `/prices` | May still show legacy Bronze/Silver/Gold packages or "1-2-1 prices" | Remove legacy structures. Standardise to current pricing. |
| `/about` | H1 may not include "Melitta Siomos" | Update H1 to include founder name. |
| `/blog` (index) | Category tabs may show "Posts Coming Soon" for empty categories | Populate or hide empty categories. |

### Stale References to Remove Everywhere

| Stale Term | Correct Term |
|-----------|-------------|
| "Drayton Manor Hotel" | "The Drayton Court Hotel" |
| "Drayton Manor" | "The Drayton Court Hotel" |
| "George Pub" | "The George IV" |
| "Chiswick George Pub" | "The George IV, Chiswick" |
| "Warren Street" | REMOVE (legacy venue) |
| "Fitness First" | REMOVE (legacy venue) |
| "Tottenham Court" | REMOVE (legacy venue) |
| "W1T" | REMOVE (legacy postcode) |
| "Central London" as weekly class location | REMOVE as weekly positioning |

### Blog Cleanup

| Issue | Action |
|-------|--------|
| Empty category pages | Hide from navigation or populate |
| "Posts Coming Soon" text | Remove or replace with actual content |
| Posts under 600 words | Expand to 600+ words minimum |

---

## Noindex Candidates

| Page | Reason | Action |
|------|--------|--------|
| `/login` | Admin-only | `noindex, nofollow` |
| `/admin/*` | Admin-only | `noindex, nofollow` |
| `/bookings` | Redirect page | `noindex, follow` |
| Empty blog categories | No content value | `noindex` or hide |

---

## Canonical Tags

Every page must have a self-referencing canonical tag:
```html
<link rel="canonical" href="https://www.puranights.com{path}" />
```

- All canonicals use `www.puranights.com`
- No trailing slashes
- No query parameters in canonicals
- Blog posts canonical to their own URL (not category)

---

## Wix SEO Settings Checklist

For each page in Wix Editor:
- [ ] Page title set (≤60 chars, includes primary keyword)
- [ ] Meta description set (≤160 chars, includes CTA language)
- [ ] URL slug set (matches slug map)
- [ ] Canonical tag set (self-referencing)
- [ ] OG title and description set
- [ ] OG image set (1200×630)
- [ ] Schema markup added (via Wix SEO patterns or custom code)
- [ ] H1 contains primary keyword
- [ ] Index/noindex set correctly

---

## Sitemap & Indexing Governance (added v9.2)

**Canonical host: `https://www.puranights.com` (www).**
- All sitemap `<loc>` entries, `rel=canonical` tags, internal links, and OG URLs MUST use the `www` subdomain.
- Apex `puranights.com` MUST 301-redirect to `www.puranights.com` at the host/DNS level (configure in Wix domain settings on migration).
- Never mix www and apex across sitemap / canonical / internal-link signals — Google treats them as conflicting canonical hints.

**Google Search Console submissions:**
- Submit ONLY `https://www.puranights.com/sitemap.xml`.
- Do NOT submit individual page URLs (e.g. `/about`, `/events`, `/prices`) as "sitemaps" — they are pages, not sitemap files. Delete any such legacy submissions in GSC → Sitemaps.
- `robots.txt` already references the sitemap via `Sitemap: https://www.puranights.com/sitemap.xml`.

**Event schema rule:**
- `Event` JSON-LD is reserved for true single-event pages (a specific dated instance with its own URL).
- Recurring weekly class/schedule pages (`/pura-nights`, `/schedule`, venue pages) MUST NOT emit `Event` schema — they fall back to the global `DanceSchool` / `LocalBusiness` schema.
- Any future `Event` markup must include: `startDate` (ISO-8601), `endDate`, `location`, `organizer`, `offers.url`, `offers.price`, `offers.priceCurrency`, `offers.availability`, `image`, `eventStatus`.
