import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import BlogPostFooter from "@/components/BlogPostFooter";
/* <!-- WIX PAGE: /blog/how-long-to-learn-salsa -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const HowLongToLearnSalsa = () => (
  <Layout>
    <SeoHead title="How Long Does It Take to Learn Salsa? Honest Timeline | Pura Nights" description="A realistic breakdown of how long it takes to learn salsa dancing — from first steps to confident social dancer. Based on 15+ years of teaching experience." path="/blog/how-long-to-learn-salsa" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "How Long Does It Take to Learn Salsa?", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-06-10" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">How Long Does It Take to Learn Salsa?</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jun 2025</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="How Long Does It Take to Learn Salsa?" path="/blog/how-long-to-learn-salsa" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">This is one of the most common questions I hear as a dance instructor — and the honest answer is: it depends on what "learn" means to you. But here's a realistic timeline based on over 15 years of teaching hundreds of students.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Realistic Timeline</h2>
            <div className="space-y-4 mb-8">
              {[
                { time: "Week 1–2", level: "First Steps", desc: "You'll learn the basic step, timing, and your first simple turn. It might feel awkward — that's completely normal." },
                { time: "Week 3–6", level: "Building Blocks", desc: "Cross body leads, right turns, basic combinations. You're starting to feel the music and move with more confidence." },
                { time: "Week 6–12", level: "Social Ready", desc: "You can hold your own on a social dance floor. Basic moves feel natural. You're starting to add styling and musicality." },
                { time: "Month 3–6", level: "Improver", desc: "More complex patterns, multiple turns, partner styling. You're actively enjoying social dancing and seeking it out." },
                { time: "Month 6–12", level: "Intermediate", desc: "Musicality deepens. You're dancing to different instruments, adding body movement, and developing your own style." },
                { time: "Year 1+", level: "Advanced Social Dancer", desc: "You can dance with anyone to any song. You're interpreting the music, creating in the moment, and inspiring others." },
              ].map((stage, i) => (
                <div key={i} className="bg-card rounded-lg p-4 flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-accent text-primary bg-primary/10 px-2 py-1 rounded">{stage.time}</span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm mb-1">{stage.level}</p>
                    <p className="text-muted-foreground text-sm">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What Accelerates Your Progress</h2>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>Dancing twice a week</strong> — attending both Monday and Tuesday dramatically speeds things up</li>
              <li><strong>Staying for the social</strong> — the real learning happens when you practise with different partners</li>
              <li><strong>Private lessons</strong> — even one or two sessions can unlock breakthroughs</li>
              <li><strong>Watching and listening</strong> — pay attention to how experienced dancers move and interpret the music</li>
              <li><strong>Not comparing yourself</strong> — everyone progresses at their own pace</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Truth About "Natural Talent"</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">In 15 years of teaching, I've seen people with "no rhythm" become beautiful dancers, and people with "natural talent" plateau because they don't practise. Consistency beats talent every time. The students who progress fastest are the ones who show up every week, stay for the social, and embrace the learning process.</p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">My advice:</strong> Don't wait until you're "ready." Start now, dance regularly, stay for the social, and within 8–12 weeks you'll be a confident social dancer.</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Start Learning Salsa</a>
              <Link to="/pura-nights" className="text-primary font-heading font-semibold text-sm">See Class Schedule →</Link>
            </div>
            <AuthorCard />
          </FadeInUp>
          <BlogPostFooter related={[
            { to: "/blog/first-salsa-class-london", title: "Your First Salsa Class: What to Expect", category: "Beginners", readTime: "6 min" },
            { to: "/blog/salsa-vs-bachata", title: "Salsa vs Bachata — Which First?", category: "Salsa", readTime: "5 min" },
            { to: "/blog/salsa-on1-vs-on2", title: "Salsa On1 vs On2 for Beginners", category: "Beginners", readTime: "6 min" },
          ]} />
        </div>
      </section>
    </article>
  </Layout>
);

export default HowLongToLearnSalsa;
