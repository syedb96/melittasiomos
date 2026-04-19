import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/latin-dance-fitness-benefits -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const LatinDanceFitnessBenefits = () => (
  <Layout>
    <SeoHead title="Fitness Benefits of Latin Dance | Pura Nights London" description="Discover the surprising fitness benefits of Salsa and Bachata dancing. Cardio, coordination, mental health, and more — backed by science." path="/blog/latin-dance-fitness-benefits" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "The Surprising Fitness Benefits of Latin Dance (Backed by Science)", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-02-25" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Lifestyle</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Lifestyle</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">The Surprising Fitness Benefits of Latin Dance (Backed by Science)</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Feb 2026</span><span>·</span><span>7 min read</span></div>
            <SocialShareButtons title="Latin Dance Fitness Benefits" path="/blog/latin-dance-fitness-benefits" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Dance as Cardio</h2>
            <p className="text-muted-foreground mb-4">Latin dance is a serious cardiovascular workout disguised as a great night out. A typical Pura Nights evening — 30 minutes of Salsa class, 30 minutes of Bachata class, and 60-90 minutes of social dancing — delivers sustained moderate-to-vigorous cardiovascular exercise that rivals a gym session. The difference? You're having so much fun that you don't notice you're exercising.</p>
            <p className="text-muted-foreground mb-4">Studies published in the Journal of Physiological Anthropology have shown that dance-based exercise improves cardiovascular fitness, lowers blood pressure, and reduces resting heart rate over time. The interval nature of social dancing — bursts of energy during fast songs alternating with slower Bachata tracks — mirrors the principles of high-intensity interval training (HIIT).</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Calories Burned in a Salsa Class</h2>
            <p className="text-muted-foreground mb-4">Research from the University of Brighton found that vigorous social dancing burns approximately 300-500 calories per hour, depending on intensity and body weight. A full Pura Nights evening (2-3 hours of dancing) can burn 600-1000+ calories — equivalent to running 5-8 kilometres, but infinitely more enjoyable. The combination of footwork, turns, arm movements, and body isolations engages multiple muscle groups simultaneously.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Balance, Coordination, and Proprioception</h2>
            <p className="text-muted-foreground mb-4">Latin dance develops proprioception — your body's ability to sense its position in space. This is crucial for balance, agility, and injury prevention. Every turn, weight transfer, and body isolation in <Link to="/blog/what-is-salsa" className="text-primary hover:underline">Salsa</Link> and Bachata trains your neuromuscular system. Studies show that regular dancers have significantly better balance and fewer fall-related injuries than non-dancers, making it particularly valuable as we age.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Mental Health Benefits</h2>
            <p className="text-muted-foreground mb-4">The mental health benefits of dance are well-documented. Dancing releases endorphins, reduces cortisol (stress hormone), and increases serotonin and dopamine — the brain's feel-good chemicals. A study in the New England Journal of Medicine found that frequent dancing reduces the risk of dementia by 76% — more than any other cognitive or physical activity studied, including reading and crossword puzzles.</p>
            <p className="text-muted-foreground mb-4">The social element amplifies these benefits. Loneliness and social isolation are recognised as significant health risks. Regular attendance at <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link> provides a consistent social outlet, a sense of belonging, and meaningful human connection — all of which are protective factors for mental wellbeing.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Social Benefits</h2>
            <p className="text-muted-foreground mb-4">Beyond physical and mental health, Latin dance builds a social network that enriches your life. Many of our students describe the Pura Nights community as a second family. Dance friendships often extend beyond the dance floor — our members travel together, celebrate birthdays together, and support each other through life's challenges. The shared passion for dance creates bonds that transcend age, background, and profession.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Dance Beats the Gym for Long-Term Consistency</h2>
            <p className="text-muted-foreground mb-4">The biggest challenge with any fitness regime is sticking to it. Gym memberships are notoriously abandoned by February. Dance succeeds where gyms fail because it's intrinsically motivating — you're not exercising for the sake of exercising; you're learning a skill, expressing yourself, socialising, and enjoying music. The fitness happens as a byproduct of something genuinely enjoyable, which makes it sustainable for years, not weeks.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Get Fit While Having Fun</h3>
              <p className="text-muted-foreground text-sm mb-4">Join Pura Nights — the workout that doesn't feel like a workout.</p>
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book Your First Class</a>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Do I need to be fit to start?", a: "No. Dance meets you where you are. Your fitness will improve naturally as you attend regularly." },
                { q: "Is Latin dance good for weight loss?", a: "Yes — the combination of sustained cardio, full-body movement, and high calorie burn makes it effective for weight management." },
                { q: "Can I dance if I have joint problems?", a: "Many of our students have minor joint issues. Bachata is lower-impact than Salsa. Always consult your doctor if you have specific concerns." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Latin Dance Fitness Benefits" path="/blog/latin-dance-fitness-benefits" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/blog/joining-dance-class-alone", label: "Joining a Class Alone" },
      { to: "/blog/new-year-start-salsa-london", label: "New Year Start Salsa" },
      { to: "/pura-nights", label: "Weekly Classes" },
    ]} />
  </Layout>
);

export default LatinDanceFitnessBenefits;
