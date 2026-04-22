/* <!-- WIX: PROTOTYPE — In Wix, replace with the Wix YouTube Channel widget pointing
   to @melittasiomos. Update VIDEO_IDS below as Melitta uploads new content. --> */
import { Youtube, Play, ChevronRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import GoldDivider from "@/components/GoldDivider";

// 👉 Replace these 3 IDs with Melitta's most recent YouTube uploads.
// Find the ID after "v=" in the YouTube URL — e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ
const VIDEO_IDS: { id: string; title: string }[] = [
  { id: "dQw4w9WgXcQ", title: "Salsa Basics in 60 Seconds" },
  { id: "9bZkp7q19f0", title: "Bachata Body Movement Tutorial" },
  { id: "kJQP7kiw5Fk", title: "Pura Nights Latin Friday Highlights" },
];

const CHANNEL_URL = "https://www.youtube.com/@melittasiomos";

const YouTubeStrip = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-main max-w-6xl">
        <FadeInUp>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-[11px] font-heading font-semibold tracking-wider uppercase mb-4">
              <Youtube size={12} /> Watch & Learn
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Latest from the Studio</h2>
            <GoldDivider />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Free salsa & bachata tutorials, technique tips, and behind-the-scenes from Melitta's YouTube channel.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-5 mb-10">
          {VIDEO_IDS.map((video, i) => (
            <StaggerItem key={video.id}>
              <div className="group relative rounded-2xl overflow-hidden bg-background border border-border/60 card-hover h-full">
                <div className="relative aspect-video bg-charcoal">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p className="font-heading font-semibold text-sm leading-snug">{video.title}</p>
                  <p className="text-muted-foreground text-[11px] font-heading mt-1 flex items-center gap-1">
                    <Play size={10} className="text-destructive" /> Watch on YouTube
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.15}>
          <div className="text-center">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-6 py-3 rounded-full font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Youtube size={16} /> Subscribe on YouTube <ChevronRight size={14} />
            </a>
            <p className="text-muted-foreground text-[11px] font-heading mt-3">
              Join thousands of dancers learning with Melitta — new tutorials every month.
            </p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default YouTubeStrip;
