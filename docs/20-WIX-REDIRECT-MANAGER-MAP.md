# 20 — Wix Redirect Manager Map

> Wix Dashboard → **Marketing & SEO → URL Redirect Manager → New Redirect → Single Redirect → 301**.
> Apex `puranights.com` → `www.puranights.com` is handled at DNS / Wix Domains, not here.

| Old URL | New URL | Type | Reason |
|---|---|---|---|
| `/online-classes` | `/online-salsa-bachata-coaching` | 301 | Slug rename |
| `/classes` | `/pura-nights` | 301 | Brand consolidation |
| `/book-online` | `/bookings` | 301 | Canonical booking hub |
| `/book-now` | `/bookings` | 301 | Canonical booking hub |
| `/teachers` | `/meet-the-team` | 301 | Renamed |
| `/team` | `/meet-the-team` | 301 | Renamed |
| `/pricing` | `/prices` | 301 | Slug normalisation |
| `/class-schedule` | `/schedule` | 301 | Slug normalisation |
| `/wedding-first-dance` | `/wedding-dance` | 301 | Brand consolidation |
| `/salsa-classes` | `/salsa-classes-london` | 301 | Geo-qualified canonical |
| `/bachata-classes` | `/bachata-classes-london` | 301 | Geo-qualified canonical |
| `/1-to-1` | `/private-lessons` | 301 | Brand consolidation |
| `/private-classes` | `/private-lessons` | 301 | Brand consolidation |
| `/store` | `/shop` | 301 | Wix Stores canonical |
| `/dancewear` | `/shop` | 301 | Wix Stores canonical |
| `/merch` | `/shop` | 301 | Wix Stores canonical |
| `/proof-centre` | `/testimonials` | 301 | Merged |
| `/all-pages-master` | `/` | 301 | Internal-only page |

## Apex → www

Wix Dashboard → **Settings → Domains** → set `www.puranights.com` as **Primary**. Wix auto-creates a 301 from apex.

## QA after import

1. Visit each old URL in incognito → expect single 301 hop to canonical.
2. GSC → **URL Inspection** on 3 sample old URLs → expect *Page with redirect*.
3. Run `curl -sI https://puranights.com` → expect `301` to `https://www.puranights.com/`.
