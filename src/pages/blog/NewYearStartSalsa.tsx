import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

const NewYearStartSalsa = () => (
  <Layout>
    <SeoHead title="Start Salsa in London This New Year | Pura Nights" description="New Year's resolution to learn to dance? Here's how to start Salsa in London and actually stick to it. Beginner-friendly classes from £5.50." path="/blog/new-year-start-salsa-london" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "New Year, New Move: How to Start Salsa in London and Actually Stick to It", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-01-05" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">New Year, New Move: How to Start Salsa in London and Actually Stick to It</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jan 2026</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Start Salsa New Year" path="/blog/new-year-start-salsa-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why January Is the Best Time to Start</h2>
            <p className="text-muted-foreground mb-4">January at Pura Nights is electric. A wave of new students arrives, many with "learn to dance" on their resolution list, and the energy in the room is infectious. You'll be surrounded by other beginners who are just as nervous and excited as you. The instructors know this and tailor the early-year classes to be extra welcoming, with more fundamental breakdowns and encouragement.</p>
            <p className="text-muted-foreground mb-4">Starting in January also means you'll have a full year ahead of you. By summer, you could be confidently dancing at socials, attending your first Latin festival, or even preparing for a <Link to="/pura-ladies" className="text-primary hover:underline">Pura Ladies</Link> audition. The transformation we see in students over 12 months of consistent attendance is remarkable.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Common Drop-Off Problem</h2>
            <p className="text-muted-foreground mb-4">Here's the honest truth: many people try a dance class in January and stop by March. Not because they didn't enjoy it — most people love their first class — but because life gets in the way and the habit doesn't stick. The key to avoiding this is understanding that learning to dance is a long game. You won't be amazing after one class. You might feel awkward for the first month. That's completely normal.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How Bundles Help You Commit</h2>
            <p className="text-muted-foreground mb-4">This is why we strongly recommend starting with a <Link to="/prices" className="text-primary hover:underline">class bundle</Link>. Buying a 4 or 8-class bundle creates a small but powerful commitment that keeps you coming back. It also saves you money compared to paying per class. Think of it as investing in your new hobby — the bundle turns "I'll try it once" into "I'm doing this."</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What to Expect in Your First 8 Weeks</h2>
            <p className="text-muted-foreground mb-4"><strong>Weeks 1-2:</strong> Everything feels new. You'll learn the basic step, timing, and how to hold your partner. You'll probably step on someone's feet. Everyone does. <strong>Weeks 3-4:</strong> The basic step starts feeling natural. You'll learn your first turns and cross-body leads. Muscle memory begins to form. <strong>Weeks 5-6:</strong> You can dance a simple social dance. The moves are becoming automatic, and you start hearing the music differently. <strong>Weeks 7-8:</strong> Confidence kicks in. You're looking forward to the social, you recognise the regulars, and someone asks you to dance and you say yes without hesitation.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Make Salsa Social (So You Don't Quit)</h2>
            <p className="text-muted-foreground mb-4">The students who stick with dancing are the ones who make it social. Stay for the social dancing after class. Chat to other students during breaks. Join the Pura Nights WhatsApp group. Come to a <Link to="/events" className="text-primary hover:underline">Latin Friday</Link>. When dance becomes part of your social life — not just a fitness activity — it becomes something you look forward to every week rather than something you have to motivate yourself to attend.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Make 2026 the Year You Learn to Dance</h3>
              <p className="text-muted-foreground text-sm mb-4">Save with a class bundle and commit to your new resolution.</p>
              <Link to="/prices" className="btn-cta-primary text-sm">View Prices & Bundles →</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Is January a good time to start if I'm a complete beginner?", a: "It's the best time. Lots of other beginners start in January too, so you won't be alone." },
                { q: "How many times per week should I go?", a: "Twice (Monday + Tuesday) is ideal, but once a week is enough to make solid progress." },
                { q: "What if I miss a week?", a: "That's fine — classes are drop-in. Each week introduces new content but always includes revision of fundamentals." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Start Salsa New Year" path="/blog/new-year-start-salsa-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/start-here", label: "Complete Beginner? Start Here" },
      { to: "/blog/first-salsa-class-london", label: "Your First Salsa Class" },
      { to: "/prices", label: "Prices & Bundles" },
    ]} />
  </Layout>
);

export default NewYearStartSalsa;
