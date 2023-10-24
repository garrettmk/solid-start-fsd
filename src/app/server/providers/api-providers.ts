import { ContainerDependency, provider } from "tidi";
import { APICallerDependency } from "@/shared/server";
import { apiRouter } from "../api";
import { SupabaseDependency } from "@/shared/lib";
import { AuthUserDependency } from "./auth-providers";
import { APIURLProvider } from "@/app/providers";


export const APICallerProvider = provider({
  provides: APICallerDependency,
  requires: [ContainerDependency, SupabaseDependency, AuthUserDependency],
  use: (container) => apiRouter.createCaller({ container })
});

export const APIProviders = [
  APIURLProvider,
  APICallerProvider
];