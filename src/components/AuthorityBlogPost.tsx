import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogMoneyCTA from "@/components/BlogMoneyCTA";
import RelatedPages from "@/components/RelatedPages";

export interface AuthorityPostSection {
  h2: string;
  body: string;
}
export interface AuthorityPostFAQ {
  q: string;
  a: string;
}
export interface AuthorityPostProps {
  slug: string;            // without leading /blog/
  title: string;           // H1
  metaTitle: string;       // <=60 chars
  metaDescription: string; // 120-160 chars
  category: string;
  readTime: string;
  datePublished: string;   // ISO yyyy-mm-dd
  intro: string;           // first paragraph (must contain primary keyword in first 100 words)
  sections: AuthorityPostSection[];
  ctaVariant: "beginner" | "classes" | "chiswick" | "ealing" | "wedding" | "corporate" | "ladies" | "online" | "events";
  faqs: AuthorityPostFAQ[];
  related: { name: string; href: string }[]; // <=6
  primaryKeyword: string;
}

const BASE = "https://www.puranights.com";

const AuthorityBlogPost = ({
  slug, title, metaTitle, metaDescription, category, readTime, datePublished,
  intro, sections, ctaVariant, faqs, related, primaryKeyword,
}: AuthorityPostProps) => {
  const path = `/blog/${slug}`;
  const url = `${BASE}${path}`;
  const midpoint = Math.floor(sections.length / 2);

  return (
    <Layout>
      <SeoHead
        title={metaTitle}
        description={metaDescription}
        path={path}
        dateModified={datePublished}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description: metaDescription,
            keywords: primaryKeyword,
            author: { "@type": "Person", name: "Melitta Siomos" },
            publisher: {
              "@type": "Organization",
              name: "Pura Nights",
              logo: { "@type": "ImageObject", url: `${BASE}/og-image.jpg` },
            },
            datePublished,
            dateModified: datePublished,
            mainEntityOfPage: url,
            inLanguage: "en-GB",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
              { "@type": "ListItem", position: 3, name: title, item: url },
            ],
          },
        ]}
      />
      <ReadingProgressBar />

      {/* <!-- WIX PAGE: /blog/{slug} --> */}
      {/* <!-- WIX SECTION: Article Header --> */}
      <article>
        <section className="section-padding section-dark">
          <div className="container-main max-w-3xl">
            <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
              <Link to="/" className="hover:text-primary">Home</Link> /{" "}
              <Link to="/blog" className="hover:text-primary">Blog</Link> /{" "}
              <span className="text-primary">{category}</span>
            </nav>
            <FadeInUp>
              <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">
                {category}
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
                <span>By Melitta Siomos</span>
                <span>·</span>
                <span>{new Date(datePublished).toLocaleString("en-GB", { month: "short", year: "numeric" })}</span>
                <span>·</span>
                <span>{readTime}</span>
              </div>
              <SocialShareButtons title={title} path={path} />
            </FadeInUp>
          </div>
        </section>

        {/* <!-- WIX SECTION: Article Body --> */}
        <section className="section-padding section-warm">
          <div className="container-main max-w-3xl prose-custom">
            <AuthorCard />
            <FadeInUp>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{intro}</p>

              {sections.map((s, i) => (
                <div key={i}>
                  <h2 className="font-display text-2xl font-bold mt-10 mb-4">{s.h2}</h2>
                  <p className="text-muted-foreground mb-4 whitespace-pre-line">{s.body}</p>
                  {i === midpoint && (
                    <div className="my-8">
                      <BlogMoneyCTA variant={ctaVariant} />
                    </div>
                  )}
                </div>
              ))}

              {/* <!-- WIX SECTION: FAQ Accordion --> */}
              <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4 mb-8">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-card rounded-xl p-5">
                    <h3 className="font-heading font-bold text-sm mb-2">{f.q}</h3>
                    <p className="text-muted-foreground text-sm">{f.a}</p>
                  </div>
                ))}
              </div>

              <SocialShareButtons title={title} path={path} />
            </FadeInUp>
          </div>
        </section>

        {/* <!-- WIX SECTION: Related Posts --> */}
        <RelatedPages title="Keep reading" links={related.slice(0, 6)} />
      </article>
    </Layout>
  );
};

export default AuthorityBlogPost;
