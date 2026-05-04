# 26 — Wix SEO Launch Checklist (plain-English, step-by-step)

> Pair with: `docs/16-WIX-MIGRATION-CHECKLIST.md` (build), `docs/20-WIX-REDIRECT-MANAGER-MAP.md` (redirects), `docs/22-WIX-MIGRATION-SEO-CHECKLIST.md` (schema), `docs/23-MANUAL-GSC-INDEXING-CONTROL-SHEET.md` (indexing), `docs/MIGRATION-WIX-INDEXING.md` (rule mapping).

---

## A. Before launch (do all of these on the Wix staging URL `xxx.wixsite.com/...`)

### Domain & host
- [ ] Wix Dashboard → **Settings → Domains** → connect `puranights.com`
- [ ] Set **primary domain = `www.puranights.com`**
- [ ] Toggle **"Redirect non-www to www" = ON** (apex 301 → www)
- [ ] Confirm SSL certificate active for both apex and www

### Sitemap & robots
- [ ] Wix auto-generates `/sitemap.xml` — confirm it loads at https://www.puranights.com/sitemap.xml after domain switch
- [ ] **SEO Tools → Robots.txt Editor** → confirm:
  - `User-agent: *`
  - `Allow: /`
  - `Disallow: /admin`
  - `Sitemap: https://www.puranights.com/sitemap.xml`

### Redirects
- [ ] Open `docs/20-WIX-REDIRECT-MANAGER-MAP.md`
- [ ] **SEO Tools → URL Redirect Manager** → import every old → new URL pair
- [ ] Test 5 sample redirects in an incognito tab

### Indexing rules per page
For every page in Wix Editor, click the page → **SEO Basics**:
- [ ] **Tier 1** pages: "Let search engines index this page" = ON, "Show in sitemap" = ON
- [ ] **Tier 2** pages: same
- [ ] **Tier 3** (shop, lookbook, refer, all-pages-master, login, admin/*): "Let search engines index" = OFF, "Show in sitemap" = OFF

### Meta titles & descriptions
- [ ] Page-by-page: title ≤60 chars, description ≤160 chars, primary keyword in first 60 chars of title
- [ ] Confirm one H1 per page

### Canonical URLs
- [ ] **SEO → Page → Advanced SEO → Canonical URL** → leave blank to inherit auto-canonical, EXCEPT on dynamic event pages where you may want to pin the canonical to the latest instance

### Structured data (Custom Code → Head, scoped per page)
- [ ] Global: `Organization`, `WebSite` with `SearchAction`, `BreadcrumbList`
- [ ] Local pages + venues: `LocalBusiness` / `Place`
- [ ] `/blog/:slug`: `Article`
- [ ] `/events/:slug`: `Event` (copy from `src/data/events.ts → buildEventSchema`)
- [ ] FAQ pages: `FAQPage`
- [ ] **DO NOT** add Event schema on `/pura-nights`, `/schedule`, or any `*-classes-*` recurring page

### Forms
- [ ] Contact form → notifications → hello@puranights.com
- [ ] Wedding / Privates → email + WhatsApp link
- [ ] Newsletter → connected to Mailchimp main list
- [ ] Test every form on staging

### Search engine accounts
- [ ] **Google Search Console** → add Domain property `puranights.com` → verify via DNS TXT
- [ ] **Bing Webmaster Tools** → "Import from GSC" once GSC is verified

---

## B. Launch day

### DNS switch
- [ ] Update nameservers / A-records to point at Wix
- [ ] Wait for SSL to provision (up to 1 hour)

### Smoke test (incognito tab)
- [ ] https://puranights.com → 301 to https://www.puranights.com
- [ ] https://www.puranights.com → 200 OK
- [ ] https://www.puranights.com/sitemap.xml → 200 OK, lists ~29 URLs
- [ ] https://www.puranights.com/robots.txt → 200 OK, contains sitemap line
- [ ] /pura-nights → 200, correct schema (View Source → search "Event")
- [ ] /salsa-classes-chiswick → 200, correct schema, NO Event schema
- [ ] /events → 200, correct schema, ItemList
- [ ] /events/[next-latin-friday-slug] → 200, correct Event schema with `startDate`
- [ ] /wedding-dance → 200, correct schema
- [ ] 5 sample redirects from doc 20 → 301 to correct new URLs

### Mobile + forms
- [ ] Open homepage on phone → header + sticky CTA + WhatsApp button visible
- [ ] Submit contact form → email arrives at hello@puranights.com
- [ ] Click WhatsApp button → opens chat to 07449 482343
- [ ] Click Linktree CTA → loads https://linktr.ee/pura.nights

### GSC submission
- [ ] **GSC → Sitemaps** → DELETE every old "page-as-sitemap" entry
- [ ] **GSC → Sitemaps** → submit ONE entry: `https://www.puranights.com/sitemap.xml`
- [ ] **GSC → URL Inspection** → request indexing on all 12 Tier 1 URLs from `docs/23` (one at a time, max 10/day)
- [ ] **Bing → Sitemaps** → submit `https://www.puranights.com/sitemap.xml`

---

## C. After launch (first 14 days)

### Daily (5 min)
- [ ] GSC → **Indexing → Pages** → check for new errors
- [ ] GSC → **Enhancements → Events** → must stay 0 errors
- [ ] GSC → **Coverage** → impressions trending up

### Weekly (15 min, Monday)
- [ ] GSC → **Performance → 7-day** → top queries
- [ ] Inspect any new "Crawled — currently not indexed" page → apply fixes from `docs/23`
- [ ] Run backlink outreach: 3 emails from `docs/21` table

### Monthly
- [ ] Refresh top 5 organic landing pages: new H2, new internal link, updated `dateModified`
- [ ] Promote/demote pages between tiers in `docs/23`
- [ ] Review Google Business Profile posts (3 across 3 profiles)

---

## D. Rules for the launch operator (do NOT)

- ❌ Submit page URLs as "sitemaps" in GSC. Only `https://www.puranights.com/sitemap.xml`.
- ❌ Use the Google Indexing API for normal pages. Only sitemap + URL Inspection.
- ❌ Remove `noindex` from shop / lookbook / refer until production-ready.
- ❌ Add Event schema to recurring class pages.
- ❌ Re-request indexing on the same URL more than once per 7 days.
- ❌ Ignore "Crawled — currently not indexed" — fix the page, then re-request.
- ❌ Switch the primary domain to apex. Always www.

---

## E. Pre-flight final checklist

- [ ] `bun run seo:check` passes (zero errors)
- [ ] `bun run seo:graph` passes
- [ ] All redirects from `docs/20` imported in Wix
- [ ] Primary domain = www
- [ ] Robots.txt includes sitemap line
- [ ] No Event schema on recurring pages
- [ ] Shop pages noindex
- [ ] Lighthouse SEO ≥ 95 on 5 sample pages
- [ ] GSC sitemap submitted (only the .xml)
- [ ] Bing sitemap submitted
- [ ] Tier 1 manually inspected and indexing requested
