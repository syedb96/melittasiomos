import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeftRight, RotateCcw } from "lucide-react";

type VersionMeta = { id: string; version_number: number; note: string | null; created_at: string };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageId: string;
  versions: VersionMeta[];
  currentSnapshot: Record<string, any>;
  onRestore?: (versionNumber: number, snapshot: Record<string, any>) => void;
}

// Fields worth diffing — surface signal, hide noise like updated_at.
const DIFFABLE_FIELDS: { key: string; label: string }[] = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "status", label: "Status" },
  { key: "workflow_status", label: "Workflow" },
  { key: "excerpt", label: "Excerpt" },
  { key: "meta_title", label: "Meta title" },
  { key: "meta_description", label: "Meta description" },
  { key: "canonical_url", label: "Canonical URL" },
  { key: "noindex", label: "Noindex" },
  { key: "hero_image_url", label: "Hero image" },
  { key: "hero_image_alt", label: "Hero alt text" },
  { key: "og_image", label: "OG image" },
  { key: "review_date", label: "Review date" },
  { key: "author_name", label: "Author" },
  { key: "primary_keyword", label: "Primary keyword" },
  { key: "category", label: "Category" },
  { key: "tags", label: "Tags" },
  { key: "city", label: "City" },
  { key: "topic", label: "Topic" },
  { key: "content_html", label: "Body HTML" },
  { key: "schema_jsonld", label: "JSON-LD schema" },
];

function stringify(v: any): string {
  if (v == null) return "—";
  if (typeof v === "string") return v;
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  try { return JSON.stringify(v, null, 2); } catch { return String(v); }
}

function isDiff(a: any, b: any): boolean {
  return stringify(a) !== stringify(b);
}

const CURRENT_SENTINEL = "__current__";

export default function VersionDiffViewer({ open, onOpenChange, pageId, versions, currentSnapshot, onRestore }: Props) {
  const sortedVersions = useMemo(
    () => [...versions].sort((a, b) => b.version_number - a.version_number),
    [versions],
  );

  // Default: compare latest version against current draft.
  const [leftId, setLeftId] = useState<string>(sortedVersions[1]?.id ?? sortedVersions[0]?.id ?? CURRENT_SENTINEL);
  const [rightId, setRightId] = useState<string>(CURRENT_SENTINEL);
  const [leftSnap, setLeftSnap] = useState<Record<string, any> | null>(null);
  const [rightSnap, setRightSnap] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const ids = [leftId, rightId].filter((x) => x !== CURRENT_SENTINEL);
      const { data } = ids.length
        ? await supabase.from("cms_page_versions").select("id,snapshot").in("id", ids)
        : { data: [] as any[] };
      if (cancelled) return;
      const byId = new Map((data ?? []).map((r: any) => [r.id, r.snapshot ?? {}]));
      setLeftSnap(leftId === CURRENT_SENTINEL ? currentSnapshot : byId.get(leftId) ?? {});
      setRightSnap(rightId === CURRENT_SENTINEL ? currentSnapshot : byId.get(rightId) ?? {});
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [open, leftId, rightId, currentSnapshot]);

  const swap = () => { const l = leftId; setLeftId(rightId); setRightId(l); };

  const diffs = useMemo(() => {
    if (!leftSnap || !rightSnap) return [];
    return DIFFABLE_FIELDS.filter((f) => isDiff(leftSnap[f.key], rightSnap[f.key]));
  }, [leftSnap, rightSnap]);

  const versionLabel = (id: string) => {
    if (id === CURRENT_SENTINEL) return "Current draft (unsaved)";
    const v = sortedVersions.find((x) => x.id === id);
    return v ? `v${v.version_number} · ${new Date(v.created_at).toLocaleString()} · ${v.note ?? ""}` : id;
  };

  const restoreLeft = () => {
    if (leftId === CURRENT_SENTINEL || !leftSnap || !onRestore) return;
    const v = sortedVersions.find((x) => x.id === leftId);
    if (!v) return;
    if (!confirm(`Restore v${v.version_number}? Current draft will be replaced (a new version is saved on next save).`)) return;
    onRestore(v.version_number, leftSnap);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Compare versions</DialogTitle>
          <DialogDescription>
            Choose any two snapshots — or compare a snapshot to the current unsaved draft — before restoring.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-end pb-3 border-b shrink-0">
          <div>
            <label className="text-xs text-muted-foreground">Left (base)</label>
            <Select value={leftId} onValueChange={setLeftId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={CURRENT_SENTINEL}>Current draft (unsaved)</SelectItem>
                {sortedVersions.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    v{v.version_number} — {v.note ?? "no note"} ({new Date(v.created_at).toLocaleDateString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={swap} title="Swap"><ArrowLeftRight size={14} /></Button>
          <div>
            <label className="text-xs text-muted-foreground">Right (compare)</label>
            <Select value={rightId} onValueChange={setRightId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={CURRENT_SENTINEL}>Current draft (unsaved)</SelectItem>
                {sortedVersions.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    v{v.version_number} — {v.note ?? "no note"} ({new Date(v.created_at).toLocaleDateString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline">{diffs.length} change{diffs.length === 1 ? "" : "s"}</Badge>
        </div>

        <div className="flex-1 overflow-auto py-3 space-y-3">
          {loading && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 size={14} className="animate-spin" /> Loading snapshots…</div>}
          {!loading && diffs.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">No tracked fields differ between these two snapshots.</p>
          )}
          {!loading && diffs.map((f) => (
            <div key={f.key} className="border rounded-md overflow-hidden">
              <div className="px-3 py-1.5 bg-muted/50 text-xs font-medium flex items-center justify-between">
                <span>{f.label}</span>
                <code className="text-[10px] text-muted-foreground">{f.key}</code>
              </div>
              <div className="grid grid-cols-2 divide-x">
                <pre className="p-2 text-[11px] whitespace-pre-wrap break-words bg-red-50/40 dark:bg-red-950/20 max-h-64 overflow-auto">{stringify(leftSnap?.[f.key])}</pre>
                <pre className="p-2 text-[11px] whitespace-pre-wrap break-words bg-green-50/40 dark:bg-green-950/20 max-h-64 overflow-auto">{stringify(rightSnap?.[f.key])}</pre>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="border-t pt-3 shrink-0">
          <div className="text-xs text-muted-foreground mr-auto">
            <span className="inline-block w-3 h-3 bg-red-100 dark:bg-red-950/40 mr-1 rounded-sm align-middle" /> {versionLabel(leftId)}
            <span className="mx-2">→</span>
            <span className="inline-block w-3 h-3 bg-green-100 dark:bg-green-950/40 mr-1 rounded-sm align-middle" /> {versionLabel(rightId)}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          {onRestore && leftId !== CURRENT_SENTINEL && (
            <Button onClick={restoreLeft}><RotateCcw size={14} className="mr-2" />Restore left snapshot</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
