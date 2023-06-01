import { JSX, Show, splitProps } from "solid-js";
import clsx from "clsx";

export interface CheckboxProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  containerProps?: JSX.HTMLAttributes<HTMLDivElement>;
  children?: JSX.Element;
  indeterminate?: boolean;
  error?: string
}

export function Checkbox(props: CheckboxProps) {
  const [, inputProps] = splitProps(props, [
    "children",
    "class",
    "containerProps",
    "ref",
    "id",
  ]);

  const inputId = () => props.id ?? props.name;
  const errorId = () => inputId() && inputId() + "-error";

  return (
    <div
      class={clsx("flex flex-wrap items-center", props.class)}
      {...(props.containerProps ?? {})}
    >
      <input
        id={inputId()}
        ref={props.ref}
        type="checkbox"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        {...inputProps}
      />
      <label
        for={inputId()}
        class="ml-2 text-sm font-medium text-slate-800 dark:text-gray-300"
      >
        {props.children}
      </label>
      <Show when={props.error}>
        <p
          id={errorId()}
          class="basis-full mt-2 text-sm text-red-600 dark:text-red-400"
        >
          {props.error}
        </p>
      </Show>
    </div>
  );
}
