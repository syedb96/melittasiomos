/**
 * Combined launch QA runner.
 * Order: redirect-audit → schema-snapshot → monitoring-import → evidence-manifest
 *
 * Each step is run independently; failures are recorded but the run continues
 * so the manifest always reflects the latest state. Final exit code = 1 if
 * any critical step failed.
 *
 * Usage:
 *   bun scripts/launch-qa-run.ts                # production
 *   bun scripts/launch-qa-run.ts --env=staging
 *   bun scripts/launch-qa-run.ts --strict       # propagate schema drift as failure
 */
import { spawnSync } from "child_process";

const args = process.argv.slice(2);
const steps = [
  { name: "redirect-audit",    file: "scripts/redirect-audit.ts",    critical: true },
  { name: "schema-snapshot",   file: "scripts/schema-snapshot.ts",   critical: args.includes("--strict") },
  { name: "monitoring-import", file: "scripts/monitoring-import.ts", critical: false },
  { name: "evidence-manifest", file: "scripts/evidence-manifest.ts", critical: false },
];

let failed = 0;
const summary: { name: string; code: number }[] = [];

for (const s of steps) {
  console.log(`\n━━━ ${s.name} ━━━`);
  const r = spawnSync("bun", [s.file, ...args], { stdio: "inherit" });
  const code = r.status ?? 1;
  summary.push({ name: s.name, code });
  if (code !== 0 && s.critical) failed++;
}

console.log("\n━━━ Launch QA summary ━━━");
for (const s of summary) console.log(`  ${s.code === 0 ? "✓" : "✗"} ${s.name} (exit ${s.code})`);
console.log(`\nEvidence index: launch-evidence/manifest.json`);

if (failed > 0) {
  console.error(`\n❌ ${failed} critical step(s) failed.`);
  process.exit(1);
}
console.log("\n✓ Launch QA run complete.");
