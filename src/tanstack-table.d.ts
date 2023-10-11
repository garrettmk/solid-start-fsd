import '@tanstack/table-core';
import type { RowData } from '@tanstack/solid-table';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClasses?: string;
    cellClasses?: string;
  }
}