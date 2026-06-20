import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import RichTextEditor from "@/components/admin/cms/RichTextEditor";
import SeoPanel, { SeoFields } from "@/components/admin/cms/SeoPanel";
import MediaPicker from "@/components/admin/cms/MediaPicker";
import SeoChecklistPanel from "@/components/admin/cms/SeoChecklistPanel";
import PostImagePanel from "@/components/admin/cms/PostImagePanel";
import LinkSuggestionsPanel from "@/components/admin/cms/LinkSuggestionsPanel";
import { runSeoChecklist } from "@/lib/seo-checklist";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye, Trash2, History, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const blank = {
  slug: "", title: "", excerpt: "", content_json: {} as any, content_html: "",
  status: "draft", page_type: "page", hero_image_url: "", hero_image_alt: "",
  meta_title: "", meta_description: "", og_image: "", twitter_image: "", og_image_generated_at: null as string | null,
  canonical_url: "", noindex: false, schema_jsonld: "",
  category: "", tags: [] as string[], city: "", topic: "",
  wix_auto_sync: true, wix_sync_status: "pending", wix_synced_at: null as string | null,
};

export default function CmsPageEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState<any>(blank);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaCallback, setMediaCallback] = useState<((url: string) => void) | null>(null);
  const [versions, setVersions] = useState<any[]>([]);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data } = await supabase.from("cms_pages").select("*").eq("id", id!).maybeSingle();
      if (data) setPage({ ...data, schema_jsonld: data.schema_jsonld ? (typeof data.schema_jsonld === "string" ? data.schema_jsonld : JSON.stringify(data.schema_jsonld, null, 2)) : "" });
      const { data: v } = await supabase.from("cms_page_versions").select("id,version_number,note,created_at").eq("page_id", id!).order("version_number", { ascending: false }).limit(20);
      setVersions(v ?? []);
      setLoading(false);
    })();
  }, [id, isNew]);

  const set = (patch: any) => setPage((p: any) => ({ ...p, ...patch }));

  const seo: SeoFields = {
    meta_title: page.meta_title ?? "", meta_description: page.meta_description ?? "",
    og_image: page.og_image ?? "", canonical_url: page.canonical_url ?? "",
    noindex: !!page.noindex, schema_jsonld: page.schema_jsonld ?? "",
  };

  const seoDraft = {
    title: page.title || "",
    metaTitle: page.meta_title || page.title || "",
    metaDescription: page.meta_description || page.excerpt || "",
    slug: page.slug || "",
    canonicalUrl: page.canonical_url || "",
    primaryKeyword: page.primary_keyword || "",
    contentHtml: page.content_html || "",
    heroImageUrl: page.hero_image_url || "",
    schemaJsonld: page.schema_jsonld || "",
  };

  const save = async (publish?: boolean, scheduleAt?: string | null) => {
    if (!page.title || !page.slug) { toast({ title: "Title and slug are required", variant: "destructive" }); return; }
    const { score, results } = runSeoChecklist(seoDraft);
    if (publish && score < 85) {
      if (!confirm(`SEO score is ${score}/100 (below 85). Publish anyway?`)) return;
    }
    setSaving(true);
    let parsedSchema: any = null;
    if (page.schema_jsonld) { try { parsedSchema = JSON.parse(page.schema_jsonld); } catch { toast({ title: "JSON-LD is not valid JSON", variant: "destructive" }); setSaving(false); return; } }
    const status = publish ? "published" : scheduleAt ? "scheduled" : page.status;
    const payload: any = {
      slug: page.slug, title: page.title, excerpt: page.excerpt, content_json: page.content_json, content_html: page.content_html,
      status, page_type: page.page_type, kind: page.kind ?? page.page_type, primary_keyword: page.primary_keyword || null,
      hero_image_url: page.hero_image_url || null,
      meta_title: page.meta_title || null, meta_description: page.meta_description || null, og_image: page.og_image || null,
      canonical_url: page.canonical_url || null, noindex: page.noindex, schema_jsonld: parsedSchema,
      category: page.category || null, tags: page.tags,
      publish_at: scheduleAt ?? page.publish_at ?? null,
      published_at: publish ? new Date().toISOString() : page.published_at,
      seo_score: score, seo_checklist: results as any,
      author_id: user?.id ?? null,
    };
    if (isNew) {
      const { data, error } = await supabase.from("cms_pages").insert([payload]).select("id").single();
      if (error) { toast({ title: "Save failed", description: error.message, variant: "destructive" }); setSaving(false); return; }
      toast({ title: publish ? "Page published" : scheduleAt ? "Scheduled" : "Draft saved", description: `SEO score ${score}/100` });
      navigate(`/admin/cms/pages/${data.id}`);
    } else {
      const { error } = await supabase.from("cms_pages").update(payload).eq("id", id!);
      if (error) { toast({ title: "Save failed", description: error.message, variant: "destructive" }); setSaving(false); return; }
      const nextVersion = (versions[0]?.version_number ?? 0) + 1;
      await supabase.from("cms_page_versions").insert({ page_id: id!, version_number: nextVersion, snapshot: payload, author_id: user?.id ?? null });
      toast({ title: publish ? "Page published" : scheduleAt ? "Scheduled" : "Saved", description: `SEO score ${score}/100` });
    }
    setSaving(false);
  };

  const schedule = () => {
    const input = prompt("Schedule publish date (YYYY-MM-DD HH:MM):", new Date(Date.now() + 864e5).toISOString().slice(0, 16).replace("T", " "));
    if (!input) return;
    const iso = new Date(input.replace(" ", "T")).toISOString();
    save(false, iso);
  };


  const remove = async () => {
    if (!confirm("Delete this page? This cannot be undone.")) return;
    await supabase.from("cms_pages").delete().eq("id", id!);
    navigate("/admin/cms/pages");
  };

  if (loading) return <AdminLayout><p className="text-muted-foreground">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="flex-1 min-w-0">
          <Link to="/admin/cms/pages" className="text-sm text-muted-foreground inline-flex items-center gap-1 mb-2 hover:text-foreground"><ArrowLeft size={14} />All pages</Link>
          <Input value={page.title} onChange={(e) => { const t = e.target.value; set({ title: t, slug: isNew && !page.slug ? slugify(t) : page.slug }); }} placeholder="Untitled page" className="text-2xl font-display font-bold border-none bg-transparent px-0 h-auto focus-visible:ring-0" />
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>/</span>
            <Input value={page.slug} onChange={(e) => set({ slug: slugify(e.target.value) })} className="h-7 max-w-xs font-mono text-xs" />
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!isNew && page.status === "published" && <Button variant="outline" asChild><a href={`/${page.slug}`} target="_blank" rel="noreferrer"><Eye size={14} className="mr-2" />View</a></Button>}
          <Button variant="outline" onClick={() => save(false)} disabled={saving}><Save size={14} className="mr-2" />Save draft</Button>
          <Button variant="outline" onClick={schedule} disabled={saving}>Schedule…</Button>
          <Button onClick={() => save(true)} disabled={saving}>Publish</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>


      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          {!isNew && <TabsTrigger value="history"><History size={12} className="mr-1" />History ({versions.length})</TabsTrigger>}
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div>
            <Label>Excerpt / summary</Label>
            <Textarea rows={2} value={page.excerpt ?? ""} onChange={(e) => set({ excerpt: e.target.value })} placeholder="Short summary shown under the title and in social previews." />
          </div>
          <div>
            <Label>Hero image URL</Label>
            <div className="flex gap-2">
              <Input value={page.hero_image_url ?? ""} onChange={(e) => set({ hero_image_url: e.target.value })} placeholder="https://…" />
              <Button type="button" variant="outline" onClick={() => { setMediaCallback(() => (url: string) => set({ hero_image_url: url })); setMediaOpen(true); }}>Library</Button>
            </div>
          </div>
          <div>
            <Label>Body</Label>
            <RichTextEditor value={page.content_json} onChange={(json, html) => set({ content_json: json, content_html: html })} onOpenMedia={(cb) => { setMediaCallback(() => cb); setMediaOpen(true); }} />
          </div>
        </TabsContent>

        <TabsContent value="seo"><SeoPanel value={seo} onChange={(v) => set(v)} slug={page.slug} /></TabsContent>

        <TabsContent value="settings" className="space-y-4 max-w-xl">
          <div>
            <Label>Page type</Label>
            <Select value={page.page_type} onValueChange={(v) => set({ page_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="page">Page</SelectItem>
                <SelectItem value="blog">Blog post</SelectItem>
                <SelectItem value="landing">Landing page</SelectItem>
                <SelectItem value="legal">Legal / policy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Category</Label>
            <Input value={page.category ?? ""} onChange={(e) => set({ category: e.target.value })} />
          </div>
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input value={(page.tags ?? []).join(", ")} onChange={(e) => set({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} />
          </div>
          {!isNew && <Button variant="destructive" onClick={remove}><Trash2 size={14} className="mr-2" />Delete page</Button>}
        </TabsContent>

        {!isNew && (
          <TabsContent value="history" className="space-y-2">
            {versions.length === 0 && <p className="text-muted-foreground text-sm">No versions yet. Each save creates a snapshot.</p>}
            {versions.map((v) => (
              <div key={v.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-heading text-sm">Version {v.version_number}</p>
                  <p className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleString()}</p>
                </div>
                <Button size="sm" variant="outline" onClick={async () => {
                  const { data } = await supabase.from("cms_page_versions").select("snapshot").eq("id", v.id).single();
                  if (data?.snapshot) { setPage({ ...page, ...(data.snapshot as any), schema_jsonld: (data.snapshot as any).schema_jsonld ? JSON.stringify((data.snapshot as any).schema_jsonld, null, 2) : "" }); toast({ title: "Loaded version " + v.version_number + " — save to apply" }); }
                }}>Restore</Button>
              </div>
            ))}
          </TabsContent>
        )}
      </Tabs>
        </div>
        <aside className="space-y-4">
          <SeoChecklistPanel draft={seoDraft} />
          <div className="border border-border rounded-xl p-4 bg-card text-xs space-y-2">
            <p className="font-heading font-bold text-sm">Primary keyword</p>
            <Input value={page.primary_keyword ?? ""} onChange={(e) => set({ primary_keyword: e.target.value })} placeholder="e.g. salsa classes chiswick" />
            <p className="text-muted-foreground">Drives the SEO checklist. Score below 85 triggers a publish warning.</p>
          </div>
        </aside>
      </div>

      <MediaPicker open={mediaOpen} onClose={() => setMediaOpen(false)} onSelect={(url) => mediaCallback?.(url)} />
    </AdminLayout>
  );
}
