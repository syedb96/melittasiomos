# 22 — Wix Migration SEO Checklist

> Final pre-cutover checklist. Pair with `docs/16-WIX-MIGRATION-CHECKLIST.md` (build), `docs/20-WIX-REDIRECT-MANAGER-MAP.md` (redirects), `docs/19-GOOGLE-SEARCH-CONSOLE-LAUNCH-GUIDE.md` (GSC).

## Page architecture in Wix

| Lovable route | Wix type | CMS collection |
|---|---|---|
| `/`, `/about`, `/start-here`, `/community`, `/locations`, `/contact`, `/faq`, `/privacy-policy`, `/terms`, `/cookie-policy`, `/beginners`, `/prices`, `/bookings`, `/gift-vouchers` | Static | — |
| `/pura-nights`, `/pura-ladies`, `/wedding-dance`, `/private-lessons`, `/online-salsa-bachata-coaching`, `/online-academy`, `/schedule`, `/gallery`, `/testimonials`, `/meet-the-team` | Static (reads CMS) | Testimonials, Team |
| All `/salsa-classes-*`, `/bachata-classes-*`, `/dance-classes-*`, `/wedding-dance-*`, `/private-*-london`, `/ladies-styling-london`, `/bachata-performance-team-london`, `/latin-dance-*` | Static | — |
| `/venue/:slug` | **Dynamic** | Venues |
| `/events/:slug` | **Dynamic** | Events (or Wix Events app) |
| `/blog/:slug` | **Dynamic** | Wix Blog |

## Section → Wix element

| Section pattern | Wix element |
|---|---|
| Hero | Strip + Text + Button |
| Class/venue/blog cards | Repeater bound to CMS |
| Gallery tabs | Wix Pro Gallery |
| Schedule table | Repeater grouped by day |
| FAQ accordion | Wix Accordion + JSON-LD via Custom Code |
| Testimonials carousel | Wix Slideshow bound to Testimonials |
| Forms | Wix Forms |
| Sticky CTA / exit popup / countdown | Velo or Wix-native widgets |
| Shop | Wix Stores (noindex until live) |

## Schema injection (Wix Custom Code → Head, scoped per page)

- All pages: `Organization`, `DanceSchool`/`LocalBusiness`, `WebSite` with `SearchAction`, `BreadcrumbList`
- `/blog/:slug`: `Article` (author = Melitta Siomos)
- `/events/:slug`: `Event` — copy directly from `buildEventSchema()` in `src/data/events.ts`
- `/venue/:slug`: `Place` + `LocalBusiness`
- `/faq` + service pages with FAQs: `FAQPage`

**FORBIDDEN**: Event schema on `/pura-nights`, `/schedule`, or any `*-classes-*` recurring page. Mirror the `RECURRING_PAGES` guard from `scripts/seo-qa.ts`.

## Sitemap / robots in Wix

- Wix auto-generates `/sitemap.xml` from indexable pages.
- **Settings → SEO → Robots.txt Editor** — confirm `Disallow: /admin` and sitemap line.
- **Settings → SEO → Index Settings** — set `noindex` on: shop, lookbook, refer, all-pages-master, login, admin/*.

## Canonical host

Wix Dashboard → **Settings → Domains** → Primary = `www.puranights.com`. Apex auto-301.

## Forms → automations

| Form | Notify | CRM tag |
|---|---|---|
| Contact | hello@puranights.com | `contact` |
| Wedding | hello@puranights.com + WhatsApp | `wedding` |
| Privates | hello@puranights.com + WhatsApp | `privates` |
| Newsletter | Mailchimp main list | `lead-magnet` |
| Pura Ladies audition | hello@puranights.com | `auditions` |
| Vouchers | hello@puranights.com | `vouchers` |

## Cutover order

1. Build pages on `wixsite.com` staging URL.
2. Build CMS collections (Events, Venues, Team, Testimonials, FAQs).
3. Bind repeaters / dynamic pages.
4. Inject schema via Custom Code.
5. Configure forms + automations.
6. Import redirects from `docs/20`.
7. Set primary domain = `www.puranights.com`.
8. Lighthouse + URL Inspection on 5 sample pages on staging.
9. DNS switch.
10. Resubmit `https://www.puranights.com/sitemap.xml` in GSC.
11. Import to Bing.
12. Daily GSC monitoring for 14 days.

## GSC submission order after cutover

Tier 1 first: `/`, `/pura-nights`, `/prices`, `/events`, `/salsa-classes-chiswick`, `/bachata-classes-ealing`, `/wedding-dance`, `/private-lessons`, `/testimonials`, `/blog`, both `/venue/*` pages.

## Pre-flight checklist

- [ ] `bun run seo:check` passes (zero errors)
- [ ] All redirects from doc 20 imported
- [ ] Primary domain = www
- [ ] Robots.txt includes sitemap line
- [ ] No Event schema on recurring pages
- [ ] Shop pages noindex
- [ ] Lighthouse SEO ≥95 on 5 sample pages
- [ ] GSC sitemap submitted
- [ ] Bing sitemap submitted
