import { CreateQueryResult, createQuery } from "@tanstack/solid-query";
import { FindManyUsersInput, FindManyUsersResult } from "../schemas";
import { Accessor } from "solid-js";
import { APIClientDependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";

export type FindManyUsersQuery = CreateQueryResult<FindManyUsersResult>;

export function createFindManyUsersQuery(input?: Accessor<FindManyUsersInput>): FindManyUsersQuery {
  const api = useContainer(APIClientDependency);

  return createQuery({
    queryKey: () => ['users', 'findMany', input?.()],
    queryFn: () => api.users.findMany.query(input?.()),
    keepPreviousData: true,
  });
}

export function useFindManyUsers(input?: Accessor<FindManyUsersInput>) {
  return createFindManyUsersQuery(input);
}