import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";
import BlogMoneyCTA from "@/components/BlogMoneyCTA";

/* <!-- WIX PAGE: /blog/dance-classes-west-london-guide -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const DanceClassesWestLondonGuide = () => (
  <Layout>
    <SeoHead title="Complete Guide to Dance Classes in West London 2026" description="The definitive guide to Latin dance classes in West London. Salsa, Bachata, ladies styling, wedding dance, and private lessons — everything you need to know." path="/blog/dance-classes-west-london-guide" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "The Complete Guide to Dance Classes in West London 2026", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-01-25" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">The Complete Guide to Dance Classes in West London 2026</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jan 2026</span><span>·</span><span>9 min read</span></div>
            <SocialShareButtons title="Dance Classes West London Guide" path="/blog/dance-classes-west-london-guide" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why West London Has the Best Latin Dance Scene</h2>
            <p className="text-muted-foreground mb-4">West London has quietly become the epicentre of Latin dance in the capital. While Central London has established clubs and occasional events, the West London scene — centred around Chiswick, Ealing, and Acton — offers something different: a genuine, community-driven dance culture where you'll see the same friendly faces week after week, build real friendships, and progress from complete beginner to confident social dancer in a supportive environment.</p>
            <p className="text-muted-foreground mb-4">At the heart of this scene is <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link>, founded by Bachata UK Champion Melitta Siomos. With two weekly class nights, monthly Latin Friday events, a ladies performance team, and private lesson options, Pura Nights offers the most complete Latin dance experience in West London.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Salsa Classes in West London</h2>
            <p className="text-muted-foreground mb-4"><Link to="/salsa-classes-london" className="text-primary hover:underline">Salsa classes</Link> run every Monday at The George IV in <Link to="/salsa-classes-chiswick" className="text-primary hover:underline">Chiswick</Link> (7:30-8:15 PM) and every Tuesday at the Drayton Court Hotel in <Link to="/salsa-classes-ealing" className="text-primary hover:underline">Ealing</Link> (6:50-7:35 PM). Classes are split into Beginner, Improver, and Intermediate levels. The teaching style is structured and progressive — each week builds on the previous one — but drop-in students are always welcome and quickly brought up to speed.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Bachata Classes in West London</h2>
            <p className="text-muted-foreground mb-4"><Link to="/bachata-classes-london" className="text-primary hover:underline">Bachata classes</Link> follow Salsa on both nights — Monday 8:15-9:00 PM in Chiswick and Tuesday 7:35-8:20 PM in Ealing. Melitta teaches a blend of Traditional, Moderna, and <Link to="/blog/bachata-sensual-guide" className="text-primary hover:underline">Bachata Sensual</Link> styles, giving students a well-rounded education. Bachata has become hugely popular in recent years and our classes reflect that — often the Bachata class is the busiest of the evening.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Ladies Styling</h2>
            <p className="text-muted-foreground mb-4">Every Tuesday in Ealing, the evening begins with a complimentary <Link to="/ladies-styling-london" className="text-primary hover:underline">ladies styling warm-up</Link> at 6:50 PM. This 10-minute session introduces body movement fundamentals that enhance your social dancing. For dancers who want to take styling further, <Link to="/pura-ladies" className="text-primary hover:underline">Pura Ladies</Link> offers a pathway from social dancer to international performer.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Wedding Dance</h2>
            <p className="text-muted-foreground mb-4">Melitta offers private <Link to="/wedding-dance" className="text-primary hover:underline">wedding dance lessons</Link> for couples who want a memorable first dance. Packages cover any style — Salsa, Bachata, Waltz, or a fusion. Lessons take place in West London or online via Zoom. Melitta has choreographed hundreds of wedding dances and specialises in making non-dancers look and feel amazing. Book a free consultation to discuss your vision.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Private Lessons</h2>
            <p className="text-muted-foreground mb-4"><Link to="/private-lessons" className="text-primary hover:underline">One-to-one private lessons</Link> with Melitta are available for dancers of all levels. Whether you want to fast-track your basics, break through a technique plateau, prepare for a performance, or work on specific skills, private sessions offer the most focused and personalised learning experience possible. Contact Melitta directly to discuss rates and availability.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Choose the Right Class for You</h2>
            <p className="text-muted-foreground mb-4"><strong>Complete beginner:</strong> Start with the Monday Chiswick Beginner class or the Tuesday Ealing Beginner class. Read our <Link to="/start-here" className="text-primary hover:underline">Start Here guide</Link> for a full onboarding walkthrough. <strong>Some experience:</strong> Come to either night and the instructors will guide you to the right level. <strong>Experienced dancer:</strong> Join the Intermediate group and stay for the social. <strong>Couples preparing for a wedding:</strong> Book a <Link to="/wedding-dance" className="text-primary hover:underline">private consultation</Link>. <strong>Looking for performance training:</strong> Build your foundation at weekly classes, then enquire about <Link to="/pura-ladies" className="text-primary hover:underline">Pura Ladies</Link> auditions.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Ready to Start?</h3>
              <p className="text-muted-foreground text-sm mb-4">Find the right class for you — Monday Chiswick or Tuesday Ealing.</p>
              <Link to="/dance-classes-west-london" className="btn-cta-primary text-sm">View West London Classes →</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Which night should I start with?", a: "Either! Monday Chiswick and Tuesday Ealing teach the same material. Many students attend both." },
                { q: "Can I try both Salsa and Bachata on the same night?", a: "Yes — every evening includes both a Salsa and Bachata class, one after the other." },
                { q: "Is there a best time of year to start?", a: "Any time is good, but January and September see the most new starters, so you'll have plenty of fellow beginners." },
                { q: "How do I get to the venues by public transport?", a: "Chiswick: Turnham Green tube (5 min walk). Ealing: West Ealing station (3 min walk). See our locations page for full directions." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Dance Classes West London Guide" path="/blog/dance-classes-west-london-guide" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <div className="container-main max-w-3xl px-4 md:px-0"><BlogMoneyCTA variant="classes" /></div>
    <RelatedPages title="Related" links={[
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/blog/best-areas-west-london", label: "Best Areas for Latin Dance" },
      { to: "/blog/west-london-latin-dance-guide", label: "West London Latin Dance Guide" },
    ]} />
  </Layout>
);

export default DanceClassesWestLondonGuide;
