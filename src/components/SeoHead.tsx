import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  schema?: object;
  breadcrumbs?: BreadcrumbItem[];
  dateModified?: string; // ISO date e.g. "2026-04-13"
  ogImage?: string;
  noindex?: boolean;
}

const DEFAULT_OG_IMAGE = "https://www.puranights.com/og-default.jpg";

const SERVICE_AREAS = [
  "Chiswick", "Ealing", "West Ealing", "Acton", "Hammersmith", "Shepherd's Bush",
  "Notting Hill", "Brentford", "Kew", "Richmond", "Twickenham", "Isleworth",
  "Hounslow", "Southall", "Greenford", "Northolt", "Hayes", "Feltham",
  "Putney", "Fulham", "Barnes", "Mortlake", "Turnham Green", "Gunnersbury",
  "Wimbledon", "Earlsfield", "Clapham Junction", "Hampton", "Teddington",
  "St Margarets", "Strand-on-the-Green", "Hanwell", "West London", "South West London", "London",
];

const REVIEWS = [
  { author: "Sarah M.", brand: "Pura Nights", text: "Best Salsa & Bachata classes in West London. Welcoming, professional, and so much fun every Monday in Chiswick." },
  { author: "Sofia & Patrizio", brand: "Wedding Dance Made Easy", text: "Melitta choreographed our wedding first dance. Our guests gave us a standing ovation. We'll never forget it." },
  { author: "Aisha T.", brand: "Pura Ladies", text: "Pura Ladies has changed my confidence. Not just on the dance floor — in everything. World-class team." },
  { author: "Mark H.", brand: "Melitta Siomos Dance Academy", text: "One private lesson with Melitta was worth more than a month of group classes. She's an exceptional teacher." },
];

const globalSchema = {
  "@context": "https://schema.org",
  "@type": ["DanceSchool", "LocalBusiness"],
  name: "Pura Nights — Melitta Siomos Dance Academy",
  alternateName: ["Pura Nights", "Pura Nights London", "Pura Ladies", "Wedding Dance Made Easy"],
  description: "Award-winning Salsa and Bachata dance school in West London. Weekly classes in Chiswick and Ealing. Private lessons, wedding dance, and Pura Ladies performance team.",
  url: "https://www.puranights.com",
  telephone: "+447449482343",
  email: "siomosmelitta@gmail.com",
  address: [
    { "@type": "PostalAddress", streetAddress: "185 Chiswick High Rd", addressLocality: "Chiswick", addressRegion: "London", postalCode: "W4 2DR", addressCountry: "GB" },
    { "@type": "PostalAddress", streetAddress: "2 The Avenue", addressLocality: "West Ealing", addressRegion: "London", postalCode: "W13 8PH", addressCountry: "GB" },
  ],
  geo: { "@type": "GeoCoordinates", latitude: "51.4926", longitude: "-0.2583" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "19:30", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "18:50", closes: "23:00" },
  ],
  priceRange: "£5–£120",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  review: REVIEWS.map(r => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    publisher: { "@type": "Organization", name: r.brand },
    reviewBody: r.text,
  })),
  areaServed: SERVICE_AREAS.map(a => ({ "@type": "Place", name: a })),
  serviceArea: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: "51.4926", longitude: "-0.2583" }, geoRadius: "15000" },
  sameAs: [
    "https://www.instagram.com/melittasiomos/",
    "https://www.instagram.com/puranights.salsabachata/",
    "https://www.instagram.com/puraladies/",
    "https://www.instagram.com/wedding_dance_made_easy/",
    "https://www.facebook.com/puranightslondon/",
    "https://www.youtube.com/@melittasiomos",
  ],
  founder: { "@type": "Person", name: "Melitta Siomos", jobTitle: "Award-Winning Salsa & Bachata Dance Instructor" },
  award: "Bachata UK Champion",
};

function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://www.puranights.com${item.path}`,
    })),
  };
}

function getAutoBreadcrumbs(path: string, title: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ name: "Home", path: "/" }];
  if (path === "/") return crumbs;
  if (path.startsWith("/blog/")) {
    crumbs.push({ name: "Blog", path: "/blog" });
    crumbs.push({ name: title.split(" | ")[0].split(" — ")[0], path });
    return crumbs;
  }
  if (path.startsWith("/venue/")) {
    crumbs.push({ name: "Locations", path: "/locations" });
    crumbs.push({ name: title.split(" | ")[0].split(" — ")[0], path });
    return crumbs;
  }
  if (path.startsWith("/learn/")) {
    crumbs.push({ name: "Learn", path: "/learn/salsa-bachata-guide" });
    crumbs.push({ name: title.split(" | ")[0].split(" — ")[0], path });
    return crumbs;
  }
  if (path.startsWith("/admin")) return crumbs;
  crumbs.push({ name: title.split(" | ")[0].split(" — ")[0], path });
  return crumbs;
}

const SeoHead = ({ title, description, path, schema, breadcrumbs, dateModified, ogImage, noindex }: SeoHeadProps) => {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const setLink = (rel: string, href: string, extraAttr?: { name: string; value: string }) => {
      const selector = extraAttr ? `link[rel="${rel}"][${extraAttr.name}="${extraAttr.value}"]` : `link[rel="${rel}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        if (extraAttr) el.setAttribute(extraAttr.name, extraAttr.value);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    const url = `https://www.puranights.com${path}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    setMeta("description", description);
    setMeta("robots", noindex ? "noindex,follow" : "index,follow");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", path.startsWith("/blog/") ? "article" : "website", "property");
    setMeta("og:image", image, "property");
    setMeta("og:site_name", "Pura Nights — Melitta Siomos Dance Academy", "property");
    setMeta("og:locale", "en_GB", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    if (dateModified) setMeta("article:modified_time", dateModified, "property");

    // Canonical (strip trailing slash variants)
    setLink("canonical", url);
    // hreflang en-GB + x-default
    setLink("alternate", url, { name: "hreflang", value: "en-GB" });
    setLink("alternate", url, { name: "hreflang", value: "x-default" });

    // JSON-LD: page/global schema
    let scriptEl = document.getElementById("schema-global");
    if (!scriptEl) { scriptEl = document.createElement("script"); scriptEl.id = "schema-global"; scriptEl.setAttribute("type", "application/ld+json"); document.head.appendChild(scriptEl); }
    scriptEl.textContent = JSON.stringify(schema || globalSchema);

    // JSON-LD: BreadcrumbList
    const bc = breadcrumbs || getAutoBreadcrumbs(path, title);
    if (bc.length > 1) {
      let bcScript = document.getElementById("schema-breadcrumb");
      if (!bcScript) { bcScript = document.createElement("script"); bcScript.id = "schema-breadcrumb"; bcScript.setAttribute("type", "application/ld+json"); document.head.appendChild(bcScript); }
      bcScript.textContent = JSON.stringify(buildBreadcrumbSchema(bc));
    }

    // <html lang="en-GB">
    document.documentElement.setAttribute("lang", "en-GB");
  }, [title, description, path, schema, breadcrumbs, dateModified, ogImage, noindex]);

  return null;
};

export default SeoHead;
