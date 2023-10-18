import { APIClientDependency, QueryClientDependency } from "@/shared/lib";
import { ErrorNotification, SuccessNotification, UseCreateFormOptions, useContainer, useCreateForm, useNotification } from "@/shared/ui";
import { zodForm } from "@modular-forms/solid";
import { CreateMutationResult, createMutation } from "@tanstack/solid-query";
import { createEffect } from "solid-js";
import { UpdateTenantInput, UpdateTenantResult, updateTenantInputSchema } from "../schemas";

/**
 * A mutation for updating a tenant.
 */
export type UpdateTenantMutation = CreateMutationResult<UpdateTenantResult, unknown, UpdateTenantInput>;

/**
 * Returns a mutation for creating a tenant.
 * 
 * @returns 
 */
export function useUpdateTenantMutation(): UpdateTenantMutation {
  const api = useContainer(APIClientDependency);
  const queryClient = useContainer(QueryClientDependency);

  return createMutation({
    mutationFn: api.tenants.update.mutate,
    onMutate: () => { queryClient.cancelQueries(['tenants']) },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tenants'] }) },
  });
}

export function useUpdateTenant() {
  const [notifySuccess] = useNotification(SuccessNotification);
  const [notifyError] = useNotification(ErrorNotification);
  const updateTenant = useUpdateTenantMutation();

  createEffect(() => {
    if (updateTenant.isSuccess) {
      notifySuccess({
        message: `${updateTenant.data.name} updated`
      });
    } else if (updateTenant.isError) {
      notifyError({
        message: `There was an error updating the tenant`,
        error: new Error(updateTenant.error as string)
      });
    }
  });

  return updateTenant;
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
