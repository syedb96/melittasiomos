import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Eye, EyeOff, Star, Trash2, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Album {
  id: string;
  title: string;
  slug: string;
  category: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

interface Asset {
  id: string;
  album_id: string | null;
  title: string | null;
  alt_text: string | null;
  image_url: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

const categories = ["Classes & Socials", "Pura Ladies Performances", "Events & Latin Fridays", "Wedding Dance Moments", "Team / Portraits", "Brand / Hero Media"];

const GalleryAdmin = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [uploading, setUploading] = useState(false);

  const loadAlbums = async () => {
    const { data } = await supabase.from("gallery_albums").select("*").order("sort_order");
    setAlbums((data as Album[]) ?? []);
  };

  const loadAssets = async (albumId?: string) => {
    let q = supabase.from("gallery_assets").select("*").order("created_at", { ascending: false });
    if (albumId) q = q.eq("album_id", albumId);
    const { data } = await q;
    setAssets((data as Asset[]) ?? []);
  };

  useEffect(() => { loadAlbums(); loadAssets(); }, []);

  const createAlbum = async () => {
    if (!newTitle.trim()) return;
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { error } = await supabase.from("gallery_albums").insert({ title: newTitle, slug, category: newCategory, sort_order: albums.length });
    if (error) { toast.error(error.message); return; }
    toast.success("Album created");
    setNewTitle(""); setShowNewAlbum(false);
    loadAlbums();
  };

  const togglePublish = async (table: "gallery_albums" | "gallery_assets", id: string, current: boolean) => {
    await supabase.from(table).update({ is_published: !current }).eq("id", id);
    if (table === "gallery_albums") loadAlbums(); else loadAssets(selectedAlbum ?? undefined);
    toast.success(current ? "Unpublished" : "Published");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file);
      if (uploadError) { toast.error(uploadError.message); continue; }
      const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(path);
      await supabase.from("gallery_assets").insert({
        album_id: selectedAlbum,
        image_url: publicUrl,
        file_path: path,
        alt_text: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        uploaded_by: user?.id,
      });
    }
    setUploading(false);
    loadAssets(selectedAlbum ?? undefined);
    toast.success("Upload complete");
  };

  const deleteAsset = async (id: string, filePath?: string) => {
    if (!confirm("Delete this image?")) return;
    if (filePath) await supabase.storage.from("gallery").remove([filePath]);
    await supabase.from("gallery_assets").delete().eq("id", id);
    loadAssets(selectedAlbum ?? undefined);
    toast.success("Deleted");
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground text-sm font-heading">Manage albums, upload media, and publish to the public gallery</p>
        </div>
        <button onClick={() => setShowNewAlbum(true)} className="btn-cta-primary text-sm flex items-center gap-2"><Plus size={16} /> New Album</button>
      </div>

      {showNewAlbum && (
        <div className="bg-card rounded-xl p-6 border border-border mb-6">
          <h3 className="font-heading font-semibold mb-3">Create New Album</h3>
          <div className="flex gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Album title" className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={createAlbum} className="btn-cta-primary text-sm">Create</button>
            <button onClick={() => setShowNewAlbum(false)} className="text-sm text-muted-foreground">Cancel</button>
          </div>
        </div>
      )}

      {/* Album filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button onClick={() => { setSelectedAlbum(null); loadAssets(); }} className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${!selectedAlbum ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-muted/50"}`}>
          All Media
        </button>
        {albums.map(a => (
          <button key={a.id} onClick={() => { setSelectedAlbum(a.id); loadAssets(a.id); }} className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${selectedAlbum === a.id ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-muted/50"}`}>
            {a.title} {!a.is_published && <EyeOff size={12} className="inline ml-1" />}
          </button>
        ))}
      </div>

      {/* Upload */}
      <div className="mb-6">
        <label className="inline-flex items-center gap-2 cursor-pointer bg-card border border-dashed border-border rounded-xl px-6 py-4 hover:bg-muted/50 transition-colors">
          <Upload size={18} className="text-primary" />
          <span className="text-sm font-heading">{uploading ? "Uploading..." : "Upload Images"}</span>
          <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Assets grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {assets.map(a => (
          <div key={a.id} className="relative group rounded-xl overflow-hidden border border-border bg-card">
            <img src={a.image_url} alt={a.alt_text ?? ""} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button onClick={() => togglePublish("gallery_assets", a.id, a.is_published)} className="p-2 bg-card rounded-lg" title={a.is_published ? "Unpublish" : "Publish"}>
                {a.is_published ? <Eye size={14} className="text-primary" /> : <EyeOff size={14} className="text-muted-foreground" />}
              </button>
              <button onClick={() => deleteAsset(a.id, a.file_path ?? undefined)} className="p-2 bg-card rounded-lg" title="Delete">
                <Trash2 size={14} className="text-destructive" />
              </button>
            </div>
            {!a.is_published && (
              <span className="absolute top-2 left-2 bg-charcoal/80 text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-heading">Draft</span>
            )}
          </div>
        ))}
        {assets.length === 0 && (
          <div className="col-span-full text-center py-16 text-muted-foreground">
            <Image size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-heading">No media yet. Upload images to get started.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryAdmin;
