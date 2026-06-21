/* <!-- WIX: PROTOTYPE ONLY — Lovable admin shell. Not for Wix migration. --> */
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SeoHead from "@/components/SeoHead";
import { LogOut, Search, ExternalLink, Eye, FileEdit } from "lucide-react";
import {
  ADMIN_MODULES,
  SECTION_ORDER,
  modulesForRole,
  type AdminModule,
} from "@/admin/moduleRegistry";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const ENV_LABEL = (() => {
  if (typeof window === "undefined") return "preview";
  const h = window.location.hostname;
  if (h.includes("id-preview")) return "preview";
  if (h.includes("lovable.app")) return "staging";
  if (h.includes("puranights.com")) return "live";
  return "local";
})();

const Breadcrumbs = ({ path }: { path: string }) => {
  const parts = path.split("/").filter(Boolean);
  return (
    <nav className="text-xs font-heading text-muted-foreground flex items-center gap-1.5" aria-label="Breadcrumb">
      {parts.map((p, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/");
        const last = i === parts.length - 1;
        return (
          <span key={href} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-muted-foreground/40">/</span>}
            {last ? (
              <span className="text-foreground font-semibold">{p}</span>
            ) : (
              <Link to={href} className="hover:text-foreground">{p}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const visible = useMemo(() => modulesForRole(role), [role]);
  const grouped = useMemo(() => {
    const out: Record<string, AdminModule[]> = {};
    for (const s of SECTION_ORDER) out[s] = visible.filter((m) => m.section === s);
    return out;
  }, [visible]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const go = (route: string) => {
    setPaletteOpen(false);
    navigate(route);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <SeoHead title="Admin — Pura Nights" description="Internal admin area." path={location.pathname} noindex />

      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="block">
            <h2 className="font-display text-lg font-bold">Pura Nights</h2>
            <p className="text-[10px] font-accent text-muted-foreground tracking-widest uppercase">Operating System</p>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SECTION_ORDER.map((section) => {
            const items = grouped[section];
            if (!items || items.length === 0) return null;
            return (
              <div key={section} className="mb-3">
                <div className="px-3 pt-2 pb-1 text-[10px] font-accent uppercase tracking-widest text-muted-foreground/60">
                  {section}
                </div>
                {items.map((item) => {
                  const isActive =
                    location.pathname === item.route ||
                    (item.route !== "/admin" && location.pathname.startsWith(item.route));
                  const planned = item.status === "planned";
                  return (
                    <Link
                      key={item.id}
                      to={planned ? "/admin/system-audit" : item.route}
                      title={planned ? `${item.name} — planned (${item.notes ?? ""})` : item.description}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-heading transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : planned
                          ? "text-muted-foreground/60 hover:text-muted-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon size={16} />
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.status === "partial" && (
                        <span className="text-[9px] uppercase tracking-wider text-peach/80">Beta</span>
                      )}
                      {planned && (
                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50">Soon</span>
                      )}
                    </Link>
                  );
                })}
              </div>
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
              <p className="text-[10px] text-primary font-accent uppercase tracking-wider">{role ?? "—"}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors w-full">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-6 py-3 flex items-center gap-4">
          <Breadcrumbs path={location.pathname} />
          <div className="flex-1" />
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground border border-border rounded-md px-2 py-1"
            title="Open command palette"
          >
            <Search size={12} />
            <span>Search modules</span>
            <kbd className="ml-2 text-[10px] bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>
          <span
            className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${
              ENV_LABEL === "live" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"
            }`}
          >
            {ENV_LABEL}
          </span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            title="Open public site in new tab"
          >
            <ExternalLink size={12} /> View live
          </a>
        </div>

        <div className="p-8">{children}</div>
      </main>

      <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
        <CommandInput placeholder="Search admin modules…" />
        <CommandList>
          <CommandEmpty>No modules.</CommandEmpty>
          {SECTION_ORDER.map((section) => {
            const items = grouped[section];
            if (!items?.length) return null;
            return (
              <CommandGroup key={section} heading={section}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.name} ${item.route} ${item.description}`}
                    onSelect={() => go(item.status === "planned" ? "/admin/system-audit" : item.route)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span className="flex-1">{item.name}</span>
                    {item.status !== "live" && (
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.status}</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
          <CommandGroup heading="Public site">
            <CommandItem value="view site" onSelect={() => { setPaletteOpen(false); window.open("/", "_blank"); }}>
              <Eye className="mr-2 h-4 w-4" /> Open public homepage
            </CommandItem>
            <CommandItem value="schedule" onSelect={() => { setPaletteOpen(false); window.open("/schedule", "_blank"); }}>
              <FileEdit className="mr-2 h-4 w-4" /> Open /schedule
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default AdminLayout;
