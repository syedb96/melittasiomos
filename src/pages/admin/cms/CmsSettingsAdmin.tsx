import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function CmsSettingsAdmin() {
  const [site, setSite] = useState({ title: "", tagline: "", base_url: "" });
  const [seo, setSeo] = useState({ meta_title: "", meta_description: "", og_image: "" });
  const [analytics, setAnalytics] = useState({ ga4_id: "", gtm_id: "" });

  useEffect(() => {
    supabase.from("cms_settings").select("key,value").in("key", ["site", "seo_defaults", "analytics"]).then(({ data }) => {
      (data ?? []).forEach((r: any) => {
        if (r.key === "site") setSite({ ...site, ...r.value });
        if (r.key === "seo_defaults") setSeo({ ...seo, ...r.value });
        if (r.key === "analytics") setAnalytics({ ...analytics, ...r.value });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    await Promise.all([
      supabase.from("cms_settings").upsert({ key: "site", value: site }),
      supabase.from("cms_settings").upsert({ key: "seo_defaults", value: seo }),
      supabase.from("cms_settings").upsert({ key: "analytics", value: analytics }),
    ]);
    toast({ title: "Settings saved" });
  };

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground text-sm font-heading">Global identity, SEO defaults, analytics.</p>
        </div>
        <Button onClick={save}><Save size={14} className="mr-2" />Save</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
        <section className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h2 className="font-display text-lg font-bold">Site Identity</h2>
          <div><Label>Site title</Label><Input value={site.title} onChange={(e) => setSite({ ...site, title: e.target.value })} /></div>
          <div><Label>Tagline</Label><Input value={site.tagline} onChange={(e) => setSite({ ...site, tagline: e.target.value })} /></div>
          <div><Label>Base URL</Label><Input value={site.base_url} onChange={(e) => setSite({ ...site, base_url: e.target.value })} placeholder="https://puranights.com" /></div>
        </section>

        <section className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h2 className="font-display text-lg font-bold">Default SEO</h2>
          <div><Label>Default meta title</Label><Input value={seo.meta_title} onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })} /></div>
          <div><Label>Default meta description</Label><Textarea rows={3} value={seo.meta_description} onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })} /></div>
          <div><Label>Default OG image URL</Label><Input value={seo.og_image} onChange={(e) => setSeo({ ...seo, og_image: e.target.value })} /></div>
        </section>

        <section className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h2 className="font-display text-lg font-bold">Analytics</h2>
          <div><Label>GA4 measurement ID</Label><Input value={analytics.ga4_id} onChange={(e) => setAnalytics({ ...analytics, ga4_id: e.target.value })} placeholder="G-XXXXXXX" /></div>
          <div><Label>GTM container ID</Label><Input value={analytics.gtm_id} onChange={(e) => setAnalytics({ ...analytics, gtm_id: e.target.value })} placeholder="GTM-XXXXXXX" /></div>
        </section>

        <section className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h2 className="font-display text-lg font-bold">Sitemap</h2>
          <p className="text-sm text-muted-foreground">A dynamic sitemap is generated automatically from all published pages.</p>
          <Button variant="outline" asChild><a href="/sitemap.xml" target="_blank" rel="noreferrer">View sitemap.xml →</a></Button>
        </section>
      </div>
    </AdminLayout>
  );
}
