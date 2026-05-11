# 35 — Wix Route-Mapping QA Checklist

Every internal link used by `<TonightBanner />`, the venue CTAs, and the top-5 conversion pages must resolve to a real Wix page or a configured 301 once the site is rebuilt. Use this as your sign-off table.

## How to QA in Wix

1. Open each **Source page** in the Wix Editor.
2. Click each link element (button or text).
3. Confirm the link target (in the link panel) matches the **Expected Wix path** exactly — same slug, no trailing slash, lowercase, hyphenated.
4. Publish to a staging URL and click each link → confirm 200 OK and the correct page renders (no 404, no redirect chain).
5. Tick the row.

> ⚠️ Wix slugs must match these exactly — they are baked into the React app's sitemap, canonicals, and structured data.

---

## A. TonightBanner deep links (`src/components/TonightBanner.tsx`)

| Source | Link element | Expected Wix path | Type | ✅ |
|---|---|---|---|---|
| Site-wide top strip | "Tonight — Chiswick" / "Next class — Chiswick" | `/venue/the-george-iv-chiswick` | 200 | ☐ |
| Site-wide top strip | "Tonight — Ealing" | `/venue/the-drayton-court-ealing` | 200 | ☐ |

## B. Venue page CTAs

| Source | Link label | Expected Wix path | Type | ✅ |
|---|---|---|---|---|
| `/venue/the-george-iv-chiswick` | "View full pricing →" | `/prices` | 200 | ☐ |
| `/venue/the-george-iv-chiswick` | "Book Your First Class" (external) | `https://www.tickettailor.com/events/puranights` | 200 ext | ☐ |
| `/venue/the-george-iv-chiswick` | "WhatsApp Melitta" | `https://wa.me/447449482343` | 200 ext | ☐ |
| `/venue/the-drayton-court-ealing` | "View full pricing →" | `/prices` | 200 | ☐ |
| `/venue/the-drayton-court-ealing` | "See upcoming Latin Friday dates →" | `/events` | 200 | ☐ |
| `/venue/the-drayton-court-ealing` | "Book Your First Class" (external) | `https://www.tickettailor.com/events/puranights` | 200 ext | ☐ |

## C. Top-5 conversion-page CTAs

| Source | Link label | Expected Wix path | Type | ✅ |
|---|---|---|---|---|
| `/` (Home) | "Book Your First Class — From £10 →" | Ticket Tailor | 200 ext | ☐ |
| `/` | "See Class Schedule →" | `/schedule` | 200 | ☐ |
| `/` | "Explore Wedding Dance →" | `/wedding-dance` | 200 | ☐ |
| `/` | "Buy a Gift Voucher →" | `/gift-vouchers` | 200 | ☐ |
| `/` | "New to Dance? Start Here →" | `/start-here` | 200 | ☐ |
| `/pura-nights` | "Book a Class →" | Ticket Tailor | 200 ext | ☐ |
| `/pura-nights` | "See Prices →" | `/prices` | 200 | ☐ |
| `/pura-nights` | "See Upcoming Dates →" | `/events` | 200 | ☐ |
| `/prices` | "Buy a Gift Voucher" | `/gift-vouchers` | 200 | ☐ |
| `/prices` | "Enquire via WhatsApp" | WhatsApp | 200 ext | ☐ |
| `/beginners` | "What to Expect →" | `/start-here` | 200 | ☐ |
| `/beginners` | "Ask Melitta a Question" | WhatsApp | 200 ext | ☐ |
| `/wedding-dance` | "Book Free Consultation" | WhatsApp | 200 ext | ☐ |
| `/wedding-dance` | "Email Melitta" | `mailto:siomosmelitta@gmail.com` | 200 ext | ☐ |

## D. Legacy slugs that MUST 301 in Wix Redirect Manager

| Old path | → | New path | Type |
|---|---|---|---|
| `/online-classes` | → | `/online-salsa-bachata-coaching` | 301 |
| `/salsa-classes-acton-local` | → | `/salsa-classes-acton` | 301 |

(See full list in `docs/15-WIX-REDIRECT-MANAGER-IMPORT.md` and `docs/20-WIX-REDIRECT-MANAGER-MAP.md`.)

## E. Automated check (run before launch)

```bash
npm run qa:redirects   # validates 301 status + Location header for every legacy slug
npm run qa:launch      # full pre-launch sweep
```

---

**Sign-off:**

- [ ] All A–C links return 200 in Wix staging.
- [ ] All D legacy slugs return 301 → correct canonical (verified by Redirect Manager + curl).
- [ ] No internal link fires through a 30x chain longer than 1 hop.
- [ ] `sitemap.xml` excludes every legacy/redirected slug.
