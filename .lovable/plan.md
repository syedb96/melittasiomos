# Pura Nights — Market Domination Buildout

I'll execute the megaprompt as **4 sequential blocks**, each shipped as its own run so we can QA between them and Lovable doesn't hallucinate at scale. Below is the plan; I'll start Block 1 immediately on approval.

## Governance (enforced every block)
- Canonical host stays `https://www.puranights.com`
- No Event schema on recurring class pages (existing `RECURRING_PAGES` guard in `scripts/seo-qa.ts` extended to new pages)
- Enquiry-only services (private, wedding, corporate, group parties) — no public pricing
- Shop/lookbook/refer/admin remain noindex
- Top nav stays slim; new pages reached via footer + contextual CTAs + hub pages
- Brand voice: premium, social, adult-friendly, non-cringe
- All new pages: SeoHead with Service/FAQPage/BreadcrumbList schema, AnswerBox, internal links to ≥3 money pages, sitemap entry, Wix mapping doc update

---

## Block 1 — Revenue pages + CTA system (this run)

**New pages**
1. `/corporate-dance-classes-london` — Service + FAQPage schema, 9 sections, enquiry form (Supabase `enquiries` table, subject = "Corporate"), package cards (no fixed prices)
2. `/private-group-dance-parties-london` — Hen/birthday/group, Service + FAQPage, enquiry form (subject = "Private group party")
3. `/partner-with-pura-nights` — Venues, suppliers, media; partnership form + 5 copy/paste link snippets + brand kit block; Organization + ContactPage + FAQPage schema
4. `/latin-night-out-west-london` — Editorial/commercial hub, Article + FAQPage schema, comparison table, venue cards, internal links to `/pura-nights`, `/prices`, `/schedule`, `/events`, `/start-here`

**New components**
- `AnswerBox.tsx` — reusable AI/GEO answer block (paragraph + bullets + CTA)
- `CorporateCTA.tsx`, `PartnerCTA.tsx`, `FirstTimerCTA.tsx`, `EventCTA.tsx` — contextual CTA strips
- Extend `StickyMobileCTA` with corporate/partner context detection

**Wiring**
- Routes added to `src/App.tsx`
- Footer: new "Corporate" + "Partnerships" links under Services/Contact
- Homepage: subtle corporate strip + partner strip (lower-fold, non-disruptive)
- Sitemap entries added
- Enquiry subjects extended in Contact triage
- Add new page paths to `RECURRING_PAGES` exclusion only if they emit class times (they don't — Service schema only)
- Update `docs/27-WIX-MIGRATION-DRY-RUN-REPORT.md` and `docs/11-SEO-PAGE-MATRIX.md` with new routes

**Audit doc**
- `docs/28-REVENUE-DOMINATION-AUDIT.md` — current money pages, gaps, P0–P3 priorities, what shipped in this sprint

---

## Block 2 — Local SEO + homepage polish + AI answer rollout

- Strengthen thin local pages: `/dance-classes-hounslow`, `/salsa-classes-acton`, `/salsa-classes-hammersmith`, `/salsa-classes-fulham`, `/salsa-classes-richmond`, `/latin-dance-classes-london`, `/salsa-classes-london`, `/bachata-classes-london`, `/dance-classes-west-london` — unique intros, transit context, local FAQs, internal links
- Homepage "Choose your path" cards (6 paths), "Why beats normal night out" section, blog strip, stronger footer CTA
- Drop `<AnswerBox>` into 10 priority pages
- Internal linking pass — every money page gets ≥3 contextual links

---

## Block 3 — 12 blog posts + blog CTA system

12 new posts under `src/pages/blog/` covering corporate, hen party, beginners-shy, etiquette, social-making, Latin social, after-work, date night, etc. Each: 900–1,500 words, Article + FAQPage schema, mid-article + bottom CTAs (`BlogCTA`, `BlogSidebarCTA` already exist), related articles, dateModified, author Melitta Siomos. Add new categories to `Blog.tsx` index.

---

## Block 4 — Wix docs + SEO/schema/sitemap QA + launch pack

- Update docs 11, 16, 18, 20, 22, 27 with all new routes + Wix CMS mapping
- `docs/29-PARTNER-BACKLINK-TOOLKIT.md`, `docs/30-GBP-REVIEWS-LOCAL-PACK-SYSTEM.md`
- Run `seo-qa`, `schema-validate`, `redirect-audit`, sitemap regen
- Final report: pages added/improved, schema added, GSC inspection list, deferred items

---

## Technical notes (for the record)
- All pages use existing `<Layout>` + `<SeoHead>` pattern — no architectural changes
- Forms: reuse the contact enquiry pipeline (Supabase `enquiries` table) with new `subject` enum values rather than building new tables
- All schema generated client-side via `SeoHead` `schema` prop; Wix replication keeps the JSON-LD strings as-is per existing convention
- No new dependencies
- Each block ends with typecheck-clean state before moving to the next

Approve and I'll ship Block 1 now.