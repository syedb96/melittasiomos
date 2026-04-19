/* Single-source-of-truth blueprint for the v5.0 Pura Nights site.
   Used by /admin/blueprint, /admin/site-docs, and stored as a backup
   in the Supabase site_settings table under key = "site_blueprint_v5". */

export const siteBlueprint = {
  version: "5.0",
  brand: "Pura Nights / Melitta Siomos",
  domains: ["puranights.com", "melittasiomos.lovable.app"],
  generatedAt: new Date().toISOString(),

  pages: [
    { url: "/", title: "Home — Pura Nights", template: "static", priority: 1.0 },
    { url: "/about", title: "About Melitta Siomos", template: "static", priority: 0.8 },
    { url: "/pura-nights", title: "Pura Nights — Weekly Classes", template: "static", priority: 0.9 },
    { url: "/pura-ladies", title: "Pura Ladies Performance Team", template: "static", priority: 0.8 },
    { url: "/prices", title: "Prices & Bundles", template: "static", priority: 0.9 },
    { url: "/bookings", title: "Bookings (Linktree)", template: "redirect", priority: 0.7 },
    { url: "/contact", title: "Contact", template: "static-form", priority: 0.7 },
    { url: "/faq", title: "FAQ", template: "static", priority: 0.6 },
    { url: "/blog", title: "Blog Index", template: "blog-index", priority: 0.8 },
    { url: "/learn/salsa-bachata-guide", title: "Pillar: Complete West London Guide", template: "pillar", priority: 0.9 },
    { url: "/events", title: "Events / Latin Friday", template: "cms-events", priority: 0.8 },
    { url: "/gallery", title: "Gallery", template: "cms-gallery", priority: 0.6 },
    { url: "/wedding-dance", title: "Wedding Dance Lessons", template: "service", priority: 0.9 },
    { url: "/private-lessons", title: "Private Lessons", template: "service", priority: 0.8 },
    { url: "/gift-vouchers", title: "Gift Vouchers", template: "service", priority: 0.6 },
    { url: "/online-classes", title: "Online Classes", template: "service", priority: 0.6 },
    { url: "/testimonials", title: "Testimonials", template: "cms-testimonials", priority: 0.7 },
    { url: "/proof-centre", title: "Proof Centre — Trust Hub", template: "hub", priority: 0.8 },
    { url: "/meet-the-team", title: "Meet the Team", template: "cms-team", priority: 0.7 },
    { url: "/start-here", title: "Start Here", template: "guide", priority: 0.9 },
    { url: "/schedule", title: "Weekly Schedule", template: "static", priority: 0.8 },
    { url: "/locations", title: "All Locations", template: "static", priority: 0.7 },
    { url: "/community", title: "Community", template: "static", priority: 0.5 },
    // Local SEO
    { url: "/salsa-classes-london", title: "Salsa Classes London", template: "local", priority: 0.9 },
    { url: "/bachata-classes-london", title: "Bachata Classes London", template: "local", priority: 0.9 },
    { url: "/salsa-classes-chiswick", title: "Salsa Classes Chiswick", template: "local", priority: 0.9 },
    { url: "/salsa-classes-ealing", title: "Salsa Classes Ealing", template: "local", priority: 0.9 },
    { url: "/salsa-classes-richmond", title: "Salsa Classes Richmond", template: "local", priority: 0.8 },
    { url: "/salsa-classes-hammersmith", title: "Salsa Classes Hammersmith", template: "local", priority: 0.8 },
    { url: "/salsa-classes-acton", title: "Salsa Classes Acton", template: "local", priority: 0.8 },
    { url: "/salsa-classes-south-west-london", title: "Salsa Classes SW London", template: "local", priority: 0.8 },
    { url: "/bachata-classes-chiswick", title: "Bachata Classes Chiswick", template: "local", priority: 0.9 },
    { url: "/bachata-classes-ealing", title: "Bachata Classes Ealing", template: "local", priority: 0.9 },
    { url: "/bachata-classes-west-london", title: "Bachata Classes West London", template: "local", priority: 0.8 },
    { url: "/bachata-classes-south-west-london", title: "Bachata Classes SW London", template: "local", priority: 0.7 },
    { url: "/dance-classes-chiswick", title: "Dance Classes Chiswick", template: "local", priority: 0.8 },
    { url: "/dance-classes-ealing", title: "Dance Classes Ealing", template: "local", priority: 0.8 },
    { url: "/dance-classes-west-london", title: "Dance Classes West London", template: "local", priority: 0.8 },
    { url: "/dance-classes-south-west-london", title: "Dance Classes SW London", template: "local", priority: 0.7 },
    { url: "/dance-classes-hounslow", title: "Dance Classes Hounslow", template: "local", priority: 0.7 },
    { url: "/latin-dance-ealing", title: "Latin Dance Ealing", template: "local", priority: 0.8 },
    { url: "/latin-dance-chiswick", title: "Latin Dance Chiswick", template: "local", priority: 0.8 },
    { url: "/latin-dance-classes-london", title: "Latin Dance Classes London", template: "local", priority: 0.8 },
    { url: "/wedding-dance-west-london", title: "Wedding Dance West London", template: "local-service", priority: 0.8 },
    { url: "/wedding-dance-lessons-london", title: "Wedding Dance Lessons London", template: "local-service", priority: 0.8 },
    { url: "/private-dance-lessons-west-london", title: "Private Lessons West London", template: "local-service", priority: 0.7 },
    { url: "/private-salsa-lessons-london", title: "Private Salsa Lessons London", template: "local-service", priority: 0.7 },
    { url: "/ladies-styling-london", title: "Ladies Styling London", template: "local-service", priority: 0.7 },
    { url: "/bachata-performance-team-london", title: "Bachata Performance Team", template: "local-service", priority: 0.7 },
    { url: "/online-salsa-bachata-coaching", title: "Online Coaching", template: "service", priority: 0.6 },
    { url: "/beginners", title: "Beginners Hub", template: "guide", priority: 0.8 },
    { url: "/venue/the-george-iv-chiswick", title: "Venue: George IV Chiswick", template: "venue", priority: 0.7 },
    { url: "/venue/the-drayton-court-ealing", title: "Venue: Drayton Court Ealing", template: "venue", priority: 0.7 },
  ],

  cmsCollections: {
    BlogPosts: ["slug", "title", "category", "author", "datePublished", "dateModified", "excerpt", "body", "coverImage", "readTime", "tags"],
    TeamMembers: ["slug", "name", "roleTitle", "shortBio", "fullBio", "profileImage", "instagramUrl", "specialties", "sortOrder", "isPublished"],
    Testimonials: ["personName", "contextLabel", "quote", "rating", "image", "sourceType", "sourceUrl", "isFeatured", "isPublished"],
    Events: ["slug", "title", "startDatetime", "endDatetime", "venueName", "venueAddress", "summary", "body", "ticketUrl", "coverImage", "isFeatured", "isPublished"],
    Locations: ["slug", "areaName", "primaryClassUrl", "transportNotes", "introCopy", "faqJson"],
    FAQs: ["question", "answer", "category", "sortOrder", "isPublished"],
  },

  dynamicPages: [
    { pattern: "/blog/[slug]", collection: "BlogPosts", wixType: "Wix Blog (native)" },
    { pattern: "/learn/[slug]", collection: "BlogPosts (filtered: pillar)", wixType: "Wix Dynamic Page" },
    { pattern: "/venue/[slug]", collection: "Locations", wixType: "Wix Dynamic Page" },
    { pattern: "/events/[slug]", collection: "Events", wixType: "Wix Dynamic Page" },
  ],

  colors: {
    charcoal: "#151515",
    "charcoal-light": "#1f1f1f",
    cream: "#F5EFE6",
    burntTerracotta: "#CF6A3D",
    gold: "#C9A86A",
    white: "#FFFFFF",
    muted: "#8A8A8A",
    border: "#E5DFD3",
  },

  fonts: {
    display: { lovable: "Playfair Display", wixEquivalent: "Playfair Display (Google Fonts)" },
    heading: { lovable: "Poppins", wixEquivalent: "Poppins (Google Fonts)" },
    accent: { lovable: "Montserrat (uppercase tracked)", wixEquivalent: "Montserrat (Google Fonts)" },
    body: { lovable: "Poppins", wixEquivalent: "Poppins (Google Fonts)" },
  },

  components: [
    { name: "Header / Nav", wixWidget: "Wix Header + Mega Menu" },
    { name: "Footer", wixWidget: "Wix Footer + Linked Sections" },
    { name: "Hero", wixWidget: "Wix Strip + Background Video/Image" },
    { name: "Card / Service Card", wixWidget: "Wix Pro Gallery or Repeater" },
    { name: "Review / Testimonial", wixWidget: "Wix Repeater + Testimonials Collection" },
    { name: "FAQ Accordion", wixWidget: "Wix Accordion (native)" },
    { name: "Pricing Table", wixWidget: "Wix Pricing Plans app" },
    { name: "Booking CTA", wixWidget: "Wix Bookings or external Linktree iframe" },
    { name: "Event Calendar", wixWidget: "Wix Events app" },
    { name: "Newsletter Signup", wixWidget: "Wix Forms + Mailchimp connector" },
    { name: "Live Student Counter", wixWidget: "Wix Velo custom code" },
    { name: "Bundle Calculator", wixWidget: "Wix Velo custom code" },
    { name: "Video Testimonials", wixWidget: "Wix Video / YouTube embeds in Repeater" },
  ],

  phases: [
    { phase: 1, label: "Core revenue pages", scope: ["/", "/pura-nights", "/prices", "/contact", "/start-here"] },
    { phase: 2, label: "Local SEO + Blog", scope: ["all /salsa-classes-*", "all /bachata-classes-*", "/learn/salsa-bachata-guide", "all /blog/*"] },
    { phase: 3, label: "Trust + team + services", scope: ["/proof-centre", "/meet-the-team", "/wedding-dance", "/private-lessons", "/testimonials"] },
    { phase: 4, label: "Advanced SEO + integrations", scope: ["schema.org JSON-LD", "Mailchimp", "Linktree", "Google Business sync", "Wix Bookings"] },
  ],

  designSystem: {
    radius: { sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.25rem", "2xl": "1.5rem" },
    spacingScale: ["0.25rem", "0.5rem", "0.75rem", "1rem", "1.5rem", "2rem", "3rem", "4rem", "6rem"],
    breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
    typography: {
      h1: "Playfair Display, 3xl–6xl, font-bold",
      h2: "Playfair Display, 2xl–3xl, font-bold",
      body: "Poppins, base, leading-relaxed",
      accent: "Montserrat, 10px, tracking-[0.25em], uppercase",
    },
  },

  seo: {
    canonicalRoot: "https://puranights.com",
    hreflang: "en-GB",
    schemaTypes: ["LocalBusiness", "Article", "FAQPage", "Course", "BreadcrumbList", "AggregateRating", "Review", "VideoObject", "HowTo"],
    sitemapUrl: "/sitemap.xml",
    robotsRules: ["Allow: /", "Disallow: /admin", "Disallow: /login"],
  },

  contentInventory: {
    primaryCTA: "Book Your First Class — £10",
    secondaryCTA: "WhatsApp Melitta",
    avgWordCount: { homepage: 1100, classPages: 850, blog: 1200, pillar: 2050 },
  },

  changelog: [
    { version: "v1", scope: "Initial site, brand, weekly classes pages, blog seed (10 posts)" },
    { version: "v2", scope: "Local SEO pages (Chiswick, Ealing, SW London), wedding/private services, testimonials" },
    { version: "v3", scope: "Supabase backend, /admin CMS for gallery/team/events, ProofCentre, MeetTheTeam, blog → 30 posts" },
    { version: "v4", scope: "Schema layers (LocalBusiness, FAQPage, Course), AggregateRating, LastUpdated, BlogCTA expansion" },
    { version: "v5", scope: "ServiceArea schema, 5 new local pages, BundleCalculator, LiveStudentCounter, VideoTestimonials, PressLogos, /learn pillar guide, /admin/blueprint, /admin/site-docs, full DB blueprint backup" },
  ],

  remainingWork: [
    { item: "Wire BlogPostFooter into all 42 blog posts", priority: "medium" },
    { item: "Stripe Checkout / Bookwhen integration (currently Linktree)", priority: "high" },
    { item: "Mailchimp form action wiring (currently placeholder)", priority: "medium" },
    { item: "Real YouTube video IDs in VideoTestimonials", priority: "medium" },
    { item: "Replace placeholder press logos with real PNGs", priority: "low" },
    { item: "Generate dynamic sitemap edge function", priority: "medium" },
  ],
};

export type SiteBlueprint = typeof siteBlueprint;
