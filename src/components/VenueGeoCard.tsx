import { MapPin, Phone, Navigation, Globe } from "lucide-react";
import { FadeInUp } from "@/components/animations";

/* <!-- WIX SECTION: Venue Geo Card — Replicate as a Wix Strip with a 2-col
     layout: Text column (name, address microdata, phone, CTAs) + Wix Maps
     element wired to the venue lat/lng. Keep Schema.org JSON-LD output. -->
*/

interface Props {
  name: string;
  streetAddress: string;
  postcode: string;
  locality: string;
  lat: number;
  lng: number;
  telephone?: string;
  mapEmbedUrl?: string;   // optional Google Maps embed
  directionsUrl: string;
}

const VenueGeoCard = ({
  name,
  streetAddress,
  postcode,
  locality,
  lat,
  lng,
  telephone,
  mapEmbedUrl,
  directionsUrl,
}: Props) => {
  return (
    <section
      className="section-padding bg-background"
      aria-labelledby="venue-geo-title"
      itemScope
      itemType="https://schema.org/Place"
    >
      <meta itemProp="name" content={name} />
      <div className="container-main max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <FadeInUp className="h-full">
            <div className="h-full rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col">
              <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
                The Venue
              </p>
              <h2
                id="venue-geo-title"
                className="font-display text-3xl md:text-4xl font-bold mb-4"
              >
                {name}
              </h2>
              <address
                className="not-italic text-sm font-heading text-muted-foreground mb-6 space-y-1"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <p className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  <span itemProp="streetAddress">{streetAddress}</span>,{" "}
                  <span itemProp="addressLocality">{locality}</span>{" "}
                  <span itemProp="postalCode">{postcode}</span>
                </p>
                {telephone && (
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-primary" />
                    <a href={`tel:${telephone}`} className="hover:text-primary" itemProp="telephone">
                      {telephone}
                    </a>
                  </p>
                )}
              </address>

              <meta itemProp="latitude" content={String(lat)} />
              <meta itemProp="longitude" content={String(lng)} />

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-primary text-sm inline-flex items-center gap-2"
                >
                  <Navigation size={14} /> Directions
                </a>
                <a
                  href={`https://www.google.com/maps/place/${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary text-sm font-heading font-semibold"
                >
                  <Globe size={14} /> Open in Maps
                </a>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp className="h-full">
            <div className="h-full min-h-[300px] rounded-2xl overflow-hidden border border-border bg-card">
              {mapEmbedUrl ? (
                <iframe
                  title={`Map of ${name}`}
                  src={mapEmbedUrl}
                  loading="lazy"
                  className="w-full h-full min-h-[300px] border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full min-h-[300px] flex items-center justify-center text-center p-6 text-muted-foreground font-heading text-sm">
                  <span>
                    Wix Maps element renders here on launch.<br />
                    Lat {lat.toFixed(4)}, Lng {lng.toFixed(4)}.
                  </span>
                </div>
              )}
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default VenueGeoCard;
