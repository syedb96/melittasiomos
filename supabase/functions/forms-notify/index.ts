// forms-notify: looks up the notification_routes for a form submission
// and either invokes send-transactional-email (when email infra exists)
// or logs the attempt to notification_log for later replay.
// Used by both public submissions and the admin test-submission harness.

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
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let body: NotifyPayload;
  try { body = await req.json(); } catch { return json({ error: "invalid_json" }, 400); }

  if (!body.form_slug) return json({ error: "missing form_slug" }, 400);

  // 1) Resolve route: most-specific (form+enquiry_type) wins, else default for form
  const { data: routes, error: routeErr } = await supabase
    .from("notification_routes")
    .select("*")
    .eq("form_slug", body.form_slug)
    .eq("is_active", true);
  if (routeErr) return json({ error: routeErr.message }, 500);
  if (!routes || routes.length === 0) return json({ error: "no_route_configured" }, 404);

  const route = routes.find((r) => r.enquiry_type === body.enquiry_type) ?? routes.find((r) => !r.enquiry_type);
  if (!route) return json({ error: "no_matching_route" }, 404);

  // 2) Try send-transactional-email if it's deployed
  const SEND_FN = `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-transactional-email`;
  const attempts: Array<{ recipient: string; template: string; status: string; error?: string; is_test: boolean }> = [];

  const tryInvokeSend = async (recipient: string, template: string, vars: Record<string, unknown>) => {
    if (body.is_test) {
      attempts.push({ recipient, template, status: "test", is_test: true });
      return;
    }
    try {
      const r = await fetch(SEND_FN, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateName: template,
          recipientEmail: recipient,
          idempotencyKey: `${body.form_slug}-${body.submission_id ?? crypto.randomUUID()}-${template}`,
          templateData: vars,
        }),
      });
      if (r.status === 404) {
        attempts.push({ recipient, template, status: "skipped_no_email_infra", is_test: false, error: "send-transactional-email not deployed (email domain not configured)" });
        return;
      }
      if (!r.ok) {
        const txt = await r.text();
        attempts.push({ recipient, template, status: "failed", is_test: false, error: `${r.status} ${txt.slice(0, 200)}` });
        return;
      }
      attempts.push({ recipient, template, status: "sent", is_test: false });
    } catch (e) {
      attempts.push({ recipient, template, status: "skipped_no_email_infra", is_test: false, error: String(e).slice(0, 200) });
    }
  };

  const vars = { form: body.form_slug, enquiry_type: body.enquiry_type, name: body.visitor_name, email: body.visitor_email, ...body.data };

  // Internal recipient
  await tryInvokeSend(route.recipient_email, route.template_name, vars);
  for (const cc of route.cc_emails ?? []) await tryInvokeSend(cc, route.template_name, vars);
  // User confirmation
  if (route.send_user_confirmation && body.visitor_email) {
    await tryInvokeSend(body.visitor_email, route.user_confirmation_template, vars);
  }

  // 3) Persist attempts to notification_log
  const rows = attempts.map((a) => ({
    form_slug: body.form_slug,
    enquiry_type: body.enquiry_type ?? null,
    submission_id: body.submission_id ?? null,
    route_id: route.id,
    recipient_email: a.recipient,
    template_name: a.template,
    status: a.status,
    error_message: a.error ?? null,
    is_test: a.is_test,
    metadata: { route_template: route.template_name },
  }));
  if (rows.length) await supabase.from("notification_log").insert(rows);

  return json({ ok: true, route_id: route.id, attempts });

  function json(obj: unknown, status = 200) {
    return new Response(JSON.stringify(obj), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
