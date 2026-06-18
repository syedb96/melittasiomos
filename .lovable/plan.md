# Authority Content Engine + CMS Dashboard Expansion

## Goal
1. Establish Pura Nights as the UK authority for salsa/bachata "fun night out for not a lot of money" — extending reach beyond the M25 (Reading, Guildford, Watford, St Albans, Brighton, Oxford, Cambridge, Slough, Windsor, Woking, etc.).
2. Upgrade the existing `/admin/cms/*` dashboard with: AI blog generator, scheduled auto-publishing, and an SEO checklist engine that scores every post before publish.

---

## Part A — Topical Authority Content (beyond M25)

### Content pillars
- **"Worth the train from…"** day/night-trip posts (commercial intent, cheap-night-out angle)
- **Regional comparison & guides** (where to dance Salsa/Bachata outside London)
- **Beginner reassurance for out-of-town visitors** (parking, last train, group bookings)
- **Cheap night out** angle: under-£20 ticket, drinks, social atmosphere

### 12 new SEO posts (slug → primary keyword → money page)
| Slug | Keyword | Money page |
|---|---|---|
| `/blog/salsa-night-out-from-reading` | salsa night out reading london | /pura-nights |
| `/blog/bachata-classes-near-guildford` | bachata classes guildford | /pura-nights |
| `/blog/salsa-night-out-from-watford` | salsa watford london | /pura-nights |
| `/blog/latin-night-from-st-albans` | latin night st albans | /events |
| `/blog/salsa-bachata-brighton-vs-london` | salsa brighton vs london | /pura-nights |
| `/blog/salsa-night-out-from-oxford` | salsa oxford london trip | /events |
| `/blog/salsa-night-out-from-cambridge` | salsa cambridge london | /events |
| `/blog/cheap-night-out-london-salsa-under-20` | cheap night out london under £20 | /pura-nights |
| `/blog/salsa-bachata-slough-windsor` | salsa slough windsor | /pura-nights |
| `/blog/girls-night-out-salsa-london` | girls night out london salsa | /events |
| `/blog/first-date-salsa-london` | first date salsa london | /pura-nights |
| `/blog/uk-salsa-festivals-day-trip-london` | uk salsa weekend london | /events |

Each post follows the existing Block 3 anatomy: SeoHead with Article + FAQPage + BreadcrumbList schema, AnswerBox, mid-article `<BlogMoneyCTA>`, `<RelatedPages>` (max 6), Wix JSX comments, 800–1,400 words, H1+first 100 words contain primary keyword, LastUpdated badge, AuthorCard.

Routes added to `src/App.tsx`, entries added to `src/pages/Blog.tsx`, sitemap regenerated.

---

## Part B — CMS Dashboard Upgrades

### B1. AI Blog Generator (`/admin/cms/blog/generate`)
- Form: target keyword, location, intent (beginner/event/private/wedding/corporate), tone, word count, money-page link.
- Edge function `cms-blog-generate` calls Lovable AI (`google/gemini-2.5-pro`) with a strict system prompt enforcing: H1 with keyword, intro with keyword in first 100 words, 5–8 H2s, FAQ block (5 Qs), meta title (≤60), meta description (≤160), suggested slug, JSON-LD Article+FAQ, internal link suggestions.
- Returns structured JSON → pre-populates a new draft in `cms_pages` (kind=`blog`) and opens the TipTap editor.
- Streams generation progress to the UI.

### B2. Auto-publishing (scheduler)
- `cms_pages` already has `publish_at` + `status`. Add status value `scheduled`.
- pg_cron job (every 5 min) calls edge function `cms-publish-scheduled` which flips `scheduled` rows with `publish_at <= now()` to `published`, writes a `cms_page_versions` snapshot, pings the sitemap function.
- Admin UI: "Schedule" button in `CmsPageEditor` with datetime picker; calendar view at `/admin/cms/schedule` showing upcoming posts.

### B3. SEO Checklist Engine
New module `src/lib/seo-checklist.ts` runs 18 checks against the draft:
1. Title 30–60 chars
2. Title contains primary keyword
3. Meta description 120–160 chars
4. Meta description contains primary keyword
5. Slug ≤ 60 chars, hyphenated, contains keyword
6. Canonical present, self-referencing
7. Single H1 present
8. H1 contains primary keyword
9. Primary keyword in first 100 words
10. Keyword density 0.5–2.5%
11. ≥3 H2s, logical order
12. ≥2 internal links to money pages
13. ≤6 internal links in RelatedPages
14. Hero/OG image set, alt text present
15. Word count ≥700
16. JSON-LD Article schema valid
17. JSON-LD FAQ schema present
18. Reading level ≤ Grade 9 (Flesch-Kincaid)

UI: live sidebar in `CmsPageEditor` with red/amber/green per check, overall score /100, **publish button disabled below 85**. Override requires owner role + reason logged to `security_events`.

### B4. Dashboard polish
- Home dashboard `/admin` upgraded: KPI tiles (published, scheduled, drafts, avg SEO score, page views last 7d via `page_views`), recent activity feed, quick-action "Generate post".
- Sidebar reorganised: Content (Pages/Blog/Schedule/Generator), Media, SEO (Checklist results, Redirects, Sitemap), Settings.

---

## Technical Details

### New files
- `src/pages/blog/SalsaNightOutFrom{Reading,Watford,Oxford,Cambridge}.tsx` and 8 siblings
- `src/pages/admin/cms/CmsBlogGenerator.tsx`
- `src/pages/admin/cms/CmsSchedule.tsx`
- `src/pages/admin/cms/CmsDashboardHome.tsx`
- `src/components/admin/cms/SeoChecklistPanel.tsx`
- `src/lib/seo-checklist.ts`
- `supabase/functions/cms-blog-generate/index.ts`
- `supabase/functions/cms-publish-scheduled/index.ts`

### Database (one migration)
- ALTER `cms_pages` ADD COLUMN `seo_score INT`, `seo_checklist JSONB`, `kind TEXT DEFAULT 'page'` (values: `page`|`blog`), `primary_keyword TEXT`.
- New table `cms_generation_logs` (prompt, model, tokens, output_ref) — authenticated insert by editors, full read by admins, service_role all. Grants in same migration.
- pg_cron + pg_net enabled; cron `*/5 * * * *` → `cms-publish-scheduled`.

### Routes
12 new public blog routes added to `App.tsx` ABOVE the `*` catch-all. 3 new admin routes nested under `/admin/cms/`.

### Sitemap
The existing `sitemap-xml` edge function auto-includes published `cms_pages`. Static `public/sitemap.xml` updated with 12 new blog URLs as a fallback.

### Guardrails preserved
- All posts UK English, warm + premium tone, no fake awards.
- Max 6 internal links per RelatedPages block.
- Article+FAQPage+BreadcrumbList only (no Event schema on posts).
- Canonical host `https://www.puranights.com`.
- Wix-safe (JSX `<!-- WIX SECTION -->` comments preserved).

### Scope notes
- Phase 5 visual page builder, version diff viewer, A/B testing remain deferred.
- No changes to Auth (Google/Apple only).
- No changes to existing money pages.

---

## Delivery order (single turn)
1. Migration (schema + cron + grants)
2. Edge functions (generate + publish-scheduled)
3. SEO checklist lib + panel
4. Admin pages (Generator, Schedule, Dashboard Home)
5. 12 blog posts + route wiring + Blog.tsx entries
6. Sitemap fallback update
7. Doc: `docs/96-AUTHORITY-CONTENT-AND-CMS-ENGINE.md`