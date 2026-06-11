# 92 — Real Photography Checklist (Pura Nights)

Date: 2026-06-11

Every section below is currently using a stock image, placeholder, or
initial-avatar. Replace with real Pura Nights photography before
re-publishing. Aspect ratios are listed as **width × height in px**
and all images should be `.jpg` at 75-82% quality (or `.webp` if
available).

Naming convention: `pn-{page}-{slot}-{descriptor}.jpg` →
upload via `lovable-assets create --file …` (see assets skill).

## Priority A — money pages (do these first)

| Page | Section | Slot | Spec | Brief |
|---|---|---|---|---|
| `/loyalty` | Hero | `hero-bg` | 1920×900, landscape | Wide shot of a Pura Nights social — warm lighting, dancers mid-turn, no faces blurred. |
| `/loyalty` | "How it works" step 4 | `step-reward` | 800×600 | Melitta handing a stamped loyalty card to a smiling student at the door of The George IV. |
| `/loyalty` | What counts ✅ | `eligible-grid` (2 photos) | 800×600 each | Photo 1: Chiswick Monday drop-in class. Photo 2: Latin Friday crowd shot. |
| `/latin-dance-corporate-events-london` | Hero | `hero-bg` | 1920×900 | Corporate group mid-class, smart-casual dress, laughing — NOT stock office shot. |
| `/latin-dance-corporate-events-london` | "What's included" | `included-1`, `included-2`, `included-3` | 600×400 each | (1) Welcome circle, (2) partner-rotation in class, (3) group photo at end. |
| `/latin-dance-corporate-events-london` | Testimonial strip | `testimonial-corp-1` | 1200×800 | Real client team photo + signed permission. |
| `/` | Hero (`heroImage` fallback) | `hero-dance.jpg` | 1920×1080 | Already real — re-verify still current. |
| `/pura-nights` | Hero (`socialImg`) | `social-dancing.jpg` | 1920×800 | Already real — re-verify still current. |

## Priority B — service/credibility pages

| Page | Section | Slot | Spec | Brief |
|---|---|---|---|---|
| `/wedding-dance` | Hero (`weddingImg`) | `wedding-dance.jpg` | 1920×900 | Already real — verify it's a Pura Nights couple. |
| `/wedding-dance` | "Real first dances" | `wedding-gallery-{1..6}` | 1000×700 each | 6 real first-dance moments. Names required for caption. |
| `/private-lessons` | Hero | `private-hero` | 1920×900 | Melitta + student in studio, mirror reflection visible. |
| `/private-lessons` | "What to expect" | `private-detail-{1,2}` | 800×600 | Detail shot of footwork + close-up of frame. |
| `/pura-ladies` | Hero (`puraLadiesImg`) | `pura-ladies.jpg` | 1920×900 | Already real — verify latest team composition. |
| `/pura-ladies` | Team grid | `pl-member-{1..N}` | 600×600 square | Headshot per active team member. |
| `/start-here` | "Your first night" timeline | `first-night-{1..4}` | 800×600 | (1) Arrival, (2) Beginners class, (3) social dancing, (4) end-of-night smile. |
| `/meet-the-team` | Per-instructor card | `team-{slug}` | 600×600 | Headshot per instructor (Melitta + assistants). |
| `/about` | Editorial portrait (`melittaImg`) | `melitta-editorial-real.jpg` | 1200×1600 | Already real — keep. |

## Priority C — proof + community

| Page | Section | Slot | Spec | Brief |
|---|---|---|---|---|
| `TestimonialsCarousel` (homepage + /testimonials) | Per-card avatar | `student-{slug}` | 200×200 square | Headshot per real student in `src/data/testimonials.ts` (currently shown as initials). 15 photos needed — see list below. |
| `/testimonials` | Hero | `testimonials-hero` | 1920×600 | Group photo from a recent Latin Friday. |
| `/gallery` | Featured albums covers | `gallery-cover-{album}` | 1200×800 | One cover per album (Weekly Classes, Latin Fridays, Pura Ladies, Weddings). |
| `/events` | Latin Friday teaser | `latin-friday-{YYYYMM}` | 1200×800 | Fresh photo per month — rotates with the next event. |
| `/blog/*` | OG image per post | `og-{slug}` | 1200×630 | Article-specific photo, not a generic brand shot. |

## Required student headshots for the carousel

These match the entries in `src/data/testimonials.ts`. Where a student
declines a photo, replace the initial-avatar with the Pura Nights
monogram instead of inventing a face.

- Lucia R. (pura-ladies, Munich)
- Khaled R. (group, London)
- Olya Fedoseeva (online, Madrid)
- Jan (private, Munich)
- Eva & Miguel (wedding, 2023)
- Sofia & Patrizio (wedding, 2022)
- Hannah & James (wedding)
- Sarah M. (beginner, Chiswick)
- Marcus W. (community, Chiswick)
- Aisha T. (pura-ladies)
- Priya K. (beginner, Ealing)
- James T. (beginner)
- Daniel F. (community, Chiswick Mondays)
- Mark H. (private, 2024)
- Emma & Tom (wedding, 2023)

## Upload workflow

1. Drop the raw `.jpg`/`.png` into chat or place in `/tmp/uploads/`.
2. Run:
   ```bash
   lovable-assets create --file <path> --filename pn-{page}-{slot}.jpg \
     > src/assets/pn-{page}-{slot}.jpg.asset.json
   ```
3. Reference in the page:
   ```ts
   import asset from "@/assets/pn-loyalty-hero.jpg.asset.json";
   <img src={asset.url} alt="…" width={1920} height={900} loading="lazy" />
   ```
4. Add ≤120-char `alt` text describing the action + venue (helps
   GBP + AI search).
5. Update this checklist row → "✅ delivered YYYY-MM-DD".

## Consent + GDPR

- Every face that's recognisable needs a signed model-release on file
  (paper or DocuSign).
- Children under 18 require a guardian signature.
- Wedding couple shots need explicit permission to use for marketing
  (not just the original wedding album licence).
