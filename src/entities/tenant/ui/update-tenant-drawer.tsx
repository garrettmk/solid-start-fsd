import { Button, Drawer, ErrorNotification, HStack, Heading, ModalOptions, SuccessNotification, XMarkIcon, useNotification } from "@/shared/ui";
import { useQueryClient } from "@tanstack/solid-query";
import { createEffect, on, splitProps } from "solid-js";
import { useUpdateTenantAPI, useUpdateTenantForm } from "../lib";
import { Tenant } from "../schemas";
import { UpdateTenantForm } from "./update-tenant-form";

/**
 * Props for `UpdateTenantDrawer`
 */
export type UpdateTenantDrawerProps = ModalOptions & {
  tenant: Tenant
};

/**
 * A drawer that allows the user to update a tenant.
 * 
 * @param props 
 * @returns 
 */
export function UpdateTenantDrawer(props: UpdateTenantDrawerProps) {
  const [, drawerProps] = splitProps(props, ['tenant']);
  const [updatingTenant, updateTenant] = useUpdateTenantAPI();
  const updateTenantForm = useUpdateTenantForm({ initialValues: props.tenant });
  const queryClient = useQueryClient();

  const [notifySuccess] = useNotification(SuccessNotification, {
    message: () => `${props.tenant.name} updated`
  });

  const [notifyError] = useNotification(ErrorNotification, {
    message: () => `Error updating ${props.tenant.name}`
  });

  createEffect(() => {
    if (!props.isOpen) {
      updateTenantForm.reset();
      updatingTenant.clear();
    }
  });

  createEffect(
    on(
      () => props.tenant, 
      (tenant) => updateTenantForm.reset({ initialValues: tenant }), 
      { defer: true }
    )
  );


  createEffect(() => {
    if (updatingTenant.error) {
      notifyError({ error: updatingTenant.error });
      props.onClose?.();
    } else if (updatingTenant.result) {
      notifySuccess();
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      props.onClose?.();
    }
  });

  return (
    <Drawer placement="right" size="lg" class="p-4" {...drawerProps}>
      <HStack justify="between" align="center" class="mb-4">
        <Heading level="2" class="text-lg">
          Update Tenant
        </Heading>
        <Button icon size="xs" color="ghost" onClick={props.onClose}>
          <XMarkIcon size="xs" />
        </Button>
      </HStack>
      <UpdateTenantForm
        form={updateTenantForm}
        onSubmit={updateTenant}
        onCancel={props.onClose}
      />
    </Drawer>
  );
}