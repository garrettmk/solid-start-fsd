import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

/**
 * Props for the `Panel` component
 */
export interface PanelProps<E extends HTMLElement = HTMLDivElement>
  extends JSX.HTMLAttributes<E> {
  as?: string;
}

/**
 * A basic container for content.
 * 
 * @param props 
 * @returns 
 */
export function Panel<E extends HTMLElement = HTMLDivElement>(
  props: PanelProps<E>
) {
  const [, elementProps] = splitProps(props, ["as", "class", "ref"]);

  return (
    <Dynamic
      component={props.as ?? "div"}
      ref={props.ref}
      class={clsx(
        "text-base rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100",
        props.class
      )}
      {...elementProps}
    >
      {props.children}
    </Dynamic>
  );
}
