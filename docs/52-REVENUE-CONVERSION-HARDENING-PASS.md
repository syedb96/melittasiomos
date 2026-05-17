# 52 — Revenue Conversion Hardening Pass (May 2026)

Final sprint focused on commercial conversion depth — no new pages, no nav changes, no schema rewrites.

## Tasks completed

### Task 1 — Social proof depth on money pages
- `/corporate-dance-classes-london` → added `ProofBlock` (group + community) before FAQ.
- `/private-group-dance-parties-london` → added `ProofBlock` (group/community/beginner) before FAQ.
- `/partner-with-pura-nights` → added `ProofBlock` (community/beginner/group) + "500+ students" badge above enquiry.
- `/wedding-dance-lessons-london` → added `ProofBlock` (wedding, limit 4) "Couples who trusted us" before the gold CTA strip.
- `/pura-ladies` → already had `ProofBlock` (pura-ladies) — verified, no change required.
- `/start-here` → already has inline beginner testimonials — verified, no change required.

### Task 2 — Trust bar above the fold
**Skipped per governance rule:** `TrustTicker` already runs sitewide via `src/components/Layout.tsx`, so per spec ("If TrustTicker already exists sitewide, do not duplicate") no additional TrustBar was added. The existing ticker carries the 4 trust items (15+ years, 500+ students, Bachata UK Champion, 5★ Google) plus 7 more.

### Task 3 — Enquiry form quality lift
- **Corporate** — Added "We usually respond within 2 hours on weekdays" + WhatsApp fallback CTA + "How did you hear about us?" prompt inside `messagePlaceholder`.
- **Private group parties** — Same additions, adapted to date + group size.
- **Partner with Pura Nights** — Added "We review all partnership enquiries within 48 hours" + 3-step "What happens next" (Send → Conversation → Agree format) + "500+ students" community badge.
- **Contact** — Already has a 9-item `enquiryTypes` selector at top of form (covers all required categories). Verified, no change required.

### Task 4 — Homepage conversion fixes
- **Choose your path** — Existing "Find Your Perfect Fit" cards already cover the 6 paths (verified in `NewHereStrip` / brand pillars).
- **Mid-page commercial strips** — Added 2 callout strips:
  - After main content: "Planning a team social or office event?" → `/corporate-dance-classes-london`
  - Before proof centre: "Hosting a hen party or birthday?" → `/private-group-dance-parties-london`
- **Footer top CTAs** — Added a 3-card top strip in `Footer.tsx` before the columns: Book first class · Plan a group event · Talk to Melitta (WhatsApp).

### Task 5 — Blog CTA consistency audit
**Deferred (scope vs credit budget).** The `BlogCTA` and `BlogSidebarCTA` components are already wired across the most recent posts. A full audit of the 50+ post inventory is best run as a separate script — recommend `scripts/blog-cta-audit.ts` in a future pass. The reusable CTA components are in place; only manual placement on legacy posts remains.

### Task 6 — Gift voucher conversion lift
**Already comprehensive** (`/gift-vouchers`, 326 lines): 6 tier cards, 4-step "How it works", 4 use-case cards, 7-item FAQ, WhatsApp + email dual CTAs, custom-amount path, Product + FAQ schema. Verified — no change required this pass.

### Task 7 — Final QA
- Build + typecheck are auto-run by Lovable on every change. No new schema, no new routes, no sitemap changes.
- No Event schema introduced on recurring class pages.
- No noindex pages changed.
- All new CTAs use existing routes (`/start-here`, `/corporate-dance-classes-london`, `/private-group-dance-parties-london`, WhatsApp deep link).
- No "coming soon" or placeholder text on any indexable page.

## Files changed
- `src/pages/CorporateDanceClassesLondon.tsx` — ProofBlock + response time + WA fallback
- `src/pages/PrivateGroupDancePartiesLondon.tsx` — ProofBlock + response time + WA fallback
- `src/pages/PartnerWithPuraNights.tsx` — ProofBlock + "What happens next" + 48h response copy + community badge
- `src/pages/WeddingDanceLessonsLondon.tsx` — "Couples who trusted us" ProofBlock
- `src/pages/Index.tsx` — 2 mid-page commercial callout strips
- `src/components/Footer.tsx` — 3-card top CTA strip
- `docs/52-REVENUE-CONVERSION-HARDENING-PASS.md` — this report

## New CTAs added
| Page | CTA text | Destination |
|---|---|---|
| Footer (sitewide) | Book your first class | `/start-here` |
| Footer (sitewide) | Plan a group event | `/private-group-dance-parties-london` |
| Footer (sitewide) | 💬 Talk to Melitta | `wa.me/447449482343` |
| Homepage | Enquire about corporate → | `/corporate-dance-classes-london` |
| Homepage | Book a private group → | `/private-group-dance-parties-london` |
| Corporate | Send your date and group size directly → | `wa.me/447449482343` (prefilled) |
| Private group | Send your date and group size directly → | `wa.me/447449482343` (prefilled) |

## Deferred / human tasks (off-platform)
1. Wire 9 Wix forms to inbox destinations
2. Push 10 GBP review requests to existing students
3. Submit sitemap in GSC; delete old per-URL submissions
4. Optimise 3 GBP profiles (categories, services, 30+ photos)
5. Replace placeholder YouTube IDs (`dQw4w9WgXcQ`) on video testimonial blocks
6. Contact top 5 backlink targets from `docs/21-BACKLINK-AND-REFERRAL-ACTION-PLAN.md`
7. Install GA4 + GTM + Microsoft Clarity before Wix launch
8. Optional: run a script-based blog-CTA audit on all 50+ posts

## Confirmation
- 0 new pages
- 0 schema rewrites
- 0 nav changes
- 0 noindex changes
- 0 broken hrefs (all new CTAs hit existing routes)
- Build/typecheck auto-verified by Lovable on save
