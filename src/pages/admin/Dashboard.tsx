/* <!-- WIX: PROTOTYPE ONLY — Lovable admin dashboard. Do NOT replicate in Wix Editor. --> */
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Activity,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
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
  updated_at: string;
}

interface AuditEntry {
  id: string;
  action: string;
  entity_label: string | null;
  actor_email: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const WORKFLOW_LABELS: Record<string, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Published",
  unpublished: "Unpublished",
  archived: "Archived",
};

const ACTION_LABELS: Record<string, string> = {
  sign_in: "Signed in",
  sign_out: "Signed out",
  page_published: "Published page",
  page_unpublished: "Unpublished page",
  page_scheduled: "Scheduled page",
  page_draft_saved: "Saved draft",
  page_restored: "Restored page version",
};

const PAGE_SIZE = 8;
const REFRESH_MS = 30_000;

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

const todayIso = () => new Date().toISOString().slice(0, 10);
const daysAgoIso = (n: number) =>
  new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

const Dashboard = () => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<Stats | null>(null);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [loggingOut, setLoggingOut] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Date range + pagination state — separate for pages vs enquiries
  const [fromDate, setFromDate] = useState(daysAgoIso(30));
  const [toDate, setToDate] = useState(todayIso());
  const [pagesPage, setPagesPage] = useState(0);
  const [enquiriesPage, setEnquiriesPage] = useState(0);
  const [pages, setPages] = useState<RecentPage[]>([]);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [enquiries, setEnquiries] = useState<RecentEnquiry[]>([]);
  const [enquiriesTotal, setEnquiriesTotal] = useState(0);

  const loadStats = useCallback(async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
    const [
      gallery,
      galleryDraft,
      team,
      events,
      testimonials,
      enquiriesNew,
      enquiriesTotalRow,
      views,
      ctas,
      pagesAll,
      auditRows,
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
        .from("admin_audit_log")
        .select("id, action, entity_label, actor_email, metadata, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
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
      totalEnquiries: enquiriesTotalRow.count ?? 0,
      pageViews30d: views.count ?? 0,
      ctaClicks30d: ctas.count ?? 0,
      pagesByStatus,
    });
    setAudit((auditRows.data ?? []) as AuditEntry[]);
    setLastRefresh(new Date());
  }, []);

  const loadPages = useCallback(async () => {
    const from = new Date(`${fromDate}T00:00:00.000Z`).toISOString();
    const to = new Date(`${toDate}T23:59:59.999Z`).toISOString();
    const start = pagesPage * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;
    const { data, count } = await supabase
      .from("cms_pages")
      .select("id, title, slug, status, updated_at", { count: "exact" })
      .gte("updated_at", from)
      .lte("updated_at", to)
      .order("updated_at", { ascending: false })
      .range(start, end);
    setPages((data ?? []) as RecentPage[]);
    setPagesTotal(count ?? 0);
  }, [fromDate, toDate, pagesPage]);

  const loadEnquiries = useCallback(async () => {
    const from = new Date(`${fromDate}T00:00:00.000Z`).toISOString();
    const to = new Date(`${toDate}T23:59:59.999Z`).toISOString();
    const start = enquiriesPage * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;
    const { data, count } = await supabase
      .from("enquiries")
      .select("id, name, subject, status, updated_at", { count: "exact" })
      .gte("updated_at", from)
      .lte("updated_at", to)
      .order("updated_at", { ascending: false })
      .range(start, end);
    setEnquiries((data ?? []) as RecentEnquiry[]);
    setEnquiriesTotal(count ?? 0);
  }, [fromDate, toDate, enquiriesPage]);

  // Initial load + periodic refresh
  useEffect(() => {
    loadStats();
    const t = setInterval(loadStats, REFRESH_MS);
    return () => clearInterval(t);
  }, [loadStats]);

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  // Realtime — refresh counts and respective panels when underlying rows change
  useEffect(() => {
    const channel = supabase
      .channel("admin-dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "enquiries" }, () => {
        loadStats();
        loadEnquiries();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_pages" }, () => {
        loadStats();
        loadPages();
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_audit_log" }, () => {
        loadStats();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadStats, loadPages, loadEnquiries]);

  // Reset pagination when the date window changes
  useEffect(() => {
    setPagesPage(0);
    setEnquiriesPage(0);
  }, [fromDate, toDate]);

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
  const initials = (user?.email ?? "?").split("@")[0].slice(0, 2).toUpperCase();

  const cards = useMemo(
    () =>
      stats
        ? [
            { label: "New Enquiries", value: stats.newEnquiries, icon: MessageSquare, color: stats.newEnquiries > 0 ? "text-destructive" : "text-muted-foreground", href: "/admin/enquiries?status=new" },
            { label: "Total Enquiries", value: stats.totalEnquiries, icon: MessageSquare, color: "text-muted-foreground", href: "/admin/enquiries" },
            { label: "Upcoming Events", value: stats.upcomingEvents, icon: Calendar, color: "text-secondary", href: "/admin/events" },
            { label: "Gallery Published", value: stats.galleryPublished, icon: ImageIcon, color: "text-primary", href: "/admin/gallery" },
            { label: "Awaiting Review", value: stats.galleryDraft, icon: AlertTriangle, color: "text-peach", href: "/admin/gallery" },
            { label: "Team Members", value: stats.teamPublished, icon: Users, color: "text-primary", href: "/admin/team" },
            { label: "Testimonials", value: stats.testimonialsPublished, icon: Star, color: "text-primary", href: "/admin/testimonials" },
            { label: "Page Views (30d)", value: stats.pageViews30d, icon: Eye, color: "text-muted-foreground", href: "/admin/analytics" },
            { label: "CTA Clicks (30d)", value: stats.ctaClicks30d, icon: MousePointer, color: "text-muted-foreground", href: "/admin/analytics" },
          ]
        : [],
    [stats],
  );

  const pagesPages = Math.max(1, Math.ceil(pagesTotal / PAGE_SIZE));
  const enquiriesPages = Math.max(1, Math.ceil(enquiriesTotal / PAGE_SIZE));

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm font-heading flex items-center gap-2">
            Live overview of your website content and activity
            {lastRefresh && (
              <span className="text-[11px] text-muted-foreground/70">
                · refreshed {timeAgo(lastRefresh.toISOString())}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={loadStats} aria-label="Refresh dashboard">
            <RefreshCw size={14} />
          </Button>
          <Button variant="outline" onClick={handleLogout} disabled={loggingOut}>
            <LogOut size={14} className="mr-2" />
            {loggingOut ? "Signing out…" : "Sign out"}
          </Button>
        </div>
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

      {/* Date range filter for the two panels below */}
      <div className="mt-8 flex flex-wrap items-end gap-3 p-3 bg-muted/30 border border-border rounded-lg">
        <div>
          <label className="text-[11px] text-muted-foreground font-heading block mb-1">From</label>
          <Input
            type="date"
            value={fromDate}
            max={toDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="h-9 w-40"
          />
        </div>
        <div>
          <label className="text-[11px] text-muted-foreground font-heading block mb-1">To</label>
          <Input
            type="date"
            value={toDate}
            min={fromDate}
            max={todayIso()}
            onChange={(e) => setToDate(e.target.value)}
            className="h-9 w-40"
          />
        </div>
        <div className="flex gap-1">
          {[
            { label: "7d", days: 7 },
            { label: "30d", days: 30 },
            { label: "90d", days: 90 },
          ].map((p) => (
            <Button
              key={p.label}
              size="sm"
              variant="outline"
              onClick={() => {
                setFromDate(daysAgoIso(p.days));
                setToDate(todayIso());
              }}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Recently updated */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <PanelList
          title="Recently updated pages"
          allLink="/admin/cms/pages"
          items={pages}
          page={pagesPage}
          totalPages={pagesPages}
          totalRows={pagesTotal}
          onPrev={() => setPagesPage((p) => Math.max(0, p - 1))}
          onNext={() => setPagesPage((p) => (p + 1 < pagesPages ? p + 1 : p))}
          renderItem={(p) => (
            <Link
              key={p.id}
              to={`/admin/cms/pages/${p.id}`}
              className="flex items-center justify-between p-2 rounded hover:bg-muted text-sm"
            >
              <span className="truncate flex-1">
                {p.title} <span className="text-muted-foreground text-xs">/{p.slug}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-[10px] capitalize">
                  {p.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{timeAgo(p.updated_at)}</span>
              </span>
            </Link>
          )}
          emptyText="No pages updated in this date range."
        />

        <PanelList
          title="Recent enquiries"
          allLink="/admin/enquiries"
          items={enquiries}
          page={enquiriesPage}
          totalPages={enquiriesPages}
          totalRows={enquiriesTotal}
          onPrev={() => setEnquiriesPage((p) => Math.max(0, p - 1))}
          onNext={() => setEnquiriesPage((p) => (p + 1 < enquiriesPages ? p + 1 : p))}
          renderItem={(e) => (
            <Link
              key={e.id}
              to={`/admin/enquiries?status=${e.status}`}
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
                <span className="text-xs text-muted-foreground">{timeAgo(e.updated_at)}</span>
              </span>
            </Link>
          )}
          emptyText="No enquiries updated in this date range."
        />
      </div>

      {/* Admin activity log */}
      <div className="bg-card border border-border rounded-xl p-5 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <Activity size={16} />
            Admin activity
          </h2>
          <span className="text-[11px] text-muted-foreground">Live</span>
        </div>
        <div className="space-y-1">
          {audit.length === 0 && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No activity yet. Sign in events, publishes and unpublishes will appear here.
            </p>
          )}
          {audit.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between p-2 rounded hover:bg-muted text-sm"
            >
              <span className="truncate flex-1">
                <span className="font-medium">{ACTION_LABELS[a.action] ?? a.action}</span>
                {a.entity_label && (
                  <span className="text-muted-foreground"> — {a.entity_label}</span>
                )}
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {a.actor_email && (
                  <span className="text-[11px] text-muted-foreground">{a.actor_email}</span>
                )}
                <span className="text-xs text-muted-foreground">{timeAgo(a.created_at)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

interface PanelListProps<T> {
  title: string;
  allLink: string;
  items: T[];
  page: number;
  totalPages: number;
  totalRows: number;
  onPrev: () => void;
  onNext: () => void;
  renderItem: (item: T) => React.ReactNode;
  emptyText: string;
}

function PanelList<T>({
  title,
  allLink,
  items,
  page,
  totalPages,
  totalRows,
  onPrev,
  onNext,
  renderItem,
  emptyText,
}: PanelListProps<T>) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <Link to={allLink} className="text-xs text-primary hover:underline font-heading">
          View all
        </Link>
      </div>
      <div className="space-y-1 min-h-[200px]">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">{emptyText}</p>
        ) : (
          items.map(renderItem)
        )}
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
        <span>
          {totalRows === 0
            ? "0 results"
            : `Page ${page + 1} of ${totalPages} · ${totalRows} total`}
        </span>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={onPrev} disabled={page === 0}>
            <ChevronLeft size={14} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onNext}
            disabled={page + 1 >= totalPages}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
