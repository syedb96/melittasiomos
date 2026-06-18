// AI blog generator — calls Lovable AI Gateway to produce a full SEO-ready draft.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Input {
  keyword: string;
  angle?: string;
  location?: string;
  wordCount?: number;
  moneyPage?: string;
  tone?: string;
}

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const body: Input = await req.json();
    const { keyword, angle = "events", location = "London", wordCount = 1000, moneyPage = "/pura-nights", tone = "Warm, premium, UK English" } = body;
    if (!keyword) return new Response(JSON.stringify({ error: "Missing keyword" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const system = `You are a senior SEO content editor for Pura Nights, a salsa & bachata dance school in West London. Write to UK English, warm + premium tone. Never use fake awards, never use exclamation marks for hype. Target a Flesch-Kincaid grade of 8-10.

Mandatory output rules:
- Title (H1) must contain the primary keyword.
- First 100 words of the intro must contain the primary keyword.
- 5-8 H2 sections, each followed by a short paragraph (60-180 words).
- Include exactly 5 FAQs (question + answer).
- Include at least 2 internal links to Pura Nights money pages (chosen from: /pura-nights, /latin-friday, /your-first-class, /prices, /private-lessons, /wedding-dance, /corporate-dance-classes-london, /events, /pura-ladies, /salsa-classes-chiswick, /bachata-classes-ealing). One of them must be ${moneyPage}.
- Meta title: 30-60 chars, contains keyword.
- Meta description: 120-160 chars, contains keyword.
- Slug: kebab-case, max 60 chars, contains keyword.
- Provide JSON-LD Article + FAQPage schema.

Output strictly as JSON with this shape:
{
  "title": string,
  "slug": string,
  "metaTitle": string,
  "metaDescription": string,
  "contentHtml": string,  // full HTML body with <h2>, <p>, <a href="/...">, <ul>, etc. No <h1>, no <html>/<body> wrapper.
  "faqs": [{ "q": string, "a": string }],
  "schemaJsonld": [ Article schema object, FAQPage schema object ]
}`;

    const userPrompt = `Primary keyword: "${keyword}"
Funnel angle: ${angle}
Location focus: ${location}
Target money page: ${moneyPage}
Approx word count: ${wordCount}
Tone: ${tone}

Write a blog post that ranks for the primary keyword and converts readers toward ${moneyPage}. Position Pura Nights as the welcoming, affordable, beginner-friendly choice. Mention that it's the UK's leading "fun night out for not a lot of money" in salsa & bachata where it naturally fits. Avoid sales pressure.`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResp.ok) {
      const txt = await aiResp.text();
      const status = aiResp.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limited — try again shortly." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Top up in workspace settings." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ error: `AI gateway error: ${txt}` }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiJson = await aiResp.json();
    const raw = aiJson.choices?.[0]?.message?.content ?? "{}";
    let parsed: any;
    try { parsed = JSON.parse(raw); } catch {
      const m = String(raw).match(/\{[\s\S]*\}/);
      parsed = m ? JSON.parse(m[0]) : {};
    }

    const out = {
      title: parsed.title || "",
      slug: slugify(parsed.slug || parsed.title || keyword),
      metaTitle: parsed.metaTitle || parsed.title || "",
      metaDescription: parsed.metaDescription || "",
      contentHtml: parsed.contentHtml || "",
      faqs: parsed.faqs || [],
      schemaJsonld: parsed.schemaJsonld || null,
    };

    return new Response(JSON.stringify(out), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
