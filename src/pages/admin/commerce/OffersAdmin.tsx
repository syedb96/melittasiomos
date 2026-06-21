import AdminLayout from "@/components/admin/AdminLayout";
import { CommerceCrud, type FieldDef } from "@/components/admin/CommerceCrud";

const fields: FieldDef[] = [
  { key: "slug", label: "Slug (unique)", type: "text", required: true },
  { key: "name", label: "Offer name", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "code", label: "Code (optional)", type: "text", width: "half" },
  { key: "eligibility", label: "Eligibility", type: "text", width: "half" },
  { key: "cta_label", label: "CTA label", type: "text", width: "half" },
  { key: "terms", label: "Terms", type: "textarea" },
  { key: "starts_at", label: "Starts at", type: "datetime", width: "half" },
  { key: "ends_at", label: "Ends at (auto-expiry)", type: "datetime", width: "half" },
  { key: "sort_order", label: "Sort order", type: "number", width: "half" },
  { key: "is_active", label: "Active", type: "boolean", width: "half" },
];

const OffersAdmin = () => (
  <AdminLayout>
    <h1 className="font-display text-3xl font-bold mb-1">Offers</h1>
    <p className="text-sm text-muted-foreground font-heading mb-6">
      Time-bound offers with automatic expiry. Public site only shows offers between starts_at and ends_at.
      Loyalty wording is locked: "Attend 8 eligible sessions and receive the 9th eligible session free."
    </p>
    <CommerceCrud table="commerce_offers" fields={fields} orderBy={{ column: "sort_order" }}
      defaults={{ is_active: true, sort_order: 0, applicable_services: [] }}
      blockedEditKeys={["slug"]} />
  </AdminLayout>
);
export default OffersAdmin;
