import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

const BestSalsaNightsWestLondon = () => (
  <Layout>
    <SeoHead title="Best Salsa Nights in West London — 2026 Guide | Pura Nights" description="Discover the best salsa nights in West London for 2026. Weekly classes, monthly Latin Fridays, and social dancing at Pura Nights in Chiswick and Ealing." path="/blog/best-salsa-nights-west-london" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "The Best Salsa Nights in West London — 2026 Guide", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2026-01-15" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">The Best Salsa Nights in West London — 2026 Guide</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jan 2026</span><span>·</span><span>8 min read</span></div>
            <SocialShareButtons title="Best Salsa Nights West London" path="/blog/best-salsa-nights-west-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why West London Is the Heart of London's Salsa Scene</h2>
            <p className="text-muted-foreground mb-4">West London has quietly become the epicentre of Latin dance in the capital. While Central London has its share of clubs and one-off events, West London offers something different — a genuine, community-driven scene where dancers of all levels come together week after week. The combination of accessible venues, world-class instruction, and a welcoming atmosphere has made areas like Chiswick, Ealing, and Acton magnets for Latin dance lovers.</p>
            <p className="text-muted-foreground mb-4">At the heart of this scene is <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link>, founded by Bachata UK Champion Melitta Siomos. What started as a weekly class has grown into West London's most vibrant Latin dance community — with two weekly class nights, monthly social events, and a performance team that tours internationally.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Pura Nights Monday — Chiswick</h2>
            <p className="text-muted-foreground mb-4">Every Monday evening, The George IV pub on 185 Chiswick High Road transforms into a Latin dance haven. Doors open at 7:15 PM, with structured classes in both Salsa and Bachata running from 7:30 to 9:00 PM. Classes are split into Beginner, Improver, and Intermediate levels, so whether it's your first night or your fiftieth, there's always something new to learn.</p>
            <p className="text-muted-foreground mb-4">After classes, the venue opens up for two hours of social dancing — a 50/50 split between Salsa and Bachata. The atmosphere is warm, inclusive, and energetic. Many of our Monday regulars have been coming for years, and newcomers are always made to feel welcome. The venue is easily accessible from Turnham Green and Gunnersbury tube stations.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Pura Nights Tuesday — Ealing</h2>
            <p className="text-muted-foreground mb-4">Tuesday nights take place at the beautiful Drayton Court Hotel in West Ealing. This is a larger venue with a sprung wooden floor — ideal for dancing. The evening starts earlier, with a bonus ladies styling warm-up at 6:50 PM, followed by Salsa at 7:00 PM and Bachata at 7:45 PM. Social dancing runs until 11:00 PM.</p>
            <p className="text-muted-foreground mb-4">The <Link to="/salsa-classes-ealing" className="text-primary hover:underline">Ealing night</Link> tends to attract a slightly different crowd to Monday — many students attend both nights, but Tuesday has its own unique energy. The Drayton Court's elegant setting and generous dance floor make it a favourite among experienced dancers.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Monthly Latin Fridays</h2>
            <p className="text-muted-foreground mb-4">Once a month, Pura Nights hosts a special <Link to="/events" className="text-primary hover:underline">Latin Friday</Link> at the Drayton Court Hotel. These are bigger events featuring three workshop levels, a live Pura Ladies performance, and extended social dancing until late. Latin Fridays attract dancers from across London and are the perfect way to experience the energy of a Latin dance event without travelling to Central London.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What to Expect at a Salsa Night</h2>
            <p className="text-muted-foreground mb-4">If you've never been to a salsa night, here's what to expect: arrive a few minutes early, sign in, and find a comfortable spot. Classes are taught in a warm-up format with partner rotation, so you'll dance with multiple people regardless of whether you came alone or with a partner. The instructor demonstrates each move clearly, breaks it down step by step, and then has you practice with music.</p>
            <p className="text-muted-foreground mb-4">After classes, the social begins. This is where you put your new moves into practice. Don't worry if you forget things — everyone does at first. The social floor is judgement-free, and more experienced dancers are always happy to dance with beginners. Dress comfortably, bring water, and wear shoes that allow you to turn easily on a wooden floor.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Get the Most From a Salsa Night</h2>
            <p className="text-muted-foreground mb-4">Consistency is the single biggest factor in improving your dancing. Try to attend at least one night per week — ideally both Monday and Tuesday. Take the classes first, then stay for the social. Dance with as many different partners as possible. Watch the more experienced dancers and notice how they interpret the music. And most importantly, have fun — Latin dance is a celebration, not a competition.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Ready to Experience the Best Salsa Night in West London?</h3>
              <p className="text-muted-foreground text-sm mb-4">Join us this Monday in Chiswick or Tuesday in Ealing. No partner needed, all levels welcome.</p>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book Your Class</a>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Do I need a partner for a salsa night?", a: "No — most people come solo. We rotate partners during classes so everyone dances with everyone." },
                { q: "What should I wear?", a: "Comfortable clothes and smooth-soled shoes. Avoid trainers with heavy grip. Many dancers start in socks and upgrade to dance shoes later." },
                { q: "How much does it cost?", a: "Classes start from £5 per person. You can pay at the door or pre-book online for guaranteed entry." },
                { q: "Can I just come for the social?", a: "Experienced dancers are welcome to join the social from 9 PM. We recommend taking classes first to build your skills." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>

            <SocialShareButtons title="Best Salsa Nights West London" path="/blog/best-salsa-nights-west-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related Articles" links={[
      { to: "/pura-nights", label: "Weekly Class Schedule" },
      { to: "/blog/salsa-classes-near-chiswick", label: "Salsa Near Chiswick" },
      { to: "/blog/bachata-classes-near-ealing", label: "Bachata Near Ealing" },
    ]} />
  </Layout>
);

export default BestSalsaNightsWestLondon;
