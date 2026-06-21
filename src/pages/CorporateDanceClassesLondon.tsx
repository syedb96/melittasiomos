import { Link } from "react-router-dom";
import { Briefcase, Users, Sparkles, Calendar, MapPin, Award, CheckCircle2, Quote, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import EnquiryForm from "@/components/EnquiryForm";
import RelatedPages from "@/components/RelatedPages";
import VideoTestimonialsBlock from "@/components/VideoTestimonialsBlock";
import ProofBlock from "@/components/ProofBlock";
import { FadeInUp } from "@/components/animations";
import EditorialQuote from "@/components/EditorialQuote";
import WhoThisIsForBlock from "@/components/WhoThisIsForBlock";
import NextStepServiceGrid from "@/components/NextStepServiceGrid";
import ProofNudge from "@/components/ProofNudge";
import { waCustom } from "@/lib/whatsapp";
import { ServiceGate } from "@/components/commerce/CommercePrimitives";

const CORPORATE_PAUSED = (
  <div className="bg-charcoal/10 border border-charcoal/20 rounded-lg px-4 py-3 text-sm text-charcoal/80 max-w-md mx-auto">
    Corporate bookings are temporarily paused. Email <a className="underline" href="mailto:siomosmelitta@gmail.com">siomosmelitta@gmail.com</a> with your date and team size and we'll be in touch.
  </div>
);

const corporateFaqs = [
  { q: "Do people need any dance experience?", a: "No — every session is built for total beginners. Mixed-ability teams work best because the room laughs together and learns together." },
  { q: "Do guests need a partner?", a: "No partner needed. We rotate throughout each session so everyone dances with everyone, which is part of the team-building magic." },
  { q: "Can you come to our office?", a: "Yes. Melitta runs sessions at offices, hotels, members' clubs and hired studios across London. We bring a portable speaker and the energy." },
  { q: "Can you book a venue for us?", a: "Yes — Pura Nights' partner venues in Chiswick and Ealing can host private corporate evenings with dance floor and bar already set up." },
  { q: "Is it suitable for mixed-ability and mixed-age teams?", a: "Absolutely — Melitta has 15+ years teaching adults from 20s to 60s with no prior experience. The format is inclusive by design." },
  { q: "What group sizes work best?", a: "Anywhere from 8 to 80. Smaller groups (8–25) are intimate and high-touch; larger (40–80) become a proper Latin party with optional social dancing after." },
  { q: "Can it be part of our Christmas or summer party?", a: "Yes — a 60-minute Salsa or Bachata session is the perfect ice-breaker before dinner or during the warm-up of an evening event." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Service", "FAQPage"],
  name: "Corporate Salsa & Bachata Classes London",
  serviceType: "Corporate dance team-building",
  provider: {
    "@type": "DanceSchool",
    name: "Melitta Siomos Dance Academy",
    url: "https://www.puranights.com",
    telephone: "+447449482343",
    email: "siomosmelitta@gmail.com",
  },
  areaServed: { "@type": "City", name: "London" },
  description: "Corporate Salsa and Bachata team-building classes in London. Office, venue or evening packages tailored to your team. No experience or partner required.",
  url: "https://www.puranights.com/corporate-dance-classes-london",
  mainEntity: corporateFaqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const packages = [
  { name: "45-minute Taster", desc: "Pre-dinner ice-breaker. One dance, big energy.", best: "8–40 guests" },
  { name: "60-minute Team Class", desc: "Full Salsa or Bachata workshop with rotation.", best: "10–60 guests" },
  { name: "90-minute Class + Social", desc: "Class then short social dance set with playlist.", best: "15–80 guests" },
  { name: "Full Evening Package", desc: "Class, social dancing and optional performance.", best: "30–120 guests" },
  { name: "Bespoke Corporate Event", desc: "Multi-week programme, away day, or annual party.", best: "By design" },
];

const CorporateDanceClassesLondon = () => (
  <Layout>
    <SeoHead
      title="Corporate Dance Classes London | Salsa & Bachata Team Building"
      description="Corporate Salsa & Bachata classes in London. Team building that gets people laughing, moving and connecting. Office, venue or full evening packages — beginner-friendly, no partner needed."
      path="/corporate-dance-classes-london"
      schema={schema}
      dateModified="2026-05-15"
    />

    {/* Hero */}
    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(800px 400px at 30% 30%, hsl(var(--primary)/0.4), transparent 60%)" }} />
      <div className="container-main max-w-4xl relative">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">For Teams · Offices · Events</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Corporate Salsa &amp; Bachata Classes in London
          </h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl mb-8 font-heading">
            Team-building that gets people laughing, moving and connecting — without awkward icebreakers.
            Beginner-friendly Latin dance sessions led by Bachata UK Champion Melitta Siomos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#enquiry" className="btn-cta-primary text-sm">Enquire for your team →</a>
            <a {...waCustom("Hi Melitta, I'd like to enquire about a corporate Salsa/Bachata session", "CorporateDanceClassesLondon:81")} className="btn-cta-ghost text-sm">💬 WhatsApp Melitta</a>
          </div>
        </FadeInUp>
      </div>
    </section>
    <ProofNudge
      quote="The whole office was on the floor in 15 minutes — and laughing for the rest of the night. Best team day we've done."
      attribution="Hannah, Ops Lead · Notting Hill agency"
      trustCue="All abilities welcome · Reply within 1 working day"
      waContext="corporate"
    />

    <div className="section-warm">
      <EditorialQuote
        quote={`"Within twenty minutes the entire team was laughing, leading, and learning — barriers we'd spent months trying to break dissolved on the dance floor."`}
        attribution="Head of People, FTSE-100 client"
      />
    </div>

    {/* Answer box for AI/GEO */}
    <section className="section-padding section-warm">

      <div className="container-main max-w-3xl">
        <AnswerBox
          tone="warm"
          question="What is a Pura Nights corporate dance session?"
          answer="A Pura Nights corporate session is a beginner-friendly Salsa or Bachata class delivered to your team at your office, venue or one of our partner venues in West London. Led by Bachata UK Champion Melitta Siomos, sessions run 45–90 minutes and are designed for total beginners with no partner required."
          bullets={[
            "Salsa, Bachata or mixed Latin — your choice",
            "8 to 120 guests, all ability levels welcome",
            "London-wide — we come to you, or host at our venues",
            "Quote on enquiry — pricing tailored to group size and format",
          ]}
          cta={{ label: "Send a corporate enquiry", to: "#enquiry" } as any}
        />
      </div>
    </section>

    {/* Who it's for */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Who It's For</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 font-heading text-sm">
            If your team needs to switch off, connect and laugh together — this works.
          </p>
        </FadeInUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Briefcase, title: "Office team building" },
            { icon: Sparkles, title: "Staff wellbeing days" },
            { icon: Users, title: "Client entertainment" },
            { icon: Calendar, title: "Christmas parties" },
            { icon: Calendar, title: "Summer socials" },
            { icon: MapPin, title: "Away days" },
            { icon: Award, title: "Hospitality activations" },
            { icon: Users, title: "University & adult societies" },
          ].map(b => (
            <div key={b.title} className="bg-card rounded-2xl p-5 border border-border/40 flex items-center gap-3">
              <b.icon size={22} className="text-primary flex-shrink-0" />
              <p className="font-heading font-semibold text-sm">{b.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Quote band — featured client voice (mid-page proof) */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl text-center">
        <Quote size={28} className="text-primary mx-auto mb-4" />
        <p className="font-display text-2xl md:text-3xl text-primary-foreground leading-snug mb-5">
          "Best icebreaker we've ever booked. Two engineers who never speak ended up dancing in the same circle — and the team still talks about it three months later."
        </p>
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary">
          People Lead · 60-person tech offsite · Central London
        </p>
        <div className="mt-8">
          <a href="#enquiry" className="btn-cta-primary text-sm">Get a quote for your team →</a>
        </div>
      </div>
    </section>

    {/* Outcomes */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">What Your Team Walks Away With</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Real connection — beats any trust-fall",
            "Confidence — even the shy ones light up",
            "Movement and energy after a long week",
            "Inclusive activity — every fitness level",
            "No partner needed — full rotation",
            "A shared memory the office talks about for months",
          ].map(o => (
            <div key={o} className="flex gap-3 items-start">
              <CheckCircle2 size={20} className="text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm font-heading">{o}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Packages */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Packages</h2>
          <p className="text-muted-foreground text-center mb-10 font-heading text-sm">
            All packages are quoted on enquiry — pricing depends on group size, location and format.
          </p>
        </FadeInUp>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map(p => (
            <div key={p.name} className="bg-card rounded-2xl p-6 border border-border/40 card-hover flex flex-col">
              <h3 className="font-heading font-bold text-lg mb-2">{p.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">{p.desc}</p>
              <p className="text-xs font-accent uppercase tracking-wider text-primary">Best for: {p.best}</p>
              <p className="text-xs text-muted-foreground mt-3">From enquiry · Tailored quote</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center text-primary-foreground">How It Works</h2>
        <ol className="space-y-5">
          {[
            "Send a quick enquiry with date, group size and venue idea.",
            "We confirm format — Salsa, Bachata or mixed Latin.",
            "Choose office, your venue, or one of our Chiswick/Ealing venues.",
            "Melitta delivers the session with full music, mics and rotation.",
            "Optional add-ons — social dancing, performance, follow-up classes.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4 items-start bg-charcoal-light/40 rounded-xl p-5 border border-primary-foreground/10">
              <span className="font-display text-2xl text-primary font-bold flex-shrink-0 w-8">{i + 1}</span>
              <p className="text-primary-foreground/85 text-sm md:text-base font-heading">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Trust */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Why Pura Nights for Corporate</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            { v: "15+", l: "Years teaching adults" },
            { v: "500+", l: "Students taught" },
            { v: "UK", l: "Bachata Champion" },
            { v: "5.0", l: "Google rating" },
          ].map(s => (
            <div key={s.l} className="bg-card rounded-2xl p-5 border border-border/40">
              <p className="font-display text-3xl font-bold text-primary">{s.v}</p>
              <p className="text-xs font-heading text-muted-foreground mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* What teams say — social proof */}
    <ProofBlock
      categories={["group", "community"]}
      eyebrow="Real Voices"
      title="What teams &amp; groups say"
      subtitle="Verified students and group bookings — first name + context only."
      limit={3}
      variant="light"
    />

    {/* FAQ */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">Corporate FAQs</h2>
        <div className="space-y-4">
          {corporateFaqs.map(f => (
            <details key={f.q} className="bg-card rounded-xl p-5 border border-border/40 group">
              <summary className="font-heading font-bold text-sm cursor-pointer list-none flex justify-between gap-3">
                {f.q}
                <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* Urgency strip — Christmas / quarter planning */}
    <section className="py-8 bg-primary/10 border-y border-primary/20">
      <div className="container-main max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <Clock size={22} className="text-primary flex-shrink-0" />
          <div>
            <p className="font-heading font-bold text-sm">Christmas &amp; Q1 dates fill from August</p>
            <p className="text-xs text-muted-foreground">Most corporate bookings confirm 4–8 weeks ahead. Hold a date with a quick enquiry — no obligation.</p>
          </div>
        </div>
        <a href="#enquiry" className="btn-cta-primary text-xs whitespace-nowrap">Check availability →</a>
      </div>
    </section>

    {/* Enquiry */}
    <section id="enquiry" className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Send a Corporate Enquiry</h2>
          <p className="text-muted-foreground text-center mb-8 font-heading text-sm">
            Most enquiries get a quote within 24 hours. For an instant reply, WhatsApp Melitta directly.
          </p>
        </FadeInUp>
        <EnquiryForm
          enquiryType="Corporate Booking — Team Building"
          contextLabel="Corporate Dance Classes London"
          whatsappUrl={waCustom("Hi Melitta, I'd like to enquire about a corporate Salsa/Bachata session", "CorporateDanceClassesLondon:303").href}
          extraFields={[
            { name: "company", label: "Company", placeholder: "Acme Ltd" },
            { name: "eventDate", label: "Preferred date", type: "date" },
            { name: "location", label: "Location", placeholder: "Office / venue / postcode" },
            { name: "groupSize", label: "Group size", placeholder: "e.g. 25" },
            { name: "sessionType", label: "Session type", placeholder: "Salsa / Bachata / Mixed Latin" },
            { name: "budget", label: "Budget (optional)", placeholder: "e.g. £500–£800" },
          ]}
          messagePlaceholder="Tell us about the team — vibe, occasion, anything we should know. Optional: how did you hear about us? (Google, Instagram, referral, venue, other)"
        />
        <p className="text-center text-xs text-muted-foreground mt-5 font-heading">
          ⏱ We usually respond within 2 hours on weekdays. Prefer to WhatsApp? <a {...waCustom("Hi Melitta, I'd like to enquire about a corporate Salsa/Bachata session - date: , group size: ", "CorporateDanceClassesLondon:315")} className="text-primary font-semibold hover:underline">Send your date and group size directly →</a>
        </p>
      </div>
    </section>

    <VideoTestimonialsBlock
      heading="Watch how a Pura corporate session actually feels"
      subcopy="Two short clips from real Pura Nights corporate clients — same room, very different teams."
      testimonials={[
        {
          name: "Tech Team Offsite",
          context: "60-minute Salsa session · Soho Co-working space",
          youtubeId: "dQw4w9WgXcQ",
          quote: "Best icebreaker we've ever booked. Two engineers who never speak ended up in the same dance circle.",
        },
        {
          name: "Christmas Party",
          context: "90-minute Bachata + social · West London hotel",
          youtubeId: "dQw4w9WgXcQ",
          quote: "Melitta read the room instantly. The team's still talking about it three months later.",
        },
      ]}
    />

    <WhoThisIsForBlock
      title="Who books corporate dance sessions"
      personas={[
        { label: "HR & People teams", description: "Need a memorable, inclusive activity for an off-site or away-day." },
        { label: "Team-building organisers", description: "Want everyone laughing and connecting within 5 minutes." },
        { label: "Wellbeing leads", description: "Movement-based wellbeing that's actually enjoyable." },
        { label: "Party planners", description: "Christmas, summer or end-of-quarter — a perfect ice-breaker." },
      ]}
    />
    <NextStepServiceGrid
      items={[
        { to: "/private-group-dance-parties-london", label: "Group Parties", description: "Hen, birthday and family group bookings." },
        { to: "/partner-with-pura-nights", label: "Partner With Us", description: "Venues, wellness brands and event partners." },
        { to: "/contact", label: "Get a Quote", description: "Tell us about your team and dates." },
      ]}
    />
    <RelatedPages title="Explore More" links={[
      { to: "/private-lessons", label: "Private Lessons" },
      { to: "/events", label: "Latin Friday Events" },
      { to: "/pura-nights", label: "Weekly Classes" },
      { to: "/venue/the-drayton-court-ealing", label: "Drayton Court, Ealing" },
      { to: "/venue/the-george-iv-chiswick", label: "George IV, Chiswick" },
      { to: "/testimonials", label: "Testimonials" },
    ]} />
  </Layout>
);

export default CorporateDanceClassesLondon;
