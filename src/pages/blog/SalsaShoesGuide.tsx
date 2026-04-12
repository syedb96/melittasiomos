import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/salsa-shoes-guide -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const SalsaShoesGuide = () => (
  <Layout>
    <SeoHead title="What Shoes to Wear for Salsa & Bachata | Complete Guide" description="The complete guide to dance shoes for Salsa and Bachata. What works for beginners, when to upgrade, and where to buy dance shoes in London." path="/blog/salsa-shoes-guide" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "What Shoes to Wear for Salsa & Bachata: The Complete Guide", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-02-15" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">What Shoes to Wear for Salsa & Bachata: The Complete Guide</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Feb 2026</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Salsa Shoes Guide" path="/blog/salsa-shoes-guide" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Dance Shoes Matter</h2>
            <p className="text-muted-foreground mb-4">Your shoes affect everything in dance — balance, turns, comfort, and even your posture. The wrong shoes can make learning harder and increase the risk of knee and ankle strain. The right shoes make you feel lighter, more controlled, and more confident on the dance floor. That said, you absolutely don't need to buy specialist shoes before your first class.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Trainers for Beginners: What Works, What Doesn't</h2>
            <p className="text-muted-foreground mb-4">For your first few classes at <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link>, comfortable shoes with a relatively smooth sole are fine. Flat leather shoes, ballet pumps, or clean indoor trainers with low grip all work. Avoid heavy running shoes with thick rubber soles — they grip the floor too much and make turning difficult. Avoid open-toed sandals, flip-flops, and anything with a platform. Many beginners dance in socks for the first few weeks, which actually works well on a wooden floor.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Latin Dance Shoes Explained</h2>
            <p className="text-muted-foreground mb-4">Once you're committed to dancing regularly (usually after 4-8 weeks), investing in a pair of Latin dance shoes is a game-changer. Latin shoes have a suede sole that provides the perfect balance of grip and slide — you can turn smoothly without slipping. For followers, shoes typically have a 2-3 inch heel that shifts your weight forward and encourages good posture. For leads, flat or low-heel shoes with a suede sole are standard.</p>
            <p className="text-muted-foreground mb-4">Heel height is a personal preference. If you don't normally wear heels, start with a lower heel (2 inches) and work up. Comfort and stability matter more than style — the best dancers prioritise function. Many experienced followers eventually settle on a 2.5-3 inch heel for Bachata and a slightly lower heel for Salsa.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Recommendations by Level</h2>
            <p className="text-muted-foreground mb-4"><strong>Complete beginner:</strong> Any comfortable, smooth-soled shoe you already own. Socks are fine. <strong>Regular attendee (1-3 months):</strong> Entry-level Latin dance shoes (£30-50). Look for suede sole and a comfortable fit. <strong>Intermediate dancer (6+ months):</strong> Quality Latin shoes from a specialist brand (£60-120). At this stage, you know your preferences for heel height, strap style, and fit.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Where to Buy in London</h2>
            <p className="text-muted-foreground mb-4">Online retailers like DanceShoesUK, Ray Rose, and International Dance Shoes offer extensive ranges. For in-person fitting, Freed of London (Covent Garden) carries some Latin styles. Amazon and eBay have budget options for beginners. Ask Melitta or other students at class for personal recommendations — experienced dancers love sharing their favourite brands.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Don't Let Shoes Stop You</h3>
              <p className="text-muted-foreground text-sm mb-4">Come in whatever shoes you have — you can always upgrade later.</p>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book Your First Class</a>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Can I wear heels to a Salsa class?", a: "Small, stable heels are fine. Avoid stilettos or anything you can't balance in comfortably." },
                { q: "Do men need special shoes?", a: "Not initially. Clean leather shoes or smooth-soled trainers work. Men's Latin shoes are available once you want to upgrade." },
                { q: "How do I look after suede soles?", a: "Use a wire brush to roughen the suede periodically. Never wear dance shoes outdoors — the suede sole will be ruined by moisture and dirt." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Salsa Shoes Guide" path="/blog/salsa-shoes-guide" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/blog/what-to-wear-salsa-bachata", label: "What to Wear to Class" },
      { to: "/blog/first-salsa-class-london", label: "Your First Salsa Class" },
      { to: "/start-here", label: "Start Here" },
    ]} />
  </Layout>
);

export default SalsaShoesGuide;
