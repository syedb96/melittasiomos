import { Link } from "react-router-dom";
import { Train, Car } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import LastUpdated from "@/components/LastUpdated";

/* <!-- WIX PAGE: /salsa-classes-hammersmith --> */

const faqs = [
  { q: "Where's the nearest weekly Salsa class to Hammersmith?", a: "The George IV in Chiswick (Mon) — just 4 stops on the District Line from Hammersmith to Turnham Green, or 10 minutes by car." },
  { q: "Are there Bachata classes too?", a: "Yes — every Monday and Tuesday we teach both Salsa and Bachata, split by level." },
  { q: "Can I drop in without booking?", a: "Yes. No booking needed for weekly classes — just turn up and pay at the door (from £5)." },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": ["Service", "FAQPage"],
    name: "Salsa Classes for Hammersmith Residents",
    provider: { "@type": "DanceSchool", name: "Pura Nights" },
    areaServed: [{ "@type": "Place", name: "Hammersmith, London" }, { "@type": "Place", name: "Shepherd's Bush" }, { "@type": "Place", name: "Fulham" }],
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.puranights.com/locations" },
      { "@type": "ListItem", position: 3, name: "Salsa Classes Hammersmith", item: "https://www.puranights.com/salsa-classes-hammersmith" },
    ],
  },
];

const SalsaClassesHammersmith = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes Hammersmith | Pura Nights West London | Melitta Siomos"
      description="Salsa & Bachata classes near Hammersmith — every Monday in Chiswick (10 mins by tube). Award-winning instruction, no partner needed, drop-in from £10."
      path="/salsa-classes-hammersmith"
      schema={schema}
      dateModified="2026-04-19"
    />

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Salsa near Hammersmith, Shepherd's Bush & Fulham</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Salsa Classes for Hammersmith Residents</h1>
        <LastUpdated date="2026-04-19" />
        <p className="text-primary-foreground/70 text-base max-w-2xl mt-4">
          Hammersmith's closest weekly Salsa & Bachata night is Pura Nights at The George IV, Chiswick — just 4 District Line stops away. Joined by dancers from Shepherd's Bush, Fulham and West Kensington every Monday.
        </p>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl prose prose-sm md:prose-base">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Hammersmith to Pura Nights — The Easy Trip</h2>
        <p className="text-muted-foreground">Hammersmith is a key transport hub but doesn't yet host a dedicated weekly Salsa & Bachata night with split-level teaching. That's why hundreds of Hammersmith, Shepherd's Bush and Fulham locals make the 10-minute trip to The George IV in Chiswick every Monday. The District Line drops you 5 minutes from the door at Turnham Green, and the venue's Tuesday sister night runs at Drayton Court Hotel in Ealing if your week looks different.</p>
        <p className="text-muted-foreground">Pura Nights is taught by Melitta Siomos — Bachata UK Champion and West London's most respected Latin dance instructor. Classes are split by level (Beginner, Improver, Intermediate) so you'll always be in the right room. Doors open at 7:15 PM, classes run 7:30–9 PM, and the open social runs until 11 PM with 50% Salsa and 50% Bachata in the playlist.</p>
        <h3 className="font-display text-xl font-bold mt-6 mb-3">What to Expect on Your First Night</h3>
        <ul className="text-muted-foreground">
          <li>Arrive 7:15 PM, pay at the door (£5–£15 depending on what you join).</li>
          <li>Beginners stream restarts every week — no catch-up needed.</li>
          <li>Partner rotation throughout class — no need to bring anyone.</li>
          <li>Stay for the social to practise what you learned.</li>
        </ul>
      </div>
    </section>

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-6">Getting Here from Hammersmith</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-charcoal-light p-6 rounded-2xl border border-primary-foreground/10">
            <Train size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold text-primary-foreground mb-2">By Tube (~10 min)</h3>
            <p className="text-primary-foreground/60 text-sm">Hammersmith → Turnham Green on the District Line. 5-min walk to The George IV.</p>
          </div>
          <div className="bg-charcoal-light p-6 rounded-2xl border border-primary-foreground/10">
            <Car size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold text-primary-foreground mb-2">By Car (~12 min)</h3>
            <p className="text-primary-foreground/60 text-sm">Via Chiswick High Rd. Free street parking after 6:30 PM.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6 text-center">Hammersmith FAQs</h2>
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

    <section className="py-12 text-center bg-primary">
      <div className="container-main">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">Ready to Try a Class?</h2>
        <p className="text-primary-foreground/80 text-sm mb-6">Hammersmith → Chiswick is just 10 minutes. From £10.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Class</a>
          <Link to="/start-here" className="btn-cta-dark text-sm">Start Here</Link>
        </div>
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick", desc: "Your nearest venue" },
      { to: "/bachata-classes-west-london", label: "Bachata West London", desc: "All Bachata classes" },
      { to: "/dance-classes-west-london", label: "Dance West London", desc: "Area overview" },
      { to: "/prices", label: "Prices", desc: "Drop-in & bundles" },
      { to: "/start-here", label: "Start Here", desc: "First-timer guide" },
      { to: "/contact", label: "Contact", desc: "Ask anything" },
    ]} />
  </Layout>
);

export default SalsaClassesHammersmith;
