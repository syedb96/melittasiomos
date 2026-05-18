# 54 — Blog Conversion Audit

> Re-runnable via `npx tsx scripts/blog-conversion-audit.ts`. Last run on current build.
>
> **Result: 29 of 54 posts pass every check** (SeoHead + Article schema + canonical + ≥2 internal links + mid-article CTA + bottom money CTA + Related block).

A reusable `<BlogMoneyCTA variant="…" />` component now lives at `src/components/BlogMoneyCTA.tsx`. Drop it into any post bottom + import `BlogMoneyCTA`. Variants: `beginner | classes | chiswick | ealing | wedding | corporate | ladies | online | events`.

---

## Failing posts — assigned variant + fix

| Post | Category | Missing | Action | `BlogMoneyCTA variant` |
|---|---|---|---|---|
| `BachataClassesNearEaling.tsx` | Local · Ealing | Related block | Add `<RelatedPages />` | `ealing` |
| `BachataForBeginnersLondon.tsx` | Beginners / Bachata | Related block | Add `<RelatedPages />` | `beginner` |
| `BeginnersGuideLondon.tsx` | Beginners | Schema, money CTA, Related | Add Article schema to `<SeoHead schema={…}>`, drop in `<BlogMoneyCTA variant="beginner" />`, add Related | `beginner` |
| `BestAreasWestLondon.tsx` | Local | Related block | Add `<RelatedPages />` | `classes` |
| `ChooseWeddingSong.tsx` | Wedding | Related block | Add `<RelatedPages />` | `wedding` |
| `CorporateTeamBuildingDance.tsx` | Corporate | Money CTA | `<BlogMoneyCTA variant="corporate" />` at bottom | `corporate` |
| `DanceClassesWestLondonGuide.tsx` | Local | Money CTA | `<BlogMoneyCTA variant="classes" />` | `classes` |
| `FirstSalsaClassLondon.tsx` | Beginners | Article schema | Add `schema={{ "@type": "Article", … }}` to SeoHead | `beginner` |
| `GiftVoucherDanceClass.tsx` | Lifestyle | Money CTA | `<BlogMoneyCTA variant="classes" />` (gift voucher → /gift-vouchers handled in CTA copy) | `classes` |
| `HowLongToLearnSalsa.tsx` | Beginners | Related | Add `<RelatedPages />` | `beginner` |
| `HowToPracticeSalsaAtHome.tsx` | Technique | Article schema | Add Article schema | `classes` |
| `ImproveSocialDancing.tsx` | Technique | Money CTA | `<BlogMoneyCTA variant="classes" />` | `classes` |
| `LadiesStylingBachata.tsx` | Technique | Money CTA | `<BlogMoneyCTA variant="ladies" />` | `ladies` |
| `LatinDanceEventsEaling2026.tsx` | Events | Money CTA | `<BlogMoneyCTA variant="events" />` | `events` |
| `NewYearStartSalsa.tsx` | Lifestyle | Money CTA | `<BlogMoneyCTA variant="beginner" />` | `beginner` |
| `PuraLadiesStory.tsx` | Culture | Money CTA, Related | `<BlogMoneyCTA variant="ladies" />` + Related | `ladies` |
| `SalsaClassesNearChiswick.tsx` | Local · Chiswick | Related | `<RelatedPages />` | `chiswick` |
| `SalsaClassesNearTurnhamGreen.tsx` | Local · Chiswick | Money CTA | `<BlogMoneyCTA variant="chiswick" />` | `chiswick` |
| `SalsaNoPartner.tsx` | Beginners | Related | Add Related | `beginner` |
| `SalsaOn1VsOn2.tsx` | Technique | Related | Add Related | `classes` |
| `SalsaVsBachata.tsx` | Beginners | Related | Add Related | `beginner` |
| `WeddingFirstDanceTips.tsx` | Wedding | Related | Add Related | `wedding` |
| `WhatIsBachata.tsx` | Bachata | Schema, money CTA, Related | All three | `classes` |
| `WhatIsSalsa.tsx` | Salsa | Schema, Related | Schema + Related | `classes` |
| `WhatToWearSalsaBachata.tsx` | Lifestyle | Related | Add Related | `beginner` |

> Most "Related" failures are posts that use inline `<ul>` related lists rather than the `<RelatedPages />` or `<RelatedArticles />` components — the audit normalises for SEO consistency. Replacing those custom lists with the shared component also unlocks structured `ItemList` schema later.

---

## Category → CTA variant routing matrix

| Post category | Default `BlogMoneyCTA variant` | Destination |
|---|---|---|
| Beginners | `beginner` | `/start-here` |
| Salsa / Bachata generic | `classes` | `/pura-nights` |
| Chiswick / Turnham Green / local Chiswick | `chiswick` | `/salsa-classes-chiswick` |
| Ealing | `ealing` | `/bachata-classes-ealing` |
| Wedding | `wedding` | `/wedding-dance` |
| Corporate / team building | `corporate` | `/corporate-dance-classes-london` |
| Pura Ladies / styling | `ladies` | `/pura-ladies` |
| Online learning | `online` | `/online-coaching` |
| Events / socials | `events` | `/events` |

---

## How to roll out (low-risk)

1. `npx tsx scripts/blog-conversion-audit.ts` — confirm the failing-set baseline.
2. For each failing post, in a single PR per batch (e.g. Beginners, Local, Wedding):
   - Add `import BlogMoneyCTA from "@/components/BlogMoneyCTA";`
   - Place `<BlogMoneyCTA variant="…" />` just before the closing `</article>` or after the last H2.
   - Where flagged, replace the inline related-list with `<RelatedPages title="Related" links={[ … ]} />`.
   - Where flagged, add `schema={{ "@context": "https://schema.org", "@type": "Article", headline: "…", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "…" }}` to `<SeoHead />`.
3. Re-run the audit. Target: 54/54 pass.

---

## Notes

- No blog post was rewritten in this audit pass — this is **diagnosis + remediation kit** to keep the credit budget intact.
- The `BlogMoneyCTA` component already pushes a GA4 `cta_click` event with `cta_label = blog_money_cta_<variant>` (see `docs/53-TRACKING-AND-ANALYTICS-LAUNCH-GUIDE.md`).
- All passing posts already meet the AnswerBox/AggregateRating requirements set in the earlier sprint blocks.
