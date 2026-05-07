import { describe, it, expect } from "vitest";
import { parseConfig } from "../qa-config";

const valid = {
  default: "production",
  environments: {
    production: { host: "https://www.puranights.com", apexHost: "https://puranights.com" },
    staging: { host: "https://staging.example.com", apexHost: null },
  },
  schemaUrls: [{ id: "B1", path: "/" }, { id: "B2", path: "/about" }],
  redirectRules: [{ id: "C1", from: "/old", to: "/new" }],
};

describe("parseConfig", () => {
  it("accepts a well-formed config", () => {
    const cfg = parseConfig(valid);
    expect(cfg.env).toBe("production");
    expect(cfg.host).toMatch(/puranights/);
  });

  it("supports env override + host override", () => {
    const cfg = parseConfig(valid, { env: "staging", host: "https://override.test" });
    expect(cfg.env).toBe("staging");
    expect(cfg.host).toBe("https://override.test");
    expect(cfg.apexHost).toBeNull();
  });

  it("fails fast on unknown env", () => {
    expect(() => parseConfig(valid, { env: "ghost" })).toThrow(/Unknown env/);
  });

  it("rejects missing environments", () => {
    expect(() => parseConfig({ ...valid, environments: {} })).toThrow(/environments/);
  });

  it("rejects malformed schemaUrls.id", () => {
    expect(() =>
      parseConfig({ ...valid, schemaUrls: [{ id: "bad", path: "/" }] }),
    ).toThrow(/Invalid qa.config.json/);
  });

  it("rejects path missing leading slash", () => {
    expect(() =>
      parseConfig({ ...valid, redirectRules: [{ id: "C1", from: "old", to: "/new" }] }),
    ).toThrow(/Invalid qa.config.json/);
  });

  it("rejects duplicate redirect ids", () => {
    expect(() =>
      parseConfig({
        ...valid,
        redirectRules: [
          { id: "C1", from: "/a", to: "/x" },
          { id: "C1", from: "/b", to: "/y" },
        ],
      }),
    ).toThrow(/Duplicate redirectRules.id/);
  });

  it("rejects invalid host URL", () => {
    expect(() =>
      parseConfig({ ...valid, environments: { production: { host: "not-a-url", apexHost: null } } }),
    ).toThrow(/Invalid qa.config.json/);
  });
});
