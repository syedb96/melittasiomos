import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus, Loader2, ExternalLink } from "lucide-react";

interface Suggestion { slug: string; title: string; reason: string; anchor: string; }
interface Props {
  pageId?: string;
  title: string;
  city?: string;
  topic?: string;
  tags?: string[];
  contentHtml: string;
  onInsert: (html: string) => void;
}

export default function LinkSuggestionsPanel({ pageId, title, city, topic, tags, contentHtml, onInsert }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    if (!title) return;
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("cms-link-suggestions", {
      body: { page_id: pageId, title, city, topic, tags, content_html: contentHtml },
    });
    if (!error) setSuggestions(data?.suggestions ?? []);
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(fetchSuggestions, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, city, topic, (tags || []).join(",")]);

  return (
    <div className="border border-border rounded-xl p-4 bg-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-base font-bold flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />Internal Link Suggestions
        </h3>
        <Button size="sm" variant="ghost" onClick={fetchSuggestions} disabled={loading}>
          {loading ? <Loader2 size={12} className="animate-spin" /> : "Refresh"}
        </Button>
      </div>
      {suggestions.length === 0 && !loading && (
        <p className="text-xs text-muted-foreground">No related published posts yet. Suggestions appear as you add city, topic, and tags.</p>
      )}
      <ul className="space-y-2">
        {suggestions.map((s) => (
          <li key={s.slug} className="border border-border rounded-lg p-2 text-xs space-y-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold truncate">{s.title}</p>
                <p className="text-muted-foreground text-[10px]">{s.reason}</p>
                <p className="font-mono text-[10px] text-primary mt-1">"{s.anchor}"</p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => onInsert(` <a href="/${s.slug}">${s.anchor}</a>`)}>
                  <Plus size={10} className="mr-1" />Insert
                </Button>
                <a href={`/${s.slug}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary text-[10px] inline-flex items-center gap-1">
                  <ExternalLink size={10} />Preview
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
