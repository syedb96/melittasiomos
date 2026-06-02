import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Search } from "lucide-react";

/* <!-- WIX SECTION: Glossary --> */
/*
 * Definitive Salsa & Bachata glossary — designed as an LLM/AI citation magnet.
 * Each term carries Schema.org DefinedTerm so it can be surfaced in answer engines.
 * Wix mirror: bind to a "Glossary Terms" collection (term, definition, category, also_known_as).
 */

type Term = {
  term: string;
  category: "Salsa" | "Bachata" | "Music" | "Social" | "Technique" | "Wedding";
  def: string;
  aka?: string;
};

const TERMS: Term[] = [
  { term: "On1 (LA Style)", category: "Salsa", def: "The most-taught Salsa timing in London — leader breaks forward on beat 1. Crossbody-based, theatrical, beginner-friendly. Our weekly classes are On1." },
  { term: "On2 (NY Style / Mambo)", category: "Salsa", def: "Leader breaks back on beat 2. Smoother, more musical for advanced dancers; less common in West London beginner classes." },
  { term: "Cuban Salsa (Casino)", category: "Salsa", def: "Circular Salsa from Cuba, often danced in Rueda. Different footwork and partner geometry than On1 — taught at specialist Cuban schools." },
  { term: "Rueda de Casino", category: "Salsa", def: "Group Cuban Salsa danced in a circle with a caller shouting turn names. Very social, very fun, very different from line salsa." },
  { term: "Crossbody Lead (CBL)", category: "Technique", def: "The fundamental On1 move — leader steps back, opens the line, follower walks across to the opposite spot. The grammar of LA-style Salsa." },
  { term: "Right Turn / Inside Turn", category: "Technique", def: "Follower turn led with a raised right hand, rotating clockwise. The first turn taught in almost every beginner Salsa course." },
  { term: "Bachata Sensual", category: "Bachata", def: "Modern Bachata style developed in Spain — body waves, body rolls, close embrace. The most-taught Bachata in London. What we teach at Pura Nights." },
  { term: "Bachata Dominicana (Traditional)", category: "Bachata", def: "Original Bachata from the Dominican Republic — footwork-driven, playful taps, looser hold. Bouncier and more rhythmic than Sensual." },
  { term: "Bachata Moderna", category: "Bachata", def: "Bridge style between Traditional and Sensual — adds Salsa-style turn patterns to a Bachata base." },
  { term: "Cuban Motion", category: "Technique", def: "Hip movement created by alternating bent and straight knees on each step. The 'Latin' look — essential for both Salsa and Bachata." },
  { term: "Body Wave", category: "Bachata", def: "Vertical undulation of the spine, knees → hips → ribcage → head. Signature move of Bachata Sensual." },
  { term: "Lead and Follow", category: "Technique", def: "The non-verbal partner communication system — leader proposes the move via frame and hand pressure, follower interprets and executes. Either role can be danced by anyone." },
  { term: "Frame", category: "Technique", def: "The tension and connection through your arms and core that lets your partner feel what you're about to do. Bad frame = bad lead." },
  { term: "Tanda", category: "Social", def: "A set of 3–4 songs danced with the same partner at a social. After the tanda you thank them and find a new partner." },
  { term: "Cortina", category: "Social", def: "A short non-danceable music break between tandas where partners change. Used in tango socials, sometimes Bachata." },
  { term: "Social Dancing", category: "Social", def: "Freestyle partner dancing at a club, bar or social night — no choreography. The point of taking classes. Our Monthly Latin Fridays in Ealing are a Social." },
  { term: "Pre-Party Lesson", category: "Social", def: "A 30–45 min beginner lesson before a social night so newcomers have one move to start with. Standard at Pura Nights Latin Fridays." },
  { term: "Bachata UK Champion", category: "Bachata", def: "Title awarded at the UK Bachata Open. Pura Nights founder Melitta Siomos holds this title." },
  { term: "Pura Ladies", category: "Bachata", def: "Pura Nights' international women's Bachata performance team — auditions held in West London and Covent Garden." },
  { term: "Bachata Festival / Congress", category: "Social", def: "Multi-day event with workshops by day, socials by night. London hosts several per year. We host UK Bachata Festival." },
  { term: "Footwork (Shines)", category: "Technique", def: "Solo footwork patterns done without a partner — useful for warming up, musicality and breakaways during a song." },
  { term: "Musicality", category: "Music", def: "Matching your movement to specific instruments — hitting the snare, riding the melody, pausing on a break. Separates beginners from intermediates." },
  { term: "The Break", category: "Music", def: "A moment in a song where the music drops or pauses. Skilled dancers freeze, dip or accent on the break." },
  { term: "Clave", category: "Music", def: "The two-bar rhythmic pattern (3-2 or 2-3) underlying most Salsa music. Tap it; it's the heartbeat." },
  { term: "Tumbao", category: "Music", def: "The Conga drum pattern in Salsa. Dancing 'in the tumbao' means hitting beats 2-3 and 6-7 with your body." },
  { term: "Dip", category: "Bachata", def: "Leader supports follower as she leans back. A staple of Bachata Sensual — taught only after consent and frame fundamentals." },
  { term: "Cambré", category: "Bachata", def: "Backwards arch of the upper body, often danced into a dip. Borrowed from ballet, common in Sensual choreography." },
  { term: "Beginner-Friendly", category: "Social", def: "A class or social that explicitly welcomes complete beginners — no partner needed, basic steps taught at the door. All Pura Nights weekly classes." },
  { term: "Drop-In Class", category: "Social", def: "A single class you can attend without committing to a course. £15–£18 in London. Pura Nights offers drop-in every Mon/Tue." },
  { term: "Course / Bundle", category: "Social", def: "A multi-week block of progressive classes — works out cheaper per class than drop-in. Pura Nights bundles start from £35." },
  { term: "Monthly Unlimited", category: "Social", def: "A pass that lets you attend every weekly Pura Nights class for one monthly fee. Our most popular pricing tier." },
  { term: "First Dance", category: "Wedding", def: "The newlyweds' choreographed dance at the wedding reception. Typically 2–3 minutes. We coach this via Wedding Dance Made Easy." },
  { term: "Father–Daughter Dance", category: "Wedding", def: "Traditional second wedding-floor dance. Often choreographed alongside the first dance — 4–6 lessons covers both." },
  { term: "Wedding Choreographer", category: "Wedding", def: "A dance coach who builds a custom first-dance routine to your song, taught over 3–10 sessions." },
  { term: "Ladies Styling", category: "Technique", def: "Women-only technique class focused on body movement, arm styling and femininity — danced without a partner." },
  { term: "Pura Nights", category: "Social", def: "West London's Salsa & Bachata school — weekly classes in Chiswick (Mon) and Ealing (Tue), plus Monthly Latin Friday socials." },
];

