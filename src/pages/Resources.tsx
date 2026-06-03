import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import ResourceLeadForm from "@/components/ResourceLeadForm";
import { Download, FileText, ListChecks, Music, Heart, BookOpen, Printer, Users, Briefcase } from "lucide-react";

/* <!-- WIX SECTION: Resources Hub --> */

const RESOURCES = [
  { icon: ListChecks, title: "First Class Checklist (London)", desc: "Exactly what to wear, bring and expect at your first Salsa or Bachata class in West London. Printable one-pager.", to: "/first-class-guide", type: "Printable guide", cta: "Open guide", best: "Total beginners" },
  { icon: BookOpen, title: "Salsa & Bachata Glossary", desc: "35+ terms every London social dancer should know — On1, Cuban motion, Sensual, Lead/Follow, Tanda, and more.", to: "/glossary/salsa-bachata", type: "Reference", cta: "Open glossary", best: "Curious learners" },
  { icon: FileText, title: "Ultimate London Salsa & Bachata Guide", desc: "Our 6,000-word pillar guide: history, styles, where to learn, where to dance socially, costs, and 2026 calendar.", to: "/learn/ultimate-london-salsa-bachata-guide", type: "Pillar guide", cta: "Read the guide", best: "Researching learners" },
  { icon: FileText, title: "Best Salsa & Bachata Nights in London", desc: "Honest editorial guide to choosing the right Latin dance night in London — beginner picks, solo-friendly nights, and what to check before you go.", to: "/learn/best-salsa-bachata-nights-london", type: "Editorial", cta: "Read the guide", best: "First-time social dancers" },
  { icon: Music, title: "Beginner Salsa & Bachata Playlist", desc: "30 songs we use in beginner classes — Spotify-ready titles for practising basic timing at home.", to: "/blog/how-to-practice-salsa-at-home", type: "Playlist", cta: "See the songs", best: "Practising at home" },
  { icon: Heart, title: "Wedding First Dance Planner", desc: "8-week countdown, song-choice questions, and how many lessons you actually need. Built from 100+ real London weddings.", to: "/blog/wedding-first-dance-tips", type: "Planning guide", cta: "Start planning", best: "Couples 2–6 months out" },
  { icon: FileText, title: "Social Dance Floor Etiquette", desc: "The 12 unwritten rules of London Latin socials — how to ask for a dance, when to say no, hygiene, consent.", to: "/blog/salsa-bachata-etiquette-guide", type: "Etiquette", cta: "Read etiquette", best: "First-time social dancers" },
  { icon: ListChecks, title: "How to Choose a London Dance School", desc: "13 questions to ask before paying for a course — teacher credentials, class size, beginner pathway, refund policy.", to: "/blog/best-areas-west-london", type: "Buyer's guide", cta: "Read checklist", best: "Comparing schools" },
  { icon: Heart, title: "Latin Friday Socials — What to Expect", desc: "Dress code, who attends, music, beginner-friendliness — everything before your first social in Ealing.", to: "/blog/pura-nights-latin-friday-guide", type: "Event guide", cta: "Read guide", best: "First social" },
  { icon: Briefcase, title: "Corporate Dance Session Planner", desc: "1-page brief for HR / culture teams: timing, group size, energy levels and outcomes for team-building Latin sessions.", to: "/corporate-dance-classes-london", type: "Corporate", cta: "See corporate options", best: "HR / culture leads" },
  { icon: Users, title: "Pura Ladies Audition Prep", desc: "What to wear, what we look for, and what the audition runs like for our international Bachata performance team.", to: "/pura-ladies", type: "Audition prep", cta: "Read audition prep", best: "Performers" },
  { icon: BookOpen, title: "Salsa vs Bachata — Which One First?", desc: "Side-by-side comparison: music, partner hold, learning curve, social scene. Helps beginners choose their first class.", to: "/learn/salsa-vs-bachata", type: "Comparison", cta: "Compare styles", best: "Total beginners" },
];

const FAQS = [
  { q: "Do I need a partner to come to your classes?", a: "No — every Pura Nights class rotates partners. Around half of our students arrive solo. You'll dance with several people in one class." },
  { q: "What should I wear to my first class?", a: "Smart-casual clothes you can move in and shoes with a smooth sole (no chunky trainers). Full breakdown on our First Class Checklist." },
  { q: "Which class should I choose first — salsa or bachata?", a: "Bachata is generally easier to start with — slower music, simpler footwork. Salsa builds faster turn-pattern skills. Most of our students learn both; many start with Bachata Tuesdays in Ealing." },
  { q: "Are classes beginner-friendly?", a: "Yes — every weekly class starts with a beginner warm-up. Total beginners welcome any week, no booking commitment needed." },
  { q: "Can I book private lessons?", a: "Yes — 1-to-1 lessons with Melitta or her senior team. Bookable via enquiry on the Private Lessons page." },
  { q: "Can companies book a session?", a: "Yes — we run corporate team-building, wellbeing programs and end-of-year parties across London. See Corporate Dance Classes." },
  { q: "Can wedding couples learn a first dance?", a: "Yes — Wedding Dance Made Easy is our 100+ couple choreography service. Bookable via the Wedding Dance page." },
];

const Resources = () => {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Pura Nights — Free Salsa & Bachata Resources for London Dancers",
        numberOfItems: RESOURCES.length,
        itemListElement: RESOURCES.map((r, i) => ({
          "@type": "ListItem", position: i + 1, name: r.title,
          url: `https://www.puranights.com${r.to}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map(f => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
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
        </div>
      </section>

      <section className="container-main max-w-3xl py-14">
        <ResourceLeadForm />
      </section>

      <section className="container-main max-w-6xl pb-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 text-center">All free resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map(r => {
            const Icon = r.icon;
            return (
              <Link key={r.title} to={r.to} className="group block border border-primary/15 rounded-2xl bg-card hover:border-primary/40 hover:shadow-lg transition-all p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary"><Icon size={20} /></div>
                  <div>
                    <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-charcoal/50">{r.type}</p>
                    <h3 className="font-display text-lg font-bold text-charcoal leading-tight mt-0.5">{r.title}</h3>
                  </div>
                </div>
                <p className="text-charcoal/70 text-sm font-heading mb-2">{r.desc}</p>
                <p className="text-charcoal/50 text-[11px] font-heading mb-3"><strong>Best for:</strong> {r.best}</p>
                <span className="inline-flex items-center gap-1 text-primary text-xs font-heading font-semibold group-hover:underline">
                  {r.cta} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-charcoal/[0.03] border-y border-primary/10 py-14">
        <div className="container-main max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 text-center">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(f => (
              <details key={f.q} className="group border border-primary/15 rounded-xl bg-card p-4">
                <summary className="cursor-pointer font-display text-base font-bold text-charcoal flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-charcoal/75 text-sm font-heading leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main max-w-4xl py-14 text-center">
        <Printer className="mx-auto mb-3 text-primary" size={28} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">Use these resources on your blog, school noticeboard or wedding planning pack</h2>
        <p className="text-charcoal/70 text-sm font-heading max-w-2xl mx-auto mb-5">
          Wedding planners, hen-party organisers, bloggers and London community groups are free to link, embed
          or print these guides — just credit Pura Nights with a link back to{" "}
          <a href="https://www.puranights.com" className="text-primary font-semibold hover:underline">puranights.com</a>.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link to="/press" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-heading font-semibold hover:opacity-90">
            <Download size={14} /> Press kit &amp; sources
          </Link>
          <Link to="/partners/embed-widget" className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-5 py-2.5 text-sm font-heading font-semibold hover:bg-primary/5">
            Embed the class finder →
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
