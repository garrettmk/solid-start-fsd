import clsx from "clsx";
import { JSX, splitProps } from "solid-js";

/**
 * Props for the `TableContainer` component
 */
export type TableContainerProps = JSX.HTMLAttributes<HTMLDivElement>;

/**
 * A special container for tables. Has a rounded top border, but square bottom border.
 * @param props 
 * @returns 
 */
export function TableContainer(props: TableContainerProps) {
  const [, divProps] = splitProps(props, ["class"]);

  return (
    <div
      class={clsx(
        "rounded-t-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
        props.class
      )}
      {...divProps}
    />
  );
}
