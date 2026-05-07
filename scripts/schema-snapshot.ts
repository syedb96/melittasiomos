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
import { extractJsonLd, typesOf, diffTypes } from "./schema-snapshot-lib";

const cfg = loadConfig();
const STRICT = process.argv.includes("--strict") || process.env.CI === "true";

const slug = (p: string) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_"));

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
    const { added, removed, changed: isChanged } = diffTypes(prevTypes, types);
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
