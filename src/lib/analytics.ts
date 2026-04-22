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
