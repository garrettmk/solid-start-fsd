import { CreateTenantForm, useCreateTenantAPI, useCreateTenantForm, useFindManyTenantsAPI } from "@/entities/tenant";
import { Error, BreadcrumbItem, Breadcrumbs, Button, Code, DateAndTimeCell, Drawer, HStack, Heading, PlusIcon, Table, TableContainer, useDrawer, useNotifications, SearchInput } from "@/shared/ui";
import { PageContent, PageHeader } from "@/widgets/page";
import { reset } from "@modular-forms/solid";
import { createEffect } from "solid-js";

export function AdminIndex() {
  const { notify } = useNotifications();
  const [tenants] = useFindManyTenantsAPI(() => ({}));
  const [creatingTenant, createTenant] = useCreateTenantAPI();
  const createTenantDrawer = useDrawer();
  const createTenantForm = useCreateTenantForm();

  
  const notifySuccess = () => notify({
    type: 'success',
    message: "Something happened!",
    timeout: 4000,
  });


  createEffect(() => {
    if (!createTenantDrawer.isOpen) {
      reset(createTenantForm.store);
    }
  });

  createEffect(() => {
    if (creatingTenant.error)
      notify({
        type: 'error',
        dismissable: true,
        message: 'There was an error creating the tenant.',
        body: () => {
          return (
            <Code>
              <Error>
                {creatingTenant.error?.message}
              </Error>
            </Code>
          );
        }
      })
    else if (creatingTenant.result)
      notify({
        type: 'success',
        message: 'Tenant created successfully!',
        timeout: 5000,
        dismissable: true,
      })
  });


  return (
    <>
      <PageHeader>
        <Breadcrumbs class="text-lg font-medium">
          <BreadcrumbItem href="/app">Home</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem href="/app/admin">Admin</BreadcrumbItem>
        </Breadcrumbs>

        <Button size="sm" onClick={notifySuccess}>
          Notify
        </Button>
      </PageHeader>
      <PageContent class="h-100">
        <TableContainer>
          <HStack class="p-6" spacing="sm" align="center">
            <Heading level="2" class="flex-grow text-2xl font-bold">All Tenants</Heading>
            <SearchInput
              placeholder="Search tenants..."
            />
            <Button size="sm" {...createTenantDrawer.buttonProps}>
              <PlusIcon class="mr-1" size="xs"/>
              New Tenant
            </Button>
          </HStack>
          <Table
            columns={[
              {
                header: "Name",
                accessorKey: "name",
              },
              {
                header: "Slug",
                accessorKey: "slug",
              },
              {
                header: "Created",
                accessorKey: "createdAt",
                cell: ({ getValue }) => (
                  <DateAndTimeCell value={getValue() as string}/>
                )
              }
            ]}
            data={tenants()?.data ?? []}
          />
        </TableContainer>
      </PageContent>
      <Drawer 
        {...createTenantDrawer.drawerProps}
        placement='right'
        backdrop={true}
        class="p-4"
      >
        <Heading level="2" class="text-lg mb-4">
          Create Tenant
        </Heading>
        <CreateTenantForm 
          form={createTenantForm} 
          onSubmit={createTenant}
          onCancel={createTenantDrawer.close}
        />
      </Drawer>
    </>
  );
}

export default AdminIndex;