import { FindManyInput } from "@/shared/schemas";
import { createMemo, createSignal } from "solid-js";
import { createPagination } from "./create-pagination";
import { createSorting } from "./create-sorting";


/**
 * A convenience function for creating a `FindManyInput` object.
 * 
 * @returns 
 */
export function createFindManyInput(initial?: Partial<FindManyInput>) {
  const [sorting, setSorting] = createSorting(initial?.sorting);
  const [pagination, { setOffset, setCount }] = createPagination(initial?.pagination);
  const [keywords, setKeywords] = createSignal<string>(initial?.keywords ?? '');

  const input = createMemo(() => ({
    sorting: sorting(),
    keywords: keywords(),
    pagination: pagination()
  }));

  return [input, { 
    setSorting,
    setKeywords,
    setOffset,
    setCount
  }] as const;
}
