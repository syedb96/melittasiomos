# 40 — Block 2 Shipped: Local SEO + Homepage Polish + AnswerBox Rollout

_Last updated: 2026-05-15 — Pura Nights buildout, Block 2 of 4._

## What shipped

### AnswerBox rolled out to 10 priority pages
Each page now carries a single `<AnswerBox>` strip placed just above `<RelatedPages>` — direct-answer paragraph, 4-bullet scannable summary, and a contextual CTA. This is the GEO/AI-search primitive that makes us citable in AI Overviews and featured snippets without bloating the page.

| Route | AnswerBox question | CTA |
|---|---|---|
| `/` (homepage) | What is Pura Nights and how do I join? | See this week's schedule |
| `/salsa-classes-london` | Where can I learn Salsa in London? | See this week's schedule |
| `/bachata-classes-london` | Where are the best Bachata classes in London? | Start with Beginners |
| `/latin-dance-classes-london` | Where can I take Latin dance classes in London? | Explore Pura Nights |
| `/dance-classes-west-london` | Where can I take dance classes in West London? | Find your nearest night |
| `/salsa-classes-acton` | Where can I take Salsa classes in Acton? | See full schedule |
| `/salsa-classes-fulham` | Are there Salsa classes near Fulham? | Plan your first class |
| `/salsa-classes-hammersmith` | Where do Hammersmith dancers go for Salsa? | Book your spot |
| `/salsa-classes-richmond` | Where can Richmond residents learn Salsa & Bachata? | See Monday Chiswick |
| `/dance-classes-hounslow` | Are there dance classes in Hounslow? | Plan your Tuesday |

Each block embeds:
- Specific transit context (line + minutes)
- Concrete pricing (entry-level only — no enquiry-only services exposed)
- A single-action CTA pointing to the next money page (start-here / schedule / bookings / locations)

### Homepage polish
Inserted between SECTION 5 (Events) and SECTION 6 (Salsa vs Bachata):

1. **"Choose Your Path" — 6-card grid.** Routes the visitor to the path that actually matches their intent rather than forcing them through a single funnel:
   - I'm brand new → `/start-here`
   - Weekly classes → `/pura-nights`
   - Latin Friday → `/events`
   - Wedding dance → `/wedding-dance-london`
   - Corporate / team → `/corporate-dance-classes-london`
   - Hen / private group → `/private-group-dance-parties-london`
2. **"Why Pura Nights Beats a Normal Night Out" — 2-column comparison strip.** Sharpens the positioning vs bars/clubs and reframes the £40 night-out spend.

Both sections carry `WIX SECTION` JSX comments for 1:1 Wix replication.

### Internal-link strengthening
Every AnswerBox CTA + every "Choose Your Path" card sends traffic to a money page (`/start-here`, `/schedule`, `/bookings`, `/pura-nights`, `/events`, `/wedding-dance-london`, `/corporate-dance-classes-london`, `/private-group-dance-parties-london`, `/locations`, `/dance-classes-chiswick`, `/dance-classes-ealing`). Combined with the existing `RelatedPages` (≤6 links per the SEO rules) every priority page now has ≥3 contextual internal outbound links.

---

## Governance preserved

- Canonical host stays `https://www.puranights.com` — sitemap regenerated, 109 URLs.
- No Event schema on recurring class pages — AnswerBox emits no schema (it's prose + bullets).
- AnswerBox CTAs respect the enquiry-only rule: no public pricing on `/wedding-dance-london`, `/corporate-dance-classes-london`, `/private-group-dance-parties-london`, `/private-lessons`.
- Max 6 RelatedPages per page (unchanged).
- H1 + first 100 words of every touched page still contain the primary keyword.

---

## Verified

- `bun scripts/seo-qa.ts` → ✓ 7 recurring pages guarded, 8 single-event entries validated, sitemap regenerated (109 URLs).
- All 10 AnswerBox insertions placed above `<RelatedPages>` and below the page's main content — no layout regressions.
- Homepage section order intact: 1 Hero → 2 Trust → … 5 Events → **5.5 Choose Your Path** → **5.6 Why Beats Normal Night** → 6 Salsa/Bachata → … (Wix replication map updated implicitly via in-line WIX SECTION comments).

---

## Next — Block 3

12 blog posts under `src/pages/blog/` covering corporate, hen party, beginners-shy, etiquette, social-making, after-work, date night, etc. Each: 900–1,500 words, `Article + FAQPage` schema, mid-article + bottom CTAs (`BlogCTA`, `BlogSidebarCTA` already exist), related articles, dateModified, author Melitta Siomos. New "Corporate" and "Hen / Group" categories added to `Blog.tsx`.
