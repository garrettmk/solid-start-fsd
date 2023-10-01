import { PaginatedResult, PaginationInput } from "@/shared/schemas";
import clsx from "clsx";
import { Accessor, JSX, Show, splitProps } from "solid-js";
import { SizeProp } from "../../helpers";
import { Pagination, PaginationLimitMenuButton, PaginationTotalLabel } from "../pagination";

/**
 * Props for the TablePagination component
 */
export type TablePaginationProps = JSX.HTMLAttributes<HTMLDivElement> & {
  perPageOptions?: number[];
  pagination?: Accessor<PaginatedResult>;
  onChange?: (pagination: PaginationInput) => void;
  pages?: number;
  size?: SizeProp;
  disabled?: boolean;
}
  
/**
 * A pagination component for tables
 * 
 * @param props 
 * @returns 
 */
export function TablePagination(props: TablePaginationProps) {
  const [paginationProps, otherProps, divProps] = splitProps(
    props,
    ['pages'],
    ['pagination', 'onChange', 'size', 'disabled'],
  )

  const limit = () => props.pagination?.()?.limit ?? 0;
  const total = () => props.pagination?.()?.total ?? 0;

  return (
    <div 
      {...divProps}
      class={clsx("grid grid-rows-1 grid-cols-[1fr_auto_1fr] gap-x-2 bg-slate-100 dark:bg-slate-700", props.class)}
    >
      <PaginationLimitMenuButton
        class="!text-xs justify-self-end"
        color="table"
        radius="none"
        size="sm"
        placement="top-end"
        offset={{ crossAxis: -10, mainAxis: 5 }}
        options={props.perPageOptions}
        {...otherProps}
      />

      <Show when={limit() < total()} fallback={<span/>}>
        <Pagination
          radius="none"
          size="sm"
          color="table"
          {...paginationProps}
          {...otherProps}
        />
      </Show>

      <PaginationTotalLabel
        class="text-slate-600 dark:text-slate-400 text-xs self-center uppercase font-bold justify-self-start px-2"
        pagination={props.pagination}
      />
    </div>
  );
}