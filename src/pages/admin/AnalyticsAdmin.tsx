import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Lead { id: string; first_name: string; email: string; venue_preference: string | null; created_at: string; }
interface Contact { id: string; name: string; email: string; enquiry_type: string; created_at: string; }

const startOfMonth = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1).toISOString(); };

const AnalyticsAdmin = () => {
  const [tasterMonth, setTasterMonth] = useState(0);
  const [tasterTotal, setTasterTotal] = useState(0);
  const [contactMonth, setContactMonth] = useState(0);
  const [contactTotal, setContactTotal] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const since = startOfMonth();
      const [tm, tt, cm, ct, rl, rc] = await Promise.all([
        supabase.from("free_taster_leads").select("id", { count: "exact", head: true }).gte("created_at", since),
        supabase.from("free_taster_leads").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).gte("created_at", since),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("free_taster_leads").select("id, first_name, email, venue_preference, created_at").order("created_at", { ascending: false }).limit(10),
        supabase.from("contact_submissions").select("id, name, email, enquiry_type, created_at").order("created_at", { ascending: false }).limit(10),
      ]);
      setTasterMonth(tm.count ?? 0);
      setTasterTotal(tt.count ?? 0);
      setContactMonth(cm.count ?? 0);
      setContactTotal(ct.count ?? 0);
      setRecentLeads((rl.data as Lead[]) ?? []);
      setRecentContacts((rc.data as Contact[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const kpi = (label: string, value: number) => (
    <div className="bg-card rounded-xl p-6 border border-primary/20">
      <p className="text-muted-foreground text-xs uppercase tracking-wider font-heading mb-2">{label}</p>
      <p className="font-display text-3xl font-bold text-primary">{value}</p>
    </div>
  );

  useEffect(() => {
    document.title = "Analytics — Internal";
    let m = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!m) { m = document.createElement("meta"); m.name = "robots"; document.head.appendChild(m); }
    const prev = m.content; m.content = "noindex, nofollow";
    return () => { m!.content = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">

      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="font-display text-2xl font-bold">PURA NIGHTS</p>
          <p className="text-muted-foreground text-sm font-heading">Analytics · Internal Only</p>
        </div>
        <span className="bg-primary/10 text-primary text-[10px] font-heading font-bold tracking-wider uppercase px-3 py-1 rounded-full">NOINDEX</span>
      </header>

      {loading ? <p className="text-muted-foreground">Loading…</p> : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {kpi("Taster leads this month", tasterMonth)}
            {kpi("Taster leads total", tasterTotal)}
            {kpi("Enquiries this month", contactMonth)}
            {kpi("Enquiries total", contactTotal)}
          </div>

          <section className="mb-10">
            <h2 className="font-heading font-bold mb-3">Recent free taster leads</h2>
            <div className="bg-card rounded-xl overflow-x-auto border border-border">
              <table className="w-full text-sm">
                <thead className="bg-primary text-charcoal font-heading text-xs">
                  <tr><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Venue</th><th className="text-left p-3">Date</th></tr>
                </thead>
                <tbody>
                  {recentLeads.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-muted-foreground italic">No leads yet.</td></tr>
                  ) : recentLeads.map((l, i) => (
                    <tr key={l.id} className={i % 2 ? "bg-muted/30" : ""}>
                      <td className="p-3">{l.first_name}</td><td className="p-3">{l.email}</td>
                      <td className="p-3">{l.venue_preference ?? "—"}</td>
                      <td className="p-3">{new Date(l.created_at).toLocaleString("en-GB")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold mb-3">Recent contact submissions</h2>
            <div className="bg-card rounded-xl overflow-x-auto border border-border">
              <table className="w-full text-sm">
                <thead className="bg-primary text-charcoal font-heading text-xs">
                  <tr><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Type</th><th className="text-left p-3">Date</th></tr>
                </thead>
                <tbody>
                  {recentContacts.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-muted-foreground italic">No submissions yet.</td></tr>
                  ) : recentContacts.map((c, i) => (
                    <tr key={c.id} className={i % 2 ? "bg-muted/30" : ""}>
                      <td className="p-3">{c.name}</td><td className="p-3">{c.email}</td>
                      <td className="p-3">{c.enquiry_type}</td>
                      <td className="p-3">{new Date(c.created_at).toLocaleString("en-GB")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AnalyticsAdmin;
