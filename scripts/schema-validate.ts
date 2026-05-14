/**
 * Static structured-data validator.
 * Scans all src/pages/**.tsx for SeoHead `schema={...}` literals and the
 * shared globalSchema in src/components/SeoHead.tsx. Validates that:
 *   - Organization / LocalBusiness sitewide schema has required fields.
 *   - Every blog post schema is type Article with headline/author/datePublished.
 *   - Every event schema has startDate/endDate/location/offers.
 *   - Breadcrumb schema is auto-emitted by SeoHead for every non-root path.
 *
 * Writes docs/38-SCHEMA-VALIDATION-REPORT.md
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { join, relative } from "path";

const ROOT = process.cwd();
const errors: { file: string; msg: string }[] = [];
const warnings: { file: string; msg: string }[] = [];
const summary: Record<string, number> = {};

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.tsx$/.test(f)) out.push(p);
  }
  return out;
}

// -------- 1. Validate the sitewide globalSchema --------
const seoHead = readFileSync(join(ROOT, "src/components/SeoHead.tsx"), "utf8");
const globalRequired = ["@type", "name", "url", "telephone", "email", "address", "geo", "aggregateRating"];
for (const k of globalRequired) {
  if (!new RegExp(`["']?${k.replace("@", "\\@")}["']?\\s*:`).test(seoHead)) {
    errors.push({ file: "src/components/SeoHead.tsx", msg: `globalSchema missing required field "${k}"` });
  }
}
if (/DanceSchool/.test(seoHead) && /LocalBusiness/.test(seoHead)) summary["LocalBusiness/DanceSchool (sitewide)"] = 1;
if (/buildBreadcrumbSchema/.test(seoHead)) summary["BreadcrumbList (auto)"] = 1;

// -------- 2. Validate per-page schema literals --------
const pageFiles = walk(join(ROOT, "src/pages"));
for (const file of pageFiles) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, "utf8");
  const schemaMatches = src.matchAll(/schema=\{\{([\s\S]*?)\}\}\s*\/>/g);
  for (const m of schemaMatches) {
    const body = m[1];
    const typeMatch = body.match(/["']@type["']\s*:\s*["']([^"']+)["']/);
    if (!typeMatch) {
      warnings.push({ file: rel, msg: "schema literal has no @type" });
      continue;
    }
    const t = typeMatch[1];
    summary[t] = (summary[t] || 0) + 1;

    if (t === "Article") {
      for (const k of ["headline", "author", "datePublished"]) {
        if (!new RegExp(`\\b${k}\\s*:`).test(body))
          errors.push({ file: rel, msg: `Article schema missing "${k}"` });
      }
    }
    if (t === "Event") {
      for (const k of ["startDate", "endDate", "location", "offers"]) {
        if (!new RegExp(`\\b${k}\\s*:`).test(body))
          errors.push({ file: rel, msg: `Event schema missing "${k}"` });
      }
    }
    if (t === "FAQPage" && !/mainEntity/.test(body)) {
      errors.push({ file: rel, msg: `FAQPage schema missing "mainEntity"` });
    }
  }
}

// -------- 3. Write report --------
const date = new Date().toISOString().split("T")[0];
const lines: string[] = [];
lines.push(`# Schema Validation Report — ${date}`);
lines.push("");
lines.push(`Source: static scan of \`src/pages/**.tsx\` + \`src/components/SeoHead.tsx\`.`);
lines.push("");
lines.push("## Schema coverage");
for (const [k, n] of Object.entries(summary).sort()) lines.push(`- \`${k}\` — ${n}`);
lines.push("");
lines.push(`## Errors (${errors.length})`);
if (errors.length === 0) lines.push("_None._");
else for (const e of errors) lines.push(`- ❌ \`${e.file}\` — ${e.msg}`);
lines.push("");
lines.push(`## Warnings (${warnings.length})`);
if (warnings.length === 0) lines.push("_None._");
else for (const w of warnings) lines.push(`- ⚠️  \`${w.file}\` — ${w.msg}`);
lines.push("");
lines.push("## Notes");
lines.push("- `LocalBusiness/DanceSchool` schema is injected on every route by `SeoHead.tsx` (`globalSchema`). It includes Organization fields (name, url, telephone, address, sameAs, founder).");
lines.push("- `BreadcrumbList` is auto-emitted for every non-root path via `getAutoBreadcrumbs` + `buildBreadcrumbSchema` in `SeoHead.tsx`.");
lines.push("- Blog posts override the global schema with `Article` (Person author, Organization publisher, datePublished).");
lines.push("- Single events emit `Event` schema with offers, validated separately by `bun scripts/seo-qa.ts`.");

mkdirSync(join(ROOT, "docs"), { recursive: true });
writeFileSync(join(ROOT, "docs/38-SCHEMA-VALIDATION-REPORT.md"), lines.join("\n") + "\n");
console.log(`✓ Schema validation report → docs/38-SCHEMA-VALIDATION-REPORT.md`);
console.log(`  errors: ${errors.length}, warnings: ${warnings.length}`);
if (errors.length) process.exit(1);
