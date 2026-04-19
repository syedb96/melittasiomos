import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Copy, Check, Download } from "lucide-react";
import { siteBlueprint } from "@/data/site-blueprint";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 text-xs font-heading text-primary hover:underline"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
    </button>
  );
};

const Section = ({ title, body }: { title: string; body: string }) => (
  <details className="bg-card border border-border rounded-xl mb-3" open>
    <summary className="cursor-pointer p-4 flex items-center justify-between font-heading font-semibold text-sm">
      <span>{title}</span>
      <CopyButton text={body} />
    </summary>
    <pre className="px-4 pb-4 text-xs text-muted-foreground whitespace-pre-wrap overflow-x-auto">{body}</pre>
  </details>
);

const SiteDocs = () => {
  const fullConfig = {
    generatedAt: new Date().toISOString(),
    ...siteBlueprint,
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(fullConfig, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pura-nights-site-config-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-1">Documentation</p>
            <h1 className="font-display text-3xl font-bold mb-1">Site Documentation</h1>
            <p className="text-muted-foreground text-sm">Complete site config: sitemap, design system, SEO, content inventory, changelog. Backed up to <code>site_settings</code>.</p>
          </div>
          <button onClick={downloadJson} className="btn-cta-primary text-sm inline-flex items-center gap-2">
            <Download size={14} /> Download as JSON
          </button>
        </div>

        <Section title="Sitemap Tree (all routes)" body={siteBlueprint.pages.map(p => `${p.url}  →  ${p.title}`).join("\n")} />
        <Section title="Design System (CSS Variables)" body={JSON.stringify(siteBlueprint.designSystem, null, 2)} />
        <Section title="SEO Config Per Page" body={JSON.stringify(siteBlueprint.seo, null, 2)} />
        <Section title="Content Inventory (H1 + CTA)" body={JSON.stringify(siteBlueprint.contentInventory, null, 2)} />
        <Section title="Lovable Changelog (v1 → v5)" body={JSON.stringify(siteBlueprint.changelog, null, 2)} />
        <Section title="Remaining Work Log" body={JSON.stringify(siteBlueprint.remainingWork, null, 2)} />
      </div>
    </AdminLayout>
  );
};

export default SiteDocs;
