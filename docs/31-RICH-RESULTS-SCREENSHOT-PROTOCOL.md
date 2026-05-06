# 31 — Rich Results Test Screenshot Protocol

> Capture standardised evidence for every URL in `docs/30 §B`.
> Store in `/launch-evidence/screenshots/` with the **exact** filenames below so the QA pack can cross-reference them by row ID.

## Filename convention

```
<row-id>__<slug>__<tool>__<YYYY-MM-DD>.png
```

- `row-id`   = QA pack row, e.g. `B1`, `B3`
- `slug`     = URL path with `/` → `_` (e.g. `events_latin-friday-2026-05-08`); use `home` for `/`
- `tool`     = `rrt` (Rich Results Test) | `sv` (Schema Validator) | `gsc` (URL Inspection)
- date       = capture date in UTC

Example: `B1__events_latin-friday-2026-05-08__rrt__2026-05-06.png`

## Per-URL capture checklist

For each row B1–B10:

1. Open https://search.google.com/test/rich-results → paste live URL → **Test URL**.
2. Wait until the run completes (no spinner).
3. Capture **full-page** screenshot of the results panel showing:
   - URL tested (top bar)
   - Detected items list with item count
   - Any errors / warnings / valid items badges
4. Save as `<row-id>__<slug>__rrt__<DATE>.png` in `/launch-evidence/screenshots/`.
5. If "View tested page" → "More info" reveals issues, capture a second screenshot suffixed `__detail`.
6. Repeat with https://validator.schema.org → save with `__sv__` infix.
7. In GSC → URL Inspection → run live test → capture as `__gsc__`.

## Required captures

| Row | URL | rrt | sv | gsc |
|---|---|---|---|---|
| B1 | `/events/latin-friday-2026-05-08` | ☐ | ☐ | ☐ |
| B2 | `/events/latin-friday-2026-06-12` | ☐ | ☐ | ☐ |
| B3 | `/pura-nights` | ☐ | ☐ | ☐ |
| B4 | `/schedule` | ☐ | ☐ | ☐ |
| B5 | `/salsa-classes-chiswick` | ☐ | ☐ | ☐ |
| B6 | `/bachata-classes-ealing` | ☐ | ☐ | ☐ |
| B7 | `/faq` | ☐ | ☐ | ☐ |
| B8 | `/about` | ☐ | ☐ | ☐ |
| B9 | `/blog/salsa-vs-bachata` | ☐ | ☐ | ☐ |
| B10 | `/` | ☐ | ☐ | ☐ |

Total expected files: **30** (10 URLs × 3 tools), plus any `__detail` follow-ups.

## Pass criteria

- B1, B2 (`/events/:slug`) — **must** show `Event` as a detected item with **0 errors**.
- B3, B4, B5, B6 (recurring schedule) — **must NOT** show `Event` as a detected item. Acceptable: `LocalBusiness`, `Service`, `BreadcrumbList`.
- B7 — `FAQPage` valid, 0 errors.
- B8 — `Organization`, `BreadcrumbList`.
- B9 — `Article`, `BreadcrumbList`.
- B10 — `Organization`, `WebSite` (with `SearchAction`).

## After capture

1. Update `docs/30-FINAL-LAUNCH-QA-PACK.md` §B `Evidence` column with the filename.
2. Paste the B-summary block into §B with the totals.
3. Commit screenshots to `/launch-evidence/screenshots/` (already gitignored — keep local or upload to shared drive).

## Storage

`/launch-evidence/` is **not** part of the deployed site and is ignored by Wix migration. Treat it as an internal QA artefact folder.
