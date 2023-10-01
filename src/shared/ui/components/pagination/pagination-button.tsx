import clsx from "clsx";
import { createMemo, splitProps } from "solid-js";
import { SizeProp, radiusClass } from "../../helpers";
import { Button, ButtonProps } from "../buttons";

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

const currentPageClasses: Record<NonNullable<ButtonProps['color']>, string> = {
  'none': '',
  'light': '!text-blue-700 dark:!text-white !bg-slate-100 dark:!bg-slate-700',
  'dark': '!bg-slate-900 !text-white dark:!bg-slate-900 dark:!text-white',
  'alternative': '!text-blue-700 dark:!text-white !bg-slate-100 dark:!bg-slate-700',
  'ghost': '!bg-slate-100 dark:!bg-slate-700',
  'blue': '!bg-blue-800 dark:!bg-blue-800',
  'red': '!bg-red-800 dark:!bg-red-800',
  'green': '!bg-green-800 dark:!bg-green-800',
  'table': '!bg-slate-200 dark:!bg-slate-800'
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
    '!ring-inset',
    radiusClass(props.radius ?? props.size ?? 'md', { adjust: 2, scale: radiusClasses }),
    props.isCurrentPage && currentPageClasses[props.color ?? 'alternative'],
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