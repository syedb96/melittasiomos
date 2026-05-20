import { Link } from "react-router-dom";
import { MapPin, Train, Car } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import AnswerBox from "@/components/AnswerBox";
import LastUpdated from "@/components/LastUpdated";
import LocalTrustBlock from "@/components/LocalTrustBlock";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX PAGE: /salsa-classes-richmond -->
   <!-- WIX SECTION: Hero, Schedule, Why Richmond, Getting There, FAQ, CTA --> */

const faqs = [
  { q: "Are there salsa classes in Richmond itself?", a: "Our nearest weekly classes are in Chiswick (Mon) and Ealing (Tue) — both a short drive or train ride from Richmond. Many Richmond and Kew dancers come to The George IV, Chiswick because it's only 15 minutes by car." },
  { q: "How long does it take to get from Richmond to our Chiswick venue?", a: "Approximately 15 minutes by car or 25 minutes via Richmond → Turnham Green on the District Line." },
  { q: "Do I need a partner?", a: "Never. We rotate partners every class, and many Richmond students arrive solo." },
  { q: "How much does the first class cost?", a: "From £10 for one class plus the social. Bundles save further — see /prices." },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": ["Service", "FAQPage"],
    name: "Salsa Classes for Richmond Residents",
    provider: { "@type": "DanceSchool", name: "Pura Nights — Melitta Siomos Dance Academy" },
    areaServed: [{ "@type": "Place", name: "Richmond, London" }, { "@type": "Place", name: "Kew" }, { "@type": "Place", name: "Twickenham" }],
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.puranights.com/locations" },
      { "@type": "ListItem", position: 3, name: "Salsa Classes Richmond", item: "https://www.puranights.com/salsa-classes-richmond" },
    ],
  },
];

const SalsaClassesRichmond = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes for Richmond | Nearest Weekly Latin Dance | Pura Nights"
      description="Looking for Salsa classes near Richmond? Pura Nights runs weekly Salsa & Bachata in Chiswick (Mon) and Ealing (Tue) — easy 15-min trip from Richmond. Beginners welcome, no partner needed."
      path="/salsa-classes-richmond"
      schema={schema}
      dateModified="2026-04-19"
    />

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Salsa near Richmond, Kew & Twickenham</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Salsa Classes for Richmond Residents</h1>
          <LastUpdated date="2026-04-19" />
          <p className="text-primary-foreground/70 text-base max-w-2xl mt-4">
            Richmond, Kew and Twickenham residents — your nearest weekly Salsa & Bachata classes are just 15 minutes away in Chiswick. Pura Nights, led by Bachata UK Champion Melitta Siomos, has been West London's most welcoming Latin dance home since 2017.
          </p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl prose prose-sm md:prose-base">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Why Richmond Dancers Travel to Pura Nights</h2>
        <p className="text-muted-foreground">Richmond doesn't have a dedicated weekly Salsa & Bachata venue with the same depth of teaching that Pura Nights offers. That's why dancers from Richmond, Kew, Twickenham, St Margarets, Mortlake, Barnes and Hampton make the short trip to our Chiswick Monday or Ealing Tuesday classes every week. The reward: classes split by level, professional instruction, a polished social with great music, and a community where you'll be welcomed by name from week two.</p>
        <p className="text-muted-foreground">Whether you've never danced before or you're returning to the floor after a break, our Beginner stream restarts every Monday and Tuesday, so you can join at any time. Improvers and Intermediates train on the same evenings — so you're never stuck at one level. The social from 9pm splits Salsa and Bachata 50/50, giving Richmond dancers the most rounded weekly Latin night in West London.</p>
        <h3 className="font-display text-xl font-bold mt-6 mb-3">What Makes Us Different</h3>
        <ul className="text-muted-foreground">
          <li><strong>Award-winning instruction</strong> — taught by Bachata UK Champion Melitta Siomos and 7 senior instructors.</li>
          <li><strong>No partner needed</strong> — we rotate every class so solo dancers thrive.</li>
          <li><strong>Drop-in friendly</strong> — no membership, no commitment. Pay £10 per class or bundle for savings.</li>
          <li><strong>Walking-distance pubs</strong> — both venues are inside vibrant pubs (The George IV in Chiswick, Drayton Court in Ealing) so you can grab dinner first.</li>
        </ul>
      </div>
    </section>

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-6">Getting From Richmond to Class</h2>
        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          <StaggerItem>
            <div className="bg-charcoal-light p-6 rounded-2xl border border-primary-foreground/10">
              <Train size={20} className="text-primary mb-3" />
              <h3 className="font-heading font-bold text-primary-foreground mb-2">By Train (~25 min)</h3>
              <p className="text-primary-foreground/60 text-sm">Richmond → Turnham Green via District Line. The George IV is a 5-min walk from Turnham Green tube. Trains run every 6–8 minutes in the evening.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-charcoal-light p-6 rounded-2xl border border-primary-foreground/10">
              <Car size={20} className="text-primary mb-3" />
              <h3 className="font-heading font-bold text-primary-foreground mb-2">By Car (~15 min)</h3>
              <p className="text-primary-foreground/60 text-sm">Drive via Kew Bridge or Chiswick Bridge. On-street parking on Chiswick High Rd is free after 6:30 PM most evenings.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6 text-center">Richmond FAQs</h2>
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
        <p className="text-primary-foreground/80 text-sm mb-6">Drop in this Monday in Chiswick or Tuesday in Ealing. From £10.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Class</a>
          <Link to="/start-here" className="btn-cta-dark text-sm">New to Dancing?</Link>
        </div>
      </div>
    </section>
    {/* AI/GEO Answer Block */}
    {/* <!-- WIX SECTION: AnswerBox — replicate as Strip with H3 + paragraph + bullets + CTA --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="Where can Richmond residents learn Salsa & Bachata?"
          answer="Richmond's closest weekly Latin class is Pura Nights at the George IV in Chiswick (Monday) — 12 minutes via the District Line, or 15 minutes by car. Beginners through Intermediate, plus open social to 11 PM."
          bullets={["Richmond → Turnham Green: 12 min District Line direct", "Mon Chiswick (W4) · Tue Ealing (W13)", "No partner, no booking — just turn up", "Free street parking after 6:30 PM at both venues"]}
          cta={{ label: "See Monday Chiswick", to: "/dance-classes-chiswick" }}
          tone="ivory"
        />
      </div>
    </section>


    <LocalTrustBlock
      area="Richmond"
      nearestVenue="The George IV, Chiswick W4 (Mon)"
      venuePath="/venue/the-george-iv-chiswick"
      travel="Richmond → Turnham Green in 12 min direct on the District Line, or 15 min by car."
      bestNight="Monday in Chiswick — easy post-work commute, riverside drive home."
      suits="Richmond, Kew and St Margarets professionals and couples — many drive together."
      proof="Twelve minutes door-to-door from Richmond. I tried it once on a whim and now Monday night belongs to Pura."
      proofAttribution="Sophie · Richmond regular"
    />

    <RelatedPages title="Explore More" links={[
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick", desc: "Mon · The George IV" },
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing", desc: "Tue · Drayton Court" },
      { to: "/dance-classes-south-west-london", label: "South West London", desc: "Area overview" },
      { to: "/start-here", label: "Start Here", desc: "New to dancing?" },
      { to: "/prices", label: "Prices", desc: "Bundles & drop-in" },
      { to: "/contact", label: "Contact Melitta", desc: "Ask anything" },
    ]} />
  </Layout>
);

export default SalsaClassesRichmond;
