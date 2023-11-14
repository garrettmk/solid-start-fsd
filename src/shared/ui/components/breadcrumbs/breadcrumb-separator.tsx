import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

/**
 * Props for the `BreadcrumbSeparator` component.
 */
export interface BreadcrumbSeparatorProps extends JSX.HTMLAttributes<HTMLLIElement> {}

/**
 * A separator for breadcrumbs.
 * 
 * @param props 
 * @returns 
 */
export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  const [, liProps] = splitProps(props, ["class", "children"]);

  return (
    <li 
      class={clsx(
        "inline-flex items-center text-slate-600 last:text-slate-900 dark:text-slate-400 dark:last:text-white",
        props.class 
      )}
      {...liProps}
    >
      &gt;
    </li>
  );
}