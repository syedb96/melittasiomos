# 19 — Google Search Console Launch Guide (plain-English)

Property: **https://www.puranights.com** (Domain property recommended so apex + www + http variants all roll up).

## Step 1 — Delete bad sitemap submissions

In **Sitemaps**, remove every entry that is a normal page URL, including:

- `/about`
- `/events`
- `/prices`
- `/private-lessons`
- `/testimonials`
- `/gift-vouchers`
- anything else not ending in `.xml`

Click the row → ⋮ → **Remove sitemap**.

## Step 2 — Submit ONE sitemap

Add: `https://www.puranights.com/sitemap.xml`

Status should change to **Success** within 24h.

## Step 3 — URL Inspection (Tier 1, in this order)

1. `/`
2. `/pura-nights`
3. `/prices`
4. `/events`
5. `/salsa-classes-chiswick`
6. `/bachata-classes-ealing`
7. `/wedding-dance`
8. `/private-lessons`
9. `/testimonials`
10. `/blog`
11. `/venue/the-george-iv-chiswick`
12. `/venue/the-drayton-court-ealing`

For each: paste full URL → **Test live URL** → if ✅ click **Request Indexing**.

## Step 4 — Reading GSC statuses

**Normal — ignore:**
- *Page with redirect* (e.g. `/online-classes`)
- *Excluded by ‘noindex’ tag* (admin, shop soft-launch, refer)
- *Alternate page with proper canonical tag*

**Investigate:**
- *Duplicate without user-selected canonical* → confirm `<link rel="canonical">` resolves to www
- *Crawled — currently not indexed* → strengthen internal links; resubmit after a content update
- *Soft 404* → add real content / remove from sitemap
- *Blocked due to access forbidden (4xx)* → check route exists in `App.tsx`
- *Invalid Event* → confirm page is `/events/:slug`, not a recurring schedule page

## Step 5 — Bing Webmaster Tools

1. Go to bing.com/webmasters → **Import from GSC** (one click)
2. Verify the property
3. **Sitemaps** → submit `https://www.puranights.com/sitemap.xml`
4. **Site Explorer** → confirm canonical = www

## Step 6 — Weekly check (5 min)

- GSC → **Pages** → fix any new “Why pages aren’t indexed” entries
- GSC → **Enhancements → Events** → 0 errors required
- GSC → **Performance** → note top queries; feed into blog topics
