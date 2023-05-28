import { APIClientDependency, APIURLDependency } from "@/shared/lib";
import { createAPIClient, getEnv, provider } from "@/shared/lib";

export const APIURLProvider = provider({
  provides: APIURLDependency,
  use: () => getEnv('VITE_API_URL')
});

export const APIClientProvider = provider({
  provides: APIClientDependency,
  requires: [APIURLDependency],
  use: createAPIClient
});

export const APIClientProviders = [
  APIURLProvider,
  APIClientProvider
];
