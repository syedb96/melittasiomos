import { useLocation, Navigate } from "react-router-dom";
import { useCmsPage } from "@/hooks/useCmsPage";
import SeoHead from "@/components/SeoHead";
import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";

export default function CmsPageRoute() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const { page, loading, redirect } = useCmsPage(slug);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (redirect) return <Navigate to={redirect.to} replace />;
  if (!page) return <NotFound />;

  return (
    <Layout>
      <SeoHead
        title={page.meta_title ?? page.title}
        description={page.meta_description ?? page.excerpt ?? ""}
        path={`/${slug}`}
        ogImage={page.og_image ?? undefined}
        noindex={page.noindex}
      />
      {page.schema_jsonld && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: typeof page.schema_jsonld === "string" ? page.schema_jsonld : JSON.stringify(page.schema_jsonld) }} />
      )}
      <article className="container max-w-3xl mx-auto px-4 py-12">
        {page.hero_image_url && <img src={page.hero_image_url} alt={page.title} className="w-full rounded-xl mb-8 aspect-video object-cover" />}
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{page.title}</h1>
        {page.excerpt && <p className="text-lg text-muted-foreground mb-8">{page.excerpt}</p>}
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content_html }} />
      </article>
    </Layout>
  );
}
