/* Single source of truth for the Near-Me Grid component.
   Used on flagship local + venue pages. Mirror this in Wix as a
   "Neighbourhoods" collection filtered per page by venueKey. */

import type { NearMeArea } from "@/components/NearMeGrid";

export const CHISWICK_NEAR: NearMeArea[] = [
  { slug: "salsa-classes-acton", name: "Acton", postcode: "W3", distance: "1.6 mi · 8 min drive", venue: "Chiswick" },
  { slug: "salsa-classes-hammersmith", name: "Hammersmith", postcode: "W6", distance: "1.4 mi · 6 min District line", venue: "Chiswick" },
  { slug: "salsa-classes-kew", name: "Kew", postcode: "TW9", distance: "1.8 mi · 9 min drive", venue: "Chiswick" },
  { slug: "salsa-classes-richmond", name: "Richmond", postcode: "TW9", distance: "3.2 mi · 14 min drive", venue: "Chiswick" },
  { slug: "salsa-classes-brentford", name: "Brentford", postcode: "TW8", distance: "2.3 mi · 11 min drive", venue: "Chiswick" },
  { slug: "salsa-classes-shepherds-bush", name: "Shepherd's Bush", postcode: "W12", distance: "2.6 mi · 12 min drive", venue: "Chiswick" },
  { slug: "salsa-classes-notting-hill", name: "Notting Hill", postcode: "W11", distance: "3.5 mi · 14 min Central + District", venue: "Chiswick" },
  { slug: "salsa-classes-barnes", name: "Barnes", postcode: "SW13", distance: "1.7 mi · 8 min drive", venue: "Chiswick" },
  { slug: "salsa-classes-fulham", name: "Fulham", postcode: "SW6", distance: "3.1 mi · 13 min drive", venue: "Chiswick" },
  { slug: "salsa-classes-putney", name: "Putney", postcode: "SW15", distance: "3.4 mi · 15 min drive", venue: "Chiswick" },
];

export const EALING_NEAR: NearMeArea[] = [
  { slug: "salsa-classes-acton", name: "Acton", postcode: "W3", distance: "1.9 mi · 9 min drive", venue: "Ealing" },
  { slug: "dance-classes-hounslow", name: "Hounslow", postcode: "TW3", distance: "4.1 mi · 16 min drive", venue: "Ealing" },
  { slug: "latin-dance-ealing", name: "Ealing Broadway", postcode: "W5", distance: "0.6 mi · 10 min walk", venue: "Ealing" },
  { slug: "dance-classes-west-london", name: "West London", postcode: "W1–W14", distance: "Hub for W3, W5, W7, W13", venue: "Ealing" },
  { slug: "bachata-classes-ealing", name: "Bachata Ealing", postcode: "W13", distance: "Same venue · Tuesday", venue: "Ealing" },
  { slug: "salsa-classes-hammersmith", name: "Hammersmith", postcode: "W6", distance: "3.5 mi · 14 min District line", venue: "Both" },
  { slug: "salsa-classes-richmond", name: "Richmond", postcode: "TW9", distance: "4.6 mi · 18 min drive", venue: "Both" },
  { slug: "dance-classes-south-west-london", name: "SW London", postcode: "SW1–SW20", distance: "Region hub", venue: "Both" },
];

/* For Central London visitors landing on /salsa-bachata-classes-covent-garden.
   These slugs all link to existing pages; distances are door-to-door from
   Covent Garden (WC2) using TfL/driving. Venue tag shows which weekly night
   the area naturally feeds into. */
export const CENTRAL_FROM_CG: NearMeArea[] = [
  { slug: "salsa-classes-hammersmith", name: "Hammersmith", postcode: "W6", distance: "5.2 mi · 25 min Piccadilly", venue: "Both" },
  { slug: "salsa-classes-chiswick", name: "Chiswick", postcode: "W4", distance: "7.1 mi · 28 min Piccadilly", venue: "Chiswick" },
  { slug: "salsa-classes-ealing", name: "Ealing", postcode: "W13", distance: "8.6 mi · 35 min Central", venue: "Ealing" },
  { slug: "salsa-classes-acton", name: "Acton", postcode: "W3", distance: "6.8 mi · 27 min Central", venue: "Both" },
  { slug: "salsa-classes-notting-hill", name: "Notting Hill", postcode: "W11", distance: "3.4 mi · 18 min Central", venue: "Chiswick" },
  { slug: "salsa-classes-shepherds-bush", name: "Shepherd's Bush", postcode: "W12", distance: "4.6 mi · 22 min Central", venue: "Chiswick" },
  { slug: "salsa-classes-fulham", name: "Fulham", postcode: "SW6", distance: "4.8 mi · 24 min District", venue: "Chiswick" },
  { slug: "salsa-classes-richmond", name: "Richmond", postcode: "TW9", distance: "9.4 mi · 38 min District", venue: "Both" },
];

