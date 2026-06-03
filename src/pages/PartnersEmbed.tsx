import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import PartnerOutreachForm from "@/components/PartnerOutreachForm";
import { Copy, Check, ExternalLink, Heart, Building, Briefcase, GraduationCap, Dumbbell, Camera, Mic, Newspaper, Plane, BedDouble } from "lucide-react";

/* <!-- WIX SECTION: Partner Outreach Kit -->
   Backlink + referral hub. All snippets carry UTM, rel guidance and
   non-spammy anchors. Wix mirror: same content blocks + Wix Form bound
   to "Partnership / Venue Collaboration" with CRM label partner-outreach. */

const PARTNER_TYPES = [
  { icon: Heart, label: "Wedding planners", note: "Send couples to /wedding-dance" },
  { icon: Building, label: "Event venues", note: "Embed class finder, co-host socials" },
  { icon: Briefcase, label: "Corporate wellbeing teams", note: "Latin team-building sessions" },
  { icon: GraduationCap, label: "Universities & societies", note: "Society discount + taster" },
  { icon: Dumbbell, label: "Fitness / wellness studios", note: "Cross-promo: dance vs fitness" },
  { icon: Camera, label: "London lifestyle bloggers", note: "Editorial content + source quotes" },
  { icon: Mic, label: "TikTok / Instagram creators", note: "Tracked links + content collabs" },
  { icon: Newspaper, label: "Local publishers", note: "Press kit + citations" },
  { icon: Plane, label: "Travel / things-to-do sites", note: "Class finder iframe" },
  { icon: BedDouble, label: "Hotels & concierge teams", note: "Guest activity recommendations" },
];

