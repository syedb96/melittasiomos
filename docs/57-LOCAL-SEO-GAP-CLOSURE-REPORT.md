# 57 — Local SEO Gap Closure Report

_Sprint date: 2026-05-20_

## Goal
Convert remaining C-grade local pages to B+/A and remove duplicate risk on the Acton cluster.

## Decisions

### Acton cluster — duplicate risk closed
- **/salsa-classes-acton** → canonical commercial Acton page (kept, upgraded).
- **/salsa-classes-acton-local** → permanently a client-side 301 redirect to `/salsa-classes-acton` (`<Navigate replace>` + `noindex,follow` + canonical to the Acton URL). Sitemap already excludes it.
- **Wix replication note:** in Wix → Settings → SEO → URL Redirect Manager add `From: /salsa-classes-acton-local → To: /salsa-classes-acton (301 Permanent)`. No content on the legacy URL in Wix.

## Pages upgraded with new `LocalTrustBlock`
A single editorial 2-column block giving (1) nearest venue, (2) travel time, (3) best night, (4) who it suits, (5) come-alone reassurance, (6) proof quote, (7) Schedule / Start Here / WhatsApp CTAs.

| Page | Nearest venue | Travel | Why |
|---|---|---|---|
| `/salsa-classes-hammersmith` | George IV, W4 | 6 min District Line | Make Hammersmith→Chiswick proximity feel obvious |
| `/salsa-classes-fulham` | George IV, W4 | 12 min District Line | Differentiate from Chiswick page with Fulham-specific framing |
| `/salsa-classes-richmond` | George IV, W4 | 12 min District Line | Local proof from Richmond/Kew/St Margarets |
| `/dance-classes-hounslow` | Drayton Court, W13 | 15 min Elizabeth Line | Was C-grade — now carries proof + WhatsApp |
| `/salsa-classes-acton` | Both venues | 4 min District / 6 min Elizabeth | Strongest local case: two equally close options |
| `/latin-dance-chiswick` | George IV (own venue) | — | Added AnswerBox + trust block; was thin |
| `/latin-dance-ealing` | Drayton Court (own venue) | — | Added AnswerBox + trust block; was thin |

## AnswerBox added where missing
- `/latin-dance-chiswick` — "What's the best Latin dance night in Chiswick?"
- `/latin-dance-ealing` — "What are the best Bachata classes in Ealing?"

All other London/local money pages already carried an AnswerBox (audited via `rg AnswerBox src/pages/`).

## City-wide pages reviewed (no structural changes required)
`/salsa-classes-london`, `/bachata-classes-london`, `/latin-dance-classes-london` already contain: split-level pricing tables, FAQ schema, AnswerBox, RelatedPages, and editorial intros. Single H1, canonical, dateModified present. Marked **B+** in current state — no edits this sprint to avoid risk of regression on already-indexed pages.

## Remaining human blockers
- Replace placeholder YouTube IDs (see `docs/55-VIDEO-ASSET-REPLACEMENT-LIST.md`).
- Optimise the 3 GBP profiles (Chiswick / Ealing / Covent Garden) with 30+ photos each.
- Begin local backlink outreach from `docs/42-PARTNER-BACKLINK-TOOLKIT.md`.

## QA status
SEO QA · schema validation · sitemap check · blog conversion audit — see `docs/49` and `docs/54` for last clean run; this sprint did not modify schema, canonicals, or sitemap.
