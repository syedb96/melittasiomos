import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/best-latin-social-dancing-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const BestLatinSocialDancingLondon = () => (
  <Layout>
    <SeoHead
      title={`The Best Latin Social Dancing in London — 2026 Insider Guide | Pura Nights`}
      description={`Where to actually go for Latin social dancing in London in 2026 — weekly socials, monthly events, and the rooms locals don't post on Instagram.`}
      path="/blog/best-latin-social-dancing-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `The Best Latin Social Dancing in London — 2026 Insider Guide`,
          description: `Where to actually go for Latin social dancing in London in 2026 — weekly socials, monthly events, and the rooms locals don't post on Instagram.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/best-latin-social-dancing-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "What's the friendliest social for beginners?", "acceptedAnswer": {"@type": "Answer", "text": "Pura Nights' Tuesday and Monday classes-and-social combos in Ealing and Chiswick. Class first, social after, no pressure."}}, {"@type": "Question", "name": "Do I need to book?", "acceptedAnswer": {"@type": "Answer", "text": "Walk-ins are standard. The monthly Latin Friday is the exception — book ahead because it sells out."}}, {"@type": "Question", "name": "What's the dress code?", "acceptedAnswer": {"@type": "Answer", "text": "Smart-casual. Comfortable shoes you can pivot in. Save the heels for nights you've practised in them."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `The Best Latin Social Dancing in London — 2026 Insider Guide`, item: "https://www.puranights.com/blog/best-latin-social-dancing-london" },
          ],
        },
      ]}
    />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Events</span>
          </nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Events</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">The Best Latin Social Dancing in London — 2026 Insider Guide</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>9 min read</span>
            </div>
            <SocialShareButtons title={`The Best Latin Social Dancing in London — 2026 Insider Guide`} path="/blog/best-latin-social-dancing-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">London's Latin social scene is bigger than most newcomers realise — and a lot more curated than the listings suggest. Some rooms are friendly to beginners, some are advanced-only without saying so out loud, and some are the best night of your month. Here's an honest insider's map of where to dance Salsa and Bachata in London right now.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">West London — The Pura Nights Pocket</h2>
            <p className="text-muted-foreground mb-4">The Drayton Court (Ealing, W13) on Tuesdays and The George IV (Chiswick, W4) on Mondays are the warmest beginner-friendly rooms in West London. Class first, social after, full bar. Once a month the Latin Friday at the Drayton turns into a 200-person celebration.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Central London — The Big Weekly Nights</h2>
            <p className="text-muted-foreground mb-4">Central rooms tend to skew advanced. Arrive after 10pm if you want a higher-level floor; arrive at 8pm for the friendlier crossover hours. Always check whether classes are included before paying entry.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">South London — Underrated and Local</h2>
            <p className="text-muted-foreground mb-4">South of the river runs smaller, more intimate rooms — usually one or two regular socials a week, often free with a drink. Easier to make regulars out of strangers because the same 40 faces show up.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">East London — Younger, Edgier</h2>
            <p className="text-muted-foreground mb-4">East socials lean younger, later, and louder. Brilliant if you want bachata sensual and a club-night atmosphere. Less ideal for shy beginners.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Pick the Right Room for You</h2>
            <p className="text-muted-foreground mb-4">If you're under six months in: West London, before 10pm. If you're improving: Central on a Saturday. If you want a serious workout: any of the late-night Sunday rooms.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Rules for a Great Night Out</h2>
            <p className="text-muted-foreground mb-4">Eat first. Pace your drinks. Bring a spare shirt. Say yes to dances with people slightly above your level. Leave when you're still having fun, not when you're finished.</p>

            <BlogCTA variant="classes" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">What's the friendliest social for beginners?</h3><p className="text-muted-foreground text-sm">Pura Nights' Tuesday and Monday classes-and-social combos in Ealing and Chiswick. Class first, social after, no pressure.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Do I need to book?</h3><p className="text-muted-foreground text-sm">Walk-ins are standard. The monthly Latin Friday is the exception — book ahead because it sells out.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">What's the dress code?</h3><p className="text-muted-foreground text-sm">Smart-casual. Comfortable shoes you can pivot in. Save the heels for nights you've practised in them.</p></div>
            </div>

            <SocialShareButtons title={`The Best Latin Social Dancing in London — 2026 Insider Guide`} path="/blog/best-latin-social-dancing-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/events", label: "Upcoming Events & Latin Friday" }, { to: "/pura-nights", label: "Weekly Schedule" }, { to: "/latin-night-out-west-london", label: "Latin Night Out — West London" }]} />
  </Layout>
);

export default BestLatinSocialDancingLondon;
