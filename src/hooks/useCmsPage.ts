import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  status: string;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  noindex: boolean;
  schema_jsonld: any;
  category: string | null;
  tags: string[];
  published_at: string | null;
  updated_at: string;
}

export function useCmsPage(slug: string) {
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<{ to: string; code: number } | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    (async () => {
      const path = `/${slug}`.replace(/\/+/g, "/");
      const { data: rd } = await supabase.from("cms_redirects").select("to_path,status_code").eq("from_path", path).eq("is_active", true).maybeSingle();
      if (rd && active) { setRedirect({ to: rd.to_path, code: rd.status_code }); setLoading(false); return; }
      const { data } = await supabase.from("cms_pages").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (active) { setPage((data as CmsPage | null) ?? null); setLoading(false); }
    })();
    return () => { active = false; };
  }, [slug]);

  return { page, loading, redirect };
}
