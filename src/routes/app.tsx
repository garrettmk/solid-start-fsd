import { LoadingOverlay, ModalProvider, NotificationProvider } from "@/shared/ui";
import { NavSidebar } from "@/widgets/navigation/nav-sidebar";
import { SignInOverlay } from "@/widgets/session";
import { Suspense } from "solid-js";
import { Outlet } from "solid-start";

export function AppLayout() {
  return (
    <NotificationProvider>
      <ModalProvider>
        <div class="relative h-screen flex items-stretch">
          <NavSidebar/>
          <Suspense fallback={<LoadingOverlay position="absolute"/>}>
            <Outlet />
          </Suspense>
        </div>
        <SignInOverlay />
      </ModalProvider>
    </NotificationProvider>
  )
}

export default AppLayout;