import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const popularPages = [
  { to: "/pura-nights", label: "Weekly Classes", desc: "Salsa & Bachata Mon & Tue" },
  { to: "/prices", label: "Prices & Packages", desc: "Drop-in from £10" },
  { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance coaching" },
  { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 sessions" },
  { to: "/blog", label: "Blog & Guides", desc: "Tips for dancers" },
  { to: "/contact", label: "Contact Melitta", desc: "Get in touch" },
];

const NotFound = () => (
  <Layout>
    <SeoHead title="Page Not Found | Pura Nights" description="The page you're looking for doesn't exist. Browse our salsa and bachata classes, wedding dance lessons, and more." path="/404" />
    <section className="section-padding text-center min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <div className="text-6xl mb-4">💃</div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary mb-3">404</h1>
        <p className="font-heading text-xl mb-2">Oops! This page doesn't exist.</p>
        <p className="text-muted-foreground mb-8">Looks like you took a wrong turn on the dance floor! Let's get you back on track.</p>
        
        <div className="flex gap-4 justify-center mb-12">
          <Link to="/" className="btn-cta-primary text-sm">Back to Home</Link>
          <Link to="/pura-nights" className="btn-cta-dark text-sm">View Classes</Link>
        </div>

        <div className="text-left">
          <h2 className="font-heading font-semibold text-sm text-muted-foreground mb-4 text-center">Popular Pages</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {popularPages.map((page) => (
              <Link key={page.to} to={page.to} className="bg-card rounded-xl p-4 card-hover flex flex-col">
                <span className="font-heading font-semibold text-sm">{page.label}</span>
                <span className="text-muted-foreground text-xs">{page.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFound;
