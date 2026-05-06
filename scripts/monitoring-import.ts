/**
 * Monitoring importer — builds the 7-day daily tables in docs/30 from
 * exported GSC / Bing CSVs.
 *
 * Inputs (drop into launch-evidence/monitoring/):
 *   gsc-coverage.csv      cols: date, indexed, discovered_not_indexed
 *   gsc-events.csv        cols: date, valid, errors, warnings
 *   gsc-breadcrumb.csv    cols: date, valid, errors
 *   gsc-faq.csv           cols: date, valid, errors
 *   bing-coverage.csv     cols: date, indexed
 *
 * Optional API mode:
 *   If GSC_OAUTH_TOKEN + GSC_SITE env vars are set, queries the GSC Search
 *   Analytics API directly. (Out of scope for default run — CSV import is
 *   the supported path.)
 *
 * Output: rewrites the three §E2 tables in docs/30-FINAL-LAUNCH-QA-PACK.md
 *         with the latest 7 days of data.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const MON_DIR = join(ROOT, "launch-evidence/monitoring");
const DOC = join(ROOT, "docs/30-FINAL-LAUNCH-QA-PACK.md");
mkdirSync(MON_DIR, { recursive: true });

function readCsv(name: string): Record<string, string>[] {
  const p = join(MON_DIR, name);
  if (!existsSync(p)) return [];
  const [head, ...lines] = readFileSync(p, "utf8").trim().split(/\r?\n/);
  const cols = head.split(",").map((c) => c.trim());
  return lines.map((l) => {
    const cells = l.split(",");
    return Object.fromEntries(cols.map((c, i) => [c, (cells[i] ?? "").trim()]));
  });
}

function lastN(rows: Record<string, string>[], n: number): Record<string, string>[] {
  return rows.sort((a, b) => (a.date ?? "").localeCompare(b.date ?? "")).slice(-n);
}

function trend(curr: number, prev: number): string {
  if (Number.isNaN(curr) || Number.isNaN(prev)) return "—";
  if (curr > prev) return "↑";
  if (curr < prev) return "↓";
  return "→";
}

const cov = lastN(readCsv("gsc-coverage.csv"), 7);
const ev = lastN(readCsv("gsc-events.csv"), 7);
const br = lastN(readCsv("gsc-breadcrumb.csv"), 7);
const faq = lastN(readCsv("gsc-faq.csv"), 7);
const bing = lastN(readCsv("bing-coverage.csv"), 7);

if (cov.length + ev.length + br.length + faq.length + bing.length === 0) {
  console.warn("⚠ No CSVs found in launch-evidence/monitoring/. Skipping doc update.");
  console.warn("  Drop GSC/Bing exports into that folder, then re-run.");
  process.exit(0);
}

function row(i: number, cells: (string | number)[]): string {
  return `| ${i + 1} | ${cells.join(" | ")} |`;
}

function table7(rowsBuilder: (i: number) => string): string {
  return Array.from({ length: 7 }, (_, i) => rowsBuilder(i)).join("\n");
}

const indexingRows = table7((i) => {
  const c = cov[i], b = bing[i];
  const idx = Number(c?.indexed ?? NaN);
  const prevIdx = Number(cov[i - 1]?.indexed ?? NaN);
  return row(i, [
    c?.date ?? "",
    c?.indexed ?? "",
    c?.discovered_not_indexed ?? "",
    b?.indexed ?? "",
    i > 0 ? trend(idx, prevIdx) : "—",
    "",
  ]);
});

const eventsRows = table7((i) => {
  const e = ev[i];
  return row(i, [e?.date ?? "", e?.valid ?? "", e?.errors ?? "", e?.warnings ?? "", "", ""]);
});

const bcFaqRows = table7((i) => {
  const b = br[i], f = faq[i];
  return row(i, [b?.date ?? f?.date ?? "", b?.valid ?? "", b?.errors ?? "", f?.valid ?? "", f?.errors ?? "", ""]);
});

const doc = readFileSync(DOC, "utf8");

function replaceTable(src: string, headerLine: string, newBody: string): string {
  const idx = src.indexOf(headerLine);
  if (idx === -1) return src;
  const after = src.indexOf("\n", idx) + 1; // header line end
  const sepEnd = src.indexOf("\n", after) + 1; // separator |---|
  // Find next blank line after data rows
  const blank = src.indexOf("\n\n", sepEnd);
  return src.slice(0, sepEnd) + newBody + "\n" + src.slice(blank);
}

let out = doc;
out = replaceTable(
  out,
  "| Day | Date | GSC indexed pages | GSC discovered-not-indexed | Bing indexed pages | Trend | Notes |",
  indexingRows,
);
out = replaceTable(
  out,
  "| Day | Date | Valid Event items | Errors | Warnings | New error types | Action |",
  eventsRows,
);
out = replaceTable(
  out,
  "| Day | Date | Breadcrumb valid | Breadcrumb errors | FAQ valid | FAQ errors | Notes |",
  bcFaqRows,
);

writeFileSync(DOC, out);
console.log(`✓ Updated §E2 tables in docs/30 with ${cov.length}/${ev.length}/${br.length}/${faq.length}/${bing.length} day(s) of data.`);
