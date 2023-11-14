import { JSX, splitProps } from "solid-js";
import { ModuleSidebarNavItem } from "./module-sidebar-nav-item";

/**
 * Props for the `ModuleSidebarNav` component.
 */
export type ModuleSidebarNavProps = JSX.HTMLAttributes<HTMLDivElement>;

/**
 * A navigation component for the module sidebar.
 */
export const ModuleSidebarNav = Object.assign(function (props: ModuleSidebarNavProps) {
  const [, navProps] = splitProps(props, ["children"]);
  return (
    // @ts-expect-error props mismatch with nav element vs. div
    <nav {...navProps}>
      <ul>
        {props.children}
      </ul>
    </nav>
  );
}, {
  Item: ModuleSidebarNavItem
});