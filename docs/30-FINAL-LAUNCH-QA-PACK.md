# 30 — Final Launch QA Pack

> Single source of truth for the **manual** launch checks that cannot be automated from the repo.
> Owner: ____________   Launch date: ____________
> Canonical host: `https://www.puranights.com`

Fill in the **Result**, **Timestamp**, and **Evidence** columns as each check is completed.
Evidence = screenshot filename (drop into `/launch-evidence/`) or live URL.

---

## A. Sitemap submission

| # | Tool | Action | Expected | Result (✅/❌) | Timestamp (UTC) | Evidence |
|---|---|---|---|---|---|---|
| A1 | Google Search Console | Sitemaps → remove every entry that is a *page URL* (not `sitemap.xml`) | Only `sitemap.xml` listed | | | |
| A2 | Google Search Console | Submit `https://www.puranights.com/sitemap.xml` | Status: **Success**, 29 URLs discovered | | | |
| A3 | Bing Webmaster Tools | Import site from GSC OR add property `https://www.puranights.com` | Property verified | | | |
| A4 | Bing Webmaster Tools | Sitemaps → submit `https://www.puranights.com/sitemap.xml` | Status: **Success** | | | |
| A5 | IndexNow (Bing) | Optional — submit Tier 1 URLs via Bing's IndexNow form | Accepted | | | |

**Verification command** (run locally to confirm sitemap is reachable & well-formed):
```bash
curl -sI https://www.puranights.com/sitemap.xml | head -n1   # expect HTTP/2 200
curl -s  https://www.puranights.com/sitemap.xml | grep -c "<url>"  # expect 29
```

---

## B. Schema validation (Rich Results Test)

Run each URL through https://search.google.com/test/rich-results and https://validator.schema.org.

| # | URL | Expected primary schema | Must NOT contain | Result | Errors / Warnings | Evidence |
|---|---|---|---|---|---|---|
| B1 | `/events/latin-friday-2026-05-08` | `Event` (eligible for rich result) | — | | | |
| B2 | `/events/latin-friday-2026-06-12` | `Event` | — | | | |
| B3 | `/pura-nights` | `DanceSchool` / `LocalBusiness` | `@type: Event` ❌ | | | |
| B4 | `/schedule` | `LocalBusiness` | `@type: Event` ❌ | | | |
| B5 | `/salsa-classes-chiswick` | `Service` + `LocalBusiness` | `@type: Event` ❌ | | | |
| B6 | `/bachata-classes-ealing` | `Service` + `LocalBusiness` | `@type: Event` ❌ | | | |
| B7 | `/faq` | `FAQPage` | — | | | |
| B8 | `/about` | `Organization` + `BreadcrumbList` | — | | | |
| B9 | `/blog/salsa-vs-bachata` | `Article` + `BreadcrumbList` | — | | | |
| B10 | `/` | `Organization` + `WebSite` (with `SearchAction`) | — | | | |

**B-summary template** (paste under the table once B1–B10 are run):

```
Schema validation summary — <DATE>
- Tested: 10 URLs
- Pass: __ / 10
- Fail: __ / 10
- Recurring-page Event guard: HOLDING ✅ / BREACHED ❌
- New errors introduced since last run: ____
- Action items: ____
```

---

## C. Redirects (Wix URL Redirect Manager)

Source of truth: `docs/20-WIX-REDIRECT-MANAGER-MAP.md`. All rules are **301 Permanent**.

| # | Old URL | → New URL | Imported (✅) | Live test (✅) | Evidence |
|---|---|---|---|---|---|
| C1  | `/online-classes` | `/online-salsa-bachata-coaching` | | | |
| C2  | `/classes` | `/pura-nights` | | | |
| C3  | `/book-online` | `/bookings` | | | |
| C4  | `/book-now` | `/bookings` | | | |
| C5  | `/teachers` | `/meet-the-team` | | | |
| C6  | `/team` | `/meet-the-team` | | | |
| C7  | `/pricing` | `/prices` | | | |
| C8  | `/class-schedule` | `/schedule` | | | |
| C9  | `/wedding-first-dance` | `/wedding-dance` | | | |
| C10 | `/salsa-classes` | `/salsa-classes-london` | | | |
| C11 | `/bachata-classes` | `/bachata-classes-london` | | | |
| C12 | `/1-to-1` | `/private-lessons` | | | |
| C13 | `/private-classes` | `/private-lessons` | | | |
| C14 | `/store` | `/shop` | | | |
| C15 | `/dancewear` | `/shop` | | | |
| C16 | `/merch` | `/shop` | | | |
| C17 | `/proof-centre` | `/testimonials` | | | |
| C18 | `/salsa-classes-acton-local` | `/salsa-classes-acton` | | | |
| C19 | `/all-pages-master` | `/` | | | |
| C20 | apex `puranights.com/*` | `www.puranights.com/*` (DNS / Wix Domains) | | | |

