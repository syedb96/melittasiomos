import { supabase } from "@/integrations/supabase/client";

type Gtag = (command: "event" | "config" | "js", ...args: unknown[]) => void;

function getGtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === "function" ? g : null;
}

const isDev = typeof import.meta !== "undefined" && (import.meta as { env?: { DEV?: boolean } }).env?.DEV;

export function trackEvent(category: string, action: string, label?: string, value?: number) {
  try {
    const g = getGtag();
    if (g) g("event", action, { event_category: category, event_label: label, value });
    if (isDev) console.log("[analytics]", { category, action, label, value });
  } catch { /* noop */ }
}

export function trackPageView(path: string) {
  try {
    const g = getGtag();
    if (g) g("event", "page_view", { page_path: path });
    if (isDev) console.log("[analytics] page_view", path);
  } catch { /* noop */ }
}

export function trackLead(source: string) {
  trackEvent("lead", source, typeof window !== "undefined" ? window.location.pathname : undefined);
}

export function trackConversion(type: string) {
  trackEvent("conversion", type, typeof window !== "undefined" ? window.location.pathname : undefined);
}

/* Legacy helpers kept for existing callers */
export async function trackCtaClick(args: { ctaLabel: string; ctaType?: string; destination?: string; }) {
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
  } catch { /* swallow */ }
}

export function trackCta(label: string, location?: string) {
  try {
    const w = typeof window !== "undefined" ? (window as unknown as { dataLayer?: Record<string, unknown>[] }) : undefined;
    if (w && Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: "cta_click", cta_label: label, cta_location: location ?? "unknown", page_path: window.location.pathname });
    }
  } catch { /* noop */ }
  trackEvent("cta", label, location);
  void trackCtaClick({ ctaLabel: label, ctaType: location ?? "cta" });
}
