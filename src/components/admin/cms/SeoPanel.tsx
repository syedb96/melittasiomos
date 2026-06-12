import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface SeoFields {
  meta_title: string;
  meta_description: string;
  og_image: string;
  canonical_url: string;
  noindex: boolean;
  schema_jsonld: string;
}

export default function SeoPanel({ value, onChange, slug }: { value: SeoFields; onChange: (v: SeoFields) => void; slug?: string }) {
  const set = (patch: Partial<SeoFields>) => onChange({ ...value, ...patch });
  const titleLen = (value.meta_title ?? "").length;
  const descLen = (value.meta_description ?? "").length;

  return (
    <div className="space-y-4">
      <div>
        <Label>Meta title <span className={`text-xs ml-2 ${titleLen > 60 ? "text-destructive" : "text-muted-foreground"}`}>{titleLen}/60</span></Label>
        <Input value={value.meta_title} onChange={(e) => set({ meta_title: e.target.value })} placeholder="Page title for search engines" />
      </div>
      <div>
        <Label>Meta description <span className={`text-xs ml-2 ${descLen > 160 ? "text-destructive" : "text-muted-foreground"}`}>{descLen}/160</span></Label>
        <Textarea rows={3} value={value.meta_description} onChange={(e) => set({ meta_description: e.target.value })} placeholder="One sentence under 160 characters" />
      </div>
      <div>
        <Label>OG / social image URL</Label>
        <Input value={value.og_image} onChange={(e) => set({ og_image: e.target.value })} placeholder="https://…" />
      </div>
      <div>
        <Label>Canonical URL</Label>
        <Input value={value.canonical_url} onChange={(e) => set({ canonical_url: e.target.value })} placeholder={slug ? `https://puranights.com/${slug}` : "Leave blank to auto-generate"} />
      </div>
      <div>
        <Label>JSON-LD schema (optional)</Label>
        <Textarea rows={6} className="font-mono text-xs" value={value.schema_jsonld} onChange={(e) => set({ schema_jsonld: e.target.value })} placeholder='{"@context":"https://schema.org","@type":"Article",…}' />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <Label>Hide from search engines</Label>
          <p className="text-xs text-muted-foreground">Adds noindex,nofollow</p>
        </div>
        <Switch checked={value.noindex} onCheckedChange={(v) => set({ noindex: v })} />
      </div>
    </div>
  );
}
