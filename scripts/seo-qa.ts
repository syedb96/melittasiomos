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
import { upcomingEvents, buildEventSchema } from "../src/data/events";
import { existsSync } from "fs";

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
  { path: "/corporate-dance-classes-london", priority: 0.9, changefreq: "monthly" },
  { path: "/private-group-dance-parties-london", priority: 0.9, changefreq: "monthly" },
  { path: "/partner-with-pura-nights", priority: 0.8, changefreq: "monthly" },
  { path: "/latin-night-out-west-london", priority: 0.8, changefreq: "monthly" },
  { path: "/salsa-bachata-classes-covent-garden", priority: 0.9, changefreq: "monthly" },
  { path: "/pura-ladies-covent-garden", priority: 0.8, changefreq: "monthly" },
  { path: "/best-salsa-bachata-classes-west-london", priority: 0.9, changefreq: "monthly" },
];

// ---------- Auto-discovered routes ----------
// Routes parsed from src/App.tsx are merged into the sitemap so that adding
// a new <Route path="..."> (e.g. a blog post) automatically appears without
// having to also edit STATIC_ROUTES.
const AUTO_EXCLUDE = new Set<string>([
  "/online-classes",          // 301 → /online-salsa-bachata-coaching
  "/salsa-classes-acton-local", // 301 → /salsa-classes-acton
  "/shop", "/size-guide", "/shipping-returns",
  "/lookbook",
  "/refer", "/all-pages-master", "/proof-centre",
  "/login", "/thank-you",
  "/admin", "/admin/dashboard",
]);
function isExcluded(p: string): boolean {
  if (!p.startsWith("/")) return true;           // wildcards like "*"
  if (AUTO_EXCLUDE.has(p)) return true;
  if (p.startsWith("/admin")) return true;       // any admin/* path
  if (p.startsWith("/lookbook/")) return true;
  if (p.startsWith("/shop/")) return true;
  if (p.includes(":")) return true;              // dynamic route placeholders
  return false;
}
function priorityFor(p: string): { priority: number; changefreq: string } {
  if (p.startsWith("/blog/")) return { priority: 0.6, changefreq: "monthly" };
  if (p.startsWith("/venue/")) return { priority: 0.7, changefreq: "monthly" };
  if (p.startsWith("/learn/")) return { priority: 0.7, changefreq: "monthly" };
  return { priority: 0.7, changefreq: "monthly" };
}
function discoverRoutesFromApp(): { path: string; priority: number; changefreq: string }[] {
  const appPath = join(ROOT, "src/App.tsx");
  const src = readFileSync(appPath, "utf8");
  const re = /<Route\s+path=["']([^"']+)["']/g;
  const found = new Set<string>();
  for (const m of src.matchAll(re)) found.add(m[1]);
  const staticPaths = new Set(STATIC_ROUTES.map(r => r.path));
  const extra: { path: string; priority: number; changefreq: string }[] = [];
  for (const p of found) {
    if (staticPaths.has(p)) continue;
    if (isExcluded(p)) continue;
    extra.push({ path: p, ...priorityFor(p) });
  }
  return extra.sort((a, b) => a.path.localeCompare(b.path));
}

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

  // Validate every single-event entry — schema fields, Offer hygiene, OG image, status rules.
  const ALLOWED_AVAIL = new Set([
    "https://schema.org/InStock",
    "https://schema.org/SoldOut",
    "https://schema.org/PreOrder",
    "https://schema.org/Discontinued",
    "https://schema.org/LimitedAvailability",
  ]);
  const ALLOWED_CONDITION = new Set([
    "https://schema.org/NewCondition",
    "https://schema.org/UsedCondition",
    "https://schema.org/RefurbishedCondition",
    "https://schema.org/DamagedCondition",
  ]);
  const ALLOWED_STATUS = new Set([
    "EventScheduled", "EventPostponed", "EventCancelled", "EventRescheduled",
  ]);

  for (const ev of upcomingEvents) {
    const tag = `[EVENT-DATA:${ev.slug}]`;
    if (!ev.startDate || !ev.endDate) errors.push(`${tag} missing startDate/endDate.`);
    const isoRe = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
    if (!isoRe.test(ev.startDate)) errors.push(`${tag} startDate not ISO-8601 with offset: ${ev.startDate}`);
    if (!isoRe.test(ev.endDate)) errors.push(`${tag} endDate not ISO-8601 with offset: ${ev.endDate}`);
    if (new Date(ev.endDate) <= new Date(ev.startDate)) errors.push(`${tag} endDate must be after startDate.`);
    if (!ALLOWED_STATUS.has(ev.status)) errors.push(`${tag} invalid status: ${ev.status}`);

    // previousStartDate required when Postponed/Rescheduled.
    if ((ev.status === "EventPostponed" || ev.status === "EventRescheduled") && !ev.previousStartDate) {
      errors.push(`${tag} status=${ev.status} requires previousStartDate.`);
    }

    // Per-event OG image must exist on disk (under public/og/events/).
    const ogPath = join(ROOT, "public/og/events", `${ev.slug}.jpg`);
    if (!existsSync(ogPath)) {
      warnings.push(`[OG-IMAGE] ${ev.slug}: missing per-event OG card at public/og/events/${ev.slug}.jpg`);
    }

    // Validate the produced JSON-LD object directly.
    const schema = buildEventSchema(ev) as any;
    const offer = schema.offers;
    if (!offer) {
      errors.push(`${tag} schema missing offers.`);
    } else {
      if (!ALLOWED_AVAIL.has(offer.availability)) errors.push(`${tag} offer.availability not allowed: ${offer.availability}`);
      if (!ALLOWED_CONDITION.has(offer.itemCondition)) errors.push(`${tag} offer.itemCondition not allowed: ${offer.itemCondition}`);
      if (!offer.category) errors.push(`${tag} offer.category missing.`);
      if (!/^\d+(\.\d{2})?$/.test(offer.price)) errors.push(`${tag} offer.price must be decimal string e.g. "15.00" (got ${offer.price}).`);
      if (offer.priceCurrency !== "GBP") errors.push(`${tag} offer.priceCurrency must be GBP.`);
      if (!offer.validThrough || !isoRe.test(offer.validThrough)) errors.push(`${tag} offer.validThrough must equal endDate ISO.`);
    }

    // Cancelled events SHOULD NOT remain in active sitemap rotation.
    if (ev.status === "EventCancelled" && new Date(ev.startDate).getTime() > Date.now()) {
      warnings.push(`${tag} cancelled future event will be excluded from sitemap.`);
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

  // Auto-discovered routes (blog posts, venue pages, locality pages added later).
  const autoRoutes = discoverRoutesFromApp();
  for (const r of autoRoutes) push(r.path, today, r.changefreq, r.priority);

  // Single-event pages — only future, non-cancelled events (rich-result safe).
  const now = Date.now();
  for (const ev of upcomingEvents) {
    if (ev.status === "EventCancelled") continue;
    if (new Date(ev.startDate).getTime() > now) {
      push(`/events/${ev.slug}`, ev.startDate.split("T")[0], "weekly", 0.7);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Auto-generated by scripts/seo-qa.ts — single host: ${HOST} -->
  <!-- Excluded: /online-classes (301→/online-salsa-bachata-coaching), /salsa-classes-acton-local (301→/salsa-classes-acton), /shop /size-guide /shipping-returns /lookbook* (noindex until product photos), /admin/*, /refer, /all-pages-master, /proof-centre -->
${urls.join("\n")}
</urlset>
`;
  writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
  console.log(`✓ sitemap.xml regenerated with ${urls.length} URLs (host: ${HOST})`);

  // Keep robots.txt Sitemap directive aligned with the chosen canonical host.
  const robotsPath = join(ROOT, "public/robots.txt");
  if (existsSync(robotsPath)) {
    const robots = readFileSync(robotsPath, "utf8");
    const desired = `Sitemap: ${HOST}/sitemap.xml`;
    const updated = robots.match(/^Sitemap:.*$/m)
      ? robots.replace(/^Sitemap:.*$/m, desired)
      : robots.trimEnd() + `\n\n${desired}\n`;
    if (updated !== robots) {
      writeFileSync(robotsPath, updated);
      console.log(`✓ robots.txt Sitemap directive synced → ${HOST}/sitemap.xml`);
    }
  }
}

// ---------- Internal link / orphan validation (doc 18) ----------
// For every indexable route in STATIC_ROUTES, count inbound link references
// across all .tsx/.ts source files. Each route must have ≥2 inbound references.
function checkOrphans() {
  const allFiles = [
    ...walk(join(ROOT, "src/pages")),
    ...walk(join(ROOT, "src/components")),
  ];
  const sources = allFiles.map(f => readFileSync(f, "utf8")).join("\n\n");
  for (const r of STATIC_ROUTES) {
    if (r.path === "/") continue; // homepage is the root, skip
    // match to="/path" or href="/path" or "/path" inside link arrays
    const escaped = r.path.replace(/\//g, "\\/");
    const re = new RegExp(`["'\`]${escaped}["'\`/?#]`, "g");
    const inbound = (sources.match(re) || []).length;
    if (inbound < 2) {
      warnings.push(`[ORPHAN] ${r.path} has only ${inbound} inbound internal link(s); add at least 2 (header/footer/related).`);
    }
  }
}

// ---------- Run ----------
check();
checkOrphans();

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
