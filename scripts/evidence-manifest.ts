/**
 * Evidence manifest — links every artifact in /launch-evidence to QA pack
 * row IDs (B*, C*, E*) using EXPLICIT per-artifact sidecar metadata.
 *
 * Each artifact <name>.<ext> may have a sibling <name>.<ext>.meta.json:
 *   {
 *     "rowId": "B5",
 *     "category": "screenshot" | "html" | "jsonld" | "diff" | "redirects" | "monitoring" | "other",
 *     "url": "/salsa-classes-chiswick",
 *     "tool": "rich-results",      // optional
 *     "env": "production",         // optional
 *     "capturedAt": "2026-05-07T…" // optional
 *   }
 *
 * Sidecars are authoritative. Only files without a sidecar fall back to the
 * legacy filename heuristic, and those fallbacks are flagged in the manifest
 * so they can be cleaned up.
 *
 * Writes:
 *   launch-evidence/manifest.json
 *   launch-evidence/manifest.csv
 */
import { readdirSync, statSync, writeFileSync, existsSync, readFileSync } from "fs";
import { join, relative } from "path";
import { loadConfig, QAConfig } from "./qa-config";

export type EvidenceCategory =
  | "screenshot"
  | "html"
  | "jsonld"
  | "diff"
  | "redirects"
  | "monitoring"
  | "manifest"
  | "other";

export interface EvidenceEntry {
  rowId: string;
  category: EvidenceCategory;
  url?: string;
  tool?: string;
  env?: string;
  file: string;
  bytes: number;
  modified: string;
  source: "sidecar" | "heuristic";
}

export function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

export function rowFromFilenameHeuristic(
  name: string,
  schemaUrls: { id: string; path: string }[],
): { rowId: string; category: EvidenceCategory; url?: string } {
  const sm = name.match(/^([A-Z]\d+)__([^_]+(?:[-_][^_]+)*)__/);
  if (sm) {
    const url = schemaUrls.find((u) => u.id === sm[1])?.path;
    return { rowId: sm[1], category: "screenshot", url };
  }
  const slugMatch = name.match(/^[a-z]+__([a-z0-9_\-]+?)(?:-\d{4}-\d{2}-\d{2})?\.(html|json)$/i);
  if (slugMatch) {
    const slug = slugMatch[1];
    const path = slug === "home" ? "/" : "/" + slug.replace(/_/g, "/");
    const u = schemaUrls.find((x) => x.path === path);
    if (u) return { rowId: u.id, category: slugMatch[2] === "html" ? "html" : "jsonld", url: u.path };
  }
  if (/^diff-/.test(name)) return { rowId: "B-summary", category: "diff" };
  if (/redirect-audit/.test(name)) return { rowId: "C-audit", category: "redirects" };
  if (/monitoring|gsc|bing/i.test(name)) return { rowId: "E2", category: "monitoring" };
  if (/manifest\.(json|csv)$/.test(name)) return { rowId: "—", category: "manifest" };
  return { rowId: "—", category: "other" };
}

export function buildEntries(files: string[], cfg: QAConfig): EvidenceEntry[] {
  return files
    .filter((p) => !/manifest\.(json|csv)$/.test(p))
    .filter((p) => !p.endsWith(".meta.json"))
    .map((p) => {
      const stat = statSync(p);
      const sidecarPath = `${p}.meta.json`;
      const name = p.split("/").pop()!;
      let entry: Pick<EvidenceEntry, "rowId" | "category" | "url" | "tool" | "env" | "source">;
      if (existsSync(sidecarPath)) {
        try {
          const meta = JSON.parse(readFileSync(sidecarPath, "utf8"));
          entry = {
            rowId: String(meta.rowId ?? "—"),
            category: (meta.category ?? "other") as EvidenceCategory,
            url: meta.url,
            tool: meta.tool,
            env: meta.env,
            source: "sidecar",
          };
        } catch {
          entry = { ...rowFromFilenameHeuristic(name, cfg.schemaUrls), source: "heuristic" };
        }
      } else {
        entry = { ...rowFromFilenameHeuristic(name, cfg.schemaUrls), source: "heuristic" };
      }
      return {
        ...entry,
        file: relative(process.cwd(), p),
        bytes: stat.size,
        modified: stat.mtime.toISOString(),
      };
    });
}

export function writeSidecar(filePath: string, meta: {
  rowId: string;
  category: EvidenceCategory;
  url?: string;
  tool?: string;
  env?: string;
}) {
  writeFileSync(`${filePath}.meta.json`, JSON.stringify({ ...meta, capturedAt: new Date().toISOString() }, null, 2));
}

// CLI entry — only runs when executed directly
if (import.meta.main) {
  const cfg = loadConfig();
  const ROOT = join(process.cwd(), "launch-evidence");
  const files = walk(ROOT);
  const entries = buildEntries(files, cfg);

  const byRow: Record<string, EvidenceEntry[]> = {};
  for (const e of entries) (byRow[e.rowId] ??= []).push(e);
  const heuristicCount = entries.filter((e) => e.source === "heuristic").length;

  writeFileSync(
    join(ROOT, "manifest.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        env: cfg.env,
        host: cfg.host,
        totalFiles: entries.length,
        sidecarCovered: entries.length - heuristicCount,
        heuristicFallback: heuristicCount,
        byRow,
      },
      null,
      2,
    ),
  );

  const csv =
    "row_id,category,url,tool,env,source,file,bytes,modified\n" +
    entries
      .sort((a, b) => a.rowId.localeCompare(b.rowId) || a.file.localeCompare(b.file))
      .map((e) =>
        [e.rowId, e.category, e.url ?? "", e.tool ?? "", e.env ?? "", e.source, e.file, e.bytes, e.modified]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");
  writeFileSync(join(ROOT, "manifest.csv"), csv + "\n");

  console.log(`✓ Manifest: ${entries.length} files (${entries.length - heuristicCount} sidecar, ${heuristicCount} heuristic)`);
  console.log(`  → launch-evidence/manifest.json`);
  console.log(`  → launch-evidence/manifest.csv`);
}
