import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Plus, Edit2 } from "lucide-react";
import { toast } from "sonner";

interface EventRow {
  id: string;
  title: string;
  slug: string;
  event_type: string;
  venue_name: string | null;
  venue_address: string | null;
  start_datetime: string;
  end_datetime: string | null;
  summary: string | null;
  ticket_url: string | null;
  is_featured: boolean;
  is_published: boolean;
}

const empty: EventRow = { id: "", title: "", slug: "", event_type: "latin-friday", venue_name: "Drayton Court Hotel", venue_address: "2 The Avenue, Ealing, W13 8PH", start_datetime: "", end_datetime: null, summary: "", ticket_url: "https://linktr.ee/pura.nights", is_featured: false, is_published: false };

const EventsAdmin = () => {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [editing, setEditing] = useState<EventRow | null>(null);

  const load = async () => {
    const { data } = await supabase.from("events").select("*").order("start_datetime", { ascending: false });
    setEvents((data as EventRow[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title || !editing.start_datetime) return;
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = { ...editing, slug };
    if (editing.id) {
      const { id, ...rest } = payload;
      await supabase.from("events").update(rest).eq("id", id);
    } else {
      const { id, ...rest } = payload;
      await supabase.from("events").insert(rest);
    }
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("events").update({ is_published: !current }).eq("id", id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground text-sm font-heading">Manage Latin Friday dates and other events</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="btn-cta-primary text-sm flex items-center gap-2"><Plus size={16} /> Add Event</button>
      </div>

      {editing && (
        <div className="bg-card rounded-xl p-6 border border-border mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="Event Title" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input type="datetime-local" value={editing.start_datetime?.slice(0, 16) ?? ""} onChange={e => setEditing({ ...editing, start_datetime: e.target.value })} className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input value={editing.venue_name ?? ""} onChange={e => setEditing({ ...editing, venue_name: e.target.value })} placeholder="Venue Name" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input value={editing.venue_address ?? ""} onChange={e => setEditing({ ...editing, venue_address: e.target.value })} placeholder="Venue Address" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <input value={editing.ticket_url ?? ""} onChange={e => setEditing({ ...editing, ticket_url: e.target.value })} placeholder="Ticket URL" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            <select value={editing.event_type} onChange={e => setEditing({ ...editing, event_type: e.target.value })} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              <option value="latin-friday">Latin Friday</option>
              <option value="workshop">Workshop</option>
              <option value="special">Special Event</option>
            </select>
          </div>
          <textarea value={editing.summary ?? ""} onChange={e => setEditing({ ...editing, summary: e.target.value })} placeholder="Summary" rows={2} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          <div className="flex gap-3">
            <button onClick={save} className="btn-cta-primary text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="text-sm text-muted-foreground">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {events.map(ev => (
          <div key={ev.id} className="bg-card rounded-xl p-5 border border-border flex items-center gap-4">
            <div className="flex-1">
              <p className="font-heading font-semibold text-sm">{ev.title}</p>
              <p className="text-xs text-muted-foreground">{new Date(ev.start_datetime).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })} · {ev.venue_name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(ev)} className="p-2 hover:bg-muted/50 rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => togglePublish(ev.id, ev.is_published)} className="p-2 hover:bg-muted/50 rounded-lg">
                {ev.is_published ? <Eye size={14} className="text-primary" /> : <EyeOff size={14} className="text-muted-foreground" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default EventsAdmin;
