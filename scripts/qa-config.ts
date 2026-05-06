/**
 * Shared config loader for QA scripts.
 * Resolves environment from --env=… flag or QA_ENV env var (default: production).
 * Returns parameterised host + URL/redirect lists from qa.config.json.
 */
import { readFileSync } from "fs";
import { join } from "path";

export type SchemaUrl = { id: string; path: string };
export type RedirectRule = { id: string; from: string; to: string };

export interface QAConfig {
  env: string;
  host: string;
  apexHost: string | null;
  schemaUrls: SchemaUrl[];
  redirectRules: RedirectRule[];
}

export function loadConfig(): QAConfig {
  const raw = JSON.parse(
    readFileSync(join(process.cwd(), "qa.config.json"), "utf8"),
  );
  const cliEnv = process.argv.find((a) => a.startsWith("--env="))?.split("=")[1];
  const env = cliEnv ?? process.env.QA_ENV ?? raw.default ?? "production";
  const envCfg = raw.environments[env];
  if (!envCfg) {
    throw new Error(`Unknown env "${env}". Available: ${Object.keys(raw.environments).join(", ")}`);
  }
  // Allow per-call --host override.
  const cliHost = process.argv.find((a) => a.startsWith("--host="))?.split("=")[1];
  return {
    env,
    host: cliHost ?? envCfg.host,
    apexHost: envCfg.apexHost ?? null,
    schemaUrls: raw.schemaUrls,
    redirectRules: raw.redirectRules,
  };
}
