/* <!-- WIX: PROTOTYPE ONLY — This testimonials admin is a Lovable prototype for managing student
   reviews. In Wix, use a CMS collection called "Testimonials" connected to repeaters across
   relevant pages. Do NOT replicate this page in Wix Editor. --> */
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Plus, Edit2, Star } from "lucide-react";
import { toast } from "sonner";

interface TestimonialRow {
  id: string;
  person_name: string;
  context_label: string | null;
  quote: string;
  rating: number;
  source_type: string;
  is_featured: boolean;
  is_published: boolean;
}

const empty: TestimonialRow = { id: "", person_name: "", context_label: "", quote: "", rating: 5, source_type: "google", is_featured: false, is_published: false };

const TestimonialsAdmin = () => {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [editing, setEditing] = useState<TestimonialRow | null>(null);

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems((data as TestimonialRow[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.person_name || !editing.quote) return;
    if (editing.id) {
      const { id, ...rest } = editing;
      await supabase.from("testimonials").update(rest).eq("id", id);
    } else {
      const { id, ...rest } = editing;
      await supabase.from("testimonials").insert(rest);
    }
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ is_published: !current }).eq("id", id);
    load();
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ is_featured: !current }).eq("id", id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground text-sm font-heading">Manage student reviews and featured testimonials</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="btn-cta-primary text-sm flex items-center gap-2"><Plus size={16} /> Add Testimonial</button>
      </div>

      {editing && (
        <div className="bg-card rounded-xl p-6 border border-border mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input value={editing.person_name} onChange={e => setEditing({ ...editing, person_name: e.target.value })} placeholder="Name" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input value={editing.context_label ?? ""} onChange={e => setEditing({ ...editing, context_label: e.target.value })} placeholder="Context (e.g. Beginner, Wedding Couple)" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <select value={editing.source_type} onChange={e => setEditing({ ...editing, source_type: e.target.value })} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              <option value="google">Google Review</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="direct">Direct</option>
            </select>
            <select value={editing.rating} onChange={e => setEditing({ ...editing, rating: Number(e.target.value) })} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
            </select>
          </div>
          <textarea value={editing.quote} onChange={e => setEditing({ ...editing, quote: e.target.value })} placeholder="Testimonial quote" rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          <div className="flex gap-3">
            <button onClick={save} className="btn-cta-primary text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="text-sm text-muted-foreground">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-heading font-semibold text-sm">{t.person_name}</p>
                  {t.context_label && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t.context_label}</span>}
                </div>
                <div className="flex gap-0.5 mb-2">{Array(t.rating).fill(0).map((_, i) => <Star key={i} size={10} className="fill-primary text-primary" />)}</div>
                <p className="text-muted-foreground text-sm italic line-clamp-2">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleFeatured(t.id, t.is_featured)} className={`p-2 rounded-lg hover:bg-muted/50 ${t.is_featured ? "text-primary" : "text-muted-foreground"}`} title="Toggle Featured">
                  <Star size={14} fill={t.is_featured ? "currentColor" : "none"} />
                </button>
                <button onClick={() => setEditing(t)} className="p-2 hover:bg-muted/50 rounded-lg"><Edit2 size={14} /></button>
                <button onClick={() => togglePublish(t.id, t.is_published)} className="p-2 hover:bg-muted/50 rounded-lg">
                  {t.is_published ? <Eye size={14} className="text-primary" /> : <EyeOff size={14} className="text-muted-foreground" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default TestimonialsAdmin;
