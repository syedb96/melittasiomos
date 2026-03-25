import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

const PuraNightsLatinFridayGuide = () => (
  <Layout>
    <SeoHead title="Pura Nights Latin Friday Guide | Monthly Social Event Ealing" description="Everything you need to know about Pura Nights Monthly Latin Friday in Ealing. Workshops, Pura Ladies performance, social dancing, tickets, and directions." path="/blog/pura-nights-latin-friday-guide" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Your Complete Guide to Pura Nights Monthly Latin Friday", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-03-10" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Events</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Events</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Your Complete Guide to Pura Nights Monthly Latin Friday</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Mar 2026</span><span>·</span><span>7 min read</span></div>
            <SocialShareButtons title="Latin Friday Guide" path="/blog/pura-nights-latin-friday-guide" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Is Pura Nights Latin Friday?</h2>
            <p className="text-muted-foreground mb-4">Pura Nights Latin Friday is the monthly social event that brings the entire Pura Nights community together for an evening of workshops, performance, and social dancing. Held on the last Friday of each month at the Drayton Court Hotel in Ealing, Latin Friday is bigger, bolder, and more electric than the weekly class nights — think of it as the monthly celebration of everything we love about Latin dance.</p>
            <p className="text-muted-foreground mb-4">Whether you're a regular weekly student or someone visiting from another dance school, Latin Friday welcomes everyone. The event draws dancers from across London and has become one of the most anticipated monthly events in the West London dance calendar.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Evening Timeline</h2>
            <p className="text-muted-foreground mb-4"><strong>7:00 PM</strong> — Doors open. Arrive early to socialise, change shoes, and grab a drink from the bar. <strong>7:30–9:00 PM</strong> — Three concurrent workshops: Beginner, Improver, and Intermediate. Each workshop teaches a social-ready combination you can use that same evening. <strong>9:00 PM</strong> — Pura Ladies performance. <strong>9:15 PM–Late</strong> — Open social dancing with DJ playing Salsa, Bachata, and selected Kizomba and Merengue tracks.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Three Workshop Levels</h2>
            <p className="text-muted-foreground mb-4"><strong>Beginner:</strong> If you've been dancing for 0-3 months or this is your first Pura Nights event. Covers fundamental moves with clear breakdowns. <strong>Improver:</strong> For dancers with 3-12 months experience. More complex patterns, styling elements, and musicality concepts. <strong>Intermediate:</strong> For experienced social dancers. Advanced techniques, body movement, and performance-quality combinations. All three workshops are taught by Melitta and her team of trained instructors.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Pura Ladies Performance</h2>
            <p className="text-muted-foreground mb-4">One of the highlights of every Latin Friday is the live <Link to="/pura-ladies" className="text-primary hover:underline">Pura Ladies</Link> performance. The all-female team takes the floor for a choreographed Bachata or Salsa routine that showcases the styling, body movement, and artistry that Pura Ladies is known for internationally. Performances are different each month, and they never fail to inspire the audience — many students cite watching Pura Ladies as the moment they decided to commit to dancing seriously.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Social</h2>
            <p className="text-muted-foreground mb-4">After the performance, the dance floor opens for social dancing. The DJ plays a curated mix that balances Salsa, Bachata, and occasional Kizomba and Merengue tracks. The energy is high, the floor is full, and the atmosphere is pure joy. Latin Fridays attract a broader mix of dancers than the regular weekly nights, which means more partners to dance with and more styles to experience. The social typically runs until midnight or later.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Tickets and Pricing</h2>
            <p className="text-muted-foreground mb-4">Tickets are available on <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Linktree</a> and tend to sell well in advance — early booking is recommended. Pricing includes access to all three workshops, the performance, and the social. Check the <Link to="/events" className="text-primary hover:underline">events page</Link> for the next date and ticket link.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Get There</h2>
            <p className="text-muted-foreground mb-4">Drayton Court Hotel, 2 The Avenue, West Ealing, London W13 8PH. West Ealing station (Elizabeth Line) is a 3-minute walk. Ealing Broadway (Central and District Lines) is a 12-minute walk. Ample on-street parking is available on The Avenue and surrounding streets.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Don't Miss the Next Latin Friday</h3>
              <p className="text-muted-foreground text-sm mb-4">Check the date and grab your ticket before it sells out.</p>
              <Link to="/events" className="btn-cta-primary text-sm">View Events →</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Can I attend Latin Friday without attending weekly classes?", a: "Yes — Latin Fridays are open to all dancers. There's a beginner workshop to get you started." },
                { q: "Is there a dress code?", a: "Smart-casual. Many dancers dress up a little more than weekly classes. Bring dance shoes if you have them." },
                { q: "Can I buy tickets at the door?", a: "Subject to availability, but we recommend pre-booking online as Latin Fridays often sell out." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Latin Friday Guide" path="/blog/pura-nights-latin-friday-guide" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/events", label: "Events Calendar" },
      { to: "/blog/latin-dance-events-ealing-2026", label: "Latin Events Ealing 2026" },
      { to: "/blog/best-salsa-nights-west-london", label: "Best Salsa Nights" },
    ]} />
  </Layout>
);

export default PuraNightsLatinFridayGuide;
