import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { fireEvent, waitFor } from "@testing-library/dom";

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

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

const findEvents = (type: string) =>
  inserts
    .filter(i => i.table === "security_events")
    .flatMap(i => (Array.isArray(i.rows) ? i.rows : [i.rows]))
    .filter((r: any) => r.event_type === type);

const inputByLabel = (container: HTMLElement, text: string) => {
  const labels = Array.from(container.querySelectorAll("label"));
  const label = labels.find(l => l.textContent?.includes(text));
  return label?.querySelector("input, select, textarea") as HTMLInputElement | HTMLSelectElement | null;
};

const submitButton = (container: HTMLElement) =>
  container.querySelector('button[type="submit"]') as HTMLButtonElement;

describe("PartnerOutreachForm security_events logging", () => {
  beforeEach(() => { inserts.length = 0; });

  it("logs form_honeypot_tripped when the honeypot is filled", async () => {
    const { container } = render(<PartnerOutreachForm />);
    const hp = container.querySelector('input[name="company_url"]') as HTMLInputElement;
    fireEvent.change(hp, { target: { value: "spam-bot" } });
    await wait(1600);
    fireEvent.click(submitButton(container));
    await waitFor(() => expect(findEvents("form_honeypot_tripped").length).toBeGreaterThan(0));
    const ev = findEvents("form_honeypot_tripped")[0] as any;
    expect(ev.source).toBe("PartnerOutreachForm");
    expect(ev.severity).toBe("warn");
  }, 10000);

  it("logs form_validation_failed when required fields are missing", async () => {
    const { container } = render(<PartnerOutreachForm />);
    await wait(1600);
    fireEvent.click(submitButton(container));
    await waitFor(() => expect(findEvents("form_validation_failed").length).toBeGreaterThan(0));
    const ev = findEvents("form_validation_failed")[0] as any;
    expect(ev.source).toBe("PartnerOutreachForm");
    expect(Array.isArray(ev.meta.fields)).toBe(true);
    expect(ev.meta.fields.length).toBeGreaterThan(0);
  }, 10000);

  it("logs form_submission_success and writes contact_submissions when valid", async () => {
    const { container } = render(<PartnerOutreachForm />);
    fireEvent.change(inputByLabel(container, "Name")!, { target: { value: "Ada Lovelace" } });
    fireEvent.change(inputByLabel(container, "Email")!, { target: { value: "ada@example.com" } });
    fireEvent.change(inputByLabel(container, "Organisation")!, { target: { value: "Analytical Engines Ltd" } });
    fireEvent.change(inputByLabel(container, "Partner type")!, { target: { value: "Event venue" } });
    fireEvent.change(inputByLabel(container, "What do you want?")!, { target: { value: "Venue partnership" } });
    await wait(1600);
    fireEvent.click(submitButton(container));
    await waitFor(() => expect(findEvents("form_submission_success").length).toBeGreaterThan(0));
    const submitted = inserts.find(i => i.table === "contact_submissions");
    expect(submitted).toBeDefined();
    const row = submitted!.rows as any;
    expect(row.email).toBe("ada@example.com");
    expect(row.enquiry_type).toBe("Partnership / Venue Collaboration");
  }, 10000);
});
