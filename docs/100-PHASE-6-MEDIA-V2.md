# Phase 6 — Media v2 (Shipped)

Upgraded the Media Library at `/admin/cms/media` to a full asset-ops tool.

## What shipped

### Bulk editing
- Multi-select with per-card checkbox + "Select all filtered" / "Clear".
- Bulk dialog applies `alt_text` and `folder` to every selected row in one update; tags are **merged** (never replaced) per row so existing tags aren't lost.

### Filters & health
- Search across title / alt / URL.
- Folder dropdown + tag dropdown built from live data.
- Summary tiles: total assets, folders, tags, **missing alt text** (amber when > 0). Per-card amber `alt` badge surfaces individual offenders.

### Usage tracking
- `findUsage()` scans `cms_pages` for the media URL across `content_html`, `hero_image_url`, `og_image`, `twitter_image` in a single `.or()` query.
- Edit dialog shows every page that references the asset with status badge and which field(s) it appears in (`hero`, `og`, `twitter`, `body`).
- Delete is **blocked** if the asset is referenced; the toast lists the first 3 pages so the editor knows where to clean up first.

### Safe replace
- "Safe replace…" button in the edit dialog uploads a new file to the `gallery` bucket, then:
  1. rewrites every matching field in every referencing `cms_pages` row (`content_html` via string replace, hero/og/twitter via equality);
  2. removes the old object from storage;
  3. updates `cms_media.url`, `storage_path`, `mime_type`, `file_size`.
- All page references stay valid; nothing 404s.

## Files
- `src/pages/admin/cms/CmsMediaAdmin.tsx` — rewritten with selection, filters, usage panel, safe replace.
- `src/admin/moduleRegistry.ts` — `cms-media` flipped to `live`, table deps include `cms_pages`.

## Schema
No migration required. `cms_media.tags text[]` already exists from earlier phases.
