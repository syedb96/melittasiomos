# 81 — Partner Outreach Kit (Wix Handoff)

Upgrade of `/partners/embed-widget` from copy-paste snippets only → full
partner outreach hub.

## Sections
1. Hero — "Partner With Pura Nights" with dual CTA (request link / copy widget).
2. Partner-types grid — 10 categories (wedding planners, venues, corporate, universities, fitness, bloggers, creators, publishers, travel, hotels).
3. Snippet library — 10 ready-made copy-paste snippets including:
   - Editorial text link (rel="noopener")
   - Recommended-by badge
   - Iframe live schedule
   - Venue paragraph
   - Wedding supplier paragraph
   - Corporate wellbeing paragraph
   - Student society paragraph
   - **Influencer / sponsored link (rel="sponsored noopener")**
   - **Forum / UGC link (rel="ugc noopener")**
   - Plain-text citation for journalists
   Every snippet carries `utm_source` / `utm_medium` / `utm_campaign`.
4. Partner outreach form — `src/components/PartnerOutreachForm.tsx`.
   Fields: name, email, organisation, website, social, partner type, audience, want, message.
   Routes to `contact_submissions` with `enquiry_type = "Partnership / Venue Collaboration"`.
   CRM label baked into message body: `[partner-outreach]`.

## Schema
WebPage schema added (publisher = Organization).

## Internal links added
- Resources → Partner widget
- Resources → Press
- Influencers page already linked.
- Footer "Contact" column already lists `/partners/embed-widget`.

## Wix migration
- Form → Wix Form bound to existing Contacts collection with label
  `partner-outreach`. Set manual approval rule.
- Snippet boxes → Wix custom code blocks with one Velo `wixWindow.copyToClipboard()` handler.
- Partner-types grid → Wix Repeater bound to `PartnerTypes` collection (icon, label, note).
- Hero CTAs → anchor links `#partner-form` and `#snippets`.

## Human blockers
- None. Form already wired to existing `contact_submissions` allow-list (`Partnership / Venue Collaboration` enquiry type).
