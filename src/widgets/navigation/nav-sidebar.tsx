import { AppIcon, BuildingStorefrontIcon, Cog6ToothIcon, HomeIcon, UsersIcon } from "@/shared/ui";
import clsx from "clsx";
import { A } from "solid-start";
import { UserMenuButton } from "./user-menu-button";

const styles = {
  base: `
    fixed top-0 left-0 h-screen w-14 p-3
    border-r border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-900
    flex flex-col
    [&>:not(:last-child)]:mb-3
    [&>hr]:dark:border-gray-700
  `.trim(),

  link: `
    -m-1.5 p-1.5
    flex items-center justify-center
    block rounded-md
    text-slate-500 dark:text-slate-400
    hover:bg-slate-100 hover:text-slate-800 hover:dark:text-slate-300
    active:bg-slate-200 active:dark:text-slate-300
    dark:hover:bg-slate-700 dark:active:bg-slate-600
  `.trim()
};

export function NavSidebar() {
  return (
    <nav class={styles.base}>
      <div class="text-blue-700 h-10 flex items-center justify-center">
        <AppIcon />
      </div>

      <A class={clsx(styles.link, "mt-10")} href="/app" aria-label="Home">
        <HomeIcon size="xs" />
      </A>

      <A class={styles.link} href="/app/tenants" aria-label="Tenants">
        <BuildingStorefrontIcon size="xs" />
      </A>

      <A class={styles.link} href="/app/users" aria-label="Users">
        <UsersIcon size="xs" />
      </A>

      <hr />

      <A class={styles.link} href="/app/settings" aria-label="Settings">
        <Cog6ToothIcon size="xs" />
      </A>

      <UserMenuButton 
        class={clsx(styles.link, "mt-auto")}
        color="ghost"
        size="xs"
        placement="right-end"
      />
    </nav>
  );
}