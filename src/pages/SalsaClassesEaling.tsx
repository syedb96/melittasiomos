import { Link } from "react-router-dom";
import { MapPin, Clock, Train, Bus, Car, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import NextEventCallout from "@/components/NextEventCallout";
import LastUpdated from "@/components/LastUpdated";
import AnswerBox from "@/components/AnswerBox";
import LocalTransportBlock from "@/components/LocalTransportBlock";
import NearMeGrid from "@/components/NearMeGrid";
import ReviewVelocityTicker from "@/components/ReviewVelocityTicker";
import { EALING_NEAR } from "@/data/near-me-areas";
import { REVIEW_VELOCITY_SNIPPETS } from "@/data/review-velocity";
import heroImg from "@/assets/salsa-ealing.jpg";

const ealingFaqs = [
  { q: "Are there salsa classes near Ealing Broadway?", a: "Yes — Pura Nights runs salsa and bachata every Tuesday at The Drayton Court Hotel in West Ealing, a 10-minute walk or 4-minute bus ride from Ealing Broadway. Classes start at 7:30 PM, with social dancing until 11 PM." },
  { q: "What Latin dance nights are in West Ealing W13?", a: "Pura Nights at The Drayton Court Hotel, 2 The Avenue W13 8PH, is West Ealing's weekly Latin dance night. Salsa and bachata are taught back-to-back every Tuesday, with multi-level instruction and a full social floor afterwards." },
  { q: "Is there social dancing near the Elizabeth Line in West London?", a: "Yes — West Ealing station (Elizabeth Line) is a 3-minute walk from The Drayton Court Hotel. Pura Nights opens the social floor every Tuesday at 9 PM, and roughly once a month the venue hosts a Latin Friday social with DJ until midnight." },
  { q: "Can I try salsa as a complete beginner in Ealing?", a: "Yes. No partner and no experience needed. The 7:30 PM Tuesday class at The Drayton Court has a dedicated beginner group covering timing, basic step and lead-follow. Beginners often stay for the bachata class at 8:15 PM and the social at 9." },
  { q: "What's the best dance class for adults in Ealing?", a: "Pura Nights Tuesday at The Drayton Court Hotel is West Ealing's established adult Latin dance class — taught by Bachata UK Champion Melitta Siomos, with split-level groups so 20- to 60-year-olds are all challenged appropriately." },
  { q: "Is the Drayton Court easy to get to by public transport?", a: "Yes. West Ealing (Elizabeth Line / GWR) is a 3-min walk. Ealing Broadway (Central / District / Elizabeth) is 10 min on foot or buses 207, 427. Bus routes 83, 207, 427 and E1 stop on The Avenue or Uxbridge Road." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["DanceSchool", "FAQPage"],
  name: "Pura Nights — Salsa & Bachata Classes Ealing",
  description: "Weekly salsa and bachata classes every Tuesday at The Drayton Court Hotel, West Ealing W13.",
  url: "https://www.puranights.com/salsa-classes-ealing",
  telephone: "+447449482343",
  address: { "@type": "PostalAddress", streetAddress: "2 The Avenue", addressLocality: "West Ealing", postalCode: "W13 8PH", addressCountry: "GB" },
  geo: { "@type": "GeoCoordinates", latitude: "51.5126", longitude: "-0.3232" },
  areaServed: ["Ealing", "West Ealing", "Ealing Broadway", "Hanwell", "Acton", "Greenford", "Northolt", "W13", "W5"].map(n => ({ "@type": "Place", name: n })),
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "19:30", closes: "23:00" }],
  priceRange: "£5–£15",
  mainEntity: ealingFaqs.map(f => ({
    "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* <!-- WIX PAGE: salsa-classes-ealing --> */
const SalsaClassesEaling = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes Ealing W13 | Tuesdays at The Drayton Court"
      description="Salsa & bachata classes every Tuesday at The Drayton Court Hotel, West Ealing (W13 8PH). 3 min from West Ealing Elizabeth Line. All levels, no partner, from £5."
      path="/salsa-classes-ealing"
      schema={schema}
      dateModified="2026-05-16"
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Salsa social dancing at Drayton Court Ealing" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/salsa-classes-london" className="hover:text-primary">Salsa Classes London</Link> / <span className="text-primary">Ealing</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Salsa Classes in Ealing — Every Tuesday at The Drayton Court
        </h1>
        <LastUpdated date="2026-05-16" />
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
          The Drayton Court Hotel in West Ealing is home to Pura Nights every Tuesday — a grand Edwardian venue, ten minutes from Ealing Broadway and three minutes from West Ealing on the Elizabeth Line. Salsa and bachata from 7:30 PM, social floor until 11. No partner needed.
        </p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Tuesday Ealing Class</a>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="Where can I learn salsa in Ealing, W13?"
          answer="At The Drayton Court Hotel, 2 The Avenue, West Ealing W13 8PH, every Tuesday from 7:30 PM. Pura Nights teaches salsa and bachata with split-level instruction, followed by a social floor until 11 PM. No partner needed."
          bullets={[
            "Venue: The Drayton Court Hotel, W13 8PH",
            "Station: West Ealing (Elizabeth Line) — 3 min walk",
            "Doors 7:15 PM · Classes 7:30 PM · Social 9–11 PM",
            "Monthly Latin Friday social — DJ until midnight",
          ]}
          cta={{ label: "Book this Tuesday", href: "https://www.tickettailor.com/events/puranights" }}
          tone="ivory"
        />
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">A Latin Tuesday in West Ealing</h2>
        <div className="text-muted-foreground space-y-4 leading-relaxed">
          <p>West Ealing's multicultural energy makes it one of the most natural homes for Latin dance in London — and The Drayton Court is one of the most atmospheric venues in the borough. Built in the Edwardian era, the hotel has been carefully restored: high ceilings, original mouldings, a grand bar and a generous private room that becomes a Latin dance studio for one night a week.</p>
          <p>Ten minutes on foot from Ealing Broadway, three from West Ealing, and a short hop from Hanwell — you'll meet dancers from across the W13, W7, W5, W3 postcodes and out to Greenford, Northolt, Southall and Hayes. The Elizabeth Line makes it surprisingly easy from Paddington, the West End and even Reading.</p>
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Tuesday at The Drayton Court — Full Schedule</h2>
        <div className="bg-card rounded-lg p-8 border border-secondary/20">
          <div className="flex items-start gap-3 mb-6">
            <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
            <div>
              <p className="font-heading font-bold">The Drayton Court Hotel</p>
              <p className="text-muted-foreground text-sm">2 The Avenue, West Ealing, London W13 8PH</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">7:15 PM</span> — Doors open. Bar & food available.</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">7:30–8:15 PM</span> — Salsa class (level splits)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">8:15–9:00 PM</span> — Bachata class (level splits)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">9:00–11:00 PM</span> — Social dancing</div>
          </div>
          <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
            <p>💷 From £5 (social) · £10 (1 class) · £15 (2 classes + social) — cash at the door accepted.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Getting to The Drayton Court</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-background rounded-lg p-6 border border-border">
            <Train size={20} className="text-secondary mb-3" />
            <h3 className="font-heading font-bold mb-2">By Train / Tube</h3>
            <p className="text-sm text-muted-foreground">West Ealing (Elizabeth Line / GWR) — 3 min. Ealing Broadway (Central / District / Elizabeth) — 10 min on foot.</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <Bus size={20} className="text-secondary mb-3" />
            <h3 className="font-heading font-bold mb-2">By Bus</h3>
            <p className="text-sm text-muted-foreground">Routes 83, 207, 427, E1 stop on The Avenue or Uxbridge Road within 2 minutes.</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <Car size={20} className="text-secondary mb-3" />
            <h3 className="font-heading font-bold mb-2">By Car</h3>
            <p className="text-sm text-muted-foreground">Free parking on residential streets surrounding the hotel after 6:30 PM. Hotel car park behind the venue.</p>
          </div>
        </div>
        <div className="mt-8 rounded-lg overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps?q=Drayton+Court+Hotel+2+The+Avenue+W13+8PH&output=embed"
            width="100%" height="320" style={{ border: 0 }} loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" title="Map of The Drayton Court Hotel, West Ealing"
          />
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-6">Your First Tuesday at Pura Nights Ealing</h2>
        <ol className="space-y-4 text-muted-foreground">
          {[
            ["7:15 PM — Arrive", "Walk into the Drayton Court bar, order a drink, head through to the private room. Pay at the door or show your ticket."],
            ["7:30 PM — Salsa", "Melitta and the team welcome the room. Beginners are taken to a dedicated corner. You'll learn 3–4 things — timing, the basic step, your first turn."],
            ["8:15 PM — Bachata", "Close, slower, simpler to start. Many people prefer it on a first night. Rotation means you'll dance with several partners."],
            ["9:00 PM — Social", "Floor opens. Real songs, real practice. Regulars will invite you to dance — it's one of London's most welcoming Latin rooms."],
            ["Going home", "5 min walk to West Ealing for the Elizabeth Line, or grab the 207 from Uxbridge Road."],
          ].map(([title, body]) => (
            <li key={title} className="bg-card rounded-lg p-5 border border-border">
              <p className="font-heading font-bold text-foreground mb-1">{title}</p>
              <p className="text-sm">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Latin Friday monthly callout */}
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-3xl text-center">
        <Sparkles size={28} className="text-primary mx-auto mb-3" />
        <h2 className="font-display text-3xl font-bold mb-3">Once a Month — Latin Friday</h2>
        <p className="text-primary-foreground/80 mb-6">Roughly once a month, The Drayton Court hosts Latin Friday — Pura Nights' headline social. Beginner-friendly warm-up at 7:30 PM, then the floor opens until midnight with a DJ mixing salsa, bachata, cha-cha and merengue. Dress up. Bring friends. Beginners genuinely welcome.</p>
        <Link to="/latin-friday" className="btn-cta-primary text-sm">See Next Latin Friday →</Link>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Ealing Salsa & Bachata FAQs</h2>
        <div className="space-y-4">
          {ealingFaqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Dance Salsa in Ealing This Tuesday</h2>
        <p className="text-primary-foreground/80 mb-8">Doors 7:15 PM at The Drayton Court. All levels. No partner needed.</p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book Your Ealing Class</a>
      </div>
    </section>
    <div className="container-main max-w-3xl"><NextEventCallout context="Next Latin Friday in Ealing" /></div>

    <ReviewVelocityTicker recentCount={11} snippets={REVIEW_VELOCITY_SNIPPETS} />

    <LocalTransportBlock
      venueName="The Drayton Court Hotel, West Ealing"
      postcode="W13 8PH"
      rows={[
        { mode: "tube", label: "West Ealing (Elizabeth Line / GWR)", detail: "3-min walk via The Avenue. Fastest route from Paddington, Bond Street and Canary Wharf.", time: "3 min" },
        { mode: "tube", label: "Ealing Broadway (Central / District / Elizabeth)", detail: "10-min walk or 4-min bus on the 207 / 427. Best transfer hub.", time: "10 min" },
        { mode: "tube", label: "Northfields (Piccadilly)", detail: "12-min walk through residential Ealing. Convenient from Hammersmith.", time: "12 min" },
        { mode: "bus", label: "Buses 207, 427, 83, E1", detail: "Stops on Uxbridge Rd & The Avenue. Night bus N207 runs back to Holborn until 4 AM.", time: "Door" },
        { mode: "car", label: "Drive & park", detail: "Free on-street parking from 6:30 PM along The Avenue, Drayton Bridge Rd and surrounding streets. Hotel car park for paying guests.", time: "After 6:30" },
        { mode: "cycle", label: "Cycle", detail: "Quiet residential approach via Drayton Bridge Rd. Bike racks at the venue and at West Ealing station.", time: "Door" },
      ]}
      parkingNote="Free on-street parking from 6:30 PM along The Avenue & nearby roads. Hotel guests have a private car park on-site."
      accessibilityNote="Step-free entrance via the side terrace. Lift to the function room. Accessible WCs on each floor."
    />

    <NearMeGrid
      title="Travelling to Ealing from elsewhere?"
      eyebrow="Areas We Serve"
      intro="Tuesday nights bring dancers from W3, W5, W7, W13, the Elizabeth Line corridor and South-West London. Find the closest route from your postcode."
      areas={EALING_NEAR}
    />
    <RelatedPages title="Related Pages" links={[
      { to: "/bachata-classes-ealing", label: "Bachata Classes Ealing" },
      { to: "/dance-classes-ealing", label: "Dance Classes Ealing" },
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/latin-friday", label: "Latin Friday Socials" },
      { to: "/venue/the-drayton-court-ealing", label: "Venue: The Drayton Court" },
      { to: "/pura-nights", label: "Full Schedule" },
    ]} />
  </Layout>
);

export default SalsaClassesEaling;
