import { APIClientDependency } from "@/shared/lib";
import { ErrorNotification, SuccessNotification, useContainer, useNotification } from "@/shared/ui";
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
  const [notifySuccess] = useNotification(SuccessNotification);
  const [notifyError] = useNotification(ErrorNotification);

  createEffect(() => {
    if (deletingTenant.error) {
      notifyError({
        message: 'There was an error deleting the tenant.',
        error: deletingTenant.error
      });
    } else if (deletingTenant.result) {
      notifySuccess({
        message: `${deletingTenant.result.name} was deleted`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    }
  });

  return [deletingTenant, deleteTenant];
}