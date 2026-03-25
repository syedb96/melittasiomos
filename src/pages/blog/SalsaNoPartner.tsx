import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

const SalsaNoPartner = () => (
  <Layout>
    <SeoHead title="Can You Learn Salsa Without a Partner? | Pura Nights London" description="Wondering if you need a dance partner for salsa classes? The answer is no. Here's how partner rotation works and why most students come solo." path="/blog/salsa-no-partner" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Can You Learn Salsa Without a Partner?", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-06-05" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Can You Learn Salsa Without a Partner?</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jun 2025</span><span>·</span><span>5 min read</span></div>
            <SocialShareButtons title="Can You Learn Salsa Without a Partner?" url="https://www.melittasiomos.com/blog/salsa-no-partner" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">This is the single most common question we hear at Pura Nights — and the answer is a resounding <strong>yes</strong>. You absolutely do not need a partner to learn Salsa (or Bachata). In fact, the majority of our students come to class on their own.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">How Partner Rotation Works</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">In social Latin dance classes worldwide, partner rotation is standard practice. During the class, the instructor calls "rotate!" every few minutes, and everyone shifts to a new partner. This system has several benefits:</p>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li>You learn to dance with different body types, heights, and styles — making you a much better social dancer</li>
              <li>Leaders learn to adapt their lead to different followers, and followers learn to respond to different leads</li>
              <li>It's a natural icebreaker — you'll meet everyone in the room within one class</li>
              <li>No one feels stuck or left out</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Why Coming Solo Is Actually Better</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Here's something most people don't realise: coming to class with a partner can actually slow your progress. When you only practise with one person, you develop habits specific to that person's body and style. When you rotate, you build adaptability — which is the foundation of great social dancing.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Many of our strongest dancers started completely solo. They progressed faster precisely because they danced with everyone.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Social Floor: Where Connections Happen</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">After classes finish at 9:00 PM, the social dancing begins. This is two hours of open-floor dancing where anyone can ask anyone to dance. It's a welcoming, inclusive environment where experienced dancers actively seek out newer dancers to help them grow.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Many lasting friendships (and more than a few relationships) have started on the Pura Nights dance floor. The Latin dance community is built on connection — and that starts with your very first class.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What If I'm Shy?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Completely understandable — and extremely common. The structured partner rotation means you don't have to approach anyone yourself during class. The instructor manages everything. By the time the social begins, you'll have already danced with half the room and the ice is well and truly broken.</p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Bottom line:</strong> If you're waiting until you "find a partner" to start Salsa, you're losing time. The dance floor is where you'll find your community. Just turn up.</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class (Solo Welcome!)</a>
              <Link to="/start-here" className="text-primary font-heading font-semibold text-sm">Start Here Guide →</Link>
            </div>
            <AuthorCard />
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/first-salsa-class-london" className="text-primary hover:underline font-heading">Your First Salsa Class: What to Expect →</Link></li>
                <li><Link to="/blog/how-long-to-learn-salsa" className="text-primary hover:underline font-heading">How Long Does It Take to Learn Salsa? →</Link></li>
                <li><Link to="/blog/what-is-salsa" className="text-primary hover:underline font-heading">What is Salsa Dance? →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default SalsaNoPartner;
