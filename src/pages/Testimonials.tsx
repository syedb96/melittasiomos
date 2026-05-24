import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import WixReviewsEmbed from "@/components/WixReviewsEmbed";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import testimonials, { type Testimonial } from "@/data/testimonials";

/* <!-- WIX PAGE: /testimonials -->
   <!-- WIX SECTION: Hero — Strip with rating ticker -->
   <!-- WIX SECTION: Category Filter — Tabs bound to dataset filter -->
   <!-- WIX SECTION: Testimonial Grid — Repeater bound to Testimonials CMS, masonry layout -->
   <!-- WIX SECTION: Proof FAQ — Wix FAQ app, mainEntity emitted as FAQPage JSON-LD via Custom Code -->
   <!-- WIX SECTION: Leave a Review CTA — link to Google Maps review -->
*/

const categories = [
  { key: "all", label: "All" },
  { key: "group", label: "Group Classes" },
  { key: "wedding", label: "Wedding Dance" },
  { key: "private", label: "Private Lessons" },
  { key: "pura-ladies", label: "Pura Ladies" },
  { key: "online", label: "Online" },
];

const proofFaqs = [
  {
    q: "Can beginners join alone?",
    a: "Yes — the majority of new students arrive solo. We rotate partners every few minutes during class, so you'll dance with everyone and never feel stuck. Most people leave their first Monday Chiswick or Tuesday Ealing class with new friends.",
  },
  {
    q: "Are the classes friendly?",
    a: "Genuinely, yes. Pura Nights is built around a no-judgement, welcoming community. Melitta and the team make sure first-timers are introduced and never left at the side.",
  },
  {
    q: "Do I need a partner?",
    a: "No. Salsa & Bachata at Pura Nights is taught with rotation — you'll partner with multiple people each class. Bringing a partner is welcome but completely optional.",
  },
  {
    q: "Are wedding lessons private?",
    a: "Yes. Wedding-dance coaching is 1-to-1 with Melitta (or the couple together). Sessions are tailored to your song, ability, and venue. Book a free consultation to start.",
  },
  {
    q: "Can I try one class first?",
    a: "Absolutely. A drop-in class is £10 and covers the lesson plus the social. No commitment, no bundle required. If you love it, the 5-class bundle is the most popular next step.",
  },
  {
    q: "Are these reviews real?",
    a: "Yes. Every testimonial is from a verified Pura Nights student, wedding-dance couple, private-lesson client, or Pura Ladies team member. Reviews tagged 'Google ⭐' link to public reviews on our Google Business Profile; the rest are first-party student stories.",
  },
  {
    q: "How is Pura Nights rated on Google?",
    a: "Pura Nights — Melitta Siomos Dance Academy holds a 5.0 rating across 47+ public Google reviews and growing. Wedding Dance Made Easy and Pura Ladies brand profiles share the same 5.0 rating.",
  },
];

const TestimonialCard = ({ t }: { t: Testimonial }) => {
  const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card break-inside-avoid mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">{initials}</div>
        <div className="min-w-0">
          <p className="font-heading font-semibold text-sm">{t.name}</p>
          <p className="text-muted-foreground text-xs truncate">{t.label}</p>
        </div>
        {t.platform === "google" && <span className="ml-auto text-xs bg-secondary px-2 py-0.5 rounded font-heading shrink-0">Google ⭐</span>}
      </div>
      <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}</div>
      <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
    </div>
  );
};

const Testimonials = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? testimonials : testimonials.filter(t => t.category === filter);

  // Clean @graph: FAQPage + ItemList of Reviews. Person uses display name only.
  // itemReviewed points to the dance school. publisher set only when source is Google.
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: proofFaqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "ItemList",
        name: "Pura Nights Student Testimonials",
        itemListElement: testimonials.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Review",
            reviewBody: t.quote,
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            author: { "@type": "Person", name: t.name },
            itemReviewed: {
              "@type": "DanceSchool",
              name: "Pura Nights — Melitta Siomos Dance Academy",
              url: "https://www.puranights.com",
            },
            ...(t.platform === "google"
              ? { publisher: { "@type": "Organization", name: "Google" } }
              : {}),
          },
        })),
      },
    ],
  }), []);

  return (
    <Layout>
      <SeoHead
        title="Student Testimonials | 5-Star Reviews | Pura Nights London"
        description="Real reviews from Pura Nights students, wedding-dance couples, private-lesson clients, and Pura Ladies members. 5.0 Google rating across 47+ reviews."
        path="/testimonials"
        schema={schema}
      />

      <section className="section-padding section-dark text-center">
        <FadeInUp>
          <div className="flex justify-center gap-0.5 mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={24} className="fill-primary text-primary" />)}</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3">What Our Students Say</h1>
          <p className="text-peach font-heading">5.0 Google Rating · 47+ Reviews</p>
          <p className="text-white/70 max-w-2xl mx-auto mt-4 text-sm leading-relaxed">
            One place. Every brand. Verified reviews from Pura Nights group classes, Wedding Dance Made Easy couples, private-lesson students, and Pura Ladies team members.
          </p>
        </FadeInUp>
      </section>

      <section className="section-padding section-warm">
        <div className="container-main max-w-5xl">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(c => (
              <button key={c.key} onClick={() => setFilter(c.key)} className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${filter === c.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                {c.label}
              </button>
            ))}
          </div>

          <StaggerContainer className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {filtered.map((t, i) => (
              <StaggerItem key={i}><TestimonialCard t={t} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Proof FAQ — emitted as FAQPage JSON-LD above */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-3xl">
          <FadeInUp className="text-center mb-10">
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">About These Reviews</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Proof, answered</h2>
            <p className="text-muted-foreground font-heading">The most-asked questions about how we collect and verify reviews.</p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Accordion type="multiple">
              {proofFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`pf-${i}`}>
                  <AccordionTrigger className="font-heading font-semibold text-left text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeInUp>

          <FadeInUp className="mt-12 grid md:grid-cols-2 gap-4">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="bg-primary rounded-2xl p-8 text-center hover:opacity-95 transition-opacity">
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">Book your first class</h2>
              <p className="text-primary-foreground/80 font-heading text-sm">£10 drop-in. Mon Chiswick or Tue Ealing. No partner needed.</p>
            </a>
            <a href="/start-here" className="bg-charcoal rounded-2xl p-8 text-center hover:opacity-95 transition-opacity">
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">Not sure where to start?</h2>
              <p className="text-primary-foreground/70 font-heading text-sm">Read the Start Here guide — first-timer essentials in 3 minutes.</p>
            </a>
          </FadeInUp>

          <FadeInUp className="mt-6 text-center">
            <p className="text-sm text-muted-foreground font-heading">
              Loved your experience?{" "}
              <a href="https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Leave a Google review ⭐</a>
            </p>
          </FadeInUp>
        </div>
      </section>

      <RelatedPages title="Explore" links={[
        { to: "/pura-nights", label: "Weekly Classes", desc: "Join Salsa & Bachata" },
        { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 coaching" },
        { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance coaching" },
        { to: "/pura-ladies", label: "Pura Ladies", desc: "Performance team" },
        { to: "/corporate-dance-classes-london", label: "Corporate Bookings", desc: "Team-building & events" },
        { to: "/start-here", label: "Start Here", desc: "New to dancing?" },
      ]} />
    </Layout>
  );
};

export default Testimonials;
