import { APIClientDependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";
import { createRouteAction } from "solid-start";
import { CreateTenantInput } from "../schemas";

export function useCreateTenantAPI() {
    const api = useContainer(APIClientDependency);
    
    return createRouteAction(async (input: CreateTenantInput) => {
        return api.tenants.create.mutate(input);
    });
}