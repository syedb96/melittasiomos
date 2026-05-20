import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import LastUpdated from "@/components/LastUpdated";
import AnswerBox from "@/components/AnswerBox";
import LocalTrustBlock from "@/components/LocalTrustBlock";

/* <!-- WIX PAGE: /latin-dance-ealing --> */

const faqs = [
  { q: "Where exactly are the Latin dance classes in Ealing?", a: "Drayton Court Hotel, 2 The Avenue, West Ealing W13 8PH — every Tuesday from 6:50 PM." },
  { q: "Is it just Salsa or Bachata too?", a: "Both. We teach Salsa AND Bachata every Tuesday, with the social splitting playlist 50/50." },
  { q: "Do you do other Latin styles like Kizomba or Reggaeton?", a: "Our weekly focus is Salsa & Bachata. Latin Friday socials sometimes feature guest Kizomba or Reggaeton DJs." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Service", "FAQPage"],
  name: "Latin Dance Ealing",
  provider: { "@type": "DanceSchool", name: "Pura Nights" },
  areaServed: { "@type": "Place", name: "Ealing, London" },
  mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const LatinDanceEaling = () => (
  <Layout>
    <SeoHead
      title="Latin Dance Ealing | Salsa, Bachata & Latin Fridays | Pura Nights"
      description="Latin dance in Ealing — weekly Salsa & Bachata classes Tuesdays at Drayton Court Hotel, plus Monthly Latin Fridays. Beginners welcome, no partner needed, from £5."
      path="/latin-dance-ealing"
      schema={schema}
      dateModified="2026-04-19"
    />

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Salsa · Bachata · Latin Fridays</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Latin Dance in Ealing</h1>
        <LastUpdated date="2026-04-19" />
        <p className="text-primary-foreground/70 text-base max-w-2xl mt-4">
          Ealing is West London's Latin dance capital — and Pura Nights is the heart of it. Every Tuesday we teach Salsa & Bachata at the Drayton Court Hotel, and every second Friday of the month we throw the now-famous Pura Nights Latin Friday social. Two reasons Ealing dancers never have a quiet week.
        </p>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl prose prose-sm md:prose-base">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">The Ealing Latin Dance Scene</h2>
        <p className="text-muted-foreground">Ealing has a thriving multicultural community and one of London's strongest weekly Latin dance scenes. Pura Nights anchors that scene with two complementary offerings: structured weekly classes for technique, and Monthly Latin Fridays for the full social experience. Both run from the Drayton Court Hotel — a beautiful Grade II-listed pub with a dedicated upstairs dance hall in the heart of West Ealing.</p>
        <p className="text-muted-foreground">Tuesday classes are split by level (Beginner, Improver, Intermediate) and led by Bachata UK Champion Melitta Siomos with her team of senior instructors. Monthly Latin Friday — held the second Friday of every month — features extended workshops, guest teachers, and a full DJ-led social running until late. Tickets typically £15 early bird, £18 on the door.</p>
        <h3 className="font-display text-xl font-bold mt-6 mb-3">Weekly Tuesday Schedule — Drayton Court Hotel</h3>
        <ul className="text-muted-foreground">
          <li>6:50 PM — Doors</li>
          <li>7:00–7:50 PM — Salsa class (split by level)</li>
          <li>7:50–8:40 PM — Bachata class (split by level)</li>
          <li>8:40–11:00 PM — Open social — 50% Salsa, 50% Bachata</li>
        </ul>
        <h3 className="font-display text-xl font-bold mt-6 mb-3">Monthly Latin Friday</h3>
        <p className="text-muted-foreground">Second Friday of every month. Full evening of workshops + social with rotating guest teachers. The biggest dedicated Latin night in West London — see the <Link to="/events" className="text-primary underline">Events page</Link> for upcoming dates and tickets.</p>
      </div>
    </section>

    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6 text-primary-foreground text-center">Ealing Latin Dance FAQs</h2>
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

    <RelatedPages title="More Ealing Pages" links={[
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/bachata-classes-ealing", label: "Bachata Classes Ealing" },
      { to: "/dance-classes-ealing", label: "All Dance Ealing" },
      { to: "/venue/the-drayton-court-ealing", label: "Drayton Court Venue Guide" },
      { to: "/events", label: "Latin Friday Events" },
      { to: "/prices", label: "Prices" },
    ]} />
  </Layout>
);

export default LatinDanceEaling;
