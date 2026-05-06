/**
 * Redirect audit — verifies every rule in docs/20-WIX-REDIRECT-MANAGER-MAP.md
 * returns HTTP 301 and the exact expected Location target.
 *
 * Usage:
 *   bun scripts/redirect-audit.ts                          # default host www.puranights.com
 *   bun scripts/redirect-audit.ts --host=https://staging…  # override
 *
 * Writes:
 *   launch-evidence/redirects/redirect-audit-YYYY-MM-DD.csv
 *   Exit code 1 if any rule fails.
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const HOST =
  process.argv.find((a) => a.startsWith("--host="))?.split("=")[1] ??
  "https://www.puranights.com";

// Mirror of docs/20-WIX-REDIRECT-MANAGER-MAP.md (single source of truth).
const RULES: { from: string; to: string }[] = [
  { from: "/online-classes", to: "/online-salsa-bachata-coaching" },
  { from: "/classes", to: "/pura-nights" },
  { from: "/book-online", to: "/bookings" },
  { from: "/book-now", to: "/bookings" },
  { from: "/teachers", to: "/meet-the-team" },
  { from: "/team", to: "/meet-the-team" },
  { from: "/pricing", to: "/prices" },
  { from: "/class-schedule", to: "/schedule" },
  { from: "/wedding-first-dance", to: "/wedding-dance" },
  { from: "/salsa-classes", to: "/salsa-classes-london" },
  { from: "/bachata-classes", to: "/bachata-classes-london" },
  { from: "/1-to-1", to: "/private-lessons" },
  { from: "/private-classes", to: "/private-lessons" },
  { from: "/store", to: "/shop" },
  { from: "/dancewear", to: "/shop" },
  { from: "/merch", to: "/shop" },
  { from: "/proof-centre", to: "/testimonials" },
  { from: "/salsa-classes-acton-local", to: "/salsa-classes-acton" },
  { from: "/all-pages-master", to: "/" },
];

// Apex → www is a separate DNS-level rule.
const APEX = { from: "https://puranights.com/", to: `${HOST}/` };

type Row = {
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

function normalise(loc: string, expected: string): string {
  if (!loc) return "";
  // Treat absolute and relative as equivalent.
  try {
    return new URL(loc, HOST).pathname.replace(/\/$/, "") || "/";
  } catch {
    return loc;
  }
}

(async () => {
  const rows: Row[] = [];
  // Standard slug rules
  for (const r of RULES) {
    const { status, location } = await head(`${HOST}${r.from}`);
    const got = normalise(String(location), r.to);
    const expected = r.to.replace(/\/$/, "") || "/";
    const pass = status === 301 && got === expected;
    rows.push({
      from: r.from,
      expected_to: r.to,
      status,
      location: String(location),
      pass,
      note: pass ? "ok" : status !== 301 ? `expected 301 got ${status}` : `target mismatch (got ${got})`,
    });
  }
  // Apex
  {
    const { status, location } = await head(APEX.from);
    const pass = status === 301 && (location ?? "").startsWith(HOST);
    rows.push({
      from: APEX.from,
      expected_to: APEX.to,
      status,
      location: String(location),
      pass,
      note: pass ? "ok" : `apex redirect failed (status ${status})`,
    });
  }

  const date = new Date().toISOString().split("T")[0];
  const dir = join(process.cwd(), "launch-evidence/redirects");
  mkdirSync(dir, { recursive: true });
  const csvPath = join(dir, `redirect-audit-${date}.csv`);
  const header = "from,expected_to,status,location,pass,note\n";
  const body = rows
    .map((r) =>
      [r.from, r.expected_to, r.status, r.location, r.pass, r.note]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
  writeFileSync(csvPath, header + body + "\n");

  const passed = rows.filter((r) => r.pass).length;
  const failed = rows.length - passed;
  console.log(`\n📋 Redirect audit (${HOST}) — ${passed}/${rows.length} passed`);
  for (const r of rows) {
    console.log(`  ${r.pass ? "✓" : "✗"} ${r.from.padEnd(36)} → ${r.location || "—"} [${r.status}]`);
  }
  console.log(`\n→ ${csvPath}`);
  if (failed > 0) process.exit(1);
})();
