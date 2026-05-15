import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/date-night-dance-class-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const DateNightDanceClassLondon = () => (
  <Layout>
    <SeoHead
      title={`Date Night Dance Class in London — Better Than Dinner & Drinks | Pura Nights`}
      description={`Looking for a different date night idea in London? A salsa or bachata class beats dinner-and-drinks every time — here's why, and where to book.`}
      path="/blog/date-night-dance-class-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Date Night Dance Class in London — Better Than Dinner & Drinks`,
          description: `Looking for a different date night idea in London? A salsa or bachata class beats dinner-and-drinks every time — here's why, and where to book.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/date-night-dance-class-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "Can we book a private dance lesson as a couple?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Melitta runs 60- or 90-minute private lessons for couples, choreographed to your favourite song if you'd like. Enquire via the contact page for availability."}}, {"@type": "Question", "name": "Is a group class awkward as a date?", "acceptedAnswer": {"@type": "Answer", "text": "Less than you think. Partners rotate, so you'll dance with each other and others — which is actually a relief because it removes the pressure of being watched."}}, {"@type": "Question", "name": "Where can we go for drinks after?", "acceptedAnswer": {"@type": "Answer", "text": "Both our venues — The George IV (Chiswick) and The Drayton Court (Ealing) — have full bars and food."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `Date Night Dance Class in London — Better Than Dinner & Drinks`, item: "https://www.puranights.com/blog/date-night-dance-class-london" },
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
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Date Night Dance Class in London — Better Than Dinner & Drinks</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>6 min read</span>
            </div>
            <SocialShareButtons title={`Date Night Dance Class in London — Better Than Dinner & Drinks`} path="/blog/date-night-dance-class-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">Dinner-and-drinks date night has a ceiling. You sit, talk, eat, drink, and leave — and you've learned almost nothing new about each other. A dance class date breaks the script. You're laughing, touching, problem-solving, and sweating a little, all in 90 minutes. By the end you know things about your date that three dinners wouldn't have surfaced.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Dance Class Is the Best Second-Date Idea</h2>
            <p className="text-muted-foreground mb-4">Shared novelty is the rocket fuel of new attraction. Doing something neither of you is good at — together — bonds you faster than any restaurant ever will. And there's a built-in reason to touch.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Group Class or Private Lesson?</h2>
            <p className="text-muted-foreground mb-4">A drop-in group class is perfect for low-pressure first attempts (£10 each, no booking needed). A private lesson is better for couples who want privacy or who already know the date is going somewhere — book a 60-minute session with Melitta and you'll leave with a 90-second routine that doubles as an inside joke for years.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What to Wear (And What Not To)</h2>
            <p className="text-muted-foreground mb-4">Avoid stiff jeans. Avoid heels you can't pivot in. Smart-casual that lets you move. A dab of perfume, mints in the pocket, and a back-up t-shirt for the post-class drink.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The After-Class Move</h2>
            <p className="text-muted-foreground mb-4">Walk to a venue bar (both our locations have one) and debrief over a drink. Asking 'what was your favourite move?' is a date-question gold mine.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">If It's a Long-Term Relationship</h2>
            <p className="text-muted-foreground mb-4">Couples who've been together for years often say a dance class felt like the most novel thing they'd done together in a decade. Boredom is a relationship-killer; novelty is a vaccine.</p>

            <BlogCTA variant="private" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Can we book a private dance lesson as a couple?</h3><p className="text-muted-foreground text-sm">Yes — Melitta runs 60- or 90-minute private lessons for couples, choreographed to your favourite song if you'd like. Enquire via the contact page for availability.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Is a group class awkward as a date?</h3><p className="text-muted-foreground text-sm">Less than you think. Partners rotate, so you'll dance with each other and others — which is actually a relief because it removes the pressure of being watched.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Where can we go for drinks after?</h3><p className="text-muted-foreground text-sm">Both our venues — The George IV (Chiswick) and The Drayton Court (Ealing) — have full bars and food.</p></div>
            </div>

            <SocialShareButtons title={`Date Night Dance Class in London — Better Than Dinner & Drinks`} path="/blog/date-night-dance-class-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/private-lessons", label: "Private Lessons for Couples" }, { to: "/contact", label: "Enquire About a Couples Lesson" }, { to: "/pura-nights", label: "Drop-In Class Schedule" }]} />
  </Layout>
);

export default DateNightDanceClassLondon;
