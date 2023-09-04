import { NotificationsProvider } from "@/shared/ui";
import { NavSidebar } from "@/widgets/navigation/nav-sidebar";
import { SignInOverlay } from "@/widgets/session";
import { Outlet } from "solid-start";

export function AppLayout() {
  return (
    <NotificationsProvider>
      <div class="ml-14">
        <Outlet />
      </div>
      <NavSidebar />
      <SignInOverlay />
    </NotificationsProvider>
  )
}

export default AppLayout;