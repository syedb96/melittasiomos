// Google Business Profile & review links for all brands
// These are Google Maps search links — replace with direct GBP URLs once claimed/verified

export const googleProfiles = {
  puraNights: {
    name: "Pura Nights Salsa & Bachata",
    url: "https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJPura_Nights_London",
    description: "Weekly Salsa & Bachata classes in Chiswick & Ealing",
  },
  weddingDanceMadeEasy: {
    name: "Wedding Dance Made Easy",
    url: "https://maps.google.com/?q=Wedding+Dance+Made+Easy+Melitta+Siomos+London",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ_Wedding_Dance_London",
    description: "Private wedding first dance choreography",
  },
  puraLadies: {
    name: "Pura Ladies Dance Company",
    url: "https://maps.google.com/?q=Pura+Ladies+Dance+Company+London",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ_Pura_Ladies_London",
    description: "International ladies styling & performance teams",
  },
  melittaSiomos: {
    name: "Melitta Siomos Dance Academy",
    url: "https://maps.google.com/?q=Melitta+Siomos+Dance+Academy+London",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ_Melitta_Siomos_London",
    description: "Award-winning dance instruction in West London",
  },
} as const;

// Real YouTube video IDs from Melitta's channel
export const youtubeVideos = {
  bachataLadyStyling: "a3OhiTw8Svw",
  channel: "https://www.youtube.com/@melittasiomos",
} as const;

export const socialLinks = {
  instagram: {
    melittaSiomos: "https://www.instagram.com/melittasiomos/",
    puraNights: "https://www.instagram.com/puranights.salsabachata/",
    puraLadies: "https://www.instagram.com/puraladies/",
    weddingDance: "https://www.instagram.com/wedding_dance_made_easy/",
  },
  facebook: "https://www.facebook.com/puranights/",
  youtube: "https://www.youtube.com/@melittasiomos",
  tiktok: "https://www.tiktok.com/@melittasiomos",
} as const;
