import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
/* <!-- WIX PAGE: /blog/how-many-wedding-lessons -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const HowManyWeddingLessons = () => (
  <Layout>
    <SeoHead title="How Many Wedding Dance Lessons Do We Need? | Melitta Siomos" description="Wondering how many wedding dance lessons you need? A realistic guide based on your experience level, timeline, and dance style goals." path="/blog/how-many-wedding-dance-lessons" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "How Many Wedding Dance Lessons Do We Need?", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-08-10" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Wedding Dance</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Wedding Dance</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">How Many Wedding Dance Lessons Do We Need?</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Aug 2025</span><span>·</span><span>5 min read</span></div>
            <SocialShareButtons title="How Many Wedding Dance Lessons Do We Need?" path="/blog/how-many-wedding-dance-lessons" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">This depends on three things: your current dance experience, the complexity of what you want to achieve, and how much time you have before the wedding. Here's my honest breakdown.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Quick Guide</h2>
            <div className="space-y-4 mb-8">
              {[
                { lessons: "2–3 lessons", who: "You just want to look comfortable and avoid the awkward sway. Simple, elegant movements that look good without being complex.", timeline: "2–4 weeks" },
                { lessons: "4–6 lessons", who: "You want a proper choreographed routine that looks polished. This is the sweet spot for most couples.", timeline: "4–8 weeks" },
                { lessons: "6–10 lessons", who: "You want a show-stopping performance — lifts, dips, complex patterns, a surprise mashup. Full choreography with polish.", timeline: "2–3 months" },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-lg p-5">
                  <h3 className="font-display text-lg font-bold text-primary mb-1">{item.lessons}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{item.who}</p>
                  <p className="text-xs text-muted-foreground/70">Recommended timeline: {item.timeline}</p>
                </div>
              ))}
            </div>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Factors That Affect the Number</h2>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>Your starting point</strong> — complete beginners typically need more sessions than couples with some dance experience</li>
              <li><strong>The song</strong> — slower songs are generally easier to choreograph; complex rhythms need more work</li>
              <li><strong>Your goals</strong> — a simple elegant sway vs. a full Latin routine are very different things</li>
              <li><strong>Practice between lessons</strong> — couples who practise at home progress much faster</li>
              <li><strong>Confidence</strong> — some couples need extra sessions simply to build confidence performing in front of people</li>
            </ul>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Last-Minute Couples</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Even if your wedding is in two weeks, I can still help. A single intensive session can transform your first dance from an awkward shuffle into something you'll both be proud of. Don't assume it's too late — reach out and let's see what we can do.</p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20our%20wedding%20is%20coming%20up%20and%20we%20need%20dance%20lessons" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">💬 Get a Free Consultation</a>
              <Link to="/wedding-dance" className="text-primary font-heading font-semibold text-sm">Wedding Dance Info →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/wedding-first-dance-tips" className="text-primary hover:underline font-heading">10 Tips for the Perfect First Dance →</Link></li>
                <li><Link to="/blog/choose-wedding-first-dance-song" className="text-primary hover:underline font-heading">How to Choose Your Song →</Link></li>
                <li><Link to="/blog/last-minute-wedding-dance" className="text-primary hover:underline font-heading">Last-Minute Wedding Dance Lessons →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);
export default HowManyWeddingLessons;
