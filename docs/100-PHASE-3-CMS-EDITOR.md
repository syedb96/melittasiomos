# Phase 3 — CMS Pages Editor: Completion Report

Status: **shipped**. Fulfils the 100/100 criterion *"Content can be drafted,
previewed, reviewed, published, unpublished and restored."*

## What shipped

### 1. Draft preview route
- `src/pages/admin/cms/CmsPagePreview.tsx` — admin-gated renderer at
  `/admin/cms/preview/:id` that loads any `cms_pages` row irrespective of
  `status`, and displays a sticky amber "Draft preview" banner showing the
  current status and last-edited timestamp.
- The preview reuses the public `<Layout>` wrapper so editors see the page in
  its real chrome, but omits `<SeoHead>` so the preview is never indexed.

### 2. Editor toolbar (`CmsPageEditor.tsx`)
- **Preview draft** button (always visible after first save) opens the new
  preview route in a new tab.
- **View live** button (unchanged) opens the public URL when status is
  `published`.
- **Unpublish** button (visible only when status is `published`) sets status
  back to `draft`, clears `published_at`, and writes a version snapshot with
  the note `"Unpublished"`.

### 3. Version history — restore with audit note
- The History tab now shows the `note` against each version snapshot
  ("Published", "Scheduled", "Draft save", "Unpublished", "Restored from vN").
- Restoring a version sets a local `restoredFromVersion` marker and shows an
  amber callout instructing the user to save or publish to apply. On the next
  save, the new version is written with the note `Restored from v{n}`.
- Existing snapshot rows are appended on every save (already in place) — no
  data migration was needed since `cms_page_versions.note` already existed.

### 4. App routing
- `src/App.tsx` adds the `/admin/cms/preview/:id` route gated by
  `<ProtectedRoute>`.

## Not changed (intentional)
- No new public pages. No schema changes. No RLS changes.
- The CMS Pages list editor already had bulk Publish/Unpublish/Schedule/Tag
  actions in `BulkActionsBar.tsx` — left untouched.
- Existing autosave-to-version pattern (one snapshot per save) is preserved.

## Acceptance against the 100/100 criterion
| Capability | Where |
| --- | --- |
| Draft | `status: 'draft'` default; "Save draft" button |
| Preview | `/admin/cms/preview/:id` |
| Review | Manual via preview link before clicking Publish |
| Publish | "Publish" button (with SEO ≥ 85 confirmation) |
| Unpublish | New "Unpublish" button + bulk Unpublish |
| Restore | History tab → Restore → save → audited note on snapshot |

## Next deliveries (pick one)
- Phase 7 — Forms + CRM (enquiry assignment, timeline, CSV export)
- Phase 6 — Media v2 (usage tracking, bulk alt-text, safe replace)
- Phase 11 — Analytics dashboards (conversion funnel from `page_views` +
  `cta_events` + `enquiries`)
