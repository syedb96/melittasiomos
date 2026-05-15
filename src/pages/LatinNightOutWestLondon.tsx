import { Link } from "react-router-dom";
import { MapPin, Music, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp } from "@/components/animations";

const nightOutFaqs = [
  { q: "How much does a Latin night out at Pura Nights cost?", a: "From £5 if you only join the social, or from £10 for a full class plus social. Compare that to the average West London bar round and it's often the cheapest evening you'll have all week." },
  { q: "Can I come on my own?", a: "Yes — and most people do at first. Partner rotation means you dance with the whole room, and the regulars look out for new faces." },
  { q: "Do I need to know how to dance?", a: "Not at all. Beginner classes start from zero every Monday in Chiswick and Tuesday in Ealing." },
  { q: "Is this a date-night activity?", a: "It's brilliant for a date night — low-pressure, fun, no awkward silences. Couples often stick around for the social dancing afterwards." },
  { q: "What's a Latin Friday?", a: "Once a month at the Drayton Court Hotel in Ealing — a full evening of social dancing with a club-style atmosphere. Tickets via the Events page." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Article", "FAQPage"],
  headline: "Latin Night Out in West London — Salsa & Bachata Social Dancing",
  description: "Where to go for a Latin night out in West London — weekly Salsa & Bachata classes plus social dancing in Chiswick & Ealing, and the monthly Latin Friday social.",
  url: "https://www.puranights.com/latin-night-out-west-london",
  author: { "@type": "Person", name: "Melitta Siomos" },
  publisher: { "@type": "Organization", name: "Melitta Siomos Dance Academy" },
  datePublished: "2026-05-15",
  dateModified: "2026-05-15",
  mainEntity: nightOutFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const LatinNightOutWestLondon = () => (
  <Layout>
    <SeoHead
      title="Latin Night Out in West London | Salsa & Bachata Social Dancing"
      description="Plan a Latin night out in West London — weekly Salsa & Bachata classes plus open social dancing in Chiswick (Monday), Ealing (Tuesday) and the monthly Latin Friday at Drayton Court."
      path="/latin-night-out-west-london"
      schema={schema}
      dateModified="2026-05-15"
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(900px 400px at 30% 30%, hsl(var(--primary)/0.35), transparent 60%)" }} />
      <div className="container-main max-w-4xl relative">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">A Better Night Out · West London</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Latin Night Out in West London
          </h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl mb-8 font-heading">
            Salsa &amp; Bachata classes plus open social dancing — without needing a partner or any experience.
            The most fun you'll have on a Monday or Tuesday in West London.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/start-here" className="btn-cta-primary text-sm">Plan your first night →</Link>
            <Link to="/events" className="btn-cta-ghost text-sm">See Latin Friday →</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          tone="warm"
          question="Where do people go for Latin dancing in West London?"
          answer="Pura Nights runs the most active weekly Latin nights in West London — Salsa & Bachata classes followed by open social dancing every Monday at The George IV (Chiswick) and Tuesday at the Drayton Court Hotel (Ealing). The monthly Latin Friday social at the Drayton Court is West London's go-to club-style Latin evening."
          bullets={[
            "Mon — The George IV, Chiswick · 7:30–11pm",
            "Tue — Drayton Court, Ealing · 6:50–11pm",
            "Monthly Friday — Latin Friday social, Ealing",
            "From £5 (social only) or £10 (class + social)",
          ]}
          cta={{ label: "Book your first night", to: "/prices" }}
        />
      </div>
    </section>

    {/* Comparison */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">A Latin Night Out vs A Normal Night Out</h2>
        <p className="text-muted-foreground text-center mb-10 font-heading text-sm">Same money, very different evening.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-card rounded-2xl border border-border/40 overflow-hidden">
            <thead>
              <tr className="bg-charcoal text-primary-foreground/80 text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4 font-heading">Evening</th>
                <th className="text-left py-3 px-4 font-heading">Cost</th>
                <th className="text-left py-3 px-4 font-heading">Energy</th>
                <th className="text-left py-3 px-4 font-heading">You leave with</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Average pub night", "£25–£40", "Low", "A receipt"],
                ["Club night", "£15–£40 + drinks", "High but loud", "Sore feet"],
                ["Dinner out", "£35–£60+", "Sat down", "A nice meal"],
                ["Spin / fitness class", "£15–£25", "Solo cardio", "A workout"],
                ["Pura Nights", "From £5–£15", "Live, social, joyful", "Friends, skills, stories"],
              ].map(row => (
                <tr key={row[0]} className={row[0] === "Pura Nights" ? "bg-primary/10" : ""}>
                  {row.map((c, i) => (
                    <td key={i} className={`py-3 px-4 ${i === 0 ? "font-heading font-semibold" : "text-muted-foreground"} ${row[0] === "Pura Nights" ? "text-foreground" : ""}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Ideal for */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">Ideal For</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Heart, title: "Friends" },
            { icon: Sparkles, title: "Couples" },
            { icon: Music, title: "Solo adults" },
            { icon: MapPin, title: "New-to-London" },
            { icon: Sparkles, title: "After-work plans" },
            { icon: Heart, title: "Low-pressure date nights" },
            { icon: Music, title: "Bored of bars" },
            { icon: Sparkles, title: "Birthday warm-ups" },
          ].map(b => (
            <div key={b.title} className="bg-card rounded-2xl p-5 border border-border/40 flex items-center gap-3">
              <b.icon size={22} className="text-primary flex-shrink-0" />
              <p className="font-heading font-semibold text-sm">{b.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">What Your Evening Looks Like</h2>
        <ol className="space-y-4">
          {[
            ["7:15 PM", "Doors open. Grab a drink at the bar. Say hi at the welcome desk."],
            ["7:30 PM", "Beginner Salsa class — no partner needed, full rotation, easy steps."],
            ["8:15 PM", "Beginner Bachata class — softer, more romantic, beginner-friendly."],
            ["9:00 PM", "Open social dancing — 50% Salsa, 50% Bachata, 100% friendly room."],
            ["11:00 PM", "Wrap up. Make plans for next week."],
          ].map(([time, what]) => (
            <li key={time} className="flex gap-4 items-start bg-card rounded-xl p-5 border border-border/40">
              <span className="font-heading font-bold text-primary flex-shrink-0 w-16">{time}</span>
              <p className="text-sm text-muted-foreground">{what}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Venue cards */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">Pick Your Night</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { day: "Monday", venue: "The George IV", area: "Chiswick · W4", time: "7:30–11pm", to: "/salsa-classes-chiswick", cta: "Mon · Chiswick →" },
            { day: "Tuesday", venue: "Drayton Court Hotel", area: "Ealing · W13", time: "6:50–11pm", to: "/salsa-classes-ealing", cta: "Tue · Ealing →" },
            { day: "Monthly Fri", venue: "Drayton Court Hotel", area: "Ealing · W13", time: "Latin Friday social", to: "/events", cta: "Latin Friday →" },
          ].map(v => (
            <Link to={v.to} key={v.day} className="bg-card rounded-2xl p-6 border border-border/40 card-hover block">
              <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2">{v.day}</p>
              <h3 className="font-display text-xl font-bold mb-1">{v.venue}</h3>
              <p className="text-muted-foreground text-sm mb-1">{v.area}</p>
              <p className="text-muted-foreground text-xs mb-4">{v.time}</p>
              <span className="text-primary font-heading text-sm font-semibold">{v.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">Latin Night Out FAQs</h2>
        <div className="space-y-4">
          {nightOutFaqs.map(f => (
            <details key={f.q} className="bg-card rounded-xl p-5 border border-border/40 group">
              <summary className="font-heading font-bold text-sm cursor-pointer list-none flex justify-between">
                {f.q}<span className="text-primary group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Make Tonight Different</h2>
        <p className="text-primary-foreground/80 mb-8 font-heading text-sm max-w-xl mx-auto">From £5. No partner. No experience. Just turn up — we'll do the rest.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/prices" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">See prices</Link>
          <Link to="/schedule" className="btn-cta bg-primary-foreground text-charcoal hover:opacity-90">See schedule</Link>
        </div>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/pura-nights", label: "Weekly Classes Overview" },
      { to: "/start-here", label: "First-Timer Guide" },
      { to: "/events", label: "Latin Friday Events" },
      { to: "/salsa-classes-chiswick", label: "Salsa Chiswick" },
      { to: "/bachata-classes-ealing", label: "Bachata Ealing" },
      { to: "/blog/best-salsa-nights-west-london", label: "Best Salsa Nights West London" },
    ]} />
  </Layout>
);

export default LatinNightOutWestLondon;
