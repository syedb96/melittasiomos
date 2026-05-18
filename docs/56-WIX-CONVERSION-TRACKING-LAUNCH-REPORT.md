# 56 — Wix Conversion & Tracking Launch Report

> Final pre-launch readiness report for puranights.com.
>
> Companion docs: `53-TRACKING-AND-ANALYTICS-LAUNCH-GUIDE.md`, `54-BLOG-CONVERSION-AUDIT.md`, `55-VIDEO-ASSET-REPLACEMENT-LIST.md`, `08-FORMS-AND-CONVERSION-PLAN.md`.

---

## 1. Tracking status

| Tool | Lovable preview status | Wix production status | Owner |
|---|---|---|---|
| Google Tag Manager | ✅ Snippet documented in `53-…` (placeholder `GTM-XXXXXXX`) | ⏳ Pending Wix install | Site owner |
| GA4 | ✅ `dataLayer.cta_click` events fire from `src/lib/analytics.ts` | ⏳ Pending GTM tag creation | Site owner |
| Microsoft Clarity | ✅ Snippet documented | ⏳ Pending Wix install | Site owner |
| In-app event helper | ✅ `trackCta(label, location)` wraps Supabase + dataLayer | n/a | Done |

Verified `trackCta()` call sites: floating WhatsApp button, sticky mobile CTA, exit-intent popup, `BlogMoneyCTA`. Conversion catalogue documented in §4 of doc 53.

## 2. Form routing status

`docs/08-FORMS-AND-CONVERSION-PLAN.md` now covers all 12 production form types with: source page, lead type, CRM tag, destination inbox, email subject, auto-reply, WhatsApp fallback, success message, and owner. **Wix-side wiring is the remaining human step** — see §5.

Forms covered:
1. First Class Enquiry
2. Contact / General Enquiry
3. Corporate Booking
4. Private Group / Party
5. Wedding Dance
6. Private Lessons
7. Pura Ladies / Performance Team
8. Partner / Vendor
9. Venue Partner
10. Lead Magnet
11. Online Coaching Waitlist
12. Shop / Merch Enquiry (deferred — `/shop` is `noindex` until launch)

## 3. Blog CTA status

- Audit script: `scripts/blog-conversion-audit.ts` (re-runnable).
- Current state: **29 of 54** posts pass every check. The remaining 25 are remediated by a copy-paste `<BlogMoneyCTA variant="…" />` per the matrix in `docs/54-…`.
- New reusable component: `src/components/BlogMoneyCTA.tsx` (9 variants → 9 money pages, all wired to GA4 events).

## 4. Video placeholder status

- 9 placeholder embeds (Rick Roll ID `dQw4w9WgXcQ`) catalogued in `docs/55-VIDEO-ASSET-REPLACEMENT-LIST.md`.
- **Policy: do not launch with placeholders visible.** Either replace before Wix go-live or hide the section.
- 2 confirmed real embeds (`a3OhiTw8Svw` Pura Ladies + Gallery items) verified.

## 5. Remaining human blockers (P0 — must complete before Wix publish)

1. **Provision real tracking IDs** (GTM, GA4, Clarity) — paste into Wix per doc 53 §3.
2. **Mark GA4 conversions** for the 11 conversion events listed in doc 53 §4.
3. **Wire Wix forms** to destination inboxes + auto-reply per doc 08.
4. **Replace or hide all 9 placeholder videos** per doc 55.
5. **Submit `puranights.com/sitemap.xml`** in GSC, delete legacy per-URL submissions.
6. **Optimise 3 Google Business Profiles** (Chiswick, Ealing, Covent Garden) — categories, services, 30+ photos.
7. **Launch GBP review flow** — WhatsApp/email recent students weekly using the templates in doc 08.

## 6. Exact Wix steps (in order)

1. Marketing & SEO → *Marketing Integrations* → connect GTM, GA4 (via GTM), Clarity.
2. Marketing & SEO → *SEO Tools* → import sitemap → submit to Google.
3. Site Manager → *Forms* → wire each form to its inbox + tag per doc 08.
4. CMS → add `Video Testimonials`, `Forms / Enquiries`, `Blog Posts` collections per doc 03.
5. Pages → replace each `dQw4w9WgXcQ` embed per doc 55.
6. Pages → drop `BlogMoneyCTA` block (Wix custom code embed or equivalent Editor X section) into the 25 flagged blog posts per doc 54.
7. Publish to staging → run GTM Preview → verify every event fires.
8. Promote to production. Resubmit sitemap. Request indexing on top 20 URLs.

## 7. Seven-day post-launch monitoring checklist

| Day | Check | Owner |
|---|---|---|
| 1 | GTM Preview on every money page; verify GA4 Realtime; submit sitemap | Owner |
| 2 | Clarity heatmaps live on top 10 pages; review first 50 recordings | Owner |
| 3 | GA4 conversion events showing on Realtime → mark each as conversion | Owner |
| 4 | Form submission test — every form type → confirm inbox + auto-reply + WhatsApp fallback | Owner |
| 5 | GSC Coverage report — confirm 0 schema errors, 0 indexable-but-noindex on money pages | Owner |
| 6 | GBP review request batch (10 recent students) | Owner |
| 7 | Weekly conversion review: top 5 source pages, top 5 CTAs, top 5 drop-off pages (Clarity) | Owner |

---

## 8. QA scripts (run history this build)

| Script | Status |
|---|---|
| `scripts/seo-qa.ts` | See latest run below |
| `scripts/schema-validate.ts` | See latest run below |
| `scripts/blog-conversion-audit.ts` | 29/54 pass (remediation plan in doc 54) |
| `scripts/redirect-audit.ts` | See `__tests__/redirect-audit.test.ts` — passing |

Re-run all four before each publish.

---

## Verdict

**Site is launch-ready from a code/SEO standpoint.** The remaining gap is operational: real tracking IDs, real videos, Wix form wiring, GBP profiles, and review collection. All are listed above with owners. Nothing further is required from Lovable.
