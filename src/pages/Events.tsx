import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Calendar, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const latinFridayDates2026 = [
  new Date(2026, 3, 10, 19, 15),  // April 10
  new Date(2026, 4, 8, 19, 15),   // May 8
  new Date(2026, 5, 12, 19, 15),  // June 12
  new Date(2026, 6, 10, 19, 15),  // July 10
  new Date(2026, 7, 14, 19, 15),  // August 14
  new Date(2026, 8, 11, 19, 15),  // September 11
  new Date(2026, 9, 9, 19, 15),   // October 9
  new Date(2026, 10, 13, 19, 15), // November 13
  new Date(2026, 11, 11, 19, 15), // December 11
];

const getGoogleCalendarUrl = (date: Date) => {
  const start = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const endDate = new Date(date.getTime() + 4.5 * 3600000);
  const end = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pura+Nights+Latin+Friday&dates=${start}/${end}&location=Drayton+Court+Hotel,+2+The+Avenue,+Ealing+W13+8PH&details=Monthly+Latin+Friday+—+Salsa+%26+Bachata+social+with+workshops,+Pura+Ladies+performance,+and+DJ.+Tickets+at+linktr.ee/pura.nights`;
};

const Countdown = ({ target }: { target: Date }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return (
    <div className="flex justify-center gap-4">
      {[
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: mins },
        { label: "Seconds", value: secs },
      ].map((u) => (
        <div key={u.label} className="text-center">
          <div className="bg-charcoal-light rounded-xl w-16 h-16 flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-primary">{String(u.value).padStart(2, "0")}</span>
          </div>
          <span className="text-primary-foreground/50 text-xs font-heading mt-1 block">{u.label}</span>
        </div>
      ))}
    </div>
  );
};

const Events = () => {
  const now = new Date();
  const nextEvent = latinFridayDates2026.find(d => d > now);
  const nextDateStr = nextEvent
    ? nextEvent.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <Layout>
      <SeoHead title="Events — Salsa & Bachata Events London | Pura Nights" description="Monthly Latin Fridays, weekly classes, workshops, and special performances by Pura Nights in London. Get tickets and join the dance community." path="/events" />

      {/* Hero */}
      <section className="section-padding section-dark text-center">
        <div className="container-main">
          <FadeInUp>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Upcoming Events</h1>
            <p className="text-primary-foreground/70 font-heading text-lg">Monthly Latin Fridays · Weekly Classes · Workshops · Special Performances</p>
          </FadeInUp>
        </div>
      </section>

      {/* Featured: Next Latin Friday with Countdown */}
      <section className="section-padding bg-charcoal">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <div className="border-2 border-primary rounded-2xl p-8 md:p-12">
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-widest mb-2">Next Event</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">🔥 Pura Nights Latin Friday</h2>
              {nextEvent ? (
                <>
                  <p className="text-primary-foreground/60 text-sm mb-2">{nextDateStr}</p>
                  <div className="flex items-start gap-3 text-primary-foreground/70 text-sm mb-2">
                    <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Drayton Court Hotel, 2 The Avenue, Ealing, W13 8PH</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-foreground/70 text-sm mb-6">
                    <Clock size={16} className="text-primary" />
                    <span>7:15 PM – 11:45 PM</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm text-primary-foreground/80">
                    <div className="space-y-2">
                      <p className="font-heading font-semibold text-primary">What's On:</p>
                      <p>🎓 3 levels of Bachata workshops</p>
                      <p>💃 Pura Ladies performance show</p>
                      <p>🎵 Live DJ — Salsa & Bachata</p>
                      <p>🕺 Social dancing until 11:45 PM</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-heading font-semibold text-primary">Ticket Pricing:</p>
                      <p>🟢 Early Bird: £15 (class+party) / £10 (party)</p>
                      <p>🟡 Standard: £17 (class+party) / £12 (party)</p>
                      <p>🔴 Door: £20 (class+party) / £15 (party)</p>
                    </div>
                  </div>
                  <Countdown target={nextEvent} />
                  <div className="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Get Tickets</a>
                    <a href={getGoogleCalendarUrl(nextEvent)} target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm inline-flex items-center gap-2">
                      <Calendar size={14} /> Add to Google Calendar
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-primary-foreground/60 text-lg mb-4">New dates coming soon — follow @puranights.salsabachata for announcements</p>
                  <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Follow @puranights.salsabachata</a>
                </div>
              )}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* All 2026 Latin Friday Dates */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold text-center mb-2">2026 Latin Friday Calendar</h2>
            <p className="text-muted-foreground text-center text-sm mb-10">2nd Friday of every month · Drayton Court Hotel, Ealing</p>
          </FadeInUp>
          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.05}>
            {latinFridayDates2026.map((date, i) => {
              const isPast = date < now;
              const dateLabel = date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
              return (
                <StaggerItem key={i}>
                  <div className={`bg-card rounded-2xl p-5 card-hover ${isPast ? "opacity-50" : ""}`}>
                    <p className="font-heading font-bold text-sm mb-1">{dateLabel}</p>
                    <p className="text-muted-foreground text-xs mb-2">7:15 PM – 11:45 PM · Drayton Court Hotel</p>
                    <div className="flex gap-2">
                      <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="text-primary text-xs font-heading font-semibold hover:underline inline-flex items-center gap-1">
                        <ExternalLink size={10} /> Tickets
                      </a>
                      <a href={getGoogleCalendarUrl(date)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-xs font-heading hover:text-primary inline-flex items-center gap-1">
                        <Calendar size={10} /> Calendar
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Weekly Events */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-2">Weekly Schedule</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10" />
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {[
              { title: "Pura Nights Chiswick", day: "Every Monday", venue: "The George IV, 185 Chiswick High Rd, W4 2DR", time: "7:30–11 PM", desc: "3 levels of Salsa & Bachata + social dancing", price: "From £10" },
              { title: "Pura Nights Ealing", day: "Every Tuesday", venue: "Drayton Court Hotel, 2 The Avenue, W13 8PH", time: "6:50–11 PM", desc: "Free Ladies Styling + 3 levels + social dancing", price: "From £10" },
            ].map((e) => (
              <StaggerItem key={e.title}>
                <div className="bg-charcoal-light rounded-2xl p-6 card-hover h-full">
                  <h3 className="font-heading font-bold mb-1 text-primary-foreground">{e.title}</h3>
                  <p className="text-primary font-heading text-sm font-semibold mb-2">{e.day}</p>
                  <p className="text-primary-foreground/50 text-xs mb-1">{e.venue}</p>
                  <p className="text-primary-foreground/50 text-xs mb-3">{e.time}</p>
                  <p className="text-sm text-primary-foreground/70 mb-3">{e.desc}</p>
                  <p className="text-primary font-heading font-semibold text-sm">{e.price}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-main">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Don't Miss Out</h2>
          <p className="text-primary-foreground/80 mb-8">Follow us for event announcements and last-minute deals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="btn-cta-dark">📲 Follow @puranights</a>
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-outline">💬 Join WhatsApp Group</a>
          </div>
        </div>
      </section>
      <RelatedPages title="Related Pages" links={[
        { to: "/pura-nights", label: "Weekly Classes", desc: "Mon Chiswick · Tue Ealing" },
        { to: "/pura-ladies", label: "Pura Ladies", desc: "Performance team" },
        { to: "/gallery", label: "Gallery", desc: "Photos & videos" },
        { to: "/prices", label: "Prices", desc: "All pricing" },
        { to: "/locations", label: "Venues", desc: "Directions" },
      ]} />
    </Layout>
  );
};

export default Events;
