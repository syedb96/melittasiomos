/* <!-- WIX SECTION: Public embeddable class finder widget --> */
/*
 * Standalone, chrome-free page designed to be loaded inside an iframe on
 * partner sites. No Layout (no header/footer) — just a self-contained card.
 * Every CTA links back to puranights.com with a UTM, attributing partner traffic.
 *
 * Wix mirror: build the same content on a hidden lightweight page set to
 * "Page-only" template (no header/footer). Public URL identical.
 */

import { useEffect } from "react";

const SCHEDULE = [
  { day: "Monday", venue: "The George IV · Chiswick W4 2DR", time: "19:30 — Salsa & Bachata" },
  { day: "Tuesday", venue: "The Drayton Court · Ealing W13 8PH", time: "18:50 — Salsa & Bachata" },
  { day: "2nd Friday / month", venue: "The Drayton Court · Ealing", time: "20:00 — Latin Friday Social" },
];

const EmbedClassFinder = () => {
  useEffect(() => {
    document.title = "Pura Nights — West London Salsa & Bachata schedule";
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex,follow";
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  const utm = "?utm_source=partner&utm_medium=iframe&utm_campaign=class-finder-embed";

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", padding: 16, maxWidth: 360, margin: "0 auto", color: "#151515", background: "#fff" }}>
      <header style={{ borderBottom: "1px solid #f0e7d8", paddingBottom: 8, marginBottom: 12 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CF6A3D", margin: 0 }}>Pura Nights · West London</p>
        <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 18, fontWeight: 700, margin: "4px 0 0" }}>This week's Salsa &amp; Bachata classes</h1>
      </header>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {SCHEDULE.map(s => (
          <li key={s.day} style={{ padding: "8px 0", borderBottom: "1px solid #f6efe2" }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>{s.day}</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#555" }}>{s.venue}</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#CF6A3D" }}>{s.time}</p>
          </li>
        ))}
      </ul>

      <a
        href={`https://www.puranights.com/start-here${utm}`}
        target="_top"
        rel="noopener"
        style={{ display: "block", textAlign: "center", marginTop: 12, background: "#CF6A3D", color: "#fff", padding: "10px 14px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 13 }}
      >
        Book your first class →
      </a>

      <p style={{ fontSize: 10, color: "#888", textAlign: "center", margin: "10px 0 0" }}>
        Powered by{" "}
        <a href={`https://www.puranights.com${utm}`} target="_top" rel="noopener" style={{ color: "#CF6A3D", textDecoration: "none", fontWeight: 600 }}>
          puranights.com
        </a>
      </p>
    </main>
  );
};

export default EmbedClassFinder;
