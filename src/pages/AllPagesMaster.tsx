import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX PAGE: /all-pages-master -->
   <!-- WIX: Create as a standard Wix page with manual link lists -->
   <!-- WIX SECTION: Hero — Simple Strip with page title -->
   <!-- WIX SECTION: Page Directory — Structured link grid grouped by category -->
   <!-- WIX: This page acts as an HTML sitemap for crawlability and user navigation -->
*/

const sections = [
  {
    title: "Core Pages",
    links: [
      { to: "/", label: "Home — Salsa & Bachata Classes West London" },
      { to: "/about", label: "About Melitta Siomos" },
      { to: "/pura-nights", label: "Pura Nights — Weekly Classes" },
      { to: "/pura-ladies", label: "Pura Ladies Performance Team" },
      { to: "/prices", label: "Class Prices & Bundles" },
      { to: "/schedule", label: "Weekly Class Schedule" },
      { to: "/events", label: "Latin Dance Events" },
      { to: "/gallery", label: "Photo & Video Gallery" },
      { to: "/testimonials", label: "Student Reviews & Testimonials" },
      { to: "/community", label: "The Pura Nights Community" },
      { to: "/contact", label: "Contact Melitta" },
      { to: "/faq", label: "Frequently Asked Questions" },
      { to: "/start-here", label: "New to Dancing? Start Here" },
      { to: "/beginners", label: "Beginner Classes London" },
      { to: "/locations", label: "Class Locations" },
      { to: "/gift-vouchers", label: "Dance Gift Vouchers" },
      { to: "/blog", label: "Blog & Guides" },
      { to: "/proof-centre", label: "Proof Centre — Reviews & Awards" },
      { to: "/meet-the-team", label: "Meet the Teaching Team" },
    ],
  },
  {
    title: "Specialist Services",
    links: [
      { to: "/wedding-dance", label: "Wedding Dance Lessons" },
      { to: "/private-lessons", label: "Private Salsa & Bachata Lessons" },
      { to: "/online-salsa-bachata-coaching", label: "Online Coaching" },
    ],
  },
  {
    title: "Venue Guides",
    links: [
      { to: "/venue/the-george-iv-chiswick", label: "The George IV — Monday Classes, Chiswick" },
      { to: "/venue/the-drayton-court-ealing", label: "The Drayton Court Hotel — Tuesday Classes, Ealing" },
    ],
  },
  {
    title: "Find Classes by Area",
    links: [
      { to: "/salsa-classes-london", label: "Salsa Classes London" },
      { to: "/bachata-classes-london", label: "Bachata Classes London" },
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/bachata-classes-chiswick", label: "Bachata Classes Chiswick" },
      { to: "/salsa-classes-ealing", label: "Salsa Classes Ealing" },
      { to: "/bachata-classes-ealing", label: "Bachata Classes Ealing" },
      { to: "/salsa-classes-acton", label: "Salsa Classes Acton" },
      { to: "/dance-classes-ealing", label: "Dance Classes Ealing" },
      { to: "/dance-classes-chiswick", label: "Dance Classes Chiswick" },
      { to: "/dance-classes-west-london", label: "Dance Classes West London" },
      { to: "/dance-classes-south-west-london", label: "Dance Classes South West London" },
      { to: "/salsa-classes-south-west-london", label: "Salsa Classes South West London" },
      { to: "/bachata-classes-south-west-london", label: "Bachata Classes South West London" },
      { to: "/bachata-classes-west-london", label: "Bachata Classes West London" },
      { to: "/latin-dance-classes-london", label: "Latin Dance Classes London" },
      { to: "/wedding-dance-west-london", label: "Wedding Dance West London" },
      { to: "/wedding-dance-lessons-london", label: "Wedding Dance Lessons London" },
      { to: "/private-dance-lessons-west-london", label: "Private Dance Lessons West London" },
      { to: "/private-salsa-lessons-london", label: "Private Salsa Lessons London" },
      { to: "/ladies-styling-london", label: "Ladies Styling London" },
      { to: "/bachata-performance-team-london", label: "Bachata Performance Team London" },
      { to: "/salsa-classes-richmond", label: "Salsa Classes Richmond" },
      { to: "/salsa-classes-hammersmith", label: "Salsa Classes Hammersmith" },
      { to: "/dance-classes-hounslow", label: "Dance Classes Hounslow" },
      { to: "/latin-dance-ealing", label: "Latin Dance Ealing" },
      { to: "/latin-dance-chiswick", label: "Latin Dance Chiswick" },
    ],
  },
  {
    title: "Blog — Beginner Guides",
    links: [
      { to: "/blog/what-is-salsa", label: "What Is Salsa?" },
      { to: "/blog/what-is-bachata", label: "What Is Bachata?" },
      { to: "/blog/salsa-vs-bachata", label: "Salsa vs Bachata" },
      { to: "/blog/beginners-guide-salsa-london", label: "Beginner's Guide to Salsa in London" },
      { to: "/blog/first-salsa-class-london", label: "Your First Salsa Class" },
      { to: "/blog/salsa-no-partner", label: "Can I Learn Salsa Without a Partner?" },
      { to: "/blog/how-long-to-learn-salsa", label: "How Long Does It Take to Learn Salsa?" },
      { to: "/blog/bachata-for-beginners-london", label: "Bachata for Beginners London" },
      { to: "/blog/joining-dance-class-alone", label: "Joining a Dance Class Alone" },
    ],
  },
  {
    title: "Blog — Technique & Style",
    links: [
      { to: "/blog/salsa-on1-vs-on2", label: "Salsa On1 vs On2" },
      { to: "/blog/bachata-sensual-guide", label: "Bachata Sensual Guide" },
      { to: "/blog/ladies-styling-bachata", label: "Ladies Styling for Bachata" },
      { to: "/blog/lead-follow-salsa-bachata", label: "Lead & Follow Explained" },
      { to: "/blog/improve-social-dancing", label: "Improve Your Social Dancing" },
      { to: "/blog/salsa-musicality-guide", label: "Salsa Musicality Guide" },
      { to: "/blog/how-to-practice-salsa-at-home", label: "How to Practice Salsa at Home" },
    ],
  },
  {
    title: "Blog — Wedding Dance",
    links: [
      { to: "/blog/wedding-first-dance-tips", label: "Wedding First Dance Tips" },
      { to: "/blog/choose-wedding-first-dance-song", label: "How to Choose Your Wedding Song" },
      { to: "/blog/salsa-vs-waltz-wedding", label: "Salsa vs Waltz for Weddings" },
      { to: "/blog/how-many-wedding-dance-lessons", label: "How Many Wedding Dance Lessons?" },
      { to: "/blog/last-minute-wedding-dance", label: "Last-Minute Wedding Dance" },
    ],
  },
  {
    title: "Blog — Local Guides",
    links: [
      { to: "/blog/best-areas-west-london", label: "Best Areas for Dance in West London" },
      { to: "/blog/salsa-classes-near-chiswick", label: "Salsa Classes Near Chiswick" },
      { to: "/blog/bachata-classes-near-ealing", label: "Bachata Classes Near Ealing" },
      { to: "/blog/dance-classes-acton-adults", label: "Dance Classes in Acton for Adults" },
      { to: "/blog/west-london-latin-dance-guide", label: "West London Latin Dance Guide" },
      { to: "/blog/salsa-south-west-london", label: "Salsa in South West London" },
      { to: "/blog/salsa-classes-near-turnham-green", label: "Salsa Near Turnham Green" },
      { to: "/blog/dance-classes-west-london-guide", label: "Dance Classes West London Guide" },
    ],
  },
  {
    title: "Blog — Culture, Events & Lifestyle",
    links: [
      { to: "/blog/history-of-salsa", label: "History of Salsa" },
      { to: "/blog/history-of-bachata", label: "History of Bachata" },
      { to: "/blog/pura-ladies-story", label: "The Pura Ladies Story" },
      { to: "/blog/best-salsa-nights-west-london", label: "Best Salsa Nights in West London" },
      { to: "/blog/latin-dance-events-ealing-2026", label: "Latin Dance Events Ealing 2026" },
      { to: "/blog/pura-nights-latin-friday-guide", label: "Pura Nights Latin Friday Guide" },
      { to: "/blog/hen-party-dance-ideas-london", label: "Hen Party Dance Ideas" },
      { to: "/blog/corporate-team-building-dance-london", label: "Corporate Team Building Dance" },
      { to: "/blog/gift-voucher-dance-class-london", label: "Dance Class Gift Voucher Guide" },
      { to: "/blog/new-year-start-salsa-london", label: "New Year — Start Salsa" },
      { to: "/blog/latin-dance-fitness-benefits", label: "Latin Dance Fitness Benefits" },
      { to: "/blog/what-to-wear-salsa-bachata", label: "What to Wear to Salsa & Bachata" },
      { to: "/blog/salsa-shoes-guide", label: "Salsa Shoes Guide" },
    ],
  },
];

