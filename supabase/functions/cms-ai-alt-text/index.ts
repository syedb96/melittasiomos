// Generate descriptive alt text for an image URL using Gemini vision.
// Body: { image_url: string, context?: string }
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const { image_url, context } = await req.json();
    if (!image_url) return new Response(JSON.stringify({ error: "image_url required" }), { status: 400, headers: cors });

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You write concise, SEO-friendly image alt text (max 120 chars). Describe the subject and action plainly. No 'image of' prefix. UK English. If brand context is given, incorporate it naturally." },
          { role: "user", content: [
            { type: "text", text: `Brand context: Pura Nights — premium London salsa & bachata classes/socials. Page context: ${context || "blog post"}.\n\nReturn ONLY the alt text, no quotes.` },
            { type: "image_url", image_url: { url: image_url } },
          ] },
        ],
      }),
    });
    if (!r.ok) {
      const txt = await r.text();
      return new Response(JSON.stringify({ error: `AI error ${r.status}: ${txt.slice(0, 200)}` }), { status: r.status, headers: cors });
    }
    const data = await r.json();
    const alt = (data?.choices?.[0]?.message?.content || "").trim().slice(0, 140);
    return new Response(JSON.stringify({ alt }), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: cors });
  }
});
