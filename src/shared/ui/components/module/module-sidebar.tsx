import { JSX } from "solid-js";
import clsx from "clsx";
import { ModuleSidebarNav } from "./module-sidebar-nav";

const styles = {
  base: `
    w-64
    border-r border-slate-200 dark:border-slate-700 
    bg-white dark:bg-slate-900
    dark:text-white
  `,
};

export interface ModuleSidebarProps {
  class?: string;
  children?: JSX.Element;
}

export const ModuleSidebar = Object.assign(function (props: ModuleSidebarProps) {
  return (
    <aside class={clsx(styles.base, props.class)}>
      {props.children}
    </aside>
  );
}, {
  Nav: ModuleSidebarNav
});