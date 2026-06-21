/**
 * Pura Nights — Admin Module Registry (single source of truth)
 *
 * Every admin module appears here. The sidebar, command palette and
 * System Audit dashboard all read from this file — do NOT maintain a
 * second hard-coded list elsewhere.
 *
 * status:
 *   live    — UI + backend + permissions all working
 *   partial — usable but missing some criteria (note in `notes`)
 *   planned — referenced but not yet implemented
 */
import {
  LayoutDashboard,
  FileEdit,
  Image as ImageIcon,
  Menu,
  ArrowLeftRight,
  Sliders,
  Sparkles,
  CalendarClock,
  Send,
  Image,
  Users,
  Calendar,
  Star,
  Award,
  MessageSquare,
  BarChart3,
  Settings,
  BookOpen,
  FileText,
  Shield,
  Activity,
  ListTree,
  type LucideIcon,
} from "lucide-react";

export type AdminRole = "viewer" | "editor" | "admin" | "owner";
export type ModuleStatus = "live" | "partial" | "planned";
export type ModuleSection =
  | "Overview"
  | "CMS"
  | "Collections"
  | "Commerce"
  | "System"
  | "Audit";

export interface AdminModule {
  id: string;
  name: string;
  route: string;
  section: ModuleSection;
  description: string;
  icon: LucideIcon;
  requiredRole: AdminRole;
  status: ModuleStatus;
  dataSource: "supabase" | "static" | "mixed" | "none";
  tableDependency?: string[];
  publicCritical: boolean; // touches data rendered on the public site
  wixEquivalent?: string;
  notes?: string;
}

