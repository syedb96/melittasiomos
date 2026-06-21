/**
 * Commerce slug existence linter.
 *
 * Scans src/ for every <Price slug="..."> and <BookingLink slug="..."> reference
 * and verifies each slug exists (and is_active) in the commerce_prices /
 * commerce_booking_links tables.
 *
 * Run:   bun scripts/commerce-slug-lint.ts
 * Exits non-zero if any slug is missing or inactive.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY in env.");
  process.exit(2);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRICE_RE = /<Price\s+[^>]*slug=["']([^"']+)["']/g;
const BOOKING_RE = /<BookingLink\s+[^>]*slug=["']([^"']+)["']/g;
const VENUE_RE = /<VenueDetails\s+[^>]*slug=["']([^"']+)["']/g;

interface Hit {
  slug: string;
  file: string;
  line: number;
}

const walk = (dir: string, out: string[] = []): string[] => {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "node_modules") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?|mdx?)$/.test(name)) out.push(full);
  }
  return out;
};

const scan = (file: string, re: RegExp): Hit[] => {
  const src = readFileSync(file, "utf8");
  const hits: Hit[] = [];
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const local = new RegExp(re.source, "g");
    let m: RegExpExecArray | null;
    while ((m = local.exec(line)) !== null) {
      hits.push({ slug: m[1], file, line: i + 1 });
    }
  }
  return hits;
};

const main = async () => {
  const files = walk("src");
  const priceHits: Hit[] = [];
  const bookingHits: Hit[] = [];
  for (const f of files) {
    priceHits.push(...scan(f, PRICE_RE));
    bookingHits.push(...scan(f, BOOKING_RE));
  }

  const priceSlugs = [...new Set(priceHits.map((h) => h.slug))];
  const bookingSlugs = [...new Set(bookingHits.map((h) => h.slug))];

  const [{ data: prices }, { data: links }] = await Promise.all([
    supabase.from("commerce_prices").select("slug, is_active").in("slug", priceSlugs),
    supabase.from("commerce_booking_links").select("slug, is_active").in("slug", bookingSlugs),
  ]);

  const livePrices = new Set((prices ?? []).filter((r) => r.is_active).map((r) => r.slug));
  const liveLinks = new Set((links ?? []).filter((r) => r.is_active).map((r) => r.slug));

  const fail: string[] = [];
  for (const h of priceHits) {
    if (!livePrices.has(h.slug)) fail.push(`MISSING <Price slug="${h.slug}"> at ${h.file}:${h.line}`);
  }
  for (const h of bookingHits) {
    if (!liveLinks.has(h.slug)) fail.push(`MISSING <BookingLink slug="${h.slug}"> at ${h.file}:${h.line}`);
  }

  console.log(`Scanned ${files.length} files`);
  console.log(`  ${priceHits.length} <Price> usages across ${priceSlugs.length} distinct slugs`);
  console.log(`  ${bookingHits.length} <BookingLink> usages across ${bookingSlugs.length} distinct slugs`);

  if (fail.length) {
    console.error(`\n✖ ${fail.length} broken reference(s):`);
    for (const f of fail) console.error("  " + f);
    process.exit(1);
  }
  console.log("\n✓ All commerce slugs resolve to active rows.");
};

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
