/* <!-- WIX: PROTOTYPE ONLY — This admin dashboard is a Lovable prototype for content management.
   It is NOT intended for Wix migration. In Wix, use the built-in CMS dashboard, Wix Analytics,
   and native content management tools instead. Do NOT replicate this page in Wix Editor. --> */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Image as ImageIcon,
  Users,
  Calendar,
  Star,
  MessageSquare,
  Eye,
  MousePointer,
  AlertTriangle,
  LogOut,
  Clock,
  FileText,
  ShieldCheck,
} from "lucide-react";

interface Stats {
  galleryPublished: number;
  galleryDraft: number;
  teamPublished: number;
  upcomingEvents: number;
  testimonialsPublished: number;
  newEnquiries: number;
  totalEnquiries: number;
  pageViews30d: number;
  ctaClicks30d: number;
  pagesByStatus: Record<string, number>;
}

interface RecentPage {
  id: string;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
}

interface RecentEnquiry {
  id: string;
  name: string;
  subject: string;
  status: string;
  created_at: string;
}

const WORKFLOW_LABELS: Record<string, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Published",
  unpublished: "Unpublished",
  archived: "Archived",
};

const providerLabel = (p?: string | null) => {
  if (!p) return "Email";
  return p.charAt(0).toUpperCase() + p.slice(1);
};

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB");
};

