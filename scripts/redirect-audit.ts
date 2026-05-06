/**
 * Redirect audit — config-driven (qa.config.json).
 *
 * Usage:
 *   bun scripts/redirect-audit.ts                       # production
 *   bun scripts/redirect-audit.ts --env=staging
 *   bun scripts/redirect-audit.ts --host=https://…      # ad-hoc override
 *
 * Writes: launch-evidence/redirects/redirect-audit-<env>-<DATE>.csv
 * Exit 1 on any failure.
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { loadConfig } from "./qa-config";

const cfg = loadConfig();

type Row = {
  id: string;
  from: string;
  expected_to: string;
  status: number | string;
  location: string;
  pass: boolean;
  note: string;
};

async function head(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "manual" });
    return { status: res.status, location: res.headers.get("location") ?? "" };
  } catch (e) {
    return { status: "ERR", location: String((e as Error).message) };
  }
}

function normalise(loc: string): string {
  if (!loc) return "";
  try {
    return new URL(loc, cfg.host).pathname.replace(/\/$/, "") || "/";
  } catch {
    return loc;
  }
}

(async () => {
  const rows: Row[] = [];

  for (const r of cfg.redirectRules) {
    const { status, location } = await head(`${cfg.host}${r.from}`);
    const got = normalise(String(location));
    const expected = r.to.replace(/\/$/, "") || "/";
    const pass = status === 301 && got === expected;
    rows.push({
      id: r.id,
      from: r.from,
      expected_to: r.to,
      status,
      location: String(location),
      pass,
      note: pass ? "ok" : status !== 301 ? `expected 301 got ${status}` : `target mismatch (got ${got})`,
    });
  }

  if (cfg.apexHost) {
    const { status, location } = await head(`${cfg.apexHost}/`);
    const pass = status === 301 && (location ?? "").startsWith(cfg.host);
    rows.push({
      id: "C20",
      from: `${cfg.apexHost}/`,
      expected_to: `${cfg.host}/`,
      status,
      location: String(location),
      pass,
      note: pass ? "ok" : `apex redirect failed (status ${status})`,
    });
  }

  const date = new Date().toISOString().split("T")[0];
  const dir = join(process.cwd(), "launch-evidence/redirects");
  mkdirSync(dir, { recursive: true });
  const csvPath = join(dir, `redirect-audit-${cfg.env}-${date}.csv`);
  const header = "id,from,expected_to,status,location,pass,note\n";
  const body = rows
    .map((r) =>
      [r.id, r.from, r.expected_to, r.status, r.location, r.pass, r.note]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
  writeFileSync(csvPath, header + body + "\n");

  const passed = rows.filter((r) => r.pass).length;
  console.log(`\n📋 Redirect audit [${cfg.env}] — ${passed}/${rows.length} passed`);
  for (const r of rows) {
    console.log(`  ${r.pass ? "✓" : "✗"} ${r.id} ${r.from.padEnd(36)} → ${r.location || "—"} [${r.status}]`);
  }
  console.log(`\n→ ${csvPath}`);
  if (rows.some((r) => !r.pass)) process.exit(1);
})();
