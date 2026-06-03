import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Search, Link2, Check } from "lucide-react";

/* <!-- WIX SECTION: Glossary -->
   Each term has stable anchor IDs (#slug), copy-link buttons, hash-URL
   support and DefinedTerm schema. Wix CMS roadmap: bind to a "Glossary
   Terms" collection (slug, term, category, definition, also_known_as,
   related_class_url) and switch on per-term routes /glossary/salsa-bachata/:slug. */

type Cat = "Salsa" | "Bachata" | "Music" | "Technique" | "Social" | "Wedding" | "Ladies styling" | "Performance" | "Class structure";

type Term = {
  term: string;
  category: Cat;
  def: string;
  related?: { label: string; to: string };
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[()'’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const TERMS: Term[] = [
  { term: "On1 (LA Style)", category: "Salsa", def: "The most-taught Salsa timing in London — leader breaks forward on beat 1. Crossbody-based, theatrical, beginner-friendly. Our weekly classes are On1.", related: { label: "Salsa classes London", to: "/salsa-classes-london" } },
  { term: "On2 (NY Style / Mambo)", category: "Salsa", def: "Leader breaks back on beat 2. Smoother, more musical for advanced dancers; less common in West London beginner classes." },
  { term: "Cuban Salsa (Casino)", category: "Salsa", def: "Circular Salsa from Cuba, often danced in Rueda. Different footwork and partner geometry than On1." },
  { term: "Rueda de Casino", category: "Salsa", def: "Group Cuban Salsa danced in a circle with a caller shouting turn names." },
  { term: "Crossbody Lead (CBL)", category: "Technique", def: "The fundamental On1 move — leader steps back, opens the line, follower walks across to the opposite spot." },
  { term: "Right Turn / Inside Turn", category: "Technique", def: "Follower turn led with a raised right hand, rotating clockwise. The first turn taught in almost every beginner Salsa course." },
  { term: "Bachata Sensual", category: "Bachata", def: "Modern Bachata style developed in Spain — body waves, body rolls, close embrace. The most-taught Bachata in London.", related: { label: "Bachata classes London", to: "/bachata-classes-london" } },
  { term: "Bachata Dominicana (Traditional)", category: "Bachata", def: "Original Bachata from the Dominican Republic — footwork-driven, playful taps, looser hold." },
  { term: "Bachata Moderna", category: "Bachata", def: "Bridge style between Traditional and Sensual — adds Salsa-style turn patterns to a Bachata base." },
  { term: "Cuban Motion", category: "Technique", def: "Hip movement created by alternating bent and straight knees on each step. The 'Latin' look — essential for both Salsa and Bachata." },
  { term: "Body Wave", category: "Bachata", def: "Vertical undulation of the spine, knees → hips → ribcage → head. Signature move of Bachata Sensual." },
  { term: "Lead and Follow", category: "Technique", def: "The non-verbal partner communication system. Either role can be danced by anyone." },
  { term: "Frame", category: "Technique", def: "The tension and connection through your arms and core that lets your partner feel what you're about to do." },
  { term: "Connection", category: "Technique", def: "The subtle physical conversation between leader and follower — a mix of frame, weight and timing." },
  { term: "Open Hold", category: "Technique", def: "Partner hold with arms extended, leader's right palm meeting follower's left hand. Used for turns and patterns." },
  { term: "Closed Hold", category: "Technique", def: "Partner hold with both leaders' hands in contact, body proximity closer. Used in Bachata Sensual and slower Salsa." },
  { term: "Tanda", category: "Social", def: "A set of 3–4 songs danced with the same partner at a social. After the tanda you thank them and find a new partner." },
  { term: "Cortina", category: "Social", def: "A short non-danceable music break between tandas where partners change." },
  { term: "Social Dancing", category: "Social", def: "Freestyle partner dancing at a club, bar or social night — no choreography.", related: { label: "Latin Friday socials", to: "/events" } },
  { term: "Partner Rotation", category: "Class structure", def: "Class format where students change partners every few minutes — the reason you don't need to bring a partner." },
  { term: "No Partner Needed", category: "Class structure", def: "Marketing shorthand for 'partner rotation included'. All Pura Nights weekly classes." },
  { term: "Pre-Party Lesson", category: "Social", def: "A 30–45 min beginner lesson before a social night so newcomers have one move to start with." },
  { term: "Bachata UK Champion", category: "Bachata", def: "Title awarded at the UK Bachata Open. Pura Nights founder Melitta Siomos holds this title." },
  { term: "Pura Ladies", category: "Performance", def: "Pura Nights' international women's Bachata performance team.", related: { label: "Pura Ladies", to: "/pura-ladies" } },
  { term: "Bachata Festival / Congress", category: "Social", def: "Multi-day event with workshops by day, socials by night." },
  { term: "Shines (Footwork)", category: "Technique", def: "Solo footwork patterns done without a partner — useful for warming up, musicality and breakaways during a song." },
  { term: "Body Movement", category: "Technique", def: "Isolations of chest, ribcage, shoulders and hips that turn flat steps into musical dancing." },
  { term: "Isolation", category: "Technique", def: "Moving one body part independently of the others — a foundation of Bachata Sensual styling." },
  { term: "Musicality", category: "Music", def: "Matching your movement to specific instruments — hitting the snare, riding the melody, pausing on a break." },
  { term: "Timing", category: "Music", def: "Stepping in sync with the music's underlying beat (1-2-3, 5-6-7 for Salsa; 1-2-3-tap for Bachata)." },
  { term: "The Break", category: "Music", def: "A moment in a song where the music drops or pauses. Skilled dancers freeze, dip or accent on the break." },
  { term: "Clave", category: "Music", def: "The two-bar rhythmic pattern (3-2 or 2-3) underlying most Salsa music." },
  { term: "Tumbao", category: "Music", def: "The Conga drum pattern in Salsa." },
  { term: "Turn Pattern", category: "Technique", def: "A sequence of partner moves that flows into and out of a basic step." },
  { term: "Dip", category: "Bachata", def: "Leader supports follower as she leans back. A staple of Bachata Sensual — taught only after consent and frame fundamentals." },
  { term: "Cambré", category: "Bachata", def: "Backwards arch of the upper body, often danced into a dip." },
  { term: "Beginner Class", category: "Class structure", def: "An entry-level class taught from absolute zero — no prior steps assumed.", related: { label: "Beginners", to: "/beginners" } },
  { term: "Improver Class", category: "Class structure", def: "A class for students who know the basics and one or two turns, building cleaner technique and longer combinations." },
  { term: "Intermediate Class", category: "Class structure", def: "Faster pace, multi-step turn patterns, styling and musicality." },
  { term: "Social Night", category: "Social", def: "A dance night focused on freestyle social dancing — often with a beginner lesson at the start." },
  { term: "Drop-In Class", category: "Class structure", def: "A single class you can attend without committing to a course. £5–£18 in London." },
  { term: "Course / Bundle", category: "Class structure", def: "A multi-week block of progressive classes — works out cheaper per class than drop-in." },
  { term: "Monthly Unlimited", category: "Class structure", def: "A pass that lets you attend every weekly Pura Nights class for one monthly fee." },
  { term: "First Dance", category: "Wedding", def: "The newlyweds' choreographed dance at the wedding reception.", related: { label: "Wedding dance", to: "/wedding-dance" } },
  { term: "Father–Daughter Dance", category: "Wedding", def: "Traditional second wedding-floor dance. Often choreographed alongside the first dance." },
  { term: "Wedding Choreographer", category: "Wedding", def: "A dance coach who builds a custom first-dance routine to your song, taught over 3–10 sessions." },
  { term: "Ladies Styling", category: "Ladies styling", def: "Women-only technique class focused on body movement, arm styling and femininity — danced without a partner.", related: { label: "Ladies styling London", to: "/ladies-styling-london" } },
  { term: "Pura Nights", category: "Social", def: "West London's Salsa & Bachata school — weekly classes in Chiswick (Mon) and Ealing (Tue), plus Monthly Latin Friday socials.", related: { label: "About Pura Nights", to: "/pura-nights" } },
];

const CATEGORIES = ["All", "Salsa", "Bachata", "Social", "Music", "Technique", "Ladies styling", "Performance", "Class structure", "Wedding"] as const;

const COMMON_Q = [
  { q: "Do I really not need a partner?", a: "Correct. Partner rotation means you dance with several people each class. About half of our students arrive solo." },
  { q: "What's the difference between Salsa and Bachata?", a: "Salsa is faster (180–220 BPM) with quick turns; Bachata is slower (120–135 BPM) with closer hold and body movement. Most London dancers learn both." },
  { q: "On1 or On2 in London?", a: "On1 is the default for almost every beginner Salsa class in London, including ours. On2 is taught at specialist schools once you have a strong base." },
];

const Glossary = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("All");
  const [copied, setCopied] = useState<string | null>(null);

  // Open the hashed term on load.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    }
  }, []);

  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    return TERMS.filter(t =>
      (cat === "All" || t.category === cat) &&
      (!needle || t.term.toLowerCase().includes(needle) || t.def.toLowerCase().includes(needle))
    );
  }, [q, cat]);

  const azIndex = useMemo(() => {
    const map: Record<string, Term[]> = {};
    [...TERMS].sort((a, b) => a.term.localeCompare(b.term)).forEach(t => {
      const letter = t.term[0].toUpperCase();
      (map[letter] = map[letter] || []).push(t);
    });
    return map;
  }, []);

  const copyLink = async (slug: string) => {
    const url = `${window.location.origin}/glossary/salsa-bachata#${slug}`;
    try { await navigator.clipboard.writeText(url); setCopied(slug); setTimeout(() => setCopied(null), 1500); } catch { /* */ }
  };

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Salsa & Bachata Glossary — London Edition",
    description: "Definitive glossary of Salsa and Bachata terms used in London social dancing, weekly classes and weddings.",
    hasDefinedTerm: TERMS.map(t => ({
      "@type": "DefinedTerm",
      "@id": `https://www.puranights.com/glossary/salsa-bachata#${slugify(t.term)}`,
      name: t.term,
      description: t.def,
      inDefinedTermSet: "https://www.puranights.com/glossary/salsa-bachata",
      termCode: t.category,
    })),
  };

  return (
    <Layout>
      <SeoHead
        title="Salsa & Bachata Glossary — 45+ Terms Every London Dancer Should Know | Pura Nights"
        description="Definitive Salsa & Bachata glossary for London learners. On1, Cuban motion, Bachata Sensual, Tanda, Crossbody Lead, partner rotation and more — curated by Bachata UK Champion Melitta Siomos."
        path="/glossary/salsa-bachata"
        schema={definedTermSchema}
      />

      <section className="bg-charcoal text-primary-foreground py-16">
        <div className="container-main max-w-3xl text-center">
          <p className="font-accent text-[11px] tracking-[0.35em] uppercase text-primary mb-4">Reference Glossary</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Salsa &amp; Bachata Glossary for London Dancers</h1>
          <p className="font-heading text-primary-foreground/70 text-base max-w-2xl mx-auto">
            Every Salsa and Bachata term you'll hear in a London beginner class, on the social floor, or while
            booking a wedding choreographer — defined plainly. Curated by Bachata UK Champion Melitta Siomos.
          </p>
        </div>
      </section>

      <section className="container-main max-w-4xl py-12">
        <div className="flex flex-col md:flex-row gap-3 mb-6 sticky top-16 z-10 bg-background/95 backdrop-blur py-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search 45+ terms…"
              aria-label="Search glossary"
              className="w-full rounded-lg border border-primary/20 bg-card pl-10 pr-3 py-2.5 text-sm font-heading focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap mb-6">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-heading font-semibold transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* A–Z jumplist */}
        <nav aria-label="A to Z index" className="flex flex-wrap gap-1.5 mb-8 pb-4 border-b border-primary/15">
          <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-heading mr-2 self-center">A–Z</span>
          {Object.keys(azIndex).sort().map(letter => (
            <a key={letter} href={`#letter-${letter}`} className="rounded-md px-2 py-1 text-[11px] font-heading font-semibold text-charcoal/70 hover:bg-primary/10 hover:text-primary">{letter}</a>
          ))}
        </nav>

        <p className="text-charcoal/50 text-xs font-heading mb-4">{filtered.length} of {TERMS.length} terms</p>

        <dl className="divide-y divide-primary/10">
          {filtered.map(t => {
            const slug = slugify(t.term);
            return (
              <div key={t.term} id={slug} className="py-5 scroll-mt-32 group">
                <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                  <dt className="font-display text-xl font-bold text-charcoal">{t.term}</dt>
                  <span className="font-accent text-[10px] tracking-[0.2em] uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">{t.category}</span>
                  <button
                    onClick={() => copyLink(slug)}
                    aria-label={`Copy link to ${t.term}`}
                    className="inline-flex items-center gap-1 text-[10px] font-heading font-semibold text-charcoal/50 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copied === slug ? <><Check size={12} /> Copied</> : <><Link2 size={12} /> Copy link</>}
                  </button>
                </div>
                <dd className="text-charcoal/80 text-sm font-heading leading-relaxed">{t.def}</dd>
                {t.related && (
                  <p className="mt-2">
                    <Link to={t.related.to} className="text-primary text-xs font-heading font-semibold hover:underline">
                      Related: {t.related.label} →
                    </Link>
                  </p>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-12 text-center text-charcoal/50 font-heading text-sm">No terms match your search. Try a different word.</p>
          )}
        </dl>

        {/* A–Z indexed sections (anchors) */}
        <div className="mt-12 border-t border-primary/15 pt-10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-4">Full A–Z index</h2>
          {Object.keys(azIndex).sort().map(letter => (
            <div key={letter} id={`letter-${letter}`} className="mb-8 scroll-mt-32">
              <h3 className="font-display text-3xl font-bold text-primary mb-3">{letter}</h3>
              <ul className="grid sm:grid-cols-2 gap-1.5">
                {azIndex[letter].map(t => (
                  <li key={t.term}>
                    <a href={`#${slugify(t.term)}`} className="text-sm font-heading text-charcoal/80 hover:text-primary hover:underline">{t.term}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Common beginner questions */}
        <div className="mt-12 border-t border-primary/15 pt-10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-4">Common beginner questions</h2>
          <div className="space-y-4">
            {COMMON_Q.map(c => (
              <div key={c.q} className="border-l-2 border-primary pl-4">
                <p className="font-display text-base font-bold text-charcoal mb-1">{c.q}</p>
                <p className="text-charcoal/75 text-sm font-heading leading-relaxed">{c.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border border-primary/20 rounded-2xl p-6 bg-primary/5 text-center">
          <p className="font-display text-lg font-bold text-charcoal mb-2">Want to actually use these words on a dance floor?</p>
          <p className="text-charcoal/70 text-sm font-heading mb-4">Drop into a beginner Salsa or Bachata class this week in Chiswick or Ealing — no partner required.</p>
          <Link to="/start-here" className="inline-flex rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-heading font-semibold hover:opacity-90">
            Book your first class →
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Glossary;
