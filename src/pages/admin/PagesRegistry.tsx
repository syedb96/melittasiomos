/* <!-- WIX: PROTOTYPE ONLY — Read-only Page Registry. --> */
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import routesJson from "@/admin/generated/routes.json";

interface CmsRow { slug: string; title: string | null; status: string | null; updated_at: string | null }

const PagesRegistry = () => {
  const [cms, setCms] = useState<CmsRow[]>([]);
  const [sitemap, setSitemap] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ data }, sitemapRes] = await Promise.all([
        supabase.from("cms_pages").select("slug, title, status, updated_at"),
        fetch("/sitemap.xml").then((r) => r.text()).catch(() => ""),
      ]);
      setCms(((data ?? []) as unknown) as CmsRow[]);
      const paths = new Set<string>();
      for (const m of sitemapRes.matchAll(/<loc>[^<]*?(\/[^<]*)<\/loc>/g)) {
        try { paths.add(new URL(m[0].replace(/<\/?loc>/g, ""), "https://x").pathname); } catch { /* ignore */ }
      }
      setSitemap(paths);
      setLoading(false);
    };
    load();
  }, []);

  const publicRoutes = (routesJson as any).publicRoutes as { path: string; component: string }[];
  const cmsBySlug = useMemo(() => {
    const m = new Map<string, CmsRow>();
    for (const r of cms) m.set("/" + r.slug.replace(/^\//, ""), r);
    return m;
  }, [cms]);

  const filtered = publicRoutes.filter((r) =>
    !filter || r.path.toLowerCase().includes(filter.toLowerCase()) || r.component.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Page Registry</h1>
          <p className="text-sm text-muted-foreground font-heading">
            Read-only. Every public route, its component, CMS linkage and sitemap status.
            Editable structured page editor is Phase 4.
          </p>
        </div>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter…"
          className="border border-border rounded-md px-3 py-1.5 text-sm bg-background"
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-2">Route</th>
              <th className="text-left px-4 py-2">Component</th>
              <th className="text-left px-4 py-2">CMS-backed</th>
              <th className="text-left px-4 py-2">In sitemap</th>
              <th className="text-left px-4 py-2">Last edited</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-6 text-muted-foreground">Loading…</td></tr>
            ) : filtered.map((r) => {
              const cmsRow = cmsBySlug.get(r.path);
              const inSitemap = sitemap.has(r.path);
              return (
                <tr key={r.path} className="border-t border-border/60">
                  <td className="px-4 py-2 font-mono text-xs">{r.path}</td>
                  <td className="px-4 py-2 font-heading">{r.component}</td>
                  <td className="px-4 py-2">
                    {cmsRow ? (
                      <span className={cmsRow.status === "published" ? "text-emerald-500" : "text-peach"}>
                        {cmsRow.status ?? "—"}
                      </span>
                    ) : <span className="text-muted-foreground">no</span>}
                  </td>
                  <td className="px-4 py-2">
                    {inSitemap ? <span className="text-emerald-500">yes</span> : <span className="text-muted-foreground">no</span>}
                  </td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">
                    {cmsRow?.updated_at ? new Date(cmsRow.updated_at).toLocaleDateString() : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Showing {filtered.length} of {publicRoutes.length} public routes. Sitemap entries detected: {sitemap.size}.
      </p>
    </AdminLayout>
  );
};

export default PagesRegistry;
