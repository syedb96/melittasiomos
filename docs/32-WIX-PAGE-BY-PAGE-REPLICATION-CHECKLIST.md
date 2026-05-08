# 32 — Wix Page-by-Page Replication Checklist

> The Wix migration "Bible". Every important page in the React build has a row below covering Wix page name, slug, page type, meta, H1, sections, images, schema, links, CTAs, indexability and redirects. Use this as the single source of truth when rebuilding inside the Wix Editor + Wix CMS.

Legend
- **Type**: Static (built in Editor) · Wix Blog · Wix Stores · Wix Events · CMS dynamic page (Wix Content Manager)
- **Index**: `index` (allow indexing) or `noindex` (block)
- **Schema** keys: Org, LocalBusiness, BreadcrumbList, FAQPage, Event, Article, ItemList, Product

---

## 1. Home — `/`
| Field | Value |
|---|---|
| Wix page name | Home |
| Slug | `/` |
| Type | Static |
| Meta title | Salsa & Bachata Classes London \| Pura Nights by Melitta Siomos |
| Meta description | London's award-winning Salsa & Bachata school. Weekly classes in Chiswick & Ealing, private lessons, wedding dance & performance teams. |
| H1 | Dance Like You Mean It |
| Sections (in order) | Hero · New Here? Strip · 3 Benefit Pillars · Social Proof Bar · Next Class Countdown · 4 Brand Pillars · Weekly Schedule Table · Salsa vs Bachata · Meet Melitta · Social Vibe · Testimonials Carousel · Pricing Snapshot · Wedding Dance Teaser · Blog Preview · Gift Vouchers Strip · Instagram Grid · FAQ |
| Images needed | Hero (16:9 cinematic dancers, faces visible) · Melitta editorial portrait · Wedding couple · Pura Ladies team · Social dance crowd |
| Schema | Org, LocalBusiness, FAQPage, BreadcrumbList |
| Internal links | /start-here · /pura-nights · /schedule · /prices · /wedding-dance · /pura-ladies · /online-salsa-bachata-coaching · /events · /blog · /testimonials |
| Primary CTA | Book Your First Class → Tickettailor |
| Secondary CTA | See Class Schedule → /schedule |
| Index | index |
| Redirect notes | n/a |

## 2. Pura Nights (Weekly Classes) — `/pura-nights`
| Field | Value |
|---|---|
| Wix page name | Pura Nights — Weekly Classes |
| Slug | `/pura-nights` |
| Type | Static |
| Meta title | Pura Nights — Weekly Salsa & Bachata Classes Chiswick & Ealing |
| Meta description | Drop into our weekly Salsa & Bachata classes every Monday in Chiswick and Tuesday in Ealing. 3 levels, all welcome, no partner needed. |
| H1 | Pura Nights — Weekly Salsa & Bachata in West London |
| Sections | Hero · Trust badges · Weekly schedule table · Levels explained · Venues · First-Timer Callout · Pricing snapshot · Testimonials (Beginners) · FAQ · Related pages |
| Images needed | Class action shot (Chiswick) · Class action shot (Ealing) · Venue exteriors |
| Schema | LocalBusiness, Event (recurring), FAQPage, BreadcrumbList |
| Internal links | /schedule · /prices · /start-here · /venue/the-george-iv-chiswick · /venue/the-drayton-court-ealing |
| Primary CTA | Book on Tickettailor |
| Secondary CTA | WhatsApp Melitta |
| Index | index |
| Redirect notes | `/online-classes` → this page is NOT the target; online → `/online-salsa-bachata-coaching` |

