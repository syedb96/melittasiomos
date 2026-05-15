import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/build-confidence-on-dance-floor -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const BuildConfidenceOnDanceFloor = () => (
  <Layout>
    <SeoHead
      title={`How to Build Confidence on the Dance Floor — A Real Plan | Pura Nights`}
      description={`Stop freezing on the dance floor. A practical 6-week confidence plan for salsa and bachata beginners in London — drills, mindset, and small wins.`}
      path="/blog/build-confidence-on-dance-floor"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `How to Build Confidence on the Dance Floor — A Real Plan`,
          description: `Stop freezing on the dance floor. A practical 6-week confidence plan for salsa and bachata beginners in London — drills, mindset, and small wins.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/build-confidence-on-dance-floor",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "How long until I feel confident?", "acceptedAnswer": {"@type": "Answer", "text": "Six to twelve weeks of consistent attendance. The shy-to-confident curve is more reliable than people expect."}}, {"@type": "Question", "name": "Is private coaching faster?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — a private lesson focused on the basic step and one solid turn can compress weeks into days."}}, {"@type": "Question", "name": "What if I freeze mid-dance?", "acceptedAnswer": {"@type": "Answer", "text": "Reset to the basic step. Smile. Breathe. The basic step is always the safe house."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `How to Build Confidence on the Dance Floor — A Real Plan`, item: "https://www.puranights.com/blog/build-confidence-on-dance-floor" },
          ],
        },
      ]}
    />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span>
          </nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">How to Build Confidence on the Dance Floor — A Real Plan</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>8 min read</span>
            </div>
            <SocialShareButtons title={`How to Build Confidence on the Dance Floor — A Real Plan`} path="/blog/build-confidence-on-dance-floor" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">Confidence on the dance floor isn't a personality trait — it's a skill, and like any skill it has a curriculum. Most beginners freeze for the same three reasons: they don't know the basic step well enough, they're trying to think two moves ahead, and they're worried about being watched. All three are fixable in six weeks.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Week 1–2: Own the Basic Step</h2>
            <p className="text-muted-foreground mb-4">If your basic step isn't automatic, your brain has zero spare bandwidth for the rest. Drill it daily — 5 minutes in the kitchen counts. Confidence starts when the basic step happens without thought.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Week 3: Stop Looking at Your Feet</h2>
            <p className="text-muted-foreground mb-4">Eyes up. Shoulders relaxed. The floor doesn't move — your partner does. Looking down communicates 'I'm scared' before any step is taken; looking up communicates 'I've got this' even when you don't.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Week 4: One Move, Many Songs</h2>
            <p className="text-muted-foreground mb-4">Pick *one* turn or transition you can do reliably. Use it across five different songs of varying tempo. Confidence grows from depth, not breadth.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Week 5: Dance with Better Dancers</h2>
            <p className="text-muted-foreground mb-4">The fastest confidence accelerator is dancing with people slightly above your level. They'll cover for your mistakes, and you'll absorb timing without thinking. Ask. Most will say yes.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Week 6: The Small Performance</h2>
            <p className="text-muted-foreground mb-4">Film yourself dancing 30 seconds. Most people are shocked at how much better they look than they feel. The gap between your inner experience and the outside view is your real confidence problem — close it with evidence.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Mindset Shift That Matters</h2>
            <p className="text-muted-foreground mb-4">Nobody is watching you as closely as you think. The room is busy with its own dancing. Once you accept this, you're free.</p>

            <BlogCTA variant="start" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">How long until I feel confident?</h3><p className="text-muted-foreground text-sm">Six to twelve weeks of consistent attendance. The shy-to-confident curve is more reliable than people expect.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Is private coaching faster?</h3><p className="text-muted-foreground text-sm">Yes — a private lesson focused on the basic step and one solid turn can compress weeks into days.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">What if I freeze mid-dance?</h3><p className="text-muted-foreground text-sm">Reset to the basic step. Smile. Breathe. The basic step is always the safe house.</p></div>
            </div>

            <SocialShareButtons title={`How to Build Confidence on the Dance Floor — A Real Plan`} path="/blog/build-confidence-on-dance-floor" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/start-here", label: "Start Here — Beginner's Path" }, { to: "/private-lessons", label: "Private Confidence Coaching" }, { to: "/blog/improve-social-dancing", label: "Improve Your Social Dancing" }]} />
  </Layout>
);

export default BuildConfidenceOnDanceFloor;
