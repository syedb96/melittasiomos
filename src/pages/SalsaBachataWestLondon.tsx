import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import PartnerCTA from "@/components/PartnerCTA";
import ClassMatchBlock from "@/components/ClassMatchBlock";

const AREAS = [
  ["Chiswick", "/salsa-classes-chiswick", "Monday weekly classes at The George IV — main hub."],
  ["Ealing", "/salsa-classes-ealing", "Tuesday weekly classes at Drayton Court — second hub."],
  ["Acton", "/salsa-classes-acton", "Closest to Chiswick — 10 min by bus or bike."],
  ["Hammersmith", "/salsa-classes-hammersmith", "Direct District/Piccadilly to Chiswick."],
  ["Shepherd's Bush", "/salsa-classes-shepherds-bush", "Overground to Chiswick / Acton."],
  ["Richmond", "/salsa-classes-richmond", "Drayton Court is your nearest venue."],
  ["Kew", "/salsa-classes-kew", "Bridge to Chiswick in minutes."],
  ["Brentford", "/salsa-classes-brentford", "Closest mainline stop to Ealing."],
  ["Barnes", "/salsa-classes-barnes", "Hammersmith Bridge to Chiswick."],
  ["Putney", "/salsa-classes-putney", "Easy hop via Hammersmith."],
  ["Fulham", "/salsa-classes-fulham", "Direct to Hammersmith → Chiswick."],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where in West London does Pura Nights run weekly classes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pura Nights runs weekly Salsa and Bachata classes in Chiswick (Mondays at The George IV) and Ealing (Tuesdays at Drayton Court). All other West London areas are served by travel access, plus private, corporate and wedding bookings.",
      },
    },
    {
      "@type": "Question",
      name: "Which Pura Nights venue should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chiswick (Monday) suits beginners coming from Hammersmith, Acton and Shepherd's Bush. Ealing (Tuesday) suits beginners coming from Richmond, Brentford, Hanwell and Greenford. Both are beginner-friendly and you can attend either or both.",
      },
    },
    {
      "@type": "Question",
      name: "Can I learn salsa and bachata in West London without a partner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every Pura Nights class is open to solo dancers. We rotate partners during class so everyone gets practice — no partner required.",
      },
    },
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Salsa & Bachata in West London — Pura Nights",
  url: "https://www.puranights.com/salsa-bachata-west-london",
  description:
    "Where to learn salsa and bachata across West London — honest guide to Pura Nights' Chiswick and Ealing venues plus private and corporate options nearby.",
};

/* <!-- WIX SECTION: West London Hub — regional discovery page. Replicate as Strips:
       Hero, AnswerBox row, Areas Grid, How to get to venues, Service options, FAQ, Related. --> */
const SalsaBachataWestLondon = () => (
  <Layout>
    <SeoHead
      title="Salsa & Bachata in West London — Classes, Venues & Travel | Pura Nights"
      description="Honest guide to learning salsa and bachata across West London. Weekly classes in Chiswick and Ealing, plus private, corporate and wedding options nearby."
      path="/salsa-bachata-west-london"
      schema={schema}
    />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-4xl text-center">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">
          West London Hub
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
          Salsa &amp; Bachata in West London
        </h1>
        <p className="text-base md:text-lg text-primary-foreground/70 font-heading max-w-2xl mx-auto">
          One honest guide — where Pura Nights runs weekly classes, how to get there, and what
          to do if you live a little further out.
        </p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-main max-w-4xl grid md:grid-cols-2 gap-5">
        <AnswerBox
          question="Best for beginners"
          answer="Both Monday Chiswick and Tuesday Ealing are beginner-friendly. No partner needed — we rotate so everyone dances. Arrive 10 minutes early."
          cta={{ label: "Start here", to: "/start-here" }}
        />
        <AnswerBox
          question="Best for coming alone"
          answer="Most students arrive alone. The class warms up together, partners rotate every few minutes and the social culture is welcoming."
          cta={{ label: "Your first class", to: "/your-first-class" }}
        />
        <AnswerBox
          question="Best for social dancing"
          answer="After class, the floor opens. Monthly Latin Friday at Drayton Court is the flagship West London Latin social."
          cta={{ label: "Latin Friday", to: "/latin-friday" }}
        />
        <AnswerBox
          question="Best for couples & weddings"
          answer="For first-dance choreography or anniversary lessons, book a private session — bespoke to your song and timeline."
          cta={{ label: "Wedding dance", to: "/wedding-dance" }}
        />
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <h2 className="font-display text-3xl font-bold mb-2">Areas we serve</h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-2xl">
          Weekly classes run in <strong>Chiswick</strong> and <strong>Ealing</strong>. Nearby
          areas are served by travel access plus private, corporate and wedding bookings.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {AREAS.map(([name, href, blurb]) => (
            <Link
              key={name}
              to={href}
              className="rounded-xl border border-border/60 bg-card p-4 hover:border-primary/60 transition-colors"
            >
              <p className="font-heading font-bold text-base mb-1">{name}</p>
              <p className="text-xs text-muted-foreground">{blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-6">How to get to our venues</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <p className="font-heading font-bold mb-2">Chiswick · Mondays</p>
            <p className="text-sm text-muted-foreground mb-3">
              The George IV, 185 Chiswick High Rd, W4 2DR. Turnham Green tube · buses 27/237/267
              · free street parking from 19:30.
            </p>
            <Link to="/venue/the-george-iv-chiswick" className="text-primary text-sm font-semibold hover:underline">
              Venue details →
            </Link>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <p className="font-heading font-bold mb-2">Ealing · Tuesdays</p>
            <p className="text-sm text-muted-foreground mb-3">
              The Drayton Court Hotel, 2 The Avenue, W13 8PH. West Ealing rail · buses 207/E1/E2
              · venue car park.
            </p>
            <Link to="/venue/the-drayton-court-ealing" className="text-primary text-sm font-semibold hover:underline">
              Venue details →
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-4">Private, corporate &amp; wedding options across West London</h2>
        <p className="text-muted-foreground mb-6">
          Live further out, or want a bespoke session? We deliver across West London:
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm">
          <li><Link to="/private-lessons" className="text-primary hover:underline">Private lessons →</Link></li>
          <li><Link to="/wedding-dance" className="text-primary hover:underline">Wedding first dance →</Link></li>
          <li><Link to="/corporate-dance-classes-london" className="text-primary hover:underline">Corporate sessions →</Link></li>
          <li><Link to="/private-group-dance-parties-london" className="text-primary hover:underline">Hen &amp; group parties →</Link></li>
        </ul>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((q) => (
            <AnswerBox key={q.name} question={q.name} answer={q.acceptedAnswer.text} />
          ))}
        </div>
      </div>
    </section>

    <PartnerCTA compact />
  </Layout>
);

export default SalsaBachataWestLondon;
