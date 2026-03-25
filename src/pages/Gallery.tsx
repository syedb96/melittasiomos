import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImg from "@/assets/hero-dance.jpg";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import weddingImg from "@/assets/wedding-dance.jpg";
import melittaImg from "@/assets/melitta-portrait.jpg";

type Category = "All" | "Classes" | "Events" | "Pura Ladies" | "Wedding Dance";

const photos: { src: string; alt: string; cat: Category[] }[] = [
  { src: heroImg, alt: "Pura Nights salsa class in action", cat: ["Classes"] },
  { src: puraLadiesImg, alt: "Pura Ladies performance team", cat: ["Pura Ladies", "Events"] },
  { src: weddingImg, alt: "Wedding first dance coaching", cat: ["Wedding Dance"] },
  { src: melittaImg, alt: "Melitta Siomos teaching", cat: ["Classes"] },
  { src: heroImg, alt: "Social dancing at Pura Nights", cat: ["Events", "Classes"] },
  { src: puraLadiesImg, alt: "Pura Ladies rehearsal", cat: ["Pura Ladies"] },
  { src: weddingImg, alt: "Couple practicing their first dance", cat: ["Wedding Dance"] },
  { src: melittaImg, alt: "Melitta performing at Latin Friday", cat: ["Events"] },
  { src: heroImg, alt: "Bachata class at The George IV", cat: ["Classes"] },
];

const categories: Category[] = ["All", "Classes", "Events", "Pura Ladies", "Wedding Dance"];

const youtubeVideos = [
  { id: "dQw4w9WgXcQ", title: "Pura Ladies Performance — London Bachata Festival" },
  { id: "dQw4w9WgXcQ", title: "Pura Nights Monday Class Highlights" },
  { id: "dQw4w9WgXcQ", title: "Wedding Dance Choreography Showcase" },
];

const Gallery = () => {
  const [filter, setFilter] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.cat.includes(filter));

  const navigate = (dir: -1 | 1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + filtered.length) % filtered.length);
  };

  return (
    <Layout>
      <SeoHead title="Gallery — Salsa & Bachata Photos & Videos | Pura Nights London" description="Photos and videos from Pura Nights classes, events, Pura Ladies performances, and wedding dance coaching. See life at London's best Latin dance community." path="/gallery" />

      <section className="section-padding section-warm">
        <div className="container-main">
          <FadeInUp>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Gallery — Life at Pura Nights</h1>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">Classes, events, performances, and the community behind the dance</p>
          </FadeInUp>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all ${filter === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-primary/10"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <StaggerContainer className="columns-2 md:columns-3 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <StaggerItem key={i}>
                <button onClick={() => setLightbox(i)} className="w-full block overflow-hidden rounded-2xl card-hover cursor-pointer">
                  <img src={photo.src} alt={photo.alt} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* YouTube Videos */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold text-primary-foreground text-center mb-2">Video Highlights</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10" />
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {youtubeVideos.map((v, i) => (
              <StaggerItem key={i}>
                <div className="rounded-2xl overflow-hidden card-hover">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="bg-charcoal-light p-3">
                    <p className="text-primary-foreground/80 text-sm font-heading">{v.title}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="text-center mt-8">
            <a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" className="text-primary font-heading text-sm hover:underline">Subscribe on YouTube →</a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary" onClick={() => setLightbox(null)}><X size={28} /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary" onClick={(e) => { e.stopPropagation(); navigate(-1); }}><ChevronLeft size={36} /></button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary" onClick={(e) => { e.stopPropagation(); navigate(1); }}><ChevronRight size={36} /></button>
          <img src={filtered[lightbox].src} alt={filtered[lightbox].alt} className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      <RelatedPages title="Related Pages" links={[
        { to: "/pura-nights", label: "Weekly Classes" },
        { to: "/pura-ladies", label: "Pura Ladies" },
        { to: "/events", label: "Events" },
        { to: "/wedding-dance", label: "Wedding Dance" },
        { to: "/testimonials", label: "Testimonials" },
      ]} />
    </Layout>
  );
};

export default Gallery;
