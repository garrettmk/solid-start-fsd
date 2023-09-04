import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

export interface ErrorProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  when?: unknown
}

export function Error(props: ErrorProps) {
  const [, elementProps] = splitProps(props, ["class"]);

  return (
    <p
      role='alert'
      class={clsx(
        "text-red-600 dark:text-red-400 whitespace-normal",
        props.class
      )}
      hidden={'when' in props && !props.when}
      {...elementProps}
    />
  );
}