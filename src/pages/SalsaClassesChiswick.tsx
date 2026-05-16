import { Link } from "react-router-dom";
import { MapPin, Clock, Train, Bus, Car, Music, Users, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import FirstTimerCallout from "@/components/FirstTimerCallout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import NextEventCallout from "@/components/NextEventCallout";
import LastUpdated from "@/components/LastUpdated";
import AnswerBox from "@/components/AnswerBox";
import heroImg from "@/assets/salsa-chiswick.jpg";

// Recurring class page — NO Event schema. FAQPage + DanceSchool only.
const chiswickFaqs = [
  { q: "Are there salsa classes near Turnham Green?", a: "Yes — Pura Nights runs salsa and bachata classes every Monday at The George IV on Chiswick High Road, a 3-minute walk from Turnham Green tube (District Line). Doors open 7:15 PM, classes start 7:30 PM, with social dancing until 11 PM." },
  { q: "What Latin dance classes are in Chiswick W4?", a: "Pura Nights at 185 Chiswick High Road W4 2DR is the established weekly Latin dance night in Chiswick. Salsa and bachata are taught back-to-back every Monday, with split levels for beginners, improvers and intermediate dancers." },
  { q: "Is there social dancing in Chiswick on a Monday?", a: "Yes — after the 7:30 PM and 8:15 PM classes at The George IV, the floor opens at 9 PM for a full salsa and bachata social until 11 PM. Beginners are welcome to stay, practise what they learned and dance with the wider community." },
  { q: "Can I do salsa classes as a beginner in Chiswick?", a: "Absolutely. No partner and no experience are needed. The 7:30 PM Monday class at Pura Nights Chiswick splits beginners into their own group with dedicated instruction on timing, basic steps and lead-follow technique." },
  { q: "What dance classes are near Chiswick High Road?", a: "Pura Nights at The George IV (185 Chiswick High Road) is the weekly Latin dance class on Chiswick High Road. It runs every Monday evening from 7:30 PM, covering both salsa and bachata, and is open to all levels with no partner required." },
  { q: "How do I get to The George IV?", a: "185 Chiswick High Rd, London W4 2DR. Tube: Turnham Green (District Line, 3-min walk) or Gunnersbury (8 min). Buses 27 and E3 stop directly outside. On-street meter parking is free after 6:30 PM along Chiswick High Road and surrounding residential streets." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["DanceSchool", "FAQPage"],
  name: "Pura Nights — Salsa & Bachata Classes Chiswick",
  description: "Weekly salsa and bachata classes every Monday at The George IV, Chiswick W4. All levels, no partner needed.",
  url: "https://www.puranights.com/salsa-classes-chiswick",
  telephone: "+447449482343",
  address: { "@type": "PostalAddress", streetAddress: "185 Chiswick High Rd", addressLocality: "Chiswick", postalCode: "W4 2DR", addressCountry: "GB" },
  geo: { "@type": "GeoCoordinates", latitude: "51.4926", longitude: "-0.2583" },
  areaServed: ["Chiswick", "Turnham Green", "Gunnersbury", "Hammersmith", "Acton", "W4", "Chiswick High Road"].map(n => ({ "@type": "Place", name: n })),
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "19:30", closes: "23:00" }],
  priceRange: "£5–£15",
  mainEntity: chiswickFaqs.map(f => ({
    "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* <!-- WIX PAGE: salsa-classes-chiswick -->
   <!-- WIX SECTION: Hero -->
   <!-- WIX SECTION: AnswerBox (AI quick-answer) -->
   <!-- WIX SECTION: Monday Schedule -->
   <!-- WIX SECTION: Venue Deep-Dive -->
   <!-- WIX SECTION: First Monday Walkthrough -->
   <!-- WIX SECTION: Salsa vs Bachata -->
   <!-- WIX SECTION: FAQ -->
   <!-- WIX SECTION: CTA Band -->
*/
const SalsaClassesChiswick = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes Chiswick W4 | Every Monday at The George IV | Pura Nights"
      description="Salsa & bachata classes every Monday in Chiswick at The George IV (W4 2DR). 3 min from Turnham Green tube. All levels, no partner, from £5. Run by Melitta Siomos."
      path="/salsa-classes-chiswick"
      schema={schema}
      dateModified="2026-05-16"
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Salsa dancing at The George IV Chiswick" className="w-full h-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>
      <div className="container-main max-w-4xl relative z-10">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/salsa-classes-london" className="hover:text-primary">Salsa Classes London</Link> / <span className="text-primary">Chiswick</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Salsa Classes in Chiswick — Every Monday at The George IV
        </h1>
        <LastUpdated date="2026-05-16" />
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
          The George IV on Chiswick High Road has been home to Pura Nights every Monday — salsa and bachata classes from 7:30 PM, followed by a full social floor until 11. A 3-minute walk from Turnham Green tube. No partner needed. All levels welcome.
        </p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Monday Chiswick Class</a>
      </div>
    </section>

    {/* AI Quick-Answer block */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          question="Where can I learn salsa in Chiswick, W4?"
          answer="At The George IV pub on Chiswick High Road, every Monday from 7:30 PM. Pura Nights teaches salsa and bachata back-to-back, with split levels for beginners through intermediate, followed by social dancing until 11 PM. No partner needed."
          bullets={[
            "Venue: The George IV, 185 Chiswick High Rd, W4 2DR",
            "Tube: Turnham Green (District Line) — 3 min walk",
            "Doors 7:15 PM · Classes 7:30 PM · Social 9–11 PM",
            "From £5 (social) · £15 (2 classes + social)",
          ]}
          cta={{ label: "Book this Monday", href: "https://www.tickettailor.com/events/puranights" }}
          tone="ivory"
        />
      </div>
    </section>

    {/* Neighbourhood intro */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Monday Night, Reimagined on Chiswick High Road</h2>
        <div className="text-muted-foreground space-y-4 leading-relaxed">
          <p>Chiswick's mix of young professionals, families and creatives makes Monday the perfect reset from the working week — a warm, low-pressure way to start your evenings differently. The George IV is a proper Victorian Chiswick pub: high ceilings, warm lighting, a real wooden floor and a private back room that becomes a Latin dance studio for one night a week.</p>
          <p>You'll find dancers travelling in from Turnham Green, Gunnersbury, Hammersmith, Acton and Shepherd's Bush — many alone, all welcome. The community is the point. Within two or three Mondays, you'll know names, regulars and routines.</p>
        </div>
      </div>
    </section>

    {/* Full class structure */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Monday at The George IV — Full Schedule</h2>
        <div className="bg-card rounded-lg p-8 border border-primary/20">
          <div className="flex items-start gap-3 mb-6">
            <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-heading font-bold">The George IV</p>
              <p className="text-muted-foreground text-sm">185 Chiswick High Rd, London W4 2DR</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">7:15 PM</span> — Doors open. Grab a drink, say hello.</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">7:30–8:15 PM</span> — Salsa class (Beginner / Improver / Intermediate split)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">8:15–9:00 PM</span> — Bachata class (Beginner / Improver / Intermediate split)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-primary" /><span className="font-heading font-semibold">9:00–11:00 PM</span> — Open social dancing (50/50 Salsa & Bachata)</div>
          </div>
          <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground space-y-1">
            <p>💷 From £5 (social only) · £10 (1 class) · £15 (2 classes + social)</p>
            <p>👕 No dress code — wear what you can move in. Smooth-soled shoes help.</p>
            <p>💧 Bring water. The bar is open all night.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Venue deep-dive */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Getting to The George IV</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-background rounded-lg p-6 border border-border">
            <Train size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold mb-2">By Tube</h3>
            <p className="text-sm text-muted-foreground">Turnham Green (District Line) — 3 min walk along Chiswick High Road. Gunnersbury (District / Overground) — 8 min walk.</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <Bus size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold mb-2">By Bus</h3>
            <p className="text-sm text-muted-foreground">Routes 27, E3, 237, 267, 190 stop on Chiswick High Road directly outside or within 2 minutes' walk.</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <Car size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold mb-2">By Car</h3>
            <p className="text-sm text-muted-foreground">Free on-street parking from 6:30 PM along Chiswick High Road and side streets. Chiswick Business Park car park is a 5-min walk.</p>
          </div>
        </div>
        {/* <!-- WIX SECTION: Embed Google Map of The George IV here --> */}
        <div className="mt-8 rounded-lg overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps?q=185+Chiswick+High+Rd,+London+W4+2DR&output=embed"
            width="100%" height="320" style={{ border: 0 }} loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" title="Map of The George IV, Chiswick"
          />
        </div>
      </div>
    </section>

    {/* What to expect on your first Monday */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-6">Your First Monday at Pura Nights Chiswick</h2>
        <ol className="space-y-4 text-muted-foreground">
          {[
            ["7:15 PM — Arrive", "Doors are open, the bar is on, and people are chatting. Pay at the door or show your Ticket Tailor ticket."],
            ["7:30 PM — Salsa", "Melitta or an instructor welcomes the room, then splits us by level. Beginners get the basics: timing, the side-step, lead-and-follow. You'll learn 3–4 moves."],
            ["8:15 PM — Bachata", "Different rhythm, closer connection. Easier to start than salsa. We rotate partners — no need to come with anyone."],
            ["9:00 PM — Social", "The floor opens. Practise what you just learned, chat to people, try moves with regulars. The DJ alternates salsa and bachata until 11."],
            ["Going home", "Walk straight back to Turnham Green or grab the 27 bus. You'll have new contacts in your phone."],
          ].map(([title, body]) => (
            <li key={title} className="bg-card rounded-lg p-5 border border-border">
              <p className="font-heading font-bold text-foreground mb-1">{title}</p>
              <p className="text-sm">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Salsa vs Bachata explainer */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Salsa vs Bachata — You Get Both</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-background rounded-lg p-6 border border-border">
            <Music size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold mb-2">Salsa</h3>
            <p className="text-sm text-muted-foreground">Fast, rhythmic, Cuban-rooted. Footwork-led, lots of spins and patterns. Social energy. Takes a few weeks to feel — and then it clicks.</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <Heart size={20} className="text-primary mb-3" />
            <h3 className="font-heading font-bold mb-2">Bachata</h3>
            <p className="text-sm text-muted-foreground">Slower, melodic, close connection. Easier to start. Many beginners feel confident inside their first class. Modern and sensual styles welcome.</p>
          </div>
        </div>
        <p className="text-muted-foreground mt-6">At Pura Nights Chiswick you don't have to choose — both are taught the same night, and the 9 PM social plays a roughly 50/50 mix.</p>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Chiswick Salsa & Bachata FAQs</h2>
        <div className="space-y-4">
          {chiswickFaqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Also nearby */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl font-bold mb-4">Also Dancing Near Chiswick</h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm">
          <li><Link to="/bachata-classes-chiswick" className="text-primary hover:underline">→ Bachata Classes Chiswick (same Monday night)</Link></li>
          <li><Link to="/salsa-classes-ealing" className="text-primary hover:underline">→ Salsa Classes Ealing (Tuesdays at Drayton Court)</Link></li>
          <li><Link to="/dance-classes-west-london" className="text-primary hover:underline">→ Dance Classes West London (hub)</Link></li>
          <li><Link to="/salsa-classes-hammersmith" className="text-primary hover:underline">→ Salsa for Hammersmith</Link></li>
          <li><Link to="/salsa-classes-acton" className="text-primary hover:underline">→ Salsa for Acton</Link></li>
          <li><Link to="/venue/the-george-iv-chiswick" className="text-primary hover:underline">→ Venue: The George IV</Link></li>
        </ul>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">See You This Monday in Chiswick</h2>
        <p className="text-primary-foreground/80 mb-8">Doors 7:15 PM. No partner needed. All levels welcome.</p>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book Your Chiswick Class</a>
      </div>
    </section>
    <section className="bg-card"><div className="container-main max-w-3xl"><NextEventCallout context="Coming Up at Drayton Court" /></div></section>
    <RelatedPages title="Related Pages" links={[
      { to: "/bachata-classes-chiswick", label: "Bachata Classes Chiswick" },
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/venue/the-george-iv-chiswick", label: "Venue: The George IV" },
      { to: "/beginners", label: "Beginners Guide" },
      { to: "/pura-nights", label: "Full Schedule" },
    ]} />
    <FirstTimerCallout />
  </Layout>
);

export default SalsaClassesChiswick;
