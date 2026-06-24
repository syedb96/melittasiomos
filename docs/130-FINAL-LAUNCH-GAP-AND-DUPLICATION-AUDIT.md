# 130 — Final Launch Gap & Duplication Audit (Track 0)

Date: 2026-06-24
Author: Lovable agent (forensic pass — no schema/UI changes this turn)
Score going in: ~92/100 (stated). Verified-evidence score: see "Adjusted" column.

This doc is the **single source of truth for what is genuinely outstanding**. It
explicitly avoids duplicating work already shipped in Sprints 1–2 (commerce
managers, forms manager, notifications dashboard, email templates, anti-spam,
regression sweep, etc.).

---

## 0. Database reality check (live counts)

| Domain               | Rows | Interpretation                                                         |
| -------------------- | ---: | ---------------------------------------------------------------------- |
| commerce_prices      |   25 | Seeded. Need to verify every public price reads from here.             |
| commerce_offers      |    1 | Manager live; near-empty data set.                                     |
| commerce_services    |    8 | All core services represented.                                         |
| commerce_venues      |    2 | Chiswick + Ealing.                                                     |
| commerce_schedule_slots |  4 | **Thin** — likely missing socials / Pura Ladies / additional slots.    |
| commerce_schedule_exceptions | 0 | None recorded — manager exists, untested with real data.           |
| commerce_booking_links | 16 | Healthy registry.                                                      |
| forms_config         |    3 | Contact / Enquiry / Taster.                                            |
| notification_routes  |    6 | Routing matrix populated.                                              |
| email_templates      |    4 | Seeded.                                                                |
| notification_log     |    0 | **No production sends yet** — Track 4 confirmed.                       |
| profiles (owner/admin)| 1  | **Only one verified admin.** Owner-2 unverified (Track 5 blocker).     |
| approved_admin_emails|    2 | Both owners on the allow-list.                                         |
| cta_events           |  200 | Tracking pipeline is writing — needs production-event mapping (T6).    |
| page_views           |    0 | Internal page-view collector idle; relying on GA4. Confirm Track 6.    |

---

## 1. Admin module inventory (from `src/admin/moduleRegistry.ts` + `src/App.tsx`)

All routes verified present:

```
/admin                       Dashboard
/admin/system-audit          SystemAudit
/admin/pages-registry        PagesRegistry
/admin/cms{,/pages,/media,/navigation,/redirects,/settings,/wix,/blog/generate,/schedule}
/admin/commerce/{prices,offers,services,schedule,venues,booking-links}
/admin/gallery /admin/team /admin/events /admin/testimonials /admin/ambassadors
/admin/enquiries /admin/forms /admin/notifications
/admin/seo /admin/seo-intelligence /admin/analytics /admin/tracking-qa
/admin/security /admin/security-events
/admin/settings /admin/blueprint /admin/site-docs /admin/shop-photo-tracker
```

**Missing routes vs Track plan:**

- `/admin/classes/schedule`, `/admin/classes/notices`, `/admin/classes/venues`
  → already covered by `/admin/commerce/{schedule,venues}`. **Do not create
  parallel routes** — add a "notices" tab (or surface
  `commerce_schedule_exceptions`) inside the existing Schedule admin.
- `/admin/operations/jobs` → **missing**. Add in Track 10.
- `/admin/launch-readiness` → **missing**. Add in Track 13.
- `/admin/commercial/*` paths in the megaprompt → already implemented as
  `/admin/commerce/*`. Keep existing paths; do not rename.

---

## 2. Capability matrix

Statuses: `PV` production-verified · `BU` built-unverified · `P` partial · `H` human-blocker · `X` broken · `0` not started

