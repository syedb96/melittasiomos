import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

const CorporateTeamBuildingDance = () => (
  <Layout>
    <SeoHead title="Corporate Team Building with Latin Dance London | Pura Nights" description="Book a Latin dance team building session in London. Salsa and Bachata workshops for corporate groups — build communication, trust, and energy. All abilities." path="/blog/corporate-team-building-dance-london" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Corporate Team Building with Latin Dance in London — Why It Works", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-03-10" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Events</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Events</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Corporate Team Building with Latin Dance in London — Why It Works</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Mar 2026</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Corporate Team Building Dance" path="/blog/corporate-team-building-dance-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Dance as Team Building</h2>
            <p className="text-muted-foreground mb-4">Traditional team building activities — trust falls, escape rooms, paintball — have their place, but Latin dance offers something unique. It requires real-time communication between partners, builds trust through physical collaboration, and creates a shared experience that breaks down professional barriers. When the CEO and the intern are both laughing at their own two left feet, hierarchies dissolve and genuine connection happens.</p>
            <p className="text-muted-foreground mb-4">Research consistently shows that shared physical activities create stronger team bonds than passive events. Dance adds music, laughter, and a sense of achievement that stays with participants long after the session ends. Many of our corporate clients book annual sessions because the impact on team morale is immediate and lasting.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What a Pura Nights Corporate Session Looks Like</h2>
            <p className="text-muted-foreground mb-4">A typical corporate session runs 60-90 minutes and is designed for complete beginners. Melitta starts with a high-energy warm-up that gets everyone moving and laughing within the first five minutes. Then comes a structured but fun Salsa or Bachata class, broken down step by step with partner rotation. The session finishes with a group dance and plenty of opportunities for photos and videos. Sessions can be held at a studio in West London, at your office (if space allows), or at a hired venue.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Benefits: Communication, Trust, Energy</h2>
            <p className="text-muted-foreground mb-4">Partner dancing requires non-verbal communication, active listening, and mutual respect — skills that transfer directly to the workplace. The physical element releases endorphins, reduces stress, and creates positive associations with colleagues. The shared vulnerability of trying something new builds psychological safety. And the laughter — there's always so much laughter — creates memories that strengthen relationships far more than any PowerPoint workshop ever could.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Who It's For</h2>
            <p className="text-muted-foreground mb-4">Corporate dance sessions work for teams of 8-50 people. They're popular for end-of-quarter celebrations, summer parties, Christmas events, and dedicated team building days. We've hosted sessions for startups, law firms, tech companies, NHS teams, and university departments. The activity is accessible to all fitness levels and abilities — modifications are made on the spot for anyone with mobility considerations.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Booking a Corporate Session</h2>
            <p className="text-muted-foreground mb-4"><Link to="/contact" className="text-primary hover:underline">Contact Melitta</Link> with your preferred date, group size, and any specific requirements. Pricing depends on group size, session length, and venue. Corporate invoicing is available. Sessions can be combined with food, drinks, or other activities for a full team building experience.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Book a Corporate Dance Session</h3>
              <p className="text-muted-foreground text-sm mb-4">Get your team dancing, laughing, and connecting.</p>
              <Link to="/contact" className="btn-cta-primary text-sm">📧 Request a Quote</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "What if some team members really don't want to dance?", a: "In our experience, once the music starts and everyone sees their colleagues having fun, even the most reluctant participants join in. No one is forced — but no one sits out for long!" },
                { q: "Can you come to our office?", a: "Yes, as long as there's enough space for everyone to move safely. We need approximately 2 square metres per person." },
                { q: "How far in advance should we book?", a: "Ideally 2-4 weeks. For December events, book early as the Christmas period fills up fast." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Corporate Team Building Dance" path="/blog/corporate-team-building-dance-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/contact", label: "Contact Melitta" },
      { to: "/blog/hen-party-dance-ideas-london", label: "Hen Party Dance Ideas" },
      { to: "/private-lessons", label: "Private Group Sessions" },
    ]} />
  </Layout>
);

export default CorporateTeamBuildingDance;
