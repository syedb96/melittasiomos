
# Pura Nights — Final 100/100 Launch Programme

This is a 13-track programme touching commercial controls, email, auth, analytics, governance, recovery and platform choice. It cannot be executed as one mega-turn — each track has its own stop-gate, evidence requirement and (in several cases) a hard human blocker that no amount of code can resolve. Below is the realistic sequencing, what I will do on each turn, and what only you can do.

## Human blockers (no code can complete these)

These need **you** before the corresponding track can finish:

1. **Production email delivery** — needs a verified sender domain (DNS records on `puranights.com`). Until DNS verifies, every send will keep logging `skipped_no_email_infra`. I can scaffold infra, templates, and a recipient list, but cannot make real mail flow.
2. **Second owner verification** — `puranights@gmail.com` must complete a real Google sign-in on the live site once. I can prepare and test the role path, but cannot "verify" the account on their behalf.
3. **Real photography / video** — I will produce an asset tracker; replacement files must come from you.
4. **AggregateRating evidence** — I will suppress unsupported ratings by default and only re-enable when you supply the source (Google profile URL + count + date).
5. **Disputed commercial values** — any price/schedule/venue where the existing site disagrees with itself needs your single source of truth before I migrate it.
6. **Platform decision (Wix vs Lovable/Supabase)** — I will produce the decision doc with trade-offs, but the final call is yours.
7. **Canonical host** — `puranights.com` vs `www.puranights.com` vs `melittasiomos.lovable.app`. I'll recommend, you confirm.

## Execution order (one track per turn, with stop-gate)

```text
Turn  Track  Deliverable                                        Stop-gate
----  -----  -------------------------------------------------  -------------------------
 1     0     Forensic gap + duplication audit                   You approve scope
 2     1     Commercial source of truth (prices + offers)       Migration map signed off
 3     2     Schedule / venues / booking links                  Public surfaces still pass
 4     3     Service operations console                         Enquiry-only services intact
 5     4     Email infra + real per-route test                  DNS verified by you
 6     5     Owner + role + auth verification                   Owner 2 signed in
 7     6     Production analytics + A/B evidence                Real events captured
 8     7     Nav / footer / design / settings                   No design regression
 9     8     Media + reviews + claims truth gate                You supply assets/ratings
10     9     Canonical host + search-engine evidence            You confirm host
11    10     Cron + automation + jobs console                   Real runs observed
12    11     Backup / restore / runbooks                        One restore test passes
13    12     Wix vs Lovable decision document                   You decide
14    13     Final lockdown + Launch Readiness scoring          Score computed from checks
```

## Rules I will hold to

- No new public pages, blog posts, or SEO landing routes.
- No invented prices, schedules, venues, reviews, partners, awards or rating numbers.
- No weakening of RLS; admin routes stay protected.
- No second CMS/CRM/analytics/security system — I extend the existing tables and modules.
- No payment provider added.
- "Complete" is reserved for: UI works + backend works + data persists + RLS holds + validation + loading/empty/error + production evidence + tests + docs.
- The Launch Readiness score is computed from genuine checks. I will not hard-code 100/100.

## What I need from you to start Track 0

Just **GO** and I will run Track 0: read every relevant route, table, function, cron job, edge function, form route, notification route, email template, storage bucket, and the existing `/admin/system-audit`, then write `docs/130-FINAL-LAUNCH-GAP-AND-DUPLICATION-AUDIT.md` and update System Audit. No schema or public-surface changes on that turn.

If you'd rather skip ahead because a track is more urgent (e.g. email DNS or owner-2 sign-in), tell me which track number and I'll go there first.

## Technical notes (for reference)

- Commercial truth will reuse existing `commerce_prices`, `commerce_offers`, `commerce_schedule_slots`, `commerce_schedule_exceptions`, `commerce_venues`, `commerce_booking_links`, `commerce_services` from Sprint 1 — no new parallel tables.
- Forms/email will reuse `forms_config`, `notification_routes`, `notification_log`, `email_templates`, `form_rate_limits`, `form_submission_hashes` and the `forms-notify` edge function — no parallel system.
- Email production will use Lovable's built-in email infrastructure (`email_domain--setup_email_infra` + `scaffold_transactional_email`), not a third-party SDK, unless you explicitly choose otherwise.
- `/admin/launch-readiness` will be a read-only dashboard that queries: build status, `notification_log` (sent vs skipped), `cta_events`, `cron.job_run_details`, `security_events`, RLS linter, and the Track 0 audit table.
