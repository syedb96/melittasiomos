// Fix-up script for two issues left by codemod-wa-refactor.ts:
//   1. `import { waCustom } from "@/lib/whatsapp"` injected INSIDE a
//      multi-line `import {\n  ... \n} from` block (broken syntax).
//      → Move it just after the closing `}` of that block.
//   2. JSX attribute value `whatsappUrl=waCustom(...).href` missing braces.
//      → Wrap RHS in `{...}` when in a JSX attribute context.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      walk(p, out);
    } else if (/\.(tsx?|jsx?)$/.test(entry)) out.push(p);
  }
  return out;
}

let fixed = 0;
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  let src = readFileSync(file, "utf8");
  const before = src;

  // Fix 1: detect waCustom import that landed inside a multi-line import block.
  // A multi-line import looks like `import {\n  ... \n} from "...";`
  // If line "import { waCustom } from \"@/lib/whatsapp\";" appears BEFORE a
  // closing `} from "..."` without a matching opening `{` after it, move it.
  const lines = src.split("\n");
  const newLines: string[] = [];
  let pendingMove: string | null = null;
  let insideMultiImport = false;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    if (/^import\s*\{[^}]*$/.test(ln)) {
      // entering multi-line import
      insideMultiImport = true;
      newLines.push(ln);
      continue;
    }
    if (insideMultiImport && /^import\s*\{\s*waCustom\s*\}\s*from\s*["']@\/lib\/whatsapp["'];?\s*$/.test(ln)) {
      // misplaced — remember and skip; will re-emit after block closes
      pendingMove = ln;
      continue;
    }
    if (insideMultiImport && /\}\s*from\s*["'][^"']+["'];?\s*$/.test(ln)) {
      newLines.push(ln);
      insideMultiImport = false;
      if (pendingMove) {
        newLines.push(pendingMove);
        pendingMove = null;
      }
      continue;
    }
    newLines.push(ln);
  }
  src = newLines.join("\n");

  // Fix 2: JSX attribute  `name=waCustom(...).href` → `name={waCustom(...).href}`
  // Match: word=waCustom(...).href (ending before space or > or newline)
  src = src.replace(
    /([A-Za-z_][\w-]*)=waCustom\(([\s\S]*?)\)\.href(?=[\s/>])/g,
    "$1={waCustom($2).href}",
  );

  if (src !== before) {
    writeFileSync(file, src);
    fixed++;
    console.log(`fixed ${rel}`);
  }
}
console.log(`\n${fixed} files patched.`);
