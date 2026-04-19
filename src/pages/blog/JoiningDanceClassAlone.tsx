import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/joining-dance-class-alone -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const JoiningDanceClassAlone = () => (
  <Layout>
    <SeoHead title="Joining a Dance Class Alone? Why It's the Best Decision | Pura Nights" description="Nervous about going to a dance class alone? Here's why solo students improve faster, make friends quicker, and have more fun. No partner needed at Pura Nights." path="/blog/joining-dance-class-alone" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Joining a Dance Class Alone? Here's Why It's the Best Decision You'll Make", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-02-05" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Joining a Dance Class Alone? Here's Why It's the Best Decision You'll Make</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Feb 2026</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Joining Dance Class Alone" path="/blog/joining-dance-class-alone" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Fear of Going Solo</h2>
            <p className="text-muted-foreground mb-4">It's the number one reason people delay starting dance classes: "I don't have anyone to go with." The irony is that this fear keeps you from the exact solution to the problem. Dance classes are inherently social — they're designed to bring strangers together. At <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link>, the majority of new students arrive alone. By the end of their first evening, they've danced with 10+ people and exchanged smiles with even more.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Actually Happens When You Arrive</h2>
            <p className="text-muted-foreground mb-4">You walk in, pay or show your booking, and find a spot. The instructor welcomes everyone, explains the format, and starts the warm-up. Within the first 5 minutes, you'll be paired with a partner and given simple instructions. Partners rotate every few minutes, so you'll dance with multiple people. Everyone is in the same boat — focused on learning, not judging. The atmosphere is warm, supportive, and often punctuated by laughter at shared mistakes.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Partner Rotation: Why Solo Is Better</h2>
            <p className="text-muted-foreground mb-4">Here's a secret that experienced dancers know: coming alone is actually better for your development. When you come with a partner, you tend to dance only with them — which limits your learning. Partner rotation forces you to adapt to different lead/follow styles, different heights, different energy levels. This adaptability is what makes you a great social dancer. Students who rotate from day one improve 3-5 times faster than those who stick with one partner.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Make Friends at a Dance Class</h2>
            <p className="text-muted-foreground mb-4">Dance friendships form naturally. You share a laugh when you both go the wrong way. You ask someone their name after a nice dance. You see the same faces every week and start chatting during breaks. Before you know it, you're going for drinks after class, joining the WhatsApp group, and planning to attend a <Link to="/events" className="text-primary hover:underline">Latin Friday</Link> together. Many of our members' closest friendships started on the dance floor.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Solo Dancer Success Stories</h2>
            <p className="text-muted-foreground mb-4">Some of Pura Nights' most dedicated and accomplished dancers started completely alone. Members of <Link to="/pura-ladies" className="text-primary hover:underline">Pura Ladies</Link> who now perform at international festivals walked into their first class knowing no one. Regulars who now attend both Monday and Tuesday classes every week came solo on their first night. The common thread? They showed up despite being nervous, and they came back the following week.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Come Alone, Leave With Friends</h3>
              <p className="text-muted-foreground text-sm mb-4">No partner needed. No experience needed. Just bring yourself.</p>
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book Your First Class</a>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "What if there aren't enough partners?", a: "Melitta and the assistant instructors always ensure everyone has someone to dance with. If numbers are uneven, instructors fill in." },
                { q: "Will I feel awkward?", a: "For about 5 minutes, maybe. Then the music starts, you start moving, and you realise everyone else was just as nervous as you." },
                { q: "What percentage of people come alone?", a: "At least 60-70% of our students come solo. You'll be in good company." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Joining Dance Class Alone" path="/blog/joining-dance-class-alone" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/blog/salsa-no-partner", label: "Salsa Without a Partner" },
      { to: "/blog/first-salsa-class-london", label: "Your First Salsa Class" },
      { to: "/start-here", label: "Start Here Guide" },
    ]} />
  </Layout>
);

export default JoiningDanceClassAlone;
