import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogPostFooter from "@/components/BlogPostFooter";
import BlogMoneyCTA from "@/components/BlogMoneyCTA";

/* <!-- WIX PAGE: /blog/pura-ladies-story -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const PuraLadiesStory = () => (
  <Layout>
    <SeoHead title="Pura Ladies Dance Company — Our Story | 7 Teams, 4 Countries" description="How Pura Ladies grew from one London team to 7 groups across London, Plymouth, Munich, and Lisbon." path="/blog/pura-ladies-story" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "The Story of Pura Ladies", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-05-01" }} />
    <ReadingProgressBar />
    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-sm text-muted-foreground mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> → <Link to="/blog" className="hover:text-primary">Blog</Link> → <span className="text-foreground">Culture</span></nav>
          <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Culture</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">The Story of Pura Ladies — How One Dream Became a Global Community</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-heading mb-8"><span>By Melitta Siomos</span><span>·</span><span>May 2025</span><span>·</span><span>5 min read</span></div>
          <SocialShareButtons title="The Story of Pura Ladies" path="/blog/pura-ladies-story" />
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none mt-10 font-body text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-5 [&_p]:leading-relaxed [&_ul]:mb-5 [&_li]:mb-2">
            <p>Pura Ladies began with a simple idea: give women who love Latin dance a space to perform, challenge themselves, and belong to something bigger. Six years later, it spans 7 teams across 4 countries.</p>
            <h2>How It Began</h2>
            <p>Founded in 2017 in London by Melitta Siomos. The first team: committed Pura Nights students ready for the next level. Weekly rehearsals, a Bachata Sensual choreography, performances at Pura Nights events. The audience response was electric.</p>
            <h2>Growing Across Borders</h2>
            <p>Dancers in Munich, then Plymouth, then Lisbon asked to form teams. Each has its own leader while sharing Pura Ladies standards and values.</p>
            <ul><li>🇬🇧 <strong>London</strong> — Multiple groups, the heart of the company</li><li>🇬🇧 <strong>Plymouth</strong> — Led by Lucy Ashley</li><li>🇩🇪 <strong>Munich</strong> — Led by Lucia Delho</li><li>🇵🇹 <strong>Lisbon</strong> — Led by Aline Sickert</li></ul>
            <h2>What Makes Pura Ladies Different</h2>
            <p>It's the culture. High standards in a supportive environment. Members describe it as life-changing — finding confidence, friendships, and discovering that performance discipline transfers into every area of life.</p>
            <h2>Stories from the Team</h2>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-8">"I've been a student of Melitta for over 7 years and she is still my favourite instructor." — <strong>Lucia R., Pura Ladies Munich</strong></blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-8">"Pura Ladies has genuinely changed my confidence. Not just on the dance floor — in everything." — <strong>Aisha T., London</strong></blockquote>
            <h2>How to Join</h2>
            <p>Auditions held annually (typically February). Minimum: improvers-level experience. Melitta looks for commitment, coachability, and genuine passion. Best prep: attend Pura Nights weekly classes, especially the Tuesday Ladies Styling warm-up.</p>
            <div className="not-prose my-12 bg-primary rounded-2xl p-8 text-center">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Join the Movement</h3>
              <p className="text-primary-foreground/80 font-heading text-sm mb-5">Follow @puraladies for audition announcements</p>
              <a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="btn-cta-dark inline-block">Follow @puraladies</a>
            </div>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <AuthorCard />
        </FadeInUp>
        <BlogPostFooter related={[
          { to: "/blog/what-is-bachata", title: "What is Bachata?", category: "Bachata", readTime: "6 min" },
          { to: "/blog/what-is-salsa", title: "What is Salsa?", category: "Salsa", readTime: "6 min" },
          { to: "/blog/wedding-first-dance-tips", title: "Wedding Dance Tips", category: "Wedding", readTime: "5 min" },
        ]} />
      </div>
    </article>
  </Layout>
);
export default PuraLadiesStory;
