import clsx from "clsx";
import { JSX, splitProps, Switch, Match } from "solid-js";
import { useLocation, A } from "solid-start";


export interface ModuleSidebarNavItemProps extends JSX.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  href?: string;
  exact?: boolean;
};

export function ModuleSidebarNavItem(props: ModuleSidebarNavItemProps) {
  const [, liProps] = splitProps(props, [
    "children",
    "class",
    "href",
    "active"
  ]);

  const location = useLocation();
  const isActive = () => props.active || (
    props.exact 
      ? location.pathname === props.href
      : props.href && location.pathname.startsWith(props.href)
  );

  const classes = () => clsx(
    "flex items-center px-6 py-2",
    "hover:bg-slate-100 dark:hover:bg-slate-800",
    "font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
    isActive() && "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white",
  );

  return (
    <Switch>
      <Match when={props.href?.startsWith('/')}>
        <li class={props.class}>
          <A 
            href={props.href ?? '/'}
            class={classes()}
          >
            {props.children}
          </A>
        </li>
      </Match>
      
      <Match when={props.href}>
        <li class={props.class}>
          <a
            href={props.href}
            class={classes()}
          >
            {props.children}
          </a>
        </li>
      </Match>

      <Match when={true}>
        <li class={clsx(classes(), props.class)} {...liProps}>
          {props.children}
        </li>
      </Match>
    </Switch>
  );
}