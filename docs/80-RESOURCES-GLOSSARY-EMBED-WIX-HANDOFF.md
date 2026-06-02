# 80 — Authority, Resources & Backlink Magnet Sprint

_Date: 2026-06-02_

A 5-credit conversion + GEO sprint focused on premium content that earns
links, gets cited by LLMs, and gives partners something to embed.

## What shipped

| # | URL | Purpose |
|---|---|---|
| 1 | `/resources` | Free Resource Library hub — 8 curated guides, lead-magnet shelf, "use these on your blog" attribution block. Carries `ItemList` JSON-LD. |
| 2 | `/glossary/salsa-bachata` | Definitive 35-term Salsa & Bachata glossary. Each term carries `DefinedTerm` schema — primed for AI-search / LLM citation surfaces. Live search + category filters. |
| 3 | `/learn/ultimate-london-salsa-bachata-guide` | 6,000-word pillar guide. `Article` + `HowTo` schema, dense internal links into every money page + neighbourhood page, citation block at the bottom. |
| 4 | `/partners/embed-widget` | Copy-paste HTML snippets: link-back badge, live-schedule iframe, journalist citation line, wedding-planner sentence. Every snippet carries `utm_source=partner&utm_medium=embed`. |
| 5 | `/embed/class-finder` | Standalone chrome-free iframe target (noindex). Real backlink driver — every partner who embeds it ships a tracked link back to puranights.com. |

## Files created

- `src/pages/Resources.tsx`
- `src/pages/Glossary.tsx`
- `src/pages/learn/UltimateLondonGuide.tsx`
- `src/pages/PartnersEmbed.tsx`
- `src/pages/EmbedClassFinder.tsx`
- `docs/80-RESOURCES-GLOSSARY-EMBED-WIX-HANDOFF.md` (this file)

## Files edited

- `src/App.tsx` — added 5 routes.
- `src/components/Footer.tsx` — Contact column now links Resources, Glossary, Ultimate Guide and Embed widget (4 new high-trust internal links from every page).
- `public/sitemap.xml` — 4 new indexable URLs at priority 0.6–0.9.
- `public/llms.txt` — Editorial + Partnerships sections reference the new hub pages so AI search engines surface them.
- `public/llms-full.txt` — Entity block now lists Resources, Glossary, Pillar guide and Embed hub.

## Why this sprint matters

- **GEO / LLM citation**: A `DefinedTerm` glossary and a long-form `HowTo` pillar give answer engines (ChatGPT, Perplexity, Claude, Gemini) clean structured chunks to quote.
- **Backlink supply**: `/partners/embed-widget` + `/embed/class-finder` turn every wedding venue, hen-party site and London lifestyle blog into a potential referring domain. Every embed = 1 tracked link back.
- **Trust & E-E-A-T**: A free, high-quality resource library + glossary signals expertise without paywalling.
- **Conversion depth**: Each new page funnels into `/start-here`, `/pura-nights`, `/wedding-dance` and the WhatsApp CTA — no dead-end content.
- **Internal-link authority**: 4 new sitewide footer links push PageRank into the new hubs from every existing page.

## Wix replication notes

- `/resources`, `/glossary/salsa-bachata`, `/learn/ultimate-london-salsa-bachata-guide`, `/partners/embed-widget` — recreate as standard rich-content pages. Preserve the H1/H2 hierarchy verbatim for SEO parity. The CopyBox component (Press, Partners) is plain JS — replicate with Velo `wixWindow.copyToClipboard()`.
- `/embed/class-finder` — create as a Wix page with the "blank" / "page-only" template (no header, no footer) and set robots to `noindex,follow`. Public URL must remain `/embed/class-finder` so every embedded iframe across the web keeps working.
- Glossary search/filter — the in-page search is client-side React state. In Wix, bind the term list to a Repeater and use Velo `onInput` to filter.
- The Ultimate Guide schema (`Article` + `HowTo`) ships via SeoHead in this repo. In Wix, paste the JSON-LD via SEO → Custom Meta Tags on the page.
- The `ItemList` schema on `/resources` is also injected via SeoHead; Wix mirror via the page-level SEO panel.

## Tracking

All partner-embed snippets and the iframe CTA carry:

- `utm_source=partner`
- `utm_medium=embed` (or `iframe`)
- `utm_campaign=class-finder-badge` / `class-finder-embed` / `wedding-planner`

This means GA4 will show `Source / Medium = partner / embed` whenever a third-party site sends us a click — clean attribution for the influencer & partner program.

## Remaining human blockers (unchanged + new)

1. (existing) Shopify domain decision — flip `SHOPIFY_STORE_ENABLED` when ready.
2. (existing) Hero photo + logo SVG for press kit.
3. (new) Decide whether to gate any `/resources` items behind email capture (currently all free, no email required — best for SEO).
4. (new) Once /resources has 4+ weeks of traffic, refresh `lastmod` and consider adding one downloadable PDF (we can generate from the printable HTML guides).
