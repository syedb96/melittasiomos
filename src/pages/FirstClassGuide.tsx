import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import FirstClassLeadMagnet from "@/components/FirstClassLeadMagnet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  CheckCircle2,
  MapPin,
  Clock,
  Shirt,
  Users,
  MessageCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { WA, trackWaClick } from "@/lib/whatsapp";

const quickAnswers = [
  "No partner needed — we rotate so everyone dances.",
  "Beginners welcome every week — start from zero.",
  "Arrive 10–15 minutes early to settle in.",
  "Wear comfortable clothes you can move in.",
  "Smooth-soled shoes are ideal (avoid thick trainers).",
  "Stay for the social if you can — that's where it clicks.",
];

const steps = [
  { title: "Arrive", body: "Walk in 10–15 minutes early. Pay at the door — cash or card." },
  { title: "Choose your level", body: "Beginners class first if you're new. Improvers if you already know the basics." },
  { title: "Warm up", body: "Quick warm-up so your body remembers it's about to dance." },
  { title: "Learn the basics", body: "Step-by-step instruction — timing, lead/follow, posture, the basic step." },
  { title: "Rotate partners", body: "We rotate every few minutes so you dance with everyone and never get stuck." },
  { title: "Social dancing", body: "After class the floor opens. Practise what you learned with the rest of the room." },
  { title: "Ask questions", body: "Melitta and the team stay back. Anything that confused you — just ask." },
];

