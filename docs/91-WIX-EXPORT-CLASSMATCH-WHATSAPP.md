# 91 — Wix Export: ClassMatchBlock + WhatsApp Helper

Date: 2026-06-11

This document is the section-by-section Wix replication guide for the
two reusable components that drive most of the conversion experiments:

1. `ClassMatchBlock` (`src/components/ClassMatchBlock.tsx`)
2. The WhatsApp helper (`src/lib/whatsapp.ts`)

It pairs with two artifacts (delivered separately to the user's
`/mnt/documents` library):

- `class-match-options.csv` — direct Wix CMS import (6 rows)
- `pura-nights-wix-velo.js` — ready-to-paste Velo snippets

No new components, schemas, or sitemap entries were added by this
export — it is a pure handoff document.

## 1. ClassMatchBlock — Wix replication

Place the block on `/`, `/pura-nights`, `/prices`, `/loyalty`,
`/salsa-bachata-west-london`. Use **section-warm** background (#F8F3EE)
on the home + prices, and **section-ivory** (#FBF7F2) elsewhere — this
matches the React `tone` prop.

### 1a. Wix CMS collection

Import `class-match-options.csv` as a new collection named
`ClassMatchOptions`. Field map:

| CSV column        | Wix field type | Notes                                  |
|-------------------|----------------|----------------------------------------|
| `id`              | Text (primary) | Stable slug — never rename             |
| `label`           | Text           | Shown as `<h3>`                        |
| `blurb`           | Rich text      | 1-sentence paragraph                   |
| `cta`             | Text           | Button label (we append " →" in Velo)  |
| `target_url`      | URL (internal) | e.g. `/start-here`                     |
| `wix_event_name`  | Text           | Fires through `trackCta()`             |

### 1b. Strip + Repeater structure

```
Strip #stripClassMatch
├── Heading h2 #txtClassMatchTitle  → "Which class is right for me?"
├── Paragraph  #txtClassMatchSub    → "Pick the option that sounds most like you…"
└── Repeater  #repClassMatch (dataset = ClassMatchOptions, sort by `id`)
    └── Container
        ├── Heading h3 #txtLabel
        ├── Paragraph  #txtBlurb
        └── Button     #btnCta   (variant = Primary, terracotta #CF6A3D)
```

Use the **2-column grid on tablet, 3-column on desktop** layout — same
as the React `sm:grid-cols-2 lg:grid-cols-3`.

### 1c. Velo wiring

See `pura-nights-wix-velo.js` § 3. Each button click fires the matching
`class_match_*_click` event through `trackCta()`.

## 2. WhatsApp helper — Wix replication

Two valid replication paths:

### Option A — Static Velo module (recommended)

Drop `pura-nights-wix-velo.js` § 1+2 into `public/wa.js` (or
`backend/wa.web.js` if you'd rather hide phone numbers from view-source).
Then any page can do:

```js
import { WA } from 'public/wa.js';
$w("#btnPrivate").link = WA.privateLessons();
$w("#btnPrivate").target = "_blank";
```

### Option B — Plain anchor strings (Wix Editor, no Velo)

For pages where you don't want Velo, paste these URLs into the button
"Link" field directly. They are pre-encoded so they paste safely.

| CTA placement                      | URL                                                                                                                           |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Monday Chiswick (Pura Nights)      | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I'm%20looking%20at%20the%20Monday%20Chiswick%20class…`                     |
| Tuesday Ealing (Pura Nights)       | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I'm%20looking%20at%20the%20Tuesday%20Ealing%20class…`                       |
| Prices — bundle question           | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I'd%20like%20to%20ask%20about%20pricing%20and%20bundles…`                  |
| Wedding consultation               | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20we're%20getting%20married…`                                                |
| Private lessons                    | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I'd%20like%20to%20enquire%20about%20private%20dance%20lessons…`            |
| Loyalty — join                     | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I'd%20love%20to%20join%20the%20Pura%20Nights%20loyalty%20card…`            |
| Loyalty — eligibility check        | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20quick%20loyalty%20question%20-%20do%20my%20recent%20drop-ins…`             |

(Full message bodies live in `src/lib/whatsapp.ts`; the Velo snippet is
the source of truth.)

### 2c. Loyalty rule baked into copy

The two new loyalty WhatsApp messages reference the confirmed
eligibility rule (drop-ins + Latin Friday only). Any older link that
referenced "8 sessions" without naming the eligible session types
should be replaced with `WA.loyaltyJoin()` so the rule stays clear.

## 3. Tracking events

Wire each event in **Wix Analytics → Custom Events** with the same
name so dashboards line up across both stacks:

- `class_match_beginner_click`
- `class_match_weekly_click`
- `class_match_wedding_click`
- `class_match_private_click`
- `class_match_corporate_click`
- `class_match_loyalty_click`
- `loyalty_form_submit`
- `loyalty_whatsapp_click`
- `loyalty_join_click`

## 4. Visual parity checklist

- Background: section-warm `#F8F3EE` or section-ivory `#FBF7F2`
- Button: primary terracotta `#CF6A3D`, body Poppins, headings Playfair
- Card: rounded 16px, 1px border `rgba(21,21,21,0.08)`, 24px padding
- Grid gap: 16px; container max-width 1024px (`max-w-5xl`)
- No icons inside cards — labels are text-only (matches the React)
