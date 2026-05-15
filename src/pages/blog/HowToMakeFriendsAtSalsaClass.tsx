import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/how-to-make-friends-at-salsa-class -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const HowToMakeFriendsAtSalsaClass = () => (
  <Layout>
    <SeoHead
      title={`How to Make Friends at a Salsa Class in London — A Real Playbook | Pura Nights`}
      description={`Most people come to salsa class for the dancing and stay for the friendships. Here's exactly how to turn rotating partners into a London social circle.`}
      path="/blog/how-to-make-friends-at-salsa-class"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `How to Make Friends at a Salsa Class in London — A Real Playbook`,
          description: `Most people come to salsa class for the dancing and stay for the friendships. Here's exactly how to turn rotating partners into a London social circle.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/how-to-make-friends-at-salsa-class",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "How long until I have actual friends?", "acceptedAnswer": {"@type": "Answer", "text": "Three to six weeks of consistent attendance, plus one social. Most students have a regular WhatsApp group within two months."}}, {"@type": "Question", "name": "What if I'm not good at small talk?", "acceptedAnswer": {"@type": "Answer", "text": "You don't need to be — the dancing carries the conversation. 'Where are you from?' and 'How long have you been dancing?' are enough."}}, {"@type": "Question", "name": "Is it weird to come alone?", "acceptedAnswer": {"@type": "Answer", "text": "It's the standard. Around 70% of beginners arrive solo. By week three you're never alone again."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `How to Make Friends at a Salsa Class in London — A Real Playbook`, item: "https://www.puranights.com/blog/how-to-make-friends-at-salsa-class" },
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
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">How to Make Friends at a Salsa Class in London — A Real Playbook</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>7 min read</span>
            </div>
            <SocialShareButtons title={`How to Make Friends at a Salsa Class in London — A Real Playbook`} path="/blog/how-to-make-friends-at-salsa-class" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">Adult friendships are notoriously hard to start in London. Most adults make zero new close friends after 30. A weekly salsa class is one of the few remaining environments where you see the same people, in the same room, doing the same thing, for months on end — the exact recipe modern psychology says builds friendship. Here's how to turn that into a real social life.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Salsa Class Is Built for Friendship</h2>
            <p className="text-muted-foreground mb-4">Recurrence + low stakes + shared difficulty = friendship. You see the same 30 faces every week, you all suck a little at the same thing, and you're physically close enough to learn names. Compare that to a gym, where everyone wears headphones.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Week One: Learn Three Names</h2>
            <p className="text-muted-foreground mb-4">On your first night, set yourself one micro-goal: leave with three names. Ask while rotating, repeat the name, say goodbye by name. Three is enough.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Week Two: Stay for the Social After</h2>
            <p className="text-muted-foreground mb-4">Most studios run a 30-minute social after class. Stay for one drink. Sit at the table where people are laughing loudest. Ask one open question: 'How long have you been dancing?'</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Week Three: Show Up to the Latin Friday</h2>
            <p className="text-muted-foreground mb-4">Pura Nights' monthly Latin Friday is the friendship accelerator. You'll see your class people in 'going-out' mode — relaxed, dressed up, off-duty. This is where the WhatsApp groups form.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Be the Person People Remember</h2>
            <p className="text-muted-foreground mb-4">Ask follow-up questions. Remember one detail per person — their job, their neighbourhood, their dog. Mention it next week. This is unfair-advantage social skill.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Don't Try to Befriend Everyone</h2>
            <p className="text-muted-foreground mb-4">Aim for two real friends, not thirty acquaintances. Pick the people whose energy you actually like and invest properly. Quality compounds.</p>

            <BlogCTA variant="classes" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">How long until I have actual friends?</h3><p className="text-muted-foreground text-sm">Three to six weeks of consistent attendance, plus one social. Most students have a regular WhatsApp group within two months.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">What if I'm not good at small talk?</h3><p className="text-muted-foreground text-sm">You don't need to be — the dancing carries the conversation. 'Where are you from?' and 'How long have you been dancing?' are enough.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Is it weird to come alone?</h3><p className="text-muted-foreground text-sm">It's the standard. Around 70% of beginners arrive solo. By week three you're never alone again.</p></div>
            </div>

            <SocialShareButtons title={`How to Make Friends at a Salsa Class in London — A Real Playbook`} path="/blog/how-to-make-friends-at-salsa-class" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/pura-nights", label: "Find Your Weekly Class" }, { to: "/events", label: "Monthly Latin Friday" }, { to: "/blog/joining-dance-class-alone", label: "Joining a Class Alone" }]} />
  </Layout>
);

export default HowToMakeFriendsAtSalsaClass;
