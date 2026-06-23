// forms-notify: anti-spam guard, template render, route resolve, then either
// invoke send-transactional-email or record skipped_no_email_infra for replay.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface NotifyPayload {
  form_slug: string;
  enquiry_type?: string | null;
  submission_id?: string;
  visitor_email?: string;
  visitor_name?: string;
  data?: Record<string, unknown>;
  is_test?: boolean;
  // Anti-spam
  honeypot?: string; // hidden field, must be empty
  skip_antispam?: boolean; // admin test harness only
}

// Defaults — admin-tunable later
const RATE_HOURLY = 5;
const RATE_DAILY = 20;
const DUP_TTL_HOURS = 24;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let body: NotifyPayload;
  try { body = await req.json(); } catch { return json({ error: "invalid_json" }, 400); }
  if (!body.form_slug) return json({ error: "missing form_slug" }, 400);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const isTest = !!body.is_test;
  const skipAntispam = !!body.skip_antispam || isTest;

  // ── 1) Anti-spam guards ───────────────────────────────────────────────
  if (!skipAntispam) {
    // Honeypot
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return json({ ok: true, suppressed: "honeypot" }); // pretend success
    }

    // Rate limit (per ip + per email, per form)
    const buckets = [`ip:${ip}`];
    if (body.visitor_email) buckets.push(`email:${body.visitor_email.toLowerCase()}`);
    for (const bucket of buckets) {
      const blocked = await checkRateLimit(supabase, body.form_slug, bucket);
      if (blocked) {
        return json({ error: "rate_limited", retry_after_minutes: blocked }, 429);
      }
    }

    // Duplicate detection
    const dupHash = await sha256(
      `${body.form_slug}|${body.visitor_email ?? ""}|${body.visitor_name ?? ""}|${JSON.stringify(body.data ?? {})}`,
    );
    const since = new Date(Date.now() - DUP_TTL_HOURS * 3600 * 1000).toISOString();
    const { data: existing } = await supabase
      .from("form_submission_hashes")
      .select("hash")
      .eq("hash", dupHash)
      .gte("created_at", since)
      .maybeSingle();
    if (existing) return json({ error: "duplicate_submission" }, 409);
    await supabase.from("form_submission_hashes").upsert({ hash: dupHash, form_slug: body.form_slug });
  }

  // ── 2) Resolve route ─────────────────────────────────────────────────
  const { data: routes, error: routeErr } = await supabase
    .from("notification_routes")
    .select("*, internal_template:internal_template_id(*), user_template:user_template_id(*)")
    .eq("form_slug", body.form_slug)
    .eq("is_active", true);
  if (routeErr) return json({ error: routeErr.message }, 500);
  if (!routes || routes.length === 0) return json({ error: "no_route_configured" }, 404);

  const route = routes.find((r: any) => r.enquiry_type === body.enquiry_type)
            ?? routes.find((r: any) => !r.enquiry_type);
  if (!route) return json({ error: "no_matching_route" }, 404);

  // ── 3) Render templates from DB ──────────────────────────────────────
  const vars: Record<string, unknown> = {
    form: body.form_slug,
    enquiry_type: body.enquiry_type,
    name: body.visitor_name,
    email: body.visitor_email,
    ...(body.data ?? {}),
  };

  const attempts: Array<{ recipient: string; template: string; status: string; error?: string; subject?: string; }> = [];

  const send = async (recipient: string, tpl: any, fallbackName: string) => {
    const rendered = tpl
      ? { subject: render(tpl.subject, vars), html: render(tpl.body_html, vars), text: tpl.body_text ? render(tpl.body_text, vars) : null }
      : { subject: `[${body.form_slug}] submission`, html: `<pre>${escapeHtml(JSON.stringify(vars, null, 2))}</pre>`, text: null };

    if (isTest) {
      attempts.push({ recipient, template: tpl?.slug ?? fallbackName, status: "test", subject: rendered.subject });
      return;
    }

    try {
      const r = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          templateName: tpl?.slug ?? fallbackName,
          recipientEmail: recipient,
          subject: rendered.subject,
          html: rendered.html,
          text: rendered.text,
          idempotencyKey: `${body.form_slug}-${body.submission_id ?? crypto.randomUUID()}-${tpl?.slug ?? fallbackName}`,
          templateData: vars,
        }),
      });
      if (r.status === 404) {
        attempts.push({ recipient, template: tpl?.slug ?? fallbackName, status: "skipped_no_email_infra", subject: rendered.subject, error: "email infra not configured" });
        await r.text().catch(() => {});
        return;
      }
      if (!r.ok) {
        const txt = await r.text();
        attempts.push({ recipient, template: tpl?.slug ?? fallbackName, status: "failed", subject: rendered.subject, error: `${r.status} ${txt.slice(0, 200)}` });
        return;
      }
      await r.text().catch(() => {});
      attempts.push({ recipient, template: tpl?.slug ?? fallbackName, status: "sent", subject: rendered.subject });
    } catch (e) {
      attempts.push({ recipient, template: tpl?.slug ?? fallbackName, status: "skipped_no_email_infra", error: String(e).slice(0, 200) });
    }
  };

  await send(route.recipient_email, route.internal_template, route.template_name);
  for (const cc of (route.cc_emails ?? [])) await send(cc, route.internal_template, route.template_name);
  if (route.send_user_confirmation && body.visitor_email) {
    await send(body.visitor_email, route.user_template, route.user_confirmation_template);
  }

  // ── 4) Log + SLA ─────────────────────────────────────────────────────
  const due_at = new Date(Date.now() + (route.escalation_minutes ?? 1440) * 60 * 1000).toISOString();
  const rows = attempts.map((a) => ({
    form_slug: body.form_slug,
    enquiry_type: body.enquiry_type ?? null,
    submission_id: body.submission_id ?? null,
    route_id: route.id,
    recipient_email: a.recipient,
    template_name: a.template,
    status: a.status,
    error_message: a.error ?? null,
    is_test: isTest,
    metadata: { subject: a.subject, sla_due_at: due_at, sla_minutes: route.escalation_minutes },
  }));
  if (rows.length) await supabase.from("notification_log").insert(rows);

  return json({ ok: true, route_id: route.id, attempts });
});

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

