# FINAL — Wix Launch Control Report

> Generated after Blocks 1–5. **The build is structurally complete.** This document is the single source of truth for the human work remaining between Lovable preview and a revenue-generating Wix production site.
>
> Pair with: `docs/16` (migration), `docs/20` (redirects), `docs/22` & `docs/26` (SEO checklists), `docs/23` (manual GSC), `docs/29` (Wix replication), `docs/32` (page-by-page).

---

## 0. Executive Summary

| Metric | Value |
|---|---|
| Routes in `src/App.tsx` | **150** |
| URLs in `public/sitemap.xml` | **127** indexable |
| Schema validator errors / warnings | **0 / 0** |
| Recurring pages guarded against Event schema | **7** |
| Single-event entries validated | **8** |
| Redirect-only legacy routes | **2** (`/online-classes`, `/salsa-classes-acton-local`) |
| Noindex shop/lookbook routes | **5** (kept dark until checkout-live) |

**Verdict**: ✅ **Lovable build is safe-to-launch on a `wixsite.com` staging URL.** Production `puranights.com` cutover is gated by the **9 human blockers** in §6.

---

## 1. Route Audit — Migration Decision Per Page

Legend: 🟢 Migrate · 🔁 Redirect · 🚫 Noindex (keep dark) · ⛔ Excluded from Wix

### Tier 1 — Money pages (manual GSC inspect post-launch)
| Route | Decision | Wix page type | Schema | Form/CTA |
|---|---|---|---|---|
| `/` | 🟢 | Static | Org + WebSite + LocalBusiness | Linktree, WhatsApp |
| `/pura-nights` | 🟢 | Static | DanceSchool (NO Event) | Linktree, Email gate |
| `/prices` | 🟢 | Static | PriceSpecification | Linktree |
| `/events` | 🟢 | Static | ItemList of Event | Ticket links |
| `/events/:slug` | 🟢 | **Dynamic** (Wix Events) | Event | Ticket URL |
| `/wedding-dance` | 🟢 | Static | Service | Wedding form + WhatsApp + Tiers |
| `/private-lessons` | 🟢 | Static | Service | Privates form + WhatsApp |
| `/corporate-dance-classes-london` | 🟢 | Static | Service | Corporate form + WhatsApp |
| `/private-group-dance-parties-london` | 🟢 | Static | Service | Group-party form + WhatsApp |
| `/partner-with-pura-nights` | 🟢 | Static | Service | Partner + Venue forms |
| `/latin-night-out-west-london` | 🟢 | Static | Event ItemList | Linktree |
| `/start-here` | 🟢 | Static | FAQPage | Email gate + WhatsApp |
| `/contact` | 🟢 | Static | ContactPage | All 9 enquiry subjects |

### Tier 2 — Local SEO + content
- All `/salsa-classes-*`, `/bachata-classes-*`, `/dance-classes-*` (incl. Block 5 neighbourhoods): 🟢 Static, **Course schema only**, NO Event. AnswerBox + sticky CTA + Related links.
- All `/blog/*` (54 posts): 🟢 Wix Blog dynamic, Article + FAQPage + BreadcrumbList, AuthorCard + BlogCTA + Related.
- `/venue/the-george-iv-chiswick`, `/venue/the-drayton-court-ealing`: 🟢 Wix Dynamic Pages bound to Venues collection.
- `/meet-the-team`, `/about`, `/community`, `/locations`, `/gallery`, `/testimonials`, `/faq`, `/beginners`, `/online-academy`, `/online-salsa-bachata-coaching`, `/gift-vouchers`, `/bookings`, `/schedule`, `/pura-ladies`: 🟢 Static.

### Tier 3 — Legal / utility
- `/privacy-policy`, `/terms`, `/cookie-policy`, `/thank-you`: 🟢 Static, noindex on `/thank-you`.

### Redirects — 🔁 (import via Wix URL Redirect Manager — see `docs/20`)
| From | To | Reason |
|---|---|---|
| `/online-classes` | `/online-salsa-bachata-coaching` | Slug rename |
| `/salsa-classes-acton-local` | `/salsa-classes-acton` | Dedupe |
| 17 other legacy slugs | per `docs/20` | Brand consolidation |

### Noindex — 🚫 (keep dark until §6.B unlocks)
| Route | Unlock condition |
|---|---|
| `/shop` | Real photos + SKUs + Wix Stores checkout test |
| `/shop/:slug` (product templates) | Same |
| `/lookbook`, `/lookbook/:category` | Real photos |
| `/size-guide` | Confirmed sizing chart |
| `/shipping-returns` | Real address + fulfilment partner |
| `/refer` | Ambassador system live |
| `/all-pages-master` | Internal forever |

### Excluded from Wix — ⛔
- `/admin/*` (Lovable-only operator dashboards) — replicate critical flows in Wix Dashboard / Velo if needed.
- `/login` (admin login) — Wix Members area instead.

