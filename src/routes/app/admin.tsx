import { CreateTenantForm, useCreateTenantAPI, useCreateTenantForm } from "@/entities/tenant";
import { Button, CancelButton, Drawer, Error, HStack, Heading, ModuleSidebar, SubmitButton, Success, useDrawer } from "@/shared/ui";
import { PageHeader } from "@/widgets/page";
import { reset } from "@modular-forms/solid";
import { createEffect } from "solid-js";
import { Outlet } from "solid-start";

export function AdminLayout() {
  const createTenantDrawer = useDrawer();
  const createTenantForm = useCreateTenantForm();
  const [creatingTenant, createTenant] = useCreateTenantAPI();

  createEffect(() => {
    if (!createTenantDrawer.isOpen) {
      reset(createTenantForm.store);
    }
  });

  return (
    <>
      <ModuleSidebar>
        <PageHeader justify="center" class="-mx-5 -mt-3 text-xl flex justify-center">
          Admin Tools
        </PageHeader>
        <Button
          {...createTenantDrawer.buttonProps}
          size="xs"
          class="w-full mt-4"
        >
          New Tenant
        </Button>
      </ModuleSidebar>
      <div class="ml-64">
        <Outlet />
      </div>
      <Drawer 
        {...createTenantDrawer.drawerProps}
        placement='right'
        backdrop={true}
        class="p-4"
      >
        <Heading level="2" class="text-lg mb-4">Create Tenant</Heading>
          <CreateTenantForm 
            form={createTenantForm} 
            onSubmit={createTenant}
            disabled={creatingTenant.pending}
          >
            <HStack justify='end' spacing="sm" class="pt-4">
              <CancelButton onClick={createTenantDrawer.close}/>
              <SubmitButton/>
            </HStack>
          </CreateTenantForm>
          <Error class="mt-4" when={creatingTenant.error}>
            {creatingTenant.error?.message}
          </Error>
          <Success class="mt-4" when={creatingTenant.result && !creatingTenant.error}>
            Tenant created successfully!
          </Success>
      </Drawer>
    </>
  );
}

export default AdminLayout;
