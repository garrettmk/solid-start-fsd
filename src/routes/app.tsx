import { NavSidebar } from "@/widgets/navigation/nav-sidebar";
import { SignInOverlay } from "@/widgets/session";
import { Outlet } from "solid-start";

export function AppLayout() {
  return (
    <>
      <NavSidebar />
      <div class="ml-14">
        <Outlet />
      </div>
      <SignInOverlay />
    </>
  )
}

export default AppLayout;