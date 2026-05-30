import { Sparkles, Users, Heart, MapPin, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import EnquiryForm from "@/components/EnquiryForm";
import RelatedPages from "@/components/RelatedPages";
import ProofBlock from "@/components/ProofBlock";
import { FadeInUp } from "@/components/animations";
import WhoThisIsForBlock from "@/components/WhoThisIsForBlock";
import NextStepServiceGrid from "@/components/NextStepServiceGrid";
import ProofNudge from "@/components/ProofNudge";

const groupFaqs = [
  { q: "Do guests need experience or a partner?", a: "Neither. Every routine is built from zero with full partner rotation, so the shy ones get to giggle and the confident ones get to lead." },
  { q: "Can you come to our venue or Airbnb?", a: "Yes — Melitta brings a portable sound system. Hotels, Airbnbs, members' clubs, restaurants with private rooms all work." },
  { q: "Can it be Salsa, Bachata or both?", a: "Either — pick what suits the vibe. Bachata is slower and more romantic, Salsa is upbeat and playful. Mixed sessions are very popular for hen parties." },
  { q: "What size group works best?", a: "8 to 30 is the sweet spot for hen and birthday parties. Larger groups absolutely work — we just adjust the format." },
  { q: "Can you teach a choreographed group routine?", a: "Yes — perfect for hen surprises or family weddings. Allow 90 minutes for a polished short routine." },
  { q: "Is it cringe? Be honest.", a: "No. Adults having fun together — not awkward team-building. The room is laughing within the first 5 minutes." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Service", "FAQPage"],
  name: "Private Group Salsa & Bachata Parties London",
  serviceType: "Private group dance party",
  provider: { "@type": "DanceSchool", name: "Melitta Siomos Dance Academy", url: "https://www.puranights.com" },
  areaServed: { "@type": "City", name: "London" },
  description: "Private Salsa and Bachata parties in London for hen parties, birthdays, family celebrations and friend groups. Beginner-friendly, no partner needed, tailored to your group.",
  url: "https://www.puranights.com/private-group-dance-parties-london",
  mainEntity: groupFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const PrivateGroupDancePartiesLondon = () => (
  <Layout>
    <SeoHead
      title="Private Salsa & Bachata Parties London | Hen, Birthday & Group Bookings"
      description="Private Salsa and Bachata parties in London for hen parties, birthdays, family celebrations and friend groups. Fun, beginner-friendly Latin dance — no partner needed."
      path="/private-group-dance-parties-london"
      schema={schema}
      dateModified="2026-05-15"
    />

    {/* Hero */}
    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(800px 400px at 70% 30%, hsl(var(--secondary)/0.4), transparent 60%)" }} />
      <div className="container-main max-w-4xl relative">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Hen · Birthday · Family · Friends</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Private Salsa &amp; Bachata Parties in London
          </h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl mb-8 font-heading">
            Fun, beginner-friendly Latin dance sessions for birthdays, hen parties, family celebrations and group nights out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#enquiry" className="btn-cta-primary text-sm">Plan a private dance party →</a>
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20plan%20a%20private%20group%20dance%20party" target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm">💬 WhatsApp your date</a>
          </div>
        </FadeInUp>
      </div>
    </section>
    <ProofNudge
      quote="My hen do — eight of us, half had never danced — and Melitta had us all in stitches doing salsa within ten minutes."
      attribution="Priya, Bride · Chiswick hen party"
      trustCue="Tailored to your group · Reply within 24h"
      waContext="groupParty"
    />

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          tone="warm"
          question="What is a private Pura Nights dance party?"
          answer="A private 45–90 minute Latin dance session for your group at your venue, an Airbnb, or one of Pura Nights' partner venues in West London. Hen parties, birthdays and group celebrations are our specialty. No partner, no experience and no cringe — just adults having a great time."
          bullets={[
            "Salsa, Bachata or both — your choice",
            "8 to 30 guests is the sweet spot (larger works too)",
            "Optional choreographed group routine for surprises",
            "Quote on enquiry — tailored to vibe and venue",
          ]}
        />
      </div>
    </section>

    <section className="section-padding section-ivory">
      <div className="container-main max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">Perfect For</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Sparkles, title: "Hen parties" },
            { icon: Heart, title: "Birthdays" },
            { icon: Users, title: "Date-night groups" },
            { icon: Heart, title: "Family celebrations" },
            { icon: Sparkles, title: "Cultural events" },
            { icon: Users, title: "Girls' nights" },
            { icon: Sparkles, title: "Pre-party warm-up" },
            { icon: MapPin, title: "Out-of-town visitors" },
          ].map(b => (
            <div key={b.title} className="bg-card rounded-2xl p-5 border border-border/40 flex items-center gap-3">
              <b.icon size={22} className="text-secondary flex-shrink-0" />
              <p className="font-heading font-semibold text-sm">{b.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Packages</h2>
        <p className="text-muted-foreground text-center mb-10 font-heading text-sm">All packages quoted on enquiry — pricing depends on group size, venue and format.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: "45-min Party Taster", desc: "One dance, big energy. Perfect ice-breaker." },
            { name: "60-min Group Session", desc: "Salsa or Bachata workshop with full rotation." },
            { name: "90-min Class + Social", desc: "Class then a short social dance set with playlist." },
            { name: "Choreographed Routine", desc: "Build a polished short group piece — great for surprises." },
          ].map(p => (
            <div key={p.name} className="bg-card rounded-2xl p-6 border border-border/40 card-hover">
              <h3 className="font-heading font-bold mb-2">{p.name}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
              <p className="text-xs text-muted-foreground mt-4">Tailored quote</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-6 text-center">Why It Works</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "No partner needed — full rotation",
            "Beginner-friendly — every time",
            "Salsa, Bachata or both",
            "Mixed-confidence groups thrive",
            "Adults having fun, never cringe",
            "Works at venues, Airbnbs and our partner venues",
          ].map(o => (
            <div key={o} className="flex gap-3 items-start">
              <CheckCircle2 size={18} className="text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm font-heading">{o}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* What groups say */}
    <ProofBlock
      categories={["group", "community", "beginner"]}
      eyebrow="Real Voices"
      title="What groups say"
      subtitle="From hen parties, birthdays and friend groups."
      limit={3}
      variant="light"
    />

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Group Party FAQs</h2>
        <div className="space-y-4">
          {groupFaqs.map(f => (
            <details key={f.q} className="bg-card rounded-xl p-5 border border-border/40 group">
              <summary className="font-heading font-bold text-sm cursor-pointer list-none flex justify-between">
                {f.q}<span className="text-primary group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section id="enquiry" className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Plan Your Party</h2>
        <p className="text-muted-foreground text-center mb-8 font-heading text-sm">Most enquiries are quoted within 24 hours.</p>
        <EnquiryForm
          enquiryType="Private Group Party — Hen / Birthday"
          contextLabel="Private Group Dance Party London"
          whatsappUrl="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20plan%20a%20private%20group%20dance%20party"
          extraFields={[
            { name: "eventDate", label: "Date of party", type: "date" },
            { name: "location", label: "Venue / postcode", placeholder: "Airbnb, hotel, or 'help me find one'" },
            { name: "groupSize", label: "Group size", placeholder: "e.g. 12" },
            { name: "sessionType", label: "Salsa / Bachata / Mixed", placeholder: "Mixed is most popular" },
          ]}
          messagePlaceholder="Tell us the occasion — hen, birthday, family party, surprise routine, etc. Optional: how did you hear about us?"
        />
        <p className="text-center text-xs text-muted-foreground mt-5 font-heading">
          ⏱ We usually respond within 2 hours on weekdays. Prefer to WhatsApp? <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20plan%20a%20private%20group%20dance%20party%20-%20date%3A%20%2C%20group%20size%3A%20" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Send your date and group size directly →</a>
        </p>
      </div>
    </section>

    <WhoThisIsForBlock
      title="Who books a private party with Melitta"
      personas={[
        { label: "Hen party organisers", description: "Want something memorable, beginner-friendly and zero-cringe." },
        { label: "Milestone birthdays", description: "30th, 40th, 50th — a Latin dance hour beats another dinner." },
        { label: "Family celebrations", description: "Pre-wedding, anniversary or family reunion." },
        { label: "Friend groups", description: "Just an excuse to do something different together." },
      ]}
    />
    <NextStepServiceGrid
      items={[
        { to: "/corporate-dance-classes-london", label: "Corporate Sessions", description: "Same energy, team-building format." },
        { to: "/wedding-dance", label: "Wedding Dance", description: "If the party is for a wedding, ask about choreography too." },
        { to: "/contact", label: "Plan Your Party", description: "Share date, group size and vibe." },
      ]}
    />
    <RelatedPages title="Explore More" links={[
      { to: "/wedding-dance", label: "Wedding Dance" },
      { to: "/private-lessons", label: "Private Lessons" },
      { to: "/corporate-dance-classes-london", label: "Corporate Bookings" },
      { to: "/events", label: "Latin Friday Events" },
      { to: "/testimonials", label: "What People Say" },
      { to: "/contact", label: "Contact" },
    ]} />
  </Layout>
);

export default PrivateGroupDancePartiesLondon;
