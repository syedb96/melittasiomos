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
  <details className="bg-card border border-border rounded-xl mb-3 group" open>
    <summary className="cursor-pointer p-4 flex items-center justify-between font-heading font-semibold text-sm">
      <span>{title}</span>
      <CopyButton text={body} />
    </summary>
    <pre className="px-4 pb-4 text-xs text-muted-foreground whitespace-pre-wrap overflow-x-auto">{body}</pre>
  </details>
);

const Blueprint = () => {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(siteBlueprint, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pura-nights-blueprint-v5-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-1">v5.0 Export</p>
            <h1 className="font-display text-3xl font-bold mb-1">Wix Migration Blueprint</h1>
            <p className="text-muted-foreground text-sm">Single-source-of-truth for rebuilding the site on Wix without losing content or SEO equity.</p>
          </div>
          <button onClick={downloadJson} className="btn-cta-primary text-sm inline-flex items-center gap-2">
            <Download size={14} /> Download as JSON
          </button>
        </div>

        <Section title="Page Inventory (URL → template)" body={JSON.stringify(siteBlueprint.pages, null, 2)} />
        <Section title="Wix CMS Collections" body={JSON.stringify(siteBlueprint.cmsCollections, null, 2)} />
        <Section title="Dynamic Page Mapping" body={JSON.stringify(siteBlueprint.dynamicPages, null, 2)} />
        <Section title="Colour Tokens" body={JSON.stringify(siteBlueprint.colors, null, 2)} />
        <Section title="Font Mapping (Lovable → Wix)" body={JSON.stringify(siteBlueprint.fonts, null, 2)} />
        <Section title="Component Checklist" body={JSON.stringify(siteBlueprint.components, null, 2)} />
        <Section title="Build Phase Order" body={JSON.stringify(siteBlueprint.phases, null, 2)} />
      </div>
    </AdminLayout>
  );
};

export default Blueprint;
