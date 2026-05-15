import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/shy-beginners-salsa-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const ShyBeginnersSalsaLondon = () => (
  <Layout>
    <SeoHead
      title={`Salsa Classes for Shy Beginners in London — Yes, You Can Actually Do This | Pura Nights`}
      description={`Nervous about your first salsa class? A practical guide for shy, introverted beginners in London — what to expect, how to prepare, and why you'll be fine.`}
      path="/blog/shy-beginners-salsa-london"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Salsa Classes for Shy Beginners in London — Yes, You Can Actually Do This`,
          description: `Nervous about your first salsa class? A practical guide for shy, introverted beginners in London — what to expect, how to prepare, and why you'll be fine.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/shy-beginners-salsa-london",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "Do I have to dance with strangers?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, briefly — partners rotate every 90 seconds. It's the lowest-stakes social interaction possible: no small talk required."}}, {"@type": "Question", "name": "What if I freeze up?", "acceptedAnswer": {"@type": "Answer", "text": "Step out, breathe, watch, rejoin. Nobody minds. Most people have done it themselves."}}, {"@type": "Question", "name": "Is there a 'shy' beginner class?", "acceptedAnswer": {"@type": "Answer", "text": "Every beginner class *is* the shy class. Around 70% of first-timers come solo and quiet — by week three they're chatting like old friends."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `Salsa Classes for Shy Beginners in London — Yes, You Can Actually Do This`, item: "https://www.puranights.com/blog/shy-beginners-salsa-london" },
          ],
        },
      ]}
    />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span>
          </nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Salsa Classes for Shy Beginners in London — Yes, You Can Actually Do This</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>8 min read</span>
            </div>
            <SocialShareButtons title={`Salsa Classes for Shy Beginners in London — Yes, You Can Actually Do This`} path="/blog/shy-beginners-salsa-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">If you're shy, the idea of walking into a room full of strangers and dancing with them sounds like a nightmare. We get it — most of our students felt exactly the same before their first class. The good news: a beginner salsa class in London is genuinely the friendliest, lowest-pressure room you'll walk into all year. Here's exactly what to expect and how to prepare so the nerves work *for* you, not against you.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Shy People Actually Thrive in Salsa</h2>
            <p className="text-muted-foreground mb-4">Introverts often progress faster because they listen, observe, and self-correct. In a class of 30 beginners, the loudest person is rarely the best dancer — the quiet observer who locks in eye contact and frame is. Salsa rewards focus, and focus is something shy people already do well.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Happens in Your First 15 Minutes</h2>
            <p className="text-muted-foreground mb-4">You walk in, pay £10 at the door, take your shoes off, and stand in a circle. Melitta calls out the basic step. You copy. Five minutes later you're rotating partners every 90 seconds — which sounds terrifying but is actually the *easiest* social setup in the world: you only have to talk for a sentence before the music starts again.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Prep the Night Before</h2>
            <p className="text-muted-foreground mb-4">Watch one 60-second video of the basic step on YouTube. Wear something you'd wear to brunch — nothing fancy. Eat dinner two hours before. Bring a water bottle. That's the entire prep list.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Three Things You Don't Have to Do</h2>
            <p className="text-muted-foreground mb-4">You don't have to talk a lot. You don't have to be good. You don't have to bring a partner. Most people come alone, and rotating partners means no one is stuck with anyone for long.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">If You Get Overwhelmed Mid-Class</h2>
            <p className="text-muted-foreground mb-4">Step to the side. Drink water. Watch for 60 seconds. Rejoin. Nobody will notice — and even if they do, they'll smile because everyone has been there. Melitta runs the room with kindness as the operating system.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">After Your First Class</h2>
            <p className="text-muted-foreground mb-4">You'll be tired, slightly buzzing, and 80% likely to come back. The brain has done something new and the body has earned a deep sleep. We've watched the most reserved students become the magnetic centre of the social floor within six months.</p>

            <BlogCTA variant="start" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Do I have to dance with strangers?</h3><p className="text-muted-foreground text-sm">Yes, briefly — partners rotate every 90 seconds. It's the lowest-stakes social interaction possible: no small talk required.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">What if I freeze up?</h3><p className="text-muted-foreground text-sm">Step out, breathe, watch, rejoin. Nobody minds. Most people have done it themselves.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Is there a 'shy' beginner class?</h3><p className="text-muted-foreground text-sm">Every beginner class *is* the shy class. Around 70% of first-timers come solo and quiet — by week three they're chatting like old friends.</p></div>
            </div>

            <SocialShareButtons title={`Salsa Classes for Shy Beginners in London — Yes, You Can Actually Do This`} path="/blog/shy-beginners-salsa-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/start-here", label: "Start Here — Beginner's Path" }, { to: "/pura-nights", label: "Weekly Class Schedule" }, { to: "/blog/joining-dance-class-alone", label: "Joining a Class Alone" }]} />
  </Layout>
);

export default ShyBeginnersSalsaLondon;
