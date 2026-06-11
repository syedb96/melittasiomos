import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import EnquiryForm from "@/components/EnquiryForm";
import { waCustom } from "@/lib/whatsapp";

const WA_CORPORATE =
  waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", "LatinDanceCorporateEventsLondon:8").href +
  encodeURIComponent(
    "Hi Melitta, I'd like a quote for a Latin dance corporate session for our team. Could you send options?"
  );

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Latin Dance Corporate Events",
  provider: {
    "@type": "Organization",
    name: "Pura Nights — Melitta Siomos Dance Academy",
    url: "https://www.puranights.com",
  },
  areaServed: { "@type": "City", name: "London" },
  description:
    "Salsa and Bachata corporate sessions for London teams: tasters, team-building, wellbeing workshops, office socials, Christmas and summer parties.",
  url: "https://www.puranights.com/latin-dance-corporate-events-london",
  offers: {
    "@type": "Offer",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long is a corporate Latin dance session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most corporate sessions run 45–90 minutes depending on goal — taster, team-building or full social. We tailor format to your team size and venue.",
      },
    },
    {
      "@type": "Question",
      name: "Where can you deliver corporate sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We deliver across London — your office, a hired venue, or one of our partner venues in Chiswick and Ealing.",
      },
    },
    {
      "@type": "Question",
      name: "Do attendees need experience or partners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No experience and no partners required. Sessions are designed to be inclusive, beginner-friendly and energising.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle Christmas and summer parties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Christmas parties, summer socials, away days and client entertainment are a major part of our calendar — book early for December.",
      },
    },
  ],
};

/* <!-- WIX SECTION: Corporate Hub — commercial lead page. Strips:
       Hero, formats grid, what's included, who it's for, EnquiryForm, FAQ, Related. --> */
const LatinDanceCorporateEventsLondon = () => (
  <Layout>
    <SeoHead
      title="Latin Dance Corporate Events London — Salsa & Bachata for Teams | Pura Nights"
      description="Latin dance corporate events in London. Salsa and Bachata tasters, team-building, wellbeing workshops, Christmas and summer parties — delivered at your office or venue."
      path="/latin-dance-corporate-events-london"
      schema={serviceSchema}
    />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-4xl text-center">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">
          Corporate &amp; Team Events
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
          Latin Dance Corporate Events in London
        </h1>
        <p className="text-base md:text-lg text-primary-foreground/70 font-heading max-w-2xl mx-auto mb-6">
          Salsa and Bachata sessions that bring teams together — beginner-friendly, energising
          and led by championship-level instructors.
        </p>
        <a
          href={WA_CORPORATE}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-primary text-sm inline-flex"
        >
          Get a quote →
        </a>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-main max-w-5xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Formats we deliver</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["Corporate tasters", "45–60 min taster blending salsa and bachata basics. Great for socials and welcome events."],
            ["Team-building sessions", "Structured 60–90 min programme around rhythm, leadership and trust."],
            ["Wellbeing workshops", "Movement, music and confidence — supports mental health and inclusion programmes."],
            ["Office socials", "Energising end-of-week session at your office, no kit required."],
            ["Christmas &amp; summer parties", "Headline entertainment for company parties. Book early."],
            ["Venue-based sessions", "Hosted at our Chiswick or Ealing venues with optional DJ social after."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border/60 bg-card p-5">
              <p className="font-heading font-bold mb-2" dangerouslySetInnerHTML={{ __html: t }} />
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl grid md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">What's included</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Lead instructor (Melitta or senior team member)</li>
            <li>• Tailored choreography &amp; warm-up</li>
            <li>• Music and Bluetooth speaker if needed</li>
            <li>• Pre-event call to align on goals</li>
            <li>• Optional photographer or video on request</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">Who it's for</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Tech, finance &amp; media companies in London</li>
            <li>• HR &amp; people teams running wellbeing initiatives</li>
            <li>• Agencies planning away days and client events</li>
            <li>• Universities, societies and members' clubs</li>
            <li>• Hotels and venues curating guest experiences</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-main max-w-2xl">
        <h2 className="font-display text-3xl font-bold mb-4">Enquire about a session</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Share your date, team size and venue — we'll come back with format and price options
          within one working day.
        </p>
        <EnquiryForm enquiryType="corporate" contextLabel="Corporate Latin Dance Events" whatsappUrl={WA_CORPORATE} />
        <div className="mt-6 text-center">
          <a
            href={WA_CORPORATE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-heading font-semibold hover:underline"
          >
            💬 Or WhatsApp Melitta for a fast reply →
          </a>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((q) => (
            <AnswerBox key={q.name} question={q.name} answer={q.acceptedAnswer.text} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/corporate-dance-classes-london" className="btn-cta-secondary text-sm">Corporate dance classes →</Link>
          <Link to="/private-group-dance-parties-london" className="btn-cta-secondary text-sm">Group parties →</Link>
          <Link to="/partner-with-pura-nights" className="btn-cta-secondary text-sm">Venue &amp; brand partnerships →</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default LatinDanceCorporateEventsLondon;
