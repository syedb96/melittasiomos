import { supabase } from "@/integrations/supabase/client";

/**
 * Lightweight CTA click tracker.
 * Fires-and-forgets a row into public.cta_events. Never blocks the user.
 */
export async function trackCtaClick(args: {
  ctaLabel: string;
  ctaType?: string;
  destination?: string;
}) {
  try {
    const sessionKey = "pn_session_id";
    let sessionId = typeof window !== "undefined" ? sessionStorage.getItem(sessionKey) : null;
    if (typeof window !== "undefined" && !sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem(sessionKey, sessionId);
    }
    await supabase.from("cta_events").insert({
      cta_label: args.ctaLabel,
      cta_type: args.ctaType ?? "outbound",
      destination: args.destination ?? null,
      path: typeof window !== "undefined" ? window.location.pathname : "/",
      session_id: sessionId,
    });
  } catch {
    /* swallow — analytics must never break UX */
  }
}

/**
 * Lightweight wrapper used by static pages: trackCta(label, location).
 * Also pushes a dataLayer event for GTM/GA4 when present.
 */
export function trackCta(label: string, location?: string) {
  try {
    const w = typeof window !== "undefined" ? (window as unknown as { dataLayer?: Record<string, unknown>[] }) : undefined;
    if (w && Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: "cta_click",
        cta_label: label,
        cta_location: location ?? "unknown",
        page_path: window.location.pathname,
      });
    }
  } catch {
    /* no-op */
  }
  // Fire-and-forget Supabase log
  void trackCtaClick({ ctaLabel: label, ctaType: location ?? "cta" });
}
