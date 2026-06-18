import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";
import { runSeoChecklist } from "@/lib/seo-checklist";
import SeoChecklistPanel from "@/components/admin/cms/SeoChecklistPanel";
import { useAuth } from "@/contexts/AuthContext";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const CmsBlogGenerator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    keyword: "",
    angle: "events" as "beginner" | "classes" | "wedding" | "private" | "corporate" | "events",
    location: "London",
    wordCount: 1000,
    moneyPage: "/pura-nights",
    tone: "Warm, premium, UK English",
  });
  const [generating, setGenerating] = useState(false);
  const [draft, setDraft] = useState<any | null>(null);

  const generate = async () => {
    if (!form.keyword) { toast({ title: "Add a primary keyword", variant: "destructive" }); return; }
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("cms-blog-generate", { body: form });
      if (error) throw error;
      if (!data?.title) throw new Error(data?.error || "No content returned");
      setDraft({ ...data, slug: data.slug || slugify(data.title) });
      toast({ title: "Draft generated", description: "Review the SEO panel, then save as draft." });
    } catch (e: any) {
      toast({ title: "Generation failed", description: e.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const saveAsDraft = async () => {
    if (!draft) return;
    const { score, results } = runSeoChecklist({
      title: draft.title,
      metaTitle: draft.metaTitle,
      metaDescription: draft.metaDescription,
      slug: draft.slug,
      primaryKeyword: form.keyword,
      contentHtml: draft.contentHtml,
      heroImageUrl: draft.heroImageUrl,
      schemaJsonld: draft.schemaJsonld,
    });
    const { data, error } = await supabase.from("cms_pages").insert([{
      slug: draft.slug,
      title: draft.title,
      excerpt: draft.metaDescription,
      content_html: draft.contentHtml,
      content_json: {},
      status: "draft",
      page_type: "blog",
      kind: "blog",
      primary_keyword: form.keyword,
      meta_title: draft.metaTitle,
      meta_description: draft.metaDescription,
      schema_jsonld: draft.schemaJsonld ?? null,
      seo_score: score,
      seo_checklist: results as any,
      author_id: user?.id ?? null,
    }]).select("id").single();
    if (error) { toast({ title: "Save failed", description: error.message, variant: "destructive" }); return; }
    await supabase.from("cms_generation_logs").insert({
      user_id: user?.id,
      page_id: data.id,
      model: "google/gemini-2.5-pro",
      prompt: `kw=${form.keyword} angle=${form.angle} wc=${form.wordCount}`,
      primary_keyword: form.keyword,
      status: "success",
    });
    toast({ title: "Draft saved", description: `SEO score: ${score}/100` });
    navigate(`/admin/cms/pages/${data.id}`);
  };

  const seoDraft = draft ? {
    title: draft.title,
    metaTitle: draft.metaTitle,
    metaDescription: draft.metaDescription,
    slug: draft.slug,
    primaryKeyword: form.keyword,
    contentHtml: draft.contentHtml,
    heroImageUrl: draft.heroImageUrl,
    schemaJsonld: draft.schemaJsonld,
  } : null;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold flex items-center gap-3"><Sparkles className="text-primary" />AI Blog Generator</h1>
        <p className="text-muted-foreground">Generate a full SEO-ready draft. Review the score, then save and refine in the editor.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 bg-card border border-border rounded-xl space-y-4">
            <div>
              <Label>Primary keyword</Label>
              <Input value={form.keyword} onChange={(e) => setForm({ ...form, keyword: e.target.value })} placeholder="e.g. salsa night out from reading" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Funnel angle</Label>
                <Select value={form.angle} onValueChange={(v) => setForm({ ...form, angle: v as any })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner / first class</SelectItem>
                    <SelectItem value="classes">Weekly classes</SelectItem>
                    <SelectItem value="events">Social events / Latin Friday</SelectItem>
                    <SelectItem value="wedding">Wedding dance</SelectItem>
                    <SelectItem value="private">Private lessons</SelectItem>
                    <SelectItem value="corporate">Corporate / group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Money page link</Label>
                <Input value={form.moneyPage} onChange={(e) => setForm({ ...form, moneyPage: e.target.value })} />
              </div>
              <div>
                <Label>Location focus</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <Label>Word count</Label>
                <Input type="number" value={form.wordCount} onChange={(e) => setForm({ ...form, wordCount: parseInt(e.target.value) || 1000 })} />
              </div>
            </div>
            <div>
              <Label>Tone</Label>
              <Textarea rows={2} value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} />
            </div>
            <Button onClick={generate} disabled={generating} className="w-full">
              {generating ? <><Loader2 className="animate-spin mr-2" size={14} />Generating…</> : <><Sparkles size={14} className="mr-2" />Generate draft</>}
            </Button>
          </div>

          {draft && (
            <div className="p-5 bg-card border border-border rounded-xl space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold">{draft.title}</h2>
                  <p className="text-sm text-muted-foreground">/blog/{draft.slug}</p>
                </div>
                <Button onClick={saveAsDraft}>Save as draft</Button>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Meta title:</strong> {draft.metaTitle} <span className="opacity-60">({draft.metaTitle?.length || 0} chars)</span></p>
                <p><strong>Meta description:</strong> {draft.metaDescription} <span className="opacity-60">({draft.metaDescription?.length || 0} chars)</span></p>
              </div>
              <div className="border border-border rounded-lg p-4 max-h-[500px] overflow-auto bg-background prose-custom" dangerouslySetInnerHTML={{ __html: draft.contentHtml }} />
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          {seoDraft ? <SeoChecklistPanel draft={seoDraft} /> : (
            <div className="p-5 bg-card border border-border rounded-xl text-sm text-muted-foreground">
              The SEO checklist will appear here after generation. Drafts below 85/100 are flagged for revision before publish.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CmsBlogGenerator;
