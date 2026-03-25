import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  schema?: object;
}

const globalSchema = {
  "@context": "https://schema.org",
  "@type": ["DanceSchool", "LocalBusiness"],
  name: "Melitta Siomos Dance Academy",
  alternateName: ["Pura Nights", "Pura Nights London", "Pura Ladies"],
  description: "Award-winning Salsa and Bachata dance school in West London. Weekly classes in Chiswick and Ealing, private lessons, Pura Ladies performance teams, and wedding dance choreography.",
  url: "https://www.melittasiomos.com",
  telephone: "+447449482343",
  email: "siomosmelitta@gmail.com",
  address: { "@type": "PostalAddress", streetAddress: "Acton", addressLocality: "West London", addressRegion: "London", postalCode: "W3", addressCountry: "GB" },
  geo: { "@type": "GeoCoordinates", latitude: "51.5074", longitude: "-0.2634" },
  openingHours: ["Mo 19:15-23:00", "Tu 19:15-23:00"],
  priceRange: "££",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "50", bestRating: "5" },
  founder: { "@type": "Person", name: "Melitta Siomos", jobTitle: "Professional Dance Instructor & Choreographer", description: "Bachata UK Champion with 15+ years of teaching experience" },
  areaServed: ["Chiswick", "Ealing", "Acton", "Covent Garden", "West London", "Central London", "London"],
  award: "Bachata UK Champion",
};

const SeoHead = ({ title, description, path, schema }: SeoHeadProps) => {
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
    setMeta("og:url", `https://www.melittasiomos.com${path}`, "property");
    setMeta("og:type", "website", "property");

    // Inject JSON-LD
    let scriptEl = document.getElementById("schema-global");
    if (!scriptEl) { scriptEl = document.createElement("script"); scriptEl.id = "schema-global"; scriptEl.setAttribute("type", "application/ld+json"); document.head.appendChild(scriptEl); }
    scriptEl.textContent = JSON.stringify(schema || globalSchema);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", `https://www.melittasiomos.com${path}`);
  }, [title, description, path, schema]);

  return null;
};

export default SeoHead;