export const ADMIN_MODULES: AdminModule[] = [
  // Overview
  {
    id: "dashboard",
    name: "Dashboard",
    route: "/admin",
    section: "Overview",
    description: "Live counts for gallery, team, events, testimonials, enquiries and tracking.",
    icon: LayoutDashboard,
    requiredRole: "editor",
    status: "live",
    dataSource: "supabase",
    tableDependency: ["gallery_assets", "team_members", "events", "testimonials", "enquiries", "page_views", "cta_events"],
    publicCritical: false,
    wixEquivalent: "Wix Dashboard home",
  },
  {
    id: "system-audit",
    name: "System Audit",
    route: "/admin/system-audit",
    section: "Audit",
    description: "Operating-system completion score, module health and role verification.",
    icon: Activity,
    requiredRole: "admin",
    status: "live",
    dataSource: "mixed",
    tableDependency: ["profiles", "approved_admin_emails", "cms_pages", "cms_media", "cms_redirects", "enquiries"],
    publicCritical: false,
    wixEquivalent: "—",
  },
  {
    id: "pages-registry",
    name: "Page Registry (read-only)",
    route: "/admin/pages-registry",
    section: "Audit",
    description: "Every public route, its component, CMS linkage, sitemap status and indexability.",
    icon: ListTree,
    requiredRole: "admin",
    status: "live",
    dataSource: "mixed",
    tableDependency: ["cms_pages"],
    publicCritical: true,
    wixEquivalent: "Wix Site Pages",
  },

  // CMS
  { id: "cms-home", name: "Content Hub", route: "/admin/cms", section: "CMS", description: "CMS dashboard and quick actions.", icon: LayoutDashboard, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["cms_pages"], publicCritical: false },
  { id: "cms-pages", name: "Pages, Blog & Resources", route: "/admin/cms/pages", section: "CMS", description: "Pages, blog posts, guides, glossary and resources with editorial workflow, freshness tracking and publishing gate.", icon: FileEdit, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["cms_pages", "cms_page_versions"], publicCritical: true, notes: "Phase 4 + 5 shipped: workflow status, review dates, freshness, critical-check publishing gate.", wixEquivalent: "Wix Blog + Pages" },
  { id: "cms-blog-gen", name: "AI Blog Generator", route: "/admin/cms/blog/generate", section: "CMS", description: "AI-assisted blog drafting (human approval required).", icon: Sparkles, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["cms_pages", "cms_generation_logs"], publicCritical: false },
  { id: "cms-schedule", name: "Publish Schedule", route: "/admin/cms/schedule", section: "CMS", description: "Scheduled drafts and publish queue.", icon: CalendarClock, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["cms_pages"], publicCritical: true },
  { id: "cms-media", name: "Media Library", route: "/admin/cms/media", section: "CMS", description: "Uploads, alt text, OG images.", icon: ImageIcon, requiredRole: "editor", status: "partial", dataSource: "supabase", tableDependency: ["cms_media"], publicCritical: true, notes: "Usage tracking and bulk editing pending Phase 6." },
  { id: "cms-wix", name: "Wix Sync", route: "/admin/cms/wix", section: "CMS", description: "Push published posts to Wix and reconcile.", icon: Send, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["cms_wix_config", "cms_wix_sync_log"], publicCritical: false, wixEquivalent: "Wix Blog API" },
  { id: "cms-nav", name: "Navigation", route: "/admin/cms/navigation", section: "CMS", description: "Header, footer and CTA links.", icon: Menu, requiredRole: "editor", status: "partial", dataSource: "supabase", tableDependency: ["cms_navigation"], publicCritical: true, notes: "Public site still consumes some hard-coded nav components." },
  { id: "cms-redirects", name: "Redirects", route: "/admin/cms/redirects", section: "CMS", description: "301 / 302 URL redirects.", icon: ArrowLeftRight, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["cms_redirects"], publicCritical: true },
  { id: "cms-settings", name: "Site Settings", route: "/admin/cms/settings", section: "CMS", description: "Sitewide brand and metadata.", icon: Sliders, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["cms_settings", "site_settings"], publicCritical: true },

  // Collections
  { id: "gallery", name: "Gallery", route: "/admin/gallery", section: "Collections", description: "Gallery assets and albums.", icon: Image, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["gallery_assets", "gallery_albums"], publicCritical: true },
  { id: "team", name: "Team", route: "/admin/team", section: "Collections", description: "Instructor profiles.", icon: Users, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["team_members"], publicCritical: true },
  { id: "events", name: "Events", route: "/admin/events", section: "Collections", description: "Latin Friday and one-off events.", icon: Calendar, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["events"], publicCritical: true },
  { id: "testimonials", name: "Testimonials", route: "/admin/testimonials", section: "Collections", description: "Reviews with platform validation.", icon: Star, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["testimonials"], publicCritical: true },
  { id: "ambassadors", name: "Ambassadors", route: "/admin/ambassadors", section: "Collections", description: "Approved ambassador profiles.", icon: Award, requiredRole: "editor", status: "live", dataSource: "supabase", tableDependency: ["ambassadors"], publicCritical: true },
  { id: "enquiries", name: "Enquiries (CRM)", route: "/admin/enquiries", section: "Collections", description: "Lead inbox and follow-ups.", icon: MessageSquare, requiredRole: "admin", status: "partial", dataSource: "supabase", tableDependency: ["enquiries", "contact_submissions"], publicCritical: false, notes: "Full timeline / reminders pending Phase 7." },

  // System
  { id: "seo", name: "SEO Monitoring", route: "/admin/seo", section: "System", description: "SEO and schema health.", icon: BarChart3, requiredRole: "admin", status: "partial", dataSource: "supabase", tableDependency: ["seo_alerts", "seo_gsc_daily", "seo_sitemap_snapshot"], publicCritical: false, notes: "Opportunity engine pending Phase 10." },
  { id: "analytics", name: "Analytics", route: "/admin/analytics", section: "System", description: "Conversion events and page views.", icon: BarChart3, requiredRole: "admin", status: "partial", dataSource: "supabase", tableDependency: ["page_views", "cta_events"], publicCritical: false, notes: "Funnel + drop-off views pending Phase 11." },
  { id: "tracking-qa", name: "Tracking QA", route: "/admin/tracking-qa", section: "System", description: "Verifies analytics + WhatsApp tracking.", icon: Activity, requiredRole: "admin", status: "live", dataSource: "static", publicCritical: false },
  { id: "security-events", name: "Security Events", route: "/admin/security-events", section: "System", description: "Auth and security event log.", icon: Shield, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["security_events"], publicCritical: false },
  { id: "settings", name: "Settings", route: "/admin/settings", section: "System", description: "Operational settings.", icon: Settings, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["site_settings"], publicCritical: false },
  { id: "blueprint", name: "Wix Blueprint", route: "/admin/blueprint", section: "System", description: "Static handoff blueprint.", icon: BookOpen, requiredRole: "editor", status: "live", dataSource: "static", publicCritical: false },
  { id: "site-docs", name: "Site Docs", route: "/admin/site-docs", section: "System", description: "Internal documentation.", icon: FileText, requiredRole: "editor", status: "live", dataSource: "static", publicCritical: false },
  { id: "shop-photos", name: "Shop Photo Tracker", route: "/admin/shop-photo-tracker", section: "System", description: "Tracks shop imagery.", icon: ImageIcon, requiredRole: "editor", status: "live", dataSource: "static", publicCritical: false },

  // Commerce (Phase 2 — tables live, public-site swap in progress)
  { id: "prices", name: "Prices", route: "/admin/commerce/prices", section: "Commerce", description: "Drop-in, bundle, voucher and event prices.", icon: Sliders, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["commerce_prices"], publicCritical: true, notes: "Public-site swap rolls out file-by-file per Phase 2 map." },
  { id: "offers", name: "Offers", route: "/admin/commerce/offers", section: "Commerce", description: "Time-bound offers with auto-expiry.", icon: Sparkles, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["commerce_offers"], publicCritical: true },
  { id: "schedule", name: "Class Schedule", route: "/admin/commerce/schedule", section: "Commerce", description: "Weekly class slots, exceptions, notices.", icon: CalendarClock, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["commerce_schedule_slots", "commerce_schedule_exceptions"], publicCritical: true },
  { id: "venues", name: "Venues", route: "/admin/commerce/venues", section: "Commerce", description: "Venue facts, transport, accessibility.", icon: Image, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["commerce_venues"], publicCritical: true },
  { id: "booking-links", name: "Booking Links", route: "/admin/commerce/booking-links", section: "Commerce", description: "Central registry for Ticket Tailor, WhatsApp, email targets.", icon: ArrowLeftRight, requiredRole: "admin", status: "live", dataSource: "supabase", tableDependency: ["commerce_booking_links"], publicCritical: true },
];

const ROLE_LEVEL: Record<AdminRole, number> = { viewer: 0, editor: 1, admin: 2, owner: 3 };
export const roleSatisfies = (have: AdminRole | string | null | undefined, need: AdminRole) =>
  ROLE_LEVEL[(have as AdminRole) ?? "viewer"] >= ROLE_LEVEL[need];

export const modulesForRole = (role: AdminRole | string | null | undefined) =>
  ADMIN_MODULES.filter((m) => roleSatisfies(role, m.requiredRole));

export const SECTION_ORDER: ModuleSection[] = ["Overview", "Audit", "CMS", "Collections", "Commerce", "System"];
