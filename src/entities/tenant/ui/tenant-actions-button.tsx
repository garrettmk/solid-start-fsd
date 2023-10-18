import { Tenant, UpdateTenantDrawer, useDeleteTenant, useUpdateTenant } from "@/entities/tenant";
import { ButtonMenu, ButtonMenuProps, EllipsisVerticalIcon, MenuItem, PencilIcon, TrashIcon, useModal } from "@/shared/ui";
import { splitProps } from "solid-js";
import { DeleteTenantModal } from "./delete-tenant-modal";

/**
 * Props for `TenantActionsButton`
 */
export type TenantActionsButtonProps = ButtonMenuProps & {
  tenant: Tenant;
}

/**
 * A menu button for performing actions on a tenant.
 * 
 * @param props 
 * @returns 
 */
export function TenantActionsButton(props: TenantActionsButtonProps) {
  const [, buttonProps] = splitProps(props, [
    'tenant',
  ]);

  const updateMutation = useUpdateTenant();
  const updateDrawer = useModal(UpdateTenantDrawer, { tenant: props.tenant, updateMutation });
  
  const deleteMutation = useDeleteTenant();
  const deleteModal = useModal(DeleteTenantModal, { tenant: props.tenant, deleteMutation });

  return (
    <ButtonMenu
      id="tenant-actions-button"
      icon
      content={<EllipsisVerticalIcon size={props.size}/>}
      {...buttonProps}
    >
      <MenuItem onClick={updateDrawer.open}>
        <PencilIcon class="inline-block mr-4" size='xs'/>
        Edit
      </MenuItem>
      <MenuItem class="text-red-600 dark:text-red-500" onClick={deleteModal.open}>
        <TrashIcon class="inline-block mr-4" size='xs'/>
        Delete
      </MenuItem>
    </ButtonMenu>
  );
}