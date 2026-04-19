import NewsletterSignup from "./NewsletterSignup";
import RelatedArticles from "./RelatedArticles";

interface Article {
  to: string;
  title: string;
  category?: string;
  readTime?: string;
}

/* <!-- WIX: Reusable footer block for blog dynamic pages — Newsletter + Related repeater --> */
const BlogPostFooter = ({ related }: { related: Article[] }) => (
  <div className="container-main max-w-3xl px-4 md:px-0">
    <NewsletterSignup />
    <RelatedArticles articles={related} />
  </div>
);

export default BlogPostFooter;
