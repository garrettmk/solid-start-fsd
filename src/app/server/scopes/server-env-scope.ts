import { APIURLProvider, EnvProviders, SupabaseURLProvider } from "@/app/providers";
import { Scope } from "@/shared/lib";

export const serverEnvScope = new Scope(undefined, [
  ...EnvProviders,
  APIURLProvider,
  SupabaseURLProvider,
]);