import { Button, LoadingOverlay, ModuleSidebar } from "@/shared/ui";
import { PageHeader } from "@/widgets/page";
import { Suspense } from "solid-js";
import { Outlet } from "solid-start";

export function AdminLayout() {
  return (
    <>
      <ModuleSidebar>
        <PageHeader justify="center" class="-mx-5 -mt-3 text-xl flex justify-center">
          Admin Tools
        </PageHeader>
      </ModuleSidebar>
      <div class="ml-64">
        <Suspense fallback={<LoadingOverlay/>}>
          <Outlet />
        </Suspense>
      </div>

    </>
  );
}

export default AdminLayout;
