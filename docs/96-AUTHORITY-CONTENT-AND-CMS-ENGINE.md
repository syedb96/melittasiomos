# 96 — Authority Content Engine + CMS Dashboard

_Built: 2026-06-18_

## Part A — Beyond-M25 Authority Content (12 new posts)

Goal: rank Pura Nights as the UK authority for the "fun, affordable salsa & bachata night out" beyond London's M25 boundary.

| Slug | Primary keyword | Money page | CTA |
|---|---|---|---|
| /blog/salsa-night-out-from-reading | salsa night out reading london | /pura-nights, /latin-friday | events |
| /blog/bachata-classes-near-guildford | bachata classes guildford | /pura-nights | classes |
| /blog/salsa-night-out-from-watford | salsa watford london | /latin-friday | events |
| /blog/latin-night-from-st-albans | latin night st albans | /latin-friday | events |
| /blog/salsa-bachata-brighton-vs-london | salsa brighton vs london | /pura-nights | classes |
| /blog/salsa-night-out-from-oxford | salsa oxford london trip | /latin-friday | events |
| /blog/salsa-night-out-from-cambridge | salsa cambridge london | /latin-friday | events |
| /blog/cheap-night-out-london-salsa-under-20 | cheap night out london under £20 | /latin-friday | events |
| /blog/salsa-bachata-slough-windsor | salsa slough windsor | /pura-nights | classes |
| /blog/girls-night-out-salsa-london | girls night out london salsa | /private-group-dance-parties-london | events |
| /blog/first-date-salsa-london | first date salsa london | /latin-friday | events |
| /blog/uk-salsa-festivals-day-trip-london | uk salsa weekend london | /latin-friday | events |

### Implementation
- All 12 posts share `src/components/AuthorityBlogPost.tsx` (Article + FAQPage + BreadcrumbList JSON-LD, reading progress, AuthorCard, social share, mid-article BlogMoneyCTA, RelatedPages capped at 6, Wix JSX comments).
- Data lives in `src/data/authority-posts.ts`.
- Routes registered via a `/blog/:slug` loop in `App.tsx` above the catch-all.
- Blog index (`src/pages/Blog.tsx`) auto-includes them via `AUTHORITY_POSTS_LIST`.
- Static sitemap fallback updated (`public/sitemap.xml`). Live sitemap edge function already picks up DB pages.

### Editorial guardrails (enforced per post)
- Primary keyword present in H1, meta title, meta description, and first 100 words.
- UK English, warm + premium tone.
- 800–1,400 words, 5–6 H2 sections, 5 FAQs.
- Max 6 internal links per RelatedPages.
- No Event schema on blog posts.

---

## Part B — CMS Dashboard Upgrades

### B1. AI Blog Generator — `/admin/cms/blog/generate`
- Form: primary keyword, funnel angle, location, word count, money-page link, tone.
- Edge function `cms-blog-generate` calls Lovable AI (`google/gemini-2.5-pro`) with a strict system prompt enforcing the editorial guardrails and JSON-shaped output.
- Output streamed into a preview panel; live SEO score in sidebar.
- "Save as draft" inserts into `cms_pages` (kind=`blog`) with `seo_score` and `seo_checklist` populated, logs to `cms_generation_logs`, and opens the editor.

### B2. Scheduled Auto-Publishing
- `cms_pages.status` adds `scheduled` value; `publish_at` is the trigger time.
- `cms-publish-scheduled` edge function flips due rows to `published`.
- pg_cron job `cms-publish-scheduled-every-5min` calls the function every 5 minutes.
- Admin UI: `/admin/cms/schedule` calendar view + "Schedule…" button on editor toolbar.

### B3. SEO Checklist Engine
Lives in `src/lib/seo-checklist.ts` and renders via `SeoChecklistPanel` in the editor sidebar and the AI generator. 18 weighted checks:

1. Meta title 30–60 chars
2. Meta title contains primary keyword
3. Meta description 120–160 chars
4. Meta description contains primary keyword
5. Slug shape (kebab, ≤60 chars, contains keyword)
6. Canonical self-referencing
7. Exactly one H1
8. H1 contains primary keyword
9. Primary keyword in first 100 words
10. Keyword density 0.5–2.5 %
11. ≥3 H2 sections
12. ≥2 internal money-page links
13. Total internal links ≤25
14. Hero / OG image set
15. Word count ≥700
16. Article JSON-LD present
17. FAQPage JSON-LD present
18. Flesch-Kincaid reading grade ≤10

Aggregate score = weighted pass(1) / warn(0.5) / fail(0). **Publishing below 85 throws a confirmation prompt.** Score and per-check results are persisted to `cms_pages.seo_score` and `cms_pages.seo_checklist`.

### B4. Dashboard Home — `/admin/cms`
KPI tiles for published / scheduled / drafts / avg SEO score / media count / page views (7d), plus quick-action links into Pages, Schedule, Generator and Media.

---

## Database
Single migration:
- `cms_pages` adds `seo_score`, `seo_checklist`, `kind`, `primary_keyword`.
- `cms_generation_logs` table + grants + RLS (editors insert their own; admins read).
- `pg_cron` + `pg_net` enabled.
- Cron job calls `cms-publish-scheduled` every 5 minutes.

## Edge functions
- `cms-blog-generate` (auth-gated, calls Lovable AI Gateway).
- `cms-publish-scheduled` (service-role, called by pg_cron).
- Existing `sitemap-xml` continues to merge DB pages with static fallback.

## Files
- `src/components/AuthorityBlogPost.tsx`
- `src/components/admin/cms/SeoChecklistPanel.tsx`
- `src/lib/seo-checklist.ts`
- `src/data/authority-posts.ts`
- `src/pages/AuthorityBlogRoute.tsx`
- `src/pages/admin/cms/CmsBlogGenerator.tsx`
- `src/pages/admin/cms/CmsSchedule.tsx`
- `src/pages/admin/cms/CmsDashboardHome.tsx`
- `supabase/functions/cms-blog-generate/index.ts`
- `supabase/functions/cms-publish-scheduled/index.ts`
- `src/components/admin/AdminLayout.tsx` (sidebar reorganised)
- `src/pages/admin/cms/CmsPageEditor.tsx` (SEO panel + schedule + score-gated publish)
- `src/App.tsx` (12 routes + 3 admin routes)
- `public/sitemap.xml` (12 new URLs)
