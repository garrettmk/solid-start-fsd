import { APIClientDependency } from "@/shared/lib";
import { UseCreateFormOptions, useContainer, useCreateForm } from "@/shared/ui";
import { zodForm } from "@modular-forms/solid";
import { Accessor, createResource } from "solid-js";
import { createRouteAction } from "solid-start";
import { CreateTenantInput, FindManyTenantsInput, createTenantInputSchema } from "../schemas";


/**
 * A convenience hook for creating a tenant.
 * 
 * @returns a `RouteAction` for `api.tenants.create.mutate`
 */
export function useCreateTenantAPI() {
    const api = useContainer(APIClientDependency);
    
    return createRouteAction(async (input: CreateTenantInput) => {
        return api.tenants.create.mutate(input);
    });
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


/**
 * Returns a resource for a list of tenants.
 * 
 * @param input 
 * @returns 
 */
export function useFindManyTenantsAPI(input: Accessor<FindManyTenantsInput>) {
    const api = useContainer(APIClientDependency);
    
    return createResource(input, async (input: FindManyTenantsInput) => {
        return api.tenants.findMany.query(input);
    });
}