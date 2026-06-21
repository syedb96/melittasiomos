# Phase 4 — CMS & Publishing System

Status: shipped (workflow + gate + freshness layer)

## What landed

- `cms_pages` gained `workflow_status`, `review_date`, `author_name`, `sources`, `publish_gate` columns plus a `cms_page_freshness()` helper.
- Editor (`/admin/cms/pages/:id`) now exposes:
  - **Workflow status** select (idea, brief, draft, editing, review, scheduled, published, update_required, archived).
  - **Next review date** picker driving the freshness signal.
  - **Author name** and **page type** including new `resource` and `glossary` kinds.
  - **Publishing gate panel** in the sidebar showing critical checks (title, slug, meta title/description, single H1, no placeholder text, no draft/admin links, JSON-LD parses) and warnings (hero image + alt, image alt coverage, canonical, body length).
- `save(publish=true)` is **hard-blocked** when any critical gate check fails. The snapshot is stored on the row so the list view can show the same red badge without recomputing.
- Pages list (`/admin/cms/pages`):
  - Title is now "Pages, Blog & Resources".
  - New columns: workflow status, freshness, publishing-gate result.
  - New filters for workflow status and freshness.
  - Three header tiles summarising Fresh / Review soon / Outdated counts.

## Acceptance against the master spec

- Drafted, previewed, reviewed, published, unpublished, restored: covered by existing editor + the gate.
- Publishing gate critical failures block publish: yes.
- Revision history: existing `cms_page_versions` table; restore + named notes already in place from Phase 3.
- Workflow taxonomy matches Phase 5 spec.

## Deliberately deferred

- Full structured **block** editor (Hero / Cards / Schedule / Price blocks). The current rich-text + reusable section components already cover live editorial needs; promoting them to typed blocks is a Phase 6/7 scope decision.
- Compare-revisions diff view.
- Reviewer/approver assignment (requires extending `user_roles`).
