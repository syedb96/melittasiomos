import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const blogPosts = [
  { slug: "latin-dance-classes-london-guide", title: "Enjoy Latin Dance Classes in London — A Complete Guide for Beginners", date: "Oct 2025", excerpt: "Discover everything you need to know about starting Latin dance classes in London — from what to expect at your first Salsa or Bachata class to finding the best venues near you." },
  { slug: "discover-latin-dance-london-2025", title: "Discover Latin Dance Classes Across London — Where to Go in 2025", date: "Sep 2025", excerpt: "A comprehensive guide to the best Latin dance schools and social nights across London, from West London's Pura Nights to Central London venues." },
  { slug: "best-bachata-classes-london", title: "Where to Find the Best Bachata Classes Nearby — London's Top Spots", date: "Jul 2025", excerpt: "Looking for Bachata classes near you in London? Here's our curated list of the best Bachata schools, teachers and social dance nights in the city." },
  { slug: "learn-salsa-beginner-tips", title: "5 Tips to Learn to Dance Salsa — A Beginner's Guide", date: "Jun 2025", excerpt: "Starting your Salsa journey? These five practical tips from award-winning instructor Melitta Siomos will help you build confidence on the dance floor." },
  { slug: "find-dance-lessons-london", title: "Mastering Movement: How to Find Your Ideal Dance Lessons", date: "Jul 2025", excerpt: "Not sure where to start with dance lessons in London? This guide walks you through choosing the right style, instructor and schedule for your goals." },
  { slug: "wedding-dance-choreography-guide", title: "The Ultimate Guide to Wedding Dance Choreography in London", date: "Mar 2025", excerpt: "Planning your first dance? Learn how wedding dance choreography works, how many lessons you need, and why Salsa or Bachata might be the perfect choice." },
];

const Blog = () => (
  <Layout>
    <SeoHead title="Pura Stories Blog | Salsa & Bachata Tips, Events & Community | Melitta Siomos London" description="Explore the Pura Stories Blog — Salsa & Bachata tips for beginners, event recaps, Latin culture guides, community stories and more from Melitta Siomos and Pura Nights London." path="/blog" />

    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Pura Stories Blog</h1>
        <p className="text-center text-muted-foreground font-heading mb-4">Life on the Dancefloor with Melitta Siomos</p>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <article key={i} className="bg-card rounded-lg p-6 card-hover">
              <p className="text-primary font-heading font-semibold text-xs mb-2">{post.date}</p>
              <h2 className="font-display text-lg font-bold mb-2 leading-snug">{post.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
              <span className="text-primary font-heading font-semibold text-sm">Read More →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;
