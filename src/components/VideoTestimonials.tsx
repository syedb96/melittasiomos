import { Star } from "lucide-react";

interface Vid {
  youtubeId: string;
  studentName: string;
  classBadge: string;
}

/* <!-- WIX: Replace with Wix Video element OR YouTube embeds in repeater connected to Testimonials collection (videos) --> */
const VideoTestimonials = () => {
  // Placeholder YouTube IDs — swap with real student video URLs
  const videos: Vid[] = [
    { youtubeId: "dQw4w9WgXcQ", studentName: "Sarah M.", classBadge: "Beginner · Chiswick" },
    { youtubeId: "dQw4w9WgXcQ", studentName: "James & Priya", classBadge: "Wedding Dance" },
    { youtubeId: "dQw4w9WgXcQ", studentName: "Aisha T.", classBadge: "Pura Ladies" },
  ];

  return (
    <section className="section-padding section-dark">
      <div className="container-main max-w-5xl">
        <div className="text-center mb-8">
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">In Their Own Words</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">Video Testimonials</h2>
          <p className="text-primary-foreground/50 text-sm font-heading">Real students. Real journeys. Real results.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {videos.map((v, i) => (
            <div key={i} className="bg-charcoal-light rounded-xl overflow-hidden border border-primary-foreground/10">
              <div className="aspect-[9/16] bg-charcoal">
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={`${v.studentName} testimonial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <p className="font-heading font-bold text-primary-foreground text-sm">{v.studentName}</p>
                <p className="text-primary-foreground/50 text-[10px] font-heading mb-2">{v.classBadge}</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-primary text-primary" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
