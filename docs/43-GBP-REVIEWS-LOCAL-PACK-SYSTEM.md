# 43 — Google Business Profile, Reviews & Local Pack System

_Last updated: 2026-05-15. The single highest-leverage channel for "salsa classes near me" and the West London map pack._

## Why this matters
Local Pack rankings (the 3 venues on the map at the top of "salsa classes London") are decided by a different algorithm to organic search. The big three signals: **proximity, prominence, relevance** — and prominence is largely driven by review count + recency + reply rate. A weekly review habit is the single biggest needle-mover.

## GBP Profile setup checklist

### Pura Nights — Chiswick (primary)
- **Name:** Pura Nights — Salsa & Bachata Classes Chiswick
- **Category (primary):** Dance school
- **Categories (secondary):** Latin dance club, Adult education school
- **Address:** The George IV, 185 Chiswick High Rd, London W4 2DR
- **Service area:** Chiswick, Acton, Hammersmith, Turnham Green, Bedford Park, W4
- **Hours:** Monday 19:30–23:00 (mark all other days "by appointment")
- **Website:** `https://www.puranights.com/venue/the-george-iv-chiswick`
- **Booking link:** `https://www.puranights.com/bookings`
- **Phone:** WhatsApp number (single source of truth)
- **Description (750 chars max):** Award-winning Salsa & Bachata classes every Monday at The George IV, Chiswick. Founded by Bachata UK Champion Melitta Siomos. Three levels, no partner needed, social dancing after class. Beginner-friendly. Drop in £10. Also offering wedding first dance lessons, private 1:1 coaching, hen party bookings and corporate team-building workshops.
- **Photos:** Cover (Latin Friday wide shot), logo (square), profile (Melitta), 10+ class action shots, exterior of venue. Re-upload 2 fresh photos every month.
- **Services:** "Salsa class", "Bachata class", "Wedding first dance lessons", "Private dance lessons", "Hen party dance class", "Corporate team building"
- **Posts:** 1 per week — class reminder, event, blog highlight, testimonial
- **Q&A:** Pre-seed 10 common questions and answer them yourself

### Pura Nights — Ealing (secondary)
- **Name:** Pura Nights — Salsa & Bachata Classes Ealing
- **Address:** The Drayton Court, 2 The Avenue, London W13 8PH
- **Hours:** Tuesday 18:50–23:00 + monthly Latin Friday
- **Website:** `https://www.puranights.com/venue/the-drayton-court-ealing`
- All other fields mirror Chiswick

## The weekly review habit (the system that wins)

### Goal
**3 new reviews per week** across both profiles. After 12 weeks: ~36 new reviews. After 6 months: ~75. After 12 months: ~150.

### The 3-touch ask sequence
1. **In-class verbal ask** (every week, end of social): _"If you've enjoyed tonight, the single biggest thing that helps us is a Google review. Takes 60 seconds. I'll send you a link tomorrow."_
2. **WhatsApp link the next morning** with a personal one-liner: _"Hey [name], thanks for last night — here's the link if you've got 60 seconds: [direct review URL]"_
3. **Email follow-up at 1 week** for anyone who didn't reply, with a screenshot of where to click

### Direct review URLs (set up once, paste forever)
Get the direct "leave a review" URL from each profile and shorten:
- Chiswick: `g.page/r/[code]/review`
- Ealing: `g.page/r/[code]/review`
Keep both URLs in a pinned note. Never send the generic profile URL — it adds 2 clicks of friction and kills conversion.

### Reply to every review within 24 hours
| Rating | Template starter |
|---|---|
| 5★ | "Thank you [name]! It was so good having you in class. See you next week 💃" — 2 sentences max, mention something specific |
| 4★ | Thank, ask what would have made it 5, invite back |
| 3★ or below | Thank, take it offline (WhatsApp), do NOT debate publicly |

Reply rate = ranking signal. 100% reply rate is the bar.

## Posts cadence (the algorithm rewards weekly)

| Day | Post type | CTA |
|---|---|---|
| Mon morning | Tonight's class reminder (Chiswick) | "Drop in 7:30pm — £10" |
| Tue morning | Tonight's class reminder (Ealing) | "Drop in 7:30pm — £10" |
| Wed | Blog highlight or testimonial | "Read more" |
| Thu | Latin Friday countdown (when applicable) | "Get tickets" |
| Fri | Photo from this week's class | "Join us next week" |

## Local citations (NAP consistency)

Submit identical Name / Address / Phone to:
- Yell.com
- Yelp UK
- Bing Places
- Apple Maps
- TripAdvisor (under "Things to Do — Classes & Workshops")
- Eventbrite (organiser profile)
- Wedding directories: Hitched, Bridebook
- Hen party directories: GoHen
- Time Out London listings
- Chiswick Calendar, Ealing Today, West London Living

**Critical:** Use the *exact* same address format on every site. "St" vs "Street" inconsistencies confuse Google and split your local authority.

## Tracking — what to record weekly in Supabase

Add a `gbp_metrics` table or just a Google Sheet with:
- Profile views
- Search queries that triggered the profile
- Direction requests
- Calls
- Reviews received this week
- Average star rating
- Reply rate (%)

Review the trendline monthly. If reviews stall, the problem is the ask habit, not the audience.

## Bonus: photo geo-tagging
Every class photo posted to GBP should have geo-EXIF tagged to the venue. Most phones do this automatically; verify on Mac Preview or any EXIF viewer.

## What NOT to do
- Never offer a discount in exchange for a review (Google ToS violation, can suspend the profile)
- Never write your own reviews from a different account (it's detectable)
- Never delete negative reviews — respond professionally
- Never use the same review template wording twice in a row
- Never let the profile go stale for >2 weeks without a post
