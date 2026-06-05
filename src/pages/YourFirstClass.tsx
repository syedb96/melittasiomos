import { Link } from "react-router-dom";
import { MapPin, Check, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX PAGE: /your-first-class -->
   <!-- WIX: Beginner objection-removal page. Use Wix Sections + Accordion. -->
*/

const timeline = [
  { title: "You arrive (a few minutes early)", body: "Tell us it's your first time — we'll introduce you to someone, point you to the best spot on the floor, and make sure you're not standing alone." },
  { title: "Warm-up (first 10 minutes)", body: "We always start with a simple body movement warm-up. No steps, no partner, no pressure. Just getting comfortable moving." },
  { title: "Beginner section (30 minutes)", body: "Melitta or one of the team breaks down the first steps from absolute zero. You'll learn a real move by the end of this section — not just clapping along." },
  { title: "Partner rotation", body: "We rotate partners throughout the class. You'll dance with 8–10 different people. No one gets stuck. No one sits out." },
  { title: "Social dancing (after class)", body: "After the structured class, the music changes and people stay to social dance. Join in as much or as little as you want." },
  { title: "You leave wanting to come back", body: "Most people book again that night. The next class is already in the calendar for you — just check the schedule." },
];

const worries = [
  { title: "\"I have two left feet\"", body: "Everyone says this. Genuinely, everyone. Salsa and Bachata are learnable skills — not natural gifts. Melitta has taught thousands of people who 'couldn't dance.'" },
  { title: "\"I'm coming alone\"", body: "Great. Most people do. You'll dance with more people than if you came with a friend and stayed together all night." },
  { title: "\"I'm not fit enough / flexible\"", body: "You don't need to be either. The warm-up is gentle and the class builds at your pace. Many students say dancing became their fitness — not the other way around." },
  { title: "\"What if I can't keep up?\"", body: "The class structure always caters to the lowest level in the room. If you need it slower, say so. If you need it again, Melitta will show it again." },
];

const faqs = [
  { q: "Do I need to book or can I just turn up?", a: "For weekly classes you can turn up on the night — no pre-booking needed. For Latin Friday and special events, book via Ticket Tailor in advance." },
  { q: "How much is my first class?", a: "Drop-in classes start from £10. Check the current prices on our pricing page." },
  { q: "How many people will be there?", a: "Classes typically have 20–40 people. Big enough to meet lots of people, small enough for Melitta to see everyone." },
  { q: "Can I bring a friend?", a: "Absolutely — and we encourage it. Coming with a friend makes the first class easier. Just note that we rotate partners, so you won't be stuck together all night (which is a good thing)." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const YourFirstClass = () => (
  <Layout>
    <SeoHead
      title="Your First Salsa or Bachata Class — What to Expect | Pura Nights"
      description="Everything you need to know before your first Pura Nights class in Chiswick or Ealing. No partner, no experience needed."
      path="/your-first-class"
      schema={schema}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Start Here", path: "/start-here" },
        { name: "Your First Class", path: "/your-first-class" },
      ]}
    />

    {/* <!-- WIX SECTION: Hero --> */}
    <section className="relative bg-charcoal text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-primary/10" />
      <div className="container-main relative z-10 py-24 md:py-32 text-center">
        <FadeInUp>
          <span className="inline-block font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">For Beginners</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.95]">What actually happens at your first class</h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">No surprise moves. No awkward standing. Just this.</p>
        </FadeInUp>
      </div>
    </section>

    {/* <!-- WIX SECTION: Timeline --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Your evening, step by step</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        </FadeInUp>
        <ol className="space-y-5">
          {timeline.map((s, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <li className="flex gap-5 bg-card rounded-2xl p-6 border-l-4 border-primary card-hover">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold flex items-center justify-center">{i + 1}</div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                </div>
              </li>
            </FadeInUp>
          ))}
        </ol>
      </div>
    </section>

    {/* <!-- WIX SECTION: Worries --> */}
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Common worries — we've heard them all</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6">
          {worries.map((w, i) => (
            <StaggerItem key={i}>
              <div className="border border-primary-foreground/10 rounded-xl p-6 h-full hover:border-primary/30 transition-colors">
                <h3 className="font-display text-base font-bold mb-2 text-primary">{w.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{w.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* <!-- WIX SECTION: What to bring --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-2xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">What to bring</h2>
        </FadeInUp>
        <ul className="space-y-4">
          {[
            "Shoes with a smooth sole (not rubber trainers if possible — leather-soled or suede make turning much easier)",
            "Water (some venues have a bar)",
            "An open mind",
          ].map((item, i) => (
            <FadeInUp key={i} delay={i * 0.06}>
              <li className="flex gap-4 items-start bg-card rounded-xl p-5">
                <Check size={20} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            </FadeInUp>
          ))}
        </ul>
      </div>
    </section>

    {/* <!-- WIX SECTION: Venues --> */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">How to get there</h2>
        </FadeInUp>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { day: "Monday", venue: "The George IV", addr: "185 Chiswick High Rd, W4 2DR", maps: "https://maps.google.com/?q=The+George+IV+185+Chiswick+High+Rd+W4+2DR" },
            { day: "Tuesday", venue: "Drayton Court Hotel", addr: "2 The Avenue, Ealing W13 0AA", maps: "https://maps.google.com/?q=Drayton+Court+Hotel+Ealing+W13+0AA" },
          ].map((v, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="bg-background rounded-2xl p-7 border border-border card-hover h-full">
                <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">{v.day}</span>
                <h3 className="font-display text-xl font-bold mb-2">{v.venue}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex gap-2"><MapPin size={14} className="text-primary mt-0.5 shrink-0" />{v.addr}</p>
                <a href={v.maps} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-heading hover:underline">Open in Google Maps →</a>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* <!-- WIX SECTION: FAQs --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">First class FAQs</h2>
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

    {/* <!-- WIX SECTION: CTA --> */}
    <section className="section-padding bg-charcoal text-primary-foreground text-center">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Ready to come?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/bookings" className="btn-cta-primary text-base px-10 py-3.5">
              Book my first class → <ArrowRight size={16} className="ml-2 inline" />
            </Link>
            <Link to="/pura-nights" className="btn-cta-outline text-base px-8 py-3">
              See this week's schedule →
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/start-here", label: "Start Here", desc: "Your 3-step beginner path" },
      { to: "/pura-nights", label: "Weekly Classes", desc: "Mondays & Tuesdays" },
      { to: "/latin-friday", label: "Monthly Latin Friday", desc: "Our flagship social" },
      { to: "/prices", label: "Pricing", desc: "Drop-ins from £10" },
      { to: "/faq", label: "FAQs", desc: "All your questions, answered" },
      { to: "/testimonials", label: "Testimonials", desc: "Hear from our students" },
    ]} />
  </Layout>
);

export default YourFirstClass;
