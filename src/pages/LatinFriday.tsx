import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, Music, Check, ArrowRight, Users, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX PAGE: /latin-friday -->
   <!-- WIX: Flagship monthly event page. Use Wix Events for upcoming dates. -->
*/

const TICKET_TAILOR = "https://www.tickettailor.com/events/puranights";

const faqs = [
  { q: "How much does Latin Friday cost?", a: "Tickets are available via Ticket Tailor. Check the current price on the booking page — it varies by event." },
  { q: "Do I need to book in advance?", a: "Yes — Latin Friday regularly sells out. We recommend booking as soon as dates go live. Book via Ticket Tailor." },
  { q: "I've never danced before — is it too advanced for me?", a: "Not at all. Latin Friday always includes a beginner-friendly warm-up and class. Many of our most loyal regulars came to their first Latin Friday having never danced before." },
  { q: "Is Latin Friday the same as a weekly class?", a: "Latin Friday is a monthly event — bigger, longer, and with an extended social floor after class. Weekly classes run every Monday (Chiswick) and Tuesday (Ealing)." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const upcomingDates = [
  { label: "Friday 12 June 2026", slug: "/events/latin-friday-2026-06-12" },
  { label: "Friday 10 July 2026", slug: "/events/latin-friday-2026-07-10" },
  { label: "Friday 11 September 2026", slug: "/events/latin-friday-2026-09-11" },
];

const audience = [
  { title: "Complete beginners", desc: "Never danced before? Latin Friday is the gentlest entry point — Melitta builds the class around whoever turns up." },
  { title: "Regular students", desc: "The place to practise what you learned in class with real music and a real crowd." },
  { title: "Solo attendees", desc: "Over 70% of our Latin Friday guests come alone. Partner rotation means you dance with everyone." },
  { title: "Groups & celebrations", desc: "Birthday nights out, hen dos, work socials — we've hosted them all. WhatsApp us to let us know." },
];

const timeline = [
  { time: "7:30pm", label: "Doors open, meet the regulars" },
  { time: "8:00pm", label: "Styling & warm-up with Melitta" },
  { time: "9:00pm", label: "Class time — all levels together" },
  { time: "10:00pm", label: "Open social floor, DJ, dancing until 11:30pm" },
];

const LatinFriday = () => (
  <Layout>
    <SeoHead
      title="Monthly Latin Friday London — Salsa & Bachata Social | Pura Nights"
      description="West London's most welcoming Latin Friday social — monthly at Drayton Court, Ealing. All levels, no partner needed. Book via Ticket Tailor."
      path="/latin-friday"
      schema={schema}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Classes & Events", path: "/pura-nights" },
        { name: "Latin Friday", path: "/latin-friday" },
      ]}
    />

    {/* <!-- WIX SECTION: Hero --> */}
    <section className="relative bg-charcoal text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-primary/10" />
      <div className="container-main relative z-10 py-24 md:py-32 lg:py-40 text-center">
        <FadeInUp>
          <span className="inline-block font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Every Month</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.95]">Latin Friday</h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            West London's most welcoming monthly Salsa & Bachata social. Class first. Dancing after. All levels. No partner needed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={TICKET_TAILOR} target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-base px-8 py-3">
              Book next Latin Friday →
            </a>
            <Link to="/events" className="btn-cta-outline text-base px-8 py-3">
              See upcoming dates →
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* <!-- WIX SECTION: What is Latin Friday --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-6xl grid md:grid-cols-2 gap-12 items-start">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">One night, every month.</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Latin Friday brings together the Pura Nights community for a full evening of Salsa and Bachata — starting with a styling warm-up, moving through class time with Melitta, and finishing with an open social floor.</p>
            <p>It's the best night to experience Pura Nights if you've never been before. Everyone rotates partners, no one sits out, and the room has a completely different energy to a regular Tuesday.</p>
            <p>Held on the second Friday of every month at Drayton Court, Ealing. Doors open from 7:30pm.</p>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.15}>
          <div className="bg-card rounded-2xl p-8 border border-primary/15 shadow-sm">
            <h3 className="font-display text-xl font-bold mb-5">Event details</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><MapPin size={16} className="text-primary mt-0.5 shrink-0" /> Drayton Court, Ealing (W13 0AA)</li>
              <li className="flex gap-3"><Calendar size={16} className="text-primary mt-0.5 shrink-0" /> 2nd Friday of every month</li>
              <li className="flex gap-3"><Clock size={16} className="text-primary mt-0.5 shrink-0" /> 7:30pm — 11:30pm</li>
              <li className="flex gap-3"><Music size={16} className="text-primary mt-0.5 shrink-0" /> Salsa + Bachata</li>
              <li className="flex gap-3"><Sparkles size={16} className="text-primary mt-0.5 shrink-0" /> Book via Ticket Tailor</li>
            </ul>
            <div className="h-px bg-border my-5" />
            <ul className="space-y-2 text-sm">
              {["All levels welcome", "No partner needed", "Styling warm-up included", "Free rotation system"].map(t => (
                <li key={t} className="flex gap-2 text-muted-foreground"><Check size={15} className="text-primary mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
            <a href={TICKET_TAILOR} target="_blank" rel="noopener noreferrer" className="btn-cta-primary w-full text-center mt-6 inline-block">
              Reserve your spot →
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* <!-- WIX SECTION: What to expect — timeline --> */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">What to expect</h2>
        </FadeInUp>
        <div className="space-y-4">
          {timeline.map((step, i) => (
            <FadeInUp key={i} delay={i * 0.06}>
              <div className="flex gap-5 items-center bg-background rounded-xl p-5 card-hover">
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="font-display font-bold text-primary text-sm">{step.time}</span>
                </div>
                <div className="h-px flex-shrink-0 w-6 bg-primary/30" />
                <p className="font-heading text-sm">{step.label}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* <!-- WIX SECTION: Who comes --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Who comes</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6">
          {audience.map((c, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-7 card-hover h-full border-t-4 border-primary/20 hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary mb-4"><Users size={20} /></div>
                <h3 className="font-display text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* <!-- WIX SECTION: Upcoming dates --> */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Upcoming dates</h2>
        </FadeInUp>
        <div className="grid sm:grid-cols-3 gap-5">
          {upcomingDates.map((d, i) => (
            <FadeInUp key={i} delay={i * 0.08}>
              <Link to={d.slug} className="block bg-background rounded-xl p-6 text-center card-hover border border-border hover:border-primary/40 transition-colors">
                <Calendar size={22} className="text-primary mx-auto mb-3" />
                <p className="font-heading font-semibold text-sm mb-3">{d.label}</p>
                <span className="text-primary text-xs font-heading inline-flex items-center gap-1">Book → </span>
              </Link>
            </FadeInUp>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/events" className="text-primary font-heading text-sm hover:underline">View all events →</Link>
        </div>
      </div>
    </section>

    {/* <!-- WIX SECTION: FAQs --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Latin Friday FAQs</h2>
        </FadeInUp>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <details className="group bg-card rounded-xl border border-border">
                <summary className="cursor-pointer p-5 font-heading font-semibold text-sm flex items-center justify-between">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </details>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* <!-- WIX SECTION: Final CTA --> */}
    <section className="section-padding bg-charcoal text-primary-foreground text-center">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Don't miss the next one.</h2>
          <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">Latin Fridays book out. Get your spot early.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={TICKET_TAILOR} target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-base px-10 py-3.5">
              Book Latin Friday → <ArrowRight size={16} className="ml-2 inline" />
            </a>
            <a href="https://wa.me/447449482343?text=Hi%2C%20I%27d%20like%20to%20book%20a%20group%20for%20Latin%20Friday" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-base px-8 py-3">
              💬 WhatsApp for group bookings →
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/your-first-class", label: "Your First Class", desc: "What to expect on the night" },
      { to: "/pura-nights", label: "Weekly Classes", desc: "Mondays Chiswick · Tuesdays Ealing" },
      { to: "/events", label: "All Events", desc: "Upcoming socials & specials" },
      { to: "/venue/the-drayton-court-ealing", label: "The Drayton Court", desc: "Our Ealing venue" },
      { to: "/start-here", label: "Start Here", desc: "New to Latin dance?" },
      { to: "/prices", label: "Pricing", desc: "Tickets, bundles & vouchers" },
    ]} />
  </Layout>
);

export default LatinFriday;
