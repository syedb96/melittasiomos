import { supabase } from "@/integrations/supabase/client";

/**
 * Lightweight client-side security event logger.
 * Writes to public.security_events (admin-readable only).
 * Never throws — logging must not break user flows.
 */
export type SecurityEventType =
  | "form_validation_failed"
  | "form_honeypot_tripped"
  | "form_submission_error"
  | "form_submission_success"
  | "connector_error"
  | "auth_failure";

export type SecuritySeverity = "info" | "warn" | "error";

interface LogPayload {
  event_type: SecurityEventType;
  source: string;
  severity?: SecuritySeverity;
  meta?: Record<string, unknown>;
}

export async function logSecurityEvent(p: LogPayload): Promise<void> {
  try {
    await supabase.from("security_events").insert([{
      event_type: p.event_type,
      source: p.source.slice(0, 120),
      severity: p.severity ?? "info",
      page_path: typeof window !== "undefined" ? window.location.pathname.slice(0, 300) : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      meta: (p.meta ?? {}) as never,
    }]);
  } catch {
    // swallow — logging must never break the UX
  }
}
