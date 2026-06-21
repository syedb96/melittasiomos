/**
 * Venue page SEO regression snapshots.
 *
 * For every venue page under src/pages/venue/, captures:
 *   - <SeoHead> title and description props (static)
 *   - the inline JSON-LD `schema` const, normalised to a sorted, key-sanitised object
 *
 * Each run writes per-venue snapshot JSON to docs/snapshots/venue-seo/<slug>.json.
 * If a snapshot already exists and a key value differs, the run exits non-zero
 * (CI gate) and prints a unified diff-style summary so you can decide if the
 * change is intentional (commit the updated snapshot to accept).
 *
 * Run:    bun scripts/venue-seo-snapshot.ts
 * Accept: re-run with UPDATE_SNAPSHOTS=1 to overwrite snapshots on disk.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = process.cwd();
const VENUE_DIR = join(ROOT, "src/pages/venue");
const SNAP_DIR = join(ROOT, "docs/snapshots/venue-seo");
const UPDATE = process.env.UPDATE_SNAPSHOTS === "1";

mkdirSync(SNAP_DIR, { recursive: true });

const extractStringProp = (src: string, name: string): string | null => {
  const re = new RegExp(`${name}=(?:"([^"]+)"|\\{['\"]([^'\"]+)['\"]\\})`);
  const m = src.match(re);
  return m ? (m[1] ?? m[2] ?? null) : null;
};

const extractSchemaBlock = (src: string): string | null => {
  const m = src.match(/const\s+schema\s*=\s*(\{[\s\S]*?\n\});/);
  return m ? m[1] : null;
};

/** Strip whitespace and comments so meaningful schema-key changes are detected
 * even when formatting drifts. We do NOT eval — we just normalise the literal. */
const normaliseSchema = (block: string): Record<string, string> => {
  const out: Record<string, string> = {};
  // Capture top-level "key: <value-on-first-line>" pairs. Good enough for diffing.
  const keyRe = /^\s{2}([a-zA-Z_@][\w@]*)\s*:\s*([\s\S]*?)(?=,\n\s{2}[a-zA-Z_@]|\n\};)/gm;
  let m: RegExpExecArray | null;
  while ((m = keyRe.exec(block)) !== null) {
    out[m[1]] = m[2].replace(/\s+/g, " ").trim().replace(/,$/, "");
  }
  return out;
};

interface Snapshot {
  venue_file: string;
  title: string | null;
  description: string | null;
  schema_keys: Record<string, string>;
  captured_at: string;
}

const files = readdirSync(VENUE_DIR).filter((f) => /\.tsx$/.test(f));
const failures: string[] = [];
let updated = 0;

for (const f of files) {
  const src = readFileSync(join(VENUE_DIR, f), "utf8");
  const block = extractSchemaBlock(src);
  if (!block) {
    failures.push(`${f}: no inline schema literal found`);
    continue;
  }
  const snap: Snapshot = {
    venue_file: f,
    title: extractStringProp(src, "title"),
    description: extractStringProp(src, "description"),
    schema_keys: normaliseSchema(block),
    captured_at: new Date().toISOString(),
  };

  const slug = basename(f, ".tsx").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  const snapPath = join(SNAP_DIR, `${slug}.json`);

  if (!existsSync(snapPath) || UPDATE) {
    writeFileSync(snapPath, JSON.stringify(snap, null, 2) + "\n");
    updated++;
    continue;
  }

  const prev: Snapshot = JSON.parse(readFileSync(snapPath, "utf8"));
  const diffs: string[] = [];
  if (prev.title !== snap.title) diffs.push(`title: "${prev.title}" → "${snap.title}"`);
  if (prev.description !== snap.description) diffs.push(`description: "${prev.description}" → "${snap.description}"`);
  const allKeys = new Set([...Object.keys(prev.schema_keys), ...Object.keys(snap.schema_keys)]);
  for (const k of allKeys) {
    if (prev.schema_keys[k] !== snap.schema_keys[k]) {
      diffs.push(`schema.${k}:\n  - ${prev.schema_keys[k] ?? "(absent)"}\n  + ${snap.schema_keys[k] ?? "(absent)"}`);
    }
  }
  if (diffs.length) {
    failures.push(`${f}\n  ${diffs.join("\n  ")}`);
  }
}

console.log(`Venue SEO snapshot: ${files.length} pages, ${updated} written.`);
if (failures.length) {
  console.error(`\n✖ ${failures.length} venue SEO drift(s) vs. recorded snapshots:`);
  for (const x of failures) console.error("  " + x);
  console.error("\nIf the change is intentional, re-run with UPDATE_SNAPSHOTS=1 and commit the updated files in docs/snapshots/venue-seo/.");
  process.exit(1);
}
console.log("✓ No venue SEO drift detected.");
