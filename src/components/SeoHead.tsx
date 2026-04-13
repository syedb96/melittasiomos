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
}

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
  sameAs: [
    "https://www.instagram.com/melittasiomos/",
    "https://www.instagram.com/puranights.salsabachata/",
    "https://www.instagram.com/puraladies/",
    "https://www.instagram.com/wedding_dance_made_easy/",
    "https://www.facebook.com/puranights/",
    "https://www.youtube.com/@melittasiomos",
  ],
  founder: { "@type": "Person", name: "Melitta Siomos", jobTitle: "Award-Winning Salsa & Bachata Dance Instructor" },
  areaServed: ["Chiswick", "Ealing", "Acton", "West Ealing", "Hammersmith", "Shepherd's Bush", "Brentford", "Kew", "Richmond", "West London", "Central London", "London"],
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

  // Blog posts
  if (path.startsWith("/blog/")) {
    crumbs.push({ name: "Blog", path: "/blog" });
    crumbs.push({ name: title.split(" | ")[0].split(" — ")[0], path });
    return crumbs;
  }

  // Venue pages
  if (path.startsWith("/venue/")) {
    crumbs.push({ name: "Locations", path: "/locations" });
    crumbs.push({ name: title.split(" | ")[0].split(" — ")[0], path });
    return crumbs;
  }

  // Admin pages — skip breadcrumbs
  if (path.startsWith("/admin")) return crumbs;

  // All other pages
  crumbs.push({ name: title.split(" | ")[0].split(" — ")[0], path });
  return crumbs;
}

const SeoHead = ({ title, description, path, schema, breadcrumbs }: SeoHeadProps) => {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `https://www.puranights.com${path}`, "property");
    setMeta("og:type", "website", "property");

    // Inject primary JSON-LD
    let scriptEl = document.getElementById("schema-global");
    if (!scriptEl) { scriptEl = document.createElement("script"); scriptEl.id = "schema-global"; scriptEl.setAttribute("type", "application/ld+json"); document.head.appendChild(scriptEl); }
    scriptEl.textContent = JSON.stringify(schema || globalSchema);

    // Inject BreadcrumbList JSON-LD
    const bc = breadcrumbs || getAutoBreadcrumbs(path, title);
    if (bc.length > 1) {
      let bcScript = document.getElementById("schema-breadcrumb");
      if (!bcScript) { bcScript = document.createElement("script"); bcScript.id = "schema-breadcrumb"; bcScript.setAttribute("type", "application/ld+json"); document.head.appendChild(bcScript); }
      bcScript.textContent = JSON.stringify(buildBreadcrumbSchema(bc));
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", `https://www.puranights.com${path}`);
  }, [title, description, path, schema, breadcrumbs]);

  return null;
};

export default SeoHead;
