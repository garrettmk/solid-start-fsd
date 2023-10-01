import { PaginatedResult } from "@/shared/schemas";
import { Accessor, JSX } from "solid-js";

/**
 * Props for the PaginationTotalLabel component
 */
export type PaginationTotalLabelProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  pagination?: Accessor<PaginatedResult>;
}

/**
 * A label that shows the total number of items in a paginated result.
 * 
 * @param props 
 * @returns 
 */
export function PaginationTotalLabel(props: PaginationTotalLabelProps) {
  const pagination: Accessor<PaginatedResult> = () => props.pagination?.() ?? {
    offset: 0,
    limit: 0,
    total: 0,
  };

  const total = () => pagination().total.toLocaleString();
  const offset = () => pagination().offset.toLocaleString();
  const limit = () => pagination().limit.toLocaleString();

  return (
    <span {...props}>
      {offset()} - {limit()} of {total()}
    </span>
  );
}