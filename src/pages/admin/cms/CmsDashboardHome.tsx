import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileEdit, Calendar, Sparkles, BarChart3, Image as ImageIcon, ArrowRight } from "lucide-react";

const CmsDashboardHome = () => {
  const [stats, setStats] = useState({ published: 0, scheduled: 0, drafts: 0, avgScore: 0, mediaCount: 0, views7d: 0 });

  useEffect(() => {
    (async () => {
      const [pub, sch, drf, all, media, views] = await Promise.all([
        supabase.from("cms_pages").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("cms_pages").select("id", { count: "exact", head: true }).eq("status", "scheduled"),
        supabase.from("cms_pages").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("cms_pages").select("seo_score").not("seo_score", "is", null),
        supabase.from("cms_media").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 7 * 864e5).toISOString()),
      ]);
      const scores = (all.data ?? []).map((r: any) => r.seo_score).filter((n: any) => typeof n === "number");
      const avg = scores.length ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0;
      setStats({
        published: pub.count ?? 0,
        scheduled: sch.count ?? 0,
        drafts: drf.count ?? 0,
        avgScore: avg,
        mediaCount: media.count ?? 0,
        views7d: views.count ?? 0,
      });
    })();
  }, []);

  const tiles = [
    { label: "Published pages", value: stats.published, icon: FileEdit, to: "/admin/cms/pages" },
    { label: "Scheduled", value: stats.scheduled, icon: Calendar, to: "/admin/cms/schedule" },
    { label: "Drafts", value: stats.drafts, icon: FileEdit, to: "/admin/cms/pages" },
    { label: "Avg SEO score", value: stats.avgScore || "—", icon: BarChart3, to: "/admin/cms/pages" },
    { label: "Media assets", value: stats.mediaCount, icon: ImageIcon, to: "/admin/cms/media" },
    { label: "Page views (7d)", value: stats.views7d, icon: BarChart3, to: "/admin/analytics" },
  ];

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Content Dashboard</h1>
          <p className="text-muted-foreground">Pages, blog posts, scheduling and SEO scoring — all in one place.</p>
        </div>
        <Button asChild>
          <Link to="/admin/cms/blog/generate"><Sparkles size={14} className="mr-2" />Generate blog post</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {tiles.map((t) => (
          <Link key={t.label} to={t.to} className="block p-5 bg-card rounded-xl border border-border hover:border-primary transition-colors">
            <t.icon size={18} className="text-primary mb-3" />
            <p className="text-3xl font-display font-bold">{t.value}</p>
            <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider mt-1">{t.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/admin/cms/pages" className="p-5 bg-card border border-border rounded-xl flex items-center justify-between hover:border-primary">
          <div><h2 className="font-display font-bold">Manage pages & blog posts</h2><p className="text-sm text-muted-foreground">Edit, schedule, version-restore.</p></div>
          <ArrowRight size={18} />
        </Link>
        <Link to="/admin/cms/schedule" className="p-5 bg-card border border-border rounded-xl flex items-center justify-between hover:border-primary">
          <div><h2 className="font-display font-bold">Publish schedule</h2><p className="text-sm text-muted-foreground">Auto-publish queue (runs every 5 min).</p></div>
          <ArrowRight size={18} />
        </Link>
        <Link to="/admin/cms/blog/generate" className="p-5 bg-card border border-border rounded-xl flex items-center justify-between hover:border-primary">
          <div><h2 className="font-display font-bold">AI blog generator</h2><p className="text-sm text-muted-foreground">Lovable AI drafts a full SEO-ready post.</p></div>
          <ArrowRight size={18} />
        </Link>
        <Link to="/admin/cms/media" className="p-5 bg-card border border-border rounded-xl flex items-center justify-between hover:border-primary">
          <div><h2 className="font-display font-bold">Media library</h2><p className="text-sm text-muted-foreground">Photos and YouTube embeds.</p></div>
          <ArrowRight size={18} />
        </Link>
      </div>
    </AdminLayout>
  );
};

export default CmsDashboardHome;
