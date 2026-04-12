import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/last-minute-wedding-dance -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const LastMinuteWeddingDance = () => (
  <Layout>
    <SeoHead title="Last-Minute Wedding Dance Lessons London | Melitta Siomos" description="Wedding coming up fast? It's not too late. Last-minute wedding dance lessons in London with Melitta Siomos. Even one session can make a huge difference." path="/blog/last-minute-wedding-dance" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Last-Minute Wedding Dance Lessons London", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-08-15" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Wedding Dance</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Wedding Dance</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Last-Minute Wedding Dance Lessons London</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Aug 2025</span><span>·</span><span>4 min read</span></div>
            <SocialShareButtons title="Last-Minute Wedding Dance Lessons London" path="/blog/last-minute-wedding-dance" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">Your wedding is weeks — maybe even days — away, and you haven't sorted the first dance. Don't panic. This is far more common than you think, and even a single session can transform your first dance from a nerve-wracking ordeal into a genuinely enjoyable moment.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What One Lesson Can Do</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">In a single 60-minute intensive, I can teach you: a confident starting position, how to move together naturally, 2–3 simple moves that look great, how to handle the opening and closing of your dance, and strategies for managing nerves. That's enough to look comfortable and confident in front of your guests.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What Two Lessons Can Do</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">With two sessions (ideally a week apart), we can build a simple choreographed routine to your song. You'll have specific moves mapped to specific parts of the music, giving you a clear plan for the whole dance. Many of my most successful wedding dances were created in just two sessions.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">How Fast Can We Start?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">I typically respond to WhatsApp messages within hours and can often fit in lessons within the same week. Evening and weekend sessions are available. I teach from studios in Chiswick and Ealing, or I can come to your home or venue.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Online lessons via Zoom are also an option if you're short on time for travel — they work surprisingly well for wedding dance prep.</p>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">The bottom line:</strong> It's never too late. Even if your wedding is this weekend, one lesson is better than none. Don't let perfectionism stop you — your guests want to see you happy, not perfect.</p>
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20our%20wedding%20is%20very%20soon%20and%20we%20need%20last-minute%20dance%20help!" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">💬 Message Melitta Now</a>
              <a href="mailto:siomosmelitta@gmail.com" className="text-primary font-heading font-semibold text-sm">Email Instead →</a>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/how-many-wedding-dance-lessons" className="text-primary hover:underline font-heading">How Many Lessons Do We Need? →</Link></li>
                <li><Link to="/blog/wedding-first-dance-tips" className="text-primary hover:underline font-heading">10 Tips for the Perfect First Dance →</Link></li>
                <li><Link to="/blog/choose-wedding-first-dance-song" className="text-primary hover:underline font-heading">How to Choose Your Song →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);
export default LastMinuteWeddingDance;
