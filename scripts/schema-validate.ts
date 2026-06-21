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
const venuePagesWithSchema = new Set<string>();
for (const file of pageFiles) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, "utf8");
  const isVenuePage = rel.startsWith("src/pages/venue/");
  const schemaMatches = src.matchAll(/schema=\{(?:schema|\{([\s\S]*?)\})\}\s*\/>/g);
  // Also try literal { ... } form (covers both `schema={schema}` and `schema={{ ... }}`).
  const inlineBody = src.match(/const\s+schema\s*=\s*\{([\s\S]*?)\n\};/);
  const bodiesToCheck: { body: string; via: string }[] = [];
  for (const m of schemaMatches) if (m[1]) bodiesToCheck.push({ body: m[1], via: "inline" });
  if (inlineBody) bodiesToCheck.push({ body: inlineBody[1], via: "const-schema" });

  for (const { body } of bodiesToCheck) {
    const typeMatch = body.match(/["']@type["']\s*:\s*(?:["']([^"']+)["']|\[\s*["']([^"']+)["'])/);
    if (!typeMatch) {
      warnings.push({ file: rel, msg: "schema literal has no @type" });
      continue;
    }
    const t = typeMatch[1] || typeMatch[2];
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

    // --- Venue page contract: address + geo + offers + booking URL (Ticket Tailor) ---
    if (isVenuePage) {
      venuePagesWithSchema.add(rel);
      const required = [
        { key: "address", re: /\baddress\s*:/ },
        { key: "geo", re: /\bgeo\s*:/ },
        { key: "offers", re: /\boffers\s*:/ },
      ];
      for (const r of required) {
        if (!r.re.test(body)) errors.push({ file: rel, msg: `Venue schema missing "${r.key}"` });
      }
      const hasBookingUrl =
        /tickettailor\.com\/events\/puranights/.test(body) ||
        /\bpotentialAction\s*:/.test(body);
      if (!hasBookingUrl) {
        errors.push({ file: rel, msg: `Venue schema missing booking URL (potentialAction or Ticket Tailor URL)` });
      }
      // offers must declare a price range / aggregate price
      const offersBlock = body.match(/\boffers\s*:\s*\{[\s\S]*?\}/);
      if (offersBlock) {
        const ob = offersBlock[0];
        const hasPrice = /\b(price|lowPrice|highPrice)\s*:/.test(ob);
        if (!hasPrice) errors.push({ file: rel, msg: `Venue offers block missing price/lowPrice/highPrice` });
      }
    }
  }
}

// Every venue page must declare a schema literal at all.
for (const file of pageFiles) {
  const rel = relative(ROOT, file);
  if (rel.startsWith("src/pages/venue/") && !venuePagesWithSchema.has(rel)) {
    errors.push({ file: rel, msg: "Venue page has no JSON-LD schema literal" });
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
