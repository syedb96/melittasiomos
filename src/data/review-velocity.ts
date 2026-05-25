/* Curated short review snippets for the homepage & local-page
   review velocity ticker. Keep ≤120 chars each. Source must be
   verifiable on Google Business Profile or the Testimonials CMS. */

import type { VelocitySnippet } from "@/components/ReviewVelocityTicker";

export const REVIEW_VELOCITY_SNIPPETS: VelocitySnippet[] = [
  { name: "Sarah M.", excerpt: "Best Monday night in Chiswick. Melitta makes everyone feel welcome from minute one.", source: "Google" },
  { name: "Daniel R.", excerpt: "Walked in alone — left with a dance crew. The teaching is genuinely world-class.", source: "Google" },
  { name: "Aisha T.", excerpt: "Tried three other London salsa schools. Pura Nights is the only one I came back to.", source: "Google" },
  { name: "Marco P.", excerpt: "Crystal-clear breakdowns, perfect pace, beautiful venue. The bachata class is unreal.", source: "Student" },
  { name: "Hannah K.", excerpt: "I'd never danced before. By week three I was on the social floor. Magic place.", source: "Google" },
  { name: "Tom & Liv", excerpt: "Melitta choreographed our first dance — guests still talk about it months later.", source: "Student" },
];
