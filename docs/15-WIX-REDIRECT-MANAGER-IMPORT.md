# 15 — Wix Redirect Manager Import

> **Where**: Wix Dashboard → **Marketing & SEO** → **URL Redirect Manager** → **New Redirect** → **Single Redirect** → enter old path and new path → set type to **301 Permanent** → Save.
>
> **Bulk option**: Wix supports CSV import on Business plans — copy the table below into a spreadsheet with columns `Old URL, New URL, Type` and upload.

## Domain-level (do this first, in Wix Domains, not URL Redirect Manager)

| From | To | Type | Reason |
|---|---|---|---|
| `https://puranights.com/*` | `https://www.puranights.com/*` | 301 | Canonical host = www |

## Legacy slug → current slug

| Old URL | New URL | Type | Reason |
|---|---|---|---|
| `/classes` | `/pura-nights` | 301 | Old Wix default |
| `/book-online` | `/bookings` | 301 | Renamed |
| `/book-now` | `/bookings` | 301 | Renamed |
| `/teachers` | `/about` | 301 | Founder-led brand |
| `/team` | `/meet-the-team` | 301 | New team page exists |
| `/pricing` | `/prices` | 301 | Slug consolidation |
| `/class-schedule` | `/schedule` | 301 | Slug consolidation |
| `/wedding-first-dance` | `/wedding-dance` | 301 | Slug consolidation |
| `/salsa-classes` | `/salsa-classes-london` | 301 | Local intent |
| `/bachata-classes` | `/bachata-classes-london` | 301 | Local intent |
| `/1-to-1` | `/private-lessons` | 301 | Slug consolidation |
| `/private-classes` | `/private-lessons` | 301 | Slug consolidation |
| `/online-classes` | `/online-salsa-bachata-coaching` | 301 | New canonical |
| `/store` | `/shop` | 301 | Wix Stores convention |
| `/dancewear` | `/shop` | 301 | Single shop hub |
| `/merch` | `/shop` | 301 | Single shop hub |
| `/proof-centre` | `/testimonials` | 301 | De-duplicated proof |
| `/refer-a-friend` | `/refer` | 301 | Slug shortened |

## Numeric/legacy Wix page IDs

Any old `/page/1234` or numeric Wix URLs Google has indexed → 301 to nearest equivalent. If unsure, send to `/`.

## QA after import

1. In Wix preview, type each old URL — confirm it lands on the new URL with status 301 (use browser devtools → Network tab).
2. Re-run GSC URL Inspection on 3 random old URLs to confirm Google sees the redirect.
3. Update any external backlinks (Linktree, Instagram bio) to point at the new URL directly.
