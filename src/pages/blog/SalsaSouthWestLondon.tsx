import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/salsa-south-west-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const SalsaSouthWestLondon = () => (
  <Layout>
    <SeoHead title="Where to Learn Salsa in South West London | Pura Nights" description="Looking for salsa classes in South West London? Discover the best options near Kew, Richmond, Brentford, and Chiswick with Pura Nights." path="/blog/salsa-south-west-london" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Where to Learn Salsa in South West London", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-07-25" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Where to Learn Salsa in South West London</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jul 2025</span><span>·</span><span>5 min read</span></div>
            <SocialShareButtons title="Where to Learn Salsa in South West London" path="/blog/salsa-south-west-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">South West London — from Richmond and Kew to Putney, Barnes, and Brentford — is full of people who'd love Latin dance but assume the nearest classes are in Central London. The truth? You're closer than you think.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Chiswick: Your Closest Option</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Our Monday classes at The George IV in Chiswick (W4 2DR) are the most accessible Salsa and Bachata classes for anyone in South West London. Here's how close you are:</p>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>Kew:</strong> One stop from Kew Gardens station to Turnham Green (District Line), or a 10-minute cycle along the river</li>
              <li><strong>Richmond:</strong> District Line to Turnham Green (15 min direct)</li>
              <li><strong>Brentford:</strong> Walk across Kew Bridge or bus 237/267</li>
              <li><strong>Barnes:</strong> Bus 190 to Chiswick High Road (12 min)</li>
              <li><strong>Putney:</strong> District Line to Turnham Green (20 min)</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What Awaits You</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Pura Nights offers three class levels every Monday evening — Beginners (7:30 PM), Improvers (8:00 PM), and Intermediate (8:30 PM) — followed by two hours of social dancing from 9:00 to 11:00 PM. The evening covers both Salsa and Bachata, so you learn two dances in one night.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">The South West London contingent at our Monday classes has grown steadily — residents from Kew, Richmond, and Barnes particularly appreciate the combination of quality instruction, a welcoming venue, and easy transport links.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Tuesday in Ealing: Your Second Option</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">For South West London residents, Tuesday in Ealing is also reachable via the South Western Railway to Brentford, then bus or cycle to West Ealing. Many of our dedicated students attend both nights, and the cross-pollination between the two communities adds richness to both.</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class</a>
              <Link to="/dance-classes-south-west-london" className="text-primary font-heading font-semibold text-sm">Full SW London Page →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/best-areas-west-london-salsa-bachata" className="text-primary hover:underline font-heading">Best Areas in West London →</Link></li>
                <li><Link to="/blog/salsa-classes-near-chiswick" className="text-primary hover:underline font-heading">Salsa Near Chiswick High Road →</Link></li>
                <li><Link to="/blog/west-london-latin-dance-guide" className="text-primary hover:underline font-heading">West London Latin Dance Guide →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default SalsaSouthWestLondon;
