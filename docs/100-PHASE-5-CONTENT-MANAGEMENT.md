# Phase 5 — Content, Blog & Resource Management

Status: shipped (taxonomy + freshness on the unified pages table)

## Approach

Rather than create parallel tables for blog / guides / resources / glossary, all editorial content lives in `cms_pages` and is differentiated by:

- `page_type`: `page | blog | landing | resource | glossary | legal`.
- `category`, `tags`, `topic`, `city` for facet filtering.
- `workflow_status` for editorial state (idea → archived).
- `review_date` + `published_at` driving freshness.

This keeps a single source of truth, single editor, single publishing gate and single Wix mirror.

## Statuses

`idea, brief, draft, editing, review, scheduled, published, update_required, archived` — set in the editor's Settings tab and filterable on the list.

## Freshness

Computed both client-side (`freshnessOf` in `CmsPagesAdmin.tsx`) and server-side (`public.cms_page_freshness()`):

- `outdated` — review date past, or published > 365 days ago.
- `review_soon` — review date within 30 days, or published > 180 days ago.
- `fresh` — otherwise.

Surfaced as a list badge, a header tile (counts), and a filter.

## Safe AI assistant

Existing `/admin/cms/blog/generate` produces drafts only. Phase 5 keeps the rule: AI never auto-publishes, never invents facts. Generated drafts land as `draft` + `workflow_status='draft'` and must pass the publishing gate.

## Sources field

`cms_pages.sources` (jsonb array) is now available for citation tracking. The editor UI for source entry is intentionally minimal in this delivery; structured input lands with the block editor.

## Deferred

- Dedicated `/admin/blog` and `/admin/resources` shortcut routes (the unified list already filters by `page_type`).
- Idea-board kanban view.
- Approval-assignment workflow.
