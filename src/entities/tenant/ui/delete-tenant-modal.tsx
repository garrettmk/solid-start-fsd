import { DeleteTenantInput, DeleteTenantResult, Tenant } from "@/entities/tenant";
import { Button, HStack, Heading, Modal, ModalProps, Spinner, XMarkIcon } from "@/shared/ui";
import clsx from "clsx";
import { Show, createEffect, splitProps } from "solid-js";
import { RouteAction } from "solid-start/data/createRouteAction";

/**
 * Props for `DeleteTenantModal`
 */
export type DeleteTenantModalProps = ModalProps & {
  tenant: Tenant;
  deleteAction: () => RouteAction<DeleteTenantInput, DeleteTenantResult>;
};

/**
 * A modal that allows the user to delete a tenant.
 * 
 * @param props 
 * @returns 
 */
export function DeleteTenantModal(props: DeleteTenantModalProps) {
  const [, modalProps] = splitProps(props, ['class', 'tenant', 'deleteAction']);
  const [deletingTenant, deleteTenant] = props.deleteAction();

  createEffect(() => {
    if (deletingTenant.result || deletingTenant.error) {
      props.onClose?.();
    }
  });

  return (
    <Modal {...modalProps} class={clsx('p-8', props.class)} size="none">
      <HStack justify="between" align="center" class="mb-8">
        <Heading level="1" class={clsx('text-2xl', deletingTenant.pending && 'opacity-50')}>
          Delete Tenant
        </Heading>
        <Button icon size="xs" color="ghost" onClick={props.onClose} disabled={deletingTenant.pending}>
          <XMarkIcon size="xs" />
        </Button>
      </HStack>
      <p class={clsx('mb-8', deletingTenant.pending && 'opacity-50')}>
        Are you sure you want to delete <span class="font-bold">{props.tenant.name}?</span>
        &nbsp;This can't be undone.
      </p>
      <HStack justify="end" class="mt-4" spacing="sm">
        <Button color="alternative" onClick={props.onClose} disabled={deletingTenant.pending}>
          Cancel
        </Button>
        <Button color="red" onClick={() => deleteTenant(props.tenant)} disabled={deletingTenant.pending}>
          <Show when={deletingTenant.pending}>
            <Spinner class="mr-4" size="sm" />
          </Show>
          <Show when={deletingTenant.pending} fallback="Delete">
            Deleting...
          </Show>
        </Button>
      </HStack>
    </Modal>
  );
}