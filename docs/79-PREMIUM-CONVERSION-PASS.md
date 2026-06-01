# 79 — Premium Conversion Pass (Corporate · Influencers · Shop Toggle)

## What shipped

### 1. Corporate landing flow + stronger homepage CTA
- `src/components/CorporateCTA.tsx` rebuilt as a premium 3-track band with equal-weighting offers:
  - **Team-Building Workshops (1–2 hrs)** — single-session energy boost
  - **Wellness Program** — recurring weekly classes for staff benefits
  - **Private Events** — parties & end-of-year socials
- Each track gets its own contextual WhatsApp prefill, deep-link to `#packages`, and a dedicated CTA.
- Radial-gradient charcoal background, hover states, trust strip ("FTSE-100 & agency teams · 8 to 120 guests · Reply within 1 working day").
- Already mounted on homepage (Index.tsx line 804) and on the corporate landing page hero — same component, two placements.
- Existing `CorporateDanceClassesLondon` page (366 lines) already has the tailored EnquiryForm with company/date/location/group-size/session-type/budget fields wired to Supabase `contact_submissions` with the validated `Corporate Booking — Team Building` enquiry type. No form changes needed.

### 2. Tiered influencer revenue share (10% / 15% / 20%)
- New constant `INFLUENCER_TIERS` in `src/lib/external-links.ts` — single source of truth for tier names, share %, monthly thresholds, and notes.
- `/influencers` page rebuilt with:
  - New hero promising "10%, 15% or 20%" up front
  - 3-tier pricing table (Starter / Partner / Headline), middle tier highlighted as "Most ambassadors"
  - Updated How-it-works (now 5 steps, includes payout step)
  - Apply WhatsApp prefill includes the tier promise so Melitta sees intent immediately
  - Payout terms footnote: monthly via UK bank transfer, £25 minimum
- SEO title updated to include the headline rate for SERP CTR.

### 3. Shop links hidden (store not ready)
- New flag `SHOPIFY_STORE_ENABLED = false` in `src/lib/external-links.ts` with comments explaining the toggle order when the store goes live.
- Removed Shop entries from:
  - `src/components/Header.tsx` desktop nav (`navGroups`)
  - `src/components/Header.tsx` mobile menu (`mobileLinks`)
  - `src/components/Footer.tsx` Contact column
  - `public/llms.txt` and `public/llms-full.txt` (Shopify references and merchandise table row removed)
- Existing `/shop` route, `/lookbook`, etc. remain noindex (as flagged in docs/18-FINAL-GSC-SEO-DEPLOYMENT-AUDIT.md) — no sitemap/canonical changes needed.

## Re-enabling Shop (one place to update)

1. Open `src/lib/external-links.ts` → set `SHOPIFY_STORE_ENABLED = true` and update `SHOPIFY_STORE_URL` to the final domain.
2. Add the `Shop` top-level entry back to `Header.tsx` `navGroups` (commented marker shows where).
3. Add `Shop ↗` back to `mobileLinks` in the same file.
4. Restore the `<li>` merch link in `Footer.tsx` Contact column.
5. Re-add Shop lines in `public/llms.txt` and `public/llms-full.txt`.

## Wix replication notes

- **Corporate strip**: 3-column Repeater connected to a `CorporateTracks` collection (icon, eyebrow, title, body, anchor, wa_context). Each card's WhatsApp button concatenates the context into the wa.me prefill.
- **Influencer tiers**: 3-column Pricing Strip; middle card uses the Wix "featured" preset (dark + raised). `INFLUENCER_TIERS` maps 1:1 to a Wix CMS collection if you want to edit copy without code.
- **Shop visibility**: in Wix, hide the Shop menu item via Site Menu → Visibility until the storefront is live. No code toggle equivalent.

## QA

- Build: typecheck clean (no new TS surface).
- Routes unchanged; sitemap untouched (already excludes `/shop/*` noindex routes).
- Visual: charcoal radial-gradient on Corporate band, gold accent on tier card and apply CTA — matches premium editorial aesthetic per memory rules.

## Human blockers remaining

1. **Shopify**: confirm final domain and toggle `SHOPIFY_STORE_ENABLED` when ready.
2. **Press kit**: hero photo + logo SVG (carried over from sprint 78).
3. **Ambassador legal**: confirm the £25 minimum payout and monthly UK bank-transfer copy is correct before first applications land.
