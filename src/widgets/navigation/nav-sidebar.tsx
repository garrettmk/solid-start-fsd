import { useSignOut } from "@/features/session/sign-out";
import { AppIcon, ArrowRightOnRectangleIcon, BuildingStorefrontIcon, Button, Cog6ToothIcon, HomeIcon, MoonIcon, UsersIcon } from "@/shared/ui";
import clsx from "clsx";
import { A } from "solid-start";

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
    text-slate-700 dark:text-slate-300
    hover:bg-slate-100 active:bg-slate-200
    dark:hover:bg-slate-700 dark:active:bg-slate-600
  `.trim()
};

export function NavSidebar() {
  const signOut = useSignOut();

  return (
    <nav class={styles.base}>
      <div class="text-blue-700 h-10 flex items-center justify-center">
        <AppIcon />
      </div>

      <A class={clsx(styles.link, "mt-10")} href="/app">
        <HomeIcon size="xs" />
      </A>

      <A class={styles.link} href="/app/tenants">
        <BuildingStorefrontIcon size="xs" />
      </A>

      <A class={styles.link} href="/app/users">
        <UsersIcon size="xs" />
      </A>

      <hr />

      <A class={styles.link} href="/app/settings">
        <Cog6ToothIcon size="xs" />
      </A>

      <Button color="ghost" size="xs" class={clsx(styles.link, 'mt-auto')}>
        <MoonIcon />
      </Button>

      <Button color="ghost" size="xs" class={clsx(styles.link)} onClick={signOut}>
        <ArrowRightOnRectangleIcon />
      </Button>
    </nav>
  );
}