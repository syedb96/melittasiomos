# 66 — Wix Local SEO Components Replication Guide

Maps the 4 new Lovable components shipped in the GBP Domination sprint to their exact Wix Studio equivalents.

---

## LocalTransportBlock → Wix Repeater + Strip

**Collection: `VenueTransport`**
| Field | Type | Notes |
|---|---|---|
| `venueKey` | Text | "Chiswick" or "Ealing" — filter key |
| `mode` | Text | tube / bus / walk / car / cycle / access |
| `label` | Text | "Turnham Green (District)" |
| `detail` | Text rich | "3-min walk down Chiswick High Rd" |
| `time` | Text | "3 min" or "Door" |
| `sortOrder` | Number | Display order |

**Wix Page setup:**
1. Add a Strip (background: `--color-ivory`) + Title element ("How to reach The George IV").
2. Inside, add a Repeater (3-col grid desktop, 1-col mobile).
3. Inside each item: Lucide-equivalent icon (use Wix Icon library), small uppercase Text for mode label, bold Title for `label`, body Text for `detail`, right-aligned Text for `time`.
4. Repeater connect to dataset filtered by `venueKey = current page venueKey`.
5. Below repeater, add 2 callout boxes (border-left accent) bound to single-row CMS rows for parking + accessibility notes.

**Animation:** Wix Stagger Reveal on scroll enter — set delay step 100 ms.

---

## NearMeGrid → Wix Repeater linking to dynamic pages

**Collection: `Neighbourhoods`**
| Field | Type |
|---|---|
| `slug` | Text — used in dynamic page URL |
| `name` | Text |
| `postcode` | Text |
| `distance` | Text |
| `venue` | Tag — "Chiswick" / "Ealing" / "Both" |

**Wix Page setup:**
1. Add Strip with eyebrow + h2 + intro paragraph.
2. Repeater: 4-col desktop / 2-col mobile.
3. Each item: card with MapPin icon top-left, arrow icon top-right, h3 name, uppercase postcode + venue chip, distance text.
4. Connect each item's link to `/${slug}`.
5. Filter by `venue contains current page's venueKey`.

**Hover:** Border tint by `venue` — primary (Chiswick), peach (Ealing), gold (Both).

---

## ReviewVelocityTicker → Wix Strip + Velo timer

**Setup:**
1. Add a dark Strip (charcoal bg, `--color-primary-foreground` text).
2. Left col: TrendingUp icon + 2-line text ("14 new reviews · last 30 days" + 5-star row).
3. Right col: rotating Quote element bound to a Repeater filtered to `featured=true AND rating=5`.
4. Velo code (page onReady):
```js
import wixData from 'wix-data';
$w.onReady(async () => {
  const res = await wixData.query('Testimonials').eq('featured', true).find();
  let i = 0;
  setInterval(() => {
    i = (i + 1) % res.items.length;
    $w('#tickerQuote').text = `"${res.items[i].excerpt}"`;
    $w('#tickerAuthor').text = `— ${res.items[i].name} · ${res.items[i].platform}`;
  }, 4500);
});
```

---

## VenueGeoCard → Wix Strip with Maps + Text columns

**Setup:**
1. 2-col Strip.
2. Left col: Card box → eyebrow + h2 venue name + address (with Schema.org markup via Wix custom HTML embed) + phone + 2 CTA buttons.
3. Right col: Wix Maps element pinned to lat/lng from CMS.
4. Pull venue data from `Venues` collection (`name | street | locality | postcode | lat | lng | telephone | directionsUrl`).

---

## Schema.org JSON-LD parity

Lovable injects schema via `SeoHead`. In Wix, use a custom HTML embed in the `<head>` per page (Wix Studio supports per-page head HTML). Paste the same `application/ld+json` block. Update lat/lng/postcode per venue page.

---

## Replication checklist

- [ ] Build `VenueTransport` + `Neighbourhoods` + `Venues` collections
- [ ] Seed from `src/data/near-me-areas.ts` (export to CSV → import to Wix)
- [ ] Add per-page head HTML for schema
- [ ] Wire 4 components per page using the patterns above
- [ ] Verify in Wix Preview that filters work per page
- [ ] Validate live schema at https://validator.schema.org
