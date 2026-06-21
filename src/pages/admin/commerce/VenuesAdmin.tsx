import AdminLayout from "@/components/admin/AdminLayout";
import { CommerceCrud, type FieldDef } from "@/components/admin/CommerceCrud";

const fields: FieldDef[] = [
  { key: "slug", label: "Slug (unique)", type: "text", required: true },
  { key: "name", label: "Name", type: "text", required: true },
  { key: "short_name", label: "Short name", type: "text" },
  { key: "address_line_1", label: "Address line 1", type: "text" },
  { key: "address_line_2", label: "Address line 2", type: "text" },
  { key: "postcode", label: "Postcode", type: "text", width: "half" },
  { key: "map_url", label: "Google Maps URL", type: "text" },
  { key: "directions_html", label: "Directions (HTML allowed)", type: "textarea" },
  { key: "transport_html", label: "Transport (HTML)", type: "textarea" },
  { key: "parking_html", label: "Parking (HTML)", type: "textarea" },
  { key: "accessibility_html", label: "Accessibility (HTML)", type: "textarea" },
  { key: "hero_image_url", label: "Hero image URL", type: "text" },
  { key: "faqs", label: "FAQs (JSON array of {q,a})", type: "json", help: '[{"q":"Is parking available?","a":"Yes…"}]' },
  { key: "seo_title", label: "SEO title", type: "text" },
  { key: "seo_description", label: "SEO description", type: "textarea" },
  { key: "sort_order", label: "Sort order", type: "number", width: "half" },
  { key: "is_active", label: "Active", type: "boolean", width: "half" },
];

const VenuesAdmin = () => (
  <AdminLayout>
    <h1 className="font-display text-3xl font-bold mb-1">Venues</h1>
    <p className="text-sm text-muted-foreground font-heading mb-6">
      Venue facts shown on the public site. Only active venues are publicly readable.
    </p>
    <CommerceCrud table="commerce_venues" fields={fields} orderBy={{ column: "sort_order" }} defaults={{ is_active: true, faqs: [], sort_order: 0 }} blockedEditKeys={["slug"]} />
  </AdminLayout>
);
export default VenuesAdmin;
