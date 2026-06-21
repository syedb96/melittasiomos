import { describe, expect, it } from "vitest";
import { ADMIN_MODULES, roleSatisfies } from "@/admin/moduleRegistry";

describe("admin module registry", () => {
  it("keeps owner as the top role and admin above editor/viewer", () => {
    expect(roleSatisfies("owner", "admin")).toBe(true);
    expect(roleSatisfies("owner", "editor")).toBe(true);
    expect(roleSatisfies("admin", "editor")).toBe(true);
    expect(roleSatisfies("editor", "admin")).toBe(false);
    expect(roleSatisfies("viewer", "editor")).toBe(false);
  });

  it("registers Sprint 0 admin deep-link aliases", () => {
    const routes = new Set(ADMIN_MODULES.flatMap((m) => [m.route, ...(m.routeAliases ?? [])]));
    expect(routes.has("/admin")).toBe(true);
    expect(routes.has("/admin/dashboard")).toBe(true);
    expect(routes.has("/admin/control-centre")).toBe(true);
    expect(routes.has("/admin/security")).toBe(true);
    expect(routes.has("/admin/enquiries")).toBe(true);
    expect(routes.has("/admin/cms/pages")).toBe(true);
  });
});