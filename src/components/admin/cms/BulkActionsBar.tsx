import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, FileEdit, EyeOff, Tag, Send, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Props {
  selectedIds: string[];
  onClear: () => void;
  onDone: () => void;
}

export default function BulkActionsBar({ selectedIds, onClear, onDone }: Props) {
  const [busy, setBusy] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [scheduleAt, setScheduleAt] = useState("");
  const n = selectedIds.length;

  const run = async (fn: () => Promise<void>, msg: string) => {
    setBusy(true);
    try { await fn(); toast({ title: msg }); onDone(); onClear(); }
    catch (e: any) { toast({ title: "Failed", description: e.message, variant: "destructive" }); }
    setBusy(false);
  };

  const setStatus = (status: string, extra: any = {}) =>
    run(async () => {
      const { error } = await supabase.from("cms_pages").update({ status, ...extra }).in("id", selectedIds);
      if (error) throw error;
    }, `${n} post${n>1?"s":""} → ${status}`);

  const addTags = () => {
    const newTags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);
    if (newTags.length === 0) return;
    run(async () => {
      const { data } = await supabase.from("cms_pages").select("id,tags").in("id", selectedIds);
      for (const row of data ?? []) {
        const merged = Array.from(new Set([...(row.tags ?? []), ...newTags]));
        await supabase.from("cms_pages").update({ tags: merged }).eq("id", row.id);
      }
      setTagOpen(false); setTagInput("");
    }, `Tagged ${n} post${n>1?"s":""}`);
  };

  const pushToWix = () =>
    run(async () => {
      for (const id of selectedIds) {
        await supabase.functions.invoke("cms-wix-push", { body: { page_id: id, force: true } });
      }
    }, `Pushed ${n} to Wix`);

  const remove = () => {
    if (!confirm(`Delete ${n} post${n>1?"s":""}? This cannot be undone.`)) return;
    run(async () => {
      const { error } = await supabase.from("cms_pages").delete().in("id", selectedIds);
      if (error) throw error;
    }, `Deleted ${n}`);
  };

  return (
    <>
      <div className="sticky top-0 z-20 bg-card border border-border rounded-xl shadow-lg p-3 mb-4 flex items-center gap-2 flex-wrap">
        <span className="text-sm font-heading font-semibold mr-2">{n} selected</span>
        <Button size="sm" variant="outline" disabled={busy} onClick={() => setStatus("draft")}><FileEdit size={14} className="mr-1" />Draft</Button>
        <Button size="sm" variant="outline" disabled={busy} onClick={() => setScheduleOpen(true)}><Calendar size={14} className="mr-1" />Schedule</Button>
        <Button size="sm" variant="outline" disabled={busy} onClick={() => setStatus("draft", { published_at: null })}><EyeOff size={14} className="mr-1" />Unpublish</Button>
        <Button size="sm" variant="outline" disabled={busy} onClick={() => setStatus("published", { published_at: new Date().toISOString() })}>Publish</Button>
        <Button size="sm" variant="outline" disabled={busy} onClick={() => setTagOpen(true)}><Tag size={14} className="mr-1" />Tag</Button>
        <Button size="sm" variant="outline" disabled={busy} onClick={pushToWix}><Send size={14} className="mr-1" />Push to Wix</Button>
        <Button size="sm" variant="destructive" disabled={busy} onClick={remove}><Trash2 size={14} className="mr-1" />Delete</Button>
        {busy && <Loader2 size={14} className="animate-spin ml-2" />}
        <Button size="sm" variant="ghost" disabled={busy} onClick={onClear} className="ml-auto">Clear</Button>
      </div>

      <Dialog open={tagOpen} onOpenChange={setTagOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add tags to {n} post{n>1?"s":""}</DialogTitle></DialogHeader>
          <Label>Tags (comma-separated)</Label>
          <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="reading, beginners, friday-night" />
          <DialogFooter><Button onClick={addTags}>Add tags</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Schedule {n} post{n>1?"s":""}</DialogTitle></DialogHeader>
          <Label>Publish at</Label>
          <Input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} />
          <DialogFooter>
            <Button onClick={() => {
              if (!scheduleAt) return;
              setScheduleOpen(false);
              setStatus("scheduled", { publish_at: new Date(scheduleAt).toISOString() });
            }}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
