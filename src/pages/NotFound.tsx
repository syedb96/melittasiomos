import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => (
  <Layout>
    <section className="section-padding text-center min-h-[60vh] flex items-center justify-center">
      <div>
        <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
        <p className="font-heading text-xl mb-2">Oops! This page doesn't exist.</p>
        <p className="text-muted-foreground mb-8">Looks like you took a wrong turn on the dance floor!</p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-cta-primary text-sm">Back to Home</Link>
          <Link to="/pura-nights" className="btn-cta-dark text-sm">View Classes</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFound;
