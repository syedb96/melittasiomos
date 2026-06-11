# 93 — CTA A/B Variation Library (Priority Pages)

Date: 2026-06-11

## Method

This is a copy-only A/B library. No experiment framework is wired in
yet (Lovable's `cta_events` table logs the click but doesn't pick a
winner). Pick ONE variant per slot to ship, then rotate weekly and
read winner from Supabase:

```sql
select cta_label, count(*) as clicks
from cta_events
where created_at > now() - interval '14 days'
  and cta_label like 'cta_home_hero_%'
group by 1
order by 2 desc;
```

Currently shipped variants are marked **[LIVE]**. Variants A/B/C are
candidates. Keep WhatsApp prefill copy identical across variants so
intent stays comparable.

## Tone north star
"Warm & inviting" — chosen by Melitta 2026-06-11.
No prices in CTA when avoidable, no urgency tropes ("Limited spots"),
first-person plural ("we"), present tense.

---

## `/` — Homepage

### Hero primary (Ticket Tailor)
- **[LIVE]** `Come dance with us — from £10 →`
- A: `Save your spot for Monday or Tuesday →`
- B: `Join us this week — from £10 →`
- C: `Find your first class →`

### Hero secondary (Link)
- **[LIVE]** `See when we're dancing →`
- A: `Pick a night that suits you →`
- B: `See this week's schedule →`

### Countdown band primary
- **[LIVE]** `Save me a spot →`
- A: `Count me in →`
- B: `I'll be there →`

### Wedding teaser primary
- **[LIVE]** `Explore Wedding Dance →`
- A: `Plan our first dance with Melitta →`
- B: `Book a wedding consultation →`

## `/pura-nights`

### Hero primary
- **[LIVE]** `Come dance with us →`
- A: `Drop in this week →`
- B: `Pick your night →`

### Hero secondary
- **[LIVE]** `See drop-in & bundle prices →`
- A: `See what it costs →`

### Three-levels block CTA
- **[LIVE]** `Save me a spot →`
- A: `That sounds like me →`
- B: `Reserve a beginner spot →`

### Latin Friday strip
- **[LIVE]** `Grab Latin Friday tickets →`
- A: `See me on the dance floor →`
- B: `Get my Latin Friday ticket →`

## `/prices`

### Bundle calculator primary (existing)
- **[LIVE]** `See your bundle price →`
- A: `Build my bundle →`

### Private lessons WhatsApp
- **[LIVE]** `💬 Enquire via WhatsApp`
- A: `💬 Ask Melitta about private lessons`
- B: `💬 Chat about a private session`

### Gift voucher
- **[LIVE]** `Buy a Gift Voucher`
- A: `Send the gift of dance →`
- B: `Buy a dance voucher →`

## `/loyalty`

### Form submit
- **[LIVE]** `Count me in →`
- A: `Add me to the loyalty card →`
- B: `Start my loyalty card →`

### WhatsApp inline
- **[LIVE]** `💬 Chat to Melitta about loyalty on WhatsApp →`
- A: `💬 Ask Melitta about loyalty →`

### Bottom CTAs (FAQ band)
- **[LIVE]** `Start here →` / `Weekly classes →` / `See pricing →`
- A: `Plan my first night →` / `See this week's classes →` / `See what it costs →`

## `/salsa-bachata-west-london`

### Hero primary (already minimal)
- A: `Find my local class →`
- B: `See Chiswick + Ealing schedule →`
- C: `Come dance in West London →`
*(no LIVE — this page leans on AnswerBox + ClassMatchBlock CTAs)*

### Partner CTA (existing)
- **[LIVE]** `Partner with Pura Nights →`
- A: `Bring Pura Nights to your venue →`

---

## WhatsApp consistency rule

Every WhatsApp CTA across variants MUST use one of the named presets
in `src/lib/whatsapp.ts` (`WA.privateLessons()`, `WA.weddingDance()`,
`WA.loyaltyJoin()`, etc.). Do NOT inline `wa.me` URLs in components —
this guarantees:

1. Tracking event name is correct (`whatsapp_<preset>_click`)
2. Prefill copy stays auditable
3. Phone-number changes only need one edit

Use the new `waCta(preset, location)` helper for one-line wiring:

```tsx
import { waCta } from "@/lib/whatsapp";
<a {...waCta("loyaltyJoin", "/loyalty hero")} className="btn-cta-primary">
  💬 Ask Melitta about loyalty
</a>
```

## Reading results

After 14 days of traffic on a variant, query Supabase or GA4:

```sql
-- top WhatsApp contexts last 14 days
select cta_label, count(*) clicks
from cta_events
where cta_type = 'whatsapp'
  and created_at > now() - interval '14 days'
group by 1
order by 2 desc;
```

Promote the higher-clicked variant to **[LIVE]** in this doc and
remove the losing variants.
