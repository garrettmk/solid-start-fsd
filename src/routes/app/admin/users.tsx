import { RouteProvider } from "@/shared/ui";
import { Outlet } from "solid-start";

export function UsersLayout() {
  return (
    <RouteProvider path="/users" title="Users">
      <Outlet/>
    </RouteProvider>
  );
}

export default UsersLayout;