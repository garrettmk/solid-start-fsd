import { SizeProp, textSizeClass } from "@/shared/ui";
import clsx from "clsx";
import { JSX, Show, splitProps } from "solid-js";

export interface ErrorProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  size?: SizeProp
  when?: unknown
}

export function Error(props: ErrorProps) {
  const [, elementProps] = splitProps(props, ["size", "class"]);

  return (
    <Show when={props.when}>
      <p
        role='alert'
        class={clsx(
          "text-red-500 dark:text-red-400",
          textSizeClass(props.size ?? "sm"),
          props.class
        )}
        {...elementProps}
      />
    </Show>
  );
}