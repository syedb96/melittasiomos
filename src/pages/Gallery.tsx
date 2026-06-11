import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Instagram, Play, MessageCircle, Heart, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import heroImg from "@/assets/hero-dance.jpg";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import weddingImg from "@/assets/wedding-dance.jpg";
import melittaImg from "@/assets/melitta-portrait-real.jpg";
import socialImg from "@/assets/social-dancing.jpg";
import { waCustom } from "@/lib/whatsapp";

/* <!-- WIX PAGE: /gallery -->
   <!-- WIX SECTION: Hero Strip — dark with overlay -->
   <!-- WIX SECTION: Tab Filter — Wix Tabs connected to Gallery Albums -->
   <!-- WIX SECTION: Photo Grid — Wix Pro Gallery masonry + lightbox -->
   <!-- WIX SECTION: Instagram Feed — Wix Instagram Feed widget -->
   <!-- WIX SECTION: YouTube Embeds — Wix Video widgets -->
   <!-- WIX SECTION: Bottom CTA Strip — gold gradient -->
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

const instaPosts = [
  { handle: "puranights.salsabachata", img: heroImg, caption: "Monday Chiswick was 🔥 — packed dancefloor, all levels, all smiles.", likes: 248, comments: 31 },
  { handle: "melittasiomos", img: melittaImg, caption: "Bachata sensual styling drill — body waves and isolations 💃", likes: 412, comments: 47 },
  { handle: "puraladies", img: puraLadiesImg, caption: "Pura Ladies London performing at Latin Friday ✨", likes: 689, comments: 82 },
  { handle: "puranights.salsabachata", img: socialImg, caption: "Tuesday Ealing — ladies styling warm-up before class", likes: 196, comments: 22 },
  { handle: "melittasiomos", img: weddingImg, caption: "Another beautiful couple ready for their big day 💑", likes: 356, comments: 41 },
  { handle: "puranights.salsabachata", img: heroImg, caption: "Save the date — next Latin Friday it's going OFF 🎶", likes: 521, comments: 63 },
];

const ytVideos = [
  { id: "a3OhiTw8Svw", title: "Bachata Lady Styling — Full Tutorial", desc: "Dominican-style body movement walkthrough by Melitta" },
  { id: "a3OhiTw8Svw", title: "Pura Nights Latin Friday Highlights", desc: "Inside our monthly social — DJs, performances and packed dance floor" },
  { id: "a3OhiTw8Svw", title: "What Happens at a Pura Nights Class", desc: "First-timer? See exactly what to expect from arrival to social dancing" },
];

const videoSchema = {
  "@context": "https://schema.org",
  "@graph": ytVideos.map(v => ({
    "@type": "VideoObject",
    name: v.title,
    description: v.desc,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    thumbnailUrl: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
    uploadDate: "2025-01-01",
  })),
};

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
      <SeoHead
        title="Gallery — Salsa & Bachata Photos & Videos | Pura Nights London"
        description="See what 500+ students already know. Photos, videos and Instagram from Pura Nights classes, Latin Fridays, Pura Ladies performances and wedding dance coaching in West London."
        path="/gallery"
        schema={videoSchema}
      />

      {/* HERO */}
      <section className="relative bg-charcoal text-primary-foreground overflow-hidden">
        <img src={heroImg} alt="Pura Nights packed dance floor" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal" />
        <div className="container-main relative z-10 py-20 md:py-28 text-center">
          <FadeInUp>
            <span className="inline-block font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">The Energy · The People · The Vibe</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">This Is What Pura Nights <span className="text-primary">Looks Like</span></h1>
            <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">500+ students. Two venues. One community. See why West London dances with us every Monday and Tuesday.</p>
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Join Us This Week →</a>
          </FadeInUp>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding section-warm">
        <div className="container-main">
          {/* Bold dark pill tabs */}
          <div className="sticky top-16 z-30 bg-background/85 backdrop-blur-sm py-4 -mx-4 px-4 mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setLightbox(null); }}
                  className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all ${activeTab === tab ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-charcoal text-primary-foreground/70 hover:bg-charcoal-light hover:text-primary border border-charcoal-light"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <StaggerItem key={`${activeTab}-${i}`}>
                <button onClick={() => setLightbox(i)} className="w-full block overflow-hidden rounded-2xl card-hover cursor-pointer group relative aspect-square">
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-primary-foreground text-xs font-heading">{photo.alt}</p>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      {/* <!-- WIX: Replace with Wix Instagram Feed widget --> */}
      <section className="section-padding bg-charcoal text-primary-foreground">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary text-center mb-3">Real-Time From Our Socials</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">Follow the Journey</h2>
            <p className="text-primary-foreground/50 text-center text-sm mb-12 font-heading">@puranights.salsabachata · @melittasiomos · @puraladies</p>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {instaPosts.map((post, i) => (
              <StaggerItem key={i}>
                <a href={`https://www.instagram.com/${post.handle}`} target="_blank" rel="noopener noreferrer" className="block bg-charcoal-light rounded-2xl overflow-hidden border border-primary-foreground/5 card-hover group">
                  <div className="flex items-center gap-2 p-3 border-b border-primary-foreground/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary via-peach to-primary flex items-center justify-center">
                      <Instagram size={14} className="text-charcoal" />
                    </div>
                    <span className="text-primary-foreground/80 text-xs font-heading font-semibold">@{post.handle}</span>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <img src={post.img} alt={post.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-3 mb-2 text-primary-foreground/60 text-[11px]">
                      <span className="inline-flex items-center gap-1"><Heart size={11} /> {post.likes}</span>
                      <span className="inline-flex items-center gap-1"><MessageSquare size={11} /> {post.comments}</span>
                    </div>
                    <p className="text-primary-foreground/70 text-xs leading-relaxed line-clamp-2">{post.caption}</p>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="text-center mt-10">
            <a href="https://www.instagram.com/puranights.salsabachata" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-cta-primary text-sm">
              <Instagram size={16} /> Follow @puranights.salsabachata
            </a>
            <p className="text-primary-foreground/40 text-xs font-heading mt-3">📱 Follow for class updates, event photos and dance tutorials</p>
          </div>
        </div>
      </section>

      {/* YOUTUBE */}
      {/* <!-- WIX: Replace with Wix Video widgets or YouTube embed iframes --> */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-5xl">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary text-center mb-3">Press Play</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Watch Us In Action</h2>
          </FadeInUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {ytVideos.map((v, i) => (
              <StaggerItem key={i}>
                <div className="rounded-2xl overflow-hidden card-hover bg-charcoal border border-primary/15">
                  <div className="aspect-video relative bg-charcoal-light">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-sm text-primary mb-1.5">{v.title}</h3>
                    <p className="text-primary-foreground/55 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="text-center mt-8">
            <a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" className="text-primary font-heading text-sm font-semibold hover:underline">Subscribe on YouTube →</a>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="section-padding text-center" style={{ background: 'var(--gradient-gold)' }}>
        <div className="container-main">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3">Seen enough? Come dance with us.</h2>
          <p className="text-charcoal/70 text-sm mb-8 max-w-lg mx-auto">From £10 a class. No partner needed. Just turn up.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your First Class →</a>
            <a {...waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", "Gallery:242")} className="btn-cta bg-charcoal/10 text-charcoal border-2 border-charcoal/20 hover:bg-charcoal/20 text-sm inline-flex items-center gap-2"><MessageCircle size={14} /> WhatsApp Melitta</a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={photos[lightbox].alt}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowLeft") navigate(-1);
            if (e.key === "ArrowRight") navigate(1);
          }}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          <button aria-label="Close" className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary p-2 rounded-full bg-charcoal/60 hover:bg-charcoal" onClick={() => setLightbox(null)}><X size={24} /></button>
          <button aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary p-2 rounded-full bg-charcoal/60 hover:bg-charcoal" onClick={(e) => { e.stopPropagation(); navigate(-1); }}><ChevronLeft size={28} /></button>
          <button aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary p-2 rounded-full bg-charcoal/60 hover:bg-charcoal" onClick={(e) => { e.stopPropagation(); navigate(1); }}><ChevronRight size={28} /></button>
          <figure className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <img src={photos[lightbox].src} alt={photos[lightbox].alt} className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" />
            <figcaption className="text-primary-foreground/70 text-xs font-heading text-center max-w-xl">
              {photos[lightbox].alt} · <span className="text-primary">{lightbox + 1} / {photos.length}</span>
            </figcaption>
          </figure>
        </div>
      )}

      <RelatedPages title="Related Pages" links={[
        { to: "/pura-nights", label: "Weekly Classes" },
        { to: "/pura-ladies", label: "Pura Ladies" },
        { to: "/events", label: "Events" },
        { to: "/wedding-dance", label: "Wedding Dance" },
        { to: "/community", label: "Community" },
        { to: "/testimonials", label: "Testimonials" },
      ]} />
    </Layout>
  );
};

export default Gallery;
