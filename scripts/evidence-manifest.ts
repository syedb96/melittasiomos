/**
 * Evidence manifest — scans /launch-evidence and produces a manifest that
 * links each artifact back to the QA pack row IDs (B*, C*, E*).
 *
 * Writes:
 *   launch-evidence/manifest.json
 *   launch-evidence/manifest.csv
 */
import { readdirSync, statSync, writeFileSync, existsSync } from "fs";
import { join, relative } from "path";
import { loadConfig } from "./qa-config";

const cfg = loadConfig();
const ROOT = join(process.cwd(), "launch-evidence");

type Entry = {
  rowId: string;
  category: "screenshot" | "html" | "jsonld" | "diff" | "redirects" | "monitoring" | "other";
  url?: string;
  file: string;
  bytes: number;
  modified: string;
};

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function rowFromFilename(name: string): { rowId: string; category: Entry["category"]; url?: string } {
  // Screenshot convention: <row>__<slug>__<tool>__<DATE>.png
  const sm = name.match(/^([A-Z]\d+)__([^_]+(?:[-_][^_]+)*)__/);
  if (sm) {
    const url = cfg.schemaUrls.find((u) => u.id === sm[1])?.path;
    return { rowId: sm[1], category: "screenshot", url };
  }
  // Schema snapshot HTML/JSON: <env>__<slug>-<DATE>.<ext>
  const slugMatch = name.match(/^[a-z]+__([a-z0-9_\-]+?)(?:-\d{4}-\d{2}-\d{2})?\.(html|json)$/i);
  if (slugMatch) {
    const slug = slugMatch[1];
    const path = slug === "home" ? "/" : "/" + slug.replace(/_/g, "/");
    const u = cfg.schemaUrls.find((x) => x.path === path);
    if (u) return { rowId: u.id, category: slugMatch[2] === "html" ? "html" : "jsonld", url: u.path };
  }
  if (/^diff-/.test(name)) return { rowId: "B-summary", category: "diff" };
  if (/redirect-audit/.test(name)) return { rowId: "C-audit", category: "redirects" };
  if (/monitoring|gsc|bing/i.test(name)) return { rowId: "E2", category: "monitoring" };
  return { rowId: "—", category: "other" };
}

const files = walk(ROOT).filter((p) => !/manifest\.(json|csv)$/.test(p));
const entries: Entry[] = files.map((p) => {
  const stat = statSync(p);
  const meta = rowFromFilename(p.split("/").pop()!);
  return {
    rowId: meta.rowId,
    category: meta.category,
    url: meta.url,
    file: relative(process.cwd(), p),
    bytes: stat.size,
    modified: stat.mtime.toISOString(),
  };
});

// Group by row for the JSON view
const byRow: Record<string, Entry[]> = {};
for (const e of entries) (byRow[e.rowId] ??= []).push(e);

writeFileSync(
  join(ROOT, "manifest.json"),
  JSON.stringify(
    { generatedAt: new Date().toISOString(), env: cfg.env, host: cfg.host, totalFiles: entries.length, byRow },
    null,
    2,
  ),
);

const csv =
  "row_id,category,url,file,bytes,modified\n" +
  entries
    .sort((a, b) => a.rowId.localeCompare(b.rowId) || a.file.localeCompare(b.file))
    .map((e) =>
      [e.rowId, e.category, e.url ?? "", e.file, e.bytes, e.modified]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
writeFileSync(join(ROOT, "manifest.csv"), csv + "\n");

console.log(`✓ Manifest: ${entries.length} files indexed across ${Object.keys(byRow).length} rows`);
console.log(`  → launch-evidence/manifest.json`);
console.log(`  → launch-evidence/manifest.csv`);
