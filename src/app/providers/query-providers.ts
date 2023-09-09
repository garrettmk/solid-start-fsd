import { QueryClientDependency } from "@/shared/lib";
import { QueryClient } from "@tanstack/solid-query";
import { provider } from "tidi";

export const QueryClientProvider = provider({
  provides: QueryClientDependency,
  use: () => new QueryClient()
});