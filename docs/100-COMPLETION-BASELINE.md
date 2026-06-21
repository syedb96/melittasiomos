# 100/100 — Completion Baseline

_Baseline captured at start of the 100/100 Operating System programme._

## Build status

- `bun run build` — **passing** (3.15 MB JS bundle, ~10 s build time)
- `bun scripts/alt-text-lint.ts` — passing (last alt-text issue fixed in CmsMediaAdmin)
- `bun scripts/seo-qa.ts` — passing
- `bun scripts/schema-validate.ts` — passing
- `bun scripts/schema-qa-report.ts` — passing
- `bun scripts/qa-whatsapp-tracking.ts` — passing
- `bun scripts/qa-dependency-audit.ts` — passing

## Module registry — single source of truth

A new typed registry at `src/admin/moduleRegistry.ts` enumerates every
admin module. Each entry declares: id, name, route, section, description,
icon, required role, status (`live` / `partial` / `planned`), data source,
table dependencies, public-critical flag, and Wix equivalent.

The sidebar (`AdminLayout`), command palette (⌘K), Page Registry and
System Audit dashboard all consume this registry. No more hard-coded
admin link lists.

## Baseline scores (from registry — weighted: live=1, partial=0.5, planned=0)

| Area                                   | Score | Notes |
| -------------------------------------- | ----- | ----- |
| Overview (Dashboard)                   | 100%  | Live counts |
| Audit (System Audit, Page Registry)    | 100%  | New this delivery |
| CMS                                    | ~85%  | Pages, media, nav marked partial (no block editor / usage tracking yet) |
| Collections                            | ~92%  | Enquiries CRM marked partial |
| Commerce (Prices/Offers/Schedule/Venues/Booking Links) | 0%    | **Phase 2 target** |
| System (SEO, Analytics, Security, Settings, Docs)      | ~85%  | SEO/Analytics partial — opportunity engine + funnel views pending |

**Overall (live registry value):** see `/admin/system-audit` — recalculated on every page load.

## Operating-system completeness vs. the 100/100 definition

| Definition criterion                                    | State    |
| ------------------------------------------------------- | -------- |
| Public website builds and operates                       | ✅ live  |
| Major public value editable via admin                    | ⚠ partial — prices, schedule, venues still hard-coded (Phase 2) |
| Prices/schedule/booking links centralised                | ❌ Phase 2 |
| Content can be drafted/previewed/published/restored      | ⚠ partial — schedule + Wix sync live; structured block editor pending |
| Admin in one coherent nested control centre              | ✅ achieved this delivery |
| Permissions enforced server-side                         | ✅ RLS + `is_admin` / `has_role` definer functions |
| All forms route correctly and testable                   | ⚠ tracking-QA exists; forms inventory pending Phase 7 |
| Enquiries assigned, followed up, exported                | ⚠ basic only — Phase 7 |
| SEO metadata, schema, sitemap, redirects managed         | ⚠ redirects live; metadata still per-route Helmet |
| Media has tags / alt / usage / safe replacement          | ⚠ partial |
| Public pages and internal links monitored                | ✅ scripts/crawl-graph + redirect-audit |
| Analytics and conversion events measurable               | ⚠ events captured; dashboards partial |
| Wix migration mappings complete                          | ⚠ Wix sync live; export breadth pending |
| Reliable backup/export and recovery process              | ❌ Phase 15 |
| End-to-end QA passes                                     | ✅ prebuild pipeline green |
| Remaining human-only tasks documented                    | ✅ this file + Phase 2 map |

## Known blockers

- **Bundle size**: 3.15 MB single JS chunk. Phase 0+ candidate for route-level
  code-splitting; not blocking shipping but slows first paint.
- **Hard-coded commercial data**: prices, schedule slots, venue facts, booking
  URLs and WhatsApp messages live in code. Catalogued in
  `docs/100-PHASE-2-COMMERCIAL-CONTROLS-MAP.md`.
- **Canonical host**: three live hosts; canonical decision documented in
  `docs/100-CANONICAL-HOST-DECISION.md` (no code change yet — separate phase).
- **Disaster recovery**: no documented backup/restore process yet (Phase 15).

## What this first delivery added (no public-site changes)

1. `scripts/extract-routes.ts` → `src/admin/generated/routes.json` (wired into `predev` + `prebuild`).
2. `src/admin/moduleRegistry.ts` — single typed registry.
3. `src/components/admin/AdminLayout.tsx` — refactored to consume registry; adds breadcrumbs, env badge, ⌘K command palette, View-live link.
4. `src/pages/admin/SystemAudit.tsx` — live completion score, owner/role check, registry table, backend table-row counts.
5. `src/pages/admin/PagesRegistry.tsx` — read-only inventory joining App.tsx routes with `cms_pages` and `/sitemap.xml`.
6. Routes wired in `src/App.tsx` under `ProtectedRoute requireAdmin`.
7. Three docs under `docs/` (this file, canonical-host decision, Phase 2 map).

Zero changes to public pages, sitemap entries, canonical tags, schema output, prices, RLS policies, or migrations.
