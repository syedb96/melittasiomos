import { describe, it, expect } from "vitest";
import { evaluateRedirect, normaliseLocation } from "../redirect-audit-lib";

const HOST = "https://www.puranights.com";

describe("normaliseLocation", () => {
  it("strips trailing slash", () => {
    expect(normaliseLocation("https://www.puranights.com/new/", HOST)).toBe("/new");
  });
  it("preserves root", () => {
    expect(normaliseLocation("https://www.puranights.com/", HOST)).toBe("/");
  });
  it("resolves relative paths against base", () => {
    expect(normaliseLocation("/new", HOST)).toBe("/new");
  });
  it("returns empty for empty input", () => {
    expect(normaliseLocation("", HOST)).toBe("");
  });
});

describe("evaluateRedirect", () => {
  const rule = { id: "C1", from: "/old", to: "/new" };

  it("passes on 301 with matching target", () => {
    const row = evaluateRedirect(rule, { status: 301, location: "/new" }, HOST);
    expect(row.pass).toBe(true);
    expect(row.note).toBe("ok");
  });

  it("passes on 301 with absolute matching target", () => {
    const row = evaluateRedirect(rule, { status: 301, location: `${HOST}/new/` }, HOST);
    expect(row.pass).toBe(true);
  });

  it("fails on non-301 status", () => {
    const row = evaluateRedirect(rule, { status: 302, location: "/new" }, HOST);
    expect(row.pass).toBe(false);
    expect(row.note).toMatch(/expected 301 got 302/);
  });

  it("fails on target mismatch", () => {
    const row = evaluateRedirect(rule, { status: 301, location: "/somewhere-else" }, HOST);
    expect(row.pass).toBe(false);
    expect(row.note).toMatch(/target mismatch/);
  });

  it("fails on fetch ERR", () => {
    const row = evaluateRedirect(rule, { status: "ERR", location: "network down" }, HOST);
    expect(row.pass).toBe(false);
  });
});
