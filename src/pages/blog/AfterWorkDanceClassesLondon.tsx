import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/after-work-dance-classes-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const AfterWorkDanceClassesLondon = () => (
  <Layout>
    <SeoHead
      title={`After-Work Dance Classes in London — Switch Off, Switch On | Pura Nights`}
      description={`After-work salsa and bachata classes in West London. Better than the gym, cheaper than therapy, and you'll actually look forward to Mondays.`}
      path="/blog/after-work-dance-classes-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `After-Work Dance Classes in London — Switch Off, Switch On`,
          description: `After-work salsa and bachata classes in West London. Better than the gym, cheaper than therapy, and you'll actually look forward to Mondays.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/after-work-dance-classes-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "What if I'm too tired after work?", "acceptedAnswer": {"@type": "Answer", "text": "Almost everyone is. The first 15 minutes feel hard, then the music takes over. Most people are sharper at 9pm than they were at 5pm."}}, {"@type": "Question", "name": "Do I need to change clothes?", "acceptedAnswer": {"@type": "Answer", "text": "Comfortable trousers and a clean t-shirt are fine. Bring a spare top if you sweat."}}, {"@type": "Question", "name": "How late does class run?", "acceptedAnswer": {"@type": "Answer", "text": "Class runs 7:30–9pm, social until 10pm. Plenty of time to be home for a sensible bedtime."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `After-Work Dance Classes in London — Switch Off, Switch On`, item: "https://www.puranights.com/blog/after-work-dance-classes-london" },
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
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">After-Work Dance Classes in London — Switch Off, Switch On</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>7 min read</span>
            </div>
            <SocialShareButtons title={`After-Work Dance Classes in London — Switch Off, Switch On`} path="/blog/after-work-dance-classes-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">Most people leave the office, scroll on the tube, eat dinner standing up, and watch one episode of something they won't remember. After-work dance class is the most underrated cure for that loop in London. Two hours of music, movement, and other humans — and you sleep better than you have in months.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why After-Work Beats Morning Workouts</h2>
            <p className="text-muted-foreground mb-4">Cortisol is highest in the evening. Dance lowers it fast. You arrive tired and leave energised — the opposite of a gym session, which often deepens the slump.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Where to Go Straight from the Office</h2>
            <p className="text-muted-foreground mb-4">Pura Nights runs Mondays at The George IV (Chiswick) and Tuesdays at The Drayton Court (Ealing). Both venues have a bar and food, both are 5–10 minutes from a station, and class starts at 7:30pm — exactly the right window after a 6pm wrap.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How It Resets Your Brain</h2>
            <p className="text-muted-foreground mb-4">Salsa and bachata require split-attention focus — body, music, partner — which silences the work-thought loop almost immediately. Most students describe the first 15 minutes as 'like a hard reset'.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Social Bonus Most People Miss</h2>
            <p className="text-muted-foreground mb-4">After class, most students stay for one drink at the venue bar. By week four you have a midweek social life that requires zero planning. Compare that to organising drinks with old friends.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Make It a Habit That Sticks</h2>
            <p className="text-muted-foreground mb-4">Pack your kit in the morning. Block the calendar like a meeting. Buy the 8-class bundle so the cost-per-class drops below £10 — the small commitment that quietly removes the 'should I go?' decision.</p>

            <BlogCTA variant="classes" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">What if I'm too tired after work?</h3><p className="text-muted-foreground text-sm">Almost everyone is. The first 15 minutes feel hard, then the music takes over. Most people are sharper at 9pm than they were at 5pm.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Do I need to change clothes?</h3><p className="text-muted-foreground text-sm">Comfortable trousers and a clean t-shirt are fine. Bring a spare top if you sweat.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">How late does class run?</h3><p className="text-muted-foreground text-sm">Class runs 7:30–9pm, social until 10pm. Plenty of time to be home for a sensible bedtime.</p></div>
            </div>

            <SocialShareButtons title={`After-Work Dance Classes in London — Switch Off, Switch On`} path="/blog/after-work-dance-classes-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/pura-nights", label: "Weekly Class Schedule" }, { to: "/prices", label: "Class Bundles & Pricing" }, { to: "/locations", label: "Venue Locations" }]} />
  </Layout>
);

export default AfterWorkDanceClassesLondon;
