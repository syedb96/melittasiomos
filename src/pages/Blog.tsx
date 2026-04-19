import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX PAGE: /blog -->
   <!-- WIX: Use Wix Blog app with categories matching: Salsa, Bachata, Beginners, Wedding Dance, Local, Culture, Technique, Events, Lifestyle -->
   <!-- WIX SECTION: Hero — use Strip -->
   <!-- WIX SECTION: Category Filter — use Blog category navigation -->
   <!-- WIX SECTION: Featured Post — use Blog featured post widget -->
   <!-- WIX SECTION: Post Grid — use Blog post list/grid widget -->
   <!-- WIX SECTION: Sidebar — use Blog sidebar with custom widgets -->
*/
const blogPosts = [
  { slug: "what-is-salsa", title: "What is Salsa Dance? The Complete Guide to On1 Crossbody Style", date: "Jan 2025", excerpt: "Discover the history, music, and technique of Salsa dance. Learn On1 Crossbody Salsa in London at Pura Nights.", category: "Salsa", readTime: "8 min", featured: true },
  { slug: "what-is-bachata", title: "What is Bachata Dance? From Dominican Roots to Bachata Sensual", date: "Feb 2025", excerpt: "Explore Bachata — from its emotional Dominican Republic origins to Bachata Sensual. Learn all styles at Pura Nights.", category: "Bachata", readTime: "7 min" },
  { slug: "salsa-vs-bachata", title: "Salsa vs Bachata — Which Should You Learn First?", date: "Mar 2025", excerpt: "Can't decide between Salsa and Bachata? Here's an honest comparison. Spoiler: at Pura Nights, you learn both.", category: "Beginners", readTime: "5 min" },
  { slug: "beginners-guide-salsa-london", title: "The Complete Beginner's Guide to Salsa Classes in London", date: "Apr 2025", excerpt: "Everything you need to know before your first salsa class — what to wear, how it works, pricing explained.", category: "Beginners", readTime: "6 min" },
  { slug: "wedding-first-dance-tips", title: "10 Tips for the Perfect Wedding First Dance", date: "Mar 2025", excerpt: "Expert advice from award-winning instructor Melitta Siomos on preparing a show-stopping first dance.", category: "Wedding Dance", readTime: "5 min" },
  { slug: "pura-ladies-story", title: "The Story of Pura Ladies — How One Dream Became a Global Community", date: "May 2025", excerpt: "How Pura Ladies grew from one London team to 7 groups across 4 countries.", category: "Culture", readTime: "5 min" },
  { slug: "first-salsa-class-london", title: "Your First Salsa Class in London — What to Expect", date: "May 2025", excerpt: "Nervous about your first salsa class? Here's exactly what happens, what to wear, and why you'll love it.", category: "Beginners", readTime: "6 min" },
  { slug: "salsa-no-partner", title: "Can You Go to Salsa Classes Without a Partner?", date: "May 2025", excerpt: "Yes! Most people come solo. Here's why dancing alone is the best way to start.", category: "Beginners", readTime: "5 min" },
  { slug: "how-long-to-learn-salsa", title: "How Long Does It Take to Learn Salsa?", date: "Jun 2025", excerpt: "From first steps to confident social dancer — a realistic timeline for learning Salsa in London.", category: "Salsa", readTime: "6 min" },
  { slug: "bachata-for-beginners-london", title: "Bachata for Beginners in London — Your Complete Guide", date: "Jun 2025", excerpt: "Everything beginners need to know about starting Bachata in London. Styles, classes, and what to expect.", category: "Bachata", readTime: "7 min" },
  { slug: "what-to-wear-salsa-bachata", title: "What to Wear to Salsa & Bachata Classes", date: "Jun 2025", excerpt: "A practical guide to dressing for Latin dance classes — comfort, shoes, and style tips.", category: "Beginners", readTime: "4 min" },
  { slug: "salsa-on1-vs-on2", title: "Salsa On1 vs On2 — What's the Difference?", date: "Jul 2025", excerpt: "The key differences between On1 (LA style) and On2 (NY Mambo) explained simply.", category: "Salsa", readTime: "6 min" },
  { slug: "best-areas-west-london", title: "Best Areas for Latin Dance Classes in West London", date: "Jul 2025", excerpt: "From Chiswick to Ealing to Acton — discover where to dance Salsa and Bachata in West London.", category: "Local", readTime: "5 min" },
  { slug: "salsa-classes-near-chiswick", title: "Salsa Classes Near Chiswick — Your Local Guide", date: "Jul 2025", excerpt: "Find the best Salsa classes in and around Chiswick, W4. Venues, schedules, and what to expect.", category: "Local", readTime: "5 min" },
  { slug: "bachata-classes-near-ealing", title: "Bachata Classes Near Ealing — Where to Dance in W5", date: "Jul 2025", excerpt: "Discover Bachata classes in Ealing and nearby areas. Beginner-friendly, no partner needed.", category: "Local", readTime: "5 min" },
  { slug: "dance-classes-acton-adults", title: "Dance Classes in Acton for Adults — Salsa & Bachata", date: "Aug 2025", excerpt: "Adult dance classes in Acton, W3. Latin dance for all levels with Pura Nights.", category: "Local", readTime: "5 min" },
  { slug: "west-london-latin-dance-guide", title: "The Ultimate Guide to Latin Dance in West London", date: "Aug 2025", excerpt: "Everything you need to know about the West London Latin dance scene — classes, socials, and events.", category: "Local", readTime: "7 min" },
  { slug: "salsa-south-west-london", title: "Salsa Classes in South West London — Complete Guide", date: "Aug 2025", excerpt: "Where to learn Salsa in South West London. Classes, venues, and community events.", category: "Local", readTime: "5 min" },
  { slug: "choose-wedding-first-dance-song", title: "How to Choose Your Wedding First Dance Song", date: "Aug 2025", excerpt: "Expert tips on picking the perfect song for your wedding first dance — tempo, lyrics, and style.", category: "Wedding Dance", readTime: "5 min" },
  { slug: "salsa-vs-waltz-wedding", title: "Salsa vs Waltz for Your Wedding First Dance", date: "Aug 2025", excerpt: "Should your first dance be a waltz or a salsa? Compare both styles and find the right fit.", category: "Wedding Dance", readTime: "5 min" },
  { slug: "how-many-wedding-dance-lessons", title: "How Many Wedding Dance Lessons Do You Need?", date: "Sep 2025", excerpt: "A realistic guide to how many lessons couples need for a confident, beautiful first dance.", category: "Wedding Dance", readTime: "5 min" },
  { slug: "last-minute-wedding-dance", title: "Last-Minute Wedding Dance — Can You Learn in 2 Weeks?", date: "Sep 2025", excerpt: "Short on time before your wedding? Here's what's possible with intensive private lessons.", category: "Wedding Dance", readTime: "5 min" },
  { slug: "history-of-salsa", title: "The History of Salsa Dance — From Cuba to the World", date: "Sep 2025", excerpt: "Trace Salsa's journey from Cuban Son and Mambo to the global phenomenon it is today.", category: "Culture", readTime: "8 min" },
  { slug: "history-of-bachata", title: "The History of Bachata — From the Streets to the Stage", date: "Oct 2025", excerpt: "How Bachata evolved from marginalised Dominican folk music into a worldwide dance movement.", category: "Culture", readTime: "8 min" },
  { slug: "best-salsa-nights-west-london", title: "The Best Salsa Nights in West London — 2026 Guide", date: "Jan 2026", excerpt: "Discover the best weekly salsa nights and monthly socials across West London.", category: "Local", readTime: "8 min" },
  { slug: "salsa-classes-near-turnham-green", title: "Salsa Classes Near Turnham Green — Everything You Need to Know", date: "Jan 2026", excerpt: "Just 5 minutes from Turnham Green tube. Weekly salsa classes at The George IV, Chiswick.", category: "Local", readTime: "6 min" },
  { slug: "latin-dance-events-ealing-2026", title: "Latin Dance Events in Ealing 2026 — What's On This Year", date: "Jan 2026", excerpt: "Monthly Latin Fridays, weekly classes, and special workshops at the Drayton Court Hotel.", category: "Events", readTime: "7 min" },
  { slug: "bachata-sensual-guide", title: "Bachata Sensual: The Complete Guide for Beginners", date: "Feb 2026", excerpt: "What is Bachata Sensual? Body waves, connection, and how it differs from traditional Bachata.", category: "Bachata", readTime: "8 min" },
  { slug: "ladies-styling-bachata", title: "Ladies Styling in Bachata: How to Develop Your Own Expression", date: "Feb 2026", excerpt: "Arms, head movements, body rolls, and the confidence to express yourself on the dance floor.", category: "Technique", readTime: "7 min" },
  { slug: "lead-follow-salsa-bachata", title: "Lead and Follow in Salsa & Bachata: A Beginner's Guide", date: "Feb 2026", excerpt: "Understand the frame, connection, common mistakes, and how to improve as a lead or follow.", category: "Technique", readTime: "7 min" },
  { slug: "improve-social-dancing", title: "How to Improve Your Social Dancing (Without Taking More Classes)", date: "Feb 2026", excerpt: "Practical tips: practice at home, dance with different partners, work on musicality.", category: "Technique", readTime: "7 min" },
  { slug: "salsa-musicality-guide", title: "Musicality in Salsa: How to Stop Counting and Start Feeling the Music", date: "Mar 2026", excerpt: "The clave, breaks, montuno, and exercises to develop your musical ear for Salsa.", category: "Salsa", readTime: "8 min" },
  { slug: "hen-party-dance-ideas-london", title: "Hen Party Dance Ideas in West London", date: "Mar 2026", excerpt: "Book a private Salsa or Bachata class for your hen party. Fun, memorable, all abilities.", category: "Events", readTime: "6 min" },
  { slug: "corporate-team-building-dance-london", title: "Corporate Team Building with Latin Dance in London", date: "Mar 2026", excerpt: "Build communication, trust, and energy with a Latin dance team building session.", category: "Events", readTime: "6 min" },
  { slug: "gift-voucher-dance-class-london", title: "Why a Dance Class Gift Voucher is the Best Present", date: "Mar 2026", excerpt: "Give the gift of dance — experiences beat things every time. Available for classes and privates.", category: "Lifestyle", readTime: "5 min" },
  { slug: "new-year-start-salsa-london", title: "New Year, New Move: Start Salsa in London", date: "Jan 2026", excerpt: "How to start Salsa in January and actually stick to it. Bundles, commitment, and community.", category: "Beginners", readTime: "6 min" },
  { slug: "latin-dance-fitness-benefits", title: "The Surprising Fitness Benefits of Latin Dance", date: "Feb 2026", excerpt: "Cardio, coordination, mental health, and social benefits — backed by science.", category: "Lifestyle", readTime: "7 min" },
  { slug: "joining-dance-class-alone", title: "Joining a Dance Class Alone? Best Decision You'll Make", date: "Feb 2026", excerpt: "Why solo students improve faster, make friends quicker, and have more fun.", category: "Beginners", readTime: "6 min" },
  { slug: "salsa-shoes-guide", title: "What Shoes to Wear for Salsa & Bachata: Complete Guide", date: "Feb 2026", excerpt: "Beginner shoes, when to upgrade to Latin dance shoes, and where to buy in London.", category: "Beginners", readTime: "6 min" },
  { slug: "how-to-practice-salsa-at-home", title: "How to Practice Salsa at Home Between Classes", date: "Mar 2026", excerpt: "Solo drills, footwork exercises, and musicality training you can do in your living room.", category: "Technique", readTime: "6 min" },
  { slug: "pura-nights-latin-friday-guide", title: "Your Complete Guide to Pura Nights Monthly Latin Friday", date: "Mar 2026", excerpt: "Workshops, Pura Ladies performance, social dancing, tickets, and directions.", category: "Events", readTime: "7 min" },
  { slug: "dance-classes-west-london-guide", title: "The Complete Guide to Dance Classes in West London 2026", date: "Jan 2026", excerpt: "Salsa, Bachata, ladies styling, wedding dance, and private lessons — the definitive guide.", category: "Local", readTime: "9 min" },
];

