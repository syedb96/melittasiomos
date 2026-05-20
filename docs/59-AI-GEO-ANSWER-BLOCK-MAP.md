# 59 — AI / GEO Answer Block Map

_Sprint date: 2026-05-20_

## Purpose
Document every `AnswerBox` block live on the site so ChatGPT, Gemini, Perplexity, Google AI Overviews and Bing can extract structured answers consistently. Each block is 40–90 words, factual, names Pura Nights / Melitta Siomos naturally, and links to the right money page.

## Live AnswerBox inventory

| Page | Question | Target money page |
|---|---|---|
| `/` (Index) | Where can I learn salsa in West London? | `/schedule` |
| `/salsa-classes-london` | Where are the best salsa classes in London? | `/schedule` |
| `/bachata-classes-london` | Where are the best Bachata classes in London? | `/bachata-classes-west-london` |
| `/latin-dance-classes-london` | Where do adults learn Latin dance in London? | `/schedule` |
| `/salsa-classes-chiswick` | Best salsa classes in Chiswick? | `/salsa-classes-chiswick` |
| `/bachata-classes-chiswick` | Best Bachata classes in Chiswick? | `/bachata-classes-chiswick` |
| `/salsa-classes-ealing` | Best salsa classes in Ealing? | `/salsa-classes-ealing` |
| `/bachata-classes-ealing` | Best Bachata classes in Ealing? | `/bachata-classes-ealing` |
| `/salsa-classes-acton` | Where can I take salsa in Acton? | `/schedule` |
| `/salsa-classes-hammersmith` | Where do Hammersmith dancers go for salsa? | `/bookings` |
| `/salsa-classes-fulham` | Are there salsa classes near Fulham? | `/start-here` |
| `/salsa-classes-richmond` | Where can Richmond residents learn? | `/dance-classes-chiswick` |
| `/dance-classes-hounslow` | Are there dance classes in Hounslow? | `/dance-classes-ealing` |
| `/dance-classes-west-london` | West London dance class overview | `/schedule` |
| `/best-salsa-bachata-classes-west-london` | Best in West London? | `/start-here` |
| `/latin-dance-chiswick` ⭐ **NEW** | Best Latin dance night in Chiswick? | `/schedule` |
| `/latin-dance-ealing` ⭐ **NEW** | Best Bachata classes in Ealing? | `/bachata-classes-ealing` |
| `/latin-night-out-west-london` | Best Latin night out West London? | `/events` |
| `/salsa-bachata-covent-garden` | Salsa & Bachata in Covent Garden? | `/pura-ladies-covent-garden` |
| `/pura-ladies-covent-garden` | Ladies-only dance in Covent Garden? | `/pura-ladies` |
| `/pura-ladies` | What is Pura Ladies? | `/ladies-styling-london` |
| `/start-here` | Can I join salsa alone? | `/schedule` |
| `/prices` | How much are salsa classes in West London? | `/schedule` |
| `/corporate-dance-classes-london` | Corporate salsa class London — what's included? | `/contact` |
| `/private-group-dance-parties-london` | Private group dance party London? | `/contact` |
| `/wedding-dance-lessons-london` | Wedding first dance lessons London? | `/contact` |
| `/private-lessons` | What's a private salsa lesson? | `/contact` |
| `/online-coaching` | Online salsa coaching? | `/online-academy` |
| `/online-academy` | What's the Pura online academy? | `/online-coaching` |
| `/partner-with-pura-nights` | Latin nights for my venue? | `/contact` |
| `/bachata-performance-team-london` | Audition for a Bachata team? | `/pura-ladies` |

**Total live answer blocks: 31** (was 29 — +2 this sprint).

## Authoring rules (locked)
1. 40–90 words plain-text answer (no markdown inside).
2. Name "Pura Nights" or "Melitta Siomos" once, naturally.
3. Always include venue, day, or price specificity — never generic.
4. CTA targets a money page (not the homepage).
5. Bullets are 3–4, factual, scannable.
6. Rendered as `<AnswerBox>` — Wix replication = Strip with H3 + paragraph + Repeater bullets + button.

## Coverage gaps tolerated
- Blog posts intentionally use `BlogMoneyCTA` instead of AnswerBox (different purpose: conversion, not extraction).
- Venue pages (`/venue/*`) use embedded local schema; no AnswerBox needed because they answer "where" structurally.

## QA
No schema changes — all AnswerBoxes are presentational. FAQ schema on parent pages remains the structured-data source of truth.
