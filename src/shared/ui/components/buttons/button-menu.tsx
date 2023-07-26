import {
  Button,
  ButtonProps,
  EllipsisVerticalIcon,
  Menu,
  createFloatingUI,
  useOnClickOutside,
} from "@/shared/ui";
import { OffsetOptions, Placement } from "@floating-ui/dom";
import { JSX, splitProps } from "solid-js";

export interface ButtonMenuProps extends Omit<ButtonProps, "onClick"> {
  placement?: Placement;
  offset?: OffsetOptions;
  content?: JSX.Element;
}

export function ButtonMenu(props: ButtonMenuProps) {
  const [, buttonProps] = splitProps(props, [
    "placement",
    "offset",
    "content",
  ]);

  const menu = createFloatingUI({
    placement: props.placement ?? "right-end",
    offset: props.offset ?? { mainAxis: 12 },
  });

  useOnClickOutside(menu.anchorEl, menu.floatingEl, menu.close);

  return (
    <>
      <Button
        icon={props.icon !== undefined ? props.icon : !props.content}
        ref={menu.anchorRef}
        onClick={menu.toggle}
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="right-end"
        {...buttonProps}
      >
        {props.content ?? <EllipsisVerticalIcon size={props.size} />}
      </Button>
      <Menu
        ref={menu.floatingRef}
        onClickItem={menu.close}
      >
        {props.children}
      </Menu>
    </>
  );
}
