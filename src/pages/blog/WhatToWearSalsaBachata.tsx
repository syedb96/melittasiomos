import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/what-to-wear-salsa-bachata -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const WhatToWear = () => (
  <Layout>
    <SeoHead title="What to Wear to Salsa and Bachata Class | Beginner's Guide | Pura Nights" description="Not sure what to wear to your first salsa or bachata class? Here's a practical guide covering shoes, clothes, and what to avoid." path="/blog/what-to-wear-salsa-bachata" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "What to Wear to Salsa and Bachata Class", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-06-20" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">What to Wear to Salsa and Bachata Class</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jun 2025</span><span>·</span><span>5 min read</span></div>
            <SocialShareButtons title="What to Wear to Salsa and Bachata Class" path="/blog/what-to-wear-salsa-bachata" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">One of the most common questions from first-timers is "what should I wear?" The good news: you don't need anything special for your first class. Here's a practical breakdown of what works, what doesn't, and what you might want to invest in as you progress.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Shoes — The Most Important Thing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4"><strong>For your first class:</strong> Clean indoor trainers or shoes with a smooth sole. You need to be able to pivot and turn without your foot sticking to the floor. Avoid shoes with heavy rubber treads — they'll grip too much and make turning uncomfortable.</p>
            <p className="text-muted-foreground leading-relaxed mb-4"><strong>As you progress:</strong> Consider investing in Latin dance shoes with a suede or chrome leather sole. These are specifically designed for spinning and pivoting. Brands like Burju, Werner Kern, and Freed of London make excellent options. Women's Latin shoes typically have a 2–3 inch heel; men's have a slight Cuban heel.</p>
            <p className="text-muted-foreground leading-relaxed mb-6"><strong>What to avoid:</strong> Open-toed sandals (unless dance-specific), heels you can't walk comfortably in, boots, flip-flops, or any shoe that could damage the floor.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Clothing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Wear something comfortable that you can move freely in. You'll be stepping, turning, and bending, so you need clothing that doesn't restrict your movement.</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-heading font-semibold text-sm mb-2 text-primary">✅ Good choices</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Jeans (not too tight) or leggings</li>
                  <li>• Comfortable top or blouse</li>
                  <li>• T-shirt or fitted top</li>
                  <li>• Skirts or dresses that allow movement</li>
                  <li>• Breathable fabrics — it can get warm!</li>
                </ul>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-heading font-semibold text-sm mb-2 text-destructive">❌ Avoid</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Very tight jeans that restrict leg movement</li>
                  <li>• Baggy sleeves that catch on partners</li>
                  <li>• Heavy coats or bulky layers</li>
                  <li>• Excessive jewellery (rings can hurt during holds)</li>
                  <li>• Strong perfume (you'll be close to partners)</li>
                </ul>
              </div>
            </div>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Practical Tips</h2>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>Bring a small towel</strong> — you'll work up a sweat, especially during the social</li>
              <li><strong>Bring a water bottle</strong> — stay hydrated throughout the evening</li>
              <li><strong>Fresh breath matters</strong> — bring mints or gum. You'll be dancing in close proximity</li>
              <li><strong>Tie long hair back</strong> — whipping your partner with your hair during a turn isn't ideal!</li>
              <li><strong>Deodorant is essential</strong> — you'll be moving a lot and dancing close to people</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What About as You Progress?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">As you fall in love with dancing (and you will), you might want to dress up a bit more for socials. Many of our regular students change into dance shoes and a slightly more dressed-up outfit for the social floor. It's not required — but it's part of the fun. Latin dance is about expression, and what you wear is part of that expression.</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Your First Class</a>
              <Link to="/start-here" className="text-primary font-heading font-semibold text-sm">Full Start Here Guide →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/first-salsa-class-london" className="text-primary hover:underline font-heading">Your First Salsa Class: What to Expect →</Link></li>
                <li><Link to="/blog/salsa-no-partner" className="text-primary hover:underline font-heading">Can You Learn Salsa Without a Partner? →</Link></li>
                <li><Link to="/blog/beginners-guide-salsa-london" className="text-primary hover:underline font-heading">Beginner's Guide to Salsa in London →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default WhatToWear;
