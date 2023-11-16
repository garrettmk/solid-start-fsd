import { Tooltipped } from "@/shared/ui";
import { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { A } from "solid-start";

export interface AppSidebarItemProps {
  href: string
  title: string
  icon: JSX.Element
}

const styles = {
  link: `
    -m-1.5 p-1.5
    flex items-center justify-center
    block rounded-md
    text-slate-500 dark:text-slate-400
    hover:bg-slate-100 hover:text-slate-800 hover:dark:text-slate-300
    active:bg-slate-200 active:dark:text-slate-300
    dark:hover:bg-slate-700 dark:active:bg-slate-600
  `.trim()
}

export function AppSidebarNavItem(props: AppSidebarItemProps) {
  return (
    <li>
      <Tooltipped text={props.title} placement="right">
        <Dynamic 
          component={props.href.startsWith('/') ? A : 'a'}
          class={styles.link}
          href={props.href}
          aria-label={props.title}
        >
            {props.icon}
        </Dynamic>
      </Tooltipped>
    </li>
  );
}