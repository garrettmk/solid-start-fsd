import { SizeProp, textSizeClass } from "@/shared/ui";
import clsx from "clsx";
import { JSX, Show, splitProps } from "solid-js";

export interface ErrorProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  when?: unknown
}

export function Error(props: ErrorProps) {
  const [, elementProps] = splitProps(props, ["class"]);

  return (
    <Show when={props.when}>
      <p
        role='alert'
        class={clsx(
          "text-red-500 dark:text-red-400",
          props.class
        )}
        {...elementProps}
      />
    </Show>
  );
}