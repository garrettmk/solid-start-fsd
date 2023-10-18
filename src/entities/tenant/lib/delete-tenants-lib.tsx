import { APIClientDependency, QueryClientDependency } from "@/shared/lib";
import { ErrorNotification, SuccessNotification, useContainer, useNotification } from "@/shared/ui";
import { CreateMutationResult, createMutation } from "@tanstack/solid-query";
import { createEffect } from "solid-js";
import { DeleteTenantInput, DeleteTenantResult } from "../schemas";

/**
 * A mutation for deleting a tenant.
 */
export type DeleteTenantMutation = CreateMutationResult<DeleteTenantResult, unknown, DeleteTenantInput>;


/**
 * Returns a mutation for deleting a tenant.
 * 
 * @returns 
 */
export function useDeleteTenantMutation(): DeleteTenantMutation {
  const api = useContainer(APIClientDependency);
  const queryClient = useContainer(QueryClientDependency);

  return createMutation({
    mutationFn: api.tenants.delete.mutate,
    onMutate: () => { queryClient.cancelQueries(['tenants']) },
    onSuccess: () => { queryClient.invalidateQueries(['tenants']) }
  });
}

/**
 * A hook for deleting a tenant.
 * 
 * @returns a CreateMutationResult for `api.tenants.delete.mutate`
 */
export function useDeleteTenant() {
  const [notifySuccess] = useNotification(SuccessNotification);
  const [notifyError] = useNotification(ErrorNotification);
  const deleteTenant = useDeleteTenantMutation();

  createEffect(() => {
    if (deleteTenant.isError) {
      notifyError({
        message: 'There was an error deleting the tenant.',
        error: new Error(deleteTenant.error as string)
      });
    } else if (deleteTenant.isSuccess) {
      notifySuccess({
        message: `${deleteTenant.data.name} was deleted`,
      });      
    }
  });

  return deleteTenant;
}