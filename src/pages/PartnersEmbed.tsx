import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Copy, Check, ExternalLink } from "lucide-react";

/* <!-- WIX SECTION: Partners — Embeddable Widgets --> */
/*
 * Backlink driver. Offers copy-paste HTML snippets partners (wedding venues,
 * London bloggers, community groups) can embed on their site. Every snippet
 * carries a rel="noopener" link back to puranights.com with a partner UTM,
 * giving us real referring domains.
 *
 * Wix mirror: same copy + CopyBox buttons. The "iframe" snippet references
 * /embed/class-finder which is a tiny standalone page (also added in this
 * sprint) — Wix can host the equivalent as a public lightweight page.
 */

const SNIPPETS: { title: string; desc: string; html: string }[] = [
  {
    title: "Class Finder badge (link-back card)",
    desc: "A small card that says ‘Find a Salsa or Bachata class in West London’ with a link back to Pura Nights. Best for wedding venues, hen-party sites and community blogs.",
    html: `<a href="https://www.puranights.com/?utm_source=partner&utm_medium=embed&utm_campaign=class-finder-badge" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:12px;max-width:360px;padding:14px 16px;border:1px solid #CF6A3D;border-radius:14px;background:#fff;font-family:system-ui,sans-serif;text-decoration:none;color:#151515">
  <span style="font-size:22px">💃</span>
  <span>
    <strong style="display:block;font-size:14px">Find a Salsa or Bachata class</strong>
    <span style="font-size:12px;color:#555">West London · Chiswick &amp; Ealing · Pura Nights</span>
  </span>
</a>`,
  },
  {
    title: "Iframe — live class schedule",
    desc: "Embeds the Pura Nights weekly schedule as a small iframe. Auto-stays up to date. 320×320 recommended.",
    html: `<iframe src="https://www.puranights.com/embed/class-finder?utm_source=partner&utm_medium=iframe" width="320" height="320" style="border:1px solid #eee;border-radius:12px" loading="lazy" title="Pura Nights — West London Salsa & Bachata schedule"></iframe>`,
  },
  {
    title: "Text citation (for journalists & bloggers)",
    desc: "Plain-text attribution line. Drop into an article body.",
    html: `Source: Pura Nights — Melitta Siomos Dance Academy, West London (https://www.puranights.com/press)`,
  },
  {
    title: "Wedding planner pack — first dance link",
    desc: "For wedding planners and venues: a hyperlinked sentence that connects couples directly to our wedding-dance service.",
    html: `<p>Looking for a London <a href="https://www.puranights.com/wedding-dance?utm_source=partner&utm_medium=embed&utm_campaign=wedding-planner" rel="noopener">wedding first-dance choreographer</a>? Pura Nights — led by Bachata UK Champion Melitta Siomos — coaches first dances across West London.</p>`,
  },
];

function CopyBox({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="border border-primary/20 rounded-xl bg-charcoal/[0.02] mb-6">
      <div className="flex items-center justify-between px-4 py-2 border-b border-primary/15">
        <span className="text-[11px] font-heading font-semibold tracking-wider uppercase text-charcoal/70">{label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
          className="inline-flex items-center gap-1.5 text-[11px] font-heading font-semibold text-primary hover:underline"
        >
          {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy snippet</>}
        </button>
      </div>
      <pre className="p-4 text-[11px] leading-relaxed font-mono text-charcoal/80 overflow-x-auto whitespace-pre-wrap break-words">{value}</pre>
    </div>
  );
}

const PartnersEmbed = () => (
  <Layout>
    <SeoHead
      title="Embed Our Class Finder — Free Widgets for Partners | Pura Nights"
      description="Wedding venues, London bloggers and community groups: copy-paste HTML snippets to embed the Pura Nights class finder, schedule and citations. Every snippet is tracked via UTM."
      path="/partners/embed-widget"
    />

    <section className="bg-charcoal text-primary-foreground py-16">
      <div className="container-main max-w-3xl text-center">
        <p className="font-accent text-[11px] tracking-[0.35em] uppercase text-primary mb-4">For Partners</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">Embed Our Class Finder</h1>
        <p className="font-heading text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
          Free, copy-paste widgets and link-back snippets for wedding venues, London lifestyle bloggers,
          hen-party planners, community noticeboards and journalists. Every snippet sends a tracked link back —
          we'll know who's sending traffic.
        </p>
      </div>
    </section>

    <section className="container-main max-w-3xl py-12">
      {SNIPPETS.map((s, i) => (
        <div key={s.title} className="mb-10">
          <h2 className="font-display text-xl font-bold text-charcoal mb-1">{i + 1}. {s.title}</h2>
          <p className="text-charcoal/70 text-sm font-heading mb-3">{s.desc}</p>
          <CopyBox value={s.html} label="HTML / Text snippet" />
        </div>
      ))}

      <div className="border border-primary/20 rounded-2xl p-6 bg-primary/5">
        <h3 className="font-display text-lg font-bold text-charcoal mb-2">Want something custom?</h3>
        <p className="text-charcoal/70 text-sm font-heading mb-3">
          Bespoke widget for your wedding venue or community site? Email{" "}
          <a href="mailto:siomosmelitta@gmail.com" className="text-primary font-semibold hover:underline">siomosmelitta@gmail.com</a>{" "}
          with the URL and we'll send a tailored snippet within 48 hours.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/press" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-heading font-semibold hover:opacity-90">
            Press kit &amp; sources
          </Link>
          <Link to="/influencers" className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 text-sm font-heading font-semibold hover:bg-primary/5">
            Ambassador program →
          </Link>
          <a href="/embed/class-finder" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 text-sm font-heading font-semibold hover:bg-primary/5">
            Preview iframe <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default PartnersEmbed;
