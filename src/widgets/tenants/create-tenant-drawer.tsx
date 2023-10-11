import { useCreateTenantAPI, useCreateTenantForm, CreateTenantForm } from "@/entities/tenant";
import { useNotifications, Code, HStack, Heading, Button, XMarkIcon, Error as ErrorLabel, Drawer } from "@/shared/ui";
import { ModalProps } from "@/shared/ui";
import { useQueryClient } from "@tanstack/solid-query";
import { createEffect } from "solid-js";

/**
 * Props for `CreateTenantDrawer`
 */
export type CreateTenantDrawerProps = ModalProps;

/**
 * A drawer that allows the user to create a tenant.
 * 
 * @param props 
 * @returns 
 */
export function CreateTenantDrawer(props: ModalProps) {
  const { success, error } = useNotifications();
  const [creatingTenant, createTenant] = useCreateTenantAPI();
  const createTenantForm = useCreateTenantForm();
  const queryClient = useQueryClient();

  createEffect(() => {
    if (creatingTenant.error) {
      error({
        message: 'There was an error creating the tenant.',
        body: () => {
          return (
            <Code>
              <ErrorLabel>
                {creatingTenant.error?.message}
              </ErrorLabel>
            </Code>
          );
        }
      });
    } else if (creatingTenant.result) {
      success({
        message: 'Tenant created successfully!',
      });

      queryClient.invalidateQueries({ queryKey: ['tenants'] });
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