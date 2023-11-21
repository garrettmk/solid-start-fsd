import { FindManyTenantsInput, createFindManyTenantsQuery, useCreateTenant } from "@/entities/tenant";
import { DateAndTimeCell, HStack, Heading, LoadingOverlay, SearchForm, Table, TableContainer, TableContainerProps, TablePagination, createFindManyInput, usePaginatedResultFrom, usePaginationInputFrom, useQueryDataFrom, createSearchForm, useSearchInputFrom, useSortingInputFrom, createTable, Spinner, Button, PlusIcon, useModal, EllipsisHorizontalIcon, EllipsisVerticalIcon, ButtonMenu, MenuItem, PencilIcon, Divider, TrashIcon } from "@/shared/ui";
import clsx from "clsx";
import { Show, splitProps } from "solid-js";
import { CreateTenantDrawer } from "./create-tenant-drawer";
import { TenantActionsButton } from "./tenant-actions-button";
import { A } from "solid-start";

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

  const createMutation = useCreateTenant();
  const createTenantDrawer = useModal(CreateTenantDrawer, { createMutation });
  
  // Query inputs
  const [findManyInput, setFindManyInput] = createFindManyInput();
  const [sorting, setSorting] = useSortingInputFrom(findManyInput, setFindManyInput);
  const [, setSearchInput] = useSearchInputFrom(findManyInput, setFindManyInput);
  const [, setPaginationInput] = usePaginationInputFrom(findManyInput, setFindManyInput);

  // Query
  const query = createFindManyTenantsQuery(findManyInput);

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
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
        cell: ({ getValue, row }) => (
          <A class="underline" href={`/app/t/${row.original.slug}`}>{getValue<string>()}</A>
        )
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
      {
        header: 'Actions',
        id: 'actions',
        meta: {
          headerClasses: 'w-[0%]'
        },
        cell: ({ row }) => (
          <TenantActionsButton 
            class="m-auto"
            size="xs" 
            color="ghost"
            placement="top-end"
            tenant={row.original}
          />
        )
      }
    ]
  });

  return (
    <TableContainer {...tableContainerProps} class={clsx("relative", props.class)}>
      <HStack class="px-6 py-6" spacing="sm">
        <Heading level="2" class="text-2xl font-bold">Tenants</Heading>
        <Show when={isBackgroundLoading()}>
          <Spinner />
        </Show>
        <span class="grow"/>
        <SearchForm form={searchForm} placeholder="Search..." onSubmit={setSearchInput} />
        <Button size="xs" onClick={createTenantDrawer.open}>
          <PlusIcon size="xs" />
        </Button>
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

      <LoadingOverlay isOpen={isLoading()} position="absolute" />

      <TablePagination
        class="dark:-mb-px"
        pagination={paginated}
        onChange={setPaginationInput}
        perPageOptions={[2, 3, 5]}
      />
    </TableContainer>
  );
}