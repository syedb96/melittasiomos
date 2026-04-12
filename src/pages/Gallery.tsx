import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImg from "@/assets/hero-dance.jpg";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import weddingImg from "@/assets/wedding-dance.jpg";
import melittaImg from "@/assets/melitta-portrait.jpg";
import socialImg from "@/assets/social-dancing.jpg";

/* <!-- WIX PAGE: /gallery -->
   <!-- WIX: Use Wix Pro Gallery with category tabs/albums -->
   <!-- WIX SECTION: Hero — use Strip -->
   <!-- WIX SECTION: Category Tabs — use Tab element connected to Gallery Albums collection -->
   <!-- WIX SECTION: Photo Grid — use Wix Pro Gallery with masonry layout + lightbox -->
   <!-- WIX SECTION: YouTube Videos — use Wix Video or embed widgets -->
*/
type Tab = "Classes & Socials" | "Pura Ladies Performances" | "Events & Latin Fridays" | "Wedding Dance Moments";

const galleryData: Record<Tab, { src: string; alt: string }[]> = {
  "Classes & Socials": [
    { src: heroImg, alt: "Students dancing salsa at Chiswick Monday social" },
    { src: melittaImg, alt: "Melitta teaching beginners at Ealing Tuesday" },
    { src: socialImg, alt: "Ladies styling warm-up at Drayton Court" },
    { src: heroImg, alt: "Chiswick social dancing — improvers level" },
    { src: melittaImg, alt: "Students rotating partners during class" },
    { src: socialImg, alt: "Ealing venue interior — Drayton Court dance floor" },
    { src: heroImg, alt: "Melitta demonstrating bachata with Roger Cracco" },
    { src: melittaImg, alt: "End of class group at The George IV Chiswick" },
  ],
  "Pura Ladies Performances": [
    { src: puraLadiesImg, alt: "Pura Ladies London performing at Latin Friday 2025" },
    { src: puraLadiesImg, alt: "Pura Ladies Munich — European performance" },
    { src: puraLadiesImg, alt: "Pura Ladies Plymouth performance" },
    { src: puraLadiesImg, alt: "Pura Ladies backstage pre-show" },
    { src: puraLadiesImg, alt: "Choreography rehearsal — West London studio" },
    { src: puraLadiesImg, alt: "Pura Ladies group photo 2025" },
  ],
  "Events & Latin Fridays": [
    { src: heroImg, alt: "Monthly Latin Friday — packed dancefloor at Drayton Court" },
    { src: socialImg, alt: "Roger Cracco guest workshop at Latin Friday" },
    { src: puraLadiesImg, alt: "Pura Ladies show at Latin Friday" },
    { src: heroImg, alt: "DJ set — Latin Friday 2025" },
    { src: socialImg, alt: "Students socialising at Pura Nights event" },
    { src: heroImg, alt: "Latin Friday crowd — all levels social dancing" },
  ],
  "Wedding Dance Moments": [
    { src: weddingImg, alt: "Couple practising their first dance with Melitta" },
    { src: weddingImg, alt: "Wedding first dance — romantic choreography" },
    { src: weddingImg, alt: "Melitta coaching bride and groom at studio" },
    { src: weddingImg, alt: "Guests reacting to a show-stopping first dance" },
    { src: weddingImg, alt: "Rehearsal session — Wedding Dance Made Easy" },
    { src: weddingImg, alt: "Happy couple after their wedding dance lesson" },
  ],
};

const tabs: Tab[] = ["Classes & Socials", "Pura Ladies Performances", "Events & Latin Fridays", "Wedding Dance Moments"];

const youtubeVideos = [
  { title: "Bachata Lady Styling — Full Tutorial", desc: "Dominican style tutorial by Melitta Siomos", videoId: "a3OhiTw8Svw" },
  { title: "Pura Ladies Performance Reel", desc: "Watch the Pura Ladies perform at international events", videoId: "a3OhiTw8Svw" },
  { title: "Monthly Latin Friday Highlights", desc: "Experience the energy of our Latin Friday socials", videoId: "a3OhiTw8Svw" },
  { title: "Wedding Dance Made Easy", desc: "See couples prepare their unforgettable first dance", videoId: "a3OhiTw8Svw" },
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Classes & Socials");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = galleryData[activeTab];

  const navigate = (dir: -1 | 1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + photos.length) % photos.length);
  };

  return (
    <Layout>
      <SeoHead title="Gallery — Salsa & Bachata Photos & Videos | Pura Nights London" description="Photos and videos from Pura Nights classes, events, Pura Ladies performances, and wedding dance coaching. See life at London's best Latin dance community." path="/gallery" />

      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-main">
          <FadeInUp>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Gallery — Pura Nights in Action</h1>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">Classes, performances, Latin Fridays, and the people who make it.</p>
          </FadeInUp>

          {/* Tab Filter — sticky */}
          <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-sm py-3 -mx-4 px-4 mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setLightbox(null); }}
                  className={`px-5 py-2.5 rounded-full text-sm font-heading font-semibold transition-all ${activeTab === tab ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground hover:bg-primary/10 border border-border"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid — 3-col masonry-style */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <StaggerItem key={`${activeTab}-${i}`}>
                <button onClick={() => setLightbox(i)} className="w-full block overflow-hidden rounded-2xl card-hover cursor-pointer group relative aspect-square">
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                    <p className="text-primary-foreground text-xs font-heading">{photo.alt}</p>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* YouTube Videos */}
      {/* <!-- WIX: Use Wix Video widget or embed YouTube iframes --> */}
      <section className="section-padding section-dark">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <h2 className="font-display text-3xl font-bold text-primary-foreground text-center mb-2">Watch Pura Nights in Action</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10" />
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {youtubeVideos.map((v, i) => (
              <StaggerItem key={i}>
                <div className="rounded-2xl overflow-hidden card-hover">
                  {v.videoId ? (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.videoId}`}
                        title={v.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.videoId}`}
                        title={v.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <div className="bg-charcoal-light p-4 border-t border-primary-foreground/5">
                    <p className="text-primary-foreground/90 text-sm font-heading font-semibold mb-1">{v.title}</p>
                    <p className="text-primary-foreground/50 text-xs">{v.desc}</p>
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
          <img src={photos[lightbox].src} alt={photos[lightbox].alt} className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
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
