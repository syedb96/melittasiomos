// AI-ranked internal-link suggestions for a draft post.
// Body: { page_id?: string, title: string, city?: string, topic?: string, tags?: string[], content_html?: string }
// Returns: { suggestions: [{ slug, title, reason, anchor }] }
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
  try {
    const body = await req.json();
    const { page_id, title = "", city = "", topic = "", tags = [], content_html = "" } = body;

    // Candidate pool: published pages except the current one.
    let q = sb.from("cms_pages").select("id,slug,title,excerpt,city,topic,tags,primary_keyword").eq("status", "published").limit(80);
    if (page_id) q = q.neq("id", page_id);
    const { data: pool } = await q;

    // Rule-based pre-rank: shared city > shared topic > shared tag count.
    const ranked = (pool ?? []).map((p) => {
      let score = 0;
      if (city && p.city && p.city.toLowerCase() === city.toLowerCase()) score += 5;
      if (topic && p.topic && p.topic.toLowerCase() === topic.toLowerCase()) score += 4;
      const shared = (p.tags || []).filter((t: string) => (tags || []).some((x: string) => x?.toLowerCase() === t?.toLowerCase())).length;
      score += shared * 2;
      return { ...p, score };
    }).filter((p) => p.score > 0).sort((a, b) => b.score - a.score).slice(0, 12);

    if (ranked.length === 0) return new Response(JSON.stringify({ suggestions: [] }), { headers: { ...cors, "Content-Type": "application/json" } });

    // AI re-rank + anchor text generation.
    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You suggest internal links for a salsa/bachata blog (Pura Nights). Return a strict JSON object {\"suggestions\":[{\"slug\":\"…\",\"title\":\"…\",\"reason\":\"…\",\"anchor\":\"natural anchor text under 8 words\"}]}. Pick 4–6 best links. Avoid linking to the same city/topic if irrelevant. Anchors must read naturally in body copy and contain at least one shared keyword." },
          { role: "user", content: `Current post:\nTitle: ${title}\nCity: ${city}\nTopic: ${topic}\nTags: ${(tags||[]).join(", ")}\nContent excerpt: ${(content_html.replace(/<[^>]+>/g, " ").slice(0, 1500))}\n\nCandidates (already pre-filtered for relevance):\n${ranked.map((p) => `- ${p.slug} | ${p.title} | city=${p.city||""} topic=${p.topic||""} tags=${(p.tags||[]).join(",")}`).join("\n")}` },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!r.ok) {
      // Fallback to rule-based without AI anchors.
      return new Response(JSON.stringify({ suggestions: ranked.slice(0, 6).map((p) => ({ slug: p.slug, title: p.title, reason: "Related city/topic/tags", anchor: p.title })) }), { headers: { ...cors, "Content-Type": "application/json" } });
    }
    const data = await r.json();
    let parsed: any = {};
    try { parsed = JSON.parse(data.choices[0].message.content); } catch { parsed = { suggestions: [] }; }
    return new Response(JSON.stringify(parsed), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: cors });
  }
});
