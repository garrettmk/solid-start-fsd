import { LoadingOverlay, NotificationsProvider } from "@/shared/ui";
import { NavSidebar } from "@/widgets/navigation/nav-sidebar";
import { SignInOverlay } from "@/widgets/session";
import { Suspense } from "solid-js";
import { Outlet } from "solid-start";

export function AppLayout() {
  return (
    <NotificationsProvider>
      <div class="relative h-screen flex items-stretch">
        <NavSidebar/>
        <Suspense fallback={<LoadingOverlay position="absolute"/>}>
          <Outlet />
        </Suspense>
      </div>
      <SignInOverlay />
    </NotificationsProvider>
  )
}

export default AppLayout;