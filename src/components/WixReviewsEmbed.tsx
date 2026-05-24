import { Star, ExternalLink } from "lucide-react";

/* <!-- WIX SECTION: Google Reviews Embed — Replace this whole block in Wix
     Editor with a Google Reviews widget (Common Ninja or Elfsight),
     connected to "Pura Nights — Melitta Siomos Dance Academy" GBP.
     Keep the surrounding heading + CTA so the layout matches. -->
*/

interface Props {
  title?: string;
  eyebrow?: string;
  showCta?: boolean;
}

const PROFILE_URL =
  "https://www.google.com/search?q=Pura+Nights+Melitta+Siomos+Dance+Academy";
const REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=";

const WixReviewsEmbed = ({
  title = "See our Google reviews",
  eyebrow = "Verified Proof",
  showCta = true,
}: Props) => {
  return (
    <section
      className="section-padding section-ivory"
      data-wix-slot="google-reviews-embed"
      aria-labelledby="wix-reviews-embed-title"
    >
      <div className="container-main max-w-4xl text-center">
        <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">{eyebrow}</p>
        <h2 id="wix-reviews-embed-title" className="font-display text-3xl md:text-4xl font-bold mb-3">{title}</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="fill-primary text-primary" />
          ))}
          <span className="ml-2 font-heading text-sm text-muted-foreground">5.0 · 47+ reviews on Google</span>
        </div>
        <p className="text-muted-foreground font-heading text-sm max-w-xl mx-auto mb-6">
          Verified Google Business Profile reviews from real Pura Nights students. The
          Wix Google Reviews widget renders live here on launch — this is a placeholder
          on Lovable so the layout, schema, and SEO context are already in place.
        </p>
        {showCta && (
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-primary text-sm inline-flex items-center gap-2"
            >
              Read all Google reviews <ExternalLink size={14} />
            </a>
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary text-sm font-heading font-semibold"
            >
              Leave a review
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default WixReviewsEmbed;
