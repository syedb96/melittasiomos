/**
 * Shared config loader for QA scripts with strict Zod validation.
 * Resolves environment from --env=… flag or QA_ENV env var (default: production).
 * Fails fast on malformed qa.config.json.
 */
import { readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";

const EnvSchema = z.object({
  host: z.string().url(),
  apexHost: z.string().url().nullable(),
});

const SchemaUrlSchema = z.object({
  id: z.string().regex(/^[A-Z]\d+$/, "id must look like B1, C12, E2"),
  path: z.string().startsWith("/"),
});

const RedirectRuleSchema = z.object({
  id: z.string().regex(/^[A-Z]\d+$/),
  from: z.string().startsWith("/"),
  to: z.string().startsWith("/"),
});

const RootSchema = z.object({
  $schema: z.string().optional(),
  default: z.string().min(1),
  environments: z.record(z.string(), EnvSchema).refine((e) => Object.keys(e).length > 0, {
    message: "environments must not be empty",
  }),
  schemaUrls: z.array(SchemaUrlSchema).min(1),
  redirectRules: z.array(RedirectRuleSchema).min(1),
});

export type SchemaUrl = z.infer<typeof SchemaUrlSchema>;
export type RedirectRule = z.infer<typeof RedirectRuleSchema>;

export interface QAConfig {
  env: string;
  host: string;
  apexHost: string | null;
  schemaUrls: SchemaUrl[];
  redirectRules: RedirectRule[];
}

export function parseConfig(raw: unknown, opts: { env?: string; host?: string } = {}): QAConfig {
  const parsed = RootSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n");
    throw new Error(`Invalid qa.config.json:\n${issues}`);
  }
  const cfg = parsed.data;
  const env = opts.env ?? cfg.default;
  const envCfg = cfg.environments[env];
  if (!envCfg) {
    throw new Error(`Unknown env "${env}". Available: ${Object.keys(cfg.environments).join(", ")}`);
  }
  // ID uniqueness
  const dupIds = (arr: { id: string }[]) =>
    arr.map((x) => x.id).filter((id, i, a) => a.indexOf(id) !== i);
  const dSchema = dupIds(cfg.schemaUrls);
  const dRedir = dupIds(cfg.redirectRules);
  if (dSchema.length) throw new Error(`Duplicate schemaUrls.id: ${[...new Set(dSchema)].join(", ")}`);
  if (dRedir.length) throw new Error(`Duplicate redirectRules.id: ${[...new Set(dRedir)].join(", ")}`);

  return {
    env,
    host: opts.host ?? envCfg.host,
    apexHost: envCfg.apexHost,
    schemaUrls: cfg.schemaUrls,
    redirectRules: cfg.redirectRules,
  };
}

export function loadConfig(): QAConfig {
  const raw = JSON.parse(readFileSync(join(process.cwd(), "qa.config.json"), "utf8"));
  const cliEnv = process.argv.find((a) => a.startsWith("--env="))?.split("=")[1];
  const cliHost = process.argv.find((a) => a.startsWith("--host="))?.split("=")[1];
  const env = cliEnv ?? process.env.QA_ENV;
  return parseConfig(raw, { env, host: cliHost });
}