const categories = ["All", "Salsa", "Bachata", "Beginners", "Wedding Dance", "Local", "Culture", "Technique", "Events", "Lifestyle"];

const Blog = () => {
  const [filter, setFilter] = useState("All");
  const featured = blogPosts.find(p => p.featured);
  const filtered = filter === "All" ? blogPosts : blogPosts.filter(p => p.category === filter);

  return (
    <Layout>
      <SeoHead title="Pura Stories Blog | Salsa & Bachata Tips, Events & Community | Melitta Siomos London" description="Explore the Pura Stories Blog — Salsa & Bachata tips for beginners, event recaps, Latin culture guides, community stories and more." path="/blog" />

      <section className="section-padding section-dark text-center">
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Pura Stories Blog</h1>
          <p className="text-peach font-heading">Life on the Dancefloor · Salsa & Bachata · London · Tips & Culture</p>
          <Link to="/learn/salsa-bachata-guide" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-heading text-sm font-semibold hover:opacity-90 transition-opacity">
            ⭐ New Pillar Guide: The Complete West London Salsa & Bachata Guide →
          </Link>
        </FadeInUp>
      </section>

      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10 sticky top-20 z-10 bg-[hsl(var(--soft-white))]/90 backdrop-blur-sm py-3 rounded-xl">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-10">
            <div>
              {/* Featured Post */}
              {filter === "All" && featured && (
                <FadeInUp>
                  <Link to={`/blog/${featured.slug}`} className="block bg-card rounded-2xl overflow-hidden card-hover mb-10">
                    <div className="p-8">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-3">{featured.category}</span>
                      <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">{featured.title}</h2>
                      <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground font-heading">
                        <span>{featured.date}</span><span>·</span><span>{featured.readTime} read</span>
                      </div>
                      <span className="inline-block mt-4 text-primary font-heading font-semibold">Read More →</span>
                    </div>
                  </Link>
                </FadeInUp>
              )}

              {/* Posts Grid */}
              <StaggerContainer className="grid md:grid-cols-2 gap-6">
                {filtered.filter(p => filter !== "All" || !p.featured).map((post, i) => (
                  <StaggerItem key={i}>
                    <Link to={`/blog/${post.slug}`} className="block bg-card rounded-xl p-6 card-hover h-full">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-3">{post.category}</span>
                      <h3 className="font-display text-lg font-bold mb-2 leading-snug">{post.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-heading">
                        <span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
                      </div>
                      <span className="inline-block mt-3 text-primary font-heading font-semibold text-sm">Read →</span>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Sidebar (desktop) */}
            <aside className="hidden lg:block space-y-6">
              <div className="bg-card rounded-xl p-5 shadow-card">
                <h4 className="font-display text-lg font-bold mb-3">Start Here</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/blog/what-is-salsa" className="text-primary hover:underline font-heading">What is Salsa? →</Link></li>
                  <li><Link to="/blog/what-is-bachata" className="text-primary hover:underline font-heading">What is Bachata? →</Link></li>
                  <li><Link to="/blog/beginners-guide-salsa-london" className="text-primary hover:underline font-heading">Beginner's Guide →</Link></li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-5 shadow-card">
                <h4 className="font-display text-lg font-bold mb-3">Most Popular</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/blog/salsa-vs-bachata" className="text-foreground hover:text-primary font-heading">Salsa vs Bachata</Link></li>
                  <li><Link to="/blog/wedding-first-dance-tips" className="text-foreground hover:text-primary font-heading">Wedding Dance Tips</Link></li>
                  <li><Link to="/blog/pura-ladies-story" className="text-foreground hover:text-primary font-heading">The Pura Ladies Story</Link></li>
                </ul>
              </div>

              <div className="bg-primary rounded-xl p-5 text-primary-foreground">
                <h4 className="font-display text-lg font-bold mb-2">Try a Class</h4>
                <p className="text-sm text-primary-foreground/80 mb-3">Mondays in Chiswick · Tuesdays in Ealing</p>
                <Link to="/pura-nights" className="btn-cta-dark text-sm inline-block">View Schedule →</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
