// Single-instance Latin Friday events. Each entry produces a dedicated route
// at /events/:slug with a valid schema.org/Event JSON-LD (startDate + endDate).
// Recurring schedule pages (e.g. /pura-nights) MUST NOT emit Event schema —
// see scripts/check-event-schema.ts.

export interface SingleEvent {
  slug: string;
  name: string;
  startDate: string; // ISO 8601 with timezone offset
  endDate: string;   // ISO 8601 with timezone offset
  description: string;
  image: string;
  ticketUrl: string;
  price: string;     // decimal string (GBP)
  venue: {
    name: string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
  };
  performer: string;
  status: "EventScheduled" | "EventPostponed" | "EventCancelled";
}

const VENUE_DRAYTON = {
  name: "Drayton Court Hotel",
  streetAddress: "2 The Avenue",
  addressLocality: "London",
  postalCode: "W13 8PH",
};

// Helper: build ISO with London offset (GMT in winter, BST in summer).
// For static data we encode the correct offset per date.
const e = (
  slug: string,
  name: string,
  startDate: string,
  endDate: string,
  description: string
): SingleEvent => ({
  slug,
  name,
  startDate,
  endDate,
  description,
  image: "https://www.puranights.com/og-default.jpg",
  ticketUrl: "https://www.tickettailor.com/events/puranights",
  price: "15.00",
  venue: VENUE_DRAYTON,
  performer: "Pura Nights — Melitta Siomos Dance Academy",
  status: "EventScheduled",
});

export const upcomingEvents: SingleEvent[] = [
  e("latin-friday-2026-04-10", "Pura Nights Latin Friday — April 2026",
    "2026-04-10T19:15:00+01:00", "2026-04-10T23:45:00+01:00",
    "Monthly Latin Friday at Drayton Court Ealing — Salsa & Bachata workshops, Pura Ladies show and DJ social until late."),
  e("latin-friday-2026-05-08", "Pura Nights Latin Friday — May 2026",
    "2026-05-08T19:15:00+01:00", "2026-05-08T23:45:00+01:00",
    "Monthly Latin Friday at Drayton Court Ealing — Bachata workshops, performance and social dancing."),
  e("latin-friday-2026-06-12", "Pura Nights Latin Friday — June 2026",
    "2026-06-12T19:15:00+01:00", "2026-06-12T23:45:00+01:00",
    "Monthly Latin Friday at Drayton Court Ealing — Salsa & Bachata night with workshops and DJ."),
  e("latin-friday-2026-07-10", "Pura Nights Latin Friday — July 2026",
    "2026-07-10T19:15:00+01:00", "2026-07-10T23:45:00+01:00",
    "Monthly Latin Friday at Drayton Court Ealing — Salsa & Bachata workshops and social."),
  e("latin-friday-2026-09-11", "Pura Nights Latin Friday — September 2026",
    "2026-09-11T19:15:00+01:00", "2026-09-11T23:45:00+01:00",
    "Monthly Latin Friday at Drayton Court Ealing — Salsa & Bachata workshops and social."),
  e("latin-friday-2026-10-09", "Pura Nights Latin Friday — October 2026",
    "2026-10-09T19:15:00+01:00", "2026-10-09T23:45:00+01:00",
    "Monthly Latin Friday at Drayton Court Ealing — Salsa & Bachata workshops and social."),
  e("latin-friday-2026-11-13", "Pura Nights Latin Friday — November 2026",
    "2026-11-13T19:15:00+00:00", "2026-11-13T23:45:00+00:00",
    "Monthly Latin Friday at Drayton Court Ealing — Salsa & Bachata workshops and social."),
  e("latin-friday-2026-12-11", "Pura Nights Latin Friday — December 2026",
    "2026-12-11T19:15:00+00:00", "2026-12-11T23:45:00+00:00",
    "Monthly Latin Friday at Drayton Court Ealing — End-of-year Latin Friday with workshops and DJ."),
];

export function buildEventSchema(ev: SingleEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.name,
    startDate: ev.startDate,
    endDate: ev.endDate,
    eventStatus: `https://schema.org/${ev.status}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: ev.description,
    image: [ev.image],
    location: {
      "@type": "Place",
      name: ev.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: ev.venue.streetAddress,
        addressLocality: ev.venue.addressLocality,
        postalCode: ev.venue.postalCode,
        addressCountry: "GB",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Pura Nights — Melitta Siomos Dance Academy",
      url: "https://www.puranights.com",
    },
    performer: { "@type": "PerformingGroup", name: ev.performer },
    offers: {
      "@type": "Offer",
      url: ev.ticketUrl,
      price: ev.price,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
    },
    url: `https://www.puranights.com/events/${ev.slug}`,
  };
}
