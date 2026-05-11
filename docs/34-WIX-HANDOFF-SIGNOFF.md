# 34 — Wix Handoff Sign-Off

**Status:** Frozen for Wix replication. No further structural changes planned.

## What shipped in this final pass

- **`<TonightBanner />`** — site-wide live status strip (between `<Header />` and `<TrustTicker />` in `src/components/Layout.tsx`).
  - Auto-detects `Europe/London` time and shows:
    - **Live now — Chiswick** Mon 19:00–21:30
    - **Live now — Ealing** Tue 18:30–21:30
    - Otherwise: next upcoming class with venue + postcode + deep link to the venue page.
  - Wix mirror: rebuild as a Velo (Corvid) custom code element using the same day-of-week + minute-of-day branching documented inside the component.

## How to mirror in Wix

1. Add a top strip element above the existing TrustTicker.
2. Paste the Velo snippet below into a custom code block bound to `wix-window` for time and `wix-location` for the link.
3. Style: live = burnt terracotta `#CF6A3D` background / ivory text; idle = charcoal `#151515` background / 90% ivory text + 1px terracotta bottom border.

```js
// Velo (Corvid) equivalent — paste in page code
import wixLocation from 'wix-location';

const schedule = [
  { day: 1, start: 19*60,    end: 21*60+30, venue: "The George IV, Chiswick", pc: "W4 2DR", time: "19:30", link: "/venue/the-george-iv-chiswick" },
  { day: 2, start: 18*60+30, end: 21*60+30, venue: "Drayton Court Hotel, Ealing", pc: "W13 8PH", time: "18:50", link: "/venue/the-drayton-court-ealing" },
];

$w.onReady(() => {
  const now = new Date(new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }));
  const day = now.getDay();
  const mins = now.getHours()*60 + now.getMinutes();
  const live = schedule.find(s => s.day === day && mins >= s.start && mins <= s.end);
  // ...bind live/idle text + link
});
```

## Final pre-launch checklist (one-command)

```bash
npm run qa:launch        # redirect audit + schema snapshot + evidence manifest
npm run qa:alt-lint      # fail on placeholder/empty/duplicate alt text
npm run build            # alt-lint runs as prebuild — must be green
```

## Required follow-ups for the human team

- Replace every `<RealProofSlot />` with the labelled real photo/screenshot.
- Replace every `<PhotoSlot />` with a real image at the documented crop ratio + alt.
- Submit `sitemap.xml` to GSC and Bing once the Wix domain is live.
- Run `Rich Results Test` per `docs/31-RICH-RESULTS-SCREENSHOT-PROTOCOL.md` and store screenshots under `/launch-evidence/screenshots/`.

See **`docs/INDEX.md`** for the full document map.
