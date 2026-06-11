import { useState } from "react";
import { Link } from "react-router-dom";
import { Music, Heart, Sparkles, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import LastUpdated from "@/components/LastUpdated";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FadeInUp } from "@/components/animations";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: /learn/salsa-vs-bachata -->
   <!-- WIX SECTION: Hero / Comparison Table / Quiz (Wix Forms or custom code) / FAQ / CTA --> */

const compareRows = [
  { label: "Origin", salsa: "Cuba → New York → global", bachata: "Dominican Republic → global" },
  { label: "Tempo", salsa: "Fast (180–220 BPM)", bachata: "Slow–medium (110–140 BPM)" },
  { label: "Hold", salsa: "Open hold, lots of turns", bachata: "Close hold, body connection" },
  { label: "Beginner-Friendly?", salsa: "Yes — but feels fast at first", bachata: "Yes — slower tempo, easier first night" },
  { label: "Music Vibe", salsa: "Energetic, percussive, joyful", bachata: "Romantic, melodic, sensual" },
  { label: "Best For", salsa: "Big social energy & travel", bachata: "Connection, expression, intimacy" },
];

const faqs = [
  { q: "Should I learn salsa or bachata first?", a: "Most people who try both start with bachata because the slower tempo feels more achievable in your first lesson. But if you love high-energy music, salsa is just as beginner-friendly — our Beginners class restarts every week." },
  { q: "Can I learn both at once?", a: "Yes — Pura Nights teaches both every single week. Most students do, and being competent in both makes you a more interesting partner on social dance floors anywhere in the world." },
  { q: "Which is more popular in London?", a: "Bachata sensual has overtaken salsa in popularity over the last 5 years, especially in West London. But London is still a great salsa city — you can dance every night of the week." },
  { q: "Do I need a partner for either?", a: "No — both are taught with partner rotations every class. Coming alone is normal and welcomed." },
  { q: "Which gets me to social dancing faster?", a: "Bachata. The slower tempo and simpler step pattern means most beginners feel ready to social dance after 4–6 weeks. Salsa typically takes 8–12 weeks to feel comfortable on the social floor." },
  { q: "Can I dance bachata to salsa music or vice versa?", a: "Generally no — the rhythms are too different. But many DJs at Pura Nights' Latin Fridays mix both, so you're never far from the next song you can dance to." },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
      { "@type": "ListItem", position: 2, name: "Learn", item: "https://www.puranights.com/blog" },
      { "@type": "ListItem", position: 3, name: "Salsa vs Bachata", item: "https://www.puranights.com/learn/salsa-vs-bachata" },
    ],
  },
];

