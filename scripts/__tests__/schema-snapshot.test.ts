import { describe, it, expect } from "vitest";
import { extractJsonLd, typesOf, diffTypes } from "../schema-snapshot-lib";

const FIXTURE_HTML = `<!doctype html><html><head>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"Pura"}</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":["DanceSchool","Organization"],
 "department":{"@type":"Service","name":"Salsa"}}
</script>
<script type="application/ld+json">{ malformed json }</script>
</head><body></body></html>`;

describe("extractJsonLd", () => {
  it("extracts every well-formed JSON-LD block", () => {
    const blocks = extractJsonLd(FIXTURE_HTML);
    expect(blocks).toHaveLength(3);
    expect((blocks[2] as { _parseError: boolean })._parseError).toBe(true);
  });
});

describe("typesOf", () => {
  it("collects @type values from string + array forms, deduped + sorted", () => {
    const blocks = extractJsonLd(FIXTURE_HTML);
    expect(typesOf(blocks)).toEqual(["DanceSchool", "LocalBusiness", "Organization", "Service"]);
  });

  it("returns empty for blocks with no @type", () => {
    expect(typesOf([{ name: "x" }])).toEqual([]);
  });
});

describe("diffTypes", () => {
  it("flags additions only", () => {
    const d = diffTypes(["A"], ["A", "B"]);
    expect(d).toEqual({ added: ["B"], removed: [], changed: true });
  });
  it("flags removals only", () => {
    const d = diffTypes(["A", "B"], ["A"]);
    expect(d).toEqual({ added: [], removed: ["B"], changed: true });
  });
  it("identical sets are unchanged", () => {
    expect(diffTypes(["A", "B"], ["B", "A"])).toEqual({ added: [], removed: [], changed: false });
  });
  it("first run (empty prev) flags every type as added", () => {
    expect(diffTypes([], ["LocalBusiness"]).changed).toBe(true);
  });
});
