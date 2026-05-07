# Launch QA Runbook

One-command verification of the Pura Nights launch (redirects, schema, monitoring, evidence index).

---

## 1. One-command workflow

```bash
# Production (default)
bun run qa:run

# Staging
bun run qa:run --env=staging

# CI / strict — fail build on schema @type drift
bun run qa:run --env=production --strict
```

`qa:run` executes, in order:

1. `qa:redirects`  → `scripts/redirect-audit.ts`
2. `qa:schema`     → `scripts/schema-snapshot.ts`
3. `qa:monitoring` → `scripts/monitoring-import.ts`
4. `qa:manifest`   → `scripts/evidence-manifest.ts`

Critical step: redirect audit. Strict mode promotes schema drift to critical too.

---

## 2. Required input files

Drop these into `launch-evidence/monitoring/` **before** running `qa:monitoring`
(otherwise the step prints a warning and continues — not a build failure):

| File | Required columns |
|------|------------------|
| `gsc-coverage.csv`  | `date, indexed, discovered_not_indexed` |
| `gsc-events.csv`    | `date, valid, errors, warnings`         |
| `gsc-breadcrumb.csv`| `date, valid, errors`                   |
| `gsc-faq.csv`       | `date, valid, errors`                   |
| `bing-coverage.csv` | `date, indexed`                         |

Optional sidecar metadata (one per artifact, see §4) lives next to any
screenshot, HTML, or JSON-LD file as `<file>.meta.json`.

---

## 3. Expected output artifacts

All paths are relative to repo root. Folder is gitignored.

| Path | Source | Notes |
|------|--------|-------|
| `launch-evidence/redirects/redirect-audit-<env>-<DATE>.csv` | redirect-audit | One row per redirect rule + apex (production) |
| `launch-evidence/html/<env>__<slug>-<DATE>.html`            | schema-snapshot | Raw rendered HTML |
| `launch-evidence/jsonld/<env>__<slug>-<DATE>.json`          | schema-snapshot | Extracted JSON-LD + `@type` set |
| `launch-evidence/jsonld/<env>__<slug>-latest.json`          | schema-snapshot | Used as the diff baseline |
| `launch-evidence/jsonld/diff-<env>-<DATE>.md`               | schema-snapshot | Human-readable drift report |
| `launch-evidence/manifest.json`                             | evidence-manifest | Full evidence index, grouped by row ID |
| `launch-evidence/manifest.csv`                              | evidence-manifest | Flat CSV — ready to attach to QA pack |

Docs side-effect: `qa:monitoring` rewrites the §E2 daily tables in
`docs/30-FINAL-LAUNCH-QA-PACK.md` from the latest 7 days of the CSVs above.

---

## 4. Sidecar metadata (preferred over filename heuristics)

Each artifact may ship with a sibling `<filename>.meta.json`:

```json
{
  "rowId": "B5",
  "category": "screenshot",
  "url": "/salsa-classes-chiswick",
  "tool": "rich-results",
  "env": "production"
}
```

Categories: `screenshot | html | jsonld | diff | redirects | monitoring | other`.

Sidecars are authoritative. Files without a sidecar fall back to the legacy
filename convention and are flagged in `manifest.json.heuristicFallback`.

---

## 5. Staging vs production

| Concern | Staging | Production |
|---------|---------|------------|
| `--env` flag | `staging` | `production` (default) |
| Host | `https://melittasiomos.lovable.app` | `https://www.puranights.com` |
| Apex redirect check | skipped (`apexHost: null`) | enabled |
| Strict mode | usually off — drift expected during edits | on for the final pre-launch run |
| Output filenames | prefixed with `staging__…` | prefixed with `production__…` |

Override host ad-hoc without editing config:

```bash
bun scripts/redirect-audit.ts --env=staging --host=https://preview.example
```

---

## 6. CI

`.github/workflows/schema-snapshot.yml` runs `bun run qa:schema --strict`
on PRs and daily. The build fails on any schema `@type` drift.

---

## 7. Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Invalid qa.config.json: …` | Schema validation failed — see Zod path printed in error. |
| `Unknown env "<name>"` | Check `qa.config.json → environments` keys. |
| `No CSVs found in launch-evidence/monitoring/` | Drop the 5 input CSVs (§2) or skip monitoring step. |
| `manifest.heuristicFallback > 0` | Add sidecar `.meta.json` files for non-conforming artifacts. |

---

## 8. Tests

```bash
bunx vitest run scripts/__tests__
```

Covers: config validation (Zod), redirect pass/fail, schema `@type` drift,
manifest sidecar precedence + heuristic fallback.
