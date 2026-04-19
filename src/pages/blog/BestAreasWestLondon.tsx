import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogPostFooter from "@/components/BlogPostFooter";

/* <!-- WIX PAGE: /blog/best-areas-west-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const BestAreasWestLondon = () => (
  <Layout>
    <SeoHead title="Best Areas in West London for Salsa and Bachata | Pura Nights" description="Discover the best neighbourhoods in West London for Salsa and Bachata — from Chiswick to Ealing, Acton to Richmond. Your guide to the local Latin dance scene." path="/blog/best-areas-west-london-salsa-bachata" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Best Areas in West London for Salsa and Bachata", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-07-01" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Best Areas in West London for Salsa and Bachata</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jul 2025</span><span>·</span><span>7 min read</span></div>
            <SocialShareButtons title="Best Areas in West London for Salsa and Bachata" path="/blog/best-areas-west-london-salsa-bachata" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">West London has quietly become one of the UK's most vibrant hubs for Latin dance. While Central London has its famous clubs and congresses, it's the neighbourhoods of West London — Chiswick, Ealing, Acton, Hammersmith, and beyond — that offer the best combination of quality instruction, thriving communities, and accessible venues. Here's your neighbourhood-by-neighbourhood guide.</p>

            {[
              { area: "Chiswick (W4)", desc: "Chiswick is ground zero for Pura Nights' Monday classes. The George IV on Chiswick High Road is a beloved local venue with a spacious dance floor and a welcoming pub atmosphere. Chiswick's cosmopolitan, culturally curious population makes it ideal for Latin dance — you'll find a mix of young professionals, couples, and longtime locals. Nearest tube: Turnham Green (District Line). The 190, 237, and 267 buses all stop nearby." },
              { area: "Ealing (W5/W13)", desc: "Known as the 'Queen of the Suburbs,' Ealing hosts our Tuesday classes at the stunning Drayton Court Hotel. The Grade II listed venue with its ballroom atmosphere sets Ealing apart. With the Elizabeth Line now running through West Ealing, access from Central London and Heathrow is seamless. Ealing's diverse community brings incredible energy to the dance floor." },
              { area: "Acton (W3)", desc: "Sitting right between Chiswick and Ealing, Acton is perfectly positioned for both Monday and Tuesday classes. With stations on the Central, District, Piccadilly, and Elizabeth lines, plus the Overground, Acton residents have more transport options than almost anywhere in West London. Many of our most dedicated 'twice-a-week' students come from Acton." },
              { area: "Hammersmith (W6)", desc: "Hammersmith is a major transport hub with quick connections to Chiswick via the District Line or the 190 bus. The area's thriving nightlife and entertainment scene means Hammersmith residents are often looking for new experiences — and Salsa fits perfectly." },
              { area: "Shepherd's Bush (W12)", desc: "Just a short hop from Chiswick via the 237 bus or the Central/Overground lines. Shepherd's Bush has a strong creative and multicultural community that's drawn to Latin dance's expressiveness and social energy." },
              { area: "Brentford, Kew & Richmond (TW8/TW9)", desc: "South of Chiswick, these leafy riverside areas are surprisingly well-connected. Kew Bridge and Brentford stations are one stop from our Chiswick venue. Richmond residents can reach us via the District Line. These areas bring a slightly older, often couples-oriented demographic who love the sophistication of Latin dance." },
            ].map((item, i) => (
              <div key={i} className="mb-8">
                <h2 className="font-display text-2xl font-bold mb-3 mt-6">{item.area}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">The Verdict</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">West London offers the perfect combination of quality instruction, accessible venues, and a warm, welcoming community. Whether you're in W3, W4, W5, W6, W12, or the TW postcodes, you're never more than 15–20 minutes from a Pura Nights class.</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class</a>
              <Link to="/locations" className="text-primary font-heading font-semibold text-sm">View Our Venues →</Link>
            </div>
            <AuthorCard />
          </FadeInUp>
          <BlogPostFooter related={[
            { to: "/blog/salsa-classes-near-chiswick", title: "Salsa Classes Near Chiswick High Road", category: "Local", readTime: "6 min" },
            { to: "/blog/bachata-classes-near-ealing", title: "Bachata Classes Near Ealing Broadway", category: "Local", readTime: "6 min" },
            { to: "/blog/west-london-latin-dance-guide", title: "West London Latin Dance Guide", category: "Local", readTime: "8 min" },
          ]} />
        </div>
      </section>
    </article>
  </Layout>
);

export default BestAreasWestLondon;
