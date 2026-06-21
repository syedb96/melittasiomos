import AdminLayout from "@/components/admin/AdminLayout";
import { CommerceCrud, type FieldDef } from "@/components/admin/CommerceCrud";

const fields: FieldDef[] = [
  { key: "slug", label: "Slug (unique)", type: "text", required: true, help: "Stable ID used by <ServiceGate slug=…/>" },
  { key: "name", label: "Public name", type: "text", required: true },
  { key: "category", label: "Category", type: "select", required: true, options: [
    { value: "class", label: "Class" },
    { value: "event", label: "Event" },
    { value: "service", label: "Service" },
    { value: "product", label: "Product" },
    { value: "team", label: "Team / membership" },
  ]},
  { key: "summary", label: "Summary (one line)", type: "textarea" },
  { key: "availability", label: "Availability", type: "select", required: true, options: [
    { value: "available",    label: "Available — public can book directly" },
    { value: "enquiry_only", label: "Enquiry only — WhatsApp / email gate" },
    { value: "waitlist",     label: "Waitlist — collecting interest" },
    { value: "paused",       label: "Paused — hide booking, show notice" },
  ]},
  { key: "pause_reason", label: "Pause reason (shown publicly when paused)", type: "textarea" },
  { key: "public_notice", label: "Public notice (shown above all CTAs)", type: "textarea", help: "e.g. 'Latin Friday — Aug 8 sold out, next on Sep 12'" },
  { key: "cta_label", label: "Default CTA label", type: "text" },
  { key: "is_listed", label: "Listed publicly (uncheck to hide entirely)", type: "boolean" },
  { key: "sort_order", label: "Sort order", type: "number" },
];

const ServicesAdmin = () => (
  <AdminLayout>
    <h1 className="font-display text-3xl font-bold mb-1">Services</h1>
    <p className="text-sm text-muted-foreground font-heading mb-6">
      Single source of truth for what Pura Nights offers right now. The public site uses
      <code className="mx-1">&lt;ServiceGate slug=…/&gt;</code> to honour <strong>availability</strong> and
      surface <strong>public_notice</strong> automatically — flip a service to <em>paused</em> and every CTA
      across the site hides itself within a page load.
    </p>
    <CommerceCrud
      table="commerce_services"
      fields={fields}
      orderBy={{ column: "sort_order" }}
      defaults={{ is_listed: true, availability: "available", category: "service", sort_order: 0 }}
      blockedEditKeys={["slug"]}
    />
  </AdminLayout>
);
export default ServicesAdmin;
