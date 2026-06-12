# Custom Backend CMS — Build Plan

A Wix/Squarespace-equivalent dashboard is **4–6 build phases**. Trying to ship it in one pass will break the live site (151 hard-coded pages). Below is a safe phased plan — each phase ships independently and is usable on its own.

## Architecture (all phases)

- **Editor**: TipTap with extensions (headings, images, YouTube embed, tables, links, code, callouts)
- **Storage**: Supabase tables + existing storage buckets (`gallery`, `hero-media`, `events`, `team`)
- **Auth**: existing role system (`owner` / `admin` / `editor` / `viewer`)
- **Routing**: catch-all React Router routes resolve slugs from DB → fall back to hard-coded pages
- **Sitemap**: replace `public/sitemap.xml` with `/sitemap.xml` Edge Function that queries DB live
- **SEO**: per-record `meta_title`, `meta_description`, `og_image`, `canonical`, `noindex`, JSON-LD blocks

---

## Phase 1 — Foundations + Pages CMS (this turn)

**DB schema**
- `cms_pages` — id, slug (unique), title, content_json (TipTap), content_html, status (draft/scheduled/published), publish_at, meta_title, meta_description, og_image, canonical, noindex, schema_jsonld, author_id, updated_at
- `cms_page_versions` — full snapshot per save (version history)
- `cms_redirects` — from_path, to_path, status_code (301/302)
- `cms_media` — extends gallery_assets with `folder`, `tags`, `usage_count`
- `cms_navigation` — menu builder (header/footer groups, ordered links)
- `cms_site_settings` — site title, default OG, GA4 ID, robots overrides

**Dashboard pages** (`/admin/cms/*`)
- `Pages` — list (search/filter), create, edit (TipTap), preview, publish, schedule, versions, SEO panel
- `Media Library` — grid view, folders, drag-upload, YouTube URL paste, copy-embed-code, replace, alt-text editor
- `Navigation` — drag-reorder menu items
- `Redirects` — CRUD with bulk import
- `Site Settings` — global SEO + analytics

**Public side**
- Catch-all `/:slug*` route → fetch `cms_pages` → render TipTap HTML with `SeoHead`
- Existing hard-coded routes win (no regression). New pages live alongside.
- `/sitemap.xml` Edge Function = static routes union with `cms_pages where status='published'`
- `cms_redirects` checked in catch-all before 404

**TipTap blocks shipped**
- Heading, Paragraph, Bold/Italic/Link, Bullet/Ordered list, Blockquote
- Image (from media library), YouTube embed, Button/CTA, FAQ accordion, HTML block

---

## Phase 2 — Blog CMS

- `cms_blog_posts` (extends pages schema with: excerpt, category, tags, reading_time, hero_image, related_posts[])
- Categories/Tags taxonomy tables
- Author profiles (reuse `team_members`)
- Dashboard: post editor, scheduling, categories manager, related-posts picker
- Public: `/blog` index pulls from DB; existing `/blog/:slug` hard-coded posts continue to work; new posts hit catch-all
- RSS feed at `/rss.xml`

---

## Phase 3 — Migration of hard-coded content

- One-time script reads each `src/pages/blog/*.tsx`, extracts H1/body/SEO, inserts to `cms_blog_posts`
- Same for top-level pages (FAQ, Beginners, etc.) — destructive, kept in a feature flag until verified
- After verification: delete `.tsx` files, catch-all serves everything

---

## Phase 4 — Collections managers (replaces scattered admin pages)

Unified UI for: Events, Testimonials, FAQs, Team, Venues, Ambassadors, Gallery Albums. Each gets the same shell: list → filter → edit form → publish toggle → SEO fields.

---

## Phase 5 — Visual page builder (block-based)

- Sections library: Hero, Feature grid, CTA band, Testimonials carousel, FAQ, Video, Gallery, Pricing, Form embed
- Drag-reorder, per-section settings panel, live preview
- Replaces TipTap for landing-page-style content while TipTap stays for prose

---

## Phase 6 — Polish

- Version diff viewer + restore
- A/B test variants per CTA (`src/data/ab-experiments.ts` already exists — wire to dashboard)
- Scheduled publishing via pg_cron
- Audit log of every change
- Multi-user presence indicators

---

## What ships in this turn (Phase 1)

1. Migration: all Phase 1 tables + RLS + GRANTs + triggers
2. Install TipTap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`, `@tiptap/extension-youtube`, `@tiptap/extension-table`)
3. Components: `<RichTextEditor>`, `<MediaPicker>`, `<SeoPanel>`, `<VersionHistory>`
4. Dashboard pages under `/admin/cms`: Pages list/editor, Media Library, Navigation, Redirects, Site Settings
5. Public: catch-all route in `App.tsx` (registered LAST so hard-coded routes win), `useCmsPage` hook
6. Sitemap: deploy `sitemap-xml` Edge Function, rewrite `vite.config.ts` dev proxy so `/sitemap.xml` hits the function; keep `public/sitemap.xml` as fallback
7. AdminLayout: new "CMS" nav group with Pages / Media / Navigation / Redirects / Settings

Estimated Phase 1 size: ~25–30 files, 1 migration, 1 edge function. **Phase 2–6 are separate turns.**

---

## Decisions needed before I start

1. **Sitemap mechanism**: replace static `public/sitemap.xml` with a live Edge Function (`/sitemap.xml`)? This is the only way "dynamic sitemap" works without rebuilds. Existing 151-entry static file becomes a fallback.
2. **Catch-all route precedence**: hard-coded React routes win over DB pages (safer), or DB pages can override (lets you replace any page from the dashboard but riskier)?
3. **Confirm Phase 1 scope above is what you want first**, then we ship 2–6 in follow-up turns.

Reply with any tweaks, or say "go" and I'll execute Phase 1.