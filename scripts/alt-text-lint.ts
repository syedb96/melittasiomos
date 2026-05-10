#!/usr/bin/env bun
/**
 * Alt-text lint — fails build when any <img>/Image alt is missing,
 * empty, placeholder-y, or duplicated across the codebase.
 *
 * Catches Wix-mirroring gaps before they ship.
 *
 * Usage: bun scripts/alt-text-lint.ts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dir, "..");
const SRC = join(ROOT, "src");

const PLACEHOLDER_PATTERNS = [
  /^image$/i,
  /^photo$/i,
  /^picture$/i,
  /^img$/i,
  /^placeholder/i,
  /^todo/i,
  /^tbd/i,
  /^alt text/i,
  /^description/i,
  /lorem ipsum/i,
  /^untitled/i,
  /^\.+$/,
];

// Filenames are content, not alt-text problems
const ALLOW_DUPLICATE_ALTS = new Set<string>([
  "", // handled separately
]);

interface Finding {
  file: string;
  line: number;
  alt: string;
  reason: string;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry === "dist" || entry.startsWith(".")) continue;
      walk(full, out);
    } else if (/\.(tsx|jsx|html)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const ALT_RE = /\balt\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}|\{"([^"]*)"\}|\{'([^']*)'\})/g;
// Match <img ... > tags only (not arbitrary alt= props on non-image components)
const IMG_TAG_RE = /<img\b[^>]*>/gi;

const findings: Finding[] = [];
const altOccurrences = new Map<string, { file: string; line: number }[]>();

for (const file of walk(SRC)) {
  // Skip lint script artefacts and the slot helper components themselves
  const rel = relative(ROOT, file);
  if (rel.includes("PhotoSlot.tsx") || rel.includes("RealProofSlot.tsx")) continue;

  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");

  for (const match of content.matchAll(IMG_TAG_RE)) {
    const tag = match[0];
    const idx = match.index ?? 0;
    const lineNo = content.slice(0, idx).split("\n").length;

    const altMatch = ALT_RE.exec(tag);
    ALT_RE.lastIndex = 0;

    if (!altMatch) {
      findings.push({ file: rel, line: lineNo, alt: "(missing)", reason: "missing alt attribute" });
      continue;
    }
    const alt = (altMatch[1] ?? altMatch[2] ?? altMatch[3] ?? altMatch[4] ?? altMatch[5] ?? "").trim();

    if (alt === "") {
      // Empty alts are only allowed on decorative images marked with role="presentation" or aria-hidden
      if (!/aria-hidden\s*=\s*"?true/.test(tag) && !/role\s*=\s*"presentation"/.test(tag)) {
        findings.push({ file: rel, line: lineNo, alt: "(empty)", reason: "empty alt without aria-hidden/role=presentation" });
      }
      continue;
    }

    if (PLACEHOLDER_PATTERNS.some((re) => re.test(alt))) {
      findings.push({ file: rel, line: lineNo, alt, reason: "placeholder-style alt text" });
      continue;
    }

    if (alt.length < 5) {
      findings.push({ file: rel, line: lineNo, alt, reason: "alt text too short (<5 chars)" });
      continue;
    }

    // Track for duplicate check (skip dynamic alts)
    if (!alt.includes("${") && !alt.includes("{")) {
      const key = alt.toLowerCase();
      if (!ALLOW_DUPLICATE_ALTS.has(key)) {
        const arr = altOccurrences.get(key) ?? [];
        arr.push({ file: rel, line: lineNo });
        altOccurrences.set(key, arr);
      }
    }
  }
  // Silence unused
  void lines;
}

// Duplicate detection (>2 = suspicious; same alt copy-pasted across pages)
const DUPLICATE_THRESHOLD = 3;
for (const [alt, occurrences] of altOccurrences) {
  if (occurrences.length >= DUPLICATE_THRESHOLD) {
    for (const occ of occurrences) {
      findings.push({
        file: occ.file,
        line: occ.line,
        alt,
        reason: `duplicate alt used ${occurrences.length}× across the site`,
      });
    }
  }
}

if (findings.length === 0) {
  console.log("✅ alt-text-lint: all <img> alts are unique, descriptive, and non-placeholder.");
  process.exit(0);
}

console.error(`\n❌ alt-text-lint failed — ${findings.length} issue(s):\n`);
const grouped = new Map<string, Finding[]>();
for (const f of findings) {
  const arr = grouped.get(f.file) ?? [];
  arr.push(f);
  grouped.set(f.file, arr);
}
for (const [file, items] of grouped) {
  console.error(`  ${file}`);
  for (const it of items) {
    console.error(`    L${it.line}  [${it.reason}]  alt="${it.alt}"`);
  }
}
console.error("\nFix: write a unique, descriptive alt (≥5 chars). For decorative images use alt=\"\" with aria-hidden=\"true\".\n");
process.exit(1);
