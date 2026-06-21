# 110 — Admin Auth and RLS Repair

## Sprint 0 status

- **Score before:** Admin and operations 64/100; overall effective score 80/100.
- **Score after:** Authentication repair implemented and Syed owner access verified in preview; final Sprint 0 gate remains **partially blocked** until `puranights@gmail.com` completes a real OAuth sign-in so the full OAuth → profile → role → route-guard flow can be verified for that account.

## Actual root cause

`/admin` was not failing because of a missing frontend email whitelist. The authenticated browser session was reaching protected admin code, but RLS policies on `profiles` and other admin tables call the role helper `is_admin`. A previous hardening migration revoked `EXECUTE` on `public.is_admin(uuid)` from the `authenticated` role. Postgres therefore rejected policy evaluation with:

```text
permission denied for function is_admin
```

## Function diagnosis

- **Original function:** `public.is_admin(_user_id uuid)`
- **Return type:** `boolean`
- **Owner:** `postgres`
- **Security context:** `SECURITY DEFINER`
- **Search path:** `public`
- **Tables queried:** `public.profiles`
- **Role interpretation:** `owner` and `admin` are admin-level roles; `editor` can edit content but is not owner/admin.
- **Fault:** direct execute permission was revoked from `authenticated`, while RLS policies still referenced the function.
- **Risk found during repair:** argument-taking helpers could allow a signed-in user to call a role check for another user ID if exposed directly through the API.

## Repair applied

Migrations added:

1. `20260621095047_f0bd8db4-1e9c-42da-a0af-7847ad01e2b4.sql`
   - Restored the broken helper grants so existing RLS policies could evaluate.
   - Reconfirmed both approved owner emails as lowercase, active, and `owner`.
   - Promoted existing matching authenticated profiles by real auth user ID only.
2. `20260621095600_13724b70-09cf-4f55-9e7a-de74c954ec6f.sql`
   - Added self-scoped role helpers using `auth.uid()`.
   - Rewrote public RLS policies to avoid argument-taking browser role checks.
3. `20260621095654_*` migration
   - Moved privileged helper logic into private schema `app_private`.
   - Removed direct browser execution from public `is_admin`, `can_edit_content`, and `has_role` signatures.
   - Kept `public.provision_my_profile()` as the stable signed-in provisioning endpoint, with trusted work delegated privately.
4. `20260621095757_*` migration
   - Removed sensitive admin tables from realtime publication after the security scanner flagged unrestricted channel subscription risk.
   - Dashboard now uses controlled periodic refresh instead of realtime subscriptions.

## Owner provisioning

| Email | Approved owner row | Auth user | Profile | Status |
|---|---:|---:|---:|---|
| `syedbiz96@gmail.com` | Yes | Yes | `owner` | Verified in preview |
| `puranights@gmail.com` | Yes | Not yet present | Pending first OAuth sign-in | Ready to auto-provision |

No duplicate profile was created by email alone. Existing profiles are matched to real auth user IDs.

## Auth-state behaviour

The frontend already distinguishes:

- Loading session
- Loading profile
- Authorised
- Unauthorised
- Provisioning/database error

The route guard now has working backend permissions to finish the profile read before showing denial/error states.

## Route verification

Verified in preview as `syedbiz96@gmail.com`:

- `/admin` → Dashboard loads, role badge `Owner`
- `/admin/enquiries` → Enquiries loads
- `/admin/cms/pages` → Pages, Blog & Resources loads
- `/admin/security-events` → Security Events loads
- `/admin/control-centre` → Dashboard alias loads

Aliases added:

- `/admin/control-centre` → Dashboard
- `/admin/security` → Security Events

## Security and RLS verification

- `authenticated` can no longer execute public argument-taking role helpers.
- `anon` cannot execute role helpers.
- RLS policies now reference private self-scoped helpers.
- Sensitive realtime publications for `enquiries`, `cms_pages`, and `admin_audit_log` were removed.
- Persisted security scan results showed no connector/Wiz findings.
- Live scanner still reports two warnings requiring governance decision rather than this auth repair:
  - `pg_net` extension metadata is in `public` from an earlier cron migration.
  - Public commerce booking links expose the public WhatsApp CTA phone number.

## Tests and gates

- Added registry regression coverage for owner/admin/editor hierarchy and Sprint 0 admin route aliases.
- System Audit now checks both permanent owner emails.
- Build is left to the platform harness per project rules.

## Sprint 0 required report

- **Existing systems reused:** profiles, approved administrator emails, AuthContext provisioning, ProtectedRoute, admin dashboard, System Audit, security scanner.
- **New systems created:** private `app_private` helper schema; admin route aliases; module-registry regression test.
- **Routes changed:** `/admin/control-centre`, `/admin/security` added as aliases.
- **Tables changed:** no new public tables; owner rows upserted in `approved_admin_emails`; existing owner profile confirmed/promoted.
- **RLS changes:** policies moved from public role helpers to private self-scoped helpers.
- **Public components affected:** none.
- **Tests passed:** pending local run summary.
- **Tests failed:** pending local run summary.
- **Security impact:** fixes admin lockout without disabling RLS or exposing profiles; removes sensitive realtime publication.
- **Remaining blockers:** real OAuth verification for `puranights@gmail.com`; governance decision on the public WhatsApp number warning; extension warning inherited from existing `pg_net` setup.
- **Human actions required:** sign into preview/production as `puranights@gmail.com` once to complete the profile auto-provision test.
- **Duplicate systems created:** no.
- **Unsupported claims added:** no.
- **Public URLs unintentionally changed:** no.