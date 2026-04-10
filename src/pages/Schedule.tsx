import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Calendar, Music, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp } from "@/components/animations";

const Schedule = () => (
  <Layout>
    <SeoHead
      title="Class Schedule | Salsa & Bachata Weekly Timetable | Pura Nights London"
      description="Full weekly timetable for Pura Nights salsa and bachata classes in Chiswick (Monday) and Ealing (Tuesday). Plus monthly Latin Friday social. All levels welcome, no partner needed."
      path="/schedule"
      schema={{
        "@context": "https://schema.org",
        "@type": "Schedule",
        name: "Pura Nights Weekly Class Schedule",
        description: "Weekly salsa and bachata classes in West London",
      }}
    />

    <section className="bg-charcoal text-primary-foreground section-padding">
      <div className="container-main max-w-5xl text-center">
        <FadeInUp>
          <span className="inline-block font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">2026 Timetable</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Weekly Class Schedule</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">Two locations, five classes, unlimited social dancing. Here's when and where to find us every week.</p>
        </FadeInUp>
      </div>
    </section>

    {/* Monday Chiswick */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <FadeInUp>
            <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Calendar size={24} className="text-primary" />
                <div>
                  <h2 className="font-display text-2xl font-bold">Monday — Chiswick</h2>
                  <p className="text-muted-foreground text-sm">Every Monday, term-time</p>
                </div>
              </div>
              <div className="flex items-start gap-2 mb-6 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-foreground">The George IV Pub</p>
                  <p>185 Chiswick High Rd, London W4 2DR</p>
                  <p className="text-xs mt-1">🚇 Turnham Green (2 min) · Chiswick Park (5 min)</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { time: "7:30 – 8:15 PM", label: "Beginners Salsa", color: "text-primary" },
                  { time: "8:15 – 9:00 PM", label: "Beginners Bachata", color: "text-primary" },
                  { time: "7:30 – 8:15 PM", label: "Improvers Salsa", color: "text-secondary" },
                  { time: "8:15 – 9:00 PM", label: "Improvers Bachata", color: "text-secondary" },
                  { time: "9:00 – 11:00 PM", label: "Social Dancing", color: "text-muted-foreground" },
                ].map((slot, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className={slot.color} />
                      <span className="font-heading font-semibold text-sm">{slot.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-accent">{slot.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs px-4 py-2">Book →</a>
                <a href="https://maps.google.com/?q=The+George+IV+185+Chiswick+High+Rd+London+W4+2DR" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-xs px-4 py-2">📍 Get Directions</a>
              </div>
            </div>
          </FadeInUp>

          {/* Tuesday Ealing */}
          <FadeInUp delay={0.15}>
            <div className="bg-card rounded-2xl p-8 border-2 border-secondary/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Calendar size={24} className="text-secondary" />
                <div>
                  <h2 className="font-display text-2xl font-bold">Tuesday — Ealing</h2>
                  <p className="text-muted-foreground text-sm">Every Tuesday, term-time</p>
                </div>
              </div>
              <div className="flex items-start gap-2 mb-6 text-sm text-muted-foreground">
                <MapPin size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Drayton Court Hotel</p>
                  <p>2 The Avenue, West Ealing, W13 8PH</p>
                  <p className="text-xs mt-1">🚇 West Ealing (3 min) · Ealing Broadway (10 min)</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { time: "6:50 – 7:20 PM", label: "🆓 Free Ladies Styling Warm-Up", color: "text-peach" },
                  { time: "6:50 – 7:35 PM", label: "Beginners Salsa", color: "text-secondary" },
                  { time: "7:35 – 8:20 PM", label: "Beginners Bachata", color: "text-secondary" },
                  { time: "8:20 – 9:05 PM", label: "Intermediate Salsa", color: "text-primary" },
                  { time: "9:05 – 9:50 PM", label: "Intermediate Bachata", color: "text-primary" },
                  { time: "9:50 – 11:00 PM", label: "Social Dancing", color: "text-muted-foreground" },
                ].map((slot, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className={slot.color} />
                      <span className="font-heading font-semibold text-sm">{slot.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-accent">{slot.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs px-4 py-2">Book →</a>
                <a href="https://maps.google.com/?q=Drayton+Court+Hotel+2+The+Avenue+Ealing+W13+8PH" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-xs px-4 py-2">📍 Get Directions</a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* Pricing Quick Ref */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-8">Quick Pricing</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { price: "£15", label: "2 Classes + Social", note: "Best value" },
              { price: "£10", label: "1 Class + Social", note: "Great for a taster" },
              { price: "£5", label: "Social Only", note: "Dance all night" },
            ].map((p, i) => (
              <div key={i} className="bg-background rounded-xl p-6 border border-border">
                <p className="font-display text-3xl font-bold text-primary mb-1">{p.price}</p>
                <p className="font-heading font-semibold text-sm mb-1">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Bundles & monthly passes available · <Link to="/prices" className="text-primary font-heading font-semibold hover:underline">See full pricing →</Link>
          </p>
        </FadeInUp>
      </div>
    </section>

    {/* Monthly Latin Friday */}
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-4xl text-center">
        <FadeInUp>
          <div className="inline-flex items-center gap-2 mb-4">
            <Music size={20} className="text-primary" />
            <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary">Monthly Event</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Latin Friday at Drayton Court</h2>
          <p className="text-primary-foreground/60 max-w-lg mx-auto mb-8">Once a month, the biggest Latin night in West London. Workshop, performances, DJ sets and social dancing until late.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/events" className="btn-cta-primary">See Upcoming Dates</Link>
            <Link to="/blog/pura-nights-latin-friday-guide" className="btn-cta-outline">Read the Guide <ArrowRight size={16} className="ml-2" /></Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-center">
      <div className="container-main">
        <FadeInUp>
          <Users size={32} className="text-primary-foreground mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Ready to Dance?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">No partner needed. No experience required. Just you and the music.</p>
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground hover:bg-charcoal-light text-base px-10 py-3.5">
            🎟 Book Your First Class
          </a>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages title="Related Pages" links={[
      { to: "/pura-nights", label: "About Pura Nights" },
      { to: "/prices", label: "Full Pricing" },
      { to: "/locations", label: "Venue Directions" },
      { to: "/start-here", label: "Start Here Guide" },
      { to: "/salsa-classes-chiswick", label: "Salsa in Chiswick" },
      { to: "/bachata-classes-ealing", label: "Bachata in Ealing" },
    ]} />
  </Layout>
);

export default Schedule;
