/**
 * Pure helpers used by schema-snapshot and tests.
 */
export function extractJsonLd(html: string): unknown[] {
  const out: unknown[] = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      out.push(JSON.parse(m[1].trim()));
    } catch {
      out.push({ _parseError: true, raw: m[1].slice(0, 200) });
    }
  }
  return out;
}

export function typesOf(blocks: unknown[]): string[] {
  const types: string[] = [];
  const walk = (n: unknown) => {
    if (Array.isArray(n)) n.forEach(walk);
    else if (n && typeof n === "object") {
      const t = (n as Record<string, unknown>)["@type"];
      if (typeof t === "string") types.push(t);
      else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.push(x));
      Object.values(n as object).forEach(walk);
    }
  };
  walk(blocks);
  return [...new Set(types)].sort();
}

export function diffTypes(prev: string[], curr: string[]): { added: string[]; removed: string[]; changed: boolean } {
  const added = curr.filter((t) => !prev.includes(t));
  const removed = prev.filter((t) => !curr.includes(t));
  return { added, removed, changed: added.length > 0 || removed.length > 0 };
}