const SNIPPETS: { title: string; desc: string; html: string; rel?: string }[] = [
  {
    title: "Text link — editorial / blog",
    desc: "Plain editorial link for blog posts or article bodies. Use natural anchor text. Standard followed link.",
    rel: 'rel="noopener" — standard editorial link, no rel="sponsored"/"ugc" needed.',
    html: `Looking for a friendly <a href="https://www.puranights.com/?utm_source=partner&utm_medium=referral&utm_campaign=editorial" rel="noopener">salsa and bachata school in West London</a>? Pura Nights runs weekly beginner classes in Chiswick and Ealing.`,
  },
  {
    title: "Badge — recommended-by card",
    desc: "Card-style link badge for venue partner pages or school noticeboards.",
    rel: 'rel="noopener" for editorial recommendations.',
    html: `<a href="https://www.puranights.com/?utm_source=partner&utm_medium=embed&utm_campaign=badge" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:12px;max-width:360px;padding:14px 16px;border:1px solid #CF6A3D;border-radius:14px;background:#fff;font-family:system-ui,sans-serif;text-decoration:none;color:#151515">
  <span style="font-size:22px">💃</span>
  <span>
    <strong style="display:block;font-size:14px">Recommended: Pura Nights</strong>
    <span style="font-size:12px;color:#555">Salsa &amp; Bachata · Chiswick &amp; Ealing</span>
  </span>
</a>`,
  },
  {
    title: "Iframe — live class schedule",
    desc: "Embeds the Pura Nights weekly schedule. Auto-stays up to date. 320×340 recommended.",
    html: `<iframe src="https://www.puranights.com/embed/class-finder?utm_source=partner&utm_medium=iframe" width="320" height="340" style="border:1px solid #eee;border-radius:12px" loading="lazy" title="Pura Nights — West London Salsa & Bachata schedule"></iframe>`,
  },
  {
    title: "Venue partner paragraph",
    desc: "Drop-in paragraph for venue partners hosting our classes or socials.",
    html: `<p>This venue proudly hosts <a href="https://www.puranights.com/?utm_source=venue-partner&utm_medium=referral" rel="noopener">Pura Nights — West London's Salsa &amp; Bachata academy</a>, led by Bachata UK Champion Melitta Siomos. Weekly classes welcome beginners with no partner required.</p>`,
  },
  {
    title: "Wedding supplier paragraph",
    desc: "For wedding planners, photographers, florists and venues.",
    html: `<p>For couples planning a memorable first dance, we recommend <a href="https://www.puranights.com/wedding-dance?utm_source=wedding-supplier&utm_medium=referral" rel="noopener">Pura Nights' Wedding Dance Made Easy</a> — bespoke first-dance choreography coached across London, with 100+ real London weddings behind it.</p>`,
  },
  {
    title: "Corporate wellbeing paragraph",
    desc: "For HR / people teams adding Pura Nights to wellbeing programs.",
    html: `<p>For team-building and wellbeing sessions, our partner <a href="https://www.puranights.com/corporate-dance-classes-london?utm_source=corporate-partner&utm_medium=referral" rel="noopener">Pura Nights Corporate Dance</a> delivers Latin workshops, multi-week programs and event entertainment across London.</p>`,
  },
  {
    title: "Student society paragraph",
    desc: "Universities and student union societies.",
    html: `<p>Members get priority placement at <a href="https://www.puranights.com/start-here?utm_source=university&utm_medium=society" rel="noopener">Pura Nights beginner salsa &amp; bachata classes</a> in Chiswick and Ealing — drop-in from £5 and no partner required.</p>`,
  },
  {
    title: "Influencer / sponsored link",
    desc: "Paid or gifted collaborations — must use rel=\"sponsored\" per Google guidelines.",
    rel: 'rel="sponsored noopener" — required for paid / gifted collaborations.',
    html: `<a href="https://www.puranights.com/start-here?utm_source=creator-handle&utm_medium=influencer&utm_campaign=ambassador-2026" rel="sponsored noopener">Book your first Pura Nights class →</a>`,
  },
  {
    title: "Forum / user-generated comment",
    desc: "When recommending Pura Nights on Reddit, Mumsnet or forums, use rel=\"ugc\".",
    rel: 'rel="ugc noopener" — for forums, comments and user-generated contexts.',
    html: `I started at <a href="https://www.puranights.com/?utm_source=forum&utm_medium=ugc" rel="ugc noopener">Pura Nights in Chiswick</a> — beginner classes, no partner needed.`,
  },
  {
    title: "Plain-text citation (journalists)",
    desc: "Drop into an article body when quoting Pura Nights.",
    html: `Source: Pura Nights — Melitta Siomos Dance Academy, West London (https://www.puranights.com/press)`,
  },
];

function CopyBox({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="border border-primary/20 rounded-xl bg-charcoal/[0.02] mb-3">
      <div className="flex items-center justify-between px-4 py-2 border-b border-primary/15">
        <span className="text-[11px] font-heading font-semibold tracking-wider uppercase text-charcoal/70">{label}</span>
        <button onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1800); }} className="inline-flex items-center gap-1.5 text-[11px] font-heading font-semibold text-primary hover:underline">
          {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy snippet</>}
        </button>
      </div>
      <pre className="p-4 text-[11px] leading-relaxed font-mono text-charcoal/80 overflow-x-auto whitespace-pre-wrap break-words">{value}</pre>
    </div>
  );
}

