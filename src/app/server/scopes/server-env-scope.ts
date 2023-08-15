import { APIURLProvider, EnvProviders, SupabaseURLProvider } from "@/app/providers";
import { Scope } from "tidi";

export const serverEnvScope = new Scope([
  ...EnvProviders,
  APIURLProvider,
  SupabaseURLProvider,
]);