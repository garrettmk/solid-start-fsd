import { APIClientDependency } from "@/shared/lib";
import { UseCreateFormOptions, createUpdateQuery, useContainer, useCreateForm } from "@/shared/ui";
import { zodForm } from "@modular-forms/solid";
import { Accessor } from "solid-js";
import { createRouteAction } from "solid-start";
import { UpdateTenantInput, UpdateTenantResult, updateTenantInputSchema } from "../schemas";

/**
 * A `RouteAction` for updating a tenant.
 * 
 * @returns a `RouteAction` for `api.tenants.update.mutate`
 */
export function useUpdateTenantAPI() {
  const api = useContainer(APIClientDependency);

  return createRouteAction(async (input: UpdateTenantInput) => {
    return api.tenants.update.mutate(input);
  });
}


/**
 * Returns a form for updating a tenant.
 * 
 * @param options 
 * @returns 
 */
export function useUpdateTenantForm(options: Omit<UseCreateFormOptions<UpdateTenantInput>, 'validate'> = {}) {
  const validate = zodForm(updateTenantInputSchema);

  return useCreateForm<UpdateTenantInput>({
    ...options,
    validate
  });
}

/**
 * Returns a `CreateQueryResult` for updating a tenant.
 * 
 * @param input 
 * @returns 
 */
export function createUpdateTenantQuery(input: Accessor<UpdateTenantInput>) {
  return createUpdateQuery<UpdateTenantResult>(['tenants', 'update'], input);
}