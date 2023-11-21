import { CreateQueryResult, createQuery } from "@tanstack/solid-query";
import { FindManyUserProfilesInput, FindManyUserProfilesResult } from "../schemas";
import { useContainer } from "@/shared/ui";
import { APIClientDependency } from "@/shared/lib";
import { Accessor } from "solid-js";

export type FindManyUserProfilesQuery = CreateQueryResult<FindManyUserProfilesResult>;

export function createFindManyUserProfilesQuery(input?: Accessor<FindManyUserProfilesInput>): FindManyUserProfilesQuery {
  const api = useContainer(APIClientDependency);

  return createQuery({
    queryKey: () => ['userProfiles', 'findMany', input?.() ?? {}],
    queryFn: () => api.userProfiles.findMany.query(),
    keepPreviousData: true,
  });
}

export function useFindManyUserProfiles(input?: Accessor<FindManyUserProfilesInput>) {
  return createFindManyUserProfilesQuery(input);
}