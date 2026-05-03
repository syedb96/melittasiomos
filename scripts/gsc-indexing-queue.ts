/**
 * GSC daily indexing queue.
 *
 *  - Reads Tier 1 routes from docs/19-INDEXING-PRIORITY-LIST.md (mirrored below).
 *  - Reads previous queue state from .cache/indexing-queue.json (created on first run).
 *  - Detects "changed since last submission" by hashing the page source files that own each route.
 *  - De-duplicates against a 7-day cooldown window (per docs/20-GSC-GROWTH-PLAYBOOK.md).
 *  - Caps daily submissions at INDEXING_DAILY_CAP (default 10).
 *  - If GSC API credentials are present, calls the Indexing API; otherwise prints the queue
 *    in dry-run mode so you can paste into URL Inspection manually.
 *
 *  Run with:
 *    bun scripts/gsc-indexing-queue.ts            # dry run
 *    bun scripts/gsc-indexing-queue.ts --submit   # call Indexing API (requires creds)
 *
 *  Required env vars for live submit:
 *    GSC_SERVICE_ACCOUNT_JSON  — full service-account JSON as a single string
 *    GSC_TARGET_HOST           — defaults to https://www.puranights.com
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { createHash } from "crypto";
import { join, relative } from "path";

const ROOT = process.cwd();
const SUBMIT = process.argv.includes("--submit");
const HOST = process.env.GSC_TARGET_HOST || "https://www.puranights.com";
const DAILY_CAP = Number(process.env.INDEXING_DAILY_CAP || 10);
const COOLDOWN_DAYS = 7;
const CACHE_DIR = join(ROOT, ".cache");
const CACHE_FILE = join(CACHE_DIR, "indexing-queue.json");

// Mirror of Tier 1 in docs/19. Keep in sync.
const TIER_1: string[] = [
  "/",
  "/pura-nights",
  "/prices",
  "/events",
  "/wedding-dance",
  "/private-lessons",
  "/salsa-classes-chiswick",
  "/bachata-classes-ealing",
  "/dance-classes-west-london",
];

// Walk pages, build path → file owner map via <SeoHead path>.
function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(f)) out.push(p);
  }
  return out;
}
const owners = new Map<string, string>();
for (const file of walk(join(ROOT, "src/pages"))) {
  const src = readFileSync(file, "utf8");
  const m = src.match(/<SeoHead[^>]*path=["']([^"']+)["']/);
  if (m) owners.set(m[1], file);
}

function hashRoute(path: string): string {
  const file = owners.get(path);
  if (!file) return "no-owner";
  return createHash("sha256").update(readFileSync(file, "utf8")).digest("hex").slice(0, 16);
}

interface CacheEntry { hash: string; lastSubmittedAt: string | null; }
const cache: Record<string, CacheEntry> = existsSync(CACHE_FILE)
  ? JSON.parse(readFileSync(CACHE_FILE, "utf8"))
  : {};

const today = new Date();
const cutoff = new Date(today.getTime() - COOLDOWN_DAYS * 24 * 60 * 60 * 1000);

interface Candidate { path: string; reason: "new" | "changed" | "stale-but-changed"; hash: string; }
const candidates: Candidate[] = [];

for (const path of TIER_1) {
  const newHash = hashRoute(path);
  const prev = cache[path];
  if (!prev) {
    candidates.push({ path, reason: "new", hash: newHash });
    continue;
  }
  const lastSub = prev.lastSubmittedAt ? new Date(prev.lastSubmittedAt) : null;
  const changed = prev.hash !== newHash;
  const cooledDown = !lastSub || lastSub < cutoff;
  if (changed && cooledDown) candidates.push({ path, reason: "changed", hash: newHash });
}

const queue = candidates.slice(0, DAILY_CAP);
const skipped = candidates.slice(DAILY_CAP);

console.log(`\n=== GSC Indexing Queue · ${today.toISOString().split("T")[0]} ===`);
console.log(`Host: ${HOST}`);
console.log(`Tier 1 size: ${TIER_1.length}, candidates: ${candidates.length}, queued: ${queue.length}, deferred: ${skipped.length}\n`);
for (const q of queue) console.log(`  → ${HOST}${q.path}    [${q.reason}]`);
if (skipped.length) {
  console.log(`\n  Deferred (cap ${DAILY_CAP}/day):`);
  for (const q of skipped) console.log(`  · ${HOST}${q.path}`);
}

// ---- Submission ----
async function submit(url: string, accessToken: string): Promise<{ ok: boolean; status: number; body: string }> {
  const r = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });
  return { ok: r.ok, status: r.status, body: await r.text() };
}

// Minimal JWT → access_token exchange for Google service accounts (no SDK).
async function getAccessToken(saJson: string): Promise<string> {
  const sa = JSON.parse(saJson);
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64(header)}.${b64(claims)}`;
  const { createSign } = await import("crypto");
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const sig = signer.sign(sa.private_key).toString("base64url");
  const jwt = `${unsigned}.${sig}`;
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const j = await r.json() as any;
  if (!j.access_token) throw new Error(`Token exchange failed: ${JSON.stringify(j)}`);
  return j.access_token;
}

if (!SUBMIT) {
  console.log(`\nDry run. Re-run with --submit (and GSC_SERVICE_ACCOUNT_JSON set) to call the Indexing API.`);
  process.exit(0);
}

(async () => {
  const sa = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!sa) {
    console.error("\n❌ GSC_SERVICE_ACCOUNT_JSON not set. Aborting submit.");
    process.exit(1);
  }
  const token = await getAccessToken(sa);
  let ok = 0, fail = 0;
  for (const q of queue) {
    const url = `${HOST}${q.path}`;
    const res = await submit(url, token);
    if (res.ok) {
      ok++;
      cache[q.path] = { hash: q.hash, lastSubmittedAt: today.toISOString() };
      console.log(`  ✓ ${url}`);
    } else {
      fail++;
      console.error(`  ✗ ${url} → ${res.status} ${res.body}`);
    }
  }
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  console.log(`\nDone. Submitted: ${ok}, failed: ${fail}. Cache updated at ${relative(ROOT, CACHE_FILE)}.`);
  process.exit(fail ? 1 : 0);
})();
