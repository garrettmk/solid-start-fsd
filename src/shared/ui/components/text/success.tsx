import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

export interface SuccessProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  when?: unknown
}

export function Success(props: SuccessProps) {
  const [, elementProps] = splitProps(props, ["class"]);

  return (
    <p
      role='alert'
      class={clsx(
        "text-green-600 dark:text-green-400",
        props.class
      )}
      hidden={!props.when}
      {...elementProps}
    />
  );
}