const AllPagesMaster = () => (
  <Layout>
    <SeoHead
      title="All Pages — Pura Nights Salsa & Bachata London"
      description="Complete directory of every page on the Pura Nights website. Find classes, guides, venue information, blog posts, and more — all in one place."
      path="/all-pages-master"
    />

    <section className="section-padding section-dark">
      <div className="container-main text-center">
        <FadeInUp>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            All Pages — Complete Site Directory
          </h1>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto font-heading text-sm">
            Every page on the Pura Nights website in one place. Use this directory to find exactly what you're looking for — from class schedules and pricing to blog guides and venue details.
          </p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <StaggerContainer className="space-y-12" staggerDelay={0.08}>
          {sections.map((section) => (
            <StaggerItem key={section.title}>
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4 border-b border-border pb-2">
                {section.title}
              </h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm font-heading text-foreground hover:text-primary transition-colors inline-flex items-start gap-1.5 py-1"
                    >
                      <span className="text-primary mt-0.5">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <section className="py-12 text-center" style={{ background: "var(--gradient-gold)" }}>
      <div className="container-main">
        <h2 className="font-display text-2xl font-bold text-charcoal mb-2">Can't Find What You're Looking For?</h2>
        <p className="text-charcoal/70 text-sm font-heading mb-6">Get in touch — Melitta responds personally to every message.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-cta-dark text-sm">Contact Us</Link>
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">WhatsApp Melitta</a>
        </div>
      </div>
    </section>
  </Layout>
);

export default AllPagesMaster;
