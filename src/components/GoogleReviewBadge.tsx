import { Star, ExternalLink } from "lucide-react";

interface GoogleReviewBadgeProps {
  compact?: boolean;
  className?: string;
}

const GoogleReviewBadge = ({ compact = false, className = "" }: GoogleReviewBadgeProps) => {
  if (compact) {
    return (
      <a
        href="https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-xs font-heading hover:opacity-80 transition-opacity ${className}`}
      >
        <span className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="fill-primary text-primary" />
          ))}
        </span>
        <span className="font-semibold">5.0</span>
        <span className="text-muted-foreground">on Google</span>
      </a>
    );
  }

  return (
    <div className={`bg-card rounded-2xl p-6 card-hover text-center ${className}`}>
      <div className="flex justify-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className="fill-primary text-primary" />
        ))}
      </div>
      <p className="font-display text-2xl font-bold mb-1">5.0</p>
      <p className="text-muted-foreground text-xs font-heading mb-3">Rated on Google Reviews</p>
      <a
        href="https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary text-xs font-heading font-semibold hover:underline inline-flex items-center gap-1"
      >
        See Reviews <ExternalLink size={10} />
      </a>
    </div>
  );
};

export default GoogleReviewBadge;
