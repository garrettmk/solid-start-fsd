import { JSX, splitProps } from "solid-js";
import clsx from "clsx";

export interface AlertProps extends JSX.HTMLAttributes<HTMLDivElement> {
  color?: "blue" | "red";
}

const styles = {
  base: "p-4 mb-4 text-sm rounded-lg",
  color: {
    blue: "bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-blue-400",
    red: "bg-red-50 dark:bg-slate-800 text-red-800 dark:text-red-400",
    green: "bg-green-50 dark:bg-slate-800 text-green-800 dark:text-green-400"
  },
};

export function Alert(props: AlertProps) {
  const [, divProps] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={clsx(
        styles.base,
        styles.color[props.color ?? "blue"],
        props.class
      )}
      role="alert"
      {...divProps}
    >
      {props.children}
    </div>
  );
}
