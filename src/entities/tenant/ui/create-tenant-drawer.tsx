import { CreateTenantForm, CreateTenantInput, CreateTenantMutation, useCreateTenantForm } from "@/entities/tenant";
import { Button, Drawer, DrawerProps, HStack, Heading, ModalOptions, XMarkIcon } from "@/shared/ui";
import clsx from "clsx";
import { createEffect, splitProps } from "solid-js";

/**
 * Props for `CreateTenantDrawer`
 */
export type CreateTenantDrawerProps = ModalOptions & DrawerProps & {
  createMutation: CreateTenantMutation;
};

/**
 * A drawer that allows the user to create a tenant.
 * 
 * @param props 
 * @returns 
 */
export function CreateTenantDrawer(props: CreateTenantDrawerProps) {
  const [, drawerProps] = splitProps(props, [
    'class',
    'createMutation',
    'onClose',
  ]);

  const createTenantForm = useCreateTenantForm();
  const createTenant = (input: CreateTenantInput) => props.createMutation.mutateAsync(input);

  createEffect((wasLoading) => {
    if (wasLoading && !props.createMutation.isLoading)
      props.onClose?.();

    return props.createMutation.isLoading;
  });

  createEffect(() => {
    if (!props.isOpen) {
      createTenantForm.reset();
      props.createMutation.reset(); 
    }
  });

  return (
    <Drawer placement="right" size="lg" class={clsx('p-4', props.class)} {...drawerProps}>
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