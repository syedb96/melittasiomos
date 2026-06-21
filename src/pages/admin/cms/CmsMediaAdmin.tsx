import { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Upload,
  Youtube,
  Trash2,
  Image as ImageIcon,
  Copy,
  Search,
  Tag,
  RefreshCw,
  Link2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface MediaItem {
  id: string;
  url: string;
  kind: string;
  title: string | null;
  alt_text: string | null;
  folder: string;
  thumbnail_url: string | null;
  youtube_id: string | null;
  storage_path: string | null;
  bucket: string | null;
  tags: string[];
}

interface PageRef {
  id: string;
  slug: string;
  title: string;
  status: string;
  where: string;
}

const ytId = (url: string) => {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return m?.[1] ?? null;
};

export default function CmsMediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [folder, setFolder] = useState("all");
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [ytOpen, setYtOpen] = useState(false);
  const [ytUrl, setYtUrl] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [edit, setEdit] = useState<MediaItem | null>(null);
  const [usage, setUsage] = useState<PageRef[] | null>(null);
  const [usageLoading, setUsageLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulk, setBulk] = useState({ alt_text: "", folder: "", addTags: "" });
  const [replacing, setReplacing] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("cms_media")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(((data ?? []) as MediaItem[]).map((m) => ({ ...m, tags: m.tags ?? [] })));
  };
  useEffect(() => {
    load();
  }, []);

  const folders = useMemo(
    () => Array.from(new Set(items.map((i) => i.folder))).sort(),
    [items],
  );
  const allTags = useMemo(
    () => Array.from(new Set(items.flatMap((i) => i.tags ?? []))).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (folder !== "all" && i.folder !== folder) return false;
      if (tagFilter !== "all" && !(i.tags ?? []).includes(tagFilter)) return false;
      if (!q) return true;
      return (
        (i.title ?? "").toLowerCase().includes(q) ||
        (i.alt_text ?? "").toLowerCase().includes(q) ||
        i.url.toLowerCase().includes(q)
      );
    });
  }, [items, folder, tagFilter, query]);

  const missingAlt = items.filter(
    (i) => i.kind !== "youtube" && !(i.alt_text ?? "").trim(),
  ).length;

  const upload = async (file: File) => {
    const path = `cms/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, "_")}`;
    const { error: upErr } = await supabase.storage
      .from("gallery")
      .upload(path, file, { upsert: false });
    if (upErr) {
      toast({ title: "Upload failed", description: upErr.message, variant: "destructive" });
      return;
    }
    const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
    const { error } = await supabase.from("cms_media").insert({
      kind: file.type.startsWith("video") ? "video" : "image",
      url: pub.publicUrl,
      storage_path: path,
      bucket: "gallery",
      title: file.name,
      mime_type: file.type,
      file_size: file.size,
      folder: "uncategorized",
      uploaded_by: user?.id ?? null,
    });
    if (error)
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Uploaded" });
      load();
    }
  };

  const addYoutube = async () => {
    const id = ytId(ytUrl);
    if (!id) {
      toast({ title: "Invalid YouTube URL", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("cms_media").insert({
      kind: "youtube",
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail_url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      title: ytTitle || `YouTube ${id}`,
      youtube_id: id,
      folder: "videos",
      uploaded_by: user?.id ?? null,
    });
    if (error)
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else {
      setYtOpen(false);
      setYtUrl("");
      setYtTitle("");
      load();
    }
  };

  const findUsage = async (m: MediaItem): Promise<PageRef[]> => {
    const { data } = await supabase
      .from("cms_pages")
      .select("id, slug, title, status, content_html, hero_image_url, og_image, twitter_image")
      .or(
        [
          `content_html.ilike.%${m.url}%`,
          `hero_image_url.eq.${m.url}`,
          `og_image.eq.${m.url}`,
          `twitter_image.eq.${m.url}`,
        ].join(","),
      );
    return (data ?? []).map((p: any) => {
      const where: string[] = [];
      if (p.hero_image_url === m.url) where.push("hero");
      if (p.og_image === m.url) where.push("og");
      if (p.twitter_image === m.url) where.push("twitter");
      if ((p.content_html ?? "").includes(m.url)) where.push("body");
      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        status: p.status,
        where: where.join(", ") || "—",
      };
    });
  };

  const remove = async (m: MediaItem) => {
    setUsageLoading(true);
    const refs = await findUsage(m);
    setUsageLoading(false);
    if (refs.length > 0) {
      toast({
        title: "Cannot delete — in use",
        description: `Used on ${refs.length} page(s): ${refs
          .slice(0, 3)
          .map((r) => r.slug)
          .join(", ")}${refs.length > 3 ? "…" : ""}`,
        variant: "destructive",
      });
      return;
    }
    if (!confirm("Delete this media item? It is not referenced by any page.")) return;
    if (m.storage_path)
      await supabase.storage.from(m.bucket || "gallery").remove([m.storage_path]);
    await supabase.from("cms_media").delete().eq("id", m.id);
    load();
  };

  const openEdit = async (m: MediaItem) => {
    setEdit(m);
    setUsage(null);
    setUsageLoading(true);
    const refs = await findUsage(m);
    setUsage(refs);
    setUsageLoading(false);
  };

  const saveEdit = async () => {
    if (!edit) return;
    await supabase
      .from("cms_media")
      .update({
        title: edit.title,
        alt_text: edit.alt_text,
        folder: edit.folder,
        tags: edit.tags,
      })
      .eq("id", edit.id);
    setEdit(null);
    load();
    toast({ title: "Updated" });
  };

  // Safe replace: upload new file, update cms_media.url + storage_path,
  // then rewrite every reference in cms_pages to point at the new URL.
  const replaceMedia = async (file: File) => {
    if (!edit) return;
    setReplacing(true);
    try {
      const oldUrl = edit.url;
      const path = `cms/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, "_")}`;
      const { error: upErr } = await supabase.storage
        .from("gallery")
        .upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
      const newUrl = pub.publicUrl;

      const refs = await findUsage(edit);
      for (const r of refs) {
        const { data: page } = await supabase
          .from("cms_pages")
          .select("content_html, hero_image_url, og_image, twitter_image")
          .eq("id", r.id)
          .maybeSingle();
        if (!page) continue;
        const patch: {
          hero_image_url?: string;
          og_image?: string;
          twitter_image?: string;
          content_html?: string;
        } = {};
        if (page.hero_image_url === oldUrl) patch.hero_image_url = newUrl;
        if (page.og_image === oldUrl) patch.og_image = newUrl;
        if (page.twitter_image === oldUrl) patch.twitter_image = newUrl;
        if ((page.content_html ?? "").includes(oldUrl))
          patch.content_html = (page.content_html ?? "").split(oldUrl).join(newUrl);
        if (Object.keys(patch).length > 0)
          await supabase.from("cms_pages").update(patch).eq("id", r.id);
      }

      // Remove old storage object, then update media row
      if (edit.storage_path)
        await supabase.storage
          .from(edit.bucket || "gallery")
          .remove([edit.storage_path]);

      await supabase
        .from("cms_media")
        .update({
          url: newUrl,
          storage_path: path,
          bucket: "gallery",
          mime_type: file.type,
          file_size: file.size,
        })
        .eq("id", edit.id);

      toast({
        title: "Replaced",
        description: `Updated ${refs.length} page reference(s).`,
      });
      setEdit(null);
      load();
    } catch (e: any) {
      toast({
        title: "Replace failed",
        description: e.message ?? String(e),
        variant: "destructive",
      });
    } finally {
      setReplacing(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const clearSelection = () => setSelected(new Set());
  const selectAllFiltered = () => setSelected(new Set(filtered.map((f) => f.id)));

  const applyBulk = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    const patch: { alt_text?: string; folder?: string } = {};
    if (bulk.alt_text.trim()) patch.alt_text = bulk.alt_text.trim();
    if (bulk.folder.trim()) patch.folder = bulk.folder.trim();
    if (Object.keys(patch).length > 0) {
      await supabase.from("cms_media").update(patch).in("id", ids);
    }
    if (bulk.addTags.trim()) {
      const newTags = bulk.addTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      // Merge tag arrays per row (client-side; small N).
      const targets = items.filter((i) => selected.has(i.id));
      await Promise.all(
        targets.map((m) =>
          supabase
            .from("cms_media")
            .update({ tags: Array.from(new Set([...(m.tags ?? []), ...newTags])) })
            .eq("id", m.id),
        ),
      );
    }
    toast({ title: `Updated ${ids.length} item(s)` });
    setBulkOpen(false);
    setBulk({ alt_text: "", folder: "", addTags: "" });
    clearSelection();
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground text-sm font-heading">
            Photos, videos, YouTube embeds — with usage tracking, bulk editing and safe replace.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => setYtOpen(true)}>
            <Youtube size={14} className="mr-2" />
            YouTube
          </Button>
          <Button onClick={() => fileRef.current?.click()}>
            <Upload size={14} className="mr-2" />
            Upload
          </Button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              Array.from(e.target.files ?? []).forEach(upload);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Total assets</div>
          <div className="text-2xl font-bold">{items.length}</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Folders</div>
          <div className="text-2xl font-bold">{folders.length}</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Tags</div>
          <div className="text-2xl font-bold">{allTags.length}</div>
        </div>
        <div
          className={`rounded-lg border p-3 ${
            missingAlt > 0
              ? "border-amber-500/40 bg-amber-500/5"
              : "border-border bg-card"
          }`}
        >
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            {missingAlt > 0 && <AlertTriangle size={12} className="text-amber-500" />}
            Missing alt text
          </div>
          <div className="text-2xl font-bold">{missingAlt}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-3 flex-wrap items-center">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, alt, URL…"
            className="pl-7 h-9 w-64"
          />
        </div>
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All folders ({items.length})</option>
          {folders.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All tags</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              #{t}
            </option>
          ))}
        </select>
        <Button size="sm" variant="ghost" onClick={load}>
          <RefreshCw size={12} className="mr-1" />
          Refresh
        </Button>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="sticky top-0 z-10 flex items-center gap-2 mb-3 p-2 bg-primary/10 border border-primary/30 rounded-md">
          <span className="text-sm font-medium">{selected.size} selected</span>
          <Button size="sm" variant="outline" onClick={() => setBulkOpen(true)}>
            <Tag size={12} className="mr-1" />
            Bulk edit
          </Button>
          <Button size="sm" variant="ghost" onClick={selectAllFiltered}>
            Select all filtered
          </Button>
          <Button size="sm" variant="ghost" onClick={clearSelection}>
            Clear
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((m) => {
          const isSel = selected.has(m.id);
          const altMissing = m.kind !== "youtube" && !(m.alt_text ?? "").trim();
          return (
            <div
              key={m.id}
              className={`group relative aspect-square bg-card border rounded-lg overflow-hidden ${
                isSel ? "border-primary ring-2 ring-primary/40" : "border-border"
              }`}
            >
              <div
                className="absolute top-2 left-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={isSel}
                  onCheckedChange={() => toggleSelect(m.id)}
                  className="bg-white/90"
                />
              </div>
              <img
                src={m.thumbnail_url ?? m.url}
                alt={m.alt_text ?? ""}
                className="w-full h-full object-cover cursor-pointer"
                loading="lazy"
                onClick={() => openEdit(m)}
              />
              {m.kind === "youtube" && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">
                  YouTube
                </div>
              )}
              {altMissing && (
                <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <AlertTriangle size={10} />
                  alt
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition flex justify-between items-end">
                <div className="text-white text-xs truncate flex-1">{m.title}</div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(m.url);
                      toast({ title: "URL copied" });
                    }}
                    className="text-white p-1 hover:bg-white/20 rounded"
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    onClick={() => remove(m)}
                    className="text-white p-1 hover:bg-red-500/40 rounded"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <ImageIcon className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No media matches the current filters.
            </p>
          </div>
        )}
      </div>

      {/* YouTube dialog */}
      <Dialog open={ytOpen} onOpenChange={setYtOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add YouTube video</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>YouTube URL</Label>
              <Input
                value={ytUrl}
                onChange={(e) => setYtUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=…"
              />
            </div>
            <div>
              <Label>Title (optional)</Label>
              <Input value={ytTitle} onChange={(e) => setYtTitle(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setYtOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addYoutube}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk edit dialog */}
      <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk edit {selected.size} item(s)</DialogTitle>
            <DialogDescription>
              Leave a field blank to leave it unchanged. Tags are merged, never replaced.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Alt text (applied to every selected item)</Label>
              <Input
                value={bulk.alt_text}
                onChange={(e) => setBulk({ ...bulk, alt_text: e.target.value })}
                placeholder="e.g. Pura Nights salsa class at The George IV Chiswick"
              />
            </div>
            <div>
              <Label>Folder</Label>
              <Input
                value={bulk.folder}
                onChange={(e) => setBulk({ ...bulk, folder: e.target.value })}
                placeholder="e.g. events"
              />
            </div>
            <div>
              <Label>Add tags (comma-separated)</Label>
              <Input
                value={bulk.addTags}
                onChange={(e) => setBulk({ ...bulk, addTags: e.target.value })}
                placeholder="chiswick, salsa, 2026"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyBulk}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog (with usage + safe replace) */}
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit media</DialogTitle>
          </DialogHeader>
          {edit && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <img
                  src={edit.thumbnail_url ?? edit.url}
                  alt={
                    edit.alt_text?.trim() ||
                    edit.title?.trim() ||
                    edit.storage_path?.split("/").pop()?.trim() ||
                    "Media library image preview"
                  }
                  className="w-full max-h-64 object-contain rounded border border-border"
                />
                {edit.kind !== "youtube" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={replacing}
                      onClick={() => replaceRef.current?.click()}
                    >
                      <RefreshCw size={14} className="mr-2" />
                      {replacing ? "Replacing…" : "Safe replace…"}
                    </Button>
                    <input
                      ref={replaceRef}
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        e.target.value = "";
                        if (f) replaceMedia(f);
                      }}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Uploads a new file and rewrites every page reference to the new URL.
                      The old file is removed from storage.
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={edit.title ?? ""}
                    onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Alt text (for SEO & accessibility)</Label>
                  <Input
                    value={edit.alt_text ?? ""}
                    onChange={(e) => setEdit({ ...edit, alt_text: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Folder</Label>
                  <Input
                    value={edit.folder}
                    onChange={(e) => setEdit({ ...edit, folder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={(edit.tags ?? []).join(", ")}
                    onChange={(e) =>
                      setEdit({
                        ...edit,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input readOnly value={edit.url} />
                </div>
              </div>

              <div className="md:col-span-2 border-t border-border pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <Link2 size={14} />
                  <span className="text-sm font-medium">
                    Used on{" "}
                    {usageLoading
                      ? "…"
                      : usage
                        ? `${usage.length} page(s)`
                        : "—"}
                  </span>
                </div>
                {usage && usage.length > 0 && (
                  <div className="space-y-1 max-h-40 overflow-auto">
                    {usage.map((u) => (
                      <a
                        key={u.id}
                        href={`/admin/cms/pages/${u.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between text-xs p-2 rounded hover:bg-muted"
                      >
                        <span className="truncate">
                          {u.title}{" "}
                          <span className="text-muted-foreground">/{u.slug}</span>
                        </span>
                        <span className="flex gap-1 shrink-0">
                          <Badge variant="outline" className="text-[10px]">
                            {u.status}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            {u.where}
                          </Badge>
                        </span>
                      </a>
                    ))}
                  </div>
                )}
                {usage && usage.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Not referenced by any page — safe to delete.
                  </p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEdit(null)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
