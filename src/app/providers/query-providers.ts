import { IsSignedInDependency } from "@/entities/session";
import { QueryClientDependency } from "@/shared/lib";
import { QueryClient } from "@tanstack/solid-query";
import { provider } from "tidi";

export const QueryClientProvider = provider({
  provides: QueryClientDependency,
  requires: [IsSignedInDependency],
  use: (isSignedIn) => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        useErrorBoundary: true,
        suspense: false,
        
        get enabled() {
          return isSignedIn();
        }
      },
    }
  })
});