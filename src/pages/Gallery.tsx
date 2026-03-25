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

type Tab = "Classes & Socials" | "Pura Ladies Performances" | "Events & Latin Fridays";

const galleryData: Record<Tab, { src: string; alt: string; placeholder: string }[]> = {
  "Classes & Socials": [
    { src: heroImg, alt: "Students dancing salsa at Chiswick social", placeholder: "Students dancing salsa at Chiswick social" },
    { src: melittaImg, alt: "Melitta teaching bachata technique", placeholder: "Melitta teaching bachata technique" },
    { src: heroImg, alt: "Partner rotation during Monday class", placeholder: "Partner rotation during Monday class" },
    { src: melittaImg, alt: "Social dancing at Pura Nights Ealing", placeholder: "Social dancing at Pura Nights Ealing" },
    { src: heroImg, alt: "Beginners learning basic steps", placeholder: "Beginners learning basic steps" },
    { src: melittaImg, alt: "Bachata class at The George IV", placeholder: "Bachata class at The George IV" },
    { src: heroImg, alt: "Tuesday night salsa class Ealing", placeholder: "Tuesday night salsa class Ealing" },
    { src: melittaImg, alt: "Group photo after Monday class", placeholder: "Group photo after Monday class" },
  ],
  "Pura Ladies Performances": [
    { src: puraLadiesImg, alt: "Pura Ladies London team performing", placeholder: "Pura Ladies London team performing" },
    { src: puraLadiesImg, alt: "Pura Ladies at international festival", placeholder: "Pura Ladies at international festival" },
    { src: puraLadiesImg, alt: "Bachata ladies styling routine", placeholder: "Bachata ladies styling routine" },
    { src: puraLadiesImg, alt: "Pura Ladies rehearsal session", placeholder: "Pura Ladies rehearsal session" },
    { src: puraLadiesImg, alt: "Team photo at competition", placeholder: "Team photo at competition" },
    { src: puraLadiesImg, alt: "Pura Ladies Munich team", placeholder: "Pura Ladies Munich team" },
  ],
  "Events & Latin Fridays": [
    { src: heroImg, alt: "Monthly Latin Friday atmosphere", placeholder: "Monthly Latin Friday atmosphere" },
    { src: weddingImg, alt: "Wedding couple first dance", placeholder: "Wedding couple first dance" },
    { src: heroImg, alt: "DJ playing at Latin Friday", placeholder: "DJ playing at Latin Friday" },
    { src: weddingImg, alt: "Wedding dance rehearsal", placeholder: "Wedding dance rehearsal" },
    { src: heroImg, alt: "Social dancing at Latin Friday", placeholder: "Social dancing at Latin Friday" },
    { src: heroImg, alt: "Latin Friday crowd shot", placeholder: "Latin Friday crowd shot" },
  ],
};

const tabs: Tab[] = ["Classes & Socials", "Pura Ladies Performances", "Events & Latin Fridays"];

const youtubeVideos = [
  { id: "placeholder", title: "Pura Ladies Performance Video", desc: "Watch the Pura Ladies perform at international festivals" },
  { id: "placeholder", title: "Melitta Siomos Teaching Demo", desc: "See Melitta's teaching style and class atmosphere" },
  { id: "placeholder", title: "Monthly Latin Friday Highlights", desc: "Experience the energy of our Latin Friday socials" },
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
      {/* <!-- WIX: Use Wix Pro Gallery with 3 category albums --> */}

      <section className="section-padding section-warm">
        <div className="container-main">
          <FadeInUp>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">Gallery — Life at Pura Nights</h1>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">Classes, events, performances, and the community behind the dance</p>
          </FadeInUp>

          {/* Tab Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
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

          {/* Photo Grid */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <StaggerItem key={`${activeTab}-${i}`}>
                <button onClick={() => setLightbox(i)} className="w-full block overflow-hidden rounded-2xl card-hover cursor-pointer group relative aspect-square">
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                    <p className="text-primary-foreground text-xs font-heading">{photo.placeholder}</p>
                  </div>
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
                  <div className="aspect-video bg-charcoal-light flex items-center justify-center relative">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Play size={28} className="text-primary ml-1" />
                    </div>
                    <p className="absolute bottom-3 left-3 right-3 text-primary-foreground/40 text-[10px] font-heading">[Replace with YouTube embed]</p>
                  </div>
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