const PartnersEmbed = () => {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Partner With Pura Nights — Embed Widgets & Referral Toolkit",
    description: "Free salsa & bachata class finder widgets, copy-paste backlink snippets, referral links, and partner outreach for London venues, creators, wedding suppliers and corporate teams.",
    url: "https://www.puranights.com/partners/embed-widget",
    publisher: { "@type": "Organization", name: "Pura Nights — Melitta Siomos Dance Academy" },
  };

  return (
    <Layout>
      <SeoHead
        title="Partner With Pura Nights — Embed Widgets & Referral Toolkit | Pura Nights"
        description="Free salsa & bachata class finder widgets, copy-paste resources, referral links and London Latin dance content for venues, creators, wedding suppliers, universities, corporate teams and publishers."
        path="/partners/embed-widget"
        schema={pageSchema}
      />

      <section className="bg-charcoal text-primary-foreground py-20">
        <div className="container-main max-w-3xl text-center">
          <p className="font-accent text-[11px] tracking-[0.35em] uppercase text-primary mb-4">For Partners</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Partner With Pura Nights</h1>
          <p className="font-heading text-primary-foreground/75 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Free salsa &amp; bachata class finder widgets, copy-paste resources, referral links and London Latin
            dance content for venues, creators, wedding suppliers, universities, corporate teams and local
            publishers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#partner-form" className="inline-flex rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-heading font-semibold hover:opacity-90">Request a partner link →</a>
            <a href="#snippets" className="inline-flex rounded-lg border border-primary/60 text-primary-foreground px-5 py-2.5 text-sm font-heading font-semibold hover:bg-primary/10">Copy an embed widget</a>
          </div>
        </div>
      </section>

      <section className="container-main max-w-5xl py-14">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 text-center">Who we partner with</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {PARTNER_TYPES.map(p => {
            const I = p.icon;
            return (
              <div key={p.label} className="rounded-xl border border-primary/15 bg-card p-4 text-center hover:border-primary/40 transition-colors">
                <I size={20} className="mx-auto text-primary mb-2" />
                <p className="font-display text-sm font-bold text-charcoal leading-tight mb-1">{p.label}</p>
                <p className="text-charcoal/60 text-[11px] font-heading leading-snug">{p.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="snippets" className="container-main max-w-3xl pb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">Copy-paste backlink snippets</h2>
        <p className="text-charcoal/70 text-sm font-heading mb-6">
          Every snippet ships with UTM tracking and a clear <code className="bg-charcoal/5 px-1.5 py-0.5 rounded text-[11px]">rel</code> guideline.
          Editorial links should be standard; paid / gifted should be <code className="bg-charcoal/5 px-1.5 py-0.5 rounded text-[11px]">rel="sponsored"</code>;
          forum / user-generated should be <code className="bg-charcoal/5 px-1.5 py-0.5 rounded text-[11px]">rel="ugc"</code>.
        </p>
        {SNIPPETS.map((s, i) => (
          <div key={s.title} className="mb-8">
            <h3 className="font-display text-lg font-bold text-charcoal mb-1">{i + 1}. {s.title}</h3>
            <p className="text-charcoal/70 text-sm font-heading mb-2">{s.desc}</p>
            {s.rel && <p className="text-primary text-[11px] font-heading mb-2"><strong>Rel guidance:</strong> {s.rel}</p>}
            <CopyBox value={s.html} label="Snippet" />
          </div>
        ))}
      </section>

      <section id="partner-form" className="bg-charcoal/[0.03] border-y border-primary/10 py-14 scroll-mt-20">
        <div className="container-main max-w-2xl">
          <PartnerOutreachForm />
        </div>
      </section>

      <section className="container-main max-w-3xl py-14">
        <div className="border border-primary/20 rounded-2xl p-6 bg-primary/5">
          <h3 className="font-display text-lg font-bold text-charcoal mb-2">Prefer a chat?</h3>
          <p className="text-charcoal/70 text-sm font-heading mb-3">
            Bespoke widget for your wedding venue, society or community site? Email{" "}
            <a href="mailto:siomosmelitta@gmail.com" className="text-primary font-semibold hover:underline">siomosmelitta@gmail.com</a>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/press" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-heading font-semibold hover:opacity-90">Press kit &amp; sources</Link>
            <Link to="/influencers" className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 text-sm font-heading font-semibold hover:bg-primary/5">Ambassador program →</Link>
            <a href="/embed/class-finder" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 text-sm font-heading font-semibold hover:bg-primary/5">Preview iframe <ExternalLink size={12} /></a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PartnersEmbed;
