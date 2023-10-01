import { FindManyTenantsInput, createFindManyTenantsQuery } from "@/entities/tenant";
import { DateAndTimeCell, HStack, Heading, LoadingOverlay, SearchForm, Table, TableContainer, TableContainerProps, TablePagination, createFindManyInput, usePaginatedResultFrom, usePaginationInputFrom, useQueryDataFrom, createSearchForm, useSearchInputFrom, useSortingInputFrom, createTable } from "@/shared/ui";
import clsx from "clsx";
import { Show, splitProps } from "solid-js";

/**
 * @typedef FindManyTenantsTableProps
 */
export type FindManyTenantsTableProps = TableContainerProps & {
  initialQuery?: Partial<FindManyTenantsInput>;
};

/**
 * A table that displays the results of a `FindManyTenants` query.
 * 
 * @param props 
 * @returns 
 */
export function FindManyTenantsTable(props: FindManyTenantsTableProps) {
  const [, tableContainerProps] = splitProps(props, ['class', "initialQuery"]);
  const searchForm = createSearchForm();
  
  // Input signals
  const [findManyInput, setFindManyInput] = createFindManyInput();
  const [sorting, setSorting] = useSortingInputFrom(findManyInput, setFindManyInput);
  const [, setSearchInput] = useSearchInputFrom(findManyInput, setFindManyInput);
  const [, setPaginationInput] = usePaginationInputFrom(findManyInput, setFindManyInput);

  // Query
  const query = createFindManyTenantsQuery(findManyInput);

  // Output signals
  const data = useQueryDataFrom(query);
  const paginated = usePaginatedResultFrom(query);

  // Create a table instance
  const table = createTable({
    data,
    sorting,
    setSorting,
    columns: [
      {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
      },
      {
        header: "Slug",
        accessorKey: 'slug',
        enableSorting: true,
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        enableSorting: true,
        cell: ({ getValue }) => (
          <DateAndTimeCell value={getValue() as string} />
        ),
      },
    ]
  });

  return (
    <TableContainer {...tableContainerProps} class={clsx("relative", props.class)}>
      <HStack class="px-6 py-6" spacing="sm">
        <Heading level="2" class="text-2xl font-bold flex-grow">Tenants</Heading>
        <SearchForm form={searchForm} placeholder="Search..." onSubmit={setSearchInput} />
      </HStack>

      <Table
        table={table}
        size="md"
      />

      <Show when={!data().length}>
        <div class="flex justify-center items-center p-4 text-slate-600 dark:text-slate-400">
          <Show when={query.isLoading} fallback="No data">
            Loading...
          </Show>
        </div>
      </Show>

      <Show when={query.isLoading}>
        <LoadingOverlay position="absolute" />
      </Show>

      <TablePagination
        class="dark:-mb-px"
        pagination={paginated}
        onChange={setPaginationInput}
        perPageOptions={[2, 3, 5]}
      />
    </TableContainer>
  );
}