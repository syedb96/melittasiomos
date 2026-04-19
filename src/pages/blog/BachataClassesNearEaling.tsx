import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogPostFooter from "@/components/BlogPostFooter";

/* <!-- WIX PAGE: /blog/bachata-classes-near-ealing -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const BachataClassesNearEaling = () => (
  <Layout>
    <SeoHead title="Bachata Classes Near Ealing Broadway | Every Tuesday | Pura Nights" description="Weekly Bachata classes near Ealing Broadway every Tuesday at the Drayton Court Hotel. Beginners to intermediate, free ladies styling, and social dancing." path="/blog/bachata-classes-near-ealing" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Bachata Classes Near Ealing Broadway", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-07-10" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Bachata Classes Near Ealing Broadway</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jul 2025</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Bachata Classes Near Ealing Broadway" path="/blog/bachata-classes-near-ealing" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">If you live near Ealing Broadway or anywhere in the W5/W13 area, you're minutes from one of West London's best Bachata nights. Every Tuesday, Pura Nights takes over the beautiful Drayton Court Hotel with Bachata and Salsa classes for all levels, a free ladies styling session, and two hours of social dancing.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Venue: Drayton Court Hotel</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">The Drayton Court Hotel is a stunning Grade II listed building at 2 The Avenue, West Ealing, W13 8PH. Its grand ballroom-style space creates an atmosphere that's both elegant and welcoming — the perfect setting for Latin dance.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">The hotel is a 3-minute walk from West Ealing station (Elizabeth Line) and easily reachable from Ealing Broadway (Central/District lines) by the 83 or 207 bus. Free parking is available at the venue.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Tuesday Evening Schedule</h2>
            <div className="bg-card rounded-xl p-5 mb-6 text-sm text-muted-foreground space-y-2">
              <p><strong>6:50–7:20 PM</strong> — Free Ladies Styling (open to all women)</p>
              <p><strong>7:30 PM</strong> — Beginners Salsa & Bachata</p>
              <p><strong>8:00 PM</strong> — Improvers</p>
              <p><strong>8:30 PM</strong> — Intermediate</p>
              <p><strong>9:00–11:00 PM</strong> — Social Dancing</p>
              <p className="mt-3"><strong>Pricing:</strong> £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
            </div>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Why Bachata Thrives in Ealing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Ealing's diverse, culturally rich community has embraced Bachata wholeheartedly. The Tuesday night regularly draws 80+ dancers, making it one of the largest weekly Latin events in West London. The Elizabeth Line connection has expanded the reach even further — we now see students from Paddington, Slough, and beyond.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">The free ladies styling session before classes is unique to Ealing and has become a highlight for many women. It covers body movement, arm styling, and footwork refinements — skills that transform your Bachata dancing.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Ealing Bachata Community</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">What makes Ealing special isn't just the venue or the classes — it's the community. Tuesday regulars often stay past 11 PM chatting and planning weekend socials. Several of our Pura Ladies team members were first discovered on the Ealing dance floor. It's a place where friendships, creative partnerships, and genuine connections form naturally.</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Tuesday in Ealing</a>
              <Link to="/bachata-classes-ealing" className="text-primary font-heading font-semibold text-sm">Full Ealing Page →</Link>
            </div>
            <AuthorCard />
          </FadeInUp>
          <BlogPostFooter related={[
            { to: "/blog/best-areas-west-london", title: "Best Areas in West London for Latin Dance", category: "Local", readTime: "7 min" },
            { to: "/blog/what-is-bachata", title: "What is Bachata Dance?", category: "Bachata", readTime: "6 min" },
            { to: "/blog/bachata-for-beginners-london", title: "Bachata for Complete Beginners", category: "Beginners", readTime: "7 min" },
          ]} />
        </div>
      </section>
    </article>
  </Layout>
);

export default BachataClassesNearEaling;
