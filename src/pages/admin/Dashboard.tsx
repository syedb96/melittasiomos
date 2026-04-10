import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Image, Users, Calendar, Star, MessageSquare, Eye, MousePointer, AlertTriangle } from "lucide-react";

interface Stats {
  galleryPublished: number;
  galleryDraft: number;
  teamPublished: number;
  upcomingEvents: number;
  testimonialsPublished: number;
  newEnquiries: number;
  pageViews30d: number;
  ctaClicks30d: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const load = async () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

      const [gallery, galleryDraft, team, events, testimonials, enquiries, views, ctas] = await Promise.all([
        supabase.from("gallery_assets").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("gallery_assets").select("id", { count: "exact", head: true }).eq("is_published", false),
        supabase.from("team_members").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("events").select("id", { count: "exact", head: true }).eq("is_published", true).gte("start_datetime", new Date().toISOString()),
        supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("viewed_at", thirtyDaysAgo),
        supabase.from("cta_events").select("id", { count: "exact", head: true }).gte("created_at", thirtyDaysAgo),
      ]);

      setStats({
        galleryPublished: gallery.count ?? 0,
        galleryDraft: galleryDraft.count ?? 0,
        teamPublished: team.count ?? 0,
        upcomingEvents: events.count ?? 0,
        testimonialsPublished: testimonials.count ?? 0,
        newEnquiries: enquiries.count ?? 0,
        pageViews30d: views.count ?? 0,
        ctaClicks30d: ctas.count ?? 0,
      });
    };
    load();
  }, []);

  const cards = stats ? [
    { label: "Gallery Published", value: stats.galleryPublished, icon: Image, color: "text-primary" },
    { label: "Awaiting Review", value: stats.galleryDraft, icon: AlertTriangle, color: "text-peach" },
    { label: "Team Members", value: stats.teamPublished, icon: Users, color: "text-primary" },
    { label: "Upcoming Events", value: stats.upcomingEvents, icon: Calendar, color: "text-secondary" },
    { label: "Testimonials", value: stats.testimonialsPublished, icon: Star, color: "text-primary" },
    { label: "New Enquiries", value: stats.newEnquiries, icon: MessageSquare, color: stats.newEnquiries > 0 ? "text-destructive" : "text-muted-foreground" },
    { label: "Page Views (30d)", value: stats.pageViews30d, icon: Eye, color: "text-muted-foreground" },
    { label: "CTA Clicks (30d)", value: stats.ctaClicks30d, icon: MousePointer, color: "text-muted-foreground" },
  ] : [];

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8 font-heading">Overview of your website content and activity</p>

      {!stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-20 mb-3" />
              <div className="h-8 bg-muted rounded w-12" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <card.icon size={16} className={card.color} />
                <span className="text-xs text-muted-foreground font-heading">{card.label}</span>
              </div>
              <p className="font-display text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
