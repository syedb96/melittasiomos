## Pura Nights — 100/100 Operating System: FIRST DELIVERY

Your master prompt covers ~15 phases. Attempting it all in one pass would be reckless and almost certainly break working systems. I will execute exactly the "FIRST DELIVERY" block you defined at the bottom, then stop for review before moving to Phase 2 commercial controls.

This delivery adds **no new public pages**, **no destructive migrations**, and **no duplicate admin modules**. It is foundation + audit only.

---

### Scope of this delivery

**1. Phase 0 — Build stability baseline**
- Run the full prebuild pipeline (`alt-text-lint`, `seo-qa`, `schema-validate`, `schema-qa-report`, `qa-whatsapp-tracking`, `qa-dependency-audit`, `bun run build`).
- Fix any failures introduced since last green build (expected: none — last turn fixed alt-text).
- Create `docs/100-COMPLETION-BASELINE.md` with real scores per category, build status, and known blockers. No fabricated numbers — any missing data shown as "Not measured".

**2. Phase 1 — Unified Control Centre foundation**
- Promote `/admin/control-centre` to the default admin landing route (redirect `/admin` → `/admin/control-centre` for owners/admins).
- Audit existing admin shell (`AdminLayout`, sidebars, existing nested CMS/SEO/enquiries routes). Reuse — do not rebuild.
- Add only what is missing on the shell: breadcrumbs, global command palette (⌘K), environment badge, current-user/role chip, "View live" + "Preview" buttons in top bar. Mobile drawer behaviour verified.

**3. Admin Module Registry (single source of truth)**
- New file `src/admin/moduleRegistry.ts` — typed array of every admin module currently in the app (CMS pages, media, navigation, redirects, Wix settings, enquiries, analytics, security events, SEO, ambassadors, team, testimonials, events, gallery, settings, etc.).
- Each entry: `id, name, route, section, description, icon, requiredRole, status (live|partial|planned), dataSource, tableDependency, publicCritical, wixEquivalent`.
- Sidebar, command palette, System Audit, and completion scorecard all read from this registry. No more hard-coded admin link lists.

**4. Real System Audit dashboard — `/admin/system-audit`**
- Reads the module registry + live Supabase queries to compute:
  - Module completeness (live vs partial vs planned).
  - Table health: row counts for `cms_pages`, `enquiries`, `testimonials`, `events`, `team_members`, `gallery_assets`, `ambassadors`, `cms_media`, `cms_redirects`.
  - Build/SEO signals from existing `seo_alerts`, `cms_wix_sync_log`, `security_events`.
  - Public-route inventory derived from `App.tsx` route table.
- Categories scored: Public website, Admin, CMS, Commercial controls, CRM, SEO/GEO, Analytics, Security, Wix readiness, Recovery readiness, Overall.
- Every metric clearly labelled "Live data" or "Not yet instrumented". No invented percentages.

**5. Owner / role verification**
- Read-only check page inside System Audit: lists `syedbiz96@gmail.com` profile row, `approved_admin_emails` entries (count + active flag only — emails masked except for the owner's own), confirms `is_admin` / `has_role` definer functions exist, and lists every admin route and the role gate it enforces (parsed from `ProtectedRoute` usage in `App.tsx`).
- If any admin route is missing a role gate → flagged red.

**6. Canonical-host decision**
- Add `docs/100-CANONICAL-HOST-DECISION.md` documenting the three live hosts (`puranights.com`, `www.puranights.com`, `melittasiomos.lovable.app`) and recommending `https://puranights.com` as canonical (matches existing `head-meta` + sitemap).
- Audit `index.html`, `react-helmet-async` usage, `public/sitemap.xml`, `public/robots.txt`, and per-route Helmet canonicals for mismatches. Report findings in the doc — **no code changes to canonicals in this delivery** (that is its own phase to avoid SEO regression).

**7. Read-only Page Registry — `/admin/pages-registry`**
- Lists every public route from `App.tsx` joined with any matching `cms_pages` row.
- Columns: route, component, CMS-backed (yes/no), title source, has Helmet, canonical present, in sitemap, indexable, last edited (if CMS), status.
- Read-only in this delivery. The editable structured page editor is Phase 4.

**8. Phase 2 Commercial Controls — implementation map (document only)**
- `docs/100-PHASE-2-COMMERCIAL-CONTROLS-MAP.md`: enumerates every hard-coded price, schedule slot, venue detail, booking URL, and WhatsApp message currently in the codebase (found via `rg`), grouped by proposed admin module (Prices, Offers, Schedule, Venues, Booking Links).
- For each: file/line, current value, proposed table, migration risk, dependent components.
- This becomes the spec for the next delivery. Nothing is migrated yet — extracting these without a plan would break the public site.

---

### Explicitly NOT in this delivery (require their own approved phases)

- Phase 2 actual commercial-controls migration (prices/offers/schedule/venues tables + editors + public-site refactor).
- Phases 3–15 (services/events editor, full CMS workflow, blog/resources, media manager v2, forms/CRM upgrades, partner/backlink queue, testimonial workflow, SEO intelligence engine, analytics dashboards, navigation/design tokens editor, automations, Wix export pipeline expansion, disaster recovery).
- Any change to public URLs, canonicals, sitemap, schema output, payment flows, or RLS policies.
- AI auto-anything.

---

### Tech notes (for the technical reader)

- Module registry is pure TS, no migration. Sidebar (`AdminLayout`) refactored to map over registry filtered by `requiredRole` resolved against `useAuth().role`.
- System Audit page uses existing `supabase` client with `count: 'exact', head: true` queries (cheap). No new tables, no RLS changes.
- Page Registry parses `App.tsx` `<Route>` elements at build time via a small `scripts/extract-routes.ts` helper that emits `src/admin/generated/routes.json` (run in `predev`/`prebuild` alongside sitemap generator). Keeps the registry in sync without runtime route introspection.
- Canonical decision doc uses `rg` audit output — no code changes.
- All new admin routes gated by `ProtectedRoute requiredRole="admin"` (owner inherits).

---

### Acceptance for this delivery

1. `bun run build` exits 0; all QA scripts pass.
2. `/admin` redirects to `/admin/control-centre` for admins.
3. Sidebar + command palette + system-audit all driven by the single module registry.
4. `/admin/system-audit` shows real numbers (or honest "Not measured").
5. `/admin/pages-registry` lists every public route with CMS linkage status.
6. Three new docs exist under `docs/`: baseline, canonical-host decision, Phase 2 map.
7. Owner `syedbiz96@gmail.com` confirmed as `owner` in audit panel.
8. Zero changes to public pages, sitemap entries, canonical tags, schema output, prices, or RLS policies.

After you approve and I ship this, I'll report the recalculated score and present Phase 2 as the next delivery.