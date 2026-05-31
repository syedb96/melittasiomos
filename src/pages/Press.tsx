import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Copy, Check, ExternalLink, Download } from "lucide-react";

const FACTS = [
  ["Founded", "2017 by Melitta Siomos — Bachata UK Champion"],
  ["Primary studios", "The George IV, Chiswick (W4 2DR) · The Drayton Court Hotel, Ealing (W13 8PH)"],
  ["Service area", "West & South West London — Chiswick, Ealing, Acton, Hammersmith, Fulham, Richmond, Putney, Hounslow, Covent Garden"],
  ["Disciplines", "Salsa (On1 Crossbody), Bachata Sensual, Ladies Styling, Wedding First Dance"],
  ["Brands", "Pura Nights (weekly classes) · Pura Ladies (international performance team) · Wedding Dance Made Easy · Melitta Siomos Dance Academy"],
  ["Community", "500+ active students · 5.0★ Google rating across 127+ reviews"],
  ["Press contact", "siomosmelitta@gmail.com · +44 7449 482 343"],
];

const SOURCES = [
  { label: "Google Business — Pura Nights", url: "https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London" },
  { label: "Google Business — Wedding Dance Made Easy", url: "https://maps.google.com/?q=Wedding+Dance+Made+Easy+Melitta+Siomos+London" },
  { label: "Google Business — Pura Ladies", url: "https://maps.google.com/?q=Pura+Ladies+Dance+Company+London" },
  { label: "Instagram — @melittasiomos", url: "https://www.instagram.com/melittasiomos/" },
  { label: "Instagram — @puranights.salsabachata", url: "https://www.instagram.com/puranights.salsabachata/" },
  { label: "Instagram — @puraladies", url: "https://www.instagram.com/puraladies/" },
  { label: "Instagram — @wedding_dance_made_easy", url: "https://www.instagram.com/wedding_dance_made_easy/" },
  { label: "Facebook — Pura Nights London", url: "https://www.facebook.com/puranightslondon/" },
  { label: "YouTube — Melitta Siomos", url: "https://www.youtube.com/@melittasiomos" },
  { label: "Melitta's personal site", url: "https://melittasiomos.com" },
];

const BADGE_SNIPPET = `<a href="https://www.puranights.com/?utm_source=partner&utm_medium=badge" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid #CF6A3D;border-radius:9999px;font-family:system-ui,sans-serif;font-size:13px;color:#151515;background:#fff;text-decoration:none">
  <span style="font-weight:700">As featured by</span>
  <span>Pura Nights · West London Salsa & Bachata</span>
</a>`;

const QUOTE_SNIPPETS = [
  `"The friendliest Salsa & Bachata classes in West London — beginners walk in alone and leave with friends." — Pura Nights, Chiswick`,
  `"Bachata UK Champion Melitta Siomos turned my first dance into the highlight of the wedding." — Wedding Dance Made Easy testimonial`,
  `"Pura Ladies is the women's performance team that put West London bachata on the international map." — Pura Ladies`,
];

