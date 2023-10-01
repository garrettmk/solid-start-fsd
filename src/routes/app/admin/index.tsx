import { CreateTenantForm, useCreateTenantAPI, useCreateTenantForm } from "@/entities/tenant";
import { BreadcrumbItem, Breadcrumbs, Button, Code, Drawer, Error, Heading, useDrawer, useNotifications } from "@/shared/ui";
import { PageContent, PageHeader } from "@/widgets/page";
import { FindManyTenantsTable } from "@/widgets/tenants";
import { reset } from "@modular-forms/solid";
import { createEffect } from "solid-js";

export function AdminIndex() {
  const { notify } = useNotifications();
  const [creatingTenant, createTenant] = useCreateTenantAPI();
  const createTenantDrawer = useDrawer();
  const createTenantForm = useCreateTenantForm();

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
        <Button size="sm" {...createTenantDrawer.buttonProps}>
          Create Tenant
        </Button>
      </PageHeader>
      <PageContent class="h-100">
        <FindManyTenantsTable/>
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