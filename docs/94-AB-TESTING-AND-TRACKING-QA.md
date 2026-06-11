# 94 — A/B Testing + Tracking QA

Date: 2026-06-11

## 1. CTA A/B testing — lightweight client framework

### Files

- `src/lib/ab.ts` — `useVariant(experiment)` hook, `pickVariant`, `recordVariantClick`, `_resetAbForTests`
- `src/data/ab-experiments.ts` — single source of truth for every running experiment
- `src/pages/Index.tsx` + `src/pages/Loyalty.tsx` — wired examples

### How it works

1. Every visitor gets a stable random id in `localStorage["pn_ab_visitor"]` (TTL 30 days).
2. `pickVariant(experiment, visitorId)` hashes `visitorId + experimentKey` (FNV-1a) and modulos against total weight. **Same visitor → same variant for the same experiment, forever.**
3. `useVariant` logs an `ab_impression:<key>:<variant>` event once per session via `trackCta`.
4. On click, `recordVariantClick(key, variantId, location)` logs `ab_click:<key>:<variant>` so impressions vs clicks are 1:1 comparable in Supabase.
5. Each rendered CTA also carries `data-ab-experiment` and `data-ab-variant` attributes for browser-DevTools inspection.

### Experiments currently shipping

| Key                          | Page                              | Variants            |
|------------------------------|-----------------------------------|---------------------|
| `home_hero_primary`          | `/`                               | 3 (a_live, b_pick_night, c_find_first) |
| `puranights_hero_primary`    | `/pura-nights`                    | 3 (defined; not yet wired into JSX) |
| `loyalty_submit`             | `/loyalty`                        | 3 (a_live, b_add_me, c_start) |
| `prices_gift_voucher`        | `/prices`                         | 2 (defined; not yet wired) |
| `westlondon_hero_primary`    | `/salsa-bachata-west-london`      | 3 (defined; not yet wired) |

The two wired experiments (`home_hero_primary`, `loyalty_submit`) are the highest-traffic CTAs. The other three are defined and ready — wiring them is a one-liner per call site (~5 min each).

### Reading a winner after 14 days

```sql
-- impressions
select cta_label, count(*) impressions
from cta_events
where cta_label like 'ab_impression:home_hero_primary:%'
  and created_at > now() - interval '14 days'
group by 1;

-- clicks
select cta_label, count(*) clicks
from cta_events
where cta_label like 'ab_click:home_hero_primary:%'
  and created_at > now() - interval '14 days'
group by 1;
```

Compute CTR per variant; promote the winner to `id: "a_live"` in `src/data/ab-experiments.ts` and prune losers. No auto-promotion in this lightweight mode — you decide.

### Wix replication

Reimplement the same FNV-1a hash + localStorage in Velo (`public/ab.js`). Mirror the variant ids exactly so analytics joins keep working across both stacks.

---

## 2. WhatsApp tracking — verification stack

### 2a. Production tracking (already live)

`src/lib/whatsapp.ts → trackWaClick(context, meta)` fans out to:
- **GA4** via `window.gtag("event", "whatsapp_<ctx>_click", payload)`
- **GTM dataLayer** via `dataLayer.push({event, ...payload})`
- **Legacy** `window.trackCta` hook
- **Supabase `cta_events`** via deferred `trackCtaClick({cta_type:"whatsapp"})`

Required payload keys: `cta_type:"whatsapp"`, `cta_context`, `page_path`, plus optional `location`, `prefill_id`, free-form meta.

Helper for new code: `waCta(preset, location, meta)` returns `{href, target:"_blank", rel:"noopener noreferrer", onClick}` — drop-in for any anchor.

### 2b. Admin QA page — `/admin/tracking-qa`

`src/pages/admin/TrackingQA.tsx` (protected, admin-only).

- Installs in-memory spies on `gtag`, `dataLayer.push`, and `trackCta` (auto-restores on unmount).
- Lists every preset in `WA` with two buttons each — "Fire trackWaClick" (raw helper) and "Fire waCta()" (the recommended path).
- Lists every active A/B experiment with the variant currently assigned to your visitor id.
- Right pane shows the last 50 captured events in real time, with payload JSON, source tag, and a red ⚠ if the event name doesn't start with `whatsapp_` and end with `_click` or is missing `page_path` / `cta_context`.
- "Reset visitor + clear log" button — re-assigns A/B variants without manual `localStorage.clear()`.

Access: log in as an admin → navigate to `/admin/tracking-qa`.

### 2c. CI / static audit — `scripts/qa-whatsapp-tracking.ts`

Run via `bun scripts/qa-whatsapp-tracking.ts`.

Three checks:
1. **No raw `wa.me/<phone>` URLs** outside `src/lib/whatsapp.ts` and the QA page itself.
2. **Every WA anchor** must have `target="_blank"` + `rel="*noopener noreferrer*"`, OR use `{...waCta(...)}` spread (which sets them automatically).
3. **No dead presets** — every `WA.*` export must have at least one in-app call site (excluding `general` fallback).

#### Current baseline (run 2026-06-11)

```
files scanned: 261
presets:       21 (4 in use, 17 unused)
errors:        97 raw wa.me URLs across 19 files
warnings:      17 dead presets
```

**This is technical debt, not a regression.** Most raw URLs predate the `WA` helper. Migrating them is a ~half-day refactor: replace each `https://wa.me/447449482343?text=...` anchor with `<a {...waCta("relevantPreset", "<page> <section>")}>`. The biggest offenders:

| File                                              | Raw URLs |
|---------------------------------------------------|----------|
| `src/components/StickyMobileCTA.tsx`              | 1 |
| `src/components/WhatsAppButton.tsx`               | 1 |
| `src/components/PartnerCTA.tsx`                   | 1 |
| `src/components/CorporateCTA.tsx`                 | 1 |
| `src/pages/Schedule.tsx`                          | several |
| `src/pages/Contact.tsx`                           | several |
| `src/pages/Gift*.tsx`, `src/pages/blog/*.tsx`     | many |

Add to CI in a follow-up sprint once the refactor lands. For now run it manually to track progress:

```bash
bun scripts/qa-whatsapp-tracking.ts | tail -5
```

The script is not wired into `prebuild` yet (would break the build today). When the error count reaches 0, add:

```jsonc
// package.json
"prebuild": "bun scripts/alt-text-lint.ts && bun scripts/seo-qa.ts && bun scripts/schema-validate.ts && bun scripts/schema-qa-report.ts && bun scripts/qa-whatsapp-tracking.ts"
```

---

## 3. Open items / human blockers

1. **Real photography** — still pending uploads from Melitta (see `docs/92`).
2. **Student testimonial photos + model releases** — still pending. Once uploaded I'll wire them into `TestimonialsCarousel.tsx` with proper `<img width/height alt>` per the checklist.
3. **WhatsApp helper migration** — 97 raw wa.me URLs to refactor through `waCta()`. Non-blocking but worth scheduling.
4. **A/B wiring** — 3 of 5 defined experiments aren't wired into their JSX yet. One-liner per call site.
