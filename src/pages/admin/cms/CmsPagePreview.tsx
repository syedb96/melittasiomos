/* Admin-only draft preview — renders any page by ID irrespective of status. */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Eye, ArrowLeft } from "lucide-react";

interface PreviewPage {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  status: string;
  hero_image_url: string | null;
  updated_at: string;
}

export default function CmsPagePreview() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<PreviewPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }
      setAuthorised(true);
      const { data } = await supabase.from("cms_pages")
        .select("id,slug,title,excerpt,content_html,status,hero_image_url,updated_at")
        .eq("id", id!).maybeSingle();
      setPage((data as PreviewPage | null) ?? null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!authorised) return <div className="min-h-screen flex items-center justify-center p-8"><p className="text-muted-foreground">Sign in to preview drafts.</p></div>;
  if (!page) return <div className="min-h-screen flex items-center justify-center p-8"><p className="text-muted-foreground">Page not found.</p></div>;

  return (
    <Layout>
      {/* Draft preview banner — never indexed (no SeoHead, robots will get default app meta) */}
      <div className="bg-amber-500 text-amber-950 px-4 py-2 text-sm font-heading sticky top-0 z-50 flex items-center justify-between gap-3 flex-wrap">
        <span className="flex items-center gap-2"><Eye size={14} />Draft preview · status: <strong className="uppercase">{page.status}</strong> · last edited {new Date(page.updated_at).toLocaleString()}</span>
        <Link to={`/admin/cms/pages/${page.id}`} className="inline-flex items-center gap-1 underline"><ArrowLeft size={12} />Back to editor</Link>
      </div>
      <article className="container max-w-3xl mx-auto px-4 py-12">
        {page.hero_image_url && <img src={page.hero_image_url} alt={page.title} className="w-full rounded-xl mb-8 aspect-video object-cover" />}
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{page.title}</h1>
        {page.excerpt && <p className="text-lg text-muted-foreground mb-8">{page.excerpt}</p>}
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content_html }} />
      </article>
    </Layout>
  );
}
