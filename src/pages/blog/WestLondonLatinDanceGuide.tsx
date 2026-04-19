import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/west-london-latin-dance-guide -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const WestLondonLatinDanceGuide = () => (
  <Layout>
    <SeoHead title="West London Latin Dance Guide — Classes, Socials & Community | Pura Nights" description="The definitive guide to Latin dance in West London. Find the best Salsa and Bachata classes, social events, and community in Chiswick, Ealing, Acton and beyond." path="/blog/west-london-latin-dance-guide" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "West London Latin Dance Guide", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-07-20" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">West London Latin Dance Guide</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jul 2025</span><span>·</span><span>8 min read</span></div>
            <SocialShareButtons title="West London Latin Dance Guide" path="/blog/west-london-latin-dance-guide" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">West London has quietly become one of the UK's most vibrant Latin dance scenes. From structured weekly classes to buzzing monthly socials, this corner of the capital offers everything a Latin dancer needs — whether you're a complete beginner or an experienced social dancer looking for your next community.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Weekly Classes</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">The backbone of any Latin dance scene is consistent, quality weekly instruction. In West London, Pura Nights runs the most established weekly programme:</p>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>Monday in Chiswick</strong> — The George IV, W4 2DR. Three levels (Beginners, Improvers, Intermediate) from 7:30 PM, followed by social dancing 9–11 PM.</li>
              <li><strong>Tuesday in Ealing</strong> — Drayton Court Hotel, W13 8PH. Free ladies styling from 6:50 PM, three class levels from 7:30 PM, social dancing 9–11 PM.</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Monthly Socials & Events</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Beyond weekly classes, the West London Latin scene comes alive through monthly events. Pura Nights hosts regular social nights, workshops, and seasonal parties that bring together dancers from across the capital. Follow @puranights.salsabachata on Instagram for the latest event announcements.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Dance Styles</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">West London's Latin dance scene centres on two core dances:</p>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>Salsa (On1 Crossbody)</strong> — the most popular global style, energetic, musical, and endlessly creative</li>
              <li><strong>Bachata (Moderna & Sensual)</strong> — intimate, expressive, and one of the fastest-growing dances worldwide</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Beyond Classes: The Community</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">What sets West London's Latin scene apart is the community. The Pura Nights WhatsApp group, Instagram community, and regular social events create a network that extends far beyond the dance floor. Students organise weekend outings, attend London congresses together, and form friendships that last years.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">For women, the Pura Ladies performance team offers a pathway from social dancer to performer — with teams now in London, Plymouth, Munich, and Lisbon.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">How to Get Started</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">The best way to enter the West London Latin dance world is simply to show up to a Monday or Tuesday class. No booking required for your first visit, no partner needed, and complete beginners are welcomed every week. Within a few weeks, you'll have a new hobby, a new community, and a new reason to look forward to Monday evenings.</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class</a>
              <Link to="/start-here" className="text-primary font-heading font-semibold text-sm">Start Here Guide →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/best-areas-west-london-salsa-bachata" className="text-primary hover:underline font-heading">Best Areas in West London →</Link></li>
                <li><Link to="/blog/salsa-south-west-london" className="text-primary hover:underline font-heading">Salsa in South West London →</Link></li>
                <li><Link to="/blog/first-salsa-class-london" className="text-primary hover:underline font-heading">Your First Salsa Class →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default WestLondonLatinDanceGuide;
