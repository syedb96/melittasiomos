# 83 — Glossary AI-Search & Wix CMS Map

Upgrade of `/glossary/salsa-bachata` from a flat term list → an
AI-search-friendly glossary engine.

## Added
- **45+ terms** (was 35). New: Connection, Open Hold, Closed Hold,
  Partner Rotation, No Partner Needed, Body Movement, Isolation,
  Timing, Turn Pattern, Beginner / Improver / Intermediate Class,
  Social Night.
- **Filter chips** expanded to: All, Salsa, Bachata, Social, Music,
  Technique, Ladies styling, Performance, Class structure, Wedding.
- **Stable anchor IDs** per term using slugified term name.
  Example: `#bachata-sensual`.
- **Copy-link button** per term (writes
  `/glossary/salsa-bachata#<slug>` to clipboard).
- **Hash-URL deep linking** — landing on a hashed URL auto-scrolls
  to the term.
- **A–Z jumplist** at top + full A–Z index section at bottom.
- **Common beginner questions** block (partner / Salsa vs Bachata /
  On1 vs On2).
- **Related class links** per term where relevant
  (e.g. Pura Ladies → `/pura-ladies`).
- Schema upgraded: each `DefinedTerm` now has a stable `@id` URL.

## Per-term routes (`/glossary/salsa-bachata/:slug`)
Deferred to Wix CMS phase. Hash URLs already provide deep-linking
and citation parity. Wix roadmap below.

## Wix CMS plan
1. Create `GlossaryTerms` collection with fields:
   `slug, term, category, definition, also_known_as, related_url, related_label`.
2. Build dynamic page template at `/glossary/salsa-bachata/[slug]`.
3. Add SEO meta per term:
   - title: `{term} — Salsa & Bachata Glossary | Pura Nights`
   - description: first 155 chars of definition
   - JSON-LD: DefinedTerm per page + DefinedTermSet on the hub.
4. Keep hub `/glossary/salsa-bachata` as the master list with
   filter chips and A–Z index.
5. Add canonical from hash URLs to hub when per-term pages launch
   (301 from `#slug` → `/slug` is not needed; hash URLs share the
   hub canonical).

## Wix handoff notes
- The current implementation is fully Wix-replicable: filter chips +
  A–Z jumplist can be built with Wix Repeaters and anchor links.
- Copy-link button → `wix-window.copyToClipboard()` in Velo.
