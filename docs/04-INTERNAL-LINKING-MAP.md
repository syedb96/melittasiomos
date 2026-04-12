# Internal Linking Map — Melitta Siomos / Pura Nights

> Every major page must do 3 jobs:
> 1. Send people toward **booking/enquiry**
> 2. Send people toward **reassurance/education**
> 3. Send people toward **local relevance**

---

## Commercial Hubs (Conversion Pages)

These pages exist to convert. Every other page should link toward at least one.

| Hub | Primary CTA | Secondary CTA |
|-----|------------|---------------|
| `/` (Homepage) | Book a Class | Start Here |
| `/pura-nights` | Book via Linktree | WhatsApp |
| `/wedding-dance` | Free Consultation | WhatsApp |
| `/private-lessons` | Enquire Now | WhatsApp |
| `/prices` | Book a Class | Contact |
| `/contact` | Send Enquiry | WhatsApp |
| `/bookings` | Linktree hub | — |

## Authority Hubs (Trust & Education Pages)

These pages build confidence and keep users on-site longer.

| Hub | Links TO | Links FROM |
|-----|----------|-----------|
| `/blog` | All 42 posts | Homepage, Start Here, FAQ |
| `/start-here` | Pura Nights, Prices, FAQ, Schedule | Homepage, Blog, Local pages |
| `/community` | Events, Gallery, Testimonials | Homepage, About |
| `/about` | Team, Pura Ladies, Contact | Homepage, Community |
| `/testimonials` | Contact, Book | Homepage, Wedding, Private |
| `/faq` | Start Here, Prices, Contact | All service pages |
| `/gallery` | Events, Pura Ladies | Homepage, Community |

## Local Relevance Pages

Each local page links to:
- Nearest venue page
- Schedule
- Prices
- Start Here
- 2-3 related local pages (via RelatedPages component)

| Local Page | Must Link To |
|-----------|-------------|
| `/salsa-classes-chiswick` | Venue: George IV, Schedule, Prices, `/dance-classes-chiswick` |
| `/bachata-classes-ealing` | Venue: Drayton Court, Schedule, Prices, `/dance-classes-ealing` |
| `/dance-classes-west-london` | Both venues, Schedule, Start Here |
| `/wedding-dance-west-london` | `/wedding-dance`, Contact, Testimonials |
| etc. | Same pattern |

## Venue Pages (NEW)

| Venue Page | Links TO | Links FROM |
|-----------|----------|-----------|
| `/venue/the-george-iv-chiswick` | Schedule, Prices, Chiswick class pages, Start Here | All Chiswick local pages, Schedule, Locations |
| `/venue/the-drayton-court-ealing` | Schedule, Prices, Ealing class pages, Start Here | All Ealing local pages, Schedule, Locations |

## Blog Internal Linking Rules

1. Every blog post links to at least 2 internal pages (not just other posts)
2. Every post has a mid-article CTA after the 3rd H2
3. Every post has a bottom CTA
4. Service posts (wedding, private) link to the service page
5. Local posts link to the nearest class page
6. Beginner posts link to `/start-here` and `/beginners`

## Footer Link Architecture

The footer contains the site's primary crawl architecture:

| Column | Links |
|--------|-------|
| Classes & Events | Pura Nights, Schedule, Events, Beginners, Pura Ladies |
| Prices & Booking | Prices, Book Now, Gift Vouchers, Start Here |
| About & Services | About, Wedding Dance, Private Lessons, Online Classes, Community |
| Find a Class | All 18 local SEO pages |
| Contact | Contact, WhatsApp, Instagram, Facebook, YouTube |

## Navigation Structure

**Desktop**: Mega-nav with dropdowns
**Mobile**: Hamburger with grouped sections

| Nav Item | Dropdown Contents |
|----------|------------------|
| HOME | — |
| CLASSES & EVENTS | Weekly Classes, Monthly Latin Fridays, Pura Ladies, Online Coaching |
| PRICES & BOOKING | Class Pricing, Book a Class ↗, Gift Vouchers |
| ABOUT & SERVICES | About Melitta, Meet the Team, Wedding Dance, Private Lessons |
| LEARN | Blog & Guides, FAQs, Start Here (Beginners), Community, Schedule, Gallery, Find a Class Near You |
| **CTA Buttons** | WhatsApp + Book Now → Linktree |
