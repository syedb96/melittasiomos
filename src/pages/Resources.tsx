import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Download, FileText, ListChecks, Music, Heart, BookOpen, Printer } from "lucide-react";

/* <!-- WIX SECTION: Resources Hub --> */
/*
 * Free resource library. Each card links to either a printable on-site guide
 * (in-built HowTo schema) or an external/printable PDF (added over time).
 * Designed as link-bait + lead magnet hub. Wix mirror: standard page with
 * a card repeater bound to a "Resources" collection.
 */

const RESOURCES = [
  {
    icon: ListChecks,
    title: "First Class Checklist (London)",
    desc: "Exactly what to wear, bring and expect at your first Salsa or Bachata class in West London. Printable one-pager.",
    to: "/first-class-guide",
    type: "Printable guide",
    cta: "Open guide",
  },
  {
    icon: BookOpen,
    title: "Salsa & Bachata Glossary",
    desc: "120+ terms every London social dancer should know — On1, Cuban motion, Sensual, Lead/Follow, Tanda, and more. With pronunciation.",
    to: "/glossary/salsa-bachata",
    type: "Reference",
    cta: "Open glossary",
  },
  {
    icon: FileText,
    title: "Ultimate London Salsa & Bachata Guide",
    desc: "Our 6,000-word pillar guide: history, styles, where to learn, where to dance socially, costs, and 2026 calendar.",
    to: "/learn/ultimate-london-salsa-bachata-guide",
    type: "Pillar guide",
    cta: "Read the guide",
  },
  {
    icon: Music,
    title: "Beginner Salsa & Bachata Playlist",
    desc: "30 songs we use in beginner classes — Spotify-ready titles for practising basic timing at home.",
    to: "/blog/how-to-practice-salsa-at-home",
    type: "Playlist",
    cta: "See the songs",
  },
  {
    icon: Heart,
    title: "Wedding First Dance Planner",
    desc: "8-week countdown, song-choice questions, and how many lessons you actually need. Built from 100+ real London weddings.",
    to: "/blog/wedding-first-dance-tips",
    type: "Planning guide",
    cta: "Start planning",
  },
  {
    icon: FileText,
    title: "Social Dance Floor Etiquette",
    desc: "The 12 unwritten rules of London Latin socials — how to ask for a dance, when to say no, hygiene, and consent.",
    to: "/blog/salsa-bachata-etiquette-guide",
    type: "Etiquette",
    cta: "Read etiquette",
  },
  {
    icon: ListChecks,
    title: "How to Choose a London Dance School",
    desc: "13 questions to ask before paying for a course — teacher credentials, class size, beginner pathway, refund policy.",
    to: "/blog/best-areas-west-london",
    type: "Buyer's guide",
    cta: "Read checklist",
  },
  {
    icon: Heart,
    title: "Latin Friday Socials — What to Expect",
    desc: "Dress code, who attends, music, beginner-friendliness — everything before your first social in Ealing.",
    to: "/blog/pura-nights-latin-friday-guide",
    type: "Event guide",
    cta: "Read guide",
  },
];

const Resources = () => {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pura Nights — Free Salsa & Bachata Resources for London Dancers",
    description: "Free printable guides, glossaries, playlists and planners for Salsa and Bachata learners in London.",
    numberOfItems: RESOURCES.length,
    itemListElement: RESOURCES.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.title,
      url: `https://www.puranights.com${r.to}`,
    })),
  };

  return (
    <Layout>
      <SeoHead
        title="Free Salsa & Bachata Resources — London Learners | Pura Nights"
        description="Free printable guides, glossaries, playlists, etiquette tips and wedding dance planners for Salsa and Bachata learners in London. Curated by Pura Nights — Melitta Siomos Dance Academy."
        path="/resources"
        schema={itemListSchema}
      />

      <section className="bg-charcoal text-primary-foreground py-20">
        <div className="container-main max-w-4xl text-center">
          <p className="font-accent text-[11px] tracking-[0.35em] uppercase text-primary mb-4">Free Resource Library</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">Salsa &amp; Bachata Resources for London</h1>
          <p className="font-heading text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
            Printable guides, glossaries, playlists and planners — built from 9 years of teaching beginners in
            Chiswick and Ealing. Free forever, no email required. Bookmark, share, or print.
          </p>
          <p className="text-primary-foreground/40 text-xs font-heading mt-3">
            Linkable, citable, journalist-friendly. Each guide carries our verified source data.
          </p>
        </div>
      </section>

      <section className="container-main max-w-6xl py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map(r => {
            const Icon = r.icon;
            return (
              <Link
                key={r.title}
                to={r.to}
                className="group block border border-primary/15 rounded-2xl bg-card hover:border-primary/40 hover:shadow-lg transition-all p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary"><Icon size={20} /></div>
                  <div>
                    <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-charcoal/50">{r.type}</p>
                    <h2 className="font-display text-lg font-bold text-charcoal leading-tight mt-0.5">{r.title}</h2>
                  </div>
                </div>
                <p className="text-charcoal/70 text-sm font-heading mb-4">{r.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-xs font-heading font-semibold group-hover:underline">
                  {r.cta} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-charcoal/[0.03] border-y border-primary/10 py-14">
        <div className="container-main max-w-4xl text-center">
          <Printer className="mx-auto mb-3 text-primary" size={28} />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">Use these resources on your blog, school noticeboard or wedding planning pack</h2>
          <p className="text-charcoal/70 text-sm font-heading max-w-2xl mx-auto mb-5">
            Wedding planners, hen-party organisers, bloggers and London community groups are free to link, embed
            or print these guides — just credit Pura Nights with a link back to{" "}
            <a href="https://www.puranights.com" className="text-primary font-semibold hover:underline">puranights.com</a>.
            Need a custom factsheet for a piece? Email{" "}
            <a href="mailto:siomosmelitta@gmail.com" className="text-primary font-semibold hover:underline">siomosmelitta@gmail.com</a>.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link to="/press" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-heading font-semibold hover:opacity-90">
              <Download size={14} /> Press kit & sources
            </Link>
            <Link to="/partners/embed-widget" className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-5 py-2.5 text-sm font-heading font-semibold hover:bg-primary/5">
              Embed the class finder →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
