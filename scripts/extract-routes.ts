// Extracts <Route path="..."> entries from src/App.tsx → src/admin/generated/routes.json.
// Used by the read-only admin Page Registry. Runs in predev/prebuild.
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const src = readFileSync(resolve("src/App.tsx"), "utf8");
const re = /<Route\s+[^>]*path=["']([^"']+)["'][^>]*element=\{<(\w+)/g;
const found: { path: string; component: string }[] = [];
let m: RegExpExecArray | null;
while ((m = re.exec(src))) {
  if (m[1] === "*") continue;
  found.push({ path: m[1], component: m[2] });
}

const isAdmin = (p: string) => p.startsWith("/admin") || p === "/login";
const publicRoutes = found.filter((r) => !isAdmin(r.path));
const adminRoutes = found.filter((r) => isAdmin(r.path));

mkdirSync(resolve("src/admin/generated"), { recursive: true });
writeFileSync(
  resolve("src/admin/generated/routes.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), publicRoutes, adminRoutes }, null, 2),
);
console.log(`extract-routes: ${publicRoutes.length} public, ${adminRoutes.length} admin`);
