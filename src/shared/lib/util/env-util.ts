import { get } from "radash";

export function getEnv(key: string, defaultValue?: string): string {
  const fromImportMeta = get(import.meta.env, key, null);
  const fromProcessEnv = get(process.env, key, null);

  return fromImportMeta ?? fromProcessEnv ?? defaultValue ?? '';
}