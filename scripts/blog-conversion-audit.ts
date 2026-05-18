#!/usr/bin/env tsx
/**
 * Blog Conversion Audit
 * Scans src/pages/blog/*.tsx for SEO + conversion requirements.
 * Produces a pass/fail table that feeds docs/54-BLOG-CONVERSION-AUDIT.md.
 *
 * Checks per post:
 *  - <SeoHead/> present
 *  - Article schema (`"@type": "Article"`)
 *  - canonical path passed to SeoHead
 *  - >= 2 internal <Link to="/..."> links
 *  - mid-article CTA (any inline CTA block / btn-cta-* / WhatsApp anchor)
 *  - bottom money CTA (BlogMoneyCTA OR BlogCTA OR explicit money block)
 *  - related posts/pages (RelatedPages / RelatedArticles / Related Articles)
 */
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src/pages/blog");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));

type Row = {
  file: string;
  seoHead: boolean;
  schema: boolean;
  canonical: boolean;
  internalLinks: number;
  midCta: boolean;
  bottomCta: boolean;
  related: boolean;
};

const rows: Row[] = files.map((f) => {
  const src = fs.readFileSync(path.join(dir, f), "utf8");
  const internalLinks = (src.match(/<Link\s+to="\//g) || []).length;
  return {
    file: f,
    seoHead: /<SeoHead\b/.test(src),
    schema: /"@type":\s*"Article"/.test(src),
    canonical: /<SeoHead[\s\S]*?path=/.test(src),
    internalLinks,
    midCta: /btn-cta-|wa\.me\/447449482343|tickettailor\.com|BlogCTA|BlogMoneyCTA/.test(src),
    bottomCta: /BlogMoneyCTA|BlogCTA|wa\.me\/447449482343|tickettailor\.com/.test(src),
    related: /RelatedPages|RelatedArticles|Related Articles/.test(src),
  };
});

const pass = (r: Row) =>
  r.seoHead && r.schema && r.canonical && r.internalLinks >= 2 && r.midCta && r.bottomCta && r.related;

const passing = rows.filter(pass).length;
console.log(`\nBlog Conversion Audit — ${passing}/${rows.length} posts pass all checks\n`);

const fmt = (b: boolean) => (b ? "✅" : "❌");
console.log("| File | SEO | Schema | Canon | Links | Mid | Bottom | Related | PASS |");
console.log("|---|---|---|---|---|---|---|---|---|");
for (const r of rows) {
  console.log(
    `| ${r.file} | ${fmt(r.seoHead)} | ${fmt(r.schema)} | ${fmt(r.canonical)} | ${r.internalLinks} | ${fmt(r.midCta)} | ${fmt(r.bottomCta)} | ${fmt(r.related)} | ${fmt(pass(r))} |`,
  );
}

const fails = rows.filter((r) => !pass(r));
if (fails.length) {
  console.log(`\n${fails.length} posts need attention:`);
  for (const r of fails) {
    const missing: string[] = [];
    if (!r.seoHead) missing.push("SeoHead");
    if (!r.schema) missing.push("Article schema");
    if (!r.canonical) missing.push("canonical path");
    if (r.internalLinks < 2) missing.push(`only ${r.internalLinks} internal links`);
    if (!r.midCta) missing.push("mid-article CTA");
    if (!r.bottomCta) missing.push("bottom money CTA");
    if (!r.related) missing.push("Related posts");
    console.log(` - ${r.file}: ${missing.join(", ")}`);
  }
  process.exitCode = 0; // report-only
}
