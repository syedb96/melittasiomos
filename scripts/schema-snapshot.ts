/**
 * Schema snapshot — fetches each test URL, saves rendered HTML and extracted
 * JSON-LD blocks, and diffs @type set vs the previous run.
 *
 * Usage:
 *   bun scripts/schema-snapshot.ts                  # default host
 *   bun scripts/schema-snapshot.ts --host=…
 *
 * Writes:
 *   launch-evidence/html/<slug>-YYYY-MM-DD.html
 *   launch-evidence/jsonld/<slug>-YYYY-MM-DD.json
 *   launch-evidence/jsonld/<slug>-latest.json   (rolling pointer for diffing)
 *   launch-evidence/jsonld/diff-YYYY-MM-DD.md
 *
 * Exit code 1 if any tracked URL changes its @type set since last run.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const HOST =
  process.argv.find((a) => a.startsWith("--host="))?.split("=")[1] ??
  "https://www.puranights.com";

// URLs from docs/30 §B.
const URLS = [
  "/",
  "/about",
  "/pura-nights",
  "/schedule",
  "/salsa-classes-chiswick",
  "/bachata-classes-ealing",
  "/faq",
  "/blog/salsa-vs-bachata",
  "/events/latin-friday-2026-05-08",
  "/events/latin-friday-2026-06-12",
];

const slug = (p: string) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_"));

function extractJsonLd(html: string): unknown[] {
  const out: unknown[] = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      out.push(JSON.parse(m[1].trim()));
    } catch {
      out.push({ _parseError: true, raw: m[1].slice(0, 200) });
    }
  }
  return out;
}

function typesOf(blocks: unknown[]): string[] {
  const types: string[] = [];
  const walk = (n: unknown) => {
    if (Array.isArray(n)) n.forEach(walk);
    else if (n && typeof n === "object") {
      const t = (n as Record<string, unknown>)["@type"];
      if (typeof t === "string") types.push(t);
      else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.push(x));
      Object.values(n as object).forEach(walk);
    }
  };
  walk(blocks);
  return [...new Set(types)].sort();
}

(async () => {
  const date = new Date().toISOString().split("T")[0];
  const root = join(process.cwd(), "launch-evidence");
  mkdirSync(join(root, "html"), { recursive: true });
  mkdirSync(join(root, "jsonld"), { recursive: true });

  const diffs: string[] = [`# Schema snapshot diff — ${date}`, `Host: ${HOST}`, ""];
  let changed = 0;

  for (const path of URLS) {
    const url = `${HOST}${path}`;
    const s = slug(path);
    let html = "";
    let status: number | string = 0;
    try {
      const res = await fetch(url, { redirect: "follow" });
      status = res.status;
      html = await res.text();
    } catch (e) {
      console.error(`✗ ${url}: ${(e as Error).message}`);
      diffs.push(`## ${path}\n- ❌ fetch error: ${(e as Error).message}`);
      changed++;
      continue;
    }

    writeFileSync(join(root, "html", `${s}-${date}.html`), html);
    const blocks = extractJsonLd(html);
    const types = typesOf(blocks);
    const snapshot = { url, status, fetchedAt: new Date().toISOString(), types, blocks };
    writeFileSync(join(root, "jsonld", `${s}-${date}.json`), JSON.stringify(snapshot, null, 2));

    const latestPath = join(root, "jsonld", `${s}-latest.json`);
    let prevTypes: string[] = [];
    if (existsSync(latestPath)) {
      try {
        prevTypes = (JSON.parse(readFileSync(latestPath, "utf8")).types ?? []) as string[];
      } catch { /* ignore */ }
    }
    const added = types.filter((t) => !prevTypes.includes(t));
    const removed = prevTypes.filter((t) => !types.includes(t));
    const isChanged = added.length || removed.length;
    if (isChanged) changed++;

    diffs.push(
      `## ${path}`,
      `- status: ${status}`,
      `- @types: ${types.join(", ") || "(none)"}`,
      added.length ? `- ➕ added: ${added.join(", ")}` : "",
      removed.length ? `- ➖ removed: ${removed.join(", ")}` : "",
      "",
    );
    console.log(`${isChanged ? "⚠" : "✓"} ${path.padEnd(40)} [${status}] ${types.join(",") || "—"}`);

    writeFileSync(latestPath, JSON.stringify(snapshot, null, 2));
  }

  writeFileSync(join(root, "jsonld", `diff-${date}.md`), diffs.join("\n"));
  console.log(`\n→ launch-evidence/jsonld/diff-${date}.md`);
  if (changed > 0) {
    console.log(`\n⚠ ${changed} URL(s) changed schema since last run.`);
    process.exit(1);
  }
})();
