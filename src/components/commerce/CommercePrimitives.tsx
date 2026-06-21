/**
 * Public-site primitives that read from the commerce_* tables.
 * Drop these in place of hard-coded values during the Phase 2 page-by-page swap.
 */
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

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
