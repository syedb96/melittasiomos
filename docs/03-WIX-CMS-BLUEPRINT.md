# Wix CMS Collection Blueprint — Melitta Siomos / Pura Nights

> This defines the content model for the production Wix site.
> Lovable prototypes the templates; Wix CMS manages the data.

---

## Collection 1: Classes / Schedule

**Purpose**: Power the weekly schedule display and class cards.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Title | Text | Yes | e.g. "Beginners Salsa" |
| Day | Text | Yes | Monday / Tuesday |
| Start Time | Text | Yes | e.g. "19:30" |
| End Time | Text | Yes | e.g. "20:30" |
| Level | Text | Yes | Beginners / Improvers / Intermediate+ / Open |
| Dance Style | Text | Yes | Salsa / Bachata / Ladies Styling |
| Venue | Reference → Venues | Yes | Link to venue |
| Price (2 classes) | Number | Yes | £15 |
| Price (1 class) | Number | Yes | £10 |
| Price (social only) | Number | Yes | £5 |
| Is Active | Boolean | Yes | Show/hide |
| Sort Order | Number | Yes | Display order |
| Notes | Rich Text | No | e.g. "Free warm-up 6:50pm" |

---

## Collection 2: Events

**Purpose**: Latin Fridays, socials, workshops, special events.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Title | Text | Yes | |
| Slug | Text | Yes | URL-friendly |
| Event Type | Text | Yes | Latin Friday / Workshop / Social / Special |
| Date | Date | Yes | |
| Start Time | Text | Yes | |
| End Time | Text | No | |
| Venue | Reference → Venues | Yes | |
| Summary | Text (500) | Yes | Card description |
| Body | Rich Text | No | Full event page |
| Cover Image | Image | Yes | |
| Ticket URL | URL | No | External link |
| Early Bird Price | Text | No | e.g. "£15 class+party / £10 party" |
| Standard Price | Text | No | |
| Door Price | Text | No | |
| Is Featured | Boolean | No | Show on homepage |
| Is Published | Boolean | Yes | |

**Dynamic Page**: `/events/{slug}`

---

## Collection 3: Gallery Media

**Purpose**: All photos and videos for the site.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Title | Text | No | |
| Image | Image | Yes | |
| Video URL | URL | No | YouTube/Vimeo embed |
| Caption | Text (300) | No | |
| Alt Text | Text | Yes | ⚠️ Required before publish |
| Category | Text | Yes | Classes & Socials / Pura Ladies / Events / Wedding / Team / Brand |
| Album | Reference → Gallery Albums | No | |
| Location Tag | Text | No | Chiswick / Ealing |
| Service Tag | Text | No | Salsa / Bachata / Wedding |
| Is Featured | Boolean | No | |
| Is Published | Boolean | Yes | |
| Sort Order | Number | No | |

**Wix implementation**: Use Wix Pro Gallery connected to this collection.

---

## Collection 4: Gallery Albums

| Field | Type | Required |
|-------|------|----------|
| Title | Text | Yes |
| Slug | Text | Yes |
| Description | Text (500) | No |
| Category | Text | Yes |
| Cover Image | Image | No |
| Sort Order | Number | Yes |
| Is Published | Boolean | Yes |

---

## Collection 5: Team Members

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Name | Text | Yes | |
| Slug | Text | Yes | |
| Role Title | Text | Yes | e.g. "Lead Instructor" |
| Specialties | Tags | No | e.g. Salsa, Bachata, Ladies Styling |
| Short Bio | Text (300) | Yes | Card display |
| Full Bio | Rich Text | No | Modal/page display |
| Profile Image | Image | Yes | |
| Instagram URL | URL | No | |
| Sort Order | Number | Yes | |
| Is Published | Boolean | Yes | |

**Seed data**: Melitta Siomos, Roger Cracco, Tiffany, Eva, Edi, Ezgi, Luis, Kevin

**Dynamic Page**: `/team/{slug}` (optional — can also use modals on About page)

---

## Collection 6: Testimonials

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Person Name | Text | Yes | |
| Quote | Rich Text | Yes | |
| Context Label | Text | No | e.g. "Beginner Student", "Wedding Couple" |
| Rating | Number | No | 1-5 stars |
| Photo | Image | No | |
| Source | Text | No | Google / Instagram / Direct |
| Source URL | URL | No | Link to original |
| Category | Text | No | Group Classes / Wedding / Private / Pura Ladies |
| Is Featured | Boolean | No | Show on homepage |
| Is Published | Boolean | Yes | |

**Wix implementation**: Repeater or carousel on homepage, masonry on `/testimonials`.

---

## Collection 7: FAQs

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Question | Text | Yes | |
| Answer | Rich Text | Yes | |
| Category | Text | Yes | General / Pricing / Beginners / Wedding / Private / Venues |
| Page Tags | Tags | No | Which pages should show this FAQ |
| Sort Order | Number | Yes | |
| Is Published | Boolean | Yes | |

**Wix implementation**: Use Wix FAQ app or custom accordion connected to collection.

---

## Collection 8: Venues / Locations

| Field | Type | Required |
|-------|------|----------|
| Name | Text | Yes |
| Slug | Text | Yes |
| Address | Text | Yes |
| Postcode | Text | Yes |
| Nearest Station | Text | Yes |
| Transport Line | Text | No |
| Walk Time | Text | No |
| Google Maps URL | URL | Yes |
| Description | Rich Text | No |
| What to Expect | Rich Text | No |
| Cover Image | Image | No |
| Interior Images | Gallery | No |
| Class Day | Text | Yes |
| Is Active | Boolean | Yes |

**Dynamic Page**: `/venue/{slug}`

---

## Collection 9: Enquiries (Form Submissions)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Name | Text | Yes | |
| Email | Text | Yes | |
| Phone | Text | No | |
| Subject | Text | Yes | General / Wedding / Private / Corporate / Hen Party |
| Message | Rich Text | Yes | |
| Source Page | Text | No | Which page they came from |
| Status | Text | Yes | New / In Progress / Replied / Archived |
| Notes | Rich Text | No | Internal notes |
| Created At | Date | Yes | Auto |

**Wix implementation**: Wix Forms → submit to CMS collection. Owner notification via Wix Automations.

---

## Collection 10: Site Settings

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Key | Text | Yes | e.g. "announcement_bar", "featured_event_id" |
| Value | Rich Text | Yes | JSON or plain text |
| Updated At | Date | Yes | |

**Purpose**: Reusable content snippets, feature flags, announcement bar text.

---

## Forms Plan

| Form | Location | Submits To | Notification |
|------|----------|-----------|-------------|
| General Enquiry | `/contact` | Enquiries collection | Owner email + Wix notification |
| Wedding Consultation | `/wedding-dance` | Enquiries (subject=Wedding) | Owner email |
| Private Lessons | `/private-lessons` | Enquiries (subject=Private) | Owner email |
| Corporate/Hen Party | Future page | Enquiries (subject=Corporate/Hen) | Owner email |

**WhatsApp fallback**: All forms should show "For fastest response, message Melitta on WhatsApp" after submission.

---

## Wix CMS Notes

- Wix CMS supports up to 10,000 items per collection on Business plans
- Dynamic pages auto-generate from collection items
- Use Wix Repeaters to display collection data on static pages
- Use Dataset connections to filter (e.g. is_featured=true for homepage)
- SEO settings (title, description, slug) are per-dynamic-page in Wix
