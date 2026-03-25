import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";

const SalsaClassesEaling = () => (
  <Layout>
    <SeoHead
      title="Salsa Classes Ealing | Every Tuesday | Pura Nights by Melitta Siomos"
      description="Learn salsa every Tuesday in Ealing at Drayton Court Hotel with Melitta Siomos. Beginner to advanced. No partner needed. From £5.50."
      path="/salsa-classes-ealing"
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-4xl">
        <nav className="text-xs text-primary-foreground/50 mb-8 font-heading">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/salsa-classes-london" className="hover:text-primary">Salsa Classes London</Link> / <span className="text-primary">Ealing</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Salsa Classes in Ealing — Every Tuesday at Pura Nights
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
          Melitta Siomos and the Pura Nights team run weekly salsa classes every Tuesday evening at the Drayton Court Hotel in West Ealing. Whether you're taking your first salsa step or looking to perfect your spins, turns and partnerwork, this is the place to be.
        </p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Book Tuesday Salsa Class</a>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-6">Tuesday Schedule — Drayton Court Hotel</h2>
        <div className="bg-card rounded-lg p-8 border border-secondary/20 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
            <div>
              <p className="font-heading font-bold">Drayton Court Hotel</p>
              <p className="text-muted-foreground text-sm">2 The Avenue, West Ealing, London W13 8PH</p>
              <p className="text-muted-foreground text-xs mt-1">Nearest station: West Ealing (Elizabeth Line) · Buses: 83, 207, E1</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">7:15 PM</span> — Doors Open</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">7:30–8:15 PM</span> — Salsa Class (all levels)</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">8:15–9:00 PM</span> — Bachata Class</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-secondary" /><span className="font-heading font-semibold">9:00–11:00 PM</span> — Social Dancing</div>
          </div>
          <div className="mt-6 pt-6 border-t border-border"><p className="text-sm text-muted-foreground">💷 From £5.50 · Cash at the door accepted</p></div>
        </div>

        <h2 className="font-display text-3xl font-bold mb-6">Learn Salsa in the Heart of West London</h2>
        <div className="text-muted-foreground space-y-4">
          <p>Ealing has always been one of West London's most culturally rich boroughs, and the Latin dance scene is thriving. Pura Nights at Drayton Court brings together dancers from Ealing, Acton, Hanwell, Greenford, Southall, and beyond for a weekly evening of structured salsa and bachata classes followed by social dancing.</p>
          <p>Melitta Siomos, Bachata UK Champion, personally teaches at Ealing every Tuesday alongside her experienced team. The classes are structured with clear level splits so you're always challenged at the right pace. Beginners learn the fundamentals — timing, basic steps, and partner connection — while intermediate dancers work on combinations, musicality, and styling.</p>
          <p>After the classes, the social dancing runs until 11 PM, giving you the perfect opportunity to practise what you've learned in a relaxed, friendly atmosphere. The Drayton Court's stunning Victorian setting adds a touch of elegance to every Tuesday night.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Ealing Salsa Class FAQs</h2>
        <div className="space-y-6">
          {[
            { q: "Is the Drayton Court easy to get to by public transport?", a: "Yes! West Ealing station is a 3-minute walk and is on the Elizabeth Line and Great Western Railway. Bus routes 83, 207, and E1 stop nearby." },
            { q: "Do I need to book in advance?", a: "You can pay cash at the door, but we recommend booking via Ticket Tailor for guaranteed entry — especially on busy weeks." },
            { q: "What style of salsa do you teach?", a: "We teach cross-body (LA/NY) style salsa, which is the most widely danced style at social events across London and Europe." },
          ].map((faq, i) => (
            <div key={i} className="bg-background rounded-lg p-6">
              <h3 className="font-heading font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Dance Salsa in Ealing This Tuesday</h2>
        <p className="text-primary-foreground/80 mb-8">Doors open 7:15 PM at Drayton Court Hotel. All levels. No partner needed.</p>
        <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light">🎟 Book Your Ealing Class</a>
      </div>
    </section>
    <RelatedPages title="Related Pages" links={[
      { to: "/bachata-classes-ealing", label: "Bachata Classes Ealing" },
      { to: "/dance-classes-ealing", label: "Dance Classes Ealing" },
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/blog/what-is-salsa", label: "What is Salsa?" },
      { to: "/pura-nights", label: "Full Schedule" },
    ]} />
  </Layout>
);

export default SalsaClassesEaling;
