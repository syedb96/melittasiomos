import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogSidebarCTA from "@/components/BlogSidebarCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import RelatedArticles from "@/components/RelatedArticles";
import LastUpdated from "@/components/LastUpdated";

/* <!-- WIX PAGE: /learn/salsa-bachata-guide -->
   <!-- WIX: Pillar page — long-form static page with TOC sidebar and Repeater of cluster posts -->
*/
const SalsaBachataGuide = () => (
  <Layout>
    <SeoHead
      title="The Complete West London Guide to Salsa & Bachata (2026) | Pura Nights"
      description="Everything you need to know about learning Salsa and Bachata in West London — styles, classes, venues, etiquette, music, shoes, and how to start. Written by Bachata UK Champion Melitta Siomos."
      path="/learn/salsa-bachata-guide"
      schema={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "The Complete West London Guide to Salsa & Bachata",
        author: { "@type": "Person", name: "Melitta Siomos" },
        publisher: { "@type": "Organization", name: "Pura Nights" },
        datePublished: "2026-01-15",
        dateModified: new Date().toISOString().split("T")[0],
        wordCount: 2050,
        articleSection: "Pillar Guide",
      }}
    />
    <ReadingProgressBar />

    <article>
      {/* Hero */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-4xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Learn</Link> / <span className="text-primary">Pillar Guide</span>
          </nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-[10px] font-accent tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-4">Pillar Guide · 2,000+ words</span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
              The Complete West London Guide to Salsa & Bachata
            </h1>
            <p className="text-primary-foreground/70 text-base md:text-lg font-heading max-w-2xl mb-6">
              The only resource you need to start, improve, and fall in love with Latin dance in West London — from your first basic step to your first social.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>Bachata UK Champion</span><span>·</span><span>15 min read</span>
            </div>
            <SocialShareButtons title="The Complete West London Guide to Salsa & Bachata" path="/learn/salsa-bachata-guide" />
          </FadeInUp>
        </div>
      </section>

      {/* Body with sidebar */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10">
            {/* Main column */}
            <div className="prose-custom max-w-3xl">
              <FadeInUp>
                <LastUpdated date={new Date().toISOString().split("T")[0]} />

                {/* TOC */}
                <div className="not-prose bg-card border border-border rounded-2xl p-6 my-6">
                  <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-3">In this guide</p>
                  <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm font-heading">
                    {[
                      ["#what", "1. What are Salsa and Bachata?"],
                      ["#styles", "2. The main styles explained"],
                      ["#starting", "3. How to start as a beginner"],
                      ["#west-london", "4. West London venues & schedule"],
                      ["#etiquette", "5. Social dance etiquette"],
                      ["#music", "6. Music, timing & musicality"],
                      ["#shoes", "7. Shoes, clothes & gear"],
                      ["#progress", "8. How to progress faster"],
                      ["#wedding", "9. Latin dance for weddings"],
                      ["#faq", "10. Frequently asked questions"],
                    ].map(([href, label]) => (
                      <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
                    ))}
                  </ol>
                </div>

                <p className="lead text-lg text-foreground/90 leading-relaxed mb-8">
                  Salsa and Bachata are the two most popular partner dances in the world — and West London is one of the best places in the UK to learn them. This guide covers everything you need to know, written from 15+ years of teaching beginners exactly like you in Chiswick, Ealing, and across the West London community.
                </p>

                <h2 id="what" className="font-display text-3xl font-bold mt-12 mb-4">1. What are Salsa and Bachata?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Salsa</strong> is a fast, energetic Latin partner dance that emerged in 1960s New York from a fusion of Cuban Son, Mambo, Puerto Rican Plena, and African rhythms. It's danced to music typically between 180–220 beats per minute, with a distinctive 8-count basic where you step on counts 1, 2, 3 — pause — 5, 6, 7 — pause. Salsa rewards crisp footwork, sharp turns, and tight partner connection.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Bachata</strong> originated in the Dominican Republic in the early 20th century and exploded internationally in the last 20 years. It's slower (90–130 BPM), more sensual, and built on a 4-count basic with a hip "pop" on the 4th beat. Modern Bachata Sensual — pioneered in Spain — adds body waves, dips, and beautiful flowing movements that have made it the most popular Latin dance for couples and beginners alike.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Both dances share a common DNA: lead-and-follow partner work, rotating dance partners at socials, and a global community of dancers who travel to festivals and congresses every weekend somewhere in the world.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → Read more: <Link to="/blog/what-is-salsa" className="text-primary hover:underline">What is Salsa?</Link> · <Link to="/blog/what-is-bachata" className="text-primary hover:underline">What is Bachata?</Link> · <Link to="/blog/salsa-vs-bachata" className="text-primary hover:underline">Salsa vs Bachata — which should you start with?</Link>
                </p>

                <h2 id="styles" className="font-display text-3xl font-bold mt-12 mb-4">2. The main styles explained</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Salsa has three globally recognised styles: <strong>Salsa On1</strong> (Los Angeles style — linear, flashy, danced "on the 1"), <strong>Salsa On2</strong> (New York Mambo style — smoother, danced "on the 2"), and <strong>Cuban Salsa / Casino</strong> (circular, Cuban-rooted, the original form). At Pura Nights we teach Salsa On1, the most beginner-friendly and globally popular style.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Bachata splits into <strong>Dominican Bachata</strong> (traditional, footwork-heavy, played on guitars), <strong>Bachata Moderna</strong> (the international standard with turn patterns), and <strong>Bachata Sensual</strong> (the Spanish-evolved style focused on body movement and connection). We teach Moderna and Sensual because they're what's danced at every social in West London.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → <Link to="/blog/salsa-on1-vs-on2" className="text-primary hover:underline">Salsa On1 vs On2 explained</Link> · <Link to="/blog/bachata-sensual-guide" className="text-primary hover:underline">Bachata Sensual — a beginner's guide</Link>
                </p>

                <h2 id="starting" className="font-display text-3xl font-bold mt-12 mb-4">3. How to start as a complete beginner</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Three myths to debunk before your first class: <strong>(1) You do not need a partner</strong> — every beginners class rotates partners. <strong>(2) You do not need rhythm</strong> — rhythm is taught and learned, not born. <strong>(3) You are not too old, too uncoordinated, or too late</strong> — our students range from 19 to 70+, and the average new student has never done a partner dance before in their life.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The easiest first step is to drop into a beginner-only class. At <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link> we run a 30-minute beginners session every Monday in Chiswick and every Tuesday in Ealing, followed by 90 minutes of social dancing where you can practise — or just watch — at your own pace. £10 covers your first class. No booking needed for your first visit.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → <Link to="/blog/first-salsa-class-london" className="text-primary hover:underline">What to expect at your first Salsa class in London</Link> · <Link to="/blog/beginners-guide-salsa-london" className="text-primary hover:underline">The full beginner's guide</Link> · <Link to="/start-here" className="text-primary hover:underline">Start Here →</Link>
                </p>

                <h2 id="west-london" className="font-display text-3xl font-bold mt-12 mb-4">4. West London venues, schedule & how to get there</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pura Nights runs two weekly socials, both in iconic West London venues with great floors, late bars, and welcoming atmospheres for beginners.
                </p>
                <ul className="text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                  <li><strong>Mondays — Chiswick:</strong> The George IV, 185 Chiswick High Rd. Beginners 8:30 PM, social 9:00–11:00 PM. 5 min walk from Turnham Green tube.</li>
                  <li><strong>Tuesdays — Ealing:</strong> The Drayton Court Hotel, 2 The Avenue. Beginners 8:30 PM, social 9:00–11:00 PM. 8 min walk from Ealing Broadway.</li>
                  <li><strong>Monthly Latin Friday:</strong> A bigger party social once a month — DJ, performances, all levels welcome.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → <Link to="/schedule" className="text-primary hover:underline">Full weekly schedule</Link> · <Link to="/locations" className="text-primary hover:underline">All West London locations</Link>
                </p>

                <h2 id="etiquette" className="font-display text-3xl font-bold mt-12 mb-4">5. Social dance etiquette — the unwritten rules</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Latin social dancing has its own gentle etiquette that makes the floor welcoming for everyone. The basics: <strong>asking is normal</strong> (anyone can ask anyone), <strong>"no" is always OK</strong> (and the asker should respect it without follow-up), <strong>one or two songs per partner</strong> is standard, <strong>thank your partner</strong> after each dance, <strong>don't teach mid-social</strong> unless asked, and <strong>respect personal space</strong> — Bachata has closer holds than Salsa, but always start in an open frame and let the follower close the gap.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → <Link to="/blog/improve-social-dancing" className="text-primary hover:underline">Improve your social dancing</Link> · <Link to="/blog/lead-follow-salsa-bachata" className="text-primary hover:underline">Lead and follow basics</Link>
                </p>

                <h2 id="music" className="font-display text-3xl font-bold mt-12 mb-4">6. Music, timing & musicality</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The single biggest leap in your dancing comes when you stop counting and start <em>feeling</em> the music. Salsa is built on the <strong>clave</strong> — a 5-stroke rhythm that anchors every song. Once you can hear the clave, every break, hit, and accent in the music starts to make sense and your dancing becomes musical instead of mechanical.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For Bachata, listen for the <strong>güira</strong> (the metallic scrape on every beat) and the <strong>bongó</strong> hits that mark phrasing. Modern Bachata Sensual songs often have dramatic builds, drops, and breakdowns — learning to mark these with body movement transforms your dance.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → <Link to="/blog/salsa-musicality-guide" className="text-primary hover:underline">The full musicality guide</Link>
                </p>

                <h2 id="shoes" className="font-display text-3xl font-bold mt-12 mb-4">7. Shoes, clothes & gear</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For your first 3–4 classes, <strong>any clean indoor shoe with a smooth sole works</strong>. Avoid trainers with grippy rubber — you need to pivot. Once you're hooked, invest in proper Latin dance shoes (suede sole, supportive arch). Women typically wear 2.5–3" heels, men wear leather-soled shoes with a small heel.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Clothing: anything you can move in. Layers are smart because the room warms up fast. Avoid loose jewellery that catches on partners.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → <Link to="/blog/salsa-shoes-guide" className="text-primary hover:underline">Salsa shoes — what to buy</Link> · <Link to="/blog/what-to-wear-salsa-bachata" className="text-primary hover:underline">What to wear</Link>
                </p>

                <h2 id="progress" className="font-display text-3xl font-bold mt-12 mb-4">8. How to progress faster</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The students who improve fastest do four things: <strong>(1) attend weekly</strong> — consistency beats intensity, <strong>(2) stay for the social</strong> after every class, <strong>(3) practise solo footwork at home</strong> for 10 minutes 3x a week, and <strong>(4) take occasional private lessons</strong> to fast-track specific weaknesses. After 3 months of weekly attendance, the average student is comfortably social-dancing. After 12 months, most are unrecognisable from their first class.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → <Link to="/blog/how-long-to-learn-salsa" className="text-primary hover:underline">How long does it take to learn Salsa?</Link> · <Link to="/blog/how-to-practice-salsa-at-home" className="text-primary hover:underline">Home practice routines</Link> · <Link to="/private-lessons" className="text-primary hover:underline">Private lessons</Link>
                </p>

                <h2 id="wedding" className="font-display text-3xl font-bold mt-12 mb-4">9. Latin dance for your wedding</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Salsa and Bachata both work beautifully for first-dance choreography — and even 4–6 lessons is enough to turn an awkward shuffle into a dance your guests will remember. We choreograph to your chosen song, work around your fitness level, and rehearse until both partners feel confident. Most couples start 2–3 months before the wedding.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  → <Link to="/wedding-dance" className="text-primary hover:underline">Wedding dance lessons</Link> · <Link to="/blog/wedding-first-dance-tips" className="text-primary hover:underline">First dance tips</Link>
                </p>

                <h2 id="faq" className="font-display text-3xl font-bold mt-12 mb-4">10. Frequently asked questions</h2>
                <div className="not-prose space-y-4 mb-10">
                  {[
                    { q: "Do I need a partner to start?", a: "No. Every beginners class rotates partners. Most students arrive solo." },
                    { q: "How much does it cost?", a: "£10 for your first class. £15 for class + social. Bundles bring drop-in price down further." },
                    { q: "What should I wear to my first class?", a: "Anything you can move in, plus clean indoor shoes with a smooth sole — trainers are fine the first time." },
                    { q: "How long until I can dance socially?", a: "Most students are comfortable on the social floor within 4–6 weeks of weekly classes." },
                    { q: "Should I start with Salsa or Bachata?", a: "Bachata is slightly easier to start with because it's slower. Both classes run on the same night so most students do both." },
                  ].map((f, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-heading font-bold text-sm mb-2">{f.q}</h3>
                      <p className="text-muted-foreground text-sm">{f.a}</p>
                    </div>
                  ))}
                </div>

                {/* Final CTA */}
                <div className="not-prose bg-charcoal text-primary-foreground rounded-2xl p-8 my-10 text-center">
                  <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Ready?</p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Your first class is just £10</h3>
                  <p className="text-primary-foreground/60 text-sm font-heading mb-5">Mondays in Chiswick · Tuesdays in Ealing · No booking needed</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link to="/pura-nights" className="btn-cta-primary text-sm">Book Your First Class →</Link>
                    <Link to="/start-here" className="btn-secondary text-sm">Start Here Guide</Link>
                  </div>
                </div>

                <AuthorCard />

                <NewsletterSignup />

                <RelatedArticles
                  title="Cluster: Recommended next reads"
                  articles={[
                    { to: "/blog/beginners-guide-salsa-london", title: "Beginner's Guide to Salsa Classes in London", category: "Beginners", readTime: "8 min" },
                    { to: "/blog/first-salsa-class-london", title: "Your First Salsa Class in London: What to Expect", category: "Beginners", readTime: "7 min" },
                    { to: "/blog/salsa-vs-bachata", title: "Salsa vs Bachata — Which Should You Start With?", category: "Beginners", readTime: "6 min" },
                  ]}
                />
              </FadeInUp>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <BlogSidebarCTA />
            </div>
          </div>
        </div>
      </section>
    </article>
  </Layout>
);

export default SalsaBachataGuide;
