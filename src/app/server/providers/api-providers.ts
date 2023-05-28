import { ScopeDependency, provider } from "@/shared/lib";
import { APICallerDependency } from "@/shared/server";
import { apiRouter } from "../api";
import { SupabaseDependency } from "@/shared/lib";
import { AuthUserDependency } from "./auth-providers";
import { APIURLProvider } from "@/app/providers";


export const APICallerProvider = provider({
  provides: APICallerDependency,
  requires: [ScopeDependency, SupabaseDependency, AuthUserDependency],
  use: (scope) => apiRouter.createCaller({ scope })
});

export const APIProviders = [
  APIURLProvider,
  APICallerProvider
];