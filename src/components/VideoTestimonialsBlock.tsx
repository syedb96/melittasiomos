import { Play, Quote } from "lucide-react";
import { useState } from "react";

export interface VideoTestimonial {
  /** Display name */
  name: string;
  /** Short context label, e.g. "Wedding First Dance · June 2024" */
  context: string;
  /** YouTube video ID OR full embed URL */
  youtubeId?: string;
  /** Optional poster image */
  poster?: string;
  /** Pull-quote shown above the video */
  quote: string;
}

interface VideoTestimonialsBlockProps {
  heading?: string;
  subcopy?: string;
  testimonials: VideoTestimonial[];
}

/* <!-- WIX SECTION: VideoTestimonials — replicate as 2-column Video grid + quote captions --> */
const VideoTestimonialsBlock = ({
  heading = "Hear it from couples who walked in nervous and walked out beaming",
  subcopy = "Real video reviews from real Pura Nights clients. No actors. No scripts.",
  testimonials,
}: VideoTestimonialsBlockProps) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{heading}</h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">{subcopy}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <article key={i} className="bg-card rounded-2xl overflow-hidden card-hover">
              <div className="relative aspect-video bg-charcoal">
                {active === i && t.youtubeId ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&rel=0`}
                    title={`${t.name} testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => t.youtubeId && setActive(i)}
                    className="absolute inset-0 w-full h-full group"
                    aria-label={`Play ${t.name} testimonial`}
                  >
                    {(t.poster || t.youtubeId) && (
                      <img
                        src={t.poster || `https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`}
                        alt={`${t.name} — ${t.context}`}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary text-primary-foreground rounded-full p-5 shadow-elegant group-hover:scale-110 transition-transform">
                        <Play size={28} fill="currentColor" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
              <div className="p-6">
                <Quote className="text-primary mb-2" size={20} />
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">"{t.quote}"</p>
                <p className="font-heading font-semibold text-sm">{t.name}</p>
                <p className="font-heading text-xs text-muted-foreground">{t.context}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonialsBlock;
