import { FindManyInput, FindManyResult, PaginatedResult, PaginationInput, SearchInput, SortingInput, defaultFindManyInput, defaultPaginatedResult, defaultPaginationInput, defaultSearchInput, defaultSortingInput } from "@/shared/schemas";
import { CreateQueryResult } from "@tanstack/solid-query";
import { Accessor, Setter, Signal, createEffect, createSignal } from "solid-js";

/**
 * A convienience function for creating a `FindManyInput` object.
 * 
 * @param initial 
 * @returns 
 */
export function createFindManyInput(initial?: Partial<FindManyInput>) {
  return createSignal<FindManyInput>({
    ...defaultFindManyInput,
    ...initial
  });
}


/**
 * Returns an accessor and setter for the `sorting` property of a `FindManyInput` object.
 * 
 * @param findManyInput 
 * @param setFindManyInput 
 * @returns 
 */
export function useSortingInputFrom(findManyInput: Accessor<FindManyInput>, setFindManyInput: Setter<FindManyInput>): Signal<SortingInput> {
  const sortingInput: Accessor<SortingInput> = () => findManyInput().sorting ?? defaultSortingInput;
  
  // @ts-expect-error not sure how to type this
  const setSortingInput: Setter<SortingInput> = (newSortingInput) => {
    const resolvedSortingInput: SortingInput = typeof newSortingInput === 'function' 
      ? newSortingInput(sortingInput()) 
      : newSortingInput;
    
    setFindManyInput(current => ({ ...current, sorting: resolvedSortingInput }));
    return resolvedSortingInput;
  }

  return [sortingInput, setSortingInput];
}


/**
 * Returns an accessor and a setter for the `search` property of a `FindManyInput` object.
 * 
 * @param findManyInput 
 * @param setFindManyInput 
 * @returns 
 */
export function useSearchInputFrom(findManyInput: Accessor<FindManyInput>, setFindManyInput: Setter<FindManyInput>): Signal<SearchInput> {
  const searchInput: Accessor<SearchInput> = () => findManyInput().search ?? defaultSearchInput;

  // @ts-expect-error not sure how to type this
  const setSearchInput: Setter<SearchInput> = (newSearchInput) => {
    const resolvedSearchInput: SearchInput = typeof newSearchInput === 'function' 
      ? newSearchInput(searchInput()) 
      : newSearchInput;
    
    setFindManyInput(current => ({ ...current, search: resolvedSearchInput }));
    return resolvedSearchInput;
  }

  return [searchInput, setSearchInput];
}


/**
 * Returns an accessor and a setter for the `pagination` property of a `FindManyInput` object.
 * 
 * @param findManyInput 
 * @param setFindManyInput 
 * @returns 
 */
export function usePaginationInputFrom(findManyInput: Accessor<FindManyInput>, setFindManyInput: Setter<FindManyInput>): Signal<PaginationInput> {
  const paginationInput: Accessor<PaginationInput> = () => findManyInput().pagination ?? defaultPaginationInput;

  // @ts-expect-error not sure how to type this
  const setPaginationInput: Setter<PaginationInput> = (newPaginationInput) => {
    const resolvedPaginationInput: PaginationInput = typeof newPaginationInput === 'function' 
      ? newPaginationInput(paginationInput()) 
      : newPaginationInput;

    setFindManyInput(current => ({ ...current, pagination: resolvedPaginationInput }));
    return resolvedPaginationInput;
  }

  return [paginationInput, setPaginationInput];
}

/**
 * Returns an accessor for the `data` property of a `CreateQueryResult` object. The data is actually
 * copied to another signal in a `createEffect` call, so that suspense is not triggered on access.
 * 
 * @param query 
 * @returns 
 */
export function useQueryDataFrom<T extends FindManyResult>(query: CreateQueryResult<T>): Accessor<T['data']> {
  const [data, setData] = createSignal<T['data']>(query.data?.data ?? []);
  createEffect(() => {
    setData(query.data?.data ?? []);
  });

  return data;
}


/**
 * Returns an accessor for the `paginated` property of a `CreateQueryResult` object. The data is actually
 * copied to another signal in a `createEffect` call, so that suspense is not triggered on access.
 * 
 * @param query 
 * @returns 
 */
export function usePaginatedResultFrom(query: CreateQueryResult<FindManyResult>): Accessor<PaginatedResult> {
  const [paginated, setPaginated] = createSignal<FindManyResult['paginated']>(query.data?.paginated ?? { ...defaultPaginationInput, total: 0, offset: 0, limit: 0 });
  createEffect(() => {
    setPaginated(query.data?.paginated ?? { ...defaultPaginatedResult });
  });

  return paginated;
}