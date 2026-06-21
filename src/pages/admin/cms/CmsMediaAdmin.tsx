import { useEffect, useRef, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Upload, Youtube, Trash2, Image as ImageIcon, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface MediaItem { id: string; url: string; kind: string; title: string | null; alt_text: string | null; folder: string; thumbnail_url: string | null; youtube_id: string | null; storage_path: string | null; bucket: string | null; }

const ytId = (url: string) => { const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/); return m?.[1] ?? null; };

export default function CmsMediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [folder, setFolder] = useState("all");
  const [ytOpen, setYtOpen] = useState(false);
  const [ytUrl, setYtUrl] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [edit, setEdit] = useState<MediaItem | null>(null);

  const load = async () => {
    const { data } = await supabase.from("cms_media").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as MediaItem[]);
  };
  useEffect(() => { load(); }, []);

  const folders = Array.from(new Set(items.map((i) => i.folder))).sort();
  const filtered = items.filter((i) => folder === "all" || i.folder === folder);

  const upload = async (file: File) => {
    const path = `cms/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, "_")}`;
    const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, { upsert: false });
    if (upErr) { toast({ title: "Upload failed", description: upErr.message, variant: "destructive" }); return; }
    const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
    const { error } = await supabase.from("cms_media").insert({
      kind: file.type.startsWith("video") ? "video" : "image",
      url: pub.publicUrl, storage_path: path, bucket: "gallery",
      title: file.name, mime_type: file.type, file_size: file.size,
      folder: "uncategorized", uploaded_by: user?.id ?? null,
    });
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Uploaded" }); load(); }
  };

  const addYoutube = async () => {
    const id = ytId(ytUrl);
    if (!id) { toast({ title: "Invalid YouTube URL", variant: "destructive" }); return; }
    const { error } = await supabase.from("cms_media").insert({
      kind: "youtube", url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail_url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      title: ytTitle || `YouTube ${id}`, youtube_id: id, folder: "videos",
      uploaded_by: user?.id ?? null,
    });
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { setYtOpen(false); setYtUrl(""); setYtTitle(""); load(); }
  };

  const remove = async (m: MediaItem) => {
    if (!confirm("Delete this media item?")) return;
    if (m.storage_path) await supabase.storage.from(m.bucket || "gallery").remove([m.storage_path]);
    await supabase.from("cms_media").delete().eq("id", m.id);
    load();
  };

  const saveEdit = async () => {
    if (!edit) return;
    await supabase.from("cms_media").update({ title: edit.title, alt_text: edit.alt_text, folder: edit.folder }).eq("id", edit.id);
    setEdit(null); load(); toast({ title: "Updated" });
  };

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground text-sm font-heading">Photos, videos, and YouTube embeds.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setYtOpen(true)}><Youtube size={14} className="mr-2" />YouTube</Button>
          <Button onClick={() => fileRef.current?.click()}><Upload size={14} className="mr-2" />Upload</Button>
          <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e) => { Array.from(e.target.files ?? []).forEach(upload); e.target.value = ""; }} />
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <Button size="sm" variant={folder === "all" ? "default" : "outline"} onClick={() => setFolder("all")}>All ({items.length})</Button>
        {folders.map((f) => <Button key={f} size="sm" variant={folder === f ? "default" : "outline"} onClick={() => setFolder(f)} className="capitalize">{f}</Button>)}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((m) => (
          <div key={m.id} className="group relative aspect-square bg-card border border-border rounded-lg overflow-hidden">
            <img src={m.thumbnail_url ?? m.url} alt={m.alt_text ?? ""} className="w-full h-full object-cover cursor-pointer" loading="lazy" onClick={() => setEdit(m)} />
            {m.kind === "youtube" && <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">YouTube</div>}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition flex justify-between items-end">
              <div className="text-white text-xs truncate flex-1">{m.title}</div>
              <div className="flex gap-1">
                <button onClick={() => { navigator.clipboard.writeText(m.url); toast({ title: "URL copied" }); }} className="text-white p-1 hover:bg-white/20 rounded"><Copy size={12} /></button>
                <button onClick={() => remove(m)} className="text-white p-1 hover:bg-red-500/40 rounded"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full py-16 text-center"><ImageIcon className="mx-auto mb-3 text-muted-foreground" /><p className="text-muted-foreground text-sm">No media. Upload images or add a YouTube link.</p></div>}
      </div>

      <Dialog open={ytOpen} onOpenChange={setYtOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add YouTube video</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>YouTube URL</Label><Input value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} placeholder="https://youtube.com/watch?v=…" /></div>
            <div><Label>Title (optional)</Label><Input value={ytTitle} onChange={(e) => setYtTitle(e.target.value)} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setYtOpen(false)}>Cancel</Button><Button onClick={addYoutube}>Add</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit media</DialogTitle></DialogHeader>
          {edit && (
            <div className="space-y-3">
              <img
                src={edit.thumbnail_url ?? edit.url}
                alt={
                  edit.alt_text?.trim() ||
                  edit.title?.trim() ||
                  edit.filename?.trim() ||
                  "Media library image preview"
                }
                className="w-full max-h-64 object-contain rounded"
              />
              <div><Label>Title</Label><Input value={edit.title ?? ""} onChange={(e) => setEdit({ ...edit, title: e.target.value })} /></div>
              <div><Label>Alt text (for SEO & accessibility)</Label><Input value={edit.alt_text ?? ""} onChange={(e) => setEdit({ ...edit, alt_text: e.target.value })} /></div>
              <div><Label>Folder</Label><Input value={edit.folder} onChange={(e) => setEdit({ ...edit, folder: e.target.value })} /></div>
              <div><Label>URL</Label><Input readOnly value={edit.url} /></div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button><Button onClick={saveEdit}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
