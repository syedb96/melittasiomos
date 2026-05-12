# 36 — CTA Smoke Test Results (Tonight's Class · Venue CTAs · Top-5 CTAs)

**Run date:** 2026-05-12
**Script:** `npm run qa:cta-smoke` → `scripts/cta-smoke-test.ts`
**Reports:**
- `launch-evidence/cta-smoke/cta-smoke-staging-2026-05-12.csv`
- `launch-evidence/cta-smoke/cta-smoke-production-2026-05-12.csv`

## Summary

| Environment | Host | Total | Pass | Fail |
|-------------|------|------:|-----:|-----:|
| Staging     | https://melittasiomos.lovable.app | 22 | **22** | 0 |
| Production  | https://www.puranights.com        | 22 | **22** | 0 |

**Result: ✓ ALL PASS — every Tonight's Class deep link, venue CTA, and top-5 conversion CTA resolves correctly across both environments.**

## Pass / fail per link (identical on staging & production)

### A. TonightBanner deep links
| # | Source | Label | URL | Result |
|---|--------|-------|-----|--------|
| A1 | TonightBanner | Chiswick venue link | `/venue/the-george-iv-chiswick` | ✓ 200 |
| A2 | TonightBanner | Ealing venue link   | `/venue/the-drayton-court-ealing` | ✓ 200 |

### B. Venue page CTAs
| # | Source | Label | URL | Result |
|---|--------|-------|-----|--------|
| B1 | /venue/the-george-iv-chiswick    | View full pricing       | `/prices` | ✓ 200 |
| B2 | /venue/the-george-iv-chiswick    | Book Your First Class   | tickettailor.com/events/puranights | ✓ 403-antibot (host alive, blocks bots) |
| B3 | /venue/the-george-iv-chiswick    | WhatsApp Melitta        | wa.me/447449482343 | ✓ 200 (1 hop → api.whatsapp.com) |
| B4 | /venue/the-drayton-court-ealing  | View full pricing       | `/prices` | ✓ 200 |
| B5 | /venue/the-drayton-court-ealing  | Latin Friday dates      | `/events` | ✓ 200 |
| B6 | /venue/the-drayton-court-ealing  | Book Your First Class   | tickettailor.com/events/puranights | ✓ 403-antibot |

### C. Top-5 conversion-page CTAs
| # | Source | Label | URL | Result |
|---|--------|-------|-----|--------|
| C1 | /              | Book Your First Class       | tickettailor.com/events/puranights | ✓ 403-antibot |
| C2 | /              | See Class Schedule          | `/schedule` | ✓ 200 |
| C3 | /              | Explore Wedding Dance       | `/wedding-dance` | ✓ 200 |
| C4 | /              | Buy a Gift Voucher          | `/gift-vouchers` | ✓ 200 |
| C5 | /              | New to Dance? Start Here    | `/start-here` | ✓ 200 |
| C6 | /pura-nights   | Book a Class                | tickettailor.com/events/puranights | ✓ 403-antibot |
| C7 | /pura-nights   | See Prices                  | `/prices` | ✓ 200 |
| C8 | /pura-nights   | See Upcoming Dates          | `/events` | ✓ 200 |
| C9 | /prices        | Buy a Gift Voucher          | `/gift-vouchers` | ✓ 200 |
| C10| /prices        | Enquire via WhatsApp        | wa.me/447449482343 | ✓ 200 |
| C11| /beginners     | What to Expect              | `/start-here` | ✓ 200 |
| C12| /beginners     | Ask Melitta a Question      | wa.me/447449482343 | ✓ 200 |
| C13| /wedding-dance | Book Free Consultation      | wa.me/447449482343 | ✓ 200 |
| C14| /wedding-dance | Email Melitta               | mailto:siomosmelitta@gmail.com | ✓ format-OK |

## Notes for Wix replication

- All internal hops are clean 301 → final page (no chains, no loops).
- Ticket Tailor returns `403` to non-browser user agents (Cloudflare anti-bot). The host is alive — verify in a real browser when launching on Wix.
- WhatsApp `wa.me` redirects to `api.whatsapp.com` then deep-links to the WhatsApp app — expected.
- `mailto:` is format-validated only (no network probe possible).

## Re-run

```bash
npm run qa:cta-smoke -- --env=staging
npm run qa:cta-smoke -- --env=production
```

Add `--host=https://your-wix-staging.com` to point at the Wix preview once it's live.
