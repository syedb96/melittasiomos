import { Link } from "react-router-dom";
import { Train, Car, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import AnswerBox from "@/components/AnswerBox";
import LastUpdated from "@/components/LastUpdated";
import LocalTrustBlock from "@/components/LocalTrustBlock";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import NearMeGrid from "@/components/NearMeGrid";
import ReviewVelocityTicker from "@/components/ReviewVelocityTicker";
import { REVIEW_VELOCITY_SNIPPETS } from "@/data/review-velocity";
import { CHISWICK_NEAR } from "@/data/near-me-areas";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: /salsa-classes-fulham --> */

const faqs = [
  { q: "What's the closest salsa class to Fulham?", a: "The George IV in Chiswick on Mondays — just 12 minutes from Fulham Broadway via the District line to Turnham Green. On Tuesdays, Drayton Court Hotel in Ealing is around 25 minutes door-to-door." },
  { q: "Do I need to book in advance?", a: "No. Drop in any Monday or Tuesday. Pay on the door from £10 or buy ahead via Ticket Tailor." },
  { q: "Do I need a partner?", a: "Never. We rotate partners every class so solo dancers are looked after from the moment they arrive." },
  { q: "Are there evening parking options near the Chiswick venue?", a: "Yes — most parking on Chiswick High Road is free after 6:30 PM. The pub also has a side car park with limited evening spaces." },
  { q: "What level should a complete beginner choose?", a: "Always start with the Beginners class (7:30 PM Mon, 7:30 PM Tue). It restarts a fresh foundation every single week, so you'll never be lost." },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": ["Service", "FAQPage"],
    name: "Salsa Classes for Fulham Residents",
    provider: { "@type": "DanceSchool", name: "Pura Nights — Melitta Siomos Dance Academy" },
    areaServed: [{ "@type": "Place", name: "Fulham, London" }, { "@type": "Place", name: "Parsons Green" }, { "@type": "Place", name: "Sands End" }],
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.puranights.com/locations" },
      { "@type": "ListItem", position: 3, name: "Salsa Classes Fulham", item: "https://www.puranights.com/salsa-classes-fulham" },
    ],
  },
];

