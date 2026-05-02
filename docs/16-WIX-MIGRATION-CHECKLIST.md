# 16 — Wix Migration Checklist

> Cutover plan. Lovable = source of truth for content, schema, copy, and structure. Wix = production CMS.

## Static vs dynamic pages

| Page | Wix type | Bound CMS collection |
|---|---|---|
| `/`, `/about`, `/start-here`, `/community`, `/locations`, `/contact`, `/faq`, `/privacy-policy`, `/terms`, `/cookie-policy` | Static | — |
| `/pura-nights`, `/pura-ladies`, `/wedding-dance`, `/private-lessons`, `/online-salsa-bachata-coaching`, `/online-academy`, `/beginners`, `/prices`, `/schedule`, `/gallery`, `/testimonials`, `/gift-vouchers` | Static | reads from CMS where listed |
| All `/salsa-classes-*`, `/bachata-classes-*`, `/dance-classes-*`, `/wedding-dance-*`, `/private-*-london`, `/ladies-styling-london`, `/bachata-performance-team-london` | Static | — |
| `/venue/:slug` | **Dynamic** | Venues |
| `/events/:slug` | **Dynamic** | Events (or Wix Events app) |
| `/blog/:slug` | **Dynamic** | Wix Blog (separate from Pages CMS) |
| `/meet-the-team` (member pages optional) | Static or dynamic | Team |

## Section pattern → Wix element

| Lovable section | Wix element |
|---|---|
| Hero with image + H1 + CTA | Strip with full-width image + Text + Button |
| Class cards / venue cards / blog grids | **Repeater** bound to CMS |
| Gallery tabs / albums | **Wix Pro Gallery** with album filters |
| Schedule table | Repeater grouped by day |
| FAQ accordion | Wix Accordion + JSON-LD via Custom Code |
| Testimonials carousel | Wix Slideshow bound to Testimonials CMS |
| Forms (Contact, Enquire, Wedding) | **Wix Forms** with conditional fields |
| Trust ticker / Sticky CTAs / Exit popup | **Velo (Wix code)** or Wix-native widgets |
| Countdown to next event | Wix Countdown widget bound to next Event |

## Forms → automations

| Form | Notify | Tag in CRM |
|---|---|---|
| Contact (general) | hello@puranights.com | `contact` |
| Wedding enquiry | hello@puranights.com + WhatsApp | `wedding` |
| Private lessons | hello@puranights.com + WhatsApp | `privates` |
| Newsletter | Mailchimp `Pura Nights main list` | `lead-magnet` |
| Pura Ladies audition | hello@puranights.com | `auditions` |
| Gift voucher enquiry | hello@puranights.com | `vouchers` |

## Schema injection (Wix Custom Code)

Add to **Wix Dashboard → Settings → Custom Code → Head** scoped to the relevant pages:
- **All pages**: `Organization`, `LocalBusiness`/`DanceSchool`, `WebSite` with `SearchAction`.
- **Blog posts**: `Article` with author = Melitta Siomos.
- **`/events/:slug`**: `Event` (use Lovable schema as the template — already validated).
- **Venue pages**: `Place` + `LocalBusiness`.
- **FAQ pages**: `FAQPage` mirroring on-page Q&A.
- **Breadcrumbs**: `BreadcrumbList` on every non-home page.

## Cutover order

1. Copy content from Lovable preview into Wix pages (use the published URLs as source).
2. Build CMS collections (Events, Venues, Team, Testimonials, FAQs) — schemas defined in `docs/03-WIX-CMS-BLUEPRINT.md`.
3. Bind Repeaters / Pro Gallery / dynamic pages.
4. Inject schema via Custom Code.
5. Set up forms + automations.
6. Configure URL Redirect Manager (`docs/15-WIX-REDIRECT-MANAGER-IMPORT.md`).
7. Set canonical host = `www.puranights.com` in Wix Domains.
8. Publish on a `wixsite.com` URL → run Lighthouse + GSC URL inspection on 5 sample pages.
9. Switch DNS → wait for propagation → re-run sitemap submit.
10. Monitor GSC daily for 2 weeks.
