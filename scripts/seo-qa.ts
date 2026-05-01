/**
 * SEO / Structured-data QA & sitemap generator.
 *
 * Run with:  bun scripts/seo-qa.ts            # validate + generate
 *            bun scripts/seo-qa.ts --check    # validate only (CI / pre-deploy)
 *
 * Checks:
 *  1. Every Event JSON-LD has startDate, endDate, location, offers.
 *  2. Recurring schedule pages (RECURRING_PAGES) NEVER emit Event schema.
 *  3. Every <SeoHead path="..."> uses a hyphenated lowercase path.
 *  4. Sitemap + SeoHead canonicals all use the single chosen host (www).
 *
 * Generates:
 *  - public/sitemap.xml   (regenerated from ROUTES, www host enforced)
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = process.cwd();
const HOST = "https://www.puranights.com";
const CHECK_ONLY = process.argv.includes("--check");

// ---------- Pages where Event JSON-LD is FORBIDDEN ----------
// Recurring schedule pages must use DanceSchool/LocalBusiness fallback.
const RECURRING_PAGES = [
  "src/pages/PuraNights.tsx",
  "src/pages/Schedule.tsx",
  "src/pages/BachataClassesChiswick.tsx",
  "src/pages/DanceClassesChiswick.tsx",
  "src/pages/SalsaClassesChiswick.tsx",
  "src/pages/SalsaClassesEaling.tsx",
  "src/pages/BachataClassesEaling.tsx",
];

// ---------- Sitemap routes (single source of truth) ----------
import { upcomingEvents } from "../src/data/events";

const STATIC_ROUTES: { path: string; priority?: number; changefreq?: string }[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.9, changefreq: "monthly" },
  { path: "/pura-nights", priority: 0.9, changefreq: "weekly" },
  { path: "/pura-ladies", priority: 0.9, changefreq: "monthly" },
  { path: "/prices", priority: 0.9, changefreq: "monthly" },
  { path: "/events", priority: 0.9, changefreq: "weekly" },
  { path: "/contact", priority: 0.9, changefreq: "monthly" },
  { path: "/wedding-dance", priority: 0.9, changefreq: "monthly" },
  { path: "/private-lessons", priority: 0.9, changefreq: "monthly" },
  { path: "/gift-vouchers", priority: 0.8, changefreq: "monthly" },
  { path: "/gallery", priority: 0.8, changefreq: "monthly" },
  { path: "/testimonials", priority: 0.8, changefreq: "monthly" },
  { path: "/faq", priority: 0.8, changefreq: "monthly" },
  { path: "/blog", priority: 0.8, changefreq: "weekly" },
  { path: "/start-here", priority: 0.8, changefreq: "monthly" },
  { path: "/locations", priority: 0.8, changefreq: "monthly" },
  { path: "/online-salsa-bachata-coaching", priority: 0.8, changefreq: "monthly" },
  { path: "/online-academy", priority: 0.9, changefreq: "weekly" },
  { path: "/beginners", priority: 0.8, changefreq: "monthly" },
  { path: "/schedule", priority: 0.7, changefreq: "weekly" },
  { path: "/meet-the-team", priority: 0.8, changefreq: "monthly" },
  { path: "/bookings", priority: 0.7, changefreq: "monthly" },
];

// ---------- Helpers ----------
const errors: string[] = [];
const warnings: string[] = [];

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(f)) out.push(p);
  }
  return out;
}

function check() {
  const files = walk(join(ROOT, "src/pages"));

  // 1 + 2: scan for Event schema usage
  for (const file of files) {
    const rel = relative(ROOT, file);
    const src = readFileSync(file, "utf8");
    const hasEventType = /["']@type["']\s*:\s*["']Event["']/.test(src);

    if (hasEventType) {
      // Recurring page guard
      if (RECURRING_PAGES.includes(rel)) {
        errors.push(`[FORBIDDEN] ${rel} emits Event JSON-LD on a recurring schedule page. Use single-event pages under /events/:slug instead.`);
      }
      // Required fields
      const requireField = (name: string) => {
        if (!new RegExp(`["']${name}["']\\s*:`).test(src)) {
          errors.push(`[INVALID-EVENT] ${rel} has Event schema but is missing required field "${name}".`);
        }
      };
      requireField("startDate");
      requireField("endDate");
      requireField("location");
      requireField("offers");
    }

    // 3: canonical path hygiene on SeoHead
    const pathMatches = src.matchAll(/<SeoHead[\s\S]*?path=["']([^"']+)["']/g);
    for (const m of pathMatches) {
      const p = m[1];
      if (p !== "/" && !/^\/[a-z0-9\-/:]+$/.test(p.replace(/:[a-zA-Z]+/g, "x"))) {
        warnings.push(`[PATH] ${rel} has non-canonical path "${p}" (use lowercase, hyphenated).`);
      }
    }

    // 4: hardcoded non-www hosts
    if (/https:\/\/puranights\.com/.test(src) && !/www\.puranights\.com/.test(src)) {
      warnings.push(`[HOST] ${rel} contains apex host link; canonical host is ${HOST}.`);
    }
  }

  // Validate every single-event entry has required schema fields.
  for (const ev of upcomingEvents) {
    if (!ev.startDate || !ev.endDate) {
      errors.push(`[EVENT-DATA] ${ev.slug} missing startDate/endDate.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(ev.startDate)) {
      errors.push(`[EVENT-DATA] ${ev.slug} startDate not ISO-8601 with offset: ${ev.startDate}`);
    }
  }
}

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];
  const urls: string[] = [];
  const push = (path: string, lastmod = today, changefreq = "monthly", priority = 0.7) => {
    if (!path.startsWith("/")) throw new Error(`Path must start with /: ${path}`);
    urls.push(`  <url><loc>${HOST}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority.toFixed(1)}</priority></url>`);
  };

  for (const r of STATIC_ROUTES) push(r.path, today, r.changefreq, r.priority);

  // Single-event pages — only future events (rich-result safe).
  const now = Date.now();
  for (const ev of upcomingEvents) {
    if (new Date(ev.startDate).getTime() > now) {
      push(`/events/${ev.slug}`, ev.startDate.split("T")[0], "weekly", 0.7);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Auto-generated by scripts/seo-qa.ts — single host: ${HOST} -->
  <!-- Excluded: /online-classes (301→/online-salsa-bachata-coaching), /shop /size-guide /shipping-returns /lookbook* (noindex until product photos), /admin/*, /refer, /all-pages-master, /proof-centre -->
${urls.join("\n")}
</urlset>
`;
  writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
  console.log(`✓ sitemap.xml regenerated with ${urls.length} URLs (host: ${HOST})`);
}

// ---------- Run ----------
check();

if (errors.length) {
  console.error("\n❌ SEO QA FAILED\n");
  for (const e of errors) console.error(" • " + e);
  if (warnings.length) {
    console.warn("\n⚠️  Warnings:");
    for (const w of warnings) console.warn(" • " + w);
  }
  process.exit(1);
}

if (warnings.length) {
  console.warn("⚠️  SEO QA warnings:");
  for (const w of warnings) console.warn(" • " + w);
}

console.log(`✓ SEO QA passed (${RECURRING_PAGES.length} recurring pages guarded, ${upcomingEvents.length} single-event entries validated)`);

if (!CHECK_ONLY) generateSitemap();