| # | Capability                          | Route / Source                                   | Status | Launch blocker | Action                                                                                                                                  |
|---|-------------------------------------|--------------------------------------------------|:------:|:--------------:|-----------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Public site (149 URLs, SEO, schema) | `src/pages/*`, scripts/seo-qa.ts                 |   PV   |       no       | No changes. Track 13 re-runs full pipeline.                                                                                              |
| 2 | CMS pages/media/publish/versions    | `/admin/cms/*`                                   |   PV   |       no       | Reused as-is.                                                                                                                            |
| 3 | Commerce prices manager             | `/admin/commerce/prices`, `commerce_prices`      |   BU   |       no       | T1: migrate public price reads (Prices, Pura Nights, Chiswick/Ealing, gift vouchers, loyalty) onto this table.                          |
| 4 | Commerce offers manager             | `/admin/commerce/offers`                         |   BU   |       no       | T1: confirm expiry trigger and surface on relevant pages only when verified.                                                            |
| 5 | Commerce services                   | `/admin/commerce/services`                       |   BU   |       no       | T3: ensure Wedding/Private remain enquiry-only; wire CTA + WhatsApp + booking-link refs.                                                |
| 6 | Schedule slots                      | `/admin/commerce/schedule`                       |   P    |       no       | T2: only 4 rows — seed real timetable; migrate `/schedule`, Tonight banner, venue pages.                                                |
| 7 | Schedule exceptions/notices         | `commerce_schedule_exceptions`                   |   BU   |       no       | T2: add "Notices" tab; render banner on public schedule when active.                                                                    |
| 8 | Venues                              | `/admin/commerce/venues`                         |   BU   |       no       | T2: connect venue pages, maps, directions, schema.                                                                                       |
| 9 | Booking links registry              | `/admin/commerce/booking-links`                  |   BU   |       no       | T2: replace remaining hard-coded URLs; nightly `booking-link-check` (edge fn present).                                                  |
|10 | Forms config + inbox + routing      | `/admin/forms`, `forms_config`                   |   PV   |       no       | Reused. T4 runs real per-route send tests.                                                                                              |
|11 | Email templates                     | `email_templates`                                |   PV   |       no       | Reused.                                                                                                                                  |
|12 | Anti-spam (rate limit, dedupe, honeypot) | `form_rate_limits`, `form_submission_hashes` |   PV   |       no       | Reused.                                                                                                                                  |
|13 | Notifications dashboard             | `/admin/notifications`                           |   PV   |       no       | Reused.                                                                                                                                  |
|14 | Production email delivery           | `forms-notify` edge fn, no domain                |   H    | **YES**        | T4: requires verified sender domain. Currently `email_domain` = `not_started`. Until DNS verifies, sends log `skipped_no_email_infra`.   |
|15 | Owner-1 sign-in (`syedbiz96@…`)     | profiles (1 admin)                               |   PV   |       no       | —                                                                                                                                        |
|16 | Owner-2 sign-in (`puranights@…`)    | approved_admin_emails only                       |   H    | **YES**        | T5: needs real Google OAuth sign-in from that account. Code path is ready.                                                              |
|17 | Roles (admin/editor/viewer)         | `has_role`, RLS                                  |   PV   |       no       | T5: matrix test.                                                                                                                         |
|18 | RLS posture                         | linter clean                                     |   PV   |       no       | T13: re-run linter.                                                                                                                      |
|19 | GA4 / GTM / Clarity in code         | `index.html`, tracking helpers                   |   BU   |       no       | T6: confirm production fires for the 21 listed events; map to `cta_events`.                                                             |
|20 | A/B experiments (×5)                | `cta_events`                                     |   BU   |       no       | T6: read-only results view in `/admin/analytics`. No auto-winner.                                                                       |
|21 | CTA tracking helpers                | `qa-whatsapp-tracking.ts` passes                 |   PV   |       no       | —                                                                                                                                        |
|22 | Navigation/footer mgr               | `/admin/cms/navigation`                          |   P    |       no       | T7: migrate remaining hard-coded nav components (registry marks as partial).                                                            |
|23 | Site settings / brand               | `/admin/cms/settings`, `site_settings`           |   PV   |       no       | T7: add design-token controls behind a feature flag (owner-only).                                                                       |
|24 | Real photography                    | `/admin/shop-photo-tracker`, docs/92             |   H    |       no       | T8: human-supplied assets only.                                                                                                          |
|25 | AggregateRating                     | schema in blog/service pages                     |   H    | **YES**        | T8: suppress unsupported ratings until source provided.                                                                                  |
|26 | Canonical host                      | apex/www/lovable.app                             |   H    |       no       | T9: requires owner decision then enforcement.                                                                                            |
|27 | Cron / scheduled jobs               | 7 SEO+CMS edge fns                               |   BU   |       no       | T10: build `/admin/operations/jobs`; verify `cron.job_run_details` rows; surface failures.                                              |
|28 | Backups / export                    | none                                             |   0    |       no       | T11: write export procedure + one restore test (test data).                                                                              |
|29 | Wix vs Lovable production choice    | docs/03 + INDEX                                  |   H    |       no       | T12: write decision doc; owner chooses.                                                                                                  |
|30 | Launch readiness scoring            | none                                             |   0    |       no       | T13: `/admin/launch-readiness` reads real signals.                                                                                       |

---

## 3. Duplication risk register (what NOT to rebuild)

| Tempting to build                | Already exists as                                 | Decision                          |
| -------------------------------- | ------------------------------------------------- | --------------------------------- |
| `/admin/commercial/pricing`      | `/admin/commerce/prices`                          | Reuse path & table.                |
| `/admin/classes/{schedule,venues}` | `/admin/commerce/{schedule,venues}`             | Reuse; add Notices tab only.       |
| Second CRM/inbox                 | `/admin/enquiries` + `/admin/forms` (inbox tab)   | Reuse.                             |
| Second notifications system      | `notification_routes` + `notification_log`        | Reuse.                             |
| New email-template manager       | `/admin/forms` → Templates tab + `email_templates`| Reuse.                             |
| Second analytics pipeline        | `cta_events` + `/admin/tracking-qa`               | Reuse.                             |
| New security log                 | `security_events` + `/admin/security-events`      | Reuse.                             |
| New SEO crawl/digest             | `seo-broken-link-crawl`, `seo-weekly-digest`      | Reuse.                             |

---

## 4. Human launch blockers (cannot be code-resolved)

1. **Email DNS** — set up sender domain (`notify.puranights.com` recommended).
2. **Owner-2 sign-in** — `puranights@gmail.com` must Google-sign-in once on prod.
3. **Real photos / video** — supply files per `docs/92-REAL-PHOTOGRAPHY-CHECKLIST.md`.
4. **AggregateRating evidence** — Google profile URL + count + date, or it stays suppressed.
5. **Canonical host** — pick one.
6. **Wix vs Lovable** — final platform decision.

---

## 5. Outcome of Track 0

- No schema or public-surface changes made.
- No duplication created.
- Audit doc written.
- System Audit module already reads from `moduleRegistry` and live tables, so its
  next render reflects the same reality reported here (no code change required).

**Next track (T1):** Commercial source of truth — write
`docs/131-COMMERCIAL-DATA-MIGRATION-MAP.md` first, then begin migrating public
price reads onto `commerce_prices`. Stop-gate: migration map approved.
