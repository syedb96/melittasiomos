/**
 * Lightweight admin CRUD table component used by every commerce editor.
 * Keeps each editor under ~100 lines and uniform in behaviour.
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "datetime" | "time" | "json";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  help?: string;
  width?: "full" | "half";
}

interface Props {
  table: string;
  fields: FieldDef[];
  orderBy?: { column: string; ascending?: boolean };
  renderRow?: (row: any) => ReactNode;
  defaults?: Record<string, unknown>;
  blockedEditKeys?: string[];
}

export const CommerceCrud = ({ table, fields, orderBy, renderRow, defaults = {}, blockedEditKeys = [] }: Props) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    let q = supabase.from(table as never).select("*");
    if (orderBy) q = (q as any).order(orderBy.column, { ascending: orderBy.ascending ?? true });
    const { data, error } = await q;
    if (error) toast.error(`Load failed: ${error.message}`);
    setRows((data as any[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [table]);

  const startNew = () => setEditing({ ...defaults });
  const cancel = () => setEditing(null);

  const save = async () => {
    setSaving(true);
    const payload: Record<string, unknown> = { ...editing };
    // Convert empty strings to null for nullable columns
    for (const f of fields) {
      if (payload[f.key] === "") payload[f.key] = null;
      if (f.type === "number" && payload[f.key] != null) payload[f.key] = Number(payload[f.key]);
    }
    const isNew = !editing.id;
    const { error } = isNew
      ? await supabase.from(table as never).insert(payload as never)
      : await supabase.from(table as never).update(payload as never).eq("id", editing.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(isNew ? "Created" : "Saved");
    setEditing(null);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this row? This cannot be undone.")) return;
    const { error } = await supabase.from(table as never).delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    await load();
  };

  const Field = ({ f }: { f: FieldDef }) => {
    const v = editing?.[f.key] ?? "";
    const disabled = !!(editing?.id && blockedEditKeys.includes(f.key));
    const setVal = (val: unknown) => setEditing({ ...editing, [f.key]: val });
    if (f.type === "boolean") return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={!!v} onChange={(e) => setVal(e.target.checked)} disabled={disabled} />
        {f.label}
      </label>
    );
    if (f.type === "textarea" || f.type === "json") return (
      <div>
        <label className="text-xs font-heading text-muted-foreground">{f.label}</label>
        <textarea value={typeof v === "object" ? JSON.stringify(v, null, 2) : (v ?? "")}
          onChange={(e) => {
            if (f.type === "json") {
              try { setVal(JSON.parse(e.target.value || "null")); } catch { setVal(e.target.value as any); }
            } else setVal(e.target.value);
          }}
          rows={4} disabled={disabled}
          className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background font-mono" />
        {f.help && <p className="text-[10px] text-muted-foreground mt-0.5">{f.help}</p>}
      </div>
    );
    if (f.type === "select") return (
      <div>
        <label className="text-xs font-heading text-muted-foreground">{f.label}</label>
        <select value={v ?? ""} onChange={(e) => setVal(e.target.value || null)} disabled={disabled}
          className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background">
          <option value="">—</option>
          {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    );
    const inputType = f.type === "number" ? "number" : f.type === "datetime" ? "datetime-local" : f.type === "time" ? "time" : "text";
    return (
      <div>
        <label className="text-xs font-heading text-muted-foreground">{f.label}</label>
        <input type={inputType} value={v ?? ""} onChange={(e) => setVal(e.target.value)}
          placeholder={f.placeholder} disabled={disabled} required={f.required}
          className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background" />
        {f.help && <p className="text-[10px] text-muted-foreground mt-0.5">{f.help}</p>}
      </div>
    );
  };

  const summaryFields = fields.slice(0, 3);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{loading ? "Loading…" : `${rows.length} row${rows.length === 1 ? "" : "s"}`}</p>
        <button onClick={startNew} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground">
          <Plus size={14} /> New
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {summaryFields.map((f) => <th key={f.key} className="text-left px-4 py-2">{f.label}</th>)}
              <th className="text-right px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border/60 hover:bg-muted/20">
                {summaryFields.map((f) => (
                  <td key={f.key} className="px-4 py-2 truncate max-w-xs">
                    {f.type === "boolean" ? (r[f.key] ? "✓" : "—") : String(r[f.key] ?? "—")}
                  </td>
                ))}
                <td className="px-4 py-2 text-right">
                  <button onClick={() => setEditing({ ...r })} className="text-xs text-primary hover:underline mr-3">Edit</button>
                  <button onClick={() => remove(r.id)} className="text-xs text-destructive hover:underline">
                    <Trash2 size={12} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={summaryFields.length + 1} className="px-4 py-8 text-center text-muted-foreground">Empty — click New to add the first row.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-6 overflow-auto" onClick={cancel}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-xl font-bold">{editing.id ? "Edit" : "New"}</h3>
              <button onClick={cancel}><X size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {fields.map((f) => (
                <div key={f.key} className={f.width === "half" ? "" : "col-span-2"}>
                  <Field f={f} />
                </div>
              ))}
            </div>
            {renderRow?.(editing)}
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={cancel} className="text-sm px-3 py-1.5 rounded-md border border-border">Cancel</button>
              <button onClick={save} disabled={saving} className="text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground inline-flex items-center gap-1.5">
                <Save size={14} /> {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