const faqs = [
  { q: "Do I need a dance partner to come?", a: "No — we rotate partners throughout every class. Most people come on their own and meet the rest of the room within minutes." },
  { q: "I've literally never danced. Will I be lost?", a: "No. The 7:30pm beginner slot starts from zero every single week — same basic step, same warm welcome. You'll leave with one dance you can repeat." },
  { q: "What should I wear to my first class?", a: "Anything comfortable you can move in. Smooth-soled shoes are ideal so you can pivot — avoid grippy running trainers. No need for dance shoes for your first night." },
  { q: "How much does the first class cost?", a: "£10 on the door for one class, or £15 for both beginner + improver back-to-back. Bundles start at £42 for 5 classes once you know you're hooked." },
  { q: "Should I come to Chiswick or Ealing?", a: "Whichever night suits you — Monday is The George IV in Chiswick (W4 2DR), Tuesday is the Drayton Court in Ealing (W13 8PH). Both have the same beginner-friendly format." },
  { q: "Do I need to book in advance?", a: "No — just turn up on the night. If you want a reminder or have a specific question, WhatsApp Melitta and she'll look out for you." },
  { q: "What if I'm shy or coming alone?", a: "Most of the room came alone the first time too. The partner rotation means you're never standing on the side, and the social after class is the easiest way to meet people." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "First Salsa & Bachata Class Guide — What to Expect at Pura Nights",
  url: "https://www.puranights.com/first-class-guide",
  description:
    "Everything a first-timer needs before their first salsa or bachata class at Pura Nights — what to wear, when to arrive, partner rotation, levels, prices and the social after class.",
  about: { "@type": "Thing", name: "First salsa & bachata class — London" },
  isPartOf: { "@type": "WebSite", name: "Pura Nights", url: "https://www.puranights.com" },
};

const schema = { "@context": "https://schema.org", "@graph": [webPageSchema, faqSchema] };

/* <!-- WIX PAGE: /first-class-guide -->
   <!-- WIX SECTION: Hero — Your first class, made simple -->
   <!-- WIX SECTION: Quick Answer Box — 6 bullets -->
   <!-- WIX SECTION: Step-by-step — Timeline -->
   <!-- WIX SECTION: What to Wear -->
   <!-- WIX SECTION: What not to worry about -->
   <!-- WIX SECTION: Which night — Mon Chiswick vs Tue Ealing -->
   <!-- WIX SECTION: Prices -->
   <!-- WIX SECTION: FAQ — Wix FAQ app, FAQPage schema -->
   <!-- WIX SECTION: Lead Magnet — FirstClassLeadMagnet form -->
   <!-- WIX SECTION: Final CTA — Schedule + Book + WhatsApp -->
*/

const FirstClassGuide = () => {
  return (
    <Layout>
      <SeoHead
        title="First Salsa & Bachata Class Guide — What to Expect at Pura Nights"
        description="Your first salsa or bachata class made simple. What to wear, when to arrive, partner rotation, levels, prices and the social after class — from Pura Nights in Chiswick & Ealing."
        path="/first-class-guide"
        schema={schema}
        dateModified="2026-05-30"
      />

      {/* Hero */}
      <section className="section-padding bg-charcoal text-primary-foreground">
        <div className="container-main max-w-3xl text-center">
          <FadeInUp>
            <p className="uppercase tracking-[0.3em] text-xs text-primary-foreground/70 mb-3">First Class Guide</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Your first class, made simple.
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/80 mb-6">
              Everything you need to know before walking into your first salsa or bachata class at Pura Nights — no partner needed, no experience required, no judgement on the dance floor.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/schedule" className="btn-cta-primary text-sm">See this week's schedule</Link>
              <a
                href={WA.startHere()}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackWaClick("first-class-guide-hero")}
                className="btn-cta-secondary text-sm inline-flex items-center gap-2"
              >
                <MessageCircle size={16} /> WhatsApp Melitta
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Quick answer box */}
      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold mb-6 text-center">The 6 things first-timers always ask</h2>
          </FadeInUp>
          <StaggerContainer>
            <ul className="grid sm:grid-cols-2 gap-3">
              {quickAnswers.map((a) => (
                <StaggerItem key={a}>
                  <li className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={18} />
                    <span className="text-sm md:text-base">{a}</span>
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </StaggerContainer>
        </div>
      </section>

      {/* Step by step */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold mb-8 text-center">What happens, step by step</h2>
          </FadeInUp>
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="font-display text-2xl font-bold text-primary w-10 shrink-0">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-semibold text-base mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What to wear / not worry */}
      <section className="section-padding">
        <div className="container-main max-w-4xl grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <Shirt className="text-primary mb-3" size={24} />
            <h2 className="font-display text-2xl font-bold mb-3">What to wear</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Comfortable clothes you can pivot and turn in.</li>
              <li>• Smooth-soled shoes (suede or smooth leather is ideal).</li>
              <li>• Avoid grippy trainers — they catch and hurt your knees.</li>
              <li>• Bring a small water bottle. You'll need it.</li>
              <li>• No need for dance heels on your first night.</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card">
            <Sparkles className="text-primary mb-3" size={24} />
            <h2 className="font-display text-2xl font-bold mb-3">What not to worry about</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• "I have two left feet" — every regular started here.</li>
              <li>• "I don't have a partner" — partner rotation is built in.</li>
              <li>• "I'll be the worst in the room" — beginners class is for beginners.</li>
              <li>• "I'll feel awkward leaving" — most people stay for a drink and the social.</li>
              <li>• "I won't remember anything" — same basics next week. You'll get it.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Which night */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold mb-8 text-center">Which night should you choose?</h2>
          </FadeInUp>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/venue/the-george-iv-chiswick" className="block p-6 rounded-2xl border border-border bg-background hover:border-primary transition-colors">
              <MapPin className="text-primary mb-3" size={22} />
              <h3 className="font-display text-xl font-bold mb-1">Monday — Chiswick</h3>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">The George IV · W4 2DR</p>
              <p className="text-sm text-muted-foreground mb-3">
                Warm, well-lit dance floor above the pub. Easy walk from Turnham Green tube. Beginner slot 7:30pm.
              </p>
              <span className="text-sm text-primary inline-flex items-center gap-1">See venue <ChevronRight size={14} /></span>
            </Link>
            <Link to="/venue/the-drayton-court-ealing" className="block p-6 rounded-2xl border border-border bg-background hover:border-primary transition-colors">
              <MapPin className="text-primary mb-3" size={22} />
              <h3 className="font-display text-xl font-bold mb-1">Tuesday — Ealing</h3>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Drayton Court · W13 8PH</p>
              <p className="text-sm text-muted-foreground mb-3">
                Free styling warm-up 6:50pm, beginners 7:30pm. 4-minute walk from West Ealing station.
              </p>
              <span className="text-sm text-primary inline-flex items-center gap-1">See venue <ChevronRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Prices */}
      <section className="section-padding">
        <div className="container-main max-w-3xl text-center">
          <Clock className="mx-auto text-primary mb-3" size={24} />
          <h2 className="font-display text-3xl font-bold mb-3">How much does it cost?</h2>
          <p className="text-muted-foreground mb-6">
            £10 on the door for a single class, £15 for beginners + improvers back-to-back, £5 if you only want to come for the social. Bundles start at £42 for 5 classes.
          </p>
          <Link to="/prices" className="btn-cta-secondary text-sm">See full pricing</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold mb-6 text-center">First-timer FAQs</h2>
          </FadeInUp>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Lead magnet */}
      <FirstClassLeadMagnet
        source="/first-class-guide"
        heading="Want the printable first-timer guide?"
      />

      {/* Final CTA */}
      <section className="section-padding bg-charcoal text-primary-foreground">
        <div className="container-main max-w-3xl text-center">
          <Users className="mx-auto mb-3 text-primary" size={26} />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Ready when you are.</h2>
          <p className="text-primary-foreground/80 mb-6 text-sm md:text-base">
            See the next class, book a spot, or message Melitta with any question — there's no such thing as a silly first-timer question.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/schedule" className="btn-cta-primary text-sm">See schedule</Link>
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-secondary text-sm">Book first class</a>
            <a
              href={WA.startHere()}
              target="_blank" rel="noopener noreferrer"
              onClick={() => trackWaClick("first-class-guide-final")}
              className="inline-flex items-center gap-2 text-sm underline text-primary-foreground/80"
            >
              <MessageCircle size={16} /> WhatsApp Melitta
            </a>
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-2 text-xs text-primary-foreground/60">
            <Link to="/start-here" className="underline">/start-here</Link>
            <Link to="/pura-nights" className="underline">/pura-nights</Link>
            <Link to="/prices" className="underline">/prices</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FirstClassGuide;
