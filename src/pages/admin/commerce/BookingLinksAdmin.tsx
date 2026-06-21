import AdminLayout from "@/components/admin/AdminLayout";
import { CommerceCrud, type FieldDef } from "@/components/admin/CommerceCrud";

const fields: FieldDef[] = [
  { key: "slug", label: "Slug (unique)", type: "text", required: true, help: "Stable ID used by code (e.g. ticket-tailor-latin-friday)" },
  { key: "label", label: "Label", type: "text", required: true },
  { key: "kind", label: "Kind", type: "select", required: true, options: [
    { value: "ticket_tailor", label: "Ticket Tailor" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "email", label: "Email" },
    { value: "enquiry_form", label: "Enquiry form" },
    { value: "external", label: "External URL" },
  ]},
  { key: "url", label: "URL", type: "text", required: true, help: "For WhatsApp use https://wa.me/<number>" },
  { key: "prefilled_message", label: "Prefilled message (WhatsApp/email)", type: "textarea" },
  { key: "owner_email", label: "Owner email", type: "text" },
  { key: "usage_notes", label: "Usage notes (where is this link used?)", type: "textarea" },
  { key: "is_active", label: "Active", type: "boolean" },
];

const BookingLinksAdmin = () => (
  <AdminLayout>
    <h1 className="font-display text-3xl font-bold mb-1">Booking Links</h1>
    <p className="text-sm text-muted-foreground font-heading mb-6">
      Central registry for Ticket Tailor, WhatsApp, email and enquiry-form destinations.
      Public components reference these by <code>slug</code>.
    </p>
    <CommerceCrud table="commerce_booking_links" fields={fields} orderBy={{ column: "label" }} defaults={{ is_active: true, kind: "external" }} blockedEditKeys={["slug"]} />
  </AdminLayout>
);
export default BookingLinksAdmin;
