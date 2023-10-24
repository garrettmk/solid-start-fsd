import clsx from "clsx";
import { JSX, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { A } from "solid-start";

export interface BreadcrumbItemProps extends JSX.HTMLAttributes<HTMLLIElement> {
  href?: string;
}

export function BreadcrumbItem(props: BreadcrumbItemProps) {
  const [, liProps] = splitProps(props, ["href", "class", "children"]);

  return (
    <li
      class={clsx(
        "inline-flex items-center text-slate-600 last:text-slate-900 dark:text-slate-400 dark:last:text-white",
        props.class
      )}
      {...liProps}
    >
      <Show when={props.href} fallback={props.children}>
        <Dynamic
          component={props.href?.startsWith("/") ? A : "a"}
          href={props.href}
          class="inline-flex items-center font-medium hover:text-blue-600 dark:text-slate-400 dark:hover:text-white"
        >
          {props.children}
        </Dynamic>
      </Show>
    </li>
  );
}
