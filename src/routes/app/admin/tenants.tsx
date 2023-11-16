import { RouteProvider } from "@/shared/ui";
import { Outlet } from "solid-start";

export function TenantsLayout() {
  return (
    <RouteProvider path="/tenants" title="Tenants">
      <Outlet/>
    </RouteProvider>
  );
}

export default TenantsLayout;