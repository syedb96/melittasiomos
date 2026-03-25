import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

const blogPosts = [
  { slug: "what-is-salsa", title: "What is Salsa Dance? The Complete Guide to On1 Crossbody Style", date: "Jan 2025", excerpt: "Discover the history, music, and technique of Salsa dance. Learn On1 Crossbody Salsa in London at Pura Nights.", category: "Salsa", readTime: "8 min", featured: true },
  { slug: "what-is-bachata", title: "What is Bachata Dance? From Dominican Roots to Bachata Sensual", date: "Feb 2025", excerpt: "Explore Bachata — from its emotional Dominican Republic origins to Bachata Sensual. Learn all styles at Pura Nights.", category: "Bachata", readTime: "7 min" },
  { slug: "salsa-vs-bachata", title: "Salsa vs Bachata — Which Should You Learn First?", date: "Mar 2025", excerpt: "Can't decide between Salsa and Bachata? Here's an honest comparison. Spoiler: at Pura Nights, you learn both.", category: "Beginners", readTime: "5 min" },
  { slug: "beginners-guide-salsa-london", title: "The Complete Beginner's Guide to Salsa Classes in London", date: "Apr 2025", excerpt: "Everything you need to know before your first salsa class — what to wear, how it works, pricing explained.", category: "Beginners", readTime: "6 min" },
  { slug: "wedding-first-dance-tips", title: "10 Tips for the Perfect Wedding First Dance", date: "Mar 2025", excerpt: "Expert advice from award-winning instructor Melitta Siomos on preparing a show-stopping first dance.", category: "Wedding Dance", readTime: "5 min" },
  { slug: "pura-ladies-story", title: "The Story of Pura Ladies — How One Dream Became a Global Community", date: "May 2025", excerpt: "How Pura Ladies grew from one London team to 7 groups across 4 countries.", category: "Culture", readTime: "5 min" },
];

const categories = ["All", "Salsa", "Bachata", "Beginners", "Wedding Dance", "Culture"];

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
