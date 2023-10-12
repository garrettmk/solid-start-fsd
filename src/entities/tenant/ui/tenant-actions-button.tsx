import { ButtonMenu, ButtonMenuProps, EllipsisVerticalIcon, MenuItem, PencilIcon, TrashIcon, useModal } from "@/shared/ui";
import { splitProps } from "solid-js";
import { DeleteTenantModal } from "./delete-tenant-modal";
import { Tenant, UpdateTenantDrawer } from "@/entities/tenant";

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

  const updateDrawer = useModal(UpdateTenantDrawer, { tenant: props.tenant });
  const deleteModal = useModal(DeleteTenantModal, { tenant: props.tenant });

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