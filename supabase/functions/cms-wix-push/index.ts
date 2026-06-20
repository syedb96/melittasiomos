// Push a published cms_pages row to Wix Blog + Wix CMS collection.
// Body: { page_id: string, force?: boolean }
// Auth: requires service role OR editor session.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const WIX_API_KEY = Deno.env.get("WIX_API_KEY");
const GATEWAY = "https://connector-gateway.lovable.dev/wix";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

function buildJsonLd(page: any, canonical: string) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.meta_title || page.title,
    description: page.meta_description || page.excerpt,
    image: page.og_image || page.hero_image_url,
    datePublished: page.published_at,
    dateModified: page.updated_at,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Pura Nights" },
    publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/logo.png" } },
    keywords: (page.tags || []).join(", "),
  };
  return article;
}

async function logSync(sb: any, pageId: string, action: string, target: string, status: string, req: any, res: any, err?: string) {
  await sb.from("cms_wix_sync_log").insert({ page_id: pageId, action, target, status, request_summary: req, response_summary: res, error: err ?? null });
}

async function wixFetch(path: string, init: RequestInit & { siteId?: string } = {}) {
  if (!LOVABLE_API_KEY || !WIX_API_KEY) throw new Error("Wix not connected: missing LOVABLE_API_KEY or WIX_API_KEY");
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${LOVABLE_API_KEY}`);
  headers.set("X-Connection-Api-Key", WIX_API_KEY);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (init.siteId) headers.set("wix-site-id", init.siteId);
  const r = await fetch(`${GATEWAY}${path}`, { ...init, headers });
  const text = await r.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { raw: text }; }
  if (!r.ok) throw Object.assign(new Error(`Wix ${r.status}: ${text.slice(0, 400)}`), { status: r.status, body });
  return body;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
  try {
    const { page_id, force = false } = await req.json();
    if (!page_id) return json({ error: "page_id required" }, 400);

    const { data: page, error } = await sb.from("cms_pages").select("*").eq("id", page_id).maybeSingle();
    if (error || !page) return json({ error: "page not found" }, 404);
    if (page.status !== "published" && !force) return json({ skipped: "not published" });
    if (page.wix_auto_sync === false && !force) return json({ skipped: "auto-sync disabled" });

    const { data: cfg } = await sb.from("cms_wix_config").select("*").maybeSingle();
    if (!cfg?.wix_site_id) {
      await sb.from("cms_pages").update({ wix_sync_status: "error", wix_sync_error: "Wix site not configured" }).eq("id", page_id);
      return json({ error: "Wix site not configured in cms_wix_config" }, 412);
    }
    const siteId = cfg.wix_site_id;
    const canonical = `https://www.puranights.com/${page.slug}`;
    const jsonld = buildJsonLd(page, canonical);

    const seo = {
      slug: page.slug,
      title: page.meta_title || page.title,
      description: page.meta_description || page.excerpt || "",
      canonicalUrl: canonical,
      ogImage: page.og_image || page.hero_image_url,
    };

    // --- 1. Push to Wix Blog (Draft Posts API) ---
    let blogResult: any = null;
    try {
      const blogPayload: any = {
        draftPost: {
          title: page.title,
          excerpt: page.excerpt || page.meta_description,
          richContent: { nodes: [{ type: "PARAGRAPH", nodes: [{ type: "TEXT", textData: { text: page.content_html?.replace(/<[^>]+>/g, "").slice(0, 8000) || "" } }] }] },
          memberId: cfg.wix_blog_member_id,
          coverMedia: page.og_image ? { image: page.og_image } : undefined,
          seoData: { tags: [
            { type: "title", children: seo.title },
            { type: "meta", props: { name: "description", content: seo.description } },
            { type: "link", props: { rel: "canonical", href: canonical } },
            { type: "meta", props: { property: "og:title", content: seo.title } },
            { type: "meta", props: { property: "og:description", content: seo.description } },
            { type: "meta", props: { property: "og:image", content: seo.ogImage } },
            { type: "meta", props: { name: "twitter:card", content: "summary_large_image" } },
            { type: "script", props: { type: "application/ld+json" }, children: JSON.stringify(jsonld) },
          ] },
          slug: page.slug,
        },
      };

      if (page.wix_post_id) {
        blogResult = await wixFetch(`/blog/v3/draft-posts/${page.wix_post_id}`, { method: "PATCH", siteId, body: JSON.stringify(blogPayload) });
      } else {
        blogResult = await wixFetch(`/blog/v3/draft-posts`, { method: "POST", siteId, body: JSON.stringify(blogPayload) });
      }
      const postId = blogResult?.draftPost?.id || page.wix_post_id;
      if (postId) {
        await wixFetch(`/blog/v3/draft-posts/${postId}/publish`, { method: "POST", siteId });
      }
      await logSync(sb, page_id, page.wix_post_id ? "update" : "create", "blog", "ok", { slug: page.slug }, { id: postId });
      await sb.from("cms_pages").update({ wix_post_id: postId, wix_synced_at: new Date().toISOString(), wix_sync_status: "synced", wix_sync_error: null }).eq("id", page_id);
    } catch (e: any) {
      await logSync(sb, page_id, "push", "blog", "error", { slug: page.slug }, null, e.message);
      await sb.from("cms_pages").update({ wix_sync_status: "error", wix_sync_error: e.message?.slice(0, 500) }).eq("id", page_id);
      return json({ error: e.message, target: "blog" }, 502);
    }

    // --- 2. Mirror into Wix CMS collection (archive) ---
    if (cfg.wix_collection_id) {
      try {
        const itemPayload: any = {
          dataItem: {
            dataCollectionId: cfg.wix_collection_id,
            data: {
              title: page.title,
              slug: page.slug,
              excerpt: page.excerpt,
              contentHtml: page.content_html,
              metaTitle: seo.title,
              metaDescription: seo.description,
              canonicalUrl: canonical,
              ogImage: seo.ogImage,
              jsonLd: JSON.stringify(jsonld),
              city: page.city,
              topic: page.topic,
              tags: page.tags,
              publishedAt: page.published_at,
              primaryKeyword: page.primary_keyword,
            },
          },
        };
        let itemRes: any;
        if (page.wix_collection_item_id) {
          itemPayload.dataItem._id = page.wix_collection_item_id;
          itemRes = await wixFetch(`/wix-data/v2/items/${page.wix_collection_item_id}`, { method: "PUT", siteId, body: JSON.stringify(itemPayload) });
        } else {
          itemRes = await wixFetch(`/wix-data/v2/items`, { method: "POST", siteId, body: JSON.stringify(itemPayload) });
        }
        const itemId = itemRes?.dataItem?._id || page.wix_collection_item_id;
        await sb.from("cms_pages").update({ wix_collection_item_id: itemId }).eq("id", page_id);
        await logSync(sb, page_id, page.wix_collection_item_id ? "update" : "create", "collection", "ok", { collection: cfg.wix_collection_id }, { id: itemId });
      } catch (e: any) {
        await logSync(sb, page_id, "push", "collection", "error", { collection: cfg.wix_collection_id }, null, e.message);
      }
    }

    return json({ ok: true, wix_post_id: blogResult?.draftPost?.id });
  } catch (e: any) {
    return json({ error: e.message }, 500);
  }
});
