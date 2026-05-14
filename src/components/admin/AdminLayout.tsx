/* <!-- WIX: PROTOTYPE ONLY — This admin layout (sidebar, nav, auth) is a Lovable prototype.
   In Wix, all content management happens via the native Wix Dashboard. Do NOT replicate
   this layout or navigation in Wix Editor. --> */
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SeoHead from "@/components/SeoHead";
import { LayoutDashboard, Image, Users, Calendar, Star, MessageSquare, Settings, LogOut, ChevronRight, FileText, BookOpen, Award, BarChart3 } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Gallery", path: "/admin/gallery", icon: Image },
  { label: "Team", path: "/admin/team", icon: Users },
  { label: "Events", path: "/admin/events", icon: Calendar },
  { label: "Testimonials", path: "/admin/testimonials", icon: Star },
  { label: "Ambassadors", path: "/admin/ambassadors", icon: Award },
  { label: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
  { label: "SEO Monitoring", path: "/admin/seo", icon: BarChart3 },
  { label: "Settings", path: "/admin/settings", icon: Settings },
  { label: "Wix Blueprint", path: "/admin/blueprint", icon: BookOpen },
  { label: "Site Docs", path: "/admin/site-docs", icon: FileText },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <SeoHead
        title="Admin — Pura Nights"
        description="Internal admin area."
        path={location.pathname}
        noindex
      />
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="block">
            <h2 className="font-display text-lg font-bold">Pura Nights</h2>
            <p className="text-[10px] font-accent text-muted-foreground tracking-widest uppercase">Admin Panel</p>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-heading transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="" aria-hidden="true" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                {(user?.email?.[0] ?? "?").toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-heading font-semibold truncate">{user?.user_metadata?.full_name || user?.email}</p>
              <p className="text-[10px] text-primary font-accent uppercase tracking-wider">{role}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors w-full">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
