import { DeleteTenantMutation, Tenant } from "@/entities/tenant";
import { Button, HStack, Heading, Modal, ModalProps, Spinner, XMarkIcon } from "@/shared/ui";
import clsx from "clsx";
import { Show, createEffect, on, splitProps } from "solid-js";

/**
 * Props for `DeleteTenantModal`
 */
export type DeleteTenantModalProps = ModalProps & {
  tenant: Tenant;
  deleteMutation: DeleteTenantMutation
};

/**
 * A modal that allows the user to delete a tenant.
 * 
 * @param props 
 * @returns 
 */
export function DeleteTenantModal(props: DeleteTenantModalProps) {
  const [, modalProps] = splitProps(props, ['class', 'tenant', 'deleteMutation']);
  const isLoading = () => props.deleteMutation.isLoading;
  const deleteTenant = () => props.deleteMutation.mutateAsync(props.tenant);

  createEffect(
    on(
      () => props.deleteMutation,
      () => { !isLoading() && props.onClose?.() },
      { defer: true }
    )
  );

  createEffect(() => {
    if (!props.isOpen)
      props.deleteMutation.reset();
  });

  return (
    <Modal {...modalProps} class={clsx('p-8', props.class)} size="none">
      <HStack justify="between" align="center" class="mb-8">
        <Heading level="1" class={clsx('text-2xl', isLoading() && 'opacity-50')}>
          Delete Tenant
        </Heading>
        <Button icon size="xs" color="ghost" onClick={props.onClose} disabled={isLoading()}>
          <XMarkIcon size="xs" />
        </Button>
      </HStack>
      <p class={clsx('mb-8', isLoading() && 'opacity-50')}>
        Are you sure you want to delete <span class="font-bold">{props.tenant.name}?</span>
        &nbsp;This can't be undone.
      </p>
      <HStack justify="end" class="mt-4" spacing="sm">
        <Button color="alternative" onClick={props.onClose} disabled={isLoading()}>
          Cancel
        </Button>
        <Button color="red" onClick={deleteTenant} disabled={isLoading()}>
          <Show when={isLoading()}>
            <Spinner class="mr-4" size="sm" />
          </Show>
          <Show when={isLoading()} fallback="Delete">
            Deleting...
          </Show>
        </Button>
      </HStack>
    </Modal>
  );
}