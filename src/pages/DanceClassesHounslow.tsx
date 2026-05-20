import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import AnswerBox from "@/components/AnswerBox";
import LastUpdated from "@/components/LastUpdated";
import LocalTrustBlock from "@/components/LocalTrustBlock";

/* <!-- WIX PAGE: /dance-classes-hounslow --> */

const faqs = [
  { q: "Are there dance classes in Hounslow?", a: "Hounslow's nearest weekly Salsa & Bachata classes are at our Tuesday venue in Ealing (Drayton Court Hotel) — easy 15-min Piccadilly Line trip." },
  { q: "Can I bring a friend?", a: "Yes. Many Hounslow regulars arrive in pairs or groups. The social atmosphere makes everyone welcome." },
  { q: "What's the price?", a: "From £5 for the social only, £10 for class + social, £15 for two classes + social. Bundles bring it down to under £8 per class." },
  { q: "Do I need a partner?", a: "No — partners rotate every few minutes during class. Most Hounslow regulars come solo." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Service", "FAQPage"],
  name: "Dance Classes for Hounslow Residents",
  provider: { "@type": "DanceSchool", name: "Pura Nights" },
  areaServed: [{ "@type": "Place", name: "Hounslow" }, { "@type": "Place", name: "Isleworth" }, { "@type": "Place", name: "Feltham" }],
  mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const DanceClassesHounslow = () => (
  <Layout>
    <SeoHead
      title="Dance Classes Hounslow | Salsa & Bachata Near Hounslow | Pura Nights"
      description="Latin dance classes for Hounslow, Isleworth & Feltham residents — every Tuesday in West Ealing. Award-winning Salsa & Bachata, beginners welcome."
      path="/dance-classes-hounslow"
      schema={schema}
      dateModified="2026-04-19"
    />

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Dance near Hounslow, Isleworth & Feltham</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Dance Classes for Hounslow Residents</h1>
        <LastUpdated date="2026-04-19" />
        <p className="text-primary-foreground/70 text-base max-w-2xl mt-4">
          Hounslow's nearest dedicated weekly Salsa & Bachata class is Pura Nights at the Drayton Court Hotel, West Ealing — every Tuesday from 7:00 PM. A short Piccadilly Line trip or 12-min drive away.
        </p>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl prose prose-sm md:prose-base">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Why Hounslow Dancers Choose Pura Nights</h2>
        <p className="text-muted-foreground">Hounslow has long had limited options for high-quality, weekly Latin dance teaching. Pura Nights fills that gap with two consistent venues across the week. Tuesday at the Drayton Court Hotel in Ealing is the easiest commute for Hounslow, Isleworth, Feltham and Hatton residents — under 20 minutes by tube or car.</p>
        <p className="text-muted-foreground">Each Tuesday evening features structured classes split by experience level — Beginner, Improver, Intermediate — followed by an open social with both Salsa and Bachata music. Doors open at 6:50 PM and the night runs until 11 PM. Bachata UK Champion Melitta Siomos and her senior team teach across both nights, so you're learning from international-standard instructors regardless of your level.</p>
        <h3 className="font-display text-xl font-bold mt-6 mb-3">Perfect for Hounslow Beginners</h3>
        <ul className="text-muted-foreground">
          <li>Beginner stream restarts every Tuesday — drop in any week.</li>
          <li>No partner needed — partner rotation throughout class.</li>
          <li>Drop-in pricing or bundles for regular Hounslow commuters.</li>
          <li>Drayton Court has its own pub — pre-class meal and after-class drinks all in one venue.</li>
        </ul>
      </div>
    </section>

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-6">Getting Here from Hounslow</h2>
        <p className="text-primary-foreground/70 mb-3"><strong className="text-primary-foreground">By Train:</strong> Hounslow → West Ealing via Elizabeth Line (~15 min). 7-min walk to Drayton Court Hotel.</p>
        <p className="text-primary-foreground/70"><strong className="text-primary-foreground">By Car:</strong> Via the A4 — typically 12–15 minutes. Free parking on residential streets after 6:30 PM.</p>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6 text-center">Hounslow FAQs</h2>
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
    {/* AI/GEO Answer Block */}
    {/* <!-- WIX SECTION: AnswerBox — replicate as Strip with H3 + paragraph + bullets + CTA --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="Are there dance classes in Hounslow?"
          answer="Hounslow's nearest dedicated weekly Salsa & Bachata class is Pura Nights at the Drayton Court Hotel, West Ealing — every Tuesday from 7 PM. A 15-minute Elizabeth Line trip or 12-minute drive away."
          bullets={["Hounslow → West Ealing: 15 min Elizabeth Line", "Tue 7 PM Beginners · Improver · Intermediate · Social", "Drop-in £10 · bundles from £42 for 5 classes", "Pub on-site — pre-class meal and after-class drinks"]}
          cta={{ label: "Plan your Tuesday", to: "/dance-classes-ealing" }}
          tone="warm"
        />
      </div>
    </section>


    <RelatedPages title="Explore More" links={[
      { to: "/pura-nights", label: "Pura Nights", desc: "Weekly Latin nights" },
      { to: "/schedule", label: "Schedule", desc: "Mon & Tue weekly" },
      { to: "/prices", label: "Prices", desc: "Drop-in & bundles" },
      { to: "/venue/the-drayton-court-ealing", label: "Drayton Court Ealing", desc: "Tuesday venue" },
      { to: "/start-here", label: "Start Here", desc: "First-timer guide" },
      { to: "/bachata-classes-ealing", label: "Bachata Ealing", desc: "Tuesday Bachata" },
    ]} />
  </Layout>
);

export default DanceClassesHounslow;
