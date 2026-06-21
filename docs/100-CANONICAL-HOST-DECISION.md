# 100/100 — Canonical Host Decision

## Live hosts (observed)

| Host                                              | Purpose                              | TLS | Notes |
| ------------------------------------------------- | ------------------------------------ | --- | ----- |
| `https://puranights.com`                          | **Recommended canonical** (apex)     | ✅  | Used in `index.html` canonical, `public/sitemap.xml` BASE_URL, Helmet baseline. |
| `https://www.puranights.com`                      | www variant                          | ✅  | Should 301 → apex. |
| `https://melittasiomos.lovable.app`               | Lovable preview slug                 | ✅  | Internal staging. Must NOT be indexed. |
| `https://id-preview--...lovable.app`              | Per-build preview                    | ✅  | Internal only. |

## Recommendation

Adopt **`https://puranights.com`** as the single canonical host. It already
matches: `index.html` `<link rel="canonical">`, `og:url` baseline,
`public/sitemap.xml`'s generated `BASE_URL`, and the project URL declared in
build configuration. No change required in source — only DNS/redirect
verification.

## Audit findings (no code changes made in this delivery)

1. **index.html canonical**: `https://puranights.com/` — ✅ correct.
2. **Sitemap BASE_URL**: `https://puranights.com` — ✅ correct.
3. **robots.txt**: present at `public/robots.txt`. Verify `Sitemap:` directive
   (if any) uses the canonical apex. Lovable preview hosts should not advertise
   the production sitemap.
4. **Per-route Helmet canonicals**: every page should set
   `<link rel="canonical" href={`https://puranights.com${path}`} />` via
   `react-helmet-async`. Spot-check needed across 158 public routes —
   recommend a follow-up script `scripts/canonical-audit.ts` that lints route
   components for the helper that builds canonical URLs and flags any that
   hard-code preview hosts.
5. **Social-preview fallback**: `index.html` keeps sitewide `og:url` pointed at
   the apex; per-route Helmet overrides for JS-executing crawlers.

## Actions required (separate phase — not in this delivery)

1. Confirm `www.puranights.com` issues a 301 redirect to apex (DNS / hosting).
2. Confirm Lovable preview hosts return `X-Robots-Tag: noindex` (or that the
   meta tag is present). Preview hosts must never appear in Google's index.
3. Add `scripts/canonical-audit.ts` and wire into `prebuild`.
4. If/when the canonical host changes, update **all of** `index.html`,
   `public/sitemap.xml` generator, every route's Helmet, and `public/robots.txt`
   in a single atomic commit — never split.

## Why a separate phase

Changing canonicals is the single most common cause of accidental SEO
regressions. The audit above is read-only on purpose.
