import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Edit2, Plus } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role_title: string;
  specialties: string[];
  short_bio: string | null;
  profile_image_url: string | null;
  instagram_url: string | null;
  sort_order: number;
  is_published: boolean;
}

const TeamAdmin = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);

  const load = async () => {
    const { data } = await supabase.from("team_members").select("*").order("sort_order");
    setMembers((data as TeamMember[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("team_members").update({ is_published: !current }).eq("id", id);
    load();
    toast.success(current ? "Unpublished" : "Published");
  };

  const save = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id) {
      await supabase.from("team_members").update(rest).eq("id", id);
    } else {
      const slug = rest.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      await supabase.from("team_members").insert({ ...rest, slug, sort_order: members.length });
    }
    toast.success("Saved");
    setEditing(null);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground text-sm font-heading">Manage instructor profiles that appear on the public About page</p>
        </div>
        <button onClick={() => setEditing({ id: "", name: "", slug: "", role_title: "", specialties: [], short_bio: "", profile_image_url: null, instagram_url: null, sort_order: 0, is_published: false })} className="btn-cta-primary text-sm flex items-center gap-2"><Plus size={16} /> Add Member</button>
      </div>

      {editing && (
        <div className="bg-card rounded-xl p-6 border border-border mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Name" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input value={editing.role_title} onChange={e => setEditing({ ...editing, role_title: e.target.value })} placeholder="Role Title" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input value={editing.specialties.join(", ")} onChange={e => setEditing({ ...editing, specialties: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} placeholder="Specialties (comma-separated)" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input value={editing.instagram_url ?? ""} onChange={e => setEditing({ ...editing, instagram_url: e.target.value })} placeholder="Instagram URL" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <textarea value={editing.short_bio ?? ""} onChange={e => setEditing({ ...editing, short_bio: e.target.value })} placeholder="Short Bio" rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          <div className="flex gap-3">
            <button onClick={save} className="btn-cta-primary text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="text-sm text-muted-foreground">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {members.map(m => (
          <div key={m.id} className="bg-card rounded-xl p-5 border border-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg font-display flex-shrink-0">
              {m.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-sm">{m.name}</p>
              <p className="text-primary text-xs font-heading">{m.role_title}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {m.specialties.map(s => <span key={s} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(m)} className="p-2 hover:bg-muted/50 rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => togglePublish(m.id, m.is_published)} className="p-2 hover:bg-muted/50 rounded-lg">
                {m.is_published ? <Eye size={14} className="text-primary" /> : <EyeOff size={14} className="text-muted-foreground" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default TeamAdmin;
