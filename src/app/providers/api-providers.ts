import { APIClientDependency, APIURLDependency } from "@/shared/lib";
import { createAPIClient, getEnv } from "@/shared/lib";
import { provider } from "tidi";

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
