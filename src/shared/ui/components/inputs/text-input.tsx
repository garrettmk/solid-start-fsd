import clsx from "clsx";
import { JSX, splitProps } from "solid-js";
import { adjustSize } from "../../helpers";
import { Error } from "../text/error";

export interface TextInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  containerProps?: JSX.HTMLAttributes<HTMLDivElement>;
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

const styles = {
  label: {
    base: "block font-medium text-slate-600 dark:text-slate-400",
    size: {
      sm: "text-xs mb-1.5 ml-0.5",
      md: "text-sm mb-2 ml-1",
      lg: "text-base mb-2 ml-1",
    },
  },

  input: {
    base: "w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 disabled:text-slate-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:disabled:text-slate-400 dark:focus:ring-blue-500 dark:focus:border-blue-500",
    size: {
      sm: "text-sm p-1.5 pb-1",
      md: "text-md p-2.5 pb-2",
      lg: "text-lg p-3 pb-2.5",
    },
  },
};

export function TextInput(props: TextInputProps) {
  const [, inputProps] = splitProps(props, [
    "containerProps",
    "class",
    "label",
    "ref",
    "error",
    "id",
  ]);

  const inputId = () => props.id ?? props.name;
  const errorId = () => inputId() && inputId() + "-error";

  return (
    <div {...(props.containerProps ?? {})}>
      <label
        for={inputId()}
        class={clsx(styles.label.base, styles.label.size[props.size ?? "md"])}
      >
        {props.label}
      </label>
      <input
        id={inputId()}
        type="text"
        ref={props.ref}
        class={clsx(
          styles.input.base,
          styles.input.size[props.size ?? "md"],
          props.class
        )}
        aria-describedby={errorId()}
        {...inputProps}
      />
      <Error
        when={props.error}
        id={errorId()}
        class={clsx('mt-2', adjustSize(props.size ?? "md", { adjust: -1 }))}
      >
        {props.error}
      </Error>

      {props.children}
      
    </div>
  );
}
