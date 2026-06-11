// One-off codemod: rewrite every raw `wa.me/447449482343` URL in src/
// to go through the centralised whatsapp helper (waCustom / waCta).
//
// Strategy:
//   1. Anchor pattern:  <a href="https://wa.me/447449482343?text=X" target="_blank" rel="..." OTHER>
//      → <a {...waCustom("decoded", "<file:line>")} OTHER>
//      (preserves all other attributes, gets full tracking)
//
//   2. String literal anywhere else:  "https://wa.me/447449482343?text=X"
//      → waCustom("decoded", "<file:line>").href
//      (preserves href semantics; loses onClick tracking on a few non-anchor sites
//       that pass the URL as a prop — acceptable, still funnels through helper)
//
//   3. Template-literal:  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
//      → waCustom(text, "<file:line>").href
//
//   4. Auto-adds `import { waCustom } from "@/lib/whatsapp"` (or merges into
//      an existing whatsapp import).
//
//   5. Skips: src/lib/whatsapp.ts, src/pages/admin/TrackingQA.tsx,
//      and `wa.me/?text=` share URLs (they target the visitor's own contacts).
//
// Run once:  bun scripts/codemod-wa-refactor.ts

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, basename } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const SKIP = new Set([
  "src/lib/whatsapp.ts",
  "src/pages/admin/TrackingQA.tsx",
  "scripts/codemod-wa-refactor.ts",
]);

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

function decodeText(raw: string): string {
  try { return decodeURIComponent(raw); } catch { return raw; }
}

function locationTag(rel: string, line: number): string {
  return `${basename(rel).replace(/\.[jt]sx?$/, "")}:${line}`;
}