**Live-test script** — run locally after the Wix cutover:
```bash
for path in /online-classes /classes /book-online /book-now /teachers /team \
  /pricing /class-schedule /wedding-first-dance /salsa-classes /bachata-classes \
  /1-to-1 /private-classes /store /dancewear /merch /proof-centre \
  /salsa-classes-acton-local /all-pages-master; do
  code=$(curl -s -o /dev/null -w "%{http_code} → %{redirect_url}" "https://www.puranights.com$path")
  echo "$path → $code"
done
# All rows must show 301 and a www.puranights.com/<new-path> redirect target.
```

Apex check:
```bash
curl -sI https://puranights.com | head -n2   # expect 301 → https://www.puranights.com/
```

---

## D. Canonical / OG / robots spot-check

Run the checklist in `docs/28-CANONICAL-OG-SCHEMA-VERIFICATION-CHECKLIST.md` against these 8 representative URLs:

| # | URL | Canonical OK | OG image OK | Robots OK | Evidence |
|---|---|---|---|---|---|
| D1 | `/` | | | | |
| D2 | `/pura-nights` | | | | |
| D3 | `/salsa-classes-chiswick` | | | | |
| D4 | `/bachata-classes-ealing` | | | | |
| D5 | `/events/latin-friday-2026-05-08` | | | | |
| D6 | `/blog/salsa-vs-bachata` | | | | |
| D7 | `/online-classes` *(noindex + 301 expected)* | | | | |
| D8 | `/salsa-classes-acton-local` *(noindex + 301 expected)* | | | | |

---

## E. GSC post-submission checks (24–72 h after A2)

| # | Check | Expected | Result | Date |
|---|---|---|---|---|
| E1 | GSC → Sitemaps → `sitemap.xml` status | Success, 29 discovered | | |
| E2 | GSC → Coverage → Indexed pages | Trending up; no new "Excluded by noindex" on Tier 1 | | |
| E3 | GSC → Enhancements → Events | Previous error gone; new valid items appearing | | |
| E4 | GSC → Enhancements → Breadcrumbs | Valid items > 0 | | |
| E5 | GSC → Enhancements → FAQ | `/faq` valid | | |
| E6 | URL Inspection on 5 Tier 1 URLs (`/`, `/pura-nights`, `/salsa-classes-chiswick`, `/bachata-classes-ealing`, `/events`) | All "URL is on Google" or "Crawled" | | |

---

## E2. Post-launch 7-day monitoring (GSC + Bing)

Run daily for 7 consecutive days starting the day after sitemap submission (A2).
Capture each metric at roughly the same time each day. Trend = ↑ / → / ↓ vs previous day.

### Indexing trend

| Day | Date | GSC indexed pages | GSC discovered-not-indexed | Bing indexed pages | Trend | Notes |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |

### Event enhancements

| Day | Date | Valid Event items | Errors | Warnings | New error types | Action |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |

### Breadcrumb + FAQ validity

| Day | Date | Breadcrumb valid | Breadcrumb errors | FAQ valid | FAQ errors | Notes |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |

### 7-day rollup (fill on Day 7)

```
Indexing delta (Day 1 → Day 7): ____ pages
Event errors burned down:        ____ → ____
Breadcrumb valid items:          ____ → ____
FAQ valid items:                 ____ → ____
Outstanding issues:              ____
Decision:                        ☐ healthy   ☐ extend monitoring   ☐ escalate
```

---



| Role | Name | Signed | Date |
|---|---|---|---|
| SEO owner | | | |
| Site owner | | | |
| Wix admin | | | |

**Launch goes live only when**: A1–A4 ✅, B-summary 10/10 ✅, C live-test 100% 301 ✅, D 8/8 ✅.

---

## What I (Lovable) cannot automate

| Task | Why | Where to do it |
|---|---|---|
| Submit sitemap to GSC / Bing | Requires authenticated session in those dashboards | search.google.com/search-console, bing.com/webmasters |
| Run Rich Results Test | Google's tool, no public API for arbitrary URLs without auth | search.google.com/test/rich-results |
| Import Wix redirects | Wix Dashboard, no Velo API for bulk redirect import on most plans | Wix → Marketing & SEO → URL Redirect Manager |
| Confirm 301 status codes on the *live Wix site* | Site is still on Lovable preview today | After Wix cutover, run `bun run qa:redirects` |

## Automated helpers (run from repo)

| Command | What it does | Output |
|---|---|---|
| `bun run qa:redirects` | HEAD-checks every rule in docs/20 for 301 + exact target | `launch-evidence/redirects/redirect-audit-<DATE>.csv` |
| `bun run qa:schema` | Fetches §B URLs, saves HTML + JSON-LD, diffs `@type` set vs last run | `launch-evidence/html/`, `launch-evidence/jsonld/`, `diff-<DATE>.md` |
| `bun run seo:check` | Build-time canonical/event-guard validation | console |

Screenshot capture protocol: see `docs/31-RICH-RESULTS-SCREENSHOT-PROTOCOL.md`.

Everything in this pack is **ready to execute** — no further code changes are required from me to run it.

