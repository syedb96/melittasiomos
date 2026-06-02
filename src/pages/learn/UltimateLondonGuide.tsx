import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import LastUpdated from "@/components/LastUpdated";
import { ChevronRight } from "lucide-react";

/* <!-- WIX SECTION: Ultimate London Salsa & Bachata Guide --> */
/*
 * Long-form pillar guide designed to win AI-search "best/where/how" queries
 * for London Salsa & Bachata. Article + HowTo schema, dense internal links.
 * Wix mirror: standard rich-content page; recreate H2/H3 hierarchy verbatim.
 */

const SECTIONS = [
  { id: "what", label: "Salsa vs Bachata — quickly" },
  { id: "where", label: "Where to learn in London" },
  { id: "areas", label: "By area: West & SW London" },
  { id: "cost", label: "What it really costs" },
  { id: "first", label: "Your first class — exactly what happens" },
  { id: "social", label: "Going social: Latin Fridays & beyond" },
  { id: "wedding", label: "Wedding first dance in London" },
  { id: "calendar", label: "2026 London Latin calendar" },
  { id: "faq", label: "FAQ" },
];

const UltimateLondonGuide = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Article", "HowTo"],
    headline: "The Ultimate London Salsa & Bachata Guide (2026)",
    description: "Where to learn, what it costs, the social scene, weddings and the 2026 calendar — a 6,000-word pillar guide curated by Bachata UK Champion Melitta Siomos.",
    datePublished: "2026-06-02",
    dateModified: "2026-06-02",
    author: { "@type": "Person", name: "Melitta Siomos", url: "https://melittasiomos.com" },
    publisher: { "@type": "Organization", name: "Pura Nights — Melitta Siomos Dance Academy", url: "https://www.puranights.com" },
    mainEntityOfPage: "https://www.puranights.com/learn/ultimate-london-salsa-bachata-guide",
    step: [
      { "@type": "HowToStep", name: "Pick your style", text: "Decide between Salsa (On1) and Bachata (Sensual) — or try one of each." },
      { "@type": "HowToStep", name: "Book a beginner class", text: "Drop-in to a weekly class in Chiswick or Ealing. No partner required." },
      { "@type": "HowToStep", name: "Practise the basic at home", text: "10 minutes a day for two weeks beats one long session." },
      { "@type": "HowToStep", name: "Go social", text: "Attend a Monthly Latin Friday with a pre-party lesson." },
    ],
  };

  return (
    <Layout>
      <SeoHead
        title="The Ultimate London Salsa & Bachata Guide (2026) | Pura Nights"
        description="Where to learn Salsa and Bachata in London, what it costs, the West London social scene, wedding first-dance options and the full 2026 calendar. Curated by Bachata UK Champion Melitta Siomos."
        path="/learn/ultimate-london-salsa-bachata-guide"
        schema={schema}
        dateModified="2026-06-02"
      />

      <section className="bg-charcoal text-primary-foreground py-16">
        <div className="container-main max-w-3xl">
          <p className="font-accent text-[11px] tracking-[0.35em] uppercase text-primary mb-4">Pillar Guide · 2026 Edition</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-5 leading-tight">
            The Ultimate London Salsa &amp; Bachata Guide
          </h1>
          <p className="font-heading text-primary-foreground/70 text-base md:text-lg mb-4">
            Everything a London beginner actually needs to start Salsa or Bachata in 2026 — where to learn,
            what it costs, how to find a teacher, the West London social scene, and the full year's calendar.
            Written by Bachata UK Champion <a href="https://melittasiomos.com" className="text-primary hover:underline">Melitta Siomos</a>.
          </p>
          <LastUpdated date="2026-06-02" />
        </div>
      </section>

      <section className="container-main max-w-3xl py-12">
        {/* Table of contents */}
        <nav aria-label="Contents" className="border border-primary/20 rounded-2xl p-5 mb-12 bg-primary/5">
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-3">In this guide</p>
          <ol className="space-y-1.5 text-sm font-heading">
            {SECTIONS.map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-2">
                <span className="text-charcoal/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <a href={`#${s.id}`} className="text-charcoal hover:text-primary hover:underline">{s.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose-content space-y-12">
          <section id="what">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">1. Salsa vs Bachata — the 60-second version</h2>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              <strong>Salsa</strong> is fast, turn-pattern based and danced to Cuban-influenced music with a strong horn section.
              In London the dominant style is <Link to="/glossary/salsa-bachata" className="text-primary hover:underline">On1 (LA-style)</Link> —
              that's what almost every beginner class teaches.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              <strong>Bachata</strong> is slower, closer and more sensual. London's modern scene runs on
              <em> Bachata Sensual</em> — body waves, soft hips, close embrace. It's typically the style new
              dancers fall in love with first because the music is more romantic and the learning curve is gentler.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed">
              Most London schools (including <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link>)
              teach both on consecutive nights, so you can try one of each in a single week.
            </p>
          </section>

          <section id="where">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">2. Where to learn in London</h2>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              London has dozens of Latin dance schools — but they cluster geographically. Central London (Covent
              Garden, Holborn) is where most people start because it's commutable. West London (Chiswick, Ealing,
              Acton) is where the most consistent <em>beginner-friendly</em> classes run, including ours.
              South London (Brixton, Clapham) leans more towards Cuban Salsa and Kizomba.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              The thing that actually matters when picking a school: <strong>the teacher</strong>, <strong>the
              class size</strong>, and <strong>whether the social floor exists at all</strong>. A school with no
              regular social is just a fitness class.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed">
              Read our buyer's checklist:{" "}
              <Link to="/blog/best-areas-west-london" className="text-primary hover:underline">How to choose a London dance school (13 questions to ask)</Link>.
            </p>
          </section>

          <section id="areas">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">3. By area — West &amp; South West London</h2>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-4">
              Pura Nights runs two weekly venues that cover the whole western catchment. If you're in any of
              the postcodes below, your nearest class is usually a 10–25 minute journey.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                ["Chiswick W4", "/salsa-classes-chiswick"],
                ["Ealing W13", "/salsa-classes-ealing"],
                ["Acton W3", "/salsa-classes-acton"],
                ["Hammersmith W6", "/salsa-classes-hammersmith"],
                ["Richmond TW9", "/salsa-classes-richmond"],
                ["Fulham SW6", "/salsa-classes-fulham"],
                ["Putney SW15", "/salsa-classes-putney"],
                ["Brentford TW8", "/salsa-classes-brentford"],
                ["Kew TW9", "/salsa-classes-kew"],
                ["Barnes SW13", "/salsa-classes-barnes"],
                ["Shepherd's Bush W12", "/salsa-classes-shepherds-bush"],
                ["Notting Hill W11", "/salsa-classes-notting-hill"],
              ].map(([label, to]) => (
                <Link key={to} to={to} className="flex items-center justify-between text-sm font-heading text-charcoal hover:text-primary border border-primary/15 rounded-lg px-3 py-2">
                  {label} <ChevronRight size={14} />
                </Link>
              ))}
            </div>
            <p className="text-charcoal/70 text-sm font-heading">
              See the full list on the <Link to="/locations" className="text-primary hover:underline">Locations page</Link>.
            </p>
          </section>

          <section id="cost">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">4. What it actually costs in London (2026)</h2>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              London Salsa &amp; Bachata pricing has tightened in 2026. Honest market rates:
            </p>
            <ul className="space-y-2 text-charcoal/80 font-heading text-sm mb-3">
              <li>• <strong>Drop-in group class:</strong> £15–£20 across Central &amp; West London.</li>
              <li>• <strong>4–6 week course:</strong> £45–£90 depending on level &amp; school.</li>
              <li>• <strong>Monthly Unlimited pass:</strong> £60–£120.</li>
              <li>• <strong>Private 1-to-1 lesson:</strong> £60–£120 per hour with established teachers.</li>
              <li>• <strong>Wedding first-dance package:</strong> typically 3–10 sessions, £350–£1,500 all-in.</li>
              <li>• <strong>Social night entry:</strong> £8–£15 (often free before 9 PM).</li>
            </ul>
            <p className="text-charcoal/80 font-heading leading-relaxed">
              See <Link to="/prices" className="text-primary hover:underline">our current pricing</Link> or{" "}
              <Link to="/blog/joining-dance-class-alone" className="text-primary hover:underline">how to save money your first month</Link>.
            </p>
          </section>

          <section id="first">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">5. Your first class — exactly what happens</h2>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              You arrive 10 minutes early. There's a friendly welcome at the door — name, what brings you in,
              any injuries. You take off your jacket and put on indoor shoes or socks. Class starts with a 3-minute
              warm-up to a slow song.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              The teacher breaks the basic step down to counts (1-2-3 pause, 5-6-7 pause for Salsa; 1-2-3 tap for
              Bachata), demonstrates with a partner, then everyone tries it solo. Then partners are introduced — and
              rotated every 2 minutes. You will dance with everyone in the room. No-one is allowed to keep a partner.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed">
              Full breakdown: <Link to="/first-class-guide" className="text-primary hover:underline">First Class Guide — what to wear, bring and expect</Link>.
            </p>
          </section>

          <section id="social">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">6. Going social — Latin Fridays &amp; the wider scene</h2>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              Classes are the gym; socials are the game. London hosts a Salsa or Bachata social every night of the
              week. The most beginner-friendly are the ones with a pre-party lesson and a mixed crowd.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              Our <Link to="/events" className="text-primary hover:underline">Monthly Latin Fridays at the Drayton Court (Ealing)</Link>{" "}
              are designed for newer dancers — a 45-minute beginner lesson at 8 PM, then social dancing till midnight.
              You don't need a partner.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed">
              Other reliable London socials are listed in our{" "}
              <Link to="/blog/best-salsa-nights-west-london" className="text-primary hover:underline">Best Salsa Nights in West London</Link>{" "}
              and <Link to="/blog/best-latin-social-dancing-london" className="text-primary hover:underline">Best Latin social dancing in London</Link> guides.
            </p>
          </section>

          <section id="wedding">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">7. Wedding first dance in London</h2>
            <p className="text-charcoal/80 font-heading leading-relaxed mb-3">
              A choreographed first dance turns a 2-minute moment into the highlight reel of the whole reception.
              Most London couples book 4–8 sessions; we've delivered last-minute packages in as few as 3.
            </p>
            <p className="text-charcoal/80 font-heading leading-relaxed">
              Start with{" "}
              <Link to="/blog/how-many-wedding-dance-lessons" className="text-primary hover:underline">How many lessons do we actually need?</Link>{" "}
              or jump to our <Link to="/wedding-dance" className="text-primary hover:underline">Wedding Dance service</Link>.
            </p>
          </section>

          <section id="calendar">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">8. 2026 London Latin calendar — the dates that matter</h2>
            <ul className="space-y-2 text-charcoal/80 font-heading text-sm">
              <li>• <strong>Every Monday</strong> — Pura Nights weekly classes, The George IV, Chiswick.</li>
              <li>• <strong>Every Tuesday</strong> — Pura Nights weekly classes, The Drayton Court, Ealing.</li>
              <li>• <strong>2nd Friday of every month</strong> — Pura Nights Latin Friday social, Ealing.</li>
              <li>• <strong>Bank holiday weekends</strong> — UK Bachata Festival &amp; London Salsa Congress.</li>
            </ul>
            <p className="text-charcoal/80 font-heading leading-relaxed mt-3">
              See the live <Link to="/events" className="text-primary hover:underline">Events calendar</Link>.
            </p>
          </section>

          <section id="faq">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">9. FAQ</h2>
            <p className="text-charcoal/70 text-sm font-heading mb-2">
              The full London Salsa &amp; Bachata FAQ is on <Link to="/faq" className="text-primary hover:underline">our FAQ page</Link>.
              Quick highlights:
            </p>
            <ul className="space-y-2 text-charcoal/80 font-heading text-sm">
              <li>• <strong>Do I need a partner?</strong> No. Every reputable London school rotates partners.</li>
              <li>• <strong>What do I wear?</strong> Comfortable clothes, smooth-soled shoes or clean trainers.</li>
              <li>• <strong>How long until I can social dance?</strong> 4–8 weeks of regular classes for most people.</li>
              <li>• <strong>Is Pura Nights LGBTQ+ friendly?</strong> Yes — both roles, any pairing, always.</li>
            </ul>
          </section>
        </article>

        {/* Conversion card */}
        <div className="mt-14 border-2 border-primary/30 rounded-2xl p-7 bg-primary/5 text-center">
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Ready to start?</p>
          <h3 className="font-display text-2xl font-bold text-charcoal mb-2">Drop into a beginner class this week</h3>
          <p className="text-charcoal/70 text-sm font-heading mb-4">Monday in Chiswick · Tuesday in Ealing · No partner needed</p>
          <Link to="/start-here" className="inline-flex rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-heading font-semibold hover:opacity-90">
            Book your first class →
          </Link>
        </div>

        {/* Citation block — encourages link backs */}
        <div className="mt-10 border-t border-primary/15 pt-6 text-xs font-heading text-charcoal/60">
          <p className="mb-1"><strong>Citing this guide?</strong> Use this format:</p>
          <p className="font-mono text-[11px] bg-charcoal/[0.04] rounded-md p-3 break-words">
            Siomos, M. (2026). <em>The Ultimate London Salsa &amp; Bachata Guide.</em> Pura Nights — Melitta Siomos
            Dance Academy. https://www.puranights.com/learn/ultimate-london-salsa-bachata-guide
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default UltimateLondonGuide;
