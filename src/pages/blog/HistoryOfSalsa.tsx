import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/history-of-salsa -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const HistoryOfSalsa = () => (
  <Layout>
    <SeoHead title="The History of Salsa in Plain English | Pura Nights London" description="From Cuban son to New York mambo to global phenomenon — the history of Salsa dance explained clearly and accessibly. No jargon, just the story." path="/blog/history-of-salsa" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "The History of Salsa in Plain English", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-09-01" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Culture</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Culture</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">The History of Salsa in Plain English</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Sep 2025</span><span>·</span><span>8 min read</span></div>
            <SocialShareButtons title="The History of Salsa in Plain English" path="/blog/history-of-salsa" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">Salsa is one of the world's most popular social dances — but its origins are often misunderstood. It wasn't invented in one place by one person. It's the product of centuries of cultural fusion across Cuba, Puerto Rico, New York, and the wider Caribbean. Here's the story, told simply.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The African Roots</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">The rhythmic foundation of Salsa comes from West Africa. When enslaved Africans were brought to the Caribbean, they carried their drumming traditions, polyrhythmic patterns, and communal dance practices with them. These rhythms — particularly the clave pattern — would become the heartbeat of all Latin music.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Cuba: Where It All Began</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">In Cuba, African rhythms blended with Spanish guitar and European dance forms to create Son Cubano — the direct ancestor of Salsa. Son emerged in the late 1800s in eastern Cuba and gradually spread to Havana, where it became the country's national music. Other Cuban genres — Mambo, Cha-Cha-Cha, Rumba — also contributed to what would eventually become Salsa.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">New York: The Melting Pot</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">In the 1940s–60s, Cuban and Puerto Rican immigrants brought their music to New York City. In the dance halls of the Bronx, Harlem, and Spanish Harlem, Cuban son mixed with Puerto Rican plena, American jazz, and R&B to create something new. The Fania Records label coined the term "Salsa" in the 1970s to market this fusion — and the name stuck.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">LA Style and the Global Explosion</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">In the 1990s, Los Angeles developed "Crossbody" or "On1" Salsa — a more linear, visually dramatic style that was easier to learn and spectacular to watch. This is the style that exploded globally and the style we teach at Pura Nights. Competitions, congresses, and social dance events spread Salsa to every continent.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Salsa Today</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Today, millions of people dance Salsa socially every week across the world. London has one of the strongest scenes in Europe, with weekly classes, monthly socials, and annual congresses. At its core, Salsa remains what it's always been: a celebration of rhythm, connection, and community.</p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/blog/what-is-salsa" className="btn-cta-primary text-sm">Read: What is Salsa Dance?</Link>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="text-primary font-heading font-semibold text-sm">Try a Salsa Class →</a>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/what-is-salsa" className="text-primary hover:underline font-heading">What is Salsa Dance? →</Link></li>
                <li><Link to="/blog/salsa-on1-vs-on2" className="text-primary hover:underline font-heading">Salsa On1 vs On2 →</Link></li>
                <li><Link to="/blog/history-of-bachata" className="text-primary hover:underline font-heading">The History of Bachata →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);
export default HistoryOfSalsa;
