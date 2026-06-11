import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";

// Capture every insert call across all tables so we can assert security_events writes.
const inserts: Array<{ table: string; rows: unknown }> = [];

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: (table: string) => ({
      insert: (rows: unknown) => {
        inserts.push({ table, rows });
        return Promise.resolve({ data: null, error: null });
      },
    }),
  },
}));

vi.mock("@/lib/analytics", () => ({ trackCta: vi.fn() }));
vi.mock("@/lib/whatsapp", () => ({
  waCustom: () => ({ href: "https://wa.me/447449482343", target: "_blank", rel: "noopener", onClick: vi.fn() }),
}));

import PartnerOutreachForm from "../PartnerOutreachForm";

const flushTimer = async () => {
  await act(async () => { vi.advanceTimersByTime(2000); });
};

const findSecurityEvents = (type: string) =>
  inserts
    .filter(i => i.table === "security_events")
    .flatMap(i => (Array.isArray(i.rows) ? i.rows : [i.rows]))
    .filter((r: any) => r.event_type === type);

describe("PartnerOutreachForm security_events logging", () => {
  beforeEach(() => {
    inserts.length = 0;
    vi.useFakeTimers();
  });

  it("logs form_honeypot_tripped when honeypot field is filled", async () => {
    render(<PartnerOutreachForm />);
    const hp = document.querySelector('input[name="company_url"]') as HTMLInputElement;
    fireEvent.change(hp, { target: { value: "spam" } });
    await flushTimer();
    fireEvent.click(screen.getByRole("button", { name: /Request a partner link/i }));
    await waitFor(() => expect(findSecurityEvents("form_honeypot_tripped").length).toBeGreaterThan(0));
    const ev = findSecurityEvents("form_honeypot_tripped")[0] as any;
    expect(ev.source).toBe("PartnerOutreachForm");
    expect(ev.severity).toBe("warn");
  });

  it("logs form_validation_failed when required fields are missing", async () => {
    render(<PartnerOutreachForm />);
    await flushTimer();
    fireEvent.click(screen.getByRole("button", { name: /Request a partner link/i }));
    await waitFor(() => expect(findSecurityEvents("form_validation_failed").length).toBeGreaterThan(0));
    const ev = findSecurityEvents("form_validation_failed")[0] as any;
    expect(ev.source).toBe("PartnerOutreachForm");
    expect(Array.isArray(ev.meta.fields)).toBe(true);
  });

  it("logs form_submission_success and inserts into contact_submissions when valid", async () => {
    render(<PartnerOutreachForm />);
    fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { value: "ada@example.com" } });
    fireEvent.change(screen.getByLabelText(/Organisation/i), { target: { value: "Analytical Engines Ltd" } });
    fireEvent.change(screen.getByLabelText(/Partner type \*/i), { target: { value: "Event venue" } });
    fireEvent.change(screen.getByLabelText(/What do you want\? \*/i), { target: { value: "Venue partnership" } });
    await flushTimer();
    fireEvent.click(screen.getByRole("button", { name: /Request a partner link/i }));
    await waitFor(() => expect(findSecurityEvents("form_submission_success").length).toBeGreaterThan(0));
    const submitted = inserts.find(i => i.table === "contact_submissions");
    expect(submitted).toBeDefined();
    const row = (submitted!.rows as any);
    expect(row.email).toBe("ada@example.com");
    expect(row.enquiry_type).toBe("Partnership / Venue Collaboration");
  });
});
