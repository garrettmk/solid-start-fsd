import { APIClientDependency, QueryClientDependency } from "@/shared/lib";
import { ErrorNotification, SuccessNotification, UseCreateFormOptions, useContainer, useCreateForm, useNotification } from "@/shared/ui";
import { zodForm } from "@modular-forms/solid";
import { CreateMutationResult, createMutation } from "@tanstack/solid-query";
import { CreateTenantInput, CreateTenantResult, createTenantInputSchema } from "../schemas";
import { createEffect } from "solid-js";


/**
 * A mutation for creating a tenant.
 */
export type CreateTenantMutation = CreateMutationResult<CreateTenantResult, unknown, CreateTenantInput>;


/**
 * Returns a mutation for creating a tenant.
 * 
 * @returns `CreateMutationResult`
 */
export function useCreateTenantMutation(): CreateTenantMutation {
  const api = useContainer(APIClientDependency);
  const queryClient = useContainer(QueryClientDependency);

  return createMutation({
    mutationFn: api.tenants.create.mutate,
    onMutate: () => { queryClient.cancelQueries(['tenants']) },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tenants'] }) },
  });
}

/**
 * A convenience hook for using `CreateTenantMutation`. Includes notifications
 * on success and error.
 * 
 * @returns 
 */
export function useCreateTenant() {
  const [notifySuccess] = useNotification(SuccessNotification);
  const [notifyError] = useNotification(ErrorNotification);
  const createTenant = useCreateTenantMutation();

  createEffect(() => {
    if (createTenant.isSuccess) {
      notifySuccess({
        message: `${createTenant.data.name} created`
      });
    } else if (createTenant.isError) {
      notifyError({
        message: `There was an error creating the tenant`,
        error: new Error(createTenant.error as string)
      });
    }
  });

  return createTenant;
}


/**
 * A convenience hook for using `CreateTenantForm`.
 * 
 * @param options 
 * @returns 
 */
export function useCreateTenantForm(options: Omit<UseCreateFormOptions<CreateTenantInput>, 'validate'> = {
  initialValues: {
    name: '',
    slug: ''
  }
}) {
  const validate = zodForm(createTenantInputSchema);

  return useCreateForm<CreateTenantInput>({
    ...options,
    validate
  });
}