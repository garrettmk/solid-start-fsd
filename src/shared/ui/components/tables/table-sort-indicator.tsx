import clsx from "clsx";
import { ChevronDownIcon, IconProps } from "../icons";
import { splitProps } from "solid-js";
import { SortDirection } from "@tanstack/solid-table";
import { adjustSize } from "../../helpers";

/**
 * Props for the TableSortIndicator component
 */
export type TableSortIndicatorProps = IconProps & {
  direction?: false | SortDirection
}

/**
 * Shows an icon that indicates the sort direction of a table column.
 * 
 * @param props 
 * @returns 
 */
export function TableSortIndicator(props: TableSortIndicatorProps) {
  const [, iconProps] = splitProps(props, [
    "class",
    "direction",
    'size',
  ]);

  return (
    <ChevronDownIcon
      {...iconProps}
      size={adjustSize(props.size ?? 'md', { adjust: -2 })}
      class={clsx('inline-block transition-[transform,opacity] translate-y-[-5%]', {
        'transform rotate-180': props.direction === 'asc',
        'opacity-0': !props.direction,
      }, props.class)}
    />
  );
}