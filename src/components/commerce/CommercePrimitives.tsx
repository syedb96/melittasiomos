/**
 * Public-site primitives that read from the commerce_* tables.
 * Drop these in place of hard-coded values during the Phase 2 page-by-page swap.
 */
import { useEffect, useState, type ReactNode } from "react";
import { MapPin, Train, Car, Accessibility, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { waCustom } from "@/lib/whatsapp";

export const formatPence = (pence: number | null | undefined, currency = "GBP") =>
  pence == null ? "" : new Intl.NumberFormat("en-GB", { style: "currency", currency, minimumFractionDigits: pence % 100 === 0 ? 0 : 2 }).format(pence / 100);

interface PriceProps { slug: string; fallback?: ReactNode; showPrevious?: boolean }
export const Price = ({ slug, fallback = null, showPrevious = true }: PriceProps) => {
  const [row, setRow] = useState<{ amount_pence: number | null; previous_amount_pence: number | null; currency: string } | null>(null);
  useEffect(() => {
    supabase.from("commerce_prices").select("amount_pence, previous_amount_pence, currency").eq("slug", slug).eq("is_active", true).maybeSingle()
      .then(({ data }) => setRow(data));
  }, [slug]);
  if (!row) return <>{fallback}</>;
  if (row.amount_pence == null) return <>{fallback ?? "Enquire"}</>;
  return (
    <span className="font-display">
      {showPrevious && row.previous_amount_pence ? (
        <span className="text-muted-foreground line-through text-sm mr-1.5">{formatPence(row.previous_amount_pence, row.currency)}</span>
      ) : null}
      {formatPence(row.amount_pence, row.currency)}
    </span>
  );
};

interface BookingLinkProps {
  slug: string;
  children: ReactNode;
  className?: string;
  fallbackHref?: string;
  onClick?: () => void;
}
export const BookingLink = ({ slug, children, className, fallbackHref = "/contact", onClick }: BookingLinkProps) => {
  const [href, setHref] = useState<string>(fallbackHref);
  useEffect(() => {
    supabase.from("commerce_booking_links").select("url, prefilled_message, kind").eq("slug", slug).eq("is_active", true).maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        if (data.kind === "whatsapp" && data.prefilled_message) {
          const sep = data.url.includes("?") ? "&" : "?";
          setHref(`${data.url}${sep}text=${encodeURIComponent(data.prefilled_message)}`);
        } else {
          setHref(data.url);
        }
      });
  }, [slug, fallbackHref]);
  const external = href.startsWith("http");
  return (
    <a href={href} className={className} onClick={onClick}
       target={external ? "_blank" : undefined}
       rel={external ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  );
};

/** Hook for components that need raw venue data. */
export const useVenue = (slug: string) => {
  const [row, setRow] = useState<any | null>(null);
  useEffect(() => {
    supabase.from("commerce_venues").select("*").eq("slug", slug).eq("is_active", true).maybeSingle()
      .then(({ data }) => setRow(data));
  }, [slug]);
  return row;
};

/** Hook for components that need raw price data (e.g., calculators). */
export const usePrice = (slug: string) => {
  const [row, setRow] = useState<{ amount_pence: number | null; previous_amount_pence: number | null; currency: string } | null>(null);
  useEffect(() => {
    supabase.from("commerce_prices").select("amount_pence, previous_amount_pence, currency").eq("slug", slug).eq("is_active", true).maybeSingle()
      .then(({ data }) => setRow(data));
  }, [slug]);
  return row;
};

/**
 * Renders the "Venue Details" card straight from commerce_venues.
 * SSR-safe via the `fallback` prop (must match current DB content for stable first paint).
 */
