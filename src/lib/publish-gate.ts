// Phase 4 publishing gate. Runs critical pre-publish checks.
// Critical failures BLOCK publish. Warnings are informational only.

export type GateCheck = { id: string; label: string; level: "critical" | "warning"; ok: boolean; detail?: string };
export type GateResult = { ok: boolean; criticalFailures: number; warnings: number; checks: GateCheck[] };

export interface GateInput {
  title?: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  hero_image_url?: string;
  hero_image_alt?: string;
  content_html?: string;
  canonical_url?: string;
  noindex?: boolean;
  schema_jsonld?: string;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PLACEHOLDER_RE = /\b(lorem ipsum|TODO|FIXME|xxx|placeholder|tk tk|tbd)\b/i;
const DRAFT_LINK_RE = /href=["'](?:#|javascript:|\/admin\/|\/preview\/)/i;

export function runPublishGate(input: GateInput): GateResult {
  const html = input.content_html || "";
  const checks: GateCheck[] = [];

  // Critical
  checks.push({ id: "title", label: "Title present", level: "critical", ok: !!(input.title && input.title.trim().length >= 3) });
  checks.push({ id: "slug", label: "Slug is valid kebab-case", level: "critical", ok: !!(input.slug && SLUG_RE.test(input.slug)) });
  checks.push({ id: "meta_title", label: "Meta title (<= 70 chars)", level: "critical", ok: !!(input.meta_title || input.title) && ((input.meta_title || input.title || "").length <= 70) });
  checks.push({ id: "meta_description", label: "Meta description (50–160 chars)", level: "critical", ok: !!input.meta_description && input.meta_description.length >= 50 && input.meta_description.length <= 160 });
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  checks.push({ id: "h1", label: "Exactly one <h1> (or none — title becomes H1)", level: "critical", ok: h1Count <= 1 });
  checks.push({ id: "no_placeholder", label: "No placeholder text (lorem/TODO/TBD)", level: "critical", ok: !PLACEHOLDER_RE.test(html) });
  checks.push({ id: "no_draft_links", label: "No admin/preview/# links in body", level: "critical", ok: !DRAFT_LINK_RE.test(html) });

  // Schema JSON validity (warning only — empty is fine)
  let schemaOk = true;
  if (input.schema_jsonld && input.schema_jsonld.trim()) {
    try { JSON.parse(input.schema_jsonld); } catch { schemaOk = false; }
  }
  checks.push({ id: "schema_valid", label: "JSON-LD parses", level: "critical", ok: schemaOk });

  // Warnings
  checks.push({ id: "hero", label: "Hero image set", level: "warning", ok: !!input.hero_image_url });
  checks.push({ id: "hero_alt", label: "Hero alt text set", level: "warning", ok: !input.hero_image_url || !!(input.hero_image_alt && input.hero_image_alt.trim().length > 4) });
  const imgs = html.match(/<img[^>]*>/gi) || [];
  const missingAlt = imgs.filter((t) => !/alt=["'][^"']{2,}/i.test(t)).length;
  checks.push({ id: "img_alt", label: `All body images have alt text (${imgs.length - missingAlt}/${imgs.length})`, level: "warning", ok: missingAlt === 0 });
  checks.push({ id: "canonical", label: "Canonical URL set", level: "warning", ok: !!input.canonical_url });
  checks.push({ id: "body_length", label: "Body has at least 200 visible chars", level: "warning", ok: html.replace(/<[^>]+>/g, "").trim().length >= 200 });

  const criticalFailures = checks.filter((c) => c.level === "critical" && !c.ok).length;
  const warnings = checks.filter((c) => c.level === "warning" && !c.ok).length;
  return { ok: criticalFailures === 0, criticalFailures, warnings, checks };
}
