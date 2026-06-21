/**
 * Venue-page coverage check.
 *
 * For every active row in commerce_venues, asserts that:
 *   1. A page in src/pages/venue/ references <VenueDetails slug="<venue.slug>" ...>.
 *   2. That same page contains at least one <BookingLink slug="...">.
 *   3. That same page contains at least one <Price slug="...">.
 *
 * This is the static contract that the public site renders a bookable, priced
 * page for every venue an admin has activated. Exits non-zero on any miss so
 * the CI build blocks merges.
 *
 * Run:   bun scripts/venue-page-coverage.ts
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

const walk = (dir: string, out: string[] = []): string[] => {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "node_modules") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(name)) out.push(full);
  }
  return out;
};

const VENUE_RE = /<VenueDetails\b[^>]*?\bslug=["']([^"']+)["']/gs;
const BOOKING_RE = /<BookingLink\b[^>]*?\bslug=["']([^"']+)["']/gs;
const PRICE_RE = /<Price\b[^>]*?\bslug=["']([^"']+)["']/gs;

const main = async () => {
  const { data: venues, error } = await supabase
    .from("commerce_venues")
    .select("slug, name, is_active")
    .eq("is_active", true);
  if (error) throw error;
  if (!venues?.length) {
    console.log("No active venues configured — nothing to check.");
    return;
  }

  const files = walk("src/pages/venue");
  const pageBySlug = new Map<string, { file: string; src: string }>();
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    let m: RegExpExecArray | null;
    const local = new RegExp(VENUE_RE.source, VENUE_RE.flags);
    while ((m = local.exec(src)) !== null) {
      pageBySlug.set(m[1], { file: f, src });
    }
  }

  const fail: string[] = [];
  for (const v of venues) {
    const page = pageBySlug.get(v.slug);
    if (!page) {
      fail.push(`Venue "${v.slug}" (${v.name}) has no page rendering <VenueDetails slug="${v.slug}">`);
      continue;
    }
    const hasBooking = new RegExp(BOOKING_RE.source, BOOKING_RE.flags).test(page.src);
    const hasPrice = new RegExp(PRICE_RE.source, PRICE_RE.flags).test(page.src);
    if (!hasBooking) fail.push(`Venue "${v.slug}" page ${page.file} is missing a <BookingLink slug="…">`);
    if (!hasPrice) fail.push(`Venue "${v.slug}" page ${page.file} is missing a <Price slug="…">`);
  }

  console.log(`Checked ${venues.length} active venue(s) against ${files.length} page file(s).`);
  if (fail.length) {
    console.error(`\n✖ ${fail.length} venue coverage failure(s):`);
    for (const f of fail) console.error("  " + f);
    process.exit(1);
  }
  console.log("✓ Every active venue has a page with a booking link and a displayed price.");
};

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
