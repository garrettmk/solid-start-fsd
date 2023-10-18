import { Button, Drawer, DrawerProps, HStack, Heading, ModalOptions, XMarkIcon } from "@/shared/ui";
import { createEffect, on, splitProps } from "solid-js";
import { UpdateTenantMutation, useUpdateTenantForm } from "../lib";
import { Tenant, UpdateTenantInput } from "../schemas";
import { UpdateTenantForm } from "./update-tenant-form";
import clsx from "clsx";

/**
 * Props for `UpdateTenantDrawer`
 */
export type UpdateTenantDrawerProps = ModalOptions & DrawerProps & {
  tenant: Tenant
  updateMutation: UpdateTenantMutation
};

/**
 * A drawer that allows the user to update a tenant.
 * 
 * @param props 
 * @returns 
 */
export function UpdateTenantDrawer(props: UpdateTenantDrawerProps) {
  const [, drawerProps] = splitProps(props, [
    'class',
    'tenant',
    'updateMutation',
    'onClose',
  ]);

  const updateTenantForm = useUpdateTenantForm({ initialValues: props.tenant });
  const updateTenant = (input: UpdateTenantInput) => props.updateMutation.mutateAsync(input);

  createEffect((wasLoading) => {
    if (wasLoading && !props.updateMutation.isLoading)
      props.onClose?.();

    return props.updateMutation.isLoading;
  });

  createEffect(() => {
    if (!props.isOpen) {
      updateTenantForm.reset();
      props.updateMutation.reset();
    }
  });

  createEffect(
    on(
      () => props.tenant, 
      (tenant) => updateTenantForm.reset({ initialValues: tenant }), 
      { defer: true }
    )
  );

  return (
    <Drawer 
      placement="right" 
      size="lg" 
      class={clsx('p-4', props.class)} 
      {...drawerProps}
    >
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