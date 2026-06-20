import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, Sparkles, Upload, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Props {
  pageId?: string;
  pageSlug?: string;
  heroUrl: string;
  heroAlt: string;
  ogUrl: string;
  ogGeneratedAt?: string | null;
  onChange: (patch: { hero_image_url?: string; hero_image_alt?: string; og_image?: string; twitter_image?: string; og_image_generated_at?: string }) => void;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function PostImagePanel({ pageId, pageSlug, heroUrl, heroAlt, ogUrl, ogGeneratedAt, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [altLoading, setAltLoading] = useState(false);
  const [ogLoading, setOgLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `blog/${slugify(pageSlug || "post")}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("hero-media").upload(path, file, { contentType: file.type, upsert: true });
      if (error) throw error;
      const { data: pub } = supabase.storage.from("hero-media").getPublicUrl(path);
      const url = pub.publicUrl;
      onChange({ hero_image_url: url });
      toast({ title: "Image uploaded" });
      // Auto-generate alt text
      await generateAlt(url);
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    }
    setUploading(false);
  };

  const generateAlt = async (url?: string) => {
    const target = url || heroUrl;
    if (!target) { toast({ title: "Upload or paste an image URL first", variant: "destructive" }); return; }
    setAltLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("cms-ai-alt-text", {
        body: { image_url: target, context: pageSlug || "blog post" },
      });
      if (error) throw error;
      onChange({ hero_image_alt: data.alt });
      toast({ title: "Alt text generated" });
    } catch (e: any) {
      toast({ title: "Alt text failed", description: e.message, variant: "destructive" });
    }
    setAltLoading(false);
  };

  const generateOg = async () => {
    if (!pageId) { toast({ title: "Save the post first", variant: "destructive" }); return; }
    setOgLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("cms-og-image", { body: { page_id: pageId } });
      if (error) throw error;
      onChange({ og_image: data.url, twitter_image: data.url, og_image_generated_at: new Date().toISOString() });
      toast({ title: "OG image generated" });
    } catch (e: any) {
      toast({ title: "OG generation failed", description: e.message, variant: "destructive" });
    }
    setOgLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Hero image</Label>
        <div className="flex gap-2 mt-1">
          <Input value={heroUrl} onChange={(e) => onChange({ hero_image_url: e.target.value })} placeholder="https://… or upload" />
          <label className="inline-flex">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
            <Button asChild type="button" variant="outline" disabled={uploading}>
              <span className="cursor-pointer">{uploading ? <Loader2 size={14} className="animate-spin" /> : <><Upload size={14} className="mr-1" />Upload</>}</span>
            </Button>
          </label>
        </div>
        {heroUrl && <img src={heroUrl} alt={heroAlt || "Hero preview"} className="mt-2 rounded-lg max-h-48 object-cover w-full border border-border" />}
      </div>

      <div>
        <Label className="flex items-center justify-between">
          <span>Alt text</span>
          <Button type="button" size="sm" variant="ghost" onClick={() => generateAlt()} disabled={altLoading || !heroUrl}>
            {altLoading ? <Loader2 size={12} className="animate-spin mr-1" /> : <Sparkles size={12} className="mr-1" />}
            Generate with AI
          </Button>
        </Label>
        <Input value={heroAlt} onChange={(e) => onChange({ hero_image_alt: e.target.value })} placeholder="Describe the image for screen readers and SEO" maxLength={140} />
        <p className="text-[10px] text-muted-foreground mt-1">{heroAlt?.length || 0}/140 chars</p>
      </div>

      <div className="border-t border-border pt-4">
        <Label className="flex items-center justify-between">
          <span className="flex items-center gap-2"><ImageIcon size={14} />Open Graph / Twitter card (1200×630)</span>
          <Button type="button" size="sm" variant="outline" onClick={generateOg} disabled={ogLoading}>
            {ogLoading ? <Loader2 size={12} className="animate-spin mr-1" /> : <Sparkles size={12} className="mr-1" />}
            Generate
          </Button>
        </Label>
        <Input value={ogUrl} onChange={(e) => onChange({ og_image: e.target.value, twitter_image: e.target.value })} placeholder="https://… or generate" className="mt-1" />
        {ogUrl && <img src={ogUrl} alt="OG preview" className="mt-2 rounded-lg max-h-32 object-cover w-full border border-border" />}
        {ogGeneratedAt && <p className="text-[10px] text-muted-foreground mt-1">Generated {new Date(ogGeneratedAt).toLocaleString()}</p>}
      </div>
    </div>
  );
}
