import AdminLayout from "@/components/admin/AdminLayout";
import { CommerceCrud, type FieldDef } from "@/components/admin/CommerceCrud";

const weekdayOptions = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  .map((d, i) => ({ value: String(i), label: d }));

const slotFields: FieldDef[] = [
  { key: "class_style", label: "Style", type: "text", required: true, placeholder: "Salsa / Bachata / Pura Ladies" },
  { key: "level", label: "Level", type: "text", width: "half" },
  { key: "weekday", label: "Weekday", type: "select", required: true, options: weekdayOptions, width: "half" },
  { key: "start_time", label: "Start", type: "time", width: "half" },
  { key: "end_time", label: "End", type: "time", width: "half" },
  { key: "social_start_time", label: "Social start", type: "time", width: "half" },
  { key: "social_end_time", label: "Social end", type: "time", width: "half" },
  { key: "sort_order", label: "Sort order", type: "number", width: "half" },
  { key: "is_active", label: "Active", type: "boolean", width: "half" },
];

const exceptionFields: FieldDef[] = [
  { key: "exception_date", label: "Date", type: "text", required: true, placeholder: "YYYY-MM-DD" },
  { key: "exception_type", label: "Type", type: "select", required: true, options: [
    { value: "cancelled", label: "Cancelled" },
    { value: "replacement_venue", label: "Replacement venue" },
    { value: "time_change", label: "Time change" },
    { value: "instructor_sub", label: "Instructor substitution" },
    { value: "holiday", label: "Holiday closure" },
    { value: "notice", label: "Public notice" },
  ]},
  { key: "new_start_time", label: "New start (if time change)", type: "time", width: "half" },
  { key: "new_end_time", label: "New end (if time change)", type: "time", width: "half" },
  { key: "public_notice", label: "Public notice", type: "textarea" },
];

const ScheduleAdmin = () => (
  <AdminLayout>
    <h1 className="font-display text-3xl font-bold mb-1">Class Schedule</h1>
    <p className="text-sm text-muted-foreground font-heading mb-6">
      Weekly slots and one-off exceptions (cancellations, replacement venues, notices).
    </p>
    <h2 className="font-display text-xl font-bold mb-3">Weekly slots</h2>
    <CommerceCrud table="commerce_schedule_slots" fields={slotFields} orderBy={{ column: "weekday" }}
      defaults={{ is_active: true, sort_order: 0, weekday: 5 }} />
    <h2 className="font-display text-xl font-bold mb-3 mt-10">Exceptions</h2>
    <CommerceCrud table="commerce_schedule_exceptions" fields={exceptionFields} orderBy={{ column: "exception_date", ascending: false }}
      defaults={{}} />
  </AdminLayout>
);
export default ScheduleAdmin;
