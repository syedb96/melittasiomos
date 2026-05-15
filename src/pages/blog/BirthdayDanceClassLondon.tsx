import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/birthday-dance-class-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const BirthdayDanceClassLondon = () => (
  <Layout>
    <SeoHead
      title={`Birthday Dance Class Idea in London — Salsa, Bachata & Bubbles | Pura Nights`}
      description={`Book a private salsa or bachata class for your London birthday. Group sizes 6–25, all abilities, choose your own music — and yes, you can bring drinks.`}
      path="/blog/birthday-dance-class-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Birthday Dance Class Idea in London — Salsa, Bachata & Bubbles`,
          description: `Book a private salsa or bachata class for your London birthday. Group sizes 6–25, all abilities, choose your own music — and yes, you can bring drinks.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/birthday-dance-class-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "Can we bring drinks?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — soft drinks always welcome. Alcohol is fine in moderation; the routine is easier sober."}}, {"@type": "Question", "name": "What if some people have danced before?", "acceptedAnswer": {"@type": "Answer", "text": "Routines flex — Melitta builds in styling layers so confident dancers stay engaged while beginners stick to the basics."}}, {"@type": "Question", "name": "Can we choose the music?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — send 2–3 favourite tracks and Melitta will build the playlist around them."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `Birthday Dance Class Idea in London — Salsa, Bachata & Bubbles`, item: "https://www.puranights.com/blog/birthday-dance-class-london" },
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
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Birthday Dance Class Idea in London — Salsa, Bachata & Bubbles</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>6 min read</span>
            </div>
            <SocialShareButtons title={`Birthday Dance Class Idea in London — Salsa, Bachata & Bubbles`} path="/blog/birthday-dance-class-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">If your birthday plan keeps defaulting to a restaurant, this year is the year to break the pattern. A private salsa or bachata class for your closest 8–20 people is the birthday everyone remembers — laughter, music, photos and videos that don't look like every other birthday on Instagram.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What's Included</h2>
            <p className="text-muted-foreground mb-4">A private 60- or 90-minute Latin dance session with Melitta, full Bluetooth speaker setup, custom playlist (your favourite tracks welcome), a fun beginner-friendly routine taught step by step, and a mini end-of-session performance you can film. Bubbles and snacks welcome — the studio has a bar-friendly setup.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Group Sizes That Work</h2>
            <p className="text-muted-foreground mb-4">Best between 6 and 20. Smaller works for tighter friend groups. For 25+ we add a second instructor so nobody waits.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Pick Your Style</h2>
            <p className="text-muted-foreground mb-4">Salsa for energy and laughter. Bachata for sensual smoothness and easier first-time access. A mix-and-match (30 minutes of each) is the most popular birthday format.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The After-Party Move</h2>
            <p className="text-muted-foreground mb-4">Both our West London venues are walking distance from a bar. Many birthday groups roll straight from class into a Drayton Court or George IV booking — half the night already feels like an event.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Book</h2>
            <p className="text-muted-foreground mb-4">Enquire with your date, group size, preferred style, and 2–3 favourite songs. We'll send a quote, hold the date, and confirm. Best to book 2–4 weeks ahead.</p>

            <BlogCTA variant="classes" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Can we bring drinks?</h3><p className="text-muted-foreground text-sm">Yes — soft drinks always welcome. Alcohol is fine in moderation; the routine is easier sober.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">What if some people have danced before?</h3><p className="text-muted-foreground text-sm">Routines flex — Melitta builds in styling layers so confident dancers stay engaged while beginners stick to the basics.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Can we choose the music?</h3><p className="text-muted-foreground text-sm">Yes — send 2–3 favourite tracks and Melitta will build the playlist around them.</p></div>
            </div>

            <SocialShareButtons title={`Birthday Dance Class Idea in London — Salsa, Bachata & Bubbles`} path="/blog/birthday-dance-class-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/private-group-dance-parties-london", label: "Private Group Dance Parties" }, { to: "/contact", label: "Enquire — Birthday Booking" }, { to: "/blog/hen-party-dance-ideas-london", label: "Hen Party Dance Ideas" }]} />
  </Layout>
);

export default BirthdayDanceClassLondon;
