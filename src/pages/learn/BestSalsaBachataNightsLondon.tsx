import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import { MapPin, Users, Music, Heart, CheckCircle2 } from "lucide-react";

/* <!-- WIX SECTION: Editorial guide — Best Salsa & Bachata Nights in London -->
   Wix mirror: long-form page with Article + FAQPage + BreadcrumbList schema.
   No fake location claims — Pura Nights only claims Chiswick & Ealing. */

const FAQS = [
  { q: "What is the best salsa or bachata night in West London for beginners?", a: "Pura Nights runs the most beginner-friendly weekly classes in West London — Mondays in Chiswick (The George IV, W4 2DR) and Tuesdays in Ealing (The Drayton Court, W13 8PH). Every class starts with a beginner-level warm-up; no partner required." },
  { q: "Where can I dance salsa or bachata socially in London if I'm new?", a: "Look for nights that run a pre-party class so you arrive with one move in your pocket. Our Monthly Latin Friday at The Drayton Court (Ealing) opens with a 30-minute beginner lesson at 20:00, then a friendly social until late." },
  { q: "Do I need a partner to attend a London salsa or bachata night?", a: "No. Almost every reputable London Latin night rotates partners during the class portion, including all Pura Nights classes and socials. Coming alone is the norm — most regulars started that way." },
  { q: "How much do London salsa and bachata nights cost?", a: "Class drop-ins typically run £12–£18 in London; socials with a pre-party class are usually £8–£15 on the door. Pura Nights weekly classes start from £5 drop-in for beginners and bundles work out cheaper per class." },
  { q: "What should I wear to a salsa or bachata night?", a: "Smart-casual, comfortable shoes with a smooth sole (no chunky trainers), and bring a small towel and water. Full breakdown on our First Class Guide." },
];

