import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/salsa-on1-vs-on2 -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const SalsaOn1VsOn2 = () => (
  <Layout>
    <SeoHead title="Salsa On1 vs On2 for Beginners — What's the Difference? | Pura Nights" description="Confused about Salsa On1 and On2? This beginner-friendly guide explains the difference, which is easier to learn, and which style is taught at Pura Nights London." path="/blog/salsa-on1-vs-on2" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Salsa On1 vs On2 for Beginners", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-06-25" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Salsa On1 vs On2 for Beginners — What's the Difference?</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jun 2025</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Salsa On1 vs On2 for Beginners" path="/blog/salsa-on1-vs-on2" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">If you've started researching salsa classes, you've probably come across the terms "On1" and "On2." They sound technical, but the concept is simpler than you think. Here's a clear, beginner-friendly explanation.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Simple Explanation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Salsa music has 8 beats per phrase. "On1" and "On2" simply refer to <em>which beat you break (step forward) on</em>:</p>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>On1 (Crossbody / LA style):</strong> You break forward on beat 1. This is the most popular style globally and the one taught at Pura Nights.</li>
              <li><strong>On2 (New York / Mambo style):</strong> You break forward on beat 2. This style is more common in New York and has a different musical feel.</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">On1: Why We Teach It</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">On1 (also called Crossbody or LA-style Salsa) is the most widely danced style of Salsa in the world. It's the default in most European cities, across Latin America, Asia, and much of the US. When you learn On1, you can dance socially almost anywhere.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">On1 is generally considered easier for beginners because the forward break on beat 1 feels more intuitive — beat 1 is the most obvious downbeat in the music. It's flashy, energetic, and visually impressive, which is why it dominates competitions and performances.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">On2: What Makes It Different</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">On2 has a smoother, more grounded feel. Because you break on beat 2, you're dancing more closely to the conga drum pattern in the music, which gives On2 its distinctive flowing quality. It's deeply musical and has a strong following among advanced dancers.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">However, On2 is harder to learn initially because beat 2 is less obvious to untrained ears. In London, On2 socials exist but they're much smaller than On1 events.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Comparison Table</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead><tr className="bg-secondary"><th className="text-left p-3 font-heading">Feature</th><th className="text-left p-3 font-heading">On1 (LA / Crossbody)</th><th className="text-left p-3 font-heading">On2 (NY / Mambo)</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border"><td className="p-3">Break beat</td><td className="p-3">Beat 1</td><td className="p-3">Beat 2</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Feel</td><td className="p-3">Flashy, energetic</td><td className="p-3">Smooth, grounded</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Beginner-friendly</td><td className="p-3">More intuitive</td><td className="p-3">Steeper curve</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Global popularity</td><td className="p-3">Most popular worldwide</td><td className="p-3">NY, some EU cities</td></tr>
                  <tr className="border-t border-border"><td className="p-3">London scene</td><td className="p-3">Dominant style</td><td className="p-3">Smaller niche</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Which Should You Learn?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">If you're a beginner in London, start with On1. It's easier to pick up, it gives you access to the largest social dance community, and it builds a strong foundation that makes learning On2 later much easier. At Pura Nights, we teach On1 Crossbody Salsa, which is the most versatile style for social dancing worldwide.</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Learn On1 Salsa at Pura Nights</a>
              <Link to="/blog/what-is-salsa" className="text-primary font-heading font-semibold text-sm">Full Salsa Guide →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/what-is-salsa" className="text-primary hover:underline font-heading">What is Salsa Dance? →</Link></li>
                <li><Link to="/blog/history-of-salsa" className="text-primary hover:underline font-heading">The History of Salsa →</Link></li>
                <li><Link to="/blog/how-long-to-learn-salsa" className="text-primary hover:underline font-heading">How Long Does It Take to Learn Salsa? →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default SalsaOn1VsOn2;
