import { APIClientDependency } from "@/shared/lib";
import { Code, Error, useContainer, useNotifications } from "@/shared/ui";
import { useQueryClient } from "@tanstack/solid-query";
import { createEffect } from "solid-js";
import { createRouteAction } from "solid-start";
import { RouteAction } from "solid-start/data/createRouteAction";
import { DeleteTenantInput, DeleteTenantResult } from "../schemas";

/**
 * A RouteAction for deleting a tenant.
 * 
 * @returns a `RouteAction` for `api.tenants.delete.mutate`
 */
export function useDeleteTenantAPI() {
  const api = useContainer(APIClientDependency);

  return createRouteAction(async (input: { id: string }) => {
    return api.tenants.delete.mutate(input);
  });
}

/**
 * A hook for deleting a tenant.
 * 
 * @returns a tuple of `[deletingTenant, deleteTenant]`
 */
export function useDeleteTenant(): RouteAction<DeleteTenantInput, DeleteTenantResult> {
  const [deletingTenant, deleteTenant] = useDeleteTenantAPI();
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  createEffect(() => {
    if (deletingTenant.error) {
      error({
        message: 'There was an error deleting the tenant.',
        body: () => (
          <Code>
            <Error>
              {deletingTenant.error?.message}
            </Error>
          </Code>
        )
      });
    } else if (deletingTenant.result) {
      success({
        message: 'Tenant deleted successfully!',
      });
      
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    }
  });

  return [deletingTenant, deleteTenant];
}