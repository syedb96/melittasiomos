# 58 — Commercial Revenue Page Audit

_Sprint date: 2026-05-20_

## Scope
Map all enquiry-driven revenue pages and confirm each carries: Who-it's-for, What's-included, 3-tier packages, enquiry-first CTA, WhatsApp fallback, FAQ schema, internal links.

## Page-by-page status

| Page | Who-for | What's-included | 3 tiers | WhatsApp | FAQ schema | Status |
|---|---|---|---|---|---|---|
| `/corporate-dance-classes-london` | ✅ | ✅ | ✅ | ✅ | ✅ | **A** — hardened in `docs/52` |
| `/private-group-dance-parties-london` | ✅ | ✅ | ✅ | ✅ | ✅ | **A** — hardened in `docs/52` |
| `/wedding-dance-lessons-london` | ✅ | ✅ (tiers via `WeddingTiers`) | ✅ | ✅ | ✅ | **A** |
| `/private-dance-lessons-west-london` | ✅ | ✅ | ✅ | ✅ | ✅ | **A** |
| `/private-salsa-lessons-london` | ✅ | ✅ | ✅ | ✅ | ✅ | **A** |
| `/private-lessons` | ✅ | ✅ | ✅ | ✅ | ✅ | **A** — editorial quote added in polish pass |
| `/partner-with-pura-nights` | ✅ (venues + brands) | ✅ | ✅ | ✅ | ✅ | **A** |
| `/bachata-performance-team-london` | ✅ (auditions) | ✅ | n/a | ✅ | ✅ | **A** — strictly enquiry-only |
| `/ladies-styling-london` | ✅ | ✅ | n/a | ✅ | ✅ | **A** |
| `/gift-vouchers` | ✅ | ✅ (3 voucher tiers) | ✅ | ✅ | n/a | **A** |

## Cross-revenue internal-link audit
- Homepage commercial strip → corporate, wedding, private, ladies, partner ✅
- Footer → all of above ✅
- Contact form Subject list → 9 enquiry types map 1:1 to the 9 commercial pages ✅
- Blog `BlogMoneyCTA` variants → corporate, wedding, ladies, beginner, chiswick, ealing ✅ (54/54 blogs passing audit)

## Wix replication notes
All packages and tier cards are plain HTML grids — replicate as 3-column Repeaters in Wix bound to a `revenue_packages` collection (fields: `page_slug`, `tier_name`, `headline`, `includes_bullets`, `cta_label`, `cta_target`). Forms must route to `enquiries` collection with `subject` field — see `docs/37`.

## No additional code edits this sprint
The previous sprint (`docs/52`) already hardened all 7 weak commercial pages: copy upgraded, package cards rebuilt, WhatsApp CTAs added everywhere. This audit confirms parity — no regressions, no orphan pages.

## Remaining human blockers
- Connect Wix Forms → enquiries CMS collection (post-migration).
- Verify WhatsApp Business hours auto-reply.
- Train Melitta on the 9-subject triage routing.
