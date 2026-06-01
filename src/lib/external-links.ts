// Central registry of external destinations + UTM helpers.
// Wix handoff: mirror these as Site → Settings → Custom URLs.

// Shopify store — currently NOT live. When the store is ready:
//   1. Set SHOPIFY_STORE_ENABLED = true
//   2. Update SHOPIFY_STORE_URL to the final domain (shop.puranights.com or .myshopify.com)
//   3. Re-add Shop entries in Header.tsx navGroups/mobileLinks and Footer.tsx
export const SHOPIFY_STORE_ENABLED = false;
export const SHOPIFY_STORE_URL = "https://shop.puranights.com";

export const BOOKING_URL = "https://www.tickettailor.com/events/puranights";
export const LINKTREE_URL = "https://linktr.ee/pura.nights";
export const WHATSAPP_BASE = "https://wa.me/447449482343";
export const INSTAGRAM_MAIN = "https://www.instagram.com/puranights.salsabachata/";

/**
 * Build a UTM-tagged URL.
 * Used for partner/influencer/press tracking so we can attribute traffic in GA4.
 */
export function withUtm(
  url: string,
  opts: { source: string; medium?: string; campaign?: string; content?: string }
): string {
  const u = new URL(url, "https://www.puranights.com");
  u.searchParams.set("utm_source", opts.source);
  u.searchParams.set("utm_medium", opts.medium ?? "referral");
  if (opts.campaign) u.searchParams.set("utm_campaign", opts.campaign);
  if (opts.content) u.searchParams.set("utm_content", opts.content);
  return u.toString();
}

/** Influencer / ambassador trackable link factory. */
export function influencerLink(handle: string, target = "/") {
  return withUtm(`https://www.puranights.com${target}`, {
    source: handle.replace(/^@/, ""),
    medium: "influencer",
    campaign: "ambassador-2026",
  });
}

/** Published revenue-share tiers shown on /influencers and used in apply prefill. */
export const INFLUENCER_TIERS = [
  {
    name: "Starter",
    share: "10%",
    threshold: "1–4 paying students / month",
    note: "Perfect for first-time creators getting traction.",
  },
  {
    name: "Partner",
    share: "15%",
    threshold: "5–14 paying students / month",
    note: "Our standard ambassador tier — market rate for London lifestyle creators.",
  },
  {
    name: "Headline",
    share: "20%",
    threshold: "15+ paying students / month",
    note: "Top-tier — co-created reels, featured on the site, priority on private bookings.",
  },
] as const;
