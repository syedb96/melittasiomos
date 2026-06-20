import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CmsWixSettings() {
  const [cfg, setCfg] = useState<any>(null);
  const [log, setLog] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [loadingSites, setLoadingSites] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reconciling, setReconciling] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("cms_wix_config").select("*").maybeSingle();
    setCfg(data ?? { auto_push_enabled: true });
    const { data: l } = await supabase.from("cms_wix_sync_log").select("*").order("created_at", { ascending: false }).limit(25);
    setLog(l ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    const payload = { wix_site_id: cfg.wix_site_id, wix_blog_member_id: cfg.wix_blog_member_id, wix_collection_id: cfg.wix_collection_id, auto_push_enabled: cfg.auto_push_enabled };
    const { error } = cfg.id
      ? await supabase.from("cms_wix_config").update(payload).eq("id", cfg.id)
      : await supabase.from("cms_wix_config").insert(payload);
    setSaving(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Wix settings saved" }); load(); }
  };

  const reconcile = async () => {
    setReconciling(true);
    const { data, error } = await supabase.functions.invoke("cms-wix-reconcile", { body: {} });
    setReconciling(false);
    if (error) toast({ title: "Reconcile failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Reconciled", description: `Retried ${data?.retried ?? 0} of ${data?.checked ?? 0}` }); load(); }
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Wix Sync</h1>
      <p className="text-muted-foreground text-sm font-heading mb-6">Mirror published blog posts to your Wix Blog and a CMS archive collection. Auto-push runs on publish; a reconciler retries failures every hour.</p>

      {!cfg && <Loader2 className="animate-spin" />}
      {cfg && (
        <>
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Auto-push on publish</Label>
                <p className="text-xs text-muted-foreground">When off, posts only sync via the "Push to Wix" button.</p>
              </div>
              <Switch checked={cfg.auto_push_enabled} onCheckedChange={(v) => setCfg({ ...cfg, auto_push_enabled: v })} />
            </div>

            <div>
              <Label>Wix site ID</Label>
              <Input value={cfg.wix_site_id ?? ""} onChange={(e) => setCfg({ ...cfg, wix_site_id: e.target.value })} placeholder="00000000-0000-0000-0000-000000000000" />
              <p className="text-[11px] text-muted-foreground mt-1">Found in Wix Dashboard → Settings → Site info.</p>
            </div>
            <div>
              <Label>Wix blog member ID (post author)</Label>
              <Input value={cfg.wix_blog_member_id ?? ""} onChange={(e) => setCfg({ ...cfg, wix_blog_member_id: e.target.value })} placeholder="member id" />
            </div>
            <div>
              <Label>Wix CMS collection ID (archive mirror)</Label>
              <Input value={cfg.wix_collection_id ?? ""} onChange={(e) => setCfg({ ...cfg, wix_collection_id: e.target.value })} placeholder="PuraNightsPosts" />
              <p className="text-[11px] text-muted-foreground mt-1">Optional — create a Wix CMS collection with fields: title, slug, excerpt, contentHtml, metaTitle, metaDescription, canonicalUrl, ogImage, jsonLd, city, topic, tags, publishedAt, primaryKeyword.</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={save} disabled={saving}>{saving ? <Loader2 size={14} className="animate-spin mr-2" /> : null}Save</Button>
              <Button variant="outline" onClick={reconcile} disabled={reconciling}>
                {reconciling ? <Loader2 size={14} className="animate-spin mr-2" /> : <RefreshCw size={14} className="mr-2" />}
                Reconcile now
              </Button>
            </div>
            {cfg.last_reconcile_at && <p className="text-[11px] text-muted-foreground">Last reconcile: {new Date(cfg.last_reconcile_at).toLocaleString()}</p>}
          </div>

          <h2 className="font-display text-xl font-bold mb-3">Recent sync activity</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50"><tr className="text-left">
                <th className="p-2">When</th><th className="p-2">Action</th><th className="p-2">Target</th><th className="p-2">Status</th><th className="p-2">Detail</th>
              </tr></thead>
              <tbody>
                {log.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No sync activity yet.</td></tr>}
                {log.map((l) => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="p-2 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="p-2 text-xs">{l.action}</td>
                    <td className="p-2 text-xs">{l.target}</td>
                    <td className="p-2"><Badge className={l.status === "ok" ? "bg-green-500/20 text-green-700" : "bg-destructive/20 text-destructive"}>
                      {l.status === "ok" ? <CheckCircle2 size={10} className="mr-1" /> : <AlertCircle size={10} className="mr-1" />}{l.status}
                    </Badge></td>
                    <td className="p-2 text-xs text-muted-foreground truncate max-w-xs">{l.error || JSON.stringify(l.response_summary)?.slice(0, 80)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
