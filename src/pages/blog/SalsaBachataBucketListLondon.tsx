import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/salsa-bachata-bucket-list-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const SalsaBachataBucketListLondon = () => (
  <Layout>
    <SeoHead
      title={`12 Salsa & Bachata Bucket-List Experiences in London | Pura Nights`}
      description={`From Latin Friday at the Drayton Court to Trafalgar Square salsa — the 12 must-do salsa and bachata experiences for any dancer in London.`}
      path="/blog/salsa-bachata-bucket-list-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `12 Salsa & Bachata Bucket-List Experiences in London`,
          description: `From Latin Friday at the Drayton Court to Trafalgar Square salsa — the 12 must-do salsa and bachata experiences for any dancer in London.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/salsa-bachata-bucket-list-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "Where's the best monthly social in London?", "acceptedAnswer": {"@type": "Answer", "text": "We're biased: the monthly Latin Friday at the Drayton Court Hotel, Ealing. 200+ dancers, workshops, performance, full bar."}}, {"@type": "Question", "name": "Are these realistic for beginners?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — at least 8 of the 12 are explicitly beginner-friendly. The harder ones (private lesson, solo social, advanced workshops) are stretch goals worth aiming for."}}, {"@type": "Question", "name": "How long would it take to do all 12?", "acceptedAnswer": {"@type": "Answer", "text": "A committed dancer can finish the list in a year. Most take two."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `12 Salsa & Bachata Bucket-List Experiences in London`, item: "https://www.puranights.com/blog/salsa-bachata-bucket-list-london" },
          ],
        },
      ]}
    />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Culture</span>
          </nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Culture</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">12 Salsa & Bachata Bucket-List Experiences in London</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>9 min read</span>
            </div>
            <SocialShareButtons title={`12 Salsa & Bachata Bucket-List Experiences in London`} path="/blog/salsa-bachata-bucket-list-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">London is one of the great Latin dance cities — denser than Paris, friendlier than New York, and more international than Madrid. If you've started dancing here, there are 12 experiences worth crossing off before you call yourself a real London dancer. Some are obvious; some are insider; all are open to beginners with a little courage.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">1. A Latin Friday at the Drayton Court</h2>
            <p className="text-muted-foreground mb-4">The monthly headline — workshops, performance, social. Dressed-up, all-levels, 200+ people. Buy a ticket the moment they release.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">2. Tuesday at the Drayton, Monday at the George IV</h2>
            <p className="text-muted-foreground mb-4">The two anchor weekly classes. Show up to one (or both) for a month and you'll know half the West London scene by name.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">3. A Private Lesson with Melitta</h2>
            <p className="text-muted-foreground mb-4">Even one. The compression of progress is what surprises everyone. Worth it for the technique reset alone.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">4. Trafalgar Square Salsa in Summer</h2>
            <p className="text-muted-foreground mb-4">Free outdoor salsa nights in the summer turn central London into a dance floor. Bring water. Stay for the sunset.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">5. A Bachata Sensual Workshop with a Visiting Maestro</h2>
            <p className="text-muted-foreground mb-4">Once or twice a year, a top-tier teacher passes through London. Pay attention to the WhatsApp groups; book the moment you see one.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">6. A Latin Dance Holiday from the UK</h2>
            <p className="text-muted-foreground mb-4">Croatia, Tenerife, Portugal — UK dancers travel together. Pick one. Three days of dancing in 30°C will rewire your year.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">7. A Wedding First Dance to a Bachata</h2>
            <p className="text-muted-foreground mb-4">If you're getting married — choose bachata over a waltz. Smoother to learn, more emotional, and your guests will lose their minds.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">8. A Pura Ladies Performance Live</h2>
            <p className="text-muted-foreground mb-4">Watching a 12-strong Pura Ladies team perform live is the moment most students realise how far this can go.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">9. Dancing in the Rain at an Outdoor Festival</h2>
            <p className="text-muted-foreground mb-4">Rain happens. Keep dancing. The story you tell forever.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">10. A Class Where You're the Worst Dancer in the Room</h2>
            <p className="text-muted-foreground mb-4">Find one. The day you stop being the best in your usual class is the day you start improving fast.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">11. A Solo Trip to a London Social Where You Know No One</h2>
            <p className="text-muted-foreground mb-4">Walk in alone. Dance three songs. Walk out. The confidence dividend is enormous.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">12. Teaching a Friend a Single Move</h2>
            <p className="text-muted-foreground mb-4">The day you can teach is the day you've actually learned. Pick one move, teach a friend in your kitchen, watch their face light up.</p>

            <BlogCTA variant="classes" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Where's the best monthly social in London?</h3><p className="text-muted-foreground text-sm">We're biased: the monthly Latin Friday at the Drayton Court Hotel, Ealing. 200+ dancers, workshops, performance, full bar.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Are these realistic for beginners?</h3><p className="text-muted-foreground text-sm">Yes — at least 8 of the 12 are explicitly beginner-friendly. The harder ones (private lesson, solo social, advanced workshops) are stretch goals worth aiming for.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">How long would it take to do all 12?</h3><p className="text-muted-foreground text-sm">A committed dancer can finish the list in a year. Most take two.</p></div>
            </div>

            <SocialShareButtons title={`12 Salsa & Bachata Bucket-List Experiences in London`} path="/blog/salsa-bachata-bucket-list-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/events", label: "Upcoming Events" }, { to: "/pura-nights", label: "Weekly Classes" }, { to: "/pura-ladies", label: "Pura Ladies Performance Team" }, { to: "/blog/best-latin-dance-festivals-europe-2026", label: "Europe Festivals 2026" }]} />
  </Layout>
);

export default SalsaBachataBucketListLondon;