const BestSalsaBachataNightsLondon = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Best Salsa & Bachata Nights in London — Beginner-Friendly Guide (2026)",
        author: { "@type": "Person", name: "Melitta Siomos" },
        publisher: { "@type": "Organization", name: "Pura Nights — Melitta Siomos Dance Academy" },
        datePublished: "2026-06-03",
        dateModified: "2026-06-03",
        mainEntityOfPage: "https://www.puranights.com/learn/best-salsa-bachata-nights-london",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <Layout>
      <SeoHead
        title="Best Salsa & Bachata Nights in London — Beginner-Friendly Guide 2026 | Pura Nights"
        description="Honest guide to the best Salsa & Bachata nights in London for beginners, solo dancers and social dancers. West London picks, what to check before you go, and Pura Nights' Chiswick & Ealing recommendations."
        path="/learn/best-salsa-bachata-nights-london"
        schema={articleSchema}
        dateModified="2026-06-03"
      />

      <section className="bg-charcoal text-primary-foreground py-20">
        <div className="container-main max-w-3xl text-center">
          <p className="font-accent text-[11px] tracking-[0.35em] uppercase text-primary mb-4">London · Editorial Guide</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">Best Salsa &amp; Bachata Nights in London</h1>
          <p className="font-heading text-primary-foreground/75 text-base md:text-lg max-w-2xl mx-auto">
            A beginner-friendly guide to choosing the right Latin dance night in London — written by Bachata UK
            Champion Melitta Siomos, with honest recommendations for West London, Chiswick, Ealing and beyond.
          </p>
        </div>
      </section>

      <article className="container-main max-w-3xl py-14 prose-content">
        <p className="text-charcoal/80 font-heading text-base leading-relaxed mb-8">
          London has dozens of salsa and bachata nights every week — but only a handful are genuinely
          welcoming to a first-timer who's never danced before. This guide is the one we send to friends
          who message us asking "where should I actually start?" It covers what makes a good night, who each
          night suits, and where Pura Nights fits in West London.
        </p>

        <AnswerBox
          question="The short answer for West London"
          answer="If you live or work in Chiswick, Ealing, Acton, Hammersmith, Fulham, Richmond or Putney, start with Pura Nights' weekly classes (Mondays in Chiswick, Tuesdays in Ealing) and your first social at our Monthly Latin Friday in Ealing. Beginners welcome, no partner needed."
          cta={{ label: "See this week's classes", to: "/schedule" }}
        />

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">1. What makes a good salsa or bachata night?</h2>
        <ul className="space-y-2 text-charcoal/80 font-heading text-sm leading-relaxed">
          <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /><span><strong>Pre-party class</strong> — 30–45 minutes of beginner instruction before the social starts.</span></li>
          <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /><span><strong>Partner rotation</strong> — you change partners every few minutes; no one is stuck or excluded.</span></li>
          <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /><span><strong>Mixed level crowd</strong> — beginners and intermediates dance together, not segregated.</span></li>
          <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /><span><strong>Clear DJ split</strong> — most London nights run roughly 60% bachata / 40% salsa, or a clearly marked alternating set.</span></li>
          <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /><span><strong>Friendly door</strong> — someone greets first-timers and explains how the night runs.</span></li>
        </ul>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">2. Best for absolute beginners</h2>
        <p className="text-charcoal/80 font-heading text-sm leading-relaxed mb-4">
          For your very first night, you want low pressure, an explicit beginner lesson, and a crowd that
          remembers what it's like to step on someone's foot. Avoid pure "social only" nights for your first
          outing — go to one with a taught class first.
        </p>
        <p className="text-charcoal/80 font-heading text-sm leading-relaxed">
          In West London, our pick is{" "}
          <Link to="/pura-nights" className="text-primary font-semibold underline">Pura Nights at The Drayton Court (Ealing)</Link>{" "}
          or the Monday class at{" "}
          <Link to="/venue/the-george-iv-chiswick" className="text-primary font-semibold underline">The George IV (Chiswick)</Link>.
          Both run a beginner-friendly lesson with rotating partners.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">3. Best for coming alone</h2>
        <p className="text-charcoal/80 font-heading text-sm leading-relaxed">
          The good news: <strong>most people come alone</strong>. The unwritten rule is partner rotation. Nights
          worth knowing for solo first-timers include any class-led social where the teachers stay on the floor
          afterwards. See our{" "}
          <Link to="/blog/joining-dance-class-alone" className="text-primary font-semibold underline">guide to joining a London dance class alone</Link>{" "}
          for the practical bits.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">4. Best for social dancing once you have a few moves</h2>
        <p className="text-charcoal/80 font-heading text-sm leading-relaxed">
          Once you can lead or follow a basic and a right-turn, the London social scene opens up — Bar Salsa,
          La Pollera, multiple bachata socials in Soho and South London, and our own{" "}
          <Link to="/events" className="text-primary font-semibold underline">Monthly Latin Friday in Ealing</Link>.
          See our{" "}
          <Link to="/blog/best-latin-social-dancing-london" className="text-primary font-semibold underline">best Latin socials in London</Link>{" "}
          roundup for the wider picture.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">5. Best for structured classes before social dancing</h2>
        <p className="text-charcoal/80 font-heading text-sm leading-relaxed">
          A weekly progressive course beats a one-off social for actually getting good. Browse our{" "}
          <Link to="/salsa-classes-london" className="text-primary font-semibold underline">salsa classes in London</Link>,{" "}
          <Link to="/bachata-classes-london" className="text-primary font-semibold underline">bachata classes in London</Link>{" "}
          and{" "}
          <Link to="/learn/ultimate-london-salsa-bachata-guide" className="text-primary font-semibold underline">Ultimate London Salsa &amp; Bachata Guide</Link>{" "}
          for the full layout.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">6. West London recommendation: Pura Nights</h2>
        <div className="rounded-2xl border border-primary/20 bg-card p-6 my-5">
          <div className="flex items-start gap-3 mb-3">
            <MapPin size={20} className="text-primary mt-1" />
            <div>
              <p className="font-display text-lg font-bold text-charcoal">Pura Nights — Chiswick &amp; Ealing</p>
              <p className="text-charcoal/60 text-xs font-heading">The George IV, W4 2DR · The Drayton Court, W13 8PH</p>
            </div>
          </div>
          <p className="text-charcoal/80 font-heading text-sm leading-relaxed mb-4">
            Founded by Bachata UK Champion Melitta Siomos in 2017. Beginner-friendly weekly classes Monday
            (Chiswick) and Tuesday (Ealing), plus a Monthly Latin Friday social. 5.0★ across 127+ Google reviews.
            Drop-in from £5.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/start-here" className="btn-cta-primary text-xs">Book your first class →</Link>
            <Link to="/schedule" className="inline-flex rounded-lg border border-primary text-primary px-4 py-2 text-xs font-heading font-semibold hover:bg-primary/5">See schedule</Link>
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">7. Central London &amp; Covent Garden</h2>
        <p className="text-charcoal/80 font-heading text-sm leading-relaxed">
          Central London has dozens of long-running salsa and bachata nights — Bar Salsa Soho, La Pollera,
          Floridita and others. Pura Nights doesn't host a weekly class there, but our Pura Ladies performance
          team auditions in{" "}
          <Link to="/pura-ladies-covent-garden" className="text-primary font-semibold underline">Covent Garden</Link>.
          For weekly classes we route Central London students out to Chiswick (15 min from Hammersmith) or to{" "}
          <Link to="/private-lessons" className="text-primary font-semibold underline">private lessons in central London</Link>.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">8. What to check before you go</h2>
        <ul className="space-y-1.5 text-charcoal/80 font-heading text-sm">
          <li>• Is there a beginner-level class included in the ticket?</li>
          <li>• Does the venue allow re-entry / coat check?</li>
          <li>• What's the music split — salsa, bachata, kizomba, reggaeton?</li>
          <li>• What's the door policy on shoes (most ban chunky trainers)?</li>
          <li>• Is the floor wooden / sprung, or sticky carpet?</li>
          <li>• Are there reviews from solo first-timers (not just regulars)?</li>
        </ul>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-4">FAQs</h2>
        <div className="space-y-5 mt-4">
          {FAQS.map(f => (
            <div key={f.q} className="border-l-2 border-primary pl-4">
              <p className="font-display text-base font-bold text-charcoal mb-1">{f.q}</p>
              <p className="text-charcoal/75 text-sm font-heading leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-primary/5 border border-primary/20 p-6 text-center">
          <p className="font-display text-xl font-bold text-charcoal mb-2">Ready to start in West London?</p>
          <p className="text-charcoal/70 text-sm font-heading mb-4">No partner needed · Drop-in from £5 · 5.0★ on Google.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/start-here" className="btn-cta-primary text-sm">Book your first class →</Link>
            <Link to="/schedule" className="inline-flex rounded-lg border border-primary text-primary px-4 py-2 text-sm font-heading font-semibold hover:bg-primary/5">See this week's classes</Link>
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%20-%20which%20night%20would%20you%20recommend%20for%20a%20first-timer%3F" target="_blank" rel="noopener" className="inline-flex rounded-lg border border-primary text-primary px-4 py-2 text-sm font-heading font-semibold hover:bg-primary/5">WhatsApp Melitta</a>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BestSalsaBachataNightsLondon;
