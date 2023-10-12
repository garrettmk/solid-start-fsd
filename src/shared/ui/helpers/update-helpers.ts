import { UpdateInput, UpdateResult } from "@/shared/schemas";
import { CreateQueryResult, createQuery } from "@tanstack/solid-query";
import { Accessor } from "solid-js";
import { useContainer } from "../contexts";
import { APIClientDependency } from "@/shared/lib";
import { get } from "radash";

/**
 * Returns a `CreateQueryResult` for updating a resource.
 * 
 * @param queryKey 
 * @param input 
 * @returns 
 */
export function createUpdateQuery<T extends UpdateResult>(queryKey: string[], input: Accessor<UpdateInput>): CreateQueryResult<T> {
  const api = useContainer(APIClientDependency);
  const fetcher = get(api, [...queryKey, 'mutation'].join('.')) as (input: UpdateInput) => T;

  const query = createQuery({
    queryKey: () => [...queryKey, input()],
    queryFn: () => fetcher(input()),
    keepPreviousData: true,
  });

  return query;
}