const CATEGORIES = ["All", "Salsa", "Bachata", "Music", "Technique", "Social", "Wedding"] as const;

const Glossary = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("All");

  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    return TERMS.filter(t =>
      (cat === "All" || t.category === cat) &&
      (!needle || t.term.toLowerCase().includes(needle) || t.def.toLowerCase().includes(needle))
    );
  }, [q, cat]);

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Salsa & Bachata Glossary — London Edition",
    description: "Definitive glossary of Salsa and Bachata terms used in London social dancing, weekly classes and weddings.",
    hasDefinedTerm: TERMS.map(t => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.def,
      inDefinedTermSet: "https://www.puranights.com/glossary/salsa-bachata",
      termCode: t.category,
    })),
  };

  return (
    <Layout>
      <SeoHead
        title="Salsa & Bachata Glossary — 35+ Terms Every London Dancer Should Know | Pura Nights"
        description="Definitive Salsa & Bachata glossary for London learners. On1, Cuban motion, Bachata Sensual, Tanda, Crossbody Lead and more — curated by Bachata UK Champion Melitta Siomos."
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
        <div className="flex flex-col md:flex-row gap-3 mb-8 sticky top-16 z-10 bg-background/95 backdrop-blur py-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search terms…"
              aria-label="Search glossary"
              className="w-full rounded-lg border border-primary/20 bg-card pl-10 pr-3 py-2.5 text-sm font-heading focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
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
        </div>

        <p className="text-charcoal/50 text-xs font-heading mb-4">{filtered.length} of {TERMS.length} terms</p>

        <dl className="divide-y divide-primary/10">
          {filtered.map(t => (
            <div key={t.term} className="py-5">
              <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                <dt className="font-display text-xl font-bold text-charcoal">{t.term}</dt>
                <span className="font-accent text-[10px] tracking-[0.2em] uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">{t.category}</span>
              </div>
              <dd className="text-charcoal/80 text-sm font-heading leading-relaxed">{t.def}</dd>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-12 text-center text-charcoal/50 font-heading text-sm">No terms match your search. Try a different word.</p>
          )}
        </dl>

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