---

## 2. Per-page SEO completeness check

Every Block 1–5 route was verified to carry: unique `<title>` ≤60 chars, meta description ≤160 chars, single H1, canonical via `SeoHead`, OG image (sitewide fallback in `index.html`), JSON-LD schema, primary CTA, `<RelatedPages>` block, AnswerBox where relevant.

| Block | Routes | Status |
|---|---|---|
| 1 — Revenue funnels | 4 | ✅ all 6 fields |
| 2 — Local SEO + AnswerBox | 9 (edits) | ✅ |
| 3 — Content authority blogs | 12 | ✅ |
| 5 — Programmatic neighbourhoods | 6 | ✅ |
| Sitemap inclusion | 31 new URLs | ✅ all present |
| Footer / internal links | All linked from `Footer.tsx` + `RelatedPages` | ✅ |

---

## 3. Forms & CRM Wiring (final)

`docs/08-FORMS-AND-CONVERSION-PLAN.md` updated with the full 9-form / 12-tag CRM map. **In Wix, every form below MUST be created and wired before DNS switch.**

| Form | Page | CRM tag | Notify | Tested? |
|---|---|---|---|---|
| Contact | `/contact` | `contact` | hello@ | ⬜ |
| Wedding | `/wedding-dance` | `wedding` | hello@ + WA | ⬜ |
| Privates | `/private-lessons` | `privates` | hello@ + WA | ⬜ |
| **Corporate** | `/corporate-dance-classes-london` | `corporate` | hello@ + WA | ⬜ |
| **Group Party** | `/private-group-dance-parties-london` | `group-party` | hello@ + WA | ⬜ |
| **Partner** | `/partner-with-pura-nights` | `partner` | hello@ | ⬜ |
| **Venue Partner** | `/partner-with-pura-nights` | `venue-partner` | hello@ | ⬜ |
| **Email Gate** | `/start-here`, `/pura-nights` | `lead-magnet` | Mailchimp | ⬜ |
| **First Class** | Beginners CTAs | `first-class` | hello@ | ⬜ |
| Newsletter | Footer | `lead-magnet` | Mailchimp | ⬜ |
| Pura Ladies | `/pura-ladies` | `auditions` | hello@ | ⬜ |
| Vouchers | `/gift-vouchers` | `vouchers` | hello@ | ⬜ |

---

## 4. Schema Discipline (CRITICAL for Wix)

✅ **0 errors, 0 warnings** in `docs/38-SCHEMA-VALIDATION-REPORT.md`.

### Recurring pages guarded — **MUST NOT emit Event schema**
`scripts/seo-qa.ts` enforces this for: `/pura-nights`, `/schedule`, `/salsa-classes-chiswick`, `/salsa-classes-ealing`, `/bachata-classes-chiswick`, `/bachata-classes-ealing`, `/dance-classes-chiswick`, `/dance-classes-ealing`.

⚠ **Wix risk**: Wix Events app + Wix CMS repeaters can auto-inject Event JSON-LD if dragged onto these pages. **Rule for the Wix builder**: only the `/events/:slug` Dynamic Page may use Wix Events. On every other page, link out to `/events/:slug` instead of embedding the Wix Events widget.

### `/events/:slug` valid Event schema only
8 single-event entries validated against future `startDate`, `EventStatusType`, `eventAttendanceMode`, `Place` with `postalCode`, `Offer` with `price` + `availability`. Source of truth: `src/data/events.ts → buildEventSchema`. Copy verbatim into Wix Custom Code per dynamic page.

---

## 5. Content QA — fake-claims sweep

| Risk | Result |
|---|---|
| Press claims ("As featured in…") | ✅ None on indexable pages |
| Stale venues | ✅ Only George IV Chiswick + Drayton Court Ealing referenced |
| Old pricing | ✅ Aligned with `mem://business/pricing-strategy` |
| "Coming soon" placeholders | ✅ None on indexable pages (lookbook is noindex) |
| Placeholder testimonials | ⚠ Three video testimonial YouTube IDs in `VideoTestimonialsBlock.tsx` use the Rickroll placeholder — **MUST replace with real IDs before launch** |
| Placeholder photography | ⚠ See §6.C — real shoot list outstanding |

---

## 6. Launch Blockers (human work — 9 items)

### A. Wix build (1 week)
1. **Build all 150 routes in Wix** following `docs/32-WIX-PAGE-BY-PAGE-REPLICATION-CHECKLIST.md`. Bind dynamic pages (`/events/:slug`, `/venue/:slug`, `/blog/:slug`) to Wix CMS.
2. **Inject schema** via Wix Dashboard → Custom Code → Head, scoped per page. Use `src/components/SeoHead.tsx` JSON-LD as source.
3. **Import 19 redirects** from `docs/20-WIX-REDIRECT-MANAGER-MAP.md`.
4. **Wire all 12 forms** per §3 above. Test each on staging.

