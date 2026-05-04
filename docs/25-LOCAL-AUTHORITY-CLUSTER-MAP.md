# 25 — Local Authority Cluster Map

> Hub-and-spoke local SEO. Every spoke must link UP to its hub and to its nearest venue. Every hub must link DOWN to all spokes. Every page must link to one blog support article.

## Core hub (brand + city)

- `/pura-nights` — brand authority hub
- `/locations` — geographic index
- `/schedule` — weekly recurring schedule
- `/events` — single-event index (with category filter)

These four pages link to every cluster hub below.

## Venue anchors (Place + LocalBusiness schema)

| Venue | URL | Cluster served |
|---|---|---|
| The George IV, Chiswick W4 2DR | `/venue/the-george-iv-chiswick` | Chiswick, West London |
| The Drayton Court Hotel, Ealing W13 8PH | `/venue/the-drayton-court-ealing` | Ealing, West London, Latin Friday |

## Cluster: Chiswick

- **Hub**: `/salsa-classes-chiswick`, `/bachata-classes-chiswick`
- **Spokes**: `/dance-classes-chiswick`, `/latin-dance-chiswick`
- **Venue**: `/venue/the-george-iv-chiswick`
- **Primary kw**: "salsa classes Chiswick", "bachata classes Chiswick"
- **Secondary**: "Latin dance Chiswick W4", "salsa night Chiswick"
- **Required links**: hubs ↔ spokes ↔ venue ↔ /pura-nights ↔ /prices ↔ /blog/salsa-classes-near-chiswick
- **Blog support**: `/blog/salsa-classes-near-chiswick`, `/blog/salsa-classes-near-turnham-green`
- **Authority targets**: The George IV events page, Chiswick Calendar, Visit Chiswick, Chiswick W4 directory

## Cluster: Ealing

- **Hub**: `/salsa-classes-ealing`, `/bachata-classes-ealing`
- **Spokes**: `/dance-classes-ealing`, `/latin-dance-ealing`
- **Venue**: `/venue/the-drayton-court-ealing`
- **Primary kw**: "salsa classes Ealing", "bachata classes Ealing"
- **Secondary**: "Latin Friday Ealing", "Latin dance Ealing W13"
- **Required links**: hubs ↔ spokes ↔ venue ↔ /pura-nights ↔ /events ↔ /blog/bachata-classes-near-ealing
- **Blog support**: `/blog/bachata-classes-near-ealing`, `/blog/latin-dance-events-ealing-2026`, `/blog/pura-nights-latin-friday-guide`
- **Authority targets**: Drayton Court events page, Around Ealing, Ealing Today, Ealing W13 directory

## Cluster: West London (broad regional)

- **Hub**: `/dance-classes-west-london`
- **Spokes**: `/salsa-classes-west-london` (if exists), `/bachata-classes-west-london`, `/latin-dance-classes-london`
- **Primary kw**: "salsa classes West London", "Latin dance West London"
- **Required links**: hub → both venue anchors, both Chiswick/Ealing clusters
- **Blog support**: `/blog/west-london-latin-dance-guide`, `/blog/dance-classes-west-london-guide`, `/blog/best-areas-west-london`, `/blog/best-salsa-nights-west-london`

## Cluster: South West London

- **Hub**: `/salsa-classes-south-west-london`
- **Spokes**: `/bachata-classes-south-west-london`, `/dance-classes-south-west-london`
- **Primary kw**: "salsa classes South West London"
- **Required links**: hub → /salsa-classes-fulham, /salsa-classes-richmond, /salsa-classes-hammersmith
- **Blog support**: `/blog/salsa-south-west-london`

## Cluster: Acton / Hammersmith / Fulham / Richmond / Hounslow (support tier)

| Page | Nearest venue | Primary kw |
|---|---|---|
| /salsa-classes-acton | The George IV (Chiswick) | salsa classes Acton |
| /salsa-classes-hammersmith | The George IV | salsa classes Hammersmith |
| /salsa-classes-fulham | The George IV | salsa classes Fulham |
| /salsa-classes-richmond | The George IV | salsa classes Richmond |
| /dance-classes-hounslow | The George IV | dance classes Hounslow |

Every support page must link UP to `/dance-classes-west-london` AND to its nearest venue page.

## Cluster: Wedding & Private (service, geo-light)

- **Hub**: `/wedding-dance`, `/private-lessons`
- **Geo spokes**: `/wedding-dance-west-london`, `/wedding-dance-lessons-london`, `/private-dance-lessons-west-london`, `/private-salsa-lessons-london`
- **Blog support**: `/blog/wedding-first-dance-tips`, `/blog/how-many-wedding-lessons`, `/blog/choose-wedding-song`, `/blog/last-minute-wedding-dance`, `/blog/salsa-vs-waltz-wedding`
- **Authority targets**: Hitched, Bridebook, Guides for Brides, local wedding suppliers

## Internal-link rules per page

1. ≥1 link UP to nearest hub
2. ≥1 link to nearest venue
3. ≥1 link to one supporting blog
4. ≥1 link to a conversion page (`/prices`, `/bookings`, or `/contact`)
5. RelatedPages component shows max 6 sibling links

## GBP / social anchor matrix (rotate, never single-anchor)

| Cluster | GBP post anchor | Instagram bio anchor |
|---|---|---|
| Chiswick | "Salsa & Bachata classes Chiswick" → /salsa-classes-chiswick | "Pura Nights" → / |
| Ealing | "Latin Friday Ealing" → /venue/the-drayton-court-ealing | "Pura Nights" → /pura-nights |
| Wedding | "Wedding dance lessons London" → /wedding-dance | brand link |
