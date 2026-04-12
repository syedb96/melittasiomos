import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/latin-dance-events-ealing2026 -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const LatinDanceEventsEaling2026 = () => (
  <Layout>
    <SeoHead title="Latin Dance Events in Ealing 2026 | Pura Nights" description="Discover Latin dance events in Ealing for 2026. Monthly Latin Fridays, weekly classes, and special workshops at the Drayton Court Hotel." path="/blog/latin-dance-events-ealing-2026" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Latin Dance Events in Ealing 2026 — What's On This Year", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-01-10" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Events</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Events</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Latin Dance Events in Ealing 2026 — What's On This Year</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jan 2026</span><span>·</span><span>7 min read</span></div>
            <SocialShareButtons title="Latin Dance Events Ealing 2026" path="/blog/latin-dance-events-ealing-2026" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Latin Dance Scene in Ealing</h2>
            <p className="text-muted-foreground mb-4">Ealing has established itself as one of West London's premier destinations for Latin dance. The Drayton Court Hotel, a stunning Edwardian building on The Avenue in West Ealing, serves as the home base for <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link> Tuesday classes and the monthly Latin Friday events that have become legendary in London's dance community.</p>
            <p className="text-muted-foreground mb-4">With the Elizabeth Line now connecting West Ealing to Central London, Heathrow, and beyond, the venue has never been more accessible. Dancers travel from across the capital to experience the unique energy of Pura Nights Ealing.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Monthly Latin Fridays at Drayton Court</h2>
            <p className="text-muted-foreground mb-4">The highlight of the Ealing Latin dance calendar is the <Link to="/events" className="text-primary hover:underline">Monthly Latin Friday</Link>. Held on the last Friday of each month, these are full-scale social events featuring three workshop levels (Beginner, Improver, and Intermediate), a live Pura Ladies performance, and social dancing until late with a professional DJ spinning the best Salsa, Bachata, and Kizomba tracks.</p>
            <p className="text-muted-foreground mb-4">Latin Fridays are special because they bring together the Monday and Tuesday communities along with visiting dancers from other schools. The atmosphere is electric — think fairy lights, Latin rhythms, and a dance floor full of energy. Tickets are available online and typically sell well in advance.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Happens at a Latin Friday</h2>
            <p className="text-muted-foreground mb-4">The evening begins at 7:30 PM with three concurrent workshops. If you're a beginner, you'll learn a fun, social-ready combination that you can use on the dance floor that same night. Improver and Intermediate workshops dive deeper into technique, styling, and musicality. At around 9:00 PM, the Pura Ladies take the floor for a performance that never fails to inspire. Then the social opens up and runs until midnight or later.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">2026 Event Calendar</h2>
            <p className="text-muted-foreground mb-4">Latin Fridays run monthly throughout 2026. Special events include the Anniversary Night in March, the Summer Social in July (featuring an outdoor terrace area), and the Christmas Latin Party in December. Follow <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@puranights.salsabachata</a> on Instagram for exact dates and ticket links.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Getting to Drayton Court</h2>
            <p className="text-muted-foreground mb-4">The Drayton Court Hotel is at 2 The Avenue, West Ealing, London W13 8PH. The nearest station is West Ealing (Elizabeth Line and GWR), just a 3-minute walk. Ealing Broadway (Central and District Lines) is a 12-minute walk or a short bus ride. There's ample on-street parking in the surrounding residential streets.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Don't Miss the Next Latin Friday</h3>
              <p className="text-muted-foreground text-sm mb-4">Check dates and book tickets for the next Monthly Latin Friday.</p>
              <Link to="/events" className="btn-cta-primary text-sm">View Events →</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "How often are Latin Fridays?", a: "Once a month, typically the last Friday. Follow @puranights.salsabachata for dates." },
                { q: "Do I need to be experienced to attend?", a: "Not at all — there's a dedicated beginner workshop at every Latin Friday." },
                { q: "How much are tickets?", a: "Tickets are available online. Check our events page for current pricing." },
                { q: "Is there parking at Drayton Court?", a: "Yes, ample on-street parking on The Avenue and surrounding streets." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Latin Dance Events Ealing 2026" path="/blog/latin-dance-events-ealing-2026" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/events", label: "All Events" },
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/blog/best-salsa-nights-west-london", label: "Best Salsa Nights West London" },
    ]} />
  </Layout>
);

export default LatinDanceEventsEaling2026;