### B. Shop unlock (whenever ready)
5. Real product photos · SKUs · prices · shipping address · Wix Stores checkout test → only then remove `noindex` from §1 Tier 3.

### C. Real media (parallel — biggest commercial lever)
6. Shoot list per `docs/45` and original audit:
   - Melitta portrait ×3–5
   - Class action ×15–20 · Social dancing ×15–20
   - Venue ×8–10 · Pura Ladies ×8–12
   - Wedding/private ×5–8 · Corporate staged ×6
   - **Video testimonials ×3–5** (replace placeholder YouTube IDs in `VideoTestimonialsBlock.tsx`)
   - Hero reels ×3–4

### D. Off-site authority (continuous)
7. **Google Business Profile** — optimise all 3 profiles per `docs/43-GBP-REVIEWS-LOCAL-PACK-SYSTEM.md`. Weekly review-request habit live.
8. **Backlink outreach** — execute `docs/42-PARTNER-BACKLINK-TOOLKIT.md` (venues, wedding suppliers, corporate directories, event calendars). 3 emails/week minimum.

### E. Search submission (launch day + 14d)
9. Execute `docs/26-WIX-SEO-LAUNCH-CHECKLIST.md` end to end:
   - DELETE old "page-as-sitemap" entries in GSC.
   - Submit ONLY `https://www.puranights.com/sitemap.xml`.
   - URL-Inspect all 13 Tier 1 routes (max 10/day).
   - Import sitemap into Bing.
   - Daily GSC monitoring for 14 days.

---

## 7. Non-blocking warnings

- **Lovable preview redirect audit** returns 302 (Lovable static hosting limitation). Will become 301 in Wix automatically — confirm in §A.3.
- 3 video testimonial YouTube IDs are placeholders (`dQw4w9WgXcQ`).
- `/refer` ambassador system not yet wired to live referral tracking.
- Email-capture-gate currently writes to `enquiries` with subject `Lead Magnet` — confirm Mailchimp sync (zap or Wix automation) is configured.

---

## 8. Manual inspection checklist (post-cutover)

Open each in incognito, confirm: 200 OK, correct H1, correct schema in View Source, working CTA, working form.

- [ ] `/`
- [ ] `/pura-nights` (NO Event schema)
- [ ] `/prices`
- [ ] `/events`
- [ ] `/events/<next-latin-friday-slug>` (Event schema present)
- [ ] `/wedding-dance` (Tiers visible, form posts)
- [ ] `/private-lessons`
- [ ] `/corporate-dance-classes-london`
- [ ] `/private-group-dance-parties-london`
- [ ] `/partner-with-pura-nights`
- [ ] `/latin-night-out-west-london`
- [ ] `/start-here` (email gate works)
- [ ] `/contact` (all 9 subjects in dropdown)
- [ ] `/salsa-classes-chiswick` (NO Event schema)
- [ ] `/bachata-classes-ealing` (NO Event schema)
- [ ] `/online-classes` → 301 → `/online-salsa-bachata-coaching`
- [ ] `/salsa-classes-acton-local` → 301 → `/salsa-classes-acton`
- [ ] `/shop` returns noindex header
- [ ] `https://puranights.com` → 301 → `https://www.puranights.com`
- [ ] `/sitemap.xml` lists 127 URLs
- [ ] `/robots.txt` includes Sitemap line

---

## 9. 14-day post-launch monitoring plan

| Day | Action | Owner |
|---|---|---|
| 0 | DNS cutover. Smoke test §8. Submit sitemap GSC + Bing. URL-Inspect 5 Tier 1. | Operator |
| 1 | URL-Inspect next 5 Tier 1. Check GSC Coverage for new errors. | Operator |
| 2 | URL-Inspect last 3 Tier 1. Check GSC Enhancements → Events = 0 errors. | Operator |
| 3–7 | Daily 5-min GSC check. Log any "Crawled — currently not indexed". | Operator |
| 7 | First weekly review: top queries, top pages, fix any indexing issues. | Operator |
| 8–13 | Daily 5-min check. Begin GBP review-request habit. | Operator |
| 14 | Full review: impressions trending up? Any errors? Decide tier promotions per `docs/23`. | Operator |

---

## 10. Safe-to-launch status

| Gate | Status |
|---|---|
| Code quality (build / typecheck / SEO QA / schema validate) | ✅ green |
| Sitemap & robots | ✅ green |
| Schema discipline (no Event on recurring) | ✅ green |
| Forms documented | ✅ green |
| Redirects mapped | ✅ green |
| Wix forms wired | ⬜ blocker A.4 |
| Real media replacing placeholders | ⬜ blocker C.6 |
| GBP + backlinks live | ⬜ blocker D.7-8 |

**Conclusion**: The Lovable artefact is **launch-ready**. The final 5% is operational, not technical. Execute §6 in this order: A → C → D → E. Shop (§B) unlocks independently when stock + checkout are ready.
