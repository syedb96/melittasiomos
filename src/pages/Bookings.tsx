import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const services = [
  { emoji: "💃", title: "Salsa & Bachata — Chiswick (Mon)", desc: "The George IV, 185 Chiswick High Rd", cta: "Book Now", href: "https://linktr.ee/pura.nights" },
  { emoji: "💃", title: "Salsa & Bachata — Ealing (Tue)", desc: "Drayton Court Hotel, 2 The Avenue", cta: "Book Now", href: "https://linktr.ee/pura.nights" },
  { emoji: "🌙", title: "Monthly Latin Fridays", desc: "2nd Friday of every month, Ealing", cta: "Get Tickets", href: "https://linktr.ee/pura.nights" },
  { emoji: "🎓", title: "Private 1-to-1 Lessons", desc: "Tailored coaching at your pace", cta: "Enquire", link: "/private-lessons" },
  { emoji: "💍", title: "Wedding Dance", desc: "Bespoke first dance choreography", cta: "Enquire", link: "/wedding-dance" },
  { emoji: "🎂", title: "Birthday Parties", desc: "Fun Latin party packages", cta: "Enquire", link: "/contact" },
  { emoji: "👰", title: "Hen Parties & Stag Do's", desc: "Unique celebration experiences", cta: "Enquire", link: "/contact" },
  { emoji: "👧", title: "Kids' and Teens' Events", desc: "Age-appropriate dance fun", cta: "Enquire", link: "/contact" },
  { emoji: "🏢", title: "Corporate & Team Building", desc: "Energise your team with dance", cta: "Enquire", link: "/contact" },
];

const Bookings = () => (
  <Layout>
    <SeoHead title="Book Salsa & Bachata Classes London | Pura Nights by Melitta Siomos" description="Book your Salsa & Bachata class with Pura Nights London. Monday in Chiswick, Tuesday in Ealing. Also book private lessons, wedding dance, and events." path="/bookings" />

    <section className="section-padding section-warm">
      <div className="container-main">
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Let's Make It Unforgettable</h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Book Melitta, Pura Nights & Pura Ladies for your class or event.</p>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-6 card-hover text-center h-full flex flex-col">
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h2 className="font-heading font-bold text-sm mb-1">{s.title}</h2>
                <p className="text-muted-foreground text-xs mb-4 flex-1">{s.desc}</p>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs py-2 px-6">{s.cta}</a>
                ) : (
                  <Link to={s.link!} className="btn-cta-primary text-xs py-2 px-6">{s.cta}</Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Not Sure What to Book?</h2>
        <p className="text-primary-foreground/80 mb-8">Chat with Melitta and she'll help you find the perfect option.</p>
        <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-dark">💬 WhatsApp Melitta</a>
      </div>
    </section>
  </Layout>
);

export default Bookings;