function CopyBox({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="border border-primary/20 rounded-xl bg-charcoal/[0.02]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-primary/15">
        <span className="text-[11px] font-heading font-semibold tracking-wider uppercase text-charcoal/70">{label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
          className="inline-flex items-center gap-1.5 text-[11px] font-heading font-semibold text-primary hover:underline"
        >
          {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <pre className="p-4 text-[11px] leading-relaxed font-mono text-charcoal/80 overflow-x-auto whitespace-pre-wrap break-words">{value}</pre>
    </div>
  );
}

const Press = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Press, Sources & Citations — Pura Nights",
    description: "Verified facts, citation sources, embeddable badge and press contact for Melitta Siomos Dance Academy.",
    url: "https://www.puranights.com/press",
    isPartOf: { "@type": "WebSite", name: "Pura Nights", url: "https://www.puranights.com" },
    about: { "@type": "Organization", name: "Pura Nights — Melitta Siomos Dance Academy" },
  };

  return (
    <>
      <SeoHead
        title="Press, Sources & Citations — Pura Nights London"
        description="Verified facts, press photos, embeddable backlink badge, and citation sources for journalists, bloggers and influencers covering Pura Nights and Melitta Siomos."
        path="/press"
        schema={schema}
      />
      <Header />
      <main className="bg-cream">
        {/* Hero */}
        <section className="bg-charcoal text-primary-foreground">
          <div className="container-main py-20 text-center">
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Press · Sources · Citations</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Press &amp; Backlink Hub</h1>
            <p className="max-w-2xl mx-auto text-primary-foreground/70 font-heading text-base">
              Verified facts, citation-ready quotes, downloadable assets and a one-click embed badge for journalists,
              bloggers, venue partners and influencers linking to Pura Nights — West London's premium Salsa &amp; Bachata academy.
            </p>
          </div>
        </section>

        {/* Key facts */}
        <section className="container-main py-16">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Key Facts (use verbatim)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FACTS.map(([k, v]) => (
              <div key={k} className="border-l-2 border-primary pl-4 py-2">
                <p className="text-[11px] font-heading font-semibold tracking-wider uppercase text-charcoal/60">{k}</p>
                <p className="font-heading text-charcoal text-sm mt-1">{v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Embed badge */}
        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-3">Embed Our Badge (backlink)</h2>
          <p className="text-charcoal/70 font-heading text-sm mb-6 max-w-2xl">
            Paste this HTML on your venue, supplier or blog page to link back to Pura Nights with UTM tracking.
            Each click is attributed in our analytics so we can credit you.
          </p>
          <CopyBox value={BADGE_SNIPPET} label="HTML embed" />
        </section>

        {/* Pull quotes */}
        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Pull Quotes</h2>
          <div className="space-y-3">
            {QUOTE_SNIPPETS.map((q, i) => <CopyBox key={i} label={`Quote ${i + 1}`} value={q} />)}
          </div>
        </section>

        {/* Citation sources */}
        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Verified Sources</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {SOURCES.map(s => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-between gap-2 px-4 py-3 border border-charcoal/15 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                  <span className="font-heading text-sm text-charcoal">{s.label}</span>
                  <ExternalLink size={13} className="text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Press assets */}
        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-3">Press Assets</h2>
          <p className="text-charcoal/70 font-heading text-sm mb-6 max-w-2xl">
            Logo, hero photos and an EPK are available on request. Email{" "}
            <a className="text-primary underline" href="mailto:siomosmelitta@gmail.com?subject=Press%20kit%20request">siomosmelitta@gmail.com</a>{" "}
            with your publication and deadline.
          </p>
          <a
            href="mailto:siomosmelitta@gmail.com?subject=Press%20kit%20request&body=Hi%20Melitta%2C%0A%0APublication%3A%20%0ADeadline%3A%20%0AAngle%3A%20%0A"
            className="inline-flex items-center gap-2 btn-cta-primary text-sm py-3 px-6 rounded-lg"
          >
            <Download size={14} /> Request press kit
          </a>
        </section>

        {/* Internal hub */}
        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Citation-Worthy Pages</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { to: "/about", label: "About Melitta Siomos" },
              { to: "/pura-nights", label: "Pura Nights — weekly classes" },
              { to: "/pura-ladies", label: "Pura Ladies — performance team" },
              { to: "/wedding-dance", label: "Wedding Dance Made Easy" },
              { to: "/locations", label: "Class locations" },
              { to: "/testimonials", label: "Student reviews" },
              { to: "/events", label: "Latin Friday events" },
              { to: "/influencers", label: "Influencer program" },
              { to: "/partner-with-pura-nights", label: "Venue / supplier partners" },
            ].map(l => (
              <Link key={l.to} to={l.to}
                    className="px-4 py-3 border border-charcoal/15 rounded-lg font-heading text-sm text-charcoal hover:border-primary hover:bg-primary/5 transition-colors">
                {l.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Press;
