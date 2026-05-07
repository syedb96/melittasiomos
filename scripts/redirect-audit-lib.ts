/**
 * Pure helpers used by redirect-audit and tests.
 */
import type { RedirectRule } from "./qa-config";

export type RedirectRow = {
  id: string;
  from: string;
  expected_to: string;
  status: number | string;
  location: string;
  pass: boolean;
  note: string;
};

export function normaliseLocation(loc: string, base: string): string {
  if (!loc) return "";
  try {
    return new URL(loc, base).pathname.replace(/\/$/, "") || "/";
  } catch {
    return loc;
  }
}

export function evaluateRedirect(
  rule: RedirectRule,
  result: { status: number | string; location: string },
  base: string,
): RedirectRow {
  const got = normaliseLocation(String(result.location), base);
  const expected = rule.to.replace(/\/$/, "") || "/";
  const pass = result.status === 301 && got === expected;
  return {
    id: rule.id,
    from: rule.from,
    expected_to: rule.to,
    status: result.status,
    location: String(result.location),
    pass,
    note: pass
      ? "ok"
      : result.status !== 301
        ? `expected 301 got ${result.status}`
        : `target mismatch (got ${got})`,
  };
}
