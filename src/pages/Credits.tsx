import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const Credits = () => (
  <Layout>
    <SeoHead
      title="Website Credits & Design | Pura Nights"
      description="Website design and build credits for Pura Nights. Built by Rank My Local — specialist website designers and SEO experts for West London businesses."
      path="/credits"
    />
    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-8">Website Credits</h1>
        <div className="prose max-w-none text-muted-foreground space-y-6 text-sm">
          <p>
            This website was designed, built and is maintained by{" "}
            <a
              href="https://www.rankmylocal.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Rank My Local
            </a>
            , a specialist website design and local SEO agency based in West London.
          </p>

          <h2 className="font-display text-xl font-bold text-foreground">Design & Development</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Brand identity, visual design and UX — Rank My Local</li>
            <li>Front-end development — React, Vite, Tailwind CSS</li>
            <li>SEO strategy, structured data and search optimisation — Rank My Local</li>
            <li>Hosting and deployment management — Rank My Local</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-foreground">Content & Photography</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>All class content, curriculum and instruction — Melitta Siomos Dance Academy</li>
            <li>Photography and video — Melitta Siomos &amp; community contributors</li>
            <li>Copywriting and editorial direction — Melitta Siomos with Rank My Local</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-foreground">Third-Party Services</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Booking &amp; ticketing — Ticket Tailor</li>
            <li>Newsletter &amp; email marketing — Mailchimp</li>
            <li>Video hosting — YouTube</li>
            <li>Social media — Instagram, Facebook</li>
            <li>Analytics — Google Analytics</li>
          </ul>

          <p className="text-xs text-muted-foreground/70 pt-4 border-t border-border">
            <strong>Need a website for your local business?</strong>{" "}
            <a
              href="https://www.rankmylocal.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Contact Rank My Local
            </a>{" "}
            for website design, local SEO and digital marketing in West London.
          </p>

          <p className="text-xs text-muted-foreground/70">
            <Link to="/" className="text-primary hover:underline">← Back to home</Link>
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Credits;
