import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/salsa-classes-near-chiswick -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const SalsaClassesNearChiswick = () => (
  <Layout>
    <SeoHead title="Salsa Classes Near Chiswick High Road | Every Monday | Pura Nights" description="Looking for salsa classes near Chiswick? Pura Nights runs weekly Salsa & Bachata every Monday at The George IV on Chiswick High Road. Beginners welcome." path="/blog/salsa-classes-near-chiswick" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Salsa Classes Near Chiswick High Road", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-07-05" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Salsa Classes Near Chiswick High Road</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jul 2025</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Salsa Classes Near Chiswick High Road" path="/blog/salsa-classes-near-chiswick" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">If you live near Chiswick High Road — or anywhere in the W4 area — you're walking distance from one of London's best weekly Salsa and Bachata events. Every Monday evening, Pura Nights transforms The George IV pub into a vibrant Latin dance hub, with three class levels and two hours of social dancing.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Venue: The George IV</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">The George IV is a well-known Chiswick High Road landmark, situated at 185 Chiswick High Road, W4 2DR. It's a spacious, welcoming venue with a dedicated dance area, a full bar, and a warm atmosphere that makes newcomers feel instantly comfortable.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">The venue is a 2-minute walk from Turnham Green tube station (District Line) and is served by buses 190, 237, and 267. If you're driving, there's limited street parking on Chiswick High Road and side streets.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Monday Evening Schedule</h2>
            <div className="bg-card rounded-xl p-5 mb-6 text-sm text-muted-foreground space-y-2">
              <p><strong>7:30 PM</strong> — Beginners Salsa & Bachata</p>
              <p><strong>8:00 PM</strong> — Improvers</p>
              <p><strong>8:30 PM</strong> — Intermediate</p>
              <p><strong>9:00–11:00 PM</strong> — Social Dancing (Salsa, Bachata, Merengue)</p>
              <p className="mt-3"><strong>Pricing:</strong> £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
            </div>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Why Chiswick Loves Latin Dance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Chiswick has always been a culturally engaged, socially active neighbourhood. Its residents — a mix of young professionals, families, and retirees — are drawn to experiences that combine fitness, socialising, and creativity. Latin dance ticks all three boxes.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Since Melitta launched Pura Nights in Chiswick, the Monday evening has grown into a genuine community event. Regular students bring friends, couples come for date nights, and solo dancers find a welcoming group who remembers their name from week two.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Who Comes to Monday Classes?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Our Monday students come from Chiswick, Turnham Green, Gunnersbury, Acton, Hammersmith, Brentford, Kew, and even as far as Shepherd's Bush and Fulham. Ages range from early 20s to late 60s, and the gender balance is consistently good. Most people come solo — partner rotation means you'll dance with everyone.</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Monday in Chiswick</a>
              <Link to="/salsa-classes-chiswick" className="text-primary font-heading font-semibold text-sm">Full Chiswick Page →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/best-areas-west-london-salsa-bachata" className="text-primary hover:underline font-heading">Best Areas in West London for Latin Dance →</Link></li>
                <li><Link to="/blog/first-salsa-class-london" className="text-primary hover:underline font-heading">Your First Salsa Class: What to Expect →</Link></li>
                <li><Link to="/blog/bachata-classes-near-ealing" className="text-primary hover:underline font-heading">Bachata Classes Near Ealing Broadway →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default SalsaClassesNearChiswick;
