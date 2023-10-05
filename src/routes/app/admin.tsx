import { LoadingOverlay, ModuleContainer, ModuleSidebar } from "@/shared/ui";
import { PageHeader } from "@/widgets/page";
import { Suspense } from "solid-js";
import { Outlet } from "solid-start";

export function AdminLayout() {
  return (
    <ModuleContainer>
      <ModuleSidebar class="self-stretch">
        <PageHeader justify="center" class="-mx-5 -mt-3 text-xl flex justify-center">
          Admin Tools
        </PageHeader>
      </ModuleSidebar>
      <Suspense fallback={<LoadingOverlay position="absolute"/>}>
        <Outlet />
      </Suspense>
    </ModuleContainer>
  );
}

export default AdminLayout;
