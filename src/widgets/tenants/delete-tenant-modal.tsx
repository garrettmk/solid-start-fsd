import { Tenant, useDeleteTenantAPI } from "@/entities/tenant";
import { Button, Code, Error, HStack, Heading, Modal, ModalProps, Spinner, XMarkIcon, useNotifications } from "@/shared/ui";
import { useQueryClient } from "@tanstack/solid-query";
import { Show, createEffect, splitProps } from "solid-js";

/**
 * Props for `DeleteTenantModal`
 */
export type DeleteTenantModalProps = ModalProps & {
  tenant: Tenant;
};

/**
 * A modal that allows the user to delete a tenant.
 * 
 * @param props 
 * @returns 
 */
export function DeleteTenantModal(props: DeleteTenantModalProps) {
  const [, modalProps] = splitProps(props, ['tenant']);
  const [deletingTenant, deleteTenant] = useDeleteTenantAPI();
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  createEffect(() => {
    props.onClose?.();

    if (deletingTenant.error) {
      error({
        message: 'There was an error deleting the tenant.',
        body: () => (
          <Code>
            <Error>
              {deletingTenant.error?.message}
            </Error>
          </Code>
        )
      });

      props.onClose?.();
    } else if (deletingTenant.result) {
      success({
        message: 'Tenant deleted successfully!',
      });
      
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      props.onClose?.();
    }

  });

  return (
    <Modal {...modalProps} class="p-8" size="none">
      <HStack justify="between" align="center" class="mb-8">
        <Heading level="1" class="text-2xl">
          Delete Tenant
        </Heading>
        <Button icon size="xs" color="ghost" onClick={props.onClose}>
          <XMarkIcon size="xs" />
        </Button>
      </HStack>
      <p class="mb-8">
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