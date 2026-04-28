// Shared lookbook data — used by /lookbook and /lookbook/:category routes.
// <!-- WIX: Mirror this taxonomy as a "Lookbook" CMS collection with a Category reference field. -->

export type LookbookCategorySlug = "dancewear" | "training-tops" | "hoodies-layers" | "accessories" | "teamwear";

export interface LookbookCategory {
  slug: LookbookCategorySlug;
  title: string;          // Used in H1
  metaTitle: string;
  metaDescription: string;
  intro: string;
}

export interface LookbookItem {
  title: string;
  desc: string;
  caption: string;
  tag: string;
  category: LookbookCategorySlug;
  venueTag: "chiswick" | "ealing" | "latin-friday" | "performance" | "lifestyle";
}

export const LOOKBOOK_CATEGORIES: LookbookCategory[] = [
  {
    slug: "dancewear",
    title: "Dancewear Lookbook — Crops, Wraps & Skirts",
    metaTitle: "Dancewear Lookbook — Pura Nights Crops, Wraps & Skirts | London",
    metaDescription: "Pura Nights dancewear photographed on real Salsa and Bachata dancers in West London. Crop tops, wrap tops, leggings and flow skirts.",
    intro: "Designed for movement. Photographed in our weekly classes across Chiswick and Ealing.",
  },
  {
    slug: "training-tops",
    title: "Training Tops Lookbook — Practice Tees & Tanks",
    metaTitle: "Training Tops Lookbook — Pura Nights Practice Tees | London",
    metaDescription: "Lightweight unisex training tees and tanks from Pura Nights, photographed in West London Salsa & Bachata classes.",
    intro: "Lightweight, breathable, and built for footwork drills.",
  },
  {
    slug: "hoodies-layers",
    title: "Hoodies & Layers Lookbook — Warm-Up Edit",
    metaTitle: "Hoodies & Layers Lookbook — Pura Nights Warm-Up Edit | London",
    metaDescription: "Branded hoodies and warm-up jackets from Pura Nights, styled for Latin Friday socials and pre-class warm-ups.",
    intro: "Warm-up to walk-out. Photographed at Latin Friday and weekly class warm-ups.",
  },
  {
    slug: "accessories",
    title: "Accessories Lookbook — Totes, Bottles & Lifestyle",
    metaTitle: "Accessories Lookbook — Pura Nights Totes & Lifestyle | London",
    metaDescription: "Tote bags, water bottles and lifestyle accessories from Pura Nights — the off-duty edit.",
    intro: "Off-duty essentials, on-brand. Photographed across Chiswick and Ealing.",
  },
  {
    slug: "teamwear",
    title: "Pura Ladies Teamwear Lookbook — Performance Edit",
    metaTitle: "Pura Ladies Teamwear Lookbook — Performance Edit | London",
    metaDescription: "Stage-ready Pura Ladies teamwear, photographed backstage and on stage at performances and showcases.",
    intro: "Members-only performance kit. Custom fit, stage-ready finish.",
  },
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  { title: "The Monday Look", desc: "Champagne crop top + high-waist leggings.", caption: "Photographed at The George IV — beginners-to-improvers warm-up.", tag: "Chiswick · Monday", category: "dancewear", venueTag: "chiswick" },
  { title: "The Bachata Look", desc: "Wrap top + flow skirt for body movement and styling drills.", caption: "Photographed in studio — Tuesday Sensual class.", tag: "Sensual · Tuesday", category: "dancewear", venueTag: "ealing" },
  { title: "Ladies Styling Wrap", desc: "Soft wrap top — designed for arm styling and turns.", caption: "Photographed at Drayton Court — ladies styling drills.", tag: "Ealing · Tuesday", category: "dancewear", venueTag: "ealing" },
  { title: "Salsa Practice Tee", desc: "Lightweight charcoal tee — sweat-tested at every class.", caption: "Photographed at George IV — Monday improvers.", tag: "Chiswick · Monday", category: "training-tops", venueTag: "chiswick" },
  { title: "Founders Tee", desc: "Limited-run founders' edition tee — only at launch events.", caption: "Editorial — limited founders' run.", tag: "Limited", category: "training-tops", venueTag: "lifestyle" },
  { title: "The Latin Friday Hoodie", desc: "Cream hoodie — pre-party warm-up to dancefloor.", caption: "Photographed at The Drayton Court — first Friday of the month.", tag: "Drayton Court", category: "hoodies-layers", venueTag: "latin-friday" },
  { title: "Friday Night Layer", desc: "Statement zip layer — class to social, no costume change.", caption: "Photographed at Latin Friday — monthly social.", tag: "Drayton Court", category: "hoodies-layers", venueTag: "latin-friday" },
  { title: "'Dance Like You Mean It' Tote", desc: "Heavy cotton tote — branded statement piece.", caption: "Photographed on Chiswick High Road.", tag: "Everyday", category: "accessories", venueTag: "lifestyle" },
  { title: "Stainless Steel Bottle", desc: "Insulated water bottle — class-ready.", caption: "Photographed at George IV — between rounds.", tag: "Everyday", category: "accessories", venueTag: "lifestyle" },
  { title: "Pura Ladies Performance Kit", desc: "Stage-ready teamwear — custom fit and finish.", caption: "Photographed backstage — Pura Ladies showcase.", tag: "Members", category: "teamwear", venueTag: "performance" },
  { title: "Pura Ladies Warm-Up", desc: "Branded warm-up jacket for performance team only.", caption: "Photographed pre-show — Pura Ladies tour.", tag: "Members", category: "teamwear", venueTag: "performance" },
];

export const findCategory = (slug: string) =>
  LOOKBOOK_CATEGORIES.find(c => c.slug === slug);

export const itemsByCategory = (slug: LookbookCategorySlug) =>
  LOOKBOOK_ITEMS.filter(i => i.category === slug);

// Build an ImageGallery JSON-LD payload for a list of items
export const buildImageGallerySchema = (
  pageTitle: string,
  pageUrl: string,
  items: { title: string; desc: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: pageTitle,
  url: pageUrl,
  associatedMedia: items.map(i => ({
    "@type": "ImageObject",
    name: i.title,
    description: i.desc,
    contentUrl: `${pageUrl}#${encodeURIComponent(i.title)}`,
  })),
});
