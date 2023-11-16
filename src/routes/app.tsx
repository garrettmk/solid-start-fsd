import { BuildingStorefrontIcon, Cog6ToothIcon, HomeIcon, LoadingOverlay, ModalProvider, NotificationProvider, RouteProvider, UsersIcon } from "@/shared/ui";
import { UserMenuButton } from "@/widgets";
import { App } from "@/widgets/app";
import { SignInOverlay } from "@/widgets/session";
import { Suspense } from "solid-js";
import { Outlet } from "solid-start";

export function AppLayout() {
  return (
    <RouteProvider path="/app" title="Home">
      <NotificationProvider>
        <ModalProvider>
          <App>
            <App.Sidebar class="justify-between">
              <App.Sidebar.Nav>
                <App.Sidebar.Nav.Item
                  href="/app" 
                  title="Home"
                  icon={<HomeIcon size="xs" />}
                />
                <App.Sidebar.Nav.Item
                  href="/app/tenants" 
                  title="Tenants"
                  icon={<BuildingStorefrontIcon size="xs" />}
                />
                <App.Sidebar.Nav.Item
                  href="/app/users"
                  title="Users"
                  icon={<UsersIcon size="xs" />}
                />
              </App.Sidebar.Nav>

              <App.Sidebar.Nav>
                <App.Sidebar.Nav.Item
                  href="/app/admin"
                  title="Admin"
                  icon={<Cog6ToothIcon size="xs" />}
                />
                <UserMenuButton
                  class="-m-1.5 p-1.5"
                  color="ghost"
                  size="xs"
                  placement="right-end"
                />
              </App.Sidebar.Nav>

            </App.Sidebar>
            <Suspense fallback={<LoadingOverlay position="absolute" />}>
              <Outlet />
            </Suspense>
          </App>
          <SignInOverlay />
        </ModalProvider>
      </NotificationProvider>
    </RouteProvider>
  )
}

export default AppLayout;