import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/anniversary-dance-lesson-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const AnniversaryDanceLessonLondon = () => (
  <Layout>
    <SeoHead
      title={`The Anniversary Surprise — A Private Dance Lesson in London | Pura Nights`}
      description={`Planning an anniversary surprise in London? A private dance lesson — choreographed to your song — is the gift your partner will talk about for years.`}
      path="/blog/anniversary-dance-lesson-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `The Anniversary Surprise — A Private Dance Lesson in London`,
          description: `Planning an anniversary surprise in London? A private dance lesson — choreographed to your song — is the gift your partner will talk about for years.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/anniversary-dance-lesson-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "Can the lesson be a complete surprise?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — many of our anniversary bookings are surprises. We coordinate with the booking partner discreetly."}}, {"@type": "Question", "name": "How many lessons do we need?", "acceptedAnswer": {"@type": "Answer", "text": "One 60-minute lesson is enough for a clean 60-second routine. Two lessons gets you a polished 90-second piece."}}, {"@type": "Question", "name": "Where do the lessons happen?", "acceptedAnswer": {"@type": "Answer", "text": "At our West London studio. Date-specific availability — enquire as early as you can."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `The Anniversary Surprise — A Private Dance Lesson in London`, item: "https://www.puranights.com/blog/anniversary-dance-lesson-london" },
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
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">The Anniversary Surprise — A Private Dance Lesson in London</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>6 min read</span>
            </div>
            <SocialShareButtons title={`The Anniversary Surprise — A Private Dance Lesson in London`} path="/blog/anniversary-dance-lesson-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">After a few anniversaries, the gift list gets thin. Flowers, dinner, jewellery, repeat. A private dance lesson choreographed to *your* song is the rare anniversary gift that creates a memory rather than an object — and the rare gift your partner will tell their friends about for months.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why a Lesson Beats a Gift</h2>
            <p className="text-muted-foreground mb-4">Experiences outperform objects in long-term memory and reported happiness — the research is overwhelming. A 60-minute private lesson with a polished mini-routine to your song is the kind of anniversary that shows up in toast speeches a decade later.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How It Works</h2>
            <p className="text-muted-foreground mb-4">You enquire with your anniversary date and your song. Melitta builds a short routine — 60–90 seconds — designed for your level. One or two private lessons (depending on how much polish you want) and you have a moment ready to perform at home, at a restaurant, or just to remember.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Pick the Right Song</h2>
            <p className="text-muted-foreground mb-4">Tempo matters more than meaning. A 90 BPM bachata or 130 BPM salsa choreographs cleanly. Pick the song you danced to at your wedding, your first holiday, or your first proper night out together.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">If You Want to Surprise Your Partner</h2>
            <p className="text-muted-foreground mb-4">Tell us discreetly. Melitta has run dozens of surprise sessions where one partner books a 'random' lesson and the other arrives expecting beginner choreography to standard music — only to hear *their* song play.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Booking Window</h2>
            <p className="text-muted-foreground mb-4">Allow at least two weeks before the anniversary date for one polished lesson; four weeks for two. Last-minute bookings are sometimes possible — enquire and we'll do our best.</p>

            <BlogCTA variant="private" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Can the lesson be a complete surprise?</h3><p className="text-muted-foreground text-sm">Yes — many of our anniversary bookings are surprises. We coordinate with the booking partner discreetly.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">How many lessons do we need?</h3><p className="text-muted-foreground text-sm">One 60-minute lesson is enough for a clean 60-second routine. Two lessons gets you a polished 90-second piece.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Where do the lessons happen?</h3><p className="text-muted-foreground text-sm">At our West London studio. Date-specific availability — enquire as early as you can.</p></div>
            </div>

            <SocialShareButtons title={`The Anniversary Surprise — A Private Dance Lesson in London`} path="/blog/anniversary-dance-lesson-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/private-lessons", label: "Private Lessons" }, { to: "/contact", label: "Enquire About an Anniversary Lesson" }, { to: "/gift-vouchers", label: "Gift Voucher Option" }]} />
  </Layout>
);

export default AnniversaryDanceLessonLondon;
