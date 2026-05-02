# 14 — Google Search Console Fix Guide (non-technical)

> Read this top to bottom. Do each step in order. Takes ~15 minutes.

## Step 1 — Clean up Sitemaps

1. Open **Google Search Console** → property `https://www.puranights.com`.
2. Left menu → **Sitemaps**.
3. You will see entries like `/about`, `/events`, `/prices`, `/private-lessons`, `/testimonials`, etc. **These are wrong** — they are pages, not sitemaps.
4. Click each one → **Remove sitemap**.
5. Add only: `sitemap.xml` → **Submit**.
6. Refresh after 1–2 minutes. You should see **Status: Success** and discovered URLs > 25.

## Step 2 — URL Inspection (priority pages)

Top → URL Inspection bar → paste each URL → if "URL is not on Google" → **Request indexing**.

Run these in order:
1. `https://www.puranights.com/`
2. `https://www.puranights.com/pura-nights`
3. `https://www.puranights.com/prices`
4. `https://www.puranights.com/events`
5. `https://www.puranights.com/salsa-classes-chiswick`
6. `https://www.puranights.com/bachata-classes-ealing`
7. `https://www.puranights.com/wedding-dance`
8. `https://www.puranights.com/testimonials`
9. `https://www.puranights.com/blog`

> Don't request indexing for `/admin/*`, `/login`, `/shop/*`, `/refer`, `/bookings`, or `/proof-centre`. They are intentionally noindex.

## Step 3 — Page Indexing report (what's normal)

Left menu → **Pages**. Don't panic at "not indexed" rows. These are **fine**:

| Status | When it's OK |
|---|---|
| **Page with redirect** | Legacy slugs like `/online-classes`, `/classes`, `/teachers` |
| **Excluded by 'noindex' tag** | `/admin/*`, `/login`, `/shop/*`, `/refer`, `/bookings`, `/proof-centre`, `/all-pages-master` |
| **Alternate page with proper canonical** | `puranights.com` apex pointing to `www.puranights.com` |

These are **not OK** — investigate:
- **Duplicate without user-selected canonical** → check the page's `<link rel="canonical">`.
- **Crawled — currently not indexed** → improve internal links to that page.
- **Soft 404** → check the page actually returns content.

## Step 4 — Enhancements → Events

Left menu → **Enhancements** → **Events**.

After the sitemap re-processes, the previous "Missing field 'startDate'" errors should drop to zero. They came from recurring weekly class pages that wrongly used Event schema. Those pages have been switched to `DanceSchool`/`LocalBusiness` schema. Only `/events/:slug` pages now emit Event schema, and each one has all required fields.

If errors persist after 7 days:
1. Click the error row → click an example URL.
2. Use **Test live URL** → **View tested page** → **More info** → **Structured data**.
3. Confirm `@type: Event` no longer appears. If it does, paste the URL into a Lovable message.

## Step 5 — Bing Webmaster Tools (optional, 5 min)

1. Sign in at `https://www.bing.com/webmasters`.
2. **Import from Google Search Console** (one click).
3. Submit sitemap: `https://www.puranights.com/sitemap.xml`.

## What you should NOT do

- ❌ Do not submit individual page URLs as sitemaps.
- ❌ Do not request indexing for noindex pages — Google ignores them anyway.
- ❌ Do not add the apex `puranights.com` as a separate property unless you are debugging redirects.
- ❌ Do not edit `robots.txt` in Wix without checking with the developer first.
