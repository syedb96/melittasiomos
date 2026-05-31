// Central registry of external destinations + UTM helpers.
// Wix handoff: mirror these as Site → Settings → Custom URLs.

// Shopify store URL — update once the storefront is live.
// Placeholder uses a subdomain pattern so Wix can point shop.puranights.com → Shopify.
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
