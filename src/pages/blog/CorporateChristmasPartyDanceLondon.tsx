import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/corporate-christmas-party-dance-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const CorporateChristmasPartyDanceLondon = () => (
  <Layout>
    <SeoHead
      title={`Corporate Christmas Party Idea — A Latin Dance Workshop in London | Pura Nights`}
      description={`Skip the awkward corporate Christmas dinner. Book a 60–90 minute Latin dance workshop for your London team — high energy, all abilities, unforgettable.`}
      path="/blog/corporate-christmas-party-dance-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Corporate Christmas Party Idea — A Latin Dance Workshop in London`,
          description: `Skip the awkward corporate Christmas dinner. Book a 60–90 minute Latin dance workshop for your London team — high energy, all abilities, unforgettable.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/corporate-christmas-party-dance-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "Can you come to our office or venue?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we run sessions at offices, hired event spaces, restaurants with cleared floor space, and our own West London studio."}}, {"@type": "Question", "name": "How many people can attend?", "acceptedAnswer": {"@type": "Answer", "text": "Up to 60 with one instructor; larger groups with additional instructors. No upper limit in practice."}}, {"@type": "Question", "name": "Is it suitable for people who don't drink or don't dance?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — it's designed to be inclusive. Most people with no dance background end the session as the loudest fans of it."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `Corporate Christmas Party Idea — A Latin Dance Workshop in London`, item: "https://www.puranights.com/blog/corporate-christmas-party-dance-london" },
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
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Corporate Christmas Party Idea — A Latin Dance Workshop in London</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>7 min read</span>
            </div>
            <SocialShareButtons title={`Corporate Christmas Party Idea — A Latin Dance Workshop in London`} path="/blog/corporate-christmas-party-dance-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">The 'corporate Christmas dinner' has run its course. Half your team isn't drinking, a quarter doesn't know each other, and the most-quoted moment of the night is usually a complaint about the food. A 60–90 minute Latin dance workshop — slotted in before the meal or as the standalone event — is the format that finally gets people talking, laughing, and remembering it in January.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Dance Beats Karaoke and Bowling</h2>
            <p className="text-muted-foreground mb-4">Dance forces partner-rotation, which means everyone interacts with everyone. Karaoke divides the room into performers and watchers; dance has no spectators. By minute 15 the senior partner is dancing with the new joiner — a status reset no other format delivers as cleanly.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Two Christmas Workshop Formats</h2>
            <p className="text-muted-foreground mb-4"><strong>60-minute high-energy session:</strong> salsa basics, partner work, group photo. Perfect as the pre-dinner ice-breaker. <strong>90-minute showcase format:</strong> salsa + bachata, mini routine, end-of-session performance you can film for the company channel.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Group Sizes & Logistics</h2>
            <p className="text-muted-foreground mb-4">Up to 60 in one room with a single instructor; larger groups bring in additional instructors so nobody sits out. We bring music and equipment; you provide the venue (or we recommend one).</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Inclusive by Design</h2>
            <p className="text-muted-foreground mb-4">No partner needed, no fitness threshold, no dance experience required. We brief the room so anyone with mobility limits or a religious dress preference is comfortable. Everyone leaves having actually participated.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Booking Window for December</h2>
            <p className="text-muted-foreground mb-4">December books up by mid-October. Enquire by August for prime Friday slots; September for weekday evenings; October at the latest for any December date.</p>

            <BlogCTA variant="classes" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Can you come to our office or venue?</h3><p className="text-muted-foreground text-sm">Yes — we run sessions at offices, hired event spaces, restaurants with cleared floor space, and our own West London studio.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">How many people can attend?</h3><p className="text-muted-foreground text-sm">Up to 60 with one instructor; larger groups with additional instructors. No upper limit in practice.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Is it suitable for people who don't drink or don't dance?</h3><p className="text-muted-foreground text-sm">Yes — it's designed to be inclusive. Most people with no dance background end the session as the loudest fans of it.</p></div>
            </div>

            <SocialShareButtons title={`Corporate Christmas Party Idea — A Latin Dance Workshop in London`} path="/blog/corporate-christmas-party-dance-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/corporate-dance-classes-london", label: "Corporate Dance Classes — London" }, { to: "/contact", label: "Enquire — Christmas Booking" }, { to: "/blog/corporate-team-building-dance-london", label: "Corporate Team Building Dance" }]} />
  </Layout>
);

export default CorporateChristmasPartyDanceLondon;
