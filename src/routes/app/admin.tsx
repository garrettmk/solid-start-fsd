import { LoadingOverlay, Module } from "@/shared/ui";
import { PageHeader } from "@/widgets/page";
import { Suspense } from "solid-js";
import { Outlet } from "solid-start";

export function AdminLayout() {
  return (
    <Module>
      <Module.Sidebar class="self-stretch">
        <PageHeader justify="center" class="text-xl flex justify-center">
          Admin Tools
        </PageHeader>

        <Module.Sidebar.Nav class="mt-10">
          <Module.Sidebar.Nav.Item href="/app/admin" exact>
            Dashboard
          </Module.Sidebar.Nav.Item>
          <Module.Sidebar.Nav.Item href="/app/admin/tenants">
            Tenants
          </Module.Sidebar.Nav.Item>
          <Module.Sidebar.Nav.Item href="/app/admin/users">
            Users
          </Module.Sidebar.Nav.Item>
        </Module.Sidebar.Nav>
      </Module.Sidebar>
      <Suspense fallback={<LoadingOverlay position="absolute"/>}>
        <Outlet />
      </Suspense>
    </Module>
  );
}

export default AdminLayout;
