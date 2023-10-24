import { APIURLProvider, EnvProviders, SupabaseURLProvider } from "@/app/providers";
import { Container } from "tidi";

export const serverEnvContainer = new Container([
  ...EnvProviders,
  APIURLProvider,
  SupabaseURLProvider,
]);