# 84 — Resources Lead Capture (Wix Handoff)

Upgrade of `/resources` from a static hub → lead-capture engine with
FAQs and proper Best-For framing.

## Added
- **Lead-capture form** (`src/components/ResourceLeadForm.tsx`):
  First name, Email, Interest dropdown (First class, Salsa, Bachata,
  Wedding dance, Private lesson, Corporate/group, Pura Ladies),
  optional Phone. Honeypot + 1.5s timing check.
- **Success state** with WhatsApp fallback CTA.
- **Best-for** label on every resource card.
- **New resource card**: `/learn/best-salsa-bachata-nights-london`.
- **New resource card**: Corporate Dance Session Planner.
- **New resource card**: Pura Ladies Audition Prep.
- **New resource card**: Salsa vs Bachata comparison.
- **FAQs accordion** (7 Qs) — Do I need a partner? What to wear?
  Which class first? Beginner-friendly? Private lessons? Companies?
  Wedding couples?

## Analytics events
- `resource_lead_submit`
- `whatsapp_after_resource_submit`
- (existing) `resource_download_click` fired by card clicks via the
  generic `trackCta` already used.

## Schema
- `ItemList` for the resource grid.
- `FAQPage` for the FAQs block.

## Routing
- Submits to `contact_submissions` with
  `enquiry_type = "General Enquiry"` and message body tagged
  `[Resource: First Class Checklist]` + selected interest.
- Mailchimp / delivery flow remains a Wix Automation step in the
  migration — backend insertion is the trigger.

## Wix migration
1. Wix Form with same fields → Wix CRM collection.
2. Wix Automation: on submit → tag contact with `interest=<value>`
   → send checklist PDF via Wix Email Marketing.
3. FAQs accordion → Wix Accordion bound to FAQ collection (also
   feeds existing FAQ schema work).
4. Resource cards → existing Wix Repeater pattern (no change).

## Human blockers
- **PDF**: First Class Checklist PDF needs to be hosted (Wix Media
  Manager or `/public`). Until then the success state directs users
  to WhatsApp.
- Optional: gate any resource card behind email (currently all free
  for SEO/backlink value — recommended).
