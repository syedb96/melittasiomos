import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/bachata-sensual-guide -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const BachataSensualGuide = () => (
  <Layout>
    <SeoHead title="Bachata Sensual: Complete Beginner's Guide | Pura Nights" description="What is Bachata Sensual? Learn about body waves, connection, and how this expressive dance style differs from traditional Bachata. Beginner-friendly guide." path="/blog/bachata-sensual-guide" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Bachata Sensual: The Complete Guide for Beginners", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-02-01" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Bachata</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Bachata</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Bachata Sensual: The Complete Guide for Beginners</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Feb 2026</span><span>·</span><span>8 min read</span></div>
            <SocialShareButtons title="Bachata Sensual Guide" path="/blog/bachata-sensual-guide" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Is Bachata Sensual?</h2>
            <p className="text-muted-foreground mb-4">Bachata Sensual is a modern evolution of Bachata that emphasises body movement, waves, isolations, and deep connection between partners. While traditional Bachata focuses on footwork and hip movement within a relatively upright frame, Bachata Sensual introduces a fluid, expressive quality that uses the entire body — from head rolls and chest waves to dramatic dips and intricate arm work.</p>
            <p className="text-muted-foreground mb-4">Despite its name, Bachata Sensual is not about being provocative — it's about musical expression and physical connection. The word "sensual" refers to engaging the senses, feeling the music deeply, and translating emotion into movement. When danced well, it's one of the most beautiful partner dances in the world.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Who Created Bachata Sensual?</h2>
            <p className="text-muted-foreground mb-4">The style was developed primarily by Spanish dancers Korke and Judith in the early 2010s. Building on the foundations of Dominican Bachata and the Moderna style that emerged in Europe, they created a system of leading and following based on body contact rather than hand-to-hand connection. Their workshops and performances popularised the style globally, and today Bachata Sensual is danced at every major Latin dance congress in the world.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How It Differs From Traditional and Moderna</h2>
            <p className="text-muted-foreground mb-4"><Link to="/blog/what-is-bachata" className="text-primary hover:underline">Traditional Bachata</Link> (Dominican style) is characterised by fast footwork, smaller steps, and a playful, rhythmic quality that stays close to the music's roots. Bachata Moderna added turns, crosses, and more open-position work influenced by Salsa. Bachata Sensual takes this further with body waves, head movements, and a closer connection that requires trust and technique in equal measure.</p>
            <p className="text-muted-foreground mb-4">At <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link>, we teach elements from all three styles, giving students a well-rounded Bachata education. As you progress, you'll naturally develop preferences and start blending techniques into your own style.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Body Wave Explained</h2>
            <p className="text-muted-foreground mb-4">The body wave is the signature move of Bachata Sensual. It's a sequential movement that travels through the body — typically starting from the chest, flowing through the torso, and finishing at the hips. When both partners execute a body wave together, it creates a stunning visual effect that looks far more difficult than it actually is once you understand the mechanics.</p>
            <p className="text-muted-foreground mb-4">Learning body waves requires patience and body awareness. We break it down in stages: first learning chest isolations, then hip movements, then connecting them into a flowing wave. Most students can perform a basic body wave within 3-4 weeks of regular practice.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Is Bachata Sensual Appropriate for Beginners?</h2>
            <p className="text-muted-foreground mb-4">Absolutely. While the most advanced Bachata Sensual choreography can look complex, the fundamental building blocks are accessible to anyone. At Pura Nights, beginners learn basic Bachata first — the side-to-side step, the tap, simple turns — and then gradually introduce body movement concepts as they progress to Improver level. By the time you're comfortable with the basics, adding sensual elements feels like a natural evolution rather than a dramatic leap.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Start Learning Bachata Sensual</h2>
            <p className="text-muted-foreground mb-4">Start with regular <Link to="/bachata-classes-london" className="text-primary hover:underline">Bachata classes</Link> to build your foundation. Attend socials to practice with different partners. Watch performances online to develop your visual understanding of the style. And when you're ready, consider <Link to="/private-lessons" className="text-primary hover:underline">private lessons</Link> with Melitta to fast-track your body movement technique.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Learn Bachata Sensual at Pura Nights</h3>
              <p className="text-muted-foreground text-sm mb-4">Monday Chiswick & Tuesday Ealing. All levels welcome.</p>
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book a Class</a>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Is Bachata Sensual inappropriate or too intimate?", a: "No — it's about musical expression, not intimacy. The 'sensual' refers to engaging the senses. It's danced with respect and consent at all times." },
                { q: "Can I learn Bachata Sensual as a complete beginner?", a: "Yes. Start with basic Bachata classes and body movement will be introduced as you progress." },
                { q: "Do I need a regular partner?", a: "No — we rotate partners in class so you develop the ability to dance with anyone." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Bachata Sensual Guide" path="/blog/bachata-sensual-guide" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/blog/what-is-bachata", label: "What Is Bachata?" },
      { to: "/blog/history-of-bachata", label: "History of Bachata" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
    ]} />
  </Layout>
);

export default BachataSensualGuide;