## 3. Prices — `/prices`
| Field | Value |
|---|---|
| Wix page name | Pricing |
| Slug | `/prices` |
| Type | Static |
| Meta title | Salsa & Bachata Class Prices London \| Pura Nights |
| Meta description | Drop-in £10. 5-class bundle £42. Couples & student bundles available. No public pricing for private lessons or wedding dance — enquire via WhatsApp. |
| H1 | Class Pricing |
| Sections | Hero · Pricing cards (drop-in, bundles, social-only) · Bundle calculator · Payment methods · First-Timer Callout · FAQ |
| Images needed | Class atmosphere · Tickets/wristbands flat lay |
| Schema | PriceSpecification, FAQPage, BreadcrumbList |
| Internal links | /pura-nights · /schedule · /gift-vouchers · /private-lessons · /wedding-dance |
| Primary CTA | Book Now (Tickettailor) |
| Secondary CTA | Buy Gift Voucher |
| Index | index |
| Redirect notes | n/a — never expose private/wedding pricing publicly |

## 4. Schedule — `/schedule`
| Field | Value |
|---|---|
| Wix page name | Weekly Schedule |
| Slug | `/schedule` |
| Type | Static |
| Meta title | Weekly Salsa & Bachata Class Schedule \| Chiswick & Ealing |
| Meta description | The full weekly Pura Nights schedule. Monday Chiswick. Tuesday Ealing. Monthly Latin Friday. Times, levels, prices and how to find us. |
| H1 | This Week at Pura Nights |
| Sections | Hero · Monday timetable · Tuesday timetable · Latin Friday callout · Venue maps · First-Timer Callout · FAQ |
| Images needed | Venue interior · Crowd shot · Street-level map snippet |
| Schema | Event, BreadcrumbList |
| Internal links | /pura-nights · /events · /venue/* · /prices |
| Primary CTA | Book on Tickettailor |
| Secondary CTA | WhatsApp Melitta |
| Index | index |
| Redirect notes | n/a |

## 5. Locations — `/locations`
| Field | Value |
|---|---|
| Wix page name | Find a Class Near You |
| Slug | `/locations` |
| Type | Static |
| Meta title | Salsa & Bachata Classes Near Me — West & SW London |
| Meta description | Find Pura Nights classes near you in Chiswick, Ealing, Acton, Hammersmith, Richmond, Fulham and Hounslow. |
| H1 | Find a Class Near You |
| Sections | Hero · Map of areas · Area cards (W4/W5/W3/W6/TW9/SW6/TW3) · First-Timer Callout · FAQ |
| Images needed | Stylised West London map · Each area card image |
| Schema | LocalBusiness, ItemList, BreadcrumbList |
| Internal links | All `/salsa-classes-*`, `/bachata-classes-*`, `/dance-classes-*` |
| Primary CTA | View Schedule |
| Secondary CTA | WhatsApp Melitta |
| Index | index |
| Redirect notes | n/a |

## 6. Start Here — `/start-here`
| Field | Value |
|---|---|
| Wix page name | Start Here — Beginners |
| Slug | `/start-here` |
| Type | Static |
| Meta title | Beginner's Guide to Salsa & Bachata in London \| Start Here |
| Meta description | Brand-new to dance? Read our beginner's guide. No partner, no experience, no special shoes needed — just turn up. |
| H1 | New to Salsa or Bachata? Start Here. |
| Sections | Hero · Come-alone reassurance · Level selector · First-night walkthrough · What to wear · Why Pura Nights · Quick answers · Style comparison · Venue picker · Beginner proof block · Final CTA |
| Images needed | Welcoming class shot · Shoes flat lay · Venue interior · Beginner couple |
| Schema | FAQPage, HowTo (optional), BreadcrumbList |
| Internal links | /pura-nights · /schedule · /prices · /venue/* · /faq |
| Primary CTA | Book First Class |
| Secondary CTA | WhatsApp Melitta |
| Index | index |
| Redirect notes | Canonical landing for any "first-timer" backlinks |

## 7. Salsa Classes London — `/salsa-classes-london`
| Field | Value |
|---|---|
| Wix page name | Salsa Classes London |
| Slug | `/salsa-classes-london` |
| Type | Static |
| Meta title | Salsa Classes London — Weekly Beginner to Advanced \| Pura Nights |
| Meta description | Salsa classes in London every week. Beginner-friendly. No partner needed. Chiswick & Ealing venues. |
| H1 | Salsa Classes in London |
| Sections | Hero · Why Pura Nights · Class structure · Venues · First-Timer Callout · Testimonials · Related pages · FAQ |
| Images needed | Salsa class wide shot · Melitta teaching · Couple dancing salsa |
| Schema | LocalBusiness, Course, FAQPage, BreadcrumbList |
| Internal links | /pura-nights · /salsa-classes-chiswick · /salsa-classes-ealing · /prices · /start-here |
| Primary CTA | Book on Tickettailor |
| Secondary CTA | View Schedule |
| Index | index |
| Redirect notes | n/a |

## 8. Bachata Classes London — `/bachata-classes-london`
| Field | Value |
|---|---|
| Wix page name | Bachata Classes London |
| Slug | `/bachata-classes-london` |
| Type | Static |
| Meta title | Bachata Classes London — Sensual & Dominican Weekly \| Pura Nights |
| Meta description | Bachata classes in London with UK Bachata Champion Melitta Siomos. Weekly in Chiswick & Ealing. Beginners welcome. |
| H1 | Bachata Classes in London |
| Sections | Hero · Why Melitta · Bachata styles · Class structure · Venues · First-Timer Callout · Testimonials · Related pages · FAQ |
| Images needed | Bachata couple close-up · Melitta performing · Class shot |
| Schema | LocalBusiness, Course, FAQPage, BreadcrumbList |
| Internal links | /pura-nights · /bachata-classes-chiswick · /bachata-classes-ealing · /prices · /start-here |
| Primary CTA | Book on Tickettailor |
| Secondary CTA | View Schedule |
| Index | index |
| Redirect notes | n/a |

## 9. Salsa Classes Chiswick — `/salsa-classes-chiswick`
| Field | Value |
|---|---|
| Wix page name | Salsa Classes Chiswick |
| Slug | `/salsa-classes-chiswick` |
| Type | Static |
| Meta title | Salsa Classes Chiswick (W4) — Mondays at The George IV |
| Meta description | Weekly salsa classes in Chiswick W4 every Monday at The George IV. 3 levels. All welcome. |
| H1 | Salsa Classes in Chiswick |
| Sections | Hero · Venue · Schedule · First-Timer Callout · Testimonials · Related Chiswick pages · FAQ |
| Images needed | The George IV exterior + interior · Class shot Chiswick |
| Schema | LocalBusiness, Event, BreadcrumbList |
| Internal links | /venue/the-george-iv-chiswick · /salsa-classes-london · /bachata-classes-chiswick |
| Primary CTA | Book on Tickettailor |
| Secondary CTA | WhatsApp Melitta |
| Index | index |
| Redirect notes | `/salsa-classes-acton-local` (deprecated) → 301 to this page |

## 10. Bachata Classes Ealing — `/bachata-classes-ealing`
| Field | Value |
|---|---|
| Wix page name | Bachata Classes Ealing |
| Slug | `/bachata-classes-ealing` |
| Type | Static |
| Meta title | Bachata Classes Ealing (W13) — Tuesdays at Drayton Court |
| Meta description | Weekly bachata classes in Ealing W13 every Tuesday at Drayton Court Hotel. Sensual & Dominican. Beginners welcome. |
| H1 | Bachata Classes in Ealing |
| Sections | Hero · Venue · Schedule · First-Timer Callout · Testimonials · Related Ealing pages · FAQ |
| Images needed | Drayton Court exterior + interior · Bachata class shot |
| Schema | LocalBusiness, Event, BreadcrumbList |
| Internal links | /venue/the-drayton-court-ealing · /bachata-classes-london · /salsa-classes-ealing |
| Primary CTA | Book on Tickettailor |
| Secondary CTA | WhatsApp Melitta |
| Index | index |
| Redirect notes | n/a |

## 11. Wedding Dance — `/wedding-dance`
| Field | Value |
|---|---|
| Wix page name | Wedding First Dance |
| Slug | `/wedding-dance` |
| Type | Static |
| Meta title | Wedding First Dance Choreography London \| Wedding Dance Made Easy |
| Meta description | Bespoke first dance choreography by Melitta Siomos. Calm, fun, professional sessions in West London. Enquiry only. |
| H1 | Your Wedding First Dance, Made Easy |
| Sections | Hero · How it works · Song selection · Process steps · Proof (couple cards) · First-Timer Callout · FAQ · Enquiry CTA |
| Images needed | Real wedding couple dancing · Studio session · Behind-the-scenes |
| Schema | Service, FAQPage, BreadcrumbList |
| Internal links | /private-lessons · /blog/choose-wedding-song · /blog/wedding-first-dance-tips · /contact |
| Primary CTA | WhatsApp Melitta |
| Secondary CTA | Email Enquiry |
| Index | index |
| Redirect notes | NEVER show pricing publicly. Enquiry-only. |

## 12. Private Lessons — `/private-lessons`
| Field | Value |
|---|---|
| Wix page name | Private Lessons |
| Slug | `/private-lessons` |
| Type | Static |
| Meta title | Private Salsa & Bachata Lessons London \| Melitta Siomos |
| Meta description | 1-to-1 and 1-to-2 private lessons in West London with Melitta Siomos. Tailored coaching for confidence, technique or events. Enquiry only. |
| H1 | Private Salsa & Bachata Lessons |
| Sections | Hero · Who it's for · How sessions run · Locations · Proof · Enquiry CTA · FAQ |
| Images needed | Studio 1-to-1 · Couple private session |
| Schema | Service, FAQPage, BreadcrumbList |
| Internal links | /wedding-dance · /pura-nights · /contact |
| Primary CTA | WhatsApp Melitta |
| Secondary CTA | Contact form |
| Index | index |
| Redirect notes | NEVER show pricing publicly. Enquiry-only. |

## 13. Events — `/events`
| Field | Value |
|---|---|
| Wix page name | Events |
| Slug | `/events` |
| Type | Wix Events |
| Meta title | Latin Friday & Special Events \| Pura Nights London |
| Meta description | Monthly Latin Friday at Drayton Court Ealing plus seasonal socials, masterclasses and parties. |
| H1 | Pura Nights Events |
| Sections | Upcoming events list (Wix Events repeater) · Latin Friday explainer · Past event gallery · Newsletter |
| Images needed | Latin Friday crowd · Event posters |
| Schema | Event (per item), BreadcrumbList |
| Internal links | /events/[slug] · /gallery |
| Primary CTA | Book Tickets |
| Secondary CTA | Add to calendar |
| Index | index |
| Redirect notes | Per-event slugs follow `/events/<slug>` |

## 14. Testimonials — `/testimonials`
| Field | Value |
|---|---|
| Wix page name | Testimonials |
| Slug | `/testimonials` |
| Type | CMS dynamic (Wix Content Manager → Testimonials) |
| Meta title | Real Student Reviews — Salsa & Bachata London \| Pura Nights |
| Meta description | Hundreds of real student reviews from Pura Nights weekly classes, wedding couples, private lessons and Pura Ladies. |
| H1 | What Our Students Say |
| Sections | Hero · Filter by category · Repeater of testimonials · Google review badge · Video testimonials · CTA |
| Images needed | Student headshots/avatars · Google review screenshots |
| Schema | Review (per item), AggregateRating |
| Internal links | /proof-centre · /pura-nights · /wedding-dance · /pura-ladies |
| Primary CTA | Book a Class |
| Secondary CTA | Leave a Google Review |
| Index | index |
| Redirect notes | n/a |

## 15. Gallery — `/gallery`
| Field | Value |
|---|---|
| Wix page name | Gallery |
| Slug | `/gallery` |
| Type | Static + Wix Pro Gallery |
| Meta title | Photo & Video Gallery — Pura Nights London |
| Meta description | Class photos, performance videos and event highlights from Pura Nights. |
| H1 | Gallery |
| Sections | Hero · Tabs (Classes / Events / Pura Ladies / Wedding) · Pro Gallery · YouTube strip |
| Images needed | All real photography by category |
| Schema | ImageObject, BreadcrumbList |
| Internal links | /pura-ladies · /events · /testimonials |
| Primary CTA | Book a Class |
| Secondary CTA | Follow on Instagram |
| Index | index |

## 16. Blog Index — `/blog`
| Field | Value |
|---|---|
| Wix page name | Blog |
| Slug | `/blog` |
| Type | Wix Blog |
| Meta title | Salsa & Bachata Blog — Tips, Stories & London Guides |
| Meta description | Read tips, beginner guides, music breakdowns, wedding dance advice and London nightlife from Melitta Siomos. |
| H1 | Pura Nights Blog |
| Sections | Featured · Categories · Latest posts grid · Newsletter |
| Images needed | Per-post hero (managed in Wix Blog) |
| Schema | Blog, BreadcrumbList; per post: Article |
| Internal links | All blog posts; /start-here; /pura-nights |
| Primary CTA | Subscribe |
| Index | index |

## 17. Gift Vouchers — `/gift-vouchers`
| Field | Value |
|---|---|
| Wix page name | Gift Vouchers |
| Slug | `/gift-vouchers` |
| Type | Static (or Wix Stores product) |
| Meta title | Salsa & Bachata Gift Vouchers London \| Pura Nights |
| Meta description | The perfect gift — drop-in vouchers, 5-class bundles or wedding-dance gift packages. |
| H1 | Gift Vouchers |
| Sections | Hero · Voucher tiers · How to redeem · FAQ · CTA |
| Images needed | Voucher mockup · Gift card flat lay |
| Schema | Product, FAQPage |
| Internal links | /prices · /wedding-dance · /private-lessons |
| Primary CTA | Buy Voucher (WhatsApp/email enquiry until Stores live) |
| Index | index |

## 18. Online Coaching — `/online-salsa-bachata-coaching`
| Field | Value |
|---|---|
| Wix page name | Online Coaching |
| Slug | `/online-salsa-bachata-coaching` |
| Type | Static |
| Meta title | Online Salsa & Bachata Coaching with Melitta Siomos |
| Meta description | Live Zoom 1-to-1s + on-demand drill videos. Coaching for international students and busy professionals. |
| H1 | Online Salsa & Bachata Coaching |
| Sections | Hero · How it works · What you get · Pricing tiers · Testimonials · FAQ · Enquiry CTA |
| Images needed | Zoom session screenshot · Melitta on camera · Drill thumbnail |
| Schema | Service, FAQPage, BreadcrumbList |
| Internal links | /online-academy · /private-lessons · /pura-nights |
| Primary CTA | Book Discovery Call |
| Secondary CTA | WhatsApp Melitta |
| Index | index |
| Redirect notes | `/online-classes` → 301 here |

## 19. Shop (Soft Launch) — `/shop`
| Field | Value |
|---|---|
| Wix page name | Shop — Dancewear |
| Slug | `/shop` |
| Type | Wix Stores |
| Meta title | Pura Nights Dancewear & Merchandise (Coming Soon) |
| Meta description | Limited dancewear collection by Pura Nights. Launching soon — subscribe for early access. |
| H1 | Pura Nights Shop |
| Sections | Lookbook · Categories · Sign-up for launch · Sizing |
| Images needed | Real product photography (placeholder until live) |
| Schema | Product (when live) |
| Internal links | /shop/lookbook · /shop/size-guide · /shop/shipping-returns |
| Primary CTA | Notify me at launch |
| Index | **noindex until real product photos are ready** |

---

## Cross-page conventions

- **Phone**: `+44 7449 482 343` everywhere; `tel:+447449482343`.
- **WhatsApp**: `https://wa.me/447449482343` everywhere.
- **Booking** (weekly classes): `https://www.tickettailor.com/events/puranights`.
- **Linktree (event/quick-link booking)**: `https://linktr.ee/pura.nights`.
- **Private lessons / wedding dance**: NEVER show prices publicly — enquiry only via WhatsApp / email.
- **OG image**: each page must have a unique OG image where possible. Default: brand hero.
- **Canonical**: `https://www.puranights.com<path>` (no trailing slash for non-root).
- **Robots**: index by default. `noindex` only on `/shop*` (until real photos), `/admin/*`, `/login`, `/thank-you`.
