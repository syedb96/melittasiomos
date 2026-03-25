import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Music, Users, Ticket } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const getNextLatinFriday = () => {
  const now = new Date();
  let d = new Date(now.getFullYear(), now.getMonth(), 1);
  // Find 2nd Friday of this month
  let fridayCount = 0;
  while (fridayCount < 2) {
    if (d.getDay() === 5) fridayCount++;
    if (fridayCount < 2) d.setDate(d.getDate() + 1);
  }
  d.setHours(19, 15, 0, 0);
  if (d < now) {
    // Move to next month
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    fridayCount = 0;
    d = next;
    while (fridayCount < 2) {
      if (d.getDay() === 5) fridayCount++;
      if (fridayCount < 2) d.setDate(d.getDate() + 1);
    }
    d.setHours(19, 15, 0, 0);
  }
  return d;
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
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: mins },
    { label: "Seconds", value: secs },
  ];
  return (
    <div className="flex justify-center gap-4">
      {units.map((u) => (
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

const upcomingEvents = [
  { title: "Pura Nights Chiswick", day: "Every Monday", venue: "The George IV, 185 Chiswick High Rd, W4 2DR", time: "7:30–11 PM", desc: "3 levels of Salsa & Bachata + social dancing", price: "From £10" },
  { title: "Pura Nights Ealing", day: "Every Tuesday", venue: "Drayton Court Hotel, 2 The Avenue, W13 8PH", time: "6:50–11 PM", desc: "Ladies Styling + 3 levels + social dancing", price: "From £10" },
  { title: "Pura Ladies Rehearsal", day: "Every Thursday", venue: "Covent Garden Studio", time: "7:15 PM", desc: "Team rehearsal (audition required)", price: "Members only" },
];

const Events = () => {
  const nextFriday = getNextLatinFriday();
  const dateStr = nextFriday.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

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

      {/* Featured: Latin Friday */}
      <section className="section-padding bg-charcoal">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <div className="border-2 border-primary rounded-2xl p-8 md:p-12">
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-widest mb-2">Featured Event</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">🔥 Pura Nights Latin Friday</h2>
              <p className="text-primary-foreground/60 text-sm mb-2">{dateStr}</p>
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

              <Countdown target={nextFriday} />

              <div className="text-center mt-8">
                <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Get Tickets</a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Weekly Events Grid */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold text-center mb-2">Weekly Schedule</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10" />
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((e) => (
              <StaggerItem key={e.title}>
                <div className="bg-card rounded-2xl p-6 card-hover h-full">
                  <h3 className="font-heading font-bold mb-1">{e.title}</h3>
                  <p className="text-primary font-heading text-sm font-semibold mb-2">{e.day}</p>
                  <p className="text-muted-foreground text-xs mb-1">{e.venue}</p>
                  <p className="text-muted-foreground text-xs mb-3">{e.time}</p>
                  <p className="text-sm text-muted-foreground mb-3">{e.desc}</p>
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
    </Layout>
  );
};

export default Events;
