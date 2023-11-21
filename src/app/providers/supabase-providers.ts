import { SupabaseAnonKeyDependency, SupabaseDependency, SupabaseURLDependency, createSupabaseClient, getEnv } from "@/shared/lib";
import { provider } from "tidi";

export const SupabaseURLProvider = provider({
  provides: SupabaseURLDependency,
  use: () => getEnv('VITE_SUPABASE_URL')
});

export const SupabaseAnonKeyProvider = provider({
  provides: SupabaseAnonKeyDependency,
  use: () => getEnv('VITE_SUPABASE_ANON_KEY')
});

export const SupabaseProvider = provider({
  provides: SupabaseDependency,
  requires: [SupabaseURLDependency, SupabaseAnonKeyDependency],
  use: createSupabaseClient
});

export const SupabaseClientProviders = [
  SupabaseURLProvider,
  SupabaseAnonKeyProvider,
  SupabaseProvider,
];