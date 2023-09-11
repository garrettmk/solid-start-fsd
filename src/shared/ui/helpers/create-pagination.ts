import { Pagination } from "@/shared/schemas";
import { createMemo, createSignal } from "solid-js";

/**
 * A convenience function for creating a `Pagination` object.
 * 
 * @param initial 
 * @returns 
 */
export function createPagination(initial?: Partial<Pagination>) {
  const [offset, setOffset] = createSignal<number>(initial?.offset ?? 0);
  const [count, setCount] = createSignal<number>(initial?.count ?? 10);

  const pagination = createMemo(() => ({
    offset: offset(),
    count: count()
  }));

  return [pagination, {
    setOffset,
    setCount
  }] as const;
}