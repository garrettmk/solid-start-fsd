import { CreateTenantForm, useCreateTenantAPI, useCreateTenantForm } from "@/entities/tenant";
import { Button, Drawer, ErrorNotification, HStack, Heading, ModalOptions, SuccessNotification, XMarkIcon, useNotification } from "@/shared/ui";
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
  const [notifySuccess] = useNotification(SuccessNotification);
  const [notifyError] = useNotification(ErrorNotification);
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
      notifyError({
        message: 'There was an error creating the tenant.',
        error: creatingTenant.error,
      });

      props.onClose?.();
    } else if (creatingTenant.result) {
      notifySuccess({
        message: `${creatingTenant.result.name} was added`,
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