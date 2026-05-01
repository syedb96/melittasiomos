/**
 * Generate per-event Open Graph cards (1200x630) for every upcoming
 * /events/:slug, using public/og/events/_base.jpg as the photographic
 * backdrop and overlaying event-specific typography.
 *
 * Run:  bun scripts/generate-event-og.ts
 * Output: public/og/events/{slug}.jpg
 *
 * Wix handoff: regenerate locally and copy /public/og/events/* into Wix
 * Media Manager under the same folder name.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { upcomingEvents } from "../src/data/events";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "public/og/events");
const BASE = join(OUT_DIR, "_base.jpg");

if (!existsSync(BASE)) {
  console.error(`❌ Base image missing: ${BASE}. Generate it via imagegen first.`);
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;
const H = 630;

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderSvg(title: string, dateLabel: string, statusLabel: string | null) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#151515" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="#151515" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#151515" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="60" y="60" width="60" height="4" fill="#CF6A3D"/>
  <text x="60" y="110" font-family="Poppins, Arial, sans-serif" font-size="22" font-weight="600" fill="#CF6A3D" letter-spacing="6">PURA NIGHTS · LATIN FRIDAY</text>
  <text x="60" y="240" font-family="'Playfair Display', Georgia, serif" font-size="78" font-weight="700" fill="#FFFFFF">${escapeXml(title)}</text>
  <text x="60" y="320" font-family="'Playfair Display', Georgia, serif" font-size="48" font-style="italic" fill="#F5E6D3">${escapeXml(dateLabel)}</text>
  <text x="60" y="400" font-family="Poppins, Arial, sans-serif" font-size="26" fill="#FFFFFF" opacity="0.85">Drayton Court Hotel · Ealing W13 8PH</text>
  <text x="60" y="440" font-family="Poppins, Arial, sans-serif" font-size="24" fill="#FFFFFF" opacity="0.7">7:15 PM – 11:45 PM · Workshops · Show · DJ</text>
  ${statusLabel ? `<rect x="60" y="490" width="${20 + statusLabel.length * 14}" height="44" rx="4" fill="#CF6A3D"/><text x="${72}" y="521" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="22" fill="#151515">${escapeXml(statusLabel.toUpperCase())}</text>` : ""}
  <text x="60" y="${statusLabel ? 580 : 530}" font-family="Poppins, Arial, sans-serif" font-size="22" fill="#FFFFFF" opacity="0.6">puranights.com · Tickets from £15</text>
</svg>`;
}

async function buildCard(slug: string, title: string, dateLabel: string, statusLabel: string | null) {
  const svg = Buffer.from(renderSvg(title, dateLabel, statusLabel));
  const outPath = join(OUT_DIR, `${slug}.jpg`);
  await sharp(BASE)
    .resize(W, H, { fit: "cover", position: "right" })
    .composite([{ input: svg, top: 0, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath);
  return outPath;
}

(async () => {
  let count = 0;
  for (const ev of upcomingEvents) {
    const d = new Date(ev.startDate);
    const dateLabel = d.toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    const titleShort = ev.name
      .replace("Pura Nights Latin Friday — ", "")
      .replace(" 2026", "");
    const statusLabel =
      ev.status === "EventCancelled" ? "Cancelled" :
      ev.status === "EventPostponed" ? "Postponed" :
      ev.status === "EventRescheduled" ? "Rescheduled" :
      ev.soldOut ? "Sold Out" : null;
    const out = await buildCard(ev.slug, titleShort, dateLabel, statusLabel);
    console.log(`  ✓ ${out.replace(ROOT + "/", "")}`);
    count++;
  }
  console.log(`\n✓ Generated ${count} per-event OG cards (1200×630).`);
})();
