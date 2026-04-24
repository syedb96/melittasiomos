# Page Status Matrix — v8.2 Governance Pass

Updated 2026-04-24. Principle: nav sells, footer catalogues, weak/duplicate pages noindexed.

## KEEP (core money + trust)
Home, /pura-nights, /pura-ladies, /events, /prices, /bookings, /about, /meet-the-team,
/wedding-dance, /private-lessons, /online-salsa-bachata-coaching, /online-academy,
/community, /schedule, /gallery, /testimonials, /contact, /faq, /start-here,
/locations, /gift-vouchers, /beginners, /blog,
/venue/the-george-iv-chiswick, /venue/the-drayton-court-ealing,
/learn/salsa-bachata-guide, /learn/salsa-vs-bachata.

## POLISH (next passes)
- Homepage hero + proof flow (replace AI-looking imagery with real photos)
- Venue pages (transport / parking / first-night flow detail)
- Testimonials categorisation (Beginners / Wedding / Private / Pura Ladies / Community)
- Local pages — uniqueness pass to avoid thin-content flags
- Footer local directory (collapsed to top 8 areas — review quarterly)

## MERGE
- /proof-centre → /testimonials (kept routable, noindexed)

## REMOVE / NOINDEX
| Page | Action | Reason |
|------|--------|--------|
| /online-classes | 301 → /online-salsa-bachata-coaching (SPA Navigate) | Duplicate intent |
| /refer | noindex,follow | Internal growth tool |
| /all-pages-master | noindex,follow | Internal directory |
| /proof-centre | noindex,follow | Merged into /testimonials |
| /admin/* | private (route guard) | Backend only |

## NAVIGATION RULES
**Top nav:** Home · Classes & Events · Prices & Booking · About & Services · Learn.
**Never in nav:** local SEO pages, refer, proof-centre, all-pages-master, online-academy.
**Footer columns:** Classes · Services · Learn · Locations · Contact.

## REDIRECTS (Wix host-level on migration)
- `/online-classes` → `/online-salsa-bachata-coaching` (301)
- Legacy Wix slugs per `docs/09-REDIRECT-AND-CLEANUP-PLAN.md`

## DO-NOT-BUILD LIST
Dashboards, user areas, more random local pages in nav, new quizzes, ambassador expansions, anything that doesn't serve first-timer conversion or venue-night bookings.
