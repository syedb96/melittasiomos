import { Link } from "react-router-dom";
import { Video, Monitor, Globe, Clock, CheckCircle, Users, Heart, Star, BookOpen, Music, Sparkles, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX PAGE: /online-salsa-bachata-coaching -->
   <!-- WIX: This page is designed to connect to Wix Online Programs app -->
   <!-- WIX: Video sections can use Wix Video library or YouTube/Vimeo embeds -->
*/

const onlineCoachingFaqs = [
  { q: "What platform do you use?", a: "Live sessions are via Zoom. Video lessons are hosted on a private platform you can access anytime from any device." },
  { q: "Do I need a partner?", a: "Not at all. Solo technique, styling, footwork, and musicality can all be practised alone. For partnerwork drills, having a partner is helpful but not essential." },
  { q: "How much space do I need?", a: "Roughly 2m × 2m is enough for most exercises. A smooth floor (wood or tile) is ideal — avoid thick carpet if possible." },
  { q: "How much does it cost?", a: "Packages start from £12 per session for video-based programmes. Live 1-to-1 Zoom sessions are custom-quoted based on your goals. Contact Melitta for a free consultation." },
  { q: "Can I combine online and in-person?", a: "Absolutely — many students use online coaching to supplement their weekly Pura Nights classes. It's the fastest way to improve." },
  { q: "Do you offer wedding dance coaching online?", a: "Yes! Melitta has coached couples remotely across the UK and internationally. She'll choreograph to your song and coach you through it via live video sessions." },
  { q: "What if I'm a complete beginner?", a: "The Beginner Foundations programme is designed exactly for you. No experience needed — Melitta breaks everything down from the very first step." },
  { q: "Can I get a free trial?", a: "Book a free 15-minute consultation to discuss your goals and see if online coaching is right for you. No obligation." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Course", "FAQPage"],
  name: "Online Salsa & Bachata Coaching with Melitta Siomos",
  description: "Premium online salsa and bachata coaching with award-winning instructor Melitta Siomos. Structured video lessons, live Zoom sessions, and personalised coaching plans.",
  provider: {
    "@type": "Organization",
    name: "Pura Nights — Melitta Siomos Dance Academy",
    url: "https://www.puranights.com",
  },
  instructor: { "@type": "Person", name: "Melitta Siomos" },
  courseMode: "online",
  offers: { "@type": "Offer", price: "12", priceCurrency: "GBP", availability: "https://schema.org/InStock" },
  mainEntity: onlineCoachingFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const programPaths = [
  {
    icon: <BookOpen size={28} />,
    title: "Beginner Foundations",
    desc: "A structured 8-lesson programme taking you from zero to confident social dancer. Covers basic steps, timing, partner connection, and your first combinations in both Salsa and Bachata.",
    ideal: "Complete beginners who want structure",
    format: "8 video lessons + 2 live check-ins",
  },
  {
    icon: <Music size={28} />,
    title: "Technique & Musicality",
    desc: "Deepen your timing, body movement, and musical interpretation. Solo drills, footwork patterns, and exercises to develop your ear for the clave, breaks, and montuno sections.",
    ideal: "Improvers and intermediate dancers",
    format: "6 video lessons + practice playlists",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Ladies Styling Masterclass",
    desc: "Arms, head movements, body rolls, hip accents, and the confidence to express yourself. Designed specifically for follows who want to develop their own authentic style.",
    ideal: "Follows at any level",
    format: "6 video lessons + styling drills",
  },
  {
    icon: <Heart size={28} />,
    title: "Wedding Dance Coaching",
    desc: "Remote wedding dance preparation for couples who can't attend in-person lessons. Melitta choreographs your first dance to your chosen song and coaches you via live Zoom sessions.",
    ideal: "Engaged couples anywhere in the world",
    format: "Custom choreography + 4-8 live sessions",
  },
];

const whoItsFor = [
  { emoji: "🌍", title: "Dancers outside London", desc: "Access Melitta's award-winning teaching from anywhere in the world — no travel required." },
  { emoji: "🤫", title: "Nervous beginners", desc: "Learn the fundamentals in the privacy of your own home before stepping into a group class." },
  { emoji: "📈", title: "Improvers who need repetition", desc: "Rewatch lessons, drill at your own pace, and build muscle memory between weekly classes." },
  { emoji: "💍", title: "Wedding couples", desc: "Prepare your first dance remotely with a bespoke choreography and live coaching sessions." },
  { emoji: "🏠", title: "Home practice enthusiasts", desc: "Structured solo drills and exercises to improve between social dancing sessions." },
  { emoji: "✈️", title: "Travelling dancers", desc: "Keep your training consistent while you're on the move — all you need is a phone and 2m² of floor." },
];

const sampleLesson = [
  { time: "0:00", label: "Warm-up & body isolation drills" },
  { time: "5:00", label: "Technique focus — today's key concept" },
  { time: "12:00", label: "Step-by-step breakdown with front & side angles" },
  { time: "20:00", label: "Practice drill at slow tempo" },
  { time: "25:00", label: "Full speed practice with music" },
  { time: "30:00", label: "Cool-down & summary of what to practise" },
];

const OnlineCoaching = () => (
  <Layout>
    <SeoHead
      title="Online Salsa & Bachata Coaching London | Learn with Melitta Siomos"
      description="Premium online salsa and bachata coaching with Melitta Siomos. Structured video programmes, live Zoom sessions, wedding dance prep, and personalised coaching — learn from anywhere."
      path="/online-salsa-bachata-coaching"
      schema={schema}
    />

    {/* <!-- WIX SECTION: Hero --> */}
    <section className="relative bg-charcoal text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-primary/10" />
      <div className="container-main relative z-10 py-24 md:py-32 lg:py-40 text-center">
        <FadeInUp>
          <span className="inline-block font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Online Coaching · Anywhere in the World</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.95]">
            Learn Salsa & Bachata <span className="text-primary">Online</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Premium digital coaching with award-winning instructor Melitta Siomos. Structured video programmes, live Zoom sessions, and personalised feedback — wherever you are.
          </p>
          <p className="text-primary-foreground/50 text-sm mb-10">From £12 per session · No partner needed · All levels welcome</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27m%20interested%20in%20online%20coaching" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-base px-8 py-3">
              💬 Book a Free Consultation
            </a>
            <a href="mailto:siomosmelitta@gmail.com?subject=Online%20Coaching%20Enquiry" className="btn-cta-outline text-base px-8 py-3">
              📧 Enquire by Email
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* WIX SECTION: AnswerBox — AI / GEO answer block */}
    <section className="section-base py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <AnswerBox
          question={`How does 1-to-1 online Salsa / Bachata coaching with Melitta work?`}
          answer={`You book a Zoom slot, send a short clip of where you're at, and Melitta coaches you live — technique, musicality, styling, choreography or audition prep. Most clients book in 4-session blocks. Works globally; particularly popular for dancers outside London or prepping for performance teams.`}
          bullets={[
              "Live Zoom — 30 or 60 min sessions",
              "Tailored to your goal (social, audition, wedding)",
              "Replay link sent after every session",
              "Block-bookings discounted"
          ]}
          cta={{ label: "Enquire about online coaching", to: "/contact" }}
        />
      </div>
    </section>


    {/* <!-- WIX SECTION: What Online Coaching Includes --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">What Online Coaching Includes</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Everything you need to learn, practise, and progress — structured around your goals and schedule.</p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Video size={28} />, title: "HD Video Lessons", desc: "Professionally filmed lessons with multiple angles, slow-motion breakdowns, and clear verbal cues you can rewatch unlimited times." },
            { icon: <Monitor size={28} />, title: "Live Zoom Sessions", desc: "Real-time 1-to-1 or small group coaching with Melitta. Immediate feedback on your technique, timing, and movement quality." },
            { icon: <BookOpen size={28} />, title: "Structured Programmes", desc: "Follow a clear learning path from beginner foundations through to advanced styling, musicality, and performance technique." },
            { icon: <Clock size={28} />, title: "Flexible Scheduling", desc: "Book live sessions around your schedule. Access video content 24/7 — learn at midnight or 6am, it's up to you." },
            { icon: <Globe size={28} />, title: "Learn from Anywhere", desc: "All you need is a device, an internet connection, and roughly 2m × 2m of floor space. Smooth flooring (wood or tile) is ideal." },
            { icon: <Users size={28} />, title: "Community Access", desc: "Join the Pura Nights online community. Share progress, ask questions, and connect with fellow remote learners." },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-8 text-center card-hover group h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">{item.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* <!-- WIX SECTION: Who It's For --> */}
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Who Online Coaching Is For</h2>
          <p className="text-primary-foreground/60 text-center max-w-lg mx-auto mb-12">Whether you're brand new or sharpening your skills, there's a path for you.</p>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whoItsFor.map((item, i) => (
            <StaggerItem key={i}>
              <div className="border border-primary-foreground/10 rounded-xl p-6 hover:border-primary/30 transition-colors h-full">
                <span className="text-3xl mb-3 block">{item.emoji}</span>
                <h3 className="font-heading font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* <!-- WIX SECTION: Program Paths — Use Online Programs app here --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Choose Your Learning Path</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Structured programmes designed to take you from where you are to where you want to be.</p>
        </FadeInUp>
        {/* <!-- WIX: Use Online Programs app here --> */}
        <div className="grid md:grid-cols-2 gap-8">
          {programPaths.map((prog, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="bg-card rounded-2xl p-8 card-hover h-full border-t-4 border-primary/20 hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-5">{prog.icon}</div>
                <h3 className="font-display text-xl font-bold mb-3">{prog.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{prog.desc}</p>
                <div className="space-y-2 text-xs">
                  <p className="font-heading"><span className="text-primary font-semibold">Ideal for:</span> {prog.ideal}</p>
                  <p className="font-heading"><span className="text-primary font-semibold">Format:</span> {prog.format}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* <!-- WIX SECTION: Sample Lesson Structure --> */}
    <section className="section-padding bg-card">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Inside a Typical Lesson</h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">Every lesson follows a clear structure so you always know what to expect and can track your progress.</p>
        </FadeInUp>
        <div className="space-y-4">
          {sampleLesson.map((step, i) => (
            <FadeInUp key={i} delay={i * 0.06}>
              <div className="flex gap-5 items-center bg-background rounded-xl p-5 card-hover">
                <div className="flex-shrink-0 w-14 text-center">
                  <span className="font-display font-bold text-primary text-sm">{step.time}</span>
                </div>
                <div className="h-px flex-shrink-0 w-6 bg-primary/30" />
                <p className="font-heading text-sm">{step.label}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* <!-- WIX SECTION: Why Learn Online with Melitta --> */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Why Learn Online with Melitta</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        </FadeInUp>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "Award-winning instructor", desc: "Bachata UK Champion with 15+ years of international teaching experience. You're learning from one of the best." },
            { title: "Personalised feedback", desc: "Not a generic course — Melitta reviews your technique and gives specific, actionable corrections." },
            { title: "Proven teaching method", desc: "The same structured, pressure-free approach that's taught 500+ students in person, adapted for online delivery." },
            { title: "Flexible & affordable", desc: "Start from £12 per session. No long-term commitments — learn at your pace, on your schedule." },
          ].map((item, i) => (
            <FadeInUp key={i} delay={i * 0.08}>
              <div className="flex gap-4 items-start">
                <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* <!-- WIX SECTION: Video Previews — Use Wix Video library / embeds here --> */}
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main max-w-4xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Preview: What Lessons Look Like</h2>
          <p className="text-primary-foreground/60 max-w-lg mx-auto mb-12">Get a taste of Melitta's online teaching style before you commit.</p>
        </FadeInUp>
        {/* <!-- WIX: Use Wix Video library / embeds here --> */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: "Salsa Basic Steps", desc: "Your first crossbody lead in 5 minutes" },
            { title: "Bachata Body Movement", desc: "Hip motion and weight transfer drills" },
            { title: "Ladies Styling Arms", desc: "Graceful arm movements for follows" },
          ].map((vid, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="bg-charcoal-light rounded-xl overflow-hidden card-hover">
                <div className="aspect-video bg-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                      <Video size={24} className="text-primary" />
                    </div>
                    <p className="text-primary-foreground/40 text-xs font-heading">Video Preview</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-sm mb-1">{vid.title}</h3>
                  <p className="text-primary-foreground/50 text-xs">{vid.desc}</p>
                </div>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Online Coaching FAQs</h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-10">Everything you need to know before getting started.</p>
        </FadeInUp>
        <div className="space-y-4">
          {onlineCoachingFaqs.map((faq, i) => (
            <FadeInUp key={i} delay={i * 0.04}>
              <details className="group bg-card rounded-xl border border-border">
                <summary className="cursor-pointer p-5 font-heading font-semibold text-sm flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </details>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* <!-- WIX SECTION: CTA Band --> */}
    <section className="section-padding bg-charcoal text-primary-foreground text-center">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">Book a free consultation with Melitta and find the right programme for your goals. No obligation, no pressure — just a conversation about your dance journey.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27m%20interested%20in%20online%20coaching" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-base px-10 py-3.5">
              💬 Book Free Consultation <ArrowRight size={16} className="ml-2 inline" />
            </a>
            <a href="mailto:siomosmelitta@gmail.com?subject=Online%20Coaching%20Enquiry" className="btn-cta-outline text-base px-8 py-3">
              📧 Email Melitta
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages title="Explore More" links={[
      { to: "/private-lessons", label: "Private Lessons", desc: "In-person 1-to-1 coaching in London" },
      { to: "/pura-nights", label: "Weekly Classes", desc: "Join in person in West London" },
      { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance coaching packages" },
      { to: "/prices", label: "Prices", desc: "View all pricing options" },
      { to: "/start-here", label: "Start Here", desc: "New to Salsa & Bachata?" },
      { to: "/blog/how-to-practice-salsa-at-home", label: "Practice at Home", desc: "Solo drills & exercises" },
    ]} />
  </Layout>
);

export default OnlineCoaching;