function render(tpl: string, vars: Record<string, unknown>): string {
  return tpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, k) => {
    const v = vars[k];
    return v == null ? "" : String(v);
  });
}

function escapeHtml(s: string) { return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!)); }

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Returns 0 when allowed, or minutes-until-reset when blocked. */
async function checkRateLimit(supabase: any, form_slug: string, bucket_key: string): Promise<number> {
  const now = Date.now();
  const { data: row } = await supabase
    .from("form_rate_limits")
    .select("*")
    .eq("form_slug", form_slug)
    .eq("bucket_key", bucket_key)
    .maybeSingle();

  if (!row) {
    await supabase.from("form_rate_limits").insert({ form_slug, bucket_key, count: 1 });
    return 0;
  }

  const windowAge = now - new Date(row.window_started_at).getTime();
  const hourMs = 3600 * 1000;
  const dayMs = 24 * hourMs;

  // Reset window after 1 day
  if (windowAge > dayMs) {
    await supabase.from("form_rate_limits").update({ count: 1, window_started_at: new Date().toISOString(), last_seen_at: new Date().toISOString() }).eq("id", row.id);
    return 0;
  }

  const nextCount = row.count + 1;
  // Hard daily cap
  if (nextCount > RATE_DAILY) return Math.ceil((dayMs - windowAge) / 60000);
  // Hourly cap within first hour
  if (windowAge < hourMs && nextCount > RATE_HOURLY) return Math.ceil((hourMs - windowAge) / 60000);

  await supabase.from("form_rate_limits").update({ count: nextCount, last_seen_at: new Date().toISOString() }).eq("id", row.id);
  return 0;
}
