import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import LastUpdated from "@/components/LastUpdated";
import AnswerBox from "@/components/AnswerBox";
import LocalTrustBlock from "@/components/LocalTrustBlock";
import NearMeGrid from "@/components/NearMeGrid";
import ReviewVelocityTicker from "@/components/ReviewVelocityTicker";
import { REVIEW_VELOCITY_SNIPPETS } from "@/data/review-velocity";
import { CHISWICK_NEAR } from "@/data/near-me-areas";
import { Price } from "@/components/commerce/CommercePrimitives";

/* <!-- WIX PAGE: /latin-dance-chiswick --> */

const faqs = [
  { q: "Where are the Chiswick Latin dance classes?", a: "The George IV, 185 Chiswick High Rd, W4 2DR. Every Monday from 7:15 PM." },
  { q: "What styles do you teach?", a: "Salsa (On1 / LA style) and Bachata (Traditional + Sensual). We don't currently teach Kizomba weekly." },
  { q: "Is the Chiswick night good for beginners?", a: "Absolutely. Beginner stream restarts every single Monday — no catch-up needed." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Service", "FAQPage"],
  name: "Latin Dance Chiswick",
  provider: { "@type": "DanceSchool", name: "Pura Nights" },
  areaServed: { "@type": "Place", name: "Chiswick, London" },
  mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const LatinDanceChiswick = () => (
  <Layout>
    <SeoHead
      title="Latin Dance Chiswick | Weekly Salsa & Bachata Mondays | Pura Nights"
      description="Latin dance in Chiswick — every Monday at The George IV. Weekly Salsa & Bachata classes from 7:30 PM, open social until 11. Beginners welcome, no partner, from £5."
      path="/latin-dance-chiswick"
      schema={schema}
      dateModified="2026-04-19"
    />

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Salsa · Bachata · Mondays</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Latin Dance in Chiswick</h1>
        <LastUpdated date="2026-04-19" />
        <p className="text-primary-foreground/70 text-base max-w-2xl mt-4">
          Chiswick has become West London's Monday-night Latin dance home. Pura Nights at The George IV pulls in dancers from Chiswick, Hammersmith, Acton, Brentford and Kew every week — beginners, improvers and intermediates all on the same night.
        </p>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl prose prose-sm md:prose-base">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Why Chiswick Loves Pura Nights</h2>
        <p className="text-muted-foreground">Chiswick is famous for its village atmosphere, food scene and creative community — and Pura Nights has matched that energy with West London's most welcoming weekly Latin dance night. The George IV pub is a Chiswick institution, and its upstairs function room transforms into a polished dance floor every Monday from 7:15 PM. Award-winning Bachata UK Champion Melitta Siomos leads the teaching team, with classes split by level so you're always with the right group.</p>
        <p className="text-muted-foreground">The night isn't just classes. From 9 PM the open social runs until 11 PM with a 50/50 Salsa/Bachata playlist curated week by week. Many Chiswick regulars now treat Monday at The George IV as their fixed weekly social ritual — meeting the same friendly faces, sharing pre-class food downstairs, and dancing into the night.</p>
        <h3 className="font-display text-xl font-bold mt-6 mb-3">Monday Schedule</h3>
        <ul className="text-muted-foreground">
          <li>7:15 PM — Doors</li>
          <li>7:30–8:15 PM — Salsa class (Beginner / Improver / Intermediate)</li>
          <li>8:15–9:00 PM — Bachata class (Beginner / Improver / Intermediate)</li>
          <li>9:00–11:00 PM — Open social</li>
        </ul>
        <h3 className="font-display text-xl font-bold mt-6 mb-3">Pricing</h3>
        <ul className="text-muted-foreground">
          <li><Price slug="social-only" fallback="£5" showPrevious={false} /> — Social only</li>
          <li><Price slug="drop-in-class" fallback="£10" showPrevious={false} /> — One class + social</li>
          <li><Price slug="combined-class-social" fallback="£15" showPrevious={false} /> — Two classes + social (best value)</li>
          <li>Bundles from £42 (5 classes) — see <Link to="/prices" className="text-primary underline">/prices</Link></li>
        </ul>
      </div>
    </section>

    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6 text-primary-foreground text-center">Chiswick Latin Dance FAQs</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-charcoal-light rounded-xl p-5 border border-primary-foreground/10">
              <h3 className="font-heading font-bold text-primary-foreground text-sm mb-2">{f.q}</h3>
              <p className="text-primary-foreground/60 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="What's the best Latin dance night in Chiswick?"
          answer="The strongest weekly Latin dance night in Chiswick is Pura Nights at The George IV (185 Chiswick High Rd, W4 2DR) every Monday. Award-winning Bachata UK Champion Melitta Siomos teaches split-level Salsa and Bachata from 7:30 PM, followed by an open social to 11 PM. From £5, no partner needed."
          bullets={["Mon · The George IV · W4 2DR — doors 7:15 PM", "Split-level Salsa + Bachata classes", "9–11 PM open social, 50/50 playlist", "From £5 social-only, £10 class + social"]}
          cta={{ label: "See Monday schedule", to: "/schedule" }}
          tone="warm"
        />
      </div>
    </section>

    <LocalTrustBlock
      area="Chiswick"
      nearestVenue="The George IV, 185 Chiswick High Rd, W4 2DR"
      venuePath="/venue/the-george-iv-chiswick"
      travel="Turnham Green station — 5 min walk. Free street parking after 6:30 PM."
      bestNight="Mondays — Salsa 7:30, Bachata 8:15, social 9–11 PM."
      suits="Chiswick locals from W4, plus regulars from Hammersmith, Acton, Kew and Brentford."
      proof="Monday at The George IV is the highlight of my week. Five years in and I still walk home grinning."
      proofAttribution="Helena · Chiswick W4"
    />

    <ReviewVelocityTicker snippets={REVIEW_VELOCITY_SNIPPETS} />
    <NearMeGrid
      title="Pura Nights near you (Chiswick)"
      areas={CHISWICK_NEAR}
    />
    <RelatedPages title="More Chiswick Pages" links={[
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/bachata-classes-chiswick", label: "Bachata Classes Chiswick" },
      { to: "/dance-classes-chiswick", label: "All Dance Chiswick" },
      { to: "/venue/the-george-iv-chiswick", label: "The George IV Venue Guide" },
      { to: "/blog/best-salsa-nights-west-london", label: "Best Salsa Nights West London" },
      { to: "/prices", label: "Prices" },
    ]} />
  </Layout>
);

export default LatinDanceChiswick;
