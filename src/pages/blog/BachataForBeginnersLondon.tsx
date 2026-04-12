import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/bachata-for-beginners-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const BachataForBeginners = () => (
  <Layout>
    <SeoHead title="Bachata for Complete Beginners in London | Start Dancing Today | Pura Nights" description="Never tried Bachata? This beginner's guide covers everything — what Bachata is, what to expect in your first class, and why London is the best place to learn." path="/blog/bachata-for-beginners-london" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Bachata for Complete Beginners in London", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-06-15" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Bachata for Complete Beginners in London</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jun 2025</span><span>·</span><span>7 min read</span></div>
            <SocialShareButtons title="Bachata for Complete Beginners in London" path="/blog/bachata-for-beginners-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">Bachata is one of the most accessible and emotionally rewarding dances you can learn. Born in the Dominican Republic, it's evolved into a global phenomenon with millions of dancers worldwide — and London has one of the strongest Bachata communities in Europe. If you've never danced Bachata before, this guide is for you.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What is Bachata?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Bachata is a partner dance characterised by a side-to-side basic step with a distinctive "tap" on every fourth beat. The music is emotional, romantic, and deeply rhythmic — a mix of guitar, bongos, and vocals that feels both intimate and energising.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">There are three main styles of Bachata danced socially today: Traditional (Dominican), Bachata Moderna, and Bachata Sensual. At Pura Nights, we teach all three, building from the foundations up so you're comfortable on any social dance floor.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Why Bachata Is Perfect for Beginners</h2>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li>The basic step is simple — side, side, side, tap. You can learn it in 5 minutes.</li>
              <li>The music has a clear, steady beat that's easy to follow</li>
              <li>It's danced in close or open hold — you choose your comfort level</li>
              <li>It's deeply musical — even beginners can start expressing the music quickly</li>
              <li>The community is welcoming and inclusive</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Your First Bachata Class at Pura Nights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">At Pura Nights, Bachata is taught alongside Salsa every evening. In the beginners class, you'll learn the basic step, simple turns, and the fundamentals of leading and following. The class lasts 30 minutes, after which you move into improvers (if you're ready) or stay to practise during the social.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">On Tuesdays in Ealing, we also offer a free ladies styling session from 6:50–7:20 PM — an excellent opportunity for women to develop body movement, arm styling, and confidence before the main classes begin.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Partner rotation means you don't need to bring a partner. You'll dance with everyone in the class, building adaptability and social confidence from day one.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Where to Learn Bachata in London</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">London has a thriving Bachata scene, with classes, socials, and festivals throughout the year. For structured, progressive learning with an award-winning instructor, Pura Nights offers weekly classes in two West London venues:</p>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>Monday in Chiswick</strong> — The George IV, W4 2DR (from 7:30 PM)</li>
              <li><strong>Tuesday in Ealing</strong> — Drayton Court Hotel, W13 8PH (from 6:50 PM)</li>
            </ul>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Your First Bachata Class</a>
              <Link to="/blog/what-is-bachata" className="text-primary font-heading font-semibold text-sm">Full Bachata Guide →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/what-is-bachata" className="text-primary hover:underline font-heading">What is Bachata Dance? →</Link></li>
                <li><Link to="/blog/salsa-vs-bachata" className="text-primary hover:underline font-heading">Salsa vs Bachata — Which First? →</Link></li>
                <li><Link to="/blog/what-to-wear-salsa-bachata" className="text-primary hover:underline font-heading">What to Wear to Class →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default BachataForBeginners;
