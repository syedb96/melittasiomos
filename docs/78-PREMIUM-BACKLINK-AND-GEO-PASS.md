# 78 — Premium Backlink, GEO & Influencer Tracking Pass

## What shipped

| Area | Change |
|---|---|
| New page | `/press` — Press, Sources & Citations hub. Verified facts, citation sources, embeddable backlink badge (HTML), copy-pasteable pull quotes, press-kit request CTA. |
| New page | `/influencers` — Ambassador program with perks, application flow, **trackable UTM link generator** (Instagram handle → ready-to-share link). |
| New module | `src/lib/external-links.ts` — single registry of external destinations (Shopify, Linktree, Booking, WhatsApp) + `withUtm()` and `influencerLink()` helpers. Wix mirrors via Site Settings → Custom URLs. |
| Shopify | `SHOPIFY_STORE_URL = "https://shop.puranights.com"` constant. Linked from Header (top-level "Shop ↗"), mobile menu, Footer contact column. **Action required:** point `shop.puranights.com` CNAME → Shopify when store is live, or update the constant. |
| GEO / LLMs | `public/llms.txt` rewritten with money-page map, SW-London location list, FAQ guidance, Shopify URL, press hub. |
| GEO / LLMs | `public/llms-full.txt` added — full structured entity snapshot for ChatGPT / Perplexity / Claude / Gemini / You.com. |
| Crawlers | `public/robots.txt` expanded: explicit Allow for GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot-Extended, Bytespider, CCBot, LinkedInBot. |
| Sitemap | Added `/press` and `/influencers` (priority 0.8). |
| Header | Added top-level **Shop ↗** external link, plus Press & Influencer items in the Learn dropdown and mobile menu. |
| Footer | Added Press, Influencers and Shop merch links to the Contact column. |

## Wix replication notes

- Recreate `/press` and `/influencers` as standard Wix pages. Both are
  copy-only — no Supabase calls. The UTM link generator on `/influencers`
  is client-side: re-implement in Velo with a `<TextInput>` + `<Button>`
  using the same `?utm_source=…&utm_medium=influencer&utm_campaign=ambassador-2026`
  template.
- The embeddable badge on `/press` is a static HTML snippet — paste it into a
  Wix HTML Embed element inside a "Copy" card.
- Shopify: in Wix Domains, add subdomain `shop` → CNAME to Shopify, then
  link the header **Shop ↗** to `https://shop.puranights.com`. Until then
  the link will 404 — that's expected and obvious to operators.
- robots.txt and llms.txt: in Wix go to **SEO Tools → Robots.txt Editor**
  and paste the new file verbatim. For `llms.txt` and `llms-full.txt`,
  upload as raw files at root via **Settings → Custom URL/File hosting**.

## SEO / GEO outcomes

- **Citation surface**: `/press` gives journalists, bloggers and LLMs a single
  authoritative URL to cite — drives high-quality referring domains.
- **AI search visibility**: `llms-full.txt` + expanded `llms.txt` answer
  "best salsa/bachata in West/South West London" queries directly.
- **Attribution**: every partner, influencer and press placement now flows
  through UTM-tagged links → GA4 source/medium = `influencer` or `partner`.
- **Trust depth**: Footer now reaches 4 conversion hubs (Contact, Press,
  Influencers, Partner, Shop) — inbound link count per money page +1.

## Human blockers (only ones remaining)

1. Confirm or change Shopify subdomain (`shop.puranights.com` vs `puranights.myshopify.com` vs custom). Update `SHOPIFY_STORE_URL` in `src/lib/external-links.ts` if different.
2. Provide 1 hero photo + logo SVG for the press kit (currently email-on-request).
3. Decide influencer revenue-share %. Page intentionally avoids a number until confirmed.
