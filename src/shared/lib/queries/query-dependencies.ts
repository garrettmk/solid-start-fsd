import { QueryClient } from "@tanstack/solid-query";
import { dependency } from "tidi";

export const QueryClientDependency = dependency<QueryClient>({
  name: 'QUERY_CLIENT',
  validate: (value) => value instanceof QueryClient
});