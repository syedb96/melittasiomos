/**
 * CTA Smoke Test — End-to-end verification of every Tonight's Class deep link,
 * venue CTA, and top-5 conversion-page CTA.
 *
 * Mirrors docs/35-WIX-ROUTE-MAPPING-QA.md sections A, B, C.
 *
 * Usage:
 *   bun scripts/cta-smoke-test.ts                  # production (default)
 *   bun scripts/cta-smoke-test.ts --env=staging
 *   bun scripts/cta-smoke-test.ts --env=preview
 *   bun scripts/cta-smoke-test.ts --host=https://wix-staging.example.com
 *
 * Writes: launch-evidence/cta-smoke/cta-smoke-<env>-<DATE>.csv
 * Exit code 1 if any link fails.
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { loadConfig } from "./qa-config";

type Check = {
  source: string;
  label: string;
  url: string;
  kind: "internal" | "external" | "tel" | "mailto";
  expect: number[]; // acceptable status codes
};

const cfg = loadConfig();
const HOST = cfg.host.replace(/\/$/, "");

const internal = (path: string): Pick<Check, "url" | "kind" | "expect"> => ({
  url: `${HOST}${path}`,
  kind: "internal",
  expect: [200],
});
const external = (url: string): Pick<Check, "url" | "kind" | "expect"> => ({
  url,
  kind: "external",
  expect: [200, 301, 302, 303, 307, 308],
});
const protocolOnly = (url: string, kind: "tel" | "mailto"): Pick<Check, "url" | "kind" | "expect"> => ({
  url,
  kind,
  expect: [0], // not network-checked, format-validated only
});

const checks: Check[] = [
  // A. TonightBanner deep links
  { source: "TonightBanner", label: "Chiswick venue link", ...internal("/venue/the-george-iv-chiswick") },
  { source: "TonightBanner", label: "Ealing venue link", ...internal("/venue/the-drayton-court-ealing") },

  // B. Venue page CTAs
  { source: "/venue/the-george-iv-chiswick", label: "View full pricing", ...internal("/prices") },
  { source: "/venue/the-george-iv-chiswick", label: "Book Your First Class", ...external("https://www.tickettailor.com/events/puranights") },
  { source: "/venue/the-george-iv-chiswick", label: "WhatsApp Melitta", ...external("https://wa.me/447449482343") },
  { source: "/venue/the-drayton-court-ealing", label: "View full pricing", ...internal("/prices") },
  { source: "/venue/the-drayton-court-ealing", label: "See upcoming Latin Friday dates", ...internal("/events") },
  { source: "/venue/the-drayton-court-ealing", label: "Book Your First Class", ...external("https://www.tickettailor.com/events/puranights") },

  // C. Top-5 conversion-page CTAs
  { source: "/", label: "Book Your First Class (Ticket Tailor)", ...external("https://www.tickettailor.com/events/puranights") },
  { source: "/", label: "See Class Schedule", ...internal("/schedule") },
  { source: "/", label: "Explore Wedding Dance", ...internal("/wedding-dance") },
  { source: "/", label: "Buy a Gift Voucher", ...internal("/gift-vouchers") },
  { source: "/", label: "New to Dance? Start Here", ...internal("/start-here") },
  { source: "/pura-nights", label: "Book a Class (Ticket Tailor)", ...external("https://www.tickettailor.com/events/puranights") },
  { source: "/pura-nights", label: "See Prices", ...internal("/prices") },
  { source: "/pura-nights", label: "See Upcoming Dates", ...internal("/events") },
  { source: "/prices", label: "Buy a Gift Voucher", ...internal("/gift-vouchers") },
  { source: "/prices", label: "Enquire via WhatsApp", ...external("https://wa.me/447449482343") },
  { source: "/beginners", label: "What to Expect", ...internal("/start-here") },
  { source: "/beginners", label: "Ask Melitta a Question", ...external("https://wa.me/447449482343") },
  { source: "/wedding-dance", label: "Book Free Consultation", ...external("https://wa.me/447449482343") },
  { source: "/wedding-dance", label: "Email Melitta", ...protocolOnly("mailto:siomosmelitta@gmail.com", "mailto") },
];

async function probe(c: Check) {
  if (c.kind === "tel" || c.kind === "mailto") {
    const ok = /^(tel:\+?[0-9 ]+|mailto:[^@\s]+@[^@\s]+\.[^@\s]+)$/.test(c.url);
    return { status: ok ? "OK-format" : "BAD-format", finalUrl: c.url, redirects: 0 };
  }
  try {
    let url = c.url;
    let redirects = 0;
    for (let i = 0; i < 5; i++) {
      const res = await fetch(url, { method: "HEAD", redirect: "manual" });
      if ([301, 302, 303, 307, 308].includes(res.status)) {
        const loc = res.headers.get("location");
        if (!loc) return { status: `${res.status}-no-location`, finalUrl: url, redirects };
        url = loc.startsWith("http") ? loc : new URL(loc, url).toString();
        redirects++;
        continue;
      }
      const ok = c.expect.includes(res.status);
      return { status: ok ? `${res.status}-OK` : `${res.status}-FAIL`, finalUrl: url, redirects };
    }
    return { status: "redirect-loop", finalUrl: url, redirects };
  } catch (e) {
    return { status: `ERR:${(e as Error).message}`, finalUrl: c.url, redirects: 0 };
  }
}

(async () => {
  console.log(`\nCTA smoke test → ${HOST}\n`);
  const rows: string[] = ["source,label,kind,url,status,final_url,redirect_hops,pass"];
  let failures = 0;

  for (const c of checks) {
    const r = await probe(c);
    const pass = r.status.endsWith("OK") || r.status === "OK-format";
    if (!pass) failures++;
    const mark = pass ? "✓" : "✗";
    console.log(`${mark} [${c.source}] ${c.label.padEnd(40)} ${r.status}  →  ${r.finalUrl}${r.redirects ? ` (${r.redirects} hop)` : ""}`);
    rows.push([c.source, c.label, c.kind, c.url, r.status, r.finalUrl, r.redirects, pass].map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
  }

  const dir = join("launch-evidence", "cta-smoke");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `cta-smoke-${cfg.env}-${new Date().toISOString().slice(0, 10)}.csv`);
  writeFileSync(file, rows.join("\n"));
  console.log(`\n${failures === 0 ? "✓ ALL PASS" : `✗ ${failures} FAILURE(S)`} — report: ${file}\n`);
  process.exit(failures === 0 ? 0 : 1);
})();
