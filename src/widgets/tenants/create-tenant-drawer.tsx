import { CreateTenantForm, useCreateTenantAPI, useCreateTenantForm } from "@/entities/tenant";
import { Button, Code, Drawer, Error as ErrorLabel, HStack, Heading, ModalOptions, XMarkIcon, useNotifications } from "@/shared/ui";
import { useQueryClient } from "@tanstack/solid-query";
import { createEffect } from "solid-js";

/**
 * Props for `CreateTenantDrawer`
 */
export type CreateTenantDrawerProps = ModalOptions;

/**
 * A drawer that allows the user to create a tenant.
 * 
 * @param props 
 * @returns 
 */
export function CreateTenantDrawer(props: ModalOptions) {
  const { success, error } = useNotifications();
  const [creatingTenant, createTenant] = useCreateTenantAPI();
  const createTenantForm = useCreateTenantForm();
  const queryClient = useQueryClient();

  createEffect(() => {
    if (!props.isOpen) {
      createTenantForm.reset();
      creatingTenant.clear();
    }
  });

  createEffect(() => {
    if (creatingTenant.error) {
      // Extract the message now, because the drawer could be re-opened while
      // the notification is still visible
      const message = creatingTenant.error?.message;
      error({
        message: 'There was an error creating the tenant.',
        body: () => {
          return (
            <Code>
              <ErrorLabel>
                {message}
              </ErrorLabel>
            </Code>
          );
        }
      });

      props.onClose?.();
    } else if (creatingTenant.result) {
      success({
        message: 'Tenant created successfully!',
      });

      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      props.onClose?.();
    }
  });

  return (
    <Drawer placement="right" size="lg" class="p-4" {...props}>
      <HStack justify="between" align="center" class="mb-4">
        <Heading level="2" class="text-lg">
          Create Tenant
        </Heading>
        <Button icon size="xs" color="ghost" onClick={props.onClose}>
          <XMarkIcon size="xs" />
        </Button>
      </HStack>
      <CreateTenantForm
        form={createTenantForm}
        onSubmit={createTenant}
        onCancel={props.onClose}
      />
    </Drawer>
  );
}