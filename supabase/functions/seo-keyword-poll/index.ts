// Poll Semrush for current organic positions for every active keyword
// in seo_keyword_tracking. Uses the Lovable Connector Gateway (Semrush).
// - Sets baseline_position on first successful poll
// - Updates current_position + last_checked_at
// - Records a seo_alerts entry when delta vs baseline >= 5 places (gain or loss)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/semrush";
const LOVABLE_KEY = Deno.env.get("LOVABLE_API_KEY");
const SEMRUSH_KEY = Deno.env.get("SEMRUSH_API_KEY");

interface Row {
  id: string;
  keyword: string;
  target_url: string;
  database: string;
  baseline_position: number | null;
  current_position: number | null;
}

// Semrush phrase_organic returns rows of URLs that rank for a phrase.
// We pick the row whose Url matches our target_url (or same path) and read Po (position).
async function fetchPosition(keyword: string, targetUrl: string, db: string): Promise<number | null> {
  const params = new URLSearchParams({
    phrase: keyword,
    database: db,
    export_columns: "Dn,Ur,Po",
    display_limit: "50",
  });
  const url = `${GATEWAY}/keywords/phrase_organic?${params}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${LOVABLE_KEY}`,
      "X-Connection-Api-Key": SEMRUSH_KEY!,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Semrush ${res.status}: ${body.slice(0, 200)}`);
  }
  const json = await res.json();
  const rows: any[] = json?.data?.rows ?? [];
  const want = new URL(targetUrl);
  // Match exact URL first, then same host+path, then same host
  const exact = rows.find((r) => r.Ur === targetUrl);
  if (exact) return Number(exact.Po);
  const samePath = rows.find((r) => {
    try { const u = new URL(r.Ur); return u.host === want.host && u.pathname.replace(/\/$/, "") === want.pathname.replace(/\/$/, ""); } catch { return false; }
  });
  if (samePath) return Number(samePath.Po);
  const sameHost = rows.find((r) => { try { return new URL(r.Ur).host === want.host; } catch { return false; } });
  if (sameHost) return Number(sameHost.Po);
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  if (!LOVABLE_KEY || !SEMRUSH_KEY) {
    return new Response(
      JSON.stringify({
        error: "Semrush connector not linked",
        hint: "Link the Semrush connector in the project, then re-run.",
      }),
      { status: 412, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: keywords, error } = await supabase
    .from("seo_keyword_tracking")
    .select("id, keyword, target_url, database, baseline_position, current_position")
    .eq("is_active", true);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
  }

  const summary = { polled: 0, updated: 0, ranked: 0, unranked: 0, alerts: 0, errors: [] as { keyword: string; error: string }[] };
  const checkedAt = new Date().toISOString();

  for (const k of (keywords ?? []) as Row[]) {
    summary.polled++;
    try {
      const pos = await fetchPosition(k.keyword, k.target_url, k.database);
      const patch: Record<string, unknown> = {
        current_position: pos,
        last_checked_at: checkedAt,
      };
      // Set baseline on first successful poll only
      if (pos !== null && k.baseline_position === null) patch.baseline_position = pos;

      const { error: upErr } = await supabase.from("seo_keyword_tracking").update(patch).eq("id", k.id);
      if (upErr) throw upErr;
      summary.updated++;
      if (pos === null) summary.unranked++; else summary.ranked++;

      // Alert on significant movement vs baseline (>= 5 places)
      if (pos !== null && k.baseline_position !== null) {
        const delta = k.baseline_position - pos; // positive = improvement
        if (Math.abs(delta) >= 5) {
          await supabase.from("seo_alerts").insert({
            metric: "keyword_position",
            severity: Math.abs(delta) >= 10 ? "high" : "medium",
            message: `"${k.keyword}" moved ${delta > 0 ? "up" : "down"} ${Math.abs(delta).toFixed(0)} places (baseline ${k.baseline_position} → current ${pos}) for ${k.target_url}`,
            payload: { keyword: k.keyword, target_url: k.target_url, baseline: k.baseline_position, current: pos, delta },
          });
          summary.alerts++;
        }
      }
      // light rate-limit cushion
      await new Promise((r) => setTimeout(r, 250));
    } catch (e) {
      summary.errors.push({ keyword: k.keyword, error: e instanceof Error ? e.message : String(e) });
    }
  }

  await supabase.from("admin_audit_log").insert({
    action: "seo.keyword_poll",
    entity_type: "seo_keyword_tracking",
    details: summary,
  });

  return new Response(JSON.stringify(summary), { headers: { ...cors, "Content-Type": "application/json" } });
});
