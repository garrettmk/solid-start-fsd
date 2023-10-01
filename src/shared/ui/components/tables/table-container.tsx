import clsx from "clsx";
import { splitProps } from "solid-js";
import { Panel, PanelProps } from "../panels";

/**
 * Props for the `TableContainer` component
 */
export type TableContainerProps = PanelProps;

/**
 * A special container for tables. Identical to `Panel`, but square bottom border.
 * 
 * @param props 
 * @returns 
 */
export function TableContainer(props: TableContainerProps) {
  const [, divProps] = splitProps(props, ["class"]);

  return (
    <Panel
      class={clsx("rounded-b-none", props.class)}
      {...divProps}
    />
  );
}
