# Forms & Conversion Plan — Melitta Siomos / Pura Nights

---

## Forms Required

### 1. General Enquiry
- **Location**: `/contact`
- **Fields**: Name*, Email*, Phone, Subject (dropdown), Message*
- **Subject options**: General, Classes, Events, Other
- **Submit to**: Wix CMS → Enquiries collection
- **Notification**: Owner email via Wix Automations
- **Success state**: "Thanks! We'll reply within 24 hours. For fastest response, message Melitta on WhatsApp."

### 2. Wedding Consultation
- **Location**: `/wedding-dance`
- **Fields**: Names*, Email*, Phone, Wedding Date, Venue (optional), Song Choice (optional), Message
- **Submit to**: Enquiries (subject=Wedding)
- **Notification**: Owner email
- **Success state**: "Thanks! Melitta will be in touch to arrange your free consultation."

### 3. Private Lessons Enquiry
- **Location**: `/private-lessons`
- **Fields**: Name*, Email*, Phone, Dance Style (dropdown), Experience Level (dropdown), Goals (textarea)
- **Submit to**: Enquiries (subject=Private)
- **Notification**: Owner email
- **Success state**: Same pattern with WhatsApp nudge.

### 4. Corporate Bookings
- **Location**: `/corporate-dance-classes-london`
- **Fields**: Name*, Company*, Email*, Phone, Group Size, Date, Message
- **Submit to**: Enquiries (subject=Corporate)
- **CRM tag**: `corporate`
- **Notify**: hello@puranights.com + WhatsApp 07449 482343

### 5. Private Group Dance Parties (Hen / Birthday / Stag)
- **Location**: `/private-group-dance-parties-london`
- **Fields**: Name*, Email*, Phone, Event Type (Hen/Birthday/Stag/Other), Group Size, Date, Message
- **Submit to**: Enquiries (subject=Group Party)
- **CRM tag**: `group-party`
- **Notify**: hello@puranights.com + WhatsApp

### 6. Partner Enquiries (Brands / Influencers)
- **Location**: `/partner-with-pura-nights`
- **Fields**: Name*, Brand/Org*, Email*, Type of Partnership, Message*
- **Submit to**: Enquiries (subject=Partner)
- **CRM tag**: `partner`
- **Notify**: hello@puranights.com

### 7. Venue Collaboration
- **Location**: `/partner-with-pura-nights` (segmented option)
- **Fields**: Name*, Venue Name*, Email*, Phone, Location, Message
- **Submit to**: Enquiries (subject=Venue Partner)
- **CRM tag**: `venue-partner`
- **Notify**: hello@puranights.com

### 8. Email Capture Gate (Lead Magnet)
- **Location**: `/start-here`, `/pura-nights` (non-blocking gate)
- **Fields**: Name, Email*
- **Submit to**: Enquiries (subject=Lead Magnet) → Mailchimp main list
- **CRM tag**: `lead-magnet`

### 9. First Class Enquiry
- **Location**: Beginners pages, Start Here CTAs
- **Fields**: Name*, Email*, Class chosen (Mon Chiswick / Tue Ealing)
- **Submit to**: Enquiries (subject=First Class)
- **CRM tag**: `first-class`
- **Notify**: hello@puranights.com

---

## CRM Tag Master List

| Form | CRM tag | Notify |
|---|---|---|
| Contact (general) | `contact` | hello@puranights.com |
| Wedding | `wedding` | hello@puranights.com + WhatsApp |
| Private Lessons | `privates` | hello@puranights.com + WhatsApp |
| Corporate Bookings | `corporate` | hello@puranights.com + WhatsApp |
| Private Group Parties | `group-party` | hello@puranights.com + WhatsApp |
| Partner Enquiries | `partner` | hello@puranights.com |
| Venue Collaboration | `venue-partner` | hello@puranights.com |
| Email Capture Gate | `lead-magnet` | Mailchimp main list |
| First Class Enquiry | `first-class` | hello@puranights.com |
| Newsletter | `lead-magnet` | Mailchimp main list |
| Pura Ladies Audition | `auditions` | hello@puranights.com |
| Gift Vouchers | `vouchers` | hello@puranights.com |

---

## Conversion System: First Class Confidence

### Key Reassurance Points (appear on multiple pages)

| Question | Answer (short) | Appears On |
|----------|---------------|------------|
| Do I need a partner? | No — we rotate partners so everyone dances. | Homepage, Start Here, FAQ, Pura Nights, Beginners, Community, Venue pages |
| What should I wear? | Comfortable clothes, clean shoes with a smooth sole. | Start Here, FAQ, Blog |
| Can I come alone? | Most people do! You'll meet new friends. | Start Here, FAQ, Community, Beginners |
| Which level am I? | Never danced = Beginners. 6+ months = Improvers. | Start Here, Beginners, Pura Nights |
| What if I have two left feet? | That's what beginners class is for! | Start Here, FAQ, Beginners |
| What happens after class? | Social dancing + drinks at the bar. | Start Here, Venue pages |
| How quickly will I improve? | Most people feel comfortable within 4-6 weeks. | FAQ, Blog |

### "What Happens at Your First Class?" Walkthrough

A visual timeline block (Template 14 — Venue Arrival Guide):
1. **Arrive** — 5-10 mins early, find the dance space
2. **Sign in** — Pay at the door (cash or card)
3. **Warm-up** — Free styling warm-up (Tuesdays 6:50pm)
4. **Learn** — Step-by-step instruction, no experience needed
5. **Rotate** — Meet new partners, everyone practices together
6. **Social** — Open floor dancing after class
7. **Socialise** — Drinks at the bar, chat with the community

---

## WhatsApp Integration

- Floating WhatsApp button on all pages (already implemented)
- Link: `https://wa.me/447449482343`
- Post-form CTA: "For fastest response, message Melitta on WhatsApp"
- Sticky mobile CTA: WhatsApp + Book Now (already implemented)

---

## Booking Flow

All "Book Now" buttons → `https://linktr.ee/pura.nights`

Linktree contains:
- Monday Chiswick booking
- Tuesday Ealing booking
- Latin Friday tickets
- Private lesson enquiry
- Wedding consultation
- Gift vouchers

---

## Testimonial Acquisition System

### Collection Workflow
1. After each term/block, send WhatsApp to regular students asking for a quick review
2. Share Google Review link: direct link to Google Business Profile
3. Screenshot Instagram DM testimonials (with permission)
4. After wedding dance: request testimonial + photo permission
5. After private lessons: request brief feedback

### Content Template
> "Hi [Name]! We'd love to hear about your experience at Pura Nights. Would you mind sharing a quick review? You can either leave a Google review [link] or reply here and we'll feature it on our website. Thanks! 💃"

### Storage
- Add to Wix CMS → Testimonials collection
- Tag with: category, rating, source, is_featured
- Feature best ones on homepage carousel (is_featured=true)
