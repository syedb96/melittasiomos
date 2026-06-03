/* <!-- WIX SECTION: Public embeddable class finder widget -->
   Standalone, chrome-free, noindex. Designed to be loaded via iframe on
   partner sites. Captures referrer + UTM, posts to dataLayer + Supabase,
   and notifies parent frame via postMessage. */

import { useEffect, useMemo, useState } from "react";
import { trackCta } from "@/lib/analytics";

type ClassRow = { day: string; venue: string; location: string; style: "Salsa" | "Bachata" | "Both"; time: string };

const SCHEDULE: ClassRow[] = [
  { day: "Monday", venue: "The George IV", location: "Chiswick", style: "Both", time: "19:30 — Salsa & Bachata" },
  { day: "Tuesday", venue: "The Drayton Court", location: "Ealing", style: "Both", time: "18:50 — Salsa & Bachata" },
  { day: "2nd Friday / month", venue: "The Drayton Court", location: "Ealing", style: "Both", time: "20:00 — Latin Friday Social" },
];

const LOCATIONS = ["All", "Chiswick", "Ealing"] as const;
const STYLES = ["All", "Salsa", "Bachata"] as const;

function readQuery() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    partner_id: p.get("partner_id") || p.get("pid") || "",
  };
}

function postParent(type: string, payload: Record<string, unknown>) {
  try { window.parent?.postMessage({ source: "pura-nights-widget", type, ...payload }, "*"); } catch { /* */ }
}

const EmbedClassFinder = () => {
  const [loc, setLoc] = useState<typeof LOCATIONS[number]>("All");
  const [style, setStyle] = useState<typeof STYLES[number]>("All");
  const query = useMemo(readQuery, []);

  useEffect(() => {
    document.title = "Pura Nights — West London Salsa & Bachata schedule";
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex,follow";
    document.head.appendChild(m);

    const referrer = typeof document !== "undefined" ? document.referrer : "";
    trackCta("class_finder_view", `embed:${query.utm_source || referrer || "direct"}`);
    postParent("widget_loaded", { referrer, ...query });

    return () => { document.head.removeChild(m); };
  }, [query]);

  useEffect(() => {
    if (loc === "All" && style === "All") return;
    trackCta("class_finder_filter", `loc:${loc}|style:${style}`);
    postParent("filter_changed", { location: loc, style });
  }, [loc, style]);

  const filtered = SCHEDULE.filter(s =>
    (loc === "All" || s.location === loc) &&
    (style === "All" || s.style === "Both" || s.style === style)
  );

  const utm = "?utm_source=" + encodeURIComponent(query.utm_source || "partner") + "&utm_medium=iframe&utm_campaign=class-finder-embed";

  const onCta = (label: string, dest: string) => {
    trackCta(label, "embed-class-finder");
    postParent("cta_clicked", { label, destination: dest });
  };

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", padding: 16, maxWidth: 380, margin: "0 auto", color: "#151515", background: "#fff" }}>
      <header style={{ borderBottom: "1px solid #f0e7d8", paddingBottom: 8, marginBottom: 10 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CF6A3D", margin: 0 }}>Pura Nights · West London</p>
        <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 18, fontWeight: 700, margin: "4px 0 0" }}>This week's Salsa &amp; Bachata classes</h1>
      </header>

      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {LOCATIONS.map(l => (
          <button key={l} onClick={() => setLoc(l)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: 0, cursor: "pointer", background: loc === l ? "#CF6A3D" : "#f0ebe1", color: loc === l ? "#fff" : "#555", fontWeight: 600 }}>{l}</button>
        ))}
        <span style={{ width: 1, background: "#eee" }} />
        {STYLES.map(s => (
          <button key={s} onClick={() => setStyle(s)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: 0, cursor: "pointer", background: style === s ? "#151515" : "#f0ebe1", color: style === s ? "#fff" : "#555", fontWeight: 600 }}>{s}</button>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {filtered.length === 0 && (
          <li style={{ padding: "16px 0", fontSize: 12, color: "#888", textAlign: "center" }}>No classes match this filter.</li>
        )}
        {filtered.map(s => (
          <li key={s.day + s.venue} style={{ padding: "8px 0", borderBottom: "1px solid #f6efe2" }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>{s.day}</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#555" }}>{s.venue} · {s.location}</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#CF6A3D" }}>{s.time}</p>
          </li>
        ))}
      </ul>

      <a
        href={`https://www.puranights.com/start-here${utm}`}
        target="_top"
        rel="noopener"
        onClick={() => onCta("class_finder_book_click", "/start-here")}
        style={{ display: "block", textAlign: "center", marginTop: 12, background: "#CF6A3D", color: "#fff", padding: "10px 14px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 13 }}
      >
        Book your first class →
      </a>

      <a
        href={`https://wa.me/447449482343?text=Hi%20Melitta%20%E2%80%94%20I%20found%20you%20via%20a%20partner%20site%20(${encodeURIComponent(query.utm_source || "embed")}).`}
        target="_blank"
        rel="noopener"
        onClick={() => onCta("class_finder_whatsapp_click", "wa.me")}
        style={{ display: "block", textAlign: "center", marginTop: 6, background: "#fff", color: "#151515", padding: "8px 14px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 12, border: "1px solid #ddd" }}
      >
        WhatsApp Melitta
      </a>

      <p style={{ fontSize: 10, color: "#888", textAlign: "center", margin: "10px 0 4px" }}>
        Powered by{" "}
        <a href={`https://www.puranights.com${utm}`} target="_top" rel="noopener" style={{ color: "#CF6A3D", textDecoration: "none", fontWeight: 600 }}>
          Pura Nights — Salsa &amp; Bachata in West London
        </a>
      </p>
      <p style={{ fontSize: 9, color: "#aaa", textAlign: "center", margin: 0 }}>
        No personal data is collected by this widget unless you submit an enquiry.
      </p>
    </main>
  );
};

export default EmbedClassFinder;
