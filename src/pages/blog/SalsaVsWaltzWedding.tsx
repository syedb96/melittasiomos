import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/salsa-vs-waltz-wedding -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const SalsaVsWaltzWedding = () => (
  <Layout>
    <SeoHead title="Salsa vs Waltz for Your Wedding First Dance | Melitta Siomos" description="Should your wedding first dance be a waltz or a salsa? Compare both styles and find the right fit for your personality and venue." path="/blog/salsa-vs-waltz-wedding" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Salsa vs Waltz for Your Wedding First Dance", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-08-05" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Wedding Dance</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Wedding Dance</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Salsa vs Waltz for Your Wedding First Dance</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Aug 2025</span><span>·</span><span>5 min read</span></div>
            <SocialShareButtons title="Salsa vs Waltz for Your Wedding First Dance" path="/blog/salsa-vs-waltz-wedding" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">The traditional waltz has been the go-to wedding dance for generations — but more couples are choosing Latin dances like Salsa and Bachata for their first dance. Both options can create a stunning moment. Here's how to decide.</p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead><tr className="bg-secondary"><th className="text-left p-3 font-heading">Feature</th><th className="text-left p-3 font-heading">Waltz</th><th className="text-left p-3 font-heading">Salsa / Bachata</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border"><td className="p-3">Feel</td><td className="p-3">Elegant, romantic, classic</td><td className="p-3">Fun, energetic, surprising</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Difficulty</td><td className="p-3">Moderate — timing can be tricky</td><td className="p-3">Moderate — rhythm-based</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Lessons needed</td><td className="p-3">4–6 typically</td><td className="p-3">4–8 typically</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Wow factor</td><td className="p-3">Timeless and graceful</td><td className="p-3">Unexpected and crowd-pleasing</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Best for</td><td className="p-3">Classic venues, formal weddings</td><td className="p-3">Fun venues, surprise dances</td></tr>
                </tbody>
              </table>
            </div>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Best of Both Worlds</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Many of my couples choose a surprise mashup — starting with a romantic waltz-style sway and then breaking into a high-energy Salsa or Bachata halfway through the song. It gives you the classic romantic moment and the crowd-pleasing surprise in one dance. Your guests will love it.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Which Should You Choose?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Choose the waltz if you want something timeless and elegant. Choose Salsa or Bachata if you want to surprise your guests and show off your personality. Choose a mashup if you want both. There's no wrong answer — the right dance is the one that makes you both smile.</p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20we're%20considering%20a%20Latin%20wedding%20dance" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">💬 Discuss Your Options</a>
              <Link to="/wedding-dance" className="text-primary font-heading font-semibold text-sm">Wedding Dance Info →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/choose-wedding-first-dance-song" className="text-primary hover:underline font-heading">How to Choose Your Song →</Link></li>
                <li><Link to="/blog/wedding-first-dance-tips" className="text-primary hover:underline font-heading">10 Tips for the Perfect First Dance →</Link></li>
                <li><Link to="/blog/how-many-wedding-dance-lessons" className="text-primary hover:underline font-heading">How Many Lessons Do We Need? →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);
export default SalsaVsWaltzWedding;
