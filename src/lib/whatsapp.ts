// Centralised WhatsApp prefill helpers for all enquiry CTAs.
// Wix replication: replicate as a static map per page; each button's
// link field becomes https://wa.me/{PHONE}?text={encoded message}.
//
// Keep messages short, friendly, intent-rich. No spam tone. Always
// reference the specific page/class/voucher/event so Melitta can
// reply with context. See docs/61-WIX-ENQUIRY-ROUTING-MAP.md.

export const WA_PHONE = "447449482343";

const enc = (s: string) => encodeURIComponent(s.trim());

export function waLink(message: string) {
  return `https://wa.me/${WA_PHONE}?text=${enc(message)}`;
}

// Prefilled message presets, grouped by intent.
export const WA = {
  // /schedule
  scheduleMonChiswick: () => waLink(
    "Hi Melitta, I'm looking at the Monday Chiswick salsa & bachata class at The George IV. Is it suitable for a complete beginner coming alone?"
  ),
  scheduleTueEaling: () => waLink(
    "Hi Melitta, I'm looking at the Tuesday Ealing class at the Drayton Court. Can I just come for the beginner slot first?"
  ),
  scheduleGeneral: () => waLink(
    "Hi Melitta, I'd like to ask about the weekly class schedule and which class would suit me best."
  ),
  // /prices
  pricesEnquiry: () => waLink(
    "Hi Melitta, I'd like to ask about pricing and bundles for the weekly classes."
  ),
  pricesPrivate: () => waLink(
    "Hi Melitta, I'd like to enquire about private 1-to-1 lessons. Could you share availability and packages?"
  ),
  pricesWedding: () => waLink(
    "Hi Melitta, we'd love to enquire about wedding dance coaching. Can we book a free consultation?"
  ),
  // /pura-nights — class-specific
  puraNightsMon: () => waLink(
    "Hi Melitta, I'd like to come to the Monday Chiswick class. Can you confirm if this week is running and if I should book in advance?"
  ),
  puraNightsTue: () => waLink(
    "Hi Melitta, I'd like to come to the Tuesday Ealing class. Is the beginner slot the best place to start?"
  ),
  // /events
  eventsGroup: () => waLink(
    "Hi Melitta, please add me to the Pura Nights WhatsApp group for class reminders and Latin Friday updates."
  ),
  eventLatinFriday: (date?: string) => waLink(
    `Hi Melitta, I'd like to come to Latin Friday${date ? ` on ${date}` : ""}. Can you confirm tickets and the workshop time?`
  ),
  // /gift-vouchers — per amount
  voucher: (amount: number) => waLink(
    `Hi Melitta, I'm interested in the £${amount} Pura Nights gift voucher. Can you confirm how it works and how I can purchase it?`
  ),
  voucherCustom: () => waLink(
    "Hi Melitta, I'd like to buy a custom-amount Pura Nights gift voucher (above £200). Could you send me the details?"
  ),
  // /private-lessons
  privateLessons: () => waLink(
    "Hi Melitta, I'd like to enquire about private dance lessons. Could you share availability and what to expect from a first session?"
  ),
  // /wedding-dance
  weddingDance: () => waLink(
    "Hi Melitta, we're getting married and would love to enquire about wedding dance coaching. Can we book a free consultation?"
  ),
  // /corporate-bookings
  corporate: (date?: string, group?: string) => waLink(
    `Hi Melitta, I'd like to enquire about a corporate Salsa/Bachata session${date ? ` on ${date}` : ""}${group ? ` for ${group} people` : ""}. Could you send a quote?`
  ),
  // /group-parties / hen / birthday
  groupParty: (date?: string, group?: string) => waLink(
    `Hi Melitta, I'd like to plan a private group dance party${date ? ` on ${date}` : ""}${group ? ` for ${group} people` : ""}. Could you send pricing and availability?`
  ),
  // /pura-ladies
  puraLadies: () => waLink(
    "Hi Melitta, I'd love to enquire about joining Pura Ladies. Could you let me know about auditions and the next intake?"
  ),
  // /start-here — first timer
  startHere: () => waLink(
    "Hi Melitta, I'm new and I'd love to ask a couple of questions before I come to a class."
  ),
  // /online-salsa-bachata-coaching
  online: (level?: string, style?: string) => waLink(
    `Hi Melitta, I'd like to ask about online dance coaching${style ? ` for ${style}` : ""}${level ? ` (level: ${level})` : ""}. Could you share availability and what's included?`
  ),
  // /partner-with-pura-nights
  partner: (org?: string) => waLink(
    `Hi Melitta, I'm reaching out from ${org || "[organisation]"} about a possible partnership / collaboration with Pura Nights. Could we have a quick chat?`
  ),
  // Membership pathway
  membership: () => waLink(
    "Hi Melitta, I'd like to ask which Pura Nights pass would suit me best — drop-in, bundle or monthly unlimited."
  ),
  // /loyalty — eligibility = drop-in weekly classes + Latin Friday tickets only.
  // Bundles + monthly unlimited + private/wedding/corporate are NOT eligible.
  loyaltyJoin: () => waLink(
    "Hi Melitta, I'd love to join the Pura Nights loyalty card. Could you confirm which weekly drop-in and Latin Friday sessions count toward the 9th-free reward?"
  ),
  loyaltyEligibility: () => waLink(
    "Hi Melitta, quick loyalty question — do my recent drop-ins and Latin Friday tickets count toward the 8+1 reward? Could you check my current count?"
  ),
  // Generic fallback
  general: () => waLink(
    "Hi Melitta, I'd like to ask a quick question about Pura Nights."
  ),
};

// Lightweight CTA tracking — defers to existing dataLayer/trackCta if present.
export function trackWaClick(context: string, meta?: Record<string, unknown>) {
  try {
    const w = window as unknown as {
      dataLayer?: Array<Record<string, unknown>>;
      trackCta?: (name: string, meta?: Record<string, unknown>) => void;
    };
    if (typeof w.trackCta === "function") {
      w.trackCta(`whatsapp:${context}`, meta);
      return;
    }
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: "cta_click", cta_type: "whatsapp", cta_context: context, ...meta });
    }
  } catch { /* no-op */ }
}
