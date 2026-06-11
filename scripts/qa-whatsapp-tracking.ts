// scripts/qa-whatsapp-tracking.ts
//
// Static audit of every WhatsApp CTA in the codebase. Verifies:
//   1. No raw `wa.me/447449482343` URLs outside src/lib/whatsapp.ts
//      (all WA links must go through the WA preset map so tracking
//      stays consistent).
//   2. Every <a href={WA.*()}> or {...waCta()} call site has either
//      target="_blank" + rel="noopener noreferrer" OR uses waCta()
//      (which sets them automatically).
//   3. Every WA preset in WA{} is exported and has at least one call
//      site (dead-preset detection).
//
// Run:  bun scripts/qa-whatsapp-tracking.ts
// CI:   add to predeploy or the launch QA pack.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const ALLOW_RAW_FILES = new Set([
  "src/lib/whatsapp.ts",
  "src/pages/admin/TrackingQA.tsx",
]);

const PHONE = "447449482343";

interface Finding {
  level: "error" | "warn";
  file: string;
  line: number;
  msg: string;
}

const findings: Finding[] = [];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      walk(p, out);
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      out.push(p);
    }
  }
  return out;
}

function extractPresets(): string[] {
  const src = readFileSync(join(SRC, "lib/whatsapp.ts"), "utf8");
  // crude but reliable: any `^  <name>: (` inside `export const WA = {...}`
  const block = src.match(/export const WA\s*=\s*\{([\s\S]*?)\n\};/);
  if (!block) throw new Error("Could not locate `export const WA` map");
  const presets: string[] = [];
  for (const m of block[1].matchAll(/^\s{2}(\w+)\s*:/gm)) presets.push(m[1]);
  return presets;
}

function audit() {
  const files = walk(SRC);
  const presets = extractPresets();
  const usedPresets = new Set<string>();

  for (const file of files) {
    const rel = relative(ROOT, file);
    const src = readFileSync(file, "utf8");
    const lines = src.split("\n");

    lines.forEach((line, i) => {
      // Rule 1 — no raw wa.me phone (share URLs wa.me/?text=... are exempt
      // because they target the user's own contacts, not Melitta).
      if (line.includes(`wa.me/${PHONE}`) && !ALLOW_RAW_FILES.has(rel)) {
        findings.push({
          level: "error",
          file: rel,
          line: i + 1,
          msg: `Raw wa.me URL — must go through WA helper for tracking consistency.`,
        });
      }
      // Also flag template-string variants `wa.me/${PHONE}` / `wa.me/${WA_PHONE}`
      // outside the helper itself.
      if (/wa\.me\/\$\{(?:PHONE|WA_PHONE)\}/.test(line) && !ALLOW_RAW_FILES.has(rel)) {
        findings.push({
          level: "error",
          file: rel,
          line: i + 1,
          msg: `Templated wa.me URL — must go through WA / waCta / waCustom helper.`,
        });
      }
    });

    // Track preset usage: `WA.<name>(` or `waCta("<name>"`
    for (const p of presets) {
      const re1 = new RegExp(`\\bWA\\.${p}\\s*\\(`);
      const re2 = new RegExp(`waCta\\s*\\(\\s*["']${p}["']`);
      if (re1.test(src) || re2.test(src)) usedPresets.add(p);
    }

    // Rule 2 — anchors using WA.* / waCta / waCustom must be safe
    const anchorRe = /<a\b[\s\S]*?>/g;
    for (const m of src.matchAll(anchorRe)) {
      const anchor = m[0];
      const usesWaHelper = /WA\.\w+\(|waCta\s*\(|waCustom\s*\(/.test(anchor);
      if (!usesWaHelper) continue;
      // {...waCta(...)} or {...waCustom(...)} spreads target+rel automatically.
      const usesSpread = /\{\.\.\.(waCta|waCustom)\s*\(/.test(anchor);
      if (usesSpread) continue;
      const hasTargetBlank = /target=["']_blank["']/.test(anchor);
      const hasRelSafe = /rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']|rel=["'][^"']*noreferrer[^"']*noopener[^"']*["']/.test(
        anchor,
      );
      if (!hasTargetBlank || !hasRelSafe) {
        const idx = src.indexOf(anchor);
        const line = src.slice(0, idx).split("\n").length;
        findings.push({
          level: "warn",
          file: rel,
          line,
          msg: `WhatsApp anchor missing target="_blank" or rel="noopener noreferrer" (or use waCta()).`,
        });
      }
    }
  }

  // Rule 3 — dead presets
  for (const p of presets) {
    // skip helper-only presets that are exported for external use but unused in-app
    if (p === "general") continue;
    if (!usedPresets.has(p)) {
      findings.push({
        level: "warn",
        file: "src/lib/whatsapp.ts",
        line: 1,
        msg: `Preset WA.${p}() is exported but has zero in-app call sites.`,
      });
    }
  }

  // Report
  const errors = findings.filter((f) => f.level === "error");
  const warns = findings.filter((f) => f.level === "warn");

  console.log(`\nWhatsApp tracking audit — ${files.length} files scanned, ${presets.length} presets.`);
  console.log(`  presets in use: ${usedPresets.size}/${presets.length}`);
  console.log(`  errors: ${errors.length}, warnings: ${warns.length}\n`);

  for (const f of findings) {
    const tag = f.level === "error" ? "✗" : "⚠";
    console.log(`  ${tag} ${f.file}:${f.line}  ${f.msg}`);
  }

  if (errors.length > 0) {
    console.error(`\n✗ WhatsApp tracking audit failed (${errors.length} error${errors.length > 1 ? "s" : ""}).`);
    process.exit(1);
  }
  console.log(`\n✓ WhatsApp tracking audit passed.`);
}

audit();
