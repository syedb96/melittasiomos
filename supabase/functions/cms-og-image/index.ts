// Generate an on-brand 1200x630 OG/Twitter card image for a blog post and upload to storage.
// Body: { page_id: string }
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
  try {
    const { page_id } = await req.json();
    if (!page_id) return new Response(JSON.stringify({ error: "page_id required" }), { status: 400, headers: cors });
    const { data: page } = await sb.from("cms_pages").select("title,city,topic,primary_keyword,slug").eq("id", page_id).maybeSingle();
    if (!page) return new Response(JSON.stringify({ error: "not found" }), { status: 404, headers: cors });

    const prompt = `Editorial 1200x630 social-share card for a salsa/bachata dance brand called "Pura Nights".
Theme: warm, premium, candle-lit Latin nightlife.
Color palette: deep charcoal #151515 background with burnt terracotta #CF6A3D accents and warm cream typography.
Composition: cinematic photo of dancers in motion at a candle-lit venue, soft bokeh, shallow depth of field, centered subject with darkened left/right edges for text overlay.
Overlay typography (must be legible, integrated): elegant Playfair Display serif headline reading "${page.title}".
Small accent line above the headline in caps: "PURA NIGHTS${page.city ? ` · ${page.city.toUpperCase()}` : ""}".
Tiny website mark bottom right: "puranights.com".
Style: editorial, lifestyle magazine, never cartoonish, no busy patterns.
No watermarks, no logos other than the puranights.com text.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!r.ok) {
      const txt = await r.text();
      return new Response(JSON.stringify({ error: `image gen ${r.status}: ${txt.slice(0, 300)}` }), { status: r.status, headers: cors });
    }
    const data = await r.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return new Response(JSON.stringify({ error: "no image returned" }), { status: 502, headers: cors });

    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const path = `og/${page.slug}-${Date.now()}.png`;
    const up = await sb.storage.from("hero-media").upload(path, bytes, { contentType: "image/png", upsert: true });
    if (up.error) return new Response(JSON.stringify({ error: up.error.message }), { status: 500, headers: cors });
    const { data: pub } = sb.storage.from("hero-media").getPublicUrl(path);
    const url = pub.publicUrl;

    await sb.from("cms_pages").update({ og_image: url, twitter_image: url, og_image_generated_at: new Date().toISOString() }).eq("id", page_id);
    return new Response(JSON.stringify({ url }), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: cors });
  }
});
