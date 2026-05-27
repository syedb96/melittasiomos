import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import RelatedPages from "@/components/RelatedPages";
import ProofBlock from "@/components/ProofBlock";
import EmailCaptureGate from "@/components/EmailCaptureGate";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  BookOpen,
  MapPin,
  Music,
  ChevronRight,
  Shield,
  Users,
  Star,
  Heart,
  UserCheck,
  Sparkles,
  Trophy,
  Shirt,
  MessageCircle,
} from "lucide-react";
import heroImg from "@/assets/hero-dance.jpg";

/* <!-- WIX PAGE: /start-here -->
   <!-- WIX SECTION: Hero — Strip with welcoming image + single primary CTA -->
   <!-- WIX SECTION: Come Alone Reassurance — Strip -->
   <!-- WIX SECTION: Level Selector — 3-column Card grid -->
   <!-- WIX SECTION: First Night Walkthrough — Vertical timeline -->
   <!-- WIX SECTION: What to Wear — Card -->
   <!-- WIX SECTION: Why Choose Pura Nights — Card grid -->
   <!-- WIX SECTION: Quick Answers — 2x2 Card grid -->
   <!-- WIX SECTION: Choose Your Style — 2-column comparison -->
   <!-- WIX SECTION: Pick Your Venue — 2-column venue cards -->
   <!-- WIX SECTION: Proof Block — Beginner testimonials -->
   <!-- WIX SECTION: Final CTA Strip — Book + WhatsApp -->
*/

const levels = [
  {
    icon: Sparkles,
    color: "primary",
    label: "Absolute Beginner",
    tag: "Never danced before",
    desc: "You've never taken a salsa or bachata class. Maybe you've watched a wedding first dance and thought 'I want that'.",
    recommend: "Start with our 7:30pm Beginners class — Monday Chiswick or Tuesday Ealing.",
    cta: { to: "/pura-nights", label: "View Beginners Schedule" },
  },
  {
    icon: UserCheck,
    color: "peach",
    label: "Returning / Improver",
    tag: "Some experience",
    desc: "You've taken a few classes before, or you danced years ago and want to rebuild. You know basic timing but want cleaner technique.",
    recommend: "Drop into the 8:30pm Improvers class — or do both classes back-to-back for £15.",
    cta: { to: "/pura-nights", label: "View Improvers Schedule" },
  },
  {
    icon: Trophy,
    color: "primary",
    label: "Confident Social Dancer",
    tag: "Regular dancer",
    desc: "You social dance regularly and want to refine technique, musicality, or learn ladies styling / men's body movement.",
    recommend: "Join socials from 9:30pm — or book a private lesson with Melitta to fast-track progress.",
    cta: { to: "/private-lessons", label: "Explore Private Lessons" },
  },
];

