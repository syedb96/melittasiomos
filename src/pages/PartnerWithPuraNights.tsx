import { useState } from "react";
import { Copy, Check, Handshake, Building2, Newspaper, Music2, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import EnquiryForm from "@/components/EnquiryForm";
import RelatedPages from "@/components/RelatedPages";
import ProofBlock from "@/components/ProofBlock";
import { FadeInUp } from "@/components/animations";
import { waCustom } from "@/lib/whatsapp";

const partnerFaqs = [
  { q: "Who do you partner with?", a: "Venues, hotels, pubs, wedding suppliers, photographers, DJs, local publications, brands, and community / university groups across West London." },
  { q: "What does Pura Nights bring to a partnership?", a: "An established West London audience of 500+ active students, weekly classes, monthly Latin Friday socials, social content reach, and award-winning instruction." },
  { q: "Can we host your classes at our venue?", a: "Yes — we're always open to a conversation about new venue partnerships, particularly Wednesdays and Thursdays in West London." },
  { q: "Do you collaborate with wedding suppliers?", a: "Yes. We refer regularly with photographers, planners and venues for wedding-dance couples through Wedding Dance Made Easy." },
  { q: "Do you accept brand or content collaborations?", a: "Yes — get in touch with the proposal and we'll respond within a few days." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ContactPage"],
  name: "Pura Nights — Partnerships",
  url: "https://www.puranights.com/partner-with-pura-nights",
  description: "Partner with Pura Nights — venue collaborations, supplier referrals, brand partnerships and media opportunities with West London's leading Salsa & Bachata community.",
  parentOrganization: { "@type": "DanceSchool", name: "Melitta Siomos Dance Academy", url: "https://www.puranights.com" },
  contactPoint: { "@type": "ContactPoint", contactType: "Partnerships", email: "siomosmelitta@gmail.com", telephone: "+447449482343", areaServed: "GB" },
  mainEntity: partnerFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const linkSnippets = [
  { label: "General Pura Nights mention", html: `<a href="https://www.puranights.com">Pura Nights</a> — weekly Salsa & Bachata classes in West London.` },
  { label: "Salsa Classes Chiswick", html: `Looking for Salsa classes in Chiswick? <a href="https://www.puranights.com/salsa-classes-chiswick">Pura Nights at The George IV</a> runs every Monday.` },
  { label: "Bachata Classes Ealing", html: `Tuesday Bachata in Ealing → <a href="https://www.puranights.com/bachata-classes-ealing">Pura Nights at the Drayton Court</a>.` },
  { label: "Latin Friday social", html: `Monthly Latin night out in West London — <a href="https://www.puranights.com/events">Pura Nights Latin Friday</a>.` },
  { label: "Wedding dance lessons", html: `For first dance choreography in London → <a href="https://www.puranights.com/wedding-dance">Wedding Dance Made Easy</a>.` },
];

const brandBios = {
  short: "Pura Nights is West London's leading Salsa & Bachata community — weekly classes in Chiswick & Ealing, monthly Latin Fridays and private events. Founded by Bachata UK Champion Melitta Siomos.",
  medium: "Pura Nights is a West London dance community offering weekly Salsa & Bachata classes at The George IV (Chiswick, Mondays) and the Drayton Court Hotel (Ealing, Tuesdays), monthly Latin Friday socials, private corporate and group bookings, and wedding-dance choreography. Founded and led by Bachata UK Champion Melitta Siomos with 15+ years teaching adults at every level.",
  long: "Pura Nights is the leading Salsa & Bachata dance community in West London. Weekly classes run at The George IV in Chiswick on Mondays and at the Drayton Court Hotel in Ealing on Tuesdays, with three levels per evening followed by social dancing. The monthly Latin Friday social brings the community together for a full evening of dancing at the Drayton Court. Founded by Bachata UK Champion Melitta Siomos, the academy also delivers corporate bookings, hen and birthday parties, private 1-to-1 coaching, and wedding-dance choreography through Wedding Dance Made Easy. The Pura Ladies performance team operates internationally across London, Plymouth, Munich and Lisbon.",
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-primary hover:text-foreground inline-flex items-center gap-1 text-xs font-heading font-semibold"
    >
      {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
    </button>
  );
};

const PartnerWithPuraNights = () => (
  <Layout>
    <SeoHead
      title="Partner with Pura Nights | Venue, Supplier & Brand Collaborations"
      description="Partner with Pura Nights — bring Salsa, Bachata and real community energy to your venue, event or audience. Venue collaborations, supplier referrals, brand and media partnerships in West London."
      path="/partner-with-pura-nights"
      schema={schema}
      dateModified="2026-05-15"
    />

    <section className="relative bg-charcoal text-primary-foreground section-padding overflow-hidden">
      <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(800px 400px at 50% 30%, hsl(var(--primary)/0.35), transparent 60%)" }} />
      <div className="container-main max-w-4xl relative">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Collaborations & Referrals</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">Partner with Pura Nights</h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl mb-8 font-heading">
            Bring Salsa, Bachata and real community energy to your venue, event or audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#enquiry" className="btn-cta-primary text-sm">Start a partnership conversation →</a>
            <a href="mailto:siomosmelitta@gmail.com?subject=Pura%20Nights%20Partnership%20Enquiry" className="btn-cta-ghost text-sm">✉ Email Melitta</a>
          </div>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <AnswerBox
          tone="warm"
          question="What kind of partnerships work with Pura Nights?"
          answer="Venue residencies, wedding-supplier referrals, corporate event activations, brand collaborations, local media features and community partnerships. We bring an established West London audience of 500+ engaged Salsa & Bachata dancers and a respected award-winning instructor brand."
          bullets={[
            "Venue collaborations — pubs, hotels, hospitality groups",
            "Wedding suppliers — photographers, planners, florists, venues",
            "Brand & content — dancewear, lifestyle, wellness",
            "Local media & community calendars",
          ]}
        />
      </div>
    </section>

    <section className="section-padding section-ivory">
      <div className="container-main max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">Who We Partner With</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Building2, title: "Venues, hotels, pubs" },
            { icon: Handshake, title: "Wedding suppliers" },
            { icon: Music2, title: "DJs & performers" },
            { icon: Newspaper, title: "Local media" },
            { icon: Users, title: "Corporate event organisers" },
            { icon: Handshake, title: "Dancewear & lifestyle brands" },
            { icon: Users, title: "Universities & adult societies" },
            { icon: Building2, title: "Community groups" },
          ].map(b => (
            <div key={b.title} className="bg-card rounded-2xl p-5 border border-border/40 flex items-center gap-3">
              <b.icon size={22} className="text-primary flex-shrink-0" />
              <p className="font-heading font-semibold text-sm">{b.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl font-bold mb-3 text-center">What Pura Nights Brings</h2>
        <p className="text-muted-foreground text-center mb-10 font-heading text-sm">A grown-up West London audience that actually shows up.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "500+ active student community across West London",
            "Weekly classes Mon (Chiswick) + Tue (Ealing)",
            "Monthly Latin Friday social at the Drayton Court",
            "Active Instagram across 4 brand handles",
            "Award-winning instruction — Bachata UK Champion",
            "Premium positioning — adult, friendly, never cringe",
          ].map(o => (
            <div key={o} className="bg-card rounded-xl p-4 border border-border/40">
              <p className="font-heading text-sm">{o}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Link snippets */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Link to Us — Copy &amp; Paste Snippets</h2>
        <p className="text-muted-foreground text-center mb-10 font-heading text-sm">
          Use these natural-anchor snippets in event listings, partner pages, blog posts or directories.
          Please keep links pointing to the canonical URLs shown.
        </p>
        <div className="space-y-4">
          {linkSnippets.map(s => (
            <div key={s.label} className="bg-card rounded-xl p-5 border border-border/40">
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="font-heading font-semibold text-sm">{s.label}</p>
                <CopyButton text={s.html} />
              </div>
              <code className="block text-xs text-muted-foreground bg-background/50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">{s.html}</code>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Brand kit */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Brand Kit</h2>
        <p className="text-muted-foreground text-center mb-10 font-heading text-sm">Approved bios for press, event listings and directories.</p>
        <div className="space-y-4">
          {[
            { label: "Short bio (≈50 words)", text: brandBios.short },
            { label: "Medium bio (≈100 words)", text: brandBios.medium },
            { label: "Long bio (≈150 words)", text: brandBios.long },
          ].map(b => (
            <div key={b.label} className="bg-card rounded-xl p-5 border border-border/40">
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="font-heading font-semibold text-sm">{b.label}</p>
                <CopyButton text={b.text} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
          <div className="bg-card rounded-xl p-5 border border-border/40 text-sm text-muted-foreground">
            <p className="font-heading font-semibold text-foreground mb-2">Photo & logo usage</p>
            <p>For approved photography, logos and event imagery please email <a href="mailto:siomosmelitta@gmail.com" className="text-primary hover:underline">siomosmelitta@gmail.com</a> with the proposed use. Press kits supplied on request within 48 hours.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Partnership FAQs</h2>
        <div className="space-y-4">
          {partnerFaqs.map(f => (
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

    {/* Community & venue proof */}
    <ProofBlock
      categories={["community", "beginner", "group"]}
      eyebrow="Why Partners Choose Us"
      title="What our community says"
      subtitle="500+ active students in our West London community."
      limit={3}
      variant="light"
    />

    {/* What happens next — partnership process */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">What happens next</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { n: "1", t: "Send your enquiry", d: "Tell us what you're proposing — venue, supplier, brand or media." },
            { n: "2", t: "We'll arrange a conversation", d: "A quick call or visit to scope what works for both sides." },
            { n: "3", t: "Agree a format", d: "A simple partnership that fits your audience and ours." },
          ].map(s => (
            <div key={s.n} className="bg-card rounded-2xl p-5 border border-border/40">
              <p className="font-display text-2xl text-primary font-bold mb-2">{s.n}</p>
              <h3 className="font-heading font-bold text-sm mb-1">{s.t}</h3>
              <p className="text-muted-foreground text-xs">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="enquiry" className="section-padding section-ivory">
      <div className="container-main max-w-3xl">
        <div className="inline-flex items-center gap-2 mb-4 mx-auto px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-heading font-semibold tracking-wider uppercase">⭐ 500+ students in our West London community</div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Start a Partnership Conversation</h2>
        <p className="text-muted-foreground text-center mb-8 font-heading text-sm">We review all partnership enquiries within 48 hours.</p>
        <EnquiryForm
          enquiryType="Partnership / Venue Collaboration"
          contextLabel="Partner with Pura Nights"
          whatsappUrl=waCustom("Hi Melitta, I'd like to discuss a Pura Nights partnership", "PartnerWithPuraNights:246").href
          extraFields={[
            { name: "organisation", label: "Organisation", placeholder: "Venue / brand / publication" },
            { name: "website", label: "Website", placeholder: "https://" },
            { name: "sessionType", label: "Type of partnership", placeholder: "Venue / supplier / brand / media" },
            { name: "location", label: "Location", placeholder: "London area" },
          ]}
          messagePlaceholder="Tell us about the partnership idea — what you're proposing and what you'd like from us."
        />
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/about", label: "About Melitta" },
      { to: "/pura-nights", label: "Weekly Classes" },
      { to: "/events", label: "Latin Friday Events" },
      { to: "/corporate-dance-classes-london", label: "Corporate Bookings" },
      { to: "/wedding-dance", label: "Wedding Dance" },
      { to: "/contact", label: "Contact" },
    ]} />
  </Layout>
);

export default PartnerWithPuraNights;
