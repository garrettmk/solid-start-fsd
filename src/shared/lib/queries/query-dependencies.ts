import { QueryClient } from "@tanstack/solid-query";
import { dependency } from "tidi";

/**
 * A `Dependency` that provides a `QueryClient` instance.
 */
export const QueryClientDependency = dependency<QueryClient>({
  name: 'QUERY_CLIENT',
  validate: (value) => value instanceof QueryClient
});