const StartHere = () => (
  <Layout>
    <SeoHead
      title="Start Here — Your First Salsa & Bachata Class in London | Pura Nights"
      description="New to Latin dance? This is your first-timer guide: what level you are, what happens on your first night, what to wear, can you come alone (yes), and how to book."
      path="/start-here"
    />

    {/* HERO — single primary CTA */}
    <section className="relative h-72 md:h-[28rem] overflow-hidden">
      <img
        src={heroImg}
        alt="Beginners salsa class at Pura Nights London"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-2xl">
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">
            New here? Start here.
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Your First Latin Dance Class — Sorted in 3 Minutes
          </h1>
          <p className="text-primary-foreground/80 font-heading text-base md:text-lg mb-7 max-w-xl mx-auto">
            No partner. No experience. No pressure. Pick your level, walk in, and Melitta does the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.tickettailor.com/events/puranights"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-primary text-sm"
            >
              🎟 Book My First Class
            </a>
            <a
              href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27m%20new%20and%20I%27d%20love%20to%20ask%20a%20couple%20of%20questions%20before%20I%20come%20to%20a%20class."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-background/10 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground hover:bg-background/20 transition-colors px-6 py-3 rounded-md font-heading font-semibold text-sm"
            >
              <MessageCircle size={16} /> WhatsApp Melitta
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* WIX SECTION: AnswerBox — AI / GEO answer block */}
    <section className="section-base py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <AnswerBox
          question={`Where do I actually start learning Salsa & Bachata in West London?`}
          answer={`Start at Pura Nights on a Monday at The George IV in Chiswick or a Tuesday at The Drayton Court in Ealing. No partner needed, no kit required, drop-in or pre-book. Class rotates partners every 60–90 seconds so you'll dance with the whole room on night one.`}
          bullets={[
              "Mondays · Chiswick W4 (Turnham Green tube)",
              "Tuesdays · Ealing W13 (West Ealing rail)",
              "£12 online · £15 door · improvers welcome",
              "Arrive 10 min early — Melitta will greet you"
          ]}
          cta={{ label: "Book your first class", to: "/bookings" }}
        />
      </div>
    </section>


    {/* COME ALONE REASSURANCE — high in the funnel */}
    <section className="py-12 md:py-16 bg-card border-b border-border">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
                The #1 question we get
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                "Can I come alone?" — Yes. Most people do.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You don't need a partner. You don't need to know anyone. We rotate partners every 60 seconds in
                class so you'll dance with everyone in the room — that's how the global salsa & bachata community
                works, and it's the fastest way to learn.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Most students arrive solo, leave with new friends, and come back the following week. The Pura Nights
                community is genuinely warm — first-timers are noticed, welcomed, and looked after.
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* LEVEL SELECTOR */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary text-center mb-3">
            Step 1
          </p>
          <h2 className="font-display text-3xl font-bold text-center mb-2">Which level am I?</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10 text-sm">
            Pick the description that sounds most like you. If you're unsure, choose Beginner — you can always step up.
          </p>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-5" staggerDelay={0.1}>
          {levels.map((lvl) => (
            <StaggerItem key={lvl.label}>
              <div className="bg-card rounded-2xl p-6 h-full border border-border card-hover flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-lg ${lvl.color === "peach" ? "bg-peach/15" : "bg-primary/15"}`}>
                    <lvl.icon
                      size={20}
                      className={lvl.color === "peach" ? "text-peach" : "text-primary"}
                    />
                  </div>
                  <span
                    className={`font-accent text-[10px] tracking-[0.2em] uppercase ${
                      lvl.color === "peach" ? "text-peach" : "text-primary"
                    }`}
                  >
                    {lvl.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{lvl.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{lvl.desc}</p>
                <div className="bg-muted/40 rounded-lg p-3 mb-4">
                  <p className="text-xs font-heading font-semibold text-foreground/80">
                    👉 {lvl.recommend}
                  </p>
                </div>
                <Link
                  to={lvl.cta.to}
                  className={`mt-auto text-xs font-heading font-semibold inline-flex items-center gap-1 hover:underline ${
                    lvl.color === "peach" ? "text-peach" : "text-primary"
                  }`}
                >
                  {lvl.cta.label} <ChevronRight size={12} />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* FIRST NIGHT WALKTHROUGH — vertical timeline */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary text-center mb-3">
            Step 2
          </p>
          <h2 className="font-display text-3xl font-bold text-center text-primary-foreground mb-3">
            What happens on your first night
          </h2>
          <p className="text-primary-foreground/60 text-center text-sm font-heading max-w-xl mx-auto mb-12">
            Minute by minute. So nothing is a surprise.
          </p>
        </FadeInUp>
        <StaggerContainer className="space-y-5" staggerDelay={0.08}>
          {[
            {
              time: "5 min before",
              title: "Arrive at the venue",
              desc: "George IV Chiswick (Mondays) or Drayton Court Ealing (Tuesdays). Head upstairs — follow the music.",
            },
            {
              time: "Sign in",
              title: "Pay at the door (cash or card)",
              desc: "£10 for one class + social, £15 for both classes + social, £5 social only. No booking required.",
            },
            {
              time: "Class start",
              title: "Brief warm-up & welcome",
              desc: "Melitta introduces herself, says hi to first-timers, and explains the format. The room is friendly.",
            },
            {
              time: "First 30 min",
              title: "Footwork & basic steps",
              desc: "Broken down step by step. We start solo so everyone gets the timing, then move into partner work.",
            },
            {
              time: "Partner work",
              title: "Rotate every 60 seconds",
              desc: "You'll dance with everyone in the room — leaders and followers rotate. No pressure, no awkward pairing.",
            },
            {
              time: "Class end",
              title: "Recap & question time",
              desc: "Melitta runs through the move once more, then it's open social dancing or you can head home.",
            },
            {
              time: "Optional",
              title: "Stay for socials & a drink",
              desc: "The bar opens up. This is where the friendships form. Most people stay at least 30 minutes.",
            },
          ].map((step, i) => (
            <StaggerItem key={i}>
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm">
                    {i + 1}
                  </div>
                  {i < 6 && <div className="w-px flex-1 bg-primary-foreground/15 mt-2 min-h-[20px]" />}
                </div>
                <div className="bg-charcoal-light rounded-xl border border-primary-foreground/10 p-5 flex-1">
                  <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-primary mb-1">
                    {step.time}
                  </p>
                  <h3 className="font-heading font-bold text-primary-foreground text-sm mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* WHAT TO WEAR */}
    <section className="py-12 md:py-16 bg-background">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col md:flex-row items-start gap-5">
            <div className="bg-primary/10 p-3 rounded-lg shrink-0">
              <Shirt className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
                Step 3
              </p>
              <h2 className="font-display text-xl md:text-2xl font-bold mb-3">What to wear</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Comfortable, breathable clothes you can move and turn in. Clean shoes with a smooth sole work best —
                avoid heavy-grip trainers because they make turns hard. Bring a small water bottle.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You don't need dance shoes for your first class. Most people wear what they wore to work or jeans
                and a t-shirt. Layers are useful — the room warms up once everyone's dancing.
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* WHY PURA NIGHTS */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary text-center mb-3">
            The Pura Nights Difference
          </p>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Why beginners choose us</h2>
        </FadeInUp>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { icon: Shield, title: "Taught by a Champion", desc: "Not a rotating roster of freelancers. Melitta teaches every class personally." },
            { icon: Users, title: "Maximum 30 students per class", desc: "You get real feedback, real correction, real progress. Not lost in a crowd." },
            { icon: Star, title: "5.0 Google rating across 4 brands", desc: "Hundreds of real reviews, never incentivised." },
            { icon: Heart, title: "A real community", desc: "Students come for the dancing and stay for the people. Monthly socials, WhatsApp groups, lifelong friendships." },
          ].map((c, i) => (
            <FadeInUp key={c.title} delay={i * 0.08}>
              <div className="bg-card rounded-2xl p-6 border border-border h-full flex gap-4">
                <c.icon size={28} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-base mb-2">{c.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* QUICK ANSWERS */}
    <section className="section-padding bg-background">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Quick answers</h2>
        </FadeInUp>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { q: "Do I need a partner?", a: "No — we rotate partners in every class." },
            { q: "Do I need experience?", a: "No — Beginners starts from zero every week." },
            { q: "Do I need to book?", a: "No — just turn up on the night." },
            { q: "How much is it?", a: "From £5 (social only) or £10 per class. See full pricing." },
          ].map((qa, i) => (
            <FadeInUp key={i} delay={i * 0.08}>
              <div className="bg-card rounded-2xl p-6 card-hover h-full border border-border">
                <h3 className="font-heading font-bold text-sm mb-2 text-primary">{qa.q}</h3>
                <p className="text-muted-foreground text-sm">{qa.a}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* CHOOSE YOUR STYLE */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Choose your style</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInUp delay={0.1}>
            <div className="bg-charcoal rounded-2xl p-8 border border-primary/15 h-full">
              <h3 className="font-display text-xl font-bold text-primary mb-2">🎶 Salsa On1</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
                Fast, energetic, footwork-driven. Originated from Cuba via New York. The ultimate social dance —
                once you learn it, you can dance anywhere in the world.
              </p>
              <Link to="/blog/what-is-salsa" className="text-primary text-xs font-heading font-semibold hover:underline">
                Read full guide →
              </Link>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-charcoal rounded-2xl p-8 border border-peach/15 h-full">
              <h3 className="font-display text-xl font-bold text-peach mb-2">💃 Bachata</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
                Slower, romantic, deeply expressive. Born in the Dominican Republic. Known for body waves, close
                connection, and musicality.
              </p>
              <Link to="/blog/what-is-bachata" className="text-peach text-xs font-heading font-semibold hover:underline">
                Read full guide →
              </Link>
            </div>
          </FadeInUp>
        </div>
        <FadeInUp delay={0.3} className="text-center mt-6">
          <Link
            to="/blog/salsa-vs-bachata"
            className="text-primary font-heading text-sm font-semibold hover:underline inline-flex items-center gap-1"
          >
            Read full comparison <ChevronRight size={14} />
          </Link>
        </FadeInUp>
      </div>
    </section>

    {/* PICK YOUR VENUE */}
    <section className="section-padding bg-background">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Pick your venue</h2>
        </FadeInUp>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeInUp delay={0.1}>
            <Link to="/venue/the-george-iv-chiswick" className="block bg-card rounded-2xl p-6 card-hover border-l-4 border-primary h-full">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="text-primary mt-1 shrink-0" size={18} />
                <div>
                  <h3 className="font-display text-xl font-bold text-primary mb-1">Monday — Chiswick</h3>
                  <p className="text-muted-foreground text-sm">The George IV, 185 Chiswick High Rd, W4 2DR</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mb-3 ml-7">7:30pm–11pm · From £10 · 5 min from Turnham Green</p>
              <span className="text-primary text-xs font-heading font-semibold ml-7 inline-flex items-center gap-1">
                View venue details <ChevronRight size={12} />
              </span>
            </Link>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Link to="/venue/the-drayton-court-ealing" className="block bg-card rounded-2xl p-6 card-hover border-l-4 border-peach h-full">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="text-peach mt-1 shrink-0" size={18} />
                <div>
                  <h3 className="font-display text-xl font-bold text-peach mb-1">Tuesday — Ealing</h3>
                  <p className="text-muted-foreground text-sm">Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mb-3 ml-7">6:50pm–11pm · From £10 · Free styling warm-up</p>
              <span className="text-peach text-xs font-heading font-semibold ml-7 inline-flex items-center gap-1">
                View venue details <ChevronRight size={12} />
              </span>
            </Link>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* PROOF — beginner stories */}
    <ProofBlock
      categories={["beginner", "community"]}
      eyebrow="Real Beginners"
      title="People who walked in nervous"
      subtitle="And came back the following week."
      limit={3}
    />

    <EmailCaptureGate
      source="/start-here"
      headline="Nervous? Get the new-dancer guide first."
      subcopy="3-minute read on what to wear, where to stand, and how to leave class feeling great. Then book when you're ready."
      redirectUrl="https://www.tickettailor.com/events/puranights"
      redirectLabel="Skip & Book My First Class"
    />

    {/* SINGLE PRIMARY CTA */}
    <section className="section-padding text-center" style={{ background: "var(--gradient-gold)" }}>
      <div className="container-main max-w-2xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3">
          Ready? Pick a class.
        </h2>
        <p className="text-charcoal/70 mb-8 font-heading">
          Your first night is the hardest. After that, you'll wonder why you waited.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.tickettailor.com/events/puranights"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-dark text-sm"
          >
            🎟 Book My First Class
          </a>
          <a
            href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27m%20new%20and%20I%27d%20love%20to%20ask%20a%20couple%20of%20questions%20before%20I%20come%20to%20a%20class."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-charcoal/10 border-2 border-charcoal/20 text-charcoal hover:bg-charcoal/20 transition-colors px-6 py-3 rounded-md font-heading font-semibold text-sm"
          >
            <MessageCircle size={16} /> WhatsApp Melitta
          </a>
        </div>
        <p className="text-xs text-charcoal/60 mt-6 font-heading">
          Or read all{" "}
          <Link to="/faq" className="underline hover:text-charcoal">
            FAQs
          </Link>{" "}
          first.
        </p>
      </div>
    </section>

    <WhoThisIsForBlock
      title="Who turns up to their first class"
      personas={[
        { label: "Complete beginners", description: "Zero experience required. The beginner block restarts weekly." },
        { label: "Solo adults", description: "Most people come alone — partner rotation makes it easy." },
        { label: "People new to London", description: "Fastest way to build a community in West London." },
        { label: "Returners", description: "Danced years ago and want back in? Start with one class and feel it." },
      ]}
    />
    <MembershipPathwayBlock context="start_here_pathway" />

    <RelatedPages
      title="Next Steps"
      links={[
        { to: "/pura-nights", label: "Weekly Classes" },
        { to: "/prices", label: "Prices & Bundles" },
        { to: "/venue/the-george-iv-chiswick", label: "Chiswick Venue" },
        { to: "/venue/the-drayton-court-ealing", label: "Ealing Venue" },
        { to: "/blog/salsa-vs-bachata", label: "Salsa vs Bachata" },
        { to: "/faq", label: "FAQ" },
      ]}
    />
  </Layout>
);

export default StartHere;
