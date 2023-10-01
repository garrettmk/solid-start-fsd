import { PaginatedResult, PaginationInput } from "@/shared/schemas";
import { Accessor, For, splitProps } from "solid-js";
import { ButtonMenu, ButtonMenuProps } from "../buttons";
import { MenuItem } from "../menus";

/**
 * Props for the PaginationLimitMenuButton component
 */
export type PaginationLimitMenuButtonProps = Omit<ButtonMenuProps, 'onChange'> & {
  pagination?: Accessor<PaginatedResult>;
  onChange?: (pagination: PaginationInput) => void;
  options?: number[]
};

/**
 * A menu button for setting the pagination limit (page length)
 * 
 * @param props 
 * @returns 
 */
export function PaginationLimitMenuButton(props: PaginationLimitMenuButtonProps) {
  const [, buttonMenuProps] = splitProps(props, [
    'pagination',
    'onChange',
    'options'
  ]);

  const pagination: Accessor<PaginatedResult> = () => props.pagination?.() ?? {
    offset: 0,
    limit: 0,
    total: 0,
  };

  const options = () => props.options ?? [10, 25, 50, 100];

  const handleClick = (event: MouseEvent) => {
    if (!props.onChange) return;

    const { offset } = pagination();
    const element = event.target as HTMLElement;
    const newLimit = parseInt(element.getAttribute('data-value') ?? '0');
    const newOffset = Math.floor(offset / newLimit) * newLimit;

    props.onChange({
      offset: newOffset,
      limit: newLimit,
    });
  }

  return (
    <ButtonMenu
      content={`${pagination().limit.toLocaleString()} per page`}
      {...buttonMenuProps}
    >
      <For each={options()}>
        {(option) => (
          <MenuItem data-value={option} onClick={handleClick}>
            {option.toLocaleString()}
          </MenuItem>
        )}
      </For>
    </ButtonMenu>
  );
}