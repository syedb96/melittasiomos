# 46 — Market Domination Gap Audit
_Date: 2026-05-16 · Status: pre-Wix-cutover audit_

> Audit of the Lovable build before final Wix migration. Decision lens:
> **does this materially drive ranking, conversion or revenue?** If no, do not build.

---

## 1. What is already strong — DO NOT REBUILD

| Area | State | Note |
|---|---|---|
| Sitewide SEO infrastructure | ✅ Strong | `SeoHead.tsx` injects global `DanceSchool/LocalBusiness` + auto breadcrumbs + canonicals on every route. |
| Sitemap & route discovery | ✅ Strong | `scripts/seo-qa.ts` auto-merges App.tsx routes; single www host. |
| Robots / hreflang / OG | ✅ Strong | en-GB + x-default; OG defaults; per-route override pattern. |
| Recurring page Event-schema guard | ✅ Strong | `RECURRING_PAGES` list in `seo-qa.ts`; no misused Event JSON-LD. |
| Money pages (live) | ✅ Strong | `/pura-nights`, `/wedding-dance`, `/private-lessons`, `/corporate-dance-classes-london`, `/private-group-dance-parties-london`, `/partner-with-pura-nights`, `/gift-vouchers`. |
| Local pages | ✅ Strong | Chiswick, Ealing, Acton, Hammersmith, Richmond, Fulham, Hounslow, plus programmatic Brentford/Kew/Barnes/Putney/Shepherd's Bush/Notting Hill. |
| Blog engine | ✅ Strong | 60+ posts, Article schema, RelatedArticles + NewsletterSignup footer. |
| Conversion components | ✅ Strong | `AnswerBox`, `EnquiryForm`, `EmailCaptureGate`, `WeddingTiers`, `VideoTestimonialsBlock`, `WhatsAppButton`, `StickyMobileCTA`, `ExitIntentPopup`. |
| Forms plan | ✅ Strong | doc 08 maps 9 enquiry forms → 12 CRM tags. |
| Wix handoff docs | ✅ Strong | docs 15/16/22/26/27/29/30/32/34/35 + FINAL-WIX-LAUNCH-CONTROL. |

---

## 2. Pages strong enough for Wix migration as-is
- Homepage `/`
- `/pura-nights`, `/schedule`, `/prices`, `/start-here`, `/beginners`
- `/wedding-dance`, `/private-lessons`, `/gift-vouchers`
- `/corporate-dance-classes-london` (now upgraded — see §4)
- `/private-group-dance-parties-london`, `/partner-with-pura-nights`
- `/salsa-classes-chiswick`, `/bachata-classes-ealing`, `/dance-classes-west-london`
- `/events`, `/events/:slug`, `/latin-night-out-west-london`
- All `/blog/*` (60+ posts)
- Venue: `/venue/the-george-iv-chiswick`, `/venue/the-drayton-court-ealing`
- Pillars: `/learn/salsa-bachata-guide`, `/learn/salsa-vs-bachata`

## 3. Pages that need content deepening
| Page | Gap | Action this sprint |
|---|---|---|
| `/pura-ladies` | Needed an AnswerBox + audition pathway clarity | ✅ added in this sprint |
| `/bachata-performance-team-london` | Light vs `/pura-ladies`, possible dedupe | Keep as keyword-targeted variant; link back to `/pura-ladies` hub |
| `/salsa-classes-shepherds-bush`, `/salsa-classes-notting-hill` | Programmatic — fine, but ensure linked from `/dance-classes-west-london` | Keep as-is |
| `/online-academy` | Pre-launch — keep indexed only if real product is live | Hold |

## 4. Pages that need CTA improvements
| Page | Fix |
|---|---|
| `/corporate-dance-classes-london` | ✅ already has #enquiry anchor + WhatsApp prefill |
| `/pura-ladies` | ✅ added WhatsApp prefill + clearer "ask about joining" CTA |
| `/wedding-dance-lessons-london` | Verify WeddingTiers + WhatsApp prefill is present |
| Most local pages | All have WhatsApp + Book Now; consistent |

## 5. Internal linking gaps
- Add `/salsa-bachata-classes-covent-garden` into footer/RelatedPages on `/private-lessons`, `/online-salsa-bachata-coaching`, `/pura-nights` — handled via that page's own RelatedPages outbound (inbound covered by sitemap + topical map doc 47).
- Pura Ladies hub <-> `/bachata-performance-team-london` cross-link — already present.

## 6. Schema / metadata
- All checked by `scripts/schema-validate.ts` — 0 errors / 0 warnings.
- New Covent Garden page emits `Service + FAQPage` (no Event misuse).

## 7. Missing revenue opportunities (closed in this sprint)
| Gap | Closed by |
|---|---|
| No premium Central London / Covent Garden page | ✅ `/salsa-bachata-classes-covent-garden` |
| Pura Ladies lacked AnswerBox + WhatsApp prefill | ✅ updated |
| No topical authority + internal linking master | ✅ doc 47 |
| No content domination shortlist | ✅ doc 48 |
| No post-sprint SEO QA report | ✅ doc 49 |

## 8. Missing AI/GEO answer opportunities (closed)
AnswerBox now present on: Homepage, `/pura-nights`, `/start-here`, `/prices`, `/wedding-dance`, `/private-lessons`, `/corporate-dance-classes-london`, `/pura-ladies` (new), `/online-salsa-bachata-coaching`, `/salsa-bachata-classes-covent-garden` (new), `/salsa-classes-chiswick`, `/bachata-classes-ealing`.

## 9. Missing local search opportunities
- ✅ Covent Garden/Central London now covered honestly (no thin doorway).
- Already covered: Chiswick, Ealing, Acton, Richmond, Hammersmith, Fulham, Hounslow, Brentford, Kew, Barnes, Putney, Shepherd's Bush, Notting Hill.
- **Do not create**: Mayfair, Kensington, Marylebone, Islington, Camden — no service rationale, would be doorway spam.

## 10. What NOT to build
- More thin local doorway pages.
- Dashboards/automations beyond what already exists.
- Programmatic neighbourhood pages outside West/SW London.
- More blog posts (60+ already) until the existing top-10 are polished.
- New Top-nav items — keep nav lean.

## 11. Priority order for next 14 days (post-this-sprint)
1. Replace placeholder YouTube IDs in `VideoTestimonialsBlock`.
2. Wire 12 Wix Forms → CRM tags (per doc 08).
3. GBP — request 10 new reviews (per doc 43).
4. Backlink outreach — venues + suppliers (per doc 42).
5. Submit Tier 1 URLs in GSC (per doc 23).
6. Polish 3 highest-leverage blog posts (per doc 48).
7. Replace placeholder photos with real shoot.
8. Begin 14-day monitoring window.
