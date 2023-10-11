import { APIClientDependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";
import { createRouteAction } from "solid-start";

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
