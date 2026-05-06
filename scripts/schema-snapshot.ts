/**
 * Schema snapshot — config-driven.
 * Fetches each tracked URL, saves rendered HTML + JSON-LD, diffs @type set
 * vs the previous run for the same env.
 *
 * Usage:
 *   bun scripts/schema-snapshot.ts                # production
 *   bun scripts/schema-snapshot.ts --env=staging
 *   bun scripts/schema-snapshot.ts --strict       # exit 1 on any change (CI mode)
 *
 * Writes:
 *   launch-evidence/html/<env>__<slug>-<DATE>.html
 *   launch-evidence/jsonld/<env>__<slug>-<DATE>.json
 *   launch-evidence/jsonld/<env>__<slug>-latest.json
 *   launch-evidence/jsonld/diff-<env>-<DATE>.md
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { loadConfig } from "./qa-config";

const cfg = loadConfig();
const STRICT = process.argv.includes("--strict") || process.env.CI === "true";

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

  const diffs: string[] = [`# Schema snapshot diff — ${cfg.env} — ${date}`, `Host: ${cfg.host}`, ""];
  let changed = 0;
  const drift: { id: string; path: string; added: string[]; removed: string[] }[] = [];

  for (const u of cfg.schemaUrls) {
    const url = `${cfg.host}${u.path}`;
    const s = `${cfg.env}__${slug(u.path)}`;
    let html = "";
    let status: number | string = 0;
    try {
      const res = await fetch(url, { redirect: "follow" });
      status = res.status;
      html = await res.text();
    } catch (e) {
      diffs.push(`## ${u.id} ${u.path}\n- ❌ fetch error: ${(e as Error).message}\n`);
      changed++;
      continue;
    }

    writeFileSync(join(root, "html", `${s}-${date}.html`), html);
    const blocks = extractJsonLd(html);
    const types = typesOf(blocks);
    const snapshot = { id: u.id, url, status, fetchedAt: new Date().toISOString(), types, blocks };
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
    if (isChanged) {
      changed++;
      drift.push({ id: u.id, path: u.path, added, removed });
    }

    diffs.push(
      `## ${u.id} ${u.path}`,
      `- status: ${status}`,
      `- @types: ${types.join(", ") || "(none)"}`,
      added.length ? `- ➕ added: ${added.join(", ")}` : "",
      removed.length ? `- ➖ removed: ${removed.join(", ")}` : "",
      "",
    );
    console.log(`${isChanged ? "⚠" : "✓"} ${u.id} ${u.path.padEnd(40)} [${status}] ${types.join(",") || "—"}`);
    writeFileSync(latestPath, JSON.stringify(snapshot, null, 2));
  }

  writeFileSync(join(root, "jsonld", `diff-${cfg.env}-${date}.md`), diffs.join("\n"));
  console.log(`\n→ launch-evidence/jsonld/diff-${cfg.env}-${date}.md`);
  if (changed > 0) {
    console.log(`\n⚠ ${changed} URL(s) changed @type set since last run.`);
    if (drift.length) {
      for (const d of drift) console.log(`   ${d.id} ${d.path}: +[${d.added.join(",")}] -[${d.removed.join(",")}]`);
    }
    if (STRICT) {
      console.error("\n❌ STRICT mode — failing build on schema drift.");
      process.exit(1);
    }
  }
})();
