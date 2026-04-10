import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MessageSquare } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  source_page: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-destructive/10 text-destructive",
  "in-progress": "bg-primary/10 text-primary",
  replied: "bg-secondary/10 text-secondary",
  archived: "bg-muted text-muted-foreground",
};

const EnquiriesAdmin = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const load = async () => {
    let q = supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setEnquiries((data as Enquiry[]) ?? []);
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    load();
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Enquiries</h1>
      <p className="text-muted-foreground text-sm font-heading mb-6">Contact form submissions from the website</p>

      <div className="flex gap-2 mb-6">
        {["all", "new", "in-progress", "replied", "archived"].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${filter === s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}>
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div className="space-y-3">
          {enquiries.map(e => (
            <button key={e.id} onClick={() => setSelected(e)} className={`w-full text-left bg-card rounded-xl p-5 border transition-colors ${selected?.id === e.id ? "border-primary" : "border-border hover:border-primary/30"}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-heading font-semibold text-sm">{e.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading ${statusColors[e.status] ?? ""}`}>{e.status}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{e.subject}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{e.message}</p>
              <p className="text-[10px] text-muted-foreground mt-2">{new Date(e.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
            </button>
          ))}
          {enquiries.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-heading">No enquiries{filter !== "all" ? ` with status "${filter}"` : ""}</p>
            </div>
          )}
        </div>

        {selected && (
          <div className="bg-card rounded-xl p-6 border border-border h-fit sticky top-8">
            <h3 className="font-heading font-bold text-lg mb-1">{selected.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">{selected.subject}</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm"><Mail size={14} className="text-primary" /> <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a></div>
              {selected.phone && <div className="flex items-center gap-2 text-sm"><Phone size={14} className="text-primary" /> {selected.phone}</div>}
              {selected.source_page && <p className="text-[10px] text-muted-foreground">From: {selected.source_page}</p>}
            </div>
            <div className="bg-background rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["new", "in-progress", "replied", "archived"].map(s => (
                <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold ${selected.status === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EnquiriesAdmin;
