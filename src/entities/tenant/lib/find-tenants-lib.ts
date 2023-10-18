import { APIClientDependency } from "@/shared/lib";
import { ErrorNotification, useContainer, useNotification } from "@/shared/ui";
import { CreateQueryResult, createQuery } from "@tanstack/solid-query";
import { Accessor, createEffect } from "solid-js";
import { FindManyTenantsInput, FindManyTenantsResult, FindOneTenantInput, FindOneTenantResult } from "../schemas";


export type FindOneTenantQuery = CreateQueryResult<FindOneTenantResult>;

/**
 * Returns a `CreateQueryResult` for a tenant.
 * 
 * @param input 
 * @returns 
 */
export function createFindOneTenantQuery(input: Accessor<FindOneTenantInput>): FindOneTenantQuery {
  const api = useContainer(APIClientDependency);

  return createQuery({
    queryKey: () => ['tenants', 'findOne', input()],
    queryFn: () => api.tenants.findOne.query(input()),
    keepPreviousData: true,
  });
}

/**
 * A convenience hook for using `FindOneTenantQuery`. Includes notifications on error.
 * 
 * @param input 
 * @returns 
 */
export function useFindOneTenant(input: Accessor<FindOneTenantInput>) {
  const [notifyError] = useNotification(ErrorNotification);
  const findOneTenant = createFindOneTenantQuery(input);

  createEffect(() => {
    if (findOneTenant.isError)
      notifyError({
        message: `There was an error finding the tenant`,
        error: new Error(findOneTenant.error as string)
      });
  });

  return findOneTenant;
}

/**
 * A query for finding many tenants.
 */
export type FindManyTenantsQuery = CreateQueryResult<FindManyTenantsResult>;

/**
 * Returns a `CreateQueryResult` for a list of tenants.
 * 
 * @param input 
 * @returns 
 */
export function createFindManyTenantsQuery(input: Accessor<FindManyTenantsInput>): FindManyTenantsQuery {
  const api = useContainer(APIClientDependency);

  return createQuery({
    queryKey: () => ['tenants', 'findMany', input()],
    queryFn: () => api.tenants.findMany.query(input()),
    keepPreviousData: true,
  });
}

/**
 * A convenience hook for using `FindManyTenantsQuery`. Includes notifications on error.
 * 
 * @param input 
 * @returns 
 */
export function useFindManyTenants(input: Accessor<FindManyTenantsInput>) {
  const [notifyError] = useNotification(ErrorNotification);
  const findManyTenants = createFindManyTenantsQuery(input);

  createEffect(() => {
    if (findManyTenants.isError)
      notifyError({
        message: `There was an error finding the tenants`,
        error: new Error(findManyTenants.error as string)
      });
  });

  return findManyTenants;
}