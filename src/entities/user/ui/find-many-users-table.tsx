import { DateAndTimeCell, HStack, Heading, LoadingOverlay, SearchForm, Spinner, Table, TableContainer, TableContainerProps, TablePagination, createFindManyInput, createSearchForm, createTable, usePaginatedResultFrom, usePaginationInputFrom, useQueryDataFrom, useSearchInputFrom, useSortingInputFrom } from "@/shared/ui";
import { Show, splitProps } from "solid-js";
import { FindManyUsersInput } from "../schemas";
import { createFindManyUsersQuery } from "../lib";
import clsx from "clsx";

export type FindManyUsersTableProps = TableContainerProps & {
  initialQuery?: Partial<FindManyUsersInput>;
}

export function FindManyUsersTable(props: FindManyUsersTableProps) {
  const [, tableContainerProps] = splitProps(props, ['class', "initialQuery"]);
  const searchForm = createSearchForm();

  // Query inputs
  const [findManyInput, setFindManyInput] = createFindManyInput();
  const [sorting, setSorting] = useSortingInputFrom(findManyInput, setFindManyInput);
  const [, setSearchInput] = useSearchInputFrom(findManyInput, setFindManyInput);
  const [, setPaginationInput] = usePaginationInputFrom(findManyInput, setFindManyInput);

  // Query
  const query = createFindManyUsersQuery(findManyInput);

  // Query outputs
  const data = useQueryDataFrom(query);
  const paginated = usePaginatedResultFrom(query);
  const isLoading = () => query.isLoading || (query.isFetching && query.isPreviousData);
  const isBackgroundLoading = () => query.isFetching && !query.isLoading && !query.isPreviousData;

  // Create a table instance
  const table = createTable({
    data,
    sorting,
    setSorting,
    columns: [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
        cell: ({ getValue }) => <DateAndTimeCell value={getValue<string>()} />,
      }
    ]
  });

  return (
    <TableContainer {...tableContainerProps} class={clsx('relative', props.class)}>
      <HStack class="px-6 py-6" spacing="sm">
        <Heading level="2" class="text-2xl font-bold">Users</Heading>
        <Show when={isBackgroundLoading()}>
          <Spinner/>
        </Show>
        <span class="grow"/>
        <SearchForm form={searchForm} placeholder="Search..." onSubmit={setSearchInput}/>
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

      <LoadingOverlay isOpen={isLoading()} position="absolute"/>

      <TablePagination
        class="dark:-mb-px"
        pagination={paginated}
        onChange={setPaginationInput}
        perPageOptions={[10, 25, 50, 100]}
      />
    </TableContainer>
  );
}