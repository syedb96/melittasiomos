// Dynamic sitemap.xml — pulls live published CMS pages + known static routes
// Public, no JWT.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const BASE_URL = Deno.env.get("SITE_BASE_URL") ?? "https://www.puranights.com";

const STATIC_PATHS: string[] = [
  "/", "/about", "/pura-nights", "/pura-ladies", "/prices", "/bookings",
  "/contact", "/faq", "/blog", "/events", "/gallery", "/wedding-dance",
  "/private-lessons", "/gift-vouchers", "/online-classes", "/online-academy",
  "/testimonials", "/schedule", "/locations", "/start-here", "/beginners",
  "/your-first-class", "/latin-friday", "/why-pura-nights", "/loyalty",
  "/refer", "/free-taster", "/leave-a-review", "/resources",
  "/glossary/salsa-bachata", "/meet-the-team", "/proof-centre",
  "/privacy-policy", "/terms", "/cookie-policy",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  const { data: pages } = await supabase
    .from("cms_pages")
    .select("slug,updated_at,published_at")
    .eq("status", "published");

  const entries = [
    ...STATIC_PATHS.map((p) => ({ loc: `${BASE_URL}${p}`, lastmod: new Date().toISOString().slice(0, 10) })),
    ...(pages ?? []).map((p) => ({
      loc: `${BASE_URL}/${p.slug}`,
      lastmod: (p.published_at ?? p.updated_at ?? "").slice(0, 10),
    })),
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries.map((e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`),
    `</urlset>`,
  ].join("\n");

  return new Response(xml, {
    headers: { ...corsHeaders, "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=600" },
  });
});