function ensureImport(src: string): string {
  const importLineRe = /import\s*\{([^}]*)\}\s*from\s*["']@\/lib\/whatsapp["']/;
  const m = src.match(importLineRe);
  if (m) {
    if (/\bwaCustom\b/.test(m[1])) return src;
    const merged = m[0].replace(m[1], ` ${m[1].trim().replace(/,?\s*$/, "")}, waCustom `);
    return src.replace(m[0], merged);
  }
  // Insert AFTER the entire import block (skip multi-line imports too).
  const lines = src.split("\n");
  let i = 0;
  // skip leading comments/blank
  while (i < lines.length && /^\s*(\/\/|\/\*|\*|$)/.test(lines[i])) i++;
  let insertAt = i;
  let depth = 0;
  while (i < lines.length) {
    const ln = lines[i];
    if (/^\s*import\b/.test(ln) || depth > 0) {
      // track braces to handle multi-line `import { ... } from ...`
      for (const ch of ln) {
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
      }
      if (depth === 0 && /from\s*["'][^"']+["'];?\s*$/.test(ln.trim())) {
        insertAt = i + 1;
      } else if (depth === 0 && /^\s*import\s+[^{][^;]*;?\s*$/.test(ln)) {
        // bare `import X from "..."` single line
        insertAt = i + 1;
      }
      i++;
      continue;
    }
    break;
  }
  lines.splice(insertAt, 0, `import { waCustom } from "@/lib/whatsapp";`);
  return lines.join("\n");
}

interface Result { file: string; replacements: number; }

function processFile(file: string): Result {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  if (SKIP.has(rel)) return { file: rel, replacements: 0 };
  let src = readFileSync(file, "utf8");
  if (!/wa\.me\/(?:447449482343|\$\{(?:PHONE|WA_PHONE)\})/.test(src)) {
    return { file: rel, replacements: 0 };
  }
  let count = 0;
  const PHONE_RE = "(?:447449482343|\\$\\{PHONE\\}|\\$\\{WA_PHONE\\})";

  // --- Pattern A: anchor `<a ... href="https://wa.me/PHONE?text=ENCODED" target rel ...>`
  // Two variants for outer quote so single-quotes inside text don't terminate.
  for (const q of ['"', "'"]) {
    const inner = q === '"' ? `[^"]` : `[^']`;
    const anchorRe = new RegExp(
      `<a\\b([^>]*?)\\shref=${q}https:\\/\\/wa\\.me\\/${PHONE_RE}(?:\\?text=(${inner}*))?${q}([^>]*?)>`,
      "g",
    );
    src = src.replace(anchorRe, (m, pre: string, encText: string | undefined, post: string) => {
      const stripAttrs = (s: string) =>
        s
          .replace(/\starget=("|')[^"']*\1/g, "")
          .replace(/\srel=("|')[^"']*\1/g, "")
          .replace(/\sonClick=\{[^}]*\}/g, "");
      const cleanPre = stripAttrs(pre);
      const cleanPost = stripAttrs(post);
      const startLine = src.slice(0, src.indexOf(m)).split("\n").length;
      const loc = locationTag(rel, startLine);
      const text = encText ? decodeText(encText) : "Hi Melitta, I'd like to get in touch about Pura Nights.";
      const esc = JSON.stringify(text);
      count++;
      return `<a${cleanPre} {...waCustom(${esc}, ${JSON.stringify(loc)})}${cleanPost}>`;
    });
  }

  // --- Pattern B: any remaining string-literal URL (per-quote-style)
  for (const q of ['"', "'"]) {
    const inner = q === '"' ? `[^"]` : `[^']`;
    const literalRe = new RegExp(
      `${q}https:\\/\\/wa\\.me\\/${PHONE_RE}(?:\\?text=(${inner}*))?${q}`,
      "g",
    );
    src = src.replace(literalRe, (m, encText: string | undefined) => {
      // Skip if inside a JSX/HTML comment line
      const lineStart = src.lastIndexOf("\n", src.indexOf(m)) + 1;
      const lineEnd = src.indexOf("\n", src.indexOf(m));
      const lineText = src.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
      if (/^\s*(\/\/|\/\*|\*|<!--)/.test(lineText)) return m;
      const startLine = src.slice(0, src.indexOf(m)).split("\n").length;
      const loc = locationTag(rel, startLine);
      const text = encText ? decodeText(encText) : "Hi Melitta, I'd like to get in touch about Pura Nights.";
      count++;
      return `waCustom(${JSON.stringify(text)}, ${JSON.stringify(loc)}).href`;
    });
  }

  // --- Pattern C: template literals  `https://wa.me/${PHONE}?text=${encodeURIComponent(X)}`
  // Capture inner expression and rewrite.
  const tmplEncRe = new RegExp(
    `\\\`https:\\/\\/wa\\.me\\/${PHONE_RE}\\?text=\\$\\{encodeURIComponent\\(([\\s\\S]*?)\\)\\}\\\``,
    "g",
  );
  src = src.replace(tmplEncRe, (_m, inner: string) => {
    const loc = locationTag(rel, 1);
    count++;
    return `waCustom(${inner.trim()}, ${JSON.stringify(loc)}).href`;
  });

  // --- Pattern D: template literal with NO ?text (plain `https://wa.me/${PHONE}`)
  const tmplPlainRe = new RegExp(`\\\`https:\\/\\/wa\\.me\\/${PHONE_RE}\\\``, "g");
  src = src.replace(tmplPlainRe, () => {
    count++;
    return `waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", ${JSON.stringify(locationTag(rel, 1))}).href`;
  });

  if (count > 0) {
    src = ensureImport(src);
    writeFileSync(file, src);
  }
  return { file: rel, replacements: count };
}

function main() {
  const files = walk(SRC);
  const results: Result[] = [];
  let total = 0;
  for (const f of files) {
    const r = processFile(f);
    if (r.replacements > 0) {
      results.push(r);
      total += r.replacements;
    }
  }
  console.log(`Codemod complete. ${total} sites rewritten across ${results.length} files.\n`);
  for (const r of results) console.log(`  ${r.file}  (${r.replacements})`);
}

main();
