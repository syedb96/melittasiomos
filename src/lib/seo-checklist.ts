// SEO checklist engine — runs 18 checks on a draft and returns score + per-check verdicts.
// Used by the admin CMS editor and the AI blog generator to gate publish.

export type CheckStatus = "pass" | "warn" | "fail";

export interface SeoCheckResult {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
  weight: number;
}

export interface SeoDraft {
  title: string;          // h1 / page title
  metaTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl?: string;
  primaryKeyword: string;
  contentHtml: string;
  heroImageUrl?: string;
  schemaJsonld?: string | object | object[];
}

const stripHtml = (html: string) => html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const lower = (s: string) => s.toLowerCase();
const containsKeyword = (haystack: string, kw: string) => lower(haystack).includes(lower(kw));

function fleschKincaidGrade(text: string): number {
  const sentences = Math.max(1, (text.match(/[.!?]+/g) ?? []).length);
  const words = Math.max(1, (text.match(/\b\w+\b/g) ?? []).length);
  const syllables = (text.match(/[aeiouy]+/gi) ?? []).length || 1;
  return 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
}

export function runSeoChecklist(d: SeoDraft): { score: number; results: SeoCheckResult[] } {
  const text = stripHtml(d.contentHtml || "");
  const words = (text.match(/\b\w+\b/g) ?? []).length;
  const first100 = text.split(/\s+/).slice(0, 100).join(" ");
  const kw = (d.primaryKeyword || "").trim();
  const hasKw = kw.length > 0;
  const h1Matches = (d.contentHtml.match(/<h1[\s>]/gi) ?? []).length;
  const h2Count = (d.contentHtml.match(/<h2[\s>]/gi) ?? []).length;
  const internalLinks = (d.contentHtml.match(/href=["']\/(?!\/)/gi) ?? []).length;
  const moneyLinkHrefs = ["/pura-nights", "/pura-ladies", "/wedding-dance", "/private-lessons", "/corporate-dance-classes-london", "/events", "/start-here", "/latin-friday"];
  const moneyLinkCount = moneyLinkHrefs.reduce((acc, h) => acc + (d.contentHtml.toLowerCase().includes(`href="${h}`) || d.contentHtml.toLowerCase().includes(`href='${h}`) ? 1 : 0), 0);
  const kwOccurrences = hasKw ? (text.match(new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi")) ?? []).length : 0;
  const density = words > 0 ? (kwOccurrences * Math.max(1, kw.split(/\s+/).length)) / words : 0;

  let schemaParsed: any = null;
  try {
    if (typeof d.schemaJsonld === "string" && d.schemaJsonld.trim()) schemaParsed = JSON.parse(d.schemaJsonld);
    else if (typeof d.schemaJsonld === "object") schemaParsed = d.schemaJsonld;
  } catch { schemaParsed = null; }
  const schemaArray = Array.isArray(schemaParsed) ? schemaParsed : schemaParsed ? [schemaParsed] : [];
  const hasArticle = schemaArray.some((s) => String(s?.["@type"]).toLowerCase() === "article");
  const hasFaq = schemaArray.some((s) => String(s?.["@type"]).toLowerCase() === "faqpage");

  const grade = words > 50 ? fleschKincaidGrade(text) : 0;

  const checks: SeoCheckResult[] = [
    {
      id: "meta-title-length",
      label: "Meta title 30–60 characters",
      weight: 6,
      ...((): { status: CheckStatus; detail: string } => {
        const n = (d.metaTitle || d.title || "").length;
        if (n >= 30 && n <= 60) return { status: "pass", detail: `${n} chars` };
        if (n >= 25 && n <= 70) return { status: "warn", detail: `${n} chars — aim 30–60` };
        return { status: "fail", detail: `${n} chars — needs 30–60` };
      })(),
    },
    {
      id: "meta-title-keyword",
      label: "Meta title contains primary keyword",
      weight: 6,
      ...(hasKw && containsKeyword(d.metaTitle || d.title, kw)
        ? { status: "pass" as CheckStatus, detail: `Found "${kw}"` }
        : { status: "fail" as CheckStatus, detail: hasKw ? `Add "${kw}" to title` : "Set a primary keyword" }),
    },
    {
      id: "meta-desc-length",
      label: "Meta description 120–160 characters",
      weight: 6,
      ...((): { status: CheckStatus; detail: string } => {
        const n = (d.metaDescription || "").length;
        if (n >= 120 && n <= 160) return { status: "pass", detail: `${n} chars` };
        if (n >= 100 && n <= 175) return { status: "warn", detail: `${n} chars — aim 120–160` };
        return { status: "fail", detail: `${n} chars — needs 120–160` };
      })(),
    },
    {
      id: "meta-desc-keyword",
      label: "Meta description contains primary keyword",
      weight: 5,
      ...(hasKw && containsKeyword(d.metaDescription || "", kw)
        ? { status: "pass" as CheckStatus, detail: "Found" }
        : { status: "warn" as CheckStatus, detail: "Recommended in description" }),
    },
    {
      id: "slug-shape",
      label: "Slug is short, hyphenated, contains keyword",
      weight: 5,
      ...((): { status: CheckStatus; detail: string } => {
        const s = d.slug || "";
        const ok = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
        if (!ok) return { status: "fail", detail: "Slug must be lowercase, hyphenated" };
        if (s.length > 60) return { status: "warn", detail: `${s.length} chars — aim ≤60` };
        if (hasKw && !s.includes(kw.toLowerCase().replace(/\s+/g, "-").slice(0, 30).replace(/--+/g, "-"))) return { status: "warn", detail: "Consider keyword in slug" };
        return { status: "pass", detail: `${s.length} chars` };
      })(),
    },
    {
      id: "canonical",
      label: "Canonical URL is self-referencing",
      weight: 4,
      ...((): { status: CheckStatus; detail: string } => {
        const c = d.canonicalUrl || "";
        if (!c) return { status: "warn", detail: "No canonical — defaults to page URL" };
        if (c.includes(d.slug)) return { status: "pass", detail: "Self-referencing" };
        return { status: "fail", detail: "Canonical points elsewhere" };
      })(),
    },
    {
      id: "single-h1",
      label: "Exactly one H1 on the page",
      weight: 5,
      ...(h1Matches === 1
        ? { status: "pass" as CheckStatus, detail: "1 H1" }
        : h1Matches === 0
        ? { status: "warn" as CheckStatus, detail: "No H1 in body (page may render H1 outside body)" }
        : { status: "fail" as CheckStatus, detail: `${h1Matches} H1s — must be 1` }),
    },
    {
      id: "h1-keyword",
      label: "Title (H1) contains primary keyword",
      weight: 6,
      ...(hasKw && containsKeyword(d.title || "", kw)
        ? { status: "pass" as CheckStatus, detail: "Found" }
        : { status: "fail" as CheckStatus, detail: "Add keyword to H1" }),
    },
    {
      id: "intro-keyword",
      label: "Primary keyword appears in first 100 words",
      weight: 7,
      ...(hasKw && containsKeyword(first100, kw)
        ? { status: "pass" as CheckStatus, detail: "Found in intro" }
        : { status: "fail" as CheckStatus, detail: "Add keyword to opening paragraph" }),
    },
    {
      id: "keyword-density",
      label: "Keyword density 0.5%–2.5%",
      weight: 4,
      ...((): { status: CheckStatus; detail: string } => {
        if (!hasKw || words < 100) return { status: "warn", detail: "Insufficient content to measure" };
        const pct = (density * 100).toFixed(2);
        if (density >= 0.005 && density <= 0.025) return { status: "pass", detail: `${pct}%` };
        if (density > 0.025) return { status: "warn", detail: `${pct}% — risk of stuffing` };
        return { status: "warn", detail: `${pct}% — try increasing` };
      })(),
    },
    {
      id: "h2-structure",
      label: "At least 3 H2 sections",
      weight: 5,
      ...(h2Count >= 3
        ? { status: "pass" as CheckStatus, detail: `${h2Count} H2s` }
        : { status: "fail" as CheckStatus, detail: `${h2Count} H2s — needs ≥3` }),
    },
    {
      id: "internal-links",
      label: "≥2 internal links to money pages",
      weight: 6,
      ...(moneyLinkCount >= 2
        ? { status: "pass" as CheckStatus, detail: `${moneyLinkCount} money links` }
        : { status: "fail" as CheckStatus, detail: `${moneyLinkCount} found — add ≥2` }),
    },
    {
      id: "max-internal-links",
      label: "Total internal links ≤ 25",
      weight: 3,
      ...(internalLinks <= 25
        ? { status: "pass" as CheckStatus, detail: `${internalLinks} links` }
        : { status: "warn" as CheckStatus, detail: `${internalLinks} — consider trimming` }),
    },
    {
      id: "hero-image",
      label: "Hero / OG image set",
      weight: 4,
      ...(d.heroImageUrl
        ? { status: "pass" as CheckStatus, detail: "Set" }
        : { status: "warn" as CheckStatus, detail: "No hero image — set for stronger social previews" }),
    },
    {
      id: "word-count",
      label: "Word count ≥ 700",
      weight: 6,
      ...(words >= 700
        ? { status: "pass" as CheckStatus, detail: `${words} words` }
        : words >= 500
        ? { status: "warn" as CheckStatus, detail: `${words} — aim ≥700` }
        : { status: "fail" as CheckStatus, detail: `${words} — needs ≥700` }),
    },
    {
      id: "schema-article",
      label: "Article JSON-LD present",
      weight: 6,
      ...(hasArticle
        ? { status: "pass" as CheckStatus, detail: "Found" }
        : { status: "fail" as CheckStatus, detail: "Add Article schema" }),
    },
    {
      id: "schema-faq",
      label: "FAQPage JSON-LD present (recommended for blog)",
      weight: 5,
      ...(hasFaq
        ? { status: "pass" as CheckStatus, detail: "Found" }
        : { status: "warn" as CheckStatus, detail: "Consider adding 3+ FAQs with FAQPage schema" }),
    },
    {
      id: "reading-grade",
      label: "Reading grade ≤ 10 (Flesch-Kincaid)",
      weight: 3,
      ...(words < 100
        ? { status: "warn" as CheckStatus, detail: "Not enough text" }
        : grade <= 10
        ? { status: "pass" as CheckStatus, detail: `Grade ${grade.toFixed(1)}` }
        : grade <= 12
        ? { status: "warn" as CheckStatus, detail: `Grade ${grade.toFixed(1)} — simplify` }
        : { status: "fail" as CheckStatus, detail: `Grade ${grade.toFixed(1)} — too complex` }),
    },
  ];

  const totalWeight = checks.reduce((a, c) => a + c.weight, 0);
  const earned = checks.reduce((a, c) => a + (c.status === "pass" ? c.weight : c.status === "warn" ? c.weight * 0.5 : 0), 0);
  const score = Math.round((earned / totalWeight) * 100);
  return { score, results: checks };
}
