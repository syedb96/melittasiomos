import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/history-of-bachata -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const HistoryOfBachata = () => (
  <Layout>
    <SeoHead title="The History of Bachata — From the Dominican Republic to London | Pura Nights" description="How Bachata evolved from marginalised Dominican guitar music to one of the world's most popular social dances. The full story, told accessibly." path="/blog/history-of-bachata" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "The History of Bachata from the Dominican Republic to London", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-09-05" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Culture</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Culture</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">The History of Bachata — From the Dominican Republic to London</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Sep 2025</span><span>·</span><span>8 min read</span></div>
            <SocialShareButtons title="The History of Bachata" path="/blog/history-of-bachata" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">Bachata's story is one of the most remarkable in music and dance. Born in the poorest neighbourhoods of the Dominican Republic, it was dismissed and stigmatised for decades before becoming one of the most popular social dances on Earth. Here's how it happened.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Origins (1960s)</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Bachata emerged in the 1960s in the rural countryside and barrios of the Dominican Republic. It was a guitar-based music of heartbreak, longing, and everyday life — played in bars, brothels, and street corners. The Dominican elite considered it vulgar and low-class. Radio stations refused to play it. But the people loved it.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Pioneers</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">José Manuel Calderón is often credited with the first Bachata recording in 1962. Through the 70s and 80s, artists like Luis Segura, Leonardo Paniagua, and Blas Durán kept the genre alive despite cultural stigma. The music evolved, adding electric guitar and more polished production.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Juan Luis Guerra and Mainstream Acceptance (1990s)</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">The turning point came in 1990 when Juan Luis Guerra released "Bachata Rosa" — a sophisticated, romantic album that won a Grammy and brought Bachata into the mainstream. Suddenly, the music that had been dismissed was being celebrated. Aventura, Romeo Santos, and Prince Royce would later carry Bachata into the global charts.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Dance Revolution (2000s–present)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">As Bachata music crossed borders, the dance evolved dramatically. In Spain, Bachata Sensual emerged — incorporating body waves, isolations, and contemporary dance influences. In the Dominican Republic, traditional Bachata dancing was preserved and celebrated. Bachata Moderna became the bridge between the two.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Today, Bachata is danced socially in virtually every major city in the world. London's Bachata scene is one of Europe's strongest, with weekly classes, festivals, and a passionate community of dancers.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Bachata in London Today</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">At Pura Nights, Bachata sits at the heart of everything we do. Melitta Siomos — a Bachata UK Champion — teaches all three styles and helps students understand not just the steps, but the emotion, music, and culture behind the dance. Understanding Bachata's history enriches every dance you take.</p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/blog/what-is-bachata" className="btn-cta-primary text-sm">Read: What is Bachata Dance?</Link>
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="text-primary font-heading font-semibold text-sm">Try a Bachata Class →</a>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/what-is-bachata" className="text-primary hover:underline font-heading">What is Bachata Dance? →</Link></li>
                <li><Link to="/blog/history-of-salsa" className="text-primary hover:underline font-heading">The History of Salsa →</Link></li>
                <li><Link to="/blog/pura-ladies-story" className="text-primary hover:underline font-heading">The Pura Ladies Story →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);
export default HistoryOfBachata;
