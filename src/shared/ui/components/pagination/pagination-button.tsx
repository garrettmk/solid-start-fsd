import clsx from "clsx";
import { splitProps, createMemo } from "solid-js";
import { SizeProp, adjustSize } from "../../helpers";
import { ButtonProps, Button } from "../buttons";

const radiusClasses: Record<SizeProp, string> = {
  'none': '!rounded-none',
  'xs': '!rounded-none first:!rounded-l-xs last:!rounded-r-xs',
  'sm': '!rounded-none first:!rounded-l-sm last:!rounded-r-sm',
  'md': '!rounded-none first:!rounded-l-md last:!rounded-r-md',
  'lg': '!rounded-none first:!rounded-l-lg last:!rounded-r-lg',
  'xl': '!rounded-none first:!rounded-l-xl last:!rounded-r-xl',
  '2xl': '!rounded-none first:!rounded-l-2xl last:!rounded-r-2xl',
  '3xl': '!rounded-none first:!rounded-l-3xl last:!rounded-r-3xl',
  '4xl': '!rounded-none first:!rounded-l-4xl last:!rounded-r-4xl',
};

/**
 * Props for the PaginationButton component
 */
export type PaginationButtonProps = ButtonProps & {
  isCurrentPage?: boolean;
}

/**
 * A button used in the Pagination component
 * 
 * @param props 
 * @returns 
 */
export function PaginationButton(props: PaginationButtonProps) {
  const [, buttonProps] = splitProps(props, ['class', 'isCurrentPage']);
  const classes = createMemo(() => clsx(
    radiusClasses[adjustSize(props.size ?? 'md', { adjust: 2 })],
    props.isCurrentPage && '!text-blue-700 dark:!text-white !bg-slate-100 dark:!bg-slate-700',
    props.class
  ));

  return (
    <Button
      color="alternative"
      class={classes()}
      {...buttonProps}
    />
  );
}