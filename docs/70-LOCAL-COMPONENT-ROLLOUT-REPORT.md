# 70 — Local Component Rollout Report

The three local components (`NearMeGrid`, `ReviewVelocityTicker`, and where
appropriate `LocalTransportBlock` / `VenueGeoCard`) have now been deployed
across the remaining priority local pages.

## Coverage

| Page | NearMe scope | ReviewVelocity | Notes |
|---|---|---|---|
| `/salsa-classes-london` | Both (Chiswick + Ealing) | yes | London hub |
| `/bachata-classes-london` | Both | yes | London hub |
| `/dance-classes-west-london` | Both | yes | Regional hub |
| `/dance-classes-south-west-london` | Chiswick | yes | Closer venue |
| `/salsa-classes-south-west-london` | Chiswick | yes |  |
| `/bachata-classes-south-west-london` | Chiswick | yes |  |
| `/dance-classes-hounslow` | Ealing | yes |  |
| `/salsa-classes-richmond` | Chiswick | yes |  |
| `/salsa-classes-hammersmith` | Chiswick | yes |  |
| `/salsa-classes-fulham` | Chiswick | yes |  |
| `/latin-dance-classes-london` | Both | yes |  |
| `/latin-dance-chiswick` | Chiswick | yes |  |
| `/latin-dance-ealing` | Ealing | yes |  |
| `/salsa-bachata-classes-covent-garden` | — | — | Unique structure; no anchor — manual pass deferred |

## Wix replication

- `NearMeGrid` → Repeater bound to `Neighbourhoods` collection (slug, name,
  postcode, distance, venueKey). Filter the Repeater per page by venueKey
  (Chiswick / Ealing / Both).
- `ReviewVelocityTicker` → Wix Pro Gallery with text overlay, or Velo
  `setInterval(...)` rotating a text element every 4500 ms.
- Already-wired venue / flagship pages (Chiswick, Ealing, Venue/George IV,
  Venue/Drayton Court) remain unchanged.