const SalsaVsBachataPillar = () => {
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");

  const allAnswered = q1 && q2 && q3;

  const result = (() => {
    if (!allAnswered) return null;
    let salsaScore = 0;
    let bachataScore = 0;
    if (q1 === "fast") salsaScore += 2; else bachataScore += 2;
    if (q2 === "performance") bachataScore += 1; else { salsaScore += 1; bachataScore += 1; }
    if (q3 === "yes") salsaScore += 1; else bachataScore += 1;
    if (salsaScore > bachataScore) {
      return { winner: "Salsa", icon: Music, color: "text-primary", desc: "You'll thrive in salsa. The energy, the speed and the social side will suit you perfectly. Start with our Monday Beginners class in Chiswick — your first night, you'll already be turning." };
    }
    if (bachataScore > salsaScore) {
      return { winner: "Bachata", icon: Heart, color: "text-peach", desc: "Bachata is your dance. The slower tempo, romantic music and close connection are exactly what you're looking for. Start with our Tuesday Beginners class in Ealing — you'll be social-dancing within a month." };
    }
    return { winner: "Both", icon: Sparkles, color: "text-primary", desc: "Honestly? Both. You'll love the contrast, and learning both makes you twice as useful on any dance floor. Pura Nights teaches them side-by-side every week — start either Monday or Tuesday." };
  })();

  return (
    <Layout>
      <SeoHead
        title="Salsa vs Bachata — Which Should You Learn First? | Pura Nights"
        description="Not sure whether to start with salsa or bachata? This guide breaks down the differences and helps you choose — then book your first class from £10."
        path="/learn/salsa-vs-bachata"
        schema={schema}
        dateModified="2026-04-19"
      />

      {/* HERO */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Pillar Guide · ~5 min read</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">Salsa vs Bachata — Which Should You Learn First?</h1>
            <LastUpdated date="2026-04-19" />
            <p className="text-primary-foreground/70 text-base max-w-2xl mt-4">
              The two most-loved Latin partner dances in London. Both beginner-friendly, both taught at Pura Nights every week. Here's how to decide which one to start with — and why most students end up doing both.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">Side-by-Side Comparison</h2>
          </FadeInUp>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm bg-card rounded-2xl border border-border overflow-hidden">
              <thead className="bg-charcoal text-primary-foreground">
                <tr>
                  <th className="py-4 px-5 font-heading font-semibold text-xs uppercase tracking-wider">Feature</th>
                  <th className="py-4 px-5 font-heading font-semibold text-xs uppercase tracking-wider text-primary">Salsa</th>
                  <th className="py-4 px-5 font-heading font-semibold text-xs uppercase tracking-wider text-peach">Bachata</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}>
                    <td className="py-3.5 px-5 font-heading font-semibold">{row.label}</td>
                    <td className="py-3.5 px-5 text-muted-foreground">{row.salsa}</td>
                    <td className="py-3.5 px-5 text-muted-foreground">{row.bachata}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-2xl">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary text-center mb-3">3-Question Quiz</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Which Dance Is Right For You?</h2>
            <p className="text-muted-foreground text-center mb-10">Answer three questions. We'll give you our honest recommendation.</p>
          </FadeInUp>

          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-7">
            <div>
              <p className="font-heading font-bold text-base mb-3">1. Do you prefer fast-paced or slow-flowing movement?</p>
              <RadioGroup value={q1} onValueChange={setQ1}>
                <div className="flex items-center gap-2"><RadioGroupItem value="fast" id="q1a" /><Label htmlFor="q1a" className="cursor-pointer">Fast and energetic — give me speed</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="slow" id="q1b" /><Label htmlFor="q1b" className="cursor-pointer">Slow and flowing — let me feel every note</Label></div>
              </RadioGroup>
            </div>

            <div>
              <p className="font-heading font-bold text-base mb-3">2. Are you learning for social dancing or performance?</p>
              <RadioGroup value={q2} onValueChange={setQ2}>
                <div className="flex items-center gap-2"><RadioGroupItem value="social" id="q2a" /><Label htmlFor="q2a" className="cursor-pointer">Social dancing — meet people, have fun</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="performance" id="q2b" /><Label htmlFor="q2b" className="cursor-pointer">Performance or close-connection</Label></div>
              </RadioGroup>
            </div>

            <div>
              <p className="font-heading font-bold text-base mb-3">3. Do you have any dance experience?</p>
              <RadioGroup value={q3} onValueChange={setQ3}>
                <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="q3a" /><Label htmlFor="q3a" className="cursor-pointer">Yes — I've danced before</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="no" id="q3b" /><Label htmlFor="q3b" className="cursor-pointer">No — complete beginner</Label></div>
              </RadioGroup>
            </div>

            {result && (
              <div className="border-t border-border pt-6 animate-fade-in">
                <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Our recommendation</p>
                <div className="flex items-center gap-3 mb-3">
                  <result.icon size={28} className={result.color} />
                  <h3 className="font-display text-2xl font-bold">Start with {result.winner}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{result.desc}</p>
                <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book Your First Class — From £10 →</a>
              </div>
            )}
            {!result && (
              <p className="text-muted-foreground text-xs text-center italic">Pick an answer for each question to see your recommendation.</p>
            )}
          </div>
        </div>
      </section>

      {/* BOTH AT PURA NIGHTS */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-5xl">
          <FadeInUp>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-primary-foreground mb-10">Both Styles, Every Week</h2>
          </FadeInUp>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/blog/what-is-salsa" className="bg-charcoal-light rounded-2xl p-7 border border-primary/15 card-hover block">
              <Music size={28} className="text-primary mb-3" />
              <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">Salsa On1</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">High-energy, percussive, endlessly fun. Mondays in Chiswick + Tuesdays in Ealing. Beginners restart weekly.</p>
              <span className="text-primary text-sm font-heading font-semibold inline-flex items-center gap-1">Read the Salsa guide <ChevronRight size={14} /></span>
            </Link>
            <Link to="/blog/what-is-bachata" className="bg-charcoal-light rounded-2xl p-7 border border-peach/15 card-hover block">
              <Heart size={28} className="text-peach mb-3" />
              <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">Bachata Sensual</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">Romantic, expressive, body-led. Taught by a Bachata UK Champion. Same nights, same venues.</p>
              <span className="text-peach text-sm font-heading font-semibold inline-flex items-center gap-1">Read the Bachata guide <ChevronRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">Common Questions</h2>
          </FadeInUp>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-card rounded-xl p-5 border border-border">
                <h3 className="font-heading font-bold text-sm mb-2">{f.q}</h3>
                <p className="text-muted-foreground text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 text-center" style={{ background: 'var(--gradient-gold)' }}>
        <div className="container-main">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">Stop reading. Start dancing.</h2>
          <p className="text-charcoal/70 text-sm mb-6">Whichever you choose — Pura Nights teaches it. From £10, no partner needed.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your First Class</a>
            <a {...waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", "SalsaVsBachataPillar:224")} className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/30 hover:bg-charcoal/20 text-sm">💬 WhatsApp Melitta</a>
          </div>
        </div>
      </section>

      <RelatedPages title="Keep Exploring" links={[
        { to: "/learn/salsa-bachata-guide", label: "Pillar Guide", desc: "The full beginners' guide" },
        { to: "/start-here", label: "Start Here", desc: "Brand new to dance?" },
        { to: "/pura-nights", label: "Weekly Classes", desc: "Mondays & Tuesdays" },
        { to: "/prices", label: "Prices", desc: "Drop-in & bundles" },
        { to: "/blog/what-is-salsa", label: "What Is Salsa?", desc: "Full deep-dive" },
        { to: "/blog/what-is-bachata", label: "What Is Bachata?", desc: "Full deep-dive" },
      ]} />
    </Layout>
  );
};

export default SalsaVsBachataPillar;
