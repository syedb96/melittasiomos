/**
 * Venue render coverage — runtime assertion.
 *
 * For every active row in commerce_venues, asserts that <VenueDetails>,
 * <Price>, and <BookingLink> together render:
 *   - the venue's resolved address (from the DB row)
 *   - a displayed price for the canonical class drop-in slug
 *   - a booking link CTA with the resolved tickettailor-puranights URL
 *
 * Pairs with scripts/venue-page-coverage.ts (static source check) so that
 * both the page contains the right components AND those components actually
 * resolve to live DB content at runtime.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { supabase } from "@/integrations/supabase/client";
import {
  VenueDetails,
  Price,
  BookingLink,
} from "@/components/commerce/CommercePrimitives";

interface VenueRow {
  slug: string;
  name: string;
  address_line_1: string | null;
  postcode: string | null;
}

let venues: VenueRow[] = [];

beforeAll(async () => {
  const { data, error } = await supabase
    .from("commerce_venues")
    .select("slug, name, address_line_1, postcode")
    .eq("is_active", true);
  if (error) throw error;
  venues = data ?? [];
});

describe("venue render coverage", () => {
  it("has at least one active venue configured", () => {
    expect(venues.length).toBeGreaterThan(0);
  });

  it("renders address, price and booking link for every active venue", async () => {
    for (const v of venues) {
      const { unmount } = render(
        <div>
          <VenueDetails
            slug={v.slug}
            fallback={{ address: "loading…", transport: "", parking: "" }}
            waSource={`test:${v.slug}`}
          />
          <Price slug="drop-in-class" fallback="loading-price" showPrevious={false} />
          <BookingLink slug="tickettailor-puranights" fallbackHref="about:blank">
            Book {v.name}
          </BookingLink>
        </div>
      );

      // Address resolves from commerce_venues
      if (v.address_line_1) {
        await waitFor(() => {
          expect(screen.getByText(new RegExp(v.address_line_1!.slice(0, 12), "i"))).toBeInTheDocument();
        });
      }

      // Price resolves to a GBP amount
      await waitFor(() => {
        expect(screen.getByText(/£\d/)).toBeInTheDocument();
      });

      // Booking link resolved to the tickettailor URL
      await waitFor(() => {
        const link = screen.getByRole("link", { name: new RegExp(`Book ${v.name}`, "i") }) as HTMLAnchorElement;
        expect(link.href).toMatch(/tickettailor\.com\/events\/puranights/);
      });

      unmount();
    }
  }, 20_000);
});
