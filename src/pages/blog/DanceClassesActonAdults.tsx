import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/dance-classes-acton-adults -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const DanceClassesActonAdults = () => (
  <Layout>
    <SeoHead title="Dance Classes in Acton for Adults | Salsa & Bachata Near W3 | Pura Nights" description="Adult dance classes near Acton. Weekly Salsa & Bachata in nearby Chiswick and Ealing — easily accessible from all Acton stations. All levels, no partner needed." path="/blog/dance-classes-acton-adults" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Dance Classes in Acton for Adults", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-07-15" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Dance Classes in Acton for Adults</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jul 2025</span><span>·</span><span>5 min read</span></div>
            <SocialShareButtons title="Dance Classes in Acton for Adults" path="/blog/dance-classes-acton-adults" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">If you're an adult in Acton looking for a fun, social, and genuinely useful evening activity, Latin dance might be exactly what you need. While there aren't currently dedicated dance classes running within Acton itself, Pura Nights' two weekly venues are both a short journey from any part of W3.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Getting There from Acton</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-heading font-semibold text-sm mb-2 text-primary">Monday — Chiswick</h3>
                <p className="text-muted-foreground text-sm">District Line from Acton Town to Turnham Green (2 min). Bus 237 from Acton High Street. Walking distance from South Acton.</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-heading font-semibold text-sm mb-2 text-peach">Tuesday — Ealing</h3>
                <p className="text-muted-foreground text-sm">Elizabeth Line from Acton Main Line to West Ealing (3 min). Bus 207 from Acton High Street. Easy cycle from any part of Acton.</p>
              </div>
            </div>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Why Latin Dance Is Perfect for Adults</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Unlike gym classes or team sports, Latin dance combines physical exercise, mental stimulation, and genuine social connection in a single evening. Research consistently shows that dance improves balance, coordination, cardiovascular fitness, and mental wellbeing — while also building a social network that many adults struggle to find after university.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">At Pura Nights, our students range from their early 20s to their late 60s. There's no "right age" to start — and the inclusive, warm atmosphere means you'll feel welcome from your very first class.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What Acton Students Tell Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Many of our Acton students say the same thing: they were looking for something to do on weekday evenings that wasn't the pub, the gym, or Netflix. Latin dance gave them a community, a physical outlet, and a creative hobby — all in one. Several attend both Monday and Tuesday, maximising their progress and social connections.</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class</a>
              <Link to="/salsa-classes-acton" className="text-primary font-heading font-semibold text-sm">Full Acton Info →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/best-areas-west-london-salsa-bachata" className="text-primary hover:underline font-heading">Best Areas in West London →</Link></li>
                <li><Link to="/blog/first-salsa-class-london" className="text-primary hover:underline font-heading">Your First Salsa Class →</Link></li>
                <li><Link to="/blog/salsa-no-partner" className="text-primary hover:underline font-heading">Can You Learn Without a Partner? →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default DanceClassesActonAdults;