const Dashboard = () => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentPages, setRecentPages] = useState<RecentPage[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<RecentEnquiry[]>([]);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const load = async () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

      const [
        gallery,
        galleryDraft,
        team,
        events,
        testimonials,
        enquiriesNew,
        enquiriesTotal,
        views,
        ctas,
        pagesAll,
        pagesRecent,
        enquiriesRecent,
      ] = await Promise.all([
        supabase.from("gallery_assets").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("gallery_assets").select("id", { count: "exact", head: true }).eq("is_published", false),
        supabase.from("team_members").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase
          .from("events")
          .select("id", { count: "exact", head: true })
          .eq("is_published", true)
          .gte("start_datetime", new Date().toISOString()),
        supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("enquiries").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("viewed_at", thirtyDaysAgo),
        supabase.from("cta_events").select("id", { count: "exact", head: true }).gte("created_at", thirtyDaysAgo),
        supabase.from("cms_pages").select("status"),
        supabase
          .from("cms_pages")
          .select("id, title, slug, status, updated_at")
          .order("updated_at", { ascending: false })
          .limit(6),
        supabase
          .from("enquiries")
          .select("id, name, subject, status, created_at")
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

      const pagesByStatus: Record<string, number> = {
        draft: 0,
        scheduled: 0,
        published: 0,
        unpublished: 0,
        archived: 0,
      };
      (pagesAll.data ?? []).forEach((p: { status: string }) => {
        pagesByStatus[p.status] = (pagesByStatus[p.status] ?? 0) + 1;
      });

      setStats({
        galleryPublished: gallery.count ?? 0,
        galleryDraft: galleryDraft.count ?? 0,
        teamPublished: team.count ?? 0,
        upcomingEvents: events.count ?? 0,
        testimonialsPublished: testimonials.count ?? 0,
        newEnquiries: enquiriesNew.count ?? 0,
        totalEnquiries: enquiriesTotal.count ?? 0,
        pageViews30d: views.count ?? 0,
        ctaClicks30d: ctas.count ?? 0,
        pagesByStatus,
      });
      setRecentPages((pagesRecent.data ?? []) as RecentPage[]);
      setRecentEnquiries((enquiriesRecent.data ?? []) as RecentEnquiry[]);
    };
    load();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      toast({ title: "Signed out" });
      navigate("/login", { replace: true });
    } catch (e: any) {
      toast({ title: "Sign-out failed", description: e?.message, variant: "destructive" });
      setLoggingOut(false);
    }
  };

  const provider = (user?.app_metadata?.provider as string | undefined) ?? "email";
  const lastSignIn = user?.last_sign_in_at;
  const initials = (user?.email ?? "?")
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  const cards = stats
    ? [
        { label: "New Enquiries", value: stats.newEnquiries, icon: MessageSquare, color: stats.newEnquiries > 0 ? "text-destructive" : "text-muted-foreground", href: "/admin/enquiries" },
        { label: "Total Enquiries", value: stats.totalEnquiries, icon: MessageSquare, color: "text-muted-foreground", href: "/admin/enquiries" },
        { label: "Upcoming Events", value: stats.upcomingEvents, icon: Calendar, color: "text-secondary", href: "/admin/events" },
        { label: "Gallery Published", value: stats.galleryPublished, icon: ImageIcon, color: "text-primary", href: "/admin/gallery" },
        { label: "Awaiting Review", value: stats.galleryDraft, icon: AlertTriangle, color: "text-peach", href: "/admin/gallery" },
        { label: "Team Members", value: stats.teamPublished, icon: Users, color: "text-primary", href: "/admin/team" },
        { label: "Testimonials", value: stats.testimonialsPublished, icon: Star, color: "text-primary", href: "/admin/testimonials" },
        { label: "Page Views (30d)", value: stats.pageViews30d, icon: Eye, color: "text-muted-foreground", href: "/admin/analytics" },
        { label: "CTA Clicks (30d)", value: stats.ctaClicks30d, icon: MousePointer, color: "text-muted-foreground", href: "/admin/analytics" },
      ]
    : [];

  return (
    <AdminLayout>
      {/* Header with logout */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm font-heading">
            Overview of your website content and activity
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout} disabled={loggingOut}>
          <LogOut size={14} className="mr-2" />
          {loggingOut ? "Signing out…" : "Sign out"}
        </Button>
      </div>

      {/* Profile card */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6 flex items-center gap-4 flex-wrap">
        <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center font-display font-bold text-primary">
          {initials}
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-heading font-semibold">{user?.email ?? "—"}</span>
            <Badge variant="secondary" className="capitalize">
              <ShieldCheck size={11} className="mr-1" />
              {role ?? "viewer"}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
            <span>Signed in via {providerLabel(provider)}</span>
            {lastSignIn && (
              <span className="flex items-center gap-1">
                <Clock size={11} />
                Last sign-in {timeAgo(lastSignIn)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      {!stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-20 mb-3" />
                <div className="h-8 bg-muted rounded w-12" />
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.href}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <card.icon size={16} className={card.color} />
                <span className="text-xs text-muted-foreground font-heading">{card.label}</span>
              </div>
              <p className="font-display text-2xl font-bold">{card.value}</p>
            </Link>
          ))}
        </div>
      )}

      {/* CMS workflow counts */}
      {stats && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <FileText size={18} />
              CMS Pages by Workflow Status
            </h2>
            <Link to="/admin/cms/pages" className="text-xs text-primary hover:underline font-heading">
              Manage pages →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(WORKFLOW_LABELS).map(([key, label]) => (
              <Link
                key={key}
                to={`/admin/cms/pages?status=${key}`}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors"
              >
                <div className="text-xs text-muted-foreground font-heading">{label}</div>
                <div className="font-display text-2xl font-bold mt-1">
                  {stats.pagesByStatus[key] ?? 0}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently updated */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-bold">Recently updated pages</h2>
            <Link to="/admin/cms/pages" className="text-xs text-primary hover:underline font-heading">
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {recentPages.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No pages yet.</p>
            )}
            {recentPages.map((p) => (
              <Link
                key={p.id}
                to={`/admin/cms/pages/${p.id}`}
                className="flex items-center justify-between p-2 rounded hover:bg-muted text-sm"
              >
                <span className="truncate flex-1">
                  {p.title}{" "}
                  <span className="text-muted-foreground text-xs">/{p.slug}</span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {p.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{timeAgo(p.updated_at)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-bold">Recent enquiries</h2>
            <Link to="/admin/enquiries" className="text-xs text-primary hover:underline font-heading">
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {recentEnquiries.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No enquiries yet.</p>
            )}
            {recentEnquiries.map((e) => (
              <Link
                key={e.id}
                to="/admin/enquiries"
                className="flex items-center justify-between p-2 rounded hover:bg-muted text-sm"
              >
                <span className="truncate flex-1">
                  <span className="font-medium">{e.name}</span>{" "}
                  <span className="text-muted-foreground text-xs">— {e.subject}</span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant={e.status === "new" ? "default" : "outline"}
                    className="text-[10px] capitalize"
                  >
                    {e.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{timeAgo(e.created_at)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
