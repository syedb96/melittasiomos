import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const services = [
  { emoji: "💃", title: "Salsa & Bachata — Chiswick (Mon)", cta: "Book Now", href: "https://www.tickettailor.com" },
  { emoji: "💃", title: "Salsa & Bachata — Ealing (Tue)", cta: "Book Now", href: "https://www.tickettailor.com" },
  { emoji: "🌙", title: "Monthly Latin Fridays", cta: "Book Now", href: "https://www.tickettailor.com" },
  { emoji: "🎓", title: "Private 1-to-1 Lessons", cta: "Enquire", link: "/contact" },
  { emoji: "💍", title: "Wedding Dance", cta: "Enquire", link: "/wedding-dance" },
  { emoji: "🎂", title: "Birthday Parties", cta: "Enquire", link: "/contact" },
  { emoji: "👰", title: "Hen Parties & Stag Do's", cta: "Enquire", link: "/contact" },
  { emoji: "👧", title: "Kids' and Teens' Events", cta: "Enquire", link: "/contact" },
  { emoji: "🏢", title: "Corporate & Team Building", cta: "Enquire", link: "/contact" },
];

const Bookings = () => (
  <Layout>
    <SeoHead title="Book Salsa & Bachata Classes London | Pura Nights by Melitta Siomos" description="Book your Salsa & Bachata class with Pura Nights London. Monday in Chiswick, Tuesday in Ealing. Also book private lessons, wedding dance, and events." path="/bookings" />

    <section className="section-padding section-warm">
      <div className="container-main">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Let's Make It an Unforgettable Event</h1>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Book Melitta, Pura Nights & Pura Ladies for your class or event.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <div key={i} className="bg-card rounded-lg p-6 card-hover text-center">
              <div className="text-3xl mb-3">{s.emoji}</div>
              <h2 className="font-heading font-bold text-sm mb-4">{s.title}</h2>
              {s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs py-2 px-6">{s.cta}</a>
              ) : (
                <Link to={s.link!} className="btn-cta-primary text-xs py-2 px-6">{s.cta}</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Bookings;
