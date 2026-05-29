# 74 — Wix CTA Migration Checklist

_Sprint date: 2026-05-29_

Page-by-page checklist for the top money pages and global chrome. Use this
when rebuilding each page in Wix to make sure every primary/secondary CTA
keeps its label, destination, prefill, tracking event and CRM tag.

Legend: **PASS** = wired in Lovable + ready to replicate. **HUMAN** =
needs Melitta/Wix admin action.

## Global chrome

### Header (desktop + mobile)
| CTA | Destination | Wix element | WhatsApp prefill | tracking | mobile | QA |
|---|---|---|---|---|---|---|
| BOOK NOW → | https://www.tickettailor.com/events/puranights | Button (link) | — | `cta_click` external | visible | PASS |
| WhatsApp ghost | wa.me + general prefill | Button | "…quick question about Pura Nights classes." | `whatsapp_click:header` | visible | PASS |

### Footer
| CTA | Destination | Wix element | WhatsApp prefill | tracking | mobile | QA |
|---|---|---|---|---|---|---|
| WhatsApp Melitta (gold pill) | wa.me + general prefill | Button | "…ask about Pura Nights classes." | `whatsapp_click:footer` | visible | PASS |
| Linktree booking | https://linktr.ee/pura.nights | Text link | — | `cta_click:linktree` | visible | PASS |

### Sticky mobile bar
| CTA | Destination | Wix element | tracking | QA |
|---|---|---|---|---|
| Next class / Wedding / Blog variant | /prices · /pura-nights · wa.me wedding prefill | Velo sticky bar | `sticky-mobile:{path}` | PASS |

## Money pages

### `/`
- Hero primary → `/start-here` — Wix Button — `cta_click:hero-start` — PASS
- Hero secondary → `/pura-nights` — Wix Button — `cta_click:hero-classes` — PASS
- Floating WhatsApp → context prefill — Velo widget — PASS

### `/pura-nights`
- "Which pass suits me?" → `WA.membership` — Button — `whatsapp:membership` — PASS
- Monthly Unlimited → `MonthlyUnlimitedDialog` form — Wix Lightbox form (Enquiries collection, tag `monthly-unlimited`) — HUMAN: rebuild lightbox
- Class cards Mon/Tue → `WA.puraNightsMon` / `WA.puraNightsTue` — Buttons — PASS

### `/schedule`
- Monday card → `WA.scheduleMonChiswick` — Button — `whatsapp:schedule-mon` — PASS
- Tuesday card → `WA.scheduleTueEaling` — Button — `whatsapp:schedule-tue` — PASS
- Generic → `WA.scheduleGeneral` — Button — PASS

### `/prices`
- Primary → `/pura-nights` — Button — PASS
- WhatsApp bundle q → `WA.pricesEnquiry` — Button — PASS

### `/start-here`
- Primary → `/schedule` — Button — PASS
- WhatsApp first-timer → `WA.startHere` — Button — PASS

### `/wedding-dance`
- Book consultation → `WA.weddingDance` — Button — PASS
- Enquiry form (Wix Form) — Enquiries collection, hidden `enquiry_type = Wedding Dance — Consultation` — HUMAN

### `/private-lessons`
- Enquire → `WA.privateLessons` — PASS
- Form → tag `private-lessons` — HUMAN

### `/corporate-dance-classes-london`
- Get a quote → `WA.corporate(date, group)` — PASS (dynamic Velo prefill)
- Form → tag `corporate` with `company`, `eventDate`, `groupSize`, `budget` fields — HUMAN

### `/private-group-dance-parties-london`
- Plan a party → `WA.groupParty(date, group)` — PASS
- Form → tag `group-party` — HUMAN

### `/gift-vouchers`
- Buy £X → `WA.voucher(amount)` per amount — PASS
- Custom → `WA.voucherCustom` — PASS
- `VoucherEnquiryForm` → Wix Form, tag `vouchers` — HUMAN

### `/pura-ladies`
- Audition enquiry → `WA.puraLadies` — PASS
- Form → tag `pura-ladies` — HUMAN

### `/online-salsa-bachata-coaching`
- Online coaching → `WA.online(level, style)` — PASS
- Form → tag `online` — HUMAN

### `/events`
- Join WhatsApp group → `WA.eventsGroup` — PASS
- Latin Friday tickets → `https://linktr.ee/pura.nights` — PASS
- Add to calendar → ICS link — PASS

### `/locations`
- Each card CTA → relevant `/salsa-classes-{area}` — PASS

## Removed / fixed

- ❌ `HowToPracticeSalsaAtHome.tsx` previously linked `/online-classes`
  (redirect-only, noindex). Now points to canonical
  `/online-salsa-bachata-coaching`.
- ⚠️ `/proof-centre` is a real indexed hub; it stays linked from Footer
  and 2 blog posts. Treat as navigation, not a money CTA. If Melitta
  decides to demote it post-launch, remove the Footer entry + 2 blog
  cross-links and replace with `/testimonials`.

## QA gates before publish to Wix
- [ ] CTA smoke test passes (last run: 22/22 ✅)
- [ ] No bare `wa.me/447449482343` on top money pages or chrome
- [ ] No internal CTA points to `/online-classes` or other noindex pages
- [ ] Every form has hidden `enquiry_type` + `source_page` fields
- [ ] Sender domain verified before relying on transactional email — **HUMAN BLOCKER**
