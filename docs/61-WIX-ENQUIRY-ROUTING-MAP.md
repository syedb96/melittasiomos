# 61 — Wix Enquiry Routing Map

_Sprint date: 2026-05-21_

## Purpose
Lock the enquiry subject taxonomy, Wix Forms field setup, CRM tags and WhatsApp deep-link fallbacks so every form submission lands in the right inbox with the right context after migration.

## Canonical enquiry types (allow-list)
These are the **only** values accepted by `validate_contact_submission` and must match exactly on Wix Forms hidden fields and the Wix CMS `Enquiries` collection.

| Hidden `enquiry_type` value | Triggered from | CRM tag | Owner mailbox |
|---|---|---|---|
| `Group Classes — Chiswick or Ealing` | `/contact` dropdown | `group-classes` | siomosmelitta@gmail.com |
| `Monthly Latin Friday — Tickets & Info` | `/contact`, `/events` | `latin-friday` | siomosmelitta@gmail.com |
| `Wedding Dance — Consultation` | `/wedding-dance`, `/wedding-dance-lessons-london`, `/contact` | `wedding` | siomosmelitta@gmail.com |
| `Private Lessons — Enquiry` | `/private-lessons`, `/private-dance-lessons-west-london`, `/contact` | `private-lessons` | siomosmelitta@gmail.com |
| `Pura Ladies — Audition / Membership` | `/pura-ladies`, `/bachata-performance-team-london`, `/contact` | `pura-ladies` | siomosmelitta@gmail.com |
| `Corporate Booking — Team Building` | `/corporate-dance-classes-london` | `corporate` | siomosmelitta@gmail.com |
| `Private Group Party — Hen / Birthday` | `/private-group-dance-parties-london` | `group-party` | siomosmelitta@gmail.com |
| `Partnership / Venue Collaboration` | `/partner-with-pura-nights` | `partnership` | siomosmelitta@gmail.com |
| `Corporate / Hen Party Event` | `/contact` (legacy combined option) | `events` | siomosmelitta@gmail.com |
| `Gift Vouchers` | `/gift-vouchers`, `/contact` | `vouchers` | siomosmelitta@gmail.com |
| `Online Classes` | `/online-coaching`, `/online-academy`, `/contact` | `online` | siomosmelitta@gmail.com |
| `General Enquiry` | fallback | `general` | siomosmelitta@gmail.com |

> Adding a new enquiry type requires (1) updating the trigger in `supabase/migrations/20260515102200_…sql`, (2) updating Wix Forms hidden field options, (3) adding to this map.

## Per-page Wix Form blueprint

For every revenue page using `<EnquiryForm>` in Lovable, replicate in Wix as:

1. **Wix Form** connected to the `Enquiries` collection.
2. **Hidden field** `enquiry_type` pre-set to the value above.
3. **Hidden field** `source_page` pre-set to the canonical URL (e.g. `/corporate-dance-classes-london`).
4. **Honeypot field** `website` (CSS-hidden, must stay empty).
5. **Required**: name, email, message. **Optional**: phone + page-specific extra fields.
6. **Wix Automation** on submit:
   - Send email to `siomosmelitta@gmail.com` with `[{{enquiry_type}}] — {{source_page}}` subject.
   - Add CRM tag from the table above.
   - Send the visitor a branded auto-reply pointing to WhatsApp.

### Page-specific extra fields (must exist on Wix CMS schema)
| Page | Extra fields |
|---|---|
| Corporate | `company`, `eventDate`, `location`, `groupSize`, `sessionType`, `budget` |
| Private Group Party | `eventDate`, `location`, `groupSize`, `sessionType` |
| Partnerships | `organisation`, `website`, `sessionType`, `location` |
| Wedding | `eventDate`, `location`, `sessionType` (song style) |
| Pura Ladies | `location`, `sessionType` (current level) |

## WhatsApp deep-link fallback (canonical)

Every form ships with a WhatsApp button as the no-friction fallback. Use **+44 7449 482343** with a pre-filled, URL-encoded message per page so Melitta sees context instantly.

| Page | WhatsApp URL |
|---|---|
| Generic | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20get%20in%20touch` |
| Corporate | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20a%20corporate%20Salsa%2FBachata%20session` |
| Private Group Party | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20plan%20a%20private%20group%20dance%20party` |
| Wedding | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20a%20wedding%20dance%20consultation` |
| Private Lessons | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20private%20lessons` |
| Pura Ladies | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20ask%20about%20Pura%20Ladies%20auditions` |
| Partnership | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20discuss%20a%20Pura%20Nights%20partnership` |
| Online | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27m%20interested%20in%20online%20coaching` |
| Gift Vouchers | `https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20buy%20a%20Pura%20Nights%20gift%20voucher` |

## Wix migration QA checklist
- [ ] All 12 enquiry types present in the Forms dropdown on `/contact`.
- [ ] Each revenue page form has the correct hidden `enquiry_type` pre-filled.
- [ ] Submitting from each page sends a test email tagged correctly in Wix CRM.
- [ ] Honeypot field present and CSS-hidden, never visible to users.
- [ ] WhatsApp deep links open the correct pre-filled message on mobile + desktop.
- [ ] Auto-reply fires within 1 minute of submission.
- [ ] Spam submissions (no name / invalid email) get rejected before insert.
