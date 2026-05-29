import { Camera, Image as ImageIcon, Quote } from "lucide-react";

/**
 * RealProofSlot — honest placeholder for real-world proof visuals
 * (Google review screenshots, student/couple photos, before/after, etc.)
 *
 * Used on Wix as an image container with the supplied brief. Until the real
 * asset is dropped in, we render an honest, branded placeholder block — never
 * a fake quote or stock photo.
 *
 * Wix mapping: replace this block with a Wix Image element using the same
 * crop ratio, alt text, and surrounding caption.
 */
export interface RealProofSlotProps {
  /** What this proof block is for (internal label, also drives caption) */
  purpose: string;
  /** Honest replacement label shown on the placeholder */
  replacementLabel: string;
  /** Ideal subject for the real photo/screenshot */
  idealSubject: string;
  /** Crop ratio, e.g. "4:5", "16:9", "1:1" */
  cropRatio: string;
  /** Alt text to use once the real asset is uploaded */
  altText: string;
  /** Optional caption rendered under the slot once real */
  caption?: string;
  /** Visual variant */
  variant?: "review" | "photo" | "story";
  className?: string;
}

const ratioToClass: Record<string, string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "5:4": "aspect-[5/4]",
  "3:4": "aspect-[3/4]",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "3:2": "aspect-[3/2]",
  "2:3": "aspect-[2/3]",
};

const RealProofSlot = ({
  purpose,
  replacementLabel,
  idealSubject,
  cropRatio,
  altText,
  caption,
  variant = "photo",
  className = "",
}: RealProofSlotProps) => {
  const Icon = variant === "review" ? Quote : variant === "story" ? Camera : ImageIcon;
  const ratioClass = ratioToClass[cropRatio] ?? "aspect-[4/5]";

  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-ivory to-warm-beige/40 ${className}`}
      data-wix-slot="real-proof"
      data-wix-purpose={purpose}
      data-wix-ratio={cropRatio}
      data-wix-alt={altText}
    >
      <div className={`${ratioClass} flex flex-col items-center justify-center text-center px-6 py-10`}>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Icon size={20} className="text-primary" />
        </div>
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
          {replacementLabel}
        </p>
        <h4 className="font-display text-base md:text-lg font-bold text-foreground mb-2 max-w-xs">
          {purpose}
        </h4>
        <p className="text-xs text-muted-foreground max-w-xs leading-relaxed mb-3">
          {idealSubject}
        </p>
        <p className="text-[10px] font-heading uppercase tracking-wider text-muted-foreground">
          Crop {cropRatio} · alt: "{altText}"
        </p>
      </div>
      {caption && (
        <figcaption className="px-5 py-3 text-xs text-muted-foreground border-t border-border bg-card/50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default RealProofSlot;
