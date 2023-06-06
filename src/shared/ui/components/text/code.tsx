import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

export function Code(props: JSX.HTMLAttributes<HTMLPreElement>) {
  const [, spanProps] = splitProps(props, ["class"]);

  return (
    <pre
      class={clsx(
        "font-mono p-1 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md",
        props.class
      )}
      {...spanProps}
    />
  );
}
