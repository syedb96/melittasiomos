# 75 — First Class Lead Magnet — Wix Handoff

Sprint: 2026-05-30 — Lead Capture + Trust + Launch Conversion.

## What we shipped

- New component `src/components/FirstClassLeadMagnet.tsx` — name, email,
  optional phone, interest dropdown, honeypot + 1.8s timing trap, Zod
  validation, Supabase insert, WhatsApp fallback.
- Embedded on:
  - `/` (homepage, after FAQ)
  - `/start-here` (dark tone, after MembershipPathway)
  - `/beginners` (default interest "Coming alone")
  - `/pura-nights` (after MembershipPathway, alongside existing EmailCaptureGate)
  - `/salsa-classes-chiswick` (default interest "First salsa class")
  - `/bachata-classes-ealing` (default interest "First bachata class")
  - `/salsa-classes-london` (default interest "First salsa class")
  - `/bachata-classes-london` (default interest "First bachata class")
  - `/first-class-guide` (new page — closer)

## Lead taxonomy

| Field | Value |
| --- | --- |
| Form name | First-Timer Guide / Lead Magnet |
| `subject` (Supabase) | `First-Timer Guide` |
| `source_page` | the URL of the embed (e.g. `/start-here`) |
| Interest options | First salsa class · First bachata class · Coming alone · Wedding dance · Private lessons · Pura Ladies · Corporate / group booking |

## Wix replication

1. Build a **Wix Lightbox** + matching **inline Strip** with a Wix Form.
2. Fields: First name (text, required), Email (email, required), Phone
   (text, optional), Interest (dropdown — same 7 options).
3. Add a hidden `enquiry_type = First-Timer Guide` field so the
   Supabase/Wix CMS routing trigger accepts it (see
   `docs/61-WIX-ENQUIRY-ROUTING-MAP.md`).
4. CRM tags: `lead-magnet` **and** `first-class`.
5. Owner notification subject: `New first-timer guide lead — Pura Nights`.
6. Auto-reply subject: `Your Pura Nights first-timer guide`.
7. Auto-reply body should attach/link the PDF guide (when produced).
8. Success state copy:
   > Done — your first-timer guide is on the way. Want a faster answer?
   > Message Melitta on WhatsApp.
9. Add a WhatsApp button under the form (prefill = `WA.startHere()`).

## Human blockers

- ⚠️ **Sender domain not verified** — until the verified sending domain
  is live, the auto-reply will be queued/undeliverable. WhatsApp
  fallback is the live channel.
- ⚠️ Lead magnet PDF asset still needs producing & uploading — for
  launch we email Melitta's text-only welcome + link to
  `/first-class-guide` until the PDF is approved.
