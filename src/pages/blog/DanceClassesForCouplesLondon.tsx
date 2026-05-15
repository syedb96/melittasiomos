import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/dance-classes-for-couples-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const DanceClassesForCouplesLondon = () => (
  <Layout>
    <SeoHead
      title={`Dance Classes for Couples in London — Salsa & Bachata Together | Pura Nights`}
      description={`Salsa and bachata classes for couples in London. Group classes, private lessons, and wedding choreography — the smartest hobby a couple can share.`}
      path="/blog/dance-classes-for-couples-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Dance Classes for Couples in London — Salsa & Bachata Together`,
          description: `Salsa and bachata classes for couples in London. Group classes, private lessons, and wedding choreography — the smartest hobby a couple can share.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/dance-classes-for-couples-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "Can we attend a group class as a couple?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — and you'll dance with each other plus others during partner rotations. Both of you will improve faster than if you only practised alone."}}, {"@type": "Question", "name": "Do couples private lessons cost more?", "acceptedAnswer": {"@type": "Answer", "text": "The lesson rate is per session, not per person, so it's often the better value option for two."}}, {"@type": "Question", "name": "Do you teach wedding first dances?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — see the Wedding Dance page for the full process and consultation enquiry form."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `Dance Classes for Couples in London — Salsa & Bachata Together`, item: "https://www.puranights.com/blog/dance-classes-for-couples-london" },
          ],
        },
      ]}
    />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Lifestyle</span>
          </nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Lifestyle</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Dance Classes for Couples in London — Salsa & Bachata Together</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>7 min read</span>
            </div>
            <SocialShareButtons title={`Dance Classes for Couples in London — Salsa & Bachata Together`} path="/blog/dance-classes-for-couples-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">Couples who dance together don't just have a hobby — they have a shared language, a private joke, and a built-in date night that survives every life stage. Whether you're newly together, ten years in, or planning a wedding, there's a Latin dance format in London that fits.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Group Classes for Couples</h2>
            <p className="text-muted-foreground mb-4">Drop in to a Pura Nights weekly class together. You'll rotate partners during the lesson but leave with the same skills, ready to dance with each other at any social or wedding. £10 per person, no booking, every Monday in Chiswick and Tuesday in Ealing.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Private Lessons for Couples</h2>
            <p className="text-muted-foreground mb-4">Private lessons are the fastest path to dancing well together. A 60-minute session with Melitta works around your schedule, your music, and your specific goals — first dance, anniversary surprise, holiday salsa, or just connection. Enquiry only.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Couples Improve Faster Together</h2>
            <p className="text-muted-foreground mb-4">You practise between classes — even 10 minutes in the kitchen counts. You watch each other and self-correct. You build a shared muscle memory most couples never get.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Wedding Dance Specifics</h2>
            <p className="text-muted-foreground mb-4">If you're getting married, the wedding dance route is its own format — choreographed, song-specific, and timed to your run-up. Most couples need 4–8 lessons. See the wedding dance page for the full process.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Surprising Relationship Benefits</h2>
            <p className="text-muted-foreground mb-4">Couples who learn together report better non-verbal communication, lower argument frequency, and higher physical affection scores. A dance lesson is — quietly — one of the most effective couple's-therapy alternatives in London.</p>

            <BlogCTA variant="private" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Can we attend a group class as a couple?</h3><p className="text-muted-foreground text-sm">Yes — and you'll dance with each other plus others during partner rotations. Both of you will improve faster than if you only practised alone.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Do couples private lessons cost more?</h3><p className="text-muted-foreground text-sm">The lesson rate is per session, not per person, so it's often the better value option for two.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Do you teach wedding first dances?</h3><p className="text-muted-foreground text-sm">Yes — see the Wedding Dance page for the full process and consultation enquiry form.</p></div>
            </div>

            <SocialShareButtons title={`Dance Classes for Couples in London — Salsa & Bachata Together`} path="/blog/dance-classes-for-couples-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/private-lessons", label: "Private Lessons" }, { to: "/wedding-dance-london", label: "Wedding First Dance" }, { to: "/pura-nights", label: "Weekly Couples-Friendly Classes" }]} />
  </Layout>
);

export default DanceClassesForCouplesLondon;
