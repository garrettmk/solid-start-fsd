import {
  Row,
  Table as TableInstance,
  flexRender
} from "@tanstack/solid-table";
import clsx from "clsx";
import { Component, For, JSX, Show, splitProps } from "solid-js";
import { SizeProp } from "../../helpers";
import { TableSortIndicator } from "./table-sort-indicator";

const styles = {
  base: "w-full text-left text-slate-800 dark:text-slate-200",

  header: {
    base: "uppercase bg-slate-100 text-slate-600  dark:bg-slate-700 dark:text-slate-400",

    size: {
      none: '',
      xs: "text-xs px-2 py-0.5",
      sm: "text-xs px-4 py-1",
      md: "text-sm px-6 py-3",
      lg: "text-md px-8 py-5",
      xl: 'text-lg px-10 py-6',
      '2xl': 'text-xl px-12 py-7',
      '3xl': 'text-2xl px-14 py-8',
      '4xl': 'text-3xl px-16 py-9',
    },
  },

  row: {
    base: "bg-white dark:bg-slate-800 border-b last:border-0 border-slate-200 dark:border-slate-700",
  },

  body: {
    base: "",

    size: {
      none: '',
      xs: "text-xs px-2 py-0.5",
      sm: "text-sm px-4 py-1.5",
      md: "text-md px-6 py-3",
      lg: "text-lg px-8 py-5",
      xl: 'text-xl px-10 py-6',
      '2xl': 'text-2xl px-12 py-7',
      '3xl': 'text-3xl px-14 py-8',
      '4xl': 'text-4xl px-16 py-9',
    },
  },
};

export interface TableProps<T = unknown, V = T> extends JSX.HTMLAttributes<HTMLTableElement> {
  table: TableInstance<T>;
  expandedComponent?: Component<{ row: Row<T> }>;
  size?: SizeProp;
}

export function Table<T, V>(props: TableProps<T, V>) {
  const [, tableProps] = splitProps(props, [
    "class",
    "size",
    "table"
  ]);

  const headerGroups = () => props.table.getHeaderGroups();
  const rows = () => props.table.getRowModel().rows;
  const hasVisibleFooters = () => props.table.getAllLeafColumns().some((c) => c.columnDef.footer);
  const footerGroups = () => props.table.getFooterGroups();

  return (
    <table class={clsx(styles.base, props.class)} {...tableProps}>
      <thead>
        <For each={headerGroups()}>
          {(headerGroup) => (
            <tr>
              <For each={headerGroup.headers}>
                {(header) => (
                  <th
                    scope="col"
                    class={clsx(
                      styles.header.base,
                      styles.header.size[props.size ?? "md"],
                      header.column.getCanSort() && "cursor-pointer select-none"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Show when={!header.isPlaceholder}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Show>
                    <TableSortIndicator
                      class="inline ml-1"
                      direction={header.column.getIsSorted()}
                      size={props.size ?? "md"}
                    />
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </thead>
      <tbody>
        <For each={rows()}>
          {(row) => (
            <>
              <tr class={styles.row.base}>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td
                      class={clsx(
                        styles.body.base,
                        styles.body.size[props.size ?? "md"]
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )}
                </For>
              </tr>
              <Show when={row.getIsExpanded() && props.expandedComponent}>
                {props.expandedComponent?.({ row })}
              </Show>
            </>
          )}
        </For>
      </tbody>
      <Show when={hasVisibleFooters()}>
        <tfoot>
          <For each={footerGroups()}>
            {(footerGroup) => (
              <tr>
                <For each={footerGroup.headers}>
                  {(header) => (
                    <th scope="col">
                      <Show when={!header.isPlaceholder}>
                        {flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                      </Show>
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tfoot>
      </Show>
    </table>
  );
}
