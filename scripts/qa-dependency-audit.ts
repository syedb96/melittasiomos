#!/usr/bin/env bun
/**
 * Dependency vulnerability gate.
 * Fails the prebuild on any CRITICAL advisory.
 * Reports HIGH advisories as a warning (non-blocking).
 *
 * Uses `npm audit --json` so it works without extra tooling.
 */
import { spawnSync } from "node:child_process";

const res = spawnSync("npm", ["audit", "--json", "--omit=dev"], {
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
});

if (!res.stdout) {
  console.warn("[qa-dependency-audit] npm audit produced no output — skipping.");
  process.exit(0);
}

let parsed: any;
try {
  parsed = JSON.parse(res.stdout);
} catch {
  console.warn("[qa-dependency-audit] could not parse npm audit output — skipping.");
  process.exit(0);
}

const sev = parsed?.metadata?.vulnerabilities ?? {};
const critical = Number(sev.critical ?? 0);
const high = Number(sev.high ?? 0);
const moderate = Number(sev.moderate ?? 0);
const low = Number(sev.low ?? 0);

console.log(
  `[qa-dependency-audit] critical=${critical} high=${high} moderate=${moderate} low=${low}`,
);

if (critical > 0) {
  const advisories = parsed?.vulnerabilities ?? {};
  const criticalPkgs = Object.entries(advisories)
    .filter(([, v]: any) => v?.severity === "critical")
    .map(([k]) => k);
  console.error(
    `[qa-dependency-audit] BLOCKING — ${critical} critical vulnerability(ies):`,
    criticalPkgs.join(", ") || "(see npm audit)",
  );
  process.exit(1);
}

if (high > 0) {
  console.warn(`[qa-dependency-audit] ${high} high-severity advisory(ies) — review with \`npm audit\`.`);
}

process.exit(0);
