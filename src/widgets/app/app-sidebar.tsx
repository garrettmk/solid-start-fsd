import { AppIcon } from "@/shared/ui";
import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { AppSidebarNav } from "./app-sidebar-nav";

const styles = {
  base: `
    w-14 p-3
    border-r border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-900
    flex flex-col
    [&>:not(:last-child)]:mb-3
    [&>hr]:dark:border-gray-700
  `.trim(),
};

export interface AppSidebarProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const AppSidebar = Object.assign(function AppSidebar(props: AppSidebarProps) {
  const [, divProps] = splitProps(props, ['class']);

  return (
    <div class={clsx(styles.base, props.class)} {...divProps}>
      <div class="text-blue-700 h-10 flex items-center justify-center">
        <AppIcon />
      </div>

      {props.children}
    </div>
  );
}, {
  Nav: AppSidebarNav
})