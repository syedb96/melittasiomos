import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MediaItem { id: string; url: string; title: string | null; alt_text: string | null; kind: string; thumbnail_url: string | null; }

export default function MediaPicker({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (url: string, alt?: string) => void; }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    if (!open) return;
    supabase.from("cms_media").select("id,url,title,alt_text,kind,thumbnail_url").order("created_at", { ascending: false }).limit(200).then(({ data }) => setItems((data ?? []) as MediaItem[]));
  }, [open]);
  const filtered = items.filter((i) => !q || (i.title ?? "").toLowerCase().includes(q.toLowerCase()) || (i.alt_text ?? "").toLowerCase().includes(q.toLowerCase()));
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader><DialogTitle>Media Library</DialogTitle></DialogHeader>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="pl-9" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-y-auto pr-1">
          {filtered.map((m) => (
            <button key={m.id} onClick={() => { onSelect(m.url, m.alt_text ?? undefined); onClose(); }}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border hover:border-primary transition-colors">
              <img src={m.thumbnail_url ?? m.url} alt={m.alt_text ?? ""} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition">
                <div className="truncate">{m.title ?? "Untitled"}</div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && <p className="col-span-full text-center text-sm text-muted-foreground py-12">No media yet. Upload some in the Media Library.</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
