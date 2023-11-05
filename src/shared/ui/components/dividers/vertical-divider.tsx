import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

export type VerticalDividerProps = JSX.HTMLAttributes<HTMLDivElement>;

export function VerticalDivider(props: VerticalDividerProps) {
  const [, divProps] = splitProps(props, ["class"]);

  return (
    <div
      class={clsx(
        "h-full w-1 border-l border-slate-300 dark:border-slate-600",
        props.class
      )}
      {...divProps}
    />
  );
}