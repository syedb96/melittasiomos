import { ImagePlus } from "lucide-react";

/**
 * PhotoSlot — Wix-ready photo slot placeholder.
 *
 * Use anywhere we still need a real photo. Renders a tasteful, on-brand
 * placeholder that documents:
 *  - the image's purpose,
 *  - suggested crop ratio,
 *  - the ideal subject for the photographer,
 *  - and the alt text to use once the real asset is uploaded.
 *
 * Wix mapping: replace with a Wix Image element using the same crop & alt.
 */
export interface PhotoSlotProps {
  purpose: string;
  cropRatio: string; // "16:9" | "4:5" | "1:1" | "3:2" | "21:9" ...
  idealSubject: string;
  altText: string;
  className?: string;
  rounded?: boolean;
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
  "21:9": "aspect-[21/9]",
};

const PhotoSlot = ({
  purpose,
  cropRatio,
  idealSubject,
  altText,
  className = "",
  rounded = true,
}: PhotoSlotProps) => {
  const ratioClass = ratioToClass[cropRatio] ?? "aspect-[4/5]";
  return (
    <div
      className={`relative overflow-hidden border border-dashed border-primary/30 bg-gradient-to-br from-warm-beige/30 to-ivory ${rounded ? "rounded-2xl" : ""} ${className}`}
      data-wix-slot="photo"
      data-wix-purpose={purpose}
      data-wix-ratio={cropRatio}
      data-wix-alt={altText}
    >
      <div className={`${ratioClass} w-full flex items-center justify-center px-5 py-6 text-center`}>
        <div>
          <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <ImagePlus size={16} className="text-primary" />
          </div>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-1">
            Photo Slot · {cropRatio}
          </p>
          <p className="font-heading text-xs font-semibold text-foreground mb-1.5 max-w-[28ch] mx-auto">
            {purpose}
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[32ch] mx-auto mb-2">
            {idealSubject}
          </p>
          <p className="text-[10px] text-muted-foreground/70 italic">
            alt: "{altText}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoSlot;
