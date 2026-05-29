import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";
import BlogPostFooter from "@/components/BlogPostFooter";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": ["HowTo", "Article"],
  name: "How to Practice Salsa at Home Between Classes",
  description: "A simple home practice routine for Salsa students.",
  totalTime: "PT15M",
  step: [
    { "@type": "HowToStep", name: "Warm up with the basic step", text: "Spend 3-5 minutes on the basic step (1-2-3 pause, 5-6-7 pause) focusing on weight transfer." },
    { "@type": "HowToStep", name: "Drill specific footwork", text: "Practise crossover steps, suzy-Q, and spot turns slowly, then build speed." },
    { "@type": "HowToStep", name: "Train your ear", text: "Listen for the clave, conga, piano tumbao, and breaks without dancing." },
    { "@type": "HowToStep", name: "Watch videos intentionally", text: "Follow only the leader's feet for one song, then rewatch following the follower." },
    { "@type": "HowToStep", name: "Apply at the next social", text: "Use what you practised at your next class or social." },
  ],
};

const HowToPracticeSalsaAtHome = () => (
  <Layout>
    <SeoHead title="How to Practice Salsa at Home Between Classes | Pura Nights" description="Simple solo practice routines to improve your Salsa between classes. Footwork drills, musicality exercises, and video practice tips." path="/blog/how-to-practice-salsa-at-home" schema={howToSchema} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Technique</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Technique</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">How to Practice Salsa at Home Between Classes</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Mar 2026</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Practice Salsa at Home" path="/blog/how-to-practice-salsa-at-home" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Home Practice Accelerates Learning</h2>
            <p className="text-muted-foreground mb-4">The students who improve fastest at <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link> aren't necessarily the most naturally talented — they're the ones who practice between classes. Even 10 minutes of focused solo practice 3-4 times per week can double your rate of improvement. The reason is simple: class introduces new material, but it's repetition outside of class that builds muscle memory.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Basic Step Solo Practice Routine</h2>
            <p className="text-muted-foreground mb-4">Start every home practice session with 3-5 minutes of basic step. Put on a Salsa track, find the beat, and step: 1-2-3, pause, 5-6-7, pause. Focus on: clean weight transfer (fully shifting your weight from one foot to the other), keeping your knees slightly bent, maintaining an upright posture, and staying on time. Once the basic step feels automatic — like walking — you've built the foundation everything else sits on.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Footwork Drills</h2>
            <p className="text-muted-foreground mb-4">After the basic step warm-up, practice specific footwork from class. Common drills include: the crossover step (stepping across your body), the suzy-Q (twisting on the balls of your feet), and spot turns (360-degree turns on one foot). Practice each drill slowly first, then gradually increase speed as you gain control. Use a mirror if possible — it provides instant visual feedback on your posture and alignment.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Listening Exercises: Hearing the Clave</h2>
            <p className="text-muted-foreground mb-4">Musicality practice doesn't require any physical movement. Put on a Salsa playlist and try to identify: the clave pattern (the rhythmic backbone), the conga pattern, the piano tumbao, and the vocal melody. Clap along to different instruments. Listen for breaks (moments where the music pauses or changes dramatically). This ear training makes a massive difference to your social dancing — see our full <Link to="/blog/salsa-musicality-guide" className="text-primary hover:underline">musicality guide</Link> for more.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Watching Videos Intentionally</h2>
            <p className="text-muted-foreground mb-4">YouTube is full of Salsa content, but passive watching doesn't help much. Instead, watch intentionally: pick one couple and follow just the leader's feet for an entire song, then rewatch following the follower's feet. Notice transitions between moves, how they use the music, and what makes their dancing look smooth. Try to replicate specific movements you admire — even at slow speed — in your practice space.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Social Element: Why Practice Alone Has Limits</h2>
            <p className="text-muted-foreground mb-4">Home practice builds individual skills — timing, footwork, body awareness — but it can't replace the partner connection and social adaptation you develop on the dance floor. Think of home practice as preparation that makes your class time and social dancing more productive. The ideal combination is: practice solo between classes, take group classes for new material and partner work, and attend socials to apply everything in a real-world context.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Want Guided Practice?</h3>
              <p className="text-muted-foreground text-sm mb-4">Our online classes give you structured practice material you can follow at home.</p>
              <Link to="/online-salsa-bachata-coaching" className="btn-cta-primary text-sm">View Online Coaching →</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "How much space do I need?", a: "A small clear area about 2x2 metres is enough for basic step and footwork drills." },
                { q: "What music should I practice to?", a: "Any Salsa music that makes you want to move. Search 'Salsa mix 2026' on YouTube or Spotify." },
                { q: "Can I practice Bachata at home too?", a: "Absolutely — the same principles apply. Basic step, body movement, and musicality can all be practised solo." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Practice Salsa at Home" path="/blog/how-to-practice-salsa-at-home" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm pt-0">
        <BlogPostFooter related={[
          { to: "/online-classes", title: "Online Classes", category: "Service", readTime: "3 min" },
          { to: "/blog/improve-social-dancing", title: "Improve Your Social Dancing", category: "Technique", readTime: "7 min" },
          { to: "/blog/salsa-musicality-guide", title: "Salsa Musicality Guide", category: "Technique", readTime: "8 min" },
        ]} />
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/online-classes", label: "Online Classes" },
      { to: "/blog/improve-social-dancing", label: "Improve Social Dancing" },
      { to: "/blog/salsa-musicality-guide", label: "Salsa Musicality Guide" },
    ]} />
  </Layout>
);

export default HowToPracticeSalsaAtHome;
