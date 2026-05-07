import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { walk, buildEntries, rowFromFilenameHeuristic } from "../evidence-manifest";
import type { QAConfig } from "../qa-config";

const cfg: QAConfig = {
  env: "production",
  host: "https://www.puranights.com",
  apexHost: null,
  schemaUrls: [
    { id: "B1", path: "/" },
    { id: "B5", path: "/salsa-classes-chiswick" },
  ],
  redirectRules: [{ id: "C1", from: "/old", to: "/new" }],
};

let dir: string;
beforeEach(() => { dir = mkdtempSync(join(tmpdir(), "evi-")); });
afterEach(() => { rmSync(dir, { recursive: true, force: true }); });

describe("rowFromFilenameHeuristic", () => {
  it("maps screenshot naming convention", () => {
    const r = rowFromFilenameHeuristic("B5__chiswick__rich-results__2026-05-07.png", cfg.schemaUrls);
    expect(r.rowId).toBe("B5");
    expect(r.category).toBe("screenshot");
    expect(r.url).toBe("/salsa-classes-chiswick");
  });
  it("maps schema snapshot json", () => {
    const r = rowFromFilenameHeuristic("production__home-2026-05-07.json", cfg.schemaUrls);
    expect(r.rowId).toBe("B1");
    expect(r.category).toBe("jsonld");
  });
  it("falls back to other for unknown", () => {
    expect(rowFromFilenameHeuristic("random.txt", cfg.schemaUrls).rowId).toBe("—");
  });
});

describe("buildEntries (sidecar precedence)", () => {
  it("uses sidecar metadata when present and ignores .meta.json itself", () => {
    mkdirSync(join(dir, "screenshots"));
    const file = join(dir, "screenshots/anything.png");
    writeFileSync(file, "fake");
    writeFileSync(`${file}.meta.json`, JSON.stringify({
      rowId: "B5", category: "screenshot", url: "/salsa-classes-chiswick", tool: "rich-results",
    }));
    const entries = buildEntries(walk(dir), cfg);
    expect(entries).toHaveLength(1);
    expect(entries[0].rowId).toBe("B5");
    expect(entries[0].source).toBe("sidecar");
    expect(entries[0].tool).toBe("rich-results");
  });

  it("falls back to heuristic when no sidecar", () => {
    const file = join(dir, "production__home-2026-05-07.json");
    writeFileSync(file, "{}");
    const entries = buildEntries(walk(dir), cfg);
    expect(entries[0].source).toBe("heuristic");
    expect(entries[0].rowId).toBe("B1");
  });

  it("excludes manifest files from output", () => {
    writeFileSync(join(dir, "manifest.json"), "{}");
    writeFileSync(join(dir, "real.html"), "<html></html>");
    const entries = buildEntries(walk(dir), cfg);
    expect(entries.map((e) => e.file)).toEqual([expect.stringContaining("real.html")]);
  });
});
