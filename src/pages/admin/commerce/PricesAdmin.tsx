import AdminLayout from "@/components/admin/AdminLayout";
import { CommerceCrud, type FieldDef } from "@/components/admin/CommerceCrud";

const fields: FieldDef[] = [
  { key: "slug", label: "Slug (unique)", type: "text", required: true, help: "Stable ID used in code, e.g. drop-in-chiswick" },
  { key: "name", label: "Display name", type: "text", required: true },
  { key: "kind", label: "Kind", type: "select", required: true, options: [
    { value: "drop-in", label: "Drop-in" },
    { value: "class-only", label: "Class only" },
    { value: "social-only", label: "Social only" },
    { value: "combined", label: "Combined (class + social)" },
    { value: "student", label: "Student" },
    { value: "bundle-5", label: "Bundle ×5" },
    { value: "bundle-10", label: "Bundle ×10" },
    { value: "event-ticket", label: "Event ticket" },
    { value: "voucher", label: "Gift voucher" },
    { value: "online-coaching", label: "Online coaching" },
    { value: "merch", label: "Merch" },
    { value: "enquiry-only", label: "Enquiry-only (no public price)" },
  ]},
  { key: "amount_pence", label: "Amount (pence)", type: "number", width: "half", help: "£15.00 = 1500" },
  { key: "previous_amount_pence", label: "Previous amount (pence)", type: "number", width: "half", help: "Only for GENUINE markdowns. Must exceed amount." },
  { key: "currency", label: "Currency", type: "text", width: "half" },
  { key: "service_slug", label: "Service slug (optional)", type: "text", width: "half" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "cta_label", label: "CTA label", type: "text", width: "half" },
  { key: "is_featured", label: "Featured", type: "boolean", width: "half" },
  { key: "starts_at", label: "Starts at", type: "datetime", width: "half" },
  { key: "ends_at", label: "Ends at", type: "datetime", width: "half" },
  { key: "terms", label: "Terms", type: "textarea" },
  { key: "sort_order", label: "Sort order", type: "number", width: "half" },
  { key: "is_active", label: "Active", type: "boolean", width: "half" },
];

const PricesAdmin = () => (
  <AdminLayout>
    <h1 className="font-display text-3xl font-bold mb-1">Prices</h1>
    <p className="text-sm text-muted-foreground font-heading mb-6">
      Every price the public site shows. Database enforces that a previous price is greater than the current price (no fake discounts).
    </p>
    <CommerceCrud table="commerce_prices" fields={fields} orderBy={{ column: "sort_order" }}
      defaults={{ is_active: true, currency: "GBP", kind: "drop-in", sort_order: 0, is_featured: false }}
      blockedEditKeys={["slug"]} />
  </AdminLayout>
);
export default PricesAdmin;