const SalsaClassesFulham = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes Near Fulham | Pura Nights West London"
      description="Salsa classes near Fulham — Chiswick is just 3 stops on the District line. No partner needed, all levels welcome, from £10. Award-winning Latin dance teaching."
      path="/salsa-classes-fulham"
      schema={schema}
      dateModified="2026-04-19"
    />

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Salsa near Fulham, Parsons Green & Sands End</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Salsa Classes Near Fulham — Just 3 Stops to Chiswick</h1>
          <LastUpdated date="2026-04-19" />
          <p className="text-primary-foreground/70 text-base max-w-2xl mt-4">
            Fulham dancers — your nearest weekly Salsa & Bachata home is a 12-minute District line ride away. Pura Nights, led by Bachata UK Champion Melitta Siomos, runs the most welcoming Latin dance nights in West London every Monday in Chiswick and every Tuesday in Ealing.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book a Class — From £10</a>
            <Link to="/start-here" className="btn-cta-outline text-sm">New to Dance?</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Why Fulham Dancers Travel to Pura Nights</h2>
        <p className="text-muted-foreground mb-4">Fulham is brilliant for restaurants, riverside walks and Sunday roasts — but for a serious weekly Salsa & Bachata habit, dancers from SW6 and SW10 travel north on the District line to Chiswick. The reward: classes split by level, professional instruction, a polished social with great music, and a community where you'll be welcomed by name from week two.</p>
        <p className="text-muted-foreground">Beginners restart fresh every Monday and Tuesday. Improvers and Intermediates train alongside, so you can grow without ever switching schools. The 9 PM social splits 50/50 between Salsa and Bachata — exactly the rounded weekly Latin night Fulham dancers have been asking for.</p>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <div className="bg-card p-6 rounded-2xl border border-border">
            <MapPin size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold text-base mb-2">Monday — Chiswick</h3>
            <p className="text-muted-foreground text-sm">The George IV, 185 Chiswick High Rd, W4 2DR. 7:30 PM until late. £10 drop-in.</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border">
            <MapPin size={20} className="text-peach mb-3" />
            <h3 className="font-heading font-bold text-base mb-2">Tuesday — Ealing</h3>
            <p className="text-muted-foreground text-sm">Drayton Court Hotel, 2 The Avenue, W13 8PH. 6:50 PM ladies styling + 7:30 PM classes. £10 drop-in.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-6">Getting From Fulham to Class</h2>
        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          <StaggerItem>
            <div className="bg-charcoal-light p-6 rounded-2xl border border-primary-foreground/10">
              <Train size={20} className="text-primary mb-3" />
              <h3 className="font-heading font-bold text-primary-foreground mb-2">By Tube (~12 min)</h3>
              <p className="text-primary-foreground/60 text-sm">Fulham Broadway → Turnham Green via District line, direction Richmond/Ealing Broadway. The George IV is a 5-min walk.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-charcoal-light p-6 rounded-2xl border border-primary-foreground/10">
              <Car size={20} className="text-primary mb-3" />
              <h3 className="font-heading font-bold text-primary-foreground mb-2">By Car (~15 min)</h3>
              <p className="text-primary-foreground/60 text-sm">A4/Hammersmith Bridge to Chiswick. Free parking on Chiswick High Rd after 6:30 PM most evenings.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6 text-center">Fulham FAQs</h2>
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
        <p className="text-primary-foreground/80 text-sm mb-6">Drop in this Monday in Chiswick — only 12 minutes from Fulham. From £10.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book a Class</a>
          <a {...waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", "SalsaClassesFulham:135")} className="btn-cta-dark text-sm">💬 WhatsApp Melitta</a>
        </div>
      </div>
    </section>
    {/* AI/GEO Answer Block */}
    {/* <!-- WIX SECTION: AnswerBox — replicate as Strip with H3 + paragraph + bullets + CTA --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="Are there Salsa classes near Fulham?"
          answer="Fulham residents reach Pura Nights' Chiswick venue in 15–20 minutes via the District Line or A4. Weekly classes Monday at the George IV (Chiswick) and Tuesday at the Drayton Court (Ealing). Solo dancers welcome."
          bullets={["Fulham Broadway → Turnham Green: 12 min District Line", "Mon Chiswick · Tue Ealing — drop-in, no partner needed", "Beginners stream restarts every week from zero", "Bachata UK Champion Melitta Siomos teaches both nights"]}
          cta={{ label: "Plan your first class", to: "/start-here" }}
          tone="ivory"
        />
      </div>
    </section>


    <LocalTrustBlock
      area="Fulham"
      nearestVenue="The George IV, Chiswick W4 (Mon)"
      venuePath="/venue/the-george-iv-chiswick"
      travel="Fulham Broadway → Turnham Green in 12 min on the District Line, or 15 min by car via the A4."
      bestNight="Monday in Chiswick — Salsa + Bachata classes plus open social to 11 PM."
      suits="Fulham, Parsons Green and West Ken locals — including a lot of professionals dancing after work."
      proof="I came in expecting awkward — left with five new friends and a Tuesday-Ealing habit too. The teaching is genuinely world-class."
      proofAttribution="James · Fulham Broadway"
    />

    <ReviewVelocityTicker snippets={REVIEW_VELOCITY_SNIPPETS} />
    <NearMeGrid
      title="Pura Nights near you (Fulham)"
      areas={CHISWICK_NEAR}
    />
    <RelatedPages title="Explore More" links={[
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick", desc: "Mon · The George IV" },
      { to: "/salsa-classes-hammersmith", label: "Salsa Hammersmith", desc: "Same line, 2 stops further" },
      { to: "/dance-classes-west-london", label: "West London Pillar", desc: "Full area overview" },
      { to: "/start-here", label: "Start Here", desc: "New to dancing?" },
      { to: "/prices", label: "Prices", desc: "Bundles & drop-in" },
      { to: "/contact", label: "Contact Melitta", desc: "Ask anything" },
    ]} />
  </Layout>
);

export default SalsaClassesFulham;