interface VenueDetailsProps {
  slug: string;
  fallback: {
    address: string;
    transport: string;
    parking: string;
    accessibility?: string;
  };
  waMessage?: string;
  waSource?: string;
}
export const VenueDetails = ({ slug, fallback, waMessage = "Hi Melitta, I'd like to get in touch about Pura Nights.", waSource = "VenueDetails" }: VenueDetailsProps) => {
  const venue = useVenue(slug);
  const address =
    venue
      ? [venue.address_line_1, venue.address_line_2, venue.postcode].filter(Boolean).join(", ")
      : fallback.address;
  const transport = venue?.transport_html ?? fallback.transport;
  const parking = venue?.parking_html ?? fallback.parking;
  const accessibility = venue?.accessibility_html ?? fallback.accessibility;
  return (
    <div className="bg-card rounded-xl border border-border p-8 space-y-6">
      <h3 className="text-xl font-semibold text-foreground">Venue Details</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">Address</p>
            <p className="text-muted-foreground">{address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Train className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">Nearest Station</p>
            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: transport }} />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Car className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">Parking</p>
            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: parking }} />
          </div>
        </div>
        {accessibility ? (
          <div className="flex items-start gap-3">
            <Accessibility className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground">Accessibility</p>
              <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: accessibility }} />
            </div>
          </div>
        ) : null}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">Questions?</p>
            <a {...waCustom(waMessage, waSource)} className="text-primary hover:underline">
              Message Melitta on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Service registry / availability gate                                      */
/* -------------------------------------------------------------------------- */

export type ServiceAvailability = "available" | "enquiry_only" | "waitlist" | "paused";
export interface CommerceService {
  slug: string;
  name: string;
  category: string;
  summary: string | null;
  availability: ServiceAvailability;
  pause_reason: string | null;
  public_notice: string | null;
  cta_label: string | null;
  is_listed: boolean;
}

/** Returns the live service row (or null while loading / unknown). */
export const useService = (slug: string): CommerceService | null => {
  const [row, setRow] = useState<CommerceService | null>(null);
  useEffect(() => {
    supabase
      .from("commerce_services")
      .select("slug, name, category, summary, availability, pause_reason, public_notice, cta_label, is_listed")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => setRow((data as CommerceService) ?? null));
  }, [slug]);
  return row;
};

interface ServiceGateProps {
  slug: string;
  children: ReactNode;
  /** Render when availability === 'paused' or is_listed === false. Defaults to a small notice. */
  pausedFallback?: ReactNode;
  /** When true, render children even while the row is loading (uses optimistic display). */
  optimistic?: boolean;
  /** When true and the service has a public_notice, show it above children. */
  showNotice?: boolean;
}
/**
 * Gates a section of public UI based on commerce_services.availability:
 *   - available, enquiry_only, waitlist  → renders children
 *   - paused                             → renders pausedFallback (or default notice)
 *   - is_listed=false                    → renders nothing
 */
export const ServiceGate = ({ slug, children, pausedFallback, optimistic = true, showNotice = true }: ServiceGateProps) => {
  const svc = useService(slug);
  if (!svc) return <>{optimistic ? children : null}</>;
  if (!svc.is_listed) return null;
  if (svc.availability === "paused") {
    return (
      <>{pausedFallback ?? (
        <div className="bg-muted/40 border border-border rounded-xl p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">{svc.name}</strong> is currently unavailable.
          {svc.pause_reason ? <> {svc.pause_reason}</> : null}
        </div>
      )}</>
    );
  }
  return (
    <>
      {showNotice && svc.public_notice ? (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg px-3 py-2 text-xs mb-3">
          {svc.public_notice}
        </div>
      ) : null}
      {children}
    </>
  );
};

/** Small badge for use in lists/cards summarising current service status. */
export const ServiceAvailabilityBadge = ({ slug, className = "" }: { slug: string; className?: string }) => {
  const svc = useService(slug);
  if (!svc) return null;
  const styles: Record<ServiceAvailability, string> = {
    available:    "bg-emerald-500/15 text-emerald-700 border-emerald-300",
    enquiry_only: "bg-amber-500/15 text-amber-800 border-amber-300",
    waitlist:     "bg-sky-500/15 text-sky-800 border-sky-300",
    paused:       "bg-muted text-muted-foreground border-border",
  };
  const labels: Record<ServiceAvailability, string> = {
    available:    "Available now",
    enquiry_only: "Enquiry only",
    waitlist:     "Waitlist",
    paused:       "Currently paused",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider ${styles[svc.availability]} ${className}`}>
      {labels[svc.availability]}
    </span>
  );
};
