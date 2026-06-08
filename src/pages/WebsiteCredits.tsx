import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const RML = "https://rankmylocal.co.uk/";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Website Credits — Pura Nights",
  description:
    "Design, SEO structure and launch support for the Pura Nights website. Built with support from Rank My Local.",
  url: "https://www.puranights.com/website-credits",
  isPartOf: {
    "@type": "WebSite",
    name: "Pura Nights — Melitta Siomos Dance Academy",
    url: "https://www.puranights.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Melitta Siomos Dance Academy",
    url: "https://www.puranights.com",
  },
  mentions: {
    "@type": "Organization",
    name: "Rank My Local",
    url: RML,
  },
};

/* <!-- WIX SECTION: Website Credits — transparency + backlink page.
       Replicate as a single Strip with hero, credit card, technical note and 3 CTAs. --> */
const WebsiteCredits = () => (
  <Layout>
    <SeoHead
      title="Website Credits | Pura Nights"
      description="Design, SEO structure and launch support for the Pura Nights website — built with support from Rank My Local."
      path="/website-credits"
      schema={schema}
    />

    <section className="section-padding bg-background">
      <div className="container-main max-w-3xl">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">
          Transparency
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Website Credits</h1>
        <p className="text-lg md:text-xl text-muted-foreground font-heading mb-10">
          Design, SEO structure and launch support for Pura Nights.
        </p>

        <div className="prose max-w-none text-muted-foreground space-y-5 text-base leading-relaxed">
          <p>
            This website was created to help students, wedding couples, corporate teams, venues
            and partners discover Pura Nights more easily across Google, AI search tools and
            local discovery platforms.
          </p>
        </div>

        {/* Credit card */}
        <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-secondary mb-2">
            Credits
          </p>
          <h2 className="font-display text-2xl font-bold mb-3">
            Website design, SEO structure and launch support
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-5">
            Delivered in partnership with{" "}
            <a
              href={RML}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Rank My Local website"
              className="text-primary font-semibold hover:underline"
            >
              Rank My Local
            </a>
            {" "}— specialists in website design and local SEO. Content, instruction, brand
            and creative direction remain owned by Melitta Siomos Dance Academy.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-6">
            <li>• Website design</li>
            <li>• SEO structure</li>
            <li>• Local search architecture</li>
            <li>• Wix migration support</li>
            <li>• Conversion-focused UX</li>
            <li>• Structured data & schema</li>
          </ul>
          <a
            href={RML}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Rank My Local website"
            className="btn-cta-primary text-sm inline-flex"
          >
            Visit Rank My Local →
          </a>
        </div>

        {/* Technical note */}
        <div className="mt-8 text-sm text-muted-foreground border-l-2 border-primary/40 pl-4">
          Built with a focus on clear navigation, local SEO, structured data, conversion
          journeys and Wix-ready content management.
        </div>

        {/* CTAs back to Pura Nights */}
        <div className="mt-12 grid sm:grid-cols-3 gap-3">
          <Link to="/pura-nights" className="btn-cta-primary text-sm text-center">
            Explore classes →
          </Link>
          <Link to="/start-here" className="btn-cta-secondary text-sm text-center">
            Book your first class →
          </Link>
          <Link to="/partner-with-pura-nights" className="btn-cta-secondary text-sm text-center">
            Partner with Pura Nights →
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default WebsiteCredits;
