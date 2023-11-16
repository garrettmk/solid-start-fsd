import { JSX } from "solid-js";
import { AppSidebarNavItem } from "./app-sidebar-nav-item";

/**
 * Props for the `AppSidebarNav` component.
 */
export interface AppSidebarNavProps extends JSX.HTMLAttributes<HTMLDivElement> {}

/**
 * A navigation list for the app sidebar.
 */
export const AppSidebarNav = Object.assign( function AppSidebarNav(props: AppSidebarNavProps) {
  return (
    // @ts-expect-error div/nav props mismatch
    <nav {...props}>
      <ul class="flex flex-col [&>:not(:last-child)]:mb-3">
        {props.children}
      </ul>
    </nav>
  );
}, {
  Item: AppSidebarNavItem
});