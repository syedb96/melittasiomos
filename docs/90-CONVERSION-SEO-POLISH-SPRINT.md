# 90 — Conversion + SEO Polish Sprint (Wix Handoff)

Date: 2026-06-09

## Scope
A targeted polish pass on the highest-traffic, highest-intent pages. No
new low-quality pages, no fabricated claims, no Event schema on recurring
class pages, no top-nav additions.

## 1. New components
- `src/components/ClassMatchBlock.tsx` — reusable "Which class is right
  for me?" self-select block. 6 options, each with its own tracking
  event and an internal link to the matching service page. Wix-safe
  (single Strip + Repeater + button per item).

## 2. Pages improved (ClassMatchBlock inserted)
- `/` — `src/pages/Index.tsx` (warm tone, before lead magnet)
- `/pura-nights` — `src/pages/PuraNights.tsx` (ivory, before final CTA)
- `/prices` — `src/pages/Prices.tsx` (warm, before MembershipPathway)
- `/loyalty` — `src/pages/Loyalty.tsx` (ivory, before FAQ)
- `/salsa-bachata-west-london` — `src/pages/SalsaBachataWestLondon.tsx`
  (ivory, before PartnerCTA)

Each insertion is a single component drop — no surrounding copy was
rewritten and no existing CTAs were removed.

## 3. CTAs added / changed
- 6 new self-select CTAs per page (1 per audience): Start Here,
  Weekly Classes, Wedding Dance, Private Lessons, Corporate / Group
  Sessions, Loyalty Card. All use the existing `.btn-cta-primary`
  styling (no design drift).
- No CTA copy on existing blocks was rewritten in this sprint to
  avoid conflicting with audited copy from sprints 73, 77, 79.

## 4. AnswerBoxes
Existing AnswerBoxes verified in place on:
`/pura-nights`, `/prices`, `/loyalty`, `/salsa-bachata-west-london`,
`/start-here`, `/`, `/resources`, `/private-lessons`,
`/wedding-dance`, `/corporate-dance-classes-london`,
`/latin-dance-corporate-events-london`.
No new fabricated content was added — existing answers already cover
the topic list. If gaps surface in the next SEO scan, extend per page
with the same `AnswerBox` component (`src/components/AnswerBox.tsx`).

## 5. Internal links added
- 5 new contextual internal links per page where ClassMatchBlock is
  inserted (5 pages × 6 links = 30 new in-body internal links
  pointing at the core revenue funnels: Start Here, Pura Nights,
  Wedding Dance, Private Lessons, Corporate, Loyalty).

## 6. Schema changes
- None. Existing FAQPage / Service / WebPage / BreadcrumbList /
  Article schemas remain correct (see docs/38, docs/64). No Event
  schema added to recurring class pages.

## 7. Metadata changes
- None this sprint. Money-page titles + descriptions were already
  trimmed in the previous SEO pass (Index.tsx, SalsaClassesLondon,
  BachataClassesLondon, blog/WhatIsSalsa).

## 8. Tracking events added
Fired via `trackEvent("class_match", <event>, <to>)`:
- `class_match_beginner_click`
- `class_match_weekly_click`
- `class_match_wedding_click`
- `class_match_private_click`
- `class_match_corporate_click`
- `class_match_loyalty_click`

Wix replication: wire each button to a custom event with the same
name in Wix Analytics → Custom Events.

## 9. WhatsApp templates
No new WhatsApp presets added in this sprint. The existing presets
in `src/lib/whatsapp.ts` cover all routes touched.

## 10. Sitemap
- Count after sprint: **149 URLs** (unchanged — no new indexable
  pages were created).
- `/website-credits`, `/loyalty`, `/salsa-bachata-west-london`,
  `/latin-dance-corporate-events-london` remain included from the
  previous sprint.

## 11. Hard-rule compliance
- ✅ No free-lesson claims added.
- ✅ No invented venues, reviews, partners, awards, testimonials.
- ✅ No Event schema added to recurring weekly pages.
- ✅ Top navigation unchanged (Header.tsx untouched).
- ✅ No placeholder / admin / experimental pages indexed.
- ✅ All new components carry `<!-- WIX SECTION -->` comments and
  use only Strip + Repeater + Card primitives.
- ✅ Canonical host `https://www.puranights.com` unchanged.

## 12. Human blockers / still needs human input
1. **Testimonial category labels** — only Melitta has the source-of-
   truth list of which Google review belongs to which service
   (Wedding / Weekly / Pura Ladies / Private). Add labels via the
   Wix Testimonials CMS once mapped.
2. **Loyalty eligibility rules** — confirm whether bundle classes
   count toward the 8+1 (currently described as "eligible — confirm
   with Melitta").
3. **Real photo replacements** — `/loyalty` and
   `/latin-dance-corporate-events-london` use stock/placeholder
   assets pending real photography.
4. **Service-page testimonial mapping** — once categories are
   labelled, link testimonial cards to the correct service page
   (Wedding card → /wedding-dance, etc.).

## 13. Wix replication notes
ClassMatchBlock maps 1:1 to:
- Wix Strip with background `section-warm` (#F8F3EE) or `section-ivory`.
- Heading + subtitle text element.
- Repeater (6 items) with: title text element, paragraph text
  element, button linking to internal page.
- Wix Analytics → Custom Event on each button click using the
  `class_match_*_click` names listed in section 8.
