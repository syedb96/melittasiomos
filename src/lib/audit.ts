import { supabase } from "@/integrations/supabase/client";

/**
 * Lightweight admin audit log helper. Writes to `admin_audit_log`.
 * Safe to fire-and-forget — failures are swallowed so they never block UX.
 */
export type AuditAction =
  | "sign_in"
  | "sign_out"
  | "page_published"
  | "page_unpublished"
  | "page_scheduled"
  | "page_draft_saved"
  | "page_restored";

export interface AuditPayload {
  action: AuditAction;
  entity_type?: string;
  entity_id?: string;
  entity_label?: string;
  metadata?: Record<string, unknown>;
}

export async function logAudit(payload: AuditPayload): Promise<void> {
  try {
    await supabase.from("admin_audit_log").insert({
      action: payload.action,
      entity_type: payload.entity_type ?? null,
      entity_id: payload.entity_id ?? null,
      entity_label: payload.entity_label ?? null,
      metadata: (payload.metadata ?? {}) as never,
    });
  } catch {
    /* never block UI on audit failures */
  }
}
