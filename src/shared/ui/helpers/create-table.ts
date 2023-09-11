import { ColumnDef, SortingState, TableOptions, createSolidTable, getCoreRowModel } from "@tanstack/solid-table"
import { Accessor, Setter } from "solid-js"

/**
 * Options for `createTable`.
 */
export type CreateTableOptions<T = unknown, V = T> = {
  columns?: ColumnDef<T, V>[] | Accessor<ColumnDef<T, V>[] | undefined>
  data?: T[] | Accessor<T[] | undefined>
  sorting?: Accessor<SortingState>
  setSorting?: Setter<SortingState>
  options?: Omit<TableOptions<T>, 'data' | 'columns' | 'getCoreRowModel'>
}

/**
 * A wrapper for `createSolidTable` that simplifies the API.
 * @param options 
 * @returns 
 */
export function createTable<T, V>(options: CreateTableOptions<T, V>) {
  return createSolidTable({
    state: {
      get sorting() {
        if (options.sorting)
          return options.sorting()
      }
    },

    onSortingChange: options.setSorting,

    get data() {
      return typeof options.data === 'function'
        ? options.data() ?? []
        : options.data ?? []
    },

    get columns() {
      return typeof options.columns === 'function'
        ? options.columns() ?? []
        : options.columns ?? []
    },

    getCoreRowModel: getCoreRowModel(),
    ...options.options
  });
}