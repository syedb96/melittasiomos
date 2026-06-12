# 95 — Wix Export: Famous Bachata Dancers

> Copy-pasteable Wix blocks for `/blog/famous-bachata-dancers`. Use **Wix Blog → New Post** (not a dynamic page). Paste each block in order. Schema goes in **SEO → Advanced → Structured Data Markup**.

---

## Wix Post settings

| Field | Value |
|---|---|
| URL slug | `famous-bachata-dancers` |
| Category | Culture |
| Author | Melitta Siomos |
| Date published | 2026-06-12 |
| Featured image | `/og-default.jpg` (replace with hero when shot) |
| SEO Title | `Famous Bachata Dancers — 8 Most Influential Stars \| Pura Nights` |
| SEO Description | `The most famous Bachata dancers in the world — Daniel y Desirée, Korke y Judith, Ataca y La Alemana, Romeo Santos and more. The icons shaping global Bachata.` |
| Canonical | `https://www.puranights.com/blog/famous-bachata-dancers` |

---

## Block 1 — H1 + intro (Rich Text)

```
Famous Bachata Dancers — The 8 Most Influential Bachata Stars

Who are the most famous Bachata dancers in the world? Bachata has exploded from the bars of the Dominican Republic into a global social dance — and a handful of iconic dancers and musicians have driven that growth. Here are the 8 most influential names in Bachata today, the styles they champion, and where to watch them.
```

---

## Block 2–9 — Dancer entries (Rich Text, one block per dancer)

Repeat the template, swap fields:

```
## {Dancer Name}
**{Style}**

{Bio paragraph}

*Where to watch:* {Watch line}
```

### 2. Daniel y Desirée — Bachata Sensual
Daniel Sánchez and Desirée Guidonet are the most influential Bachata Sensual couple in the world. Based in Spain, they have shaped the sensual style with their iconic body waves, musicality, and choreography. Almost every modern Sensual dancer has learned from their YouTube videos.
*Where to watch:* Search 'Daniel y Desirée Bachatea' on YouTube for over 100M views of their workshop demos.

### 3. Korke y Judith — Bachata Sensual (creators)
Korke Escalona and Judith Cordero invented Bachata Sensual in Cádiz, Spain in 2005. They blended traditional Bachata with body movement, isolations, and contemporary dance — birthing the style that now dominates European festivals.
*Where to watch:* Their early Bachata Sensual tutorials are the foundation of the modern style.

### 4. Ataca y La Alemana — Bachata Moderna / Urban
Jorge 'Ataca' Burgos and Tanja 'La Alemana' Kensinger were the first Bachata couple to go viral on YouTube in the 2000s. Based in New York, they pioneered Urban Bachata — a New York-style that fused Dominican footwork with hip-hop influence.
*Where to watch:* Their early 2009 Aventura demos are still mandatory viewing for any Bachata student.

### 5. Romeo Santos — Bachata Music (and dance icon)
While primarily a singer — the front of Aventura and a global Bachata superstar — Romeo Santos's influence on the dance is incalculable. Songs like 'Propuesta Indecente' and 'Eres Mía' are danced in every social around the world.
*Where to watch:* Any Bachata social will play at least three Romeo tracks per night.

### 6. Carlos Espinosa y Fernanda Lamadrid — Bachata Dominicana
Carlos and Fernanda are global ambassadors for traditional Dominican Bachata — keeping authentic footwork, musicality, and culture alive against the dominance of Sensual. Their workshops at Bachata festivals worldwide draw huge crowds.
*Where to watch:* Search their Dominican Bachata footwork drills for a masterclass in authenticity.

### 7. Jorjet Alcocer — Bachata Ladies Styling
One of the most respected ladies-styling instructors in Bachata, Jorjet Alcocer's classes on body movement, hip technique, and musicality have shaped a generation of female Bachata dancers.
*Where to watch:* Her ladies styling intensives are a fixture at every major Bachata congress.

### 8. Marco y Sara — Bachata Sensual
Marco Sara is a rising star in Bachata Sensual — known for clean technique, tight musicality, and accessible teaching. Often touring with Daniel y Desirée's school in Spain.
*Where to watch:* His workshop demos at Bachatea The World Festival are widely studied.

### 9. Melitta Siomos (UK) — Bachata Sensual / Bachata Moderna
London-based Bachata UK Champion and founder of Pura Nights. Melitta has trained directly with Daniel y Desirée, Korke y Judith, and other world leaders. She brings the world's best Bachata to West London every Monday and Tuesday.
*Where to watch:* Catch Melitta teaching at Pura Nights in Chiswick (Mondays) and Ealing (Tuesdays).

---

## Block 10 — Closing H2 + CTA (Rich Text + Button block)

```
## Learn from the lineage in London

You don't need to fly to Spain or the Dominican Republic to learn world-class Bachata. At Pura Nights, Melitta Siomos teaches Bachata Sensual, Moderna and Dominicana techniques learned directly from many of the dancers above — every Monday in Chiswick and every Tuesday in Ealing.
```

Button block (primary CTA): `Bachata Classes London` → `/bachata-classes-london`
Button block (secondary): `Book a Bachata Class →` → `https://www.tickettailor.com/events/puranights`

---

## Block 11 — Author Card (Wix Blog auto-renders from Team CMS)

Connect to `Team` collection, filter slug = `melitta-siomos`.

---

## Block 12 — Related Articles (Rich Text or Wix Repeater)

- The History of Bachata → `/blog/history-of-bachata`
- What is Bachata Sensual? → `/blog/bachata-sensual-guide`
- Ladies Styling in Bachata → `/blog/ladies-styling-bachata`
- Best Latin Dance Festivals in Europe 2026 → `/blog/best-latin-dance-festivals-europe-2026`

---

## JSON-LD — paste into SEO → Advanced → Structured Data Markup

Two graph entries: `Article` + `ItemList`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Famous Bachata Dancers — The 8 Most Influential Bachata Stars",
      "description": "From Daniel y Desirée to Romeo Santos — the most influential Bachata dancers and artists shaping the global scene today.",
      "image": "https://www.puranights.com/og-default.jpg",
      "datePublished": "2026-06-12",
      "dateModified": "2026-06-12",
      "inLanguage": "en-GB",
      "author": { "@type": "Person", "name": "Melitta Siomos" },
      "publisher": {
        "@type": "Organization",
        "name": "Pura Nights",
        "logo": { "@type": "ImageObject", "url": "https://www.puranights.com/og-default.jpg" }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.puranights.com/blog/famous-bachata-dancers"
      }
    },
    {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Daniel y Desirée" },
        { "@type": "ListItem", "position": 2, "name": "Korke y Judith" },
        { "@type": "ListItem", "position": 3, "name": "Ataca y La Alemana" },
        { "@type": "ListItem", "position": 4, "name": "Romeo Santos" },
        { "@type": "ListItem", "position": 5, "name": "Carlos Espinosa y Fernanda Lamadrid" },
        { "@type": "ListItem", "position": 6, "name": "Jorjet Alcocer" },
        { "@type": "ListItem", "position": 7, "name": "Marco y Sara" },
        { "@type": "ListItem", "position": 8, "name": "Melitta Siomos (UK)" }
      ]
    }
  ]
}
```

---

## QA after paste

1. Preview the post — confirm all 8 dancer blocks render with H2, style tag, bio, watch line.
2. Wix SEO panel → **Test Live** → confirm Rich Results detects `Article` + `ItemList`.
3. Add the post to the **Bachata** and **Culture** category navigation.
4. After publish, request indexing in GSC for `/blog/famous-bachata-dancers`.
