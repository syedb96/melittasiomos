# 55 — Video Asset Replacement List

> All YouTube placeholders (`dQw4w9WgXcQ` — Rick Roll) currently embedded in production-ready pages. **Do not launch on Wix until each row is either replaced with a real video ID or the section is hidden.**

Scan run against `src/` on this build. 7 placeholders across 5 files.

| # | Page (Wix slug) | Section / Component | Current placeholder ID | Required real video | Suggested title | Suggested thumbnail | Action |
|---|---|---|---|---|---|---|---|
| 1 | `/` (Homepage testimonials) via `VideoTestimonials.tsx` | Student video #1 | `dQw4w9WgXcQ` | 30–60s student review | "Sarah's First Pura Nights Class — Chiswick" | Sarah smiling on dance floor, blurred background, gold "Beginner · Chiswick" badge bottom-left | **Replace** before launch; if not ready, **hide** the homepage video carousel and fall back to text testimonials |
| 2 | `/` (Homepage testimonials) | Student video #2 | `dQw4w9WgXcQ` | Wedding couple testimonial 45–60s | "James & Priya — First Dance with Melitta" | Couple mid-dip on wedding day, warm tone | **Replace** or **hide** |
| 3 | `/` (Homepage testimonials) | Student video #3 | `dQw4w9WgXcQ` | Pura Ladies member 30s | "Aisha — Why I Joined Pura Ladies" | Aisha in performance costume, stage lighting | **Replace** or **hide** |
| 4 | `/corporate-dance-classes-london` | `VideoTestimonialsBlock` corporate review #1 | `dQw4w9WgXcQ` | Corporate client 45s testimonial | "How [Client] used Pura Nights for their Christmas party" | Group laughing mid-dance, office casual | **Replace** or **hide entire block** — corporate clients expect proof |
| 5 | `/corporate-dance-classes-london` | `VideoTestimonialsBlock` corporate review #2 | `dQw4w9WgXcQ` | Second corporate testimonial 45s | "Team-building with salsa — [Client] HR Lead" | HR lead to camera in office | **Replace** or **hide** |
| 6 | `/wedding-dance-lessons-london` | Wedding couple #1 | `dQw4w9WgXcQ` | Real couple 30–60s | "Our wedding first dance — taught by Melitta" | Couple on wedding day, mid-dance | **Replace** or **hide** |
| 7 | `/wedding-dance-lessons-london` | Wedding couple #2 | `dQw4w9WgXcQ` | Real couple 30–60s | "From two left feet to confident first dance" | Second couple, candid wedding shot | **Replace** or **hide** |
| 8 | `/online-academy` | `PREVIEW_REEL_ID` hero video | `dQw4w9WgXcQ` | Melitta unlisted teaser 60–90s | "Pura Nights Online Academy — Teaser" | Melitta in studio, multiple cuts montage | **Replace** with unlisted YouTube ID, or **hide** hero video and use static photo |
| 9 | `src/components/YouTubeStrip.tsx` | Default sample video card | `dQw4w9WgXcQ` | Real "Salsa Basics in 60s" reel | "Salsa Basics in 60 Seconds — Melitta Siomos" | Step-by-step demonstration overlay | **Replace** — component is reusable and used across topical pages |

## ✅ Verified real (do not change)

- `/pura-ladies` hero embed: `a3OhiTw8Svw` — real Pura Ladies performance reel.
- `/gallery` video gallery: all IDs sourced from `src/data/...` content. Spot-check before launch.

## Policy

- **Never** ship placeholder Rick Roll IDs to production.
- **Never** invent fake testimonial captions claiming to be from real students.
- If a real video is not ready, hide the section behind a feature flag or comment block — do not show the placeholder.

## Suggested implementation pattern

Centralise IDs in `src/data/video-testimonials.ts` so a single edit per shoot updates every surface. Wix equivalent: a CMS *Video Testimonials* collection with `youtube_id`, `student_name`, `class_badge`, `is_published`. Filter `is_published == true` in every repeater.
