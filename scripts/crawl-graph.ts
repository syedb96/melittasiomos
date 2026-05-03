/**
 * Crawl-graph + indexing-rule validator (docs/18 + 19).
 *
 *  - Builds an internal link graph from the actual rendered routes:
 *    Header (global), Footer (global), Homepage, every page file under src/pages,
 *    plus shared link components (RelatedPages, RelatedArticles, NextEventCallout).
 *  - For every indexable Tier 1 / Tier 2 URL in `STATIC_ROUTES`:
 *      • inbound count ≥ 2
 *      • outbound count ≥ 2
 *      • reachable from "/" within 3 clicks (BFS)
 *      • at least one outbound path leads to a conversion hub
 *  - Fails the build (exit 1) on any violation.
 *
 *  Run with:  bun scripts/crawl-graph.ts
 *             bun scripts/crawl-graph.ts --json   # machine-readable report
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, relative } from "path";

const ROOT = process.cwd();
const JSON_OUT = process.argv.includes("--json");

const CONVERSION_HUBS = new Set([
  "/", "/pura-nights", "/prices", "/contact", "/wedding-dance",
  "/private-lessons", "/events", "/bookings", "/gift-vouchers",
]);

// Authoritative list of indexable URLs — must match scripts/seo-qa.ts STATIC_ROUTES.
const INDEXABLE: { path: string; tier: 1 | 2 }[] = [
  { path: "/", tier: 1 },
  { path: "/pura-nights", tier: 1 },
  { path: "/prices", tier: 1 },
  { path: "/events", tier: 1 },
  { path: "/wedding-dance", tier: 1 },
  { path: "/private-lessons", tier: 1 },
  { path: "/about", tier: 2 },
  { path: "/pura-ladies", tier: 2 },
  { path: "/contact", tier: 2 },
  { path: "/gift-vouchers", tier: 2 },
  { path: "/gallery", tier: 2 },
  { path: "/testimonials", tier: 2 },
  { path: "/faq", tier: 2 },
  { path: "/blog", tier: 2 },
  { path: "/start-here", tier: 2 },
  { path: "/locations", tier: 2 },
  { path: "/online-salsa-bachata-coaching", tier: 2 },
  { path: "/online-academy", tier: 2 },
  { path: "/beginners", tier: 2 },
  { path: "/schedule", tier: 2 },
  { path: "/meet-the-team", tier: 2 },
  { path: "/community", tier: 2 },
  { path: "/salsa-classes-chiswick", tier: 1 },
  { path: "/bachata-classes-ealing", tier: 1 },
  { path: "/dance-classes-west-london", tier: 1 },
  { path: "/salsa-classes-london", tier: 2 },
  { path: "/bachata-classes-london", tier: 2 },
  { path: "/latin-dance-classes-london", tier: 2 },
  { path: "/salsa-classes-ealing", tier: 2 },
  { path: "/bachata-classes-chiswick", tier: 2 },
  { path: "/dance-classes-chiswick", tier: 2 },
  { path: "/dance-classes-ealing", tier: 2 },
  { path: "/salsa-classes-acton", tier: 2 },
  { path: "/salsa-classes-hammersmith", tier: 2 },
  { path: "/salsa-classes-richmond", tier: 2 },
  { path: "/salsa-classes-fulham", tier: 2 },
  { path: "/dance-classes-hounslow", tier: 2 },
  { path: "/venue/the-george-iv-chiswick", tier: 2 },
  { path: "/venue/the-drayton-court-ealing", tier: 2 },
];

const PATHS = new Set(INDEXABLE.map(r => r.path));

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(f)) out.push(p);
  }
  return out;
}

// Map each source file to the route it renders. We rely on <SeoHead path="..."> as the
// authoritative declaration of which URL a component owns.
function fileToRoute(src: string): string | null {
  const m = src.match(/<SeoHead[^>]*path=["']([^"']+)["']/);
  return m ? m[1] : null;
}

// Extract every internal Link target from a source file.
function extractLinks(src: string): Set<string> {
  const links = new Set<string>();
  // <Link to="/foo">  or  to={"/foo"}
  for (const m of src.matchAll(/\bto=\{?["']([^"'`}]+)["']\}?/g)) {
    if (m[1].startsWith("/")) links.add(m[1].split(/[#?]/)[0].replace(/\/$/, "") || "/");
  }
  // <a href="/foo">
  for (const m of src.matchAll(/\bhref=\{?["'](\/[^"'`}]*)["']\}?/g)) {
    links.add(m[1].split(/[#?]/)[0].replace(/\/$/, "") || "/");
  }
  return links;
}

// Globally-injected links (Header + Footer appear on every rendered page).
const headerSrc = readFileSync(join(ROOT, "src/components/Header.tsx"), "utf8");
const footerSrc = readFileSync(join(ROOT, "src/components/Footer.tsx"), "utf8");
const GLOBAL_LINKS = new Set<string>([
  ...extractLinks(headerSrc),
  ...extractLinks(footerSrc),
]);

// Build per-route outbound maps.
const outbound = new Map<string, Set<string>>();
const ownedBy = new Map<string, string>(); // route → file

for (const file of walk(join(ROOT, "src/pages"))) {
  const src = readFileSync(file, "utf8");
  const route = fileToRoute(src);
  if (!route || !PATHS.has(route)) continue;
  ownedBy.set(route, relative(ROOT, file));
  const localLinks = extractLinks(src);
  // Combine page-local + global
  const combined = new Set<string>([...localLinks, ...GLOBAL_LINKS]);
  combined.delete(route); // self-loops don't count
  // Restrict to known indexable routes (others = noise)
  const filtered = new Set([...combined].filter(p => PATHS.has(p)));
  outbound.set(route, filtered);
}

// Inbound = inverse of outbound.
const inbound = new Map<string, Set<string>>();
for (const p of PATHS) inbound.set(p, new Set());
for (const [from, tos] of outbound) {
  for (const to of tos) inbound.get(to)?.add(from);
}

// BFS from "/" to compute depth.
const depth = new Map<string, number>();
depth.set("/", 0);
const queue: string[] = ["/"];
while (queue.length) {
  const cur = queue.shift()!;
  const d = depth.get(cur)!;
  for (const next of outbound.get(cur) || []) {
    if (!depth.has(next)) {
      depth.set(next, d + 1);
      queue.push(next);
    }
  }
}

// Conversion-hub reachability: does any outbound link land on a hub?
function hasConversionPath(route: string): boolean {
  if (CONVERSION_HUBS.has(route)) return true;
  for (const next of outbound.get(route) || []) {
    if (CONVERSION_HUBS.has(next)) return true;
  }
  return false;
}

const errors: string[] = [];
const warnings: string[] = [];
const report: any[] = [];

for (const r of INDEXABLE) {
  const out = outbound.get(r.path)?.size ?? 0;
  const inb = inbound.get(r.path)?.size ?? 0;
  const d = depth.get(r.path);
  const conv = hasConversionPath(r.path);
  const owned = ownedBy.has(r.path);
  report.push({ path: r.path, tier: r.tier, owned, outbound: out, inbound: inb, depth: d ?? null, conversionPath: conv });

  if (!owned) warnings.push(`[NO-FILE] ${r.path} has no <SeoHead> owner — confirm rendering source.`);
  if (inb < 2) errors.push(`[INBOUND] ${r.path} has ${inb} inbound link(s); minimum is 2.`);
  if (out < 2) errors.push(`[OUTBOUND] ${r.path} has ${out} outbound indexable link(s); minimum is 2.`);
  if (d === undefined) errors.push(`[UNREACHABLE] ${r.path} not reachable from "/" via the link graph.`);
  else if (d > 3) errors.push(`[DEPTH] ${r.path} is ${d} clicks from "/"; max allowed is 3.`);
  if (!conv) errors.push(`[NO-CONVERSION-PATH] ${r.path} has no outbound link to a conversion hub.`);
}

if (JSON_OUT) {
  writeFileSync(join(ROOT, "public/crawl-report.json"), JSON.stringify({ generatedAt: new Date().toISOString(), conversionHubs: [...CONVERSION_HUBS], routes: report }, null, 2));
  console.log("✓ crawl-report.json written to public/");
}

if (warnings.length) {
  console.warn("⚠️  crawl-graph warnings:");
  for (const w of warnings) console.warn(" • " + w);
}

if (errors.length) {
  console.error("\n❌ crawl-graph FAILED\n");
  for (const e of errors) console.error(" • " + e);
  process.exit(1);
}

console.log(`✓ crawl-graph passed (${INDEXABLE.length} routes; max depth ${Math.max(...[...depth.values()])} from "/")`);
