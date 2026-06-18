import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const CmsSchedule = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("cms_pages")
        .select("id,title,slug,status,publish_at,seo_score,kind")
        .in("status", ["scheduled", "draft"])
        .order("publish_at", { ascending: true, nullsFirst: false });
      setItems(data ?? []);
    })();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold flex items-center gap-3"><Calendar />Publish Schedule</h1>
        <p className="text-muted-foreground">Posts marked <strong>scheduled</strong> auto-publish every 5 minutes once their date arrives.</p>
      </div>

      <div className="space-y-2">
        {items.length === 0 && <p className="text-muted-foreground">No scheduled posts yet. Set a publish date on any draft to queue it here.</p>}
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/admin/cms/pages/${p.id}`}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-accent uppercase tracking-widest px-2 py-0.5 rounded-full ${p.status === "scheduled" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{p.status}</span>
                <span className="text-[10px] font-accent uppercase tracking-widest text-muted-foreground">{p.kind ?? "page"}</span>
                {typeof p.seo_score === "number" && (
                  <span className={`text-[10px] font-bold ${p.seo_score >= 85 ? "text-green-600" : p.seo_score >= 65 ? "text-amber-500" : "text-destructive"}`}>SEO {p.seo_score}</span>
                )}
              </div>
              <p className="font-heading font-semibold truncate">{p.title}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock size={12} />
                {p.publish_at ? new Date(p.publish_at).toLocaleString() : "No date set"}
                <span className="mx-1">·</span>
                /{p.slug}
              </p>
            </div>
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default CmsSchedule;
